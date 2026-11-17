# 講座 A「金利と国債、中央銀行の資金供給」— 用語の表記ルール（差分）

共通の決まりは `/home/claude/courses/_finance/GLOSSARY-RULES.md`（共通版）。この文書は、この講座だけの**用語の割り当て**と、共通版の例外だけを書きます。両方にない語は、共通版 §8 の手順で決めてから使います。

## 1. 共通版の例外

なし（2026-11-15 の設計の時点）。例外を足すときは、理由と、講座 B・C に影響するかを書く。

## 2. 用語の割り当て（章をまたいで重複させない）

各語を登録できるのは、ここに書いた章だけです。**太字**は共通版 §6 の共通の用語（見出し語・英語・`d` を共通版から一字一句写す）。`→` は `alias` に入れる語。

| 章 | 登録する語 |
|---|---|
| 序1 | **金利**／**単利**／**複利**／元利合計（principal and interest）／割引（discounting）→割り引く |
| 序2 | 兆円の桁（order of magnitude）は登録しない。登録：残高（outstanding balance）→末残・平均残高／計画と実績（plan and actual） |
| 01 | **年率**／**日数計算**→実日数/365・実日数/360／**ベーシスポイント**→bp・％ポイント／実効年率（effective annual rate）→名目の年率／連続複利（continuous compounding） |
| 02 | **現在価値**／**割引係数**／利付債（coupon bond）→クーポン・利率／割引債（zero-coupon bond）→ゼロクーポン債／額面（face value）→償還／経過利子（accrued interest） |
| 03 | **最終利回り**／直利（current yield）／スポットレート（spot rate）→ゼロクーポン利回り／フォワードレート（forward rate）→先渡しの金利／期間プレミアム（term premium） |
| 04 | **イールドカーブ**／逆イールド（inverted yield curve）／スティープ化（steepening）→フラット化／パー利回り（par yield）→パー・イールド（2026-11-15 追加）／ブル・スティープ（bull steepening）→ベア・スティープ・ブル・フラット・ベア・フラット／カーブのバタフライ（yield curve butterfly）→バタフライ（講座 C のオプションのバタフライと区別するため「カーブの」を付ける）／長短金利差（term spread）→長短スプレッド（2026-11-18 追加） |
| 05 | **デュレーション**／コンベクシティ（convexity）／DV01（dollar value of one basis point）→BPV・金利感応度 |
| 06 | **指標金利**／**無担保コールレート（オーバーナイト物）**／**SOFR**／フェデラル・ファンド実効金利（Effective Federal Funds Rate, EFFR）→フェデラル・ファンド金利／コール市場（call market）→短資会社／後決め複利（compounding in arrears）→参照期間／LIBOR（London Interbank Offered Rate）→TIBOR・指標の移行 |
| 07 | **国債**→日本国債・米国債・JGB／国庫短期証券（Treasury Discount Bills）→T-Bill・短期国債／建設国債（construction bond）→特例国債・赤字国債／物価連動国債（inflation-indexed bond）→TIPS／個人向け国債（JGBs for retail investors） |
| 08 | 国債発行計画（JGB issuance plan）→カレンダーベース市中発行額・発行総額／入札（auction）→価格競争入札・非価格競争入札／コンベンショナル方式（conventional auction）→ダッチ方式・単一価格／国債市場特別参加者（JGB Market Special Participants）→プライマリー・ディーラー（日本）／テール（tail） |
| 09 | プライマリー・ディーラー（primary dealer）／単一価格方式（single-price auction）→uniform price／四半期の借入れの発表（Quarterly Refunding）／債務上限（debt limit）→debt ceiling |
| 10 | 流通市場（secondary market）→発行市場／店頭取引（over-the-counter trading）→相対取引・OTC／公社債店頭売買参考統計値（Reference Statistical Prices for OTC Bond Transactions）／指標銘柄（benchmark issue）→新発債・既発債 |
| 11 | **レポ取引**→現先・現担レポ・新現先／GC レポ（general collateral repo）→SC レポ（special collateral repo）／ヘアカット（haircut）／三者間レポ（tri-party repo）→FICC・二者間 |
| 12 | 決済（settlement）→受渡し／DVP（delivery versus payment）／日銀ネット（BOJ-NET）→国債振替決済制度／Fedwire（Fedwire Funds Service）→Fedwire Securities Service |
| 13 | **中央銀行のバランスシート**→日本銀行勘定・H.4.1／日本銀行券（Bank of Japan notes）→発行銀行券・銀行券／政府預金（government deposits）→国庫／純資産（net assets）→自己資本 |
| 14 | **日本銀行当座預金**／**準備預金**→準備預金制度・所要準備額・準備率／積み期間（reserve maintenance period）／**付利**→補完当座預金制度・IORB・IOER |
| 15 | **公開市場操作**→オペ・資金供給オペ・資金吸収オペ／共通担保資金供給オペレーション（Funds-Supplying Operations against Pooled Collateral）→共通担保オペ／買入れのオペ（outright purchase）→買い切り／適格担保（eligible collateral）／公開市場デスク（Open Market Trading Desk）→デスク |
| 16 | 誘導目標（guideline for money market operations）→金融市場調節方針／フロア方式（floor system）→十分な準備の体制・ample reserves／コリドー方式（corridor system）／ON RRP（Overnight Reverse Repurchase Agreement Facility）→翌日物リバース・レポ |
| 17 | **量的緩和**→大規模資産買入れ・LSAP・QE／**保有資産の縮小**→QT・ランオフ・量的引き締め／再投資（reinvestment）→償還／減額計画（plan for the reduction of JGB purchases） |
| 18 | **常設ファシリティ**→SRF・常設のレポ／補完貸付制度（Complementary Lending Facility）→基準貸付利率／ディスカウント・ウィンドウ（discount window）→primary credit／最後の貸し手（lender of last resort）→スティグマ／FIMA レポ（FIMA Repo Facility） |
| 19 | 資金過不足（surplus or shortage of funds）／銀行券要因（banknote factor）／財政等要因（Treasury funds and others factor）→国庫の出入り／金融調節（money market operations）→当座預金増減要因 |
| 20 | 量的・質的金融緩和（Quantitative and Qualitative Monetary Easing, QQE）／マイナス金利（negative interest rate）→三層構造／長短金利操作（yield curve control）→イールドカーブ・コントロール・YCC／金融政策の多角的レビュー（Broad Perspective Review） |
| 21 | 金融政策決定会合（Monetary Policy Meeting）→政策委員会／展望レポート（Outlook for Economic Activity and Prices）／主な意見（Summary of Opinions）／議事要旨（Summary of Proceedings） |
| 22 | 準備の管理のための買入れ（reserve management purchases）／2019 年 9 月のレポ市場の逼迫は登録しない（出来事。本文だけ） |
| 23 | 連邦公開市場委員会（Federal Open Market Committee, FOMC）→声明・実施の指示・Implementation Note／目標の範囲（target range）→フェデラル・ファンド金利の誘導目標／SOMA（System Open Market Account） |
| 24 | TGA（Treasury General Account）→米財務省の一般口座／Daily Treasury Statement（DTS）→日次の国庫の報告 |
| 25 | **マネタリーベース**／営業毎旬報告（Bank of Japan Accounts〔every ten days〕）／当座預金増減要因と金融調節（Sources of Changes in Current Account Balances）→見込み・実績・速報 |
| 26 | H.4.1（Factors Affecting Reserve Balances）→準備に影響する要因・Balance Sheet Developments／水曜の値（Wednesday level）→週平均 |
| 27 | H.8（Assets and Liabilities of Commercial Banks in the United States）→商業銀行の資産と負債 |
| 28 | ウォッチ（monitoring）→記録・改定／速報と確報（preliminary and final）→改定 |
| 29 | 登録しない（演習の章） |
| 30 | 機関の名前：日本銀行（Bank of Japan）、財務省（Ministry of Finance）、FRB（Federal Reserve System）→連邦準備制度理事会、ニューヨーク連邦準備銀行（Federal Reserve Bank of New York）→NY 連銀、米財務省（U.S. Department of the Treasury） |

### 2.1 注意

- 2026-11-15 の調整（RA）：①第21章の「主な意見」と「議事要旨」は、日銀の別の公表物（主な意見は会合の約 1.5 週間後、議事要旨は次の会合で承認された後）なので、別の語として登録する（割り当ての表の `→議事要旨` を外した）。②第04章の「パー利回り」を足した。③第06章は割り当てが 7 語なので、上限 6 語の例外として 7 語を許す（selfcheck は「割り当て語数まで許す」）。④第30章の割り当てから国際決済銀行（BIS）を外した（本文のどの章にも出ないため）。⑤別名（alias）が章をまたいで重なる語（ディスカウント・償還・フェデラル・ディーラー）は、検索の別名のためで、見出し語の重複ではない。

- この表は各章が**必ず登録する語**です。3 語に満たない章（序2）は、共通版 §7 の手順で語を足します。29 は演習の章で登録しません。
- 「ON RRP」「SOFR」「H.4.1」「H.8」「TGA」「DV01」は略語を見出し語にする（英語の固有の名前で、日本語の定まった訳がないため）。
- 「準備の管理のための買入れ」は FRB・NY 連銀の文書の語 reserve management purchases の訳。**FOMC の実施の指示の文にはこの語は出ない**（「purchases of Treasury bills」と書かれている）ので、本文では「FOMC の実施の指示は短期国債の買入れを指示し、FRB と NY 連銀はこれを reserve management purchases と呼んでいる」の形で主体を書き分ける。
