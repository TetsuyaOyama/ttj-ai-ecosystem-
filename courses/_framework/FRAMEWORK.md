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
| `theme` | | ダークの基調と本文の書体の上書き（省略時は従来どおり、出力は変わらない）。`{"bg","surface","text","muted"}` は必須、`surface2`・`raise`（省略時は surface から自動）、`line`・`line2`・`faint` は任意（すべて `#RRGGBB`）。`fontBody` は本文の font-family（ローカルフォントのみ。表・図・ボタン・入力欄・サイドバー・コードは従来の sans / mono のまま）、`lineHeight` は 1.4〜2.4。ダークの画面表示だけに効き、ライトと印刷は変わらない。text・muted・faint が bg・surface・surface2・raise の上で 4.5:1 に届かなければビルドがエラー。`accent` の文字色もこの面で検査する。例は power/course.json |
| `parts` | ○ | 部の一覧 `[{id, name, short, appendix?}]`。**何部でもよい**（半導体は 5 部＋付録）。`appendix:true` の部は章番号が連続の最後に来て、総合テストの部に数えない。`name` の先頭の語（空白まで）が「第1部」のようなラベルになる |
| `parts[].front` / `parts[].label` | | `front:true` の部は**序章**：本編の第01章より前に並ぶ（章の並びは front の部が先頭）。章番号は 2 桁の数字でない識別子（例 `I1`・`I2`。ファイル名は `I1-….html`、データの id は `cI1-…`）で、`label`（既定「序章」）から「序章1」「序章2」（ナビの短縮は「序1」）と表示する。章番号の抜け・重複検査は数字の章だけに効く。読了・検索・前後ナビ・学習ルートに数える。総合テストの部には数えず（確認問題だけ）、公開範囲（publish）では章 id で指定する。`appendix` と同時には指定できない。`hero.how` の「序章1」「序章2」の語は序章へのリンクになる。front の部のない講座は出力が変わらない |
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
| `bucket` / `unitconv` / `appmix` / `areacircle` / `bundle` | **家庭の電気の部品 5 種**（任意。使った章がある講座にだけ `home-lab.js/css` が組み込まれる。§4.12） | 新規 |
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
- 部位の小さい文字（`sub`）は 1 行。箱の幅に収まらないときは、文字を 10〜9px まで小さくして収め、それでも収まらなければ末尾に「…」を付ける（黙って切り捨てない）。
- 層ごとの説明に使える文言は `labels` の `layers.f.*`。装置の断面、デバイスの断面、梱包の層、建物の階層などに使う。

### 4.7 `xsec` 工程断面ステッパー（新規）

断面の図形（矩形・多角形）に材料を割り当て、手ごとに追加・削除・変更して再生する。**静的な 1 枚の断面**も、`steps` を 1 つにすれば表せる（操作部は出ない。層が横に並ばない積層なら `layers`、横方向のパターンがあるなら `xsec`）。

```js
CN.add('xsec', 'c12-dd', { title, viewBox: [600, 260],      // 既定 [600,260]。左上原点
  base: [{ id: 'sub', m: 'si', x: 0, y: 180, w: 600, h: 80 }],          // 最初からある図形
  materials: { sio2: { name: '緩衝材', en: 'Cushion', role: '…' } },     // 省略可：材料の「名前」を図ごとに言い換える（色は固定）
  legend: 'step',      // 省略可：凡例を、その手で見えている材料だけにする（既定は全手で使う材料をすべて並べる）
  labelMinPx: 9.5,     // 省略可：ラベル（label）の文字が画面でこの px を下回らないよう、狭い幅で図の単位の大きさを増やす（既定は無効で 11 単位のまま。広い幅では変わらない）
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

### 4.10 `scale` 大きさの比較（任意の部品。使った章がある講座にだけ組み込まれる）

対数の物差し（縦。上ほど大きい）に項目を並べ、2 つを選んで「何倍・何軒分」を計算する。**倍率は必ずデータの値から計算し、部品の中に数値を持たない。** 免責「学習用の模型」を下に出す。
`CN.add('scale', id, {title, base, initial, sources, groups, items, stages?, disclaimer?, caution?})`

- `sources`：`[{n, issuer, title, date, note?, url?}]`。出典の一覧として下に出る。`n` は項目の `src` が指す番号。
- `groups`：`[{key, label}]`。項目の色分け（凡例）。
- `items`：`[{id, name, short?, value+unit | range:[最小,最大]+unit | from:{energy, unit:'kWh'|'MWh'|'GWh'|'TWh', hours, formula}, unit, group, counter?, shown?, desc, cond, src:[n…], ch?}]`。単位は W・kW・MW・GW・TW・万kW・千kW・VA・kVA・MVA・GVA（電力の物差し）、または金額の単位（下の「金額の物差し」）。`from` は電力量÷時間で W を出す（値を手で書かない）。`counter` は「何〇分」の数え方（軒・基・個）。`cond` に条件（定格か平均か、1 基か合計か、どの国か）を書く。
- `base`（基準の項目の id）、`initial`（最初に選ぶ項目の id）、`stages`（既定は全体・家庭・設備・国の 4 つのタブ）。
- 操作：項目は Tab で選び、Enter で比べる項目に、`b` キーで基準に、矢印の上下で隣の項目へ。拡大・縮小・上下移動のボタン、探るつまみ（矢印キー）。同じ内容の表と出典を折りたたみ・下段に出す。
- **金額の物差し**（円・ドル）：項目の `unit` に円の単位 `円・万円・億円・兆円`、またはドルの単位 `ドル・百万ドル・十億ドル・兆ドル` を書くと、物差しが金額になる（基準の単位は 円 または ドル。目盛り・探る値・計算の表示も円・ドルの単位に付け替わる）。**円とドルは別の物差し**で、1 つの `scale` に混ぜるとビルドがエラー（為替の換算はしない）。電力と金額も混ぜられない。`from`（電力量÷時間）は金額では使えない。
  - `stages`（桁の範囲）の `lo`・`hi` は、基準の単位の 10 のべき乗の指数（円なら 1 円＝0、1 万円＝4、1 億円＝8、1 兆円＝12。上限は円が 16、ドルが 15、電力が 13）。省略時は 全体・個人企業の桁・国市場の桁 の 3 つ。講座で上書きするときは `stages:[{key,label,lo,hi}]`（幅 2 桁以上）。
  - `counter`（倍率の数え方）は自由な語。金額では省略すると「倍」（「A は B の約 3.2 倍」）。「年分」「回分」のように末尾に「分」を付けてもよい（「約 3.2 年分」と出る。「分」は重ねない）。電力では従来どおり必須。
  - 免責の既定は「学習用の模型です。実際の投資・取引・契約の判断には使えません。」。`disclaimer`・`caution` で講座の文言に変えられる。
  ```js
  CN.add('scale', 'c01-money', { title: '金額の大きさ', base: 'salary', initial: 'gdp',
    sources: [{ n: 1, issuer: '発行元', title: '資料名', date: '2026-11' }], groups: [{ key: 'a', label: '個人' }, { key: 'b', label: '国' }],
    stages: [{ key: 'all', label: '全体', lo: 0, hi: 16 }, { key: 'nation', label: '国の桁', lo: 8, hi: 16 }],      // 省略可
    items: [
      { id: 'salary', name: '年収', value: 480, unit: '万円', group: 'a', counter: '年分', desc: '…', cond: '1 年間・税込', src: [1] },
      { id: 'gdp', name: '名目 GDP', value: 600, unit: '兆円', group: 'b', counter: '倍', desc: '…', cond: '1 年間・名目', src: [1] } ] });
  ```
- ビルド検査：項目の id 重複、`src` の番号が `sources` に実在、単位が既知、1 つの `scale` の単位が 1 種類（電力・円・ドル）、`group` が実在、`base`・`initial` が実在、8〜14 項目（目安）、`stages` が上限の範囲内。

### 4.11 `lab` 式を動かす実験台（任意の部品）

スライダーを動かすと、式の結果と図が変わる。式は安全な式評価器（`CNExpr`。eval を使わない）で、ブラウザとビルド検査で同じものを使う。
`CN.add('lab', id, {title, disclaimer?, experiments:[…]})`。実験ごとに：

- `id`・`label`（タブ）・`intro`・`formula`（式の文言）・`consts:[{id,value,label?}]`・`inputs:[{id,label,unit,min,max,step,value,presets?,say?,hint?}]`・`calc:[{id,expr}]`（途中の計算）・`results:[{label,expr,unit,digits,auto,big,note}]`（`auto:'W'|'Wh'|'円'|'ドル'` で単位を自動で付け替える。金額は円なら 円・万円・億円・兆円、ドルならドル・百万ドル・十億ドル・兆ドル）・`reads:[{when,text}]`（「読み取れること」。`when` が真のものを出す）・`ch`。
- `fig`：`{type:'curve', …}`（線グラフ。下の「線グラフ」）／`{type:'bar', bars:[{label,expr,unit,digits,auto,color}], max?, log?, logMin?}`／`{type:'wave', waves:[{label,amp,freq,phase,color}], span, ymax, unit, yLabel, rms?, rmsLabel?, sum?:{label}}`／`{type:'circuit', elements:[{type:'source'|'resistor',label,val,unit,digits}], current, imax, currentLabel, currentUnit}`。いずれも `alt`・`caption` を持てる。
- 式で使える：数・変数・`+ - * / ^`・比較・`&& || !`・`a ? b : c`・かっこ・関数 `sqrt abs sin cos tan asin acos atan atan2 exp ln log10 pow min max floor ceil round sign if(条件,a,b) clamp(x,lo,hi) ncdf(x) npdf(x)`・定数 `pi`（詳しくは js/opt/expr.js 冒頭）。
- **`ncdf(x)`・`npdf(x)`**：標準正規分布の累積分布関数 N(x) と密度関数 n(x)（ブラック–ショールズの計算用）。1 引数。ブラウザとビルド検査で同じ実装（js/opt/expr.js）。`ncdf` は Hart の有理近似（West 2005 の倍精度版）で、絶対誤差はおよそ 1e-15 以下（例：`ncdf(0)`＝0.5、`ncdf(1.96)`≒0.9750021、`npdf(0)`≒0.3989423）。式の例：`d1 = (ln(S/K) + (r + s*s/2)*T) / (s*sqrt(T))`、`C = S*ncdf(d1) - K*exp(-r*T)*ncdf(d1 - s*sqrt(T))`、`gamma = npdf(d1) / (S*s*sqrt(T))`。
- **線グラフ `fig.type:'curve'`**：x の範囲で式を評価して折れ線を描く（損益図・利回りの曲線・グリークスなど。負の値も描く）。
  ```js
  fig: { type: 'curve',
    x: { id: 'S', min: 70, max: 130, step: 1, label: '満期の価格', unit: '円' },          // id は式の中の変数名（入力・定数・calc と重ならない名前）。step は点の間隔（範囲を 2〜800 に分ける値）
    unit: '円', yLabel: '損益', digits: 1,                                              // 縦軸の単位・名前、表と図の名前に出す小数の桁数（既定 2）
    ymin: -20, ymax: 30,                                                               // 数か式（省略するとデータから決める）
    series: [{ label: '買い手', expr: 'max(S - K, 0) - p', color: 'ran' },              // expr は x の変数と入力・定数・calc が使える。color は ran/core/pol/ims
             { label: '売り手', expr: 'p - max(S - K, 0)', color: 'pol', dash: true }], // dash: true | 'dash' | 'dot' | false（省略時は 2 本目以降が自動で破線・点線）
    marks: [{ x: 'K', label: '権利行使価格' }, { x: 'K + p', label: '損益ゼロ' }],       // 縦の目印（x は式。x の変数は使えない）。各線との交点に点を付ける
    alt: '図の説明（必須）', caption: '図の下の説明（任意）' }
  ```
  - 0 の線は縦軸の範囲に 0 があれば自動で太く引く。`series` は 1〜6 本（凡例は折り返す）。値が数でない点では線が切れる（ビルド検査は有限の数にならない式をエラーにする）。
  - 同じ内容の表（折りたたみ）は、x を最大 13 点とった表と、目印の x での値の行。図の名前（aria-label）には目印の値と各線の端・最小・最大が入る。
  - ビルド検査：`x` の `id`・`min<max`・`step`・`label`、`series` の式が読める・未定義の名前がない・初期値で全点、入力の両端で両端と中央が有限、`ymin<ymax`、`marks` の `x` と `label`、`alt`。
  - 満期前の理論価格を重ねる場合：入力 `S0`（今の価格）と x の変数 `S` を別の名前にし、`series` の式に `S` から `ncdf` までを 1 つの式で書く（`calc` は x を使えない）。
- **lab の追加機能（2026-11-18。すべて任意・後方互換。使わない実験の出力は変わらない。見本：rates 第04章の c04-move・c04-price・c04-fwd・c04-real）**
  - **実験の `presets`（複数の入力をまとめて決めるボタン）**：`presets:[{label, set:{入力の id: 値}, text?}]`、`presetLabel?`・`presetHint?`。押すと、つまみがまとめて動く。`set` と同じ値のときボタンが押された状態（`aria-pressed`）になり、`text` が下に出る（`presetHint` は、どれにも当てはまらないとき）。`set` の id は入力にあり、値は min〜max（ビルド検査）。プリセットの値でも式が有限になるか検査する。
  - **`results[]` の追加**：`group:false`（桁区切りのカンマを付けない。西暦など。`auto` と併用しない。`base` にも `group` を持てる）、`words:['…','…']`（値を 0 始まりの番号として、数でなく言葉で出す。状態の名前など）、`show:'式'`（偽のときこの結果を出さない）、`base:{expr, digits?, words?, label?}`（「元：…」の小さな行。変化前との比較）。
  - **`quad`（分類表。2×2 など）**：`quad:{title?, corner?, cols:[…], rows:[…], cells:[[{title, sub?, when?}, …], …], caption?}`。実際の表（`table`）で、`when` が真のマスに ● と `aria-current` が付く。
  - **`figs:[fig, fig]`（1 つの実験に複数の図）**：`fig` の代わりに配列で。各 fig に `title?`。同じ内容の表は図ごとに出る。`fig` と `figs` は同時に持てない。
  - **`fig.type:'bar'` に `signed:true`（正負の棒）**：0 の線から左右に伸びる。`max`（絶対値の上限。数か式）、`negLabel`・`posLabel`・`axisDigits`。値は棒のない側に出る。`log` とは併用不可。
  - **`fig.type:'curve'` の追加**：`x.scale:'log'`（対数の横軸。`x.min>0`。点は `x.n` 個〔既定 160〕を等比に取る。`step` の代わり）、`x.ticks:[{v,label}]`（任意の目盛り。重なるときは 2 段にずらす。同じ内容の表もこの目盛りの行になる）、`series[].faint:true`（薄い線）、`series[].when:'式'`（偽の間はその系列を出さない）、`series[].data:[{x,y,l?}]`（`expr` の代わりに公表値などの点を直線でつなぎ、点に丸を付ける。`l` は表の行名）、`series[].nodot:true`（marks の交点の丸を付けない）、`fills:[{a,b,label?,color?,when?}]`（系列 a と b の間を色で塗る。`expr` の系列どうし）、`spans:[{from,to,label?,when?}]`（横軸の範囲を帯で示す。`from`・`to` は数か式）。
  ```js
  experiments: [{ id: 'move', label: '…', presets: [{ label: 'ブル・スティープ', set: { L: -70, S: 60, C: 0 }, text: '…' }],
    inputs: [{ id: 'L', … }, { id: 'S', … }, { id: 'C', … }],
    results: [{ label: '状態', expr: 'st', words: ['順イールド', 'ほぼ平ら', '逆イールド'], base: { expr: 'st0', words: ['順イールド', 'ほぼ平ら', '逆イールド'] }, big: true }],
    quad: { cols: ['スティープ', 'フラット'], rows: ['ブル', 'ベア'], cells: [[{ title: 'ブル・スティープ', when: 'nm == 3' }, { title: 'ブル・フラット', when: 'nm == 4' }], [{ title: 'ベア・スティープ', when: 'nm == 5' }, { title: 'ベア・フラット', when: 'nm == 6' }]] },
    figs: [{ type: 'curve', x: { id: 'T', min: 0.25, max: 30, n: 160, scale: 'log', label: '残存期間', ticks: [{ v: 0.25, label: '3M' }, { v: 2, label: '2Y' }, { v: 10, label: '10Y' }, { v: 30, label: '30Y' }] },
             series: [{ label: '元', expr: '…', color: 'ran', faint: true }, { label: '後', expr: '…', color: 'core' }], fills: [{ a: 0, b: 1, label: '変化' }], spans: [{ from: '2', to: '10', when: 'sp < 0', label: '逆転' }], alt: '…' },
           { type: 'bar', signed: true, max: 300, bars: [{ label: '2 年', expr: 'd2', unit: 'bp', digits: 0 }], alt: '…' }] }]
  ```
- 図の同じ内容の表を折りたたみで出す（読み上げ・印刷用）。動き（流れる点）は `prefers-reduced-motion` で止める。免責「学習用の模型」を出す。
- ビルド検査：式が構文として読める、使う変数が定義済み、入力の `min ≤ value ≤ max`、`step` が正。

### 4.12 家庭の電気の部品（`bucket` / `unitconv` / `appmix` / `areacircle` / `bundle`。任意の部品）

電力（瞬間）と電力量（量）、単位、家庭の使い方、発電所の規模を、つまみと図で結ぶ 5 種。`js/opt/home-lab.js` と `css/opt/home-lab.css` に自己完結（`scale-lab.js` や `expr.js` に依存しない）。使った章がある講座にだけ組み込まれ、使わない講座の出力は変わらない（ビルドは `HOME_WIDGETS` で判定）。検査は `check-data.js` の `V.bucket` ほか、動作は `test.py` の「家庭の電気の部品」。色は、家 ＝ `--hm-home`（橙）、1 軸 ＝ `--hm-axis`（緑）、全体 ＝ `--hm-all`（青）。色だけに意味を持たせず、線種・模様・文字を併記する。免責「学習用の模型です」を各部品が出す。

| 種別 | 内容 | 主なデータ |
|---|---|---|
| `bucket` | 蛇口とバケツの図、電力 × 時間の長方形（面積 ＝ 電力量）、W と時間のつまみ、機器の例、再生（動きを減らす設定では省略）、表 | `title, intro, power{…}, hours{…}, capacityKwh, formula, reads[]` |
| `unitconv` | W 〜 TW、Wh 〜 TWh の階段図（×1,000、万・億の印）と、全単位同時表示の換算 | `intro, initial, defaults{power,energy}, examples[], notes{power,energy}` |
| `appmix` | 機器ごとの有無・使う時間・平均の電力の棒、時間帯の帯、合計の電力の 1 日の形（平均と最大） | `devices[{id,name,runW,hours,flat,parts[{c,f}]}], presets[], presetHint, days, listNote, reads[]` |
| `areacircle` | 面積に比例する円（半径 ∝ √値）で、瞬間と 1 日の量（世帯換算）を並べる。家庭は点の拡大の吹き出し | `circles[], util{…,note}, axisId, says[]` |
| `bundle` | 世帯数（対数のつまみ）を束ね、①瞬間と量の 2 つの見方、②0〜24 時の山と谷（一定の出力 / 需要に合わせた出力、不足と余りを模様で）、③家と軸のアイコンの絵 | `n{min,max,step,value,presets[]}, util, time, minLoad, house, plants[], axisId, axisIconLabel, axisRange, texts{a,b,c}, caution` |

データ例は `power/data/I3-home-and-plant.js`。数値の根拠は、データファイル冒頭の `検算` 行と事実確認表に置く。

**文言の差し替え（`labels`、任意。2026-11-18 追加）**：5 種とも、データに `labels: { … }` を書くと、既定（発電の序章3向け）の文言を差し替えられる。省いた項目は従来のまま（既存のデータは変えなくてよい）。`{util}` `{u}` は置き換えの印。
| 部品 | 項目と既定 |
|---|---|
| 5 種共通 | `frame`：部品の見出し（`bucket` 「電力と電力量の実験台」、`unitconv` 「単位の階段と換算」、`appmix` 「家庭の電気の使いみち」、`areacircle` 「円の面積で比べる」、`bundle` 「家庭を束ねて、発電所と比べる」） |
| `bucket` | `capName`：バケツの満杯の呼び名（「家庭 1 日分」） |
| `appmix` | `trackNote`：時間帯の帯の下の注（冷蔵庫などの説明） |
| `areacircle` | `instant`：左の図の見出し（「① 瞬間の大きさ（出力）」）／`daily`：右の図の見出し（「② 1 日の量（家庭の何軒ぶんか。{util} {u} %）」）／`util`：「利用率」の呼び名（つまみの呼び名に合わせる。例「平均の電力が最大の」。見出し・表・読み取りで「{util} 60 %」の形に入る）／`amountCol`：表の列名「出力」／`instCol`・`dayCol`・`qtyCol`：表のそのほかの列名／`home`（「家庭」）・`unit`（「世帯」）／`callout`：家庭の吹き出しの注（「（左の点の拡大図。同じ縮尺では点より小さい）」）／`qtyFmt: 'auto'`：1 日の量を、MWh 固定でなく単位を自動で選んで表に出す（小さい値のとき） |
| `bundle` | `util`：「利用率」の呼び名（読み取り・表・凡例・説明の文に入る） |
例（計算サーバー序章1）：`labels: { instant: '① 瞬間の大きさ（使う電力）', daily: '② 1 日の量（家庭の何軒ぶんか。{util} {u} %）', util: '平均の電力が最大の', amountCol: '電力', qtyFmt: 'auto' }`。

**`areacircle` のラベル**：狭い幅（パネル幅 460 px 未満。幅 1280 の 2 段組みもこちら）で、2 つ目の円のラベルは大きい円の右端より右の幅に収まるよう折り返す（描いた文字の幅を実測して決め、足りない高さは図を伸ばす）。見出しが長いときも折り返し、円の中の名前は円の幅で折り返す。名前が長くても大きい円に重ならない（短くする必要はない）。収まる文言は、従来と同じ位置・同じ見た目。

### 4.11b `strip` 限月の階段（任意の部品）

連続する限月の先物の価格と金利を階段で並べる実験台。書き方は `STRIP-LAB.md`（`mode`: stairs / combo / pnl）。

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
