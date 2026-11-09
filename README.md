# TTJ AIエコシステム

元画像の AI エコシステムを TTJ 向けに置き換えた Claude Code 環境です。
モデル振り分け・フック・権限ルール・スキル・サブエージェントを `~/.claude/` に一括導入します。
全ファイル日本語、WSL2(Ubuntu) 上の Claude Code で使う前提です。

## 1. 全体図

元画像の11列との対応は [docs/ecosystem-map.md](docs/ecosystem-map.md)、設計の詳細は [docs/spec.md](docs/spec.md) を参照してください。

```
てっち
  ↓ 入口：ターミナル(WSL) / Claudeアプリ / クロ(Discord・任意) / 定期タスク
Claude Code（司令塔 = ~/.claude/）
  ↓ ハーネス：CLAUDE.md・権限ルール・フック8本・記憶メモ・APIキー1か所
振り分け：Codex に頼む / スキル7本 / サブエージェント5体 / 外部API(xAI・OpenAI・Claude)
  ↓
成果物：HTML・SVG・Markdown・X下書き
  ↓ 公開前チェック（checker → codex-review）
公開：GitHub Pages(ttj.tokyo) ＋ Cloudflare Pages
```

## 2. 導入手順（Windows）

1. **WSL2 + Ubuntu を入れる**。管理者権限の PowerShell で `wsl --install -d Ubuntu` を実行し、再起動後に Ubuntu のユーザー名とパスワードを設定する。以降の作業はすべて Ubuntu のターミナル内で行う。
2. **Node.js と Claude Code CLI を入れる**。Node.js は公式手順（nvm など）で導入し、Claude Code は Anthropic の公式手順に従って入れる。`claude --version` で確認する。
3. **リポジトリを取得する**。
   ```bash
   git clone <このリポジトリのURL> ~/ttj-ai-ecosystem
   cd ~/ttj-ai-ecosystem
   ```
4. **インストールする**。
   ```bash
   bash install.sh
   ```
   `claude/` 以下が `~/.claude/` にコピーされます。既存ファイルは `~/.claude/backup-<日時>/` に退避され、`settings.json` は差分を見せて確認します（`-y` で省略可）。記憶メモ `memory/MEMORY.md` と `skills/.env` は既にあれば上書きしません。
5. **APIキーを書く**。`~/.claude/skills/.env` を自分で編集する（Claude はこのファイルを読まない決まり）。キーは `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `XAI_API_KEY` / `XAI_MODEL` / `DISCORD_BOT_TOKEN` / `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`。使うものだけ埋めればよい。
6. **起動して動作確認する**。WSL 内で `claude` を起動し、再起動後にフックと権限が効いていることを確かめる（例：`.env` を読ませようとするとブロックされる）。

Codex CLI は OpenAI の公式手順に従って導入してください。入れなくても `codex-review` スキルは reviewer エージェントで代替できます。

## 3. 中身の一覧

- `claude/` — `~/.claude/` に置くもの（CLAUDE.md、settings.json、hooks、agents、skills、memory）
- `design-system/` — 紺×金の TTJ デザイントークン（tokens.css）と見本ページ
- `templates/` — 各リポジトリに置く `project-CLAUDE.md` の雛形
- `bots/` — Grok Bot（X下書き・ニュース要約、定期実行）とクロ（Discord Bot、任意）
- `deploy/` — Cloudflare Pages の導入手順と GitHub Actions ワークフロー

## 4. モデルの使い分け

| 区分 | モデル | 担当 | エージェント |
|---|---|---|---|
| 軽い | haiku | ファイル確認・検索・差分/書式/JSONチェック | scout / checker |
| 方針決定済み | sonnet | 決まった編集・置換・実装・ライティング | builder |
| 判断がいる | opus | 文章/プロンプトの練り直し・レビュー | reviewer / architect |
| 特に重要 | fable | 全体設計・方針決め・複雑な変更・最終確認 | architect（使える環境なら） |

最初から重いモデルを使わず、軽い側で試して必要なら上げます。メインモデルの切り替えは人が行います。

## 5. 安全の仕組み

権限ルール（`settings.json`）とフック（`hooks/*.py`）で、次のものが止まるか確認になります。

- **拒否**：`sudo`、`git push --force` / `-f`、`.env`・`*.pem` の読み取り
- **フックでブロック**：`rm -rf /`・`rm -rf ~`、`--force-with-lease`、`.env` を cat/grep 等で読む操作、`curl ... | sh`、`id_rsa` 系の読み取り
- **確認が出る**：`git push`、`git reset --hard`、`rm`、`npx wrangler`（deploy 以外）、`gh`

止められたときは Claude に回避させず、**人が自分のターミナルで実行**してください。

## 6. 各リポジトリへの適用

- **CLAUDE.md**：`templates/project-CLAUDE.md` を ttj.tokyo などのリポジトリ直下に `CLAUDE.md` としてコピーし、内容をそのサイト用に書き換える。
- **Cloudflare**：`deploy/github-actions/deploy-cloudflare-pages.yml` をサイトのリポジトリの `.github/workflows/` にコピーし、Secrets（`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`）と Variables（`CF_PAGES_PROJECT`）を登録する。詳細は [deploy/cloudflare/README.md](deploy/cloudflare/README.md)。
- **Bot**：[bots/grok-bot/README.md](bots/grok-bot/README.md)、[bots/kuro-discord-bot/README.md](bots/kuro-discord-bot/README.md) を参照。

## 7. よくある質問

- **フックが動かない**：フックは `python3` が必要です。`python3 --version` で確認し、無ければ `sudo apt install python3`。インストール後に Claude Code を再起動する。
- **Windows ネイティブで動かしていい？**：いけません。PowerShell ではなく、WSL の Ubuntu 内で `claude` を起動してください（フックとパスが WSL 前提）。
- **設定が反映されない**：Claude Code を再起動する。`settings.json` を維持した場合は新しい設定が入っていないので、`bash install.sh` をやり直して上書きを承認する。
- **上書きされた設定を戻したい**：`~/.claude/backup-<日時>/` から戻す。
- **Claude が .env を読めない**：仕様です。キーは自分で編集し、必要な処理はスクリプトが自分で読みます。
- **cron が動かない（Grok Bot）**：WSL では `sudo service cron start` が必要なことがあります。確実に回すなら Windows タスクスケジューラを使う（bots/grok-bot/README.md）。

## ショーケース

公開規格（3GPP・GSMA）と一般知識だけで作ったインタラクティブ作品です。GitHub Pages を有効にすると `/showcase/` で見られます。

| 作品 | 内容 |
|---|---|
| [ポートフォリオ](showcase/index.html) | 作品一覧とプロフィール |
| [eSIM / RSP 解説ツール](showcase/esim-rsp/index.html) | SGP.22・SGP.02・SGP.32 の構成比較とダウンロード手順アニメ |
| [通信フロー可視化](showcase/telecom-flows/index.html) | VoLTE・IMS登録・SMS over SGs/IP・S8HR のシーケンス再生 |
| [AI エコシステム図](showcase/ai-ecosystem/index.html) | このリポジトリの Claude Code 構成をインタラクティブに図解 |
