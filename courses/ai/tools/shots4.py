#!/usr/bin/env python3
"""確認用の撮影：1366px・375px × ダーク・ライトで、入口の道筋の図、段階の章（第 02 章）、付録の一覧表を撮る。
外部リンクの target・rel と、375px の一覧表の枠内スクロールも確かめる。
使い方: python3 -I tools/shots4.py [--port 8861]"""
import functools, http.server, json, sys, threading
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT = Path(__file__).resolve().parent.parent
PORT = int(sys.argv[sys.argv.index('--port') + 1]) if '--port' in sys.argv else 8861
OUT = ROOT / 'shots'; OUT.mkdir(exist_ok=True)
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a, **k): pass
srv = http.server.ThreadingHTTPServer(('127.0.0.1', PORT), functools.partial(Q, directory=str(ROOT)))
threading.Thread(target=srv.serve_forever, daemon=True).start()
url = 'http://127.0.0.1:%d/out/index.html' % PORT
res = []
with sync_playwright() as p:
    b = p.chromium.launch()
    for w in (1366, 375):
        for theme in ('dark', 'light'):
            ctx = b.new_context(viewport={'width': w, 'height': 900})
            ctx.add_init_script("localStorage.setItem('ai.theme', JSON.stringify('%s'))" % theme)
            pg = ctx.new_page(); errs = []
            pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None); pg.on('pageerror', lambda e: errs.append(str(e)))
            pg.goto(url); pg.wait_for_timeout(500)
            pg.screenshot(path=str(OUT / ('%d-%s-home.png' % (w, theme))))
            pg.add_style_tag(content='.top{visibility:hidden}')
            # 入口の道筋の図（先頭の工程を押して、途中まで進めた状態）
            pg.evaluate('location.hash="#chI1"'); pg.wait_for_timeout(500)
            wg = pg.locator('[data-widget=flow]').first
            wg.scroll_into_view_if_needed()
            nxt = wg.get_by_role('button', name='次へ')
            for _ in range(4):
                if nxt.count(): nxt.first.click(); pg.wait_for_timeout(150)
            wg.screenshot(path=str(OUT / ('%d-%s-flow-entry.png' % (w, theme))))
            # 段階の章（第 02 章）の先頭と、教材の表（1 行を開いた状態）
            pg.evaluate('location.hash="#ch02"'); pg.wait_for_timeout(500)
            pg.screenshot(path=str(OUT / ('%d-%s-ch02-top.png' % (w, theme))))
            tb = pg.locator('#ch02 [data-widget=table], [data-widget=table][data-src=c02-res]').first
            tb.scroll_into_view_if_needed()
            row = tb.locator('tbody tr').first
            if row.count(): row.click(); pg.wait_for_timeout(200)
            tb.screenshot(path=str(OUT / ('%d-%s-ch02-table.png' % (w, theme))))
            # 付録の一覧表
            pg.evaluate('location.hash="#ch08"'); pg.wait_for_timeout(500)
            tw = pg.locator('#ch08 .tbl-wrap').first
            tw.scroll_into_view_if_needed()
            tw.screenshot(path=str(OUT / ('%d-%s-appendix-table.png' % (w, theme))))
            info = pg.evaluate('''() => { const t = document.querySelector('#ch08 .tbl-wrap'); const ex = [...document.querySelectorAll('a[href^="http"]')];
              return { wrapScroll: t.scrollWidth, wrapClient: t.clientWidth, overflowX: getComputedStyle(t).overflowX, docScroll: document.documentElement.scrollWidth, vw: innerWidth,
                       ext: ex.length, extBad: ex.filter(a => a.target !== '_blank' || !/noopener/.test(a.rel)).map(a => a.href) }; }''')
            info.update(w=w, theme=theme, errs=errs); res.append(info)
            ctx.close()
    b.close()
for r in res: print(json.dumps(r, ensure_ascii=False))
html = (ROOT / 'out' / 'index.html').read_text(encoding='utf-8')
print('作者名:', [n for n in ('\u30d3\u30c3\u30b0\u30de\u30a6\u30f3\u30c6\u30f3', '\u30c6\u30c4\u30e4', '\u3066\u3063\u3061') if n in html])   # 検査語は、ファイルに書かないようエスケープで書く
