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

const data = await page.evaluate(() => {
  const svg = document.querySelector('svg[aria-label="Pentagrama"]');
  const lines = Array.from(svg?.querySelectorAll('line') ?? []);
  const texts = Array.from(svg?.querySelectorAll('text') ?? []);
  return {
    lines: lines.map(l => {
      const r = l.getBoundingClientRect();
      return { y1: l.getAttribute('y1'), y2: l.getAttribute('y2'), boxY: r.y.toFixed(1), boxH: r.height.toFixed(1) };
    }),
    texts: texts.map(t => {
      const r = t.getBoundingClientRect();
      return { content: t.textContent, y: t.getAttribute('y'), boxY: r.y.toFixed(1), boxH: r.height.toFixed(1) };
    }),
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
