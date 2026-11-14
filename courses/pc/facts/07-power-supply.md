/* 第07章 事実確認表（担当 C、確認 2026-11-14〜2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 規格 | ATX 電源の設計ガイドの名前と版。Intel の文書番号 336521。執筆時点（2026 年 11 月）で Intel の公開ページに載る版は Rev 2.1a。表紙は「Revision 2.1a、November 2023」 | Rev 2.1a | 公開ページの日付 2023-11-02、表紙 2023 年 11 月 | Intel『ATX Version 3 Multi Rail Desktop Platform Power Supply Design Guide』 | https://www.intel.com/content/www/us/en/content-details/336521/atx-version-3-multi-rail-desktop-platform-power-supply-design-guide.html／https://cdrdv2-public.intel.com/336521/336521_Rev2p1a.pdf | ○ | 2026-11-14 | 本文「設計ガイドの版」、c07-conn、mapping |
| 2 | 規格 | 公開ページは、このガイドをデスクトップ向け電源ユニットの電気・機械の設計情報とし、「通称 ATX 電源の仕様」と説明。電気的特性は標準の機械的な大きさに共通 | — | 同上 | 同上 | 同上（ページ） | ○ | 2026-11-14 | 本文「ATX 電源」 |
| 3 | 規格 | 改版履歴：Rev 2.1（2023 年 9 月）で 12VHPWR の記述を 12V-2x6 に改め、PCIe CEM Rev 5.1 を参照。同ガイドの PCI Express のカードの節は、12V-2x6 は CEM 5.0 で導入された 12VHPWR に「信頼性の問題に対処するため」代わり、新しい設計は 12V-2x6 だけを載せる、と書く（検証 2026-11-14 に再確認。本文は「改称」でなく「代わる」と書く）。Rev 2.1a（2023 年 11 月）で 12V-2x6 のケーブルの差し込みの指針を更新（p.14） | 2.1／2.1a | 2023-09／2023-11 | 同上 | https://cdrdv2-public.intel.com/336521/336521_Rev2p1a.pdf（改版履歴 pp.8–14） | ○ | 2026-11-14 | 本文「設計ガイドの版」、c07-conn |
| 4 | 規格 | ガイドは、すべての電源ユニットが完全に一致する必要はないと書き、節に「必須」「推奨」「任意」の区別を付ける（Sec.1、Table 1-2） | — | Rev 2.1a | 同上 | 同上（Sec.1、p.15） | ○ | 2026-11-14 | 本文「設計ガイドの版」 |
| 5 | 規格 | 交流の入力は、90〜135 V（公称 115 V）と 180〜265 V（公称 230 V）の 2 つの範囲、47〜63 Hz（Sec.4.1、Table 4-1）。注：ガイドの数字は 265 V | 90〜135 V／180〜265 V／47〜63 Hz | Rev 2.1a | 同上 | 同上 | ○ | 2026-11-14 | 本文「交流の入力」、c07-label の説明 |
| 6 | 規格 | 直流の出力は +12 V（+12V1・+12V2）、+5 V、+3.3 V、−12 V（任意）、待機用の +5 V（+5VSB）（Sec.4.2、Table 4-2） | 5 種 | Rev 2.1a | 同上 | 同上 | ○ | 2026-11-14 | 本文「全体像」、c07-label、c07-out |
| 7 | 規格 | メイン電源のコネクタは 24 ピン（Sec.5.2.2.1、Table 5-1）。+3.3 V・+5 V・+12 V・−12 V・待機用 +5 V・PS_ON#・PWR_OK などのピンがある | 24 | Rev 2.1a | 同上 | 同上 | ○ | 2026-11-14 | c07-conn の 1 行目 |
| 8 | 規格 | CPU の +12 V の補助電源は、8 ピン（2x4）1 個、または 4 ピン（2x2）1〜2 個（Sec.2.2.1、Sec.5.2.2.5、Table 5-8・5-9） | 8／4 | Rev 2.1a | 同上 | 同上 | ○ | 2026-11-14 | c07-conn の 2 行目 |
| 9 | 規格 | PCIe の補助電源：2x3（6 ピン）75 W（Table 5-4）、2x4（8 ピン）150 W（Table 5-5）、12V-2x6 は +12 V で最大 600 W（Sec.5.2.2.4.3、Table 5-7）。12V-2x6 の接点は 16（電力 12＝+12 V 6・戻り 6、信号 4）。信号は SENSE0・SENSE1（必須）ほか。16 AWG の線、1 ピン 9.2 A（Sec.2.2.1） | 75 W／150 W／600 W／16 接点 | Rev 2.1a | 同上 | 同上 | ○ | 2026-11-14 | c07-conn の 3〜5 行目、本文 |
| 10 | 規格 | 12V-2x6 は、2x3・2x4 の補助電源のコネクタと互換でない（"not compatible"）。3 種の PCIe 補助電源は直接は入れ替えられない（Sec.2.2.1）。着脱式の電源ユニットは、両端が同じ形の 12V-2x6 ケーブルに対応するため、SENSE0・SENSE1 は電源ユニットの内側で設定する（Sec.3.3.1） | — | Rev 2.1a | 同上 | 同上 | ○ | 2026-11-14 | 本文「コネクタ」 |
| 11 | 規格 | SATA 電源のコネクタは、設計ガイドで「必須」の節（Sec.5.2.2.6、Table 5-10）。接点の数は、SATA の規格との数え方の一致が未確認のため、本講座は書かない | — | Rev 2.1a | 同上 | 同上 | ○ | 2026-11-14 | c07-conn の 6 行目 |
| 12 | 規格 | 保護：過電圧保護はラッチ式が必須（4.5.1）、短絡保護はシャットダウンしてラッチ（4.5.2）、無負荷でも損傷・危険がない（4.5.3）、過電流保護はラッチ式のシャットダウンを推奨（4.5.4）、過熱保護は必須で、ラッチしない方式なら復帰の余裕（ヒステリシス）が要る（4.5.5） | — | Rev 2.1a | 同上 | 同上 | ○ | 2026-11-14 | 本文「保護回路」、用語集 |
| 13 | 規格 | ガイドには、SFX12V 固有の指針の節がある（複数の SFX の形、ファンの大きさの記述を含む）。寸法の数字は本講座では書かない | — | Rev 2.1a | 同上 | 同上 | ○ | 2026-11-14 | 本文「形とケーブル」 |
| 14 | 規格 | 80 PLUS の等級は Standard・Bronze・Silver・Gold・Platinum・Titanium・Ruby の 7 つ。基準の下限は「定格出力の 10%・20%・50%・100% で 80% 以上、力率 0.9 以上」（プログラムの詳細ページの書き方） | 7 等級 | 日付の記載なし（2026-11-14 に確認） | CLEAResult『80 PLUS Program Details』 | https://www.clearesult.com/80plus/program-details | ○ | 2026-11-14 | c07-cert、本文 |
| 15 | 規格 | 115 V の内部・非冗長の区分での効率：Standard 80/80/80%（20/50/100% 負荷）、Bronze 82/85/82、Silver 85/88/85、Gold 87/90/87、Platinum 90/92/89、Titanium 92/94/90（さらに 10% 負荷で 90%）。同じ値を別の問い合わせで 2 回取得して一致。注：同ページの Bronze の力率が、主表（0.90）と別表（0.95）で食い違うため、力率は書かない | 表のとおり | 日付の記載なし（2026-11-14 に確認） | CLEAResult『What do the different PSU (power supply units) ratings mean?』（URL は ratings-explained） | https://www.clearesult.com/80plus/80plus-psu-ratings-explained | ○ | 2026-11-14 | 本文の HTML の表 |
| 16 | 規格 | 80 PLUS の試験：デスクトップ向けの負荷点は 0・2・5・10・20・50・100%（500 W 未満は 2% を固定 10 W に置換）。各負荷点で 15 分。入力は 115 V と、欧州の 230 V。周波数は 230 V 欧州の内部・非冗長で 50 Hz、ほかの交流は 60 Hz | 7 点／15 分 | 日付の記載なし | CLEAResult『80 PLUS Certification Program FAQs』 | https://www.clearesult.com/80plus/frequently-asked-questions | ○ | 2026-11-14 | c07-cert |
| 17 | 規格 | 同 FAQ は、この認証を「PSU の効率の等級」として説明し、品質・安全・信頼性には触れていない。全高調波ひずみ（ITHD）は報告するが合否の基準にしない | — | 同上 | 同上 | 同上 | ○ | 2026-11-14 | 本文「示さないもの」、c07-cert、c07-quiz |
| 18 | 企業 | 80 PLUS の運営元は CLEAResult（FAQ の記述）。本社の国は公式の会社概要を確認できず、本文は国を書かない | — | 2026-11 | 同上 | 同上 | ○ | 2026-11-14 | 本文（初出） |
| 19 | 規格 | Cybenetics の ETA（効率）：等級は Diamond・Titanium・Platinum・Gold・Silver・Bronze の 6 つ。入力 115 V と 230 V で基準が別。総合の効率は、1,450 通りより多い負荷の組合せの平均。ほかに力率・5VSB の効率・待機電力、騒音を見る。ページは©2024 の表示で日付の記載なし。数値の基準は本講座では書かない（確かめた範囲で等級の名前と測り方だけ） | 6 等級／1,450 超の負荷の組合せ | 日付の記載なし（2026-11-14 に確認） | Cybenetics『ETA Efficiency Certification』 | https://www.cybenetics.com/index.php?option=eta | ○ | 2026-11-14 | c07-cert |
| 20 | 規格 | Cybenetics の認証の文書：Doc. No. P16-F01、Version 05、日付 2026-11-02（文書の表記は 02-11-2026）。ETA は 6 つの等級、騒音の認証 LAMBDA は A++ から Standard までの 7 つの等級。騒音の測定の距離・位置は文書に書かれていない | 6／7 等級 | Version 05（2026-11-02） | Cybenetics『Certification Scheme for PSU and Cooling Product Performance』 | https://cybenetics.com/attachs/85-v05.pdf | ○ | 2026-11-14 | c07-cert |
| 21 | 企業 | Cybenetics Ltd の所在地は Nicosia, Cyprus（ページの住所）。本文は「Cybenetics（キプロス）」と書く | — | 2026-11 | Cybenetics（ETA ページの会社の表示） | https://www.cybenetics.com/index.php?option=eta | ○ | 2026-11-14 | 本文（初出） |
| 22 | 企業 | Intel の本社は米国カリフォルニア州 Santa Clara（「Santa Clara is home to Intel's headquarters」）。本文は「Intel（米国）」 | — | 2026-11 | Intel『Intel in California』 | https://www.intel.com/content/www/us/en/corporate-responsibility/intel-in-california.html | ○ | 2026-11-14 | 本文（初出） |
| 23 | 安全 | 電源ユニットのマニュアル（1）：「Do not open this power supply unit!」「No serviceable components inside!」「Qualified service personnel only!」。取り付けの前に「電源を切り、電源ケーブルを抜く」。コネクタを誤って差すと「マザーボードなどを焼損するおそれ」 | — | 版・日付の記載なし（ファイル名 power_superb550_manual_e.pdf） | GIGABYTE『電源ユニットのユーザーマニュアル（英語）』 | https://download1.gigabyte.com/Files/Manual/power_superb550_manual_e.pdf | ○ | 2026-11-14 | 本文「してはいけないこと」、refs |
| 24 | 安全 | 電源ユニットのマニュアル（2）：「NEVER, under any circumstances, open the power supply unit. High voltage inside.」（p.4）。付属の着脱式ケーブルだけを使う（"USE ONLY the Phanteks modular cables provided with the power supply unit"）。カバーを外すと保証が無効（p.4） | — | 版・日付の記載なし（ファイル名 …Manual-v1.0-WEB） | Phanteks『Revolt SFX HP Manual』（PH-P750GSF ほか） | https://phanteks.com/wp-content/uploads/2024/06/Revolt-SFX-HP-Manual-v1.0-WEB.pdf | ○ | 2026-11-14 | 本文「してはいけないこと」、refs |
| 25 | 安全 | 電源ユニットのマニュアル（3）：「Do not open the power supply case」「High voltages are present in the power supply」。着脱式は「use only manufacturer supplied cables」「Other cables might not be compatible」。「Do not modify the cables and/or connectors」 | — | © 2023 | Corsair『Power Supply Manual』 | https://www.corsair.com/eu/en/explorer/diy-builder/power-supply-units/power-supply-manual/ | ○ | 2026-11-14 | 本文「してはいけないこと」、c07-quiz |
| 26 | 安全 | PC メーカーの安全の案内：電源ユニットまたは危険ラベルの付いた部品は分解しない。内部に危険な電圧・電流・エネルギーがある。コンピュータのカバーを外す前に、電源コードをコンセントからすべて抜く | — | 2020-03（ページのメタ情報） | Lenovo『Power supply assembly（P330 2nd Gen Tower）』 | https://download.lenovo.com/pccbbs/pubs/p330_2nd_gen_tower/html_en/en/Power_supply_assembly_%28topic%29_T0000729481.html | ○ | 2026-11-14 | 本文「してはいけないこと」、refs |
| 27 | 一般知識 | 電源ユニットの内部のコンデンサは、電源ケーブルを抜いた後も電気をためることがある（§9.3 の定型文の根拠）。確かめた範囲では、「抜いた後も電気が残る」と直接書いた公開のマニュアルは見つからなかった。上の 23〜26 の「内部に危険な電圧がある・カバーを開けない」が根拠。数値は書かない | — | — | 電気・電子回路の教科書的な一般知識 | —（教科書。数値を伴わない） | × | 2026-11-14 | §9.3 の定型文、本文 |
| 28 | 一般知識 | 直流の電力 ＝ 電圧 × 電流（W ＝ V × A）。交流の電力は力率が関わる（本講座は交流の電力を計算しない）。効率 ＝ 出力 ÷ 入力。ケーブル・コネクタは、電流が大きいほど太い線・接点が要る | — | — | 電気工学の教科書的な一般知識（数値を伴わない） | — | × | 2026-11-14 | 本文、c07-label、演習 |
| 29 | 制度 | 日本の住宅へは 100 V や 200 V で供給される。周波数は東日本 50 Hz、西日本 60 Hz（「東日本は 50Hz、西日本は 60Hz の周波数の交流を使っている」）。資料に発行年の記載はない | 100 V／200 V／50 Hz／60 Hz | 日付の記載なし（2026-11-14 に確認） | 経済産業省 資源エネルギー庁『エネルギーと技術』（エネルギー教育、技術・家庭科、p.48–51） | https://energy-kyoiku.meti.go.jp/assets/114/m_energy_p48-51.pdf | ○ | 2026-11-14 | 本文「交流の入力」 |
| 30 | 規格 | 瞬間的な大電力：Intel のガイドは、PCIe のカードの電力の超過を想定した表（Table 3-3）を持つ。数値は第12章の表（第12章の確認表 #1）に置く。本章は存在だけを書く | — | Rev 2.1a | 同上（#1） | 同上 | ○ | 2026-11-14 | 本文「余裕を見る理由」 |
確認できず書かなかった：
- 電気用品安全法と PC 用の電源ユニットの関係：経済産業省の個別ページで、現行の取扱いを確かめられなかった（見つかった「電気用品安全法の解釈－対象非対象関係」の PDF は平成15年5月26日付で古く、現行の取扱いと同じかを確かめられなかった）。本文は「確かめられなかったため書かない」とだけ書く。
- 80 PLUS のテストプロトコル文書（Rev 6.7.3 などの PDF）の本文：ページのリンクは確認できたが、PDF の本文は開いていない。等級の表は ratings-explained のページの値。
- 電源ユニットの内部に「ケーブルを抜いた後も電気が残る」と明記した公開の資料：見つからず、定型文（§9.3）の根拠は #26 と #27。
- SFX の規格文書の発行者と版を、独立の文書として確認すること：確認できたのは Intel のガイドの SFX12V の節だけ。「SFX の規格団体」は書かない。
- ATX・SFX の略語の正式な英語の展開：確かめられなかったため本文は展開を書かず、「規格の形の名前」とだけ書く。
- Cybenetics の等級の数値（効率の基準）：ページ内の数値が版で変わるおそれがあるため、本文には書かない。
*/

定義と式の照合（第07章）
| 量 | 本文の定義の文 | 式（§9.4 の番号） | 用語集の d | 演習・問の使い方 | 一致 |
|---|---|---|---|---|---|
| 電力（直流） | 直流の電力は、電圧と電流をかけたもの | 式 1：電力 ＝ 電圧 × 電流（W ＝ V × A） | 電源ユニットの用語集には式を入れない（定格出力の d は「表示する電力」とだけ） | 演習 1：架空の銘板 +12 V・50 A → 12 × 50 ＝ 600 W（2 回計算：50 × 12 ＝ 600）。+5 V・20 A → 100 W、+3.3 V・20 A → 66 W。3 つの最大の合計 600 ＋ 100 ＋ 66 ＝ 766 W は、架空の合計の定格出力 650 W より大きい（2 回計算：12×50＝600、5×20＝100、3.3×20＝66） | ○ |
| 効率 | 電源ユニットが出す電力を、入る電力で割った割合 | 式 3：効率 ＝ 出力の電力 ÷ 入力の電力。入力 ＝ 出力 ÷ 効率 | 同上（式なし） | 演習 2：出力 360 W、効率 90%（0.9）→ 入力 360 ÷ 0.9 ＝ 400 W（検算：400 × 0.9 ＝ 360）。差 400 − 360 ＝ 40 W。「差を熱とみなす」は架空の前提 | ○ |
| 負荷率 | 電源ユニットが出している電力の、定格出力に対する割合 | 式 4：負荷率 ＝ 出力の電力 ÷ 定格出力 | 同上 | 演習 3：出力 300 W、定格出力 600 W → 300 ÷ 600 ＝ 50%（検算：600 × 0.5 ＝ 300）。出力 360 W、定格出力 600 W → 60% | ○ |
