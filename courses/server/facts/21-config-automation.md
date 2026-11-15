/* 第21章 事実確認表（担当 E、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 定義 | 冪等性：同じ操作を 1 回行っても繰り返しても、他に何も変わらなければ結果が同じ。宣言的：望む最終の状態を記述し、ツールが必要な手順を判断して変更が要ったかを報告する（Ansible の資源はこの方式）。インベントリ、プレイブックの語 | — | 確認時のページ | Ansible『Glossary — Ansible Community Documentation』 | https://docs.ansible.com/ansible/latest/reference_appendices/glossary.html | ○ | 2026-11-14 | 本文「宣言的と手続き的」、c21-cmp、用語集、クイズ 1 |
| 2 | 企業 | Ansible は Red Hat, Inc. がスポンサーのオープンソースプロジェクト。README のライセンスは GNU General Public License v3.0 以降。エージェント不要で SSH を使う | GPL-3.0 以降 | 確認時のページ | GitHub『ansible/ansible』README | https://github.com/ansible/ansible | ○ | 2026-11-14 | 本文「ツールの例」 |
| 3 | 企業 | Red Hat の本社は米国ノースカロライナ州ローリー（Raleigh） | — | 確認時のページ | Red Hat『Office locations』 | https://www.redhat.com/en/about/office-locations | ○ | 2026-11-14 | 本文「ツールの例」（初出の国） |
| 4 | 発表 | OpenTofu は Linux Foundation が 2023 年 9 月 20 日に発表。元の名は OpenTF。Terraform が MPL v2.0 から制限の強いライセンスへ変わったことを受け、MPL 版を引き継ぐ。（本文には Terraform の事業主体の社名を書かない） | — | 2023-09-20 | Linux Foundation『Linux Foundation Launches OpenTofu』 | https://www.linuxfoundation.org/press/announcing-opentofu | ○ | 2026-11-14 | 本文「ツールの例」 |
| 5 | 定義 | OpenTofu：IaC のツール。設定ファイルで資源を記述し追跡・再利用・共有する。宣言的で、write・plan（作成・変更・削除の予告）・apply（依存順に適用）の 3 段階 | — | 確認時のページ | OpenTofu『Getting started』 | https://opentofu.org/docs/intro/ | ○ | 2026-11-14 | 本文「IaC」「ツールの例」、c21-cmp |
| 6 | 定義 | 構成管理：構成を初期化・変更・監視する方法を管理して、製品とシステムの完全性を守る活動（NIST SP 800-128 などに基づく定義）。SP 800-128 は 2011 年 8 月（2019-10-10 の更新を含む）、Final、SecCM を扱う | — | 2011-08／2019-10-10 | NIST『CSRC Glossary：configuration management』、『SP 800-128』 | https://csrc.nist.gov/glossary/term/configuration_management 、https://csrc.nist.gov/pubs/sp/800/128/upd1/final | ○ | 2026-11-14 | 本文「手作業が破綻する理由」、参照資料 |
| 7 | 規格 | ITIL 4 の change enablement：サービスや製品の変更の成功割合を上げることが目的。リスクの評価、正式な承認、日程の管理を行う（PeopleCert の研修ページの説明。ITIL 本体は未確認） | — | 確認時のページ | PeopleCert『ITIL 4 Practitioner: Change Enablement』 | https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-4-practitioner-change-enablement-3794 | △ | 2026-11-14 | 本文「変更管理」 |
| 8 | 一般知識 | 構成のずれの原因、プロビジョニングの流れ（受入→登録→…→本番）、CMDB の項目の例、ゴールデンイメージ、段階的な適用の意義、資産の状態遷移（組織で異なる一例） | — | — | 一般的な運用の説明（数値なし）。本文に「一例」と注記 | —（教科書的な説明） | × | 2026-11-14 | 本文、c21-flow、c21-state、c21-cmp、クイズ、演習 |
確認できず書かなかった：
- CMDB と ITIL の関係（ITIL のどのプラクティスが CMDB を扱うか）：ITIL 本体の公開説明を確認できず、CMDB は一般的な運用の語として書いた。
- Terraform の事業主体と現在のライセンス名：Linux Foundation の発表（MPL から制限の強いライセンスへ変更）の範囲にとどめ、社名とライセンスの個別名は書かなかった。
- Puppet・Chef など他の構成管理ツールの所管とライセンス：例示は 2 つに絞る方針（spec §3 第21章）のため、確認していない。
*/
