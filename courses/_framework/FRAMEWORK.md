# 講座の共通基盤（FRAMEWORK）

講座（コアネットワーク講義、半導体講義、計算サーバー、自作PC、発電事業など）を、同じ部品・同じ操作性で作るための土台。講座ごとに用意するのは **`course.json`・`chapters/`・`data/`** だけで、部品・配色・検索・進捗・印刷は共通基盤が出す。標準ライブラリと node と Playwright（検査用）だけで動く。pip / npm は使わない。

- 置き場所：`/home/claude/courses/_framework/`（基盤）、`/home/claude/courses/<講座>/`（講座）。見本は `/home/claude/courses/_demo/`。
- 章を書く人は **CHAPTER-BRIEF.md** も読む（文体・出典・用語・クイズの決まり）。
- 既存のコアネットワーク講義（`/home/claude/core-net/`）は、この基盤とは別に動いている。基盤は部品のデータ形式を互換に保つ（§9）。

## 1. 講座ディレクトリ

```
<講座>/
  course.json            講座の設定（§2）
  chapters/NN-英小文字とハイフン.html     章の本文（HTML の断片、§3）
  data/NN-同じ名前.js                     章のデータ（図・問題・用語など、§4）
  dist/index.html        ビルドの出力（course.json の out）
```

## 2. course.json の項目

| 項目 | 必須 | 内容 |
|---|---|---|
| `slug` | ○ | 短い識別子（英小文字・数字・ハイフン） |
| `title` / `subtitle` | ○ | 講座名・副題（ヘッダー・入口・`<title>`） |
| `description` | | `<meta description>` と入口の説明の既定 |
| `prefix` | ○ | 読了・成績・テーマの保存キーの接頭辞（例 `"semi."`）。**講座ごとに別**。`cn.`（コア網講義）と衝突する値、同じ親ディレクトリの他講座の接頭辞と前方一致する値はエラー |
| `out` | ○ | 出力先（講座ディレクトリからの相対。例 `"dist/index.html"`） |
| `accent` | | 差し色 1 色（`"#2FA39A"`）。省略時はゴールド。基調はネイビーのダークで固定（ライト切替あり）。文字色・淡い面は自動で導き、コントラスト比 4.5:1 に届かない色はビルドがエラーにする。`{"fill","dark","light"}` で細かく指定も可 |
| `parts` | ○ | 部の一覧 `[{id, name, short, appendix?}]`。**何部でもよい**（半導体は 5 部＋付録）。`appendix:true` の部は章番号が連続の最後に来て、総合テストの部に数えない。`name` の先頭の語（空白まで）が「第1部」のようなラベルになる |
| `tracks` | | 章のバッジ。文字列の配列、または `{label, tone}`（tone 0〜5 が色。省略時は並び順）。何個でもよい。章メタの `track` はここにある語だけ |
| `chapters` | | 章立ての計画 `[{num, part, title, track?, time?}]`。未執筆の章は「準備中」と出る。省略可 |
| `footer.home` | ○ | ポートフォリオへ戻るリンク `{label, href}`。フッターの表記は **「© TTJ」固定**（作者名は入れられない。`footer.org` は指定するとエラー） |
| `ogp` | | `{title, description, type, locale, url, image}`。`og:*` と `twitter:card` を出す（画像は URL の文字列だけ。画像ファイルは同梱しない） |
| `hero` | | 入口：`eyebrow`、`lead`、`notice`（末尾の注意書き）、`start`（開始ボタン）、`how`（学習の進め方 `[{t,d}]`）、`links`（`[{label,href}]`）。省略時は分野に依存しない既定文 |
| `kinds` | | 色の枠 `kind` の名前（`{"ue":"運ばれる物", "ran":"搬送", …}`）。構成図・層図・工程フローの凡例に出る。名前をつけた種別だけ凡例になる |
| `labels` | | 部品の文言の辞書（§5）。図のデータ側の `labels` が優先 |
| `mapping` | | 対応表（`mapping` 部品）：`{title, colA, colB, colNote, cats:[{key,label}], note, kind}` |
| `exam` | | 総合テスト：`{target, title, intro}`（目標問数など） |

`kind` の色は 7 枠（`ue ran core db pol ext ims`、別名 `a`〜`g`）。意味は講座・図ごとに `kinds` で決める。線の種類 `plane`（`cp` 実線・`up` 太線・`lg` 点線）の凡例名は `labels` の `arch.plane.*`。

## 3. 章 HTML の型

先頭にメタコメント（ビルドが読む）。

```html
<!--
num: 01
part: 1
title: 章の題
track: 基礎        （任意。course.json の tracks にある語）
time: 25
-->
<section class="learn"><h3>この章で分かること</h3><ol><li>…</li><li>…</li><li>…</li></ol><p class="prereq"><b>前提</b>：…</p></section>
<h3>節の見出し</h3><p>本文…</p>
<div data-widget="flow" data-src="c01-flow"></div>
<section class="quiz-sec"><h3>確認問題</h3><div data-widget="quiz" data-src="c01-quiz"></div></section>
<section class="refs"><h3>参照資料</h3>（表。CHAPTER-BRIEF §4）</section>
```

- `num` は 2 桁。ファイル名の番号と一致。章の見出し・読了ボタン・前後リンクはビルドが付ける。本文の見出しは `<h3>`（節）と `<h4>`。
- HTML の `id` は `chNN-`、データの id は `cNN-` で始める。色は CSS 変数（`var(--accent)` など）。`<script>`・`<style>`・画像・インラインの 16 進色は禁止（ビルドがエラー）。
- 使える部品クラス：表 `<div class="tbl-wrap"><table class="tbl">`、注意書き `<div class="callout note|tip|warn|std"><span class="ttl">…</span>`、`cards`、`cols2`、`<kbd>`、`<figure class="fig">`、章リンク `<a href="#ch12">`。
- 付録の章（`appendix` の部）は `learn`・`quiz`・`refs` を求めない。用語集・総合テスト・対応表の部品は付録に置くのが定番。

## 4. 部品とデータ形式

章に `<div data-widget="種別" data-src="データid"></div>`、データファイルに `CN.add('種別', 'データid', {…})`。データ中の文字列は `` `code` `` と `**太字**` だけ使える。`ch` は関連章の番号の配列で、押せるチップになる。ビルドは未登録・id の重複・参照の不整合を検査する。

| 種別 | 用途 | 状態 |
|---|---|---|
| `arch` | 構成図（ノードとリンク。装置の構成、工程のつながり、輸送の経路など） | 汎用化（既存互換） |
| `seq` | 登場人物と手順の再生 | 汎用化（既存互換） |
| `stack` | 階層スタック（層を下から積む。梱包・プロトコル・膜構成の一覧など） | 汎用化 |
| `ident` | 構造の分解（番号・コード・表記を部分に分ける） | 汎用化 |
| `table` | 早見表（並べ替え・絞り込み・行の詳細）。旧名 `qos` も可 | 汎用化 |
| `tree` | 階層図（元 → 導出されたもの）。旧名 `keys` も可 | 汎用化 |
| `state` | 状態遷移図 | 既存互換 |
| `drill` | 切り分け演習 | 文言を差し替え可 |
| `quiz` | 章末の確認問題（選択肢は毎回シャッフル） | 既存互換 |
| `compare` | **汎用の 2 列対比表**（列名をデータで指定） | 新規 |
| `flow` | **工程フロー図** | 新規 |
| `layers` | **断面・構成の層図** | 新規 |
| `xsec` | **工程断面ステッパー**（断面が手ごとに変わる） | 新規 |
| `route` | **行程帯図**（区間ごとの負担者を条件で比べる） | 新規 |
| `glossary` / `mapping` / `exam` | 用語集・対応表・総合テスト（付録） | 汎用化 |

### 4.1 `arch` 構成図

```js
CN.add('arch', 'c01-x', { title, viewBox: [900, 380], initial: 'hub', groups: [{ label, x, y, w, h }],
  kinds: { a: '図ごとの種別名' },                     // 省略可（course.json の kinds を上書き）
  labels: { 'arch.f.proto': '手段' },                // 省略可（文言を図ごとに上書き）
  nodes: [{ id, label, sub, kind, x, y, w, h, desc, role, ch }],
  links: [{ id, a, b, label, plane: 'cp'|'up'|'lg', proto, carries, desc, via: [[x,y]], lo: [dx,dy], off, ch }],
  views: [{ key, label, nodes?, links?, groups?, bus?, hint? }] });
```
`a`/`b` に `'bus'`（`bus: {x,y,w,h,label}`）も使える。座標は左上原点。幅が 700 を超えると狭い画面で横スクロール。使っている線種と、名前をつけた `kind` だけが凡例に出る。

### 4.2 `seq`

`actors: [{id, name, sub, kind}]`、`steps: [{phase?, from, to, msg, lbl?, if?, ie?, what?, trap?, dash?}]`、装置内の処理は `{at, note, msg}`、複数にまたがる `{span:[a,b], note}`。見出し語は `labels` の `seq.ifLabel`（既定「手段・経路」）、`seq.ieLabel`（「主な要素」）。登場人物は 3〜6、1 本 5〜15 手が目安。

### 4.3 `stack` / `ident` / `table` / `tree` / `state` / `drill` / `quiz`

- `stack`：`stacks: [{name, between?, plane?, carries?, note?, layers: [{n, sub?, role, d?, spec?}]}]`（旧 `ifs` も可）。`role` は `app payload transport net link sec`。名前は `labels` の `stack.role.*`。`stacks` が 1 つなら切替タブは出ない。
- `ident`：`items: [{name, full, summary, where, ch, parts: [{label, val, bits, d, grp?, c?}]}]`。`val` は明らかな架空値か規格の例。
- `table`：`cols, rows, filter?, detail?, note?, caption?`。数値は数値順に並ぶ。
- `tree`：`trees: [{key, label, colW?, rowH?, zones?, nodes: [{id, name, kind?: 'sim'|'nas'|'as', col, row, full, made, to, d}], edges: [{a, b, label?}]}]`、`legend: ['文字', {kind:'sim', text}]`、`kindLabel`（枠の見出し）。
- `state`：`machines: [{key, label, w, h, states: [{id, name, sub?, x, y, w?, kind?: 'on'|'off', d}], trans: [{from, to, label, cond, d, curve?, lo?, loop?}]}]`。
- `drill`：`procedure`（止まった段階の選択肢）・`nodes`（最初に調べる対象）・`cases: [{symptom, log, step, node, why}]`。問いの文は `labels` の `drill.q1` `drill.q2`。ログは架空の値で。
- `quiz`：`items: [{q, c: [選択肢…], a: 正解の添字(0 始まり), why, ch}]`。選択肢は表示のたびにシャッフルされるので、**「上のすべて」「A と B」のような位置に依存する選択肢は作らない**。

### 4.4 `compare`（汎用の 2 列対比表）

```js
CN.add('compare', 'c03-x', { title, caption?, colA: '宅配便', colB: '郵便', colNote: '違いの理由' /* false で備考列なし */,
  cats: [{ key: 'flow', label: '流れ' }],             // 省略可（あればタブ）
  rows: [{ cat?, a, b, note?, ch? }], note? });
```
列名はデータで決める。検索ボックスつき。同じ表の中で `a`・`b` の重複はビルドがエラーにする。`mapping` 部品は、章ごとに `CN.mapping(種別, 行)` で行を足し、付録で 1 つの対応表にする版で、列名・種別タブは `course.json` の `mapping` で決める（行は `{a, b, note, ch}`。旧 `a4`/`a5` も可）。

### 4.5 `flow` 工程フロー図（新規）

```js
CN.add('flow', 'c01-flow', { title, direction: 'auto'|'h'|'v',          // 既定 auto（広いと横、狭いと縦に自動で切り替え）
  steps: [
    { id: 'accept', name: '受付', sub?, kind?, time?: '約 3 分', desc?, inputs?: [..], outputs?: [..], caution?: '..', repeat?: '最大 2 回', ch?,
      next?: 'id' | ['id', ..] | [{ to, label?, cond?, kind?: 'next'|'branch'|'loop' }],   // 省略すると配列の次の工程
      end?: true, row?: 0, col?: n }
  ] });
```
- 工程は箱で並び、「次へ」「前へ」「最初から」、箱を押す、矢印キー、進み先のボタン（分岐・繰り返し）で移動する。通過した工程は印がつく。
- **分岐**＝`next` に進み先が複数。ラベル（`合格`／`不合格`）と条件 `cond` を書く。**繰り返し**＝戻る先（配列で前の工程）。破線で描き、`repeat` に回数の上限を書くと ↻ が付く。
- 配置：`row`（段。既定 0）と `col`（進行方向の位置）。row 0 の工程は順に 1 つずつ進む。**分岐だけに現れる工程は配列の末尾に置き**（番号 1..n を主経路に保つ）、`row: 1` と `col`（分岐元の列）を書く。同じ位置に 2 つ置くとエラー。
- 一覧（折りたたみ）と、図の `aria-label`（全工程名）が代替テキスト。検索の対象は工程の名前・説明・入出力・注意点。1 本あたり 5〜10 工程が目安。ラベルは短く（直線の辺は 4 字程度）。

### 4.6 `layers` 断面・構成の層図（新規）

```js
CN.add('layers', 'c02-x', { title, width?: 420, ends?: ['外側（上）', '外側（下）'], kinds?: {..}, initial?: 'goods', hint?,
  layers: [   // 上から下へ積む
    { id, name, h?: 52, dim?: '厚さの目安', kind?, desc?, material?, dims?, role?, note?, ch?,
      parts?: [{ id, name, sub?, label?, w?: 1, x?, wf?, gap?: true, kind?, desc?, material?, dims?, role?, note?, ch? }] } ] });
```
- `parts` がない層は、層全体が 1 つの部位。`parts` があると横に並ぶ（`w` の比で幅を分ける。`x`・`wf`（0〜1 の割合）を使うと位置を指定。`gap:true` は空き）。層の名前は左の欄に出る。
- 部位を押す／Enter で説明（材料・寸法・役割・説明・補足）。矢印キーで隣の部位へ（上下＝層、左右＝同じ層）。「▲上／▼下」のボタン、部位の一覧（折りたたみ）つき。選択以外は薄くなる。
- 層ごとの説明に使える文言は `labels` の `layers.f.*`。装置の断面、デバイスの断面、梱包の層、建物の階層などに使う。

### 4.7 `xsec` 工程断面ステッパー（新規）

断面の図形（矩形・多角形）に材料を割り当て、手ごとに追加・削除・変更して再生する。**静的な 1 枚の断面**も、`steps` を 1 つにすれば表せる（操作部は出ない。層が横に並ばない積層なら `layers`、横方向のパターンがあるなら `xsec`）。

```js
CN.add('xsec', 'c12-dd', { title, viewBox: [600, 260],      // 既定 [600,260]。左上原点
  base: [{ id: 'sub', m: 'si', x: 0, y: 180, w: 600, h: 80 }],          // 最初からある図形
  materials: { sio2: { name: '緩衝材', en: 'Cushion', role: '…' } },     // 省略可：材料の「名前」を図ごとに言い換える（色は固定）
  steps: [{ phase?, name, proc?, equip?, fx?, fxLabel?, fxArea?: [x,y,w,h],
    add?: [{ id, m, x, y, w, h, label? } | { id, m, pts: [[x,y],..] }], del?: ['id'], mod?: [{ id, y, h }], what?, trap?, ch? }] });
```
- 材料 `m`（固定の一覧、色は CSS 変数 `--m-*`）：`si si-n si-p sio2 sin poly hk metal cu w al barrier lowk resist resist-exp mold bump substrate void`。足りない材料は基盤に追加を依頼する（章で色を作らない）。
- `fx`（演出）：`deposit coat expose develop etch strip implant anneal polish plate clean bond dice measure`。範囲 `fxArea`。動きは `prefers-reduced-motion` で止まる（記号だけ静止して残る）。
- 操作は `seq` と同じ（再生・一時停止・前後・最初へ・スライダー・速度・一覧・矢印キー・Space）。追加・変更された図形は枠で強調。凡例（その図で使った材料）を押すと材料を強調。各手の `name`・`what` が説明パネルに出て、検索の対象（`title`・`name`・`proc`・`equip`・`what`・`trap`）。「寸法は模式」の注記は自動。
- ビルド検査：`del`・`mod` の id が既にある、`m` が一覧にある、図形が `viewBox` に収まる、`fx` が一覧にある。1 本 4〜12 手、1 手の `add` は 6 個程度まで（8 個超はエラー）。

### 4.8 `route` 行程帯図（新規）

```js
CN.add('route', 'c26-x', { title,
  points: [{ id, label, sub? }],                                   // 拠点（左から順、3〜7 個が目安）
  segs: [{ id, from, to, label, mode: 'land'|'sea'|'air'|'site'|'customs'|'pack'|'store', d?, docs?: [..], risks?: [..], ch? }],   // points の順に連続
  gates: [{ id, at: '拠点id', label, mode?, d?, docs? }],            // 区間の途中の手続き（旗）。省略可
  parties: [{ k: 'a'|'b'|'c'|'d', label }],                          // 負担者（2 つ以上。色は固定 4 種、帯の中に頭文字も入る）
  layers: [{ key, label, note?, rows: [{ label, by: { 区間idか手続きid: 'a' } }],   // 1〜3 段（例：費用・危険）
             marks?: [{ at: '拠点idか区間id', row, label, d? }], ch? }] });
```
- 上段に拠点と区間（記号は SVG）、下に段ごとの色帯。**上のタブで `layers`（条件）を切り替えると、色帯と印だけが変わる**。区間・手続き・拠点・印を押すと `d`・`docs`・`risks`・その条件での各段の負担者が出る。
- 同じ内容の表を図の下に折りたたみで自動出力（読み上げ・印刷用）。負担者でなく「強さ」を示すときは `parties` を「高・中・低・対象外」として使い、強さの根拠は本文に書く（数値を作らない）。
- ビルド検査：区間が拠点の順に連続、`by` のキーが実在、`parties` にない負担者を使わない、`marks` の `at`・`row` が実在。

### 4.9 付録のデータ関数

`CN.glossary([{t, en?, d, ch?, alias?}])`、`CN.exam([{part, q, c, a, why, ch}])`（`part` は appendix でない部の id）、`CN.mapping(種別, [{a, b, note, ch}])`。**自分の章のデータファイルの中**で呼ぶ。用語（`t`・`en`）、対応表の行（種別ごとの `a`・`b`）、総合テストと確認問題の問題文の重複はビルドがエラーにする（初出の章に 1 つだけ置き、他の章は `ch` で参照）。

## 5. 文言の辞書（`labels`）

部品の見出し・凡例・案内文は、`CN.t(キー, 図のデータ)` で 図の `labels` → `course.json` の `labels` → 既定（分野に依存しない言葉）の順に読む。キーの全一覧は `engine-00-core.js` の `DEF`。主なもの：`arch.plane.cp|up|lg`（線の凡例）、`arch.f.proto|carries|role`、`arch.link`（「リンク」を「インタフェース」などに）、`seq.ifLabel|ieLabel`、`stack.role.*`、`stack.legend`、`ident.where`、`tree.f.*`、`drill.q1|q2`、`mapping.colA|colB`、`flow.*`、`layers.f.*`、`xsec.*`、`route.*`。`presets/core-net-labels.json` は、コアネットワーク講義の元の文言を再現する辞書の例。

## 6. 保存・進捗・検索

読了・確認問題の成績・総合テスト・演習・テーマ・続きから読む は、すべて `localStorage` の `<prefix>read` `quiz` `exam` `drill` `theme` `last`。同じオリジンに複数の講座を置いても混ざらない。検索（`/`）は章の本文、部品のデータ（各手・各工程・各部位など）、用語集が対象。キー操作：`/` 検索、`[` `]` 前後の章、図は Tab で選び Enter、矢印キー、Space（再生）。

## 7. ビルド

```sh
python3 -I /home/claude/courses/_framework/build.py <講座>            # 出力（冪等）
python3 -I /home/claude/courses/_framework/build.py <講座> --check    # 検査だけ
python3 -I /home/claude/courses/_framework/build.py <講座> --demo     # 部品見本の章 S1 を足した版 -> <out>.demo.html
```
`--check` が検出するもの：章メタの不備・タグの閉じ忘れ・id の接頭辞違反・未登録のデータ・データ id の重複・JS の構文エラー・**用語集／対応表／対比表／確認問題／総合テストの重複**・**未定義の参照**（図の id、`ch` の章番号、`xsec` の材料、`route` の負担者など）・**章番号の欠番**・**リンク切れ**（`#chNN` や `#id`）・色の直書き・禁止要素・差し色のコントラスト・`prefix` の衝突・出力に作者名。`WARN` は直す（`learn`／`quiz`／`refs` の欠落など）。

## 8. テストと撮影

```sh
python3 -I /home/claude/courses/_framework/test.py <講座> [--only main|demo] [--port N]   # 最終行：結果: PASS n / FAIL m
python3 -I /home/claude/courses/_framework/shots.py <講座> [--out DIR]                    # スクリーンショット
```
`test.py` は、ビルド（2 回目も同一）・`--check`・静的検査・1366px / 375px × ダーク / ライトでの全章の全部品の操作（キーボード含む）・章の切替・確認問題の採点とやり直し（選択肢のシャッフル）・検索・読了の保存（接頭辞つき）・横はみ出し・代替テキスト・console エラー・reduced-motion・印刷を検査する。`--help` は説明だけ表示する。並行で走らせるときは `--port` を分ける。

## 9. 既存のコアネットワーク講義との互換と移行の見込み

互換：データ形式は既存の 9 部品＋付録部品と同じ（`qos`→`table`、`keys`→`tree` は別名）。`CN.mapping` の `a4`/`a5` も読める。差分は、(1) `ifs` タブが 1 つなら出ない、(2) `keys` の凡例は図のデータの `legend`、(3) 部の定義・トラック・章の計画・入口の文言・フッターが `course.json` に移る、(4) 保存キーの接頭辞が `cn.` のままなら `course.json` で `"prefix": "cn."` と書けないため（予約）、**移行時は `core-net.` などへ変え、読了記録の移行（`cn.*` を新キーへコピーする小さなスクリプト）が必要**。コア網講義の元の文言は `presets/core-net-labels.json` の `labels` をそのまま `course.json` に入れれば再現できる。
