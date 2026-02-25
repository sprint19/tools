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
  var VALID_THEMES = { light: true, dark: true };

  function getStoredTheme() {
    try {
      var theme = localStorage.getItem(STORAGE_KEY);
      return VALID_THEMES[theme] ? theme : null;
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
    if (theme === 'dark' || theme === 'light') {
      ROOT.setAttribute('data-theme', theme);
    } else {
      ROOT.removeAttribute('data-theme');
    }
  }

  function mountToggle() {
    if (!document.body || document.getElementById('theme-toggle-wrap')) return;

    var wrap = document.createElement('div');
    wrap.className = 'theme-toggle-wrap';
    wrap.id = 'theme-toggle-wrap';

    var label = document.createElement('label');
    label.setAttribute('for', 'theme-toggle-select');
    label.textContent = 'Theme';

    var select = document.createElement('select');
    select.id = 'theme-toggle-select';
    select.setAttribute('aria-label', 'Choose theme');
    select.innerHTML =
      '<option value="system">System</option>' +
      '<option value="light">Light</option>' +
      '<option value="dark">Dark</option>';

    wrap.appendChild(label);
    wrap.appendChild(select);
    document.body.appendChild(wrap);

    var storedTheme = getStoredTheme();
    select.value = storedTheme || 'system';

    select.addEventListener('change', function () {
      if (select.value === 'light' || select.value === 'dark') {
        setStoredTheme(select.value);
        applyTheme(select.value);
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
