(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  function current() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    function label() { btn.textContent = current() === 'dark' ? 'Light' : 'Dark'; }
    label();
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      label();
    });
  });
})();

(function () {
  var KEY = 'exposx-stars';
  function show(n) {
    if (typeof n !== 'number') return;
    var els = document.querySelectorAll('.star-count');
    for (var i = 0; i < els.length; i++) { els[i].textContent = n; els[i].hidden = false; }
  }
  document.addEventListener('DOMContentLoaded', function () {
    var cached = null;
    try { cached = JSON.parse(sessionStorage.getItem(KEY)); } catch (e) {}
    if (cached !== null) return show(cached);
    if (!window.fetch) return;
    fetch('https://api.github.com/repos/2cat1vim/exposx')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d) return;
        try { sessionStorage.setItem(KEY, JSON.stringify(d.stargazers_count)); } catch (e) {}
        show(d.stargazers_count);
      })
      .catch(function () {});
  });
})();
