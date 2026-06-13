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

Measured fact: all 49 rendered slides are authored to fill the frame (content
fill ≈ frame minus padding on every slide; cap-3 slide 16/18 already overflows
slightly today). Therefore doubling reading text overflows essentially every
slide → content per slide must shrink. There is no geometric shortcut (reducing
`STAGE_HEIGHT` is mathematically equivalent to enlarging the fonts).

## Decisions

- **Scope:** enlarge **reading text** (body, subtitle, small captions). Titles
  are already large; they rise only enough to preserve hierarchy.
- **Fit strategy:** **hybrid per slide** — if a slide fits by trimming prose,
  trim it; otherwise split into `parts`. Decided slide-by-slide.
- **Editorial caveat:** trimming prose is a content/pedagogical decision. The
  assistant proposes terser wording; **the user approves the text** of every
  slide that is trimmed. Per-chapter work is therefore collaborative.
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

Resulting ladder, smallest→largest: body/subtitle 56 < heading-3 64 < heading-2
84 < heading-1 120.

**Unchanged (decorative / icon / navigation chrome, NOT slide reading text):**
`.tagline` (30, Cinzel decorative), `.def-symbol` (48 icon), `.timbre-emoji`
(80 emoji), `.nav-btn` (2.4rem, nav arrows — outside the canvas), `.counter`
(1.6rem, slide counter — outside the canvas).

### Phase 0 — exact `globals.css` edits

Single-property `font-size` changes, by current line:

| Line | Selector | From | To |
|---|---|---|---|
| 50 | `.heading-1` | `font-size: 96px;` | `font-size: 120px;` |
| 60 | `.heading-2` | `font-size: 60px;` | `font-size: 84px;` |
| 99 | `.heading-3` | `font-size: 34px;` | `font-size: 64px;` |
| 109 | `.body-text, …` | `font-size: 28px;` | `font-size: 56px;` |
| 117 | `.subtitle` | `font-size: 30px;` | `font-size: 56px;` |
| 352 | `.timbre-name` | `font-size: 22px;` | `font-size: 40px;` |
| 359 | `.timbre-desc` | `font-size: 18px;` | `font-size: 36px;` |

No other `globals.css` rules change. `line-height`/`letter-spacing` stay (they
are unitless or em-relative and scale with the font). After Phase 0 the slides
overflow — expected; this state lives only on the feature branch.

### Tailwind text utilities in slides

Slides also use raw Tailwind `text-*` utilities for reading content. Audit
(occurrences across slides): `text-3xl`×14, `text-2xl`×6, `text-xl`×4,
`text-lg`×5, `text-base`×4, `text-4xl`×2, `text-7xl`×1, `text-sm`×1. These are a
**mix** of reading text, small labels, and large decorative numbers — no blanket
replace. During each chapter's pass, classify every `text-*` usage:

- **Reading text** (e.g. the `text-3xl` exercise prompts): bump to the new
  reading scale — replace with the matching class (`.body-text`/`.subtitle`) or
  an arbitrary value (`text-[56px]`), kept below the slide title.
- **Decorative/structural** (large display numbers, tiny badges): leave or scale
  to taste — not driven by the legibility goal.

The shared `cap4/exercises/ExerciseShell.tsx` holds the exercise prompt text
(`text-3xl`) for all three cap-4 exercise slides — bump it once there.

## Per-chapter slide inventory & reflow notes

Authoritative rendered-slide counts (the units of reflow): cap-1 = 8, cap-2 =
15, cap-3 = 18, cap-4 = 8 → **49 total**. Some slide files render more than one
rendered slide/part; the player count governs. Risk = likelihood of needing a
split (vs. fitting by trim) once reading text is at the new size.

**cap-1 (8) — low risk.** Pattern is `heading-2 + body-text`.
- `SlideAltura` (3 body), `SlideIntensidad` (3 body) — split-likely.
- `SlideMusica`, `SlideRitmo`, `SlideMelodia`, `SlideArmonia` (2 body), `SlideTimbre` (1 body + timbre cards) — trim-likely.
- `SlidePortada` (heading-1 + tagline + text-3xl) — minimal text, low risk.

**cap-2 (15) — highest risk.** Dense, many `text-*` utilities.
- `SlideFiguras`, `SlideSilencios` (subtitle + text-base/lg/xl/2xl/3xl/4xl, figure grids) — split-likely, most complex.
- `SlideSonidoSilencio` (body + text-2xl + text-7xl) — split-likely.
- `SlideEjercicio`, `SlideEquivalencia` (heading-2 + text-3xl prompts) — trim/bump prompts.
- `SlideQueSon`, `SlidePlicaIntro` (2 body), `SlidePlicaArriba/Abajo` (1 body) — trim-likely.
- `SlideCierreCap2` (heading-1 + subtitle + body + text-3xl), `SlidePortadaCap2` — low/medium.
- (PlicaQuiz visualization renders interactive steps — verify it fits; SVG scales.)

**cap-3 (18) — medium risk.** Mostly `heading-2 + body-text` + pentagram SVGs.
- `SlideQueEsClave`, `SlideClaveDeDo` (3 body) — split-likely.
- `SlideNotacionEntonacion` (2 body + heading-3 sub-headings) — confirms h3>body; medium.
- The notas/pentagrama slides (1 body + SVG) — trim-likely; SVGs scale to container.
- **Fix the pre-existing `cap-3` 16/18 overflow** during this pass.
- `SlideBarras`, `SlideCatalogoSignos` (heading-2 only) — low risk.

**cap-4 (8) — low/medium risk.** Interactive exercises.
- `SlideEjercicioBarras/Completar/Construir` — no own text classes; reading text
  comes from shared `ExerciseShell` (`text-3xl`). Boards are SVG (`viewBox`,
  scale) and click-based. Verify shell prompt + board coexist without overflow.
- `SlideRecapCompas` (heading-2 + body), `SlideCierreCap4` (heading-1 + subtitle
  + body + text-3xl), `SlidePortadaCap4` — trim-likely / low.

## Delivery (global CSS coupling)

The reading classes are global, so changing their sizes affects all four
chapters at once. The size bump cannot be merged on its own — it would leave 49
overflowing slides on `develop`, violating the no-overflow rule. Therefore:

- **One dedicated branch** `feature/reading-text-legibility` (worktree
  recommended for isolation), executed in **phases**:
  - **Phase 0:** apply the Phase-0 `globals.css` edits. Slides overflow
    (expected; feature branch only).
  - **Phases 1–4:** reflow `cap-1`, `cap-2`, `cap-3`, `cap-4`. For each chapter,
    walk every rendered slide, resolve overflow (trim → user approves wording,
    or split into `parts`), classify/bump any `text-*` utilities, and pass the
    per-chapter visual gate.
- **Merge to `develop` only when all four chapters pass** (zero overflow across
  all 49+ slides). `develop`/`main` are never left overflowing.
- The implementation plan splits each chapter phase into per-slide tasks. Merge
  to `develop`/`main` requires explicit user confirmation (project rule).

Suggested order: cap-1 (simplest, validates the pattern) → cap-3 → cap-4 →
cap-2 (densest, last, once the pattern is proven).

## Verification

- **Automated overflow detector (smoke):** a headless script (Playwright,
  against the dev server) that walks every rendered slide of a chapter and
  asserts no overflow of the 820 canvas. Per slide: locate the `.neon-frame`
  content wrapper and assert `wrapper.scrollHeight <= wrapper.clientHeight + 1`
  AND no descendant's bounding box extends beyond the wrapper's box. Reports
  `chapter / slide / pass|OVERFLOW`. A chapter's gate requires zero OVERFLOW.
  (This also catches the pre-existing cap-3 16/18 case.)
- **Per-chapter visual gate (user):** headless captures are a smoke test, not
  ground truth for glow/blur (`feedback_playwright_visual_verification`). The
  user confirms each chapter visually (text size + layout + any trimmed wording)
  before it is marked done.
- **Existing automated tests** (`npm test`, 29) and `npm run build` /
  `npm run lint` must stay green throughout.

## Out of scope

- Navigation chrome sizes (`.nav-btn`, `.counter`) and decorative elements
  (`.tagline`, `.def-symbol`, `.timbre-emoji`).
- The responsive-width / height-scaling model (unchanged;
  `feedback_aspect_ratio_base`).
- Rewriting teaching content beyond what is needed to fit the larger text
  (trims are minimal and user-approved).
- Mockup/placeholder chapters (`status: 'mockup'`); only `principiante-cap-1..4`.
