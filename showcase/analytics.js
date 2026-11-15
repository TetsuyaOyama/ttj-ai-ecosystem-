/* TTJ Showcase アクセス解析の受け口（クッキーを使わず、個人を追跡しない型の 2 サービスに対応）
 *
 * いまは有効です（Cloudflare Web Analytics、2026-11-15 から）。下の CONFIG の service と id で決まります。
 * 両方を空にすると無効になり、このファイルは何もせず、外部への通信は 1 件も起きません。
 * 有効にする手順・確認の仕方・止め方は docs/analytics.md を見てください。
 *
 *   service: 'cloudflare'  → Cloudflare Web Analytics。id は beacon の token（英数字 32 文字）
 *   service: 'goatcounter' → GoatCounter。id はサイトのコード（https://<コード>.goatcounter.com の <コード>）
 *
 * Do Not Track を有効にしている閲覧者には、読み込みません。 */
(function () {
  'use strict';

  var CONFIG = {
    service: 'cloudflare',   // '' | 'cloudflare' | 'goatcounter'
    id: 'f552b99afe7047028a13eaf6be909627'         // 識別子（token またはサイトのコード）。空のままなら無効
  };

  var NOTE = 'このサイトは、クッキーを使わないアクセス解析で閲覧数を数えています。';
  var SERVICES = {
    cloudflare: {
      valid: /^[0-9a-fA-F]{32}$/,
      load: function (id) {
        // 公式の埋め込み（beacon.min.js と data-cf-beacon）。スクリプトで後から足すので、公式の案内どおり token は URL にも付ける
        var s = document.createElement('script');
        s.type = 'module';
        s.src = 'https://static.cloudflareinsights.com/beacon.min.js?token=' + encodeURIComponent(id);
        s.setAttribute('data-cf-beacon', JSON.stringify({ token: id }));
        document.head.appendChild(s);
      }
    },
    goatcounter: {
      valid: /^[a-z0-9][a-z0-9-]*[a-z0-9]$/i,
      load: function (id) {
        // 公式の埋め込み（count.js と data-goatcounter）
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://gc.zgo.at/count.js';
        s.setAttribute('data-goatcounter', 'https://' + id.toLowerCase() + '.goatcounter.com/count');
        document.head.appendChild(s);
      }
    }
  };

  function dnt() {
    var v = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    return v === '1' || v === 'yes' || v === true;
  }

  function showNote() {
    var el = document.querySelector('[data-analytics-note]');
    if (!el) {                         // 置き場所のないページでは、フッターの末尾に足す
      var f = document.querySelector('footer');
      if (!f) return;
      el = document.createElement('p');
      el.setAttribute('data-analytics-note', '');
      f.appendChild(el);
    }
    el.textContent = NOTE;
    el.style.cssText = 'margin:.5em 0 0;font-size:.82em;line-height:1.6;opacity:.9';
    el.hidden = false;
  }

  function start() {
    var svc = SERVICES[CONFIG.service];
    var id = String(CONFIG.id || '').trim();
    if (!svc || !id) return;                                   // 無効（既定）
    if (!/^https?:$/.test(location.protocol)) return;           // ファイルを直接開いたときは数えない
    if (/^(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0)$/.test(location.hostname)) return; // 手元の確認や検査では数えない（外部への通信もしない）
    if (dnt()) return;                                         // Do Not Track
    if (!svc.valid.test(id)) {
      if (window.console && console.warn) console.warn('analytics.js: id の形式が正しくありません（' + CONFIG.service + '）');
      return;
    }
    if (window.__ttjAnalytics) return;                          // 二重に読み込まない
    window.__ttjAnalytics = CONFIG.service;
    svc.load(id);
    showNote();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
