import { chromium } from 'playwright';

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

await page.goto('http://localhost:5173/#/cap-2', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

await page.keyboard.press('ArrowRight');
await page.waitForTimeout(500);
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(800);

await page.screenshot({ path: '/tmp/cap2-slide3.png', fullPage: false });

console.log('SCREENSHOT_OK');
console.log('errors:', JSON.stringify(errors, null, 2));

await browser.close();
