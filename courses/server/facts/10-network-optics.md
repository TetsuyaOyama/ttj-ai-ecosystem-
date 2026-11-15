第10章 事実確認表（担当 B、確認 2026-11-14）

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 仕様値 | NVIDIA Spectrum-X は、AI 向けのイーサネットのプラットフォーム。Spectrum-X のスイッチと SuperNIC の組。SuperNIC は GPU サーバー間に RoCE を提供する。ConnectX-8 SuperNIC は「2×400 G で合計 800 Gb/s」。SN6600 は 800 G OSFP を 128 ポート、SN6800 は 5U で 800 G を 512 ポート | 800 Gb/s／128・512 ポート | 確認 2026-11-14（ページに日付なし） | NVIDIA『Spectrum-X』 | https://www.nvidia.com/en-us/networking/spectrumx/ | △（企業の自社ページ） | 2026-11-14 | c10-eth、本文「イーサネットと InfiniBand」 |
| 2 | 仕様値 | NVIDIA Quantum-X800 InfiniBand スイッチは、ポートあたり 800 Gb/s で 144 ポート。同プラットフォームは、SuperNIC と LinkX のケーブル・トランシーバを含む | 800 Gb/s／144 ポート | 確認 2026-11-14 | NVIDIA『Quantum-X800』 | https://www.nvidia.com/en-us/networking/products/infiniband/quantum-x800/ | △ | 2026-11-14 | c10-eth、c10-eth-ib |
| 3 | 仕様値 | NVIDIA Spectrum のスイッチは 1GbE〜800GbE。従来のプラガブル光と、パッケージ一体の光（co-packaged）の両方に対応。LinkX は Spectrum 向けに最大 800 Gb/s で設計・検証。この資料は DAC・AOC に言及しない | 1〜800 GbE | 確認 2026-11-14 | NVIDIA『Ethernet Networking』 | https://www.nvidia.com/en-us/networking/products/ethernet/ | △ | 2026-11-14 | c10-eth、本文「光トランシーバ」「CPO」 |
| 4 | 企業 | NVIDIA の本社は米国（第08章の表） | — | — | 第08章の表に同じ | — | ○ | 2026-11-14 | 本文（初出の括弧） |
| 5 | 一般知識 | リーフ・スパイン、RDMA、RoCE（UDP/IP 上）、InfiniBand の特徴、DAC・AOC・光トランシーバの違い（距離・電力・費用の傾向）、QSFP-DD・OSFP が形の名前であること、CPO の考え方。IEEE 802.3 が仕様の改訂を行うこと、IBTA が InfiniBand の仕様を定めること。数値は使わない | — | — | Kurose・Ross『Computer Networking』ほか、教科書的な一般知識 | —（数値を伴わない） | × | 2026-11-14 | 本文、c10-leafspine、c10-roce、c10-cables、c10-trx |
| 6 | 一般知識 | 演習のケーブルの選択の 3 案件はすべて架空 | — | — | 架空（見本のため） | — | × | 2026-11-14 | c10-choose |

確認できず書かなかった：
- IEEE 802.3 の各改訂（bs・ck・df・dj）の速度・承認日、到達距離の区分（DR・FR・LR）：IEEE の個別ページを取得できなかった。メートルの距離は、一切書かない。
- UEC 1.0、InfiniBand（IBTA）の仕様の公開日、LPO MSA の仕様名と日付：団体の個別ページを再取得できなかったため、本章の本文には使わない。
- QSFP-DD・OSFP の各 MSA の仕様書の版：MSA のページを取得できなかったため、形の名前の説明は一般知識にとどめる。
- 光トランシーバの電力・価格・故障率の数値：数値を使わない方針で、書かない。

検証時の追記（2026-11-14、技術検証）：
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 7 | 規格 | IEEE SA の IEEE 802.3-2022 のページ（Active Standard）は、改訂として 802.3bs-2017（200 Gb/s・400 Gb/s、superseded の表示）、802.3df-2024（800 Gb/s の MAC と物理層、400・800 Gb/s の管理）を挙げ、P802.3dj（1.6 Tb/s）を策定中（Proposed）の改訂として挙げる | 200・400・800 Gb/s、1.6 Tb/s | 2026-11-14 に確認 | IEEE SA『IEEE Standard for Ethernet（IEEE 802.3-2022）』 | https://standards.ieee.org/ieee/802.3/10422/ | ○ | 2026-11-14 | 本文「イーサネットと InfiniBand」、mapping |
| 8 | 発表 | Ultra Ethernet Consortium は 2025-06-11（発信地 San Francisco）に仕様 1.0 の公開を発表。NIC・スイッチ・光・ケーブルにわたるイーサネット基盤の通信の積層で、「Modern RDMA for Ethernet and IP」を含む。UEC は Joint Development Foundation のプロジェクトで Linux Foundation の関連団体 | — | 2025-06-11 | Ultra Ethernet Consortium『UEC Launches Specification 1.0 Transforming Ethernet for AI and HPC at Scale』 | https://ultraethernet.org/?p=926 | ○ | 2026-11-14 | 本文「イーサネットと InfiniBand」 |
| 9 | 規格 | InfiniBand の仕様は InfiniBand Trade Association（IBTA）が定める | — | — | 一般知識（IBTA の個別ページは未確認） | — | × | 2026-11-14 | 本文、c10-eth-ib |
注：#1〜#3 の NVIDIA の自社ページは、発表の主体自身の個別ページなので、§8.1 の定義では「一次 ○」に当たる（表の「△」は読み替える）。

仕上げ時の追記（2026-11-14）：#7 Broadcom『Tomahawk 6 / BCM78910 Series』（https://www.broadcom.com/products/ethernet-connectivity/switching/strataxgs/bcm78910-series 、一次○、製品の公表日の記載なし）：スイッチング容量 102.4 Tb/s、構成の例 64×1.6TbE・128×800GbE・256×400GbE・512×200GbE、SerDes 106.25G PAM4 または 212.5G PAM4。スイッチ用チップの記載で、スイッチ筐体ではない。CPO の記述はこのページにない。Broadcom の本社は米国：Broadcom の発表（https://investors.broadcom.com/news-releases/news-release-details/broadcom-ships-tomahawk-6-worlds-first-1024-tbps-switch 、2025-06-03）の発信地・会社説明が Palo Alto, California。
