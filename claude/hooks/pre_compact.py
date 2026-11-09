#!/usr/bin/env python3
"""PreCompact フック：コンテキスト圧縮の直前に、時刻と session_id を logs/compact.log に追記する。

例外時は exit 0。
"""
import datetime
import json
import sys
from pathlib import Path


def main():
    raw = sys.stdin.read()
    data = json.loads(raw) if raw.strip() else {}
    if not isinstance(data, dict):
        data = {}
    log_dir = Path.home() / ".claude" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    now = datetime.datetime.now().isoformat(timespec="seconds")
    with open(log_dir / "compact.log", "a", encoding="utf-8") as f:
        f.write(f"{now}\tsession_id={data.get('session_id', '?')}\n")


if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception:
        sys.exit(0)
