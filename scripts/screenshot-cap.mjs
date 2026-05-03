import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const cap = process.argv[2] ?? '1';
const total = parseInt(process.argv[3] ?? '8', 10);
const VIEWPORT = { width: 1180, height: 820 };
const URL = `http://localhost:5173/#/cap-${cap}`;
const OUT = `tmp/cap${cap}-screenshots`;

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT });
const page = await context.newPage();
await page.addStyleTag({ content: `*, *::before, *::after { animation: none !important; transition: none !important; }` });
await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

for (let i = 1; i <= total; i++) {
  const out = `${OUT}/${String(i).padStart(2, '0')}.png`;
  await page.screenshot({ path: out, fullPage: false });
  console.log(`captured ${out}`);
  if (i < total) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1500);
  }
}

await browser.close();
console.log('done');
