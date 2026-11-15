# 講座の公開範囲を広げて再出力・push する手順（半導体講義の例）

公開設定は講座ディレクトリの外: `/home/claude/courses/semi-publish.json`。講座の章ファイル・course.json は触らない。

1. 章の検証が済んだら、設定の `"chapters"` を直す（例 `"01-05"` → `"01-15"`、`"01-05,08"` も可）。入口の一文 `"hero_status"` も直す（例「第1部・第2部を公開中。第3部以降は検証が済み次第、順次公開します。」）。
2. 再出力（ほかの章が執筆中でも影響しない。公開する章のファイルとデータだけ読む）:
   `python3 -I /home/claude/courses/_framework/build.py /home/claude/courses/semi --publish /home/claude/courses/semi-publish.json`
   出力先は設定の `"out"`（`/home/claude/ttj-ai-ecosystem/showcase/semi/index.html`）。出力の最後の行に「章 N/32 公開」が出る。
3. 検査（最終行が `結果: PASS n / FAIL 0`）:
   `python3 -I /home/claude/courses/_framework/test.py /home/claude/courses/semi --publish /home/claude/courses/semi-publish.json --port 8802`
   （3 分ほどかかる。120 秒を超えるのでバックグラウンドか長めのタイムアウトで）。見本講座の回帰: `test.py /home/claude/courses/_demo`。
4. ポートフォリオ `/home/claude/ttj-ai-ecosystem/showcase/index.html` の半導体カードで、小札「公開中 5 / 32 章」の数と、説明文の「第1部の5章を公開中」を直す。
5. README.md の「半導体講義」の節の「第1部（第01〜05章）を公開中」を直す。
6. 画面写真を撮り直す（docs/images/semi.png は講座の入口 1366px ダークを 1100px 幅に縮小、docs/images/portfolio.png は 1100x926）。PNG は 128 色に減色して 200KB 以下にする。
7. `git -C /home/claude/ttj-ai-ecosystem fetch origin main`（差分があれば rebase）→ 今回の成果物だけ add → `git -c user.name="TetsuyaOyama" -c user.email="TetsuyaOyama@users.noreply.github.com" commit`（日本語の要約＋本文、末尾に Co-Authored-By と Claude-Session の2行）→ `git push origin main`（force しない）。

注意: 全章公開になったら `"appendix"`（公開章だけの用語集・総合テスト）を外し、第32章（本物の付録）を `"chapters"` に含める。

## 発電講義（power）の公開と、基盤の変更の扱い（2026-11-15）

- 発電講義は公開設定 `power-publish.json`（`"chapters": "I1,I2,01-32"`。序章 2 本は章 id で指定する）で、序章 2 本と全 32 章を `showcase/power/index.html` に出力した。検査は `test.py power --publish power-publish.json --port 8841`。
- 発電講義のために、基盤 `_framework/` に序章（部の `front`）、部品 `scale`・`lab`（`js/opt/`・`css/opt/`）、講座ごとの配色 `theme` が加わった（FRAMEWORK.md §2・§4.10・§4.11）。どれも使う講座がある場合だけ出力に入るが、エンジンの共通のコード（`engine-*.js`、`build.py`）が 30 行ほど変わっている。
- 公開済みの 3 講座（半導体 `semi`・計算サーバー `server`・自作PC `pc`）は、今回は出力を作り直していない（見た目と動作は変わらず、検査も通る。`pc` で確認した）。**次にその講座の内容を更新するときに、上の手順 2 で出力し直す**（そのとき出力に入る内部のコードが新しい基盤のものになる）。
- 手順 4〜6 のポートフォリオ・README・画面写真は、発電講義の分も同じ書式で追加した（`docs/images/power.png`）。

## 基調の統一（濃いグレー）とアクセス解析の受け口（2026-11-15）

- 半導体・計算サーバー・自作PC の `course.json` にも、発電講義と同じ `theme`（背景 #151515、面 #1F1F1E、本文 #F4F2EC、補助 #B0AEA5、本文は明朝系の端末内フォント、行間 2.0）を入れた。差し色（`accent`）は各講座のまま。`faint` だけ #A8A69D（サイドバーの現在の章の淡い面の上でも 4.5:1 を保つため）。基盤は、`theme` を使う講座の断面図の「空気・空間」（材料 `void`）を、背景より暗い色に自動で合わせ、`accent` の文字色を `raise` の面の上でも検査する。
- 公開設定に `"analytics": "../analytics.js"` を入れると（5 講座とも入れてある）、出力の末尾に `<script defer src="../analytics.js"></script>` と、フッターの注記の置き場所（`<p class="analytics-note" data-analytics-note hidden>`）が入る。`showcase/analytics.js` の識別子が空のあいだは何もしない。ttj.tokyo 用など、このキーのない出力には入らない。有効にする手順は `docs/analytics.md`。
- **例外の明記**: 各ページは単一ファイルで外部リソースなし、が基本だった。`analytics.js`（同じ場所から配信される 1 本）だけが例外。`test.py` は、公開設定の `"analytics"` と同じ値の `<script src>` だけを許可し、`analytics.js` を配信できるよう、その分だけ親ディレクトリまで検査用サーバーの公開範囲を広げる。
