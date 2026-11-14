/* 第15章 事実確認表（担当 D、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 規格 | ASHRAE TC 9.9 の指針『Thermal Guidelines for Data Processing Environments』の確認できた最新の版は第5版（Revised and Expanded）。参照カードの表題は 2021 Equipment Thermal Guidelines…、著作権表示は 2021, 2024 | 第5版 | 参照カードの著作権表示 2021, 2024 | ASHRAE TC 9.9『2021 Equipment Thermal Guidelines for Data Processing Environments（参照カード）』 | https://www.ashrae.org/file%20library/technical%20resources/bookstore/supplemental%20files/therm-gdlns-5th-r-e-refcard.pdf | ○ | 2026-11-14 | 本文「温湿度の範囲」、c15-ashrae |
| 2 | 規格 | 推奨範囲（A1〜A4 共通）：乾球温度 18〜27 ℃、露点 −9〜15 ℃、相対湿度の上限は 50 または 70%RH と表記 | 18〜27 ℃／−9〜15 ℃ | 同上 | 同上 | 同上 | ○ | 2026-11-14 | 本文、c15-ashrae、c15-quiz |
| 3 | 規格 | 許容範囲（機器の運転時）：A1 15〜32 ℃・8〜80%RH・露点上限 17 ℃／A2 10〜35・8〜80・21／A3 5〜40・8〜85・24／A4 5〜45・8〜90・24。許容の下限は露点 −12 ℃・8%RH | 表のとおり | 同上 | 同上 | 同上 | ○ | 2026-11-14 | c15-ashrae |
| 4 | 規格 | H1（参照カードで High-Density）：推奨 18〜22 ℃、許容 15〜25 ℃・8〜80%RH・露点上限 17 ℃ | 18〜22 ℃／15〜25 ℃ | 同上 | 同上 | 同上 | ○ | 2026-11-14 | 本文「空冷の限界」、c15-ashrae |
| 5 | 規格 | H1 は新しいクラスで、許容 15〜25 ℃、推奨 18〜22 ℃（白書の記述） | 同上 | 2021 | ASHRAE TC 9.9『Emergence and Expansion of Liquid Cooling in Mainstream Data Centers』 | https://www.ashrae.org/file%20library/technical%20resources/bookstore/emergence-and-expansion-of-liquid-cooling-in-mainstream-data-centers_wp.pdf | ○ | 2026-11-14 | 本文「空冷の限界」 |
| 6 | 規格 | 標高 900 m を超える場所では、乾球温度の上限を下げる補正が参照カードにある（補正の値は書かない） | — | 参照カード | 同 1 | 同 1 | ○ | 2026-11-14 | 本文、c15-ashrae の注 |
| 7 | 一般知識 | 空気の比熱 c_p は 1.005 kJ/(kg·K)（300 K の理想気体の表の値） | 1.005 kJ/(kg·K) | 300 K。版の日付の記載なし。2026-11-14 に確認 | Claire Yu Yan『Introduction to Engineering Thermodynamics』Appendix G（表 G1）。BCcampus 経由、Engineering LibreTexts 掲載 | https://eng.libretexts.org/Bookshelves/Mechanical_Engineering/Introduction_to_Engineering_Thermodynamics_(Yan)/07%3A_Appendices/7.07%3A_Appendix_G_-_Properties_of_Various_Substances | × | 2026-11-14 | 本文「熱を運ぶ式」、演習 |
| 8 | 仕様値 | 標準の日の海面の空気の密度は 1.229 kg/m³（温度 15 ℃、圧力 101.3 kN/m²） | 1.229 kg/m³ | 日付の記載なし。2026-11-14 に確認 | NASA Glenn Research Center『Properties of Air（text version）』 | https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/properties-of-air-text-version | ○ | 2026-11-14 | 本文「熱を運ぶ式」、演習 |
| 9 | 定義 | 熱量 ＝ 質量流量 × 比熱 × 温度差。質量流量 ＝ 密度 × 風量 | — | — | 伝熱・熱力学の教科書（一般知識。値は 7・8 の出典） | —（教科書） | × | 2026-11-14 | 本文、演習、c15-quiz |
| 10 | 一般知識 | 消費電力はほぼすべて熱になる／顕熱と潜熱／ホットアイル・コールドアイル、封じ込め、ブランキングパネル、再循環・バイパス、CRAH と CRAC の違い、列間空調、ファンの電力が風量で大きく増える／騒音 | — | — | 伝熱・空調・流体機械の教科書（一般知識。数値を伴わない） | —（教科書） | × | 2026-11-14 | 本文、c15-flow、c15-room、c15-glossary |
| 11 | 一般知識 | 演習の計算：熱量 10 kW・温度差 10 ℃・5 ℃（すべて架空）から、7・8 の値で風量を計算。質量流量 約 0.995 kg/s と約 1.99 kg/s、風量 約 0.81 m³/s と約 1.62 m³/s（本講座の計算。演習用） | 約 0.81／約 1.62 m³/s | 架空の入力 | 本講座の演習（式は 9、値は 7・8） | — | — | 2026-11-14 | 本文の演習 |
確認できず書かなかった：
- ASHRAE TC 9.9 の第5版より新しい版：ASHRAE の公開ページ・検索で第6版などの存在を確認できなかった。
- 推奨範囲の相対湿度の条件（50%RH と 70%RH の使い分け）：参照カードは「50 または 70」と表記するのみで、条件の説明がなく、規格の本文は有料のため読めなかった。
- 空気の比熱・密度を同じ条件（同じ温度）で揃えた値：出典が別々（300 K の比熱、15 ℃の密度）。差は演習の注で条件として明記した。
- 空気側の封じ込め・ブランキングパネルの効果の数値：公開の一次資料の個別ページを確認できず、数値は書かなかった。
*/
