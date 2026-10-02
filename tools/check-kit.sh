#!/usr/bin/env bash
# Guard for the partner kit: nothing internal may reach partner-kit.html or the files it loads.
# Run from the repo root before every push:  bash tools/check-kit.sh
set -u
cd "$(dirname "$0")/.."
fail=0
err() { echo "FAIL: $*"; fail=1; }

KIT_FILES="partner-kit.html assets/js/rates.js assets/js/kit-content.js assets/js/kit.js"

# 1. The kit page must load only partner-safe scripts.
for f in config.js content.js calculators.js app.js; do
  grep -q "assets/js/$f" partner-kit.html && err "partner-kit.html loads $f"
done
loaded=$(grep -o 'src="assets/js/[^"]*"' partner-kit.html | sed 's/src="assets\/js\///; s/"$//' | sort | tr '\n' ' ')
[ "$loaded" = "kit-content.js kit.js rates.js " ] || err "partner-kit.html loads unexpected local scripts: $loaded"

# 2. No internal fields or markers in kit files.
for pat in 'shareMax' 'openItems' 'deal ?desk' 'internal:' 'tbc:' 'PB_CONFIG' 'PB_CONTENT' '75%' 'margin at each' 'fx:' 'model:'; do
  hits=$(grep -nEi "$pat" $KIT_FILES | grep -v 'check-kit:allow')
  [ -n "$hits" ] && err "internal marker /$pat/ in kit files:" && echo "$hits"
done

# 3. No competitor names in kit files.
comp='delta exchange|coindcx|coinswitch|mudrex|wazirx|zebpay|giottus|bitbns|pi42|binance|bybit|okx|bitget|kucoin|bingx|zerodha|upstox|angel one|5paisa|groww'
hits=$(grep -nEi "$comp" $KIT_FILES)
[ -n "$hits" ] && err "competitor name in kit files:" && echo "$hits"

# 4. Banned ad words in partner-facing copy (ASCI VDA guidelines and general claims).
#    Lines that tell partners NOT to use a word carry the marker "check-kit:allow".
banned='currenc(y|ies)|securities|custodian|depositor(y|ies)|guarantee|risk-free|riskfree|licen[cs]ed|(^|[^n])regulated|government[- ]approved|sure[- ]shot|assured return|tax-free|double your|passive income|pakka profit'
hits=$(grep -nEi "$banned" assets/js/kit-content.js | grep -v 'check-kit:allow' | grep -viE 'not guaranteed|guaranteed nahi')
[ -n "$hits" ] && err "banned word in kit-content.js (add check-kit:allow only if the line tells partners NOT to use it):" && echo "$hits"
hits=$(sed 's/<[^>]*>//g' partner-kit.html | grep -nEi "$banned" | grep -viE 'not guaranteed|guaranteed nahi')
[ -n "$hits" ] && err "banned word in partner-kit.html:" && echo "$hits"

# 5. Every library post must carry a link placeholder or be a script/poster, and every script must carry the disclaimer token.
node -e '
global.window = {};
require("./assets/js/rates.js"); require("./assets/js/kit-content.js");
const K = window.KIT, R = window.PB_RATES; let bad = 0;
for (const x of K.library) {
  for (const f of ["t", "t_en"]) {
    if (!x[f]) { console.log("missing " + f + " in " + x.id); bad = 1; }
    if (x.fmt === "script" && !/\{disclaimer\}/.test(x[f])) { console.log("script without {disclaimer}: " + x.id); bad = 1; }
  }
}
if (!R.disclaimer || !R.disclaimer.en) { console.log("rates.js: disclaimer.en missing"); bad = 1; }
for (const k of ["shareMax", "openItems", "model", "fx", "health"]) if (k in R) { console.log("rates.js has internal key " + k); bad = 1; }
process.exit(bad);
' || err "kit content structure"

if [ $fail -eq 0 ]; then echo "check-kit: OK"; else exit 1; fi
