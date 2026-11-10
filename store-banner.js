// Shows a "get the app" bar on phones. iOS Safari uses Apple's native
// Smart App Banner (meta tag), so this bar covers Android and other iOS browsers.
(function () {
  var APP_STORE = 'https://apps.apple.com/app/id6824039129';
  var PLAY = 'https://play.google.com/store/apps/details?id=com.appsweat.periodTracker';
  var ua = navigator.userAgent || '';
  var isAndroid = /Android/i.test(ua);
  var isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isIOSSafari = isIOS && !/CriOS|FxiOS|EdgiOS|OPiOS|GSA|Instagram|FBAN|FBAV|Tumblr/i.test(ua);

  // Order the page badges so the visitor's own store comes first.
  document.querySelectorAll('[data-store="play"]').forEach(function (el) {
    if (isAndroid && el.parentNode) el.parentNode.insertBefore(el, el.parentNode.firstChild);
  });

  if (!(isAndroid || (isIOS && !isIOSSafari))) return;
  try { if (localStorage.getItem('pamuBannerClosed')) return; } catch (e) {}

  var tr = document.documentElement.getAttribute('data-lang') === 'tr';
  var bar = document.createElement('div');
  bar.className = 'app-banner';
  bar.innerHTML =
    '<button class="app-banner-close" type="button" aria-label="' + (tr ? 'Kapat' : 'Close') + '">×</button>' +
    '<img src="app-icon.png" alt="" />' +
    '<div class="app-banner-text"><b>Pamu</b><span>' +
    (tr ? 'Regl ve döngü takibi' : 'Period & cycle tracker') + '</span></div>' +
    '<a class="app-banner-cta" href="' + (isAndroid ? PLAY : APP_STORE) + '">' +
    (tr ? 'İndir' : 'Get') + '</a>';
  bar.querySelector('.app-banner-close').addEventListener('click', function () {
    bar.remove();
    try { localStorage.setItem('pamuBannerClosed', '1'); } catch (e) {}
  });
  document.body.insertBefore(bar, document.body.firstChild);
})();
