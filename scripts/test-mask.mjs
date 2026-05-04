import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5173/');

// Inject test element with mask
const result = await page.evaluate(() => {
  const div = document.createElement('div');
  div.style.cssText = `
    width: 100px; height: 100px;
    background-color: cyan;
    mask-image: url('/src/assets/music/sounds/negra.svg');
    -webkit-mask-image: url('/src/assets/music/sounds/negra.svg');
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
  `;
  document.body.appendChild(div);
  const cs = getComputedStyle(div);
  return {
    maskImage: cs.maskImage,
    webkitMaskImage: cs.webkitMaskImage,
    inlineStyle: div.getAttribute('style'),
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
