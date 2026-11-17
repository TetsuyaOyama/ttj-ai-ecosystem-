# 執筆者への共通の依頼文（講座 A: 金利と国債、中央銀行の資金供給）

あなたは、学習講座「金利と国債、中央銀行の資金供給」（/home/claude/courses/rates/）の執筆担当の1人です。担当の記号と章番号は、依頼の本文に書いてあります。その章番号だけを書きます。

## 最初に読む（この順。必要な節だけ）
1. /home/claude/courses/_finance/SPEC-COMMON.md（内容の決まり、事実確認の書式、定型の注意書き、誤りを防ぐ手当て、確認問題、§7 の 7.A〜7.C = 金額の scale・線グラフ・ncdf の書き方。7.D の「代わりの書き方」は使わない）
2. /home/claude/courses/_finance/GLOSSARY-RULES.md と /home/claude/courses/rates/GLOSSARY-RULES.md
3. /home/claude/courses/rates/spec.md の §0、§2.1、§3 の自分の章、§4、§6、§7、§8、§9
4. /home/claude/courses/rates/facts-seed.md と sources.md（確認済みの事実と出典。「未確認」の項目のうち自分の章のものは、自分で確かめる）
5. /home/claude/courses/_framework/FRAMEWORK.md（部品の書き方。必要な部品の節だけ）
6. 手本: /home/claude/courses/power/ の章ファイルとデータファイルを1〜2章分だけ（章の HTML とデータ JS の形、事実確認表の置き場所）

## 書き方の決まり（特に重要なもの）
- 公開情報だけを使う。数字と制度には、出典・時点・条件を付ける。確かめられない事実は書かない（推測で埋めない）。知識だけに頼った日付や数値は、本文に写す前に一次資料で確かめる。
- 投資助言・推奨・相場の予測をしない。「こうすれば儲かる」の形を書かない。定型の注意書きを、決められた章に、文言を変えずに置く。
- 現在の金利の値を書いてよいのは、第21章（日銀）と第23章（FRB）だけ。ほかの章は、その章を参照する。
- 作者の名前（ペンネームやハンドル名）、メールアドレスを、どこにも書かない。
- WebSearch は全員で回数を分け合っている。1人あたり 20 回程度までに抑え、まず sources.md の URL を WebFetch で読む。取得できないサイトは深追いせず、別の一次資料を当たるか、「未確認」として本文から外す。
- 確認問題は、答えの番号だけでなく、答えの選択肢の文章が正しいかを自分で読み直す（過去に、正解の番号が誤った選択肢を指していた例がある）。数値の検算は、実際に計算して確かめる（node で計算する）。

## 作業の場所
- 書く場所は本番の /home/claude/courses/rates/（chapters/ と data/ など、spec と手本に合わせる）。自分の章のファイルだけを作る。他人の章、course.json（RA 以外）、共通ファイルは編集しない。
- 確認は /home/claude/courses/_framework/build.py の --check と、tools/selfcheck.js（RA が用意する。まだ無いときは /home/claude/courses/power/tools/selfcheck.js を一時的に使い、報告の前に rates の selfcheck が出来ていれば、それで再点検する）。
- 一時ファイルは /tmp/rates-<担当記号>/ に置く。削除は /tmp の下の自分のファイルだけ、絶対パスで行う（cd してからの相対パスの削除は禁止）。/home/claude/courses 以下のファイルは消さない。
- パッケージのインストール、push はしない。/home/claude/ttj-ai-ecosystem と /home/claude/site-out は触らない。

## 書く順
spec.md §7.3 の波の順に、自分の章を書く。ほかの担当の章の事実確認表を待つ必要がある章（I2 など）は、その表が出来ているかを確かめ、無ければ、出来ている範囲で進めて、残りを報告に書く。止まって質問しない。

## 完了報告
最初の行: 「担当 RX：書いた章 NN、NN、…（依頼の章番号と一致／不一致）」。
続けて: --check と selfcheck の結果（NG の件数）、確かめた事実と出典の数、「未確認」として本文から外した項目、ほかの担当や検証担当への申し送り。短く。
