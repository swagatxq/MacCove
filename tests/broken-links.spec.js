const { test } = require('@playwright/test');

const IGNORE_PREFIXES = ['mailto:', 'tel:', 'javascript:'];
const REQUEST_TIMEOUT = 15_000;

function normalize(href, base) {
  try {
    const url = new URL(href, base);
    url.hash = '';
    return url.toString();
  } catch {
    return null;
  }
}

async function checkLinkStatus(request, url) {
  // Some servers (or the Next.js dev/prod server for certain routes) don't
  // support HEAD, so fall back to GET when that happens.
  const res = await request.fetch(url, { method: 'HEAD', maxRedirects: 5, timeout: REQUEST_TIMEOUT });
  if (res.status() === 405 || res.status() === 501) {
    const getRes = await request.fetch(url, { method: 'GET', maxRedirects: 5, timeout: REQUEST_TIMEOUT });
    return getRes.status();
  }
  return res.status();
}

test('crawl the entire app and verify every link resolves', async ({ page, request, baseURL }) => {
  test.setTimeout(5 * 60_000);

  const origin = new URL(baseURL).origin;
  const visitedPages = new Set();
  const checkedLinks = new Map();
  const queue = [normalize('/', baseURL)];
  const brokenLinks = [];

  while (queue.length) {
    const pageUrl = queue.shift();
    if (!pageUrl || visitedPages.has(pageUrl)) continue;
    visitedPages.add(pageUrl);

    const response = await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    if (!response || response.status() >= 400) {
      brokenLinks.push({ from: '(crawl)', link: pageUrl, status: response ? response.status() : 'no response' });
      continue;
    }

    const hrefs = await page.$$eval('a[href]', (els) => els.map((el) => el.getAttribute('href')));

    for (const rawHref of hrefs) {
      if (!rawHref || rawHref.startsWith('#')) continue;
      if (IGNORE_PREFIXES.some((prefix) => rawHref.startsWith(prefix))) continue;

      const absolute = normalize(rawHref, pageUrl);
      if (!absolute) {
        brokenLinks.push({ from: pageUrl, link: rawHref, status: 'unparseable URL' });
        continue;
      }

      const isInternal = new URL(absolute).origin === origin;
      if (isInternal && !visitedPages.has(absolute)) {
        queue.push(absolute);
      }

      if (checkedLinks.has(absolute)) continue;
      checkedLinks.set(absolute, true);

      try {
        const status = await checkLinkStatus(request, absolute);
        if (status >= 400) {
          brokenLinks.push({ from: pageUrl, link: absolute, status });
        }
      } catch (err) {
        brokenLinks.push({ from: pageUrl, link: absolute, status: `request failed: ${err.message}` });
      }
    }
  }

  console.log(`Crawled ${visitedPages.size} page(s), checked ${checkedLinks.size} link(s).`);

  if (brokenLinks.length) {
    const report = brokenLinks
      .map((b) => `  [${b.status}] ${b.link}\n      found on: ${b.from}`)
      .join('\n');
    throw new Error(`Found ${brokenLinks.length} broken link(s) across ${visitedPages.size} page(s):\n${report}`);
  }
});
