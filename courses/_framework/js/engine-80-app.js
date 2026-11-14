/* アプリ本体：ルーティング・章ナビ・ドロワー・進捗・テーマ・全文検索・キーボード */
(function () {
  'use strict';
  var h = CN.h, $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var views = [], current = 'home', pendingScroll = null, sideEl, scrim, navbtn;

  /* ---------- テーマ ---------- */
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    var b = $('#themebtn');
    if (b) { b.textContent = t === 'dark' ? '☀' : '☾'; b.setAttribute('aria-label', t === 'dark' ? 'ライトテーマに切り替え' : 'ダークテーマに切り替え'); b.setAttribute('title', t === 'dark' ? 'ライトに切替' : 'ダークに切替'); }
    var m = $('meta[name=theme-color]'), tc = CN.cfg.themeColor || {}; if (m) m.setAttribute('content', t === 'dark' ? (tc.dark || '#0B1F3A') : (tc.light || '#FFFFFF'));
  }

  /* ---------- 進捗 ---------- */
  function numeric() { return (window.CN_CHAPTERS || []).filter(function (c) { return /^\d+$/.test(c.num); }); }
  function readSet() { return CN.store.get('read', {}) || {}; }
  function updateProgress() {
    var rd = readSet(), all = numeric(), ready = all.filter(function (c) { return c.ready; });
    var n = ready.filter(function (c) { return rd[c.num]; }).length, total = ready.length || 1, pct = Math.round(100 * n / total);
    var bar = $('#pbar-i'); if (bar) bar.style.width = pct + '%';
    $$('[data-ch]').forEach(function (a) { var li = a.closest('li'); if (li) li.classList.toggle('done', !!rd[a.getAttribute('data-ch')]); });
    $$('.read[data-read]').forEach(function (b) {
      var on = !!rd[b.getAttribute('data-read')]; b.setAttribute('aria-pressed', String(on)); b.textContent = on ? CN.t('app.readDone') : CN.t('app.read');
    });
    var ring = $('#hero-ring .fg'); if (ring) { var C = 2 * Math.PI * 32; ring.setAttribute('stroke-dasharray', C.toFixed(1)); ring.setAttribute('stroke-dashoffset', (C * (1 - n / total)).toFixed(1)); }
    var rt = $('#hero-ring text'); if (rt) rt.textContent = pct + '%';
    var st = $('#hero-stat'); if (st) st.innerHTML = '<b>読了 ' + n + ' / ' + total + ' 章</b>' + (all.length > ready.length ? '（公開済みの章が対象。準備中 ' + (all.length - ready.length) + ' 章）' : '');
    var rsm = $('#resume'), last = CN.store.get('last', 'home');
    if (rsm) { if (last && last !== 'home' && viewOf(last)) { rsm.hidden = false; rsm.setAttribute('href', '#' + last); rsm.textContent = '続きから読む（' + (viewOf(last).querySelector('.ch-title') ? viewOf(last).querySelector('.ch-title').textContent : last) + '）'; } else rsm.hidden = true; }
    var sc = $('#hero-scores');
    if (sc) {
      CN.clear(sc);
      var qz = CN.store.get('quiz', {}) || {}, keys = Object.keys(qz), s = 0, t = 0; keys.forEach(function (k) { s += qz[k].s; t += qz[k].t; });
      var ex = CN.store.get('exam', null), dr = CN.store.get('drill', {}) || {};
      sc.appendChild(h('li', null, CN.t('quiz.kind') + '：' + (keys.length ? keys.length + ' 件を採点済み（' + s + ' / ' + t + ' 問正解）' : 'まだ受けていません')));
      if (Object.keys(dr).length) { var ds = 0, dt = 0; Object.keys(dr).forEach(function (k) { ds += dr[k].s; dt += dr[k].t; }); sc.appendChild(h('li', null, CN.t('drill.kind') + '：' + ds + ' / ' + dt + ' ケース正解')); }
      sc.appendChild(h('li', null, CN.t('exam.kind') + '：' + (ex ? ex.s + ' / ' + ex.t + ' 問正解（' + (ex.at || '') + '）' : 'まだ受けていません')));
    }
  }
  CN.on('progress', updateProgress);

  /* ---------- 表示切替（ハッシュ） ---------- */
  function viewOf(id) { for (var i = 0; i < views.length; i++) if (views[i].id === id) return views[i]; return null; }
  function route() {
    var id = decodeURIComponent((location.hash || '#home').slice(1)), target = id, anchor = null;
    if (!viewOf(id)) {
      var e = id ? document.getElementById(id) : null, v = e && e.closest('.view');
      if (v) { target = v.id; anchor = e; } else target = 'home';
    }
    show(target);
    if (anchor) setTimeout(function () { anchor.scrollIntoView({ block: 'start' }); }, 30);
    else if (pendingScroll) { var p = pendingScroll; pendingScroll = null; setTimeout(function () { p(); }, 30); }
    else window.scrollTo(0, 0);
  }
  function show(id) {
    current = id;
    views.forEach(function (v) { v.hidden = v.id !== id; });
    var v = viewOf(id);
    if (!v.getAttribute('data-ready')) { v.setAttribute('data-ready', '1'); }
    CN.mount(v);
    $$('.side a[href^="#"]').forEach(function (a) { if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    $$('.side .sub').forEach(function (s) { s.remove(); });
    var cur = $('.side a[aria-current="page"]');
    if (cur && id !== 'home') {
      var hs = $$('h3[id]', v);
      if (hs.length) { var sub = h('div', { 'class': 'sub' }); hs.forEach(function (x) { sub.appendChild(h('a', { href: '#' + x.id }, x.textContent)); }); cur.parentNode.insertBefore(sub, cur.nextSibling); }
      try { cur.scrollIntoView({ block: 'nearest' }); } catch (e) { /* 無視 */ }
    }
    var t = $('.ch-title', v) || $('h1', v);
    document.title = (id === 'home' ? '' : (t ? t.textContent + ' — ' : '')) + (CN.cfg.docTitle || '');
    closeDrawer(true);
    CN.store.set('last', id);
    if (t) { t.setAttribute('tabindex', '-1'); try { t.focus({ preventScroll: true }); } catch (e) { /* 無視 */ } }
  }
  CN.goto = function (ch, elementId) {
    var id = typeof ch === 'number' ? 'ch' + ('0' + ch).slice(-2) : ch;
    var act = function () { var e = elementId && elementId !== id ? document.getElementById(elementId) : null; if (e) e.scrollIntoView({ block: 'start' }); else window.scrollTo(0, 0); };
    if (current === id) act(); else { pendingScroll = act; location.hash = '#' + id; }
  };

  /* ---------- ドロワー ---------- */
  function openDrawer() { sideEl.classList.add('open'); scrim.hidden = false; navbtn.setAttribute('aria-expanded', 'true'); var a = $('.side a', sideEl); if (a) a.focus(); }
  function closeDrawer(quiet) { if (!sideEl.classList.contains('open')) return; sideEl.classList.remove('open'); scrim.hidden = true; navbtn.setAttribute('aria-expanded', 'false'); if (!quiet) navbtn.focus(); }

  /* ---------- 全文検索 ---------- */
  var index = null;
  function norm(s) { return String(s || '').normalize('NFKC').toLowerCase(); }
  function buildIndex() {
    index = [];
    $$('.chapter').forEach(function (ch) {
      if (ch.classList.contains('pending')) return;
      var num = ch.getAttribute('data-ch'), cn = (window.CN_CHAPTERS || []).filter(function (c) { return c.num === num; })[0], label = (/^\d+$/.test(num) ? '第' + num + '章 ' : '') + (cn ? cn.title : '');
      var sec = { ch: num, label: label, heading: cn ? cn.title : '', hid: ch.id, text: [] }, secs = [sec];
      var els = ch.querySelectorAll('h3,h4,p,li,td,th,dd,dt,pre,figcaption,summary,[data-widget]');
      Array.prototype.forEach.call(els, function (e) {
        if (e.closest('.ch-foot') || e.closest('.ch-head')) return;
        var w = e.closest('[data-widget]');
        if (e.hasAttribute('data-widget')) {
          var k = CN.wk(e.getAttribute('data-widget')), src = e.getAttribute('data-src'), f = CN.searchText[k], dt = (CN.data[k] || {})[src];
          if (f && dt) { try { sec.text.push(f(dt)); } catch (x) { /* 無視 */ } }
          return;
        }
        if (w) return;
        if (e.tagName === 'H3' || e.tagName === 'H4') {
          if (!e.id) e.id = ch.id + '-h-' + secs.length;
          sec = { ch: num, label: label, heading: e.textContent, hid: e.id, text: [] }; secs.push(sec);
        } else sec.text.push(e.textContent);
      });
      secs.forEach(function (s) { s.t = norm(s.text.join(' ').replace(/\s+/g, ' ')); s.h = norm(s.heading); s.raw = s.text.join(' ').replace(/\s+/g, ' '); index.push(s); });
    });
    if (CN.cfg.glossaryCh) CN.glossaryItems.forEach(function (g) {
      index.push({ ch: CN.cfg.glossaryCh, label: CN.t('glossary.kind'), heading: g.t + (g.en ? '（' + g.en + '）' : ''), hid: null, term: g.t, t: norm(g.d + ' ' + (g.alias || '')), h: norm(g.t + ' ' + (g.en || '')), raw: g.d });
    });
  }
  function frag(text, toks) {
    var f = document.createDocumentFragment(), low = norm(text), pos = 0;
    // NFKC で長さが変わる文字は稀なので、位置は簡易に原文の小文字化で探す
    var lo = text.toLowerCase(), marks = [];
    toks.forEach(function (t) { var i = lo.indexOf(t); if (i >= 0) marks.push([i, i + t.length]); });
    marks.sort(function (a, b) { return a[0] - b[0]; });
    marks.forEach(function (m) { if (m[0] < pos) return; f.appendChild(document.createTextNode(text.slice(pos, m[0]))); f.appendChild(h('mark', null, text.slice(m[0], m[1]))); pos = m[1]; });
    f.appendChild(document.createTextNode(text.slice(pos)));
    return f;
  }
  function search(qs) {
    if (!index) buildIndex();
    var toks = norm(qs).split(/\s+/).filter(Boolean); if (!toks.length) return { toks: toks, hits: [] };
    var hits = [];
    index.forEach(function (s) {
      var sc = 0;
      for (var i = 0; i < toks.length; i++) {
        var inH = s.h.indexOf(toks[i]) >= 0, inT = s.t.indexOf(toks[i]) >= 0;
        if (!inH && !inT) return;
        sc += inH ? 6 : 1;
      }
      if (s.term) sc += 3;
      hits.push({ s: s, sc: sc });
    });
    hits.sort(function (a, b) { return b.sc - a.sc; });
    return { toks: toks, hits: hits.slice(0, 40) };
  }
  function snippet(s, toks) {
    var raw = s.raw || '', lo = raw.toLowerCase(), at = -1;
    for (var i = 0; i < toks.length && at < 0; i++) at = lo.indexOf(toks[i]);
    if (at < 0) return raw.slice(0, 70);
    var a = Math.max(0, at - 24); return (a ? '…' : '') + raw.slice(a, a + 80) + (raw.length > a + 80 ? '…' : '');
  }
  function renderResults(box, q, onPick) {
    CN.clear(box);
    var r = search(q);
    if (!r.toks.length) { box.hidden = true; return; }
    box.hidden = false;
    if (!r.hits.length) { box.appendChild(h('div', { 'class': 'empty' }, '「' + q + '」に一致する箇所はありません。')); return; }
    r.hits.forEach(function (x) {
      var s = x.s, b = h('button', { 'class': 'rs', type: 'button', role: 'option' }, h('em', null, s.label), h('b', null, frag(s.heading, r.toks)), h('small', null, frag(snippet(s, r.toks), r.toks)));
      b.addEventListener('click', function () { onPick(s); });
      box.appendChild(b);
    });
  }
  function initSearch() {
    var q = $('#q'), box = $('#results');
    function pick(s) {
      box.hidden = true;
      if (s.term) {
        var gid = 'ch' + CN.cfg.glossaryCh;
        var act = function () { var w = $('#' + gid + ' [data-widget="glossary"]'); if (w && w._glFocus) w._glFocus(s.term); };
        if (current === gid) { CN.mount(viewOf(gid)); act(); } else { pendingScroll = act; location.hash = '#' + gid; }
      } else CN.goto('ch' + s.ch, s.hid);
    }
    q.addEventListener('input', function () { renderResults(box, q.value, pick); });
    q.addEventListener('focus', function () { if (q.value.trim()) renderResults(box, q.value, pick); });
    q.addEventListener('keydown', function (e) {
      var items = $$('.rs', box), i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); (items[i + 1] || items[0]) && (items[i + 1] || items[0]).focus(); }
      else if (e.key === 'Enter' && items[0]) { e.preventDefault(); items[0].click(); }
      else if (e.key === 'Escape') { box.hidden = true; }
    });
    box.addEventListener('keydown', function (e) {
      var items = $$('.rs', box), i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); if (items[i + 1]) items[i + 1].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (i > 0) items[i - 1].focus(); else q.focus(); }
      else if (e.key === 'Escape') { box.hidden = true; q.focus(); }
    });
    document.addEventListener('click', function (e) { if (!box.hidden && !e.target.closest('.search') && !e.target.closest('#results')) box.hidden = true; });
  }

  /* ---------- 起動 ---------- */
  CN.boot = function () {
    sideEl = $('#side'); scrim = $('#scrim'); navbtn = $('#navbtn');
    views = $$('.view');
    var th = CN.store.get('theme', 'dark'); setTheme(th === 'light' ? 'light' : 'dark');
    $('#themebtn').addEventListener('click', function () { var t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'; setTheme(t); CN.store.set('theme', t); });
    navbtn.addEventListener('click', function () { if (sideEl.classList.contains('open')) closeDrawer(); else openDrawer(); });
    scrim.addEventListener('click', function () { closeDrawer(); });
    sideEl.addEventListener('keydown', function (e) {
      if (!sideEl.classList.contains('open') || e.key !== 'Tab') return;
      var f = $$('a[href]', sideEl); if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
    $$('.read[data-read]').forEach(function (b) {
      b.addEventListener('click', function () { var k = b.getAttribute('data-read'); CN.store.update('read', function (r) { if (r[k]) delete r[k]; else r[k] = 1; }, {}); updateProgress(); });
    });
    var rs = $('#reset-progress');
    if (rs) rs.addEventListener('click', function () {
      if (!window.confirm(CN.t('app.reset'))) return;
      ['read', 'quiz', 'exam', 'drill'].forEach(function (k) { CN.store.set(k, k === 'exam' ? null : {}); }); updateProgress();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDrawer(); return; }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var t = e.target, tag = t && t.tagName;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || (t && t.isContentEditable)) return;
      if (e.key === '/') { e.preventDefault(); $('#q').focus(); }
      else if (e.key === '[' || e.key === ']') {
        var ids = views.map(function (v) { return v.id; }), i = ids.indexOf(current), j = i + (e.key === ']' ? 1 : -1);
        var step = e.key === ']' ? 1 : -1;
        if (CN.cfg.publish) while (j >= 0 && j < views.length && /\bpending\b/.test(views[j].className)) j += step;   // 公開版：準備中の章は飛ばす
        if (j >= 0 && j < ids.length) location.hash = '#' + ids[j];
      }
    });
    window.addEventListener('hashchange', route);
    initSearch();
    updateProgress();
    route();
  };
})();
