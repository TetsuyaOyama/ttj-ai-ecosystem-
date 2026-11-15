#!/usr/bin/env python3
"""講座のスクリーンショットを撮る（確認用）。
  python3 -I /home/claude/courses/_framework/shots.py <講座ディレクトリ> [--out DIR] [--port N]
既定の出力先は <講座ディレクトリ>/shots/。ビルド済みの出力（course.json の out）を使う。
  1366-dark-<章>.png … 1366px・ダーク（各章の先頭）
  375-light-<章>.png … 375px・ライト（各章の先頭）
  new-<部品>-<幅>-<テーマ>.png … 新部品（flow / layers / xsec / route）だけの切り出し
"""
import argparse
import functools
import http.server
import json
import threading
from pathlib import Path


def main():
    ap = argparse.ArgumentParser(description='講座のスクリーンショットを撮る。')
    ap.add_argument('course_dir')
    ap.add_argument('--out')
    ap.add_argument('--port', type=int, default=8790)
    a = ap.parse_args()
    from playwright.sync_api import sync_playwright
    cdir = Path(a.course_dir).resolve()
    cfg = json.loads((cdir / 'course.json').read_text(encoding='utf-8'))
    out = Path(a.out) if a.out else cdir / 'shots'
    out.mkdir(parents=True, exist_ok=True)

    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *x, **k):
            pass
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', a.port), functools.partial(Quiet, directory=str(cdir)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    url = 'http://127.0.0.1:%d/%s' % (a.port, cfg['out'])
    try:
        with sync_playwright() as p:
            b = p.chromium.launch()
            for w, theme in ((1366, 'dark'), (375, 'light')):
                ctx = b.new_context(viewport={'width': w, 'height': 900})
                ctx.add_init_script("localStorage.setItem(%s, JSON.stringify('%s'))" % (json.dumps(cfg['prefix'] + 'theme'), theme))
                pg = ctx.new_page()
                pg.goto(url)
                pg.wait_for_timeout(400)
                chs = pg.evaluate('CN_CHAPTERS.filter(c=>c.ready).map(c=>c.num)')
                pg.screenshot(path=str(out / ('%d-%s-home.png' % (w, theme))))
                for n in chs:
                    pg.evaluate('location.hash="#ch%s"' % n)
                    pg.wait_for_timeout(350)
                    pg.screenshot(path=str(out / ('%d-%s-ch%s.png' % (w, theme, n))))
                    pg.screenshot(path=str(out / ('%d-%s-ch%s-full.png' % (w, theme, n))), full_page=True) if w == 375 else None
                pg.add_style_tag(content='.top{visibility:hidden}')
                for kind in ('flow', 'layers', 'xsec', 'route'):
                    host = pg.evaluate('(()=>{const e=document.querySelector("[data-widget=%s]"); const v=e&&e.closest(".view"); return v?v.id:null})()' % kind)
                    if not host:
                        continue
                    pg.evaluate('location.hash="#%s"' % host)
                    pg.wait_for_timeout(350)
                    wg = pg.locator('[data-widget=%s]' % kind).first
                    if kind == 'xsec' and wg.locator('input[type=range]').count():
                        wg.locator('input[type=range]').fill(wg.locator('input[type=range]').get_attribute('max'))
                    if kind == 'flow' and wg.get_by_role('button', name='次へ').count():
                        wg.get_by_role('button', name='次へ').click()
                        wg.get_by_role('button', name='次へ').click()
                    wg.screenshot(path=str(out / ('new-%s-%d-%s.png' % (kind, w, theme))))
                ctx.close()
            b.close()
    finally:
        srv.shutdown()
    print('保存:', out)


if __name__ == '__main__':
    main()
