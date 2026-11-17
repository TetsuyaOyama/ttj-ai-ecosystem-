/* 第04章のデータ（見本。金額・名称・数式の設定はすべて架空）。基盤に足した「金額の scale」「線グラフ curve」「ncdf・npdf」の使用例 */
CN.add('scale', 'c04-yen', {
  title: '金額の大きさ（円・架空の例）',
  base: 'salary', initial: 'hub',
  disclaimer: '学習用の模型です。金額はすべて架空で、実際の投資・取引・契約の判断には使えません。',
  sources: [
    { n: 1, issuer: '架空の宅配会社', title: '決算の抜粋（見本用の創作）', date: '2026-11' },
    { n: 2, issuer: '架空の統計局', title: '物流市場の概況（見本用の創作）', date: '2026-11' }
  ],
  groups: [{ key: 'unit', label: '1 件・1 人' }, { key: 'firm', label: '会社' }, { key: 'nation', label: '国・市場' }],
  items: [
    { id: 'fee', name: '荷物 1 個の送料', short: '送料', value: 1000, unit: '円', group: 'unit', counter: '個', desc: '標準サイズ・標準の距離の送料（架空）。', cond: '税込・1 個あたり', src: [1] },
    { id: 'salary', name: '配達員 1 人の年収', short: '年収', value: 480, unit: '万円', group: 'unit', counter: '年分', desc: '基準にする金額（架空）。', cond: '1 年間の合計。賞与を含む', src: [1] },
    { id: 'truck', name: '配達用の車 1 台', short: '車', value: 220, unit: '万円', group: 'unit', counter: '台', desc: '新車の価格（架空）。', cond: '1 台あたり。税込', src: [1] },
    { id: 'shop', name: '集荷店 1 店の年間売上', short: '店の売上', range: [3000, 6000], unit: '万円', group: 'firm', counter: '店', desc: '店ごとに幅がある（架空）。', cond: '1 年間。範囲は店の規模の違い', src: [1] },
    { id: 'hub', name: 'ハブ 1 拠点の建設費', short: 'ハブ', value: 80, unit: '億円', group: 'firm', counter: '拠点', desc: '仕分け機を含む（架空）。', cond: '1 拠点あたり。土地代を除く', src: [1] },
    { id: 'sales', name: '会社の年間売上', short: '会社の売上', value: 1200, unit: '億円', group: 'firm', counter: '社', desc: '連結の売上高（架空）。', cond: '1 年間。連結', src: [1] },
    { id: 'invest', name: '5 年間の設備投資の計画', short: '設備投資', value: 3000, unit: '億円', group: 'firm', counter: '倍', desc: '仕分けの自動化など（架空）。', cond: '5 年間の合計（計画）', src: [1] },
    { id: 'market', name: '国の物流市場の規模', short: '物流市場', value: 22, unit: '兆円', group: 'nation', counter: '倍', desc: '宅配を含む物流全体（架空）。', cond: '1 年間。名目', src: [2] },
    { id: 'gdp', name: '国の経済規模（名目）', short: '経済規模', value: 600, unit: '兆円', group: 'nation', counter: '倍', desc: '架空の国の名目の総生産。', cond: '1 年間。名目', src: [2] }
  ]
});

CN.add('scale', 'c04-usd', {
  title: '金額の大きさ（ドル・架空の例）',
  base: 'fee', initial: 'market',
  disclaimer: '学習用の模型です。金額はすべて架空で、実際の投資・取引・契約の判断には使えません。円の物差しとは別で、換算はしていません。',
  sources: [{ n: 1, issuer: '架空の海外事業部', title: '海外事業の概況（見本用の創作）', date: '2026-11' }],
  groups: [{ key: 'unit', label: '1 件' }, { key: 'firm', label: '会社' }, { key: 'market', label: '市場' }],
  items: [
    { id: 'fee', name: '国際便 1 個の送料', short: '送料', value: 20, unit: 'ドル', group: 'unit', counter: '個', desc: '標準サイズ（架空）。', cond: '1 個あたり。税抜', src: [1] },
    { id: 'pallet', name: 'コンテナ 1 本の運賃', short: '運賃', value: 3500, unit: 'ドル', group: 'unit', counter: '本', desc: '主要航路の標準のコンテナ（架空）。', cond: '1 本あたり。燃料の追加料金を含む', src: [1] },
    { id: 'ship', name: '貨物船 1 隻の価格', short: '船', value: 90, unit: '百万ドル', group: 'firm', counter: '隻', desc: '新造船の価格（架空）。', cond: '1 隻あたり', src: [1] },
    { id: 'sales', name: '海外事業の年間売上', short: '海外売上', value: 4, unit: '十億ドル', group: 'firm', counter: '倍', desc: '海外事業部の売上高（架空）。', cond: '1 年間', src: [1] },
    { id: 'market', name: '国際物流の市場規模', short: '市場', value: 1.2, unit: '兆ドル', group: 'market', counter: '倍', desc: '世界全体の推計（架空）。', cond: '1 年間。名目', src: [1] }
  ]
});

CN.add('lab', 'c04-payoff', {
  title: '損益図の実験台（架空の燃料の「買う権利」）',
  disclaimer: '学習用の模型です。価格・手数料はすべて架空で、実際の投資・取引の判断には使えません。',
  experiments: [
    { id: 'pay', label: '満期の損益', intro: '燃料を、決めた値段（権利行使価格）で買える権利の、満期の損益です。買い手は権利の代金（プレミアム）を払い、売り手は受け取ります。',
      formula: '買い手の損益 ＝ max(満期の価格 − 権利行使価格, 0) − プレミアム。売り手は符号が逆',
      inputs: [
        { id: 'K', label: '権利行使価格', unit: '円', min: 80, max: 120, step: 1, value: 100 },
        { id: 'p', label: 'プレミアム（権利の代金）', unit: '円', min: 1, max: 15, step: 0.5, value: 5, presets: [{ label: '小さめ 2 円', value: 2 }, { label: '大きめ 10 円', value: 10 }] }
      ],
      calc: [{ id: 'be', expr: 'K + p' }],
      results: [{ label: '損益がゼロになる満期の価格', expr: 'be', unit: '円', digits: 1, big: true }, { label: '買い手の最大の損', expr: '-p', unit: '円', digits: 1, note: '売り手の最大の得' }],
      reads: [{ text: '買い手の損は、権利の代金までで止まります。売り手の損は、価格が上がるほど大きくなります。' }, { when: 'p > 8', text: 'プレミアムが大きいほど、損益ゼロの価格は遠くなります。' }],
      fig: { type: 'curve', x: { id: 'S', min: 70, max: 130, step: 1, label: '満期の価格', unit: '円' }, unit: '円', yLabel: '損益', ymin: -20, ymax: 30, digits: 1,
        series: [{ label: '買い手', expr: 'max(S - K, 0) - p', color: 'ran' }, { label: '売り手', expr: 'p - max(S - K, 0)', color: 'pol' }],
        marks: [{ x: 'K', label: '権利行使価格' }, { x: 'be', label: '損益ゼロ' }], alt: '満期の価格ごとの、買い手と売り手の損益の線グラフ。0 の線をはさんで、2 本の線は上下が逆になる', caption: '横軸は満期の価格、縦軸は 1 単位あたりの損益。縦の破線は権利行使価格と損益ゼロの価格。' } },
    { id: 'yc', label: '利回りの曲線', intro: '満期までの年数ごとの利回りを、式から描きます（架空の曲線）。傾きが逆になる（負の値が出る）場合も描けます。',
      formula: '利回り ＝ 長期の水準 ＋ （短期の水準 − 長期の水準）× e^(−年数 ÷ 速さ)',
      inputs: [
        { id: 'short', label: '短期の利回り', unit: '％', min: -1, max: 6, step: 0.1, value: 0.5 },
        { id: 'long', label: '長期の利回り', unit: '％', min: -1, max: 6, step: 0.1, value: 2.5 },
        { id: 'tau', label: '近づく速さ（年数）', unit: '年', min: 1, max: 10, step: 0.5, value: 4 }
      ],
      calc: [{ id: 'spread', expr: 'long - short' }],
      results: [{ label: '長期と短期の差', expr: 'spread', unit: '％ポイント', digits: 1, big: true }],
      reads: [{ when: 'spread < 0', text: '短期の方が高い形です（右下がり）。' }, { when: 'spread >= 0', text: '長期の方が高い形です（右上がり）。' }],
      fig: { type: 'curve', x: { id: 'y', min: 0.5, max: 30, step: 0.5, label: '満期までの年数', unit: '年' }, unit: '％', yLabel: '利回り', ymin: -2, ymax: 7, digits: 2,
        series: [{ label: '利回り', expr: 'long + (short - long) * exp(-y / tau)', color: 'core' }, { label: '長期の水準', expr: 'long', color: 'ims', dash: 'dot' }],
        marks: [{ x: 'tau', label: '速さの年数' }], alt: '満期までの年数ごとの利回りの線グラフ。短期の水準から長期の水準へ近づく', caption: '点線は長期の水準。' } }
  ]
});

CN.add('lab', 'c04-bs', {
  title: '理論価格の実験台（式の中の ncdf・npdf。架空の設定）',
  disclaimer: '学習用の模型です。数字はすべて架空で、実際の投資・取引の判断には使えません。',
  experiments: [
    { id: 'bs', label: '買う権利の理論価格', intro: '満期までの期間が短くなるほど、理論価格の線は満期の損益の線（折れ線）に近づきます。',
      formula: '理論価格 ＝ S × N(d1) − K × e^(−r×T) × N(d2)。d1 ＝ (ln(S÷K) ＋ (r ＋ σ²÷2)×T) ÷ (σ×√T)、d2 ＝ d1 − σ×√T（N は標準正規分布の累積分布関数）',
      consts: [{ id: 'K', value: 100, label: '権利行使価格', unit: '円', src: '架空' }],
      inputs: [
        { id: 'S0', label: '今の価格', unit: '円', min: 70, max: 130, step: 1, value: 100 },
        { id: 'sig', label: '価格の振れ幅（年率）', unit: '％', min: 5, max: 80, step: 1, value: 20, presets: [{ label: '小さい 10％', value: 10 }, { label: '大きい 40％', value: 40 }] },
        { id: 'T', label: '満期までの年数', unit: '年', min: 0.05, max: 2, step: 0.05, value: 0.25 },
        { id: 'rr', label: '金利（年率）', unit: '％', min: 0, max: 5, step: 0.25, value: 1 }
      ],
      calc: [{ id: 's', expr: 'sig / 100' }, { id: 'r', expr: 'rr / 100' }, { id: 'd1', expr: '(ln(S0 / K) + (r + s * s / 2) * T) / (s * sqrt(T))' }, { id: 'd2', expr: 'd1 - s * sqrt(T)' },
        { id: 'C', expr: 'S0 * ncdf(d1) - K * exp(-r * T) * ncdf(d2)' }],
      results: [{ label: '理論価格', expr: 'C', unit: '円', digits: 2, big: true }, { label: 'N(d1)（価格が 1 円動いたときの理論価格の動き）', expr: 'ncdf(d1)', digits: 3 }, { label: '密度 n(d1)', expr: 'npdf(d1)', digits: 3 }],
      reads: [{ when: 'S0 > K', text: '今の価格が権利行使価格より高いので、満期の損益の線は右上がりの側にあります。' }, { text: '理論価格は、満期の損益（max(S − K, 0)）より下には下がりません。' }],
      fig: { type: 'curve', x: { id: 'S', min: 70, max: 130, step: 1, label: '価格', unit: '円' }, unit: '円', yLabel: '買う権利の価値', ymin: 0, ymax: 35, digits: 2,
        series: [{ label: '理論価格', expr: 'S * ncdf((ln(S / K) + (r + s * s / 2) * T) / (s * sqrt(T))) - K * exp(-r * T) * ncdf((ln(S / K) + (r + s * s / 2) * T) / (s * sqrt(T)) - s * sqrt(T))', color: 'ran' }, { label: '満期の価値', expr: 'max(S - K, 0)', color: 'pol', dash: true }],
        marks: [{ x: 'S0', label: '今の価格' }], alt: '価格ごとの、買う権利の理論価格と満期の価値の線グラフ。理論価格はなめらかな曲線で、満期の価値の折れ線の上にある', caption: '実線は理論価格、破線は満期の価値。縦の破線は今の価格。' } }
  ]
});

CN.add('quiz', 'c04-quiz', { items: [
  { q: '円の物差しと、ドルの物差しの扱いで正しいのはどれですか。', c: ['別の物差しとして扱い、為替の換算はしない', '円に換算して 1 つの物差しに混ぜる', 'ドルだけ対数にしない', '単位は混ぜてよい'], a: 0, why: '円とドルは**別の物差し**で、換算しません。同じ物差しに混ぜると、為替の時点によって倍率が変わってしまいます。', ch: [4] },
  { q: '損益図で、0 の線より下に出る部分は何を表しますか。', c: ['損（マイナス）', '得（プラス）', '価格が 0 になること', '横軸の範囲の外'], a: 0, why: '縦軸は損益です。**0 の線より下がマイナス（損）**です。', ch: [4] },
  { q: '正規分布の累積分布関数 N(x) について正しいのはどれですか。', c: ['N(0) は 0.5 で、x が大きいほど 1 に近づく', 'N(0) は 0 になる', 'N(x) は 1 を超える', 'x が大きいほど 0 に近づく'], a: 0, why: '標準正規分布は 0 を中心に左右対称なので、**N(0) ＝ 0.5**。x が大きいほど 1 に近づきます。', ch: [4] }
]});
