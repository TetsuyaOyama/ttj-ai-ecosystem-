第11章 事実確認表（担当 B、確認 2026-11-14）

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 仕様値 | NVIDIA GB200 NVL72：36 個の Grace CPU と 72 個の Blackwell GPU を、ラックスケールの液冷の設計でつなぐ。72 GPU の NVLink ドメイン。NVLink は 130 TB/s（NVIDIA の記載）。ページにラックの電力（kW）の記載なし | 36 CPU／72 GPU／130 TB/s | 確認 2026-11-14（日付なし） | NVIDIA『GB200 NVL72』 | https://www.nvidia.com/en-us/data-center/gb200-nvl72/ | △（企業の自社ページ） | 2026-11-14 | c11-budget、本文「ラックスケール」 |
| 2 | 仕様値 | NVIDIA DGX SuperPOD は、計算・ストレージ・ネットワーク・ソフトウェア・インフラ管理を組み合わせた「フルスタックのデータセンタープラットフォーム」。DGX GB200 の構成は液冷のラックスケール。「数万の GPU へ拡張」と記載。GPU 台数・ノード数・スケーラブルユニットの定義は記載なし | 数万 GPU | 確認 2026-11-14 | NVIDIA『DGX SuperPOD』 | https://www.nvidia.com/en-us/data-center/dgx-superpod/ | △ | 2026-11-14 | c11-budget、本文「クラスタ」 |
| 3 | 企業 | NVIDIA の本社は米国（第08章の表） | — | — | 第08章の表に同じ | — | ○ | 2026-11-14 | 本文（初出の括弧） |
| 4 | 一般知識 | ラックの電力・重量・高さの 3 つの予算、ポッド、スケールアップ・スケールアウト、集団通信、計算・ストレージ・フロントエンド・管理のネットワークを分ける考え方。数値は使わない | — | — | 教科書的な一般知識（Hennessy・Patterson『Computer Architecture』ほか） | —（数値を伴わない） | × | 2026-11-14 | 本文、c11-cluster、c11-scale |
| 5 | 一般知識 | 演習の電力・重量・高さの数値と、構成表はすべて架空 | — | — | 架空（見本のため） | — | × | 2026-11-14 | c11-budget の架空の行、c11-calc |

確認できず書かなかった：
- AMD Helios、他社のラックスケール製品の公開値：個別ページを確認できなかった。
- NVIDIA DGX SuperPOD の参照アーキテクチャ（4 つのファブリック、スケーラブルユニット）：参照アーキテクチャの個別ページを確認できなかった。ネットワークを分ける考え方は、一般論として書く。
- GB200 NVL72 のラックの電力（kW）・重量：NVIDIA のページに記載がなく、書かない。

検証時の追記（2026-11-14、技術検証）：#1 の GB200 NVL72 の記載（36 Grace CPU・72 Blackwell GPU、ラックスケールの液冷、72 GPU の NVLink ドメイン、130 TB/s、ラックの電力・重量の記載なし）を NVIDIA のページで再確認し、一致した。NVIDIA の自社ページは発表の主体自身の個別ページなので、§8.1 の定義では「一次 ○」に当たる（表の「△」は読み替える）。c11-calc の条件に、既にある 6U の機器の電力・重量は枠から差し引き済み、という前提を追記した。

仕上げ時の追記（2026-11-14）：#6 Uptime Institute『Data Center Capacity Growth Trends: Findings from the 2026 Global Data Center Survey』（https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2026%20Annual%20Survey%20Data%20Center%20Growth%20v6.pdf?version=0 、一次○）。最頻のラック密度（n=679）：10 kW 未満 69%、10〜19 kW 20%、20〜49 kW 8%、50 kW 以上 3%。調査 2026-03-17〜05-01、データセンター所有者・運営者 801 件。平均値は記載なし。報告書の公表は 2026 年 8 月。本文の「ラック電力密度の調査値」の節に載せた。
#7 AMD『AMD Helios Rackscale Solution』（https://www.amd.com/en/products/rackscale-solutions/helios.html 、ページの更新 2026-11-12、一次○）：MI455X または MI450X を 72 個、HBM4 最大 31 TB、スケールアップ帯域 最大 260 TB/s（AMD Performance Labs の計算、2026-06）、Meta の ORW 規格（OCP に提出）の幅の広いラック、液冷、ラック電力の記載なし。確認できず書かなかった項目から「AMD Helios」は除く。
