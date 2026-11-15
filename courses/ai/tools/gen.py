#!/usr/bin/env python3
"""教材の事実（tools/resources.json）から、章の表（data/*.js の table）・参照資料の表・付録の一覧表を作り直す。
使い方: python3 -I tools/gen.py   （マーカーの間だけを書き換える。冪等）"""
import json, re, html
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
R = json.load(open(ROOT / 'tools' / 'resources.json', encoding='utf8'))
CHECK = '2026-11-15'
STAGE = {2: '段階1', 3: '段階2', 4: '段階3', 5: '段階4', 6: '任意', 7: '第07章'}
FILES = {1: '01-how-to-use', 2: '02-stage1-prompts', 3: '03-stage2-intro', 4: '04-stage3-agents', 5: '05-stage4-run', 6: '06-optional-inside', 7: '07-own-environment'}
TITLE = {2: 'c02-res', 3: 'c03-res', 4: 'c04-res', 5: 'c05-res', 6: 'c06-res', 7: 'c07-res'}
CAP = {2: '段階1の教材', 3: '段階2の教材', 4: '段階3の教材', 5: '段階4の教材（優劣の順ではありません）', 6: '任意の教材', 7: '第07章で使う公式ドキュメント'}


def q(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"


def esc(s):
    return html.escape(s, quote=False)


def link(r, text=None):
    return '<a href="%s" target="_blank" rel="noopener noreferrer">%s</a>' % (html.escape(r['url'], quote=True), esc(text or r['name']))


def table_js(ch):
    rs = [r for r in R if r['ch'] == ch]
    rows, det = [], []
    for r in rs:
        rows.append([r['name'], r['provider'], r['price'], r['status'], r['prereq'], CHECK])
        d = '**何を学べるか**：' + r['learn']
        if r['time']:
            d += ' **所要の目安**：' + r['time'] + '。'
        d += ' **日本語**：' + r['ja'] + '。 **版・時点**：' + r['ver'] + '。 **注意**：' + r['note'] + ' **確認の経路**：' + r['route'] + '。'
        det.append(d)
    out = ["CN.add('table', %s, {" % q(TITLE[ch]),
           "  title: %s," % q(CAP[ch] + '：表の行を押すと、学べること・所要の目安・日本語・注意が出ます'),
           "  caption: %s," % q('確認日 2026 年 11 月 15 日の情報です。内容・料金・提供の状態は変わります。使う前に、提供元のページで確かめてください'),
           "  cols: [" + ', '.join(q(c) for c in ['名称', '提供元', '料金の札', '状態の札', '前提', '確認日']) + "],",
           "  rows: ["]
    out += ["    [" + ', '.join(q(x) for x in row) + "]" + ("," if i < len(rows) - 1 else "") for i, row in enumerate(rows)]
    out += ["  ],", "  detail: ["]
    out += ["    " + q(x) + ("," if i < len(det) - 1 else "") for i, x in enumerate(det)]
    out += ["  ]", "});"]
    return '\n'.join(out)


def refs_html(ch):
    rs = [r for r in R if r['ch'] == ch]
    tr = []
    for r in rs:
        tr.append('      <tr><td>%s</td><th scope="row">%s</th><td>%s</td><td>%s</td><td>%s</td></tr>' % (esc(r['kind']), link(r), esc(r['provider']), esc(r['ver'] + '（確認 ' + CHECK + '）'), esc(r['use'] + '。経路：' + r['route'])))
    return tr


def appendix_html():
    # 1 つ目の表：段階・名称（公式ページへのリンク）と提供元・料金の札・状態の札・確認日。
    # 2 つ目の表：名称・前提・日本語。列を分けて、style の直書きなしで読める幅にする（基盤の .tbl と .tbl-wrap だけを使う）。
    head = '<tr><th>段階</th><th>名称（公式ページ・新しいタブ）と提供元</th><th>料金の札</th><th>状態の札</th><th>確認日</th></tr>'
    tr, tr2 = [], []
    for r in R:
        tr.append('      <tr><th scope="row">%s</th><td>%s<br>%s</td><td>%s</td><td><b>%s</b></td><td>%s</td></tr>' % (
            esc(STAGE[r['ch']]), link(r), esc(r['provider']), esc(r['price']), esc(r['status']), CHECK))
        tr2.append('      <tr><td>%s</td><td>%s</td><td>%s</td></tr>' % (esc(r['name']), esc(r['prereq']), esc(r['ja'])))
    head2 = '<tr><th>名称</th><th>前提</th><th>日本語</th></tr>'
    return head, tr, head2, tr2


def sub(text, name, body):
    a, b = '/*GEN:%s*/' % name, '/*/GEN:%s*/' % name
    if a not in text:
        a, b = '<!--GEN:%s-->' % name, '<!--/GEN:%s-->' % name
    i, j = text.index(a), text.index(b)
    return text[:i + len(a)] + '\n' + body + '\n' + text[j:]


for ch in range(2, 8):
    f = ROOT / 'data' / (FILES[ch] + '.js')
    t = f.read_text(encoding='utf8')
    f.write_text(sub(t, 'res', table_js(ch)), encoding='utf8')
    f = ROOT / 'chapters' / (FILES[ch] + '.html')
    t = f.read_text(encoding='utf8')
    f.write_text(sub(t, 'refs', '\n'.join(refs_html(ch))), encoding='utf8')
f = ROOT / 'chapters' / '08-appendix.html'
t = f.read_text(encoding='utf8')
head, tr, head2, tr2 = appendix_html()
t = sub(t, 'list', '      <thead>' + head + '</thead>\n      <tbody>\n' + '\n'.join(tr) + '\n      </tbody>')
f.write_text(sub(t, 'list2', '      <thead>' + head2 + '</thead>\n      <tbody>\n' + '\n'.join(tr2) + '\n      </tbody>'), encoding='utf8')
EXTRA = {
    1: [('方針', '札の定義（無料・一部有料・登録が必要・記載なし・未確認／現行・改名・移転・保守終了・未確認）は、ページに書かれたことだけを表す', 'この講座の整理（利用者の指示）', 'ー', 'ー')],
    2: [('状態', 'Anthropic の公式ドキュメントは、Interactive Tutorial（GitHub）を案内し、「Claude 3 のモデル向けに書かれた。差があれば Prompting best practices を優先」と注記している', 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview', '公式ドキュメントを WebFetch', '○'),
        ('一般知識', '「あいまいな依頼と整えた依頼」の例は、この講座が作った架空の例。項目は Gemini ドキュメントの項目のうち 4 つ', 'この講座', 'ー', 'ー')],
    3: [('状態', 'Claude の公式記事が、Claude Academy（academy.claude.com）を学習の場として紹介している', 'https://claude.com/resources/articles/anthropics-approach-to-teaching-and-learning-ai', '公式記事を WebFetch', '○'),
        ('状態', 'Skilljar 上の講座一覧は「Anthropic Academy」の名前で 23 講座を載せている。一覧のページに料金の記載はない（個々の講座の登録ボタンは FREE）', 'https://anthropic.skilljar.com/', '一覧のページを WebFetch', '○')],
    5: [('状態', '2025 年 10 月の公式の発表（GitHub Discussions #7066、2025-10-02）は、AutoGen は保守を続け、重大なバグとセキュリティの修正は提供する、大きな新機能は足さない、と書いた。Microsoft のブログ（2025-10-01）は、両方の支援は続くが投資の中心は Agent Framework、と書いた', 'https://github.com/microsoft/autogen/discussions/7066', '発表を WebFetch', '○'),
        ('状態', '確認日の README は「アーカイブされ、Microsoft による積極的な保守は終了。バグ・セキュリティの修正、新機能、サポートは提供しない。新規は Microsoft Agent Framework から」。発表の時点から状態が変わったので、README の今の表示に合わせた。二次情報（Visual Studio Magazine、2026 年 4 月）の「引き続き保守」は、発表の時点の書き方', 'https://github.com/microsoft/autogen', 'README を WebFetch', '○'),
        ('状態', 'AutoGen からの移行ガイド（日本語版）が learn.microsoft.com にある（ページ表示の更新日 2026-09-29）', 'https://learn.microsoft.com/ja-jp/agent-framework/migration-guide/from-autogen', 'ページを WebFetch', '○')],
    7: [('リポジトリ', 'claude/settings.json に権限ルール（allow・ask・deny）と、8 つの場面（UserPromptSubmit・PreToolUse×2・PostToolUse・SessionStart・PreCompact・Stop・SessionEnd）のフックの設定がある', 'ttj-ai-ecosystem/claude/settings.json', 'ファイルを開いて確認', '○'),
        ('リポジトリ', 'claude/hooks/ に Python のフック 8 本（bash_guard・secret_guard・change_log・prompt_reminder・session_start・session_end・pre_compact・stop_notify）', 'ttj-ai-ecosystem/claude/hooks/', 'ls と docstring を確認', '○'),
        ('リポジトリ', 'claude/agents/ に 5 体（scout・checker・builder・reviewer・architect）。claude/skills/ に 7 本。claude/CLAUDE.md に共通の決まり', 'ttj-ai-ecosystem/claude/', 'ls とファイルの先頭を確認', '○'),
        ('リポジトリ', 'install.sh が claude/ 以下を ~/.claude/ にコピーする、との README の説明（install.sh の中身は未読）', 'ttj-ai-ecosystem/README.md', 'README を確認', '△')],
}


def facts_md(ch, title):
    rs = [r for r in R if r['ch'] == ch]
    rows, n = [], 0
    def add(kind, fact, src, route, prim):
        nonlocal n
        n += 1
        rows.append('| %d | %s | %s | %s | %s | %s | %s |' % (n, kind, fact.replace('|', '／'), src, route, prim, CHECK))
    for r in rs:
        unconf = r['status'] == '未確認'
        add('状態', '%s：状態の札「%s」。%s' % (r['name'], r['status'], r['note'] if not unconf else '未確認。' + r['note']), r['url'], r['route'], r['primary'])
        add('料金', '%s：料金の札「%s」' % (r['name'], r['price']) + ('（確かめていない）' if unconf else ''), r['url'], r['route'], r['primary'])
        add('前提', '%s：前提「%s」。日本語「%s」' % (r['name'], r['prereq'], r['ja']) + ('（未確認）' if unconf else ''), r['url'], r['route'], r['primary'])
    for kind, fact, src, route, prim in EXTRA.get(ch, []):
        add(kind, fact, src, route, prim)
    head = '# %s の事実確認表（確認 %s）\n\n教材の行は tools/gen.py が tools/resources.json から作る。一次：○ 提供元の公式ページ／△ 公式の別ページ・写し・案内のみ／× 二次情報のみ（その場合は「未確認」と書く）／ー 該当なし。\n\n| # | 区分 | 事実 | 出典 | 経路 | 一次 | 確認日 |\n|---|---|---|---|---|---|---|\n' % (title, CHECK)
    return head + '\n'.join(rows) + '\n'


for ch in range(1, 8):
    f = ROOT / 'facts' / (FILES[ch] + '.md')
    f.write_text(facts_md(ch, '第0%d章' % ch), encoding='utf8')
print('OK', len(R), '教材')
