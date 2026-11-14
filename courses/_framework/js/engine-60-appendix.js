/* 付録の部品：用語集 glossary（検索つき）／ 対比表 compare（2 列の対応・比較。列名はデータで指定）／ 対応表 mapping（CN.mapping で章ごとに行を足す対比表） */
(function () {
  'use strict';
  var h = CN.h;

  /* ================= 用語集 ================= */
  CN.widgets.glossary = function (el) {
    var T = function (k) { return CN.t(k); };
    var coll = (window.Intl && Intl.Collator) ? new Intl.Collator('ja') : { compare: function (a, b) { return a < b ? -1 : a > b ? 1 : 0; } };
    var items = CN.glossaryItems.map(function (g, i) { return { g: g, i: i }; }).sort(function (a, b) { return coll.compare(a.g.t, b.g.t); });
    CN.frame(el, T('glossary.kind'), T('glossary.title'));
    var body = h('div', { 'class': 'wg-body' }), cnt = h('span', { 'class': 'gl-count', role: 'status' });
    var inp = h('input', { type: 'search', placeholder: T('glossary.search'), 'aria-label': T('glossary.kind') + 'の絞り込み' });
    body.appendChild(h('div', { 'class': 'gl-tools' }, inp, cnt));
    var ul = h('ul', { 'class': 'gl-list' }); body.appendChild(ul); el.appendChild(body);
    var lis = items.map(function (o) {
      var g = o.g, li = h('li', { id: 'gl-' + o.i, 'data-term': g.t });
      li.appendChild(h('span', { 'class': 't' }, g.t));
      if (g.en) li.appendChild(h('span', { 'class': 'en' }, g.en));
      li.appendChild(CN.richEl('div', '', g.d));
      if (g.ch && g.ch.length) { var c = h('div', { 'class': 'chs' }, '関連：'); g.ch.forEach(function (n, k) { if (k) c.appendChild(document.createTextNode('、')); var s = CN.pad2(n), cc = (window.CN_CHAPTERS || []).filter(function (x) { return x.num === s; })[0]; c.appendChild(CN.cfg.publish && cc && !cc.ready ? h('span', { 'class': 'pend-link' }, '第' + s + '章（準備中）') : h('a', { href: '#ch' + s }, '第' + s + '章')); }); li.appendChild(c); }
      ul.appendChild(li); return { li: li, key: (g.t + ' ' + (g.en || '') + ' ' + g.d + ' ' + (g.alias || '')).toLowerCase() };
    });
    function filter() {
      var q = inp.value.trim().toLowerCase().split(/\s+/).filter(Boolean), n = 0;
      lis.forEach(function (o) { var ok = q.every(function (t) { return o.key.indexOf(t) >= 0; }); o.li.hidden = !ok; if (ok) n++; });
      cnt.textContent = n + ' / ' + lis.length + ' 語';
    }
    inp.addEventListener('input', filter); filter();
    el._glFocus = function (term) {
      inp.value = ''; filter();
      for (var i = 0; i < lis.length; i++) if (lis[i].li.getAttribute('data-term') === term) {
        lis[i].li.scrollIntoView({ block: 'center', behavior: CN.reduced() ? 'auto' : 'smooth' });
        lis[i].li.classList.remove('flash'); void lis[i].li.offsetWidth; lis[i].li.classList.add('flash'); return;
      }
    };
  };

  /* ================= 2 列の対比表（compare / mapping の共通の描画） =================
     spec: { kindLabel, title, colA, colB, colNote, noNote, cats: [{ key, label, rows: [{a, b, note, ch}] }], note, empty, T } */
  function compareTable(el, spec) {
    var T = spec.T, cats = spec.cats, cur = 0, q = '';
    var tabs = cats.length > 1 ? CN.tabs(cats.map(function (c, i) { return { key: i, label: c.label }; }), 0, function (k) { cur = k; draw(); }, '種別の選択') : null;
    CN.frame(el, spec.kindLabel, spec.title, tabs);
    var body = h('div', { 'class': 'wg-body' }), inp = h('input', { type: 'search', placeholder: T('table.search'), 'aria-label': spec.title + ' の検索' });
    var wrap = h('div', { 'class': 'tbl-wrap' }), cnt = h('span', { 'class': 'gl-count', role: 'status' });
    body.appendChild(h('div', { 'class': 'gl-tools' }, inp, cnt)); body.appendChild(wrap);
    if (spec.note) body.appendChild(CN.richEl('p', 'idn-sum', spec.note));
    el.appendChild(body);
    inp.addEventListener('input', function () { q = inp.value.trim().toLowerCase(); draw(); });
    function draw() {
      var all = (cats[cur] && cats[cur].rows) || [];
      var rows = all.filter(function (r) { return !q || [r.a, r.b, r.note].join(' ').toLowerCase().indexOf(q) >= 0; });
      CN.clear(wrap);
      var tb = h('tbody'), hasNote = !spec.noNote, hasCh = all.some(function (r) { return r.ch && r.ch.length; }) || spec.forceCh;
      rows.forEach(function (r) {
        var tr = h('tr', null, h('th', { scope: 'row' }, r.a), h('td', null, r.b));
        if (hasNote) { var t = h('td'); t.innerHTML = CN.rich(r.note || ''); tr.appendChild(t); }
        if (hasCh) { var chs = h('td'); (r.ch || []).forEach(function (n, k) { if (k) chs.appendChild(document.createTextNode(' ')); chs.appendChild(CN.chLink(n)); }); tr.appendChild(chs); }
        tb.appendChild(tr);
      });
      var ncol = 2 + (hasNote ? 1 : 0) + (hasCh ? 1 : 0);
      if (!rows.length) tb.appendChild(h('tr', null, h('td', { colspan: ncol }, q ? '一致する行はありません。' : spec.empty)));
      var hr = h('tr', null, h('th', { scope: 'col' }, spec.colA), h('th', { scope: 'col' }, spec.colB));
      if (hasNote) hr.appendChild(h('th', { scope: 'col' }, spec.colNote));
      if (hasCh) hr.appendChild(h('th', { scope: 'col' }, T('mapping.colCh')));
      wrap.appendChild(h('table', { 'class': 'tbl' }, spec.caption ? h('caption', null, spec.caption) : null, h('thead', null, hr), tb));
      cnt.textContent = rows.length + T('table.rows');
    }
    draw();
  }
  function normRow(r) { return { a: r.a != null ? r.a : r.a4, b: r.b != null ? r.b : r.a5, note: r.note, ch: r.ch }; }

  /* compare：データで列名と行を指定する汎用の対比表。
     CN.add('compare', 'c01-x', { title, colA, colB, colNote?, cats?: [{key,label}], rows: [{ cat?, a, b, note?, ch? }], note?, caption? }) */
  CN.widgets.compare = function (el, d) {
    var T = function (k) { return CN.t(k, d); };
    var cats = d.cats && d.cats.length ? d.cats.map(function (c) { return { key: c.key, label: c.label, rows: [] }; }) : [{ key: '', label: '', rows: [] }];
    (d.rows || []).forEach(function (r) {
      var c = cats.filter(function (x) { return !r.cat || x.key === r.cat; })[0];
      if (!c) throw new Error('compare: 行の cat "' + r.cat + '" が cats にありません');
      c.rows.push(normRow(r));
    });
    compareTable(el, { kindLabel: T('compare.kind'), title: d.title, caption: d.caption, colA: d.colA || T('mapping.colA'), colB: d.colB || T('mapping.colB'), colNote: d.colNote || T('mapping.colNote'), noNote: d.colNote === false, cats: cats, note: d.note, empty: T('mapping.empty'), T: T });
  };
  CN.searchText.compare = function (d) { return (d.caption || '') + ' ' + (d.rows || []).map(function (r) { return [r.a, r.b, r.note, r.a4, r.a5].filter(Boolean).join(' '); }).join(' ') + ' ' + (d.note || ''); };

  /* mapping：CN.mapping(種別, 行) で章ごとに足した行を、1 つの対応表にまとめて出す。列名・種別は course.json の mapping */
  CN.widgets.mapping = function (el) {
    var m = CN.cfg.mapping || {}, T = function (k) { return CN.t(k); };
    var catDefs = (m.cats && m.cats.length) ? m.cats : Object.keys(CN.mappingRows).map(function (k) { return { key: k, label: k }; });
    var cats = catDefs.map(function (c) { return { key: c.key, label: c.label, rows: (CN.mappingRows[c.key] || []).map(normRow) }; });
    compareTable(el, { kindLabel: m.kind || T('mapping.kind'), title: m.title || T('mapping.title'), colA: m.colA || T('mapping.colA'), colB: m.colB || T('mapping.colB'), colNote: m.colNote || T('mapping.colNote'), cats: cats, note: m.note || T('mapping.note'), empty: T('mapping.empty'), forceCh: true, T: T });
  };
})();
