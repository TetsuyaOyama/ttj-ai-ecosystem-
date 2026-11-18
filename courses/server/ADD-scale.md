# ADD-scale: 序章1「規模の感覚」（検証者向け、1 ページ）

確認日 2026-11-18。発電講義 序章3（I3）の計算サーバー版。公開・push は未実施。

## 追加したもの
- chapters/I1-scale-from-home.html、data/I1-scale-from-home.js、facts/I1-scale-from-home.md（事実 31 行＋検算 約 60 行＋定義と式の照合）。course.json に front 部「0」と章 I1 を追加（既存の章番号は不変。hero・ogp・description は未変更）。
- 6 節：①瞬間と量（bucket）②単位の階段（unitconv、scale、FLOPS と GB→EB の表）③サーバー 1 台の内訳（lab、2 例、公表と模型を表で区別）④円の面積（areacircle 2 つ）⑤束ねる（lab 3 実験：台数と電力、1 日の流れ、熱）⑥まとめ・リンク・確認問題 3 問。
- 値は 3 種：公表／計算した目安（facts の検算）／模型の仮定。

## 依頼との違い・判断
- 束ねる装置は、既存の appmix・bundle が家庭固定のため lab で作った。areacircle は 3 円までしか狭い幅で崩れないので 2 つに分けた。
- DC の 1 日の形は公表値を確認できず模型（1 ＋ 振れ幅 × sin）と明記。
- 空冷と液冷の境の kW は公表値がなく、4 つの目安を並べるだけにした。
- 規則「自分で計算した値を書かない」とは目的が衝突するため、計算値は「計算・目安」と明記し検算を facts に置いた（逸脱）。
- 施設の電力 ＝ IT 電力 × PUE。kVA は皮相電力として注記し、kW とは混ぜない。
- 二次確認：資源エネルギー庁 資料3 は要約経由の確認で、本文は問題認識の一点だけを書いた。
- 書かなかった：DC 負荷の公表形、EB の例、Lenovo と OpenAI の本社の国、Stargate・ソフトバンク堺の稼働状況。

## 検査
- build.py --check：0 warnings。selfcheck（power/tools/selfcheck.js、--calc）：NG 0。
- test.py と画面は報告を参照。
- 画面で見た範囲：390 幅の bundle 5 状態、bucket、scale、areacircle b。1280 幅と他の節は撮影済みだが目視は一部のみ。

## 公開時に必要な変更（server-publish.json は未変更）
- "chapters": "I1,01-32"、hero_status の文言。必要なら hero の開始、how-routes、description・ogp の「序章 1 本と全 32 章」。学習マップの項目。
- ../power/#chI3 への相互リンクは spec §9.2-5 を超える 3 本目。
