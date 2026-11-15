#!/usr/bin/env python3
"""SessionEnd フック：セッションの開始/終了時刻を logs/sessions.log に追記する。

開始時刻は session_start.py が残したマーカーから読む（無ければ「不明」）。例外時は exit 0。
"""
import datetime
import json
import re
import sys
from pathlib import Path


def main():
    raw = sys.stdin.read()
    data = json.loads(raw) if raw.strip() else {}
    if not isinstance(data, dict):
        data = {}
    session_id = data.get("session_id")
    log_dir = Path.home() / ".claude" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)

    start = "不明"
    marker = None
    if isinstance(session_id, str) and re.fullmatch(r"[\w.-]+", session_id):
        marker = log_dir / f"session-{session_id}.start"
        if marker.is_file():
            start = marker.read_text(encoding="utf-8").strip() or "不明"

    end = datetime.datetime.now().isoformat(timespec="seconds")
    with open(log_dir / "sessions.log", "a", encoding="utf-8") as f:
        f.write(f"開始={start}\t終了={end}\tsession_id={session_id or '?'}\n")

    if marker is not None:
        try:
            marker.unlink()
        except Exception:
            pass


if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception:
        sys.exit(0)
