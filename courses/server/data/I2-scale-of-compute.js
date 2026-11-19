/* 序章2のデータ。事実確認表：facts/I2-scale-of-compute.md（確認 2026-11-19）
   この序章の値は 3 種類：公表資料の値（出典・時点・条件つき）／そこから計算した目安（式は facts の検算）／模型の仮定（つまみの値）。
   TOP500 は 2026 年 11 月の一覧（第 68 回、2026-11-16 発表）が最新。首位〜10 位は 6 月の一覧（第 67 回）から変わらない（top500.org のトップページ）。
   システムごとの Rmax・Rpeak・電力は、6 月の一覧のページの値（11 月のシステム別のページは確認できなかった）。
   性能の桁：FLOPS の値 v を log10(v) で表す（12 ＝ tera、15 ＝ peta、18 ＝ exa、21 ＝ zetta）。つまみ・図の縦軸はこの「桁」を使う。
*/

/* ---- lab：瞬間（FLOPS）と量（FLOP）。I1 の kW と kWh に相当 ---- */
CN.add('lab', 'cI2-quantity', {
  title: '瞬間と量：FLOPS（1 秒あたりの回数）と FLOP（こなした回数の合計）',
  disclaimer: '学習用の模型です。「この能力が止まらず出続ける」という単純な掛け算で、実際の学習・計算は、精度（FP64・FP16・FP8 など）、実行効率、故障や待ち時間で大きく変わります。GPT-3 の計算量は Epoch AI の推定（約 3×10²³ FLOP）です。',
  experiments: [
    { id: 'q', label: '性能 × 時間 ＝ 計算量',
      intro: '電力（kW）と電力量（kWh）の関係と同じです。**FLOPS は「1 秒あたりに何回計算できるか」（瞬間の能力）、FLOP は「ぜんぶで何回計算したか」（量）**で、**量 ＝ 能力 × 時間**です。能力は「桁」（10 の x 乗の x）で動かします。つまみの 15 が peta、18 が exa です。',
      formula: '計算量（FLOP）＝ 性能（FLOPS）× 時間（秒）。桁で書くと、量の桁 ＝ 性能の桁 ＋ log10（日数 × 86,400）。1 日 ＝ 86,400 秒',
      presetLabel: '目安の性能（押すと、性能のつまみが動きます）', presetHint: '',
      presets: [
        { label: 'H100 SXM 1 枚（FP64 34 TFLOPS）', set: { ex: 13.531 }, text: 'H100 SXM 1 枚の FP64（34 TFLOPS、NVIDIA の公表値）は、10 の 13.53 乗 FLOPS です。' },
        { label: '富岳（Rmax 442 PFLOPS）', set: { ex: 17.645 }, text: '富岳の HPL 実測（Rmax）は 442.01 PFLOPS で、10 の 17.65 乗 FLOPS です（TOP500 2026 年 6 月）。' },
        { label: 'TOP500 首位（Rmax 2.198 EFLOPS）', set: { ex: 18.342 }, text: 'TOP500 の首位 LineShine の Rmax は 2.198 EFLOPS（10 の 18.342 乗）です（2026 年 6 月、11 月の一覧でも首位）。' }
      ],
      consts: [{ id: 'gptLog', value: 23.477, label: 'GPT-3（175B）の学習に使った計算量の桁（約 3×10²³ FLOP、Epoch AI の推定。10 の x 乗の x）', digits: 3 }],
      inputs: [
        { id: 'ex', label: '性能の桁（10 の x 乗 FLOPS の x。15 ＝ peta、18 ＝ exa）', unit: '', min: 12, max: 19, step: 0.001, value: 17, say: [{ when: 'ex < 15', text: 'tera（10¹²）の桁：GPU 1 枚から数枚の規模です。' }, { when: 'ex >= 15 && ex < 18', text: 'peta（10¹⁵）の桁：2008 年の最初の PFLOPS 機から、いまの大規模な機械の下のほうまでです。' }, { when: 'ex >= 18', text: 'exa（10¹⁸）の桁：TOP500 の上位（HPL の実測）が入る規模です。' }] },
        { id: 'days', label: '動かし続ける日数', unit: '日', min: 1, max: 365, step: 1, value: 30 }
      ],
      calc: [{ id: 'qLog', expr: 'ex + log10(days * 86400)' }, { id: 'reach', expr: 'pow(10, gptLog - ex) / 86400' }],
      results: [
        { label: '瞬間の能力（FLOPS）', expr: 'pow(10, ex - 12)', unit: 'TFLOPS', digits: 1, show: 'ex < 15' },
        { label: '瞬間の能力（FLOPS）', expr: 'pow(10, ex - 15)', unit: 'PFLOPS', digits: 1, show: 'ex >= 15 && ex < 18' },
        { label: '瞬間の能力（FLOPS）', expr: 'pow(10, ex - 18)', unit: 'EFLOPS', digits: 2, show: 'ex >= 18' },
        { label: 'こなした計算の量（10 の x 乗 FLOP の x）', expr: 'qLog', unit: '', digits: 2, big: true },
        { label: 'GPT-3 の学習の計算量（約 3×10²³ FLOP）の何倍か', expr: 'pow(10, qLog - gptLog)', unit: '倍', digits: 2 },
        { label: 'その量に達するまでの日数（この能力が止まらず出続ける仮定）', expr: 'reach', unit: '日', digits: 1 }
      ],
      reads: [
        { when: 'qLog >= gptLog', text: 'この能力を、この日数だけ止めずに出し続けると、**GPT-3 の学習に使った量（約 3×10²³ FLOP、推定）を超えます**。能力が大きいほど、短い日数で同じ量に届きます。' },
        { when: 'qLog < gptLog', text: 'この能力と日数では、**GPT-3 の学習に使った量（約 3×10²³ FLOP、推定）には届きません**。「量に達するまでの日数」の行が、必要な日数の単純な計算です。' },
        { text: '**電力と同じ関係**です。能力（FLOPS）は蛇口の太さ、量（FLOP）はためた水の量。小さな能力でも、長く動かせば量は大きくなります。実際の学習では、精度の違い（FP64 と FP8 では 1 回の重さが違う）や、いつも最大の能力が出るわけではないことで、この単純な掛け算からずれます。' }
      ],
      fig: { type: 'curve', x: { id: 'dd', min: 0.1, max: 400, n: 120, scale: 'log', label: '動かし続ける日数', unit: '日', ticks: [{ v: 0.1, label: '0.1 日' }, { v: 1, label: '1 日' }, { v: 7, label: '1 週' }, { v: 30, label: '1 月' }, { v: 365, label: '1 年' }] },
        unit: '桁', yLabel: 'こなした計算の量（10 の x 乗 FLOP の x）', digits: 2, ymin: 15, ymax: 27,
        series: [{ label: '選んだ能力で動かした場合の量', expr: 'ex + log10(dd * 86400)', color: 'ran', dash: false }, { label: 'GPT-3 の学習の量（約 3×10²³ FLOP、推定）', expr: 'gptLog', color: 'pol', dash: 'dash' }],
        marks: [{ x: 'days', label: '選んだ日数' }],
        alt: '横軸を動かし続ける日数（対数、0.1 日から 400 日）、縦軸をこなした計算の量の桁（10 の x 乗 FLOP の x）にした線グラフ。選んだ性能で止めずに動かすと右上がりの線になり、GPT-3 の学習の量（約 23.5 の水平な破線）と交わる日数が、その量に達する日数。', caption: '実線：選んだ能力でこなした量（右へ行くほど増える）。破線：GPT-3 の学習の量（推定）。縦の線は選んだ日数。実線が破線に届く日数が「達するまでの日数」です。' } }
  ]
});

/* ---- layers：単位の階段（kilo → zetta）と、物差しに置いた機械 ---- */
CN.add('layers', 'cI2-stairs', {
  title: '単位の階段：1,000 倍ずつ。置いた値は「測り方」が違う（部位を押すと条件が出ます）',
  width: 460,
  ends: ['大きい（上）', '小さい（下）'],
  initial: 'lineshine',
  hint: '部位を押すと、何の値か・測り方・注意が出ます。同じ段に置いても、測り方（精度・実測か理論値か）が違う値は、単純には比べられません。色は「測り方の区別」で、意味は凡例と部位の説明の文字にも書いてあります。',
  kinds: { ran: 'HPL の実測（FP64）', core: '公表の仕様値・理論上の最大', pol: '精度・単位が違う値', ims: '目標・計画（稼働ではない）' },
  labels: { 'layers.f.material': '何の値か', 'layers.f.dims': '値と条件', 'layers.f.role': '測り方と精度', 'layers.f.note': '注意', 'layers.layer': '段' },
  layers: [
    { id: 'zetta', name: 'zetta (Z)', h: 62, kind: 'ims', dim: '10²¹ 回/秒',
      parts: [{ id: 'fnext', name: 'FugakuNEXT（目標）', sub: '「ゼタ級」を掲げる。数値の目標は FP8* で 600 EF 超', label: 'FugakuNEXT（目標）', kind: 'ims', desc: '理化学研究所が 2025 年 8 月に発表した、次の国のフラッグシップの計画です。「AI 向けのハードウェア性能が FP8（sparse）で 600 EFLOPS を超える」ことを目標とし、2030 年ごろの運用を目指します。', material: '理化学研究所の発表にある目標の値（FugakuNEXT）', dims: '600 EFLOPS 超（FP8、sparse）。富岳に対し、ハードウェア性能で 5 倍超、アプリケーション性能で最大 100 倍を目標とする、とも書かれている', role: 'AI 向けの低精度（FP8）で、疎行列（sparse）の条件。HPL（FP64）の値ではない', note: '**目標であり、稼働している機械の値ではありません。**研究センター（R-CCS）のページは「AI（FP8）でゼタ級」と書いています。数値で示された 600 EFLOPS は 6×10²⁰ で、数の上では exa の段です（この段に置いたのは「ゼタ級」の目標のため）。同じ「EFLOPS」でも、FP64 の HPL の値（TOP500）とは測り方が違い、単純には比べられません。', ch: [8] }] },
    { id: 'exa', name: 'exa (E)', h: 78, kind: 'ran', dim: '10¹⁸ 回/秒',
      parts: [
        { id: 'lineshine', name: 'LineShine', sub: '2.198 EFLOPS', label: 'TOP500 首位', w: 1, kind: 'ran', desc: 'TOP500 の 2026 年 6 月（第 67 回）の 1 位で、11 月（第 68 回）の一覧でも首位です。中国の深圳にあり、TOP500 の一覧は CPU だけの構成（アクセラレータなし）と書いています。', material: 'HPL の実測値 Rmax', dims: 'Rmax 2,198.40 PFLOPS、Rpeak 2,735.82 PFLOPS、電力 42,220 kW', role: 'HPL（行列計算のベンチマーク）で、FP64（倍精度）。実測値', note: '電力は、ベンチマークを実行したときの値で、年間の使用電力ではありません。', ch: [11] },
        { id: 'nvl72fp4', name: 'GB200 NVL72', sub: '1.44 EF（FP4*）', label: 'NVL72', w: 1, kind: 'pol', desc: 'NVIDIA の GB200 NVL72（1 ラックに GPU 72 枚）の、NVFP4 Tensor Core の値です。ページは「sparse | dense」で 1,440 | 720 PFLOPS と書いています。', material: '1 ラックの、AI 向けの 4 ビット浮動小数点（FP4）の値', dims: '1,440 PFLOPS（sparse）／720 PFLOPS（dense）。同じラックの FP64 は 2,880 TFLOPS', role: '低精度（FP4）。sparse は、疎行列の条件つきの値', note: '**1 ラックの FP4（sparse）が、TOP500 首位の FP64 の実測の約 0.65 倍に見える**のは、精度と条件が違うためで、「ラック 1 本が首位に迫る」という意味ではありません。', ch: [8, 11] },
        { id: 'abci16', name: 'ABCI 3.0', sub: '6.22 EF（FP16）', label: 'ABCI 3.0', w: 1, kind: 'pol', desc: '産業技術総合研究所（AIST）の AI 向けの計算基盤 ABCI 3.0（NVIDIA H200 が 6,128 枚）の、半精度（FP16）の理論上の最大値です。', material: 'システム全体の、半精度の理論上の最大（ピーク）', dims: '6.22 EFLOPS（FP16）。同じシステムの FP64 のピークは 415 PFLOPS', role: '半精度（FP16）。理論上の最大で、実測ではない', note: '同じ機械の FP16 と FP64 で、約 15 倍（6,220 ÷ 415）の差があります。', ch: [8] }] },
    { id: 'peta', name: 'peta (P)', h: 78, kind: 'ran', dim: '10¹⁵ 回/秒',
      parts: [
        { id: 'fugaku', name: '富岳', sub: '442 PFLOPS', label: '富岳', w: 1, kind: 'ran', desc: '理化学研究所の「富岳」です。TOP500 の 2026 年 6 月で 9 位。2020 年 6 月に 1 位になり、2020 年 11 月に 442.01 PFLOPS に更新されました。', material: 'HPL の実測値 Rmax', dims: 'Rmax 442.01 PFLOPS、Rpeak 537.21 PFLOPS、電力 29,899 kW（2026 年 6 月）', role: 'HPL、FP64（倍精度）。実測値', note: 'この序章の「何倍ぶん」の基準の 1 つです（富岳の Rmax）。', ch: [11] },
        { id: 'abci64', name: 'ABCI 3.0', sub: '415 PF（FP64）', label: 'ABCI 3.0', w: 1, kind: 'core', desc: 'ABCI 3.0 の、倍精度（FP64）の理論上の最大値です。', material: 'システム全体の、FP64 の理論上の最大（ピーク）', dims: '415 PFLOPS（FP64）。GPU 6,128 枚。電気設備の容量 6 MW', role: 'FP64（倍精度）。理論上の最大で、実測（Rmax）ではない', note: '理論上の最大と、HPL の実測は別の値です（実測は理論値より小さくなる）。この機械の HPL の実測は、ここでは確認していません。', ch: [8] },
        { id: 'roadrunner', name: 'Roadrunner', sub: '2008・1.026 PF', label: 'Roadrunner', w: 1, kind: 'ran', desc: 'IBM の Roadrunner は、TOP500 の 2008 年 6 月に、初めて PFLOPS（10¹⁵）を超えた機械です。', material: 'HPL の実測値 Rmax', dims: '1.026 PFLOPS（2008 年 6 月）', role: 'HPL、FP64。実測値', note: '同じ段（peta）に、18 年前の首位と、いまの機械（富岳など）が並びます。', ch: [11] }] },
    { id: 'tera', name: 'tera (T)', h: 78, kind: 'core', dim: '10¹² 回/秒',
      parts: [
        { id: 'asci', name: 'ASCI Red', sub: '1.07 TF', label: '1997', w: 1, kind: 'ran', desc: 'TOP500 の 1997 年 6 月に、初めて TFLOPS（10¹²）を超えた機械です。', material: 'HPL の実測値', dims: '1.068 TFLOPS（1997 年 6 月）', role: 'HPL、FP64。実測値', note: '現在の GPU 1 枚（FP64 34 TFLOPS）の約 30 分の 1 です（34 ÷ 1.068）。ただし GPU の値は仕様値で、測り方が違う。', ch: [11] },
        { id: 'es', name: 'Earth Simulator', sub: '35.9 TF', label: '2002', w: 1, kind: 'ran', desc: '日本の地球シミュレータは、TOP500 の 2002 年 6 月に 1 位になり、当時の 2 位以下を大きく引き離した機械です。', material: 'HPL の実測値', dims: '35.86 TFLOPS（2002 年 6 月）', role: 'HPL、FP64。実測値', note: 'H100 SXM 1 枚の FP64（34 TFLOPS、仕様値）とほぼ同じ桁です。測り方は違います。', ch: [11] },
        { id: 'h100', name: 'H100 SXM', sub: '34 TF', label: 'H100', w: 1, kind: 'core', desc: 'NVIDIA の H100 SXM（GPU 1 枚）の FP64（倍精度）の公表値です。', material: 'GPU 1 枚の、FP64 の公表値（理論上の最大に当たる仕様値）', dims: '34 TFLOPS（FP64）。FP64 Tensor Core は 67 TFLOPS、FP8 Tensor Core は 3,958 TFLOPS（with sparsity）', role: '精度ごとに値が違う。「34」は FP64（ベクトル演算）', note: 'FP8 の 3,958 は、疎行列の条件つきの AI 向けの値で、FP64 の 34 とは約 116 倍（3,958 ÷ 34）違う。**その会社の公開値の例で、優劣を示すものではありません。**', ch: [8] },
        { id: 'rtx', name: 'RTX 4090', sub: '83 TF', label: 'PC', w: 1, kind: 'core', desc: '個人向けの PC の GPU の例です。NVIDIA の GeForce RTX 4090 の製品ページは、シェーダーの性能を 83 TFLOPS と書いています。', material: 'GPU 1 枚の、シェーダーの性能（NVIDIA の公表値）', dims: '83 TFLOPS（シェーダー）。CUDA コア 16,384 個', role: 'ページに精度の記載はない（報道〔Tom\'s Hardware〕は FP32 の約 82.6 TFLOPS と伝える）。HPL の FP64 ではない', note: 'FP64 の値は、この序章では確認していません。**その会社の公開値の例で、優劣を示すものではありません。**', ch: [8] }] },
    { id: 'giga', name: 'giga (G)', h: 64, kind: 'ran', dim: '10⁹ 回/秒',
      parts: [{ id: 'cm5', name: 'CM-5/1024', sub: '59.7 GFLOPS（1993）', label: '1993', kind: 'ran', desc: 'TOP500 の最初の一覧（1993 年 6 月）の 1 位です。ロスアラモス国立研究所の CM-5。', material: 'HPL の実測値', dims: '59.7 GFLOPS（1993 年 6 月）', role: 'HPL、FP64。実測値', note: '1993 年の首位の約 3,700 万倍が、2026 年 6 月の首位です（2.198 EFLOPS ÷ 59.7 GFLOPS、計算）。', ch: [11] }] },
    { id: 'mega', name: 'mega (M)', h: 64, kind: 'core', dim: '10⁶ 回/秒',
      parts: [{ id: 'cray1', name: 'Cray-1A', sub: '160 MFLOPS（1976）', label: '1976', kind: 'core', desc: 'Cray Research のスーパーコンピューターで、コンピュータ歴史博物館（CHM）は、1976 年に発売され「5 年間、世界最速の計算機だった」と書いています。', material: '博物館の資料にある性能の値', dims: '160 MFLOPS（CHM の記載）', role: '測り方の条件は資料に書かれていない（ピークの値と見られるが確認していない）', note: '1976 年の「世界最速」の値は、いまの GPU 1 枚の約 20 万分の 1 です（34 TFLOPS ÷ 160 MFLOPS ＝ 約 21 万、計算）。ただし測り方は違う。', ch: [11] }] },
    { id: 'other', name: '別の単位', h: 64, kind: 'pol', dim: '別の単位',
      parts: [
        { id: 'cdc', name: 'CDC 6600', sub: '300 万命令/秒（1964）', label: '1964', w: 1, kind: 'pol', desc: 'CHM は、CDC 6600 を 1964 年に当時の最速の計算機とし、「毎秒 300 万命令（3,000,000 instructions per second）」と書いています。', material: '1 秒あたりの命令の数', dims: '3,000,000 instructions per second（CHM）', role: '命令の数で、浮動小数点演算の数（FLOPS）ではない', note: '「命令」と「浮動小数点演算」は別のものを数えているので、FLOPS の階段には置いていません。', ch: [8] }] }
  ]
});

/* ---- lab：同じ機械でも、測り方で値が違う ---- */
CN.add('lab', 'cI2-measure', {
  title: '同じ機械でも、測り方（精度・条件）で値が違う',
  disclaimer: '学習用の模型です。値はメーカー・研究機関の公表値をそのまま掛け算したもので、実測ではありません。「*」は、公表値が疎行列（sparsity）の条件つきであることを表します。精度の違う値どうしは、単純に比べられません。',
  experiments: [
    { id: 'gpu', label: 'H100 SXM（GPU の枚数）',
      intro: 'NVIDIA が公表する H100 SXM（GPU 1 枚）の値を、枚数ぶん掛けて並べます。**FP64 の 34 TFLOPS と、FP8 Tensor Core の 3,958 TFLOPS（with sparsity）は、同じ GPU の値ですが、約 116 倍違います**。違いは、数える演算の精度と条件です。棒は対数の目盛りです。',
      formula: '棒の値 ＝ 枚数 × 1 枚の公表値（PFLOPS）。公表値：FP64 34、FP64 Tensor Core 67、FP32 67、TF32* 989、FP16* 1,979、FP8* 3,958 TFLOPS（* は with sparsity）',
      presetLabel: '枚数の目安（押すと、枚数のつまみが動きます）', presetHint: '',
      presets: [{ label: '1 枚', set: { n: 1 }, text: 'GPU 1 枚：FP64 は 34 TFLOPS、FP8* は 3,958 TFLOPS。' }, { label: '8 枚（DGX H100 1 台）', set: { n: 8 }, text: '8 枚（DGX H100 の GPU の数）：FP64 は合計 272 TFLOPS、FP8* は合計 約 31.7 PFLOPS（計算）。' }, { label: '1,000 枚', set: { n: 1000 }, text: '1,000 枚：FP64 は合計 34 PFLOPS、FP8* は合計 約 3.96 EFLOPS（計算）。' }],
      consts: [{ id: 'fp64', value: 34, label: 'FP64（NVIDIA の公表値）', unit: 'TFLOPS' }, { id: 'fp64t', value: 67, label: 'FP64 Tensor Core', unit: 'TFLOPS' }, { id: 'fp32', value: 67, label: 'FP32', unit: 'TFLOPS' }, { id: 'tf32', value: 989, label: 'TF32 Tensor Core（with sparsity）', unit: 'TFLOPS' }, { id: 'fp16', value: 1979, label: 'FP16 Tensor Core（with sparsity）', unit: 'TFLOPS' }, { id: 'fp8', value: 3958, label: 'FP8 Tensor Core（with sparsity）', unit: 'TFLOPS' }],
      inputs: [{ id: 'n', label: 'GPU の枚数', unit: '枚', min: 1, max: 1000, step: 1, value: 8 }],
      results: [
        { label: 'FP64 の合計（公表値 × 枚数）', expr: 'n * fp64 / 1000', unit: 'PFLOPS', digits: 3 },
        { label: 'FP8*（with sparsity）の合計', expr: 'n * fp8 / 1000', unit: 'PFLOPS', digits: 3, big: true },
        { label: 'FP8* ÷ FP64（同じ GPU の公表値の比）', expr: 'fp8 / fp64', unit: '倍', digits: 1 }
      ],
      reads: [
        { text: '**同じ GPU の公表値でも、FP8（AI 向けの低精度、疎行列 sparsity の条件つき）は、FP64（科学計算の倍精度）の約 116 倍**です。どちらも「FLOPS」ですが、1 回の演算の精度と条件が違うので、「116 倍速い」とは言えません。' },
        { text: 'TOP500 の順位は FP64 の HPL の実測（Rmax）です。AI 向けの低精度の値は、順位の基準ではありません。**単位が同じでも、測り方が違う値は単純に比べない**のが、この物差しの使い方です。' }
      ],
      fig: { type: 'bar', log: true, logMin: 0.01, max: '100000', bars: [{ label: 'FP64', expr: 'n * fp64 / 1000', unit: 'PFLOPS', digits: 3, color: 'core' }, { label: 'FP64 TC', expr: 'n * fp64t / 1000', unit: 'PFLOPS', digits: 3, color: 'core' }, { label: 'FP32', expr: 'n * fp32 / 1000', unit: 'PFLOPS', digits: 3, color: 'core' }, { label: 'TF32*', expr: 'n * tf32 / 1000', unit: 'PFLOPS', digits: 3, color: 'pol' }, { label: 'FP16*', expr: 'n * fp16 / 1000', unit: 'PFLOPS', digits: 3, color: 'pol' }, { label: 'FP8*', expr: 'n * fp8 / 1000', unit: 'PFLOPS', digits: 3, color: 'pol' }],
        alt: 'H100 SXM を選んだ枚数だけ並べたときの、精度ごとの公表値の合計を示す対数の横棒グラフ。FP64、FP64 Tensor Core、FP32 は同じ程度で、TF32、FP16、FP8（いずれも with sparsity の条件つき）は、FP64 の約 29 倍から 116 倍大きい。', caption: '棒の長さは対数。「*」は with sparsity の条件つきの値（棒の名前に「*」、色は紫）。黄は条件のない公表値。TC は Tensor Core。どれも公表値の掛け算で、実測ではありません。' } },
    { id: 'rack', label: 'GB200 NVL72（ラックの本数）',
      intro: 'NVIDIA の GB200 NVL72（1 ラックに GPU 72 枚）のページは、1 ラックの値を精度ごとに載せています。**ラックを何本か並べて、TOP500 の 2 位（El Capitan）の HPL の実測（Rmax、FP64）と並べます**。精度の違う値が、どれだけ離れて見えるかを確かめてください。',
      formula: '棒の値 ＝ 本数 × 1 ラックの公表値（PFLOPS）。公表値：FP64 2.88、FP32 5.76、FP16/BF16* 360、FP8/FP6* 720、NVFP4* 1,440（sparse）／720（dense）。El Capitan の Rmax は 1,809 PFLOPS',
      presetLabel: '本数の目安（押すと、本数のつまみが動きます）', presetHint: '',
      presets: [{ label: '1 本', set: { n: 1 }, text: '1 ラック：FP64 は 2.88 PFLOPS、NVFP4*（sparse）は 1,440 PFLOPS。El Capitan の Rmax（1,809 PFLOPS）の約 0.8 倍が FP4* に見えます。' }, { label: '10 本', set: { n: 10 }, text: '10 ラック：FP64 は 28.8 PFLOPS（El Capitan の Rmax の約 1.6%）、NVFP4* は 14.4 EFLOPS。' }, { label: '100 本', set: { n: 100 }, text: '100 ラック（GPU 7,200 枚）：FP64 は 288 PFLOPS、NVFP4* は 144 EFLOPS。' }],
      consts: [{ id: 'f64', value: 2.88, label: 'FP64（1 ラック、NVIDIA の公表値 2,880 TFLOPS）', unit: 'PFLOPS' }, { id: 'f32', value: 5.76, label: 'FP32（1 ラック）', unit: 'PFLOPS' }, { id: 'f16', value: 360, label: 'FP16/BF16 Tensor Core（sparse）', unit: 'PFLOPS' }, { id: 'f8', value: 720, label: 'FP8/FP6 Tensor Core（sparse）', unit: 'PFLOPS' }, { id: 'f4', value: 1440, label: 'NVFP4 Tensor Core（sparse。dense は 720）', unit: 'PFLOPS' }, { id: 'elcap', value: 1809, label: 'El Capitan の Rmax（HPL の実測、FP64、TOP500 2026 年 6 月）', unit: 'PFLOPS' }],
      inputs: [{ id: 'n', label: 'ラックの本数（1 ラックに GPU 72 枚）', unit: '本', min: 1, max: 100, step: 1, value: 12 }],
      results: [
        { label: 'FP64 の合計（公表値 × 本数。理論上の最大）', expr: 'n * f64', unit: 'PFLOPS', digits: 1 },
        { label: 'NVFP4*（sparse）の合計', expr: 'n * f4', unit: 'PFLOPS', digits: 0, big: true },
        { label: 'NVFP4* の合計は、El Capitan の Rmax（FP64 の実測）の何倍か（精度が違う）', expr: 'n * f4 / elcap', unit: '倍', digits: 2 },
        { label: 'FP64 の合計は、El Capitan の Rmax の何倍か（理論上の最大と実測の比）', expr: 'n * f64 / elcap', unit: '倍', digits: 3 }
      ],
      reads: [
        { when: 'n * f4 > elcap && n * f64 < elcap', text: '**NVFP4（sparse）の合計は El Capitan の Rmax を超えていますが、FP64 の合計はまだ届きません**。精度と条件が違う値を比べているので、「El Capitan を超えた」とは言えません。' },
        { when: 'n * f4 <= elcap', text: 'NVFP4*（sparse）の合計も、まだ El Capitan の Rmax（FP64 の実測）には届いていません。ただし、精度が違うので、この比較は目安にもなりません。' },
        { text: '**精度が下がるほど、1 秒あたりの演算の数は大きく出ます**。FP4 と FP64 の公表値の差は 500 倍（1,440 ÷ 2.88）です。何の精度の値かを書かない「◯◯ EFLOPS」は、比べられません。' }
      ],
      fig: { type: 'bar', log: true, logMin: 1, max: '1000000', bars: [{ label: 'FP64', expr: 'n * f64', unit: 'PFLOPS', digits: 1, color: 'core' }, { label: 'FP32', expr: 'n * f32', unit: 'PFLOPS', digits: 1, color: 'core' }, { label: 'FP16*', expr: 'n * f16', unit: 'PFLOPS', digits: 0, color: 'pol' }, { label: 'FP8*', expr: 'n * f8', unit: 'PFLOPS', digits: 0, color: 'pol' }, { label: 'FP4*', expr: 'n * f4', unit: 'PFLOPS', digits: 0, color: 'pol' }, { label: 'El Cap 実測', expr: 'elcap', unit: 'PFLOPS', digits: 0, color: 'ran' }],
        alt: 'GB200 NVL72 を選んだ本数だけ並べたときの、精度ごとの公表値の合計と、El Capitan の HPL の実測（1,809 PFLOPS）を示す対数の横棒グラフ。FP64 と FP32 は小さく、FP16、FP8、FP4（いずれも sparse）は桁違いに大きい。', caption: '棒の長さは対数。「El Cap 実測」（青）は HPL（FP64）の実測 Rmax で、他の棒は公表値の掛け算（理論上の最大。黄は FP64・FP32、紫は「*」の sparse の条件つき）。色の意味は単位の階段の凡例と同じです。' } }
  ]
});

/* ---- lab：換算（何台ぶん、何枚ぶん）と、円の面積の補助 ---- */
CN.add('lab', 'cI2-conv', {
  title: '何枚ぶん・何倍ぶん：選んだ性能を、身近な機械に換算する',
  disclaimer: '学習用の模型です。比べているのは、公表値（FP64 など、条件を添えたもの）どうしの単純な割り算です。測り方が違う値（FP32 と FP64 など）への換算は、桁の感覚をつかむ目安にとどまります。スマートフォンの値は、FLOPS の公表値を確認できなかったので入れていません。RTX 4090 の値は、精度の書かれていないシェーダーの性能です。',
  experiments: [
    { id: 'conv', label: '性能 → 枚数・倍数',
      intro: '性能を「桁」で選ぶと、**H100 SXM 何枚ぶん（FP64）**、GB200 NVL72 のラック何本ぶん、富岳の何倍ぶんかを出します。上の円の図は、同じ値の面積の比です。',
      formula: '何枚ぶん ＝ 選んだ性能 ÷ 1 枚の公表値。H100 SXM は FP64 34 TFLOPS、GB200 NVL72 の GPU は FP64 40 TFLOPS（ページの 2,880 TFLOPS ÷ 72）、ラックは 2.88 PFLOPS、富岳の Rmax は 442.01 PFLOPS',
      presetLabel: '目安の性能（押すと、性能のつまみが動きます）', presetHint: '',
      presets: [
        { label: 'DGX H100 1 台（GPU 8 枚）', set: { ex: 14.435 }, text: 'DGX H100 の GPU 8 枚の FP64（34 × 8 ＝ 272 TFLOPS、計算）は、H100 SXM で約 8 枚ぶんです。' },
        { label: 'GB200 NVL72 1 ラック（FP64 2.88 PF）', set: { ex: 15.459 }, text: 'GB200 NVL72 の 1 ラックの FP64（2.88 PFLOPS）は、H100 SXM 約 85 枚ぶんです。' },
        { label: '富岳（Rmax）', set: { ex: 17.645 }, text: '富岳の Rmax（442.01 PFLOPS）は、H100 SXM の FP64 の約 13,000 枚ぶんです（計算）。' },
        { label: 'TOP500 首位（Rmax）', set: { ex: 18.342 }, text: 'TOP500 首位の Rmax（2,198.4 PFLOPS）は、富岳の約 5.0 倍、H100 SXM の FP64 の約 65,000 枚ぶんです（計算）。' }
      ],
      consts: [],
      inputs: [{ id: 'ex', label: '性能の桁（10 の x 乗 FLOPS の x。15 ＝ peta、18 ＝ exa）', unit: '', min: 13, max: 19, step: 0.001, value: 16.5 }],
      calc: [{ id: 'v', expr: 'pow(10, ex)' }],
      results: [
        { label: '選んだ性能', expr: 'pow(10, ex - 12)', unit: 'TFLOPS', digits: 1, show: 'ex < 15' },
        { label: '選んだ性能', expr: 'pow(10, ex - 15)', unit: 'PFLOPS', digits: 1, show: 'ex >= 15 && ex < 18' },
        { label: '選んだ性能', expr: 'pow(10, ex - 18)', unit: 'EFLOPS', digits: 2, show: 'ex >= 18' },
        { label: 'H100 SXM（FP64 34 TFLOPS）の何枚ぶんか', expr: 'v / 34000000000000', unit: '枚', digits: 0, big: true },
        { label: 'GB200 NVL72 の GPU（FP64 40 TFLOPS）の何枚ぶんか', expr: 'v / 40000000000000', unit: '枚', digits: 0 },
        { label: 'GB200 NVL72 のラック（FP64 2.88 PFLOPS）の何本ぶんか', expr: 'v / 2880000000000000', unit: '本', digits: 1 },
        { label: '富岳（Rmax 442.01 PFLOPS）の何倍か', expr: 'v / 442010000000000000', unit: '倍', digits: 2 },
        { label: 'TOP500 首位（Rmax 2,198.4 PFLOPS）の何倍か', expr: 'v / 2198400000000000000', unit: '倍', digits: 3 },
        { label: '（参考）RTX 4090（シェーダー 83 TFLOPS、精度の記載なし）の何枚ぶんか', expr: 'v / 83000000000000', unit: '枚', digits: 0 }
      ],
      reads: [
        { when: 'v < 442010000000000000 * 0.99', text: '選んだ性能は、**富岳の Rmax（442.01 PFLOPS）より小さい**値です。' },
        { when: 'abs(v / 442010000000000000 - 1) <= 0.01', text: '選んだ性能は、**富岳の Rmax（442.01 PFLOPS）とほぼ同じ**（差が 1% 以内）です。' },
        { when: 'v > 442010000000000000 * 1.01 && v < 2198400000000000000 * 0.99', text: '選んだ性能は、**富岳の Rmax より大きく、TOP500 首位の Rmax（2,198.4 PFLOPS）より小さい**値です。' },
        { when: 'abs(v / 2198400000000000000 - 1) <= 0.01', text: '選んだ性能は、**TOP500 首位の Rmax（2,198.4 PFLOPS）とほぼ同じ**（差が 1% 以内）です。' },
        { when: 'v > 2198400000000000000 * 1.01', text: '選んだ性能は、**TOP500 首位の Rmax（2,198.4 PFLOPS）より大きい**値です。' },
        { text: '「何枚ぶん」は、**GPU の FP64 の公表値を、枚数ぶん足せば届く枚数**です。実際の機械は、枚数を増やすほど通信や待ちで効率が下がり、HPL の実測は理論上の最大より小さくなります。次の「束ねる」で、その効率も動かします。' }
      ],
      fig: { type: 'bar', log: true, logMin: 0.01, max: '10000', bars: [{ label: '選んだ性能', expr: 'v / 1000000000000000', unit: 'PFLOPS', digits: 3, color: 'ims' }, { label: 'H100 1 枚', expr: '0.034', unit: 'PFLOPS', digits: 3, color: 'core' }, { label: 'DGX 8 GPU', expr: '0.272', unit: 'PFLOPS', digits: 3, color: 'core' }, { label: 'NVL72 1 本', expr: '2.88', unit: 'PFLOPS', digits: 2, color: 'core' }, { label: '富岳 Rmax', expr: '442.01', unit: 'PFLOPS', digits: 1, color: 'ran' }, { label: 'LineShine', expr: '2198.4', unit: 'PFLOPS', digits: 1, color: 'ran' }],
        alt: '選んだ性能と、H100 SXM 1 枚（FP64 34 TFLOPS）、DGX H100 の GPU 8 枚（272 TFLOPS）、GB200 NVL72 の 1 ラック（FP64 2.88 PFLOPS）、富岳の Rmax（442.01 PFLOPS）、LineShine の Rmax（2,198.4 PFLOPS）を示す対数の横棒グラフ。', caption: '棒の長さは対数。「公表値（仕様値）」（黄）と「HPL の実測」（青）を色で分けています（色の意味は単位の階段の凡例と同じ。棒の名前と値の文字でも区別できます）。H100 から NVL72 までは FP64 の仕様値・計算、富岳と LineShine は HPL の実測 Rmax、「選んだ性能」（桃色）はつまみの値です。' } }
  ]
});

/* ---- lab：束ねる（GPU の枚数 → 合計の能力・電力・ラック） ---- */
CN.add('lab', 'cI2-bundle', {
  title: 'GPU を束ねる：枚数 → 合計の計算能力・電力・ラックの本数',
  disclaimer: '学習用の模型です（規模の感覚をつかむための仮定）。1 枚あたりの値は公表値（条件つき）、枚数・効率・PUE・1 ラックの枚数は仮定です。実在の計算基盤の性能と電力は、構成・ネットワーク・冷却・稼働率で大きく変わります。「計画」の値は発表時点の計画で、稼働している値ではありません。',
  experiments: [
    { id: 'bundle', label: '枚数 → 能力・電力',
      intro: 'GPU の枚数を、1 枚から約 200 万枚まで動かします（つまみは対数）。**合計の理論ピーク（FP64）＝ 枚数 × 1 枚の公表値**、**施設の電力 ＝ 枚数 × 1 枚あたりの電力 × PUE**（序章1 と同じ式）です。HPL の実測は、理論ピークに効率をかけた見込みで表します（TOP500 の上位の Rmax ÷ Rpeak は、約 5 割から 8 割）。',
      formula: '枚数 ＝ 10 の x 乗（3 桁に丸める）。理論ピーク ＝ 枚数 × 1 枚の FP64。HPL 型の見込み ＝ 理論ピーク × 効率。施設の電力 ＝ 枚数 × 1 枚あたりの電力 × PUE。ラックの本数 ＝ 枚数 ÷ 1 ラックの枚数（切り上げ）。富岳 ＝ Rmax 442.01 PFLOPS、首位 ＝ Rmax 2,198.4 PFLOPS、1 軸 ＝ 165 MW',
      presetLabel: '目安の組み合わせ（押すと、1 枚の値・電力・ラックの枚数が動きます）', presetHint: '',
      presets: [
        { label: '序章1 の「GPU サーバー 1 万台」（H100 8 万枚）', set: { ex: 4.903, tf: 34, kw: 1.275, per: 32, aip: 1979, eff: 70, pue: 1.36 }, text: '序章1 の「DGX H100 を 1 万台」（H100 を 8 万枚）：施設の電力は約 139 MW で、序章1 の ① と同じ値です。FP64 の理論ピークは 2.72 EFLOPS、HPL 型の見込み（効率 70%）は約 1.9 EFLOPS です。' },
        { label: 'Blackwell 世代 1 万枚（NVL72 約 139 ラック）', set: { ex: 4, tf: 40, kw: 1.667, per: 72, aip: 5000, eff: 70, pue: 1.36 }, text: 'GB200 NVL72 の GPU 1 万枚：理論ピーク（FP64）は 0.4 EFLOPS、施設の電力は約 23 MW、ラックは約 139 本です。' },
        { label: 'Blackwell 世代 10 万枚（Solstice の枚数）', set: { ex: 5, tf: 40, kw: 1.667, per: 72, aip: 5000, eff: 70, pue: 1.36 }, text: '10 万枚（DOE の Solstice の計画の枚数）：理論ピーク（FP64）4 EFLOPS、HPL 型の見込み 2.8 EFLOPS、施設の電力は約 227 MW です。これは 1 枚あたりの値を仮定で掛けた計算で、Solstice の公表された性能・電力ではありません。' }
      ],
      consts: [{ id: 'fugaku', value: 442.01, label: '富岳の Rmax（TOP500 2026 年 6 月）', unit: 'PFLOPS', digits: 2 }, { id: 'top1', value: 2198.4, label: 'TOP500 首位 LineShine の Rmax（2026 年 6 月、11 月も首位）', unit: 'PFLOPS', digits: 1 }, { id: 'axisMW', value: 165, label: '富津・1 号系列の第 7 軸（JERA、16.5 万 kW。発電講義 序章3 と同じ）', unit: 'MW', digits: 0 }],
      inputs: [
        { id: 'ex', label: 'GPU の枚数（10 の x 乗。つまみの値が x）', unit: '', min: 0, max: 6.3, step: 0.001, value: 4.5, say: [{ when: 'ex < 1', text: '1〜9 枚：GPU 1 台から数台の規模です。' }, { when: 'ex >= 1 && ex < 3', text: '10〜999 枚：ラック 1〜数本から、1 室ほどの規模です。' }, { when: 'ex >= 3 && ex < 4.8', text: '1,000〜6 万枚ほど：大学・研究機関の大型機から、TOP500 の上位の枚数の桁です。' }, { when: 'ex >= 4.8 && ex < 5.8', text: '約 6 万〜60 万枚：公表された大型の計画（10 万枚など）の桁です。' }, { when: 'ex >= 5.8', text: '約 60 万枚以上：公表値を確かめられた機械はなく、計算上の数字です。' }] },
        { id: 'tf', label: '1 枚の FP64 の理論ピーク（公表値）', unit: 'TFLOPS', min: 10, max: 100, step: 1, value: 40, presets: [{ label: 'H100 SXM の FP64 34', value: 34 }, { label: 'Blackwell（NVL72 のページ ÷ 72）40', value: 40 }, { label: 'H100 の FP64 Tensor Core 67', value: 67 }] },
        { id: 'kw', label: '1 枚あたりの電力（システム全体 ÷ 枚数）', unit: 'kW', min: 0.5, max: 3, step: 0.001, value: 1.667, presets: [{ label: 'DGX H100：10.2 kW ÷ 8 枚 ＝ 1.275', value: 1.275 }, { label: 'NVL72：約 120 kW ÷ 72 枚 ＝ 1.667', value: 1.667 }], hint: 'GPU のほか、CPU・メモリ・ネットワーク・ファンなど、システム全体の最大入力を枚数で割った値です（最大の値で、いつもの電力ではありません）。' },
        { id: 'per', label: '1 ラックの GPU の枚数', unit: '枚', min: 8, max: 144, step: 1, value: 72, presets: [{ label: 'DGX H100 を 4 台（32 枚）', value: 32 }, { label: 'NVL72（72 枚）', value: 72 }] },
        { id: 'aip', label: '（参考）1 枚の FP8 の目安（dense。sparse の公表値の半分）', unit: 'TFLOPS', min: 500, max: 10000, step: 1, value: 5000, presets: [{ label: 'H100：3,958 の半分 ≒ 1,979', value: 1979 }, { label: 'Blackwell：10,000（sparse）の半分 ＝ 5,000', value: 5000 }], hint: '「dense は sparse の半分」は、GB200 NVL72 のページの説明です。H100 のページは dense の値を載せていないので、同じ読み方を当てはめた目安です。' },
        { id: 'eff', label: 'HPL 型の効率（実測 ÷ 理論上の最大）', unit: '%', min: 40, max: 90, step: 1, value: 70, presets: [{ label: '51%（Aurora）', value: 51 }, { label: '64%（El Capitan）', value: 64 }, { label: '80%（LineShine）', value: 80 }, { label: '82%（富岳）', value: 82 }], hint: 'TOP500 2026 年 6 月の Rmax ÷ Rpeak（計算）：Aurora 51%、El Capitan 64%、Frontier 66%、LineShine 80%、JUPITER 82%、富岳 82%。' },
        { id: 'pue', label: 'PUE（施設全体の電力 ÷ IT 機器の電力）', unit: '', min: 1, max: 2, step: 0.01, value: 1.36, presets: [{ label: '1.09（Google の全体）', value: 1.09 }, { label: '1.36（Uptime、容量で重みづけ）', value: 1.36 }, { label: '1.52（Uptime、業界の年平均）', value: 1.52 }], hint: '序章1 と同じ値です。上限 2.0 は表示の範囲で、公表資料で確かめた上限ではありません。' }
      ],
      calc: [{ id: 'N', expr: 'round(pow(10, ex) / pow(10, max(0, floor(ex) - 2)), 0) * pow(10, max(0, floor(ex) - 2))' }, { id: 'racks', expr: 'ceil(N / per)' }, { id: 'peak', expr: 'N * tf * 1000000000000' }, { id: 'hpl', expr: 'peak * eff / 100' }, { id: 'it', expr: 'N * kw * 1000' }, { id: 'fac', expr: 'it * pue' }, { id: 'axes', expr: 'fac / 1000000 / axisMW' }, { id: 'ai', expr: 'N * aip * 1000000000000' }, { id: 'hf', expr: 'hpl / (fugaku * 1000000000000000)' }, { id: 'ht', expr: 'hpl / (top1 * 1000000000000000)' }],
      results: [
        { label: 'GPU の枚数', expr: 'N', unit: '枚', digits: 0 },
        { label: 'ラックの本数', expr: 'racks', unit: '本', digits: 0 },
        { label: '合計の理論ピーク（FP64）', expr: 'peak / 1000000000000', unit: 'TFLOPS', digits: 1, show: 'peak < 1000000000000000' },
        { label: '合計の理論ピーク（FP64）', expr: 'peak / 1000000000000000', unit: 'PFLOPS', digits: 1, show: 'peak >= 1000000000000000 && peak < 1000000000000000000' },
        { label: '合計の理論ピーク（FP64）', expr: 'peak / 1000000000000000000', unit: 'EFLOPS', digits: 2, show: 'peak >= 1000000000000000000' },
        { label: 'HPL 型の見込み（理論ピーク × 効率。実測ではない）', expr: 'hpl / 1000000000000', unit: 'TFLOPS', digits: 1, show: 'hpl < 1000000000000000' },
        { label: 'HPL 型の見込み（理論ピーク × 効率。実測ではない）', expr: 'hpl / 1000000000000000', unit: 'PFLOPS', digits: 1, show: 'hpl >= 1000000000000000 && hpl < 1000000000000000000' },
        { label: 'HPL 型の見込み（理論ピーク × 効率。実測ではない）', expr: 'hpl / 1000000000000000000', unit: 'EFLOPS', digits: 2, show: 'hpl >= 1000000000000000000', big: true },
        { label: '富岳（Rmax 442.01 PFLOPS）の何倍ぶんか（HPL 型の見込み）', expr: 'hf', unit: '倍', digits: 2 },
        { label: 'TOP500 首位（Rmax 2,198.4 PFLOPS）の何倍ぶんか（HPL 型の見込み）', expr: 'ht', unit: '倍', digits: 3 },
        { label: 'IT 機器の電力', expr: 'it', auto: 'W', digits: 3 },
        { label: '施設全体の電力（PUE をかけた値）', expr: 'fac', auto: 'W', digits: 3, big: true },
        { label: '発電所の 1 軸（165 MW）の何本ぶんか', expr: 'axes', unit: '本', digits: 2 },
        { label: '（参考）同じ枚数の FP8 の合計（dense の目安。FP64 とは別の測り方）', expr: 'ai / 1000000000000000000', unit: 'EFLOPS', digits: 1 }
      ],
      reads: [
        { when: 'ht >= 1', text: '**HPL 型の見込みが、TOP500 首位の Rmax（2,198.4 PFLOPS）以上**になる枚数です。ただし、実際に一覧に載るには、その規模で HPL を実測する必要があります。' },
        { when: 'ht < 1 && hf >= 1', text: 'HPL 型の見込みが、**富岳の Rmax（442.01 PFLOPS）以上で、首位の Rmax 未満**です。' },
        { when: 'hf < 1', text: 'HPL 型の見込みは、**富岳の Rmax（442.01 PFLOPS）に届きません**。' },
        { when: 'fac / 1000000 >= axisMW', text: '施設の電力が、発電所の 1 軸（165 MW）の出力以上です（序章1 の ① と同じ見方）。**同じ時刻に 1 本の軸が支えられるという意味ではありません**。' },
        { when: 'fac / 1000000 < axisMW', text: '施設の電力は、発電所の 1 軸（165 MW）の出力より小さい規模です。' },
        { text: '1 枚の値は公表値（条件つき）、枚数・効率・PUE・1 ラックの枚数は仮定です。**FP8 の合計は FP64 とは別の測り方**で、同じ枚数でも桁違いに大きく出ます。「計画」の枚数（10 万枚など）に、ここの 1 枚あたりの値を掛けた値は、その計画の公表値ではありません。' }
      ],
      figs: [
        { type: 'curve', title: '枚数と合計の能力（縦軸は 10 の x 乗 FLOPS の x。12 ＝ tera、15 ＝ peta、18 ＝ exa）', x: { id: 'g', min: 1, max: 2000000, n: 160, scale: 'log', label: 'GPU の枚数', unit: '枚', ticks: [{ v: 1, label: '1' }, { v: 100, label: '100' }, { v: 10000, label: '1 万' }, { v: 1000000, label: '100 万' }] },
          unit: '桁', yLabel: '合計の FP64 の桁', digits: 2, ymin: 12, ymax: 21,
          series: [{ label: '理論ピーク（FP64）', expr: 'log10(g * tf * 1000000000000)', color: 'ran', dash: false }, { label: 'HPL 型の見込み（効率をかけた値）', expr: 'log10(g * tf * 1000000000000 * eff / 100)', color: 'core', dash: 'dash' }, { label: '富岳の Rmax（実測）', expr: '17.6454', color: 'pol', dash: 'dot', faint: true }, { label: 'TOP500 首位の Rmax（実測）', expr: '18.3421', color: 'ims', dash: 'dot', faint: true }],
          marks: [{ x: '6128', label: 'ABCI 3.0' }, { x: '100000', label: 'Solstice 計画' }],
          alt: '横軸を GPU の枚数（対数、1 枚から 200 万枚）、縦軸を合計の FP64 の桁にした線グラフ。理論ピークと、効率をかけた HPL 型の見込みは右上がりの線。富岳の Rmax（約 17.65）と、TOP500 首位の Rmax（約 18.34）は水平の点線。縦の目印は、ABCI 3.0 の GPU 枚数（6,128 枚、稼働）と、DOE の Solstice の計画の枚数（10 万枚）の位置。', caption: '縦の目印は、公表された「枚数の位置」だけです（その機械の性能の線ではありません。ABCI 3.0 は H200 6,128 枚で稼働、Solstice は 10 万枚の計画で、稼働の発表は確認していません）。El Capitan は AMD MI300A が 1 ノードに 4 個、全体で約 4.5 万個（LLNL の資料。ページにより 44,544 個・46,080 個）で、枚数の桁は約 4.65 です。' },
        { type: 'bar', title: '施設の電力と、公表された例（対数）', log: true, logMin: 1000000, max: '100000000000', bars: [{ label: 'この装置の施設', expr: 'fac', auto: 'W', digits: 3, color: 'ran' }, { label: 'ABCI 3.0 設備', expr: '6000000', auto: 'W', digits: 3, color: 'core' }, { label: 'El Capitan', expr: '29685000', auto: 'W', digits: 3, color: 'core' }, { label: 'Colossus 推定', expr: '300000000', auto: 'W', digits: 3, color: 'pol' }, { label: '富津・1 軸', expr: 'axisMW * 1000000', auto: 'W', digits: 3, color: 'ims' }],
          alt: '施設の電力を対数の横棒で比べるグラフ。この装置で選んだ施設、ABCI 3.0 の電気設備の容量 6 MW、El Capitan の TOP500 の電力 29.7 MW、Epoch AI が推定した xAI の Colossus 約 300 MW、富津の 1 軸 165 MW。', caption: '棒の長さは対数。ABCI 3.0 は電気設備の容量、El Capitan は HPL 実行時の電力（TOP500）、Colossus は Epoch AI の推定（2025 年 3 月時点）で、定義が違います。' }
      ] }
  ]
});

/* ---- lab：過去の伸び（TOP500 首位の Rmax） ---- */
CN.add('lab', 'cI2-history', {
  title: 'TOP500 首位の性能の伸び：期間を選ぶと、倍加の年数が変わる',
  disclaimer: '学習用の模型です。点は TOP500 の公式の一覧（HPL の実測 Rmax）の首位の値で、確かめられた 11 点だけを使っています（首位になった機械のすべてではありません。たとえば 2016 年 6 月に首位になった Sunway TaihuLight は入れていないので、2013〜2018 年の間の線は実際の首位の推移と違います）。点と点の間は、桁を直線でつないだ近似です（選んだ年が点の年と違うと、倍加の年数は目安）。',
  experiments: [
    { id: 'hist', label: '期間と倍加の年数',
      intro: '縦軸は性能の桁（10 の x 乗 FLOPS の x。9 ＝ giga、12 ＝ tera、15 ＝ peta、18 ＝ exa）で、横軸は年です。**「約 N 年で 1,000 倍」という伸びの速さは、時期で違います**。期間の始まりと終わりを動かして、倍加（2 倍）にかかる年数を計算します。',
      formula: '倍加にかかる年数 ＝ 期間の年数 × log10（2）÷（終わりの桁 − 始まりの桁）。1,000 倍になる年数 ＝ 倍加の年数 × log2（1,000）≒ 倍加の年数 × 9.97',
      presetLabel: '期間の目安（押すと、始まりと終わりが動きます）', presetHint: '',
      presets: [
        { label: '1993〜2026（全体）', set: { t0: 3.45, t1: 36.45 }, text: '1993 年 6 月（59.7 GFLOPS）から 2026 年 6 月（2.198 EFLOPS）まで：約 3,700 万倍で、倍加は約 1.3 年（約 16 か月）。1,000 倍は約 13 年です（計算）。' },
        { label: '2008〜2013', set: { t0: 18.45, t1: 23.45 }, text: '2008 年 6 月（Roadrunner 1.026 PFLOPS）から 2013 年 6 月（Tianhe-2 33.86 PFLOPS）まで：約 33 倍で、倍加は約 1.0 年。この時期は特に速い伸びです（計算）。' },
        { label: '2013〜2026', set: { t0: 23.45, t1: 36.45 }, text: '2013 年 6 月から 2026 年 6 月まで：約 65 倍で、倍加は約 2.2 年。1,000 倍は約 21.5 年（計算）。' },
        { label: '2018〜2026', set: { t0: 28.45, t1: 36.45 }, text: '2018 年 6 月（Summit 122.3 PFLOPS）から 2026 年 6 月まで：約 18 倍で、倍加は約 1.9 年（計算）。' },
        { label: '2022〜2026', set: { t0: 32.4, t1: 36.45 }, text: '2022 年 6 月（Frontier 1.102 EFLOPS）から 2026 年 6 月（LineShine 2.198 EFLOPS）まで：約 2 倍で、倍加は約 4.1 年。直近の 4 年は、首位の伸びが遅い期間です（計算）。' }
      ],
      consts: [],
      inputs: [
        { id: 't0', label: '期間の始まり（1990 年から何年後か。23.45 ＝ 2013 年 6 月ごろ。西暦は下の結果に出ます）', unit: '年後', min: 3.45, max: 34.85, step: 0.05, value: 23.45 },
        { id: 't1', label: '期間の終わり（1990 年から何年後か。36.45 ＝ 2026 年 6 月。西暦は下の結果に出ます）', unit: '年後', min: 7.45, max: 36.45, step: 0.05, value: 36.45 }
      ],
      calc: [{ id: 'Y0', expr: 't0 + 1990' }, { id: 'Y1', expr: 't1 + 1990' }, { id: 'L0', expr: 'if(Y0 <= 1997.45, 10.77597 + (Y0 - 1993.45) * 0.313149, if(Y0 <= 2002.45, 12.02857 + (Y0 - 1997.45) * 0.305208, if(Y0 <= 2008.45, 13.55461 + (Y0 - 2002.45) * 0.242756, if(Y0 <= 2011.45, 15.01115 + (Y0 - 2008.45) * 0.300181, if(Y0 <= 2013.45, 15.91169 + (Y0 - 2011.45) * 0.308998, if(Y0 <= 2018.45, 16.52969 + (Y0 - 2013.45) * 0.111548, if(Y0 <= 2020.45, 17.08743 + (Y0 - 2018.45) * 0.265588, if(Y0 <= 2022.4, 17.61860 + (Y0 - 2020.45) * 0.217220, if(Y0 <= 2024.85, 18.04218 + (Y0 - 2022.4) * 0.081170, if(Y0 <= 2026.45, 18.24105 + (Y0 - 2024.85) * 0.063162, 18.34211))))))))))' }, { id: 'L1', expr: 'if(Y1 <= 1997.45, 10.77597 + (Y1 - 1993.45) * 0.313149, if(Y1 <= 2002.45, 12.02857 + (Y1 - 1997.45) * 0.305208, if(Y1 <= 2008.45, 13.55461 + (Y1 - 2002.45) * 0.242756, if(Y1 <= 2011.45, 15.01115 + (Y1 - 2008.45) * 0.300181, if(Y1 <= 2013.45, 15.91169 + (Y1 - 2011.45) * 0.308998, if(Y1 <= 2018.45, 16.52969 + (Y1 - 2013.45) * 0.111548, if(Y1 <= 2020.45, 17.08743 + (Y1 - 2018.45) * 0.265588, if(Y1 <= 2022.4, 17.61860 + (Y1 - 2020.45) * 0.217220, if(Y1 <= 2024.85, 18.04218 + (Y1 - 2022.4) * 0.081170, if(Y1 <= 2026.45, 18.24105 + (Y1 - 2024.85) * 0.063162, 18.34211))))))))))' }, { id: 'span', expr: 't1 - t0' }, { id: 'dbl', expr: 'if(span >= 1, span * 0.30103 / (L1 - L0), 0)' }],
      results: [
        { label: '期間の始まり（西暦。年の小数は切り捨て）', expr: 'floor(Y0) - 1990', words: ['1990 年', '1991 年', '1992 年', '1993 年', '1994 年', '1995 年', '1996 年', '1997 年', '1998 年', '1999 年', '2000 年', '2001 年', '2002 年', '2003 年', '2004 年', '2005 年', '2006 年', '2007 年', '2008 年', '2009 年', '2010 年', '2011 年', '2012 年', '2013 年', '2014 年', '2015 年', '2016 年', '2017 年', '2018 年', '2019 年', '2020 年', '2021 年', '2022 年', '2023 年', '2024 年', '2025 年', '2026 年', '2027 年'] },
        { label: '期間の終わり（西暦。年の小数は切り捨て）', expr: 'floor(Y1) - 1990', words: ['1990 年', '1991 年', '1992 年', '1993 年', '1994 年', '1995 年', '1996 年', '1997 年', '1998 年', '1999 年', '2000 年', '2001 年', '2002 年', '2003 年', '2004 年', '2005 年', '2006 年', '2007 年', '2008 年', '2009 年', '2010 年', '2011 年', '2012 年', '2013 年', '2014 年', '2015 年', '2016 年', '2017 年', '2018 年', '2019 年', '2020 年', '2021 年', '2022 年', '2023 年', '2024 年', '2025 年', '2026 年', '2027 年'] },
        { label: '期間の年数', expr: 'span', unit: '年', digits: 1, show: 'span >= 1' },
        { label: '期間の伸び（終わり ÷ 始まり）', expr: 'pow(10, L1 - L0)', unit: '倍', digits: 1, show: 'span >= 1' },
        { label: '倍加（2 倍）にかかる年数', expr: 'dbl', unit: '年', digits: 2, show: 'span >= 1', big: true },
        { label: '約何年で 1,000 倍になる速さか', expr: 'dbl * 9.9658', unit: '年', digits: 1, show: 'span >= 1', big: true }
      ],
      reads: [
        { when: 'span < 1', text: '期間が 1 年未満です。**終わりを始まりより 1 年以上後**にしてください（短い期間では、点と点の間の直線の近似が大きく効きます）。' },
        { when: 'span >= 1 && dbl < 1.2', text: '倍加が約 1 年前後の、**速い伸び**の期間です（2008〜2013 年ごろや、1993〜2002 年ごろが当たります）。' },
        { when: 'span >= 1 && dbl >= 1.2 && dbl < 3', text: '倍加が約 1〜3 年の、中くらいの伸びです。1993 年からの全体の平均（約 1.3 年）や、2013 年からの平均（約 2.2 年）が、この範囲です。' },
        { when: 'span >= 1 && dbl >= 3', text: '倍加が 3 年以上の、**遅い伸び**の期間です。直近の約 4 年（2022 年 6 月の Frontier から、2026 年 6 月の LineShine まで）や、その一部の期間が当たります。' },
        { text: '**伸びの速さは、時期で違います**。過去の平均をそのまま未来へ延ばすと、期間の選び方で結果が大きく変わります（次の「もし、この伸びが続いたら」）。TOP500 の編集者は 2017 年に、一覧全体の合計の伸びが、2013 年ごろから過去の伸びを下回っていると指摘しました。' }
      ],
      fig: { type: 'curve', x: { id: 'yr', min: 1993, max: 2027, step: 0.25, label: '年（一覧の発表の時期）', unit: '年', ticks: [{ v: 1995, label: '1995' }, { v: 2000, label: '2000' }, { v: 2005, label: '2005' }, { v: 2010, label: '2010' }, { v: 2015, label: '2015' }, { v: 2020, label: '2020' }, { v: 2025, label: '2025' }] },
        unit: '桁', yLabel: '首位の Rmax の桁（10 の x 乗 FLOPS の x）', digits: 2, ymin: 10, ymax: 19,
        series: [
          { label: 'TOP500 首位の Rmax（HPL 実測）', color: 'ran', dash: false, data: [
            { x: 1993.45, y: 10.7760, l: '1993-06 CM-5（LANL）59.7 GFLOPS' },
            { x: 1997.45, y: 12.0286, l: '1997-06 ASCI Red 1.068 TFLOPS' },
            { x: 2002.45, y: 13.5546, l: '2002-06 Earth Simulator 35.86 TFLOPS' },
            { x: 2008.45, y: 15.0111, l: '2008-06 Roadrunner 1.026 PFLOPS' },
            { x: 2011.45, y: 15.9117, l: '2011-06 K computer 8.16 PFLOPS' },
            { x: 2013.45, y: 16.5297, l: '2013-06 Tianhe-2 33.86 PFLOPS' },
            { x: 2018.45, y: 17.0874, l: '2018-06 Summit 122.3 PFLOPS' },
            { x: 2020.45, y: 17.6186, l: '2020-06 Fugaku 415.53 PFLOPS' },
            { x: 2022.4, y: 18.0422, l: '2022-06 Frontier 1.102 EFLOPS' },
            { x: 2024.85, y: 18.2410, l: '2024-11 El Capitan 1.742 EFLOPS' },
            { x: 2026.45, y: 18.3421, l: '2026-06 LineShine 2.198 EFLOPS' }
          ] },
          { label: '選んだ期間の平均の伸びを延ばした直線', expr: 'L0 + (yr - Y0) * (L1 - L0) / (Y1 - Y0)', color: 'pol', dash: 'dash', when: 'span >= 1' }
        ],
        spans: [{ from: 'Y0', to: 'Y1', label: '選んだ期間', when: 'span >= 1' }],
        alt: '横軸を年（1993 年から 2027 年）、縦軸を TOP500 首位の Rmax の桁にした線グラフ。11 個の点が右上がりにつながる。1993 年の約 10.8（59.7 GFLOPS）から 2026 年の約 18.3（2.198 EFLOPS）まで。2008 年から 2013 年は傾きが急で、2022 年以降はゆるやか。破線は選んだ期間の平均の傾き。', caption: '点は確かめられた 11 点（一覧の点は 6 月か 11 月。年の小数は発表の時期の目安で、6 月は .45、2022 年の一覧は 5 月末の発表なので .4、11 月は .85）。破線は、選んだ期間の始まりと終わりを結んだ直線です。傾きが急なほど、倍加の年数が短い。' } }
  ]
});

/* ---- lab：もし、この伸びが続いたら（外挿。予測ではない） ---- */
CN.add('lab', 'cI2-future', {
  title: 'もし、この伸びが続いたら：5 年後・10 年後・20 年後の規模（外挿であって、予測ではありません）',
  disclaimer: '学習用の模型です。外挿の性質を確かめる教材で、予測ではありません。過去の伸びが続く保証はなく、電力・半導体の供給・冷却・費用の制約で、伸びが止まることも十分あります。起点は確かめた現在の値（TOP500 の HPL の実測）で、効率の改善率は Green500 の公表値から計算した値です。',
  experiments: [
    { id: 'future', label: '伸びと効率 → 規模・電力',
      intro: '起点（いまの値）と、**倍加にかかる年数**（性能が 2 倍になる年数）を動かすと、T 年後の性能、**富岳の何倍か**、**必要な電力の目安**、**発電所の 1 軸の何本ぶんか**が出ます。電力は、効率（FLOPS ÷ W）が年 g% で良くなる仮定で、性能 ÷ 効率として計算します。**結果は外挿の値で、予測ではありません。**',
      formula: 'T 年後の性能 ＝ 起点 × 2^(T ÷ 倍加の年数)。T 年後の効率 ＝ 起点の効率 ×（1 ＋ g ÷ 100）^T。必要な電力 ＝ 性能 ÷ 効率。1 軸 ＝ 165 MW、日本の最大需要 ＝ 158,815 千 kW（2025 年度夏季の実績）',
      presetLabel: '伸びの目安（押すと、倍加の年数と効率の改善が動きます）', presetHint: '',
      presets: [
        { label: '1993〜2026 の平均（倍加 1.3 年）', set: { d: 1.3, g: 20 }, text: '倍加 1.3 年（1993〜2026 年の首位の平均、計算）と、効率の改善 年 20%（Green500 の 1 位、2020 年 11 月から 2026 年 6 月まで）：10 年後は起点の約 200 倍です。33 年の平均を、そのまま延ばした外挿です（直近の伸びよりずっと速い設定）。' },
        { label: '2013〜2026 の平均（倍加 2.2 年）', set: { d: 2.2, g: 20 }, text: '倍加 2.2 年（2013〜2026 年の首位の平均、計算）と、効率の改善 年 20%：10 年後は起点の約 23 倍。' },
        { label: '直近の 4 年（倍加 4.1 年）', set: { d: 4.1, g: 4 }, text: '倍加 4.1 年（2022〜2026 年の首位、計算）と、効率の改善 年 4%（Green500 の 1 位、2022 年 6 月から 2026 年 6 月まで）：10 年後は起点の約 5.4 倍。' },
        { label: 'AI 向けの伸び（倍加 0.75 年）', set: { d: 0.75, g: 20 }, text: '倍加 0.75 年（9 か月）は、Epoch AI が、AI 向けの計算基盤の 16 ビット精度の性能について出した値です。起点の FP64 の HPL の値に当てはめるのは、測り方を混ぜた例で、AI 向けの伸びを FP64 に当てはめた極端な外挿です。' }
      ],
      consts: [{ id: 'fugaku', value: 442.01, label: '富岳の Rmax（TOP500 2026 年 6 月）', unit: 'PFLOPS', digits: 2 }, { id: 'top1', value: 2198.4, label: 'TOP500 首位 LineShine の Rmax（2026 年 6 月、11 月も首位）', unit: 'PFLOPS', digits: 1 }, { id: 'axisMW', value: 165, label: '富津・1 号系列の第 7 軸（JERA、16.5 万 kW）', unit: 'MW', digits: 0 }, { id: 'demandGW', value: 158.815, label: '日本の最大需要電力（2025 年度夏季の実績、158,815 千 kW）', unit: 'GW', digits: 3 }],
      inputs: [
        { id: 's0', label: '起点の性能（いまの値、HPL の実測）', unit: 'EFLOPS', min: 0.1, max: 4, step: 0.001, value: 2.198, presets: [{ label: 'LineShine 2.198（首位）', value: 2.198 }, { label: 'El Capitan 1.809', value: 1.809 }, { label: '富岳 0.442', value: 0.442 }] },
        { id: 'e0', label: '起点の効率（Rmax ÷ 電力）', unit: 'GFLOPS/W', min: 10, max: 80, step: 0.1, value: 52.1, presets: [{ label: 'LineShine 52.1', value: 52.1 }, { label: 'El Capitan 60.9', value: 60.9 }, { label: '富岳 14.8', value: 14.8 }], hint: 'TOP500 2026 年 6 月の Rmax ÷ 電力（計算）：LineShine 52.07、El Capitan 60.94、富岳 14.78 GFLOPS/W。' },
        { id: 'd', label: '倍加（性能が 2 倍）にかかる年数', unit: '年', min: 0.5, max: 6, step: 0.05, value: 2.2, presets: [{ label: '1.0（2008〜2013）', value: 1 }, { label: '1.3（1993〜2026）', value: 1.3 }, { label: '2.2（2013〜2026）', value: 2.2 }, { label: '4.1（2022〜2026）', value: 4.1 }] },
        { id: 'g', label: '効率（FLOPS ÷ W）の年あたりの改善', unit: '%/年', min: 0, max: 40, step: 0.25, value: 20, presets: [{ label: '0.75（Green500 1 位、直近 1 年）', value: 0.75 }, { label: '4（2022〜2026）', value: 4 }, { label: '20（2020〜2026）', value: 20 }], hint: 'Green500 の 1 位の効率（TOP500 の各回のページ）：2020 年 11 月 26.195、2022 年 6 月 62.684、2025 年 6 月 72.733、2026 年 6 月 73.28 GFLOPS/W。そこからの年率は計算（20%、4%、0.75%）。1 位の小さな機械の値で、首位の巨大な機械の効率とは別です。' },
        { id: 'T', label: '何年後か', unit: '年後', min: 1, max: 20, step: 1, value: 10, presets: [{ label: '5 年後', value: 5 }, { label: '10 年後', value: 10 }, { label: '20 年後', value: 20 }] }
      ],
      calc: [{ id: 'k', expr: 'pow(2, T / d)' }, { id: 'perf', expr: 's0 * k' }, { id: 'P0', expr: 's0 * 1000000000 / e0' }, { id: 'eT', expr: 'e0 * pow(1 + g / 100, T)' }, { id: 'PT', expr: 'perf * 1000000000 / eT' }, { id: 'P5', expr: 's0 * pow(2, 5 / d) * 1000000000 / (e0 * pow(1 + g / 100, 5))' }, { id: 'P10', expr: 's0 * pow(2, 10 / d) * 1000000000 / (e0 * pow(1 + g / 100, 10))' }, { id: 'P20', expr: 's0 * pow(2, 20 / d) * 1000000000 / (e0 * pow(1 + g / 100, 20))' }, { id: 'perfPF', expr: 'perf * 1000' }],
      results: [
        { label: 'T 年後の性能（外挿）', expr: 'perf', unit: 'EFLOPS', digits: 2, show: 'perf < 1000', big: true },
        { label: 'T 年後の性能（外挿。1,000 EFLOPS ＝ 1 ZFLOPS）', expr: 'perf / 1000', unit: 'ZFLOPS', digits: 2, show: 'perf >= 1000', big: true },
        { label: '起点の何倍か', expr: 'k', unit: '倍', digits: 1 },
        { label: '富岳（Rmax 442.01 PFLOPS）の何倍ぶんか', expr: 'perfPF / fugaku', unit: '倍', digits: 0 },
        { label: 'T 年後の必要な電力の目安（性能 ÷ 効率）', expr: 'PT', auto: 'W', digits: 3, big: true },
        { label: '起点の電力（いまの値）', expr: 'P0', auto: 'W', digits: 3 },
        { label: '発電所の 1 軸（165 MW）の何本ぶんか', expr: 'PT / 1000000 / axisMW', unit: '本', digits: 1 },
        { label: '日本の最大需要電力（158.815 GW）の何 % か', expr: 'PT / 1000000000 / demandGW * 100', unit: '%', digits: 2 }
      ],
      reads: [
        { text: '**外挿の性質を確かめる計算で、予測ではありません。**起点と伸び（倍加の年数・効率の改善）を仮定して、掛け算を続けただけです。' },
        { when: 'perf >= 1000', text: 'T 年後の性能は **1 ZFLOPS（ゼタ級、10²¹ FLOPS）以上**です（外挿の値）。公表されている計画（FugakuNEXT）の「ゼタ級」は、AI 向けの FP8 の目標で、ここの FP64 の HPL とは測り方が違います。' },
        { when: 'perf < 1000', text: 'T 年後の性能は **1 ZFLOPS（ゼタ級、10²¹ FLOPS）に届きません**（外挿の値）。ゼタ級に届くまでの年数は、倍加の年数と起点で決まります。' },
        { when: 'PT / 1000000000 > demandGW', text: '必要な電力の目安が、**日本の最大需要電力（2025 年度夏季の実績、158.8 GW）を超えています**。実際には、電力・冷却・費用の制約で、この規模は成り立たない可能性が高い、という外挿の読み方です。' },
        { when: 'PT / 1000000000 <= demandGW && PT / 1000000 > axisMW', text: '必要な電力の目安は、**発電所の 1 軸（165 MW）を超え、日本の最大需要電力以下**です。' },
        { when: 'PT / 1000000 <= axisMW', text: '必要な電力の目安は、発電所の 1 軸（165 MW）以下です（効率の改善が大きい、性能の伸びが小さい、年数が短い、起点が小さいなどの設定）。' },
        { when: 'g <= 1 && d <= 2', text: '性能の伸びが速く、効率の改善が小さい設定では、**電力が性能とほぼ同じ速さで増えます**。電力の供給（序章1・発電講義 序章3）が制約になりうる設定です。' },
        { text: '**制約が効くと、伸びは続きません。**電力の供給・半導体の製造と微細化の限界（半導体講義 序章1）・冷却（第15・16章）・費用が、伸びを決める要因として挙げられます。この装置は、それらを入れていません。' }
      ],
      figs: [
        { type: 'curve', title: '性能の外挿（縦軸は 10 の x 乗 FLOPS の x。18 ＝ exa、21 ＝ zetta）', x: { id: 'yrs', min: 0, max: 20, step: 0.5, label: '何年後か', unit: '年後' },
          unit: '桁', yLabel: '性能の桁', digits: 2, ymin: 17, ymax: 'max(22, ceil(log10(s0 * 1000000000000000000) + 20 / d * 0.30103) + 1)',
          series: [{ label: '外挿した性能（予測ではない）', expr: 'log10(s0 * 1000000000000000000) + yrs / d * 0.30103', color: 'ran', dash: false }, { label: '富岳の Rmax（実測）', expr: '17.6454', color: 'pol', dash: 'dot', faint: true }, { label: 'TOP500 首位の Rmax（実測）', expr: '18.3421', color: 'core', dash: 'dot', faint: true }, { label: 'ゼタ級（10²¹）', expr: '21', color: 'ims', dash: 'dot', faint: true }],
          marks: [{ x: '5', label: '5 年後' }, { x: '10', label: '10 年後' }, { x: '20', label: '20 年後' }],
          alt: '横軸を何年後か（0 年から 20 年）、縦軸を性能の桁にした線グラフ。起点から倍加の年数で右上がりに伸びる外挿の線と、富岳の Rmax、TOP500 首位の Rmax、ゼタ級（21）の水平な点線。5 年後、10 年後、20 年後の位置に縦の目印。', caption: '実線は外挿（予測ではありません）。点線は、富岳の Rmax、TOP500 首位の Rmax、ゼタ級（10²¹ FLOPS）の目安です。5・10・20 年後の値は、下の「図の数値」の表でも読めます。' },
        { type: 'bar', title: '必要な電力の目安（対数）', log: true, logMin: 1000000, max: '1000000000000000', bars: [{ label: '起点（いま）', expr: 'P0', auto: 'W', digits: 3, color: 'ran' }, { label: '5 年後', expr: 'P5', auto: 'W', digits: 3, color: 'ran' }, { label: '10 年後', expr: 'P10', auto: 'W', digits: 3, color: 'ran' }, { label: '20 年後', expr: 'P20', auto: 'W', digits: 3, color: 'ran' }, { label: '富津・1 軸', expr: 'axisMW * 1000000', auto: 'W', digits: 3, color: 'ims' }, { label: '日本の最大需要', expr: 'demandGW * 1000000000', auto: 'W', digits: 3, color: 'pol' }],
          alt: '必要な電力の目安を対数の横棒で比べるグラフ。起点（いま）、5 年後、10 年後、20 年後の外挿の値と、富津の 1 軸（165 MW）、日本の最大需要電力（約 158.8 GW）。', caption: '棒の長さは対数。右端（1,000 TW）に届いた棒は、表示の範囲を超えています。外挿の値で、予測ではありません。' }
      ] }
  ]
});

/* ---- lab：規模感の言い換え（人類全体が手計算したら） ---- */
CN.add('lab', 'cI2-words', {
  title: '規模感の言い換え：もし、人類全体が手計算したら',
  disclaimer: '学習用の模型です。前提は 2 つだけです：世界の人口を約 80 億人（国連の推計。2022 年 11 月 15 日に 80 億人に達すると推計）、全員が休まず、1 秒に決まった回数の演算（加減乗除の 1 回）をする、という仮定。浮動小数点の桁数や、間違いや休みは考えていません。人間の脳との比較は、推定の幅が非常に大きく、定義も一致していないので、行いません。',
  experiments: [
    { id: 'hand', label: '1 秒ぶんを手計算すると',
      intro: '計算機が **1 秒でこなす量**を、世界中の人が手で計算したら、何秒・何年かかるかを出します。検算できる掛け算と割り算だけです。',
      formula: 'かかる時間（秒）＝ 計算機の 1 秒の演算回数（FLOPS）÷（人口 × 1 人が 1 秒にできる演算の回数）。年に直すときは 1 年 ＝ 31,557,600 秒（365.25 日）',
      presetLabel: '目安の性能（押すと、性能のつまみが動きます）', presetHint: '',
      presets: [{ label: 'H100 SXM 1 枚（FP64 34 TFLOPS）', set: { ex: 13.531, r: 1 }, text: 'H100 SXM 1 枚の FP64（34 TFLOPS）の 1 秒ぶんは、全員で 1 秒に 1 回ずつ手計算すると、約 70 分（約 4,250 秒）かかります（計算）。' }, { label: '1 EFLOPS', set: { ex: 18, r: 1 }, text: '1 EFLOPS（10¹⁸ 回/秒）の 1 秒ぶんは、全員が休まず 1 秒に 1 回ずつ計算して、約 4.0 年かかります（計算）。' }, { label: 'TOP500 首位（Rmax 2.198 EFLOPS）', set: { ex: 18.342, r: 1 }, text: 'TOP500 首位の Rmax（2.198 EFLOPS）の 1 秒ぶんは、約 8.7 年かかります（計算）。' }],
      consts: [{ id: 'pop', value: 8000000000, label: '世界の人口（約 80 億人。国連の推計、2022 年 11 月 15 日）', unit: '人', digits: 0 }],
      inputs: [
        { id: 'ex', label: '性能の桁（10 の x 乗 FLOPS の x。15 ＝ peta、18 ＝ exa）', unit: '', min: 12, max: 19, step: 0.001, value: 17 },
        { id: 'r', label: '1 人が 1 秒にできる演算の回数（仮定）', unit: '回/秒', min: 0.05, max: 2, step: 0.05, value: 1 }
      ],
      calc: [{ id: 'sec', expr: 'pow(10, ex) / (pop * r)' }, { id: 'yrs', expr: 'sec / 31557600' }],
      results: [
        { label: '人類全体が手計算すると、かかる時間（1 秒ぶん）', expr: 'sec', unit: '秒', digits: 0, show: 'sec < 31557600' },
        { label: '人類全体が手計算すると、かかる時間（1 秒ぶん）', expr: 'yrs', unit: '年', digits: 1, show: 'sec >= 31557600', big: true },
        { label: '年に直すと', expr: 'yrs', unit: '年', digits: 3, show: 'sec < 31557600' }
      ],
      reads: [
        { when: 'yrs < 1', text: '全員で手計算しても、**1 年未満**で、計算機の 1 秒ぶんが終わります（仮定どおりに休まず間違えない場合）。' },
        { when: 'yrs >= 1 && yrs < 100', text: '全員が休まず計算して、**数年から百年未満**。計算機の **1 秒**ぶんです。' },
        { when: 'yrs >= 100', text: '全員が休まず計算して、**百年以上**。計算機の **1 秒**ぶんです。' },
        { text: '人間の脳との比較は行いません。推定の幅が非常に大きく、定義も一致していないためです（Open Philanthropy の報告は、脳の仕事を同じ水準でこなすのに 10¹³〜10¹⁷ FLOP/s が妥当と見るが、「脳と同等の FLOP/s」を示すものではない、と明記しています）。' }
      ],
      fig: { type: 'bar', log: true, logMin: 1, max: '100000000000', bars: [{ label: '手計算（秒）', expr: 'sec', unit: '秒', digits: 0, color: 'ran' }, { label: '1 日（秒）', expr: '86400', unit: '秒', digits: 0, color: 'core' }, { label: '1 年（秒）', expr: '31557600', unit: '秒', digits: 0, color: 'core' }, { label: '100 年（秒）', expr: '3155760000', unit: '秒', digits: 0, color: 'core' }],
        alt: '人類全体が手計算した場合にかかる時間（秒）を、1 日、1 年、100 年の秒数と並べた対数の横棒グラフ。', caption: '棒の長さは対数。目盛りの代わりに、1 日・1 年・100 年の秒数を並べています。' } }
  ]
});

/* ---- compare：序章1（電力）と序章2（計算）の対応 ---- */
CN.add('compare', 'cI2-pair', {
  title: '序章1（電力）と序章2（計算）：同じ考え方の対応表',
  colA: '電力（序章1）', colB: '計算（この序章）', colNote: '共通する考え方',
  rows: [
    { a: '瞬間：電力（kW）。いま流れている大きさ', b: '瞬間：計算能力（FLOPS）。1 秒あたりの浮動小数点演算の回数', note: '「いまの大きさ」と「ためた量」を分ける。', ch: ['I1'] },
    { a: '量：電力量（kWh）＝ 電力 × 時間', b: '量：計算量（FLOP）＝ 能力 × 時間（秒）', note: '小さな能力でも、長く動かせば量は大きい。' },
    { a: '階段：W → kW → MW → GW（1,000 倍ずつ）', b: '階段：FLOPS → kilo → mega → giga → tera → peta → exa → zetta（1,000 倍ずつ）', note: '「万」「億」の言い方と、1,000 倍ごとの接頭辞はずれる。' },
    { a: '測り方：定格・最大入力・平均、IT 容量と受電容量', b: '測り方：HPL の実測（Rmax）、理論上の最大（Rpeak）、精度（FP64・FP8 など）、sparsity', note: '測り方が違う値は、単純に比べない。', ch: ['I1'] },
    { a: '束ねる：台数 × 1 台の電力 × PUE', b: '束ねる：枚数 × 1 枚の FLOPS × 効率（電力は同じ式）', note: '1 枚あたりの公表値と、仮定を分けて掛ける。', ch: ['I1', 17] },
    { a: '規模の感覚：家庭の何軒ぶん、発電所の 1 軸の何本ぶん', b: '規模の感覚：富岳の何倍ぶん、GPU の何枚ぶん', note: '「何倍ぶん」は、同じ時刻に支えられる数ではなく、桁の感覚をつかむ目安。' }
  ],
  note: '「瞬間」と「量」、「公表値」と「仮定」を分ける点が、2 つの序章に共通しています。'
});

/* ---- quiz（正答の添字：序章 I2 は (2−1+問の番号−1) mod 4 ＝ 1・2・3） ---- */
CN.add('quiz', 'cI2-quiz', { items: [
  { q: '同じ GPU（H100 SXM）の公表値で、FP64 は 34 TFLOPS、FP8 Tensor Core は 3,958 TFLOPS（with sparsity）です。この 2 つの値について、正しい記述はどれですか。', c: ['FP8 の値が大きいので、この GPU の FP64 は性能が低いと言える', '精度と条件が違う値なので、「約 116 倍速い」とは言えない', 'with sparsity の値は、すべての計算にそのまま当てはまる', 'FLOPS という同じ単位なので、そのまま割り算した比が速さの比になる'], a: 1,
    why: '正答は、精度と条件が違う値なので、「約 116 倍速い」とは言えない、です。FP64 は科学計算の倍精度、FP8（with sparsity）は AI 向けの低精度で、疎行列の条件つきの値です。単位が同じ FLOPS でも、1 回の演算の精度と条件が違うので、単純には比べられません。TOP500 の順位も、FP64 の HPL の実測（Rmax）が基準です。', ch: ['I2', 8] },
  { q: '性能 2,500 PFLOPS を、EFLOPS で表すとどれですか。ただし 1 EFLOPS ＝ 1,000 PFLOPS です。', c: ['25 EFLOPS', '0.25 EFLOPS', '2.5 EFLOPS', '2,500,000 EFLOPS'], a: 2,
    why: '正答は 2.5 EFLOPS です。exa（10¹⁸）は peta（10¹⁵）の 1,000 倍なので、PFLOPS の値を 1,000 で割ります（2,500 ÷ 1,000 ＝ 2.5）。25 は 100 で割った誤り、0.25 は 10,000 で割った誤り、2,500,000 は 1,000 をかけた誤りです。', ch: ['I2'] },
  { q: '「性能が 2 年ごとに 2 倍になる伸びが 20 年続いたら」という計算（外挿）の読み方として、正しいのはどれですか。', c: ['公表された計画の達成年を示しているので、20 年後の性能の予測と言える', '電力・半導体・冷却・費用は考えなくてよいので、必ずその性能に届く', '20 年で起点の約 40 倍（2 × 20）になるので、予測として使える', '過去の伸びを未来へ延ばした仮定の計算で、約 1,000 倍（2 の 10 乗）になるが、伸びが続く保証はなく、予測ではない'], a: 3,
    why: '正答は、過去の伸びを未来へ延ばした仮定の計算で、約 1,000 倍（2 の 10 乗 ＝ 1,024）になるが、伸びが続く保証はなく、予測ではない、です。20 年 ÷ 2 年 ＝ 10 回の倍加で、2 の 10 乗 ＝ 1,024 倍です。電力の供給・半導体の製造・冷却・費用の制約で、伸びが止まることもあります。実際の TOP500 首位も、期間によって倍加が約 1 年から約 4 年と大きく違います。', ch: ['I2'] }
]});

CN.glossary([
  { t: 'FLOPS・FLOP', en: 'floating-point operations (per second)', alias: 'フロップス・計算能力・演算性能', d: 'FLOPS は 1 秒あたりの浮動小数点演算の回数（瞬間の能力）、FLOP は演算の回数の合計（量）。計算量 ＝ FLOPS × 秒。精度（FP64 など）を添えて使う。', ch: ['I2'] },
  { t: 'Rmax・Rpeak', en: 'Rmax / Rpeak', alias: '実測性能・理論ピーク', d: 'TOP500 の一覧の 2 つの値。Rmax は HPL ベンチマークの実測値、Rpeak は理論上の最大。Rmax は Rpeak より小さい。', ch: ['I2'] },
  { t: 'HPL', en: 'High-Performance Linpack', alias: 'LINPACK・HPL ベンチマーク', d: '大きな連立一次方程式（行列計算）を FP64 の倍精度で解く速さを測るベンチマーク。TOP500 の順位の基準で、AI 向けの低精度の性能とは別の測り方。', ch: ['I2', 8] },
  { t: 'TOP500', en: 'TOP500', alias: 'トップ 500', d: 'HPL の実測値（Rmax）で、世界のスーパーコンピューターを順位づけする一覧。年 2 回（6 月と 11 月）に更新される。電力もリストに載る（実行時の値）。', ch: ['I2', 17] },
  { t: 'Green500', en: 'Green500', alias: 'グリーン 500', d: '電力あたりの HPL の性能（GFLOPS/W）で順位づけする一覧。TOP500 と同じ時期に更新される。小さな機械が上位に入りやすい。', ch: ['I2', 17] },
  { t: 'sparsity（疎行列）', en: 'sparsity', alias: 'スパース・疎', d: '行列の多くの要素が 0 であることを利用して演算を減らす条件。GPU の AI 向けの公表値には「with sparsity」の値があり、dense（密）の値の 2 倍に書かれることが多い。', ch: ['I2', 8] },
  { t: '外挿', en: 'extrapolation', alias: '外挿・延長', d: 'すでにある値の傾向を、範囲の外へ延ばして推し量ること。予測ではなく、仮定を置いた計算で、制約が効くと外れる。', ch: ['I2'] }
]);
