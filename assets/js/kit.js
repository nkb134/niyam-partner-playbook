/* Partner Kit wiring. Reads only rates.js (PB_RATES) and kit-content.js (KIT). */
(function () {
  'use strict';
  var C = window.PB_RATES;
  var K = window.KIT;
  var root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lang() { return root.dataset.lang === 'en' ? 'en' : 'hi'; }
  function pick(o, f) { return lang() === 'en' && o[f + '_en'] ? o[f + '_en'] : o[f]; }
  function L(hi, en) { return '<span class="hi">' + hi + '</span><span class="en">' + (en == null ? hi : en) + '</span>'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function inr(x, dp) {
    if (dp == null) dp = Math.abs(x) < 100 && x % 1 !== 0 ? 2 : 0;
    return '₹' + Math.abs(x).toLocaleString('en-IN', { minimumFractionDigits: dp, maximumFractionDigits: dp });
  }
  function pct(x, dp) { return x.toLocaleString('en-IN', { maximumFractionDigits: dp == null ? 2 : dp }) + '%'; }

  /* ---------- rate tokens (same names as the playbook) ---------- */
  var g = C.gst / 100, tk = 1e5 * C.fut.taker / 100, mk = 1e5 * C.fut.maker / 100;
  var disclaimer = (lang() === 'hi' && C.disclaimer.hi) || C.disclaimer.en;
  var R = {
    futMaker: C.fut.maker + '%', futTaker: C.fut.taker + '%',
    optMaker: C.opt.maker + '%', optTaker: C.opt.taker + '%', optCap: C.opt.cap + '%',
    optDelivery: C.opt.delivery + '%', optDeliveryCap: C.opt.deliveryCap + '%',
    gst: C.gst + '%', share: C.share + '%', maxLev: C.maxLev + 'x', fiuReid: C.fiuReid,
    entity: C.entity, updated: C.updated, disclosure: C.disclosure, disclaimer: disclaimer,
    tk1L: inr(tk), tk1Lg: inr(tk * g), mk1L: inr(mk),
    rtTk: inr(2 * tk * (1 + g)), rtMk: inr(2 * mk * (1 + g)), rtTkPctG: pct(2 * C.fut.taker * (1 + g), 3)
  };
  Object.keys(C.sla).forEach(function (k) { R[k] = C.sla[k]; });
  function tokens(s) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return R[k] != null ? R[k] : m; }); }

  /* ---------- copy ---------- */
  function copy(text, btn) {
    function done() {
      if (!btn) return;
      btn.classList.add('done');
      setTimeout(function () { btn.classList.remove('done'); }, 1400);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
    } else { fallback(text); done(); }
  }
  function fallback(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* ---------- library ---------- */
  var chan = 'all', builtLink = '', baseLink = null;
  var CH = { wa: 'wa', ig: 'ig', yt: 'yt', x: 'x', email: 'email', offline: 'qr' };
  function slug(s) { return String(s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function track(ch, asset, lg) {
    var u = new URL(baseLink.toString());
    u.searchParams.set('sub', ch + '-' + asset);
    u.searchParams.set('utm_source', 'partner');
    u.searchParams.set('utm_medium', ch);
    u.searchParams.set('utm_campaign', slug($('lb_camp').value) || 'general');
    u.searchParams.set('utm_content', asset + '-' + lg);
    return u.toString();
  }
  // Each library post gets its own tracked link, so the dashboard shows which post worked.
  function linkFor(item) { return baseLink ? track(CH[item.ch] || item.ch, item.id, lang() === 'en' ? 'en' : 'hinglish') : '[your link]'; }
  function compose(item) {
    var body = tokens(pick(item, 't')).replace(/\{link\}/g, linkFor(item));
    if (item.fmt === 'script') return body;
    return C.disclosure + ' · Paid partnership with Niyam\n' + R.disclaimer + '\n\n' + body +
      '\n\nNiyam Exchange · ' + C.entity + ' · niyam.exchange';
  }
  function chanLabel(id) { var c = K.channels.filter(function (x) { return x.id === id; })[0]; return c ? c.t : id; }
  function renderLibrary() {
    $('chanBar').innerHTML = K.channels.map(function (c) {
      var n = c.id === 'all' ? K.library.length : K.library.filter(function (x) { return x.ch === c.id; }).length;
      return n ? '<button class="chip" type="button" data-chan="' + c.id + '" aria-pressed="' + (chan === c.id) + '">' + esc(c.t) + ' <span style="opacity:.6">' + n + '</span></button>' : '';
    }).join('');
    $('libList').innerHTML = K.library.filter(function (x) { return chan === 'all' || x.ch === chan; }).map(function (x) {
      return '<div class="tpl" id="lib-' + x.id + '"><div class="tpl-hd"><h4>' + esc(pick(x, 'title')) + '</h4><span class="pill">' + esc(chanLabel(x.ch)) + '</span></div>' +
        '<pre class="tpl-body">' + esc(compose(x)) + '</pre>' +
        '<div class="tpl-ft"><span>' + L('Reviewed', 'Reviewed') + ' ' + esc(x.reviewed) + '</span>' +
        '<button class="btn sm" type="button" data-copylib="' + x.id + '">' + L('Copy karo', 'Copy') + '</button></div></div>';
    }).join('');
  }

  /* ---------- link builder ---------- */
  function buildLink() {
    var raw = $('lb_link').value.trim(), out = $('lb_out'), note = $('lb_note');
    store('kit-link', raw);
    builtLink = ''; baseLink = null; $('qrWrap').hidden = true;
    if (!raw) {
      out.textContent = '—';
      note.innerHTML = L('Upar apna referral link paste karo.', 'Paste your referral link above.');
      renderLibrary(); return;
    }
    var u;
    try { u = new URL(raw); } catch (e) { u = null; }
    if (!u || !/^https?:$/.test(u.protocol)) {
      out.textContent = '—';
      note.innerHTML = L('Ye poora link nahi lagta. Dashboard se poora link copy karo (https:// se shuru).', 'That doesn’t look like a full link. Copy the whole link from your dashboard (starting with https://).');
      renderLibrary(); return;
    }
    baseLink = u;
    builtLink = track($('lb_ch').value, $('lb_asset').value, $('lb_lang').value);
    out.textContent = builtLink;
    note.innerHTML = L('Library ke har post mein ab uska apna tracked link lag gaya hai.', 'Every post in the library now carries its own tracked link.');
    renderQR();
    renderLibrary();
  }
  function renderQR() {
    var box = $('qrBox');
    box.innerHTML = '';
    if (!builtLink || typeof window.QRCode !== 'function') return;
    try {
      new window.QRCode(box, { text: builtLink, width: 156, height: 156, correctLevel: window.QRCode.CorrectLevel.M });
      $('qrWrap').hidden = false;
    } catch (e) { $('qrWrap').hidden = true; }
  }
  function downloadQR() {
    var box = $('qrBox'), c = box.querySelector('canvas'), img = box.querySelector('img');
    var src = c ? c.toDataURL('image/png') : (img && img.src);
    if (!src) return;
    var a = document.createElement('a');
    a.href = src; a.download = 'niyam-qr-' + (slug($('lb_camp').value) || 'link') + '.png';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  /* ---------- static sections ---------- */
  function renderStatic() {
    var done = [];
    try { done = JSON.parse(read('kit-check') || '[]'); } catch (e) { done = []; }
    $('checklist').innerHTML = K.checklist.map(function (c, i) {
      return '<li><label><input type="checkbox" data-check="' + i + '"' + (done.indexOf(i) > -1 ? ' checked' : '') + '><span>' + esc(pick(c, 't')) + '</span></label></li>';
    }).join('');
    updateProgress();
    $('timeline').innerHTML = K.timeline.map(function (t) {
      return '<li><span class="d">' + tokens(t.d) + (t.note ? ' <span style="opacity:.7">(' + esc(t.note) + ')</span>' : '') + '</span>' + tokens(pick(t, 't')) + '</li>';
    }).join('');
    $('earnsList').innerHTML = K.earns.map(function (e) {
      return '<tr><td>' + esc(pick(e, 't')) + '</td><td class="' + (e.ok ? 'yes">✓' : 'no">✗') + '</td></tr>';
    }).join('');
    $('discText').textContent = R.disclaimer;
    $('discText2').textContent = R.disclaimer;
    $('discFoot').textContent = R.disclaimer;
    $('placeList').innerHTML = K.placement.map(function (p) {
      return '<tr><td><b>' + esc(pick(p, 'm') || p.m) + '</b></td><td>' + esc(pick(p, 'r')) + '</td></tr>';
    }).join('');
    $('neverList').innerHTML = K.never.map(function (d) {
      return '<div class="dd"><div class="bad"><span class="tag">' + L('Mat likho', 'Don’t write') + '</span>' + tokens(esc(pick(d, 'bad'))) + '</div>' +
        '<div class="good"><span class="tag">' + L('Ye likho', 'Write') + '</span>' + tokens(esc(pick(d, 'good'))) + '</div></div>';
    }).join('');
    $('dontList').innerHTML = K.dont.map(function (d) { return '<li>' + pick(d, 't') + '</li>'; }).join('');
    $('sebiText').innerHTML = pick(K.sebi, 't');
    $('ladderList').innerHTML = K.ladder.map(function (d) { return '<li>' + tokens(pick(d, 't')) + '</li>'; }).join('');
    $('modList').innerHTML = K.modules.map(function (m, i) {
      return '<tr><td class="num">' + (i + 1) + '</td><td><b>' + esc(pick(m, 't')) + '</b></td><td>' + esc(pick(m, 'd')) + '</td></tr>';
    }).join('');
    $('runList').innerHTML = K.runsheet.map(function (r) { return '<li>' + esc(pick(r, 't')) + '</li>'; }).join('');
    $('metricList').innerHTML = K.metrics.map(function (m) { return '<tr><td><b>' + esc(m.k) + '</b></td><td>' + esc(pick(m, 't')) + '</td></tr>'; }).join('');
    $('kitFaq').innerHTML = K.faqGroups.map(function (gr) {
      return '<h3>' + esc(pick(gr, 't')) + '</h3>' + K.faq.filter(function (f) { return f.g === gr.id; }).map(function (f) {
        return '<details class="faq"><summary><span class="qq">' + tokens(esc(pick(f, 'q'))) + '</span></summary><div class="ans"><p style="margin:0">' + tokens(esc(pick(f, 'a'))) + '</p></div></details>';
      }).join('');
    }).join('');
    $('supportList').innerHTML = K.support.map(function (s) {
      return '<div class="card card-pad"><h4>' + esc(s.who) + '</h4><p style="margin:8px 0 0;font-size:14.5px">' + esc(pick(s, 't')) + '</p></div>';
    }).join('');
    $('changeList').innerHTML = K.changelog.map(function (c) {
      return '<tr><td class="num">' + esc(c.v) + '</td><td>' + esc(c.d) + '</td><td>' + esc(pick(c, 't')) + '</td></tr>';
    }).join('');
    $('lb_asset').innerHTML = K.library.map(function (x) { return '<option value="' + x.id + '">' + esc(pick(x, 'title')) + '</option>'; }).join('') +
      '<option value="other">' + (lang() === 'en' ? 'Other / my own post' : 'Other / apna post') + '</option>';
  }
  function updateProgress() {
    var boxes = document.querySelectorAll('[data-check]'), n = 0, ids = [];
    boxes.forEach(function (b) { if (b.checked) { n++; ids.push(+b.dataset.check); } });
    store('kit-check', JSON.stringify(ids));
    $('checkProgress').textContent = n + ' / ' + boxes.length;
  }

  /* ---------- controls ---------- */
  function setLang(l) {
    root.dataset.lang = l; root.lang = l === 'en' ? 'en' : 'hi-Latn'; store('pb-lang', l);
    document.querySelectorAll('[data-setlang]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.setlang === l ? 'true' : 'false'); });
    R.disclaimer = (l === 'hi' && C.disclaimer.hi) || C.disclaimer.en;
    var asset = $('lb_asset').value;
    renderStatic();
    if (asset) $('lb_asset').value = asset;
    renderLibrary();
  }
  function fill() {
    document.querySelectorAll('[data-r]').forEach(function (el) { el.textContent = R[el.dataset.r] != null ? R[el.dataset.r] : '?'; });
    document.querySelectorAll('[data-x]').forEach(function (el) { el.textContent = R[el.dataset.x] != null ? R[el.dataset.x] : '?'; });
    document.querySelectorAll('[data-k]').forEach(function (el) { el.textContent = K[el.dataset.k] != null ? K[el.dataset.k] : '?'; });
    $('draftbar').hidden = K.status !== 'draft';
  }
  function spy() {
    var links = {};
    document.querySelectorAll('#tocList a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    if (!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === e.target.id); });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.sec').forEach(function (s) { obs.observe(s); });
    window.addEventListener('scroll', function () { $('totop').classList.toggle('show', window.scrollY > 900); }, { passive: true });
  }

  function init() {
    fill();
    $('lb_link').value = read('kit-link') || '';
    setLang(lang());
    buildLink();
    spy();
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-setlang]'); if (b) { setLang(b.dataset.setlang); return; }
      var c = e.target.closest('[data-chan]'); if (c) { chan = c.dataset.chan; renderLibrary(); return; }
      var l = e.target.closest('[data-copylib]');
      if (l) { var item = K.library.filter(function (x) { return x.id === l.dataset.copylib; })[0]; if (item) copy(compose(item), l); return; }
      var t = e.target.closest('[data-copytext]'); if (t) { copy(R[t.dataset.copytext], t); return; }
    });
    document.addEventListener('change', function (e) { if (e.target.matches('[data-check]')) updateProgress(); });
    ['lb_link', 'lb_camp'].forEach(function (id) { $(id).addEventListener('input', buildLink); });
    ['lb_ch', 'lb_asset', 'lb_lang'].forEach(function (id) { $(id).addEventListener('change', buildLink); });
    $('lb_copy').addEventListener('click', function () { if (builtLink) copy(builtLink, $('lb_copy')); });
    $('qr_dl').addEventListener('click', downloadQR);
    $('themeBtn').addEventListener('click', function () {
      var th = root.dataset.theme === 'light' ? 'dark' : 'light'; root.dataset.theme = th; store('pb-theme', th);
    });
    $('printCard').addEventListener('click', function () { root.dataset.print = 'card'; window.print(); });
    window.addEventListener('afterprint', function () { delete root.dataset.print; });
    $('totop').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
