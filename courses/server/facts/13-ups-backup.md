/* 第13章 事実確認表（担当 C、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 規格 | IEC 62040-3 は UPS の性能と試験の要求の定め方の規格。第3版、2021-04-21。入力 交流 1,000 V まで、出力 交流 1,000 V まで、蓄電部 直流 1,500 V までなどの UPS が対象 | 1,000 V／1,500 V | 第3版 2021-04-21 | IEC『IEC 62040-3:2021 Uninterruptible power systems (UPS) — Part 3: Method of specifying the performance and test requirements』 | https://webstore.iec.ch/en/publication/60140 | ○ | 2026-11-14 | 本文「UPS の方式」、refs |
| 2 | 定義 | UPS の分類は VFI（常時インバータ給電）・VI（ラインインタラクティブ）・VFD（常時商用給電、passive standby）と呼ばれる。VFI は電圧・周波数とも入力から独立、VI は電圧のみ調整、VFD は入力に依存 | — | 日付の記載なし（URL に 2016-12-14） | Schneider Electric のブログ『Choosing the Right UPS Topology for IIOT and Critical Power Applications』 | https://blog.se.com/infrastructure-and-grid/power-management-metering-monitoring-power-quality/2016/12/14/ups-topology-iiot-critical-power-applications/ | ×（規格の分類の解説としては二次。検証担当が △ から修正） | 2026-11-14 | 本文の方式の表、c13-quiz |
| 3 | 定義 | 同じ対応（VFD＝standby、VI＝line-interactive、VFI＝double conversion の通常時）。バイパスモードは VFD の動作。大きな容量では double conversion が主流と説明される | — | 日付の記載なし | Data Center Dynamics『Exploring static UPS systems』 | https://datacenterdynamics.com/en/analysis/exploring-static-ups-systems | × | 2026-11-14 | 本文の方式の表。一般化の注意を本文に付記 |
| 4 | 制度 | 消防庁は 2023-05-31 に、蓄電池設備の規制単位を 4,800 アンペアアワー・セルから蓄電池容量（キロワット時）に見直す省令等の改正の公布を発表。10 kWh 以下は対象外。10 kWh 超 20 kWh 以下は、出火防止措置を講じたものとして消防庁長官が定めるものは対象外。施行は 2024-01-01 | 10 kWh／20 kWh／4,800 Ah・セル | 発表 2023-05-31、施行 2024-01-01 | 総務省消防庁（予防課）報道発表『消防法施行規則及び対象火気設備等の位置、構造及び管理並びに対象火気器具等の取扱いに関する条例の制定に関する基準を定める省令の一部を改正する省令（案）等に対する意見公募の結果及び改正省令等の公布』 | https://www.fdma.go.jp/pressrelease/houdou/items/230531_yobou.pdf | ○ | 2026-11-14 | 本文「蓄電池」、c13-battery |
| 5 | 制度 | 同発表は、開放形鉛蓄電池以外は耐酸性の床上等に設置する必要がなくなる、屋外に設けるもので延焼防止措置を講じたものは建築物からの離隔距離が不要になる、とする（「屋外」の条件は検証担当が原文で確認して追記） | — | 同上 | 同上 | 同上 | ○ | 2026-11-14 | c13-battery の 4 行目 |
| 6 | 制度 | 危険物の第4類（引火性液体）の第二石油類に、灯油・軽油が含まれる（備考）。指定数量は危険物政令の別表で定められる | —（指定数量の値は書かない） | 日付の記載なし | 総務省消防庁の検討会資料『消防法令抜粋（消防法上の危険物の定義、試験方法など）』 | https://www.fdma.go.jp/singi_kento/kento/items/kento147_09_sanko_01_02.pdf | ○ | 2026-11-14 | 本文「非常用発電機」 |
| 7 | 仕様値 | Open Rack V3 48V BBU の仕様は、交流の停電のときにシステムの負荷へ直流を供給するユニットで、シェルフに BBU 6 台を 5+1 の冗長で使い、リチウムイオン電池を使う | 6 台・5+1 | Rev 1.4、2023-09-12 | Open Compute Project『Open Rack V3 48V BBU』 | https://www.opencompute.org/documents/open-rack-v3-bbu-module-spec-1-4-pdf/ | ○ | 2026-11-14 | 本文「ラック内の蓄電」、c13-quiz、mapping |
| 8 | 一般知識 | UPS・ATS・STS・バイパス・非常用発電機の役割、鉛蓄電池とリチウムイオン電池の傾向、発電機は起動して安定するまで時間がかかること | — | — | 電気設備・UPS の教科書的な内容（数値を伴わない） | — | × | 2026-11-14 | 本文、c13-state、c13-seq、c13-battery |
確認できず書かなかった：
- UPS の切替時間、蓄電池の持つ時間、発電機の起動から負荷の引受けまでの時間の数値：公開の一次資料で一般化できる値を確認できなかった。seq に時間を入れていない。
- 鉛蓄電池・リチウムイオン電池の寿命・重量・使用温度の数値：製品ごとに違い、一次資料（データシート）を横断して確認できなかった。傾向の説明にとどめた。
- 軽油の指定数量の値：消防庁の資料で表を確認したが、日付と版を一次資料の個別ページで確認できなかったため、数値は書かなかった。
- IEC 62040-3 の分類（VFI・VI・VFD）の規格本文の記述：IEC のページは分類を述べていない。Schneider Electric のブログと業界メディアの解説で補った（一次は△・×）。
- 総務省消防庁のリチウムイオン蓄電池に特化した通知：報道発表は蓄電池設備全体の見直し（容量 kWh 基準）で、リチウムイオン電池を名指しした記述は確認できなかった。
- OCP の BBU 仕様の保持時間の数値：仕様の目標値を取得したが、解釈の誤りを避けるため書かなかった。
*/
