/* 第08章 事実確認表（担当 C、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 仕様値 | TIM は、ヒートスプレッダとクーラーの間の隙間を埋めて熱を伝えやすくする材料。すべての CPU に TIM が要る。箱入りのクーラーは TIM が先に付いていることが多く、付いていれば足さなくてよい | — | Last Reviewed 2023-03-10 | Intel『Do I Need to Use Thermal Solution and Thermal Paste for Intel® Core™ Processors?』 | https://www.intel.com/content/www/us/en/support/articles/000037209/processors.html | ○ | 2026-11-14 | 本文「熱の伝わる道」、c08-tim |
| 2 | 仕様値 | TIM に触れない。使った TIM の上に新しい TIM を重ねない | — | Last Reviewed 2025-01-30 | Intel『How to Apply or Remove Thermal Interface Material (TIM)』 | https://www.intel.com/content/www/us/en/support/articles/000005576/processors.html | ○ | 2026-11-14 | 本文「熱の伝わる道」 |
| 3 | 仕様値 | サーマルスロットリングは、温度が上限（TJ Max）を超えたときにクロックを下げる保護の仕組み。確かめる項目は 5 つ（クーラーが CPU に合うか、正しく付いているか、TIM の量、ファンが動くか、空気の通り） | 5 項目 | Last Reviewed 2026-04-09 | Intel『What Is Throttling and How Can It Be Resolved?』 | https://www.intel.com/content/www/us/en/support/articles/000088048/processors.html | ○ | 2026-11-14 | 本文「温度の上限と保護」、c08-quiz |
| 4 | 仕様値 | ヒートスプレッダ上で測る温度の値（Tcase）がある。冷やしきれないときは部品が自動で止まり、永続的な損傷を防ぐ | — | Last Reviewed 2025-02-06 | Intel『Information about Temperature for Intel® Processors』 | https://www.intel.com/content/www/us/en/support/articles/000005597/processors.html | ○ | 2026-11-14 | 本文「熱の伝わる道」「温度の上限と保護」 |
| 5 | 規格 | ファンの制御に PWM を挙げ、制御線は 4 本目のピン。信号の周波数は 21・25・28 kHz（最小・標準・最大）。資料は旧く、PWM 仕様書の版は未確認 | 21／25／28 kHz | Order No. 328900-003、2013-12 | Intel『Desktop 4th Generation Intel® Core™ Processor Family … Thermal Mechanical Design Guidelines』 | https://www.intel.com/content/dam/www/public/us/en/documents/design-guides/4th-gen-core-family-desktop-tmsdg.pdf | ○ | 2026-11-14 | 本文「ファン」 |
| 6 | 仕様値 | システムのファンの回転数は PWM の信号で決まり、信号のオンの割合（デューティ）を変えて回転数を変える | — | 日付の記載なし | Intel『Information on Intel® Boxed Desktop Thermal Solutions』 | https://www.intel.com/content/www/us/en/support/articles/000034831.html | ○ | 2026-11-14 | 本文「ファン」、用語集 |
| 7 | 仕様値 | 空冷クーラーの仕様ページは、高さを「ファンを付けた場合」「付けない場合」に分けて載せ、対応ソケットの一覧と、メモリとの干渉の注記を持つ | — | 日付の記載なし | Noctua『NH-U12S redux: Specifications』 | https://noctua.at/en/nh-u12s-redux/specification | ○ | 2026-11-14 | 本文「CPU クーラー」、c08-cooler |
| 8 | 仕様値 | ファンの枠の寸法は 120×120×25 mm（防振パッドを除く）、取り付け穴の間隔は 105×105 mm。風量・静圧・騒音は最大値の表記（max.）。定格電圧・始動電圧・最大動作電圧の欄がある | 120 mm／105 mm | 日付の記載なし | Noctua『NF-P12 redux-1700 PWM: Specifications』 | https://www.noctua.at/en/products/nf-p12-redux-1700-pwm/specifications | ○ | 2026-11-14 | 本文「ファン」 |
| 9 | 仕様値 | 同ファンは、CPU やラジエータの冷却のように圧力が要る用途に向けたもの。4 ピンの PWM の表記 | — | 日付の記載なし | Noctua『NF-P12 redux-1700 PWM』 | https://www.noctua.at/en/products/nf-p12-redux-1700-pwm | ○ | 2026-11-14 | 本文「ファン」 |
| 10 | 仕様値 | ケースの寸法の上限を「Maximum CPU Cooler Length」と表記する例 | — | 日付の記載なし | MSI『MAG FORGE 100R: Specification』 | https://in.msi.com/PC-Case/MAG-FORGE-100R/Specification | ○ | 2026-11-14 | 本文「ケース」 |
| 11 | 仕様値 | 別のケースのユーザーガイドは「Maximum CPU Cooler Height」と表記し、グラフィックスカードの長さの上限を前面のファンを付けた状態で測る | — | Version 2.0、2025-10 | MSI『MAG FORGE 330R AIRFLOW / 340R AIRFLOW User Guide』 | https://download-2.msi.com/archive/mnu_exe/case/MAGFORGE330R340RAIRFLOW_English.pdf | ○ | 2026-11-14 | 本文「ケース」、c08-case |
| 12 | 安全 | 一体型液冷のマニュアル 1 点：金具の締めすぎを避ける、ブロックの配管を下向きに付けるのを勧める、ポンプのヘッダー名はマザーボードごとに違う、形の似た別端子に差さない | — | Version 1.0、2026-07 | ASRock『Rock White 240 ARGB』マニュアル | https://download.asrock.com/Manual/Rock%20White%20240%20ARGB.pdf | ○ | 2026-11-14 | 本文「CPU クーラー」、c08-cooler |
| 13 | 一般知識 | 電力はほぼ熱になる。あたたまった空気は上へ向かう。正圧・負圧の説明 | — | — | 伝熱工学・熱力学の教科書的内容（一般知識） | — | × | 2026-11-14 | 本文「熱の基礎」「空気の流れ」 |

## 確認できず書かなかった
- 本格的な液冷の組み方の手順（方針により紹介のみ）
- 一体型液冷のマニュアルが「分解禁止」と明記しているか（ASRock の締めすぎ・向き・ヘッダーの注意のみ確認）
- ファンの枠の風向きの矢印の表記（出典なし）
- Intel 4 ピン PWM ファン仕様書そのものの版（Intel の 2013 年資料の引用のみ）
- 製品間のファンの風量・静圧・騒音の比較値（測定条件が製品ごとに違うため書かない）

## 定義と式の照合
本章に計算式はない。「熱の量は消費電力とほぼ同じ」（第02章・第12章と一致）。熱の計算式は使わない。
*/
