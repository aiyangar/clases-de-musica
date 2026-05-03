import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1180, height: 820 });
await page.addStyleTag({ content: `*, *::before, *::after { animation: none !important; transition: none !important; }` });
await page.goto('http://localhost:5173/#/cap-3', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(800);
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(800);
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1500);

const html = await page.evaluate(() => document.querySelector('svg[aria-label="Pentagrama"]')?.outerHTML);
console.log(html);
await browser.close();
