第06章 事実確認表（担当 B、確認 2026-11-14）

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 仕様値 | RTX 5070：12 GB GDDR7（192 ビット）、Total Graphics Power 250 W、Required System Power 650 W、最大の GPU の温度 85 ℃、長さ 242 mm・幅 112 mm・2 スロット、補助電源は 2 本の PCIe 8 ピン（付属のアダプタ）または 300 W 以上の PCIe Gen 5 ケーブル | 12 GB／250 W／650 W／242×112 mm | 確認 2026-11 | NVIDIA『GeForce RTX 5070 Family』 | https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/ | ○ | 2026-11-14 | c06-gpu、本文 |
| 2 | 仕様値 | RTX 5070 Ti：16 GB、TGP 300 W、Required System Power 750 W。脚注：Required System Power は Ryzen 9 9950X の構成に基づく値で、PCIe CEM 5.1 に合う電源ユニットを推奨 | 16 GB／300 W／750 W | 同上 | 同上 | 同上 | ○ | 2026-11-14 | c06-gpu、exam |
| 3 | 安全 | NVIDIA のクイックスタートガイド：最低 650 W、PCIe Gen5 の 16 ピンは付属のアダプタか 360 W 以上の Gen 5 ケーブル、プラグは差し込み口に隙間なく差す、付属のアダプタを使う、冷えるのを待つ、作業前に電源を切り抜く、必要な余裕 244×112×41 mm、基板の主な x16 スロットに取り付ける。「12V-2x6」の語は使わない | 244×112×41 mm | ©2025（R4） | NVIDIA『GeForce RTX 5070 Quick Start Guide』 | https://www.nvidia.com/content/geforce-gtx/geforce-rtx-5070-user-guide-r1.pdf | ○ | 2026-11-14 | 本文、quiz 問2 |
| 4 | 仕様値 | Radeon RX 9070 XT：16 GB GDDR6（256 ビット）、Typical Board Power (Desktop) 304 W、Minimum PSU Recommendation 750 W、Additional Power Connector 2x8-Pin、PCIe 5.0 x16、DisplayPort 2.1a・HDMI 2.1b。寸法・発売日の記載なし | 16 GB／304 W／750 W | 確認 2026-11 | AMD『AMD Radeon RX 9070 XT』 | https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9070xt.html | ○ | 2026-11-14 | c06-gpu、本文 |
| 5 | 仕様値 | Arc B580：発売 Q4'24、12 GB GDDR6、TBP 190 W、Minimum Power Supply Unit 600 W、PCIe 4.0 x8、1 本の 8 ピン、272×115 mm・2 スロット、HDMI 2.1・DP2.1 | 12 GB／190 W／600 W／272×115 mm | Q4'24 | Intel『Intel Arc B580 Graphics』 | https://www.intel.com/content/www/us/en/products/sku/241598/intel-arc-b580-graphics/specifications.html | ○ | 2026-11-14 | c06-gpu、本文 |
| 6 | 規格 | 12V-2x6 は PCIe CEM 5.1 で導入され 12VHPWR に代わる。12 V の線で 600 W。CEM 5.1 は連続で 675 W のカード電力を許す（本文では 600 W のみ使用）。PCI-SIG の原文は読めず、Intel の記述による | 600 W | 文書 336521 版 2.1a、2023-11-01 | Intel『ATX Version 3.0 Multi Rail Desktop Platform Power Supply Design Guide』 | https://edc.intel.com/content/www/us/en/design/ipla/software-development-platforms/client/platforms/alder-lake-desktop/atx-version-3-0-multi-rail-desktop-platform-power-supply-design-guide/2.1a/2.1a/pci-express-add-in-card-considerations/ | △（PCI-SIG の原文ではなく Intel の記述） | 2026-11-14 | 本文、glossary |
| 7 | 仕様値 | NVIDIA の CUDA の GPU 一覧に RTX 50 シリーズ。AMD の ROCm の Windows の対応表は ROCm 7.2.1・Windows 11・RX 9000 と 7000 シリーズで、Windows では完全な ROCm はまだ未対応 | — | 確認 2026-11 | NVIDIA『CUDA GPUs』／AMD『ROCm Windows compatibility』 | https://developer.nvidia.com/cuda/gpus ほか | ○ | 2026-11-14 | 本文 |
| 8 | 企業 | NVIDIA の本社は米国（サンタクララ）。Intel・AMD は第03章の表の出典 | — | 確認 2026-11 | NVIDIA『Contact』 | https://www.nvidia.com/en-in/contact/ | ○ | 2026-11-14 | 本文 |
| 9 | 安全 | §9.3 の定型の注意書き「電気」「けが」を、改変せず、別の囲みで置く。根拠の持ち主は第07章（電源ユニットの内部の電気）と第14章 | — | spec §9.3 | spec.md | — | — | 2026-11-14 | 冒頭の 2 つの囲み |
| 10 | 一般知識 | GPU の役割（映像と並列計算）、たわみとサポートステー、内蔵グラフィックスが多くはメインメモリを使う。数値なし | — | — | 教科書共通 | — | × | 2026-11-14 | 本文、c06-igpu |
| 11 | 一般知識 | 架空の 3 人の用途 | — | — | 架空 | — | × | 2026-11-14 | c06-practice |

確認できず書かなかった：
- 12V-2x6 の PCI-SIG の公式の仕様ページ（Intel の設計ガイドの記述で代用。△）
- 3 社の消費電力の名前（TGP・Typical Board Power・TBP）の定義文
- Intel の GPU の計算用ソフトの対応表
- AMD の RX 9070 XT の寸法
