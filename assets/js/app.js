/* Page wiring: rate tokens, language/theme/meeting mode, search, FAQ, glossary. */
(function () {
  'use strict';
  var C = window.PB_CONFIG;
  var K = window.PB_CONTENT || { faqCats: [], faq: [], glossary: [], dontSay: [] };
  var X = window.PBCalc;
  var root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };
  var L = X.L;

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lang() { return root.dataset.lang === 'en' ? 'en' : 'hi'; }
  function pick(o, f) { return lang() === 'en' && o[f + '_en'] ? o[f + '_en'] : o[f]; }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function strip(s) { return String(s || '').replace(/<[^>]+>/g, ''); }

  /* ---------- rate tokens ---------- */
  var R = {
    futMaker: C.fut.maker + '%', futTaker: C.fut.taker + '%',
    optMaker: C.opt.maker + '%', optTaker: C.opt.taker + '%', optCap: C.opt.cap + '%',
    optDelivery: C.opt.delivery + '%', optDeliveryCap: C.opt.deliveryCap + '%', optLiq: C.opt.liq.toFixed(2) + '%',
    gst: C.gst + '%', share: C.share + '%', shareMax: C.shareMax + '%', disc: C.disc + '%',
    minDep: '₹' + C.minDep, maxLev: C.maxLev + 'x', fiuReid: C.fiuReid, updated: C.updated
  };
  var tk = 1e5 * C.fut.taker / 100, mk = 1e5 * C.fut.maker / 100, g = C.gst / 100, M = C.model;
  var EX = {
    tk1L: X.inr(tk), tk1Lg: X.inr(tk * g), tk1Lt: X.inr(tk * (1 + g)), rtTk: X.inr(2 * tk * (1 + g)),
    mk1L: X.inr(mk), mk1Lg: X.inr(mk * g), mk1Lt: X.inr(mk * (1 + g)), rtMk: X.inr(2 * mk * (1 + g)),
    rtTkPctG: X.pct(2 * C.fut.taker * (1 + g), 3),
    mFut: X.inr(M.futFees), mFutD: M.futOrders + ' orders × ₹' + M.futAvgFee,
    mOpt: X.inr(M.optFees), mOptD: M.optPart + '% traders · ' + M.optOrders + ' orders × ₹' + M.optAvgFee,
    m12yr: X.inr(M.m12 * C.share / 100 * 12), m1yr: X.inr(M.m1 * C.share / 100 * 12), conv: M.conv + '%'
  };
  function tokens(s) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return R[k] != null ? R[k] : m; }); }
  function fillTokens() {
    document.querySelectorAll('[data-r]').forEach(function (el) { el.textContent = R[el.dataset.r] != null ? R[el.dataset.r] : '?'; });
    document.querySelectorAll('[data-x]').forEach(function (el) { el.textContent = EX[el.dataset.x] != null ? EX[el.dataset.x] : '?'; });
    $('srcList').textContent = C.sources.join(' · ');
  }

  /* ---------- controls ---------- */
  var PH = {
    q: { hi: 'Affiliate ne kya puchha? jaise funding, maker, payout…', en: 'What did the affiliate ask? e.g. funding, maker, payout…' },
    faq_q: { hi: 'FAQ mein dhoondo…', en: 'Filter questions…' },
    gl_q: { hi: 'Shabd dhoondo…', en: 'Find a term…' }
  };
  function setLang(l) {
    root.dataset.lang = l; root.lang = l === 'en' ? 'en' : 'hi-Latn'; store('pb-lang', l);
    document.querySelectorAll('[data-setlang]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.setlang === l ? 'true' : 'false'); });
    Object.keys(PH).forEach(function (id) { $(id).placeholder = PH[id][l]; });
    renderFaq(); renderGloss();
    if (!$('results').hidden) search();
  }
  function setMeeting(on) {
    root.dataset.meeting = on ? 'on' : 'off';
    $('meetingBtn').setAttribute('aria-pressed', on ? 'true' : 'false');
    renderFaq();
  }

  /* ---------- FAQ ---------- */
  var faqCat = 'all';
  function catLabel(id) { var c = K.faqCats.filter(function (x) { return x.id === id; })[0]; return c ? pick(c, 'label') : id; }
  function faqHtml(f) {
    var more = pick(f, 'more');
    return '<details class="faq' + (f.internal ? ' internal' : '') + '" id="faq-' + f.id + '">' +
      '<summary><span class="qq">' + tokens(pick(f, 'q')) + (f.tbc ? ' <span class="tbc" title="Not confirmed yet">TBC</span>' : '') + (f.internal ? ' <span class="pill int">internal</span>' : '') + '</span>' +
      '<span class="cat">' + esc(catLabel(f.cat)) + '</span></summary>' +
      '<div class="ans"><div class="say"><span class="who">' + L('Bolo', 'Say') + '</span><p>' + tokens(pick(f, 'a')) + '</p></div>' +
      (more ? '<div class="more">' + tokens(more) + '</div>' : '') +
      (f.see ? '<p style="margin:10px 0 0"><a class="jump" href="#' + f.see + '">' + L('Section dekho →', 'Go to section →') + '</a></p>' : '') +
      '</div></details>';
  }
  function faqMatch(f, q) {
    if (!q) return true;
    var hay = [f.q, f.q_en, f.a, f.a_en, f.more, f.more_en, (f.tags || []).join(' ')].map(strip).join(' ').toLowerCase();
    return q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
  }
  function renderFaq() {
    var meeting = root.dataset.meeting === 'on';
    var cats = [{ id: 'all', label: 'Sab', label_en: 'All' }].concat(K.faqCats);
    $('faqCats').innerHTML = cats.map(function (c) {
      var n = c.id === 'all' ? K.faq.filter(function (f) { return !(meeting && f.internal); }).length
        : K.faq.filter(function (f) { return f.cat === c.id && !(meeting && f.internal); }).length;
      return '<button class="chip" type="button" data-cat="' + c.id + '" aria-pressed="' + (faqCat === c.id) + '">' + esc(pick(c, 'label')) + ' <span style="opacity:.6">' + n + '</span></button>';
    }).join('');
    var q = $('faq_q').value.trim();
    var list = K.faq.filter(function (f) { return (faqCat === 'all' || f.cat === faqCat) && faqMatch(f, q) && !(meeting && f.internal); });
    $('faqList').innerHTML = list.map(faqHtml).join('') || '<p class="note">' + L('Kuch nahi mila. Upar global search try karo.', 'Nothing matched. Try the search in the top bar.') + '</p>';
    $('faqCount').innerHTML = L(list.length + ' sawaal', list.length + ' questions');
  }

  /* ---------- glossary ---------- */
  function renderGloss() {
    var q = $('gl_q').value.trim().toLowerCase();
    var items = K.glossary.slice().sort(function (a, b) { return a.term.localeCompare(b.term); })
      .filter(function (x) { return !q || [x.term, x.a, x.a_en].join(' ').toLowerCase().indexOf(q) > -1; });
    $('glossList').innerHTML = items.map(function (x) {
      var ex = pick(x, 'ex');
      return '<div class="gl" id="gl-' + slug(x.term) + '"><dt>' + esc(x.term) + '</dt><dd>' + tokens(pick(x, 'a')) +
        (ex ? '<span class="ex">' + tokens(ex) + '</span>' : '') +
        (x.see ? ' <a class="jump" href="#' + x.see + '" style="font-size:12.5px">→</a>' : '') + '</dd></div>';
    }).join('');
  }

  function renderStatic() {
    $('dontSay').innerHTML = (K.dontSay || []).map(function (d) {
      return '<div class="dd"><div class="bad"><span class="tag">' + L('Mat bolo', 'Don\'t say') + '</span>' + tokens(pick(d, 'bad')) + '</div>' +
        '<div class="good"><span class="tag">' + L('Bolo', 'Say') + '</span>' + tokens(pick(d, 'good')) + '</div>' +
        (d.why ? '<div class="why">' + tokens(pick(d, 'why')) + '</div>' : '') + '</div>';
    }).join('');
    $('openList').innerHTML = C.openItems.map(function (o) { return '<tr><td><b>' + esc(o.k) + '</b></td><td>' + esc(o.v) + '</td></tr>'; }).join('');
  }

  /* ---------- global search ---------- */
  var hits = [], sel = -1;
  function buildIndex() {
    var idx = [];
    document.querySelectorAll('.sec').forEach(function (s) {
      var h = s.querySelector('h2');
      idx.push({ kind: 'sec', id: s.id, internal: s.classList.contains('internal'),
        t_hi: strip((h.querySelector('.hi') || h).innerHTML), t_en: strip((h.querySelector('.en') || h).innerHTML),
        d_hi: strip((s.querySelector('.lead.hi') || {}).innerHTML), d_en: strip((s.querySelector('.lead.en') || {}).innerHTML),
        hay: (s.id + ' ' + s.textContent).toLowerCase().slice(0, 4000) });
    });
    K.faq.forEach(function (f) {
      idx.push({ kind: 'faq', id: f.id, internal: !!f.internal, t_hi: tokens(f.q), t_en: tokens(f.q_en || f.q), d_hi: strip(tokens(f.a)), d_en: strip(tokens(f.a_en || f.a)),
        key: [f.q, f.q_en, (f.tags || []).join(' ')].join(' ').toLowerCase(),
        hay: strip([f.q, f.q_en, f.a, f.a_en, f.more, f.more_en, (f.tags || []).join(' ')].join(' ')).toLowerCase() });
    });
    K.glossary.forEach(function (x) {
      idx.push({ kind: 'gl', id: slug(x.term), t_hi: x.term, t_en: x.term, d_hi: strip(tokens(x.a)), d_en: strip(tokens(x.a_en || x.a)),
        key: x.term.toLowerCase(), hay: [x.term, x.a, x.a_en].join(' ').toLowerCase() });
    });
    return idx;
  }
  var INDEX = [];
  function score(it, words) {
    var s = 0;
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (it.hay.indexOf(w) < 0) return 0;
      if (it.key && it.key.indexOf(w) > -1) s += 3;
      if ((it.t_hi + ' ' + it.t_en).toLowerCase().indexOf(w) > -1) s += 2;
      s += 1;
    }
    return s + (it.kind === 'gl' && it.key === words.join(' ') ? 10 : 0) + (it.kind === 'faq' ? 0.5 : 0);
  }
  function hl(text, words) {
    var t = esc(text);
    words.forEach(function (w) { if (w.length > 1) t = t.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
    return t;
  }
  function search() {
    var q = $('q').value.trim().toLowerCase(), box = $('results');
    if (!q) { box.hidden = true; return; }
    var words = q.split(/\s+/), meeting = root.dataset.meeting === 'on', l = lang();
    hits = INDEX.map(function (it) { return { it: it, s: (meeting && it.internal) ? 0 : score(it, words) }; })
      .filter(function (h) { return h.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 12).map(function (h) { return h.it; });
    sel = hits.length ? 0 : -1;
    var kinds = { sec: L('Section', 'Section'), faq: 'FAQ', gl: 'Glossary' };
    box.innerHTML = hits.length ? hits.map(function (it, i) {
      return '<button type="button" role="option" data-i="' + i + '" aria-selected="' + (i === sel) + '"><span class="rk">' + kinds[it.kind] + '</span>' +
        '<span class="rq">' + hl(it['t_' + l], words) + '</span><span class="ra">' + hl(it['d_' + l] || '', words) + '</span></button>';
    }).join('') : '<div class="empty">' + L('Kuch nahi mila. Doosre shabd try karo — jaise "fee", "payout", "tax".', 'No matches. Try another word, such as "fee", "payout" or "tax".') + '</div>';
    box.hidden = false;
  }
  function go(it) {
    $('results').hidden = true; $('q').blur();
    var el;
    if (it.kind === 'faq') {
      faqCat = 'all'; $('faq_q').value = ''; renderFaq();
      el = $('faq-' + it.id); if (el) el.open = true;
    } else if (it.kind === 'gl') {
      $('gl_q').value = ''; renderGloss(); el = $('gl-' + it.id);
    } else el = $(it.id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: it.kind === 'sec' ? 'start' : 'center' });
    if (it.kind !== 'sec') { el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }
  }
  function moveSel(d) {
    if (!hits.length) return;
    sel = (sel + d + hits.length) % hits.length;
    $('results').querySelectorAll('button').forEach(function (b, i) { b.setAttribute('aria-selected', i === sel ? 'true' : 'false'); if (i === sel) b.scrollIntoView({ block: 'nearest' }); });
  }

  /* ---------- scroll spy ---------- */
  function spy() {
    var links = {};
    document.querySelectorAll('#tocList a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === e.target.id); });
        var a = links[e.target.id], toc = a && a.closest('.toc');
        if (a && toc && toc.scrollWidth > toc.clientWidth) toc.scrollTo({ left: a.parentElement.offsetLeft - 16, behavior: 'smooth' });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.sec').forEach(function (s) { obs.observe(s); });
    window.addEventListener('scroll', function () { $('totop').classList.toggle('show', window.scrollY > 900); }, { passive: true });
  }

  /* ---------- print ---------- */
  var reopen = [];
  window.addEventListener('beforeprint', function () {
    reopen = [];
    if (root.dataset.print !== 'cheat') document.querySelectorAll('details.faq:not([open])').forEach(function (d) { d.open = true; reopen.push(d); });
  });
  window.addEventListener('afterprint', function () { reopen.forEach(function (d) { d.open = false; }); delete root.dataset.print; });

  /* ---------- init ---------- */
  function init() {
    fillTokens();
    X.init();
    renderStatic();
    INDEX = buildIndex();
    setLang(lang());
    spy();

    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-setlang]'); if (b) { setLang(b.dataset.setlang); return; }
      var c = e.target.closest('#faqCats [data-cat]'); if (c) { faqCat = c.dataset.cat; renderFaq(); return; }
      var r = e.target.closest('#results [data-i]'); if (r) { go(hits[+r.dataset.i]); return; }
      if (!e.target.closest('.search')) $('results').hidden = true;
    });
    $('meetingBtn').addEventListener('click', function () { setMeeting(root.dataset.meeting !== 'on'); });
    $('themeBtn').addEventListener('click', function () {
      var t = root.dataset.theme === 'light' ? 'dark' : 'light'; root.dataset.theme = t; store('pb-theme', t);
    });
    $('printCheat').addEventListener('click', function () { root.dataset.print = 'cheat'; window.print(); });
    $('printAll').addEventListener('click', function () { window.print(); });
    $('totop').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    $('faq_q').addEventListener('input', renderFaq);
    $('gl_q').addEventListener('input', renderGloss);
    $('q').addEventListener('input', search);
    $('q').addEventListener('focus', function () { if ($('q').value.trim()) search(); });
    $('q').addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveSel(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveSel(-1); }
      else if (e.key === 'Enter' && sel > -1) { e.preventDefault(); go(hits[sel]); }
      else if (e.key === 'Escape') { $('results').hidden = true; $('q').blur(); }
    });
    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (e.key === '/' && tag !== 'input' && tag !== 'textarea' && tag !== 'select') { e.preventDefault(); $('q').focus(); $('q').select(); }
    });
    if (!window.PB_CONTENT) $('faqList').innerHTML = '<p class="warn">content.js failed to load.</p>';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
