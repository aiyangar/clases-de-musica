import { chromium } from 'playwright';

const VIEWPORT = { width: 1180, height: 820 };
const URL = 'http://localhost:5173/#/cap-3';

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT });
const page = await context.newPage();

await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

for (let i = 1; i <= 5; i++) {
  const data = await page.evaluate(() => {
    const main = document.querySelector('main');
    const motion = document.querySelector('main > div'); // AnimatePresence wrapper
    const motionInner = motion?.querySelector(':scope > div'); // motion.div
    const stageOuter = document.querySelector('main [class*="overflow-hidden"]');
    const stageInner = stageOuter?.querySelector(':scope > div');
    const slideFrame = stageInner?.querySelector('.neon-frame');
    const slideContent = slideFrame?.querySelector(':scope > div:last-child');

    function box(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        x: r.x, y: r.y, w: r.width, h: r.height,
        display: cs.display,
        position: cs.position,
        transform: cs.transform,
        scaleVar: cs.getPropertyValue('--stage-scale'),
        cls: el.className?.toString().slice(0, 80),
      };
    }
    return {
      main: box(main),
      stageOuter: box(stageOuter),
      stageInner: box(stageInner),
      slideFrame: box(slideFrame),
      slideContent: box(slideContent),
    };
  });
  console.log(`---- slide ${i} ----`);
  console.log(JSON.stringify(data, null, 2));
  if (i < 5) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(900);
  }
}

await browser.close();
