#!/usr/bin/env python3
"""PostToolUse(Write|Edit|MultiEdit) フック：変更したファイルのパスを日別ログに追記する。

追記先：~/.claude/logs/changes-YYYY-MM-DD.md。例外時は exit 0。
"""
import datetime
import json
import sys
from pathlib import Path


def main():
    raw = sys.stdin.read()
    data = json.loads(raw) if raw.strip() else {}
    if not isinstance(data, dict):
        return
    tool_input = data.get("tool_input") or {}
    path = tool_input.get("file_path") if isinstance(tool_input, dict) else None
    if not isinstance(path, str) or not path:
        return
    now = datetime.datetime.now()
    log_dir = Path.home() / ".claude" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    log_file = log_dir / f"changes-{now:%Y-%m-%d}.md"
    is_new = not log_file.exists()
    with open(log_file, "a", encoding="utf-8") as f:
        if is_new:
            f.write(f"# 変更ログ {now:%Y-%m-%d}\n\n")
        tool = data.get("tool_name") or "?"
        f.write(f"- {now:%H:%M:%S} [{tool}] `{path}`\n")


if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception:
        sys.exit(0)
