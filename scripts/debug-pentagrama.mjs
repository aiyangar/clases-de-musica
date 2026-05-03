import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1180, height: 820 });
await page.addStyleTag({ content: `*, *::before, *::after { animation: none !important; transition: none !important; }` });
await page.goto('http://localhost:5173/#/cap-3', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1000);
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1000);
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1500);

const data = await page.evaluate(() => {
  const svg = document.querySelector('svg[aria-label="Pentagrama"]');
  const parentDiv = svg?.parentElement;
  const slideFrame = document.querySelector('.neon-frame');
  const slideContent = slideFrame?.querySelector(':scope > div:last-child');
  function box(el, label) {
    if (!el) return { label, missing: true };
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      label,
      x: r.x.toFixed(1), y: r.y.toFixed(1), w: r.width.toFixed(1), h: r.height.toFixed(1),
      cssWidth: cs.width, cssHeight: cs.height,
      overflow: cs.overflow,
    };
  }
  return {
    svg: box(svg, 'svg'),
    parent: box(parentDiv, 'svg parent'),
    slideContent: box(slideContent, 'slideContent'),
    slideFrame: box(slideFrame, 'slideFrame'),
    svgAttrs: svg ? { width: svg.getAttribute('width'), height: svg.getAttribute('height'), viewBox: svg.getAttribute('viewBox') } : null,
    childCount: svg?.children.length,
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
