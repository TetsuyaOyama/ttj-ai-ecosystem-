# 公開前の最終仕上げの記録（全26章）

- 作業日：2026-11-14（確認日はすべて同日）
- 対象：`chapters/`、`data/`、`facts/`、`course.json`、`spec.md`、`tools/`、公開設定 `pc-publish.json`
- 検査：`python3 -I /home/claude/courses/_framework/build.py /home/claude/courses/pc --check` → エラー 0、警告 0（章 26/26）。`grep -rn '要確認' chapters data facts` は 0 件。`tools/selfcheck.js`（spec §8.10 の写し。§3 の部品 id を `--need` に渡した）は全 26 章で `NG 0 件`
- 公開版の検査：`test.py --publish pc-publish.json --port 8845`（1366px・375px、ダーク・ライト、全 26 章）→ 最終行は下の「5. 検査の結果」
- 件数の上限があったため、WebSearch は 6 回に抑え（ATX・M.2 の一次資料 2、NVM Express・TCG の個別ページ 2、USB-IF の命名指針 1、消費者庁のスプレー缶 1）、事実確認表の URL や公式サイトの個別ページは WebFetch で直接開いた。個別ページを開けなかったものは書いていない
- 付録の生成元は `tools/gen26.py` と `tools/26-facts.txt`（第26章のデータと参照資料の一覧を、各章の「参照資料」から作り直す）。`python3 -I tools/gen26.py` で再生成できる。`tools/selfcheck.js` は §8.10 の自己点検の道具

## 1. 直した項目

| # | 章 | 内容 | 結果と根拠 |
|---|---|---|---|
| 1a | 03 | ATX 規格の版・寸法の根拠 | 第三者のサイト（xdevs）の写しだけが根拠だった。Intel の公式の個別ページを検索（`formfactors.org` は取得の許可の外、検索にも一次資料は出なかった）しても確かめられなかったため、版 2.2・305 mm × 244 mm・「最大 7 本」の記述と参照資料の行を外した。寸法（12 in × 9.6 in）と拡張スロットの数（一般に 7 本）は、Intel の購入ガイド（更新 2025 年 7 月、一次 ○）の値だけで書いた。事実確認表 #1 を「確認できず、版は書かない」に改めた |
| 1b | 05 | M.2 規格の版の根拠 | 版 1.0（2013 年 12 月 16 日）の根拠は design-reuse の再掲だけだった。PCI-SIG の一次ページは検索しても出ず、版の記述を外した。「M.2 は PCI-SIG の規格として知られる」は第三者の再掲によると断り、参照資料の行は「版は書かない」使い方に改めた。事実確認表 #4 も同様 |
| 2a | 26 | `?p=` の参照リンク（NVM Express） | `archive.nvmexpress.org/?p=717` を `https://archive.nvmexpress.org/faq_category/membership`（『Membership/General Information』、ページの日付 2020-04-15）に差し替え。「an incorporated non-profit industry organization」と「13 Promoter companies」の記述を開いて確認 |
| 2b | 26 | `?p=` の参照リンク（TCG） | `trustedcomputinggroup.org/?p=41996`（トップページ扱い）を `https://trustedcomputinggroup.org/about/` に差し替え。ページの自己紹介は「not-for-profit organization that develops open, vendor-neutral, global industry standards」で、「国際的な団体（international consortium）」の語はないため、用語集・地図の説明を「非営利の団体。開かれた世界の業界標準を作る」に改めた。TPM の説明「Hardware-based security module for key storage and integrity measurement」も確認。事実確認表 #8・#9 を更新 |
| 3 | spec §8.12 | 社名の表 | Noctua、Seasonic（法人名 Sea Sonic Electronics）、Corsair、Phanteks、CLEAResult、Cybenetics、Canonical、Blender、Hugging Face、Ollama、Lenovo、プラス、HDMI Forum, Inc.・HDMI Licensing Administrator, Inc.（HDMI LA）を追加（Kingston Technology・GIGABYTE は表にあった）。本文の表記は表と一致していることを確認（機械検索）。国は、公式ページで確かめたものだけを本文の初出に書く旨を表の前文に追記。確かめられていないため国を書かない企業：CLEAResult、Corsair、Hugging Face、Ollama、Phanteks、Blender、Lenovo。確認済み（事実確認表にある）：Noctua（オーストリア）、Seasonic（台湾）、Canonical（英国）、Cybenetics（キプロス）、Kingston（米国）、HDMI LA（米国） |
| 4a | 07 | 事実確認表 #30 の参照番号 | 「第12章の確認表 #6」を「#1」（Intel の表 3-3）に直した |
| 4b | 21 | 「Power-On Self-Test」 | 検証で直済み。全章の機械検索で「Self Test」の表記が残っていないことを確認 |
| 4c | 17・18・19・21 | 参照資料の「種類」の揺れ | 全章の「参照資料」の種類を機械で数え直し、§8.3 の 6 区分以外が 0 件であることを確認（検証で直済み） |
| 5a | 09 | Bluetooth Core Specification の版 | ★。Bluetooth SIG の仕様の一覧（https://www.bluetooth.com/specifications/specs/）は 6.0・6.1・6.2・6.3・**7.0** を Adopted と表示。本文は 6.0〜6.3 だったので 7.0 を加え、日付は確認できないままと明記（本文・表・参照資料・事実確認表 #17） |
| 5b | 16 | GPU メーカーの補助電源ケーブルの公式案内 | ★（REVIEW-part2-3 R4）。NVIDIA『GeForce RTX 5070 User Guide』を開き、「at least two independent dedicated cables with 8-pin PCI Express plugs」（付属アダプタの構成）、「Ensure the power plug is fully inserted and seated flush」を確認。分岐ケーブル・曲げ・12V-2x6 の名前は書かれていない。本文に 1 つの製品の案内として段落を追加し、参照資料の行と事実確認表 #15 を追加 |
| 5c | 24 | IPA の教訓集の版と日付 | 表紙は Ver.1.2・2026 年 9 月 8 日発行、更新履歴の最新は 2026 年 10 月 16 日の誤植修正（履歴に Ver.1.2 の行はない。Ver.1.1 は 2026 年 9 月 10 日）。参照資料の「版・時点」の欄をそのとおりに書き、第26章の一覧にも反映 |
| 6a | 14 | 「電源ケーブルを抜いていれば、ファンは回りません」（REVIEW-part2-3 R6） | 「抜いて、ファンが止まったことを確かめてから手を入れます」に |
| 6b | 18 | 演習の答え (イ)「同じ入手先で見つかることが多い」（R7） | 「型番を手がかりに、メーカーの公式ページで探します」に |
| 6c | 12 | 12V-2x6 の参照先 | 「第07章」を、コネクタの規格の持ち主である「第06章」に（第16章と同じ） |
| 6d | 04 | JEDEC の初出（REVIEW-part1 R4） | 「JEDEC（JEDEC Solid State Technology Association、半導体の標準化団体）」に（正式名は第26章の事実確認表 #10 で確認済み） |
| 6e | 04 | 表記 | 「Micron Technologyのページ」の空白を補った |
| 6f | 26 | 地図の ATX の行 | 「版 2.2 の文書の寸法を確かめた」を、Intel の購入ガイドの値に改め、版は確認できていないと書いた（1a に合わせた） |
| 6g | 26 | 付録の集計の作り直し | `tools/gen26.py` を再実行。用語集 164 語（見出しの重複なし）、総合テスト 30 問（部ごと 10・5・7・8。正答の添字の分布 0：8・1：7・2：7・3：8）、対応表 27 行、参照資料の一覧 210 行（種類は 6 区分だけ。1a の行の削除と 5b の行の追加で、行数は変わらず）。確認問題は 25 章 × 3 問 = 75 問 |

## 2. 公開直前の再確認（★の項目）の結果

「確認」は 2026-11-14 に一次資料のページを開いたもの。前段の検証（REVIEW-part1・part2-3・part4）が同日に開いて一致を確認したものは、そのまま採用し、再度は開いていない（同じ日付のため）。

| 項目 | 結果 |
|---|---|
| USB Power Delivery | Revision 3.3 Version 1.0（USB-IF の資料のページ）。ページの日付は「11/05/2026」で月日の順が読めない。本文は日付を書いていない（変更なし） |
| DisplayPort | VESA の 2.1 の発表（2022-10-17、UHBR20＝1 レーン 20 Gbps、DP80 で 80 Gbps）。ページに 2.1a・2.1b の記載はない。本文は 2.1（変更なし） |
| Thunderbolt | Intel のページ（メタ情報 2026-08-27）：Thunderbolt 5 は最大 80 Gbps（Bandwidth Boost で最大 120 Gbps）、Thunderbolt 4 は最低 40 Gbps。本文と一致（変更なし） |
| Bluetooth | 5a のとおり、7.0 を追記 |
| Wi-Fi | Wi-Fi Alliance の Wi-Fi CERTIFIED 7 の発表（2024-01-08）を確認。この発表のページは 802.11be の名前を書かず、Wi-Fi 8 の記載もない。802.11be との対応は、本文が使っている Beacon のページ（事実確認表 #14）の記述で、変更なし |
| HDMI | HDMI 2.2（2025-06-25、96 Gbps）は検証（part1）で確認。変更なし |
| USB の速度の名前の指針 | USB-IF『USB Data Performance Language Usage Guidelines』（2024-01）より新しい版は、検索で見つからなかった（変更なし） |
| 電源の設計ガイド | Intel の ATX 電源の設計ガイド Rev 2.1a（2023-11）の表 3-3 を検証（part2-3）が確認。変更なし。80 PLUS（7 つの等級）と Cybenetics（ETA・LAMBDA）は検証（part1）が確認 |
| UEFI 仕様 | 最新は 2.11（2024-12）、PI は 1.10（2026-07）。検証（part2-3）が確認し、第17章に併記済み |
| OS の要件 | Windows 11 のシステム要件（Microsoft。更新 2026-07-14）を検証（part2-3）が確認。変更なし |
| 記憶媒体の消去の公的な指針 | NIST SP 800-88 Rev. 2（2025-09-26、Rev. 1 を置き換え）を検証（part4）が確認。変更なし |
| AI 対応 PC の要件 | Copilot+ PC は 40+ TOPS の NPU、16 GB のメモリ、256 GB のストレージ（Microsoft の仕様ページ）を検証（part4）が確認。変更なし |
| CPU メーカーの保証の記述 | Intel の XMP（「may void the processor warranty」）と AMD の EXPO（「will void any applicable AMD product warranty」）を検証（part4）が確認。変更なし |
| GPU メーカーの補助電源ケーブルの案内 | 5b のとおり |
| スプレー缶の注意喚起 | 消費者庁（2020-08-07。更新・差し替えの記載なし）と NITE（2018-12-26 の資料、本文が使う 2023-12-12 のメールマガジン）を開いた。より新しい消費者庁の資料は、検索で見つからなかった。本文の書き方のまま（変更なし） |
| IPA の教訓集 | 5c のとおり |

## 3. 確認したが、書き換えなかった項目

| 章 | 内容 | 理由 |
|---|---|---|
| 03 | PCI-SIG の PCIe の現行の版 | PCI-SIG の一次ページが取得の許可の外。後方互換の記述は Business Wire 配信の PCI-SIG の発表を出典にしたまま（本文が出どころを断っている） |
| 26 | IEEE の英語の展開形 | `ieee.org` は取得の許可の外で、確認できなかった（事実確認表 #12 に「×」と記載済み）。書き方は変えない |
| 09 | USB PD・USB Type-C の公開日 | ページの日付表示が月日の順を読めない。日付は書いていない |

## 4. 直さずに残した点

| 章 | 内容 | 理由・推奨 |
|---|---|---|
| 03・05 | ATX・M.2 の規格の版（PCI-SIG・Intel の一次ページ） | 1a・1b のとおり、版の記述を外した。一次ページを開ける環境で、版を確かめて足すとよい |
| 02 | AMD の Default TDP の定義文がない（PPT は Ryzen 1000〜5000 世代向けの資料） | 本文が「定義は確認できていない」と断っている（part1 R2） |
| 04 | 「ASRock のマニュアル（メモリの節）」が製品を特定していない（part1 R3） | 具体の 1 冊を確かめて差し替える。本文の主張は ASUS の記事と併記で、断定していない |
| 04 | 用語集で ECC を「メインメモリ」の alias にしている（GLOSSARY-RULES §8 は QVL の alias。part1 R7） | 規則のほうを見直す候補。ビルドは通る |
| 07 | CLEAResult・Cybenetics は企業だが、参照資料の種類が「団体の資料」（part1 R5） | 6 区分に「メーカーの資料」も合わないため。付録の一覧でも同じ扱い |
| 13 | Intel の保証の PDF（M78400-001）の文言、警察庁・古物営業法の現行の案内（part2-3 R2） | 窓口の記事（Last Reviewed 02/05/2025）は確認済み。PDF と法令のページは開く環境で確かめると確実 |
| 15 | AMD の CPU の取り付けの公式説明が未確認（R3） | 本文が「もう 1 社は確認できなかった」と明記 |
| 17・19 | CSM の公式の定義、ビープ音の一覧、OS の監視機能の公式説明（R5） | 本文が「確認できなかったため書かない」と明記 |
| 20 | Intel の投稿の筆者の「Employee」の表示（part4 R6） | 取得した本文に表示がなかった |
| 21 | 流れ図 `c21-flow` の分岐ラベルが近い（part4 R5） | 縦にして改善済み。検査（重なり・はみ出し）は通る |
| 26 | 用語集で意味が近い語（「ハードウェアの変更とライセンス」と「ライセンス認証」）、alias「定格」「準ファンレス」（part4 R8） | 割り当て表どおり。規則の見直しの候補 |
| 全般 | 国を書いていない企業（CLEAResult、Corsair、Hugging Face、Ollama、Phanteks、Blender、Lenovo） | 公式ページで確かめられていない。確かめられたら本文の初出に国を足す |
| 全般 | 公開後に章ごとの確認日が古くなる | 製品・規格は変わりやすい。優先して見直す章：第02・05・06・07・09・17・18・20・25 |

## 5. 検査の結果

- `python3 -I /home/claude/courses/_framework/test.py /home/claude/courses/pc --publish /home/claude/courses/pc-publish.json --port 8845`（1366px・375px、ダーク・ライト、全 26 章）→ 最終行 `結果: PASS 3402 / FAIL 0`
- 公開設定：`pc-publish.json` を `"chapters": "01-26"`、`"hero_status": "全26章を公開中です。"` に変更。仮の付録（A1）の設定は外した（第26章が本物の付録）
- フッターは「TTJ」のみ（基盤が固定）。計算サーバー講義への相互参照 3 か所は、ショーケース上で `../server/#ch07`（第03章）、`../server/#ch09`（第05章）、`../server/#ch20`（第17章）として開き、遷移先の章が表示されることを Playwright で確認した
- 作者名の検査：作者名の指定語（利用者が指定した 3 語）の検索。出力 `showcase/pc/index.html`、`showcase/index.html`、`README.md`、`courses/` → 該当なし
- 「この講義の背景」の囲みと入口の 1 文は、検証で確定した文言のまま（変更なし）。作者名は出していない
