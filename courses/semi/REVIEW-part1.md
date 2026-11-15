# 第1部（第01〜05章）技術検証の記録

- 検証日：2026-11-14
- 対象：`chapters/01〜05-*.html`、`data/01〜05-*.js`（course.json の第1部の記載は誤りなし、変更なし）
- 修正前の控え：`/tmp/review-p1/chapters`、`/tmp/review-p1/data`
- 修正後の検査：`python3 -I /home/claude/courses/_framework/build.py /home/claude/courses/semi --check` → `OK … 0 warnings`

## 件数

| 区分 | 件数 | 直した | 残した |
|---|---|---|---|
| 重大 | 0 | 0 | 0 |
| 中 | 8 | 6 | 2 |
| 軽微 | 25 | 20 | 5 |
| 合計 | 33 | 26 | 7 |

物性（バンド、キャリア、ドーピング、pn 接合）、MOSFET の動作、プレーナ・FinFET・GAA の面数、DRAM・SRAM・NAND の仕組み、シーメンス法・CZ・FZ、FOUP・FOSB の使い分けに、本質的な誤りはありませんでした。クイズ・総合テストの正答と解説は全件正しく、誤答も「もっともらしい誤解」になっています。

## 指摘の一覧

### 中

| # | 章 | 箇所 | 内容と根拠 | 対応 |
|---|---|---|---|---|
| M1 | 03 | 本文「CMOS」の節、`c03-inverter` の遷移 | 切り替え時の電力を「両方が半分オンになり電源から地面へ流れる電流（貫通電流）」だけで説明していた。主な原因は、出力につながる配線や次の段のゲートの充電・放電。因果の取り違えになる | 直した（充電・放電を主に、貫通電流は従に。「抜けません」は「ほとんど抜けません（リークは残る）」にして第02章と合わせた） |
| M2 | 05 | `c05-pods` の FOUP「Unified」 | 「寸法・インタフェースが規格で決まっているので」は語の説明として根拠がない。FOUP は棚が容器と一体で、SMIF ポッドのように別のカセットを入れない点が違い（Wikipedia「FOUP」：removable cassette … replaced by fixed wafer columns） | 直した（「一体型」に。語源とは断定していない） |
| M3 | 05 | `c05-process` の「面取り・ラッピング」 | 「片面あたり約 10 μm の削り代の例」に出典がない（データ先頭の確認記録にもない）。spec 内容の決まり 3 に反する | 直した（数値を削除） |
| M4 | 04 | 演習「見出しを仕分ける」 | 「製品名」の例がなく、3 番目の答え「世代名ではなく製品の目印」が本文の「3D NAND は世代の目印が層数」と食い違っていた | 直した（1 番目を「Intel、18A で作る Panther Lake を発表」にして製品名の例を入れた。Panther Lake が 18A の製品であることは Intel のリリースで確認。3 番目の答えを本文と合わせた） |
| M5 | 02 | Intel 2011 年の Tri-Gate の出典 | 第三者サイト（rmsystem.cz）の転載 PDF だけが根拠で、本文は「Intel ニュースリリース」と書いていた | 直した（Intel の投資家向けサイトの原文に差し替え。内容は一致） |
| M6 | 03 | NAND の節 | SK hynix 321 層の数字を第03章でも書いていた。spec §7.3-2 で世代・層数の公表は第04章が持ち主 | 直した（第04章へのリンクに置き換え、参照資料の行とデータの確認記録を整理） |
| M7 | 02・04 | TSMC N2 | 「量産時期は公式ページに記載なし」。調べたページについては正しいが、2025 年 12 月に TSMC が 2 nm の量産開始を発表したと複数の報道が伝えている（例：The Star 2025-12-31、TechSpot）。TSMC の一次資料（N2 の技術ページやリリース）は今回取得できず | 残した（TSMC の一次資料で確かめてから、第04章の表と第02章の表を更新してほしい。報道だけでは書かない規則なので、今は直していない） |
| M8 | 05 | 450 mm の節 | 「投資に見合う用途が少ないとの見方が広がり」の根拠が、ウェーハ販売会社（University Wafer）の解説。出典の優先順（CHAPTER-BRIEF §4）では弱い。2014 年の Semiconductor Engineering の記事も古い | 残した（SEMI・IRDS・業界団体の資料など、もっと強い出典への差し替えを推奨。今回は件数の上限で再確認していない） |

### 軽微（直したもの）

| # | 章 | 箇所 | 内容 |
|---|---|---|---|
| S1 | 01 | `c01-band` の hint | 誤字「帯と禁制帯の押すと」→「を押すと」 |
| S2 | 01 | `c01-materials` | 「第 05 章」→「第05章」（GLOSSARY §1-3） |
| S3 | 01 | 本文 | 「約 1.12 eV」→「1.12 eV」（出典の値そのままなので「約」は付けない。GLOSSARY §5.2） |
| S4 | 02 | 本文 | 「22 nm 世代」の章内初出に「（世代の呼称で、物理寸法ではない。第04章）」を追加（GLOSSARY §4-1） |
| S5 | 02 | パワー半導体の節 | IGBT の初出に英語の正式名を追加（GLOSSARY §3-1） |
| S6 | 02 | 現場でのつながり | 「エッチング（等方性エッチング）」だけでは FinFET・GAA の変化の説明として偏る →「異方性エッチングや、特定の膜だけを除く選択エッチング」 |
| S7 | 02 | `c02-nmos` の trap | 「第 2 部」→「第2部」 |
| S8 | 02・04 | Intel 18A の出典 | 中国語版のページ（?p=7573）を Intel の英語のリリース（intc.com）に差し替え。表・ident の「Intel Newsroom」も合わせた |
| S9 | 03 | `c03-hierarchy` | 大きさの目安：セル「マイクロメートルの桁」→「数百ナノメートルからマイクロメートルの桁」、ダイ「ミリメートルから 1 センチ台」→「数ミリメートルから数センチメートル」（大型のダイは 2〜3 cm 角に達するため。ここは数値の出典がない「目安」なので、言葉の幅で示した） |
| S10 | 03 | `c03-class` の DRAM | 「コンデンサ」→「キャパシタ」（本文・用語集と統一） |
| S11 | 03 | ロジックの節 | 本文では CPU をロジックに入れ、階層図（WSTS）ではマイクロに入れていた。両方の意味の違いを 1 文で補った |
| S12 | 04 | 本文（世代名と寸法） | Spectrum 記事の要約を正確に（ゲート長とハーフピッチに一致していた → 1990 年代半ばに分かれ始め → やがてどの寸法も表さなくなった） |
| S13 | 04 | 本文・`c04-names` | 「IRDS は世代名の代わりに G/M/T を使う」は言い過ぎ（IRDS の表はラベルと並べて書いている）→「世代のラベルと並べて」 |
| S14 | 04 | 本文 | Micron 1α の出典が転載であることを本文にも明記 |
| S15 | 04 | 本文 | 「QLC」の説明を章内で追加 |
| S16 | 04 | 節目の箇条書き | EUV の章内初出に正式名を追加（GLOSSARY §3-2） |
| S17 | 05 | 冒頭 | 「同じチップを何百個も」→「多数」（根拠のない桁の言い切りを避けた） |
| S18 | 05 | ノッチの節 | `<110>` を `&lt;110&gt;` に（HTML のタグと誤読されないように） |
| S19 | 05 | 出荷面積の節 | HBM の章内初出に説明を追加 |
| S20 | 05 | 現場でのつながり | OHT の章内初出に説明を追加 |

### 軽微（残したもの）

| # | 章 | 内容 | 理由・推奨 |
|---|---|---|---|
| R1 | 01〜05 | 確認問題が各章 5 問（CHAPTER-BRIEF は 3 問）。正答の添字がすべて 0（spec §7.2-6 は「同じ添字を 2 回まで」） | 表示時にシャッフルされるので、読者への影響はない。規則に合わせるなら土台担当が方針を決める |
| R2 | 01・02 | `xsec` の演出 `fx: 'implant'` を、キャリアの拡散（01）と電子が集まる様子（02）に使っている | イオン注入の演出と誤解されうる。合う演出が一覧にないので、基盤への要望として残す |
| R3 | 04 | `c04-irds` の見出しが「予測」だが、2018・2020 年の列は 2021 年版の時点で過去の年 | 「ロードマップ上の値」とだけ書くほうが正確。表現の調整のみ |
| R4 | 03 | MEMS、CPU・GPU の正式名が章内で未記載 | 一般語として通じるが、GLOSSARY §3 を厳密に守るなら追記 |
| R5 | 03・04 | SK hynix 321 層（Evertiq の転載）は、本文で転載と明記済み。SK hynix 自身のページは今回取得できず | 同社の Newsroom の原文が取れたら差し替え |

## Web で再確認した項目（15 件）

| # | 項目 | 結果 | URL |
|---|---|---|---|
| 1 | バンドギャップ Si 1.12、GaAs 1.42、4H-SiC 3.26、GaN 3.39 eV | 一致 | https://nanoscalereslett.springeropen.com/articles/10.1186/s11671-021-03554-7/tables/1 |
| 2 | Intel 2011-05-04：22 nm で Tri-Gate、Ivy Bridge は年末までに高量産の準備 | 一致（原文に差し替え） | https://www.intc.com/news-events/press-releases/detail/655/intel-reinvents-transistors-using-new-3-d-structure |
| 3 | Samsung 2022-06-30：3 nm の GAA（MBCFET）で「initial production」 | 一致（「量産」と書いていない点も正しい） | https://news.samsung.com/global/samsung-begins-chip-production-using-3nm-process-technology-with-gaa-architecture |
| 4 | TSMC：N3 は 2022 年に量産、N4 は 2022 年、N4P は 2023 年、N2 はナノシートで量産年の記載なし | 一致（ただし M7） | https://www.tsmc.com/english/dedicatedFoundry/technology/platform_mobile_tech_advancedTech.htm |
| 5 | Intel 2025-10-09：Fab 52 は稼働済み、18A で年内に高量産へ。RibbonFET・PowerVia。Panther Lake は 18A の最初の製品 | 一致（英語版に差し替え） | https://www.intc.com/news-events/press-releases/detail/1752/intel-unveils-panther-lake-architecture-first-ai-pc |
| 6 | ムーアの法則：1965 年に毎年倍、1975 年に 2 年ごとに見直し | 一致 | https://www.computerhistory.org/revolution/digital-logic/12/267 |
| 7 | IEEE Spectrum 2020-07-21：1990 年代半ばにゲート長とハーフピッチが分かれた、G48M36T1 | 一致（要約を S12 で修正） | https://spectrum.ieee.org/a-better-way-to-measure-progress-in-semiconductors |
| 8 | IRDS 2021 Lithography：世代名は最小ハーフピッチと同じでない、LITH-2 の 2018〜2028 年の G/M 値 5 行 | 5 行とも一致 | https://irds.ieee.org/images/files/pdf/2021/2021IRDS_Litho.pdf |
| 9 | IRDS の最新版は 2026 年版 | 一致 | https://irds.ieee.org/editions/ |
| 10 | Micron 2021-01-26：1α の量産出荷、1z と比べてメモリ密度 40% 向上 | 一致（転載でのみ確認） | https://aphnetworks.com/news/23378-micron-delivers-industrys-first-1a-dram-technology |
| 11 | Micron 2025-06-03：1γ の LPDDR5X の認定用サンプルを出荷、EUV を使う | 一致 | https://micron.gcs-web.com/node/48831 |
| 12 | Semiconductor Engineering 2019-11-21：1x 17〜19、1y 14〜16、1z 11〜13 nm | 一致 | https://semiengineering.com/dram-scaling-challenges-grow |
| 13 | WACKER：シーメンス法、トリクロロシラン、約 1,000 °C、不純物は ppt の桁 | 一致 | https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html |
| 14 | SEMI 2026-02-10：2025 年の出荷面積 12,973 百万平方インチ、5.8% 増、AI 向けロジック・HBM で 300 mm が強い | 一致 | https://www.semi.org/en/semi-press-release/semi-reports-2025-annual-worldwide-silicon-wafer-shipments-and-revenue-results |
| 15 | SEMI M1-0924（Current、目的は共通装置のための寸法の標準化、100 mm 以上は SI 単位）／M31-0718（Inactive の定義、製造工程では使わない、扉は購入者が指定） | 一致 | https://store-us.semi.org/products/m00100-semi-m1-specification-for-polished-single-crystal-silicon-wafers ／ https://store-us.semi.org/products/m03100-semi-m31-specification-for-mechanical-features-of-front-opening-shipping-box-used-to-transport-and-ship-300-mm-wafers |

補助的に確認したもの：Siltronic 製品ページ（300 mm は両面研磨、200 mm 以下は片面が一般的、FZ は IGBT などに向く、エピの定義。一致）、MicroChemicals（CZ は 1,400 °C 以上・石英るつぼ・酸素、FZ は低酸素・高抵抗・最大 8 インチ・費用は 3〜4 倍。一致）。

**再確認できず**：SK hynix 321 層 QLC（同社の Newsroom は取得できず。転載と、同じ日付の複数の報道で内容は一致）、TSMC の N2 量産開始（一次資料は取得できず。M7）、WSTS Product Classification 2018、Entegris の FOUP データシート（13 スロット）、SVM の仕様書 SV031（&lt;110&gt;）、University Wafer（厚さの目安・450 mm）、Semiconductor Engineering 2014（450 mm）、Miraial の FOSB ページ。いずれも件数の上限のため今回は開いていない。

**報道・転載だけが根拠の項目**：Micron 1α（転載）と SK hynix 321 層（Evertiq の転載）は、本文と参照資料の両方に「転載」と書いてある。Intel 2011 は原文に差し替えた。

## 表現と用語

- 文は短く、です・ます調で統一されている。60 字を超える文は少数（第05章の SEMI M1 の説明など）で、意味は通る。
- 優劣の評価や投資の推奨と読める記述はない。企業間の比較は「等号で比べない」と各所で断っている。
- 原文をなぞった長い引用はない（英語の引用は数語の言い回しだけ）。
- 用語集は §8 の割り当てどおりで、章をまたいだ重複はない。ウェーハ、メモリ、リソグラフィ、歩留まりなどの表記は GLOSSARY と一致。
- 章の間の食い違いは M1（第02章のリークと第03章の「抜けません」）、S11（ロジックの範囲）、M6（321 層の重複）で、どれも直した。

## 公開の判断

小さな修正を入れた現状で、第1部は公開してよい水準です。公開前の注意は 2 点です。(1) TSMC N2 の量産について、TSMC の一次資料で確かめて第02・04章の表を更新すること（M7）。(2) 450 mm の節の出典を強いものに替えること（M8）。
