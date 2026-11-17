/* 第08章のデータ。事実の出どころ：facts/08-prompts-structured.md（確認 2026-11-18）。例文は架空 */
function Q(q, ok, bad, a, why, ch) { var c = bad.slice(); c.splice(a, 0, ok); return { q: q, c: c, a: a, why: why, ch: ch || [] }; }
function E(part, q, ok, bad, a, why, ch) { var o = Q(q, ok, bad, a, why, ch); o.part = part; return o; }

CN.add('compare', 'c08-prompt', {
  title: 'あいまいな依頼と、整えた依頼（架空の例）',
  caption: '例は、この講座が作った架空の依頼です。ただし「省略記号」の行は、公式の Prompting best practices の例を言い直したものです。原則は、公式のガイドに沿っています',
  colA: 'あいまいな依頼', colB: '整えた依頼', colNote: '整えた点',
  cats: [{ key: 'clear', label: '明確さ' }, { key: 'ctx', label: '文脈と理由' }, { key: 'ex', label: '例と形' }],
  rows: [
    { cat: 'clear', a: '次の問い合わせに返信して。', b: '次の問い合わせに、3 段落以内で返信の下書きを書く。1 段落目はおわび、2 段落目は回答、3 段落目は連絡先。', note: '手順と長さを、はっきり書く。' },
    { cat: 'clear', a: '要約して。', b: '次の議事録を、決定事項と、宿題（担当者つき）に分けて、箇条書きにする。', note: '何を、どの形で出すかを書く。' },
    { cat: 'ctx', a: '丁寧に書いて。', b: '読み手は、初めて問い合わせた顧客です。専門用語を避け、です・ます調で書く。', note: '読み手と、理由を伝える。' },
    { cat: 'ctx', a: '省略記号を使わないで。', b: '文章は音声で読み上げるので、省略記号は使わない（読み上げ機能が発音できないため）。', note: '理由を添えると、意図が一般化される。' },
    { cat: 'ex', a: '分類して。', b: '分類の例を 3〜5 個、<example> タグで示し、答えは「カテゴリ名だけ」とする。', note: '例で、形を伝える。' },
    { cat: 'ex', a: '（資料と質問が混ざっている）', b: '資料は <document> で囲み、指示は <instructions> に、質問は最後に置く。', note: '部品を、タグで区切る。' }
  ],
  note: '整えた依頼は、長くなります。長さより、読んだ人が迷わないかを見ます。'
});

CN.add('layers', 'c08-layers', {
  title: 'プロンプトの層：上から、役割・資料・指示・例・質問',
  width: 520, initial: 'sys',
  labels: { 'layers.f.material': '書き方の例', 'layers.f.dims': '置き場所', 'layers.f.role': '役目', 'layers.f.note': '補足' },
  hint: '部品を押すと、書き方の例が出ます',
  layers: [
    { id: 'l1', name: '役割', h: 54, kind: 'ims', desc: 'system に、役割と、守る決まりを書きます。1 文でも効果があります。', material: '「あなたは、お客様への返信の下書きを書く、丁寧な担当者です。」', dims: '本文のトップレベルの system', role: '振る舞いと口調を、そろえる', note: '毎回同じ指示は、ここにまとめる', id2: 'sys' },
    { id: 'l2', name: '長い資料', h: 54, kind: 'db', desc: '長い資料は、プロンプトの上のほうに置きます。複数あれば、番号つきの document で囲みます。', material: '<documents><document index="1">…</document></documents>', dims: 'user の発言の先頭側', role: '根拠になる材料を渡す', note: '目安で 2 万トークン以上のときに、特に効果がある' },
    { id: 'l3', name: '指示', h: 54, kind: 'ue', desc: '何を、どの順で、どの形で出すかを、明確に書きます。理由も添えます。', material: '<instructions>1. 根拠を引用する 2. 3 段落で答える</instructions>', dims: '資料のあと', role: '仕事の中身と、出力の形を決める', note: '「してほしいこと」を書く' },
    { id: 'l4', name: '例', h: 54, kind: 'ran', desc: '望む答えの例を、3〜5 個示します。関連があり、多様で、構造がそろっている例にします。', material: '<examples><example>…</example></examples>', dims: '指示のあと', role: '形と調子を、見せて伝える', note: '例が偏ると、答えも偏る' },
    { id: 'l5', name: '質問・入力', h: 54, kind: 'pol', desc: '今回の質問や、処理したい入力を、最後に置きます。', material: '<question>…</question>', dims: 'プロンプトの最後', role: '今回の仕事を示す', note: '最後に置くと、質が上がる場合がある（公式）' }
  ]
});

CN.add('table', 'c08-struct', {
  title: 'JSON の答えを得る 3 つの方法と、注意点（出典：Structured outputs、Tool use）',
  caption: '行を押すと補足が出ます。「向く場面」の列は、この講座の整理です',
  cols: ['方法', '形の保証', '書き方', '向く場面'],
  rows: [
    ['プロンプトで頼む', 'なし', '「JSON で答える」と書く', '試作・形が崩れても困らないとき'],
    ['構造化した出力', 'schema に合わせる', 'output_config.format に json_schema', '答えを、そのままプログラムで使いたいとき'],
    ['ツールの定義（strict）', '呼び出しの入力を、schema に合わせる', 'tools の各定義に strict: true（input_schema と並べて書く）', 'ツールとして、決まった形の入力を受けたいとき']
  ],
  detail: [
    '形が崩れたときに備え、読む側のコードで検査します。',
    '公式の記載：schema は、標準の JSON Schema の一部に対応します。オブジェクトでは additionalProperties を false にし、列挙した項目だけが返ります。文字列の enum の大文字小文字は、保証されません。',
    '公式の記載：厳密なツールの数など、複雑さの上限があります。上限の数字は、公式の Structured outputs と Strict tool use のページで確かめます。'
  ],
  note: '構造化した出力は、refusal のとき（HTTP 200・stop_reason が refusal）と、max_tokens で切れたときは、schema に合わないことがあります。引用（citations）との併用は 400 になります。'
});

CN.add('quiz', 'c08-quiz', { items: [
  Q('長い資料（数万トークン）と質問を 1 つのプロンプトに入れるとき、公式が勧める置き方はどれですか。',
    '資料をプロンプトの上のほうに置き、指示と質問を最後に置く。',
    ['質問を先頭に置き、資料を最後に置く。', '資料と質問を、区切らず 1 つの文章に混ぜる。', '資料は、system にだけ置き、messages には何も入れない。'],
    0, '正答は「資料を上のほうに置き、指示と質問を最後に置く」です。公式は、質問を最後に置くと、質が最大で 30% 上がる場合があると書いています。', [8]),
  Q('構造化した出力を使って得た JSON について、正しい理解はどれですか。',
    '形は schema に合わせて返るが、中身の正しさは保証されないので、確認や検算が要る。',
    ['中身の正しさも保証されるので、確認は要らない。', 'stop_reason を見なくても、必ず schema に合っている。', 'どのモデルでも、形が崩れる。'],
    1, '正答は「形は schema に合わせて返るが、中身の正しさは保証されない」です。refusal や max_tokens のときは、形が合わないこともあります。', [8]),
  Q('Claude に、望む答えの形を伝える方法として、公式が勧めるものはどれですか。',
    '「してほしいこと」を書き、3〜5 個の例をタグで区切って示す。',
    ['「してはいけないこと」だけを、たくさん並べる。', '例は 1 つも示さず、短い 1 文だけにする。', '最後の assistant の発言に、書き出しを入れる。'],
    2, '正答は「「してほしいこと」を書き、3〜5 個の例をタグで区切って示す」です。書き出しの指定（プレフィル）は、4.6 以降のモデルで使えません。', [8, 4])
]});

CN.glossary([
  { t: 'プロンプト', en: 'prompt', alias: '指示・入力', d: 'モデルに渡す、指示と材料の全体です。system、資料、指示、例、質問などを含みます。', ch: [8] },
  { t: 'XML タグ', en: 'XML tags', alias: 'タグで区切る', d: '<instructions> のようなタグで、プロンプトの部品を囲んで区別する書き方です。取り違えを減らします。', ch: [8] },
  { t: '複数の例（マルチショット）', en: 'multishot examples', alias: 'few-shot・例示', d: '望む答えの例を、いくつか示す方法です。公式は、3〜5 個を勧めています。', ch: [8] },
  { t: '構造化した出力', en: 'structured outputs', alias: 'JSON 出力', d: 'JSON Schema を渡して、答えをその形にそろえる機能です。リクエストの output_config.format に書きます。', ch: [8] },
  { t: 'JSON Schema', en: 'JSON Schema', alias: 'スキーマ', d: 'JSON の形（項目の名前・型・必須）を決める書き方です。', ch: [8] }
]);

CN.exam([
  E(3, '答えをプログラムで読み取りたいとき、形をそろえる方法として、適切なものはどれですか。',
    'JSON Schema を渡す構造化した出力を使い、stop_reason も確かめ、中身は別に検査する。',
    ['「JSON で答えて」と頼むだけで、検査は不要とする。', '最後の assistant の発言に、書き出しを入れる。', 'temperature を 0 にして、形を固定する。'],
    2, '正答は「JSON Schema を渡す構造化した出力を使い、stop_reason も確かめ、中身は別に検査する」です。プレフィルと temperature は、新しいモデルで使えません。', [8])
]);
