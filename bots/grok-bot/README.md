# Grok Bot

xAI（Grok）API で、AIニュース要点と X 投稿下書きを生成する定期実行ボットです。
**投稿は行いません。** `drafts/` に Markdown を保存するところまでです。

- Python 3.10 以上、標準ライブラリのみ（インストール不要）
- 出力: `drafts/YYYY-MM-DD-<task>.md`（`news` / `xpost`）
- 下書きの清書は Claude Code の `grok-x-draft` スキルで行います

## 1. .env の設定

既定で `~/.claude/skills/.env` を読みます（`--env` で変更可）。

```
XAI_API_KEY=xai-xxxxxxxx
XAI_MODEL=ここに最新のモデル名
```

`XAI_MODEL` は必須です。モデル名は変わるため、xAI の公式ドキュメントで最新のモデル名を確認して記入してください。
`.env` は git に入れないでください（`.gitignore` 済み）。

## 2. 使い方

```bash
# APIを呼ばずプロンプトだけ確認（.env が無くても動く）
python3 run.py --task news --dry-run

# 実行
python3 run.py --task news     # AI・通信・相場のニュース要点
python3 run.py --task xpost    # X投稿の下書き3案

# 別の .env を使う
python3 run.py --task xpost --env /path/to/.env
```

プロンプトは `prompts/news.md` と `prompts/xpost.md` です。編集すると出力の方向を変えられます（`{date}` は実行日に置換されます）。

## 3. 定期実行: WSL の cron

```bash
crontab -e
```

```cron
# 毎朝 7:30 にニュース、8:00 に投稿下書き
30 7 * * * cd $HOME/ttj-ai-ecosystem/bots/grok-bot && /usr/bin/python3 run.py --task news  >> $HOME/grok-bot.log 2>&1
0  8 * * * cd $HOME/ttj-ai-ecosystem/bots/grok-bot && /usr/bin/python3 run.py --task xpost >> $HOME/grok-bot.log 2>&1
```

WSL の cron は初期状態で動いていないことがあります。`sudo service cron start` で起動してください。
WSL を閉じると止まるため、確実に回したい場合は次の Windows タスクスケジューラ方式を使います。

## 4. 定期実行: Windows タスクスケジューラ

「タスクの作成」→「トリガー」で毎日の時刻を指定し、「操作」に次を設定します。

- プログラム/スクリプト: `wsl.exe`
- 引数の追加: `-e python3 /home/<ユーザー名>/ttj-ai-ecosystem/bots/grok-bot/run.py --task news`

`<ユーザー名>` は WSL 側のユーザー名に置き換えてください。`~` は展開されないため、`/home/...` の絶対パスで書きます。
コマンドプロンプトでの動作確認:

```
wsl.exe -e python3 /home/<ユーザー名>/ttj-ai-ecosystem/bots/grok-bot/run.py --task news --dry-run
```

## 5. トラブルシュート

- `XAI_API_KEY と XAI_MODEL を設定してください`: `.env` のキー名と場所を確認。
- `APIエラー 4xx`: キー・モデル名の誤り、または利用枠を確認。
- 出力が空・短い: `prompts/` の指示を見直す。
