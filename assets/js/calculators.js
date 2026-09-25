/* Live calculators. Every output carries both languages; CSS shows one. */
(function () {
  'use strict';
  var C = window.PB_CONFIG;
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- helpers ---------- */
  function L(hi, en) { return '<span class="hi">' + hi + '</span><span class="en">' + (en == null ? hi : en) + '</span>'; }
  function num(id) { var v = parseFloat($(id).value); return isFinite(v) ? v : 0; }
  function inr(x, dp) {
    if (!isFinite(x)) return '—';
    if (dp == null) dp = Math.abs(x) < 100 && x % 1 !== 0 ? 2 : 0;
    var s = Math.abs(x).toLocaleString('en-IN', { minimumFractionDigits: dp, maximumFractionDigits: dp });
    return (x < 0 ? '−₹' : '₹') + s;
  }
  function inrShort(x) {
    var a = Math.abs(x), sign = x < 0 ? '−' : '';
    if (a >= 1e7) return sign + '₹' + (a / 1e7).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ' cr';
    if (a >= 1e5) return sign + '₹' + (a / 1e5).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ' L';
    return inr(x);
  }
  function usd(x) {
    var a = Math.abs(x);
    if (a >= 1e6) return '$' + (x / 1e6).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'M';
    if (a >= 1e3) return '$' + (x / 1e3).toLocaleString('en-US', { maximumFractionDigits: 1 }) + 'K';
    return '$' + x.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }
  function pct(x, dp) { return (x < 0 ? '−' : '') + Math.abs(x).toLocaleString('en-IN', { maximumFractionDigits: dp == null ? 2 : dp }) + '%'; }
  function row(label, value, cls) { return '<div class="o ' + (cls || '') + '"><span class="l">' + label + '</span><span class="v">' + value + '</span></div>'; }
  function math(lines) { return '<details class="math"><summary>' + L('Calculation dikhao', 'Show the maths') + '</summary><pre>' + lines.join('\n') + '</pre></details>'; }
  function flag(html, kind) { return '<div class="flagline ' + (kind || '') + '">' + html + '</div>'; }
  function gstOn(x) { return x * C.gst / 100; }
  function blended(makerPct) { return (makerPct / 100) * C.fut.maker + (1 - makerPct / 100) * C.fut.taker; }
  var TBC = '<span class="tbc">TBC</span>';

  /* ---------- toggles ---------- */
  function tog(name) {
    var b = document.querySelector('[data-tog="' + name + '"] [aria-pressed="true"]');
    return b ? b.getAttribute('data-v') : null;
  }
  function syncShows() {
    document.querySelectorAll('[data-show]').forEach(function (el) {
      var p = el.getAttribute('data-show').split('=');
      el.hidden = tog(p[0]) !== p[1];
    });
  }

  /* ---------- 01 position builder ---------- */
  function pb() {
    var m = num('pb_m'), lev = num('pb_l'), mv = num('pb_mv'), side = tog('pb_side');
    $('pb_lo').textContent = lev + 'x';
    $('pb_mvo').textContent = (mv > 0 ? '+' : '') + mv + '%';
    var n = m * lev, dir = side === 'long' ? 1 : -1;
    var pnl = n * mv / 100 * dir, roe = m ? pnl / m * 100 : 0;
    var wiped = pnl <= -m;
    var shown = wiped ? -m : pnl;
    var rt = n * 2 * C.fut.taker / 100 * (1 + C.gst / 100);
    var h = '';
    h += row(L('Notional (position size)', 'Notional (position size)'), inr(n));
    h += row(L('Profit / loss', 'Profit / loss'), inr(shown), shown >= 0 ? 'plus' : 'minus');
    h += row(L('Margin pe return', 'Return on margin'), wiped ? '−100%' : pct(roe, 1), shown >= 0 ? 'plus' : 'minus');
    h += row(L('Liquidation approx kitne move pe', 'Approx. move to liquidation') + '<small>' + L('maintenance margin ki wajah se thoda pehle', 'slightly earlier because of maintenance margin') + '</small>', '~' + pct(100 / lev, 1));
    h += row(L('Round trip fee (taker + GST)', 'Round-trip fee (taker + GST)'), inr(rt));
    if (wiped) {
      h += flag(L('<b>Liquidated.</b> ' + pct(Math.abs(mv), 1) + ' ulta move × ' + lev + 'x = margin khatam. Trader ka max loss sirf margin (' + inr(m) + ') tak.',
                  '<b>Liquidated.</b> A ' + pct(Math.abs(mv), 1) + ' adverse move × ' + lev + 'x wipes the margin. The trader\'s loss is capped at the margin (' + inr(m) + ').'), 'bad');
    } else {
      h += flag(L('Price sirf <b>' + pct(Math.abs(mv), 1) + '</b> move hua, lekin ' + lev + 'x leverage ki wajah se margin pe <b>' + pct(Math.abs(roe), 1) + '</b> ka ' + (shown >= 0 ? 'profit' : 'loss') + '.',
                  'The price moved only <b>' + pct(Math.abs(mv), 1) + '</b>, but at ' + lev + 'x leverage that\'s a <b>' + pct(Math.abs(roe), 1) + '</b> ' + (shown >= 0 ? 'gain' : 'loss') + ' on margin.'));
    }
    h += math([
      'Notional   = ' + inr(m) + ' × ' + lev + ' = ' + inr(n),
      'P&L        = ' + inr(n) + ' × ' + mv + '% ' + (side === 'short' ? '× −1 (short) ' : '') + '= ' + inr(pnl),
      'Return     = ' + inr(pnl) + ' ÷ ' + inr(m) + ' = ' + pct(roe, 1),
      'Round trip = ' + inr(n) + ' × 2 × ' + C.fut.taker + '% × ' + (1 + C.gst / 100) + ' = ' + inr(rt)
    ]);
    $('pb_out').innerHTML = h;
  }

  /* ---------- 03 futures fee ---------- */
  function fc() {
    var n = tog('fc_mode') === 'margin' ? num('fc_m') * num('fc_l') : num('fc_n');
    var rEn = tog('fc_en') === 'm' ? C.fut.maker : C.fut.taker;
    var rEx = tog('fc_ex') === 'm' ? C.fut.maker : C.fut.taker;
    var trips = num('fc_tr');
    var fEn = n * rEn / 100, fEx = n * rEx / 100, fees = fEn + fEx, g = gstOn(fees), tot = fees + g;
    var be = n ? tot / n * 100 : 0;
    var h = '';
    h += row('Notional', inr(n));
    h += row('Entry fee <small>' + (tog('fc_en') === 'm' ? 'Maker' : 'Taker') + ' · ' + rEn + '%</small>', inr(fEn));
    h += row('Exit fee <small>' + (tog('fc_ex') === 'm' ? 'Maker' : 'Taker') + ' · ' + rEx + '%</small>', inr(fEx));
    h += row('GST <small>' + C.gst + '% ' + L('dono fees pe', 'on both fees') + '</small>', inr(g));
    h += row(L('Ek round trip ka total', 'Total per round trip'), inr(tot), 'big');
    h += row(L('Fee cover karne ke liye price move', 'Price move needed to cover fees'), pct(be, 3), 'sub');
    h += row(L('Mahine ka total (' + trips + ' round trips)', 'Monthly total (' + trips + ' round trips)'), inr(tot * trips));
    h += row(L('Mahine ka volume', 'Monthly volume'), inrShort(n * 2 * trips), 'sub');
    h += '<div class="internal">' + row(L('Partner ko is trader se / mahina', 'To partner from this trader / month') + ' <small>' + C.share + '% ' + L('of fees', 'of fees') + '</small>', inr(fees * trips * C.share / 100), 'plus') + '</div>';
    var saving = n * 2 * (C.fut.taker - C.fut.maker) / 100 * (1 + C.gst / 100);
    h += flag(L('Dono side maker use karo toh har round trip pe <b>' + inr(saving) + '</b> bachenge.', 'Using maker orders on both sides saves <b>' + inr(saving) + '</b> per round trip.'));
    h += math([
      'Entry = ' + inr(n) + ' × ' + rEn + '% = ' + inr(fEn),
      'Exit  = ' + inr(n) + ' × ' + rEx + '% = ' + inr(fEx),
      'GST   = (' + inr(fEn) + ' + ' + inr(fEx) + ') × ' + C.gst + '% = ' + inr(g),
      'Total = ' + inr(fees) + ' + ' + inr(g) + ' = ' + inr(tot)
    ]);
    $('fc_out').innerHTML = h;
  }

  /* ---------- 04 options ---------- */
  var OC_PRESETS = { atm: { px: 8500000, q: 0.01, pr: 150000 }, otm: { px: 8500000, q: 0.01, pr: 10000 } };
  function oc() {
    var px = num('oc_px'), q = num('oc_q'), prPer = num('oc_pr');
    var isMaker = tog('oc_mt') === 'm', itm = tog('oc_ex') === 'itm', daily = tog('oc_daily') === 'y';
    var n = px * q, prem = prPer * q, rate = isMaker ? C.opt.maker : C.opt.taker;
    var raw = n * rate / 100, cap = prem * C.opt.cap / 100, fee = Math.min(raw, cap), capped = raw > cap;
    var dRaw = n * C.opt.delivery / 100, dCap = prem * C.opt.deliveryCap / 100;
    var dFee = itm && !daily ? Math.min(dRaw, dCap) : 0;
    var g = gstOn(fee + dFee), tot = fee + dFee + g;
    var h = '';
    h += row('Notional <small>' + inr(px) + ' × ' + q + ' BTC</small>', inr(n));
    h += row(L('Total premium', 'Total premium') + ' <small>' + inr(prPer) + ' × ' + q + '</small>', inr(prem));
    h += row(L('Fee without the cap', 'Fee without the cap') + ' <small>' + rate + '% × notional</small>', inr(raw, 2), 'sub');
    h += row(L('Cap', 'Cap') + ' <small>' + C.opt.cap + '% × premium</small>', inr(cap, 2), 'sub');
    h += row(L('Trading fee (jo kam ho)', 'Trading fee (the lower one)'), inr(fee, 2));
    var dLabel = !itm ? L('OTM expire — koi delivery fee nahi', 'Expired OTM, so no delivery fee')
      : daily ? L('Daily expiry — delivery fee nahi', 'Daily expiry, so no delivery fee')
      : C.opt.delivery + '% ' + L('capped at', 'capped at') + ' ' + C.opt.deliveryCap + '% ' + L('of premium', 'of premium');
    h += row('Delivery fee <small>' + dLabel + '</small>', inr(dFee, 2));
    h += row('GST <small>' + C.gst + '%</small>', inr(g, 2));
    h += row(L('Total fees', 'Total fees'), inr(tot, 2), 'big');
    h += row(L('Premium ka kitna % fees mein', 'Fees as % of premium'), prem ? pct(tot / prem * 100, 2) : '—', 'sub');
    if (capped) h += flag(L('<b>Cap laga.</b> Bina cap ke fee ' + inr(raw, 2) + ' hoti, cap ne ' + inr(cap, 2) + ' pe rok diya. Sasta option khareedne wale ko fees kabhi nahi khaati.',
                            '<b>The cap applied.</b> Without it the fee would be ' + inr(raw, 2) + '; the cap held it at ' + inr(cap, 2) + '. Fees never eat a cheap option.'), 'good');
    else h += flag(L('Cap nahi laga — fee (' + inr(raw, 2) + ') premium ke ' + C.opt.cap + '% (' + inr(cap, 2) + ') se kam hai.',
                     'The cap didn\'t apply: the fee (' + inr(raw, 2) + ') is below ' + C.opt.cap + '% of premium (' + inr(cap, 2) + ').'));
    h += row(L('Agar seller liquidate hua', 'If a seller is liquidated') + ' <small>' + C.opt.liq + '% × notional · ' + L('buyers pe kabhi nahi', 'never buyers') + '</small>', inr(n * C.opt.liq / 100, 2), 'sub');
    h += math([
      'Notional  = ' + inr(px) + ' × ' + q + ' = ' + inr(n),
      'Premium   = ' + inr(prPer) + ' × ' + q + ' = ' + inr(prem),
      'Fee       = min(' + inr(n) + ' × ' + rate + '%, ' + inr(prem) + ' × ' + C.opt.cap + '%) = min(' + inr(raw, 2) + ', ' + inr(cap, 2) + ') = ' + inr(fee, 2),
      'Delivery  = ' + (dFee ? 'min(' + inr(dRaw, 2) + ', ' + inr(dCap, 2) + ') = ' + inr(dFee, 2) : '₹0'),
      'GST       = ' + inr(fee + dFee, 2) + ' × ' + C.gst + '% = ' + inr(g, 2)
    ]);
    $('oc_out').innerHTML = h;
  }

  /* ---------- 05 funding ---------- */
  function fu() {
    var n = num('fu_n'), rate = num('fu_r'), iv = +tog('fu_iv'), hrs = num('fu_h'), side = tog('fu_side');
    $('fu_ro').textContent = (rate > 0 ? '+' : '') + rate.toFixed(3) + '%';
    var count = Math.floor(hrs / iv), per = n * Math.abs(rate) / 100, tot = per * count;
    var longsPay = rate > 0;
    var pays = rate !== 0 && ((side === 'long') === longsPay);
    var h = '';
    if (rate === 0) {
      h += row(L('Funding rate zero', 'Funding rate is zero'), '₹0');
      h += flag(L('Rate zero hai — koi kuch pay nahi karta.', 'At a zero rate nobody pays anything.'));
    } else {
      h += row(L('Kaun pay karta hai', 'Who pays'), longsPay ? 'Longs → Shorts' : 'Shorts → Longs');
      h += row(L('Har settlement pe', 'Per settlement'), inr(per, 2));
      h += row(L('Settlements', 'Settlements') + ' <small>' + hrs + 'h ÷ ' + iv + 'h</small>', count + '');
      h += row(pays ? L('Trader PAY karega', 'Trader PAYS') : L('Trader RECEIVE karega', 'Trader RECEIVES'), (pays ? '−' : '+') + inr(tot, 2).replace('−', ''), pays ? 'big minus' : 'big plus');
      h += row(L('Per din (' + (24 / iv) + ' settlements)', 'Per day (' + (24 / iv) + ' settlements)'), inr(per * 24 / iv, 2), 'sub');
    }
    h += row(L('Niyam ki kamai', 'Niyam earns'), '₹0');
    h += row('GST', '₹0');
    h += row(L('Partner commission', 'Partner commission'), '₹0');
    h += flag(L('Funding ek trader se doosre trader ko jaata hai. Funding time se pehle position close kar do toh na dena, na milna.',
                'Funding flows from one trader to another. Close before the funding time and you neither pay nor receive.'));
    h += math([
      'Per settlement = ' + inr(n) + ' × ' + Math.abs(rate) + '% = ' + inr(per, 2),
      'Settlements    = floor(' + hrs + ' ÷ ' + iv + ') = ' + count,
      'Total          = ' + inr(per, 2) + ' × ' + count + ' = ' + inr(tot, 2)
    ]);
    $('fu_out').innerHTML = h;
  }

  /* ---------- 06 liquidation ---------- */
  function lq() {
    var n = num('lq_n'), lev = Math.max(1, num('lq_l')), cr = num('lq_c'), left = num('lq_left');
    var margin = n / lev, tk = n * C.fut.taker / 100, g = gstOn(tk), clr = n * cr / 100;
    var waived = left < clr, clrCharged = waived ? 0 : clr, tot = tk + g + clrCharged;
    var h = '';
    h += row(L('Margin lagaya tha', 'Margin posted'), inr(margin));
    h += row('Taker fee <small>' + C.fut.taker + '% × notional</small>', inr(tk, 2));
    h += row('GST <small>' + C.gst + '% ' + L('taker fee pe', 'on the taker fee') + '</small>', inr(g, 2));
    h += row('Insurance clearance fee <small>' + cr + '% × notional</small>', waived ? L('Waived', 'Waived') + ' (' + inr(clr) + ')' : inr(clr, 2), waived ? 'plus' : '');
    h += row(L('Liquidation charges total', 'Total liquidation charges'), inr(tot, 2), 'big');
    h += row(L('Trader ka max loss', 'Trader\'s maximum loss'), inr(margin) + ' ' + L('(sirf margin)', '(margin only)'), 'sub');
    h += waived
      ? flag(L('Bacha margin (' + inr(left) + ') clearance fee (' + inr(clr) + ') se kam hai, isliye fee <b>waive</b>. Insurance fund loss uthata hai.',
               'Margin left (' + inr(left) + ') is below the clearance fee (' + inr(clr) + '), so the fee is <b>waived</b> and the insurance fund absorbs the loss.'), 'good')
      : flag(L('Clearance fee Niyam ke paas nahi, <b>Insurance Fund</b> mein jaati hai — jo sab traders ko socialised loss aur ADL se bachata hai. Stop-loss lagao toh yeh fee lagti hi nahi.',
               'The clearance fee doesn\'t go to Niyam; it goes to the <b>Insurance Fund</b>, which protects every trader from socialised losses and ADL. With a stop-loss, this fee never applies.'));
    h += '<p class="note internal" style="margin-bottom:0">' + TBC + ' ' + L('Clearance fee pe GST lagta hai ya nahi — confirm nahi. Yahan GST nahi joda.', 'Whether GST applies to the clearance fee isn\'t confirmed; it isn\'t added here.') + '</p>';
    $('lq_out').innerHTML = h;
  }

  /* ---------- 08 commission waterfall ---------- */
  function cw() {
    var v = num('cw_v'), mk = num('cw_mk'), d = num('cw_d'), s = Math.min(C.shareMax, num('cw_s'));
    $('cw_mko').textContent = mk + '%';
    var rate = blended(mk), gross = v * rate / 100, disc = gross * d / 100, tf = gross - disc, g = gstOn(tf);
    var part = gross * s / 100, niy = tf - part;
    var h = '';
    h += row(L('Blended fee rate', 'Blended fee rate') + ' <small>' + mk + '% maker</small>', pct(rate, 4) + ' · ' + (rate * 100).toFixed(1) + ' bps', 'sub');
    h += row(L('Gross trading fee', 'Gross trading fee'), inr(gross));
    h += row(L('Trader discount', 'Trader discount') + ' <small>' + d + '% · ' + L('Niyam fund karta hai', 'funded by Niyam') + '</small>', '−' + inr(disc).replace('−', ''), 'minus');
    h += row(L('Trader ki fee', 'Fee the trader pays'), inr(tf));
    h += row('GST <small>' + C.gst + '% · ' + L('sarkar ko', 'to the government') + '</small>', inr(g), 'sub');
    h += row(L('Trader ka total kharcha', 'Trader\'s total cost'), inr(tf + g), 'sub');
    h += row(L('Partner commission', 'Partner commission') + ' <small>' + s + '% ' + L('of gross fee', 'of gross fee') + '</small>', inr(part), 'big');
    h += '<div class="internal">' + row(L('Niyam ke paas bacha', 'Niyam retains'), inr(niy), niy < 0 ? 'minus' : '') + '</div>';
    var tot = Math.max(gross, 1);
    h += '<div class="stack" aria-hidden="true">' +
      '<span class="c-disc" style="width:' + (disc / tot * 100) + '%"></span>' +
      '<span class="c-part" style="width:' + (Math.min(part, gross) / tot * 100) + '%"></span>' +
      '<span class="c-niyam internal" style="width:' + (Math.max(niy, 0) / tot * 100) + '%"></span></div>' +
      '<div class="legend"><span><i class="c-disc"></i>' + L('Trader discount', 'Trader discount') + '</span><span><i class="c-part"></i>Partner</span><span class="internal"><i class="c-niyam"></i>Niyam</span></div>';
    if (s > C.share) h += '<div class="internal">' + flag(L('<b>' + s + '% standard (' + C.share + '%) se upar hai</b> — approval chahiye. Affiliate ko promise mat karo.', '<b>' + s + '% is above the standard ' + C.share + '%</b>, so it needs approval. Don\'t promise it to the affiliate.'), 'bad') + '</div>';
    h += math([
      'Gross fee  = ' + inr(v) + ' × ' + rate.toFixed(4) + '% = ' + inr(gross),
      'Discount   = ' + inr(gross) + ' × ' + d + '% = ' + inr(disc),
      'Trader fee = ' + inr(gross) + ' − ' + inr(disc) + ' = ' + inr(tf) + '  (+ GST ' + inr(g) + ')',
      'Partner    = ' + inr(gross) + ' × ' + s + '% = ' + inr(part)
    ]);
    $('cw_out').innerHTML = h;
  }

  /* ---------- 09 earnings projector ---------- */
  function ep() {
    var mode = tog('ep_mode'), su = num('ep_su'), cv = num('ep_cv'), s = num('ep_s');
    var act = Math.round(su * cv / 100);
    $('ep_so').textContent = s + '%';
    var rev, volTrader = 0, lines = [];
    if (mode === 'deck') {
      var a = num('ep_act');
      rev = C.model.m1 + (C.model.m12 - C.model.m1) * a / 100;
      $('ep_acto').textContent = inr(rev) + L(' / trader', ' / trader');
      lines.push('Fees / trader = ' + inr(C.model.m1) + ' + (' + inr(C.model.m12) + ' − ' + inr(C.model.m1) + ') × ' + a + '% = ' + inr(rev));
    } else {
      var mk = num('ep_mk');
      $('ep_mko').textContent = mk + '%';
      var perOrder = num('ep_f') * num('ep_u') / 100 * num('ep_l'), orders = num('ep_rt') * 2;
      volTrader = perOrder * orders;
      rev = volTrader * blended(mk) / 100;
      lines.push('Position   = ' + inr(num('ep_f')) + ' × ' + num('ep_u') + '% × ' + num('ep_l') + 'x = ' + inr(perOrder));
      lines.push('Orders     = ' + num('ep_rt') + ' round trips × 2 = ' + orders);
      lines.push('Volume     = ' + inr(perOrder) + ' × ' + orders + ' = ' + inr(volTrader));
      lines.push('Fees       = ' + inr(volTrader) + ' × ' + blended(mk).toFixed(4) + '% = ' + inr(rev));
    }
    var feesMonth = rev * act, comm = feesMonth * s / 100;
    lines.push('Active     = ' + su + ' × ' + cv + '% = ' + act);
    lines.push('Commission = ' + inr(rev) + ' × ' + act + ' × ' + s + '% = ' + inr(comm) + ' / month');
    var h = '';
    h += row(L('Active traders', 'Active traders') + ' <small>' + su.toLocaleString('en-IN') + ' × ' + cv + '%</small>', act.toLocaleString('en-IN'));
    h += row(L('Fees / active trader / mahina', 'Fees / active trader / month'), inr(rev));
    h += row(L('Kul trading fees / mahina', 'Total trading fees / month'), inrShort(feesMonth));
    h += row(L('Partner commission / mahina', 'Partner commission / month') + ' <small>' + s + '%</small>', inrShort(comm), 'big');
    h += row(L('Per saal', 'Per year'), inrShort(comm * 12), 'plus');
    h += row(L('Per active trader / saal', 'Per active trader / year'), inr(rev * s / 100 * 12), 'sub');
    if (mode === 'build') {
      var volM = volTrader * act;
      h += row(L('Kul volume / mahina', 'Total volume / month'), inrShort(volM) + ' · ' + usd(volM / C.fx), 'sub');
    }
    h += '<div class="tablewrap" style="margin-top:14px"><table class="t" style="min-width:0"><thead><tr><th>' + L('Active traders', 'Active traders') + '</th><th class="num">' + L('Per saal', 'Per year') + '</th></tr></thead><tbody>' +
      [100, 1000, 10000].map(function (k) { return '<tr><td>' + k.toLocaleString('en-IN') + '</td><td class="num">' + inrShort(rev * k * s / 100 * 12) + '</td></tr>'; }).join('') +
      '</tbody></table></div>';
    if (s > C.share) h += '<div class="internal">' + flag(L('<b>' + s + '% share</b> — approval ke bina affiliate ko mat dikhao.', '<b>' + s + '% share</b>: don\'t show this to an affiliate without approval.'), 'bad') + '</div>';
    h += math(lines);
    $('ep_out').innerHTML = h;
  }

  /* ---------- 10 deal desk ---------- */
  function ddCalc(s, volUsd, bps, d, fx) {
    var gross = volUsd * fx * bps / 10000, disc = gross * d / 100, part = gross * s / 100;
    var niy = gross - disc - part;
    return { gross: gross, disc: disc, part: part, niy: niy, niyPct: gross ? niy / gross * 100 : 0 };
  }
  function dd() {
    var s = num('dd_s'), vol = num('dd_vol'), bps = num('dd_bps'), d = num('dd_d'), fx = num('dd_fx');
    $('dd_so').textContent = s + '%';
    var r = ddCalc(s, vol, bps, d, fx);
    var h = '';
    h += row(L('Gross fees / mahina', 'Gross fees / month') + ' <small>' + usd(vol) + ' × ' + bps + ' bps × ₹' + fx + '</small>', inrShort(r.gross));
    h += row(L('Trader discount', 'Trader discount') + ' <small>' + d + '%</small>', '−' + inrShort(r.disc), 'minus');
    h += row('Partner <small>' + s + '%</small>', '−' + inrShort(r.part), 'minus');
    h += row(L('Niyam ke paas', 'Niyam retains'), inrShort(r.niy), 'big ' + (r.niy < 0 ? 'minus' : ''));
    h += row(L('Gross ka %', '% of gross'), pct(r.niyPct, 1), 'sub');
    h += row(L('Partner ko / saal', 'To partner / year'), inrShort(r.part * 12), 'sub');
    var tot = Math.max(r.gross, r.disc + r.part, 1);
    h += '<div class="stack" aria-hidden="true">' +
      '<span class="c-disc" style="width:' + (r.disc / tot * 100) + '%"></span>' +
      '<span class="c-part" style="width:' + (r.part / tot * 100) + '%"></span>' +
      '<span class="' + (r.niy < 0 ? 'c-neg' : 'c-niyam') + '" style="width:' + (Math.abs(r.niy) / tot * 100) + '%"></span></div>' +
      '<div class="legend"><span><i class="c-disc"></i>Discount</span><span><i class="c-part"></i>Partner</span><span><i class="c-niyam"></i>Niyam</span></div>';
    if (r.niy < 0) h += flag(L('<b>Niyam nuksaan mein.</b> Share ya discount kam karo.', '<b>Niyam loses money here.</b> Lower the share or the discount.'), 'bad');
    else if (r.niyPct < 20) h += flag(L('Niyam ke paas gross ka sirf ' + pct(r.niyPct, 1) + ' bachta hai, platform costs se pehle. Volume commitment ke bina mat do.', 'Niyam keeps only ' + pct(r.niyPct, 1) + ' of gross before platform costs. Don\'t offer this without a volume commitment.'), 'bad');
    else h += flag(L('Niyam ke paas gross ka ' + pct(r.niyPct, 1) + ' bachta hai (platform costs se pehle).', 'Niyam keeps ' + pct(r.niyPct, 1) + ' of gross (before platform costs).'), 'good');
    $('dd_out').innerHTML = h;

    var shares = [25, 35, 50, 60, 75], vols = [1e6, 1e7, 5e7];
    var t = '<table class="t"><thead><tr><th>Share</th><th class="num">' + L('Niyam ko (gross ka %)', 'Niyam keeps (% of gross)') + '</th>' +
      vols.map(function (v) { return '<th class="num">' + usd(v) + ' / mo</th>'; }).join('') + '</tr></thead><tbody>';
    shares.forEach(function (sh) {
      var base = ddCalc(sh, 1, bps, d, fx);
      t += '<tr' + (sh === s ? ' style="background:var(--accent-soft)"' : '') + '><td><b>' + sh + '%</b></td>' +
        '<td class="num" style="color:' + (base.niy < 0 ? 'var(--neg)' : 'var(--head)') + '">' + pct(base.niyPct, 1) + '</td>' +
        vols.map(function (v) {
          var x = ddCalc(sh, v, bps, d, fx);
          return '<td class="num"><span style="color:' + (x.niy < 0 ? 'var(--neg)' : 'var(--head)') + '">' + inrShort(x.niy) + '</span><br><small style="color:var(--dim)">' + L('partner ', 'partner ') + inrShort(x.part) + '</small></td>';
        }).join('') + '</tr>';
    });
    t += '</tbody></table>';
    $('dd_matrix').innerHTML = t;
  }

  /* ---------- 02 quiz ---------- */
  var QUIZ = [
    { hi: 'BTC ₹85,00,000 pe hai. Rahul ne <b>Market Buy</b> kiya.', en: 'BTC is at ₹85,00,000. Rahul places a <b>market buy</b>.', a: 't',
      whi: 'Market order hamesha turant match hota hai = taker.', wen: 'A market order always matches instantly, so it\'s taker.' },
    { hi: 'Priya ne ₹84,50,000 pe <b>Limit Buy</b> lagaya, order book mein 1 ghanta wait karke fill hua.', en: 'Priya places a <b>limit buy</b> at ₹84,50,000; it waits in the book for an hour, then fills.', a: 'm',
      whi: 'Order book mein wait kiya = liquidity di = maker.', wen: 'It waited in the book and added liquidity, so it\'s maker.' },
    { hi: 'BTC ₹85,00,000 pe hai. Amit ne ₹85,20,000 pe <b>Limit Buy</b> lagaya.', en: 'BTC is at ₹85,00,000. Amit places a <b>limit buy</b> at ₹85,20,000.', a: 't',
      whi: 'Limit price current price se upar hai, toh turant match ho gaya = taker. Limit order bhi taker ho sakta hai!', wen: 'The limit is above the market, so it matched instantly: taker. Limit orders can be taker too!' },
    { hi: 'Sneha ne <b>Short Sell</b> ka limit order lagaya jo 2 ghante baad fill hua.', en: 'Sneha places a <b>short-sell</b> limit order that fills two hours later.', a: 'm',
      whi: 'Sell ho ya buy, fark nahi padta. Wait kiya = maker.', wen: 'Buy or sell doesn\'t matter. It waited, so it\'s maker.' },
    { hi: 'Vikram ka <b>stop-loss</b> trigger hua aur market order ban gaya.', en: 'Vikram\'s <b>stop-loss</b> triggers and becomes a market order.', a: 't',
      whi: 'Stop-market trigger pe market order ban jaata hai = taker.', wen: 'A stop-market becomes a market order when triggered, so it\'s taker.' },
    { hi: 'Neha ki position <b>liquidate</b> ho gayi.', en: 'Neha\'s position gets <b>liquidated</b>.', a: 't',
      whi: 'Liquidation close = taker fee + insurance clearance fee.', wen: 'A liquidation close pays the taker fee plus the insurance clearance fee.' }
  ];
  function quiz() {
    var box = $('quiz');
    box.innerHTML = QUIZ.map(function (q, i) {
      return '<div class="qz"><p>' + L(q.hi, q.en) + '</p><div class="opts">' +
        '<button type="button" data-q="' + i + '" data-a="m">Maker</button><button type="button" data-q="' + i + '" data-a="t">Taker</button></div>' +
        '<div class="why" hidden>' + L(q.whi, q.wen) + '</div></div>';
    }).join('');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-q]'); if (!b) return;
      var q = QUIZ[+b.dataset.q], card = b.closest('.qz');
      card.querySelectorAll('button').forEach(function (x) {
        x.classList.remove('right', 'wrong');
        if (x.dataset.a === q.a) x.classList.add('right');
      });
      if (b.dataset.a !== q.a) b.classList.add('wrong');
      card.querySelector('.why').hidden = false;
    });
  }

  /* ---------- wiring ---------- */
  var ALL = [pb, fc, oc, fu, lq, cw, ep, dd];
  function renderAll() { syncShows(); ALL.forEach(function (f) { f(); }); }

  function init() {
    // defaults from config so a rate change flows everywhere
    $('cw_d').value = C.disc; $('cw_s').value = C.share; $('cw_s').max = C.shareMax;
    $('ep_s').value = C.share; $('ep_s').max = C.shareMax; $('ep_cv').value = C.model.conv;
    $('dd_s').value = C.share; $('dd_s').max = C.shareMax; $('dd_d').value = C.disc; $('dd_fx').value = C.fx;
    $('pb_l').max = C.maxLev;

    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-tog] button');
      if (b) {
        b.parentElement.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        renderAll(); return;
      }
      var p = e.target.closest('[data-oc]');
      if (p) {
        var v = OC_PRESETS[p.dataset.oc];
        $('oc_px').value = v.px; $('oc_q').value = v.q; $('oc_pr').value = v.pr;
        p.parentElement.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === p ? 'true' : 'false'); });
        oc();
      }
    });
    document.querySelectorAll('.calc input').forEach(function (i) { i.addEventListener('input', renderAll); });
    quiz();
    renderAll();
  }

  window.PBCalc = { init: init, inr: inr, inrShort: inrShort, pct: pct, usd: usd, L: L };
})();
