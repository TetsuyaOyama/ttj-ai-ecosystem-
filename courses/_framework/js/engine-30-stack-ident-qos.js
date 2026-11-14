/* 部品3：階層スタック図 stack / 部品4：構造の分解 ident / 部品5：早見表 table（旧名 qos） */
(function () {
  'use strict';
  var h = CN.h;

  /* ================= 3 階層スタック図（層を下から積む。ifs＝積み重ねの組。プロトコルスタック・梱包・工程の層などに使う） ================= */
  CN.widgets.stack = function (el, d, ctx) {
    var T = function (k) { return CN.t(k, d); };
    var ifs = d.ifs || d.stacks, curI = 0, curL = null, tick = 0;
    var tabs = ifs.length > 1 ? CN.tabs(ifs.map(function (x, i) { return { key: i, label: x.name }; }), 0, function (k) { curI = k; curL = null; draw(); }, T('stack.item') + 'の選択') : null;
    CN.frame(el, T('stack.kind'), d.title, tabs);
    var body = h('div', { 'class': 'wg-body' }), info = h('div', { 'class': 'wg-info', 'aria-live': 'polite' });
    el.appendChild(body); el.appendChild(info);

    function draw() {
      var f = ifs[curI]; CN.clear(body);
      var col = h('div', { 'class': 'stk-col', role: 'group', 'aria-label': f.name + ' のプロトコル層（上が上位）' });
      if (f.between) col.appendChild(h('div', { 'class': 'stk-ends' }, h('span', null, f.between[0]), h('span', null, '⇄'), h('span', null, f.between[1])));
      col.setAttribute('aria-label', f.name + ' の層（上が上位）');
      var layers = f.layers.slice(), btns = [];
      layers.forEach(function (L, i) {
        var b = h('button', { type: 'button', 'class': 'stk-l r-' + (L.role || 'net'), 'aria-pressed': 'false', style: 'animation-delay:' + ((layers.length - 1 - i) * 0.12) + 's', on: { click: function () { curL = i; mark(); showLayer(f, L); } } },
          L.n, L.sub ? h('small', null, L.sub) : null);
        btns.push(b); col.appendChild(b);
      });
      function mark() { btns.forEach(function (b, i) { b.setAttribute('aria-pressed', String(i === curL)); }); }
      var side = h('div');
      side.appendChild(h('p', { 'class': 'kick', style: 'margin:0;color:var(--accent);font-size:.76rem;font-weight:700' }, T('stack.item') + (f.plane === 'up' || f.plane === 'cp' ? ' ・ ' + T('stack.plane.' + f.plane) : '')));
      side.appendChild(h('h5', { style: 'margin:.1rem 0 .3rem;font-size:1.1rem' }, f.name + (f.between ? '（' + f.between.join(' ⇄ ') + '）' : '')));
      if (f.carries) side.appendChild(CN.richEl('p', '', '**' + T('stack.carries') + '**：' + f.carries));
      if (f.note) side.appendChild(CN.richEl('p', '', f.note));
      side.appendChild(h('button', { 'class': 'btn sm', type: 'button', on: { click: function () { draw(); } } }, T('stack.restack')));
      side.appendChild(h('p', { 'class': 'hint', style: 'color:var(--muted);font-size:.86rem;margin-top:.6rem' }, T('stack.legend')));
      body.appendChild(h('div', { 'class': 'stk' }, col, side));
      showLayer(f, null);
    }
    function showLayer(f, L) {
      CN.clear(info);
      if (!L) { info.appendChild(h('p', { 'class': 'hint' }, T('stack.hint'))); return; }
      info.appendChild(h('p', { 'class': 'kick' }, (T('stack.role.' + (L.role || 'net'))) + ' ・ ' + f.name));
      info.appendChild(h('h5', null, L.n + (L.sub ? '（' + L.sub + '）' : '')));
      if (L.d) info.appendChild(CN.richEl('p', '', L.d));
      if (L.spec) info.appendChild(CN.richEl('p', '', '**' + T('stack.spec') + '**：' + L.spec));
    }
    draw();
  };
  CN.searchText.stack = function (d) { return (d.ifs || d.stacks).map(function (f) { return [f.name, f.carries, f.note].concat(f.layers.map(function (l) { return l.n + ' ' + (l.d || ''); })).join(' '); }).join(' '); };

  /* ================= 4 構造の分解（識別子・番号・コード・ラベルなど、区切って意味を持つものを部分に分けて見る） ================= */
  CN.widgets.ident = function (el, d, ctx) {
    var T = function (k) { return CN.t(k, d); };
    var items = d.items, curI = 0, curP = 0;
    var tabs = items.length > 1 ? CN.tabs(items.map(function (x, i) { return { key: i, label: x.name }; }), 0, function (k) { curI = k; curP = 0; draw(); }, T('ident.item') + 'の選択') : null;
    CN.frame(el, T('ident.kind'), d.title, tabs);
    var body = h('div', { 'class': 'wg-body' }), info = h('div', { 'class': 'wg-info', 'aria-live': 'polite' });
    el.appendChild(body); el.appendChild(info);
    function draw() {
      var it = items[curI]; CN.clear(body);
      var sum = h('p', { 'class': 'idn-sum' }); sum.innerHTML = '<b>' + CN.esc(it.name) + '</b>' + (it.full ? '（' + CN.esc(it.full) + '）' : '') + (it.summary ? ' — ' + CN.rich(it.summary) : '');
      body.appendChild(sum);
      var row = h('div', { 'class': 'idn-row', role: 'group', 'aria-label': it.name + ' の構造。' + T('ident.hint') }), btns = [];
      var i = 0;
      while (i < it.parts.length) {
        var p = it.parts[i], grp = h('div', { 'class': 'idn-grp' }), segs = h('div', { 'class': 'idn-segs' });
        var g = p.grp, j = i;
        while (j < it.parts.length && (g ? it.parts[j].grp === g : j === i)) {
          (function (idx) {
            var q = it.parts[idx];
            var b = h('button', { type: 'button', 'class': 'idn-seg', 'aria-pressed': 'false', style: '--c:var(--seg' + (((q.c || (idx % 6 + 1)) - 1) % 6 + 1) + ')', on: { click: function () { curP = idx; mark(); showPart(it, idx); } } },
              h('span', { 'class': 'v' }, q.val), h('span', { 'class': 'k' }, q.label), q.bits ? h('span', { 'class': 'b' }, q.bits) : null);
            btns[idx] = b; segs.appendChild(b);
          })(j);
          j++;
          if (!g) break;
        }
        if (g) grp.appendChild(h('div', { 'class': 'gl' }, g));
        grp.appendChild(segs); row.appendChild(grp); i = j;
      }
      body.appendChild(h('div', { 'class': 'scroll-x' }, row));
      if (it.where) body.appendChild(CN.richEl('p', 'idn-sum', '**' + T('ident.where') + '**：' + it.where));
      if (it.ch && it.ch.length) body.appendChild(CN.chLinks(it.ch));
      function mark() { btns.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === curP)); }); }
      mark(); showPart(it, curP);
    }
    function showPart(it, idx) {
      var q = it.parts[idx]; CN.clear(info);
      info.appendChild(h('p', { 'class': 'kick' }, it.name + (q.grp ? ' ・ ' + q.grp : '') + ' ・ ' + (idx + 1) + '/' + it.parts.length));
      info.appendChild(h('h5', null, q.label + (q.full ? '（' + q.full + '）' : '')));
      var dl = h('dl');
      [[T('ident.val'), q.val], [T('ident.bits'), q.bits]].forEach(function (r) { if (r[1]) { dl.appendChild(h('dt', null, r[0])); dl.appendChild(h('dd', null, h('code', null, r[1]))); } });
      info.appendChild(dl);
      if (q.d) info.appendChild(CN.richEl('p', '', q.d));
    }
    draw();
  };
  CN.searchText.ident = function (d) { return d.items.map(function (it) { return [it.name, it.full, it.summary, it.where].concat(it.parts.map(function (p) { return p.label + ' ' + (p.full || '') + ' ' + (p.d || ''); })).join(' '); }).join(' '); };

  /* ================= 5 早見表（汎用の表：並べ替え・絞り込み・行の詳細）。旧名 qos ================= */
  CN.widgets.table = function (el, d, ctx) {
    var T = function (k) { return CN.t(k, d); };
    var cols = d.cols, rows = d.rows.map(function (r, i) { return { r: r, i: i }; }), sortCol = -1, sortDir = 1, filt = '', q = '', selI = null;
    CN.frame(el, T('table.kind'), d.title);
    var body = h('div', { 'class': 'wg-body' }), info = h('div', { 'class': 'wg-info', 'aria-live': 'polite' });
    var tools = h('div', { 'class': 'qos-tools' }), selEl = null;
    if (d.filter != null) {
      var vals = []; d.rows.forEach(function (r) { if (vals.indexOf(r[d.filter]) < 0) vals.push(r[d.filter]); });
      selEl = h('select', { 'aria-label': cols[d.filter] + ' で絞り込み' }, h('option', { value: '' }, cols[d.filter] + '：' + T('table.all')), vals.map(function (v) { return h('option', { value: v }, v); }));
      selEl.addEventListener('change', function () { filt = selEl.value; draw(); });
      tools.appendChild(selEl);
    }
    var inp = h('input', { type: 'search', placeholder: T('table.search'), 'aria-label': T('table.search') }); inp.addEventListener('input', function () { q = inp.value.trim().toLowerCase(); draw(); });
    tools.appendChild(inp); tools.appendChild(h('span', { 'class': 'gl-count', id: ctx.id + '-n' }));
    body.appendChild(tools);
    var wrap = h('div', { 'class': 'tbl-wrap' }); body.appendChild(wrap);
    if (d.note) body.appendChild(CN.richEl('p', 'idn-sum', d.note));
    el.appendChild(body); el.appendChild(info);
    function num(v) { var m = String(v).replace(/,/g, '').match(/-?\d+(\.\d+)?/); return m ? parseFloat(m[0]) : NaN; }
    function draw() {
      var list = rows.filter(function (o) {
        if (filt && o.r[d.filter] !== filt) return false;
        return !q || o.r.join(' ').toLowerCase().indexOf(q) >= 0;
      });
      if (sortCol >= 0) list.sort(function (a, b) {
        var x = a.r[sortCol], y = b.r[sortCol], nx = num(x), ny = num(y);
        var c = (!isNaN(nx) && !isNaN(ny)) ? nx - ny : String(x).localeCompare(String(y), 'ja');
        return c * sortDir || a.i - b.i;
      });
      CN.clear(wrap);
      var tb = h('tbody');
      list.forEach(function (o) {
        var tr = h('tr', { tabindex: 0, 'aria-selected': String(o.i === selI) });
        o.r.forEach(function (c, k) { tr.appendChild(k === 0 ? h('th', { scope: 'row' }, c) : h('td', null, c)); });
        var f = function () { selI = o.i; draw(); detail(o.i); };
        tr.addEventListener('click', f);
        tr.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f(); } });
        tb.appendChild(tr);
      });
      var hr = h('tr'); cols.forEach(function (c, k) {
        var th = h('th', { scope: 'col', 'aria-sort': sortCol === k ? (sortDir > 0 ? 'ascending' : 'descending') : 'none' });
        th.appendChild(h('button', { type: 'button', title: '押すと並べ替え', on: { click: function () { if (sortCol === k) sortDir = -sortDir; else { sortCol = k; sortDir = 1; } draw(); } } }, c + (sortCol === k ? (sortDir > 0 ? ' ▲' : ' ▼') : '')));
        hr.appendChild(th);
      });
      wrap.appendChild(h('table', { 'class': 'tbl qos' }, d.caption ? h('caption', null, d.caption) : null, h('thead', null, hr), tb));
      var nn = el.querySelector('#' + ctx.id + '-n'); if (nn) nn.textContent = list.length + ' / ' + rows.length + T('table.rows');
    }
    function detail(i) {
      CN.clear(info);
      info.appendChild(h('p', { 'class': 'kick' }, cols[0] + ' ' + d.rows[i][0]));
      var dt = d.detail && d.detail[i];
      info.appendChild(h('h5', null, d.rows[i].slice(0, 2).join(' ／ ')));
      info.appendChild(CN.richEl('p', '', dt || T('table.noDetail')));
    }
    info.appendChild(h('p', { 'class': 'hint' }, T('table.hint')));
    draw();
  };
  CN.searchText.table = function (d) { return d.rows.map(function (r) { return r.join(' '); }).join(' ') + ' ' + (d.detail || []).join(' ') + ' ' + (d.note || ''); };
})();
