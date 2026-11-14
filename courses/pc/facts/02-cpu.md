第02章 事実確認表（担当 B、確認 2026-11-14）

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 仕様値 | Core Ultra 7 265K：20 コア（Performance-cores 8、Efficient-cores 12）・20 スレッド、Processor Base Power 125 W、Maximum Turbo Power 250 W、Max Operating Temperature 105 °C、FCLGA1851、Intel Graphics（4 Xe-cores）、NPU Intel AI Boost 13 TOPS、発売 Q4'24 | 20/20、125 W、250 W、105 °C、13 TOPS | 確認 2026-11 | Intel『Intel Core Ultra 7 Processor 265K Product Specifications』 | https://www.intel.com/content/www/us/en/products/sku/241063/intel-core-ultra-7-processor-265k-30m-cache-up-to-5-50-ghz/specifications.html | ○ | 2026-11-14 | c02-cpu、c02-hybrid、本文 |
| 2 | 仕様値 | Ryzen 5 9600X：6 コア・12 スレッド、Default TDP 65W、Tjmax 95°C、AM5、Radeon Graphics、L2 6 MB、L3 32 MB、Launch 08/08/2024 | 6/12、65W、95°C | 確認 2026-11 | AMD『AMD Ryzen 5 9600X』 | （製品ページを 2026-11-14 に閲覧。個別 URL は記載しない）9000-series/amd-ryzen-5-9600x.html | ○ | 2026-11-14 | c02-cpu、本文「キャッシュ」 |
| 3 | 仕様値 | Ryzen 9 9950X：16/32、Default TDP 170W、95°C、Launch 08/15/2024 | 16/32、170W | 確認 2026-11 | AMD『AMD Ryzen 9 9950X』 | （製品ページを 2026-11-14 に閲覧。個別 URL は記載しない）9000-series/amd-ryzen-9-9950x.html | ○ | 2026-11-14 | c02-cpu |
| 4 | 仕様値 | Ryzen 5 9500F：6/12、Default TDP 65W、95°C、Graphics Model「Discrete Graphics Card Required」、Launch 9/8/25（ページの表記） | 6/12、65W | 確認 2026-11 | AMD『AMD Ryzen 5 9500F』 | （製品ページを 2026-11-14 に閲覧。個別 URL は今回再取得できず、記載しない） | ○ | 2026-11-14 | c02-cpu、本文「内蔵グラフィックス」、quiz |
| 5 | 仕様値 | Ryzen AI 7 450G：8/16、Default TDP 65W、95°C、Radeon 860M graphics、NPU up to 50 TOPS、Launch 3/2/2026（ページの表記） | 8/16、65W、50 TOPS | 確認 2026-11 | AMD『AMD Ryzen AI 7 450G』 | https://www.amd.com/ja/products/processors/desktops/ryzen/ai-400-series/amd-ryzen-ai-7-450g.html（検証 2026-11-14 に日本語版で再確認：8/16、65W、95°C、860M、Up to 50 TOPS、ECC は基板の対応が要る、Launch 3/2/2026） | ○ | 2026-11-14 | c02-cpu、本文「NPU」 |
| 6 | 規格 | Intel：TDP は 12 世代以降 Processor Base Power と同じ | — | 最終確認日 2024-12-10 | Intel『Where to Find the Thermal Design Power (TDP) for Intel Processors』（000089297） | https://www.intel.com/content/www/us/en/support/articles/000089297/processors.html | ○ | 2026-11-14 | c02-power |
| 7 | 規格 | Intel：TDP は最大の理論上の負荷のときの電力消費 | — | 最終確認日 2023-04-04 | Intel『Thermal Design Power (TDP) in Intel Processors』（000055611） | https://www.intel.com/content/www/us/en/support/articles/000055611/processors.html | ○ | 2026-11-14 | c02-power |
| 8 | 規格 | Processor Base Power は熱設計のための持続的な電力（時間平均を超えないことを確認）、Maximum Turbo Power は持続的（1 秒超）な最大で、10 ms 以下は超えうる | 1 s、10 ms | Rev. 006、2025-09 | Intel『Core Ultra 200S and 200HX Series Processors Datasheet, Volume 1』 | https://cdrdv2-public.intel.com/832586/832586-006.pdf | ○ | 2026-11-14 | c02-power、warn |
| 9 | 規格 | AMD の PPT：ソケットでの電力の総量（W）の上限。資料は Ryzen 1000〜5000 世代と AM4 が対象。AM5 の定義は未確認。Default TDP の定義文は製品ページに無い | — | 2022-04 の版 | AMD『AMD Ryzen Master Reference Guide』 | https://www.amd.com/content/dam/amd/en/documents/products/software-tools/ryzen-master-quick-reference-guide.pdf | ○ | 2026-11-14 | c02-power |
| 10 | 仕様値 | Intel のページの説明：P コアは hyper-threading で 2 スレッドを扱える、E コアは 1 スレッド、Thread Director（検証 2026-11-14 に再確認。265K の製品ページは 20 コア・20 スレッドなので、c02-hybrid では「Intel のページの説明」と帰属を明記し、製品ごとに確かめる形にした。265K の P コアのスレッド数を推論した注記は、一次資料で確かめられないため削除） | — | 更新 2025-07-16 | Intel『How Intel Core Processors Work』 | https://www.intel.com/content/www/us/en/gaming/resources/how-hybrid-design-works.html | ○ | 2026-11-14 | c02-hybrid |
| 11 | 規格 | Intel の型番：階層、世代（先頭の桁）、接尾辞 K/F/KF/T。F は Requires discrete graphics、K は Unlocked | — | 2026-01-05／2025-12-09 | Intel（000097596／000058567） | （記事 000097596・000058567 を 2026-11-14 に閲覧。個別 URL は再取得できず記載しない） | ○ | 2026-11-14 | c02-model、本文 |
| 12 | 仕様値 | Turbo Boost は処理と熱の余裕による。Precision Boost は温度・電力・電流の上限内で上がる | — | 2025-07-14／2024-02-29 | Intel『Turbo Boost』／AMD『Precision Boost 2 FAQ』 | https://www.amd.com/en/resources/support-articles/faqs/CPU-PB2.html | ○ | 2026-11-14 | 本文「クロック」 |
| 13 | 保証 | Intel：クロックや電圧の変更は保証が無効になることがある | — | 最終確認日 2026-04-09 | Intel『XMP』（000094616） | https://www.intel.com/content/www/us/en/support/articles/000094616/processors.html | ○ | 2026-11-14 | 本文 callout |
| 14 | 企業 | Intel・AMD の本社は米国（第03章の表の 19・20 行と同じ出典） | — | 2026 | Intel『Intel in California』／AMD『Form 8-K』 | 第03章参照 | ○ | 2026-11-14 | 本文 |
| 15 | 一般知識 | CPU の役割、キャッシュの階層、F 付き製品で画面が映らない理由。数値なし | — | — | 教科書共通 | — | × | 2026-11-14 | 本文 |
| 16 | 一般知識 | 架空の CPU ア・イ・ウと架空の型番 | — | — | 架空 | — | × | 2026-11-14 | c02-practice、c02-model、exam |

確認できず書かなかった：
- AMD の TDP（Default TDP）の定義文と、AMD の型番の命名規則の公式の解説
- AMD の製品ページにおけるコアの種類（P/E に当たる呼称）
- AM5 の CPU における PPT の定義（資料は Ryzen 1000〜5000 世代が対象）
- Intel の NPU・TOPS の測り方の比較
