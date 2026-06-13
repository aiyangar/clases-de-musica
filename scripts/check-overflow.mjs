import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:5173';
// Pass one or more chapter ids as args; default to all four implemented chapters.
const caps = process.argv.slice(2);
const chapters = caps.length
  ? caps
  : ['principiante-cap-1', 'principiante-cap-2', 'principiante-cap-3', 'principiante-cap-4'];

const measure = () => {
  const frame = document.querySelector('.neon-frame');
  if (!frame) return { ok: false };
  const w = frame.lastElementChild; // .p-14 overflow-hidden content wrapper
  const vOver = w.scrollHeight - w.clientHeight;
  const hOver = w.scrollWidth - w.clientWidth;
  return { ok: true, vOver, hOver, overflow: vOver > 1 || hOver > 1 };
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 } });
const page = await ctx.newPage();

let bad = 0;
const lines = [];
for (const cap of chapters) {
  await page.goto(`${BASE}/#/${cap}`, { waitUntil: 'networkidle' });
  await page.addStyleTag({
    content: `*,*::before,*::after{animation:none!important;transition:none!important;}`,
  });
  await page.waitForTimeout(500);
  const indicator = await page
    .locator('text=/\\d+\\s*\\/\\s*\\d+/')
    .first()
    .innerText()
    .catch(() => '? / ?');
  const total = parseInt((indicator.match(/\/\s*(\d+)/) || [])[1] || '1', 10);
  for (let i = 1; i <= total; i++) {
    // The counter (outside AnimatePresence) advances instantly, but mode="wait"
    // keeps the old slide mounted through its 350ms exit, then the new slide
    // takes another 350ms to enter. Wait for the counter to reach this index,
    // then settle past the full ~700ms exit+enter before measuring — otherwise
    // we'd measure a mid-transition (stale) slide and skip/dupe real overflows.
    await page
      .waitForFunction(
        (idx) => document.querySelector('.counter')?.textContent?.startsWith(idx),
        String(i).padStart(2, '0'),
        { timeout: 5000 },
      )
      .catch(() => {});
    await page.waitForTimeout(850);
    const m = await page.evaluate(measure);
    const tag = !m.ok ? 'NO-FRAME' : m.overflow ? `OVERFLOW v=${m.vOver} h=${m.hOver}` : 'ok';
    if (!m.ok || m.overflow) bad++;
    lines.push(`${cap}  ${String(i).padStart(2, '0')}/${total}  ${tag}`);
    if (i < total) await page.locator('[aria-label="Siguiente slide"]').click().catch(() => {});
  }
}
await browser.close();

console.log(lines.join('\n'));
console.log(`\n${bad} slide(s) overflowing across: ${chapters.join(', ')}`);
process.exitCode = bad ? 1 : 0;
