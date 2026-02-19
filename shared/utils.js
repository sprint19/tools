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
