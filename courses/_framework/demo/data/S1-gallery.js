/* 部品見本のデータ（--demo のときだけ入る）。章の担当は、この形をまねて data/NN-*.js を書く。id は cS1- で始める */
CN.add('arch', 'cS1-arch', { title: '構成図（見本）', viewBox: [560, 200], initial: 'b',
  nodes: [{ id: 'a', label: 'A', sub: '入口', kind: 'ue', x: 10, y: 70, desc: '見本のノード。' }, { id: 'b', label: 'B', sub: '中継', kind: 'core', x: 220, y: 70, desc: '中継するノード。', role: '**受けて渡す**。' }, { id: 'c', label: 'C', sub: '出口', kind: 'ext', x: 430, y: 70, desc: '出口。' }],
  links: [{ id: 'ab', a: 'a', b: 'b', label: 'ab', plane: 'up', proto: '方式', carries: '運ぶもの' }, { id: 'bc', a: 'b', b: 'c', label: 'bc', plane: 'cp' }] });
CN.add('flow', 'cS1-flow', { title: '工程フロー（見本）', steps: [
  { id: 'p1', name: '準備', desc: '材料をそろえる。', outputs: ['材料'] },
  { id: 'p2', name: '加工', inputs: ['材料'], next: [{ to: 'p3', label: '良' }, { to: 'p4', label: '否' }] },
  { id: 'p3', name: '仕上げ', end: true }, { id: 'p4', name: 'やり直し', row: 1, col: 1, next: [{ to: 'p2', kind: 'loop', label: '再加工' }] }] });
CN.add('route', 'cS1-route', { title: '行程帯図（見本）',
  points: [{ id: 'x', label: '出発' }, { id: 'y', label: '中継' }, { id: 'z', label: '到着' }],
  segs: [{ id: 's1', from: 'x', to: 'y', label: '前半', mode: 'land', d: '前半の区間。' }, { id: 's2', from: 'y', to: 'z', label: '後半', mode: 'sea' }],
  parties: [{ k: 'a', label: '甲' }, { k: 'b', label: '乙' }],
  layers: [{ key: 'k1', label: '条件1', rows: [{ label: '費用', by: { s1: 'a', s2: 'b' } }] }, { key: 'k2', label: '条件2', rows: [{ label: '費用', by: { s1: 'a', s2: 'a' } }], marks: [{ at: 'y', row: 0, label: '移転' }] }] });
CN.add('seq', 'cS1-seq', { title: 'シーケンス（見本）', actors: [{ id: 'a', name: '甲' }, { id: 'b', name: '乙' }], steps: [{ from: 'a', to: 'b', msg: '依頼', what: '依頼する。' }, { from: 'b', to: 'a', msg: '応答', dash: true, what: '結果を返す。' }] });
CN.add('layers', 'cS1-layers', { title: '層図（見本）', layers: [{ id: 'l1', name: '上の層', h: 40 }, { id: 'l2', name: '下の層', h: 40, kind: 'b' }] });
CN.add('xsec', 'cS1-xsec', { title: '断面ステッパー（見本）', viewBox: [400, 160], base: [{ id: 'sub', m: 'si', x: 0, y: 110, w: 400, h: 50 }],
  steps: [{ name: '膜をつける', fx: 'deposit', add: [{ id: 'f', m: 'sio2', x: 0, y: 80, w: 400, h: 30 }], what: '膜を**成膜**する。' }, { name: '溝を彫る', fx: 'etch', add: [{ id: 'g', m: 'void', x: 150, y: 80, w: 100, h: 30 }], what: '溝を彫る。' }] });
CN.add('stack', 'cS1-stack', { title: '階層スタック（見本）', stacks: [{ name: '例', layers: [{ n: '上', role: 'payload' }, { n: '中', role: 'app' }, { n: '下', role: 'link' }] }] });
CN.add('ident', 'cS1-ident', { title: '構造の分解（見本）', items: [{ name: 'コード', parts: [{ label: '前', val: 'AB', bits: '2 桁' }, { label: '後', val: '123', bits: '3 桁' }] }] });
CN.add('table', 'cS1-table', { title: '早見表（見本）', cols: ['名前', '数'], rows: [['ア', '3'], ['イ', '12']] });
CN.add('tree', 'cS1-tree', { title: '階層図（見本）', trees: [{ key: 't', label: '例', nodes: [{ id: 'r', name: '元', col: 0, row: 0 }, { id: 'c', name: '先', col: 0, row: 1 }], edges: [{ a: 'r', b: 'c' }] }] });
CN.add('state', 'cS1-state', { title: '状態遷移（見本）', machines: [{ key: 'm', label: '例', w: 420, h: 120, states: [{ id: 'a', name: '待機', x: 20, y: 40, kind: 'off' }, { id: 'b', name: '動作', x: 250, y: 40, kind: 'on' }], trans: [{ from: 'a', to: 'b', label: '開始' }, { from: 'b', to: 'a', label: '停止', curve: 20 }] }] });
CN.add('drill', 'cS1-drill', { title: '演習（見本）', procedure: ['手順1', '手順2'], nodes: ['場所A', '場所B'], cases: [{ symptom: '止まる。', log: ['ログ'], step: 0, node: 1, why: '見本の解説。' }] });
CN.add('compare', 'cS1-compare', { title: '対比表（見本）', colA: '左の列', colB: '右の列', rows: [{ a: '項目1', b: '対応1', note: '備考' }] });
CN.add('quiz', 'cS1-quiz', { items: [{ q: '見本の問題です。正しいのは？', c: ['これ', 'あれ'], a: 0, why: '見本。' }] });
