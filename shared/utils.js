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

window.Sprint19Utils = window.Sprint19Utils || {};

window.Sprint19Utils.setCopyFeedback = function(feedbackEl, ok) {
  if (!feedbackEl) return;
  feedbackEl.textContent = ok ? 'Copied' : 'Copy failed';
  if (feedbackEl.__sprint19CopyTimer) {
    clearTimeout(feedbackEl.__sprint19CopyTimer);
  }
  feedbackEl.__sprint19CopyTimer = setTimeout(function() {
    feedbackEl.textContent = '';
  }, 1500);
};

window.Sprint19Utils.copyTextWithFeedback = function(text, feedbackEl) {
  function finalize(ok) {
    window.Sprint19Utils.setCopyFeedback(feedbackEl, ok);
    return ok;
  }

  function fallbackCopy(value) {
    var ta = document.createElement('textarea');
    ta.value = value;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    var copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (e) {
      copied = false;
    }
    document.body.removeChild(ta);
    return copied;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(function() {
      return finalize(true);
    }).catch(function() {
      return finalize(fallbackCopy(text));
    });
  }
  return Promise.resolve(finalize(fallbackCopy(text)));
};

window.Sprint19Utils.bindPrimaryActionShortcut = function(options) {
  if (!options || !options.input || !options.action) return;
  var inputEl = typeof options.input === 'string'
    ? document.querySelector(options.input)
    : options.input;
  var actionEl = typeof options.action === 'string'
    ? document.querySelector(options.action)
    : options.action;
  if (!inputEl || !actionEl) return;

  document.addEventListener('keydown', function(event) {
    if (event.defaultPrevented) return;
    if (event.key !== 'Enter') return;
    if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey) return;
    if (document.activeElement !== inputEl) return;
    event.preventDefault();
    actionEl.click();
  });
};

(function initKeyboardShortcutBindings() {
  function bind() {
    if (!document.body) return;
    var inputSelector = document.body.getAttribute('data-shortcut-input');
    var actionSelector = document.body.getAttribute('data-shortcut-action');
    if (!inputSelector || !actionSelector) return;
    window.Sprint19Utils.bindPrimaryActionShortcut({
      input: inputSelector,
      action: actionSelector
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();

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

(function initAffiliateCTA() {
  function mountCTA() {
    if (!document.body) return;
    if (document.getElementById('affiliate-cta')) return;
    if (document.body.getAttribute('data-affiliate-cta') !== 'true') return;
    var sidebarMount = document.getElementById('sidebarCtaMount');
    if (!sidebarMount) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'affiliate-cta';
    wrapper.id = 'affiliate-cta';

    var text = document.createElement('p');
    text.className = 'affiliate-cta-text';
    text.textContent = 'Need hosted email? Use Zoho Workplace.';

    var link = document.createElement('a');
    link.className = 'affiliate-cta-btn';
    link.href = 'https://go.zoho.com/EpSd';
    link.target = '_blank';
    link.rel = 'noopener noreferrer sponsored';
    link.textContent = 'Create business email';

    wrapper.appendChild(text);
    wrapper.appendChild(link);
    sidebarMount.appendChild(wrapper);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountCTA);
  } else {
    mountCTA();
  }
})();

