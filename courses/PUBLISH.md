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
