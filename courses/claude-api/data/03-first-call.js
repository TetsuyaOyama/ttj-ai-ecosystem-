/* 第03章のデータ。事実の出どころ：facts/03-first-call.md（確認 2026-11-18）。例の値は説明のためのもの（実在の ID ではない） */
function Q(q, ok, bad, a, why, ch) { var c = bad.slice(); c.splice(a, 0, ok); return { q: q, c: c, a: a, why: why, ch: ch || [] }; }
function E(part, q, ok, bad, a, why, ch) { var o = Q(q, ok, bad, a, why, ch); o.part = part; return o; }

CN.add('ident', 'c03-req', {
  title: 'リクエストの解剖：宛先・ヘッダー・本文',
  items: [
    { name: 'curl のリクエスト', full: 'POST https://api.anthropic.com/v1/messages ＋ ヘッダー 3 つ ＋ JSON の本文',
      summary: 'リクエストは、**宛先**（どこへ）、**ヘッダー**（誰が、どの形式で）、**本文**（何を頼むか）の 3 種類でできています。',
      where: '第 03 章の curl の例。公式のクイックスタートと同じ構成です。Python の SDK は、ヘッダーを自動で付けます。ワークスペースに限定しないキーでは、anthropic-workspace-id ヘッダーも要ります（第 02 章）。', ch: [3],
      parts: [
        { label: '宛先', val: 'https://api.anthropic.com/v1/messages', bits: '必須。POST で送る', d: 'Messages API の窓口です。api.anthropic.com は Claude API のサーバーで、/v1/messages は「メッセージを送る」操作の場所です。', c: 1 },
        { label: 'content-type', val: 'application/json', bits: '必須', d: '本文が JSON であることを知らせるヘッダーです。', c: 2 },
        { label: 'x-api-key', val: '$ANTHROPIC_API_KEY（環境変数の値）', bits: '必須（認証）', d: 'API キーを渡すヘッダーです。公式の API overview では、Authorization ヘッダーでも渡せ、x-api-key は以前からの方法として今も使えると書かれています。キーは、シェルが環境変数から入れます。', c: 2 },
        { label: 'anthropic-version', val: '2026-10-21', bits: '必須', d: 'API のバージョンを指定するヘッダーです。SDK は、自動で付けます。', c: 2 },
        { label: 'model', val: 'claude-haiku-5-5', bits: '本文・必須', d: 'どのモデルに頼むかを、API の ID で指定します。ID の一覧は第 06 章です。', c: 3 },
        { label: 'max_tokens', val: '1000', bits: '本文・必須', d: '答えとして作る文章の長さの上限（トークン）です。足りないと、答えが途中で切れます。', c: 3 },
        { label: 'messages', val: '[ { "role": "user", "content": "…" } ]', bits: '本文・必須', d: '会話の一覧です。role は発言した側（user か assistant）、content は発言の中身です。第 04 章で詳しく学びます。', c: 3 }
      ] }
  ]
});

CN.add('ident', 'c03-res', {
  title: 'レスポンスの解剖：content・stop_reason・usage',
  items: [
    { name: 'Messages API のレスポンス', full: '{ id, type, role, content, model, stop_reason, stop_sequence, usage }',
      summary: '返ってくる JSON のうち、**content**（答え）、**stop_reason**（止まった理由）、**usage**（使ったトークン数）を、まず読みます。値は説明のための例です。',
      where: 'API が返す JSON。公式のクイックスタートに、同じ形の出力例があります。', ch: [3],
      parts: [
        { label: 'id', val: '"msg_…"（例）', bits: '文字列', d: 'このメッセージを区別する ID です。ログに残しておくと、あとで調べやすくなります。', c: 1 },
        { label: 'role', val: '"assistant"', bits: '固定', d: '答えは、assistant（Claude）の発言として返ります。', c: 1 },
        { label: 'content', val: '[ { "type": "text", "text": "…" } ]', bits: 'ブロックの一覧', d: '答えの本体です。1 つ以上の**ブロック**の一覧で、文章は type が text のブロックの text にあります。ツールを使うときは、別の種類のブロックも入ります（第 09 章）。', c: 2 },
        { label: 'model', val: '"claude-haiku-5-5"', bits: '文字列', d: '答えを作ったモデルです。', c: 3 },
        { label: 'stop_reason', val: '"end_turn"', bits: '文字列', d: '答えが止まった理由です。end_turn は、モデルが自然に答え終わったことを表します。max_tokens は、長さの上限で切れたことを表します（第 07 章）。', c: 3 },
        { label: 'usage', val: '{ "input_tokens": 21, "output_tokens": 305 }（例）', bits: '数', d: '入力と出力で使ったトークンの数です。費用の計算に使います（第 05 章）。数は例です。', c: 4 }
      ] }
  ]
});

CN.add('seq', 'c03-seq', {
  title: '最初の 1 回の流れ：コード → SDK → API → モデル → コード',
  actors: [
    { id: 'code', name: 'あなたのコード', sub: 'first.py', kind: 'ue' },
    { id: 'sdk', name: 'SDK', sub: 'anthropic ライブラリ', kind: 'ue' },
    { id: 'api', name: 'Claude API', sub: 'api.anthropic.com', kind: 'ran' },
    { id: 'model', name: 'モデル', sub: 'Claude', kind: 'core' }
  ],
  steps: [
    { phase: '① 準備', at: 'sdk', note: '環境変数 ANTHROPIC_API_KEY から、API キーを読む', msg: 'キーの読み込み', what: '`anthropic.Anthropic()` と書くだけで、SDK が環境変数のキーを読みます。キーをコードに書かなくて済みます。' },
    { phase: '② 送る', from: 'code', to: 'sdk', msg: 'messages.create(model, max_tokens, messages)', lbl: '呼び出し', if: 'Python の関数呼び出し', ie: ['model', 'max_tokens', 'messages'], what: 'コードは、モデルの名前と、答えの長さの上限と、会話の一覧を渡します。' },
    { from: 'sdk', to: 'api', msg: 'POST /v1/messages（ヘッダー 3 つ ＋ JSON の本文）', lbl: 'HTTPS で送信', if: 'HTTPS', ie: ['x-api-key', 'anthropic-version', 'content-type', '本文'], what: 'SDK は、渡された内容を JSON にして、必須のヘッダーを付けて送ります。curl で手で書いたものと同じ形です。' },
    { phase: '③ 処理', at: 'api', note: 'キー・バージョン・形式を確かめる', msg: '受付の確認', what: 'キーが正しいか、バージョンのヘッダーがあるか、JSON の形が正しいかを確かめます。問題があれば、ここでエラー（第 07 章）を返します。', trap: '支払いの設定がないと、ここで止まることがあります（第 02 章）。' },
    { from: 'api', to: 'model', msg: 'メッセージを渡す', lbl: '処理を依頼', dash: false, if: 'Anthropic の内部', ie: ['メッセージ'], what: '確認を通ったリクエストは、モデルに渡されます。' },
    { from: 'model', to: 'api', msg: '答えの文章', lbl: '答えを返す', dash: true, if: 'Anthropic の内部', ie: ['答えの文章'], what: 'モデルは、送られたメッセージだけを材料に、答えを作ります。会話の記憶はありません（第 04 章）。' },
    { phase: '④ 受け取る', from: 'api', to: 'sdk', msg: '200 と、レスポンスの JSON', lbl: 'レスポンス', dash: true, if: 'HTTPS', ie: ['content', 'stop_reason', 'usage'], what: '成功すると、HTTP の状態は 200 で、JSON が返ります。' },
    { from: 'sdk', to: 'code', msg: 'message オブジェクト', lbl: '結果を渡す', dash: true, if: 'Python のオブジェクト', ie: ['message.content', 'message.usage'], what: 'SDK は、JSON を Python のオブジェクトにして返します。' },
    { at: 'code', note: 'content から text のブロックを取り出して、表示する', msg: '答えを表示', what: '`for block in message.content` でブロックをたどり、type が text のものだけを表示します。' }
  ]
});

CN.add('table', 'c03-trouble', {
  title: '最初の 1 回でよくある症状と、最初に見る点',
  caption: 'エラーの種類の出典は公式の Errors のページ。「最初に見る点」は、この講座の整理です',
  cols: ['症状', '考えられる原因', '最初に見る点'],
  rows: [
    ['401（authentication_error）', 'キーが間違っている・取り消された・期限が切れた・環境変数にない', '`echo $ANTHROPIC_API_KEY` で、値が入っているかを確かめる（中身は他人に見せない）。別のウィンドウでは入っていないことがある。'],
    ['400（invalid_request_error）', '本文の JSON の形が違う、必須の項目がない', 'model・max_tokens・messages があるか。かっこと引用符の閉じ忘れがないか。'],
    ['402（billing_error）', '請求や支払いの情報に問題がある', 'Console の Billing ページで、クレジットと支払いの情報を確かめる。'],
    ['404（not_found_error）', '宛先の URL や、指定した ID が見つからない', '宛先が /v1/messages になっているか。モデルの名前の綴り（この講座の見方）。'],
    ['command not found（curl・python）', 'コマンドが入っていない、または別の名前', 'curl が使えないときは、Python の方法を使う。python3 と書くと動く環境もある。'],
    ['ModuleNotFoundError: anthropic', 'SDK が、今の環境に入っていない', '仮想環境に入ったまま `pip install anthropic` を実行したか。']
  ],
  detail: [
    '401 は、認証の失敗を表します。公式ドキュメントは、キーが不正な形・取り消し・期限切れの例を挙げています。',
    '400 は、リクエストの形や内容の問題です。第 07 章で、ほかの 400 の原因も学びます。',
    '402 は、請求や支払いの情報の問題です。第 02 章の支払いの設定を見直します。',
    '404 は、宛先やリソースが見つからないことを表します。公式ドキュメントは、宛先の経路とリソースの ID を確かめるよう書いています。',
    'curl は、macOS と Linux にたいてい入っています。Windows では、Python の方法が確実です。',
    '仮想環境を有効にしたあとで、pip install を実行します。別の環境に入れていると、このエラーになります。'
  ],
  note: 'ほかの症状は、第 07 章のエラーの表と、公式の Errors のページを見てください。'
});

CN.add('quiz', 'c03-quiz', { items: [
  Q('リクエストのヘッダー anthropic-version の役目はどれですか。',
    '使う API のバージョンを指定する。必須で、SDK を使うと自動で付く。',
    ['使うモデルを指定する。', 'API キーを渡す。', '答えの長さの上限を決める。'],
    3, '正答は「使う API のバージョンを指定する。必須で、SDK を使うと自動で付く」です。モデルは本文の model、キーは x-api-key（または Authorization）、長さは max_tokens で指定します。', [3]),
  Q('Python で、環境変数のキーを使ってクライアントを作る書き方として、正しいものはどれですか。',
    'anthropic.Anthropic() と書くだけで、SDK が環境変数 ANTHROPIC_API_KEY を自動で読む。',
    ['キーの文字列を、必ずコードの引数に書かなければならない。', 'キーは、リクエストの本文の messages に入れる。', '環境変数は使えず、設定ファイルにしか書けない。'],
    0, '正答は「anthropic.Anthropic() と書くだけで、SDK が環境変数を自動で読む」です。キーをコードに書かずに済みます。', [3]),
  Q('レスポンスから、答えの文章を取り出す方法として、適切なものはどれですか。',
    'content はブロックの一覧なので、type が text のブロックの text を取り出す。',
    ['content は文字列なので、そのまま表示する。', 'usage の中に、答えの文章が入っている。', 'stop_reason の値が、答えの文章である。'],
    1, '正答は「content はブロックの一覧なので、type が text のブロックの text を取り出す」です。usage は使ったトークン数、stop_reason は止まった理由です。', [3])
]});

CN.glossary([
  { t: 'curl', en: 'curl', alias: 'カール', d: 'ターミナルから、Web の宛先に要求を送るコマンドです。API の動作を、プログラムを書かずに確かめるのに使えます。', ch: [3] },
  { t: 'SDK', en: 'software development kit', alias: 'ライブラリ・anthropic パッケージ', d: '開発用の部品集です。Claude API では、認証のヘッダーやバージョンを自動で付け、再試行も受け持つ公式の SDK が、複数の言語で出ています。', ch: [3] },
  { t: 'anthropic-version ヘッダー', en: 'anthropic-version header', alias: 'API バージョン', d: '使う API のバージョンを指定する、必須のヘッダーです。公式は、できるだけ最新を使うよう勧めています。', ch: [3] },
  { t: 'コンテンツブロック', en: 'content block', alias: 'ブロック・content', d: '答えやメッセージの中身を構成する部品です。文章は type が text のブロックで、ツールの呼び出しなどは別の種類のブロックです。', ch: [3] },
  { t: 'stop_reason', en: 'stop_reason', alias: '停止の理由', d: 'モデルが答えを止めた理由です。自然に終わった end_turn や、長さの上限に達した max_tokens などがあります。', ch: [3] }
]);

CN.exam([
  E(1, '最初の 1 回の呼び出しで、答えが途中で切れて返ってきました。まず確かめることとして、適切なものはどれですか。',
    'stop_reason が max_tokens かどうかと、max_tokens の値が小さすぎないか。',
    ['API キーの有効期限が切れていないか。', 'anthropic-version ヘッダーの値が、古くないか。', '環境変数の名前を、書き間違えていないか。'],
    1, '正答は「stop_reason が max_tokens かどうかと、max_tokens の値が小さすぎないか」です。長さの上限で切れたときは、stop_reason が max_tokens になります。キーの問題は 401 などのエラーになり、答えは返りません。', [3])
]);
