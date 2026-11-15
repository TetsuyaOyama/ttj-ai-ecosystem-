/* 部品2：シーケンス再生 seq — 登場人物（縦の線）と手順（矢印）が一手ずつ現れる。再生／一時停止／前後／速度／スライダー */
(function () {
  'use strict';
  var h = CN.h, s = CN.s;

  CN.widgets.seq = function (el, d, ctx) {
    var T = function (k) { return CN.t(k, d); };
    var actors = d.actors, steps = d.steps, N = actors.length;
    if (!N || !steps || !steps.length) throw new Error('seq: actors / steps が空です');
    var colW = Math.max(128, Math.min(190, Math.floor(940 / N))), W = N * colW, X = {}, byId = {};
    actors.forEach(function (a, i) { X[a.id] = colW * (i + 0.5); byId[a.id] = a; });

    /* ---- 行の配置を先に計算 ---- */
    var y = 6, lastPhase = null, rows = [], bands = [];
    steps.forEach(function (st, i) {
      var r = { st: st, i: i, y: y };
      if (st.phase && st.phase !== lastPhase) {
        if (bands.length) bands[bands.length - 1].y1 = y;
        bands.push({ label: st.phase, y0: y, y1: null });
        y += 24; r.y = y; lastPhase = st.phase;
      }
      var isNote = st.note != null || st.from === st.to;
      if (isNote) {
        var a0 = st.span ? X[st.span[0]] : X[st.at || st.from], a1 = st.span ? X[st.span[1]] : a0;
        if (a0 == null) throw new Error('seq: 手順' + (i + 1) + ' の登場人物 id が不正です');
        var ntext = st.note != null ? st.note : (st.msg || ''), tpx = 0, ci;
        for (ci = 0; ci < ntext.length; ci++) tpx += ntext.charCodeAt(ci) > 255 ? 12 : 7.2;
        /* 装置内の注記（at）や短い span の箱は、行数が 4 行ほどに収まる幅まで広げる（狭くて縦に伸びるのを防ぐ） */
        var bw = Math.max(colW * (st.span ? 1.45 : 1.9), Math.abs(a1 - a0) + colW * 0.9, Math.min(tpx / 4 + 22, colW * 3.4)), cx = (a0 + a1) / 2;
        bw = Math.min(bw, W - 8); cx = Math.max(bw / 2 + 4, Math.min(W - bw / 2 - 4, cx));
        r.note = true; r.lines = CN.wrap(ntext, bw - 22, 12); r.bw = bw; r.cx = cx;
        r.h = r.lines.length * 16 + 22 + 12;
      } else {
        if (X[st.from] == null || X[st.to] == null) throw new Error('seq: 手順' + (i + 1) + ' の from/to が actors にありません');
        var dist = Math.abs(X[st.to] - X[st.from]);
        r.lines = CN.wrap(st.lbl || st.msg, Math.max(96, dist - 8), 12.5);
        r.h = r.lines.length * 15 + 38;
      }
      y += r.h; rows.push(r);
    });
    if (bands.length) bands[bands.length - 1].y1 = y;
    var H = y + 8, minW = Math.max(520, Math.round(W * 0.8));

    /* ---- 枠・操作 ---- */
    CN.frame(el, T('seq.kind'), d.title);
    var cur = Math.max(0, Math.min(steps.length - 1, d.start || 0)), playing = false, timer = null, speed = 1;
    var btnFirst = h('button', { 'class': 'btn', type: 'button', 'aria-label': '最初の手順へ' }, '⏮'),
      btnPrev = h('button', { 'class': 'btn', type: 'button' }, '◀ 前へ'),
      btnPlay = h('button', { 'class': 'btn pri', type: 'button', 'aria-pressed': 'false' }, '▶ 再生'),
      btnNext = h('button', { 'class': 'btn', type: 'button' }, '次へ ▶'),
      range = h('input', { type: 'range', min: 1, max: steps.length, value: 1, 'aria-label': '手順の位置' }),
      cnt = h('span', { 'class': 'cnt', 'aria-hidden': 'true' }),
      sel = h('select', { 'aria-label': '再生速度' }, h('option', { value: '0.5' }, '0.5×'), h('option', { value: '1', selected: '' }, '1×'), h('option', { value: '2' }, '2×'));
    el.appendChild(h('div', { 'class': 'seq-ctl' }, btnFirst, btnPrev, btnPlay, btnNext, range, cnt, h('label', { 'class': 'sr-only', 'for': ctx.id + '-sp' }, '速度'), sel));
    sel.id = ctx.id + '-sp';

    /* ---- SVG（見出し＝装置名は固定、本体はスクロール） ---- */
    var stage = h('div', { 'class': 'seq-stage', tabindex: 0, role: 'group', 'aria-label': 'シーケンス図。左右の矢印キーで手順を進め、スペースで再生／一時停止します' });
    var inner = h('div', { 'class': 'seq-inner', style: 'min-width:' + minW + 'px' });
    var hd = s('svg', { 'class': 'hd seq-svg', viewBox: '0 0 ' + W + ' 56', 'aria-hidden': 'true' });
    var bw0 = Math.min(150, colW - 20);
    actors.forEach(function (a) {
      var g = s('g', { 'class': 'act kind-' + CN.kind(a.kind) });
      g.appendChild(s('rect', { x: X[a.id] - bw0 / 2, y: 5, width: bw0, height: 46, rx: 8 }));
      if (a.sub) { g.appendChild(s('text', { 'class': 'l1', x: X[a.id], y: 25 }, a.name)); g.appendChild(s('text', { 'class': 'l2', x: X[a.id], y: 41 }, a.sub)); }
      else g.appendChild(s('text', { 'class': 'l1', x: X[a.id], y: 33 }, a.name));
      hd.appendChild(g);
    });
    var svg = s('svg', { 'class': 'seq-svg', id: ctx.id, viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': d.title + ' のシーケンス図（' + steps.length + ' 手）' });
    bands.forEach(function (b, i) {
      if (i % 2 === 0) svg.appendChild(s('rect', { 'class': 'band', x: 0, y: b.y0, width: W, height: b.y1 - b.y0 }));
      svg.appendChild(s('text', { 'class': 'ph', x: 8, y: b.y0 + 16 }, b.label));
    });
    actors.forEach(function (a) { svg.appendChild(s('line', { 'class': 'life', x1: X[a.id], x2: X[a.id], y1: 0, y2: H })); });
    var gs = rows.map(function (r) {
      var st = r.st, g = s('g', { 'class': 'st' + (st.dash ? ' dash' : ''), 'data-i': r.i });
      g.appendChild(s('rect', { 'class': 'hit', x: 0, y: r.y, width: W, height: r.h }));
      if (r.note) {
        g.appendChild(s('rect', { 'class': 'nbox', x: r.cx - r.bw / 2, y: r.y + 4, width: r.bw, height: r.h - 12, rx: 8 }));
        r.lines.forEach(function (ln, k) { g.appendChild(s('text', { 'class': 'ntx', x: r.cx, y: r.y + 4 + 20 + k * 16 }, ln)); });
        g.appendChild(s('text', { 'class': 'idx', x: r.cx - r.bw / 2 + 6, y: r.y + 4 + 11 }, String(r.i + 1)));
      } else {
        var xf = X[st.from], xt = X[st.to], dir = xt > xf ? 1 : -1, ay = r.y + r.lines.length * 15 + 22;
        r.lines.forEach(function (ln, k) { g.appendChild(s('text', { 'class': 'lbl halo', x: (xf + xt) / 2, y: r.y + 14 + k * 15 }, ln)); });
        g.appendChild(s('path', { 'class': 'ar', d: 'M' + (xf + dir * 10) + ' ' + ay + ' L' + (xt - dir * 3) + ' ' + ay }));
        g.appendChild(s('polygon', { 'class': 'ah', points: (xt - dir * 1) + ',' + ay + ' ' + (xt - dir * 10) + ',' + (ay - 5) + ' ' + (xt - dir * 10) + ',' + (ay + 5) }));
        g.appendChild(s('circle', { 'class': 'nc', cx: xf, cy: ay, r: 9 }));
        g.appendChild(s('text', { 'class': 'nn', x: xf, y: ay + 3.5 }, String(r.i + 1)));
      }
      svg.appendChild(g);
      g.addEventListener('click', function () { go(r.i, true); });
      return g;
    });
    inner.appendChild(hd); inner.appendChild(svg); stage.appendChild(inner);
    el.appendChild(h('div', { 'class': 'scroll-hint' }, '図は左右にもスクロールできます'));
    el.appendChild(stage);

    /* ---- 説明パネル／一覧 ---- */
    var info = h('div', { 'class': 'wg-info seq-info', 'aria-live': 'polite' });
    el.appendChild(info);
    var listBtns = [], det = h('details', { 'class': 'seq-list' }, h('summary', null, '手順の一覧（' + steps.length + ' 手）'));
    var ol = h('ol'); var lp = null;
    steps.forEach(function (st, i) {
      if (st.phase && st.phase !== lp) { ol.appendChild(h('li', { 'class': 'ph-h' }, st.phase)); lp = st.phase; }
      var b = h('button', { type: 'button', on: { click: function () { go(i, true); } } }, h('span', { 'class': 'no' }, String(i + 1)), st.msg || st.note || '');
      listBtns.push(b); ol.appendChild(h('li', null, b));
    });
    det.appendChild(ol); el.appendChild(det);

    function ieList(ie) { return Array.isArray(ie) ? ie : (ie ? [ie] : []); }
    function render() {
      var st = steps[cur];
      gs.forEach(function (g, i) { g.setAttribute('class', 'st' + (steps[i].dash ? ' dash' : '') + (i <= cur ? ' on' : '') + (i === cur ? ' cur' : '')); });
      listBtns.forEach(function (b, i) { if (i === cur) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
      cnt.textContent = (cur + 1) + ' / ' + steps.length;
      range.value = cur + 1;
      btnPrev.disabled = btnFirst.disabled = cur === 0;
      btnNext.disabled = cur === steps.length - 1;
      CN.clear(info);
      info.appendChild(h('p', { 'class': 'kick' }, '手順 ' + (cur + 1) + ' / ' + steps.length + (st.phase ? ' ・ ' + st.phase : '')));
      info.appendChild(h('h5', null, st.msg || st.note || ''));
      var meta = h('div', { 'class': 'meta' });
      if (st['if']) meta.appendChild(h('span', { 'class': 'chip' }, T('seq.ifLabel') + '：' + st['if']));
      if (st.from && st.to && st.from !== st.to) meta.appendChild(h('span', { 'class': 'chip' }, byId[st.from].name + ' → ' + byId[st.to].name));
      else meta.appendChild(h('span', { 'class': 'chip' }, T('seq.self') + '：' + (st.span ? st.span.map(function (x) { return byId[x].name; }).join('〜') : byId[st.at || st.from].name)));
      info.appendChild(meta);
      var dl = h('dl'), ies = ieList(st.ie);
      if (ies.length) { dl.appendChild(h('dt', null, T('seq.ieLabel'))); var dd = h('dd'); ies.forEach(function (x, k) { if (k) dd.appendChild(document.createTextNode(' ')); dd.appendChild(h('code', null, x)); }); dl.appendChild(dd); }
      if (st.what) { dl.appendChild(h('dt', null, T('seq.what'))); dl.appendChild(h('dd', { html: CN.rich(st.what) })); }
      if (st.trap) { dl.appendChild(h('dt', null, T('seq.trap'))); dl.appendChild(h('dd', { html: CN.rich(st.trap) })); }
      info.appendChild(dl);
    }

    function scrollTo(i) {
      var r = rows[i], k = svg.getBoundingClientRect().width / W, hdH = hd.getBoundingClientRect().height;
      var top = r.y * k - hdH, bot = (r.y + r.h) * k, vis0 = stage.scrollTop, vis1 = stage.scrollTop + stage.clientHeight - hdH - 10;
      var want = null;
      if (top < vis0 + 4 || bot > vis1) want = Math.max(0, (r.y + r.h / 2) * k - (stage.clientHeight - hdH) / 2);
      var ax = r.note ? r.cx : (X[r.st.from] + X[r.st.to]) / 2, lx = ax * k - stage.clientWidth / 2;
      var opt = { behavior: CN.reduced() ? 'auto' : 'smooth' };
      if (want != null) opt.top = want;
      if (inner.getBoundingClientRect().width > stage.clientWidth + 2) opt.left = Math.max(0, lx);
      if (opt.top != null || opt.left != null) stage.scrollTo(opt);
    }
    function go(i, user) {
      cur = Math.max(0, Math.min(steps.length - 1, i));
      if (user) stop();
      render(); scrollTo(cur);
    }
    function stop() { playing = false; clearTimeout(timer); btnPlay.textContent = '▶ 再生'; btnPlay.setAttribute('aria-pressed', 'false'); }
    function tick() {
      if (!playing) return;
      if (!el.offsetParent) { stop(); return; }
      if (cur >= steps.length - 1) { stop(); return; }
      go(cur + 1, false);
      if (cur >= steps.length - 1) { stop(); return; }
      timer = setTimeout(tick, 2600 / speed);
    }
    function play() {
      if (playing) { stop(); return; }
      if (cur >= steps.length - 1) go(0, false);
      playing = true; btnPlay.textContent = '⏸ 一時停止'; btnPlay.setAttribute('aria-pressed', 'true');
      timer = setTimeout(tick, 1400 / speed);
    }
    btnFirst.addEventListener('click', function () { go(0, true); });
    btnPrev.addEventListener('click', function () { go(cur - 1, true); });
    btnNext.addEventListener('click', function () { go(cur + 1, true); });
    btnPlay.addEventListener('click', play);
    range.addEventListener('input', function () { go(parseInt(range.value, 10) - 1, true); });
    sel.addEventListener('change', function () { speed = parseFloat(sel.value) || 1; });
    stage.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(cur + 1, true); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(cur - 1, true); }
      else if (e.key === 'Home') { e.preventDefault(); go(0, true); }
      else if (e.key === 'End') { e.preventDefault(); go(steps.length - 1, true); }
      else if (e.key === ' ') { e.preventDefault(); play(); }
    });
    render();
  };

  CN.searchText.seq = function (d) {
    return d.steps.map(function (st) { return [st.msg, st.note, st['if'], [].concat(st.ie || []).join(' '), st.what, st.trap].filter(Boolean).join(' '); }).join(' ');
  };
})();
