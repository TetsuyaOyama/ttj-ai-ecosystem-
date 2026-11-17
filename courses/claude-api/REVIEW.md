# 検証の記録（講座『Claude API 入門』序章・第01〜15章）

- 検証日：2026-11-18（根拠の確認日はすべて 2026-11-18）
- 対象：`chapters/`・`data/`・`facts/` の I1・01〜15。`course.json`・`tools/`・`_framework/` は編集していない。公開（--publish）・push はしていない
- 修正前の控え：`/tmp/claude-api-review/orig/`。取得した公式ページの控え（Pricing の .md 版）：`/tmp/claude-api-review/docs/pricing.md`
- 修正後の検査：`node tools/selfcheck.js claude-api <章> --answers` は I1・01〜15 の全 16 章で `NG 0 件`（Python・bash・JSON・TypeScript の構文検査を含む）。`python3 -I _framework/build.py claude-api --check` → `OK (check only) 章 15/15 公開, データ 70 件, HTML 621 KB 0 warnings`。第05章の実験台の式は node で検算（4 つの例とも、手計算と一致）
- 照合の方法：公式ページを WebFetch で開き、値とコードは該当箇所を名指しして逐語で取り出した。Rate limits・Get started・API overview・Pricing は Markdown の原文（.md）を取得。そのほかは、別の聞き方で 2 回取り、一致を確かめた（API versions、Working with Messages、Python SDK、Define tools、Usage Policy、MCP connector など）
- 確認の範囲の制約：platform.claude.com の HTML 版の Pricing を WebFetch で開くと、表が崩れて「Claude Fable 5.1（10/50 ドル）」の行だけが返り、Fable 5.2 の行が欠けた。同じページの .md 版の原文では Fable 5.2 の行（8/10/16/0.20/40 ドル）があり、Models overview の表とも一致したので、講座の値は正しいと判断した。claude.com/pricing はこの環境の許可の外で開けなかった。API は呼べない環境のため、コードは構文の検査だけ。画面写真は撮り直していない（基盤の shots を動かしていない）
- 変更したファイル：`chapters/02・03・04・06・09・10・13・15`、`data/02・03・04・05・06・07・08・09・10・11・12・14`、`facts/01〜11・13・14・I1`（照合の列を「再照合」に更新。02・04・09・13 に行を追加）

## 件数

| 区分 | 件数 | 直した | 未対応 |
|---|---|---|---|
| 重大 | 1 | 1 | 0 |
| 中 | 6 | 6 | 0 |
| 軽 | 21 | 18 | 3 |
| 合計 | 28 | 25 | 3 |

## 指摘

### 重大

| # | 章 | 場所 | 何が誤りか | 根拠（確認日 2026-11-18） | 対応 |
|---|---|---|---|---|---|
| H1 | 02・03 | 第02章「API キーとは何か」・`c02-flow` の key、第03章 curl の後の段落・`c03-req` | キーの作り方で、ワークスペースの選択に触れていなかった。公式は「ワークスペースに限定しないキーでは、各リクエストに `anthropic-workspace-id` ヘッダーが必要」と書く。第03章は「必須のヘッダーは 3 つ」とし、curl・Python・TS の例にこのヘッダーがない。初学者が限定なしのキーを作ると、手順どおりに進めても最初の 1 回でつまずくおそれがある | Get your Claude API key https://platform.claude.com/docs/en/get-api-key ／ Authentication https://platform.claude.com/docs/en/manage-claude/authentication （"If your API key isn't scoped to a workspace, you must specify the workspace ID in the `anthropic-workspace-id` header"）／ API overview https://platform.claude.com/docs/en/api/overview （ヘッダー表） | 直した。第02章に「ワークスペースを 1 つ選んで作ると、第03章の例のとおりに送れる。限定しないキーは毎回このヘッダーが要る」を追記。流れ図の入力に「ワークスペース」を追加。第03章に 4 つ目のヘッダーの条件を追記。参照資料と `facts/02` #8 |

### 中

| # | 章 | 場所 | 何が誤りか | 根拠 | 対応 |
|---|---|---|---|---|---|
| M1 | 09（07 にも関係） | `c09-choice` の any・tool の行と補足、第09章本文、`c07-params` の補足、用語集 tool_choice | tool_choice の `any`・`tool` を「必ず呼ぶ」とだけ書き、「プロンプトで頼むより確実」としていた。公式は、Fable 5.2・Opus 5.5・Sonnet 5.5 などでは `any` と `tool` が 400 になり、`auto`＋`strict: true` か構造化した出力を使うよう案内している（講座の 4 モデルのうち使えるのは Haiku 5.5 だけ） | Define tools https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools （Forcing tool use の表。逐語で 2 回取得） | 直した。表に条件を明記、本文に 1 段落、参照資料に Define tools を追加、第07章・用語集にも注記。`facts/09` #7 |
| M2 | 04 | 本文「メッセージの 3 つの置き場所」、確認問題 問2、`c04-roles`、用語集 system プロンプト、つまずきやすい点 | 「system は messages の中には入れない」と断定していた。公式には、会話の途中で `role: "system"` の発言を user の直後に置く方法がある（先頭には置けない。講座の 4 モデルを含む対応モデルあり）。問2 の正答「messages の中には入れない」は現行の仕様と食い違う | Working with Messages https://platform.claude.com/docs/en/build-with-claude/working-with-messages （System role in messages） | 直した。補足の段落を追加し、問2 を「会話の最初から効かせる system プロンプトの置き場所」に変え、正答を「本文のトップレベルの system に書く」に。誤答「messages の先頭に role を system として入れる」は、先頭不可なので誤りのまま成り立つ。`facts/04` #5 |
| M3 | 04 | つまずきやすい点の 1 つ目、`c04-roles` の補足 | 「交互に並べないと 400 → まず並びを確かめる」と読める書き方だった。API リファレンスは「同じ役の発言が続くと 1 つの発言にまとめられる」と書く（エラーとは書いていない）。執筆者が除外した「交互でないとエラー」が本文に残っていた | Messages API reference https://platform.claude.com/docs/en/api/messages/create （messages の説明） | 直した。「まとめられる。意図と違う会話として読まれうるので交互に並べる」に書き換え |
| M4 | 08 | `c08-struct` の 3 行目「書き方」 | 「tools の input_schema に strict: true」は置き場所の誤り。strict はツールの定義（name・description・input_schema と同じ階層）に付ける | Tool use overview https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview （"Add `strict: true` to your custom tool definitions"）／ Structured outputs https://platform.claude.com/docs/en/build-with-claude/structured-outputs | 直した（「tools の各定義に strict: true（input_schema と並べて書く）」） |
| M5 | 10 | 1 つ目の Python 例と前置きの文 | 短い system（1 文）だけに `cache_control` を付けていた。最小の長さに届かない前置きは、エラーにならず、キャッシュされない（公式）。PDF は印より後ろにあり対象外。例のとおりでは何も再利用されず、誤解を生む | Prompt caching https://platform.claude.com/docs/en/build-with-claude/prompt-caching （"Shorter prompts cannot be cached … no error is returned"、prefix は tools→system→messages）／ PDF support https://platform.claude.com/docs/en/build-with-claude/pdf-support （document ブロックに cache_control を付ける例） | 直した。印を PDF の document ブロックに移し（system と PDF が対象）、system は文字列に。前置きの文に理由を追記。あわせて S11 |
| M6 | 13（06 から参照） | 第13章「入力の扱い」、第06章 `c06-models` の Fable の補足 | 第06章が「Fable 5.2 はデータの保持の条件が違う（第13章）」と書くが、第13章に記述がなかった。公式は Fable 5.2 などを Covered Models とし、30 日の保持が必要、Anthropic が認めない限り ZDR 不可、保持の設定がない組織はエラー、としている。第06章の「一般の顧客に開かれた、最も高性能」も照合できない言い方 | API and data retention https://platform.claude.com/docs/en/manage-claude/api-and-data-retention ／ Choosing a model https://platform.claude.com/docs/en/about-claude/models/choosing-a-model （"The highest available capability"） | 直した。第13章に 1 段落を追加、参照資料を更新。第06章の補足を「使える中で最も高い能力が必要なときの出発点。30 日の保持が必要（第13章）」に。`facts/13` #6 |

### 軽

| # | 章 | 場所 | 内容 | 根拠 | 対応 |
|---|---|---|---|---|---|
| S1 | 02 | 参照資料（サポート記事） | 更新日の表記「約 2 週間前」→ 取得時の表示は「Updated over 2 weeks ago」 | https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage | 直した（「2 週間以上前」） |
| S2 | 02 | 本文 | 公式のクイックスタートは、ローカル開発には CLI でのサインインを推奨。講座は API キーの方法だけで、その旨の説明がなかった | https://platform.claude.com/docs/en/get-started （"Signing in with the CLI is recommended for local development"） | 直した（1 文の注記） |
| S3 | 03 | 参考：TypeScript の例 | 先頭の階層の await を使う例だが、実行方法（ESM の設定、tsx）がなく、初学者が動かせない | Get started（TypeScript のタブ：`npm pkg set type=module`、`npx tsx quickstart.ts`） | 直した |
| S4 | 04 | 本文「API は、会話を覚えていない」 | 公式には、API が会話を保持するベータ機能（message threads）もある。基本の説明は正しいので、注記だけ足した | Working with Messages | 直した |
| S5 | 05 | 実験台の係数のプリセットと読み | 「安全側の仮定：1 文字 ＝ 1 トークン」「多めに見積もる仮定」は、日本語で多めかどうか照合できない | Glossary https://platform.claude.com/docs/en/about-claude/glossary （言語で違う、数えるには token counting） | 直した（「仮の値。多いか少ないかは確かめていない。トークンカウントで置き換える」） |
| S6 | 05 | 実験台の例「長い PDF の読み取り」 | 「100,000 トークンを超えるので高い単価」は係数 1 のときだけ成り立つ（係数 0.29 では超えない） | 実験台の式を node で検算 | 直した（「係数が 1 のとき」を追記） |
| S7 | 06 | 本文「軽い作業は、軽いモデルで」 | 「詳しくは第 14 章で触れます」が、第14章にない | — | 直した（公式ページへの案内に変更） |
| S8 | 06 | 本文・つまずき・`c06-models` | 同じ出典（Choosing a model）からの「」の引用が 3 つ。方針（1 出典 1 つ）に合わない | — | 直した（2 つを言い換え） |
| S9 | 07 | `c07-stop` の refusal の補足 | 「課金はされます」の根拠は Handling stop reasons にはなく、Structured outputs のページにある | https://platform.claude.com/docs/en/build-with-claude/structured-outputs （"You'll be billed for the tokens generated"） | 直した（出典を明記） |
| S10 | 07 | 確認問題 問1 | 「4.7 以降のモデルで temperature を付けると 400」は、旧バージョンでは既定値なら通るので、誤答「値が無視されて動く」が正しく読める余地があった | https://platform.claude.com/docs/en/build-with-claude/working-with-messages （"non-default value … and starting with 2026-10-21 any value"） | 直した（問を「API バージョン 2026-10-21 で」に。解説も補足） |
| S11 | 10 | 2 つの Python 例 | `content[0].text` で先頭のブロックだけを読んでいた。第03章の「type を確かめて読む」と矛盾（思考のブロックなどが先頭に来ると失敗） | Get started（ブロックをたどって text だけを表示） | 直した（text のブロックをつなげる書き方に） |
| S12 | 09 | Python 例の最後の行 | 上限の 5 回で抜けた場合など、text のブロックがないと `next()` が StopIteration で落ちる | — | 直した（`"".join(...)` に） |
| S13 | 09 | `c09-seq` の注意 | 「tool_use_id が合わないとエラー」は公式に直接の記載がない。記載があるのは「tool_use の直後に tool_result がないとエラー」 | https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls | 直した（公式の記載に合わせた） |
| S14 | 08 | `c08-prompt` の caption | 「例は架空」としていたが、「省略記号・音声読み上げ」の行は公式の例の言い直し | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices | 直した（caption に明記） |
| S15 | 11 | `c11-ways` の Managed Agents の行 | 「実行環境も Anthropic の側にある」は、自分のインフラも選べる公式の記載と合わない（補足とも矛盾） | https://code.claude.com/docs/en/agent-sdk/overview （比較表） | 直した |
| S16 | 11 | 確認問題 問2 | 正答「対応は主にツールの呼び出し」→ 公式は「only tool calls」 | https://platform.claude.com/docs/en/agents-and-tools/mcp-connector | 直した（「だけ」） |
| S17 | 15 | 資料の地図 | 料金・モデル・エラー・制限の行にリンクがなく、「リクエストの形・ヘッダー」の行がヘッダーの一覧（API overview）を指していなかった | 各ページ | 直した（Pricing・Models overview・Errors・Rate limits・API overview のリンクを追加） |
| S18 | 12（02・06・07・10・11・14 にも） | 工程フローの箱の小見出し | 申し送りの件。箱の小見出しは 1 行で切られるので、長い文言の後ろが欠ける（例：「請求書の PDF（架空」「別の経路と突き合わ」）。第12章は名前も 2 行に折れて窮屈 | 画面写真 `usecase-1280.png`、`_framework/js/engine-35-flow-layers.js`（小見出しは `slice(0, 1)`）、`engine-00-core.js` の幅の数え方 | 直した（データの側だけ）。小見出しを幅の目安 9（全角 1・半角 0.56）以下に、第12章は名前も 6.3 以下に短縮。詳しい中身は各工程の説明文に残した。画面写真は撮り直していない |
| S19 | 02・06・07・10・11・14・I1 | 工程フローの箱の名前 | 名前が 7 字前後以上の箱は 2 行に折れる（欠けはしない）。第12章のような窮屈さがありうる | 上の S18 と同じ | 未対応（欠けではないため。必要なら名前を 6 字程度に） |
| S20 | 04 | 実験台 `c04-build` の結果の札 | system の値の例「"あなたは、…の窓口の下書き係です。"（messages の外）」が、幅 1280 でも細かく折れて読みにくい（`build-1280.png`） | 画面写真 | 未対応（表示の好み。短くするなら「"…の下書き係です。"（messages の外）」） |
| S21 | 全体 | 画面写真 | S18 の修正後の表示を、写真で確かめていない | — | 未対応（基盤の shots で撮り直して確認を） |

## 申し送り項目の再照合の結果（すべて 2026-11-18）

| 項目 | 結果 | 根拠 |
|---|---|---|
| anthropic-version 2026-10-21 | 一致（最新。新しい統合には最新を勧める） | API versions、Get started（.md 原文の curl）、API overview（.md 原文のヘッダー表） |
| temperature・top_p・top_k の削除 | 一致（2026-10-21 で全モデル 400。4.7 以降は既定と違う値で 400） | API versions、Working with Messages |
| プレフィルが 4.6 以降で 400 | 一致 | Working with Messages、Messages API reference |
| Python 3.10 以降 | 一致（2 回取得） | Python SDK |
| SDK の既定の再試行 2 回 | 一致（接続エラー・408・409・429・5xx） | Python SDK、Errors |
| output_config.format の形 | 一致（`{"format": {"type": "json_schema", "schema": …}}`。messages.parse が推奨） | Structured outputs、Messages API reference、Effort |
| 第05章の単価・キャッシュ・バッチ（5 行） | 一致（.md 原文。Fable 5.2 の行は HTML 版の取得で欠けた → 冒頭の制約） | Pricing（.md）、Models overview |
| 月の上限・Sonnet 5.5 の RPM/ITPM/OTPM・429/400 の区別 | 一致（.md 原文） | Rate limits |
| コンテキスト 1M・出力 128K、超過は 400 | 一致 | Models overview、Context windows |
| 英語 3.5 文字（以前のモデル）・新トークナイザー約 30% 増 | 一致 | Glossary、Pricing |
| count_tokens は無料・推定値 | 一致 | Token counting（日本語版） |
| stop_reason の 7 値、pause_turn の既定 10 回 | 一致 | Handling stop reasons |
| エラーの種類・本文の形・request-id | 一致 | Errors |
| ストリーミングのイベントの順 | 一致 | Streaming |
| ツール利用の流れ・tool_result の置き方・is_error | 一致（tool_choice は M1） | Tool use overview、Handle tool calls |
| 画像・PDF の渡し方、限界 | 一致 | Vision、PDF support |
| バッチ（1 時間・24 時間・29 日・順不同・stream 不可・50%）、型の import | 一致（`MessageCreateParamsNonStreaming`・`Request` の import は公式の例と同じ） | Batch processing |
| MCP コネクタ（ベータ、mcp-client-2025-11-20、tool のみ、https、STDIO 不可、OAuth は利用者側） | 一致（新しいヘッダー mcp-client-2026-09-15 も使える、と公式に追記あり。講座の書き方は有効） | MCP connector |
| Agent SDK・Managed Agents・claude.ai ログインの注記 | 一致 | Agent SDK overview |
| Usage Policy（施行 2026-11-12、3 部構成、15・11 分野、変える権限つきの人の確認、開示、作った側の責任） | 一致（2 回取得） | Usage Policy |
| ZDR の対象外（バッチ・Files API・MCP コネクタ） | 一致（Covered Models は M6） | API and data retention |
| 前払い・自動リロード・1 年で期限・返金なし・Admin/Billing の役割、無料クレジット | 一致 | サポート記事、Pricing |
| effort の 5 段階・既定（Opus 5.5／Haiku 5.5 は medium、ほかは high） | 一致 | Effort、Models overview、Choosing a model |

## そのほか確かめたこと

- コード例：パッケージ名（`anthropic`、`@anthropic-ai/sdk`）、import、`anthropic.Anthropic()`、`messages.create`・`messages.stream`・`count_tokens`・`batches.create/results`・`beta.messages.create(betas=…)` の形は、公式の各ページの例と一致。キーの実物らしい文字列なし（YOUR_API_KEY・YOUR_TOKEN・環境変数名だけ）。キーの直書き・公開の場所に置く書き方を勧める箇所なし。「実行して確かめた」の記述なし
- 料金と上限の数字は第05章だけ（selfcheck の検査と目視）。第05章は「100 万トークンあたりのドル」「すべてドル」「見積もりで請求額を保証しない」「係数は仮」「count_tokens で測る」を明記
- 公式を装う表現・ロゴ・公式の図版なし。お断りは序章と付録の両方にある。作者の名前・ハンドル・メールアドレスなし
- 「公式は最新の API バージョンを勧める」（第03章）は照合できた（"Anthropic recommends using the latest API version whenever possible"、API versions）
- 第14章は「公式に載っていること」の表と「この講座の見方」が分かれており、予測の断定はない
- 確認問題・総合テスト（全 46 問）の正答を読み、M2・S10・S16 以外に誤りはなかった。正答の位置の規則は全問で合致

## 公開の可否

| 章 | 判断 | 理由 |
|---|---|---|
| 序章 I1 | 可 | — |
| 01 | 可 | — |
| 02 | 可 | H1・S1・S2 を修正済み |
| 03 | 可 | H1・S3 を修正済み |
| 04 | 可 | M2・M3・S4 を修正済み（S20 は表示の好み） |
| 05 | 可 | S5・S6 を修正済み。単価は .md 原文で照合済み |
| 06 | 可 | M6・S7・S8 を修正済み |
| 07 | 可 | S9・S10 を修正済み |
| 08 | 可 | M4・S14 を修正済み |
| 09 | 可 | M1・S12・S13 を修正済み |
| 10 | 可 | M5・S11 を修正済み |
| 11 | 可 | S15・S16 を修正済み |
| 12 | 条件つき | S18（箱の文言）をデータ側で直したが、画面写真での確認が未了（S21）。撮り直して欠けがないことを確かめてから |
| 13 | 可 | M6 を修正済み |
| 14 | 可 | — |
| 15 | 可 | S17 を修正済み |
