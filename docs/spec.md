# TTJ AIエコシステム 設計書（v1）

ユーザー：てっち（TTJ / GitHub: ttj-tokyo）。Windows + WSL2(Ubuntu) で Claude Code（ターミナル版）を使う。
契約済み外部AI：OpenAI（Codex CLI / API）、xAI（Grok API）。Discord は未所持（クロBotはコードだけ用意し、使うときにBotを作る）。
公開先：GitHub Pages（ttj.tokyo 現行）＋ Cloudflare Pages を追加。
全ファイル・全コメント・README は日本語。コードの識別子は英語。

## 1. リポジトリ構成（このリポジトリ = ttj-ai-ecosystem）

```
ttj-ai-ecosystem/
  README.md                     # 全体像と導入手順（WSL前提）
  install.sh                    # claude/ 以下を ~/.claude/ にコピー（既存はバックアップ）
  docs/spec.md                  # この設計書
  docs/ecosystem-map.md         # 元画像の11列を自分の構成に対応づけた表
  claude/                       # → ~/.claude/ に置くもの
    CLAUDE.md                   # 全プロジェクト共通ルール
    settings.json               # 権限ルール＋フック
    hooks/*.py                  # フック（python3、標準ライブラリのみ）
    agents/*.md                 # サブエージェント（モデル別）
    skills/<name>/SKILL.md      # スキル
    skills/.env.example         # APIキーはここ1か所（実体 .env は git 管理外）
    memory/MEMORY.md            # 記憶メモの雛形（決まりごとを書き足していく）
  design-system/
    tokens.css                  # 紺×金 TTJ デザイントークン
    components.html             # 見本ページ（ボタン・カード・見出し・表・コード）
    README.md
  templates/project-CLAUDE.md   # 各リポジトリ（ttj.tokyo 等）に置く CLAUDE.md の雛形
  bots/
    grok-bot/                   # 定期実行：X投稿下書き＋AIニュース要約（xAI API）
    kuro-discord-bot/           # クロ：/ask /summary /memo（Claude API, discord.py）
  deploy/
    cloudflare/README.md        # Cloudflare Pages 導入手順（独自ドメイン含む）
    github-actions/deploy-cloudflare-pages.yml  # 各サイトリポジトリにコピーして使う
  .gitignore                    # .env, __pycache__, logs, *.db など
```

## 2. モデル振り分け（CLAUDE.md とエージェントの核）

| 区分 | モデル | 担当 |
|---|---|---|
| 軽い | haiku | ファイル確認・検索・差分/書式/JSONチェック |
| 方針決定済み | sonnet | 決まった編集・置換・実装・ライティング |
| 判断がいる | opus | 文章/プロンプトの練り直し・レビュー |
| 特に重要 | fable | 全体設計・方針決め・複雑な変更・最終確認 |

制約：最初から重いモデルを使わない／探す・見比べるだけを上位に回さない／決まりきった大量編集を上位でやらない／散らかった大量ファイルは先に haiku で整理。メインモデルの切り替えは人が行うので、切り替えが必要なときはタイミングと切り替え先を伝える。

エージェント（claude/agents/）：
- `scout.md`（model: haiku）検索・ファイル確認・一覧化。編集しない（tools: Read, Grep, Glob, Bash 読み取り系）
- `checker.md`（model: haiku）JSON/YAML/HTML/構文/差分チェック。編集しない
- `builder.md`（model: sonnet）方針が決まった実装・編集・ライティング
- `reviewer.md`（model: opus）成果物レビュー。作業していない目で見る。編集しない
- `architect.md`（model: opus。frontmatter に「Fable が使える環境なら fable に変更」とコメント）設計・方針

## 3. フック（claude/hooks/、python3 標準ライブラリのみ、stdin で JSON を受ける）

ブロックは exit code 2 ＋ stderr に日本語の理由。ログは ~/.claude/logs/ に追記。

| イベント | matcher | スクリプト | 内容 |
|---|---|---|---|
| UserPromptSubmit | - | prompt_reminder.py | stdout に1〜2行：「モデル振り分け表に従う。軽作業は scout/checker へ」 |
| PreToolUse | Bash | bash_guard.py | 禁止：`rm -rf /`・`rm -rf ~`・`git push --force`/`-f`（--force-with-lease も禁止）・`sudo`・`.env` を cat/less/head/tail/grep 等で読む・`curl ... | sh` |
| PreToolUse | Read | secret_guard.py | `.env`（.env.example は可）・`*.pem`・`id_rsa` 系の読み取りをブロック |
| PostToolUse | Write\|Edit\|MultiEdit | change_log.py | 変更ファイルパスを ~/.claude/logs/changes-YYYY-MM-DD.md に時刻付きで追記 |
| SessionStart | - | session_start.py | ~/.claude/memory/MEMORY.md の先頭40行を stdout へ（文脈に入る） |
| PreCompact | - | pre_compact.py | 時刻と session_id を logs/compact.log に追記 |
| Stop | - | stop_notify.py | WSL なら powershell.exe でビープ＋トースト風メッセージ（失敗しても exit 0） |
| SessionEnd | - | session_end.py | 開始/終了時刻を logs/sessions.log に追記 |

stdin JSON の主なキー：`tool_name`, `tool_input`（Bash は `command`、Read は `file_path`、Write/Edit は `file_path`）, `session_id`, `hook_event_name`, `transcript_path`。どのフックも想定外の入力で落ちないこと（例外時は exit 0）。

settings.json の hooks 形式：
```json
"hooks": { "PreToolUse": [ { "matcher": "Bash", "hooks": [ { "type": "command", "command": "python3 ~/.claude/hooks/bash_guard.py" } ] } ] }
```

## 4. 権限ルール（settings.json の permissions）

- defaultMode: "acceptEdits"
- allow：Read, Grep, Glob, `Bash(git status:*)`, `Bash(git diff:*)`, `Bash(git log:*)`, `Bash(ls:*)`, `Bash(python3:*)`, `Bash(node:*)`, `Bash(npx wrangler pages deploy:*)`, `Bash(codex exec:*)`
- ask：`Bash(git push:*)`, `Bash(git reset --hard:*)`, `Bash(rm:*)`, `Bash(npx wrangler:*)`, `Bash(gh:*)`
- deny：`Bash(sudo:*)`, `Bash(git push --force:*)`, `Bash(git push -f:*)`, `Read(**/.env)`, `Read(~/.claude/skills/.env)`, `Read(**/*.pem)`
- env：なし（キーは skills/.env に置き、スクリプトが自分で読む）

## 5. スキル（claude/skills/）

各 SKILL.md は frontmatter `name` / `description`（いつ使うかを1文で）＋本文（手順・決まり・チェックリスト）。

1. `ttj-design` — 紺×金デザインで HTML を作る。design-system/tokens.css の変数を使う。チェックリスト付き
2. `memoir-editing` — 四次元手記の編集ルール：琥珀色(#FFBF00系)=AIの創作追加、生成り色=事実。実名は必ず伏せる。「99%事実、残りは軽いAI味付け」。フッターの真正性表記を保つ。章構成（プロローグ＋15章＋エピローグ）を崩さない
3. `telecom-svg` — 通信のSVG図（VoLTE通話フロー、S8HRローミング、SMS over SGs/NAS/IP、3G/4G/5G比較）。シーケンス図の描き方規約、ラベルは3GPP用語、凡例必須、TTJ配色
4. `edu-html` — 教育用インタラクティブHTML（SDV通信道場型）：章ナビ、クイズ、用語集、1ファイル完結
5. `codex-review` — 大きな成果物（LP・サイト改修・長文）を公開前に Codex に見せる：`codex exec --sandbox read-only "<レビュー依頼>"`。指摘を一覧化→直すものを判断→修正→再確認。Codex が無ければ reviewer エージェントで代替
6. `publish` — 公開：GitHub Pages（push）か Cloudflare Pages（`npx wrangler pages deploy <dir> --project-name <name>`）。公開前に checker → codex-review の順
7. `grok-x-draft` — Grok Bot の出力（bots/grok-bot/drafts/）を読み、X 投稿を清書する。投稿は人が行う

skills/.env.example のキー：`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `XAI_API_KEY`, `XAI_MODEL`, `DISCORD_BOT_TOKEN`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

## 6. Bot

### grok-bot（定期実行）
- Python 3.10+、標準ライブラリのみ（urllib）。xAI API は OpenAI 互換：POST `https://api.x.ai/v1/chat/completions`、`Authorization: Bearer $XAI_API_KEY`、model は env `XAI_MODEL`（必須、例はREADMEに「xAIのドキュメントで最新モデル名を確認」）
- `run.py --task news|xpost`：news=AI・通信（eSIM/コネクテッドカー）・相場のニュース要点、xpost=X投稿下書き3案。出力は `drafts/YYYY-MM-DD-<task>.md`
- `.env` は ~/.claude/skills/.env を既定で読む（`--env` で変更可）
- 定期実行：WSL の cron 例と Windows タスクスケジューラ例（`wsl.exe -e python3 ...`）を README に
- 投稿はしない（下書きまで）

### kuro-discord-bot（クロ）
- Python、discord.py ≥2.3、anthropic SDK。requirements.txt
- スラッシュコマンド：`/ask 質問`（Claude に質問）、`/summary 件数`（チャンネル直近N件を要約）、`/memo 内容`（SQLite に保存）、`/memos`（一覧）
- 許可チャンネルID・許可ロールを env で制限（権限フィルタ）。モデルは env `CLAUDE_MODEL`（既定 `claude-sonnet-5-5`）
- README：Discord Developer Portal でのBot作成手順、招待URL、WSLでの常駐（systemd --user か tmux）

## 7. Cloudflare Pages
- deploy/github-actions/deploy-cloudflare-pages.yml：push(main) で `cloudflare/wrangler-action@v3`、`command: pages deploy . --project-name=${{ vars.CF_PAGES_PROJECT }}`、secrets: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
- README：プロジェクト作成、APIトークンの権限（Cloudflare Pages: Edit）、独自ドメイン追加、GitHub Pages との併用方針（当面は両方、DNS切り替えは任意）
