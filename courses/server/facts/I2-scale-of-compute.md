序章2 事実確認表（確認 2026-11-19）

この序章の値は 3 種類：公表（表の行）／計算した目安（下の検算）／模型の仮定（最後の行）。TOP500 は 2026 年 11 月（第 68 回）が最新で上位 10 は 6 月と同じ。システム別の値は 6 月（第 67 回）のページの値で、11 月の一覧のページでも同じ値であることを検証で確かめた（2026-11-19）。

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 仕様値 | TOP500 2026 年 6 月（第 67 回）の LineShine：Rmax 2,198.40 PFLOPS、Rpeak 2,735.82 PFLOPS、電力 42,220 kW。条件：Rmax は HPL（FP64）の実測、Rpeak は理論上の最大、電力は一覧の記載 | 2,198.40 PFLOPS／2,735.82／42,220 kW | 2026-06 | TOP500『TOP500 List June 2026』 | https://top500.org/lists/2026/06 | ○ | 2026-11-19 | I2 本文、cI2-stairs、cI2-conv、cI2-future |
| 2 | 仕様値 | TOP500 2026 年 6 月：El Capitan Rmax 1,809 PFLOPS、電力 29,685 kW（Rpeak 2,821.1 PFLOPS から効率 約 64%）、Aurora の効率 約 51%、富岳 Rmax 442.01／Rpeak 537.21 PFLOPS、電力 29,899 kW。条件：6 月の一覧のページの値。11 月は上位 10 が不変 | 1,809／442.01 PFLOPS | 2026-06 | TOP500『TOP500 List June 2026』 | https://top500.org/lists/2026/06 | ○ | 2026-11-19 | 本文の測り方の表、cI2-conv、cI2-bundle |
| 3 | 発表 | TOP500 は 2026 年 11 月（第 68 回、SC26・シカゴ、2026-11-16）が最新で、首位から 10 位は 6 月から変わらず、新システムは 27 で過去最少。条件：トップページの記載。11 月の一覧のページ（https://top500.org/lists/top500/2026/11/）で上位 10 の Rmax・Rpeak・電力が 6 月と同じことを検証で確認 | 27／10 位まで不変 | 2026-11 | TOP500 トップページ（2026-11-19 確認）、The Next Platform『Supercomputer Installs Take A Dive…』 | https://www.nextplatform.com/hpc/2026/11/16/supercomputer-installs-take-a-dive-in-the-second-half-of-2026/5310221 | ○ | 2026-11-19 | 本文冒頭の注記、(a) |
| 4 | 仕様値 | TOP500 の首位の履歴 11 点（CM-5 59.7 GFLOPS 1993-06、ASCI Red 1.068 TFLOPS、Earth Simulator 35.86 TFLOPS、Roadrunner 1.026 PFLOPS、K 8.16 PFLOPS、Tianhe-2 33.86 PFLOPS、Summit 122.3 PFLOPS、富岳 415.53 PFLOPS、Frontier 1.102 EFLOPS、El Capitan 1.742 EFLOPS、LineShine 2.198 EFLOPS）。条件：各時点の Rmax（HPL・FP64） | 59.7 GFLOPS〜2.198 EFLOPS | 1993〜2026 | TOP500『25 years』ほか各年の一覧 | https://www.top500.org/25years/ | ○ | 2026-11-19 | cI2-history、cI2-stairs |
| 5 | 仕様値 | NVIDIA H100 SXM：FP64 34、FP64 Tensor Core 67、FP32 67、TF32 989*、FP16 1,979*、FP8 3,958* TFLOPS（* は with sparsity）。条件：SXM 版の公表値で、dense の値はこのページに載っていない | 34 TFLOPS（FP64） | 確認 2026-11-19（日付なし） | NVIDIA『H100 GPU』 | https://www.nvidia.com/en-us/data-center/h100.html | ○ | 2026-11-19 | cI2-measure、cI2-bundle、cI2-conv |
| 6 | 仕様値 | NVIDIA GB200 NVL72：1 ラック FP64 2,880 TFLOPS、FP8/FP6 720 PFLOPS（sparse）、NVFP4 1,440｜720 PFLOPS（sparse｜dense）。条件：dense は sparse の半分という脚注。GPU 72 枚 | 2,880 TFLOPS（FP64） | 確認 2026-11-19（日付なし） | NVIDIA『GB200 NVL72』 | https://www.nvidia.com/en-us/data-center/gb200-nvl72/ | ○ | 2026-11-19 | cI2-measure、cI2-bundle |
| 7 | 仕様値 | DGX H100 の最大入力 10.2 kW（GPU 8 枚）、GB200 NVL72 のラックの電力 約 120 kW（GPU 72 枚）。条件：序章1 の #1・#3 と同じ値。最大の値で常時ではない | 10.2 kW／約 120 kW | 2026-10・09（ページの更新） | NVIDIA『DGX H100/H200 User Guide』『DGX GB200 User Guide』 | https://docs.nvidia.com/dgx/dgxh100-user-guide/introduction-to-dgxh100.html | ○ | 2026-11-19 | cI2-bundle（電力） |
| 8 | 仕様値 | 産総研 ABCI 3.0：H200 6,128 枚（ノード 766）、FP64 ピーク 415 PFLOPS、FP16 ピーク 6.22 EFLOPS、電気設備 6 MW、冷却 5.2 MW。条件：理論上の最大（論文の表）。運用の時期は論文の記載（2024-11 から段階的） | 6,128 枚／415 PFLOPS | 2024-11 | 産業技術総合研究所ほか『ABCI 3.0: Evolution of the leading AI infrastructure in Japan』 | https://arxiv.org/html/2411.09134v1 | ○ | 2026-11-19 | 本文の表、cI2-stairs、cI2-bundle の印 |
| 9 | 発表 | 米国エネルギー省・アルゴンヌ：Solstice（Blackwell 10 万枚）、Equinox（1 万枚、2026 年前半の見込み）。2 つで 2,200 exaflops の AI 性能（精度の記載なし）。計画で、稼働の発表は確認していない。社名変更：なし | 10 万枚／1 万枚 | 2025-10-28 | NVIDIA『NVIDIA and Oracle to Build US Department of Energy's Largest AI Supercomputer』、ALCF『Argonne expands…』 | https://nvidianews.nvidia.com/news/nvidia-oracle-us-department-of-energy-ai-supercomputer-scientific-discovery | ○ | 2026-11-19 | 本文の表、(b)、cI2-bundle の印 |
| 10 | 発表 | FugakuNEXT：FP8（sparse）で 600 EFLOPS 超、ゼタ級、富岳に対しハードウェア 5 倍超・アプリ最大 100 倍、約 40 MW の制約、2030 年ごろの運用。目標。社名変更：なし | 600 EFLOPS 超／約 40 MW | 2025-08-22 | 理化学研究所『FugakuNEXT の発表』 | https://www.riken.jp/en/news_pubs/news/2025/20250822_1/index.html | ○ | 2026-11-19 | (b)の表 |
| 11 | 発表 | EuroHPC：AI ギガファクトリー最大 7 か所、民間投資 200 億ユーロ超の見込み、締切 2026-11-12、選定 2027 年初め、選定から 18 か月以内に運用。調達の段階。社名変更：なし | 最大 7 か所 | 2026-07-30 | EuroHPC 共同事業体『EuroHPC Joint Undertaking launches AI Gigafactories call』 | https://www.eurohpc-ju.europa.eu/eurohpc-joint-undertaking-launches-ai-gigafactories-call-2026-07-30_en | ○ | 2026-11-19 | (b)の表 |
| 12 | 発表 | OpenAI は 2026-04-29、米国で 10 GW の AI インフラを確保する目標（2025 年 1 月）をすでに超え、直近 90 日で 3 GW 超を追加と発表。条件：確保の量で、稼働や FLOPS ではない。序章1 #30 と同じ。社名変更：なし | 10 GW 超（確保） | 2026-04-29 | OpenAI『Building the compute infrastructure for the Intelligence Age』 | https://openai.com/index/building-the-compute-infrastructure-for-the-intelligence-age/ | ○ | 2026-11-19 | (b)の表 |
| 13 | 市場 | Epoch AI：AI スーパーコンピューターの 16 ビット性能は約 9 か月で 2 倍、電力は約 1 年で 2 倍、Colossus は最大 20 万チップ・約 300 MW（推定）、2030 年 6 月に約 200 万チップ・約 9 GW の外挿。条件：2019〜2025 年の 500 超のシステムのデータの分析、推定値 | 9 か月／1 年／300 MW | 2025-04 | Epoch AI『Trends in AI Supercomputers』 | https://epoch.ai/blog/trends-in-ai-supercomputers | △ | 2026-11-19 | (a)、cI2-bundle の印、(b) |
| 14 | 市場 | Epoch AI：訓練の計算量は年 4〜5 倍（2010〜2024-05）、GPT-3 は約 3×10^23 FLOP（推定）。条件：推定。電力の供給などを制約に挙げる | 年 4〜5 倍 | 2024-05 | Epoch AI『Training Compute of Frontier AI Models Grows by 4-5x per Year』 | https://epoch.ai/blog/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year | △ | 2026-11-19 | 本文の物差し、cI2-quantity |
| 15 | 市場 | IEA：データセンターの電力は 2024 年 約 415 TWh（世界の約 1.5%）、基準シナリオで 2030 年 約 945 TWh。条件：推計で不確かさが大きい | 415 TWh／945 TWh | 2025 | 国際エネルギー機関『Energy and AI』 | https://iea.org/reports/energy-and-ai/energy-demand-from-ai | ○ | 2026-11-19 | (c)の制約の段落 |
| 16 | 仕様値 | Green500 の 1 位：26.195（2020-11）、62.684（2022-06）、72.733（2025-06）、73.28 GFLOPS/W（2026-06）。条件：小さな機械が 1 位になる一覧の値で、首位の巨大な機械の効率とは別 | 73.28 GFLOPS/W | 2020〜2026 | TOP500『Highlights』各回 | https://top500.org/lists/top500/2026/06/highs | ○ | 2026-11-19 | cI2-future の効率の改善 |
| 17 | 仕様値 | Feldman（TOP500）：一覧全体の合計の伸びが 2013 年ごろから過去を下回る（原因は特定せず）。2026 年 6 月の合計は 18.73 EFLOPS（6 月のハイライト）。条件：11 月の合計は TOP500 の公表で確かめられず、本文は「報道によれば 6 月より増えた」とだけ書く（数値は使わない。検証で 19.57 を削除） | 18.73 EFLOPS | 2017-07-03／2026-11 | TOP500『TOP500 Meanderings…』、Network World | https://top500.org/news/top500-meanderings-sluggish-performance-growth-may-portend-slowing-hpc-market/ | △ | 2026-11-19 | (a) |
| 18 | 仕様値 | コンピュータ歴史博物館：Cray-1A 160 MFLOPS（1976）、CDC 6600 毎秒 300 万命令（1964）。条件：博物館の説明で、HPL の値ではなく測り方が違う | 160 MFLOPS | 日付なし | コンピュータ歴史博物館『Cray-1A』『CDC 6600』 | https://www.computerhistory.org/revolution/artifact/7/16 | △ | 2026-11-19 | cI2-stairs |
| 19 | 仕様値 | NVIDIA の RTX 4090 の製品ページ：シェーダーの性能 83 TFLOPS、CUDA コア 16,384。条件：精度の記載なし（報道〔Tom's Hardware〕は FP32 の約 82.6 TFLOPS と伝える）。A17 Pro：Apple の発表文（2023-09-12）は Neural Engine を「最大 2 倍速い」とだけ書き、回数を書いていないので、毎秒 35 兆回（報道）は検証で削除 | 83 TFLOPS | 確認 2026-11-19（日付なし） | NVIDIA『GeForce RTX 4090』、Apple『Apple unveils iPhone 15 Pro and iPhone 15 Pro Max』 | https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090.html | ○ | 2026-11-19 | cI2-stairs、cI2-conv、表 |
| 20 | 定義 | 国連の推計：世界の人口 約 80 億人（2022-11-15 に到達と推計）。Carlsmith（Open Philanthropy）：脳の仕事に 10^13〜10^17 FLOP/s が妥当と見る幅（脳との比較は行わない理由）。条件：人口は推計 | 80 億人 | 2022／2020 | 国連人口基金『World set to reach 8 billion…』、Open Philanthropy | https://www.unfpa.org/press/world-set-reach-8-billion-people-15-november-2022 | ○ | 2026-11-19 | cI2-words、(d) |
| 21 | 定義 | ムーアの法則：1965 年は毎年 2 倍、1975 年に 2 年（Britannica）。2016 年に Nature が業界の方針転換を報道。条件：チップ上の部品数の経験則で FLOPS の法則ではない。現在の状況は確認していないので書かない | 2 年 | 2016-02-09 | Nature、Britannica | https://www.britannica.com/technology/Moores-law | ○ | 2026-11-19 | (c) |
| 22 | 定義 | FLOPS は 1 秒あたりの浮動小数点演算、FLOP は回数の合計、計算量 ＝ FLOPS × 秒。序章1 の kW と kWh、PUE の定義（第17章）、発電所の 1 軸 165 MW・日本の最大需要電力 158,815 千 kW は序章1 #24・#25 と同じ | 165 MW／158,815 千 kW | 2026-11-18 | 序章1・第17章・発電講義 序章3 の事実確認表 | — | ○ | 2026-11-19 | 全体 |
| 23 | 一般知識 | 模型の値（仮定）：動かす日数、枚数、効率、PUE、1 ラックの枚数、倍加の年数、効率の改善、人口と 1 人の速さ。実際の値ではない | — | — | この講座の仮定（模型） | —（模型） | × | 2026-11-19 | 全装置 |
| 24 | 仕様値 | LLNL の El Capitan：1 ノードに AMD MI300A が 4 個。条件：全体はページにより 46,080 個（11,520 ノード、HPC @ LLNL）と 44,544 個（Reference Systems）で食い違う。本文は「約 4.5 万個」と両方の値を書く | 約 4.5 万個 | 確認 2026-11-19（日付なし） | ローレンス・リバモア国立研究所『El Capitan』『Reference Systems』 | https://hpc.llnl.gov/node/1269 | ○ | 2026-11-19 | 本文の表、cI2-bundle の図の説明 |
| 25 | 発表 | 理化学研究所 計算科学研究センター（R-CCS）の FugakuNEXT のページ：「AI（FP8）で世界初のゼタ級」、2030 年ごろの運用開始。2026-05-29 付けの基本設計の技術報告書が載るが、内容は未確認 | ゼタ級（FP8） | 確認 2026-11-19 | R-CCS『FugakuNEXT』 | https://www.r-ccs.riken.jp/en/fugaku-next/ | ○ | 2026-11-19 | (b)の表、cI2-stairs |

確認できず書かなかった：
- スマートフォン（A17 以外）の CPU・GPU の FLOPS、ENIAC、PS5、Frontier の GPU 数、地球上の砂粒の数：公表値・前提を確認できず、使わなかった。
- 人間の脳との比較：推定の幅が大きく定義が一致しないため、比較せず幅の注記のみ。
- 11 月（第 68 回）のシステム別ページ：検証で取得でき、上位 10 は 6 月と同じ値（#3）。El Capitan の MI300A：LLNL の資料で確認（#24。ページ間で値が違うので約 4.5 万個と書く）。
- 11 月の一覧の合計（報道の 19.57 EFLOPS）、A17 Pro の毎秒 35 兆回（報道）：メーカー・TOP500 の公表で確かめられず、検証で削除。
- ムーアの法則の現在の状況：確かめた資料がなく書かなかった。FugakuNEXT の基本設計の技術報告書（2026-05-29）：内容未確認。

定義と式の照合（§8.6）
| 量 | 定義 | 式 | 一致 |
|---|---|---|---|
| 計算量 | FLOPS × 秒 | 1 EFLOPS × 86,400 秒 ＝ 8.64×10^22 FLOP/日 | ○ |
| 施設の電力 | 枚数 × 1 枚の電力 × PUE | 80,000 × 1.275 kW × 1.36 ＝ 138.72 MW | ○ |
| Rmax ÷ Rpeak | 実測 ÷ 理論上の最大 | 2,198.4 ÷ 2,735.82 ＝ 80.4% | ○ |
| 倍加の年数 | 期間 × log10(2) ÷ 桁の増加 | 2022.4〜2026.45 で約 4 年 | ○ |
| 外挿の性能 | 起点 × 2^(年数 ÷ 倍加の年数) | 2.198 × 2^(10 ÷ 2.2) ＝ 約 51.3 EFLOPS | ○ |

演習の照合（§8.5）
| 問 | 正答 | 本文・図との照合 |
|---|---|---|
| Q1 | sparsity・精度が違う値は単純に比べられない | 本文の測り方の表、cI2-measure と一致 | ○ |
| Q2 | 2,500 PFLOPS ＝ 2.5 EFLOPS | 1 EFLOPS ＝ 1,000 PFLOPS（単位の階段）と一致 | ○ |
| Q3 | 約 1,000 倍 ＝ 2^10 で予測ではない | cI2-future の読み、(c)と一致 | ○ |

検算
検算 1EFLOPSの1日の計算量（10の22乗FLOP単位）: 8.64 = 1 * 86400 / 1000 / 10
検算 GPU8万枚PUE1.36の施設の電力（MW）: 138.72 = 80000 * 1.275 * 1.36 / 1000
検算 GPU10万枚Blackwellの電力（MW）: 226.67 = 100000 * 1.6667 * 1.36 / 1000
検算 同じ施設の軸の本数（165MW）: 1.374 = 100000 * 1.6667 * 1.36 / 1000 / 165
検算 LineShineのRmaxとRpeakの比（％）: 80.36 = 2198.4 / 2735.82 * 100
検算 El CapitanのRmaxとRpeakの比（％）: 64.12 = 1809 / 2821.1 * 100
検算 LineShineと富岳の比: 4.974 = 2198.4 / 442.01
検算 LineShineのH100のFP64換算（枚）: 64659 = 2198.4 * 1000 / 34
検算 1ラックの1GPUあたりFP64（TFLOPS）: 40.0 = 2880 / 72
検算 ABCI3.0のFP16とFP64の比: 14.99 = 6220 / 415
検算 H100のFP8とFP64の比: 116.41 = 3958 / 34
検算 NVL72のNVFP4とEl Capitanの比: 0.796 = 1440 / 1809
検算 DGX H100の1枚あたり電力（kW）: 1.275 = 10.2 / 8
検算 GB200 NVL72の1枚あたり電力（kW）: 1.667 = 120 / 72
検算 外挿10年（倍加2.2年）の性能（EFLOPS）: 51.33 = 2.198 * 2 ** (10 / 2.2)
検算 600EFLOPSは10の21乗の何倍: 0.6 = 600 * 10 ** 18 / 10 ** 21
検算 効率51%と82%の比: 1.608 = 82 / 51
検算 BlackwellのFP8目安とFP64の比: 125 = 5000 / 40
検算 人類の手計算1EFLOPSの1秒分（年）: 3.961 = 1000000000000000000 / 8000000000 / 31557600
検算 Green500の年あたり改善 2020-11から2026-06（％）: 20.2 = ((73.28 / 26.195) ** (1 / 5.58) - 1) * 100
検算 TOP500首位の33年の倍率（億倍単位）: 0.368 = 2198400000000000000 / 59700000000 / 100000000
検算 LineShineの電力効率（GFLOPS/W）: 52070.11 = 2198.4 * 1000000 / 42220
検算 Epoch 2030年 9GWと165MWの比: 54.55 = 9000 / 165
