/* 第24章 事実確認表（担当 D、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 規格 | BACnet は ANSI/ASHRAE Standard 135-2024。販売ページで現行（status current）と確認。訂正の要約は 2026-06-29 付 | 135-2024 | 2024 年版 | ASHRAE『ANSI/ASHRAE Standard 135-2024』（BACnet、販売ページ） | 個別ページの URL を控えられなかった（再確認が要る。ASHRAE のブックストアの BACnet の項） | ○ | 2026-11-14 | 通信の方式の表、c24-glossary、c24-mapping |
| 1a | 規格 | （第4部の検証で URL を補う）ASHRAE の 135-2024 の訂正の要約（2026-06-29 付、ashrae.org）と、BACnet 委員会（ASHRAE SSPC 135）のサイトの告知「ANSI/ASHRAE 135-2024 Now Published」（2024-12-31、135-2020 への 17 の追補を含む） | 135-2024 | 2024-12-31／2026-06-29 | ASHRAE『135-2024 errata summary』／BACnet Committee『ANSI/ASHRAE 135-2024 Now Published』 | https://www.ashrae.org/file%20library/technical%20resources/standards%20and%20guidelines/standards%20errata/standards/135-2024-errata-summary-2026-06-29.pdf 、https://bacnet.org/news/ansi-ashrae-135-2024-now-published/ | ○（訂正の要約「BACnet Errata」2026-06-29 を取得して確認）／△（委員会サイト） | 2026-11-14 | 参照資料 |
| 2 | 規格 | ASHRAE の BACnet のページは「BACnet は ISO の規格（EN ISO 16484-5）」と述べる | ISO 16484-5 | 2026-11-14 に確認 | ASHRAE『BACnet』のページ | 同上（第4部の検証で再確認できず。本文からはこの記述を外し、ISO の規格は #3a の ISO のページで示した） | ○ | 2026-11-14 | （第4部の検証で本文から外した） |
| 3 | 規格 | ISO 16484-5:2022 は第7版（iteh の掲載で確認。同掲載は、改訂版により置き換わったと表示）。ISO のページ自体は取得できず、現行の版は未確認。ISO 16484-5 にイーサネット（ISO 8802-3）と MS/TP の規定の節がある | 第7版（2022） | 2022 | ISO『ISO 16484-5』（iteh Standards の掲載を確認） | https://www.iso.org/standard/84964.html（第4部の検証で ISO のページを確認：第 7 版、2022-09、「改訂予定」の表示） | ○ | 2026-11-14 | 通信の方式の本文、stack c24-stack |
| 3a | 規格 | （第4部の検証で追加）ISO 16484-5:2026 は第 8 版、2026-08 の公開、ISO/TC 205 | 第 8 版（2026） | 2026-08 | ISO『ISO 16484-5:2026』 | https://www.iso.org/standard/92057.html | ○ | 2026-11-14 | 通信の方式の表、参照資料 |
| 4 | 仕様 | Modbus Messaging on TCP/IP Implementation Guide V1.0b：クライアントとサーバーの要求と応答、7 バイトの MBAP ヘッダ、TCP のポート 502。文書の日付は 2006-10-24。modbus.org の仕様のページに掲載（本文は anl.gov の写しで読んだ） | 7 バイト／ポート 502 | 2006-10-24 | Modbus Organization『Modbus Messaging on TCP/IP Implementation Guide V1.0b』 | https://modbus.org/modbus-specifications（第4部の検証で確認：「Modbus TCP/IP」の項に Messaging Implementation Guide version 1.0b として掲載。PDF は https://www.modbus.org/file/secure/messagingimplementationguide.pdf 、PDF 自体は未取得） | △ | 2026-11-14 | 本文、c24-stack、c24-exam |
| 5 | 標準 | SNMP（バージョン 3）は STD 62。RFC 3411（アーキテクチャ）、3412（メッセージの処理）、3413（アプリケーション）、3414（USM）、3415（VACM）、3416（プロトコルの操作）、3417（トランスポートの対応）、3418（MIB）。2002 年 12 月 | 8 つの RFC | 2002-12 | IETF／RFC Editor『STD 62』 | https://www.rfc-editor.org/info/std62 | ○ | 2026-11-14 | 通信の方式の表、c24-stack |
| 6 | 仕様 | Redfish のスキーマ束（DSP8010、2026.1、2026-04-02）の変更履歴に、Facility（1.4.0、Release 2023.1 に CDU・ImmersionUnits・CoolingLoops のリンク）、PowerDistribution（1.5.0／1.6.0）、CoolingUnit（初版 1.0.0、2023.1）、CoolingLoop（初版 1.0.0、2023.1）、LeakDetection（初版 1.0.0、2023.1）が載る。取得できたのはページの前半（0〜100000 文字） | — | 2026.1（2026-04-02） | DMTF『Redfish Schema Bundle Readme（DSP8010）』 | https://redfish.dmtf.org/schemas/v1/DSP8010_2026.1.pdf | ○ | 2026-11-14 | 「DCIM」の節、c24-mapping |
| 7 | 発表 | Google の 2025-08-04 付のブログ：機械学習の処理を対象にした需要応答の合意を、Indiana Michigan Power と TVA と結んだ。以前に OPPD での実証がある。柔軟性は初期の段階。本文は、各社の本社の国を確認できていないため、「米国の複数の電力事業者」とだけ書いた | 2 社＋実証 1 社 | 2025-08-04 | Google『（機械学習の需要応答の記事。Google のブログ）』 | https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/how-were-making-data-centers-more-flexible-to-benefit-power-grids/（第4部の検証で確認：2025-08-04、I&M と TVA、「still in the early stages and will only be available at certain locations」） | ○ | 2026-11-14 | 「デマンドレスポンス」の節 |
| 8 | 企業 | Google の本社は米国マウンテンビュー（Alphabet の 424B5 で確認。第16章の事実確認表と同じ） | 米国 | 第16章の表と同じ | Alphabet『424B5』 | 第16章の facts を参照 | ○ | 2026-11-14 | 「デマンドレスポンス」の節の「Google（米国）」 |
| 9 | 一般知識 | 監視制御の層（現場の機器・制御器・BMS／EPMS・DCIM）、BMS・EPMS・DCIM の定義、制御ループ（測る・比べる・動かす）、遅れによるハンチング、パワーキャッピング、DVFS、スケジューラとの連携、デマンドレスポンスの仕組み。数値を伴わない | — | — | 制御工学・ビル設備・データセンター運用の教科書（一般知識） | —（教科書） | × | 2026-11-14 | 本文、c24-layers、c24-loop |
| 10 | 一般知識 | BACnet の層の構成（アプリケーション・ネットワーク・データリンク・物理）：教科書的な説明で、規格の本文では確認していない。図の注に「一般知識」と書いた | — | — | 同上 | — | × | 2026-11-14 | c24-stack の BACnet |
| 11 | 一般知識 | 演習 6 ケースのログ・数値（UPS の残り 14 分、CDU 二次側 41 ℃、冷水 14 ℃ など）はすべて架空 | 架空 | — | 本講座の演習 | — | — | 2026-11-14 | c24-drill |
| 12 | 一般知識 | ASHRAE の推奨範囲を、設定温度の根拠のひとつとする記述は、第15章の事実確認表の値を参照するのみ。この章に新しい数値はない | — | — | 第15章の facts を参照 | — | ○ | 2026-11-14 | 「冷却の制御」の節 |
確認できず書かなかった：
- BACnet/IP（IP 上の方式）と UDP の詳細：個別の一次ページを確認できず、BACnet の図は「イーサネット上の例」とした。
- （第4部の検証で解消）ISO 16484-5 の現行の版：ISO のページで 2026 年の第 8 版を確認し、本文と参照資料を更新した（#3a）。
- 需要応答の合意の相手の電力事業者の本社の国：確認できず、「米国の複数の電力事業者」とした。事業者名は本文に書いていない。
- 個別の BMS・DCIM 製品の機能、公開の技術資料：確認できず、製品名・企業名は書いていない。
- Redfish の施設向けスキーマの各プロパティ：スキーマの有無（名前）のみ確認し、中身は書かなかった。
- パワーキャッピングを BMC で設定する標準の仕組み（Redfish の電力の上限のプロパティなど）：確認できず、「製品ごとに違う」とだけ書いた。
- ISO 16484-5 のイーサネット以外の方式と、BACnet の版ごとの違い：書かなかった。
*/
