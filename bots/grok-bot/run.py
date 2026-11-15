#!/usr/bin/env python3
"""Grok Bot: xAI API でニュース要約とX投稿下書きを生成する（標準ライブラリのみ）。

使い方:
    python3 run.py --task news            # AI・通信・相場のニュース要点
    python3 run.py --task xpost           # X投稿の下書き3案
    python3 run.py --task news --dry-run  # APIを呼ばずプロンプトだけ表示

投稿はしない。drafts/YYYY-MM-DD-<task>.md に保存するまで。
"""
import argparse
import datetime
import json
import os
import sys
import urllib.error
import urllib.request

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROMPT_DIR = os.path.join(BASE_DIR, "prompts")
DRAFT_DIR = os.path.join(BASE_DIR, "drafts")
DEFAULT_ENV = os.path.join("~", ".claude", "skills", ".env")
API_URL = "https://api.x.ai/v1/chat/completions"
TASKS = ("news", "xpost")


def load_env(path):
    """KEY=VALUE 形式の .env を読み、os.environ に未設定のものだけ反映する。無ければ何もしない。"""
    path = os.path.expanduser(path)
    if not os.path.isfile(path):
        return False
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            if key.startswith("export "):
                key = key[len("export "):].strip()
            value = value.strip().strip('"').strip("'")
            os.environ.setdefault(key, value)
    return True


def build_prompt(task):
    """prompts/<task>.md を読み、{date} を今日の日付に置換して返す。"""
    path = os.path.join(PROMPT_DIR, task + ".md")
    with open(path, encoding="utf-8") as f:
        text = f.read()
    return text.replace("{date}", datetime.date.today().isoformat())


def call_xai(prompt, api_key, model):
    """xAI（OpenAI互換）の chat/completions を呼び、本文を返す。"""
    body = json.dumps({
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
    }).encode("utf-8")
    req = urllib.request.Request(
        API_URL,
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer " + api_key,
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as res:
        data = json.loads(res.read().decode("utf-8"))
    return data["choices"][0]["message"]["content"]


def main():
    parser = argparse.ArgumentParser(description="Grok Bot（下書き生成。投稿はしない）")
    parser.add_argument("--task", required=True, choices=TASKS, help="news または xpost")
    parser.add_argument("--env", default=DEFAULT_ENV, help="読み込む .env（既定: ~/.claude/skills/.env）")
    parser.add_argument("--dry-run", action="store_true", help="APIを呼ばずプロンプトを表示する")
    args = parser.parse_args()

    load_env(args.env)  # dry-run では .env が無くてもよい
    prompt = build_prompt(args.task)

    if args.dry_run:
        print("[dry-run] task=%s model=%s" % (args.task, os.environ.get("XAI_MODEL", "(未設定)")))
        print("-" * 40)
        print(prompt)
        return 0

    api_key = os.environ.get("XAI_API_KEY")
    model = os.environ.get("XAI_MODEL")
    if not api_key or not model:
        print("エラー: XAI_API_KEY と XAI_MODEL を %s に設定してください。" % args.env, file=sys.stderr)
        return 1

    try:
        text = call_xai(prompt, api_key, model)
    except urllib.error.HTTPError as e:
        print("APIエラー %s: %s" % (e.code, e.read().decode("utf-8", "replace")), file=sys.stderr)
        return 1
    except (urllib.error.URLError, KeyError, ValueError) as e:
        print("実行エラー: %s" % e, file=sys.stderr)
        return 1

    os.makedirs(DRAFT_DIR, exist_ok=True)
    out = os.path.join(DRAFT_DIR, "%s-%s.md" % (datetime.date.today().isoformat(), args.task))
    with open(out, "w", encoding="utf-8") as f:
        f.write(text.rstrip() + "\n")
    print("保存しました: " + out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
