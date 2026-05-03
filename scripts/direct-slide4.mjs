import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2 });
const page = await context.newPage();
await page.addStyleTag({ content: `*, *::before, *::after { animation: none !important; transition: none !important; }` });

// Direct route to a state where slide 4 is rendered, but isolated.
// Inject an override that forces ChapterPlayer to start at slide 4.
await page.goto('http://localhost:5173/#/cap-3', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
for (let i = 0; i < 3; i++) {
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(800);
}
await page.waitForTimeout(2500);
await page.screenshot({ path: 'tmp/slide4-direct.png', fullPage: false });

// Also take a snapshot WITHOUT framer-motion filter
await page.evaluate(() => {
  document.querySelectorAll('main > div, main > div > div').forEach((el) => {
    el.style.filter = 'none';
  });
});
await page.waitForTimeout(500);
await page.screenshot({ path: 'tmp/slide4-nofilter.png', fullPage: false });

await browser.close();
console.log('done');
