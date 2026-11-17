/* 部品：strip（限月の階段）。連続する限月の短期金利先物の価格（＝ 100 − 金利）を階段状に並べ、金利の曲線の変化（水準・傾き・曲率・限月ごとの調整）を動かして、
   限月間スプレッド・バタフライ・コンドルの値と損益がどの変化に反応するかを見る実験台。使う章があるときだけ build.py が埋め込む（js/opt/）。
   mode：'stairs'（階段の図だけ）／'combo'（組み合わせを選び、階段の上に脚を示す）／'pnl'（横軸に変化、縦軸に損益）。
   データ形式は FRAMEWORK.md の「strip」。すべて学習用の模型で、金利・価格は架空。実際の取引の判断には使えない。
   式の定義（この部品の中の計算。ブラウザでも node でも同じ）：
     限月 k（1〜n）の金利 r_k ＝ 基の金利 ＋ （L ＋ S × x_k ＋ K × m_k ＋ e_k）÷ 100   （L・S・K・e は bp。r は％）
     x_k ＝ k −（n＋1）÷ 2（傾きの形）、m_k ＝（q の平均 − q_k）÷（q_両端 − q_中央）、q_k ＝ x_k²（曲率の形。中央の限月と両端の限月の金利の差が K bp になる）
     価格 F_k ＝ 100 − r_k。組み合わせの値 V ＝ Σ（重み × F）。損益（ティック）＝ ΔV ÷ 呼値の単位。損益（円）＝ ティック × 1 ティックの価値 × 枚数。 */
(function () {
  'use strict';
  var h = CN.h, s = CN.s;

  /* ================= 数の書き方 ================= */
  function fix(x, d) { if (!isFinite(x)) return '—'; var t = x.toFixed(d); if (/^-0(\.0+)?$/.test(t)) t = t.slice(1); return t.replace('-', '−'); }
  function grp(t) { return t.replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function fixg(x, d) { var t = fix(x, d), m = /^(−?)(\d+)(\.\d+)?$/.exec(t); return m ? m[1] + grp(m[2]) + (m[3] || '') : t; }
  function sg(x, d) { var t = fix(x, d); return (x > 0 && t !== fix(0, d)) ? '＋' + t : t; }
  function sgg(x, d) { var t = fixg(x, d); return (x > 0 && t !== fix(0, d)) ? '＋' + t : t; }
  function niceStep(range, n) {
    var raw = range / n, mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10 + 1e-12)), r = raw / mag;
    return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 2.5 ? 2.5 : r <= 5 ? 5 : 10) * mag;
  }
  function decOf(step) { var m = /e-(\d+)/.exec(String(step)), q = /\.(\d+)/.exec(String(step)); return m ? parseInt(m[1], 10) : (q ? q[1].length : 0); }
  function measure(el, fb) { var w = el.clientWidth; return w > 40 ? w : (fb || 320); }
  function watchWidth(el, fn) {
    var last = 0, t = null;
    function chk() { var w = el.clientWidth; if (w > 40 && Math.abs(w - last) > 2) { last = w; fn(); } }
    if (window.ResizeObserver) { var ro = new ResizeObserver(function () { clearTimeout(t); t = setTimeout(chk, 60); }); ro.observe(el); }
    else window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(chk, 120); });
    setTimeout(chk, 0);
  }

  /* ================= 計算（純粋な関数。node からも呼べる） ================= */
  var KINDS = {
    spread: { label: '限月間スプレッド', short: 'スプレッド', w: [1, -1] },
    fly: { label: 'バタフライ', short: 'バタフライ', w: [1, -2, 1] },
    condor: { label: 'コンドル', short: 'コンドル', w: [1, -1, -1, 1] }
  };
  var KEYS = ['spread', 'fly', 'condor'];
  var LEGNAME = { spread: ['期近', '期先'], fly: ['手前', '中央', '先'], condor: ['手前', '中の手前', '中の先', '先'] };
  var FACT = { L: { name: '水準', unit: 'bp', note: '全限月の金利が同じだけ動く（平行移動）' }, S: { name: '傾き', unit: 'bp／限月', note: '隣り合う限月の金利の差が変わる（スティープ化・フラット化）' }, K: { name: '曲率', unit: 'bp', note: '中央の限月の金利が両端の限月に対して動く（山型・谷型）' } };

  function shapes(n) {
    var x = [], q = [], i, mq = 0;
    for (i = 0; i < n; i++) { x.push(i - (n - 1) / 2); q.push(x[i] * x[i]); mq += q[i] / n; }
    var qEnd = q[0], qMid = Math.min.apply(null, q), m = q.map(function (v) { return (mq - v) / (qEnd - qMid); });
    return { x: x, m: m };
  }
  function ratesOf(d, st) {
    var n = d.base.length, sh = shapes(n);
    return d.base.map(function (b, i) { return b + ((st.L || 0) + (st.S || 0) * sh.x[i] + (st.K || 0) * sh.m[i] + ((st.e && st.e[i]) || 0)) / 100; });
  }
  /* 脚：start は 1 始まり。範囲を超えるときは、収まる最後の位置にそろえる */
  function legsOf(n, kind, start, gap, dir) {
    var w = KINDS[kind].w, g = Math.max(1, gap || 1), last = n - (w.length - 1) * g, p = Math.max(1, Math.min(start || 1, last));
    return { p: p, gap: g, legs: w.map(function (wt, j) { return { i: p - 1 + j * g, w: wt * (dir || 1), name: LEGNAME[kind][j] }; }) };
  }
  function valueOf(F, legs) { var v = 0; legs.forEach(function (l) { v += l.w * F[l.i]; }); return v; }
  /* 1 つの組み合わせの結果。st：変化（L・S・K・e）。lots：枚数 */
  function calc(d, st, combo) {
    var sp = d.spec, n = d.base.length, r0 = d.base.slice(), r1 = ratesOf(d, st), F0 = r0.map(function (r) { return 100 - r; }), F1 = r1.map(function (r) { return 100 - r; });
    var L = legsOf(n, combo.kind, combo.p, combo.gap, combo.dir), V0 = valueOf(F0, L.legs), V1 = valueOf(F1, L.legs), dT = (V1 - V0) / sp.tick;
    var parts = {}; ['L', 'S', 'K', 'e'].forEach(function (k) {
      var o = { L: 0, S: 0, K: 0, e: [] }; if (k === 'e') o.e = (st.e || []).slice(); else o[k] = st[k] || 0;
      parts[k] = (valueOf(ratesOf(d, o).map(function (r) { return 100 - r; }), L.legs) - V0) / sp.tick;
    });
    return { r0: r0, r1: r1, F0: F0, F1: F1, legs: L.legs, p: L.p, gap: L.gap, V0: V0, V1: V1, dTicks: dT, yen: dT * sp.tickYen * (combo.lots || 1), parts: parts };
  }
  /* 単位の変化（水準 1 bp、傾き 1 bp／限月、曲率 1 bp）あたりのティック数 */
  function sens(d, kind, p, gap, dir, fx) {
    var st = { L: 0, S: 0, K: 0, e: [] }; st[fx] = 1;
    return calc(d, st, { kind: kind, p: p, gap: gap, dir: dir, lots: 1 }).dTicks;
  }
  CN.strip = { calc: calc, sens: sens, legsOf: legsOf, ratesOf: ratesOf, shapes: shapes, KINDS: KINDS };

  /* ================= 部品 ================= */
  var RANGES = { L: [-30, 30, 0.5], S: [-6, 6, 0.25], K: [-10, 10, 0.5], e: [-5, 5, 0.25] };

  CN.widgets.strip = function (el, d, ctx) {
    var mode = d.mode || 'stairs', n = d.base.length, sp = d.spec, rg = d.ranges || RANGES, names = d.names || d.base.map(function (_, i) { return '第' + (i + 1) + '限月'; });
    var ini = d.initial || {};
    var st = { L: ini.L || 0, S: ini.S || 0, K: ini.K || 0, e: d.base.map(function (_, i) { return (ini.e && ini.e[i]) || 0; }),
      kind: ini.kind || 'spread', dir: ini.dir || 1, p: ini.p || 1, gap: ini.gap || 1, lots: ini.lots || 1, fx: ini.fx || 'S' };
    var cur = null, pst = null;
    CN.frame(el, mode === 'pnl' ? '損益の形' : mode === 'combo' ? '組み合わせの実験台' : '限月の階段', d.title);
    var body = h('div', { 'class': 'wg-body lab-body st-body' }); el.appendChild(body);
    el.appendChild(h('p', { 'class': 'lab-disc' }, d.disclaimer || '学習用の模型です。金利と価格はすべて架空で、実際の価格・取引の判断の材料ではありません。将来の金利や価格の予測ではありません。'));
    if (d.intro) body.appendChild(CN.richEl('p', 'lab-intro', d.intro));
    var sliderEls = {}, btnGroups = {}, readBox, resBox, figBox, tabBox, decoBox, presetBtns = [], presetNote = null, detBox = null, kindNote = null;

    /* ---- 入力の部品 ---- */
    function slider(key, label, unit, r, getv, setv, opts) {
      opts = opts || {};
      var id = ctx.id + '-' + key, dec = decOf(r[2]), wrap = h('div', { 'class': 'lab-in' + (opts.small ? ' st-small' : '') });
      var out = h('output', { 'for': id, 'class': 'lab-val' });
      wrap.appendChild(h('div', { 'class': 'lab-in-h' }, h('label', { 'for': id }, label + (unit ? '（' + unit + '）' : '')), out));
      var inp = h('input', { type: 'range', id: id, min: r[0], max: r[1], step: r[2], value: getv() });
      var fmt = opts.plain ? fix : sg;
      function sync() { var v = parseFloat(inp.value); setv(v); out.textContent = fmt(v, dec) + (unit ? ' ' + unit : ''); inp.setAttribute('aria-valuetext', out.textContent); }
      inp.addEventListener('input', function () { sync(); refresh(); });
      wrap.appendChild(inp);
      wrap.appendChild(h('div', { 'class': 'lab-minmax' }, h('span', null, fmt(r[0], dec)), h('span', null, fmt(r[1], dec))));
      if (opts.hint) wrap.appendChild(h('p', { 'class': 'lab-say' }, opts.hint));
      out.textContent = fmt(getv(), dec) + (unit ? ' ' + unit : ''); inp.setAttribute('aria-valuetext', out.textContent);
      sliderEls[key] = { inp: inp, sync: function () { inp.value = getv(); out.textContent = fmt(getv(), dec) + (unit ? ' ' + unit : ''); inp.setAttribute('aria-valuetext', out.textContent); } };
      return wrap;
    }
    function choice(key, label, opts, getv, setv) {
      var wrap = h('div', { 'class': 'lab-in' }), grp = h('div', { 'class': 'lab-presets st-choice', role: 'group', 'aria-label': label }), btns = [];
      wrap.appendChild(h('div', { 'class': 'lab-in-h' }, h('span', { 'class': 'st-ch-l' }, label)));
      opts.forEach(function (o) {
        var b = h('button', { type: 'button', 'class': 'btn sm', 'aria-pressed': String(getv() === o.v) }, o.label);
        b.addEventListener('click', function () { setv(o.v); sync(); refresh(); });
        btns.push([b, o]); grp.appendChild(b);
      });
      function sync() { btns.forEach(function (z) { z[0].setAttribute('aria-pressed', String(getv() === z[1].v)); }); }
      wrap.appendChild(grp); btnGroups[key] = sync;
      return wrap;
    }
    function syncAll() { var k; for (k in sliderEls) sliderEls[k].sync(); for (k in btnGroups) btnGroups[k](); }

    /* ---- 画面の組み立て ---- */
    if ((mode === 'stairs' || mode === 'combo') && d.presets && d.presets.length) {
      var pbar = h('div', { 'class': 'lab-preset-bar' }), pl = d.presetLabel || '曲線の動かし方をまとめて決める（押すと、下のつまみが動きます）';
      pbar.appendChild(h('div', { 'class': 'lab-preset-h' }, pl));
      var pg = h('div', { 'class': 'lab-presets', role: 'group', 'aria-label': pl });
      d.presets.forEach(function (p, pi) {
        var b = h('button', { type: 'button', 'class': 'btn sm', 'aria-pressed': 'false' }, p.label);
        b.addEventListener('click', function () { applyPreset(p); }); presetBtns.push(b); pg.appendChild(b);
      });
      pbar.appendChild(pg); presetNote = h('p', { 'class': 'lab-say lab-preset-note', 'aria-live': 'polite' }); pbar.appendChild(presetNote); body.appendChild(pbar);
    }
    var top = h('div', { 'class': 'lab-top' }), inputs = h('div', { 'class': 'lab-inputs' }), right = h('div', { 'class': 'lab-right' });
    top.appendChild(inputs); top.appendChild(right); body.appendChild(top);

    /* 組み合わせの選び方 */
    if (mode === 'combo') {
      inputs.appendChild(choice('kind', '組み合わせの種類', KEYS.map(function (k) { return { v: k, label: KINDS[k].label + '（' + KINDS[k].w.length + ' 限月）' }; }), function () { return st.kind; }, function (v) { st.kind = v; }));
    }
    if (mode === 'combo' || mode === 'pnl') {
      inputs.appendChild(choice('dir', '向き（買いと売りは、重みの符号がすべて逆）', [{ v: 1, label: '買い（取引所の定義の向き）' }, { v: -1, label: '売り（逆向き）' }], function () { return st.dir; }, function (v) { st.dir = v; }));
      inputs.appendChild(slider('p', '組み合わせの一番手前の限月（第 k 限月）', '', [1, n, 1], function () { return st.p; }, function (v) { st.p = v; }, { plain: true, hint: '先の限月まで脚が収まらないときは、収まる最後の位置にそろえます。' }));
      inputs.appendChild(choice('gap', '脚の間隔', [{ v: 1, label: '隣り合う限月（3 か月ずつ）' }, { v: 2, label: '1 つおき（6 か月ずつ）' }], function () { return st.gap; }, function (v) { st.gap = v; }));
    }
    if (mode === 'pnl') {
      inputs.appendChild(choice('fx', '横軸に取る曲線の変化', ['L', 'S', 'K'].map(function (k) { return { v: k, label: FACT[k].name }; }), function () { return st.fx; }, function (v) { st.fx = v; }));
      inputs.appendChild(slider('lots', '枚数（1 組あたり）', '枚', [1, 100, 1], function () { return st.lots; }, function (v) { st.lots = v; }, { plain: true }));
    }
    if (mode === 'stairs' || mode === 'combo') {
      inputs.appendChild(slider('L', '水準の変化', 'bp', rg.L, function () { return st.L; }, function (v) { st.L = v; }, { hint: '全限月の金利を同じだけ動かす（平行移動）。' }));
      inputs.appendChild(slider('S', '傾きの変化', 'bp／限月', rg.S, function () { return st.S; }, function (v) { st.S = v; }, { hint: '正：先の金利ほど上がる（スティープ化）。負：フラット化（大きく負にすると右下がりの逆イールド）。' }));
      inputs.appendChild(slider('K', '曲率の変化', 'bp', rg.K, function () { return st.K; }, function (v) { st.K = v; }, { hint: '正：中央の限月の金利が両端の限月より高くなる（山型）。負：低くなる（谷型）。' }));
      detBox = h('details', { 'class': 'seq-list st-det' }, h('summary', null, '限月ごとの個別の調整（金利を 1 限月だけ動かす）'));
      var dg = h('div', { 'class': 'st-det-grid' });
      names.forEach(function (nm, i) { dg.appendChild(slider('e' + i, nm, 'bp', rg.e, function () { return st.e[i]; }, function (v) { st.e[i] = v; }, { small: true })); });
      detBox.appendChild(dg); inputs.appendChild(detBox);
    } else if (mode === 'pnl') {
      detBox = h('details', { 'class': 'seq-list st-det' }, h('summary', null, 'ほかの 2 つの変化を、同時に固定する（横軸に選んだもの以外）'));
      var dg2 = h('div', { 'class': 'st-det-grid one' });
      ['L', 'S', 'K'].forEach(function (k) { dg2.appendChild(slider('o' + k, FACT[k].name + 'の変化（横軸に選んだときは無視）', FACT[k].unit, rg[k], function () { return st[k]; }, function (v) { st[k] = v; }, { small: true })); });
      detBox.appendChild(dg2); inputs.appendChild(detBox);
    }
    var rb = h('button', { type: 'button', 'class': 'btn sm st-reset' }, 'すべて元に戻す');
    rb.addEventListener('click', function () { st.L = 0; st.S = 0; st.K = 0; st.e = st.e.map(function () { return 0; }); syncAll(); refresh(); });
    if (mode !== 'pnl' || true) inputs.appendChild(rb);

    figBox = h('div', { 'class': 'lab-fig st-fig' }); right.appendChild(figBox);
    resBox = h('div', { 'class': 'lab-results', 'aria-live': 'polite' }); right.appendChild(resBox);
    decoBox = h('div', { 'class': 'st-deco' }); body.appendChild(decoBox);   /* 表は 2 段組みの外（全幅）に置く */
    if (d.formula) body.appendChild(CN.richEl('p', 'lab-formula', '式：' + d.formula));
    readBox = h('div', { 'class': 'lab-read' }); body.appendChild(readBox);
    tabBox = h('details', { 'class': 'seq-list lab-table' }, h('summary', null, '図の数値（同じ内容の表。読み上げ・印刷用）')); body.appendChild(tabBox);
    if (d.ch && d.ch.length) body.appendChild(CN.chLinks(d.ch));

    function applyPreset(p) {
      st.L = 0; st.S = 0; st.K = 0; st.e = st.e.map(function () { return 0; });
      var k, set = p.set || {};
      for (k in set) { if (k === 'L' || k === 'S' || k === 'K') st[k] = set[k]; else if (/^e\d+$/.test(k)) st.e[parseInt(k.slice(1), 10) - 1] = set[k]; }
      syncAll(); refresh();
    }

    /* ---- 更新 ---- */
    function combo() { return { kind: st.kind, p: st.p, gap: st.gap, dir: st.dir, lots: st.lots }; }
    function refresh() {
      if (mode === 'pnl') { refreshPnl(); return; }
      var c = calc(d, st, mode === 'combo' ? combo() : { kind: 'spread', p: 1, gap: 1, dir: 1, lots: 1 }); cur = c;
      if (presetBtns.length) {
        var act = -1; d.presets.forEach(function (p, pi) {
          var on = true, k, set = p.set || {}, tgt = { L: 0, S: 0, K: 0 }; for (k in set) if (k === 'L' || k === 'S' || k === 'K') tgt[k] = set[k];
          if (st.L !== tgt.L || st.S !== tgt.S || st.K !== tgt.K) on = false;
          st.e.forEach(function (v, i) { var w = set['e' + (i + 1)] || 0; if (Math.abs(v - w) > 1e-9) on = false; });
          presetBtns[pi].setAttribute('aria-pressed', String(on)); if (on && act < 0) act = pi;
        });
        presetNote.textContent = act >= 0 ? (d.presets[act].text || '') : (d.presetHint || '');
      }
      drawStairs(c); resultsStairs(c); readsStairs(c); tableStairs(c);
    }
    function refreshPnl() { pst = pnlData(); drawPnl(pst); resultsPnl(pst); readsPnl(pst); tablePnl(pst); }

    /* ---- 階段の図 ---- */
    function axisFor(c) { /* 縦軸の範囲：元といまの金利が収まる範囲に、0.1％刻みでそろえる。動かすと、範囲が変わることがある */
      var all = c.r0.concat(c.r1), mn = Math.min.apply(null, all), mx = Math.max.apply(null, all), pad = Math.max(0.06, (mx - mn) * 0.18);
      var lo = Math.floor((mn - pad) * 10 - 1e-9) / 10, hi = Math.ceil((mx + pad) * 10 - 1e-9) / 10;
      if (hi - lo < 0.5) { var mid = (hi + lo) / 2; lo = Math.floor((mid - 0.25) * 10) / 10; hi = lo + 0.5; }
      var stp = niceStep(hi - lo, 4); if (stp < 0.1) stp = 0.1;
      lo = Math.floor(lo / stp + 1e-9) * stp; hi = Math.ceil(hi / stp - 1e-9) * stp;
      return { lo: lo, hi: hi, step: stp };
    }

    function panel(svg, o) {
      /* o: x, y, w, h（枠の位置）、v0[], v1[]（元・いま）、lo, hi, step, dec、title、legs、kindCls */
      var padL = 46, padR = 8, padT = 22, padB = 30, pw = o.w - padL - padR, ph = o.h - padT - padB, bw = pw / n;
      var X = function (i) { return o.x + padL + (i + 0.5) * bw; }, Y = function (v) { return o.y + padT + (o.hi - v) / (o.hi - o.lo) * ph; };
      var g = s('g', { 'class': 'st-panel' });
      g.appendChild(s('text', { 'class': 'lab-lg st-pt', x: o.x + padL, y: o.y + 13 }, o.title));
      g.appendChild(s('rect', { 'class': 'lab-plot', x: o.x + padL, y: o.y + padT, width: pw, height: ph }));
      var t, dec = o.dec;
      for (t = Math.ceil(o.lo / o.step - 1e-9) * o.step; t <= o.hi + o.step * 1e-6; t += o.step) {
        g.appendChild(s('line', { 'class': 'lab-g', x1: o.x + padL, y1: Y(t), x2: o.x + padL + pw, y2: Y(t) }));
        g.appendChild(s('text', { 'class': 'lab-ax', x: o.x + padL - 5, y: Y(t) + 4, 'text-anchor': 'end' }, fix(t, dec)));
      }
      /* 脚の帯 */
      (o.legs || []).forEach(function (l) {
        g.appendChild(s('rect', { 'class': 'st-band ' + (l.w > 0 ? 'buy' : 'sell'), x: X(l.i) - bw / 2 + 1, y: o.y + padT, width: bw - 2, height: ph }));
      });
      for (var i = 0; i < n; i++) g.appendChild(s('text', { 'class': 'lab-ax', x: X(i), y: o.y + padT + ph + 14, 'text-anchor': 'middle' }, String(i + 1)));
      g.appendChild(s('text', { 'class': 'lab-ax', x: o.x + padL + pw / 2, y: o.y + o.h - 4, 'text-anchor': 'middle' }, '限月（第 1 〜 第 ' + n + ' 限月）'));
      function stepPath(vals) {
        var pts = [], hw = bw * 0.38;
        vals.forEach(function (v, i) { pts.push([X(i) - hw, Y(v)], [X(i) + hw, Y(v)]); });
        /* 階段：踏み面を水平に、段差を斜めの線でつなぐ */
        return 'M' + pts.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' L');
      }
      g.appendChild(s('path', { 'class': 'st-ghost', d: stepPath(o.v0) }));
      g.appendChild(s('path', { 'class': 'st-now', d: stepPath(o.v1) }));
      o.v1.forEach(function (v, i) {
        var leg = (o.legs || []).filter(function (l) { return l.i === i; })[0];
        g.appendChild(s('circle', { 'class': 'st-dot' + (leg ? (leg.w > 0 ? ' buy' : ' sell') : ''), cx: X(i), cy: Y(v), r: leg ? 5.5 : 3.6 }));
        if (leg) {
          var up = (o.legs.length && o.dirUp && o.dirUp(leg)) ? true : false, ty = Y(v) + (up ? -10 : 17);
          g.appendChild(s('text', { 'class': 'st-sign halo ' + (leg.w > 0 ? 'buy' : 'sell'), x: X(i), y: Math.max(o.y + padT + 11, Math.min(o.y + padT + ph - 4, ty)), 'text-anchor': 'middle' }, (leg.w > 0 ? '買' : '売') + ' ' + sgn1(leg.w)));
        }
      });
      svg.appendChild(g);
    }
    function sgn1(w) { return (w > 0 ? '＋' : '−') + Math.abs(w); }

    function drawStairs(c) {
      CN.clear(figBox);
      var W = measure(figBox, 340), side = W >= 560, PH = side ? 250 : (W < 460 ? 150 : 200), pw = side ? (W - 6) / 2 : W, H = side ? PH : PH * 2 + 4;
      var svg = s('svg', { 'class': 'lab-svg st-svg', viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, role: 'img' });
      var legs = mode === 'combo' ? c.legs : [];
      var AX = axisFor(c), loR = AX.lo, hiR = AX.hi, loP = 100 - hiR, hiP = 100 - loR, stp = AX.step;
      /* 左：価格、右（狭い画面では下）：金利。どちらも、上ほど大きい値。価格の目盛りは金利の目盛りと向きが逆に対応する */
      panel(svg, { x: 0, y: 0, w: pw, h: PH, v0: c.F0, v1: c.F1, lo: loP, hi: hiP, step: stp, dec: decOf(stp) + (decOf(stp) < 2 ? (2 - decOf(stp)) : 0), title: '先物の価格（＝ 100 − 金利）', legs: legs, dirUp: function (l) { return l.w < 0; } });
      panel(svg, { x: side ? pw + 6 : 0, y: side ? 0 : PH + 4, w: pw, h: PH, v0: c.r0, v1: c.r1, lo: loR, hi: hiR, step: stp, dec: decOf(stp) + (decOf(stp) < 2 ? (2 - decOf(stp)) : 0), title: '先物が示す金利（％）', legs: legs, dirUp: function (l) { return l.w > 0; } });
      var legend = h('div', { 'class': 'st-legend' },
        h('span', { 'class': 'st-key ghost' }, '破線：動かす前（元）'), h('span', { 'class': 'st-key now' }, '実線と点：動かした後'),
        mode === 'combo' ? h('span', { 'class': 'st-key buy' }, '買い（重みが正）') : null, mode === 'combo' ? h('span', { 'class': 'st-key sell' }, '売り（重みが負）') : null);
      figBox.appendChild(svg); figBox.appendChild(legend);
      if (d.caption) figBox.appendChild(CN.richEl('p', 'lab-cap', d.caption));
      var tot = c.r1.map(function (r, i) { return Math.round((r - c.r0[i]) * 100 * 100) / 100; });
      svg.setAttribute('aria-label', (d.alt || '連続する限月の先物の価格と金利の階段') + '。' + names.map(function (nm, i) { return nm + ' 金利 ' + fix(c.r1[i], 2) + '％、価格 ' + fix(c.F1[i], 2) + '（金利の変化 ' + sg(tot[i], 2) + ' bp）'; }).join('、'));
    }

    function resultsStairs(c) {
      CN.clear(resBox); CN.clear(decoBox);
      var dr = c.r1.map(function (r, i) { return (r - c.r0[i]) * 100; });
      var avg = dr.reduce(function (a, b) { return a + b; }, 0) / n, tilt0 = (c.r0[n - 1] - c.r0[0]) * 100, tilt1 = (c.r1[n - 1] - c.r1[0]) * 100;
      function card(label, val, unit, note, big) {
        var b = h('div', { 'class': 'lab-res' + (big ? ' big' : '') });
        b.appendChild(h('div', { 'class': 'lab-res-l' }, label)); b.appendChild(h('div', { 'class': 'lab-res-v' }, h('b', null, val), ' ' + (unit || '')));
        if (note) b.appendChild(h('div', { 'class': 'lab-res-n' }, note)); resBox.appendChild(b);
      }
      if (mode === 'stairs') {
        card('金利の変化（全限月の平均）', sg(avg, 2), 'bp', '価格は逆向きに ' + sg(-avg / 100, 4) + ' ポイント動く', true);
        card('先の金利の階段の高低差（第 ' + n + ' − 第 1 限月の金利）', fix(tilt1, 1), 'bp', '動かす前は ' + fix(tilt0, 1) + ' bp。' + (tilt1 > 0.05 ? '右上がり' : tilt1 < -0.05 ? '右下がり（逆イールド）' : '平ら'));
        card('価格の変化（全限月の平均）', sg(-avg / 100 / sp.tick, 1), 'ティック', '1 ティック＝' + sp.tick + ' ポイント（' + fixg(sp.tickYen, 0) + sp.cur + '）');
      } else {
        var kk = KINDS[st.kind];
        card('組み合わせの損益（1 枚ずつ。ティック）', sg(c.dTicks, 2), 'ティック', (st.dir > 0 ? '買い' : '売り') + '・' + kk.label, true);
        card('同じ損益の金額（1 組。' + sp.cur + '）', sgg(c.yen, 0), sp.cur, '1 ティック＝' + fixg(sp.tickYen, 0) + sp.cur);
        card('組み合わせの値（動かした後。価格の単位）', fix(c.V1, 4), '', '動かす前は ' + fix(c.V0, 4) + '（重み × 価格の合計）');
      }
      /* 内訳の表（combo のとき）：どの変化が損益に効いたか */
      if (mode === 'combo') {
        var tb = h('tbody'), rows = [['水準', c.parts.L, sg(st.L, 2) + ' bp'], ['傾き', c.parts.S, sg(st.S, 2) + ' bp／限月'], ['曲率', c.parts.K, sg(st.K, 2) + ' bp'], ['限月ごとの個別の調整', c.parts.e, (function () { var m = 0; st.e.forEach(function (v) { m += Math.abs(v); }); return m ? '合計の大きさ ' + fix(m, 2) + ' bp' : '動かしていない'; })()]];
        rows.forEach(function (r) { tb.appendChild(h('tr', null, h('th', { scope: 'row' }, r[0]), h('td', null, r[2]), h('td', { 'class': 'num' }, sg(r[1], 2)))); });
        tb.appendChild(h('tr', { 'class': 'tot' }, h('th', { scope: 'row' }, '合計（損益）'), h('td', null, ''), h('td', { 'class': 'num' }, sg(c.dTicks, 2))));
        decoBox.appendChild(h('div', { 'class': 'tbl-wrap' }, h('table', { 'class': 'tbl st-break' }, h('caption', null, 'いまの動きの内訳：どの変化が損益にいくら効いたか（ティック）'), h('thead', null, h('tr', null, h('th', { scope: 'col' }, '変化'), h('th', { scope: 'col' }, 'つまみの値'), h('th', { scope: 'col' }, '効き（ティック）'))), tb)));
        var legTxt = c.legs.map(function (l) { return names[l.i] + ' ' + (l.w > 0 ? '買い' : '売り') + ' ' + Math.abs(l.w) + ' 枚'; }).join('、');
        decoBox.appendChild(h('p', { 'class': 'st-legs' }, '脚：' + legTxt + '（' + (c.gap === 1 ? '隣り合う限月' : '1 つおきの限月') + '）'));
      }
    }

    function readsStairs(c) {
      CN.clear(readBox);
      var out = [], tilt0 = (c.r0[n - 1] - c.r0[0]) * 100, tilt1 = (c.r1[n - 1] - c.r1[0]) * 100, anyE = st.e.some(function (v) { return v !== 0; });
      var moved = (st.L !== 0) + (st.S !== 0) + (st.K !== 0) + anyE;
      if (!moved) out.push('まだ動かしていません。つまみを動かすか、上のボタンを押します。');
      if (st.L !== 0 && !st.S && !st.K && !anyE) out.push('水準だけを動かしたので、**全限月の金利が同じ ' + sg(st.L, 1) + ' bp 動き、価格は逆向きに同じだけ動きました**。階段の形（隣り合う限月の差）は変わりません。');
      if (st.S !== 0) out.push('傾きを動かしたので、**先の限月ほど金利が大きく動きました**。' + (st.S > 0 ? '先と手前の金利の差が広がっています（スティープ化）。' : '先と手前の金利の差が縮んでいます（フラット化）。') + (tilt1 < -0.05 ? '先の金利が手前より低くなり、右下がり（逆イールド）になりました。' : ''));
      if (st.K !== 0) out.push('曲率を動かしたので、**中央の限月と両端の限月で金利が逆向きに動きました**（中央が両端より ' + sg(st.K, 1) + ' bp）。全限月の平均は変わりません。');
      if (anyE) out.push('限月ごとの個別の調整は、**1 つの限月だけの金利を動かします**。隣り合う限月との差が変わるので、傾きや曲率とは別の動きです。');
      if (mode === 'combo') {
        var dT = c.dTicks;
        if (moved) {
          if (Math.abs(c.parts.L) < 0.005 && st.L !== 0) out.push('水準の変化の分の損益は **0 ティック**です。脚の重みの合計が 0 なので、全限月が同じだけ動く変化は打ち消し合います。');
          if (Math.abs(dT) < 0.005) out.push('いまの動きでの損益は **0 ティック**です。脚の動きが打ち消し合っています。');
          else if (dT > 0) out.push('いまの動きでは、この向きの組み合わせの損益は **＋' + fix(dT, 2) + ' ティック**（利益）です。**逆向きに同じだけ動けば、同じ大きさの損失（' + sg(-dT, 2) + ' ティック）**になります。');
          else out.push('いまの動きでは、この向きの組み合わせの損益は **' + sg(dT, 2) + ' ティック（損失）**です。**逆向きに同じだけ動けば、同じ大きさの利益**になります。');
        }
      }
      if (!out.length) out.push('変化なし。');
      readBox.appendChild(h('h5', null, '読み取れること')); var ul = h('ul'); out.forEach(function (t) { ul.appendChild(CN.richEl('li', '', t)); }); readBox.appendChild(ul);
    }
    function tableStairs(c) {
      CN.clear(tabBox); tabBox.appendChild(h('summary', null, '図の数値（同じ内容の表。読み上げ・印刷用）'));
      var tb = h('tbody'), W = {}; if (mode === 'combo') c.legs.forEach(function (l) { W[l.i] = l.w; });
      names.forEach(function (nm, i) {
        var cells = [h('th', { scope: 'row' }, nm), h('td', { 'class': 'num' }, fix(c.r0[i], 3)), h('td', { 'class': 'num' }, fix(c.r1[i], 3)), h('td', { 'class': 'num' }, fix(c.F0[i], 3)), h('td', { 'class': 'num' }, fix(c.F1[i], 3)), h('td', { 'class': 'num' }, sg((c.F1[i] - c.F0[i]) / sp.tick, 1))];
        if (mode === 'combo') cells.push(h('td', { 'class': 'num' }, W[i] != null ? sgn1(W[i]) : '—'));
        tb.appendChild(h('tr', null, cells));
      });
      var head = ['限月', '金利 元（％）', '金利 いま（％）', '価格 元', '価格 いま', '価格の変化（ティック）']; if (mode === 'combo') head.push('重み（枚）');
      tabBox.appendChild(h('div', { 'class': 'tbl-wrap' }, h('table', { 'class': 'tbl' }, h('caption', null, '限月ごとの金利と価格（架空）'), h('thead', null, h('tr', null, head.map(function (t) { return h('th', { scope: 'col' }, t); }))), tb)));
    }

    /* ---- 損益の形 ---- */
    function pnlData() {
      var f = st.fx, r = rg[f], lim = Math.max(Math.abs(r[0]), Math.abs(r[1])), N = 60, xs = [], i;
      for (i = 0; i <= N; i++) xs.push(-lim + 2 * lim * i / N);
      var gp = legsOf(n, 'spread', st.p, st.gap, st.dir), res = KEYS.map(function (k) {
        var ys = xs.map(function (x) { var o = { L: st.L, S: st.S, K: st.K, e: [] }; o[f] = x; return calc(d, o, { kind: k, p: st.p, gap: st.gap, dir: st.dir, lots: 1 }).dTicks; });
        var lg = legsOf(n, k, st.p, st.gap, st.dir), s0 = sens(d, k, st.p, st.gap, st.dir, f);
        var o2 = { L: st.L, S: st.S, K: st.K, e: [] }; o2[f] = 0; var here = calc(d, o2, { kind: k, p: st.p, gap: st.gap, dir: st.dir, lots: st.lots });
        var base0 = calc(d, { L: 0, S: 0, K: 0, e: [] }, { kind: k, p: st.p, gap: st.gap, dir: st.dir, lots: st.lots });
        return { kind: k, ys: ys, sens: s0, legs: lg, fixedTicks: here.dTicks, fixedYen: here.yen, base: base0 };
      });
      var ymax = 0; res.forEach(function (o) { o.ys.forEach(function (y) { ymax = Math.max(ymax, Math.abs(y)); }); }); if (ymax < 1) ymax = 1;
      var ystep = niceStep(ymax * 2, 4), yTop = Math.ceil(ymax / ystep - 1e-9) * ystep;
      return { f: f, xs: xs, lim: lim, res: res, yTop: yTop, ystep: ystep, N: N, gp: gp };
    }
    var PCOL = { spread: 'ran', fly: 'core', condor: 'pol' };
    function drawPnl(P) {
      CN.clear(figBox);
      var W = measure(figBox, 340), H = Math.max(300, Math.min(360, W * 0.72 + 70)), mL = 52, mR = 74, mT = 30, mB = 46, pw = W - mL - mR, ph = H - mT - mB;
      var svg = s('svg', { 'class': 'lab-svg st-svg', viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, role: 'img' });
      var X = function (v) { return mL + (v + P.lim) / (2 * P.lim) * pw; }, Y = function (v) { return mT + (P.yTop - v) / (2 * P.yTop) * ph; };
      svg.appendChild(s('rect', { 'class': 'lab-plot', x: mL, y: mT, width: pw, height: ph }));
      svg.appendChild(s('rect', { 'class': 'st-gain', x: mL, y: mT, width: pw, height: ph / 2 }));
      svg.appendChild(s('rect', { 'class': 'st-loss', x: mL, y: mT + ph / 2, width: pw, height: ph / 2 }));
      svg.appendChild(s('text', { 'class': 'st-zone', x: mL + 6, y: mT + 14 }, '利益の側'));
      svg.appendChild(s('text', { 'class': 'st-zone', x: mL + 6, y: mT + ph - 7 }, '損失の側'));
      var t, yd = decOf(P.ystep);
      for (t = -P.yTop; t <= P.yTop + P.ystep * 1e-6; t += P.ystep) {
        var z = Math.abs(t) < P.ystep * 1e-6;
        svg.appendChild(s('line', { 'class': 'lab-g' + (z ? ' zero' : ''), x1: mL, y1: Y(t), x2: mL + pw, y2: Y(t) }));
        svg.appendChild(s('text', { 'class': 'lab-ax', x: mL - 5, y: Y(t) + 4, 'text-anchor': 'end' }, z ? '0' : sg(t, yd)));
        svg.appendChild(s('text', { 'class': 'lab-ax st-yen', x: mL + pw + 5, y: Y(t) + 4 }, z ? '0' : sgg(t * sp.tickYen * st.lots, 0)));
      }
      var xstep = niceStep(2 * P.lim, W < 420 ? 4 : 6), xd = decOf(xstep), tx;
      for (tx = -Math.floor(P.lim / xstep) * xstep; tx <= P.lim + xstep * 1e-6; tx += xstep) {
        svg.appendChild(s('line', { 'class': 'lab-g v' + (Math.abs(tx) < xstep * 1e-6 ? ' zero' : ''), x1: X(tx), y1: mT, x2: X(tx), y2: mT + ph }));
        svg.appendChild(s('text', { 'class': 'lab-ax', x: X(tx), y: mT + ph + 15, 'text-anchor': 'middle' }, Math.abs(tx) < xstep * 1e-6 ? '0' : sg(tx, xd)));
      }
      svg.appendChild(s('text', { 'class': 'lab-ax', x: mL + pw / 2, y: H - 8, 'text-anchor': 'middle' }, '横軸：' + FACT[P.f].name + 'の変化（' + FACT[P.f].unit + '）'));
      svg.appendChild(s('text', { 'class': 'lab-ax', x: 4, y: mT - 12 }, '縦軸（左）：損益（ティック）'));
      svg.appendChild(s('text', { 'class': 'lab-ax', x: W - 4, y: mT - 12, 'text-anchor': 'end' }, '（右）：損益（' + sp.cur + '。' + st.lots + ' 枚ずつ）'));
      P.res.forEach(function (o, j) {
        var pts = o.ys.map(function (y, i) { return X(P.xs[i]).toFixed(1) + ',' + Y(y).toFixed(1); }).join(' ');
        svg.appendChild(s('polyline', { 'class': 'lab-wave c-' + PCOL[o.kind], points: pts, 'stroke-dasharray': j === 0 ? '' : j === 1 ? '7 4' : '2 4' }));
      });
      /* 凡例（図の中）：線の見分けは色だけに頼らない（実線・破線・点線） */
      var lx = mL + 4, ly = H - 28;
      var legend = h('div', { 'class': 'st-legend' });
      P.res.forEach(function (o, j) {
        legend.appendChild(h('span', { 'class': 'st-key line c-' + PCOL[o.kind] + ' d' + j }, KINDS[o.kind].label));
      });
      figBox.appendChild(svg); figBox.appendChild(legend);
      if (d.caption) figBox.appendChild(CN.richEl('p', 'lab-cap', d.caption));
      svg.setAttribute('aria-label', (d.alt || '曲線の変化と損益の図') + '。横軸は' + FACT[P.f].name + 'の変化。' + P.res.map(function (o) { return KINDS[o.kind].label + ' は 1 ' + FACT[P.f].unit + ' あたり ' + sg(o.sens, 2) + ' ティック'; }).join('、'));
    }
    function resultsPnl(P) {
      CN.clear(resBox); CN.clear(decoBox);
      var f = P.f, tb = h('tbody');
      P.res.forEach(function (o) {
        var half = o.sens * P.lim;
        tb.appendChild(h('tr', null, h('th', { scope: 'row' }, KINDS[o.kind].label + '（' + o.legs.legs.map(function (l) { return sgn1(l.w); }).join('：').replace(/＋/g, '') + ' の重み。' + (st.dir > 0 ? '買い' : '売り') + '）'),
          h('td', { 'class': 'num' }, sg(o.sens, 3)), h('td', { 'class': 'num' }, sgg(half, 1) + ' ／ ' + sgg(-half, 1)), h('td', { 'class': 'num' }, sgg(half * sp.tickYen * st.lots, 0) + ' ／ ' + sgg(-half * sp.tickYen * st.lots, 0))));
      });
      decoBox.appendChild(h('div', { 'class': 'tbl-wrap' }, h('table', { 'class': 'tbl st-break' }, h('caption', null, '横軸の変化の両端（' + sg(-P.lim, 0) + ' と ' + sg(P.lim, 0) + ' ' + FACT[f].unit + '）での損益（利益の側と損失の側）'),
        h('thead', null, h('tr', null, h('th', { scope: 'col' }, '組み合わせ（脚の重み）'), h('th', { scope: 'col' }, '1 あたり（ティック）'), h('th', { scope: 'col' }, '両端（ティック）'), h('th', { scope: 'col' }, '両端（' + sp.cur + '。' + st.lots + ' 枚ずつ）'))), tb)));
      var b = h('div', { 'class': 'lab-res big' }); b.appendChild(h('div', { 'class': 'lab-res-l' }, '1 ティックの価値'));
      b.appendChild(h('div', { 'class': 'lab-res-v' }, h('b', null, fixg(sp.tickYen, 0)), ' ' + sp.cur)); b.appendChild(h('div', { 'class': 'lab-res-n' }, sp.name + '（呼値の単位 ' + sp.tick + ' ポイント）')); resBox.appendChild(b);
      P.res.forEach(function (o) {
        var c2 = h('div', { 'class': 'lab-res' }); c2.appendChild(h('div', { 'class': 'lab-res-l' }, KINDS[o.kind].short + 'の損益（横軸の変化が 0 のとき）'));
        c2.appendChild(h('div', { 'class': 'lab-res-v' }, h('b', null, sg(o.fixedTicks, 2)), ' ティック'));
        c2.appendChild(h('div', { 'class': 'lab-res-n' }, sgg(o.fixedYen, 0) + ' ' + sp.cur)); resBox.appendChild(c2);
      });
    }
    function readsPnl(P) {
      CN.clear(readBox);
      var out = [], f = P.f, fn = FACT[f].name;
      P.res.forEach(function (o) {
        var k = KINDS[o.kind].label;
        if (Math.abs(o.sens) < 1e-9) out.push('**' + k + '**：横軸の「' + fn + '」の変化に、損益は反応しません（どちらの向きに動いても 0 ティック）。');
        else {
          var gainDir = o.sens > 0 ? '＋' : '−', lossDir = o.sens > 0 ? '−' : '＋';
          out.push('**' + k + '**（' + (st.dir > 0 ? '買い' : '売り') + '）：' + fn + 'の変化が **' + gainDir + ' の向きで利益、' + lossDir + ' の向きで損失**です（1 ' + FACT[f].unit + ' あたり ' + fix(Math.abs(o.sens), 2) + ' ティック）。' + (o.sens > 0 ? '' : ''));
        }
      });
      out.push('向きのボタンで買いと売りを切り替えると、利益の側と損失の側が**そっくり入れ替わります**。損失の大きさは、利益の大きさと同じです。');
      out.push('この図は、脚の価格が 3 つの変化（水準・傾き・曲率）の足し合わせで動くと仮定した模型です。実際の価格は、これらのほかの要因でも動きます。');
      readBox.appendChild(h('h5', null, '読み取れること')); var ul = h('ul'); out.forEach(function (t) { ul.appendChild(CN.richEl('li', '', t)); }); readBox.appendChild(ul);
    }
    function tablePnl(P) {
      CN.clear(tabBox); tabBox.appendChild(h('summary', null, '図の数値（同じ内容の表。読み上げ・印刷用）'));
      var head = [FACT[P.f].name + 'の変化（' + FACT[P.f].unit + '）'].concat(P.res.map(function (o) { return KINDS[o.kind].label + '（ティック）'; })), tb = h('tbody'), picks = [], i, nt = 8;
      for (i = 0; i <= nt; i++) picks.push(Math.round(P.N * i / nt));
      picks.forEach(function (ix) { tb.appendChild(h('tr', null, [h('th', { scope: 'row' }, sg(P.xs[ix], 2))].concat(P.res.map(function (o) { return h('td', { 'class': 'num' }, sg(o.ys[ix], 2)); })))); });
      tabBox.appendChild(h('div', { 'class': 'tbl-wrap' }, h('table', { 'class': 'tbl' }, h('caption', null, '横軸の変化ごとの損益（' + (st.dir > 0 ? '買い' : '売り') + '。1 枚ずつ）'), h('thead', null, h('tr', null, head.map(function (t) { return h('th', { scope: 'col' }, t); }))), tb)));
    }

    syncAll(); refresh(); watchWidth(figBox, function () { if (mode === 'pnl') { if (pst) drawPnl(pst); } else if (cur) drawStairs(cur); });
  };
  CN.searchText.strip = function (d) { return [d.title, d.intro || '', d.caption || '', (d.spec && d.spec.name) || ''].join(' '); };
})();
