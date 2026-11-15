/* TTJ Showcase 累計閲覧数カウンター（Cloudflare Worker + KV）の表示
 *
 * Worker（https://ttj-counter.ttj-tokyo.workers.dev）が数えた累計を、フッターに小さく出す。
 * 数が 100 を超えるまでは表示しない（公開直後の小さな数字を見せないため）。
 * 取得に失敗しても、ページの表示には影響しない。
 * localhost やファイルを直接開いたときは数えず、Do Not Track の閲覧者も数えない（analytics.js と同じ方針）。 */
(function () {
  'use strict';

  var ENDPOINT = 'https://ttj-counter.ttj-tokyo.workers.dev/';
  var SHOW_OVER = 100; // この数を超えたら表示する

  function dnt() {
    var v = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    return v === '1' || v === 'yes' || v === true;
  }

  function start() {
    if (!/^https?:$/.test(location.protocol)) return;
    if (/^(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0)$/.test(location.hostname)) return;
    if (dnt()) return;
    if (!window.fetch) return;
    fetch(ENDPOINT, { credentials: 'include' })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || typeof d.total !== 'number' || d.total <= SHOW_OVER) return;
        var el = document.querySelector('[data-view-counter]');
        if (!el) return;
        el.textContent = '累計の閲覧数: ' + d.total.toLocaleString('ja-JP');
        el.style.cssText = 'margin:.5em 0 0;font-size:.82em;line-height:1.6;opacity:.9';
        el.hidden = false;
      })
      .catch(function () { /* カウンターが止まってもページには影響しない */ });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
