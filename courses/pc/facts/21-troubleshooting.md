第21章 事実確認表（担当 E、確認 2026-11-14）

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 定義 | Microsoft のイベントログの説明：イベントのログは、アプリケーションと OS が出す重要なソフトとハードのイベントを、1 つの集まり（イベントログ）に記録する標準の仕組み。イベントビューアー（Event Viewer）は、イベントログを見る道具 | — | 2025-08-14 更新の記載 | Microsoft『Event Logging』 | https://learn.microsoft.com/windows/win32/eventlog/event-logging | ○ | 2026-11-14 | 本文「手がかりを集める」、用語集 |
| 2 | 規格 | NVM Express（団体）の資料：Critical Warning は主な健康の印で、有効のとき、ドライブに問題があり、メディアのエラー・ハードの故障・温度による速度低下などの種類を報告する。Percentage Used は耐久性の「燃料計」のようなもの。Available Spare は、予備の容量が基準を下回るとき、ベンダーがホストへ知らせる設定ができる。資料は S.M.A.R.T. の略語を展開していない | — | ページに日付の記載なし（確認 2026-11-14）。寄稿者は Intel の Jonmichael Hands | NVM Express『Features for Error Reporting, SMART, Log Pages, Failures and management capabilities in NVMe Architectures』 | https://nvmexpress.org/?p=13313（短縮形の個別ページ。固定の語句つきの URL は確認できず） | ○ | 2026-11-14 | 本文「手がかりを集める」、c21-clues、用語集、mapping |
| 3 | 仕様値 | Microsoft の NVME_HEALTH_INFO_LOG の説明：項目は CriticalWarning（ビットの組。AvailableSpaceLow・TemperatureThreshold・ReliabilityDegraded・ReadOnly など）、Temperature（複合温度。単位はケルビン）、AvailableSpare（残りの予備の容量の正規化した割合 0〜100）、PercentageUsed（寿命の使用の、ベンダー固有の推定。100 は想定の耐久性を使い切ったことを示すが、故障したとは限らない。100 を超えうる） | 0〜100（AvailableSpare） | ms.date 2021-02-19、メタデータの更新 2024-02-22 | Microsoft『NVME_HEALTH_INFO_LOG structure』 | https://learn.microsoft.com/windows/win32/api/nvme/ns-nvme-nvme_health_info_log | ○ | 2026-11-14 | 本文「手がかりを集める」、c21-clues、mapping |
| 4 | 定義 | S.M.A.R.T. の展開形（Self-Monitoring, Analysis and Reporting Technology）は、本講座の用語の規則（GLOSSARY-RULES §8）による。上の NVM Express の資料は展開しておらず、規格を定めた団体・文書名は確かめられなかった | — | — | 本講座の GLOSSARY-RULES | — | × | 2026-11-14 | 用語集、本文の初出 |
| 5 | 一般知識 | 「S.M.A.R.T. の値が正常でも、故障しないとは限らない」：値は、ドライブの自己の記録で、将来を保証しない（一般知識。一次資料は確かめていない） | — | — | 一般知識 | — | × | 2026-11-14 | 本文、c21-clues の注意 |
| 6 | 定義 | 切り分けの 4 つの原則（症状を言葉にする・最近の変更・一度に 1 つ・記録）、段階の分け方（電源・自己診断・映像・起動・安定性・特定の機能）、最小構成から 1 つずつ戻す手順、窓口へ伝える情報は、この講座の整理（一般知識）。起動の流れと表示灯・コードは第17章、UEFI の版は第11章が持ち主 | — | — | 一般知識 | — | × | 2026-11-14 | 本文、c21-tree、c21-flow |
| 7 | 一般知識 | 「組み立て直後の不具合は、部品の故障より、取り付けの問題が多い」は、一般の経験則（一次資料は確かめていない）。検証（2026-11-14）で、頻度の断定を避け「故障を疑う前に、確かめやすい取り付けと設定を確かめる」という手順の理由に書き換えた。どちらが多いかは書かない | — | — | 一般知識 | — | × | 2026-11-14 | 本文「よくある原因」 |
| 8 | 一般知識 | 演習のケース 8 つ（A〜H さん）の記録・値は、すべて架空。答えは、第17章の c17-seq・c17-post、第11章の c11-flow と照合した | — | — | 架空（見本のため） | — | × | 2026-11-14 | c21-drill |
| 9 | 企業 | Microsoft の本社：公式ページ『Office Locations』に、世界の本社は Redmond, Washington とある。国名の明記はなく、米国のワシントン州として「米国」と書いた | — | 2026-11-14 に確認 | Microsoft『Office Locations』 | https://www.microsoft.com/en-us/about/office-locations | ○ | 2026-11-14 | 本文の初出「（米国）」 |

確認できず書かなかった：
- 第17章の確認表（担当 D）：書いた時点で facts/17-*.md が未提出。表示灯・コードの具体の意味は書かず、第17章へのリンクにした。ケースの答えは、第17章のデータ（c17-seq・c17-post）と照合した。
- S.M.A.R.T. を定めた団体・文書の名前：確かめられた資料がなく書かなかった（本文は「NVMe では規格が健康情報の記録を定める」と、確認できた範囲だけ）。Seagate の説明のページは取得できなかった。
- SATA の SSD・HDD の S.M.A.R.T. の項目と読み方：公式の一次資料を確かめていない。本文は NVMe の項目だけを書いた。
- 販売店・メーカーの診断サービスの内容と費用：各社で違い、一次資料を確かめていない。本文は「行う場合もある」にとどめた。
- 最小構成の具体の部品の一覧：マザーボードごとに違う。本文は「マニュアルが示す」と書いた。
- Windows の信頼性の記録（Reliability Monitor）の公式説明：確かめていない。本文はイベントの記録だけを書いた。
