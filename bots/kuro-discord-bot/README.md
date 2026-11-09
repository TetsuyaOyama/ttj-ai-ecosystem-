# クロ（Discord Bot）

Claude API を使う Discord スラッシュコマンド Bot です。

| コマンド | 内容 |
|---|---|
| `/ask 質問` | Claude に質問する |
| `/summary 件数` | このチャンネルの直近N件（最大100）を要約する |
| `/memo 内容` | メモを SQLite に保存する |
| `/memos` | 自分のメモを一覧表示する（最新20件） |

## 1. Discord Developer Portal で Bot を作る

1. <https://discord.com/developers/applications> を開き、「New Application」で名前（例: クロ）を付けて作成。
2. 左メニュー「Bot」→「Reset Token」でトークンを発行し、`.env` の `DISCORD_BOT_TOKEN` に貼る。**他人に見せない・git に入れない。**
3. 同じ「Bot」画面の「Privileged Gateway Intents」で次を設定する。
   - **MESSAGE CONTENT INTENT: オン**（`/summary` が過去メッセージの本文を読むために必要）
   - PRESENCE INTENT / SERVER MEMBERS INTENT: 不要（オフでよい）
4. 「Installation」または「OAuth2 → URL Generator」で招待URLを作る。
   - Scopes: **`bot` と `applications.commands`**
   - Bot Permissions: `View Channels`、`Send Messages`、`Read Message History`
5. 生成されたURLをブラウザで開き、自分のサーバーに招待する。
6. 許可制限に使う ID を取る: Discord の設定「詳細設定」で開発者モードをオン → チャンネル/ロールを右クリック →「IDをコピー」。

## 2. セットアップ（WSL）

```bash
cd ~/ttj-ai-ecosystem/bots/kuro-discord-bot
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env     # 値を記入
```

`.env` の主な項目:

- `DISCORD_BOT_TOKEN` / `ANTHROPIC_API_KEY`: 必須
- `CLAUDE_MODEL`: 既定 `claude-sonnet-5-5`
- `ALLOWED_CHANNEL_IDS`（必須）: カンマ区切り。**空のままだと全チャンネルで拒否します**（API利用料を守るため）。`ALLOWED_ROLE_IDS` は任意（空ならロール制限なし）
- `KURO_DB_PATH`: メモのSQLiteファイル（既定 `kuro.db`）

手動起動:

```bash
set -a; . ./.env; set +a
.venv/bin/python bot.py
```

起動時にスラッシュコマンドを同期します。反映まで数分かかることがあります。

## 3. 常駐: systemd --user

WSL2 で systemd が有効であること（`/etc/wsl.conf` に `[boot]` `systemd=true`）が前提です。

`~/.config/systemd/user/kuro-bot.service`:

```ini
[Unit]
Description=Kuro Discord Bot
After=network-online.target

[Service]
WorkingDirectory=%h/ttj-ai-ecosystem/bots/kuro-discord-bot
EnvironmentFile=%h/ttj-ai-ecosystem/bots/kuro-discord-bot/.env
ExecStart=%h/ttj-ai-ecosystem/bots/kuro-discord-bot/.venv/bin/python bot.py
Restart=on-failure
RestartSec=10

[Install]
WantedBy=default.target
```

```bash
systemctl --user daemon-reload
systemctl --user enable --now kuro-bot
systemctl --user status kuro-bot
journalctl --user -u kuro-bot -f     # ログ
```

ログアウト後も動かしたい場合は `loginctl enable-linger $USER`。
systemd を使わない場合は `tmux new -s kuro` の中で手動起動しても構いません。

## 4. トラブルシュート

- コマンドが出ない: 招待時に `applications.commands` を付けたか確認。数分待つ。
- `/summary` が空: MESSAGE CONTENT INTENT がオフ、またはBotにチャンネルの閲覧/履歴権限がない。
- 「使えません」と出る: `ALLOWED_CHANNEL_IDS` / `ALLOWED_ROLE_IDS` を確認。
