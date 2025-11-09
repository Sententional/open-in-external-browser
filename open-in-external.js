/**
 * open-in-external.js
 * 
 * Lightweight client-side helper to open a webpage in the system browser
 * when loaded inside certain in-app browsers (Instagram, Messenger, Facebook, Twitter).
 *
 * Use responsibly — intended for improving UX in embedded browsers,
 * 
 * GitHub: https://github.com/Sententional/open-in-external-browser/
 * License: MIT
 */

(function () {
  var ua = navigator.userAgent || navigator.vendor || window.opera || '';

  // Helper: detect common in-app browsers by UA. Keep lightweight and conservative.
  function detectInAppBrowser(u) {
    if (/Instagram/i.test(u)) return 'instagram';
    if (/\bFB[\w_]+\/Messenger\b/i.test(u)) return 'messenger';
    if (/\bFB[\w_]+\//i.test(u)) return 'facebook';
    if (/Twitter/i.test(u)) return 'twitter';
    return null;
  }

  var browser = detectInAppBrowser(ua);
  if (!browser) return;

  // Allow opt-out by explicit query param (useful for testing and for preserving links).
  try {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('no_inapp_redirect') === '1') return;
  } catch (e) {}

  // Avoid repeating the redirect during the same session to prevent loops.
  try {
    if (sessionStorage.getItem('inapp_redirect_done') === '1') return;
    sessionStorage.setItem('inapp_redirect_done', '1');
  } catch (e) {}

  var originalUrl = window.location.href;
  var clean = originalUrl.replace(/^https?:\/\//i, '');
  var encoded = encodeURIComponent(originalUrl);

  var isAndroid = /Android/i.test(ua);
  var isIOS = /(iPhone|iPad|iPod)/i.test(ua);

  // small helper to restore original URL if redirect either fails or user chooses not to proceed
  function fallbackRestore(delayMs) {
    setTimeout(function () {
      var nua = navigator.userAgent || navigator.vendor || window.opera || '';
      if (detectInAppBrowser(nua) === browser) {
        try { window.location.replace(originalUrl); } catch (e) { window.location.href = originalUrl; }
      }
    }, delayMs);
  }

  if (isAndroid) {
    var intentUrl = 'intent://' + clean + '#Intent;scheme=https;S.browser_fallback_url=' + encoded + ';end;';
    try { window.location.replace(intentUrl); } catch (e) { window.location.href = intentUrl; }
    fallbackRestore(1200);
    return;
  }

  if (isIOS) {
    var iosUrl = 'x-safari-https://' + clean;
    try { window.location.replace(iosUrl); } catch (e) { window.location.href = iosUrl; }
    fallbackRestore(1200);
    return;
  }
})();
