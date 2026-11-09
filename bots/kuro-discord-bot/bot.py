"""クロ: Discord スラッシュコマンド Bot（Claude API 利用）。

コマンド:
    /ask 質問      Claude に質問する
    /summary 件数  このチャンネルの直近N件を要約する
    /memo 内容     メモを SQLite に保存する
    /memos         自分のメモ一覧

許可チャンネル・許可ロールは環境変数で制限する（README 参照）。
"""
import os
import sqlite3

import anthropic
import discord
from discord import app_commands

MODEL = os.environ.get("CLAUDE_MODEL", "claude-sonnet-5-5")
DB_PATH = os.environ.get("KURO_DB_PATH", "kuro.db")
SYSTEM_PROMPT = (
    "あなたは「クロ」、てっちの Discord アシスタントです。"
    "日本語で簡潔・正確に答え、分からないことは分からないと言います。誇張はしません。"
)
DISCORD_LIMIT = 1900  # Discord の1メッセージ上限(2000)に余裕を持たせる


def parse_ids(name):
    """カンマ区切りの ID 環境変数を set[int] にする。空なら空集合。"""
    raw = os.environ.get(name, "")
    return {int(x) for x in raw.split(",") if x.strip().isdigit()}


ALLOWED_CHANNELS = parse_ids("ALLOWED_CHANNEL_IDS")
ALLOWED_ROLES = parse_ids("ALLOWED_ROLE_IDS")


def is_allowed(interaction: discord.Interaction) -> bool:
    """権限フィルタ: チャンネルとロールの許可リストを確認する。
    API料金がかかるため、ALLOWED_CHANNEL_IDS が空のときは全チャンネルで拒否する。"""
    if not ALLOWED_CHANNELS or interaction.channel_id not in ALLOWED_CHANNELS:
        return False
    if ALLOWED_ROLES:
        roles = getattr(interaction.user, "roles", [])
        if not any(r.id in ALLOWED_ROLES for r in roles):
            return False
    return True


def init_db():
    with sqlite3.connect(DB_PATH) as con:
        con.execute(
            "CREATE TABLE IF NOT EXISTS memos ("
            "id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, "
            "content TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)"
        )


def chunk(text):
    """長文を Discord の上限に収まるよう分割する。"""
    text = text or "(空の応答)"
    return [text[i:i + DISCORD_LIMIT] for i in range(0, len(text), DISCORD_LIMIT)]


class KuroBot(discord.Client):
    def __init__(self):
        # message_content は /summary で過去メッセージ本文を読むために必要（特権Intent）
        intents = discord.Intents.default()
        intents.message_content = True
        super().__init__(intents=intents)
        self.tree = app_commands.CommandTree(self)
        self.claude = anthropic.AsyncAnthropic()  # ANTHROPIC_API_KEY を環境変数から読む

    async def setup_hook(self):
        init_db()
        await self.tree.sync()

    async def on_ready(self):
        print("ログインしました: %s (model=%s)" % (self.user, MODEL))

    async def ask_claude(self, prompt):
        res = await self.claude.messages.create(
            model=MODEL,
            max_tokens=1500,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}],
        )
        return "".join(b.text for b in res.content if getattr(b, "type", "") == "text")


bot = KuroBot()


async def deny(interaction):
    await interaction.response.send_message("このチャンネル／ロールでは使えません。", ephemeral=True)


@bot.tree.command(name="ask", description="Claude に質問します")
@app_commands.describe(question="質問内容")
async def ask(interaction: discord.Interaction, question: str):
    if not is_allowed(interaction):
        return await deny(interaction)
    await interaction.response.defer(thinking=True)
    try:
        answer = await bot.ask_claude(question)
    except anthropic.APIError as e:
        return await interaction.followup.send("APIエラー: %s" % e)
    parts = chunk(answer)
    await interaction.followup.send(parts[0])
    for p in parts[1:]:
        await interaction.followup.send(p)


@bot.tree.command(name="summary", description="このチャンネルの直近のメッセージを要約します")
@app_commands.describe(count="対象件数（1〜100、既定 30）")
async def summary(interaction: discord.Interaction, count: app_commands.Range[int, 1, 100] = 30):
    if not is_allowed(interaction):
        return await deny(interaction)
    await interaction.response.defer(thinking=True)
    lines = []
    async for m in interaction.channel.history(limit=count):
        if m.content:
            lines.append("%s: %s" % (m.author.display_name, m.content))
    if not lines:
        return await interaction.followup.send("要約できるメッセージがありません。")
    lines.reverse()  # 古い順
    prompt = "次のDiscordの会話を、要点を箇条書きで日本語で要約してください。\n\n" + "\n".join(lines)
    try:
        answer = await bot.ask_claude(prompt)
    except anthropic.APIError as e:
        return await interaction.followup.send("APIエラー: %s" % e)
    for p in chunk(answer):
        await interaction.followup.send(p)


@bot.tree.command(name="memo", description="メモを保存します")
@app_commands.describe(content="メモの内容")
async def memo(interaction: discord.Interaction, content: str):
    if not is_allowed(interaction):
        return await deny(interaction)
    with sqlite3.connect(DB_PATH) as con:
        cur = con.execute("INSERT INTO memos (user_id, content) VALUES (?, ?)", (interaction.user.id, content))
    await interaction.response.send_message("メモを保存しました（#%d）" % cur.lastrowid, ephemeral=True)


@bot.tree.command(name="memos", description="自分のメモを一覧表示します（最新20件）")
async def memos(interaction: discord.Interaction):
    if not is_allowed(interaction):
        return await deny(interaction)
    with sqlite3.connect(DB_PATH) as con:
        rows = con.execute(
            "SELECT id, content, created_at FROM memos WHERE user_id = ? ORDER BY id DESC LIMIT 20",
            (interaction.user.id,),
        ).fetchall()
    if not rows:
        return await interaction.response.send_message("メモはありません。", ephemeral=True)
    text = "\n".join("#%d [%s] %s" % r for r in rows)
    await interaction.response.send_message(text[:DISCORD_LIMIT], ephemeral=True)


def main():
    token = os.environ.get("DISCORD_BOT_TOKEN")
    if not token:
        raise SystemExit("DISCORD_BOT_TOKEN が未設定です。.env を確認してください。")
    bot.run(token)


if __name__ == "__main__":
    main()
