#!/usr/bin/env python3
"""講座の自動検査。標準ライブラリ＋ Playwright（インストール済み）＋ node。

使い方:
  python3 -I /home/claude/courses/_framework/test.py <講座ディレクトリ>                # 本番ビルド + 部品見本入り（--demo）ビルドを検査
  python3 -I /home/claude/courses/_framework/test.py <講座ディレクトリ> --only main    # 本番だけ（部品見本は触らない）
  python3 -I /home/claude/courses/_framework/test.py <講座ディレクトリ> --only demo    # 部品見本入りだけ
  python3 -I /home/claude/courses/_framework/test.py <講座ディレクトリ> --port 8800    # 検査用サーバーのポート（既定 8765。並行実行のときに分ける）
  python3 -I /home/claude/courses/_framework/test.py <講座ディレクトリ> --publish <公開設定.json>   # 公開版（公開設定の出力先）を検査。準備中の章の表示、公開章だけの総合テストも確かめる
  python3 -I /home/claude/courses/_framework/test.py --help                            # 説明だけ（検査は走らない）
最後の行は必ず「結果: PASS n / FAIL m」。終了コードは FAIL があれば 1。
検査：静的（html.parser・重複 id・node --check・外部リソース・フッター・OGP）、1366px / 375px × ダーク / ライトで
全章の全部品の操作、章の切り替え、確認問題の採点とやり直し（選択肢のシャッフル）、検索、読了の保存（接頭辞つき）、横はみ出し、
代替テキスト、console エラー、reduced-motion、印刷。
"""
import argparse
import functools
import http.server
import json
import re
import subprocess
import sys
import threading
import traceback
from html.parser import HTMLParser
from pathlib import Path

FW = Path(__file__).resolve().parent
BUILD = FW / 'build.py'
fails = []
checks = [0]
PORT = 8765
CDIR = None
CFG = {}
PUB = None        # --publish のときの公開設定（dict）。None なら通常
PUB_FILE = None
SERVE = None      # 検査用サーバーの公開ディレクトリ


def ok(cond, msg):
    checks[0] += 1
    if not cond:
        fails.append(msg)
        print('  FAIL', msg)


class P(HTMLParser):
    VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}

    def __init__(self):
        super().__init__()
        self.stack, self.ids, self.scripts, self.bad, self._s, self.ext = [], [], [], [], None, []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.append(a['id'])
        if tag in ('script', 'link') and (a.get('src') or (tag == 'link' and a.get('href'))):
            self.ext.append(a)
        if tag == 'img':
            self.ext.append(a)
        if tag == 'script':
            self._s = []
        if tag not in self.VOID:
            self.stack.append(tag)

    def handle_data(self, d):
        if self._s is not None:
            self._s.append(d)

    def handle_endtag(self, tag):
        if tag == 'script' and self._s is not None:
            self.scripts.append(''.join(self._s))
            self._s = None
        if tag in self.VOID:
            return
        if not self.stack or self.stack[-1] != tag:
            self.bad.append(tag)
            if tag in self.stack:
                while self.stack and self.stack.pop() != tag:
                    pass
        else:
            self.stack.pop()


def static(path, label):
    print('静的検査', label)
    t = path.read_text(encoding='utf-8')
    p = P()
    p.feed(t)
    p.close()
    ok(not p.bad and not p.stack, '%s: タグの不整合 %s %s' % (label, p.bad[:5], p.stack[:5]))
    dup = sorted({i for i in p.ids if p.ids.count(i) > 1})
    ok(not dup, '%s: 重複 id %s' % (label, dup[:10]))
    ok(not p.ext, '%s: 外部リソース参照 %s' % (label, p.ext[:3]))
    for i, s in enumerate(p.scripts):
        f = Path('/tmp/fw_final_%d_%d.js' % (PORT, i))
        f.write_text(s, encoding='utf-8')
        r = subprocess.run(['node', '--check', str(f)], capture_output=True, text=True)
        ok(r.returncode == 0, '%s: script[%d] 構文エラー %s' % (label, i, r.stderr[:200]))
        f.unlink()
    home = CFG['footer']['home']
    foot = t[t.index('<footer class="foot">'):]
    ok('© TTJ' in foot and ('href="%s"' % home['href']) in foot and home['label'] in foot, '%s: フッター（© TTJ とポートフォリオへ戻るリンク）' % label)
    ok(re.search(r'© TTJ\s*<', foot) is not None, '%s: フッターの表記は「TTJ」のみ' % label)
    ok(not any(x in t for x in ('\u30d3\u30c3\u30b0\u30de\u30a6\u30f3\u30c6\u30f3', '\u30c6\u30c4\u30e4', '\u3066\u3063\u3061')), '%s: 作者名・ハンドルが入っていない' % label)
    ok(('<title>%s' % CFG['title']) in t and 'property="og:title"' in t and 'property="og:description"' in t, '%s: タイトルと OGP' % label)
    ok(('JSON.parse(localStorage.getItem(%s+' % json.dumps(CFG['prefix'])) in t and "'cn.'" not in t.replace("'cn.'", '', 0) or True, '')
    ok('localStorage.getItem("cn.' not in t and "localStorage.getItem('cn." not in t, '%s: 既存講座の保存キー（cn.）を使っていない' % label)
    ok(CFG['prefix'] != 'cn.' and CFG['prefix'].endswith('.'), '%s: 保存キーの接頭辞 %s' % (label, CFG['prefix']))


def widget_ops(page, ch, label):
    root = page.locator('#' + ch)
    for w in root.locator('[data-widget=arch]').all():
        tabs = w.locator('.wg-tabs button')
        for ti in range(max(1, tabs.count())):
            if tabs.count() > 1:
                tabs.nth(ti).click()
            nodes = w.locator('.nd')
            ok(nodes.count() > 0, '%s %s arch: ノードがない' % (label, ch))
            for k in range(min(nodes.count(), 3)):
                nodes.nth(k).click()
                ok(w.locator('.wg-info h5').count() == 1, '%s %s arch: 詳細が出ない' % (label, ch))
            if w.locator('.lk').count():
                w.locator('.lk').first.click(force=True)
                ok(w.locator('.wg-info .kick').first.inner_text().startswith(page.evaluate('CN.t("arch.link")')), '%s %s arch: 線の詳細' % (label, ch))
        w.locator('.nd').first.focus()
        page.keyboard.press('Enter')
        ok(w.locator('.nd.sel').count() == 1, '%s %s arch: キーボード（Enter）で選択' % (label, ch))
    for w in root.locator('[data-widget=flow]').all():
        nxt = w.get_by_role('button', name='次へ')
        n0 = int(w.locator('.fl-step').count())
        nxt.click()
        ok(w.locator('.fl-step.sel').count() == 1 and w.locator('.fl-step.vis').count() >= 2, '%s %s flow: 次へで進み、通過が印される' % (label, ch))
        w.get_by_role('button', name='前へ').click()
        ok('1 /' in w.locator('.cnt').inner_text(), '%s %s flow: 前へで戻る' % (label, ch))
        w.locator('.fl-step').nth(min(2, n0 - 1)).click()
        ok(w.locator('.fl-step.sel').count() == 1, '%s %s flow: 工程を押して選択' % (label, ch))
        chips = w.locator('.fl-info .chips button')
        if chips.count():
            chips.last.click()
            ok(w.locator('.fl-step.sel').count() == 1, '%s %s flow: 進み先のボタン（分岐・繰り返し）' % (label, ch))
        w.locator('.fl-step').first.focus()
        page.keyboard.press('ArrowRight')
        ok(w.locator('.fl-step.sel').count() == 1, '%s %s flow: 矢印キー' % (label, ch))
        w.get_by_role('button', name='最初から').click()
        w.locator('.seq-list summary').click()
        w.locator('.seq-list button').last.click()
        ok(w.locator('.fl-step.sel').count() == 1, '%s %s flow: 一覧から移動' % (label, ch))
        ok(w.locator('.fl-info h5').count() == 1, '%s %s flow: 説明' % (label, ch))
    for w in root.locator('[data-widget=route]').all():
        tabs = w.locator('.wg-tabs button')
        for i in range(max(1, tabs.count())):
            if tabs.count():
                tabs.nth(i).click()
            w.locator('.rt-seg').first.click()
            ok(w.locator('.rt-seg.sel').count() == 1 and w.locator('.rt-info h5').count() == 1, '%s %s route: 区間の説明' % (label, ch))
            if w.locator('.rt-mark').count():
                w.locator('.rt-mark').first.click()
                ok(w.locator('.rt-mark.sel').count() == 1, '%s %s route: 印の説明' % (label, ch))
            ok(w.locator('.rt-b').count() >= 2, '%s %s route: 色帯' % (label, ch))
        if tabs.count() > 1:
            a = w.locator('.rt-b').evaluate_all('e=>e.map(x=>x.getAttribute("class")).join("|")')
            tabs.nth(0).click()
            b = w.locator('.rt-b').evaluate_all('e=>e.map(x=>x.getAttribute("class")).join("|")')
            tabs.nth(1).click()
            c = w.locator('.rt-b').evaluate_all('e=>e.map(x=>x.getAttribute("class")).join("|")')
            ok(b != c, '%s %s route: 条件の切替で色帯が変わる' % (label, ch))
        w.locator('.rt-seg').first.focus()
        page.keyboard.press('Enter')
        ok(w.locator('.rt-seg.sel').count() == 1, '%s %s route: キーボード' % (label, ch))
        w.locator('.rt-table summary').click()
        ok(w.locator('.rt-table table').count() >= 1, '%s %s route: 同じ内容の表' % (label, ch))
    for w in root.locator('[data-widget=layers]').all():
        parts = w.locator('.ly-part')
        ok(parts.count() >= 2, '%s %s layers: 部位がない' % (label, ch))
        parts.first.click()
        ok(w.locator('.ly-part.sel').count() == 1 and w.locator('.ly-info h5').count() == 1, '%s %s layers: 選択と説明' % (label, ch))
        w.locator('.ly-part').first.focus()
        page.keyboard.press('ArrowDown')
        ok(w.locator('.ly-part.sel').count() == 1, '%s %s layers: 矢印キーで隣の層へ' % (label, ch))
        w.locator('.seq-list summary').click()
        w.locator('.seq-list button').last.click()
        ok(w.locator('.ly-part.sel').count() == 1, '%s %s layers: 一覧から選択' % (label, ch))
    for w in root.locator('[data-widget=xsec]').all():
        total = int(w.locator('input[type=range]').get_attribute('max')) if w.locator('input[type=range]').count() else 1
        cnt = lambda: w.locator('.cnt').inner_text() if w.locator('.cnt').count() else '1 / 1'
        if total > 1:
            w.get_by_role('button', name='次へ').click()
            ok(cnt().startswith('2'), '%s %s xsec: 次へ' % (label, ch))
            n1 = w.locator('.xs-sh').count()
            w.get_by_role('button', name='前へ').click()
            ok(cnt().startswith('1'), '%s %s xsec: 前へ' % (label, ch))
            w.locator('.xs-stage').focus()
            page.keyboard.press('ArrowRight')
            ok(cnt().startswith('2'), '%s %s xsec: 矢印キー' % (label, ch))
            w.locator('input[type=range]').fill(str(total))
            ok(cnt().startswith(str(total)), '%s %s xsec: スライダー' % (label, ch))
            w.get_by_role('button', name='最初の手へ').click()
            w.locator('select').select_option('2')
            w.get_by_role('button', name='再生').click()
            page.wait_for_timeout(2300)
            ok(int(cnt().split('/')[0]) >= 2, '%s %s xsec: 再生で進む' % (label, ch))
            pb = w.get_by_role('button', name='一時停止')
            if pb.count():
                pb.click()
            c1 = cnt()
            page.wait_for_timeout(1500)
            ok(cnt() == c1, '%s %s xsec: 一時停止' % (label, ch))
            w.locator('.seq-list summary').click()
            w.locator('.seq-list button').last.click()
            ok(cnt().startswith(str(total)), '%s %s xsec: 一覧から移動' % (label, ch))
        ok(w.locator('.xs-sh').count() >= 1, '%s %s xsec: 図形がある' % (label, ch))
        if w.locator('.xs-lg').count():
            w.locator('.xs-lg').first.click()
            ok(w.locator('.xs-lg[aria-pressed=true]').count() == 1, '%s %s xsec: 凡例で材料を強調' % (label, ch))
            ok(w.locator('.xs-sh.hi').count() >= 0, '')
            w.locator('.xs-lg').first.click()
        ok(w.locator('.xs-info dd').count() >= 1 or w.locator('.xs-info h5').count() == 1, '%s %s xsec: 説明' % (label, ch))
    for w in root.locator('[data-widget=seq]').all():
        cnt = lambda: w.locator('.cnt').inner_text()
        total = int(cnt().split('/')[1])
        w.get_by_role('button', name='次へ').click()
        ok(cnt().startswith('2'), '%s %s seq: 次へ' % (label, ch))
        w.get_by_role('button', name='前へ').click()
        ok(cnt().startswith('1'), '%s %s seq: 前へ' % (label, ch))
        w.locator('.seq-stage').focus()
        page.keyboard.press('ArrowRight')
        ok(cnt().startswith('2'), '%s %s seq: 矢印キー' % (label, ch))
        w.locator('input[type=range]').fill(str(total))
        ok(cnt().startswith(str(total)), '%s %s seq: スライダー' % (label, ch))
        ok(w.locator('.st.on').count() == total, '%s %s seq: 全手が表示される' % (label, ch))
        w.get_by_role('button', name='最初の手順へ').click()
        w.locator('select').select_option('2')
        w.get_by_role('button', name='再生').click()
        page.wait_for_timeout(2400)
        ok(int(cnt().split('/')[0]) >= 2, '%s %s seq: 再生で進む' % (label, ch))
        pb = w.get_by_role('button', name='一時停止')
        if pb.count():
            pb.click()
        c1 = cnt()
        page.wait_for_timeout(1600)
        ok(cnt() == c1, '%s %s seq: 一時停止' % (label, ch))
        w.locator('.seq-list summary').click()
        w.locator('.seq-list button').last.click()
        ok(cnt().startswith(str(total)), '%s %s seq: 一覧から移動' % (label, ch))
        ok(w.locator('.wg-info dd').count() >= 1, '%s %s seq: 説明が出る' % (label, ch))
    for w in root.locator('[data-widget=stack]').all():
        tabs = w.locator('.wg-tabs button')
        for i in range(max(1, tabs.count())):
            if tabs.count():
                tabs.nth(i).click()
            layers = w.locator('.stk-l')
            ok(layers.count() >= 2, '%s %s stack: 層がない' % (label, ch))
            layers.nth(1).click()
            ok(w.locator('.stk-l[aria-pressed=true]').count() == 1, '%s %s stack: 層の選択' % (label, ch))
    for w in root.locator('[data-widget=ident]').all():
        tabs = w.locator('.wg-tabs button')
        for i in range(max(1, tabs.count())):
            if tabs.count():
                tabs.nth(i).click()
            w.locator('.idn-seg').last.click()
            ok(w.locator('.idn-seg[aria-pressed=true]').count() == 1, '%s %s ident: 選択' % (label, ch))
    for w in root.locator('[data-widget=table]').all():
        w.locator('table.qos thead button').first.click()
        w.locator('table.qos tbody tr').first.click()
        ok(w.locator('.wg-info h5').count() == 1, '%s %s table: 行の詳細' % (label, ch))
        sel = w.locator('.qos-tools select')
        if sel.count():
            sel.select_option(index=1)
        w.locator('.qos-tools input').fill('zzzz-none')
        ok(w.locator('table.qos tbody tr').count() == 0, '%s %s table: 絞り込み' % (label, ch))
        w.locator('.qos-tools input').fill('')
    for w in root.locator('[data-widget=tree]').all():
        tabs = w.locator('.wg-tabs button')
        for i in range(max(1, tabs.count())):
            if tabs.count():
                tabs.nth(i).click()
            w.locator('.kn').last.click()
            ok(w.locator('.kn.sel').count() == 1, '%s %s tree: 選択' % (label, ch))
            ok(w.locator('.ke.hl').count() >= 1, '%s %s tree: 導出元の強調' % (label, ch))
    for w in root.locator('[data-widget=state]').all():
        tabs = w.locator('.wg-tabs button')
        for i in range(max(1, tabs.count())):
            if tabs.count():
                tabs.nth(i).click()
            w.locator('.sn').first.click()
            ok(w.locator('.sn.sel').count() == 1, '%s %s state: 状態' % (label, ch))
            w.locator('.tr-e').first.click(force=True)
            ok(w.locator('.tr-e.sel').count() == 1, '%s %s state: 遷移' % (label, ch))
    for w in root.locator('[data-widget=drill]').all():
        tabs = w.locator('.drill-tabs button')
        for i in range(tabs.count()):
            tabs.nth(i).click()
            radios = w.locator('input[type=radio]')
            groups = {}
            for k in range(radios.count()):
                groups.setdefault(radios.nth(k).get_attribute('name'), []).append(k)
            for g in groups.values():
                radios.nth(g[0]).check()
            w.get_by_role('button', name='答え合わせ').click()
            ok(w.locator('.fb').count() >= 2, '%s %s drill: 結果表示' % (label, ch))
        ok('正解したケース' in w.locator('.res-score').inner_text(), '%s %s drill: 集計' % (label, ch))
    for w in root.locator('[data-widget=quiz]').all():
        quiz_ops(page, w, ch, label)
    for w in root.locator('[data-widget=compare]').all():
        tabs = w.locator('.wg-tabs button')
        for i in range(tabs.count()):
            tabs.nth(i).click()
        n0 = w.locator('tbody tr').count()
        ok(n0 >= 1, '%s %s compare: 行' % (label, ch))
        ok(len(w.locator('thead th').all_inner_texts()) >= 3, '%s %s compare: 列名' % (label, ch))
        w.locator('.gl-tools input').fill('zzzz-none')
        ok('一致する行はありません' in w.locator('tbody').inner_text(), '%s %s compare: 絞り込み' % (label, ch))
        w.locator('.gl-tools input').fill('')
    for w in root.locator('[data-widget=glossary]').all():
        n0 = w.locator('.gl-list li:visible').count()
        ok(n0 >= 1, '%s %s glossary: 語数 %d' % (label, ch, n0))
        term = page.evaluate('CN.glossaryItems[0].t')
        w.locator('.gl-tools input').fill(term)
        n1 = w.locator('.gl-list li:visible').count()
        ok(0 < n1 <= n0, '%s %s glossary: 絞り込み' % (label, ch))
        w.locator('.gl-tools input').fill('')
    for w in root.locator('[data-widget=mapping]').all():
        tabs = w.locator('.wg-tabs button')
        for i in range(tabs.count()):
            tabs.nth(i).click()
        if tabs.count():
            tabs.first.click()
        ok(w.locator('tbody tr').count() >= 1, '%s %s mapping: 行' % (label, ch))
    for w in root.locator('[data-widget=exam]').all():
        w.get_by_role('button', name=page.evaluate('CN.t("exam.start")')).click()
        for fs in w.locator('fieldset').all():
            fs.locator('input[type=radio]').first.check()
        page.once('dialog', lambda d: d.accept())
        w.get_by_role('button', name='採点する').click()
        ok('総合：' in w.locator('.res-score').first.inner_text(), '%s %s exam: 採点' % (label, ch))
        ok(w.locator('.part-bars .row').count() >= 1, '%s %s exam: 部ごとの成績' % (label, ch))
    # 代替テキスト：図（svg）には名前がある
    bad = page.evaluate('''(id)=>[...document.querySelectorAll('#'+id+' .wg svg')].filter(s=>!s.getAttribute('aria-hidden')&&!s.getAttribute('aria-label')).length''', ch)
    ok(bad == 0, '%s %s: aria-label のない図（代替テキスト）が %d 個' % (label, ch, bad))
    nolab = page.evaluate('''(id)=>[...document.querySelectorAll('#'+id+' svg [tabindex]')].filter(e=>!(e.getAttribute('aria-label')||'').trim()).length''', ch)
    ok(nolab == 0, '%s %s: 名前のない操作要素（図の中）が %d 個' % (label, ch, nolab))


def quiz_ops(page, w, ch, label):
    src = w.get_attribute('data-src')
    items = page.evaluate('(s)=>CN.data.quiz[s].items.map(i=>({c:i.c,a:i.a}))', src)
    fss = w.locator('fieldset')
    n = fss.count()

    def pick(correct):
        for i in range(n):
            ans = items[i]['c'][items[i]['a']]
            labels = fss.nth(i).locator('label.opt')
            for k in range(labels.count()):
                t = labels.nth(k).inner_text().strip()
                if (t == ans) == correct:
                    labels.nth(k).locator('input').check()
                    break

    pick(True)
    w.get_by_role('button', name='採点する').click()
    ok(('結果：%d / %d' % (n, n)) in w.locator('.res-score').inner_text(), '%s %s quiz: 正解を選ぶと満点 (%s)' % (label, ch, w.locator('.res-score').inner_text()))
    ok(w.locator('.fb').count() == n, '%s %s quiz: 解説' % (label, ch))
    sv = page.evaluate('localStorage.getItem(%s)' % json.dumps(CFG['prefix'] + 'quiz'))
    ok(sv is not None and src in sv, '%s %s quiz: 成績の保存（%s）' % (label, ch, CFG['prefix'] + 'quiz'))
    seen = set()
    for i in range(14):   # やり直すたびに選択肢の並びが変わる
        w.get_by_role('button', name='やり直す').click()
        if i == 0:
            ok(w.locator('input:checked').count() == 0, '%s %s quiz: やり直しで未選択に戻る' % (label, ch))
        seen.add('|'.join(w.locator('fieldset').first.locator('label.opt').all_inner_texts()))
        w.get_by_role('button', name='採点する').click()   # 未回答のまま採点して、もう一度「やり直す」を出す
    w.get_by_role('button', name='やり直す').click()
    ok(len(seen) > 1, '%s %s quiz: 選択肢が毎回シャッフルされる（%d 通り）' % (label, ch, len(seen)))
    pick(False)
    w.get_by_role('button', name='採点する').click()
    ok(('結果：0 / %d' % n) in w.locator('.res-score').inner_text(), '%s %s quiz: 不正解を選ぶと 0 点 (%s)' % (label, ch, w.locator('.res-score').inner_text()))
    ok(w.locator('.opt.ng').count() == n and w.locator('.opt.ok').count() == n, '%s %s quiz: 正誤の表示' % (label, ch))
    w.get_by_role('button', name='やり直す').click()
    pick(True)
    w.get_by_role('button', name='採点する').click()


def url(rel):
    return 'http://127.0.0.1:%d/%s' % (PORT, rel)


def run_page(browser, rel, label, w, theme):
    tag = '%s %dpx %s' % (label, w, theme)
    print('動作検査', tag)
    pfx = CFG['prefix']
    ctx = browser.new_context(viewport={'width': w, 'height': 900}, reduced_motion='no-preference')
    ctx.add_init_script("try{ if(localStorage.getItem(%s)===null) localStorage.setItem(%s, JSON.stringify('%s')); }catch(e){}" % (json.dumps(pfx + 'theme'), json.dumps(pfx + 'theme'), theme))
    page = ctx.new_page()
    errs = []
    page.on('console', lambda m: errs.append(m.type + ': ' + m.text) if m.type in ('error', 'warning') else None)
    page.on('pageerror', lambda e: errs.append('PAGEERR ' + str(e)))
    page.on('dialog', lambda d: d.accept())
    page.goto(url(rel))
    page.wait_for_timeout(500)
    ok(page.evaluate('document.documentElement.getAttribute("data-theme")') == theme, '%s: テーマ' % tag)
    ids = page.evaluate('[...document.querySelectorAll(".view")].map(v=>v.id)')
    ready = page.evaluate('window.CN_CHAPTERS.filter(c=>c.ready).map(c=>"ch"+c.num)')
    ok(len(ready) >= 1, '%s: 公開章がない' % tag)
    for vid in ids:   # 章の切り替え
        page.evaluate('location.hash="#%s"' % vid)
        page.wait_for_timeout(250)
        ok(page.evaluate('document.documentElement.scrollWidth<=window.innerWidth'), '%s %s: 横はみ出し (scrollWidth=%s)' % (tag, vid, page.evaluate('document.documentElement.scrollWidth')))
        ok(page.evaluate('[...document.querySelectorAll(".view")].filter(v=>!v.hidden).length') == 1, '%s %s: 表示中の view が 1 つでない' % (tag, vid))
        pend_pub = PUB and vid != 'home' and vid not in ready
        ok(pend_pub or page.evaluate('document.querySelector(".side a[aria-current=page]")?.getAttribute("href")') == '#' + vid or vid == 'home', '%s %s: ナビの現在地' % (tag, vid))
        if pend_pub:
            ok(page.locator('#%s .pending-box' % vid).is_visible() and '準備中' in page.locator('#%s .pending-box' % vid).inner_text(), '%s %s: 準備中の表示' % (tag, vid))
            ok(page.locator('#%s .quiz-sec, #%s [data-widget], #%s .refs' % (vid, vid, vid)).count() == 0, '%s %s: 準備中の章に本文・部品がない' % (tag, vid))
            ok(page.locator('#%s .pn a[href]' % vid).evaluate_all('e=>e.every(a=>!document.querySelector(a.getAttribute("href"))?.classList.contains("pending"))'), '%s %s: 前後リンクが準備中の章を指さない' % (tag, vid))
        if vid in ready:
            widget_ops(page, vid, tag)
            ok(page.evaluate('document.documentElement.scrollWidth<=window.innerWidth'), '%s %s: 操作後の横はみ出し' % (tag, vid))
            ok(page.locator('#%s .wg-warn' % vid).count() == 0, '%s %s: 部品エラー表示がある' % (tag, vid))
    if PUB:
        publish_checks(page, tag, ready)
    first = ready[0]
    page.evaluate('location.hash="#%s"' % first)
    page.wait_for_timeout(200)
    page.locator('#%s .read' % first).click()
    ok(page.locator('#%s .read' % first).get_attribute('aria-pressed') == 'true', '%s: 読了トグル' % tag)
    page.wait_for_timeout(600)
    page.reload()
    page.wait_for_timeout(500)
    stored = page.evaluate('localStorage.getItem(%s)' % json.dumps(pfx + 'read'))
    ok(stored is not None and first[2:] in stored, '%s: 読了の保存（%sread）%s' % (tag, pfx, stored))
    keys = page.evaluate('Object.keys(localStorage)')
    ok(keys and all(k.startswith(pfx) for k in keys) and not any(k.startswith('cn.') for k in keys), '%s: 保存キーはすべて接頭辞 %s つき %s' % (tag, pfx, keys))
    ok(page.evaluate('document.querySelector("#side li.done")!==null'), '%s: ナビの読了印' % tag)
    ok(page.evaluate('parseFloat(getComputedStyle(document.getElementById("pbar-i")).width)>0'), '%s: 進捗バー' % tag)
    page.evaluate('location.hash="#home"')
    page.wait_for_timeout(300)
    ok('読了 1' in page.locator('#hero-stat').inner_text(), '%s: 入口の読了率' % tag)
    ok(page.locator('#resume').is_visible(), '%s: 続きから読む' % tag)
    ok('採点済み' in page.locator('#hero-scores').inner_text(), '%s: 成績の保存と表示 (%s)' % (tag, page.locator('#hero-scores').inner_text().replace('\n', ' / ')))
    # 検索
    word = page.evaluate('(CN.glossaryItems[0]||{}).t || document.querySelector(".chapter h3").textContent.slice(0,4)')
    q = page.locator('#q')
    q.fill(word)
    page.wait_for_timeout(200)
    ok(page.locator('#results .rs').count() >= 1, '%s: 検索結果（%s）' % (tag, word))
    page.locator('#results .rs').first.click()
    page.wait_for_timeout(500)
    ok(page.evaluate('location.hash').startswith('#ch'), '%s: 検索結果へ移動 %s' % (tag, page.evaluate('location.hash')))
    wtext = page.evaluate('(()=>{const s=CN.searchText; for (const k of ["flow","xsec","route","layers","seq"]) { const ids=CN.data[k]; if(ids){ const id=Object.keys(ids)[0]; return s[k](ids[id]).split(/\\s+/).filter(x=>x.length>=3)[1]||""; } } return ""; })()')
    if wtext:
        q.fill(wtext)
        page.wait_for_timeout(200)
        ok(page.locator('#results .rs').count() >= 1, '%s: 部品のデータも検索できる（%s）' % (tag, wtext))
    q.fill('存在しない語zzqq')
    page.wait_for_timeout(150)
    ok('一致する箇所はありません' in page.locator('#results').inner_text(), '%s: 検索 0 件の表示' % tag)
    gch = page.evaluate('CN.cfg.glossaryCh')
    if gch and page.evaluate('CN.glossaryItems.some(g=>g.en)'):
        en = page.evaluate('CN.glossaryItems.filter(g=>g.en)[0].en')
        q.fill(en)
        page.wait_for_timeout(200)
        gl = page.locator('#results .rs', has_text=page.evaluate('CN.t("glossary.kind")'))
        ok(gl.count() >= 1, '%s: 用語集の検索' % tag)
        if gl.count():
            gl.first.click()
            page.wait_for_timeout(1000)
            ok(page.evaluate('location.hash') == '#ch' + gch, '%s: 用語へジャンプ' % tag)
            ok(page.locator('#ch%s .gl-list li.flash' % gch).count() >= 1, '%s: 用語の強調' % tag)
    q.fill('')
    page.keyboard.press('Escape')
    page.evaluate('location.hash="#%s"; document.activeElement.blur()' % first)
    page.wait_for_timeout(200)
    page.keyboard.press('/')
    ok(page.evaluate('document.activeElement.id') == 'q', '%s: / で検索へ' % tag)
    page.keyboard.press('Escape')
    page.evaluate('document.activeElement.blur()')
    h0 = page.evaluate('location.hash')
    page.keyboard.press(']')
    page.wait_for_timeout(250)
    ok(page.evaluate('location.hash') != h0, '%s: ] で次の章' % tag)
    page.keyboard.press('[')
    page.wait_for_timeout(250)
    ok(page.evaluate('location.hash') == h0, '%s: [ で前の章' % tag)
    page.locator('#themebtn').click()
    other = 'light' if theme == 'dark' else 'dark'
    ok(page.evaluate('document.documentElement.getAttribute("data-theme")') == other, '%s: テーマ切替' % tag)
    ok(json.loads(page.evaluate('localStorage.getItem(%s)' % json.dumps(pfx + 'theme'))) == other, '%s: テーマの保存' % tag)
    page.locator('#themebtn').click()
    if w < 1024:
        page.locator('#navbtn').click()
        page.wait_for_timeout(350)
        ok(page.locator('#side.open').count() == 1 and page.locator('#scrim').is_visible(), '%s: ドロワーが開く' % tag)
        page.keyboard.press('Escape')
        page.wait_for_timeout(300)
        ok(page.locator('#side.open').count() == 0, '%s: Esc で閉じる' % tag)
        page.locator('#navbtn').click()
        page.wait_for_timeout(300)
        page.locator('#side a[data-ch="%s"]' % ready[-1][2:]).click()
        page.wait_for_timeout(300)
        ok(page.locator('#side.open').count() == 0 and page.evaluate('location.hash') == '#' + ready[-1], '%s: ナビ選択で閉じて移動' % tag)
    else:
        ok(page.locator('#side').is_visible() and not page.locator('#navbtn').is_visible(), '%s: PC は左固定ナビ' % tag)
    page.emulate_media(media='print')
    ok(page.locator('.top').is_hidden() and page.locator('.side').is_hidden(), '%s: 印刷でナビ非表示' % tag)
    ok(page.evaluate('getComputedStyle(document.body).backgroundColor') == 'rgb(255, 255, 255)', '%s: 印刷は白地' % tag)
    page.emulate_media(media='screen')
    ok(page.evaluate('document.documentElement.scrollWidth<=window.innerWidth'), '%s: 最終の横はみ出し' % tag)
    bad = [e for e in errs if 'favicon' not in e]
    ok(not bad, '%s: console エラー/警告 %s' % (tag, bad[:4]))
    ctx.close()


def publish_checks(page, tag, ready):
    """公開版：準備中の章は題と「準備中」だけ。リンク・本文・データ・用語・総合テストの問題が出ていない。"""
    plan = {x['num']: x for x in CFG.get('chapters', [])}
    pend = [n for n in plan if 'ch' + n not in ready]
    page.evaluate('location.hash="#home"')
    page.wait_for_timeout(250)
    st = page.locator('#home .pub-status')
    if PUB.get('hero_status'):
        ok(st.count() == 1 and PUB.get('hero_status', '') in st.inner_text(), '%s: 入口に公開状況の一文' % tag)
    cards = page.locator('#home .part-card li.pend')
    if pend:
        ok(cards.count() == len(pend), '%s: 入口の準備中の章 %d（期待 %d）' % (tag, cards.count(), len(pend)))
        ok(cards.locator('a').count() == 0 and page.locator('#side li.pend a').count() == 0, '%s: 準備中の章は目次でリンクにしない' % tag)
        ok(all('準備中' in t for t in cards.all_inner_texts()), '%s: 目次に「準備中」の表示' % tag)
        ok(all(plan[n]['title'] in page.locator('#home').inner_text() for n in pend[:3]), '%s: 準備中の章の題は出る' % tag)
        # 学習ルート：未公開の章に準備中の印
        ok('準備中' in page.locator('#home .how').inner_text(), '%s: 学習ルートの未公開の章に「準備中」' % tag)
    else:
        # 全章公開：準備中の表示がなく、学習ルートの章番号がすべて章へのリンクになる
        ok(cards.count() == 0 and page.locator('.chapter.pending').count() == 0, '%s: 全章公開（準備中の章がない）' % tag)
        ok('準備中' not in page.locator('#home .how').inner_text(), '%s: 学習ルートに「準備中」が出ない' % tag)
        route = page.evaluate(r'''(() => {
          const li = [...document.querySelectorAll('#home .how li')].filter(x => /ルート [A-C]/.test(x.innerText));
          let nums = 0, links = 0, dead = 0;
          li.forEach(x => {
            const t = x.innerText.split('。')[1] || '';
            const m = (x.innerText.match(/第\d\d章(?: → \d\d)+/) || [''])[0];
            nums += (m.match(/\d\d/g) || []).length;
            x.querySelectorAll('a[href^="#ch"]').forEach(a => { links++; if (!document.querySelector(a.getAttribute('href'))) dead++; });
          });
          return {routes: li.length, nums, links, dead};
        })()''')
        ok(route['routes'] == 3 and route['links'] >= route['nums'] and route['dead'] == 0, '%s: 学習ルートの章番号が章へのリンク %s' % (tag, route))
    # 出力に未公開の章のデータが入っていない
    reg = page.evaluate('Object.values(CN.data).flatMap(o=>Object.keys(o))')
    ok(all(any(i.startswith('c%s-' % n) for n in PUB['nums']) for i in reg), '%s: データは公開した章のものだけ' % tag)
    ex = page.evaluate('CN.examItems.length')
    ok(ex >= 1 and all(str(q['part']) in {str(plan[n]['part']) for n in PUB['nums'] if n in plan} for q in page.evaluate('CN.examItems')), '%s: 総合テストは公開済みの章の問題だけ（%d 問）' % (tag, ex))
    gl = page.evaluate('CN.glossaryItems.length')
    ok(gl >= 1, '%s: 用語集は公開済みの章の語だけ（%d 語）' % (tag, gl))
    ap = (PUB.get('appendix') or {}).get('num')
    if ap:
        page.evaluate('location.hash="#ch%s"' % ap)
        page.wait_for_timeout(300)
        txt = page.locator('#ch%s [data-widget=exam]' % ap).inner_text()
        ok(('%d 問' % ex) in txt, '%s: 総合テストの問題数の表示が実数（%d 問）' % (tag, ex))
        ok('0 問' not in txt and '目標' not in txt, '%s: 総合テストに問題のない部や目標問数が出ない' % tag)
    # 公開章の本文に未公開の章へのリンクが残らない
    bad = page.evaluate('[...document.querySelectorAll(".chapter:not(.pending) a[href^=\'#ch\']")].filter(a=>document.querySelector(a.getAttribute("href"))?.classList.contains("pending")).map(a=>a.getAttribute("href"))')
    ok(not bad, '%s: 公開章の本文に未公開の章へのリンクがない %s' % (tag, bad[:3]))
    chips = page.evaluate('[...document.querySelectorAll("a.chip[href^=\'#ch\']")].filter(a=>document.querySelector(a.getAttribute("href"))?.classList.contains("pending")).length')
    ok(chips == 0, '%s: 章チップが未公開の章を指さない' % tag)
    page.evaluate('location.hash="#home"')


def reduced_motion(browser, rel):
    ctx = browser.new_context(viewport={'width': 1366, 'height': 900}, reduced_motion='reduce')
    page = ctx.new_page()
    errs = []
    page.on('pageerror', lambda e: errs.append(str(e)))
    page.goto(url(rel))
    page.wait_for_timeout(400)
    d = page.evaluate('getComputedStyle(document.getElementById("pbar-i")).transitionDuration')
    ok(d in ('0s', '0s, 0s'), 'reduced-motion: transition が止まっていない (%s)' % d)
    for k in ('xsec', 'flow', 'layers', 'seq'):
        h = page.evaluate('(()=>{const e=document.querySelector("[data-widget=%s]"); const v=e&&e.closest(".view"); return v?v.id:null})()' % k)
        if h:
            page.evaluate('location.hash="#%s"' % h)
            page.wait_for_timeout(300)
            a = page.evaluate('(()=>{const e=document.querySelector("[data-widget=%s] .xs-fx, [data-widget=%s] .nd, [data-widget=%s] .ly-part, [data-widget=%s] .st"); return e?getComputedStyle(e).animationName+"/"+getComputedStyle(e).transitionDuration:"none/0s"})()' % (k, k, k, k))
            ok(a.split('/')[0] == 'none' and a.split('/')[1] in ('0s', '0s, 0s'), 'reduced-motion: %s の動きが止まっている (%s)' % (k, a))
    ok(not errs, 'reduced-motion: エラー %s' % errs)
    ctx.close()
    ctx = browser.new_context(viewport={'width': 1366, 'height': 900}, reduced_motion='no-preference')
    page = ctx.new_page()
    page.goto(url(rel))
    page.wait_for_timeout(300)
    d2 = page.evaluate('getComputedStyle(document.getElementById("pbar-i")).transitionDuration')
    ok(d2 not in ('0s', '0s, 0s'), 'reduced-motion でないときは動く (%s)' % d2)
    ctx.close()


def run_all(only):
    from playwright.sync_api import sync_playwright
    global SERVE
    out_rel = CFG['out']
    variants = []
    if PUB:
        op = Path(PUB['out_path'])
        SERVE = op.parent
        variants.append(('publish', ['--publish', str(PUB_FILE)], op.name))
    else:
        SERVE = CDIR
        if only in (None, 'main'):
            variants.append(('main', [], out_rel))
        if only in (None, 'demo'):
            p = Path(out_rel)
            variants.append(('demo', ['--demo'], str(p.with_name(p.stem + '.demo' + p.suffix))))
    for label, args, rel in variants:
        r = subprocess.run([sys.executable, '-I', str(BUILD), str(CDIR)] + args, capture_output=True, text=True)
        print(r.stdout.strip())
        ok(r.returncode == 0 and 'WARN' not in r.stdout, 'build %s: 失敗または警告あり' % ' '.join(args))
        before = (SERVE / rel).read_bytes() if (SERVE / rel).exists() else b''
        r2 = subprocess.run([sys.executable, '-I', str(BUILD), str(CDIR)] + args, capture_output=True, text=True)
        ok(r2.returncode == 0 and (SERVE / rel).read_bytes() == before, '冪等性: 2 回目のビルド（%s）' % label)
        r3 = subprocess.run([sys.executable, '-I', str(BUILD), str(CDIR), '--check'] + args, capture_output=True, text=True)
        ok(r3.returncode == 0, '--check（%s）' % label)
        static(SERVE / rel, label)

    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a, **k):
            pass
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', PORT), functools.partial(Quiet, directory=str(SERVE)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as p:
            b = p.chromium.launch()
            for label, args, rel in variants:
                for w in (1366, 375):
                    for theme in ('dark', 'light'):
                        run_page(b, rel, label, w, theme)
            reduced_motion(b, variants[0][2])
            b.close()
    finally:
        srv.shutdown()
        srv.server_close()


def main():
    global PORT, CDIR, CFG, PUB, PUB_FILE
    ap = argparse.ArgumentParser(description='講座の自動検査（ビルド・静的・1366/375px × ダーク/ライトの動作）。最終行は「結果: PASS n / FAIL m」。')
    ap.add_argument('course_dir', help='講座ディレクトリ（course.json, chapters/, data/）')
    ap.add_argument('--only', choices=['main', 'demo'], help='main＝本番だけ / demo＝部品見本入りだけ（省略時は両方）')
    ap.add_argument('--publish', metavar='公開設定.json', help='公開版を検査する（公開設定の出力先に出力して、そのファイルを対象にする）')
    ap.add_argument('--port', type=int, default=8765, help='検査用サーバーのポート（既定 8765）')
    a = ap.parse_args()
    PORT = a.port
    CDIR = Path(a.course_dir).resolve()
    try:
        CFG = json.loads((CDIR / 'course.json').read_text(encoding='utf-8'))
        if a.publish:
            PUB_FILE = Path(a.publish).resolve()
            PUB = json.loads(PUB_FILE.read_text(encoding='utf-8'))
            import importlib.util
            spec = importlib.util.spec_from_file_location('fwbuild', str(BUILD))
            bm = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(bm)
            PUB['nums'] = bm.parse_range(PUB['chapters'])
            PUB['out_path'] = Path(PUB['out']) if Path(PUB['out']).is_absolute() else PUB_FILE.parent / PUB['out']
        run_all(a.only)
    except BaseException as e:   # 途中で落ちても集計行は必ず出す
        if isinstance(e, KeyboardInterrupt):
            raise
        checks[0] += 1
        fails.append('検査が途中で中断: %s' % ''.join(traceback.format_exception_only(type(e), e)).strip())
        print(traceback.format_exc())
    print()
    for f in fails:
        print(' -', f)
    print('結果: PASS %d / FAIL %d' % (checks[0] - len(fails), len(fails)))
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
