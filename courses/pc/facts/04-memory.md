第04章 事実確認表（担当 B、確認 2026-11-14）

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 規格 | JEDEC は DDR5 の標準 JESD79-5 を公表。開始は 4.8 Gbps（DDR4 の終わりは 3.2 Gbps）、電圧 1.2 V から 1.1 V、1 モジュールに独立した 40 ビット幅の副チャネル 2 つ、電圧調整回路がモジュール上 | 4.8／3.2 Gbps、1.1 V | 2020-07-14（現行の版は未確認） | JEDEC『JEDEC Publishes New DDR5 Standard…』 | https://www.jedec.org/news/pressreleases/jedec-publishes-new-ddr5-standard-advancing-next-generation-high-performance | ○ | 2026-11-14 | c04-gen、c04-label、本文 |
| 2 | 規格 | CAMM2 は JESD318。DDR5 と LPDDR5・LPDDR5X が対象。JESD318B は版 1.14（2025-11） | 版 1.14 | 2023-12-05／2025-11 | JEDEC『JEDEC Publishes New CAMM2 Memory Module Standard』、JESD318B のページ | https://www.jedec.org/standards-documents/docs/jesd318b | ○ | 2026-11-14 | c04-gen、本文 |
| 3 | 規格 | DDR4 の JEDEC のページ標題は「DDR4 SDRAM STANDARD」、2021 年 7 月の公表。改訂の記号は書かれていない | — | 2021-07 | JEDEC（JESD79-4） | https://www.jedec.org/standards-documents/docs/jesd79-4a | ○ | 2026-11-14 | c04-gen |
| 4 | 仕様値 | Micron のページ：DDR4 は 600〜3200 MT/s、DDR5 は 4800〜8800 MT/s（製品の範囲）、電圧 1.2 V と 1.1 V、MT/s と MHz の違いの説明 | 上記 | ©2023 | Micron Technology『DDR5 SDRAM』 | https://www.micron.com/products/memory/dram-components/ddr5-sdram | ○ | 2026-11-14 | c04-gen、本文 |
| 5 | 仕様値 | Kingston の用語集：MT/s、CL、DIMM・SO-DIMM・UDIMM、ECC、XMP・EXPO、デュアルチャネル。「DDR5-4800 or 4800MT/s」の書き方 | — | 確認 2026-11 | Kingston Technology『Kingston Glossary』 | https://www.kingston.com/en/memory/kingston-glossary | ○ | 2026-11-14 | 本文、c04-label |
| 6 | 仕様値 | Kingston の DDR5 の資料：切り欠きの位置が違い DDR4 のスロットに差せない。PMIC がモジュール上 | — | ©2022 | Kingston『DDR5 Collateral』 | https://media.kingston.com/kingston/articles/MKF_954-DDR5-Collateral_us.pdf | ○ | 2026-11-14 | c04-gen、quiz 問1 |
| 7 | 仕様値 | ASUS の FAQ：2 枚のときは DIMM_A2 と DIMM_B2 に差す。QVL のメモリを勧める | — | 更新 2026-02-23 | ASUS『FAQ 1047257』 | https://www.asus.com/support/faq/1047257/ | ○ | 2026-11-14 | 本文、quiz 問2 |
| 8 | 仕様値 | ASRock のマニュアル：デュアルチャネルには同じ組の DIMM が要る。1 枚や 3 枚では有効にならない | — | 確認 2026-11 | ASRock のマザーボードのマニュアル | （製品ごとのマニュアル。個別 URL は記載せず） | ○ | 2026-11-14 | 本文 |
| 9 | 仕様値 | Ryzen 5 9600X の対応メモリ：2x1R/2x2R は DDR5-5600、4x1R/4x2R は DDR5-3600。Core Ultra 7 265K：DDR5 は 6400 MT/s まで | 5600／3600／6400 | 確認 2026-11 | AMD／Intel の製品ページ | 第02章の表と同じ | ○ | 2026-11-14 | 本文、exam |
| 10 | 仕様値 | Intel Z890：ECC Memory Supported「No」。AMD Ryzen AI 7 450G：ECC「Yes (Requires mobo support)」 | — | 確認 2026-11 | Intel／AMD の製品ページ | 第03章・第02章参照 | ○ | 2026-11-14 | 本文「ECC」 |
| 11 | 保証 | Intel：XMP 2.0 は DDR4、XMP 3.0 は DDR5。クロックや電圧の変更は保証が無効になることがある | — | 最終確認日 2026-04-09 | Intel『XMP』（000094616） | https://www.intel.com/content/www/us/en/support/articles/000094616/processors.html | ○ | 2026-11-14 | 本文 |
| 12 | 企業 | Kingston の本社は米国（Fountain Valley, CA）。Micron の本社は米国（Boise）、ASUS は台湾、ASRock は台湾（第03章参照） | — | 2026 | Kingston の発表（https://www.kingston.com/en/company/press/article/63105）、micron.com | 第03章・上記 | Micron は△（「its Boise headquarters」の語のみ） | 2026-11-14 | 本文 |
| 13 | 一般知識 | メインメモリの役割、容量不足でストレージへ移る、CL の意味、2 チャネルの考え方。数値なし | — | — | 教科書共通 | — | × | 2026-11-14 | 本文 |
| 14 | 一般知識 | 架空の製品表記・マニュアル | — | — | 架空 | — | × | 2026-11-14 | c04-label、c04-practice |

確認できず書かなかった：
- JEDEC の DDR4・DDR5 の現行の改訂の記号と公表日（DDR5 の個別ページが読めなかった）
- CUDIMM の JEDEC の発表の内容
- Micron 本社の所在の個別の公式ページ（語のみ。本文では本社の国を書いていない）
