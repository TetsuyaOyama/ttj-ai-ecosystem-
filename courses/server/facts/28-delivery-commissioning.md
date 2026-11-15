/* 第28章 事実確認表（担当 C、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 規格 | ASHRAE のガイドライン 0-2019『The Commissioning Process』は、施設とその系統が所有者の要求を満たすことを確かめる過程を、事前の設計から運用まで描く | — | 2019 | ASHRAE『Commissioning』（ブックストアのページ） | https://www.ashrae.org/technical-resources/bookstore/commissioning | ○ | 2026-11-14 | 本文「施設の試運転」、mapping |
| 2 | 規格 | ASHRAE の規格 202-2024『The Commissioning Process Requirements for New Buildings and New Systems』は、新築の建物・系統の試運転の要求を扱う | — | 2024 | 同上 | 同上 | ○ | 2026-11-14 | 本文、mapping |
| 3 | 一般知識 | （注）ASHRAE のブックストアのページには、データセンター専用の試運転ガイドラインは載っていない。段階の名前（Level 1〜5）は ASHRAE の用語ではなく Uptime Institute の解説記事のもの。ASHRAE の AI データセンター向けページは取得に失敗 | — | 2026-11-14 | 同上 | 同上 | ○ | 2026-11-14 | 本文の注記 |
| 4 | 一般知識 | Uptime Institute の解説記事は Level 1〜5 の 5 段階を述べる。Level 1 は機器の確認（工場の試験を実際の施設で繰り返すことを含む）、Level 2 は据付後のチェックリスト、Level 3 は起動と機能のチェックリスト。Level 1〜3 は施工中に試運転の担当者（CxA）が見る。Level 4 は発電機・UPS・UPS の蓄電池を設計と定格の容量で負荷装置により試験（長い運転を勧める）。Level 5 は負荷の段階（25%・50%・75%・100%）を変え、商用と発電機の電源で、故障の模擬と、可能なら N-1 のような非常の場面を含む。段階の名前は記事で正式には与えられていない。記事は「さまざまな組織が段階を定義してきた」と書き、団体の正式な規格の用語としては示していない（2026-11-14 の検証で再確認） | 5 段階 | 2015-05-04 | Uptime Institute『Improve Project Success Through Mission Critical Commissioning』（Ryan Orr、Chris Brown、Ed Rafter） | https://journal.uptimeinstitute.com/improve-project-success-through-mission-critical-commissioning/ | ○ | 2026-11-14 | 本文、c28-cx、c28-quiz |
| 5 | 一般知識 | Uptime Institute の別の記事は、Level 5 を Integrated System Testing と呼ぶ。負荷装置で IT 機器の負荷を模し、系統を一緒に動かして、指定した保守と故障の場面で施設が設計どおり動くことを確かめる。商用電源を遮断し、UPS が発電機の引受けまで負荷を支え、冷却が移行の間も保たれることを確かめる例 | — | 2016-05-11（記事の日付表示） | Uptime Institute『Lessons Learned from Tier Certification of Constructed Facilities』（Kevin Heslin） | https://journal.uptimeinstitute.com/tiercertificationpreparation/ | ○ | 2026-11-14 | 本文、c28-cx、c28-quiz、c28-exam、glossary |
| 6 | 一般知識 | Uptime Institute の記事は、Level 4 と Level 5 の試験に十分な時間を取り、建設の遅れでそれを削らないよう助言する。この記事は「統合試験」「IST」の語も、パンチリストも使わない | — | 2015-05-13 | Uptime Institute『Avoiding Data Center Construction Problems』（Keith Klesner） | https://journal.uptimeinstitute.com/avoiding-data-center-construction-problems/ | ○ | 2026-11-14 | refs |
| 7 | 定義 | 統合試験の英語表記は、Uptime Institute の記事では Integrated System Testing。用語集の見出しの英語は Integrated Systems Test（GLOSSARY-RULES §8 の表記）にし、alias に記事の表記を入れる。略語 IST は一次資料で確認できず、本文・用語集に使わない | — | — | 同上 | 同上 | ○ | 2026-11-14 | 本文、glossary |
| 8 | 一般知識 | ラック単位の出荷、搬入計画の項目、ケーブリング、バーンイン、受入試験、不具合票、未完了項目リスト（punch list）の一般的な意味。工場出荷前の統合と試験、輸送の梱包・振動・重量の考え方 | — | — | 機器の搬入・設置・受入の一般的な進め方（数値を伴わない） | — | × | 2026-11-14 | 本文、glossary、c28-flow |
| 9 | 一般知識 | 行程帯図の担当・責任は、契約で決まる一般例。出荷条件の用語（Incoterms など）は確認していないため書かない | — | — | — | — | × | 2026-11-14 | c28-route |
確認できず書かなかった：
- 重量物の取扱いの安全資料（厚生労働省）：検索の上限に達し、個別ページを確認できなかった。重量物の注意は、spec §9.3 の定型文のみで書いた。
- ラック単位の輸送の梱包の公開仕様（OCP など）：個別ページを確認できなかった。梱包の具体は書かず、「製造者と輸送業者の文書に従う」と書いた。
- ASHRAE の AI データセンター向け『Commissioning & Performance Validation』ページ：取得に失敗した。ASHRAE のデータセンター向けの試運転の段階の公式名称は確認できていない。
- Level 4 の運転時間の数値（記事の「8 時間以上、最長 24 時間」）：記事の表を取得できず、要約でしか確認できなかったため、数値は書かず「長い運転を勧める」とした。
- 輸出入の手続きの具体（個別貨物の該非・許可の要否）：制度の持ち主は第30章。この章は「通関の手続きがある」とだけ書いた。
*/
