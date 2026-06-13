# Reading-text Legibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Roughly double the reading text across all slides for projector legibility, resolving the resulting overflow per slide (trim or split) so no slide overflows the 820 canvas.

**Architecture:** One global size bump in `globals.css` (Phase 0) raises reading text (and titles, to keep hierarchy). That overflows nearly every slide, so a data-driven overflow detector (`scripts/check-overflow.mjs`) walks the deck and reports exactly which rendered slides overflow. Each chapter is then reflowed slide-by-slide — trimming prose (user-approved) or splitting into parts — until the detector reports zero overflow and the user approves the chapter visually. All work stays on `feature/reading-text-legibility`; it merges to `develop` only when every chapter passes.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind, Playwright (verification), Vitest. Spec: `docs/superpowers/specs/2026-06-13-reading-text-legibility-design.md`.

**Preconditions:**
- The user's dev server is already running at `http://localhost:5173`. **Do not start another server.** If it is down, ask the user to start `npm run dev`.
- Work on branch `feature/reading-text-legibility` (already created). Never commit to `main`/`develop`; the protect-git hook enforces this.

---

## File Structure

- **Modify** `src/styles/globals.css` — the seven `font-size` values (Phase 0). One responsibility: the type scale.
- **Create** `scripts/check-overflow.mjs` — headless overflow detector, parameterized by chapter id. Verification tool, reused every chapter.
- **Modify** per chapter, only as the detector demands:
  - `src/chapters/capN/slides/*.tsx` — trim prose and/or split content.
  - `src/chapters/capN/CapNPresentation.tsx` — register new part-slides in the `SLIDES` array when a slide is split.
  - `src/chapters/cap4/exercises/ExerciseShell.tsx` — the shared exercise prompt (`text-3xl`) bumped once (affects cap-4 exercise slides).

No new abstractions. Splitting reuses the existing pattern: a slide is a component listed in `CapNPresentation.tsx`'s `SLIDES` array; a split adds one more component entry.

---

### Task 1: Phase 0 — apply the size system in `globals.css`

**Files:**
- Modify: `src/styles/globals.css` (lines 50, 60, 99, 109, 117, 352, 359)

- [ ] **Step 1: Edit the seven font-size values**

Apply exactly these single-property changes (each is the `font-size` line inside the named rule):

| Selector | From | To |
|---|---|---|
| `.heading-1` | `font-size: 96px;` | `font-size: 120px;` |
| `.heading-2` | `font-size: 60px;` | `font-size: 84px;` |
| `.heading-3` | `font-size: 34px;` | `font-size: 64px;` |
| `.body-text, .body-text p, .body-text li` | `font-size: 28px;` | `font-size: 56px;` |
| `.subtitle` | `font-size: 30px;` | `font-size: 56px;` |
| `.timbre-name` | `font-size: 22px;` | `font-size: 40px;` |
| `.timbre-desc` | `font-size: 18px;` | `font-size: 36px;` |

Change nothing else (no `line-height`, `letter-spacing`, or other rules).

- [ ] **Step 2: Verify build + tests still pass**

Run: `npm run build && npm test`
Expected: build succeeds, 29 tests pass. (CSS-only change; no logic affected.)

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat(type): enlarge reading text + titles for projector legibility"
```

> After this task the slides overflow on purpose. That state lives only on this branch and is resolved by Tasks 3–6.

---

### Task 2: Build the overflow detector

**Files:**
- Create: `scripts/check-overflow.mjs`

- [ ] **Step 1: Write the detector script**

Create `scripts/check-overflow.mjs`:

```js
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
    await page.waitForTimeout(300);
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
```

- [ ] **Step 2: Run it to capture the baseline (proves it works + lists the damage)**

Run: `node scripts/check-overflow.mjs`
Expected: exit code 1, with many `OVERFLOW` rows (Task 1 enlarged the text). This both validates the detector and produces the work list for Tasks 3–6. Save/note the output.

- [ ] **Step 3: Commit**

```bash
git add scripts/check-overflow.mjs
git commit -m "test(slides): headless overflow detector for the 820 canvas"
```

---

### Reflow procedure (shared by Tasks 3–6)

Each chapter task follows this exact loop. The two fix patterns and the size mapping are defined once here; the chapter tasks reference them.

**Detector-driven loop for chapter `<cap>`:**
1. Run `node scripts/check-overflow.mjs <cap>` → list of `OVERFLOW` slides.
2. For each overflowing slide, open its component and apply **one** fix pattern (below).
3. Re-run `node scripts/check-overflow.mjs <cap>` until it prints `0 slide(s) overflowing`.
4. Capture screenshots and get the **user's visual approval** for the chapter (gate).

**Tailwind `text-*` size mapping** (when a slide uses raw utilities for *reading* text — leave decorative/large display numbers alone):

| Reading utility | Replace with |
|---|---|
| `text-3xl` (≈30px prompt/body) | `text-[56px]` (or the `body-text` class) |
| `text-2xl` (≈24px) | `text-[44px]` |
| `text-xl` (≈20px) | `text-[36px]` |
| `text-lg` (≈18px) | `text-[34px]` |
| `text-base` (≈16px) | `text-[30px]` |

**Fix pattern A — Trim (preferred when content is close to fitting):** shorten the prose so the slide fits at the new size. Example, `SlideAltura.tsx` third paragraph:

```tsx
// before
<p className="body-text">
  Voz <em>grave</em>: Billie Eilish susurrando. Voz <em>aguda</em>:
  Ariana Grande en el silbato.
</p>
// after (terser)
<p className="body-text">
  <em>Grave</em>: Billie Eilish susurrando · <em>Aguda</em>: Ariana Grande.
</p>
```

**Trims require user sign-off on the wording before committing the slide.**

**Fix pattern B — Split into parts (when trimming would gut the content):** divide the slide's content into two components and register both. Worked example for `SlideAltura.tsx` (3 body paragraphs + visualization → 2 slides):

1. Keep `SlideAltura.tsx` as part 1 (definition + first paragraph + visualization):

```tsx
import FrequencyBars from '../visualizations/FrequencyBars';

export default function SlideAltura() {
  return (
    <div className="flex-1 flex flex-col gap-10 justify-center">
      <h2 className="heading-2 self-start" data-text="Altura"><span>Altura</span></h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div className="def-box">
            <span className="def-symbol" aria-hidden="true">◈</span>
            <p className="body-text">
              Es la cualidad que distingue un sonido <strong>grave</strong> de uno <em>agudo</em>.
            </p>
          </div>
          <p className="body-text">
            Depende de la <strong>frecuencia</strong>: cuántas veces vibra una onda por segundo.
          </p>
        </div>
        <FrequencyBars />
      </div>
    </div>
  );
}
```

2. Create `src/chapters/cap1/slides/SlideAltura2.tsx` (part 2: remaining content):

```tsx
export default function SlideAltura2() {
  return (
    <div className="flex-1 flex flex-col gap-10 justify-center">
      <h2 className="heading-2 self-start" data-text="Altura"><span>Altura</span></h2>
      <p className="body-text">
        Más vibraciones, sonido más agudo.
      </p>
      <p className="body-text">
        Voz <em>grave</em>: Billie Eilish susurrando. Voz <em>aguda</em>: Ariana Grande en el silbato.
      </p>
    </div>
  );
}
```

3. Register part 2 right after part 1 in `src/chapters/cap1/Cap1Presentation.tsx`:

```tsx
import SlideAltura from './slides/SlideAltura';
import SlideAltura2 from './slides/SlideAltura2';
// ...
const SLIDES = [
  SlidePortada,
  SlideMusica,
  SlideAltura,
  SlideAltura2,
  SlideIntensidad,
  // ...rest unchanged
];
```

(The exact paragraph distribution per split is decided at execution time from the slide's content; the structure above is the template.)

---

### Task 3: Reflow cap-1 (8 slides → low risk; proves the pattern)

**Files:**
- Modify: `src/chapters/cap1/slides/*.tsx`, `src/chapters/cap1/Cap1Presentation.tsx`
- Create (as needed): `src/chapters/cap1/slides/SlideAltura2.tsx`, etc.

- [ ] **Step 1: List overflowing cap-1 slides**

Run: `node scripts/check-overflow.mjs principiante-cap-1`
Expected: a list of `OVERFLOW` rows (likely incl. `SlideAltura`, `SlideIntensidad` — the 3-body slides).

- [ ] **Step 2: Fix each flagged slide**

For each, apply pattern A (trim — get user wording approval) or pattern B (split) from the Reflow procedure. Likely splits: `SlideAltura`, `SlideIntensidad`; likely trims: the 2-body slides.

- [ ] **Step 3: Re-run detector to zero**

Run: `node scripts/check-overflow.mjs principiante-cap-1`
Expected: `0 slide(s) overflowing across: principiante-cap-1`.

- [ ] **Step 4: Typecheck/build**

Run: `npm run build`
Expected: PASS (new components compile, SLIDES arrays valid).

- [ ] **Step 5: Capture screenshots and get user visual approval (gate)**

Capture the chapter's slides headless (Playwright at 1600×900, navigate via the
`[aria-label="Siguiente slide"]` button against `http://localhost:5173/#/principiante-cap-1`
— same navigation the detector uses; note `scripts/screenshot-cap.mjs` predates the
`<level>-cap-N` route format and would need its URL/viewport updated). Present the
captures to the user and get explicit approval of size + layout + any trimmed wording
before committing. The user's confirmation is the gate (headless ≠ ground truth for glow).

- [ ] **Step 6: Commit**

```bash
git add src/chapters/cap1
git commit -m "feat(cap1): reflow slides for enlarged reading text"
```

---

### Task 4: Reflow cap-3 (18 slides → medium risk)

**Files:**
- Modify: `src/chapters/cap3/slides/*.tsx`, `src/chapters/cap3/Cap3Presentation.tsx`
- Create (as needed): split components.

- [ ] **Step 1: List overflowing cap-3 slides**

Run: `node scripts/check-overflow.mjs principiante-cap-3`
Expected: a list including the pre-existing `16/18` overflow and the 3-body slides (`SlideQueEsClave`, `SlideClaveDeDo`).

- [ ] **Step 2: Fix each flagged slide**

Apply pattern A/B per slide. The pentagram-SVG slides (1 body + SVG) usually fit by trimming the single paragraph; the multi-body slides likely split. `SlideNotacionEntonacion` uses `heading-3` sub-headings (now 64) — verify it fits. **Resolve the pre-existing `16/18` overflow here.**

- [ ] **Step 3: Re-run detector to zero**

Run: `node scripts/check-overflow.mjs principiante-cap-3`
Expected: `0 slide(s) overflowing across: principiante-cap-3`.

- [ ] **Step 4: Typecheck/build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Screenshots + user visual approval (gate)** — as Task 3 Step 5.

- [ ] **Step 6: Commit**

```bash
git add src/chapters/cap3
git commit -m "feat(cap3): reflow slides for enlarged reading text"
```

---

### Task 5: Reflow cap-4 (8 slides → low/medium risk)

**Files:**
- Modify: `src/chapters/cap4/exercises/ExerciseShell.tsx` (shared prompt), `src/chapters/cap4/slides/*.tsx`, `src/chapters/cap4/Cap4Presentation.tsx`
- Create (as needed): split components.

- [ ] **Step 1: Bump the shared exercise prompt**

In `src/chapters/cap4/exercises/ExerciseShell.tsx`, the prompt uses `text-3xl`. Replace with `text-[56px]` (reading mapping). This affects all three exercise slides at once.

- [ ] **Step 2: List overflowing cap-4 slides**

Run: `node scripts/check-overflow.mjs principiante-cap-4`
Expected: a list; check the exercise slides (shell prompt + SVG board must coexist) and `SlideRecapCompas`/`SlideCierreCap4`.

- [ ] **Step 3: Fix each flagged slide**

Apply pattern A/B. For exercise slides, if the bigger prompt + board overflows, prefer trimming the prompt wording (user-approved) over splitting an interactive board.

- [ ] **Step 4: Re-run detector to zero**

Run: `node scripts/check-overflow.mjs principiante-cap-4`
Expected: `0 slide(s) overflowing across: principiante-cap-4`.

- [ ] **Step 5: Typecheck/build + tests** (cap-4 has data/validator tests)

Run: `npm run build && npm test`
Expected: PASS, 29 tests still green.

- [ ] **Step 6: Screenshots + user visual approval (gate)** — incl. clicking a palette item → slot to confirm exercises still work.

- [ ] **Step 7: Commit**

```bash
git add src/chapters/cap4
git commit -m "feat(cap4): reflow slides + exercise prompt for enlarged reading text"
```

---

### Task 6: Reflow cap-2 (15 slides → highest risk; densest, done last)

**Files:**
- Modify: `src/chapters/cap2/slides/*.tsx`, `src/chapters/cap2/Cap2Presentation.tsx`
- Create (as needed): split components.

- [ ] **Step 1: List overflowing cap-2 slides**

Run: `node scripts/check-overflow.mjs principiante-cap-2`
Expected: a long list; `SlideFiguras`, `SlideSilencios`, `SlideSonidoSilencio` are the dense, multi-utility slides.

- [ ] **Step 2: Classify `text-*` utilities, then fix each flagged slide**

For `SlideFiguras`/`SlideSilencios`: classify every `text-base/lg/xl/2xl/3xl/4xl` usage (reading vs decorative) and apply the size mapping to reading ones; then split (these likely need 2+ parts each). For the prompt/body slides apply pattern A/B. `SlideSonidoSilencio`'s `text-7xl` is a decorative symbol — leave it.

- [ ] **Step 3: Re-run detector to zero**

Run: `node scripts/check-overflow.mjs principiante-cap-2`
Expected: `0 slide(s) overflowing across: principiante-cap-2`.

- [ ] **Step 4: Typecheck/build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Screenshots + user visual approval (gate)** — as Task 3 Step 5.

- [ ] **Step 6: Commit**

```bash
git add src/chapters/cap2
git commit -m "feat(cap2): reflow slides for enlarged reading text"
```

---

### Task 7: Whole-deck verification + handoff

**Files:** none (verification only)

- [ ] **Step 1: Full-deck overflow check**

Run: `node scripts/check-overflow.mjs`
Expected: `0 slide(s) overflowing across: principiante-cap-1, principiante-cap-2, principiante-cap-3, principiante-cap-4`, exit code 0.

- [ ] **Step 2: Build, tests, lint all green**

Run: `npm run build && npm test && npm run lint`
Expected: build OK, 29 tests pass, lint clean.

- [ ] **Step 3: Final user sign-off across all four chapters**

Confirm with the user that every chapter looks right (text size, layout, trimmed wording). Headless captures are a smoke test, not ground truth for glow (`feedback_playwright_visual_verification`) — the user's confirmation is the gate.

- [ ] **Step 4: Finish the branch**

Use `superpowers:finishing-a-development-branch`. Merge to `develop`/`main` requires explicit user confirmation (project rule). Do not merge until Steps 1–3 all pass.

---

## Notes for the executor

- **Branch:** all work on `feature/reading-text-legibility`. The protect-git hook blocks commits/merges on `main`/`develop`; use `CLAUDE_GIT_OVERRIDE=1` only for merges/pushes the user has explicitly authorized.
- **Regressions:** if a change breaks something that worked, `git revert` and retry on a fresh branch — do not patch forward.
- **Trims are collaborative:** never commit reworded slide text without the user approving the wording.
- **Do not start a second dev server** — reuse the one on :5173.
- **Order:** Task 3 (cap-1) → Task 4 (cap-3) → Task 5 (cap-4) → Task 6 (cap-2), simplest → densest.
```
