/* 部品10：工程フロー flow（工程の箱を順に進め、分岐と繰り返しを表す）／ 部品11：断面・構成の層図 layers（層や部位を積んだ模式図） */
(function () {
  'use strict';
  var h = CN.h, s = CN.s;
  function isEnter(e) { return e.key === 'Enter' || e.key === ' '; }
  function tw(str, fs) { var w = 0; for (var i = 0; i < str.length; i++) w += str.charCodeAt(i) > 255 ? fs : fs * 0.58; return w; }

  /* ================= 10 工程フロー =================
     CN.add('flow', 'c01-x', { title, direction: 'auto'|'h'|'v', steps: [{ id, name, sub?, kind?, desc?, inputs?, outputs?, caution?, time?, repeat?, ch?,
        next?: 'id' | ['id', …] | [{ to, label?, cond?, kind? }], end?: true, row?: 0, col?: n }] })
     next を省略すると配列の次の工程へ進む。戻る先（番号が小さい工程）は「繰り返し」（破線）、複数の進み先は「分岐」。 */
  CN.widgets.flow = function (el, d, ctx) {
    var T = function (k) { return CN.t(k, d); };
    var steps = d.steps, N = steps ? steps.length : 0, idx = {};
    if (!N) throw new Error('flow: steps が空です');
    steps.forEach(function (st, i) {
      if (!st.id) throw new Error('flow: ' + (i + 1) + ' 番目の工程に id がありません');
      if (idx[st.id] != null) throw new Error('flow: 工程 id "' + st.id + '" が重複しています');
      idx[st.id] = i;
    });
    var edges = [];
    steps.forEach(function (st, i) {
      var nx = st.next != null ? [].concat(st.next).map(function (x) { return typeof x === 'string' ? { to: x } : x; }) : (st.end || i === N - 1 ? [] : [{ to: steps[i + 1].id }]);
      nx.forEach(function (e) {
        var j = idx[e.to];
        if (j == null) throw new Error('flow: 工程 ' + st.id + ' の next "' + e.to + '" が見つかりません');
        edges.push({ from: i, to: j, label: e.label || '', cond: e.cond || '', kind: e.kind || (j <= i ? 'loop' : (nx.length > 1 || e.label ? 'branch' : 'next')) });
      });
    });
    /* 格子の位置：row（段、既定 0）と col（進行方向の位置）。row 0 の工程は順に col を 1 つずつ進め、row が 1 以上で col がなければ直前の row 0 と同じ col */
    var u = -1, occ = {}, maxU = 0, maxR = 0;
    steps.forEach(function (st) {
      var r = st.row || 0;
      if (st.col != null) { st._u = st.col; if (r === 0) u = st.col; } else if (r === 0) { u++; st._u = u; } else st._u = Math.max(u, 0);
      st._r = r; maxU = Math.max(maxU, st._u); maxR = Math.max(maxR, r);
      var key = st._u + ',' + r; if (occ[key]) throw new Error('flow: 工程 ' + st.id + ' と ' + occ[key] + ' が同じ位置です（row / col で分ける）'); occ[key] = st.id;
    });
    edges.forEach(function (e) {
      var a = steps[e.from], b = steps[e.to];
      e.arc = a._r === b._r && !(b._u === a._u + 1 && e.kind !== 'loop');
    });

    /* ---- 枠・操作 ---- */
    CN.frame(el, T('flow.kind'), d.title);
    var cur = 0, trail = [0];
    var btnFirst = h('button', { 'class': 'btn', type: 'button' }, T('flow.first')), btnPrev = h('button', { 'class': 'btn', type: 'button' }, T('flow.prev')),
      btnNext = h('button', { 'class': 'btn pri', type: 'button' }, T('flow.next')), cnt = h('span', { 'class': 'cnt', 'aria-hidden': 'true' });
    el.appendChild(h('div', { 'class': 'seq-ctl' }, btnFirst, btnPrev, btnNext, cnt));
    var stage = h('div', { 'class': 'scroll-x fl-stage' }), info = h('div', { 'class': 'wg-info fl-info', 'aria-live': 'polite' });
    var body = h('div', { 'class': 'wg-body' });
    body.appendChild(h('div', { 'class': 'scroll-hint' }, '図は左右にスクロールできます'));
    body.appendChild(stage);
    var lg = h('div', { 'class': 'legend' }, h('span', null, h('i', { 'class': 'cp' }), T('flow.legendNext')), h('span', null, T('flow.legendBranch')), h('span', null, h('i', { 'class': 'lg' }), T('flow.legendLoop')), h('span', null, h('i', { 'class': 'vs' }), T('flow.visited')));
    body.appendChild(lg);
    el.appendChild(body); el.appendChild(info);
    var det = h('details', { 'class': 'seq-list' }, h('summary', null, T('flow.list') + '（' + N + '）')), ol = h('ol'), listBtns = [];
    steps.forEach(function (st, i) { var b = h('button', { type: 'button', on: { click: function () { go(i); } } }, h('span', { 'class': 'no' }, String(i + 1)), st.name + (st.sub ? '（' + st.sub + '）' : '')); listBtns.push(b); ol.appendChild(h('li', null, b)); });
    det.appendChild(ol); el.appendChild(det);

    /* ---- 配置 ---- */
    function geom(o) {
      var eu = o === 'h' ? 120 : 54, ew = o === 'h' ? 60 : 180, gap = o === 'h' ? 38 : 44, i, r;
      var arcsIn = {}; edges.forEach(function (e) { if (e.arc) arcsIn[steps[e.from]._r] = (arcsIn[steps[e.from]._r] || 0) + 1; });
      var rowTop = [], top = 0;
      for (r = 0; r <= maxR; r++) {
        var need = arcsIn[r] ? 16 + 12 * arcsIn[r] : (r ? 0 : 8);
        top += r === 0 ? need : Math.max(r ? 46 : 0, need + 26);
        rowTop[r] = top; top += ew;
      }
      var padU = 12, Uext = padU * 2 + maxU * (eu + gap) + eu, Wext = top + 12;
      return { o: o, eu: eu, ew: ew, gap: gap, rowTop: rowTop, padU: padU, Uext: Uext, Wext: Wext, W: o === 'h' ? Uext : Wext, H: o === 'h' ? Wext : Uext };
    }
    var G = null, svg = null, nodeEls = [], edgeEls = [];
    function chooseOrient() {
      if (d.direction === 'h' || d.direction === 'v') return d.direction;
      var w = stage.clientWidth || el.clientWidth || 800;
      return w >= geom('h').W * 0.72 ? 'h' : 'v';
    }
    function draw() {
      var o = chooseOrient();
      G = geom(o); CN.clear(stage); nodeEls = []; edgeEls = [];
      var XY = function (uu, ww) { return o === 'h' ? [uu, ww] : [ww, uu]; };
      var cu = function (st) { return G.padU + st._u * (G.eu + G.gap) + G.eu / 2; }, cw = function (st) { return G.rowTop[st._r] + G.ew / 2; };
      svg = s('svg', { 'class': 'fl-svg fl-' + o, id: ctx.id, viewBox: '0 0 ' + G.W + ' ' + G.H, role: 'group', 'aria-label': d.title + '（' + T('flow.kind') + '、全 ' + N + ' 工程：' + steps.map(function (x) { return x.name; }).join(' → ') + '）', style: 'max-width:' + Math.round(G.W * (o === 'h' ? 1.2 : 1.25)) + 'px;min-width:' + Math.round(Math.min(G.W, o === 'h' ? G.W * 0.72 : 300)) + 'px' });
      /* 辺：ポートを分けて重なりを避ける */
      var arcRank = {}, pairN = {};
      edges.forEach(function (e, ei) {
        var A = steps[e.from], B = steps[e.to], pts, lab = null, labU = true, sg = 0, ea = G.eu / 2, wa = G.ew / 2;
        var ua = cu(A), ub = cu(B), wA = cw(A), wB = cw(B);
        if (e.arc) {
          var k = arcRank[A._r] = (arcRank[A._r] == null ? 0 : arcRank[A._r] + 1), ch = G.rowTop[A._r] - (14 + 12 * k), off = ((k % 2) ? 1 : -1) * (6 + 5 * Math.floor(k / 2)) * 1;
          pts = [[ua + off, wA - wa], [ua + off, ch], [ub + off, ch], [ub + off, wB - wa]];
          lab = [(ua + ub) / 2 + off, ch];
        } else if (A._r === B._r) {
          pts = [[ua + ea, wA], [ub - ea, wB]];
          lab = [(ua + ea + ub - ea) / 2, wA]; sg = o === 'v' ? 1 : -1;
        } else {
          var down = B._r > A._r, sa = wA + (down ? wa : -wa), sb = wB + (down ? -wa : wa), pk = Math.min(e.from, e.to) + '-' + Math.max(e.from, e.to), off2 = (pairN[pk] = (pairN[pk] == null ? 0 : pairN[pk] + 1)) % 2 ? 9 : -9;
          sg = off2 < 0 ? -1 : 1;
          if (Math.abs(ua - ub) < 1) { pts = [[ua + off2, sa], [ub + off2, sb]]; lab = [ua + off2, (sa + sb) / 2]; labU = false; }
          else { var mid = (sa + sb) / 2 + off2; pts = [[ua + off2, sa], [ua + off2, mid], [ub + off2, mid], [ub + off2, sb]]; lab = [(ua + ub) / 2 + off2, mid]; }
        }
        var xy = pts.map(function (p) { return XY(p[0], p[1]); }), dstr = xy.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
        var n = xy.length, q = xy[n - 1], p0 = xy[n - 2], ang = Math.atan2(q[1] - p0[1], q[0] - p0[0]);
        var hp = [[0, 0], [-10, -5], [-10, 5]].map(function (p) { return (q[0] + p[0] * Math.cos(ang) - p[1] * Math.sin(ang)).toFixed(1) + ',' + (q[1] + p[0] * Math.sin(ang) + p[1] * Math.cos(ang)).toFixed(1); }).join(' ');
        var g = s('g', { 'class': 'fe ' + e.kind, 'aria-hidden': 'true' });
        g.appendChild(s('path', { 'class': 'ln', d: dstr })); g.appendChild(s('polygon', { 'class': 'hd', points: hp }));
        if (e.label) {
          var lp = XY(lab[0], lab[1]), horiz = (o === 'h') === labU, lx = lp[0], ly = lp[1], anchor = 'middle';   // horiz：ラベルが載る線が画面上で横向きか
          if (horiz) ly += sg === 0 ? 4 : (sg < 0 ? -7 : 15);
          else { ly += 4; if (sg) { lx += sg * 7; anchor = sg < 0 ? 'end' : 'start'; } }
          g.appendChild(s('text', { 'class': 'el halo', x: lx.toFixed(1), y: ly.toFixed(1), 'text-anchor': anchor }, e.label));
        }
        svg.appendChild(g); edgeEls.push(g);
      });
      steps.forEach(function (st, i) {
        var c = XY(cu(st), cw(st)), bw = o === 'h' ? G.eu : G.ew, bh = o === 'h' ? G.ew : G.eu, x = c[0] - bw / 2, y = c[1] - bh / 2;
        var g = s('g', { 'class': 'nd fl-step kind-' + CN.kind(st.kind), tabindex: 0, role: 'button', 'aria-label': (i + 1) + '/' + N + ' ' + st.name + (st.sub ? '（' + st.sub + '）' : '') + (st.repeat ? '、' + T('flow.repeat') + '：' + st.repeat : '') + '。' + outLabel(i), 'aria-pressed': 'false', 'data-id': st.id });
        g.appendChild(s('rect', { x: x, y: y, width: bw, height: bh, rx: 9 }));
        var lines = CN.wrap(st.name, bw - 28, 13.5), subL = st.sub ? CN.wrap(st.sub, bw - 14, 11).slice(0, 1) : [], tot = lines.length * 16 + (subL.length ? 14 : 0), y0 = c[1] - tot / 2 + 12;
        lines.slice(0, 2).forEach(function (ln, k) { g.appendChild(s('text', { 'class': 'l1 fl-n', x: c[0] + 6, y: y0 + k * 16 }, ln)); });
        subL.forEach(function (ln) { g.appendChild(s('text', { 'class': 'l2', x: c[0] + 6, y: y0 + Math.min(lines.length, 2) * 16 - 2 }, ln)); });
        g.appendChild(s('circle', { 'class': 'fl-no', cx: x + 13, cy: y + 13, r: 9 })); g.appendChild(s('text', { 'class': 'fl-nn', x: x + 13, y: y + 16.5 }, String(i + 1)));
        if (st.repeat) g.appendChild(s('text', { 'class': 'fl-rp', x: x + bw - 8, y: y + 15, 'text-anchor': 'end' }, '↻'));
        g.addEventListener('click', function () { go(i); });
        g.addEventListener('keydown', function (e) {
          if (isEnter(e)) { e.preventDefault(); go(i); }
          else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(1); }
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
          else if (e.key === 'Home') { e.preventDefault(); first(); }
        });
        svg.appendChild(g); nodeEls.push(g);
      });
      stage.appendChild(svg);
      paint();
    }
    function outLabel(i) {
      var os = edges.filter(function (e) { return e.from === i; });
      if (!os.length) return T('flow.end');
      return os.map(function (e) { return (e.kind === 'loop' ? T('flow.repeat') : e.kind === 'branch' ? T('flow.branch') : '次') + '：' + steps[e.to].name + (e.label ? '（' + e.label + '）' : ''); }).join('、');
    }
    function nextOf(i) { var os = edges.filter(function (e) { return e.from === i; }), nl = os.filter(function (e) { return e.kind !== 'loop'; }); return (nl[0] || os[0] || {}).to; }
    function paint() {
      var vis = {}; trail.forEach(function (i) { vis[i] = 1; });
      nodeEls.forEach(function (g, i) {
        g.setAttribute('class', 'nd fl-step kind-' + CN.kind(steps[i].kind) + (vis[i] ? ' vis' : '') + (i === cur ? ' sel' : ''));
        g.setAttribute('aria-pressed', String(i === cur));
      });
      edgeEls.forEach(function (g, k) { g.setAttribute('class', 'fe ' + edges[k].kind + (edges[k].from === cur ? ' out' : '')); });
      listBtns.forEach(function (b, i) { if (i === cur) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
      cnt.textContent = T('flow.step') + ' ' + (cur + 1) + ' / ' + N;
      btnPrev.disabled = trail.length < 2; btnFirst.disabled = trail.length < 2 && cur === 0; btnNext.disabled = nextOf(cur) == null;
      show();
    }
    function go(i) { cur = i; trail.push(i); if (trail.length > 60) trail.shift(); paint(); }
    function first() { cur = 0; trail = [0]; paint(); focusCur(); }
    function move(dir) {
      if (dir > 0) { var n = nextOf(cur); if (n != null) { go(n); focusCur(); } }
      else if (trail.length > 1) { trail.pop(); cur = trail[trail.length - 1]; paint(); focusCur(); }
    }
    function focusCur() { if (nodeEls[cur] && stage.contains(document.activeElement)) nodeEls[cur].focus(); }
    function list(label, arr) { if (!arr || (Array.isArray(arr) && !arr.length)) return; var dd = h('dd'); [].concat(arr).forEach(function (x, k) { if (k) dd.appendChild(document.createTextNode('、')); dd.appendChild(h('span', { html: CN.rich(x) })); }); return [h('dt', null, label), dd]; }
    function show() {
      var st = steps[cur]; CN.clear(info);
      info.appendChild(h('p', { 'class': 'kick' }, T('flow.step') + ' ' + (cur + 1) + ' / ' + N + (CN.kindName(st.kind, d) ? ' ・ ' + CN.kindName(st.kind, d) : '')));
      info.appendChild(h('h5', null, st.name + (st.sub ? '（' + st.sub + '）' : '')));
      var meta = h('div', { 'class': 'meta' });
      if (st.time) meta.appendChild(h('span', { 'class': 'chip' }, T('flow.time') + '：' + st.time));
      if (st.repeat) meta.appendChild(h('span', { 'class': 'chip' }, '↻ ' + T('flow.repeat') + '：' + st.repeat));
      if (meta.firstChild) info.appendChild(meta);
      if (st.desc) info.appendChild(CN.richEl('p', '', st.desc));
      var dl = h('dl');
      [list(T('flow.inputs'), st.inputs), list(T('flow.outputs'), st.outputs), list(T('flow.caution'), st.caution)].forEach(function (r) { if (r) { dl.appendChild(r[0]); dl.appendChild(r[1]); } });
      if (dl.firstChild) info.appendChild(dl);
      var os = edges.filter(function (e) { return e.from === cur; });
      if (os.length) {
        info.appendChild(h('p', { 'class': 'kick' }, T('flow.nextTo')));
        var c = h('div', { 'class': 'chips' });
        os.forEach(function (e) {
          c.appendChild(h('button', { 'class': 'chip', type: 'button', on: { click: function () { go(e.to); } } }, (e.kind === 'loop' ? '↻ ' : e.kind === 'branch' ? '⑂ ' : '→ ') + (e.label ? e.label + '：' : '') + steps[e.to].name));
        });
        info.appendChild(c);
        os.forEach(function (e) { if (e.cond) info.appendChild(CN.richEl('p', 'hint', '**' + (e.label || steps[e.to].name) + '**：' + e.cond)); });
      } else info.appendChild(h('p', { 'class': 'hint' }, T('flow.end')));
      if (st.ch && st.ch.length) info.appendChild(CN.chLinks(st.ch));
    }
    btnNext.addEventListener('click', function () { move(1); }); btnPrev.addEventListener('click', function () { move(-1); }); btnFirst.addEventListener('click', first);
    draw();
    var rt = null, lastO = G.o;
    if (d.direction !== 'h' && d.direction !== 'v') window.addEventListener('resize', function () {
      clearTimeout(rt); rt = setTimeout(function () { if (el.offsetParent && chooseOrient() !== lastO) { lastO = chooseOrient(); draw(); } }, 150);
    });
  };
  CN.searchText.flow = function (d) {
    return d.steps.map(function (st) { return [st.name, st.sub, st.desc, [].concat(st.inputs || []).join(' '), [].concat(st.outputs || []).join(' '), [].concat(st.caution || []).join(' ')].filter(Boolean).join(' '); }).join(' ');
  };

  /* ================= 11 断面・構成の層図 =================
     CN.add('layers', 'c02-x', { title, width?: 440, ends?: ['外側', '内側'], layers: [{ id, name, h?: 54, dim?: '厚さの目安',
        parts?: [{ id, name, sub?, kind?, w?: 1, x?, wf?, gap?: true, desc… }]   // parts がなければ層全体が 1 つの部位
        kind?, desc?, material?, dims?, role?, note?, ch? }] }) */
  CN.widgets.layers = function (el, d, ctx) {
    var T = function (k) { return CN.t(k, d); };
    var L = d.layers;
    if (!L || !L.length) throw new Error('layers: layers が空です');
    var parts = [], byId = {}, rowsP = [];
    L.forEach(function (ly, li) {
      var ps = ly.parts && ly.parts.length ? ly.parts : [ly], row = [];
      ps.forEach(function (p, pi) {
        var o = { p: p, li: li, pi: pi, layer: ly, multi: ps !== ly.parts ? false : true, gap: !!p.gap, id: p.id || (ly.id || 'l' + li) + (ps === ly.parts ? '-' + pi : '') };
        if (!o.gap) { if (byId[o.id]) throw new Error('layers: 部位 id "' + o.id + '" が重複しています'); byId[o.id] = o; o.k = parts.length; parts.push(o); }
        row.push(o);
      });
      rowsP.push(row);
    });
    var W = d.width || 420, anyDim = L.some(function (l) { return l.dim; }), anyName = L.some(function (l) { return l.parts && l.parts.length && l.name; });
    var gutter = anyName ? 70 : 0, rightM = anyDim ? 62 : 0, padX = 12, innerW = W - padX * 2 - gutter - rightM, y = d.ends ? 24 : 8, gy = 3;
    CN.frame(el, T('layers.kind'), d.title);
    var body = h('div', { 'class': 'wg-body' }), info = h('div', { 'class': 'wg-info ly-info', 'aria-live': 'polite' });
    var els = [], selK = null;
    var order = L.map(function (l) { return l.name; }).join('、');
    var rowsY = [];
    var H = y;
    L.forEach(function (ly, li) { var hh = Math.max(30, Math.min(160, ly.h || 52)); rowsY.push([H, hh]); H += hh + gy; });
    H += d.ends ? 22 : 6;
    var svg = s('svg', { 'class': 'ly-svg', id: ctx.id, viewBox: '0 0 ' + W + ' ' + H, role: 'group', 'aria-label': d.title + '（' + T('layers.kind') + '。' + (d.ends ? d.ends[0] + 'から' + d.ends[1] + 'へ：' : '上から：') + order + '）', style: 'max-width:' + Math.round(W * 1.45) + 'px' });
    if (d.ends) {
      svg.appendChild(s('text', { 'class': 'ly-end', x: padX + gutter, y: 15 }, '▲ ' + d.ends[0]));
      svg.appendChild(s('text', { 'class': 'ly-end', x: padX + gutter, y: H - 6 }, '▼ ' + d.ends[1]));
    }
    rowsP.forEach(function (row, li) {
      var ly = L[li], ry = rowsY[li][0], rh = rowsY[li][1], abs = row.some(function (o) { return o.p.x != null; }), tot = 0, acc = 0, x0 = padX + gutter;
      row.forEach(function (o) { tot += o.p.w || 1; });
      if (anyName && ly.parts && ly.parts.length) {
        var nl = CN.wrap(ly.name, gutter - 6, 12);
        nl.slice(0, 3).forEach(function (t, k) { svg.appendChild(s('text', { 'class': 'ly-gn', x: padX + gutter - 8, y: ry + rh / 2 + 4 + (k - (Math.min(nl.length, 3) - 1) / 2) * 13, 'text-anchor': 'end' }, t)); });
      }
      if (ly.dim) svg.appendChild(s('text', { 'class': 'ly-dim', x: W - padX - rightM + 8, y: ry + rh / 2 + 4 }, ly.dim));
      row.forEach(function (o) {
        var p = o.p, px, pw;
        if (abs) { px = x0 + (p.x || 0) * innerW; pw = (p.wf != null ? p.wf : 0.2) * innerW; } else { px = x0 + acc / tot * innerW; pw = (p.w || 1) / tot * innerW; acc += p.w || 1; }
        if (o.gap) return;
        var lab = p.label || p.name, g = s('g', { 'class': 'ly-part kind-' + CN.kind(p.kind || ly.kind), tabindex: 0, role: 'button', 'aria-pressed': 'false', 'aria-label': (ly.parts && ly.name ? ly.name + '、' : '') + p.name + (p.sub ? '（' + p.sub + '）' : '') + ' の説明', 'data-id': o.id });
        g.appendChild(s('rect', { x: px.toFixed(1), y: ry, width: Math.max(8, pw - 2).toFixed(1), height: rh, rx: 6 }));
        var fs = 15, lines = CN.wrap(lab, pw - 10, fs), sub = p.sub ? CN.wrap(p.sub, pw - 10, 10.5).slice(0, 1) : [];
        if (lines.length * (fs + 2) + (sub.length ? 13 : 0) > rh - 6) { fs = 12.5; lines = CN.wrap(lab, pw - 8, fs); }
        var tot2 = lines.length * (fs + 2) + (sub.length ? 13 : 0), ty = ry + rh / 2 - tot2 / 2 + fs;
        lines.forEach(function (t, k) { g.appendChild(s('text', { 'class': 'l1', x: (px + (pw - 2) / 2).toFixed(1), y: (ty + k * (fs + 2)).toFixed(1), style: 'font-size:' + fs + 'px' }, t)); });
        sub.forEach(function (t) { g.appendChild(s('text', { 'class': 'l2', x: (px + (pw - 2) / 2).toFixed(1), y: (ty + lines.length * (fs + 2) - 1).toFixed(1) }, t)); });
        o.cx = px + pw / 2; o.cy = ry + rh / 2; o.el = g;
        g.addEventListener('click', function () { pick(o.k); });
        g.addEventListener('keydown', function (e) {
          var n = null;
          if (isEnter(e)) { e.preventDefault(); pick(o.k); return; }
          if (e.key === 'ArrowDown') n = neighbor(o, 1, 0); else if (e.key === 'ArrowUp') n = neighbor(o, -1, 0);
          else if (e.key === 'ArrowRight') n = neighbor(o, 0, 1); else if (e.key === 'ArrowLeft') n = neighbor(o, 0, -1);
          if (e.key.indexOf('Arrow') === 0) { e.preventDefault(); if (n) { pick(n.k); n.el.focus(); } }
        });
        svg.appendChild(g); els.push(g);
      });
    });
    function neighbor(o, dr, dc) {
      var best = null, bs = 1e9;
      parts.forEach(function (q) {
        if (q === o) return;
        if (dr && Math.sign(q.li - o.li) !== dr) return;
        if (dc && (q.li !== o.li || Math.sign(q.cx - o.cx) !== dc)) return;
        if (!dr && !dc) return;
        var sc = dr ? Math.abs(q.li - o.li) * 1000 + Math.abs(q.cx - o.cx) : Math.abs(q.cx - o.cx);
        if (sc < bs) { bs = sc; best = q; }
      });
      return best;
    }
    var wrap = h('div', { 'class': 'scroll-x' }, svg);
    body.appendChild(wrap);
    var lgd = h('div', { 'class': 'legend' }), kinds = {};
    parts.forEach(function (o) { var kk = CN.kind(o.p.kind || o.layer.kind), nm = CN.kindName(o.p.kind || o.layer.kind, d); if (nm && !kinds[kk]) { kinds[kk] = 1; lgd.appendChild(h('span', null, h('i', { 'class': 'kd kind-' + kk }), nm)); } });
    lgd.appendChild(h('span', null, T('layers.hint').split('。')[0]));
    body.appendChild(lgd);
    el.appendChild(body); el.appendChild(info);
    var det = h('details', { 'class': 'seq-list' }, h('summary', null, T('layers.list') + '（' + parts.length + '）')), ol = h('ol'), lbtn = [], lastLi = -1;
    parts.forEach(function (o) {
      if (o.li !== lastLi) { lastLi = o.li; if (o.layer.parts && o.layer.name) ol.appendChild(h('li', { 'class': 'ph-h' }, o.layer.name)); }
      var b = h('button', { type: 'button', on: { click: function () { pick(o.k); } } }, h('span', { 'class': 'no' }, String(o.k + 1)), o.p.name); lbtn.push(b); ol.appendChild(h('li', null, b));
    });
    det.appendChild(ol); el.appendChild(det);

    function pick(k) {
      selK = k;
      parts.forEach(function (o, i) { o.el.setAttribute('class', 'ly-part kind-' + CN.kind(o.p.kind || o.layer.kind) + (i === k ? ' sel' : (selK != null ? ' dim' : ''))); o.el.setAttribute('aria-pressed', String(i === k)); });
      lbtn.forEach(function (b, i) { if (i === k) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
      show(parts[k]);
    }
    function show(o) {
      var p = o.p, ly = o.layer; CN.clear(info);
      info.appendChild(h('p', { 'class': 'kick' }, T('layers.layer') + ' ' + (o.li + 1) + ' / ' + L.length + (ly.parts && ly.name ? ' ・ ' + ly.name : '') + (CN.kindName(p.kind || ly.kind, d) ? ' ・ ' + CN.kindName(p.kind || ly.kind, d) : '')));
      info.appendChild(h('h5', null, p.name + (p.sub ? '（' + p.sub + '）' : '')));
      var dl = h('dl');
      [['material', 'layers.f.material'], ['dims', 'layers.f.dims'], ['role', 'layers.f.role']].forEach(function (f) { var v = p[f[0]]; if (v) { dl.appendChild(h('dt', null, T(f[1]))); dl.appendChild(h('dd', { html: CN.rich(v) })); } });
      if (dl.firstChild) info.appendChild(dl);
      if (p.desc) info.appendChild(CN.richEl('p', '', p.desc));
      if (p.note) info.appendChild(CN.richEl('p', 'hint', '**' + T('layers.f.note') + '**：' + p.note));
      var c = h('div', { 'class': 'chips' });
      [[-1, '▲ '], [1, '▼ ']].forEach(function (z) { var n = neighbor(o, z[0], 0); if (n) c.appendChild(h('button', { 'class': 'chip', type: 'button', on: { click: function () { pick(n.k); } } }, z[1] + n.p.name)); });
      if (c.firstChild) info.appendChild(c);
      if (p.ch && p.ch.length) info.appendChild(CN.chLinks(p.ch));
    }
    info.appendChild(h('p', { 'class': 'hint' }, d.hint || T('layers.hint')));
    if (d.initial && byId[d.initial]) pick(byId[d.initial].k);
  };
  CN.searchText.layers = function (d) {
    var out = [];
    d.layers.forEach(function (l) { out.push(l.name, l.desc, l.material, l.role); (l.parts || []).forEach(function (p) { out.push(p.name, p.sub, p.desc, p.material, p.role, p.note); }); });
    return out.filter(Boolean).join(' ');
  };
})();
