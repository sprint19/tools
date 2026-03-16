# TODO

Tracked work for Sprint19 Tools.

---

## Coming Soon — Tools to Build

### Email & DNS

- [ ] DNS TXT Record Inspector — parse key/value pairs from DMARC, SPF, DKIM, and domain verification records
- [ ] Email Header Analyzer — extract sender info, Return-Path, SPF/DKIM/DMARC results, and sending IP from raw headers

### SSL & Certificates

- [ ] HSTS Builder — generate Strict-Transport-Security headers with max-age, includeSubDomains, and preload

### Auth & Tokens

- [ ] Basic Auth Header Generator — Base64-encode username/password into an Authorization header
- [ ] OAuth Scope Formatter — parse and format OAuth scope strings into readable lists

### HTTP & Headers

- [ ] HTTP Header Analyzer — structured breakdown of Cache-Control, CSP, CORS, HSTS, and security headers
- [ ] CSP Policy Parser — break a Content-Security-Policy header into a directives table
- [ ] Webhook Viewer — formatted display, structure stats, and event detection for JSON webhook payloads

### Data & Config

- [ ] ENV File Formatter — structured table from .env files with optional value masking
- [ ] Redis URL Parser — extract host, port, database, and auth details from a Redis connection URL
- [ ] Postgres JSON Formatter — pretty-print and validate JSON from psql output

### DevOps & Logs

- [ ] Dockerfile Linter — flag unpinned base images, missing WORKDIR, and multiple RUN layers
- [ ] NGINX Config Formatter — pretty-print NGINX config blocks
- [ ] Rails Log Beautifier — group requests, extract stats, and color-code status results

### Utilities

- [ ] JavaScript to TypeScript Converter — basic type annotations and interface scaffolding from JS input

---

## Improvements to Existing Tools

- [ ] Add structured data (JSON-LD) to each tool page for search visibility
- [ ] Add OpenGraph image per tool for richer social sharing
- [ ] Add copy-to-clipboard confirmation feedback across all tools
- [ ] Keyboard shortcut support (e.g. Ctrl+Enter to run/parse)
- [ ] Accessibility audit — ensure all tools meet WCAG 2.1 AA

---

## Site & Infrastructure

- [ ] Add a 404 page
- [ ] Add favicon.png and og-image.png assets
- [ ] Update sitemap.xml as new tools ship
- [ ] Add analytics-free usage counters (local storage only)
