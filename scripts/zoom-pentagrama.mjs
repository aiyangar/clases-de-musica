import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2 });
const page = await context.newPage();
await page.addStyleTag({ content: `*, *::before, *::after { animation: none !important; transition: none !important; }` });
await page.goto('http://localhost:5173/#/cap-3', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1000);
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1000);
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(2000);

const svg = await page.locator('svg[aria-label="Pentagrama"]');
const box = await svg.boundingBox();
await page.screenshot({
  path: 'tmp/pentagrama-zoom.png',
  clip: { x: box.x - 5, y: box.y - 5, width: box.width + 10, height: box.height + 80 },
});
console.log(`zoom captured: ${JSON.stringify(box)}`);

await browser.close();
