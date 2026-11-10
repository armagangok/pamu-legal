// Shows one language at a time (English or Turkish) and remembers the choice.
(function () {
  var html = document.documentElement;
  var enTitle = document.title;
  function apply(lang) {
    html.setAttribute('data-lang', lang);
    html.lang = lang;
    document.title = lang === 'tr' ? (html.getAttribute('data-title-tr') || enTitle) : enTitle;
  }
  apply(html.getAttribute('data-lang') || 'en');
  // Old links end in #tr; the Turkish block is now the whole page, so start at the top.
  if (location.hash === '#tr') window.addEventListener('load', function () { window.scrollTo(0, 0); });
  document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-set-lang');
      try { localStorage.setItem('pamuLang', lang); } catch (e) {}
      if (location.hash === '#tr') history.replaceState(null, '', location.pathname + location.search);
      apply(lang);
    });
  });
})();
