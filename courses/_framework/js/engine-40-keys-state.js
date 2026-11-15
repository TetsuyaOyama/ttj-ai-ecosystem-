/* 部品6：階層図 tree（旧名 keys）— 派生・依存の木を複数並べる／部品7：状態遷移図 state */
(function () {
  'use strict';
  var h = CN.h, s = CN.s;

  /* ================= 6 階層図（上から下へ「元 → 導出されたもの」をたどる木。鍵・部品表・データの派生など） ================= */
  CN.widgets.tree = function (el, d, ctx) {
    var T = function (k) { return CN.t(k, d); };
    var trees = d.trees, mode = 'all', selT = null, selN = null;
    var tabItems = [{ key: 'all', label: T('tree.all') }].concat(trees.map(function (t) { return { key: t.key, label: t.label + T('tree.only') }; }));
    CN.frame(el, d.kindLabel || T('tree.kind'), d.title, trees.length > 1 ? CN.tabs(tabItems, 'all', function (k) { mode = k; draw(); }, '表示する図') : null);
    var body = h('div', { 'class': 'wg-body' }), info = h('div', { 'class': 'wg-info', 'aria-live': 'polite' });
    el.appendChild(body); el.appendChild(info);
    var NW = 128, NH = 42;
    var map = {};   // treeKey -> {nodes:{id:{...}}, els:{id:g}, edges:[{a,b,g}]}

    function draw() {
      CN.clear(body); map = {};
      body.appendChild(h('div', { 'class': 'scroll-hint' }, '図は左右にスクロールできます'));
      var grid = h('div', { 'class': 'keys-grid' });
      trees.forEach(function (t) {
        if (mode !== 'all' && mode !== t.key) return;
        var colW = t.colW || 150, rowH = t.rowH || 84, maxC = 0, maxR = 0;
        t.nodes.forEach(function (n) { maxC = Math.max(maxC, n.col); maxR = Math.max(maxR, n.row); });
        var W = 14 + maxC * colW + NW + 14, H = 26 + maxR * rowH + NH + 14;
        var svg = s('svg', { 'class': 'keys-svg', id: ctx.id + '-' + t.key, viewBox: '0 0 ' + W + ' ' + H, role: 'group', 'aria-label': t.label + ' の' + (d.kindLabel || T('tree.kind')), style: 'min-width:' + Math.round(W * 0.8) + 'px' });
        var nd = {}, els = {}, edges = [], zl = [];
        t.nodes.forEach(function (n) { nd[n.id] = { n: n, x: 14 + n.col * colW, y: 26 + n.row * rowH }; });
        (t.zones || []).forEach(function (z) {
          var y0 = 26 + z.rows[0] * rowH - 20, y1 = 26 + z.rows[1] * rowH + NH + 8;
          svg.appendChild(s('rect', { 'class': 'kz', x: 2, y: y0, width: W - 4, height: y1 - y0, rx: 8 }));
          zl.push({ label: z.label, y0: y0 });
        });
        var obst = [];   // 線・矢印・線のラベルが占める長方形（区画のラベルを避けるため）
        function tw(str, fs) { var w = 0; for (var i = 0; i < str.length; i++) w += str.charCodeAt(i) > 255 ? fs : fs * 0.6; return w; }
        (t.edges || []).forEach(function (e) {
          var A = nd[e.a], B = nd[e.b];
          if (!A || !B) throw new Error('keys: 辺 ' + e.a + '→' + e.b + ' のノードがありません');
          var g = s('g', { 'class': 'ke' }), dd, tx, ty;
          if (B.y > A.y) {
            var ax = A.x + NW / 2, ay = A.y + NH, bx = B.x + NW / 2, by = B.y, mid = (ay + by) / 2 + (e.mid || 0);
            dd = 'M' + ax + ' ' + ay + ' V' + mid + ' H' + bx + ' V' + (by - 7);
            g.appendChild(s('path', { d: dd })); g.appendChild(s('polygon', { points: bx + ',' + by + ' ' + (bx - 5) + ',' + (by - 8) + ' ' + (bx + 5) + ',' + (by - 8) }));
            obst.push([ax - 3, ay, ax + 3, mid + 3], [Math.min(ax, bx) - 3, mid - 3, Math.max(ax, bx) + 3, mid + 3], [bx - 6, mid, bx + 6, by]);
            tx = bx + 6; ty = by - 12;
          } else {
            var ax2 = A.x + NW, ay2 = A.y + NH / 2, bx2 = B.x, by2 = B.y + NH / 2;
            g.appendChild(s('path', { d: 'M' + ax2 + ' ' + ay2 + ' H' + (bx2 - 7) })); g.appendChild(s('polygon', { points: bx2 + ',' + by2 + ' ' + (bx2 - 8) + ',' + (by2 - 5) + ' ' + (bx2 - 8) + ',' + (by2 + 5) }));
            tx = (ax2 + bx2) / 2 - 20; ty = ay2 - 6;
          }
          if (e.label) { g.appendChild(s('text', { x: tx, y: ty, 'class': 'halo' }, e.label)); obst.push([tx - 2, ty - 11, tx + tw(e.label, 10.5) + 2, ty + 3]); }
          svg.appendChild(g); edges.push({ a: e.a, b: e.b, g: g });
        });
        t.nodes.forEach(function (n) {
          var p = nd[n.id];
          var g = s('g', { 'class': 'kn' + (n.kind ? ' k-' + n.kind : ''), tabindex: 0, role: 'button', 'aria-label': n.name + ' の説明' });
          g.appendChild(s('rect', { x: p.x, y: p.y, width: NW, height: NH, rx: 8 }));
          g.appendChild(s('text', { x: p.x + NW / 2, y: p.y + NH / 2 + 5 }, n.name));
          var f = function () { selT = t.key; selN = n.id; paint(); show(t, n); };
          g.addEventListener('click', f);
          g.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); f(); } });
          svg.appendChild(g); els[n.id] = g;
        });
        zl.forEach(function (z) {   // 区画のラベル：線と重ならない位置（右寄せ → 左寄せ → 横にずらす）を探す
          var lw = tw(z.label, 11) + 6, ly = z.y0 + 13, cand = [W - 10 - lw, 10], x, k;
          for (k = 22; k < W - 20 - lw; k += 12) cand.push(W - 10 - lw - k);
          function hit(cx) { return obst.some(function (r) { return cx < r[2] && cx + lw > r[0] && ly - 11 < r[3] && ly + 3 > r[1]; }); }
          x = cand.filter(function (c) { return c >= 6 && !hit(c); })[0];
          if (x === undefined) x = cand[0];
          svg.appendChild(s('text', { 'class': 'kz-l halo', x: x, y: ly }, z.label));
        });
        map[t.key] = { nodes: nd, els: els, edges: edges };
        grid.appendChild(h('div', { 'class': 'keys-box' }, h('h6', null, t.label), h('div', { 'class': 'scroll-x' }, svg)));
      });
      body.appendChild(grid);
      var lg = h('div', { 'class': 'legend' });   // 凡例は図のデータ legend: ['紫＝…', …]（色の枠 kind: sim / nas / as / 省略）で決める
      var KM = { sim: 'db', nas: 'pol', as: 'ran', '': 'core' };   // 凡例：文字列か { kind: 'sim'|'nas'|'as'|'', text } （kind を書くと色の見本がつく）
      (d.legend || []).forEach(function (x) { lg.appendChild(typeof x === 'string' ? h('span', null, x) : h('span', null, h('i', { 'class': 'kd kind-' + (KM[x.kind || ''] || 'core') }), x.text)); });
      lg.appendChild(h('span', null, T('tree.legendTail')));
      body.appendChild(lg);
      paint();
      if (selT && map[selT] && map[selT].nodes[selN]) { var tt = trees.filter(function (x) { return x.key === selT; })[0]; show(tt, map[selT].nodes[selN].n); } else hint();
    }
    function hint() { CN.clear(info); info.appendChild(h('p', { 'class': 'hint' }, T('tree.hint'))); }
    function paint() {
      Object.keys(map).forEach(function (tk) {
        var m = map[tk], anc = {};
        if (tk === selT && selN) {
          var stack = [selN]; anc[selN] = 1;
          while (stack.length) { var c = stack.pop(); m.edges.forEach(function (e) { if (e.b === c && !anc[e.a]) { anc[e.a] = 1; stack.push(e.a); } }); }
        }
        Object.keys(m.els).forEach(function (id) {
          var on = tk === selT && selN;
          m.els[id].setAttribute('class', m.els[id].getAttribute('class').replace(/ ?(sel|dim)/g, '') + (on && id === selN ? ' sel' : '') + (on && !anc[id] ? ' dim' : ''));
        });
        m.edges.forEach(function (e) {
          var on = tk === selT && selN, hl = on && anc[e.a] && anc[e.b];
          e.g.setAttribute('class', 'ke' + (hl ? ' hl' : '') + (on && !hl ? ' dim' : ''));
        });
      });
    }
    function show(t, n) {
      CN.clear(info);
      info.appendChild(h('p', { 'class': 'kick' }, t.label));
      info.appendChild(h('h5', null, n.name + (n.full ? '（' + n.full + '）' : '')));
      var dl = h('dl');
      [[T('tree.f.made'), n.made], [T('tree.f.to'), n.to]].forEach(function (r) { if (r[1]) { dl.appendChild(h('dt', null, r[0])); dl.appendChild(h('dd', { html: CN.rich(r[1]) })); } });
      var from = (t.edges || []).filter(function (e) { return e.b === n.id; }).map(function (e) { return e.a; });
      if (from.length) { dl.appendChild(h('dt', null, T('tree.f.from'))); dl.appendChild(h('dd', null, from.join('、'))); }
      info.appendChild(dl);
      if (n.d) info.appendChild(CN.richEl('p', '', n.d));
    }
    draw();
  };
  CN.searchText.tree = function (d) { return d.trees.map(function (t) { return t.label + ' ' + t.nodes.map(function (n) { return [n.name, n.full, n.made, n.to, n.d].join(' '); }).join(' '); }).join(' '); };

  /* ================= 7 状態遷移図 ================= */
  CN.widgets.state = function (el, d, ctx) {
    var T = function (k) { return CN.t(k, d); };
    var ms = d.machines, mi = 0, sel = null;
    var tabs = ms.length > 1 ? CN.tabs(ms.map(function (m, i) { return { key: i, label: m.label }; }), 0, function (k) { mi = k; sel = null; draw(); }, '状態機械の選択') : null;
    CN.frame(el, T('state.kind'), d.title, tabs);
    var body = h('div', { 'class': 'wg-body' }), info = h('div', { 'class': 'wg-info', 'aria-live': 'polite' });
    el.appendChild(body); el.appendChild(info);
    var stEls, trEls, M;

    function draw() {
      M = ms[mi]; CN.clear(body); stEls = {}; trEls = [];
      var W = M.w || 760, H = M.h || 300, sm = {};
      M.states.forEach(function (st) { st.w = st.w || 150; st.h = st.h || (st.sub ? 54 : 46); st.cx = st.x + st.w / 2; st.cy = st.y + st.h / 2; sm[st.id] = st; });
      if (M.note) body.appendChild(CN.richEl('p', 'idn-sum', M.note));
      body.appendChild(h('div', { 'class': 'scroll-hint' }, '図は左右にスクロールできます'));
      var svg = s('svg', { 'class': 'st-svg', id: ctx.id + '-' + (M.key || mi), viewBox: '0 0 ' + W + ' ' + H, role: 'group', 'aria-label': M.label + ' の状態遷移図', style: 'min-width:' + Math.min(W, 640) + 'px' });
      var cnt = {}, has = {};
      M.trans.forEach(function (t) { has[t.from + '>' + t.to] = 1; });
      M.trans.forEach(function (t, ti) {
        var A = sm[t.from], B = sm[t.to];
        if (!A || !B) throw new Error('state: 遷移 ' + t.from + '→' + t.to + ' の状態がありません');
        var key = t.from + '>' + t.to, k = cnt[key] = (cnt[key] == null ? 0 : cnt[key] + 1);
        var g = s('g', { 'class': 'tr-e', tabindex: 0, role: 'button', 'aria-label': '遷移 ' + A.name + ' から ' + B.name + '：' + t.label });
        var dstr, hx, hy, ang, lx, ly;
        if (t.from === t.to) {
          var top = t.loop !== 'bottom', y0 = top ? A.y : A.y + A.h, sg = top ? -1 : 1, off = k * 56;
          var xa = A.cx - 24 + off, xb = A.cx + 24 + off;
          dstr = 'M' + xa + ' ' + y0 + ' C' + (xa - 14) + ' ' + (y0 + sg * 44) + ' ' + (xb + 14) + ' ' + (y0 + sg * 44) + ' ' + xb + ' ' + (y0 + sg * 2);
          hx = xb; hy = y0; ang = Math.atan2(-sg * 1, 0.0001) ; ang = top ? Math.PI / 2 : -Math.PI / 2;
          lx = (xa + xb) / 2; ly = y0 + sg * 40 + (top ? -4 : 12);
        } else {
          var dx = B.cx - A.cx, dy = B.cy - A.cy, L = Math.sqrt(dx * dx + dy * dy), nx = -dy / L, ny = dx / L;
          var off2 = (has[t.to + '>' + t.from] ? 24 : 0) + k * 30; if (t.curve != null) off2 = t.curve;
          var mx = (A.cx + B.cx) / 2 + nx * off2 * 2, my = (A.cy + B.cy) / 2 + ny * off2 * 2;
          if (!off2) { mx = (A.cx + B.cx) / 2; my = (A.cy + B.cy) / 2; }
          var p0 = CN.clip(A.cx, A.cy, A.w / 2 + 1, A.h / 2 + 1, mx, my), p1 = CN.clip(B.cx, B.cy, B.w / 2 + 3, B.h / 2 + 3, mx, my);
          dstr = off2 ? 'M' + p0[0] + ' ' + p0[1] + ' Q' + mx + ' ' + my + ' ' + p1[0] + ' ' + p1[1] : 'M' + p0[0] + ' ' + p0[1] + ' L' + p1[0] + ' ' + p1[1];
          hx = p1[0]; hy = p1[1]; ang = Math.atan2(p1[1] - (off2 ? my : p0[1]), p1[0] - (off2 ? mx : p0[0]));
          lx = off2 ? 0.25 * p0[0] + 0.5 * mx + 0.25 * p1[0] : (p0[0] + p1[0]) / 2; ly = off2 ? 0.25 * p0[1] + 0.5 * my + 0.25 * p1[1] : (p0[1] + p1[1]) / 2;
          ly -= 5;
          if (t.lo) { lx += t.lo[0]; ly += t.lo[1]; }
        }
        var hp = [[0, 0], [-10, -5], [-10, 5]].map(function (p) { return (hx + p[0] * Math.cos(ang) - p[1] * Math.sin(ang)).toFixed(1) + ',' + (hy + p[0] * Math.sin(ang) + p[1] * Math.cos(ang)).toFixed(1); }).join(' ');
        g.appendChild(s('path', { 'class': 'hit', d: dstr })); g.appendChild(s('path', { 'class': 'ln', d: dstr }));
        g.appendChild(s('polygon', { 'class': 'hd', points: hp }));
        var tl = CN.wrap(t.label, t.lw || 150, 11);
        tl.forEach(function (ln, q) { g.appendChild(s('text', { 'class': 'halo', x: lx, y: ly - (tl.length - 1 - q) * 13 }, ln)); });
        var f = function () { sel = { t: ti }; paint(); showTrans(t, A, B); };
        g.addEventListener('click', f);
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f(); } });
        svg.appendChild(g); trEls.push(g);
      });
      M.states.forEach(function (st) {
        var g = s('g', { 'class': 'sn ' + (st.kind || ''), tabindex: 0, role: 'button', 'aria-label': st.name + ' の説明' });
        g.appendChild(s('rect', { x: st.x, y: st.y, width: st.w, height: st.h, rx: 12 }));
        if (st.sub) { g.appendChild(s('text', { x: st.cx, y: st.cy - 3 }, st.name)); g.appendChild(s('text', { 'class': 'l2', x: st.cx, y: st.cy + 14 }, st.sub)); }
        else g.appendChild(s('text', { x: st.cx, y: st.cy + 5 }, st.name));
        var f = function () { sel = { s: st.id }; paint(); showState(st); };
        g.addEventListener('click', f);
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f(); } });
        svg.appendChild(g); stEls[st.id] = g;
      });
      body.appendChild(h('div', { 'class': 'scroll-x' }, svg));
      body.appendChild(h('div', { 'class': 'legend' }, h('span', null, T('state.legend'))));
      paint(); hint();
    }
    function hint() { CN.clear(info); info.appendChild(h('p', { 'class': 'hint' }, T('state.hint'))); }
    function paint() {
      Object.keys(stEls).forEach(function (id) { stEls[id].setAttribute('class', stEls[id].getAttribute('class').replace(/ ?sel/g, '') + (sel && sel.s === id ? ' sel' : '')); });
      trEls.forEach(function (g, i) { g.setAttribute('class', 'tr-e' + (sel && sel.t === i ? ' sel' : '')); });
    }
    function showState(st) {
      CN.clear(info);
      info.appendChild(h('p', { 'class': 'kick' }, M.label + ' ・ 状態'));
      info.appendChild(h('h5', null, st.name + (st.sub ? '（' + st.sub + '）' : '')));
      if (st.d) info.appendChild(CN.richEl('p', '', st.d));
      var outs = M.trans.map(function (t, i) { return { t: t, i: i }; }).filter(function (o) { return o.t.from === st.id; });
      if (outs.length) {
        info.appendChild(h('p', { 'class': 'kick' }, 'この状態からの遷移（押すと条件）'));
        var c = h('div', { 'class': 'chips' });
        outs.forEach(function (o) {
          var B = M.states.filter(function (x) { return x.id === o.t.to; })[0];
          c.appendChild(h('button', { 'class': 'chip', type: 'button', on: { click: function () { sel = { t: o.i }; paint(); showTrans(o.t, st, B); } } }, o.t.label.replace(/\n/g, ' ') + ' → ' + B.name));
        });
        info.appendChild(c);
      }
    }
    function showTrans(t, A, B) {
      CN.clear(info);
      info.appendChild(h('p', { 'class': 'kick' }, M.label + ' ・ 遷移'));
      info.appendChild(h('h5', null, A.name + ' → ' + B.name));
      var dl = h('dl');
      dl.appendChild(h('dt', null, T('state.trigger'))); dl.appendChild(h('dd', null, t.label.replace(/\n/g, ' ')));
      if (t.cond) { dl.appendChild(h('dt', null, T('state.cond'))); dl.appendChild(h('dd', { html: CN.rich(t.cond) })); }
      info.appendChild(dl);
      if (t.d) info.appendChild(CN.richEl('p', '', t.d));
      if (t.ch && t.ch.length) info.appendChild(CN.chLinks(t.ch));
    }
    draw();
  };
  CN.searchText.state = function (d) { return d.machines.map(function (m) { return m.label + ' ' + m.states.map(function (s) { return s.name + ' ' + (s.d || ''); }).join(' ') + ' ' + m.trans.map(function (t) { return t.label + ' ' + (t.cond || '') + ' ' + (t.d || ''); }).join(' '); }).join(' '); };
})();
