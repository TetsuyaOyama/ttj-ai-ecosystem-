# TTJ 共通ルール（全プロジェクト共通 / ~/.claude/CLAUDE.md）

ユーザーは TTJ の運営者（GitHub: ttj-tokyo）。Windows + WSL2(Ubuntu) 上の Claude Code で作業する。

## 0. 応答言語

- **応答・コメント・README・コミットメッセージは日本語**で書く。コードの識別子（変数名・関数名・ファイル名）は英語。
- 結論を先に、短く。作業後の報告は「何をしたか／確認結果／残課題」だけ。

## 1. モデル振り分け

| 区分 | モデル | 担当 |
|---|---|---|
| 軽い | haiku | ファイル確認・検索・差分/書式/JSONチェック |
| 方針決定済み | sonnet | 決まった編集・置換・実装・ライティング |
| 判断がいる | opus | 文章/プロンプトの練り直し・レビュー |
| 特に重要 | fable | 全体設計・方針決め・複雑な変更・最終確認 |

### 制約

- 最初から重いモデルを使わない。まず軽い側で試し、必要になったら上げる。
- 探す・見比べるだけの作業を上位モデルに回さない（scout / checker に任せる）。
- 決まりきった大量編集を上位モデルでやらない（builder に任せる）。
- 散らかった大量ファイルは、先に haiku（scout）で整理・一覧化してから本作業に入る。
- **メインモデルの切り替えは人が行う。** 切り替えが必要なときは、「いつ（どの作業の前後で）」「どのモデルへ」を伝えて止まる。勝手に進めない。

## 2. エージェントの使い分け（~/.claude/agents/）

| エージェント | モデル | 使いどころ | 編集 |
|---|---|---|---|
| scout | haiku | 検索・ファイル確認・一覧化 | しない |
| checker | haiku | JSON/YAML/HTML/構文/差分チェック | しない |
| builder | sonnet | 方針が決まった実装・編集・ライティング | する |
| reviewer | opus | 成果物レビュー（作業していない目で見る） | しない |
| architect | opus（Fable が使える環境なら fable） | 設計・方針決め | 設計文書のみ |

基本の流れ：**scout で把握 → architect/人が方針決定 → builder が実装 → checker で機械チェック → reviewer で確認**。

## 3. フックと権限の概要

設定は ~/.claude/settings.json、フックは ~/.claude/hooks/*.py（python3 標準ライブラリのみ）。ブロックされたら理由（日本語）が表示される。回避せず、人に確認する。

- UserPromptSubmit：モデル振り分けのリマインドを注入
- PreToolUse(Bash) `bash_guard.py`：`rm -rf /`・`rm -rf ~`、`git push --force`/`-f`/`--force-with-lease`、`sudo`、`.env` の読み取り（.env.example は可）、`curl ... | sh` を禁止
- PreToolUse(Read) `secret_guard.py`：`.env`・`*.pem`・`id_rsa` 系の読み取りを禁止
- PostToolUse(Write/Edit/MultiEdit) `change_log.py`：変更ファイルを ~/.claude/logs/ に記録
- SessionStart：記憶メモの先頭40行を読み込む ／ PreCompact・SessionEnd：ログ記録 ／ Stop：WSL で通知

権限（permissions）：
- 許可：Read/Grep/Glob、git status/diff/log、ls、python3、node、`npx wrangler pages deploy`、`codex exec`
- 確認：`git push`、`git reset --hard`、`rm`、`npx wrangler`（deploy 以外）、`gh`
- 拒否：`sudo`、`git push --force`/`-f`、`.env`・`*.pem` の Read

## 4. APIキーの扱い

- APIキーは **~/.claude/skills/.env の1か所だけ**に置く（雛形は skills/.env.example。実体は git 管理外）。
- **Claude が .env を直接読まない。** cat/grep/Read で中身を見ない。キーが必要な処理は、スクリプトが自分で .env を読む作りにする。
- キーをコード・ログ・コミット・会話に書かない。キーを聞かれたら「skills/.env に置いてください」と案内する。

## 5. 公開前のチェック順

公開（GitHub Pages への push / Cloudflare Pages への deploy）の前は、必ずこの順：

1. **checker**（JSON/HTML/構文/リンク切れなどの機械チェック）
2. **codex-review**（Codex に見せて指摘を一覧化 → 直すものを判断 → 修正 → 再確認。Codex が無ければ reviewer で代替）
3. 問題なければ publish スキルで公開（push / deploy は人の確認を取る）

## 6. 記憶メモ（~/.claude/memory/MEMORY.md）

- 作業開始時に ~/.claude/memory/MEMORY.md を読む（SessionStart フックで先頭40行は自動で入る。足りなければ全文を読む）。
- 作業中に **新しい決まりごと・好み・ハマりどころ・注意点** が出たら、確認のうえ MEMORY.md に1行ずつ書き足す。
- 書くのは「次回も効く決まり」だけ。秘密情報・APIキー・個人情報は書かない。古くなった項目は消す。

## 7. スキル（~/.claude/skills/）

ttj-design / memoir-editing / telecom-svg / edu-html / codex-review / publish / grok-x-draft。該当する作業では、まず対応する SKILL.md を読んでから始める。
