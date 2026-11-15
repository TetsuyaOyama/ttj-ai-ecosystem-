#!/usr/bin/env python3
"""UserPromptSubmit フック：毎回の入力時にモデル振り分けのリマインドを文脈へ入れる。

stdout に出した内容は Claude の文脈に追加される。例外時は exit 0。
"""
import sys


def main():
    try:
        sys.stdin.read()
    except Exception:
        pass
    print("【リマインド】CLAUDE.md のモデル振り分け表に従うこと。軽作業（検索・確認・書式チェック）は scout / checker に回す。")
    print("上位モデルへの切り替えが必要なときは、人にタイミングと切り替え先を伝える。")


if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception:
        sys.exit(0)
