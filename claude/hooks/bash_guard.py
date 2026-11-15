#!/usr/bin/env python3
"""PreToolUse(Bash) フック：危険なコマンドをブロックする。

禁止：
  - rm -rf / , rm -rf ~ （ホーム・ルート全体の削除）
  - git push --force / -f / --force-with-lease
  - sudo
  - .env の中身を cat/less/head/tail/grep 等で読む（.env.example は許可）
  - curl ... | sh

ブロックは exit code 2 ＋ stderr に日本語の理由。想定外の入力・例外時は exit 0。
"""
import datetime
import json
import re
import sys
from pathlib import Path

# 先頭（または ; & | ( の直後）にあるコマンドかどうかを見るための接頭辞
HEAD = r"(?:^|[;&|(]\s*)"

# 中身を読み出す系のコマンド
READERS = (
    r"cat|less|more|head|tail|grep|egrep|fgrep|rg|ag|sed|awk|bat|nl|tac|"
    r"strings|xxd|od|hexdump|cut|sort|uniq|base64|source"
)

# .env 系ファイル名（.env / .env.local / path/to/.env など）。.envrc は対象外
ENV_TOKEN = re.compile(r"[^\s;&|<>\"'=]*\.env(?:\.([A-Za-z0-9_-]+))?(?![\w-])")
ENV_SAFE_SUFFIX = {"example", "sample", "template", "dist"}

RULES = [
    (
        "ルート/ホーム全体の削除 (rm -rf / , rm -rf ~)",
        re.compile(
            r"\brm\s+(?:-\S+\s+)*?(?:-[A-Za-z]*[rR][A-Za-z]*|--recursive)\s+(?:-\S+\s+)*"
            r"(?:/|/\*|~/?|~/\*|\$HOME/?|\$HOME/\*|\$\{HOME\}/?|\$\{HOME\}/\*)(?=\s|$|[;&|])"
        ),
    ),
    (
        "強制 push (git push --force / -f / --force-with-lease)",
        re.compile(
            r"\bgit\s+push\b[^;&|\n]*?\s(?:--force(?:-with-lease)?(?:=\S*)?|-[A-Za-z]*f[A-Za-z]*)(?=\s|$)"
        ),
    ),
    ("sudo の使用", re.compile(HEAD + r"(?:\w+=\S*\s+)*sudo\b")),
    (
        "curl/wget の出力をそのままシェルに渡す実行 (curl ... | sh)",
        re.compile(r"\b(?:curl|wget)\b[^;&\n]*\|\s*(?:sudo\s+)?(?:ba|z|da|k)?sh\b"),
    ),
]

READ_ENV_CMD = re.compile(HEAD + r"(?:\w+=\S*\s+)*(?:" + READERS + r")\b")
SOURCE_DOT = re.compile(HEAD + r"\.\s+")
REDIRECT_IN = re.compile(r"<\s*(\S+)")
INLINE_CODE = re.compile(r"\b(?:python3?|node|ruby|perl|php|deno|bun)\b[^\n]*?\s-(?:c|e|p|r)\b")


def is_secret_env(token_match):
    suffix = token_match.group(1)
    return suffix is None or suffix.lower() not in ENV_SAFE_SUFFIX


def reads_env_file(command):
    """.env（.env.example 以外）を読み出すコマンドなら True。"""
    for seg in re.split(r"[;&|\n]+", command):
        seg = seg.strip()
        if not seg:
            continue
        env_hits = [m for m in ENV_TOKEN.finditer(seg) if is_secret_env(m)]
        if not env_hits:
            continue
        if READ_ENV_CMD.search(seg) or SOURCE_DOT.search(seg):
            return True
        # python3 -c / node -e など、その場で書いたコードで .env を開く抜け道
        if INLINE_CODE.search(seg):
            return True
        # cmd < .env 形式のリダイレクト
        for r in REDIRECT_IN.finditer(seg):
            m = ENV_TOKEN.fullmatch(r.group(1).strip("\"'"))
            if m and is_secret_env(m):
                return True
    return False


def log_block(reason, command):
    try:
        d = Path.home() / ".claude" / "logs"
        d.mkdir(parents=True, exist_ok=True)
        with open(d / "blocked.log", "a", encoding="utf-8") as f:
            f.write(
                f"{datetime.datetime.now().isoformat(timespec='seconds')}\tbash_guard\t"
                f"{reason}\t{command[:200]!r}\n"
            )
    except Exception:
        pass


def block(reason, command):
    log_block(reason, command)
    sys.stderr.write(
        f"[bash_guard] ブロックしました：{reason}\n"
        "必要な場合は、人が自分のターミナルで直接実行してください。\n"
    )
    sys.exit(2)


def main():
    raw = sys.stdin.read()
    data = json.loads(raw) if raw.strip() else {}
    if not isinstance(data, dict):
        return
    if data.get("tool_name") not in (None, "Bash"):
        return
    tool_input = data.get("tool_input") or {}
    command = tool_input.get("command") if isinstance(tool_input, dict) else None
    if not isinstance(command, str) or not command.strip():
        return

    for reason, pattern in RULES:
        if pattern.search(command):
            block(reason, command)
    if reads_env_file(command):
        block(".env ファイルの読み取り（APIキー保護。.env.example は可）", command)


if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception:
        sys.exit(0)
