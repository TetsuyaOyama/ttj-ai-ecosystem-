/* 第04章のデータ。事実の出どころ：facts/04-messages.md（確認 2026-11-18）。実験台の文字数は架空の仮定 */
function Q(q, ok, bad, a, why, ch) { var c = bad.slice(); c.splice(a, 0, ok); return { q: q, c: c, a: a, why: why, ch: ch || [] }; }
function E(part, q, ok, bad, a, why, ch) { var o = Q(q, ok, bad, a, why, ch); o.part = part; return o; }

CN.add('table', 'c04-roles', {
  title: '会話の部品：system・user・assistant・ブロック',
  caption: '行を押すと補足が出ます（出典：Messages API reference、Working with Messages。「使い方」の列はこの講座の整理）',
  cols: ['部品', '置き場所', '何を書くか', '使い方'],
  rows: [
    ['system', '本文のトップレベル（messages の外）', '役割・守ってほしい決まり・文脈', '最初から効かせる指示は、ここに置く'],
    ['user', 'messages の中', '利用者の発言、渡す資料、質問', '最後は、たいてい user の発言'],
    ['assistant', 'messages の中', 'モデルの過去の答え', '会話の続きでは、過去の答えを入れる'],
    ['ブロック（content の中）', 'user や assistant の content', 'text・image・document・tool_use・tool_result など', '文章だけなら、ただの文字列でも書ける']
  ],
  detail: [
    '公式の API リファレンスは、system を「文脈や指示を与える方法。たとえば、特定の目標や役割を指定する」と説明しています。1 文でも効果があります（出典：Prompting best practices）。',
    'user と assistant は交互に並べます。同じ役の発言が続くと、1 つの発言にまとめられます（API リファレンス）。会話の最後に user の発言を置くと、モデルは、その発言への答えを作ります。',
    'assistant の発言は、本物の過去の答えでなくてもかまいません。公式ドキュメントは、「前の発言が Claude から来たものである必要はない。人が作った assistant の発言も使える」と書いています。',
    'content は、文字列でも、ブロックの一覧でも書けます。画像と文章を一緒に送るときや、ツールの結果を返すときは、ブロックの一覧にします。'
  ],
  note: '第 03 章の例の messages は、user の発言が 1 つだけの、最小の形です。'
});

(function () {
  var NAMES = ['最小の呼び出し', 'system を付ける', '会話の続き（3 回目）', 'ツールを付ける', '構造化した出力', 'ストリーミング'];
  CN.add('lab', 'c04-build', {
    title: 'リクエストの組み立て：部品を選ぶと、JSON の形が変わる',
    disclaimer: '学習用の模型です。文字数は架空の仮定で、実際の費用はトークン数で決まります（第 05 章）。モデル名は例です。ツールの中身などは省略しています。',
    experiments: [
      { id: 'build', label: '部品を選ぶ',
        intro: 'ボタンを押すか、つまみを動かして、リクエストに部品を足します。右に、リクエストの本文のキーと値が出ます。**model・max_tokens・messages は、必ず含まれる**必須の部品です。',
        presetLabel: '部品の組み合わせを選ぶ（押すと、つまみがまとめて動きます）', presetHint: '自分でつまみを動かした組み合わせです。',
        presets: [
          { label: NAMES[0], set: { turns: 1, sys: 0, tools: 0, fmt: 0, stream: 0 }, text: '必須の 3 つだけの、いちばん小さい呼び出しです（第 03 章の形）。' },
          { label: NAMES[1], set: { turns: 1, sys: 1, tools: 0, fmt: 0, stream: 0 }, text: 'system を足すと、トップレベルのキーが 1 つ増えます。messages の中身は変わりません。' },
          { label: NAMES[2], set: { turns: 3, sys: 1, tools: 0, fmt: 0, stream: 0 }, text: '3 回目の質問です。messages には、これまでの 2 往復と、新しい質問が入ります。' },
          { label: NAMES[3], set: { turns: 3, sys: 1, tools: 1, fmt: 0, stream: 0 }, text: 'tools を足すと、モデルがツールを呼ぶ依頼を返せるようになります（第 09 章）。' },
          { label: NAMES[4], set: { turns: 1, sys: 1, tools: 0, fmt: 1, stream: 0 }, text: 'output_config を足すと、答えを JSON の形にそろえるよう求められます（第 08 章）。' },
          { label: NAMES[5], set: { turns: 3, sys: 1, tools: 0, fmt: 0, stream: 1 }, text: 'stream を true にすると、答えが少しずつ届きます（第 07 章）。' }
        ],
        inputs: [
          { id: 'turns', label: '何回目の質問か（会話の長さ）', unit: '回目', min: 1, max: 5, step: 1, value: 3, say: [{ when: 'turns == 1', text: '1 回目：履歴はまだありません。' }, { when: 'turns > 1', text: '履歴を、すべて送ります。' }] },
          { id: 'cpm', label: '1 つの発言の文字数（架空の仮定）', unit: '字', min: 50, max: 2000, step: 50, value: 400 },
          { id: 'sys', label: 'system を付ける（0 = なし、1 = あり）', unit: '', min: 0, max: 1, step: 1, value: 1 },
          { id: 'tools', label: 'tools を付ける（0 = なし、1 = あり）', unit: '', min: 0, max: 1, step: 1, value: 0 },
          { id: 'fmt', label: '構造化した出力を求める（0 = なし、1 = あり）', unit: '', min: 0, max: 1, step: 1, value: 0 },
          { id: 'stream', label: 'ストリーミング（0 = なし、1 = あり）', unit: '', min: 0, max: 1, step: 1, value: 0 }
        ],
        calc: [{ id: 'n', expr: '2 * turns - 1' }],
        results: [
          { label: '"model"（必須）', expr: '0', words: ['"claude-sonnet-5-5"（例）', '（含まれません）'], big: true },
          { label: '"max_tokens"（必須）', expr: '0', words: ['1000（例）', '（含まれません）'] },
          { label: '"messages"（必須）の要素数', expr: 'n', unit: '個', digits: 0 },
          { label: '"system"（任意・messages の外）', expr: '0', words: ['"あなたは、…"', '（含まれません）'], show: 'sys == 1' },
          { label: '"tools"（任意）', expr: '0', words: ['[ { "name": …, "description": …, "input_schema": … } ]', '（含まれません）'], show: 'tools == 1' },
          { label: '"output_config"（任意）', expr: '0', words: ['{ "format": { "type": "json_schema", "schema": … } }', '（含まれません）'], show: 'fmt == 1' },
          { label: '"stream"（任意）', expr: '0', words: ['true', '（含まれません）'], show: 'stream == 1' },
          { label: '本文のトップレベルのキーの数', expr: '3 + sys + tools + fmt + stream', unit: '個', digits: 0 },
          { label: 'この回に送る会話の文字数（架空の仮定）', expr: 'n * cpm', unit: '字', digits: 0 }
        ],
        reads: [
          { when: 'turns == 1', text: '1 回目は、user の発言が 1 つだけです。履歴はありません。' },
          { when: 'turns > 1', text: '2 回目以降は、これまでの発言（user と assistant）をすべて messages に入れて送ります。API は会話を覚えていないからです。' },
          { when: 'sys == 1', text: 'system は、messages の中ではなく、本文のトップレベルのキーとして書きます。' },
          { when: 'tools == 1', text: 'tools を付けると、モデルは、答えの代わりに、ツールを呼ぶ依頼（tool_use）を返すことがあります。' },
          { when: 'fmt == 1', text: 'output_config に JSON Schema を書くと、答えを、その形の JSON にそろえるよう求められます。' },
          { when: 'stream == 1', text: 'stream を true にすると、答えは、1 つの JSON ではなく、イベントの列として届きます。受け取るコードも変わります。' },
          { text: '値は、形を見るための例です。必須の 3 つのキーは、どの組み合わせでも残ります。' }
        ],
        fig: { type: 'bar', max: 18000,
          bars: [
            { label: '1 回目', expr: '1 * cpm', unit: '字', digits: 0 },
            { label: '2 回目', expr: '3 * cpm', unit: '字', digits: 0 },
            { label: '3 回目', expr: '5 * cpm', unit: '字', digits: 0 },
            { label: '4 回目', expr: '7 * cpm', unit: '字', digits: 0 },
            { label: '5 回目', expr: '9 * cpm', unit: '字', digits: 0 }
          ],
          alt: '1 回目から 5 回目の呼び出しで、送る会話の文字数の目安を示す棒グラフ。回を重ねるごとに、履歴を含めて送るので、文字数が増える。', caption: '1 回目から 5 回目の呼び出しで送る会話の文字数（架空の仮定。1 つの発言の文字数 × 要素の数）。履歴を毎回送るので、回を重ねるほど増えます。' }
      }
    ]
  });
})();

CN.add('quiz', 'c04-quiz', { items: [
  Q('「API は会話を覚えていない」とは、実際の使い方では、どういうことですか。',
    '続きを話すときは、これまでの user と assistant の発言を、毎回 messages に入れて送る。',
    ['新しい発言だけを送れば、API が前の会話を補ってくれる。', '会話は、API の側で、自動的に保存される。', '1 回の呼び出しでは、user の発言を 1 つしか送れない。'],
    0, '正答は「続きを話すときは、これまでの発言を、毎回 messages に入れて送る」です。API はステートレスで、前の呼び出しの内容を持ちません。', [4]),
  Q('会話の最初から効かせる system プロンプトの置き場所として、正しいものはどれですか。',
    '本文のトップレベルの system に書く。',
    ['messages の先頭に、role を system として入れる。', 'user の発言の末尾に、1 行で足す。', 'リクエストのヘッダーに書く。'],
    1, '正答は「本文のトップレベルの system に書く」です。messages には、user と assistant の発言を交互に並べます。会話の途中で指示を足す system の発言を messages に置く方法もありますが、先頭には置けず、最初からの指示はトップレベルに書きます。', [4]),
  Q('会話が長くなると、1 回の呼び出しで、どうなりますか。',
    '履歴を含めて毎回送るので、送る入力が増え、費用も増える。',
    ['履歴は API が圧縮するので、送る量は変わらない。', '送る量は変わらず、出力だけが増える。', '履歴が長くなっても、費用は 1 回目と同じである。'],
    2, '正答は「履歴を含めて毎回送るので、送る入力が増え、費用も増える」です。費用の計算は第 05 章で学びます。', [4, 5])
]});

CN.glossary([
  { t: 'system プロンプト', en: 'system prompt', alias: 'システムプロンプト・system', d: '役割や守ってほしい決まりを書く、本文のトップレベルの項目です。最初からの指示は、messages の中ではなく、ここに書きます。', ch: [4] },
  { t: 'ロール', en: 'role', alias: '役割・user・assistant', d: 'メッセージの発言者を表す項目です。user は利用者の側、assistant はモデルの側の発言です。', ch: [4] },
  { t: 'ステートレス', en: 'stateless', alias: '状態を持たない', d: '前のやり取りを覚えていない性質です。Messages API はステートレスで、会話の続きは、履歴を毎回送って作ります。', ch: [4] },
  { t: '会話の履歴', en: 'conversation history', alias: '履歴・messages の一覧', d: 'これまでの user と assistant の発言の一覧です。自分のプログラムが持ち、毎回送ります。', ch: [4] },
  { t: 'プレフィル', en: 'prefill', alias: '書き出しの指定', d: '最後の assistant の発言に書き出しを入れ、続きを書かせる方法です。Claude 4.6 以降のモデルでは使えず、400 エラーになります。', ch: [4] }
]);

CN.exam([
  E(2, '同じ会話の 5 回目の質問を送るとき、messages の要素の数は、どうなりますか。',
    '4 回目までの user と assistant の発言がすべて入るので、1 回目より多くなる。',
    ['1 回目と同じで、user の発言が 1 つだけである。', '直前の 1 往復だけが入り、それ以前は API が覚えている。', 'API が要約して返すので、要素の数は変わらない。'],
    2, '正答は「4 回目までの user と assistant の発言がすべて入るので、1 回目より多くなる」です。5 回目の質問を送るときは、これまでの 4 往復と、新しい質問が入ります。API は、前の呼び出しを覚えていません。', [4])
]);
