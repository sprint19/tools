#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const HTML_FILES = walkHtml(path.join(ROOT));
const JS_FILES = walkJs(path.join(ROOT, "shared"));
const TRACKER_PATTERNS = [
  /googletagmanager/i,
  /google-analytics\.com/i,
  /\bgtag\(/i,
  /\bga\(/i,
  /plausible/i,
  /segment\.com/i,
  /mixpanel/i,
  /hotjar/i
];
const NETWORK_OR_COOKIE_PATTERNS = [
  /\bfetch\s*\(/i,
  /\bXMLHttpRequest\b/i,
  /\bnavigator\.sendBeacon\b/i,
  /\bnew\s+Image\s*\(\s*\)\s*\.src\s*=/i,
  /\bdocument\.cookie\b/i,
  /\bWebSocket\s*\(/i,
  /\bEventSource\s*\(/i
];

function walkHtml(dirPath) {
  const out = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === ".cursor") continue;
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkHtml(full));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

function walkJs(dirPath) {
  const out = [];
  if (!fs.existsSync(dirPath)) return out;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "vendor") continue;
      out.push(...walkJs(full));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".js")) {
      out.push(full);
    }
  }
  return out;
}

function checkExternalScripts(filePath, content) {
  const matches = [];
  const scriptRegex = /<script[^>]+src="([^"]+)"/gi;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    const src = match[1];
    if (/^https?:\/\//i.test(src)) {
      matches.push(src);
    }
  }
  return matches;
}

function checkTrackerKeywords(content) {
  return TRACKER_PATTERNS.some((pattern) => pattern.test(content));
}

function checkNetworkOrCookiePatterns(content) {
  return NETWORK_OR_COOKIE_PATTERNS.some((pattern) => pattern.test(content));
}

function main() {
  const failures = [];

  for (const filePath of HTML_FILES) {
    const content = fs.readFileSync(filePath, "utf8");
    const externalScripts = checkExternalScripts(filePath, content);
    if (externalScripts.length > 0) {
      failures.push({
        type: "external-script",
        file: path.relative(ROOT, filePath),
        details: externalScripts
      });
    }
    if (checkTrackerKeywords(content)) {
      failures.push({
        type: "tracker-keyword",
        file: path.relative(ROOT, filePath),
        details: ["tracker keyword pattern detected"]
      });
    }
    if (checkNetworkOrCookiePatterns(content)) {
      failures.push({
        type: "network-or-cookie-pattern",
        file: path.relative(ROOT, filePath),
        details: ["outbound network or cookie pattern detected"]
      });
    }
  }

  for (const filePath of JS_FILES) {
    const content = fs.readFileSync(filePath, "utf8");
    if (checkTrackerKeywords(content)) {
      failures.push({
        type: "tracker-keyword",
        file: path.relative(ROOT, filePath),
        details: ["tracker keyword pattern detected"]
      });
    }
    if (checkNetworkOrCookiePatterns(content)) {
      failures.push({
        type: "network-or-cookie-pattern",
        file: path.relative(ROOT, filePath),
        details: ["outbound network or cookie pattern detected"]
      });
    }
  }

  try {
    execFileSync("node", ["scripts/verify-sitemap-sync.mjs"], {
      cwd: ROOT,
      stdio: "pipe"
    });
  } catch (error) {
    failures.push({
      type: "sitemap-sync",
      file: "sitemap.xml",
      details: ["homepage routes and sitemap routes are out of sync"]
    });
  }

  if (failures.length === 0) {
    console.log("PASS: governance guardrails check passed.");
    process.exit(0);
  }

  console.error("FAIL: governance guardrails check failed.");
  for (const failure of failures) {
    console.error(`- [${failure.type}] ${failure.file}`);
    for (const detail of failure.details) {
      console.error(`  - ${detail}`);
    }
  }
  process.exit(1);
}

main();
