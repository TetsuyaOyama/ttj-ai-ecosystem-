#!/usr/bin/env python3
"""PreToolUse(Read) フック：秘密ファイルの読み取りをブロックする。

対象：.env / .env.*（.env.example は可）・*.pem・id_rsa 系の秘密鍵。
ブロックは exit code 2 ＋ stderr に日本語の理由。想定外の入力・例外時は exit 0。
"""
import datetime
import json
import re
import sys
from pathlib import Path

ENV_RE = re.compile(r"^\.env(?:\.([A-Za-z0-9_-]+))?$")
ENV_SAFE_SUFFIX = {"example", "sample", "template", "dist"}
KEY_RE = re.compile(r"^id_(?:rsa|dsa|ecdsa|ed25519)(?:\..*)?$")


def classify(file_path):
    """ブロックすべきなら理由の文字列、許可なら None を返す。"""
    name = Path(file_path).name
    m = ENV_RE.match(name)
    if m and (m.group(1) is None or m.group(1).lower() not in ENV_SAFE_SUFFIX):
        return ".env ファイル（APIキーは skills/.env に集約し、スクリプトに読ませる決まりです）"
    if name.lower().endswith(".pem"):
        return "*.pem（証明書・秘密鍵）"
    if KEY_RE.match(name) and not name.endswith(".pub"):
        return "SSH 秘密鍵（id_rsa 系）"
    return None


def log_block(reason, path):
    try:
        d = Path.home() / ".claude" / "logs"
        d.mkdir(parents=True, exist_ok=True)
        with open(d / "blocked.log", "a", encoding="utf-8") as f:
            f.write(
                f"{datetime.datetime.now().isoformat(timespec='seconds')}\tsecret_guard\t"
                f"{reason}\t{path}\n"
            )
    except Exception:
        pass


def main():
    raw = sys.stdin.read()
    data = json.loads(raw) if raw.strip() else {}
    if not isinstance(data, dict):
        return
    tool_input = data.get("tool_input") or {}
    path = tool_input.get("file_path") if isinstance(tool_input, dict) else None
    if not isinstance(path, str) or not path:
        return
    reason = classify(path)
    if reason:
        log_block(reason, path)
        sys.stderr.write(
            f"[secret_guard] 読み取りをブロックしました：{reason}\n対象：{path}\n"
            "キーの中身が必要な場合は、人が直接確認してください。.env.example は読めます。\n"
        )
        sys.exit(2)


if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception:
        sys.exit(0)
