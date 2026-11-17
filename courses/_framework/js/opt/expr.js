/* 部品 lab / scale の共通：安全な式の評価器。eval・new Function は使わない。
   使える物：数値、名前（入力・計算結果・定数）、+ - * / ^（または **）、比較（< <= > >= == !=）、論理（&& || !）、条件（a ? b : c）、
   かっこ、関数 sqrt abs sin cos tan asin acos atan atan2 exp ln log10 pow min max floor ceil round sign if(cond,a,b) clamp(x,lo,hi)、
   ncdf(x)（標準正規分布の累積分布関数）・npdf(x)（同じ密度関数）、定数 pi。
   ncdf は W. J. Hart の有理近似（West 2005 の倍精度版）。絶対誤差はおよそ 1e-15 以下（ブラウザとビルド検査で同じ式を使う）。
   ブラウザでは window.CNExpr、node（check-data.js）では module.exports。 */
(function () {
  'use strict';
  /* 標準正規分布の累積分布関数 N(x)。Hart の近似（Graeme West, "Better approximations to cumulative normal functions", 2005）。 */
  function ncdf(x) {
    if (x !== x) return NaN;
    var xa = Math.abs(x), c, b;
    if (xa > 37) c = 0;
    else {
      var e = Math.exp(-xa * xa / 2);
      if (xa < 7.07106781186547) {
        b = 3.52624965998911E-02 * xa + 0.700383064443688;
        b = b * xa + 6.37396220353165; b = b * xa + 33.912866078383; b = b * xa + 112.079291497871; b = b * xa + 221.213596169931; b = b * xa + 220.206867912376;
        c = e * b;
        b = 8.83883476483184E-02 * xa + 1.75566716318264;
        b = b * xa + 16.064177579207; b = b * xa + 86.7807322029461; b = b * xa + 296.564248779674; b = b * xa + 637.333633378831; b = b * xa + 793.826512519948; b = b * xa + 440.413735824752;
        c = c / b;
      } else {
        b = xa + 0.65; b = xa + 4 / b; b = xa + 3 / b; b = xa + 2 / b; b = xa + 1 / b;
        c = e / b / 2.506628274631;
      }
    }
    return x > 0 ? 1 - c : c;
  }
  /* 標準正規分布の密度関数 */
  function npdf(x) { return Math.exp(-x * x / 2) / 2.5066282746310002; }
  var FN = {
    sqrt: Math.sqrt, abs: Math.abs, sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos, atan: Math.atan, atan2: Math.atan2,
    exp: Math.exp, ln: Math.log, log10: function (x) { return Math.log(x) / Math.LN10; }, pow: Math.pow, min: Math.min, max: Math.max,
    floor: Math.floor, ceil: Math.ceil, round: function (x, n) { var k = Math.pow(10, n || 0); return Math.round(x * k) / k; },
    sign: function (x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }, 'if': function (c, a, b) { return c ? a : b; },
    clamp: function (x, lo, hi) { return Math.min(hi, Math.max(lo, x)); },
    ncdf: ncdf, npdf: npdf
  };
  var CONST = { pi: Math.PI };
  var NARGS = { sqrt: 1, abs: 1, sin: 1, cos: 1, tan: 1, asin: 1, acos: 1, atan: 1, atan2: 2, exp: 1, ln: 1, log10: 1, pow: 2, floor: 1, ceil: 1, sign: 1, 'if': 3, clamp: 3, ncdf: 1, npdf: 1 };

  function tokenize(src) {
    var t = [], i = 0, m, s = String(src);
    while (i < s.length) {
      var c = s.charAt(i);
      if (/\s/.test(c)) { i++; continue; }
      if ((m = /^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/.exec(s.slice(i)))) { t.push({ k: 'n', v: parseFloat(m[0]) }); i += m[0].length; continue; }
      if ((m = /^[A-Za-z_][A-Za-z0-9_]*/.exec(s.slice(i)))) { t.push({ k: 'id', v: m[0] }); i += m[0].length; continue; }
      if ((m = /^(\*\*|<=|>=|==|!=|&&|\|\||[-+*\/^()<>!,?:])/.exec(s.slice(i)))) { t.push({ k: 'op', v: m[0] === '**' ? '^' : m[0] }); i += m[0].length; continue; }
      throw new Error('式に使えない文字 "' + c + '"（位置 ' + (i + 1) + '）: ' + s);
    }
    return t;
  }

  /* 構文木を作る。{t:'n',v} {t:'v',name} {t:'u',op,a} {t:'b',op,a,b} {t:'f',name,args} {t:'c',c,a,b} */
  function parse(src) {
    var tk = tokenize(src), p = 0;
    function peek() { return tk[p]; }
    function isOp(v) { var x = tk[p]; return x && x.k === 'op' && x.v === v; }
    function eat(v) { if (!isOp(v)) throw new Error('式の構文エラー: "' + v + '" が必要です: ' + src); p++; }
    function ternary() {
      var c = orx();
      if (isOp('?')) { p++; var a = ternary(); eat(':'); var b = ternary(); return { t: 'c', c: c, a: a, b: b }; }
      return c;
    }
    function orx() { var a = andx(); while (isOp('||')) { p++; a = { t: 'b', op: '||', a: a, b: andx() }; } return a; }
    function andx() { var a = eq(); while (isOp('&&')) { p++; a = { t: 'b', op: '&&', a: a, b: eq() }; } return a; }
    function eq() { var a = cmp(); while (isOp('==') || isOp('!=')) { var o = tk[p++].v; a = { t: 'b', op: o, a: a, b: cmp() }; } return a; }
    function cmp() { var a = add(); while (isOp('<') || isOp('<=') || isOp('>') || isOp('>=')) { var o = tk[p++].v; a = { t: 'b', op: o, a: a, b: add() }; } return a; }
    function add() { var a = mul(); while (isOp('+') || isOp('-')) { var o = tk[p++].v; a = { t: 'b', op: o, a: a, b: mul() }; } return a; }
    function mul() { var a = unary(); while (isOp('*') || isOp('/')) { var o = tk[p++].v; a = { t: 'b', op: o, a: a, b: unary() }; } return a; }
    function unary() {
      if (isOp('-')) { p++; return { t: 'u', op: '-', a: unary() }; }
      if (isOp('+')) { p++; return unary(); }
      if (isOp('!')) { p++; return { t: 'u', op: '!', a: unary() }; }
      return pow();
    }
    function pow() { var a = primary(); if (isOp('^')) { p++; return { t: 'b', op: '^', a: a, b: unary() }; } return a; }   // 右結合。-2^2 は -(2^2)
    function primary() {
      var x = peek();
      if (!x) throw new Error('式が途中で終わっています: ' + src);
      if (x.k === 'n') { p++; return { t: 'n', v: x.v }; }
      if (x.k === 'id') {
        p++;
        if (isOp('(')) {
          p++; var args = [];
          if (!isOp(')')) { args.push(ternary()); while (isOp(',')) { p++; args.push(ternary()); } }
          eat(')');
          if (!Object.prototype.hasOwnProperty.call(FN, x.v)) throw new Error('使えない関数 "' + x.v + '": ' + src);
          if (NARGS[x.v] != null && NARGS[x.v] !== args.length) throw new Error('関数 ' + x.v + ' の引数は ' + NARGS[x.v] + ' 個: ' + src);
          if (!args.length) throw new Error('関数 ' + x.v + ' に引数がありません: ' + src);
          return { t: 'f', name: x.v, args: args };
        }
        return { t: 'v', name: x.v };
      }
      if (isOp('(')) { p++; var e = ternary(); eat(')'); return e; }
      throw new Error('式の構文エラー（"' + x.v + '" の位置）: ' + src);
    }
    var tree = ternary();
    if (p < tk.length) throw new Error('式の構文エラー（余分な "' + tk[p].v + '"）: ' + src);
    return tree;
  }

  function ev(n, env) {
    switch (n.t) {
      case 'n': return n.v;
      case 'v':
        if (Object.prototype.hasOwnProperty.call(env, n.name)) return env[n.name];
        if (Object.prototype.hasOwnProperty.call(CONST, n.name)) return CONST[n.name];
        throw new Error('未定義の名前 "' + n.name + '"');
      case 'u': { var a = ev(n.a, env); return n.op === '-' ? -a : (a ? 0 : 1); }
      case 'c': return ev(n.c, env) ? ev(n.a, env) : ev(n.b, env);
      case 'f': return FN[n.name].apply(null, n.args.map(function (x) { return ev(x, env); }));
      case 'b': {
        if (n.op === '&&') return (ev(n.a, env) && ev(n.b, env)) ? 1 : 0;
        if (n.op === '||') return (ev(n.a, env) || ev(n.b, env)) ? 1 : 0;
        var x = ev(n.a, env), y = ev(n.b, env);
        switch (n.op) {
          case '+': return x + y; case '-': return x - y; case '*': return x * y; case '/': return x / y; case '^': return Math.pow(x, y);
          case '<': return x < y ? 1 : 0; case '<=': return x <= y ? 1 : 0; case '>': return x > y ? 1 : 0; case '>=': return x >= y ? 1 : 0;
          case '==': return Math.abs(x - y) < 1e-9 * Math.max(1, Math.abs(x), Math.abs(y)) ? 1 : 0; case '!=': return Math.abs(x - y) < 1e-9 * Math.max(1, Math.abs(x), Math.abs(y)) ? 0 : 1;
        }
      }
    }
    throw new Error('式の評価エラー');
  }
  function names(n, out) {
    out = out || {};
    if (n.t === 'v') out[n.name] = 1;
    ['a', 'b', 'c'].forEach(function (k) { if (n[k] && typeof n[k] === 'object') names(n[k], out); });
    (n.args || []).forEach(function (x) { names(x, out); });
    return out;
  }
  /* compile(src) -> { run(env) -> number, names: [使っている名前] } */
  function compile(src) {
    var tree = parse(src);
    return { src: String(src), tree: tree, names: Object.keys(names(tree)).filter(function (k) { return !Object.prototype.hasOwnProperty.call(CONST, k); }), run: function (env) { return ev(tree, env || {}); } };
  }
  var api = { compile: compile, FN: Object.keys(FN) };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else window.CNExpr = api;
})();
