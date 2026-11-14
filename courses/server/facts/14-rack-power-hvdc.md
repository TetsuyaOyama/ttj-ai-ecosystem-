/* 第14章 事実確認表（担当 C、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 規格 | 80 PLUS の等級は Standard・Bronze・Silver・Gold・Platinum・Titanium・Ruby。10%・20%・50%・100% の負荷率で効率を測る。入力電圧・構成の区分があり、データセンター向け冗長電源の区分（230 V 交流・277 V 交流・480 V 交流・380 V 直流など）が挙がる | 7 等級／4 負荷率 | 日付の記載なし（2026-11-14 に確認） | CLEAResult『What is 80 PLUS® certification program?』 | https://clearesult.com/80plus/program-details | ○ | 2026-11-14 | 本文「80 PLUS」、c14-quiz、c14-exam、mapping |
| 2 | 規格 | Ruby は AI データセンターと高性能計算向けの最上位等級と FAQ が説明。効率の基準値は載っていない | — | 同上 | CLEAResult『80 PLUS® Certification Program FAQs』 | https://www.clearesult.com/80plus/frequently-asked-questions | ○ | 2026-11-14 | 本文「80 PLUS」 |
| 3 | 企業 | 80 PLUS の運営元は CLEAResult（国は公式の会社概要で確認できず、本文では国を添えない） | — | — | 同上（FAQ の記述） | 同上 | ○ | 2026-11-14 | 本文、refs |
| 4 | 規格 | Open Rack V3 基本仕様に「48V Busbar Geometry」の節。電源シェルフの出力は公称 51 V（46〜52 V を受ける選択肢）または 54 V（52〜56 V）の 2 つの選択肢 | 51 V／54 V | Rev 1.0、2022-09-22 公開の表示（フッタの日付 2022-08-24） | Open Compute Project『Open Rack V3 Base Specification』 | https://opencompute.org/documents/open-rack-base-specification-version-3-pdf | ○ | 2026-11-14 | 本文「48 V 級バスバー」、c14-chain、c14-methods、mapping |
| 5 | 仕様値 | ORV3 HVDC-LVDC 100kW Power Shelf：入力 ±400〜±410 V の直流（公称）、出力は狭い範囲の 48 V 系、定格 100 kW（18 kW の PSU 6 台） | ±400〜±410 V／100 kW／18 kW×6 | v1.0.0、2026-02-20 | Open Compute Project『ORV3 HVDC-LVDC 100kW Power Shelf Design Specification』 | https://www.opencompute.org/documents/orv3-hvdc-lvdc-100kw-power-shelf-spec-1-0-0-pdf | ○ | 2026-11-14 | c14-chain、c14-methods、mapping |
| 6 | 仕様値 | Open Rack ±400V to 50V 18kW PSU：入力は公称 ±400 V（±5%）、動作範囲 ±380〜±420 V、定格 18 kW | ±400 V／±380〜±420 V／18 kW | v1.0.0、2026-02-20 | Open Compute Project『Open Rack +/- 400V to 50V 18kW PSU Design Specification』 | https://www.opencompute.org/documents/hvdc-lvdc-psu-18kw-spec-1-0-0-pdf | ○ | 2026-11-14 | c14-methods、mapping |
| 7 | 発表 | Google が 2025-04-29 の OCP EMEA Summit に関するブログで、IT ラックを 1 MW 級へ広げる方法として ±400 V 級の直流と、電源部をラックの外の「サイドカー」に出す構成を説明し、OCP で電気・機械インタフェースの標準化を進めると述べた（共同の相手は本文で書かない） | 1 MW／±400 V | 2025-04-29 | Google Cloud『Enabling 1 MW IT racks and liquid cooling at OCP EMEA Summit』（著者 Google の 2 名） | https://cloud.google.com/blog/topics/systems/enabling-1-mw-it-racks-and-liquid-cooling-at-ocp-emea-summit | ○ | 2026-11-14 | 本文、c14-methods |
| 8 | 発表 | NVIDIA が 2025-05-20 の技術ブログで 800 V 直流の構成を示した。施設の境界で交流を 800 V 直流に変え、中間の変換段を減らす。従来の 54 V 直流のラック内配電は電力が大きくなると限界に近づく、と説明。2027 年に 1 MW 級 IT ラックへ対応する計画 | 800 V／1 MW／2027 | 2025-05-20（ページの更新メタ 2026-01-14） | NVIDIA『NVIDIA 800 V HVDC Architecture Will Power the Next Generation of AI Factories』 | https://developer.nvidia.com/blog/nvidia-800-v-hvdc-architecture-will-power-the-next-Generation-of-ai-factories | ○ | 2026-11-14 | 本文、c14-methods |
| 9 | 企業 | NVIDIA・Google は米国（NVIDIA の投資家向けページの所在地は Santa Clara, CA。Google の拠点ページの Googleplex は Mountain View, CA。いずれも公式ページに「本社」の明記はなく、所在地の表示から。検証担当で再確認） | — | 2026-11-14 | NVIDIA Investor Relations／Google『Locations』 | https://investor.nvidia.com/home/default.aspx／https://about.google/company-info/locations/ | ○ | 2026-11-14 | 本文（初出の国の添え） |
| 10 | 発表 | NTT コミュニケーションズが 2019-11-27 の大阪第7データセンターの提供開始の発表で、HVDC システムの導入も予定している、と記した | — | 2019-11-27（提供開始 2019-12-01） | NTT コミュニケーションズ『京阪神エリアからアクセスしやすい関西最大級の「大阪第7データセンター」を提供開始』 | https://www.ntt.com/about-us/press-releases/news/article/2019/1127.html | ○ | 2026-11-14 | 本文、c14-methods |
| 11 | 企業 | NTT コミュニケーションズ株式会社は、2025-07-01 に社名を NTT ドコモビジネス株式会社に変更（同社の会社案内の文言）。本社所在地は東京都千代田区大手町（日本） | — | 2025-07-01（社名変更） | NTT ドコモビジネス『会社案内』 | https://www.ntt.com/about-us/company-profile.html | ○ | 2026-11-14 | 本文（初出で現社名を添える）、refs、c14-methods（検証担当が再確認・修正） |
| 12 | 規格 | ITU-T 勧告 L.1200「Direct current power feeding interface up to 400 V at the input to telecommunication and ICT equipment」、承認 2012-05-29、有効 | 400 V | 2012-05-29 | ITU-T『Recommendation L.1200』 | https://www.itu.int/rec/T-REC-L.1200-201205-I | ○ | 2026-11-14 | 本文、c14-methods、mapping |
| 13 | 一般知識 | 三相交流と相のバランス、バスウェイ、RPP の呼び名、ラック PDU の機能、直流は電流が 0 を横切らず遮断が難しい、同じ電力なら電圧が高いほど電流が小さい | — | — | 電気設備・電気工学の教科書的な内容（数値を伴わない） | — | × | 2026-11-14 | 本文、c14-quiz |
確認できず書かなかった：
- 80 PLUS の等級ごとの効率の基準値（負荷率ごとの %）：運営元のページに表がなく、取得できなかったため書かなかった。
- 80 PLUS の力率の基準：ページ間で記述が異なり確認できず、書かなかった。
- IEC の直流給電に関する規格の有無と番号：検索の上限に達し、IEC の個別ページを確認できなかったため、本文に「IEC の対応する規格は確認できていない」と書いた。
- OCP の Open Rack V3 基本仕様が「12 V から 48 V へ移った」という経緯：仕様に記述がなく、書かなかった。
- 直流給電の損失削減率・効率の改善率（各社の主張の数値）：前提が違う数字を並べないため、本文・表には載せていない。
- HVDC の国内外の採用実績（件数・規模）：公開の統計・一次資料を確認できなかった。
- Meta・Microsoft などの共同の相手の名前（Google のブログの記述）：企業の国の確認が取れないため、本文では書かず、「OCP で標準化を進める」とだけ書いた。
*/

仕上げ時の追記（2026-11-14）：IEC の直流給電に関する規格の有無を IEC webstore で確認した。IEC TS 62735-1:2015（https://webstore.iec.ch/en/publication/23188 、2015-08-28、第 1 版、2.6 kW、直流 294〜400 V、クラス I 機器の 2 極＋接地のプラグ・ソケット）、IEC TS 62735-2:2016（https://webstore.iec.ch/en/publication/27246 、2016-12-14、5.2 kW、同じ電圧範囲）、IEC TS 63236-1:2021（https://webstore.iec.ch/en/publication/63765 、2021-06-25、アプライアンスカプラ、2.6 kW）。いずれも販売ページ（一次○）。3 件とも安定期限（stability date）は 2026 と表示、現在の状況（有効か）は明示なし。給電インタフェース全体の IEC 規格は確認できず、本文は「接続口の仕様」と限定した。
