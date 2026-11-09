#!/usr/bin/env python3
"""SessionStart フック：記憶メモ（~/.claude/memory/MEMORY.md）の先頭40行を文脈へ入れる。

あわせて、SessionEnd で所要時間を出せるよう開始時刻を logs/ に控える。例外時は exit 0。
"""
import datetime
import json
import re
import sys
from pathlib import Path

MAX_LINES = 40


def save_start_marker(session_id):
    if not isinstance(session_id, str) or not re.fullmatch(r"[\w.-]+", session_id):
        return
    log_dir = Path.home() / ".claude" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    (log_dir / f"session-{session_id}.start").write_text(
        datetime.datetime.now().isoformat(timespec="seconds"), encoding="utf-8"
    )


def main():
    raw = sys.stdin.read()
    data = json.loads(raw) if raw.strip() else {}
    if isinstance(data, dict):
        try:
            save_start_marker(data.get("session_id"))
        except Exception:
            pass

    memo = Path.home() / ".claude" / "memory" / "MEMORY.md"
    if not memo.is_file():
        return
    with open(memo, encoding="utf-8", errors="replace") as f:
        lines = [line.rstrip("\n") for _, line in zip(range(MAX_LINES), f)]
    if lines:
        print("【記憶メモ（~/.claude/memory/MEMORY.md の先頭40行）】")
        print("\n".join(lines))


if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception:
        sys.exit(0)
