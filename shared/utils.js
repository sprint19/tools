/**
 * Shared utilities for Sprint19 Tools.
 * Each tool can load this via <script src="/shared/utils.js"></script>
 * or inline the functions for fully standalone operation.
 */

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g,
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag])
  );
}

(function initThemeToggle() {
  var STORAGE_KEY = 'sprint19-theme';
  var ROOT = document.documentElement;

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(value) {
    try {
      if (value) {
        localStorage.setItem(STORAGE_KEY, value);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      /* Ignore storage errors (private mode, blocked storage). */
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      ROOT.setAttribute('data-theme', 'dark');
    } else {
      ROOT.removeAttribute('data-theme');
    }
  }

  function mountToggle() {
    if (!document.body || document.getElementById('theme-toggle-wrap')) return;

    var wrap = document.createElement('div');
    wrap.className = 'theme-toggle-wrap';
    wrap.id = 'theme-toggle-wrap';

    var input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'theme-toggle-input';
    input.setAttribute('aria-label', 'Enable dark mode override');

    var label = document.createElement('label');
    label.setAttribute('for', 'theme-toggle-input');
    label.textContent = 'Dark mode';

    wrap.appendChild(input);
    wrap.appendChild(label);
    document.body.appendChild(wrap);

    var storedTheme = getStoredTheme();
    input.checked = storedTheme === 'dark';

    input.addEventListener('change', function () {
      if (input.checked) {
        setStoredTheme('dark');
        applyTheme('dark');
      } else {
        setStoredTheme(null);
        applyTheme(null);
      }
    });
  }

  applyTheme(getStoredTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountToggle);
  } else {
    mountToggle();
  }
})();
