/* 第23章 事実確認表（担当 E、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 規格 | Redfish の EventService は /redfish/v1/EventService、Subscriptions は通知の宛先の集まり、ServerSentEventUri は SSE のリンク（第19章で確認済みの内容を再掲） | — | 2022.3 | DMTF『DSP2046 2022.3』§6.35、§6.36 | https://www.dmtf.org/sites/default/files/standards/documents/DSP2046_2022.3.pdf | ○ | 2026-11-14 | 本文「何を監視するか」、c23-seq |
| 2 | 規格 | IPMI v2.0 の目次に SEL（システムイベントログ）の章がある（第19章で確認済み） | Rev 1.1 | 2013-10-01 | Intel ほか『IPMI Specification, Second Generation, v2.0』 | https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-intelligent-platform-mgt-interface-spec-2nd-gen-v2-0-spec-update.pdf | ○ | 2026-11-14 | 本文「何を監視するか」 |
| 3 | 一般知識 | メトリクス・ログ・トレースの整理、警報の設計、切り分けの手順、RMA、インシデント対応の流れ、ポストモーテム（個人を責めない理由）、演習のログ（架空） | — | — | 運用の一般的な説明。数値・固有名は書かない | —（教科書的な説明） | × | 2026-11-14 | 本文、c23-*、クイズ、試験 |
| 4 | 定義 | OpenTelemetry は、テレメトリ（トレース・メトリクス・ログなど）を作り・送り出し・集めるための、オープンソースで製品・道具に依存しない枠組みと道具の集まり。バックエンドそのものではない。CNCF のプロジェクトで、OpenTracing と OpenCensus の統合でできた（育成段階はページに記載なし） | — | 確認時のページ | OpenTelemetry『What is OpenTelemetry?』 | https://opentelemetry.io/docs/what-is-opentelemetry/ | ○ | 2026-11-14（第4部の検証で追加） | 本文「メトリクス・ログ・トレース」、用語集、参照資料 |
確認できず書かなかった：
- OpenTelemetry の CNCF での育成段階：第4部の検証で公式文書（#4）を確認し、位置づけは本文に補ったが、育成段階は CNCF のページを取得できず書いていない。
- ポストモーテムの公開出典（Google の SRE 書籍など）：ページを取得できず、考え方として一般化して書いた。出典名は挙げていない。
- サーバーメーカーの保守ガイドの個別内容、RMA の各社の運用条件：確認していないため、「契約による」とだけ書いた。
*/
