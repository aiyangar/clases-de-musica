import { chromium } from 'playwright';

const slideIdx = parseInt(process.argv[2] ?? '5', 10);
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2 });
const page = await context.newPage();
await page.addStyleTag({ content: `*, *::before, *::after { animation: none !important; transition: none !important; }` });
await page.goto('http://localhost:5173/#/cap-3', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
for (let i = 1; i < slideIdx; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(800); }
await page.waitForTimeout(1500);

const svg = await page.locator('svg[aria-label="Pentagrama"]').first();
const box = await svg.boundingBox();
await page.screenshot({
  path: `tmp/slide-${String(slideIdx).padStart(2,'0')}-zoom.png`,
  clip: { x: box.x - 5, y: box.y - 5, width: box.width + 10, height: box.height + 10 },
});
console.log('done');
await browser.close();
