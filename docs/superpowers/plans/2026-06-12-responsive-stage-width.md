# Responsive Stage Width Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every slide render at exactly 90% of the window width on all displays, while the height keeps its current scaled-canvas behaviour.

**Architecture:** Extract the pure scaling math out of `SlideStage` into a standalone, unit-tested module (`stageTransform.ts`). The new math is height-driven (`scale ≈ vh/820`) and derives a *responsive logical width* so the rendered width is always `0.9·vw`, with a `1180` floor on the logical width to protect content on windows squarer than the base canvas. `SlideStage` consumes the module and applies `logicalWidth` to the inner stage div via a CSS variable, mirroring the existing `--stage-scale`/`--stage-rotate` pattern.

**Tech Stack:** React 19, TypeScript, Vite, Vitest (node environment), Tailwind. Spec: `docs/superpowers/specs/2026-06-12-responsive-stage-width-design.md`.

---

## File Structure

- **Create** `src/components/stageTransform.ts` — pure scaling logic + canvas constants (`STAGE_WIDTH`, `STAGE_HEIGHT`, `WIDTH_TARGET`, `computeStageTransform`, `StageTransform` type). No React imports, so it is trivially unit-testable in the node test environment.
- **Create** `src/components/stageTransform.test.ts` — unit tests for `computeStageTransform` (landscape wide regime, landscape floor regime, rotated/portrait).
- **Modify** `src/components/SlideStage.tsx` — remove the inline `computeStageTransform`/`StageTransform`/constants; import them from `stageTransform.ts`, re-export the constants (API-stable), destructure `logicalWidth`, and drive the inner div width from it.

No other files change in code. Content is already fluid (flex + `max-w-[…]` + SVG `viewBox`; cap4 exercises are click-based). The per-chapter pass (Task 3) is visual verification, with `max-w` tweaks only if a slide looks wrong.

---

### Task 1: Pure scaling module + tests

**Files:**
- Create: `src/components/stageTransform.ts`
- Test: `src/components/stageTransform.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/components/stageTransform.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import {
  computeStageTransform,
  STAGE_WIDTH,
  STAGE_HEIGHT,
} from '@/components/stageTransform';

const stage = { width: STAGE_WIDTH, height: STAGE_HEIGHT };

describe('computeStageTransform — landscape', () => {
  it('16:9 wide regime: rendered width is 90% of vw and height fills vh', () => {
    const rect = { width: 1920, height: 1080 };
    const { scale, logicalWidth, rotated } = computeStageTransform(rect, stage, false);

    expect(rotated).toBe(false);
    expect(logicalWidth).toBeGreaterThan(STAGE_WIDTH); // not floored
    expect(logicalWidth * scale).toBeCloseTo(0.9 * rect.width, 1); // rendered width = 90%
    expect(STAGE_HEIGHT * scale).toBeCloseTo(rect.height, 1); // height fills
  });

  it('ultrawide 21:9: still 90% width, height fills, width not floored', () => {
    const rect = { width: 3440, height: 1440 };
    const { scale, logicalWidth } = computeStageTransform(rect, stage, false);

    expect(logicalWidth).toBeGreaterThan(STAGE_WIDTH);
    expect(logicalWidth * scale).toBeCloseTo(0.9 * rect.width, 1);
    expect(STAGE_HEIGHT * scale).toBeCloseTo(rect.height, 1);
  });

  it('4:3 floor regime: logical width is floored at 1180, width stays 90%, height letterboxes', () => {
    const rect = { width: 1024, height: 768 };
    const { scale, logicalWidth } = computeStageTransform(rect, stage, false);

    expect(logicalWidth).toBe(STAGE_WIDTH); // floored
    expect(logicalWidth * scale).toBeCloseTo(0.9 * rect.width, 1); // still 90% width
    expect(STAGE_HEIGHT * scale).toBeLessThan(rect.height); // vertical bars, no overflow
  });
});

describe('computeStageTransform — rotated (portrait/touch)', () => {
  it('portrait phone: on-screen width (logical height axis) is 90% of vw, long axis fills vh', () => {
    const rect = { width: 390, height: 844 };
    const { scale, logicalWidth, rotated } = computeStageTransform(rect, stage, true);

    expect(rotated).toBe(true);
    // After -90deg the fixed logical height (820) becomes the on-screen width.
    expect(STAGE_HEIGHT * scale).toBeCloseTo(0.9 * rect.width, 1);
    // The logical width axis becomes the long (vertical) axis and fills vh.
    expect(logicalWidth * scale).toBeCloseTo(rect.height, 1);
    expect(logicalWidth).toBeGreaterThan(STAGE_WIDTH);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- stageTransform`
Expected: FAIL — `Failed to resolve import "@/components/stageTransform"` (module does not exist yet).

- [ ] **Step 3: Write minimal implementation**

Create `src/components/stageTransform.ts`:

```ts
export const STAGE_WIDTH = 1180;
export const STAGE_HEIGHT = 820;
export const WIDTH_TARGET = 0.9;

export type StageTransform = {
  scale: number;
  logicalWidth: number;
  rotated: boolean;
};

export function computeStageTransform(
  rect: { width: number; height: number },
  stage: { width: number; height: number },
  shouldRotate: boolean,
): StageTransform {
  if (shouldRotate) {
    // Rotated -90deg: the fixed logical height maps to the on-screen width,
    // the floored logical width maps to the long (vertical) on-screen axis.
    const baseScale = (WIDTH_TARGET * rect.width) / stage.height;
    const logicalWidth = Math.max(stage.width, rect.height / baseScale);
    const scale = Math.min(baseScale, rect.height / logicalWidth);
    return { scale, logicalWidth, rotated: true };
  }

  const baseScale = rect.height / stage.height;
  const logicalWidth = Math.max(stage.width, (WIDTH_TARGET * rect.width) / baseScale);
  const scale = Math.min(baseScale, (WIDTH_TARGET * rect.width) / logicalWidth);
  return { scale, logicalWidth, rotated: false };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- stageTransform`
Expected: PASS — all four tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/stageTransform.ts src/components/stageTransform.test.ts
git commit -m "feat(stage): responsive logical-width scaling math with 1180 floor"
```

---

### Task 2: Wire SlideStage to the responsive logical width

**Files:**
- Modify: `src/components/SlideStage.tsx`

- [ ] **Step 1: Replace the top of SlideStage.tsx (imports, constants, remove inline math)**

Replace lines 1–30 (the imports, the `STAGE_WIDTH`/`STAGE_HEIGHT` consts, the local `StageTransform` type, and the entire local `computeStageTransform` function) with:

```tsx
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { useViewportOrientation } from '@/hooks/useViewportOrientation';
import { computeStageTransform, STAGE_WIDTH, STAGE_HEIGHT } from './stageTransform';

export { STAGE_WIDTH, STAGE_HEIGHT };

export type SlideStageProps = {
  children: ReactNode;
  width?: number;
  height?: number;
  className?: string;
  rotateOnPortrait?: boolean;
};
```

The `SlideStage` component (its props/defaults `width = STAGE_WIDTH, height = STAGE_HEIGHT`) stays. `width` now means the **floor** of the logical width.

- [ ] **Step 2: Update the recompute body to apply logicalWidth**

In the `recompute` closure inside `useLayoutEffect`, replace the destructure + style writes so it reads:

```tsx
    const recompute = () => {
      const rect = outer.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const shouldRotate = rotateOnPortrait && orientation === 'portrait' && isTouchDevice;
      const { scale, logicalWidth, rotated } = computeStageTransform(
        { width: rect.width, height: rect.height },
        { width, height },
        shouldRotate,
      );
      inner.style.setProperty('--stage-width', `${logicalWidth}px`);
      inner.style.setProperty('--stage-scale', String(scale));
      inner.style.setProperty('--stage-rotate', rotated ? '-90deg' : '0deg');
    };
```

- [ ] **Step 3: Drive the inner div width from the CSS variable**

In the returned JSX, change the inner div's `style` so `width` reads the variable (with the floor as first-paint fallback):

```tsx
        style={{
          width: `var(--stage-width, ${width}px)`,
          height,
          flex: '0 0 auto',
          transformOrigin: 'center center',
          transform: 'rotate(var(--stage-rotate, 0deg)) scale(var(--stage-scale, 1))',
        }}
```

(The outer wrapper div is unchanged: `relative flex items-center justify-center w-full h-full overflow-hidden`, which centres the slide and clips any letterbox bars.)

- [ ] **Step 4: Typecheck and build**

Run: `npm run build`
Expected: PASS — `tsc -b` reports no errors and `vite build` completes. (Confirms the changed return type of `computeStageTransform` and the import/re-export wiring are sound.)

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: PASS — `stageTransform` tests + the existing `smoke` test all green.

- [ ] **Step 6: Lint**

Run: `npm run lint`
Expected: PASS — no new lint errors in `SlideStage.tsx` / `stageTransform.ts`.

- [ ] **Step 7: Commit**

```bash
git add src/components/SlideStage.tsx
git commit -m "feat(stage): drive slide width from responsive logical width"
```

---

### Task 3: Per-chapter visual verification pass

This task changes code **only if** a slide looks wrong at a non-1180 width. It is primarily verification. Headless captures are a smoke test, not ground truth for the neon/glow compositing — final sign-off is the user's (per `feedback_playwright_visual_verification`).

**Files:**
- Modify (only if needed): individual `src/chapters/capN/slides/*.tsx` — adjust `max-w-[…]` caps where content looks too sparse (ultrawide) or too cramped (4:3).

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: Vite serves on `http://localhost:5173`.

- [ ] **Step 2: Check each chapter at three window aspect ratios**

For each route — `/#/cap-1`, `/#/cap-2`, `/#/cap-3`, `/#/cap-4` — resize the browser window to roughly:
- **16:9** (e.g. 1600×900) — expect the slide to fill the height and span ~90% of the width.
- **Ultrawide** (e.g. 2100×900) — expect ~90% width; check definition boxes / SVG visualizations don't leave awkward gaps.
- **4:3** (e.g. 1024×768) — expect ~90% width with small top/bottom bars; check nothing is cramped or clipped.

Arrow keys advance slides. Pay attention to: `def-box` width, `Pentagrama`/`HarmonyWaves`/`PlicaQuiz` SVG sizing, and the cap4 exercise boards (`/#/cap-4`) — select a palette item and click a slot to confirm clicks still register at the new widths.

- [ ] **Step 3: Adjust `max-w` caps only where needed**

If (and only if) a slide looks wrong, tweak its `max-w-[…]` value. Example pattern (no change required unless the visual pass flags it):

```tsx
// before
<div className="def-box max-w-[1500px]">
// after — only if content looked too narrow on ultrawide
<div className="def-box max-w-[1700px]">
```

Re-run `npm run build` after any edit. Expected: PASS.

- [ ] **Step 4: Optional headless smoke capture**

Run: `node scripts/screenshot-cap.mjs 1 8` (repeat per cap; the script captures at 1180×820). Use these only as a regression smoke test — confirm no layout exploded. They do NOT validate glow/blur.

- [ ] **Step 5: Request user confirmation (gate)**

Present the visual result to the user (screenshots and/or a description) and ask them to confirm the 90%-width behaviour looks right across the chapters before the task is considered complete. Do not claim the visual work is done without this confirmation.

- [ ] **Step 6: Commit (only if Step 3 made changes)**

```bash
git add src/chapters
git commit -m "fix(slides): tune max-width caps for responsive stage width"
```

---

### Task 4: Update the global aspect-ratio memory (assistant, non-code)

Not a code change — the assistant updates the user memory at task close so the project rule matches reality.

- [ ] **Step 1:** Edit `~/.claude/projects/-Users-arturoortiz-Proyectos-Personales-Musica/memory/feedback_aspect_ratio_base.md`: height stays a fixed scaled canvas (820, px-absolute typography); width becomes responsive so the render is 90% of the window width, with a 1180 logical-width floor. Keep the `MEMORY.md` pointer line in sync.

---

## Notes for the executor

- **Branch:** all work stays on `feature/responsive-stage-width`. No merge to `develop`/`main` without explicit user confirmation.
- **Regressions:** if a change breaks something that worked, `git revert` the offending commit and retry on a fresh branch — do not patch forward.
- **TDD:** Task 1 is strict red→green. Tasks 2–3 are wiring/verification (no new pure logic to test beyond Task 1).
