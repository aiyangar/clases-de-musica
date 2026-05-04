import { chromium } from 'playwright';

const slideIdx = parseInt(process.argv[2] ?? '8', 10); // 0-indexed; default = SlideNotasSolLineas

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1180, height: 820 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

const errors = [];
page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`);
});

await page.goto('http://localhost:5173/#/cap-3', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

for (let i = 0; i < slideIdx; i++) {
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(200);
}
await page.waitForTimeout(800);

const out = `/tmp/cap3-slide${slideIdx + 1}.png`;
await page.screenshot({ path: out, fullPage: false });

console.log('SCREENSHOT_OK', out);
console.log('errors:', JSON.stringify(errors, null, 2));

await browser.close();
