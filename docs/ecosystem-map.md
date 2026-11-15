# 元画像（KEITOのAIエコシステム）との対応表

元画像の11列の流れを、TTJ の構成に置き換えたものです。

| 列 | 元画像 | TTJ での実装 | 置き場所 |
|---|---|---|---|
| ① 人 | KEITO | TTJ（運営者） | — |
| ② 入口 | スマホアプリ・ターミナル・Discord・定期タスク | Claudeアプリ（スマホ/Web）、WSLのターミナル、クロ（Discord・任意）、claude.ai の定期タスク | bots/kuro-discord-bot/ |
| ③ 司令塔 | Claude Code | Claude Code（WSL） | ~/.claude/ |
| ④ ハーネス | 判断AI・フック11本・権限ルール・APIキー隔離・CLAUDE.md・品質の関所 | フック8本・権限ルール・APIキーは skills/.env の1か所・CLAUDE.md＋記憶メモ・公開前チェック | claude/settings.json, claude/hooks/, claude/CLAUDE.md |
| ⑤ 振り分け | ほかのAIに頼む／スキルで作る／外部サービス操作／外部API | Codexに頼む／スキルで作る／外部サービス（GitHub・Cloudflare）／外部API（xAI・OpenAI・Claude） | claude/skills/ |
| ⑥ 分野 | 動画・画像・スライド・Web・ブログ… | Web/LP、教育HTML、手記、通信SVG図、X投稿 | claude/skills/ |
| ⑦ スキル | 147本 | 7本から開始（ttj-design, memoir-editing, telecom-svg, edu-html, codex-review, publish, grok-x-draft） | claude/skills/ |
| ⑧ 担当・チェック | サブエージェント150 | 5体：scout(haiku)・checker(haiku)・builder(sonnet)・reviewer(opus)・architect(opus/fable) | claude/agents/ |
| ⑨ 道具・API | Codex CLI・agy CLI・各種API | Codex CLI、xAI API、Claude API、wrangler | — |
| ⑩ 出口 | MP4・画像・PPTX・ページ… | HTML・SVG・Markdown・X下書き | — |
| ⑪ 公開 | Vercel・Cloudflare独自ドメイン | GitHub Pages（ttj.tokyo）＋ Cloudflare Pages | deploy/ |
| 下段 | ナレッジ（記憶メモ・Obsidian・Drive・デザインシステム・GitHub） | 記憶メモ・TTJデザインシステム・GitHub | claude/memory/, design-system/ |
| 下段 | Grok Bot | Grok Bot（下書き専用・定期実行） | bots/grok-bot/ |
| 下段 | クロ（Discord Bot） | クロ（コードのみ。Discord作成後に稼働） | bots/kuro-discord-bot/ |

## 今回入れなかったもの
- Antigravity（Gemini）レビュー：Google の契約が無いため。Codex と reviewer エージェントで代替
- 判断AI（TypeSafe Jev・OpenAI Decisions API）：独自の仕組みなので、まずはフックの正規表現判定で代替
- Obsidian・Vercel：今は使っていないため
- 動画・音声生成API：今の制作物（HTML・図・文章）に不要なため
