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

/* scale：大きさの比較。値は必ず出典つき（src）で、部品の中に数字を持たない。ここの値と出典は見本のための架空 */
CN.add('scale', 'cS1-scale', { title: '大きさの比較（見本。すべて架空）', base: 'bulb', initial: 'town',
  sources: [{ n: 1, issuer: '見本', title: '架空の資料 A', date: '架空', note: '見本のための値' }, { n: 2, issuer: '見本', title: '架空の資料 B', date: '架空' }],
  groups: [{ key: 'home', label: '家庭' }, { key: 'plant', label: '設備' }],
  items: [
    { id: 'bulb', name: '見本の電球 1 個', short: '見本の電球', value: 10, unit: 'W', group: 'home', counter: '個', desc: '見本の項目です。', cond: '架空の定格', src: [1] },
    { id: 'house', name: '見本の家 1 軒（平均）', short: '見本の家', from: { energy: 4000, unit: 'kWh', hours: 8760, formula: '年 4,000 kWh（架空）÷ 8,760 時間' }, group: 'home', counter: '軒', desc: '年間の電力量を時間で割った平均（架空）。', cond: '架空の平均', src: [1] },
    { id: 'shop', name: '見本の大型店（契約の幅）', short: '見本の大型店', range: [50, 2000], unit: 'kW', group: 'home', counter: '店', desc: '幅のある項目の例。', cond: '架空の区分', src: [2] },
    { id: 'mill', name: '見本の風車 1 基', short: '見本の風車', value: 3, unit: 'MW', group: 'plant', counter: '基', desc: '見本。', cond: '架空の定格', src: [2] },
    { id: 'plant', name: '見本の発電所', short: '見本の発電所', value: 500, unit: 'MW', group: 'plant', counter: 'か所', desc: '見本。', cond: '架空の定格', src: [2] },
    { id: 'town', name: '見本の町の最大の需要', short: '見本の町の最大需要', value: 1.2, unit: 'GW', group: 'plant', counter: '町', desc: '見本。', cond: '架空の見通し', src: [2] }] });
/* lab：式を動かす実験台。入力のつまみ・計算式（安全な評価器。eval は使わない）・結果・図（bar / wave / circuit） */
CN.add('lab', 'cS1-lab', { title: '実験台（見本。すべて架空）', experiments: [
  { id: 'ohm', label: '電流と抵抗', intro: '電圧と抵抗を変えて、電流を見ます（見本）。', formula: '電流（A）＝ 電圧（V）÷ 抵抗（Ω）',
    inputs: [{ id: 'V', label: '電圧', unit: 'V', min: 1, max: 20, step: 1, value: 10, say: [{ when: 'V > 15', text: '電圧が高い。' }, { text: '電圧は中くらい。' }] },
      { id: 'R', label: '抵抗', unit: 'Ω', min: 1, max: 20, step: 1, value: 5, presets: [{ label: '5 Ω', value: 5 }] }],
    calc: [{ id: 'I', expr: 'V / R' }], results: [{ label: '電流', expr: 'I', unit: 'A', digits: 2, big: true }],
    reads: [{ when: 'I > 3', text: '電流が大きい（線が太く、点が速く流れる）。' }, { text: '電圧が同じなら、抵抗が小さいほど電流は大きい。' }],
    fig: { type: 'circuit', current: 'I', imax: 20, currentLabel: '電流', elements: [{ type: 'source', label: '電源', val: 'V', unit: 'V', digits: 0 }, { type: 'resistor', label: '抵抗', val: 'R', unit: 'Ω', digits: 0 }] } },
  { id: 'wave', label: '波形', intro: '振幅と周波数を変えて、2 つの波を重ねます（見本）。',
    inputs: [{ id: 'A', label: '振幅', unit: 'V', min: 1, max: 10, step: 1, value: 6 }, { id: 'f', label: '周波数', unit: 'Hz', min: 25, max: 100, step: 5, value: 50, presets: [{ label: '50 Hz', value: 50 }, { label: '60 Hz', value: 60 }] }],
    calc: [{ id: 'rms', expr: 'A / sqrt(2)' }, { id: 'T', expr: '1000 / f' }], results: [{ label: '実効値', expr: 'rms', unit: 'V', digits: 2 }, { label: '周期', expr: 'T', unit: 'ms', digits: 1 }],
    fig: { type: 'wave', span: 0.04, ymax: 10, unit: 'V', rms: 'rms', waves: [{ label: '波 1', amp: 'A', freq: 'f', phase: 0 }, { label: '波 2（位相 90 度）', amp: 'A / 2', freq: 'f', phase: 90 }], sum: { label: '重ねた波' } } },
  { id: 'bar', label: '棒', intro: '2 つの量を棒で比べます（見本）。',
    consts: [{ id: 'k', label: '見本の係数', value: 3, unit: '倍', src: '架空' }],
    inputs: [{ id: 'a', label: '量 a', unit: '個', min: 0, max: 100, step: 5, value: 40 }],
    calc: [{ id: 'b', expr: 'a * k' }], results: [{ label: '量 b', expr: 'b', unit: '個', digits: 0 }],
    fig: { type: 'bar', max: 300, bars: [{ label: '量 a', expr: 'a', unit: '個', digits: 0 }, { label: '量 b', expr: 'b', unit: '個', digits: 0 }] } }] });
