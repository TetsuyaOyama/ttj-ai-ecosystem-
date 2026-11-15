第05章 事実確認表（担当 B、確認 2026-11-14）

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 規格 | NVM Express Base Specification の版 2.4 は 2026-07-31 に承認、2026-08-04 に公開（NVMe over PCIe Transport 1.4、NVM Command Set 1.3） | 版 2.4 | 2026-08 | NVM Express, Inc.『NVM Express Base Specification』 | https://nvmexpress.org/specification/nvm-express-base-specification/ | ○ | 2026-11-14 | c05-iface、本文、stack |
| 2 | 規格 | NVMe 2.3 の発表（2025-08-05）。本文では版 2.4 のみ書く | — | 2025-08-05 | NVM Express『NVMe publishes set of specifications…』 | https://nvmexpress.org/nvm-express-publishes-set-of-nvme-specifications-enabling-new-capabilities-for-ai-cloud-enterprise-and-client-storage/ | ○ | 2026-11-14 | 確認のみ |
| 3 | 規格 | SATA-IO のホームページは SATA Revision 3.5 を現行として載せる（版の発表 2020-07-15）。名前は「SATA 6Gb/s」「SATA Revision 3.x」、「SATA III」「SATA 3.0」は使わない | 版 3.5 | 2020-07／確認 2026-11 | SATA-IO『SATA Naming Guidelines』ほか | https://sata-io.org/developers/sata-naming-guidelines | ○ | 2026-11-14 | c05-iface、本文 |
| 4 | 規格 | M.2 は PCI-SIG の規格として知られる（第三者サイト design-reuse が 2013-12-16 の PCI-SIG の発表を再掲）。【2026-11-14 の最終確認】規格の版は PCI-SIG の一次ページで確認できなかったため、本文は版を書かない | — | 版は書かない（再掲の日付 2013-12-16） | PCI-SIG（design-reuse の再掲） | https://us.design-reuse.com/news/33500/pci-sig-pci-express-m-2-specification-revision-1-0.html | △ | 2026-11-14 | c05-m2、c05-iface |
| 5 | 仕様値 | Samsung の FAQ：NVMe SSD は幅 22 mm・長さ 80 mm、M key は PCIe 最大 4 レーン、B key は最大 2 レーンで SATA または PCIe。Intel の購入ガイド：M.2 の長さは 16〜110 mm | 22/80 mm、16〜110 mm | 確認 2026-11／更新 2025-07 | Samsung『Internal SSD Installation FAQ』／Intel『Gaming Motherboard Buying Guide』 | https://semiconductor.samsung.com/consumer-storage/support/faqs/internalssd-installation/ | ○ | 2026-11-14 | c05-m2 |
| 6 | 仕様値 | Samsung 990 PRO：M.2（2280）、PCIe 4.0 x4・NVMe 2.0、TBW 600／1,200／2,400 TB、保証 5 年（TBW と年数の先に達したほう）、順次の最大 7,450／6,900 MB/s（IOmeter 1.1.0 で測定、変わりうる）、動作温度 0〜70 ℃、LPDDR4 の DRAM キャッシュ、1 GB = 1,000,000,000 バイト（IDEMA）で使える容量は違うことがある | 上記 | Rev. 2.0、2023-07 | Samsung『Samsung NVMe SSD 990 PRO Data Sheet』 | https://download.semiconductor.samsung.com/resources/data-sheet/samsung_nvme_ssd_990_pro_datasheet_rev.2.0.pdf | ○ | 2026-11-14 | 本文、quiz、exam |
| 7 | 仕様値 | Samsung 990 EVO Plus：キャッシュの欄は HMB（Host Memory Buffer）、PCIe 4.0 x4／5.0 x2、NVMe 2.0 | — | Rev. 1.0、2024-10 | Samsung『990 EVO Plus Data Sheet』 | https://download.semiconductor.samsung.com/resources/data-sheet/samsung_nvme_ssd_990_evo_plus_datasheet_rev.1.0.pdf | ○ | 2026-11-14 | 本文 |
| 8 | 規格 | JEDEC は 2010-09-23 の発表で、JESD218 が耐久性の指標として TBW を定め、クライアント向けと企業向けの区分を持つとした。JESD219 は企業向けの作業負荷のみ | — | 2010-09-23 | JEDEC『JEDEC Announces Publication of Solid State Drive Standards』 | https://www.jedec.org/news/pressreleases/jedec-announces-publication-solid-state-drive-standards | ○ | 2026-11-14 | 本文、quiz 問2 |
| 9 | 企業 | Samsung Electronics の本社は韓国（水原。2025 年 4Q の中間報告） | — | 2025 | Samsung Electronics の報告書 | （個別 URL は記載せず） | ○ | 2026-11-14 | 本文 |
| 10 | 一般知識 | SSD と HDD の仕組みと傾向、2.5 インチ型、順次とランダム、IOPS の意味、10 進と 2 進の換算（式 7）。数値は式 7 の定義のみ | 1 GB = 10^9 byte、1 GiB = 1,073,741,824 byte | — | 教科書共通・spec §9.4 | — | × | 2026-11-14 | 本文 |
| 11 | 一般知識 | 架空のマザーボード Z と SSD ア・イ・ウ | — | — | 架空 | — | × | 2026-11-14 | c05-practice |

確認できず書かなかった：
- M.2 規格の版と PCI-SIG の公式ページ：最終確認（2026-11-14）でも一次ページを取得できなかった。版は書かない
- OS（Windows など）の容量の表示の単位（OS 提供者の公式説明が見つからなかった。本文では断定していない）
- Seagate 社の本社の所在（HDD のデータシートの数値は使っていない）
- HDD の速度・衝撃の数値
