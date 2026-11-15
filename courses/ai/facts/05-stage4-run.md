# 第05章 の事実確認表（確認 2026-11-15）

教材の行は tools/gen.py が tools/resources.json から作る。一次：○ 提供元の公式ページ／△ 公式の別ページ・写し・案内のみ／× 二次情報のみ（その場合は「未確認」と書く）／ー 該当なし。

| # | 区分 | 事実 | 出典 | 経路 | 一次 | 確認日 |
|---|---|---|---|---|---|---|
| 1 | 状態 | CrewAI：状態の札「現行」。フレームワーク本体は MIT のオープンソースです。商用の管理サービス（AMP Suite）が別にあり、料金の詳細は記載なし。 | https://github.com/crewAIInc/crewAI | README とドキュメントの導入ページを開いて確認 | ○ | 2026-11-15 |
| 2 | 料金 | CrewAI：料金の札「一部有料」 | https://github.com/crewAIInc/crewAI | README とドキュメントの導入ページを開いて確認 | ○ | 2026-11-15 |
| 3 | 前提 | CrewAI：前提「Python 3.10 以上 3.14 未満、モデル提供者の API キー（既定は OpenAI）、インストールに uv」。日本語「記載なし」 | https://github.com/crewAIInc/crewAI | README とドキュメントの導入ページを開いて確認 | ○ | 2026-11-15 |
| 4 | 状態 | AutoGen：状態の札「保守終了」。README に、アーカイブされ保守されない、バグやセキュリティの修正も提供されない、と書かれ、本番での利用は勧められていません。新規には Microsoft Agent Framework から始めるよう案内され、移行ガイドがあります。2025 年 10 月の公式の発表では、重大なバグとセキュリティの修正は続ける、とされていましたが、確認日の README はアーカイブの表示です。ライセンスは、コードが MIT、ドキュメントが CC-BY-4.0 です。 | https://github.com/microsoft/autogen | README と、2025 年 10 月の公式の発表（GitHub Discussions #7066、Microsoft のブログ）を開いて確認 | ○ | 2026-11-15 |
| 5 | 料金 | AutoGen：料金の札「記載なし」 | https://github.com/microsoft/autogen | README と、2025 年 10 月の公式の発表（GitHub Discussions #7066、Microsoft のブログ）を開いて確認 | ○ | 2026-11-15 |
| 6 | 前提 | AutoGen：前提「記載なし」。日本語「記載なし」 | https://github.com/microsoft/autogen | README と、2025 年 10 月の公式の発表（GitHub Discussions #7066、Microsoft のブログ）を開いて確認 | ○ | 2026-11-15 |
| 7 | 状態 | Microsoft Agent Framework：状態の札「現行」。ライセンスは MIT（GitHub の README）。全体の状態（正式版かどうか）は、Learn の概要ページには記載なし。 | https://learn.microsoft.com/en-us/agent-framework/overview/ | Learn の概要ページと GitHub の README を開いて確認 | ○ | 2026-11-15 |
| 8 | 料金 | Microsoft Agent Framework：料金の札「記載なし」 | https://learn.microsoft.com/en-us/agent-framework/overview/ | Learn の概要ページと GitHub の README を開いて確認 | ○ | 2026-11-15 |
| 9 | 前提 | Microsoft Agent Framework：前提「Python か .NET。Azure の認証を使う場合は Azure CLI でのサインイン。API キーはモデル提供者ごと」。日本語「移行ガイドに日本語版あり（2026-09-29 更新）」 | https://learn.microsoft.com/en-us/agent-framework/overview/ | Learn の概要ページと GitHub の README を開いて確認 | ○ | 2026-11-15 |
| 10 | 状態 | OpenAI Agents SDK：状態の札「現行」。ライセンスは MIT（GitHub の README）。ドキュメントに日本語版があります。OpenAI 以外のモデル提供者にも対応する、と書かれています。 | https://openai.github.io/openai-agents-python/ | ドキュメントと GitHub の README を開いて確認 | ○ | 2026-11-15 |
| 11 | 料金 | OpenAI Agents SDK：料金の札「記載なし」 | https://openai.github.io/openai-agents-python/ | ドキュメントと GitHub の README を開いて確認 | ○ | 2026-11-15 |
| 12 | 前提 | OpenAI Agents SDK：前提「Python 3.10 以上。例の実行に環境変数 OPENAI_API_KEY（API の利用料がかかる場合があります）」。日本語「あり」 | https://openai.github.io/openai-agents-python/ | ドキュメントと GitHub の README を開いて確認 | ○ | 2026-11-15 |
| 13 | 状態 | Awesome LLM Apps：状態の札「現行」。個人のリポジトリで、提供元の公式の教材ではありません。README に「無料のオープンソース」とありますが、実行するときの API の利用料の記載はありません。ライセンスは Apache-2.0。GitHub 本体は開けず、README の写しで確認しました。 | https://github.com/Shubhamsaboo/awesome-llm-apps | README の写し（jsDelivr）を開いて確認 | △ | 2026-11-15 |
| 14 | 料金 | Awesome LLM Apps：料金の札「無料」 | https://github.com/Shubhamsaboo/awesome-llm-apps | README の写し（jsDelivr）を開いて確認 | △ | 2026-11-15 |
| 15 | 前提 | Awesome LLM Apps：前提「一部のアプリは API キーが必要。ローカルで動かす項目は不要と記載」。日本語「記載なし」 | https://github.com/Shubhamsaboo/awesome-llm-apps | README の写し（jsDelivr）を開いて確認 | △ | 2026-11-15 |
| 16 | 状態 | 2025 年 10 月の公式の発表（GitHub Discussions #7066、2025-10-02）は、AutoGen は保守を続け、重大なバグとセキュリティの修正は提供する、大きな新機能は足さない、と書いた。Microsoft のブログ（2025-10-01）は、両方の支援は続くが投資の中心は Agent Framework、と書いた | https://github.com/microsoft/autogen/discussions/7066 | 発表を WebFetch | ○ | 2026-11-15 |
| 17 | 状態 | 確認日の README は「アーカイブされ、Microsoft による積極的な保守は終了。バグ・セキュリティの修正、新機能、サポートは提供しない。新規は Microsoft Agent Framework から」。発表の時点から状態が変わったので、README の今の表示に合わせた。二次情報（Visual Studio Magazine、2026 年 4 月）の「引き続き保守」は、発表の時点の書き方 | https://github.com/microsoft/autogen | README を WebFetch | ○ | 2026-11-15 |
| 18 | 状態 | AutoGen からの移行ガイド（日本語版）が learn.microsoft.com にある（ページ表示の更新日 2026-09-29） | https://learn.microsoft.com/ja-jp/agent-framework/migration-guide/from-autogen | ページを WebFetch | ○ | 2026-11-15 |
