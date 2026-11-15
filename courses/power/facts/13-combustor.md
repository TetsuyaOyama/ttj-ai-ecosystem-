/* 第13章 事実確認表（担当 D、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 定義 | 燃焼器は、圧縮空気に燃料を噴射して燃焼させる部分 | — | 日付の記載なし（確認 2026-11） | 日本ガスタービン学会『ガスタービンとは？』 | https://www.gtsj.or.jp/gasturbin/index.html | ○ | 2026-11-14 | 本文「燃焼器の仕事」 |
| 2 | 仕様値 | Siemens Energy は SGT5-8000H の燃焼器を缶環状（can annular）、SGT6-5000F の燃焼器を環状（annular）と書く（SGT5-8000H のページは別の節で「advanced annular combustion system」とも書く。2026-11-15 に検証担当が再確認）。条件：製品ページの構造の記述、ページの日付 2026-08（メタデータ） | — | ページの日付 2026-08 | Siemens Energy『SGT5-8000H』『SGT6-5000F』製品ページ | https://www.siemens-energy.com/global/en/home/products-services/product/sgt6-5000f.html | ○ | 2026-11-14 | 本文「燃焼器の形と部分」 |
| 3 | 仕様値 | 三菱重工業の技術論文の表は、M501J 形（60 Hz 機）の燃焼器を 16 缶、M701J 形（50 Hz 機）を 22 缶と書く。M501J 形は蒸気冷却、M501JAC 形は空気冷却。条件：2013 年の技術論文の記述、設計の値 | 16 缶、22 缶 | 三菱重工技報 Vol.50 No.3、2013 | 三菱重工業『1600℃級Ｊ形技術を適用した発電用高効率ガスタービンの開発』 | https://www.mhi.com/jp/technology/review/sites/g/files/jwhtju2326/files/tr/pdf/503/503002.pdf | ○ | 2026-11-14 | 本文「燃焼器の形と部分」 |
| 4 | 定義 | 天然ガスの燃焼で生じる NOx は、ほぼすべてがサーマル NOx。水・蒸気の噴射は効果が大きい一方、熱効率が下がり CO が増える。乾式低 NOx 燃焼器は DLN などの名前で呼ばれる。条件：米国の資料（米国の規制の文脈）、数値は書かない | — | Fifth Edition, Supplement F、2000-04 | 米国環境保護庁（EPA）『AP-42 Section 3.1 Stationary Gas Turbines』 | https://www.epa.gov/sites/default/files/2020-10/documents/c03s01.pdf | ○ | 2026-11-14 | 本文「窒素酸化物を下げる方法」、c13-nox-methods |
| 5 | 定義 | 噴射を増やすと燃焼器内の圧力の変動が大きくなりうる。純度の高い水が要る。DLN の燃焼器は、約 50% の負荷以下の低い負荷では拡散燃焼で運転するのが一般的で、その間は NOx が増える（2026-11-15 に原文を確認。3 ページ：「Due to the flame instability limitations of the DLN combustor below approximately 50 percent of rated load, the turbine is typically operated in a conventional diffusion flame mode until the load reaches approximately 50 percent.」。「定格負荷の約 50%」）。条件：米国の資料、数値（約 50%）は資料の記述で、機種で違う | 約 50% の負荷以下 | Rev. 1、2022-01 | EPA 委託の調査（ERG・Sargent & Lundy 作成）『Combustion Turbine NOx Control Technologies Memo』 | https://www.epa.gov/system/files/documents/2022-03/combustion-turbine-nox-technology-memo.pdf | ○ | 2026-11-15 | 本文「窒素酸化物を下げる方法」「燃焼振動・逆火・吹き消え」、c13-premix |
| 6 | 定義 | 低 NOx と低 CO は本質的にトレードオフで作動範囲が制約される。燃焼振動の抑止が重要な技術課題。逆火や自発点火を確実に避けようとすると、均質な混合気をつくるのが難しくなる | — | Vol.46 No.2、2018-03 | 日本ガスタービン学会『日本ガスタービン学会誌 Vol.46 No.2 の論文（淀み点保炎噴霧燃焼器の排気性能…）』 | https://www.gtsj.or.jp/technical/contents/vol46no2-01.pdf | ○ | 2026-11-14 | 本文「燃焼振動・逆火・吹き消え」、c13-stab |
| 7 | 仕様値 | GE Vernova は 7HA の燃焼器 DLN 2.6e を advanced premixing を導入したものと説明する。DLN 2.6e は同社の製品の呼称。「DLN」の語は EPA の AP-42 のように一般の説明にも使われるため、本文は「DLN・DLE などは各社の呼称」と書き、他社の方式と同じとは書かない（GLOSSARY §3.3）。条件：製品ページの記述、性能値は書かない | — | 日付の記載なし（確認 2026-11） | GE Vernova『7HA ガスタービン』製品ページ | https://www.gevernova.com/gas-power/products/gas-turbines/7ha | ○ | 2026-11-14 | 本文「窒素酸化物を下げる方法」 |
| 8 | 仕様値 | Siemens Energy の SGT6-5000F の表は NOx を「9 ppmvd 以下（NOx の制御に水の噴射を使わない場合）」と書く。条件：乾きガス、酸素 15% 換算、ISO の大気条件、単純サイクル、燃料は燃料ガス、メーカーの公表値、ページの日付 2026-08 | 9 ppmvd 以下 | ページの日付 2026-08 | Siemens Energy『SGT6-5000F』製品ページ | https://www.siemens-energy.com/global/en/home/products-services/product/sgt6-5000f.html | ○ | 2026-11-14 | 本文「窒素酸化物を下げる方法」 |
| 9 | 企業 | Siemens Energy（ドイツ、Munich）。社名変更：なし（第11章の #10 と同じ確認） | — | 確認 2026-11 | Siemens Energy『Legal Corporate Information SE』 | https://www.siemens-energy.com/global/en/home/general/corporate-information-se.html | ○ | 2026-11-14 | 本文「燃焼器の形と部分」 |
| 10 | 企業 | 三菱重工業（日本、東京）。社名変更：なし（技報の時点の社名で書く。第12章の #8 と同じ確認） | — | 確認 2026-11 | 三菱重工業『Corporate Profile』 | https://www.mhi.com/company/overview/profile | ○ | 2026-11-14 | 本文「燃焼器の形と部分」 |
| 11 | 企業 | GE Vernova（米国、Cambridge, Massachusetts）。社名変更：なし（2024-04-02 に General Electric から分離。第12章の #10 と同じ確認） | — | 確認 2026-11 | GE Vernova『Investor Relations FAQ』 | https://www.gevernova.com/investors/faq | ○ | 2026-11-14 | 本文「窒素酸化物を下げる方法」 |
| 12 | 一般知識 | 燃焼器の形（缶型・環状・缶環状）の分け方、拡散燃焼と予混合燃焼の違い、燃焼振動・逆火・吹き消えの説明、空気比と当量比の定義。数値は書かない | — | — | ガスタービン・燃焼の教科書的な内容 | — | × | 2026-11-14 | 本文「燃焼器の形と部分」「拡散燃焼と予混合燃焼」「燃焼振動・逆火・吹き消え」、c13-comb、c13-premix、c13-stab、c13-quiz |
| 13 | 一般知識 | （架空の値）演習の理論空気量 17 kg/kg と実際の空気 34 kg/kg | — | — | 架空 | — | — | 2026-11-14 | 演習 |
| 14 | 仕様値 | GE Vernova は「OpFlex AutoTune」を 6F・7F・9F 形向けの乾式低 NOx 燃焼器の自動調整の仕組みと説明し、燃焼振動の信号を使って設定を実時間で調整し、季節ごとの手動の再調整を避けられると述べる。排出ガスの信号に頼る仕組みより応答が速いと説明（2026-11-15 に検証担当が再確認。原文は「faster response than other systems that rely on emissions feedback」）。条件：メーカーの製品ページの説明、性能値なし。調整する対象（燃料の配分か）は書かれていない。メーカー自身の説明で、第三者の確認ではない。導入数などの数字は本文に書かない | — | 日付の記載なし（確認 2026-11、© 2026） | GE Vernova『OpFlex AutoTune for F-class』製品ページ | https://www.gevernova.com/gas-power/products/digital-and-controls/opflex/combustion-versatility/autotune-f-class | ○ | 2026-11-14 | 本文「燃焼調整」の自動調整の段落 |
| 15 | 一般知識 | 燃焼調整の目的・見る信号（排出ガス・圧力変動・排気温度分布・火炎の安定）・動かすもの（燃料の配分、パイロットと主の比率、空気側）・行う時期・相反する関係の傾向・調整の流れ。数値・手順は書かない。トレードオフの根拠は #6（2018 年の論文） | — | — | ガスタービン・燃焼の教科書的な内容、コーディネータの依頼の項目 | — | × | 2026-11-14 | c13-tune-signal、c13-tune-trade、c13-tune-flow |
確認できず書かなかった：
- 燃焼器の缶数・形式の、現行の機種ごとの公表値（第17章の持ち主。本章は仕組みの例として 2 件）
- 日本の発電所での低 NOx 燃焼器の導入の時期と割合（出典なし）
- 燃焼振動の発生しやすい条件の数値、調整の値と手順（メーカーと運転者の領域。書かない方針）
- 触媒を使う燃焼（触媒燃焼）の製品例（一次資料を確認していない。本文は書かない）
- 他社の自動の燃焼調整の仕組み（公式の個別ページで確認できたのは GE Vernova の 1 件のみ）
- 燃焼調整の具体の手順・設定値・合否の基準（メーカーと事業者の領域。書かない方針）
- 他社（三菱重工業など）の低 NOx 方式の名称と NOx の公表値（条件つきで確認できたのは Siemens Energy の 1 件のみ）
*/

定義と式の照合（第13章）
| 量 | 本文の定義の文 | 式（§9.4 の番号） | 用語集の d | 演習・問の使い方 | 一致 |
|---|---|---|---|---|---|
| 空気比 | 実際の空気の量 ÷ 理論空気量（質量どうし） | 式 16 | 第10章の持ち主（本章の用語集は入れない） | 演習：34 ÷ 17 ＝ 2.0（架空） | ○ |
| 当量比 | 1 ÷ 空気比 | 式 16 | 同上 | 演習：17 ÷ 34 ＝ 0.5（架空） | ○ |

検算 空気比: 2.0 = 34 / 17
検算 当量比: 0.5 = 17 / 34

演習の照合（第13章）
| 問・演習 | 正答（要点） | 照らした本文・図（節・データ id・手の番号） | 本文・図の記述（要点を写す） | 一致 |
|---|---|---|---|---|
| c13-quiz 問1 | 薄い混合気で火炎の温度が下がり、サーマル NOx が減る | 本文「拡散燃焼と予混合燃焼」「窒素酸化物を下げる方法」、c13-premix | 「薄い混合気を使うと、火炎の温度を下げられる」「サーマル NOx は火炎が高温なほど増える」 | ○ |
| c13-quiz 問2 | 圧力の振動が大きくなり、部品に振動の力が加わるおそれ | 本文「燃焼振動・逆火・吹き消え」、c13-stab の状態「燃焼振動の増大」 | 「圧力の振動が大きくなる。強くなると部品に振動の力が加わる」 | ○ |
| c13-quiz 問3 | 熱効率が下がること、一酸化炭素が増えること | 本文「窒素酸化物を下げる方法」、c13-nox-methods の行 1 | 「熱効率が下がること、一酸化炭素が増えることを挙げます」 | ○ |
| c13-exam 1 | 乾式の予混合は、水を使わず薄い混合気で火炎の温度を下げる（誤答は DLN が共通の名前、排煙脱硝は燃焼器の中、低 NOx ほど安定に燃やすのは易しい） | 本文「窒素酸化物を下げる方法」「燃焼振動・逆火・吹き消え」、c13-nox-methods | 「DLN・DLE などは各社の呼称」「排煙脱硝は燃焼の後の排気を処理」「安定に燃やすのは難しくなる」 | ○ |
| 演習（本文）空気比と当量比 | 空気比 2.0、当量比 0.5（架空） | 本文「演習：空気比と当量比」の式 16 | 空気比 ＝ 実際の空気の量 ÷ 理論空気量、当量比 ＝ 1 ÷ 空気比 | ○ |
| 燃焼調整の節（c13-tune-signal・trade・flow、演習） | 信号→疑う現象、動かす方向→良くなる指標と悪くなる指標、流れは測る→判断→動かす→確かめる→記録 | 本文「燃焼調整」 | 同じ内容、値と手順は書かない旨を明記 | ○ |
