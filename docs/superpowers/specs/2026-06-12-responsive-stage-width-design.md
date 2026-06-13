# Responsive stage width — design

**Date:** 2026-06-12
**Branch:** `feature/responsive-stage-width`
**Status:** approved (pending spec review)

## Problem

Today every slide is rendered onto a fixed `1180 × 820` canvas (`SlideStage`) and
scaled **uniformly** to fit the viewport:

```
scale = min(viewportWidth / 1180, viewportHeight / 820)
```

On wide (landscape) windows the scale is height-limited, so the slide fills the
height but leaves empty bars on the left/right (≈19% on a 16:9 screen). The
desired behaviour: **the rendered slide width must always be 90% of the window
width**, while the vertical behaviour stays exactly as it is today.

This intentionally changes the project-wide rule "fixed 1180×820 canvas" recorded
in the user memory `feedback_aspect_ratio_base.md`. The **height** half of that
rule stands (820 logical px, scaled to fill the viewport, px-absolute
typography); the **width** half becomes responsive.

## Decision summary

- Height keeps the current mechanism (`scale ≈ viewportHeight / 820`). On the
  target displays (iPad-landscape, 16:9, wider) the slide fills the window
  vertically exactly as today; typography stays proportional (uniform scale, no
  distortion). On windows squarer than the base canvas it gets vertical bars
  rather than overflowing — see "The math".
- The logical canvas **width** becomes responsive so that the rendered width is
  90% of the window width.
- A **minimum** logical width (≈ 1180) protects content on narrow / 4:3 / portrait
  windows: the content coordinate space is never narrower than the 1180 design
  baseline. There is **no maximum**, so wide and ultrawide windows scale up freely.
- The rendered width is **always 90% of the window width**. The floor's
  on-screen effect is on the *height*: when the window is squarer than the base
  canvas aspect, the slide stops filling the height and gets vertical bars,
  instead of overflowing horizontally.

## The math

Let `vw`, `vh` be the available container width/height (from
`getBoundingClientRect`), `H = STAGE_HEIGHT = 820`, `MIN_W = STAGE_WIDTH = 1180`,
`TARGET = 0.9`.

```
logicalWidth = max(MIN_W, (TARGET * vw) / (vh / H))
scale        = min(vh / H, (TARGET * vw) / logicalWidth)
```

Applied to the inner stage div: `width = logicalWidth`, `height = H`,
`transform: scale(scale)`.

This is a single formula that degrades gracefully across two regimes:

- **Wide regime** (window aspect ≥ base, i.e. `vw/vh ≥ MIN_W / (TARGET·H) ≈ 1.6`):
  `logicalWidth = (0.9·vw)/(vh/H)` and the `min` resolves to `scale = vh/H`.
  → `renderedWidth = 0.9·vw` (90%) **and** `renderedHeight = vh` (fills height,
  exactly as today). This covers 16:9 and every wider display — the real targets.
- **Floor regime** (window squarer than base): `logicalWidth = MIN_W = 1180` and
  the `min` resolves to `scale = (0.9·vw)/1180`.
  → `renderedWidth = 0.9·vw` (still 90%) and `renderedHeight = 820·scale < vh`
  (vertical bars). No horizontal overflow; content keeps ≥1180 logical px.

So `renderedWidth = 0.9·vw` in **both** regimes. The remaining 10% horizontal
space is split as 5% margins by the existing centering container.

### Reference values

| Window         | scale | logicalWidth | renderedWidth | renderedHeight   |
|----------------|-------|--------------|---------------|------------------|
| 1920×1080 16:9 | 1.317 | ~1312        | 1728 (90%)    | 1080 (fills)     |
| 3440×1440 21:9 | 1.756 | ~1763        | 3096 (90%)    | 1440 (fills)     |
| 1024×768 4:3   | 0.781 | 1180 (floor) | ~922 (90%)    | ~640 (V-bars)    |

(4:3 hits the floor: unclamped logical width would be ~983 < 1180, so it is held
at 1180 and the scale becomes width-driven — width stays at 90%, height no longer
fills. iPad-landscape / 16:9 / projectors never hit the floor.)

## Components

### 1. `SlideStage` (`src/components/SlideStage.tsx`) — core change

`computeStageTransform` is replaced. Instead of returning only `{ scale, rotated }`,
it returns `{ scale, logicalWidth, rotated }`:

- Landscape (normal):
  `logicalWidth = max(width, (0.9 * rect.width) / (rect.height / height))`,
  then `scale = min(rect.height / height, (0.9 * rect.width) / logicalWidth)`.
- The inner div's `width` becomes `logicalWidth` (a CSS variable or inline style)
  instead of the fixed `width` prop.
- `STAGE_WIDTH` (1180) is reinterpreted as the **floor** of the logical width, not
  a fixed dimension. `STAGE_HEIGHT` (820) stays the fixed logical height.
- `recompute` runs on the same triggers as today (ResizeObserver + resize).

### 2. Portrait / touch rotation (`rotateOnPortrait`)

Keep the existing rotate-on-portrait behaviour for touch devices. When rotated,
the same "90% of the available (rotated) width, scaled by the rotated height"
logic applies — the width/height roles swap. Exact formula finalised in the
implementation plan; this is a contained branch in `computeStageTransform`.

### 3. Content pass (per chapter)

The scan shows content is already largely fluid, so this is mostly verification,
not restructuring:

- Text/definition blocks use `max-w-[…]` (1300–1700px) + flex/centering → they
  grow into a wider canvas up to their cap and center otherwise.
- Visualizations are SVG with `viewBox` (Pentagrama, HarmonyWaves, PlicaQuiz,
  cap4 boards) → they scale to their container automatically.
- cap4 exercises are **click/tap based** (select a palette item, click a slot) —
  **no pointer→coordinate drag math**, so they are resolution/width independent.
  Only their visual layout needs a look, like any other slide.
- Almost nothing hardcodes 1180 (only a default in `useViewportOrientation.ts`,
  which is an SSR fallback, not a layout constraint).

Work: visually audit each chapter at three aspect ratios (4:3, 16:9, ultrawide),
adjust `max-w-[…]` caps only where a slide looks too sparse or too cramped.

### 4. Global rule update

After implementation, update the user memory `feedback_aspect_ratio_base.md`:
height stays a fixed scaled canvas (820); width becomes responsive 90vw with a
1180 floor. (Handled by the assistant at task close, not a code change.)

## Approaches considered

- **A+ (chosen):** responsive logical width with a floor (≈1180), no ceiling.
  Rendered width is 90% on every window; the floor keeps the content coordinate
  space ≥1180 on squarer-than-base windows (which there gives vertical bars
  instead of horizontal overflow). Minimal structural change (mostly `SlideStage`).
- **A (no floor):** strict 90% on every window. Rejected: content gets crushed on
  4:3 / very narrow windows and would force more per-slide rework.
- **B (floor + ceiling clamp):** predictable design range, but violates the
  literal "always 90%" on ultrawide. Rejected.
- **CSS-fluid, no scale transform:** rejected earlier — contradicts the decision
  to keep height-based scaling and proportional px typography.

## Testing

- **Unit:** `computeStageTransform` is pure — test it directly for landscape and
  rotated cases across representative `(vw, vh)` inputs, asserting
  `renderedWidth ≈ 0.9 * vw` when above the floor and `logicalWidth === 1180` at
  the floor. (TDD: red → green.)
- **Smoke:** existing `src/__tests__/smoke.test.ts` must keep passing.
- **Visual (manual):** per-chapter pass at 4:3 / 16:9 / ultrawide. Requires user
  confirmation — headless captures are not ground truth for the neon/glow
  compositing (per `feedback_playwright_visual_verification`).

## Out of scope

- Changing the 820 logical height or the px-absolute typography model.
- Restructuring any slide that already lays out fluidly.
- A maximum logical width / ultrawide content cap (rejected as Approach B).
