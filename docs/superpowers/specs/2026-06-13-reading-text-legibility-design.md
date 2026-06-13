# Reading-text legibility (bigger slide text) — design

**Date:** 2026-06-13
**Branch:** `feature/reading-text-legibility`
**Status:** approved (pending spec review)

## Problem

The presentations are shown on a projector / classroom TV. Viewed from a
distance, the **reading text** (body copy, subtitles, small captions) is too
small for teenagers to read. The user wants the reading text **at least
doubled**.

## The geometric constraint (why this is big)

On-screen text size = `logical font-size × scale`, and `scale = viewportHeight /
820` (height-driven, see `feedback_aspect_ratio_base`). Each slide already fills
the viewport height, so text is a fixed fraction of the projected image.
Increasing a class's `font-size` makes the text a bigger fraction of the
820 canvas → content overflows. The project rule forbids scroll/shrink:
overflow must be resolved by **splitting a slide into `parts`** (see
`feedback_slide_overflow`).

Measured fact: all 49 implemented slides are authored to fill the frame (content
fill ≈ frame minus padding on every slide; cap-3 slide 16/18 already overflows
slightly today). Therefore doubling reading text overflows essentially every
slide → content per slide must shrink. There is no geometric shortcut (reducing
`STAGE_HEIGHT` is mathematically equivalent to enlarging the fonts).

## Decisions

- **Scope:** enlarge **reading text** (body, subtitle, small captions). Titles
  are already large; they rise only enough to preserve hierarchy (see below).
- **Hierarchy:** doubling body (28→56) would tie `heading-2` (60). To keep
  titles dominant, titles rise modestly.
- **Fit strategy:** **hybrid per slide** — if a slide fits by trimming prose,
  trim it; otherwise split into `parts`. Decided slide-by-slide.
- **Editorial caveat:** trimming prose is a content/pedagogical decision. The
  assistant proposes terser wording; **the user approves the text** of every
  slide that is trimmed. Per-chapter work is therefore collaborative, not
  autonomous.
- **Invariant:** no slide may overflow the 820 canvas after the change.

## The size system

All sizes in px on the 1180-wide × 820-tall logical canvas (scaled by
`SlideStage`). Defined in `src/styles/globals.css`.

**Reading text (≈2×):**

| Class | Now | New |
|---|---|---|
| `.body-text` (+ `p`, `li`) | 28 | **56** |
| `.subtitle` | 30 | **56** (weight 600 differentiates from body) |
| `.timbre-name` | 22 | **40** |
| `.timbre-desc` | 18 | **36** |

**Titles (rise to keep hierarchy above 56 body):**

| Class | Now | New |
|---|---|---|
| `.heading-1` | 96 | **120** |
| `.heading-2` | 60 | **84** |
| `.heading-3` | 34 | **64** (must stay above body 56 — 48 would invert the hierarchy) |

Resulting ladder, smallest→largest: body/subtitle 56 < heading-3 64 < heading-2 84 < heading-1 120.

**Unchanged (decorative / icon / navigation chrome, NOT slide reading text):**
`.tagline` (30, Cinzel decorative), `.def-symbol` (48 icon), `.timbre-emoji`
(80 emoji), `.nav-btn` (2.4rem, nav arrows — outside the canvas), `.counter`
(1.6rem, slide counter — outside the canvas).

### Tailwind text utilities in slides

Slides also use raw Tailwind `text-*` utilities for reading content, not just
the CSS classes. Audit (occurrences): `text-3xl`×14, `text-2xl`×6, `text-xl`×4,
`text-lg`×5, `text-base`×4, `text-4xl`×2, `text-7xl`×1, `text-sm`×1.

These are a **mix** of reading text, small labels, and large decorative numbers.
Rule: during each chapter's pass, classify every `text-*` usage:
- **Reading text** (e.g. the `text-3xl` exercise prompts in cap-2/cap-4
  `ExerciseShell`, `SlideEjercicio`, `SlideEquivalencia`): bump to match the new
  reading scale — replace with the matching class (`.body-text`/`.subtitle`) or
  an arbitrary value (`text-[56px]`), keeping it below the slide title.
- **Decorative/structural** (large display numbers, tiny badges): leave as-is or
  scale to taste — not driven by the legibility goal.

There is no blanket find-replace; classification is per usage.

## Delivery (global CSS coupling)

The reading classes are global, so changing their sizes affects all four
chapters at once. The size bump cannot be merged on its own — it would leave 49
overflowing slides on `develop`, violating the no-overflow rule. Therefore:

- **One dedicated branch** `feature/reading-text-legibility` (worktree
  recommended for isolation), executed in **phases**:
  - **Phase 0:** apply the size system in `globals.css`. After this, slides
    overflow — expected, lives only on the feature branch.
  - **Phases 1–4:** reflow `cap-1`, `cap-2`, `cap-3`, `cap-4`. For each chapter,
    walk every slide, resolve overflow (trim → user approves wording, or split
    into `parts`), and pass the per-chapter visual gate.
- **Merge to `develop` only when all four chapters pass** (zero overflow across
  all 49+ slides). `develop`/`main` are never left in an overflowing state.
- Each phase is large; the implementation plan may further split a chapter into
  per-slide tasks. Merge to `develop`/`main` requires explicit user confirmation
  (project rule).

## Verification

- **Automated overflow detector (smoke):** a headless script that walks every
  slide of every chapter and asserts the slide content does not overflow the
  820 canvas (`scrollHeight <= clientHeight` on the content wrapper, and no
  child extends past the frame). Run per chapter after its reflow; must report
  zero overflow before the chapter's gate. This also catches the pre-existing
  cap-3 16/18 overflow (fix it in that chapter's pass).
- **Per-chapter visual gate (user):** headless captures are a smoke test, not
  ground truth for glow/blur (`feedback_playwright_visual_verification`). The
  user confirms each chapter visually (text size + layout) before it is done.
- **Existing automated tests** (`npm test`, 29) and `npm run build` /
  `npm run lint` must stay green throughout.

## Out of scope

- Navigation chrome sizes (`.nav-btn`, `.counter`) and decorative elements
  (`.tagline`, `.def-symbol`, `.timbre-emoji`).
- The responsive-width / height-scaling model (unchanged;
  `feedback_aspect_ratio_base`).
- Rewriting teaching content beyond what is needed to fit the larger text
  (trims are minimal and user-approved).
- Mockup/placeholder chapters (`status: 'mockup'`); only the 4 implemented
  chapters (`principiante-cap-1..4`) are in scope.
