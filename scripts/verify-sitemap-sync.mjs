#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INDEX_PATH = path.join(ROOT, "index.html");
const SITEMAP_PATH = path.join(ROOT, "sitemap.xml");

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function extractHomepageRoutes(indexHtml) {
  const routes = new Set();
  const anchorRegex = /<a\b[^>]*>/gi;
  let anchorMatch;
  while ((anchorMatch = anchorRegex.exec(indexHtml)) !== null) {
    const tag = anchorMatch[0];
    const classMatch = tag.match(/\bclass\s*=\s*["']([^"']*)["']/i);
    const hrefMatch = tag.match(/\bhref\s*=\s*["']\/([a-z0-9_-]+)\/["']/i);
    if (!classMatch || !hrefMatch) continue;
    const classes = classMatch[1].toLowerCase();
    if (!/\btool-card\b/.test(classes)) continue;
    routes.add(`/${hrefMatch[1]}/`);
  }
  return routes;
}

function extractSitemapRoutes(sitemapXml) {
  const regex = /<loc>\s*([^<]+)\s*<\/loc>/gi;
  const routes = new Set();
  let match;
  while ((match = regex.exec(sitemapXml)) !== null) {
    const loc = match[1].trim();
    try {
      const parsed = new URL(loc);
      if (parsed.hostname !== "tools.sprint19.com") continue;
      const pathname = parsed.pathname;
      const routeMatch = pathname.match(/^\/([a-z0-9_-]+)\/$/i);
      if (routeMatch) {
        routes.add(`/${routeMatch[1].toLowerCase()}/`);
      }
    } catch (e) {
      continue;
    }
  }
  return routes;
}

function sortedDiff(a, b) {
  return [...a].filter((item) => !b.has(item)).sort();
}

function main() {
  const indexHtml = readText(INDEX_PATH);
  const sitemapXml = readText(SITEMAP_PATH);

  const homepageRoutes = extractHomepageRoutes(indexHtml);
  const sitemapRoutes = extractSitemapRoutes(sitemapXml);

  const missingInSitemap = sortedDiff(homepageRoutes, sitemapRoutes);
  const extraInSitemap = sortedDiff(sitemapRoutes, homepageRoutes);

  console.log(`Homepage routes: ${homepageRoutes.size}`);
  console.log(`Sitemap routes: ${sitemapRoutes.size}`);

  if (missingInSitemap.length === 0 && extraInSitemap.length === 0) {
    console.log("PASS: sitemap routes match homepage tool routes.");
    process.exit(0);
  }

  console.error("FAIL: sitemap route mismatch detected.");
  if (missingInSitemap.length > 0) {
    console.error("Missing in sitemap:");
    missingInSitemap.forEach((route) => console.error(`  - ${route}`));
  }
  if (extraInSitemap.length > 0) {
    console.error("Extra in sitemap:");
    extraInSitemap.forEach((route) => console.error(`  - ${route}`));
  }
  process.exit(1);
}

main();
