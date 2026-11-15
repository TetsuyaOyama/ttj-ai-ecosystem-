# AI 学習ロードマップ 検証の記録（2026-11-15）

対象：/home/claude/courses/ai/（序章・第01〜07章・付録）。教材の事実は tools/resources.json を直し、tools/gen.py で章の表・付録・facts を作り直した。
最終の点検：selfcheck NG 0（全 9 章）／`build.py --check` エラー 0・警告 0／`test.py --port 8852` PASS 2165・FAIL 0。

## 1. 指摘の一覧

| # | 重さ | 箇所 | 内容と根拠 | 直したか |
|---|---|---|---|---|
| 1 | 重大 | R07 Anthropic Courses（第03章・付録） | 札が「未確認」だったが、GitHub のページに「2026-09-15 に所有者がアーカイブ、読み取り専用」と表示。5 講座の構成、API 費用を抑えるため安価なモデルを使う旨も確認 | 直した：状態「保守終了」、料金「記載なし」、前提・内容・注記を更新。第03章の本文・つまずき・学ぶ目標も合わせた |
| 2 | 重大 | R15 AutoGen と第05章 | 「二次情報が保守継続と書く」とだけあった。公式の発表（Discussions #7066 2025-10-02、Microsoft ブログ 2025-10-01）は「保守は続け、重大なバグ・セキュリティ修正は提供」。確認日の README は「アーカイブ、Microsoft による積極的な保守は終了、修正・新機能・サポートなし、新規は Microsoft Agent Framework から」。正確なのは「アーカイブ（保守終了）＋新規には別の枠組み」で、状態は発表の時点から変わった | 直した：時系列で書き、README の今の表示に合わせた。参照資料に公式発表を追加 |
| 3 | 中 | 序章・トップの導入文 | 「無料を中心にした」教材。実際は 20 件のうち無料の札は 5 件で、「記載なし」が多い。「全部無料」と読まれうる | 直した：「料金は教材ごとに札で示します（すべてが無料ではありません）」 |
| 4 | 中 | 第02〜05章・序章の参照資料 | 公開の本文に「利用者の案」という内部の言い方 | 直した（中立の言い方へ） |
| 5 | 中 | R08 OpenAI Academy | URL がヘルプ記事だった。本体の講座一覧 https://academy.openai.com/pages/courses を確認 | 直した：URL を本体へ。料金・修了証の出どころ（ヘルプ記事）を注記。日本語は「一部（画面表示のみ）」 |
| 6 | 中 | R12 OpenAI Cookbook | URL が「推定」扱いだった。https://developers.openai.com/cookbook がトップで、GitHub へのリンクもあることを確認 | 直した：推定の注記を削除 |
| 7 | 中 | R06 Claude Academy | 料金「無料（登録が必要）」。登録の根拠は Skilljar の別ページだけで、academy.claude.com の登録要否は未確認 | 直した：料金「無料」、登録は未確認と注記。Claude の公式記事を出典に追加 |
| 8 | 中 | R01 Interactive Tutorial | 構成・前提が空欄 | 直した（状態は未確認のまま）：第三者の索引（Algolia DocSearch・Context7）の要約で、9 章＋付録・練習と解答・API キーと Jupyter と出どころを付けて記載。読者の確認手順を 1 文追加 |
| 9 | 中 | R11 Claude Cookbooks | README が初心者に勧めるコースのリンク先が、アーカイブ済みの anthropics/courses | 直した：注記に追加 |
| 10 | 中 | 付録の一覧表 | `style="min-width:1500px"` の直書き（全講座で唯一）。外すと 9 列が縦 9,000px 近くに伸びた | 直した：基盤の `.tbl-wrap`/`.tbl` だけで、2 つの表（①段階・名称と提供元・料金・状態・確認日、②名称・前提・日本語）に分割。高さは 1366px で約 1,300px ずつ |
| 11 | 中 | 第05章 対比表（375px） | 列 A が折り返さない行見出しのため、長文が画面外に切れていた | 直した：列 A を短い句にし、項目名と出典を右の列へ |
| 12 | 軽微 | R04 Gemini | 日付「記載なし」→ページに更新日 2026-09-18、日本語「記載なし」→言語切替に日本語あり（機械翻訳の注意つき）。ライセンス（文 CC BY 4.0・コード Apache 2.0）も記載 | 直した |
| 13 | 軽微 | R05 MS 生成 AI 講座 | 「21 レッスン（00 は環境構築）」は、00 が 21 に含まれるように読める（実際は 01〜21＋00）。前提に GitHub アカウントが抜け | 直した |
| 14 | 軽微 | R10 MS エージェント講座 | 前提の書き方。ページは「決まった前提なし、生成 AI が初めてなら Generative AI for Beginners を推奨」 | 直した |
| 15 | 軽微 | R16 Agent Framework | 移行ガイド日本語版は「検索結果のみ」だった→本文を開いて確認（更新日 2026-09-29）。Go は公開プレビュー | 直した（第05章の参照資料・facts も） |
| 16 | 軽微 | 第02章 | 「3 つ目の確認日は」の誤字 | 直した |
| 17 | 軽微 | 第04章 | MCP の説明が表の前後で重複。区切りの文が断定（「立てます」） | 直した（「立てる、と考えます。目安で、保証ではありません」） |
| 18 | 軽微 | トップの「札の見方」 | 料金の札に「未確認」が抜け | 直した |
| 19 | 軽微 | 付録の段階欄 | 「第07章（自分の環境）」が行見出しで折り返さず列を広げた | 直した（「第07章」） |
| 20 | 軽微 | 第02章の教材表など（375px） | 基盤の早見表は名称列が折り返さず、横スクロールになる。行を押すと下に詳細が出るので読める | 残した（基盤側の仕様） |

確認して問題なしとしたもの：確認問題 24 問と総合テスト 7 問の正答（全件、選択肢の文で確認）／人名と発言の引用なし（Amodei 氏の名前・引用なし）／作者名なし（章・データ・出力）／効果の保証は「目安で、保証ではない」とすべての「終えるとできること」に明記／優劣・順位の語なし（CrewAI・Agents SDK・Agent Framework の説明は事実のみ。CrewAI の README の「高性能」「標準になりつつある」等の宣伝文は載せていない）／教材説明は自分の言葉の要約／API 利用料と規約・ライセンスの注意は序章・付録・トップに記載／第07章は showcase/ai-ecosystem と claude/（settings.json の allow・ask・deny、フック 8 本、エージェント 5 体、スキル 7 本、CLAUDE.md、install.sh）の実在の内容と一致（ttj-ai-ecosystem で照合）／足した 5 教材は各段階の表の 1 行で、道筋は散らかっていない（付録に回す必要なし）。

## 2. 教材 20 件の再確認（確認日 2026-11-15）

| ID | 名称 | 料金 | 状態 | URL | 経路 |
|---|---|---|---|---|---|
| R01 | Anthropic Prompt Engineering Interactive Tutorial | 記載なし | 現行 | https://github.com/anthropics/prompt-eng-interactive-tutorial | GitHub のリポジトリのページ（利用者の画面の写し、2026-11-15）。archived の表示なし、最後のコミットは約 2 年前、README は Claude 3 Haiku を使うと記載、About 欄にライセンス表示なし |
| R02 | ChatGPT Prompt Engineering for Developers | 一部有料 | 現行 | https://www.deeplearning.ai/short-courses/chatgpt-prompt-eng/ | 公式（無料はベータ期間の限定、修了証と採点課題は PRO、更新 2026-10-12） |
| R03 | Prompt Engineering Guide | 記載なし | 現行 | https://www.promptingguide.ai/ | 公式 About（有料講座の案内あり） |
| R04 | Prompt design strategies（Gemini API） | 記載なし | 現行 | https://ai.google.dev/gemini-api/docs/prompting-strategies | 公式（更新 2026-09-18、日本語あり） |
| R05 | Generative AI for Beginners | 記載なし | 現行 | https://github.com/microsoft/generative-ai-for-beginners | 公式 Pages の README |
| R06 | Claude Academy | 無料 | 改名・移転 | https://academy.claude.com/ | リダイレクト、Claude 公式記事、Claude Code ドキュメント（ja）、Skilljar |
| R07 | Anthropic Courses（GitHub） | 記載なし | 保守終了 | https://github.com/anthropics/courses | GitHub のページ（2026-09-15 アーカイブ） |
| R08 | OpenAI Academy | 無料（登録が必要） | 現行 | https://academy.openai.com/pages/courses | 講座一覧＋ヘルプ記事 |
| R09 | Agents Course | 無料（登録が必要） | 現行 | https://huggingface.co/learn/agents-course | 公式 |
| R10 | AI Agents for Beginners | 記載なし | 現行 | https://github.com/microsoft/ai-agents-for-beginners | 公式 Pages |
| R11 | Claude Cookbooks | 記載なし | 改名・移転 | https://github.com/anthropics/claude-cookbooks | README |
| R12 | OpenAI Cookbook | 記載なし | 現行 | https://developers.openai.com/cookbook | 公式トップ |
| R13 | What is MCP? | 記載なし | 現行 | https://modelcontextprotocol.io/docs/getting-started/intro | 公式 |
| R14 | CrewAI | 一部有料 | 現行 | https://github.com/crewAIInc/crewAI | README |
| R15 | AutoGen | 記載なし | 保守終了 | https://github.com/microsoft/autogen | README＋公式発表（2025-10） |
| R16 | Microsoft Agent Framework | 記載なし | 現行 | https://learn.microsoft.com/en-us/agent-framework/overview/ | Learn（更新 2026-10-28）＋移行ガイド ja |
| R17 | OpenAI Agents SDK | 記載なし | 現行 | https://openai.github.io/openai-agents-python/ | ドキュメント＋README（MIT、Python 3.10+） |
| R18 | Awesome LLM Apps | 無料 | 現行 | https://github.com/Shubhamsaboo/awesome-llm-apps | README の写し（jsDelivr） |
| R19 | Neural Networks: Zero to Hero | 記載なし | 現行 | https://karpathy.ai/zero-to-hero.html | 公式 |
| R20 | Claude Code ドキュメント（クイックスタート） | 登録が必要（有料の契約か API） | 現行 | https://code.claude.com/docs/ja/quickstart | 公式（ja） |

「記載なし」はページに書かれていない、「未確認」はページを開けなかった、で使い分けを確認した。

## 3. 未確認のまま残したもの

- R06 academy.claude.com の講座一覧・登録の要否（ページ取得を拒否）。二次情報には「サインイン不要」とするものがあるが、採らなかった。
- R07 と Claude Academy の関係：README に移転の案内はなく、「移った」とは書いていない。
- R05・R10・R18 の GitHub 本体（Pages・写しで確認）。

## 4. 残した点

- 基盤の早見表・対比表は、375px で名称列が折り返さず横スクロールになる（基盤の仕様。直すなら _framework 側）。
- 撮影：/tmp/ai-review/shots/（1366・375、ダーク：入口の図、第02章の表、第05章の対比表と表、付録の 2 表）。重なりなし、ページ全体のはみ出しなし（表の枠内スクロールのみ）。
