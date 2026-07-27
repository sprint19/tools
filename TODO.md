# TODO

Tracked work for Sprint19 Tools.

---

## Recently Shipped

- [x] Message Header Analyzer
- [x] EML Viewer
- [x] IDN Converter
- [x] Encode / Decode
- [x] Calendar File Viewer
- [x] Port Check (command generator only)
- [x] Odoo Pricing Calculator

---

## Coming Soon: Tools to Build

### Email & DNS

- [x] DNS TXT Record Inspector: parse key/value pairs from DMARC, SPF, DKIM, and domain verification records
- [x] Message Header Analyzer: parse sender info, Return-Path, SPF/DKIM/DMARC indicators, and transfer hops from raw headers

### SSL & Certificates

- [x] HSTS Builder: generate Strict-Transport-Security headers with max-age, includeSubDomains, and preload

### Auth & Tokens

- [x] Basic Auth Header Generator: Base64-encode username/password into an Authorization header
- [x] OAuth Scope Formatter: parse and format OAuth scope strings into readable lists

### HTTP & Headers

- [x] HTTP Header Analyzer: structured breakdown of Cache-Control, CSP, CORS, HSTS, and security headers
- [x] CSP Policy Parser: break a Content-Security-Policy header into a directives table
- [x] Webhook Viewer: formatted display, structure stats, and event detection for JSON webhook payloads

### Data & Config

- [x] ENV File Formatter: structured table from .env files with optional value masking
- [x] Redis URL Parser: extract host, port, database, and auth details from a Redis connection URL
- [x] Postgres JSON Formatter: pretty-print and validate JSON from psql output
- [x] Calendar File Viewer: parse ICS calendar files into structured event output

### DevOps & Logs

- [x] Dockerfile Linter: flag unpinned base images, missing WORKDIR, and multiple RUN layers
- [x] NGINX Config Formatter: pretty-print NGINX config blocks
- [x] Rails Log Beautifier: group requests, extract stats, and color-code status results

### Utilities

- [x] JavaScript to TypeScript Converter: basic type annotations and interface scaffolding from JS input
- [x] Encode / Decode: deterministic Base64, URL, and HTML entity conversion
- [x] IDN Converter: Unicode and punycode conversion for domain labels
- [x] Odoo Pricing Calculator: side-by-side subscription estimate with first-year discount, hosting, and offline USD→PHP conversion

---

## Improvements to Existing Tools

- [x] Add structured data (JSON-LD) to each tool page for search visibility
- [x] Add OpenGraph image per tool for richer social sharing
- [x] Add copy-to-clipboard confirmation feedback across all tools
- [x] Keyboard shortcut support (e.g. Ctrl+Enter to run/parse)
- [x] Accessibility audit: ensure all tools meet WCAG 2.1 AA (evidence: `.cursor/plans/a11y-route-audit-v5.md`; independent review signoff recorded)

---

## Site & Infrastructure

- [x] Add a 404 page (evidence: `.cursor/plans/site-infra-release-verification-v4.md`)
- [x] Add favicon.png and og-image.png assets (evidence: `.cursor/plans/site-infra-release-verification-v4.md`)
- [x] Update sitemap.xml as new tools ship (evidence: `.cursor/plans/sitemap-process-v1.md`, `.cursor/plans/site-infra-release-verification-v4.md`)
- [x] Add analytics-free usage counters (local storage only) (evidence: `.cursor/plans/site-infra-release-verification-v4.md`)
- [x] Add homepage quick search for tool cards (browser-only, no persistence) (evidence: `.cursor/plans/site-infra-release-verification-v4.md`)
- [x] Move Zoho CTA to the left sidebar on the homepage (evidence: `.cursor/plans/site-infra-release-verification-v4.md`)


---

## Backlog: Candidate Tools

New ideas for future tools. Same rules as the rest of the suite: deterministic, browser-only, no backend, no data leaves the page.

### Email & DNS

- [ ] BIMI Record Builder: assemble a BIMI DNS TXT record from logo URL (SVG) and optional VMC, with field explanations
- [ ] MTA-STS & TLS-RPT Builder: generate the MTA-STS policy file and the `_mta-sts` / `_smtp._tls` TXT records
- [ ] MX Record Formatter: paste MX records to sort by priority and flag duplicate or missing hosts
- [ ] ARC Header Viewer: parse ARC-Seal, ARC-Message-Signature, and ARC-Authentication-Results chains

### SSL & Certificates

- [ ] Certificate (PEM) Decoder: paste a PEM certificate to read subject, issuer, SAN list, validity dates, and key type
- [ ] Certificate Chain Order Checker: paste a bundle to verify leaf, intermediate, and root ordering
- [ ] JWK / PEM Key Inspector: inspect a public key in JWK or PEM form and show algorithm, curve, and fingerprint

### Auth & Tokens

- [ ] JWT Generator: sign an HS256 token locally with a chosen secret and claims, paired with the existing decoder
- [ ] TOTP Code Tester: derive a current TOTP code from a Base32 secret using the Web Crypto API
- [ ] Token Entropy Checker: estimate the bit strength of an API key or password from its character set and length

### HTTP & Headers

- [ ] Cache-Control Builder: toggle directives (max-age, s-maxage, no-store, stale-while-revalidate) into a header value
- [ ] Permissions-Policy Builder: compose a Permissions-Policy header from feature and allowlist selections
- [ ] Set-Cookie Parser: break a Set-Cookie header into attributes and flag missing Secure, HttpOnly, or SameSite
- [ ] Query String Parser: split a URL query into a readable key/value table and rebuild it

### Data & Config

- [ ] YAML and JSON Converter: convert in both directions with validation and error positions
- [ ] Cron Expression Explainer: translate a cron expression into a plain-English schedule and next run times
- [ ] Unix Timestamp Converter: convert between epoch seconds/milliseconds and ISO 8601 across time zones
- [ ] UUID and ULID Generator: generate v4 UUIDs and ULIDs locally with bulk output
- [ ] CSV and JSON Converter: convert tabular CSV to JSON records and back with delimiter detection

### DevOps & Logs

- [ ] docker-compose Validator: parse a compose file to surface services, ports, volumes, and obvious mistakes
- [ ] Kubernetes Manifest Linter: flag missing resource limits, latest tags, and absent liveness/readiness probes
- [ ] systemd Unit Viewer: parse a unit file into a structured view of sections and directives

### Utilities

- [ ] Regex Tester: test a pattern against sample text with match highlighting and group capture, all in-browser
- [ ] Hash Generator: compute SHA-256, SHA-1, and SHA-512 of text or files using the Web Crypto API
- [ ] Diff Viewer: compare two blocks of text with line-level additions and deletions
- [ ] Slug Generator: turn titles into URL-safe slugs with transliteration and length limits
- [ ] Markdown Table Formatter: align and prettify Markdown tables from pasted rows
