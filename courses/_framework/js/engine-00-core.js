/* 講座共通基盤 — エンジン：共通基盤（設定・文言・DOM ヘルパー・データ登録・保存・部品の取り付け） */
(function () {
  'use strict';
  var SVGNS = 'http://www.w3.org/2000/svg';
  var CN = window.CN = {
    cfg: window.CN_CFG || {},   // course.json から build.py が埋め込む講座の設定
    data: {},            // CN.data[種別][id] = データ
    widgets: {},         // CN.widgets[種別] = function(el, data, ctx)
    searchText: {},      // CN.searchText[種別] = function(data) -> 検索用の文字列
    glossaryItems: [], examItems: [], mappingRows: {},
    uid: 0, listeners: {}
  };

  /* ---------- 文言（講座・図ごとに差し替えられる） ----------
     優先順位：図のデータの labels > course.json の labels > ここの既定（分野に依存しない言葉）。
     使い方：CN.t('seq.ifLabel', d) */
  var DEF = {
    'arch.kind': '構成図', 'arch.node': 'ノード', 'arch.link': 'リンク', 'arch.linkArrow': ' ⇄ ',
    'arch.hint': 'ノード（箱）やリンク（線）を押すと、役割・つながり・運ぶもの・関連する章が表示されます。',
    'arch.legendTail': 'ノード／線を押すと詳しく表示',
    'arch.f.role': '主な役割', 'arch.f.proto': '方式', 'arch.f.carries': '運ぶもの',
    'arch.linksOf': '接続するリンク（押すと切替）', 'arch.ends': '端点：', 'arch.related': '関連する章',
    'arch.plane.cp': '信号・制御の流れ', 'arch.plane.up': '主な経路（太線）', 'arch.plane.lg': '間接的なつながり（点線）',
    'seq.kind': 'シーケンス再生', 'seq.actor': '登場人物', 'seq.ifLabel': '手段・経路', 'seq.ieLabel': '主な要素',
    'seq.what': '何が起きているか', 'seq.trap': 'つまずきやすい点', 'seq.self': 'その場での処理',
    'stack.kind': '階層スタック', 'stack.item': '項目', 'stack.hint': '層（箱）を押すと、その層の役割が表示されます。上位ほど画面の上です。',
    'stack.carries': '運ぶもの', 'stack.spec': '規格・出典', 'stack.restack': '↻ 下から積み直す',
    'stack.legend': '凡例：枠の色が層の種類、破線は「運ばれる中身」です。層を押すと説明が出ます。',
    'stack.plane.cp': '制御・信号', 'stack.plane.up': '本体・データ',
    'stack.role.app': '上位の層', 'stack.role.payload': '運ばれる中身', 'stack.role.transport': '運ぶ層', 'stack.role.net': '宛先を決める層', 'stack.role.link': '土台の層', 'stack.role.sec': '保護の層',
    'ident.kind': '構造の分解', 'ident.item': '項目', 'ident.where': '割り当てと使われ方', 'ident.val': '例の値', 'ident.bits': '長さ・形式',
    'ident.hint': '部分を押すと説明が出ます',
    'table.kind': '早見表', 'table.search': '表内を検索', 'table.hint': '行を押すと補足が表示されます。見出しを押すと並べ替えできます。', 'table.all': 'すべて', 'table.rows': ' 行', 'table.noDetail': '（この行の補足はありません）',
    'tree.kind': '階層図', 'tree.all': '並べて表示', 'tree.only': ' のみ', 'tree.hint': '箱を押すと、どこで作られ、どこへ渡されるかが表示され、導出元が強調されます。',
    'tree.f.made': '作られる場所', 'tree.f.to': '渡される先・使われ方', 'tree.f.from': '導出元', 'tree.legendTail': '箱を押すと、導出元をたどって強調します',
    'state.kind': '状態遷移図', 'state.hint': '状態を押すと「その状態で何ができるか・どこへ遷移するか」、矢印を押すと「遷移の条件」が表示されます。',
    'state.legend': '状態（箱）と遷移（矢印）を押すと条件が表示されます', 'state.trigger': 'きっかけ', 'state.cond': '条件',
    'drill.kind': '切り分け演習', 'drill.title': '症状とログから、止まった段階と最初に調べる対象を選ぶ', 'drill.q1': '手順のどこで止まっていますか。', 'drill.q2': '最初に調べる対象はどれですか。',
    'drill.log': '架空のログ', 'drill.symptom': '症状：', 'drill.case': 'ケース ',
    'quiz.kind': '確認問題', 'quiz.title': '理解を確かめる',
    'exam.kind': '総合テスト', 'exam.start': '総合テストを始める',
    'glossary.kind': '用語集', 'glossary.title': '用語を引く（本文に出てきた語を、原語つきで）', 'glossary.search': '用語・原語・説明文で絞り込み',
    'mapping.kind': '対応表', 'mapping.title': 'どれがどれに当たるか', 'mapping.colA': '左', 'mapping.colB': '右', 'mapping.colNote': '備考', 'mapping.colCh': '章',
    'mapping.note': '対応は「おおむね」です。1 対 1 ではなく、分割・統合されている場合は備考に書きます。',
    'mapping.empty': 'この種別の行は登録されていません。',
    'compare.kind': '対比表',
    'flow.kind': '工程フロー', 'flow.step': '工程', 'flow.prev': '◀ 前へ', 'flow.next': '次へ ▶', 'flow.first': '⏮ 最初から', 'flow.list': '工程の一覧',
    'flow.inputs': '入力', 'flow.outputs': '出力', 'flow.caution': '注意点', 'flow.time': '目安の時間', 'flow.nextTo': 'この後の進み先（押すと移動）',
    'flow.repeat': '繰り返し', 'flow.branch': '分岐', 'flow.end': 'ここで終わり', 'flow.hint': '工程（箱）を押すか「次へ」で進みます。分岐は、進み先のボタンで選べます。',
    'flow.legendNext': '実線＝次の工程', 'flow.legendBranch': 'ラベルつき＝分岐', 'flow.legendLoop': '破線＝戻って繰り返す', 'flow.visited': '通過した工程',
    'xsec.kind': '工程断面', 'xsec.step': '手', 'xsec.proc': '工程の種類', 'xsec.equip': '使う装置', 'xsec.list': '手の一覧', 'xsec.note': '寸法は模式です（実際の比率ではありません）。凡例を押すと、その材料を強調します。',
    'route.kind': '行程帯図', 'route.layerAria': '条件の切替', 'route.seg': '区間', 'route.pt': '拠点', 'route.gate': '手続き', 'route.mark': '印', 'route.layer': '条件', 'route.docs': '関連する書類', 'route.risks': '主なリスク',
    'route.hint': '区間・手続き・拠点・印を押すと説明が出ます。上のタブで条件を切り替えると、色帯と印だけが変わります。', 'route.legendTail': '色の帯の中の文字は負担者の頭文字', 'route.table': '同じ内容の表（読み上げ・印刷用）',
    'layers.kind': '断面・構成図', 'layers.part': '部位', 'layers.hint': '部位（箱）を押すと説明が表示されます。矢印キーで隣の部位へ移れます。', 'layers.list': '部位の一覧',
    'layers.f.material': '材料・構成', 'layers.f.dims': '寸法・目安', 'layers.f.role': '役割', 'layers.f.note': '補足', 'layers.layer': '層',
    'app.reset': '読了・確認問題・総合テストの記録をすべて消します。よろしいですか？',
    'app.read': '☐ この章を読了にする', 'app.readDone': '✓ 読了済み（押すと取り消し）'
  };
  CN.DEF = DEF;
  CN.t = function (key, d) {
    var a = d && d.labels && d.labels[key], b = CN.cfg.labels && CN.cfg.labels[key];
    return a != null ? a : (b != null ? b : (DEF[key] != null ? DEF[key] : key));
  };
  /* 色の枠（kind）：a〜g は ue〜ims の別名。名前の表示は course.json の kinds（図ごとの kinds でも上書き可） */
  var KALIAS = { a: 'ue', b: 'ran', c: 'core', d: 'db', e: 'pol', f: 'ext', g: 'ims' };
  CN.kind = function (k) { return KALIAS[k] || k || 'core'; };
  CN.kindName = function (k, d) {
    var kk = CN.kind(k), src = [d && d.kinds, CN.cfg.kinds], i, o;
    for (i = 0; i < src.length; i++) { o = src[i]; if (o) { if (o[k] != null) return o[k]; if (o[kk] != null) return o[kk]; } }
    return '';
  };

  /* ---------- DOM ヘルパー ---------- */
  function addKids(e, kids) {
    for (var i = 0; i < kids.length; i++) {
      var k = kids[i];
      if (k == null || k === false) continue;
      if (Array.isArray(k)) addKids(e, k);
      else e.appendChild(typeof k === 'object' ? k : document.createTextNode(String(k)));
    }
  }
  function mk(ns, tag, props, kids) {
    var e = ns ? document.createElementNS(SVGNS, tag) : document.createElement(tag);
    if (props) for (var k in props) {
      var v = props[k];
      if (v == null || v === false) continue;
      if (k === 'text') e.textContent = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k === 'on' && typeof v === 'object') { for (var ev in v) e.addEventListener(ev, v[ev]); }
      else e.setAttribute(k, v === true ? '' : v);
    }
    addKids(e, kids || []);
    return e;
  }
  CN.h = function (tag, props) { return mk(false, tag, props, Array.prototype.slice.call(arguments, 2)); };
  CN.s = function (tag, props) { return mk(true, tag, props, Array.prototype.slice.call(arguments, 2)); };
  CN.esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  /* データ中の短い文章用：HTML を無効化したうえで `code` と **太字** だけ許可 */
  CN.rich = function (t) {
    return CN.esc(t).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  };
  CN.richEl = function (tag, cls, t) { var e = CN.h(tag, cls ? { 'class': cls } : null); e.innerHTML = CN.rich(t); return e; };
  CN.clear = function (e) { while (e.firstChild) e.removeChild(e.firstChild); return e; };
  CN.reduced = function () { return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); };
  CN.chLink = function (n) {
    var s = ('0' + n).slice(-2);
    if (CN.cfg.publish) {   // 公開版：未公開の章は、リンクにせず「準備中」と分かる表示にする
      var c = (window.CN_CHAPTERS || []).filter(function (x) { return x.num === s; })[0];
      if (c && !c.ready) return CN.h('span', { 'class': 'chip pend', title: '準備中' }, '第' + s + '章（準備中）');
    }
    return CN.h('a', { 'class': 'chip', href: '#ch' + s }, '第' + s + '章');
  };
  CN.pad2 = function (n) { return ('0' + n).slice(-2); };
  CN.chLinks = function (arr) { var w = CN.h('div', { 'class': 'chips' }); (arr || []).forEach(function (n) { w.appendChild(CN.chLink(n)); }); return w; };
  CN.chTitle = function (n) {
    var s = ('0' + n).slice(-2), c = (window.CN_CHAPTERS || []).filter(function (x) { return x.num === s; })[0];
    return c ? c.title : '';
  };

  /* ---------- 保存（localStorage は使えない環境でも落とさない） ---------- */
  var mem = {}, PFX = CN.cfg.prefix || 'course.';   // 保存キーの接頭辞は講座ごとに別（course.json の prefix）
  CN.prefix = PFX;
  CN.store = {
    get: function (k, def) {
      try { var v = localStorage.getItem(PFX + k); return v == null ? (k in mem ? mem[k] : def) : JSON.parse(v); }
      catch (e) { return k in mem ? mem[k] : def; }
    },
    set: function (k, v) { mem[k] = v; try { localStorage.setItem(PFX + k, JSON.stringify(v)); } catch (e) { /* 保存できなくても動作は続ける */ } },
    update: function (k, fn, def) { var v = CN.store.get(k, def); fn(v); CN.store.set(k, v); return v; }
  };
  CN.on = function (ev, fn) { (CN.listeners[ev] = CN.listeners[ev] || []).push(fn); };
  CN.emit = function (ev, a) { (CN.listeners[ev] || []).forEach(function (f) { try { f(a); } catch (e) { console.warn(e); } }); };

  /* ---------- データ登録 ---------- */
  CN.ALIAS = { qos: 'table', keys: 'tree' };   // 旧名（コア網講義の名前）の別名
  CN.wk = function (k) { return CN.ALIAS[k] || k; };
  CN.add = function (kind, id, data) {
    kind = CN.wk(kind);
    CN.data[kind] = CN.data[kind] || {};
    if (CN.data[kind][id]) console.warn('CN.add: 重複 ' + kind + '/' + id);
    CN.data[kind][id] = data;
  };
  CN.glossary = function (arr) { [].push.apply(CN.glossaryItems, arr); };
  CN.exam = function (arr) { [].push.apply(CN.examItems, arr); };
  CN.mapping = function (cat, arr) { CN.mappingRows[cat] = (CN.mappingRows[cat] || []).concat(arr); };

  /* ---------- 部品の取り付け ---------- */
  function warn(el, msg) {
    el.appendChild(CN.h('div', { 'class': 'wg-warn', role: 'note' }, '【部品エラー】' + msg));
  }
  CN.mount = function (root) {
    var list = root.querySelectorAll('[data-widget]:not([data-mounted])');
    Array.prototype.forEach.call(list, function (el) {
      var kind = CN.wk(el.getAttribute('data-widget')), src = el.getAttribute('data-src'), fn = CN.widgets[kind];
      el.setAttribute('data-mounted', '1');
      if (!fn) { warn(el, '未対応の部品 ' + kind); return; }
      var data = null;
      if (src && !/^(glossary|mapping|exam)$/.test(kind)) {
        data = (CN.data[kind] || {})[src];
        if (!data) { warn(el, 'データ未登録 ' + kind + ' / ' + src); return; }
      }
      try { fn(el, data, { id: kind + '-' + (src || 'x').replace(/[^\w-]/g, '_') + '-' + (++CN.uid), src: src }); }
      catch (err) { warn(el, '描画エラー ' + kind + ' / ' + src + '：' + err.message); console.warn(err); }
    });
  };

  /* ---------- 部品共通の枠 ---------- */
  CN.frame = function (el, label, title, tabs) {
    el.classList.add('wg');
    var head = CN.h('div', { 'class': 'wg-head' }, CN.h('h4', null, CN.h('small', null, label), title || ''));
    if (tabs) head.appendChild(tabs);
    el.appendChild(head);
    return head;
  };
  /* 排他的なタブボタン群。items: [{key,label}]、on(key) を呼ぶ */
  CN.tabs = function (items, current, on, aria) {
    var wrap = CN.h('div', { 'class': 'wg-tabs', role: 'group', 'aria-label': aria || '切替' });
    var btns = items.map(function (it) {
      var b = CN.h('button', { type: 'button', 'aria-pressed': String(it.key === current) }, it.label);
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        on(it.key);
      });
      wrap.appendChild(b); return b;
    });
    return wrap;
  };
  /* 矩形の辺との交点（中心から相手方向へ） */
  CN.clip = function (cx, cy, hw, hh, tx, ty) {
    var dx = tx - cx, dy = ty - cy;
    if (!dx && !dy) return [cx, cy];
    var t = Math.min(dx ? hw / Math.abs(dx) : 1e9, dy ? hh / Math.abs(dy) : 1e9);
    return [cx + dx * t, cy + dy * t];
  };
  /* 簡易の折り返し（全角=1、半角=0.55 の幅で数える） */
  CN.wrap = function (str, maxPx, fs) {
    var out = [], line = '', w = 0, fsz = fs || 12;
    String(str).split('\n').forEach(function (para) {
      line = ''; w = 0;
      for (var i = 0; i < para.length; i++) {
        var ch = para.charAt(i), cw = (ch.charCodeAt(0) < 256 ? 0.56 : 1) * fsz;
        if (w + cw > maxPx && line) {
          var cut = line.lastIndexOf(' ');
          if (cut > 0 && ch !== ' ' && /[A-Za-z0-9]/.test(ch)) { out.push(line.slice(0, cut)); line = line.slice(cut + 1); w = line.length * 0.56 * fsz; }
          else { out.push(line); line = ''; w = 0; }
        }
        if (ch === ' ' && !line) continue;
        line += ch; w += cw;
      }
      out.push(line);
    });
    return out;
  };
  CN.shuffleSeed = function (n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; };
})();
