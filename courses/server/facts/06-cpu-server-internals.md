第06章 事実確認表（担当 B、確認 2026-11-14）

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 発表 | AMD は 2024-10-10 に 5th Gen AMD EPYC CPU を発表した。製品名は AMD EPYC 9005 シリーズ（旧コードネーム Turin） | — | 2024-10-10 | AMD『AMD Launches 5th Gen AMD EPYC CPUs, Maintaining Leadership Performance and Features for the Modern Data Center』 | https://www.amd.com/en/newsroom/press-releases/2024-10-10-amd-launches-5th-gen-amd-epyc-cpus-maintaining-le.html | ○ | 2026-11-14 | 本文「CPU 製品の公開仕様」、c06-cpu 1 行目 |
| 2 | 仕様値 | EPYC 9005 シリーズ：1 CPU あたり 8〜192 コア、DDR5 を 12 チャネル、既定の TDP は 125 W〜500 W、SP5 プラットフォームと互換（ソケット数は資料に記載なし） | 8〜192 コア／12 チャネル／125〜500 W | 2024-10-10 | 同上 | 同上 | ○ | 2026-11-14 | c06-cpu 1 行目 |
| 3 | 仕様値 | Intel Xeon 6980P：128 コア、TDP 500 W、メモリチャネル最大 12、DDR5 6400 MT/s・MRDIMM 8800 MT/s、PCIe 5.0 で最大 96 レーン、スケーラビリティ 2S、発売 Q3'24 | 128 コア／500 W／12 チャネル／6400・8800 MT/s／96 レーン | Q3'24 発売（ページの確認 2026-11-14） | Intel『Intel Xeon 6980P Processor (504M Cache, 2.00 GHz) Product Specifications』 | https://www.intel.com/content/www/us/en/products/sku/240777/intel-xeon-6980p-processor-504m-cache-2-00-ghz/specifications.html | ○ | 2026-11-14 | c06-cpu 2 行目、本文「ソケット」 |
| 4 | 仕様値 | NVIDIA Grace CPU Superchip：2 つの Grace CPU チップでできたモジュール、合計 144 コア（72×2、Arm Neoverse V2）、LPDDR5X（240 GB・480 GB・960 GB の選択肢）、「CPU とメモリで 500 W」、2 つのチップは NVLink Chip-to-Chip（C2C）で最大 900 GB/s、「2 ソケットのサーバーの中心を小さなモジュールにしたもの」と説明 | 144 コア／500 W／900 GB/s | 2026-11-14 に確認（ページに日付なし） | NVIDIA『Introducing the NVIDIA Grace CPU Superchip』 | https://www.nvidia.com/en-us/data-center/grace-cpu-superchip/ | ○ | 2026-11-14 | c06-cpu 3 行目、本文「ソケット」 |
| 5 | 定義 | Intel は TDP を「最大の理論上の負荷のときの消費電力（W）」と説明し、軽い負荷では TDP を下回る、ターボなどで一時的に TDP を超えることもある、と書く（TDP は測定した値ではなく設計の目安） | — | ページ表示の最終確認日 2023-04-04 | Intel『Thermal Design Power (TDP) in Intel Processors』 | https://www.intel.com/content/www/us/en/support/articles/000055611/processors.html | ○ | 2026-11-14 | 本文「TDP・消費電力・定格」 |
| 6 | 企業 | Intel の本社は米国（Intel 自身のページが「Santa Clara is home to Intel's headquarters」と記す。カリフォルニア州サンタクララ） | — | 2026-11-14 に確認 | Intel『Intel in California』 | https://www.intel.com/content/www/us/en/corporate-responsibility/intel-in-california.html | ○ | 2026-11-14 | 本文（初出の括弧） |
| 7 | 企業 | AMD の主たる事務所は米国カリフォルニア州サンタクララ（Form 8-K の表紙。報告日 2026-08-04） | — | 2026-08-04 | AMD『Form 8-K（報告日 2026-08-04）』表紙 | https://ir.amd.com/financial-information/sec-filings/content/0000002488-26-000121/0000002488-26-000121.pdf | ○ | 2026-11-14 | 本文（初出の括弧） |
| 8 | 企業 | NVIDIA の本社（NVIDIA Corporate）は米国カリフォルニア州サンタクララ（同社『Contact Us』の拠点一覧の表記） | — | 2026-11-14 に確認 | NVIDIA『Contact Us: Americas Locations & Regional Offices』 | https://www.nvidia.com/en-us/contact/ | ○ | 2026-11-14 | 本文（初出の括弧） |
| 9 | 一般知識 | 筐体の前後の構成（前面のドライブ、ファン列、CPU とメモリ、背面の拡張と電源ユニット）、エアシュラウドの役割、ライザーカード、冗長な電源ユニット、FRU、ホットスワップ。数値は使わない。構成は製品で違う | — | — | サーバーメーカーの保守文書に共通する一般的な説明（特定の資料なし） | —（数値を伴わない一般知識） | × | 2026-11-14 | c06-top、c06-wiring、c06-parts、本文 |
| 10 | 一般知識 | 演習の障害メッセージ 3 件はすべて架空 | — | — | 架空（見本のため） | — | × | 2026-11-14 | c06-choose |

確認できず書かなかった：
- Intel Xeon 6 の他の系列（6700P・6500P など）の公開値：Intel の製品一覧ページは取得できなかったため、個別 SKU の仕様ページで確認できた 6980P だけを書いた。
- AMD EPYC 9005 の 1 ソケット・2 ソケットの構成可否：AMD の発表ページに記載がなく、個別 SKU の仕様ページも確認できなかったため、書かなかった。
- AMD の cTDP（設定できる TDP）の意味：個別ページを確認できなかったため、「既定の TDP」という発表の言葉だけを書いた。
- 冗長電源・ホットスワップ対応の実装率や、ファンの冗長の統計：公開資料を確認できなかったため、一般論の言葉だけにした。
