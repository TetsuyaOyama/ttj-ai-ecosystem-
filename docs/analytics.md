# アクセス解析を有効にする手順

このリポジトリの全ページ（ポートフォリオ、各講座、通信の各ページ、学習全体マップ、資料、AI ロードマップ、AI エコシステム図）は、末尾で `showcase/analytics.js` を読み込みます。このファイルの先頭にある設定（サービスの種類と識別子）が空のあいだは、何もしません。外部への通信は 1 件も起きません。識別子を 1 か所に書けば、全ページで有効になります。

対応しているのは、クッキーを使わず、個人を追跡しない型の 2 つです。どちらか 1 つを選びます。

| | Cloudflare Web Analytics | GoatCounter |
|---|---|---|
| 識別子 | beacon の token（英数字 32 文字） | サイトのコード（`https://<コード>.goatcounter.com` の `<コード>`） |
| `service` に書く値 | `'cloudflare'` | `'goatcounter'` |
| 読み込むスクリプト（公式） | `static.cloudflareinsights.com/beacon.min.js` | `gc.zgo.at/count.js` |
| 費用 | 無料 | 個人・非営利の利用は無料（利用条件は公式で確認） |

共通の動作:

- Do Not Track を有効にしている閲覧者には、計測スクリプトを読み込みません。
- ファイルを直接開いたとき（`file://`）は、読み込みません。
- 識別子の形式が違うときは、読み込まず、コンソールに警告を 1 行出します。
- 有効になったときだけ、各ページのフッターに「このサイトは、クッキーを使わないアクセス解析で閲覧数を数えています。」が出ます。
- 数えるのはページの読み込みです。講座の章の切り替え（URL の `#` 以降の変化）は、別のページ表示としては数えません。

## A. Cloudflare Web Analytics

1. **登録**: Cloudflare のアカウントを作ります（無料）。https://dash.cloudflare.com/sign-up
2. **サイトの追加**: ダッシュボードの「Analytics & Logs」の中の「Web Analytics」で、サイトを追加します（「Add a site」）。ホスト名の欄には、このサイトのホスト名 `tetsuyaoyama.github.io` を入れます。Cloudflare でドメインを管理していない（プロキシを通さない）サイトとして追加できます。画面の名前は変わることがあるので、公式の案内（https://developers.cloudflare.com/web-analytics/）に従ってください。
3. **識別子の場所**: 追加すると、貼り付け用のスニペットが出ます。その中の `data-cf-beacon='{"token": "…"}'` の `…` の部分が識別子です（英数字 32 文字）。スニペット自体は貼りません。token だけを使います。
4. **analytics.js のどこに書くか**: `showcase/analytics.js` の先頭の `CONFIG` を書き換えます。

   ```js
   var CONFIG = {
     service: 'cloudflare',
     id: 'ここに token'
   };
   ```
5. **反映**: 変更をコミットして push します。GitHub Pages に反映されるまで数分かかります。
6. **確認**: サイトを開き、ブラウザの開発者ツールの Network で、`beacon.min.js`（`static.cloudflareinsights.com`）の読み込みと、`cloudflareinsights.com` への送信が出ることを確かめます。Cloudflare のダッシュボードの集計には、数分から数十分の遅れがあります。自分のブラウザで Do Not Track を有効にしていると、何も出ません（正しい動作です）。
7. **止める**: `id` を `''` に戻して push します（全ページで通信が止まります）。集計も止めるときは、Cloudflare 側でサイトを削除します。

## B. GoatCounter

1. **登録**: https://www.goatcounter.com/signup で、サイトのコード（URL の先頭になります。例 `ttj-showcase` → `https://ttj-showcase.goatcounter.com`）、メールアドレス、パスワードを決めて登録します。
2. **サイトの追加**: 登録のときに作ったサイトが、そのまま計測先になります。別のサイトを足すときは、ログインして設定（Sites）から追加します。
3. **識別子の場所**: 登録で決めたサイトのコード（`https://<コード>.goatcounter.com` の `<コード>`）です。英数字とハイフンです。
4. **analytics.js のどこに書くか**: `showcase/analytics.js` の先頭の `CONFIG` を書き換えます。

   ```js
   var CONFIG = {
     service: 'goatcounter',
     id: 'ここにサイトのコード'
   };
   ```
5. **反映**: 変更をコミットして push します。GitHub Pages に反映されるまで数分かかります。
6. **確認**: サイトを開き、`https://<コード>.goatcounter.com` のダッシュボードにページ表示が増えることを確かめます。Network では `gc.zgo.at/count.js` の読み込みと、`<コード>.goatcounter.com/count` への送信が出ます。GoatCounter は、`localhost` からの表示を既定で数えません。
7. **止める**: `id` を `''` に戻して push します。集計も止めるときは、GoatCounter の設定でサイトを削除します。

## 仕組みと、生成元への入れ方

- `showcase/analytics.js` は、設定を読んで、識別子があるときだけ、公式の計測スクリプトを `<head>` に足します。ほかのファイルは、設定を持ちません。
- 各ページの末尾に `<script defer src="…/analytics.js"></script>`（`showcase/` 直下のポートフォリオは `analytics.js`、ほかは `../analytics.js`）と、フッターの注記の置き場所 `<p class="analytics-note" data-analytics-note hidden></p>` が入っています。置き場所が無いページでは、有効になったときに analytics.js がフッターの末尾へ足します。
- 生成元がある物は、生成元に入れてあります。講座の共通基盤は、公開設定（`courses/*-publish.json`）の `"analytics": "../analytics.js"`。コア講義は `scripts/core-net/build.py`、通信の講義室と学習マップは `site-work/gh-build/gh_build.py`、コネクテッドカー資料は `ccp/build/publish.py` です（いずれも作者の環境のパスです）。自サイト用など別の出力には入りません。
- 各ページは単一ファイルで外部リソースなし、が基本です。`analytics.js`（同じ場所から配信されるファイル）が、その唯一の例外です。識別子を書いたときだけ、そのサービスのスクリプトが外部から読み込まれます。

## 現在の状態

- 2026-11-15 から、Cloudflare Web Analytics を有効にしています（`showcase/analytics.js` の `service` と `id`）。
- 手元での確認（localhost など）と、Do Not Track を有効にした閲覧者は、数えません。
- 止めるときは、`service` と `id` を空にして push します。
