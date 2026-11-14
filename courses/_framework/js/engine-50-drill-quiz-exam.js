/* 部品8：切り分け演習 drill（症状とログから、止まった段階と最初に調べる対象を選ぶ）／部品9：確認問題（章末）・総合テスト */
(function () {
  'use strict';
  var h = CN.h;

  /* 選択式の 1 問を作る（共通）。返り値 {node, get(), mark(correct)} */
  function qBlock(prefix, idx, it, label, shuffle) {
    var name = prefix + '-q' + idx, fs = h('fieldset'), opts = [], correct = it.a;
    fs.appendChild(h('legend', { 'class': 'qt' }, (label || ('Q' + (idx + 1))) + '. ' + it.q));
    it.c.forEach(function (c, k) {
      var inp = h('input', { type: 'radio', name: name, value: String(k) });
      var lb = h('label', { 'class': 'opt' }, inp, h('span', null, c));
      opts.push({ inp: inp, lb: lb, orig: k });
    });
    /* 選択肢の並びを表示のたびにシャッフルする（shuffle 指定のときだけ）。opts は画面上の並び順、correct は画面上の正解の位置 */
    function layout() {
      if (shuffle) {
        for (var i = opts.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = opts[i]; opts[i] = opts[j]; opts[j] = t; }
      }
      opts.forEach(function (o, k) { o.inp.value = String(k); fs.appendChild(o.lb); if (o.orig === it.a) correct = k; });
    }
    layout();
    var fb = h('div', { 'aria-live': 'polite' });
    var blk = h('div', { 'class': 'q-block' }, fs, fb);
    return {
      node: blk,
      get: function () { for (var i = 0; i < opts.length; i++) if (opts[i].inp.checked) return i; return -1; },
      mark: function (chosen) {
        var ok = chosen === correct;
        opts.forEach(function (o, k) { o.inp.disabled = true; o.lb.classList.remove('ok', 'ng'); if (k === correct) o.lb.classList.add('ok'); else if (k === chosen) o.lb.classList.add('ng'); });
        CN.clear(fb);
        var box = h('div', { 'class': 'fb ' + (ok ? 'ok' : 'ng') }, h('b', null, chosen < 0 ? '未回答（正解は ' + String.fromCharCode(65 + correct) + '）' : ok ? '正解' : '不正解（正解は ' + String.fromCharCode(65 + correct) + '）'));
        if (it.why) box.appendChild(CN.richEl('span', '', it.why));
        if (it.ch) { var l = CN.chLink(it.ch); l.style.marginLeft = '.4rem'; box.appendChild(l); }
        fb.appendChild(box);
        return ok;
      },
      set: function (i) { if (opts[i]) opts[i].inp.checked = true; },
      reset: function () { opts.forEach(function (o) { o.inp.disabled = false; o.inp.checked = false; o.lb.classList.remove('ok', 'ng'); }); layout(); CN.clear(fb); }
    };
  }
  CN.qBlock = qBlock;

  /* ================= 9a 章末の確認問題 ================= */
  CN.widgets.quiz = function (el, d, ctx) {
    CN.frame(el, CN.t('quiz.kind', d), d.title || CN.t('quiz.title', d));
    var body = h('div', { 'class': 'wg-body' }), prev = h('p', { 'class': 'prev-score' }), blocks = [];
    var saved = (CN.store.get('quiz', {}) || {})[ctx.src];
    if (saved) prev.textContent = '前回の成績：' + saved.s + ' / ' + saved.t;
    body.appendChild(prev);
    d.items.forEach(function (it, i) { var b = qBlock(ctx.id, i, it, null, true); blocks.push(b); body.appendChild(b.node); });
    var res = h('p', { 'class': 'res-score', role: 'status' });
    var go = h('button', { 'class': 'btn pri', type: 'button' }, '採点する'), again = h('button', { 'class': 'btn', type: 'button', hidden: '' }, 'やり直す');
    go.addEventListener('click', function () {
      var sc = 0; blocks.forEach(function (b, i) { if (b.mark(b.get()) === true) sc++; });
      res.textContent = '結果：' + sc + ' / ' + d.items.length + ' 問正解';
      CN.store.update('quiz', function (q) { q[ctx.src] = { s: sc, t: d.items.length }; }, {});
      go.hidden = true; again.hidden = false; CN.emit('progress');
    });
    again.addEventListener('click', function () { blocks.forEach(function (b) { b.reset(); }); res.textContent = ''; go.hidden = false; again.hidden = true; });
    body.appendChild(h('div', { 'class': 'res-bar' }, go, again, res));
    el.appendChild(body);
  };
  CN.searchText.quiz = function (d) { return d.items.map(function (i) { return i.q + ' ' + i.c.join(' ') + ' ' + (i.why || ''); }).join(' '); };

  /* ================= 9b 総合テスト（付録）：CN.exam で登録された問題を部ごとに出題 ================= */
  CN.widgets.exam = function (el) {
    var bank = CN.examItems, parts = (window.CN_PARTS || []).filter(function (p) { return !p.appendix; }), ex = CN.cfg.exam || {};
    if (CN.cfg.publish) parts = parts.filter(function (p) { return bank.some(function (x) { return String(x.part) === p.key; }); });   // 公開版：問題のない部は出さない
    CN.frame(el, CN.t('exam.kind'), ex.title || ('部ごとの成績つき' + (ex.target ? '（目標 ' + ex.target + ' 問）' : '')));
    var body = h('div', { 'class': 'wg-body' }); el.appendChild(body);
    var blocks = [];
    function intro() {
      CN.clear(body); blocks = [];
      var sv = CN.store.get('exam', null);
      body.appendChild(CN.richEl('p', '', ex.intro || ('**' + bank.length + ' 問**が登録されています' + (ex.target && bank.length < ex.target ? '（目標 ' + ex.target + ' 問。章が増えるごとに追加されます）' : '') + '。第1部から順に出題します。途中で止めても構いません。')));
      var ul = h('ul', { 'class': 'score-list' });
      parts.forEach(function (p) { var n = bank.filter(function (x) { return String(x.part) === p.key; }).length; ul.appendChild(h('li', null, p.name + '：' + n + ' 問')); });
      body.appendChild(ul);
      if (sv) body.appendChild(h('p', { 'class': 'prev-score' }, '前回の成績：' + sv.s + ' / ' + sv.t + '（' + (sv.at || '') + '）　' + parts.map(function (p) { var r = sv.parts && sv.parts[p.key]; return r ? p.name.replace(/\s.*$/, '') + ' ' + r.s + '/' + r.t : ''; }).filter(Boolean).join('　')));
      var b = h('button', { 'class': 'btn pri', type: 'button', style: 'margin-top:.8rem', on: { click: start } }, CN.t('exam.start'));
      if (!bank.length) b.disabled = true;
      body.appendChild(b);
    }
    function start() {
      CN.clear(body); blocks = [];
      var n = 0, ordered = [];
      parts.forEach(function (p) {
        var its = bank.filter(function (x) { return String(x.part) === p.key; });
        if (!its.length) return;
        body.appendChild(h('h4', { style: 'margin:1.2rem 0 .2rem;color:var(--accent);font-size:1rem' }, p.name));
        its.forEach(function (it) { var b = qBlock('exam', n, it, 'Q' + (n + 1), true); blocks.push({ b: b, it: it }); body.appendChild(b.node); n++; });
      });
      var res = h('div', { role: 'status' }), go = h('button', { 'class': 'btn pri', type: 'button' }, '採点する');
      go.addEventListener('click', function () {
        var un = blocks.filter(function (x) { return x.b.get() < 0; }).length;
        if (un && !window.confirm('未回答が ' + un + ' 問あります。このまま採点しますか？')) return;
        var tot = { s: 0, t: 0 }, pp = {};
        blocks.forEach(function (x) { var ok = x.b.mark(x.b.get()), k = String(x.it.part); pp[k] = pp[k] || { s: 0, t: 0 }; pp[k].t++; tot.t++; if (ok) { pp[k].s++; tot.s++; } });
        var at = new Date().toISOString().slice(0, 10);
        CN.store.set('exam', { s: tot.s, t: tot.t, parts: pp, at: at });
        go.hidden = true; CN.clear(res);
        res.appendChild(h('p', { 'class': 'res-score' }, '総合：' + tot.s + ' / ' + tot.t + ' 問正解'));
        var bars = h('div', { 'class': 'part-bars' });
        parts.forEach(function (p) {
          var r = pp[p.key]; if (!r) return;
          bars.appendChild(h('div', { 'class': 'row' }, h('span', null, p.name), h('div', { 'class': 'bar', role: 'img', 'aria-label': Math.round(100 * r.s / r.t) + '%' }, h('i', { style: 'width:' + Math.round(100 * r.s / r.t) + '%' })), h('span', { 'class': 'num' }, r.s + '/' + r.t)));
        });
        res.appendChild(bars);
        res.appendChild(h('button', { 'class': 'btn', type: 'button', on: { click: intro } }, '最初に戻る'));
        res.scrollIntoView({ block: 'nearest', behavior: CN.reduced() ? 'auto' : 'smooth' });
        CN.emit('progress');
      });
      body.appendChild(h('div', { 'class': 'res-bar' }, go)); body.appendChild(res);
    }
    intro();
  };

  /* ================= 8 切り分け演習 ================= */
  CN.widgets.drill = function (el, d, ctx) {
    var T = function (k) { return CN.t(k, d); };
    CN.frame(el, T('drill.kind'), d.title || T('drill.title'));
    var body = h('div', { 'class': 'wg-body' }), done = {}, picks = {}, curC = 0;
    var saved = (CN.store.get('drill', {}) || {})[ctx.src];
    el.appendChild(body);
    function score() { var n = 0; Object.keys(done).forEach(function (k) { if (done[k]) n++; }); return n; }
    function draw() {
      CN.clear(body);
      if (d.intro) body.appendChild(CN.richEl('p', 'idn-sum', d.intro));
      if (saved) body.appendChild(h('p', { 'class': 'prev-score' }, '前回の成績：' + saved.s + ' / ' + saved.t));
      var tabs = h('div', { 'class': 'drill-tabs', role: 'group', 'aria-label': 'ケースの選択' });
      d.cases.forEach(function (c, i) {
        var st = done[i] === true ? 'ok' : done[i] === false ? 'ng' : '';
        tabs.appendChild(h('button', { type: 'button', 'class': 'tabbtn ' + st, 'aria-pressed': String(i === curC), on: { click: function () { curC = i; draw(); } } }, T('drill.case') + (i + 1), done[i] == null ? null : h('span', { 'class': 'mk' }, done[i] ? '○' : '×')));
      });
      body.appendChild(tabs);
      var c = d.cases[curC], proc = c.procedure || d.procedure, nodes = c.nodes || d.nodes, fb = h('div', { 'aria-live': 'polite' });
      body.appendChild(h('p', { 'class': 'symptom' }, T('drill.symptom') + c.symptom));
      if (c.log) body.appendChild(h('pre', { 'class': 'logbox', tabindex: 0, 'aria-label': T('drill.log') }, [].concat(c.log).join('\n')));
      var q1 = qBlock(ctx.id + '-c' + curC + 'a', 0, { q: T('drill.q1'), c: proc, a: c.step }, '問1');
      var q2 = qBlock(ctx.id + '-c' + curC + 'b', 1, { q: T('drill.q2'), c: nodes, a: c.node }, '問2');
      body.appendChild(q1.node); body.appendChild(q2.node);
      var go = h('button', { 'class': 'btn pri', type: 'button' }, '答え合わせ');
      var sum = h('p', { 'class': 'res-score', role: 'status' });
      function showSum() { var n = Object.keys(done).length; sum.textContent = n ? '正解したケース：' + score() + ' / ' + d.cases.length + '（回答済み ' + n + '）' : ''; }
      function reveal() {
        var ok1 = q1.mark(q1.get()), ok2 = q2.mark(q2.get()); go.hidden = true;
        var okAll = ok1 && ok2;
        var box = h('div', { 'class': 'fb ' + (okAll ? 'ok' : 'ng') }, h('b', null, okAll ? '正解です' : '惜しい：' + (ok1 ? '段階は合っています' : '段階が違います') + '／' + (ok2 ? '対象は合っています' : '対象が違います')));
        box.appendChild(CN.richEl('span', '', c.why || ''));
        CN.clear(fb); fb.appendChild(box);
        return okAll;
      }
      if (done[curC] != null) { q1.set(picks[curC][0]); q2.set(picks[curC][1]); reveal(); }
      go.addEventListener('click', function () {
        picks[curC] = [q1.get(), q2.get()];
        done[curC] = reveal();
        var s = score(), tot = d.cases.length;
        CN.store.update('drill', function (x) { x[ctx.src] = { s: s, t: tot }; }, {});
        CN.emit('progress');
        var b = tabs.querySelectorAll('button')[curC]; b.classList.add(done[curC] ? 'ok' : 'ng'); b.appendChild(h('span', { 'class': 'mk' }, done[curC] ? '○' : '×'));
        showSum();
      });
      showSum();
      body.appendChild(h('div', { 'class': 'res-bar' }, go, sum)); body.appendChild(fb);
    }
    draw();
  };
  CN.searchText.drill = function (d) { return (d.intro || '') + ' ' + d.cases.map(function (c) { return [c.symptom, [].concat(c.log || []).join(' '), c.why].join(' '); }).join(' '); };
})();
