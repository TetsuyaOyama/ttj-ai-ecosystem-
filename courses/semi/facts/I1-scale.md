# 序章1 事実確認表（髪の毛からトランジスタまで：小ささと数の多さ）、確認 2026-11-18

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 企業 | Intel は 2017 年に「10 nm」世代として、ゲートの間隔（CPP）54 nm、最小メタルピッチ 36 nm、フィンの間隔 34 nm、論理回路のトランジスタ密度 100.8 MTr/mm² を示した。「14 nm」は CPP 70・メタル 52・フィン 42、密度 37.5（棒グラフに添えられた数値。IEEE Spectrum 2017-03-30〔Rachel Courtland〕の 100.8・37.5 と一致。検証 2026-11-18）。Intel の公式サイト上の版（ニュースルーム）は、この環境から開けず、写しのまま。社名変更：なし。 | 54／36／34 nm、100.8 MTr/mm² | 2017 年（日付は 2017-03-28 の注意書きのみ） | Intel『Technology and Manufacturing Day 2017』（Kaizad Mistry の資料）。大学の講義サイト上の写しで確認 | https://faculty-web.msoe.edu/johnsontimoj/EE4980/files4980/Kaizad-Mistry-2017-Manufacturing.pdf | △ | 2026-11-18 | cI1-nodes、cI1-hair、cI1-bundle、ズーム |
| 2 | 規格 | IRDS 2021 年版のロードマップ上の世代ラベルと寸法（7：G54M36、3：G45M24 ほか。2.1・1.5 を含む）。ラベルは実寸ではない。 | 第04章 data/04-scaling-and-nodes.js 90〜100 行の表 | 2021 年版 | IEEE IRDS『2021 IRDS Lithography』（第04章で確認） | https://irds.ieee.org/images/files/pdf/2021/2021IRDS_Litho.pdf | ○ | 2026-11-18 | cI1-nodes、cI1-quiz 問1 |
| 3 | 企業 | Intel 4004 は 1971 年、トランジスタ 2,300 個、回路の線幅 10 μm。社名変更：なし。 | 2,300 個、10 μm | 1971 年の製品（ページの日付なし） | Intel『Intel's First Microprocessor』 | https://www.intel.com/content/www/us/en/history/museum-story-of-intel-4004.html | ○ | 2026-11-18 | cI1-stair、cI1-chips |
| 4 | 発表 | 65 nm 世代の二酸化シリコンのゲート絶縁膜は 1.2 nm（原子 5 層分）。 | 1.2 nm | 2007-01-27 | Intel『Intel's Transistor Technology Breakthrough…』プレスリリース | https://intel.com/pressroom/archive/releases/2007/20070128comp.htm | ○ | 2026-11-18 | cI1-stair、cI1-conv、cI1-zoomfig 手7 |
| 5 | 企業 | NVIDIA GH100（H100）は 800 億個、ダイ面積 814 mm²、TSMC 4N。社名変更：なし。平均密度 98.28 MTr/mm² は計算（検算）。 | 80 B、814 mm² | 2022-03-22（ページ更新 2025-07） | NVIDIA『NVIDIA Hopper Architecture In-Depth』 | https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/ | ○ | 2026-11-18 | cI1-chips、cI1-bundle の H100 級 |
| 6 | 発表 | Apple M2 Ultra は 1,340 億個（M1 Ultra より 200 億個多い）。2 つの M2 Max のダイを UltraFusion でつないだもの（合計）。第 2 世代の 5 nm プロセス（Apple の呼び方）。ダイ面積は書かれていない。 | 134 B | 2023-06-05 | Apple『Apple introduces M2 Ultra』 | https://www.apple.com/newsroom/2023/06/apple-introduces-m2-ultra/ | ○ | 2026-11-18 | cI1-chips |
| 7 | 企業 | Cerebras WSE-3 は 4 兆個、ダイ 46,225 mm²（ウェーハ 1 枚をほぼ 1 チップに）、TSMC 5 nm。ページ日付は 3 月 11 日と 13 日で食い違い、13 日を採用。面積はプレスリリースになく、製品ページ（2026-11 時点は WSE-3T の説明で同じ値）と IEEE Spectrum 2024-03-13 で照合。社名変更：なし。 | 4 T、46,225 mm² | 2024-03-13 | Cerebras『Cerebras Announces Third Generation Wafer Scale Engine』『Product: Chip』 | https://www.cerebras.ai/press-release/cerebras-announces-third-generation-wafer-scale-engine | ○ | 2026-11-18 | cI1-chips、cI1-hair |
| 8 | 企業 | ASML EUV NXE:3600D の matched machine overlay の仕様は 1.1 nm（スライド 10）、NXE:3800E の受入試験（ATP）の目標 MMO は 0.9 nm 以下（スライド 17、2023 年 6 月の状況）。NXE:3600D の on-product overlay は 1.7 nm（スライド 9）。社名変更：なし。 | 1.1 nm／≦0.9 nm | 2023 年（3800E は 2023 年 6 月の状況） | ASML（Raymond Maas、EUVL Conference 2023『EUV Industrialization』） | https://euvlitho.com/2023/P62.pdf | ○ | 2026-11-18 | cI1-overlay、cI1-quiz 問2 |
| 9 | 企業 | 最先端の重ね合わせは 2 nm より良い。社名変更：なし。 | < 2 nm | 2021-12-22 | ASML『Aligning lithography to the nanometer』（第08章で確認） | https://www.asml.com/company/stories/2021/fellow-simon-mathijssen-aligning-lithography-nanometer | ○ | 2026-11-18 | cI1-overlay の 3 つ目の例 |
| 10 | 市場 | 世界人口は 82 億人（2024 年）。条件：国連の推計（中位）。 | 8.2 billion | 2024 年版 | 国連 UN DESA『World Population Prospects 2024: Key Messages』 | https://population.un.org/WPP/Publications/Files/WPP2024_Key-Messages.pdf | ○ | 2026-11-18 | cI1-bundle の「世界人口 1 人あたり」 |
| 11 | 仕様値 | コロナウイルスの粒子は 60〜140 nm（スパイクを含めて約 100 nm）。条件：電子顕微鏡の観察。 | 60〜140 nm | 2021-02-18 公開 | 米国 CDC『Emerging Infectious Diseases 27(4)』Bullock ら | https://wwwnc.cdc.gov/eid/article/27/4/20-4337 | ○ | 2026-11-18 | cI1-stair、cI1-circles、cI1-area |
| 12 | 仕様値 | 赤血球の直径 7.7 μm（Cell Size Database の平均）、別資料 8 μm（Rosen 1967）。条件：ヒト。範囲で書く。 | 7.7／8 μm | — | Harvard BioNumbers BNID 108239・100798 | https://bionumbers.hms.harvard.edu/bionumber.aspx?s=n&v=0&id=108239 | △ | 2026-11-18 | cI1-stair、cI1-circles、cI1-zoom |
| 13 | 仕様値 | 大腸菌は長さ 1.78 ± 0.54 μm、幅 0.49 ± 0.03 μm。条件：電子顕微鏡の測定。 | 1.78／0.49 μm | Microscopy 2017 | BioNumbers BNID 117344（Yamada ら） | https://bionumbers.hms.harvard.edu/bionumber.aspx?id=117344&ver=3&trm=&org= | △ | 2026-11-18 | cI1-stair、cI1-circles |
| 14 | 仕様値 | DNA の二重らせんの直径は約 2 nm（塩基対の間隔 0.34 nm）。条件：一般的な B 型の目安。 | 約 2 nm | — | BioNumbers『Key Numbers』 | https://bionumbers.hms.harvard.edu/Includes/KeyNumbersLinks.pdf | △ | 2026-11-18 | cI1-stair |
| 15 | 仕様値 | 髪の毛の直径は 17〜181 μm（Ley の調べ）。学生の電子顕微鏡の測定は 60〜77 μm。代表値 70 μm は本章の取り決め（模型）。条件：人・部位で違う。 | 17〜181 μm | 1999・2011 年 | Brian Ley『Diameter of a Human Hair』The Physics Factbook（Glenn Elert 編） | https://hypertextbook.com/facts/1999/BrianLey.shtml | △ | 2026-11-18 | cI1-stair、cI1-hair、cI1-quiz 問3 |
| 16 | 仕様値 | コピー用紙の厚さの目安 約 90 μm。例：坪量 64 g/m² の W-Paper の紙厚 87 μm。条件：製品で違う（目安と明記）。 | 87 μm | 確認 2026-11-18 | 富士フイルムビジネスイノベーション『W-Paper』製品情報 | https://www.fujifilm.com/fb/ja/support/supply/paper/w-paper | ○ | 2026-11-18 | cI1-stair（身近な例のみ） |
| 17 | 仕様値 | シリコンの格子定数 a = 5.431 020 511 × 10⁻¹⁰ m（真空中、22.5 ℃）。隣り合う原子の間隔 √3a/4 = 2.3517 Å は計算。条件：22.5 ℃。 | 0.5431 nm | CODATA 2018 | NIST『CODATA 2018: X-ray values』 | https://pml.nist.gov/cuu/pdf/xray_2018.pdf | ○ | 2026-11-18 | cI1-stair、cI1-conv、cI1-zoom、cI1-overlay |
| 18 | 規格 | ISO 14644-1:2015 表 1 の上限（0.5 μm：ISO 3 = 35、5 = 3,520、7 = 352,000、9 = 35,200,000 個/m³）。式 Cn = 10^N × (0.1/D)^2.08 で一致。第18章の値を使用。 | 第18章 data/18-fab-cleanroom-utilities.js 84〜95 行、本文 32 行 | 2015 年（第 2 版） | ISO『14644-1:2015』（第18章で確認、規格本文は有料） | — | ○ | 2026-11-18 | cI1-clean |
| 19 | 一般知識 | ISO 3〜5 がウェーハ・チップの環境でよく指定される。 | — | 2021 年 9 月 | ASHRAE Journal（第18章で確認） | — | △ | 2026-11-18 | cI1-clean の場所の表 |
| 20 | 仕様値 | 手術室を運転中に測った清浄度（フィンランド）。条件：病院・運用で違い、規格が決めた値ではない。 | VTT Technology 168 の記載範囲 | 2014 年 | VTT『Cleanroom Classification Studies and Airborne Bioburden Particles in Operating Theatres』 | https://cris.vtt.fi/en/publications/cleanroom-classification-studies-and-airborne-bioburden-particles/ | ○ | 2026-11-18 | cI1-clean の場所の表（規格値は載せない） |
| 21 | 一般知識 | （削除）ISO 9 を「ふつうの部屋の空気に近い」とする記述は、解説ページ（CASRAI）しか根拠がなく、第18章にもないため、検証（2026-11-18）で本文・部品から外した。 | — | — | — | — | — | 2026-11-18 | なし |
| 22 | 仕様値 | 条件：論理素子で最も厳しい場合。致命的な粒子の大きさの目安は 3.0 nm。 | 3.0 nm | 2024 年版 | IEEE IRDS『2024 Yield Enhancement』（第13章で確認）。第13章 26 行 | — | ○ | 2026-11-18 | 本文の清浄さの節 |
| 23 | 発表 | JASM・TSMC の熊本（菊陽町）の工場の認定計画：生産能力 5.5 万枚/月（12 インチ換算）。条件：認定された計画の値で実績ではない。初回出荷 2024 年 12 月（計画の記載）。本章は例として使い、計算は「仮定」と明記。 | 5.5 万枚/月 | 認定 2022-06-17 | 経済産業省『特定半導体生産施設整備等計画の概要』 | https://www.meti.go.jp/policy/mono_info_service/joho/laws/semiconductor/semiconductor_plan/nintei_tokuteihandoutai_keikaku01.pdf | ○ | 2026-11-18 | cI1-bundle の月産の例 |
| 24 | 一般知識 | 条件：既存章の値。ウェーハ直径 150・200・300 mm。厚さ 775 μm（300 mm）。EUV の波長 13.5 nm。いずれも既存章の値。 | 第05章 data/05-wafer.js 52 行、第08章 44 行 | — | 第05章・第08章（SEMI M1、ASML） | — | ○ | 2026-11-18 | cI1-conv、cI1-zoom、cI1-stair |
| 25 | 一般知識 | 取れるチップ数の近似式 π(d/2)²/S − πd/√(2S)、ポアソンの歩留まり Y = exp(−D0·A)、CMOS の NAND は 4 素子、ダイヤモンド構造の格子。教科書・一般知識で、原典のページは開いていない。 | — | — | 半導体・集積回路の教科書（ページ未確認） | — | ×（教科書。原典未確認） | 2026-11-18 | cI1-bundle、cI1-yield、cI1-stair |
| 26 | 定義 | 仮定（模型）：歩留まり、欠陥密度、月産の枚数、1 ロット 25 枚、1 か月 30 日、倍率 1 倍の画面の幅 300 mm。実績ではない。 | — | — | この講座の取り決め | — | — | 2026-11-18 | cI1-bundle、cI1-yield、cI1-zoom |

## 検算（node で確認。同じ行を data/I1-scale.js の冒頭にも置く）

検算 髪の毛の断面積（mm²、直径_70_μm）: 0.0038485 = 3.14159265 * (0.035 * 0.035)
検算 髪の毛の断面に入るトランジスタ（個、100.8_MTr/mm²）: 387924 = 0.0038485 * 100.8 * 1000000
検算 髪の毛の断面（直径_17_μm、100.8）: 22880 = 3.14159265 * (0.0085 * 0.0085) * 100.8 * 1000000
検算 髪の毛の断面（直径_181_μm、100.8）: 2593627 = 3.14159265 * (0.0905 * 0.0905) * 100.8 * 1000000
検算 H100_の平均密度（MTr/mm²）: 98.28 = 80000 / 814
検算 WSE-3_の平均密度（MTr/mm²）: 86.53 = 4000000 / 46225
検算 H100_のダイ面積から正方形に直した_1_辺（mm）: 28.53 = 814 ** 0.5
検算 WSE-3_がウェーハ（300_mm）の面積に占める割合: 0.6539 = 46225 / (3.14159265 * 150 * 150)
検算 トランジスタ_1_個あたりの面積（nm²、100.8）: 9921 = 1000000000000 / (100.8 * 1000000)
検算 直径_100_nm_の円の面積（nm²）: 7854 = 3.14159265 * 50 * 50
検算 トランジスタ_1_個の面積_÷_直径_100_nm_の円の面積: 1.263 = 9921 / 7854
検算 シリコンの隣り合う原子の間隔（Å）: 2.3517 = 5.431020511 * 1.7320508 / 4
検算 1_辺_28.5_mm・直径_300_mm_のとり数（個）: 63.64 = 3.14159265 * 150 * 150 / (28.5 * 28.5) - 3.14159265 * 300 / (2 * 28.5 * 28.5) ** 0.5
検算 1_辺_12_mm・直径_300_mm_のとり数（個）: 435.34 = 3.14159265 * 150 * 150 / (12 * 12) - 3.14159265 * 300 / (2 * 12 * 12) ** 0.5
検算 良品（63_個_×_歩留まり_70%）: 44.1 = 63 * 70 / 100
検算 良品のトランジスタ総数（80_B、44.1_個）: 3528000000000 = 44.1 * 80000000000
検算 世界人口_1_人あたり（個/人、8.2_B）: 430.24 = 3528000000000 / 8200000000
検算 月産_5.5_万枚の_1_か月（個）: 194040000000000000 = 3528000000000 * 55000
検算 1_秒あたり（個/秒、30_日）: 74861111111 = 194040000000000000 / (30 * 86400)
検算 重ね合わせ_1.1_nm_を_300_km_/_300_mm_で拡大（mm）: 1.1 = 1.1 * 300 / 300
検算 重ね合わせ_1.1_nm_を_400_km_/_300_mm_で拡大（mm）: 1.4667 = 1.1 * 400 / 300
検算 シリコンの格子定数（0.5431_nm）を_300_km_/_300_mm_で拡大（mm）: 0.5431 = 0.5431 * 300 / 300
検算 重ね合わせ_1.1_nm_÷_配線の間隔_36_nm（%）: 3.056 = 1.1 / 36 * 100
検算 ISO_5_と_ISO_7_の上限の比（0.5_μm）: 100 = 352000 / 3520
検算 ISO_9_と_ISO_5_の上限の比（0.5_μm）: 10000 = 35200000 / 3520
検算 ISO_5_の上限を_1_リットルに直した個数: 3.52 = 3520 / 1000
検算 ISO_9_の上限を_1_リットルに直した個数: 35200 = 35200000 / 1000
検算 ISO_5_で粒子_1_個が入る空気の体積（L）: 0.2841 = 1000 / 3520
検算 ズーム_300_μm_の幅に入る髪の毛（70_μm）の本数: 4.286 = 300 / 70
検算 ズーム_30_μm_の幅に入る赤血球（7.7_μm）の個数: 3.896 = 30 / 7.7
検算 ズーム_3_μm_の幅に入る配線（36_nm）の本数: 83.33 = 3000 / 36
検算 ズーム_300_nm_の幅に入るゲートの間隔（54_nm）: 5.556 = 300 / 54
検算 ズーム_30_nm_の幅に入る_EUV_の波長（13.5_nm）: 2.222 = 30 / 13.5
検算 ズーム_3_nm_の幅に入るシリコンの格子（0.5431_nm）: 5.524 = 3 / 0.5431
検算 髪の毛と赤血球の面積の比（70_μm_と_7.7_μm）: 82.64 = (70 / 7.7) * (70 / 7.7)
検算 赤血球と大腸菌（幅_0.49_μm）の断面の面積の比: 246.9 = (7.7 / 0.49) * (7.7 / 0.49)

検算 ウェーハの直径（300_mm）と_Si_の格子定数（0.5431_nm）の比: 552384460 = 300000000 / 0.5431
検算 円の段④：ウイルス（直径_100_nm）の円の半径（トランジスタ_1_個の面積の円を_100_とする）: 88.98 = 100 * (7853.98 / 9920.63) ** 0.5

## 載せなかったもの（確かめる資料がなく、本文・図から外した）
- フィンの幅。東京－大阪などの都市間の距離（距離のつまみは km だけ）。世界全体の月産の枚数。手術室の規格値。A17 Pro のトランジスタ数。FOUP と 1 ロット 25 枚の実績（仮定に変えた）。
- 「数百 km が鉛筆の芯」の類の比喩、東京から 300 km が本州のどこかという比喩（確認できず削除）。

## 弱い資料・二次の資料
- Intel の資料は大学サイト上の写し（IEEE Spectrum で照合済み）。教科書の式は原典未確認（取れる数の近似式は、販売・解説サイト〔AnySilicon〕の式と同じ形）。
- 検証（2026-11-18）で差し替え：JASM は経済産業省の認定計画へ、コピー用紙は製紙・事務機メーカーの製品情報へ。CASRAI の記述は削除。
