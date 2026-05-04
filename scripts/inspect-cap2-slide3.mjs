import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1180, height: 820 } });
const page = await context.newPage();

await page.goto('http://localhost:5173/#/cap-2', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(300);
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(800);

const data = await page.evaluate(() => {
  const el = document.querySelector('[aria-label="Figura musical negra"]');
  if (!el) return { error: 'not found' };
  const cs = getComputedStyle(el);
  const ancestors = [];
  let cur = el.parentElement;
  while (cur && ancestors.length < 10) {
    const acs = getComputedStyle(cur);
    ancestors.push({
      tag: cur.tagName,
      cls: cur.className?.toString().slice(0, 80),
      overflow: acs.overflow,
      filter: acs.filter,
    });
    cur = cur.parentElement;
  }
  return {
    filter: cs.filter,
    isolation: cs.isolation,
    transform: cs.transform,
    overflow: cs.overflow,
    boxRect: el.getBoundingClientRect(),
    ancestors,
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
