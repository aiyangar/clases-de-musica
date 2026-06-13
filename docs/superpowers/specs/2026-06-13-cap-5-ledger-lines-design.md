# Capítulo V · Líneas Adicionales — design

**Date:** 2026-06-13
**Branch:** `feature/cap-5-ledger-lines`
**Status:** approved (pending spec review)

## Problem

`principiante-cap-5` ("Líneas Adicionales", tagline "Códigos del Registro",
accent `lime`) exists in the registry only as a **mockup** (`status: 'mockup'`,
no `presentation`). This chapter builds the real presentation: a set of slides
that teach ledger lines (líneas adicionales) — the short lines added above and
below the staff to extend a note's range — plus an interactive note-naming
exercise. Content comes from the user's temario.

## Source temario (verbatim intent)

- Líneas adicionales: se añaden arriba y abajo del pentagrama; la distancia
  entre ellas es igual a la del pentagrama; son líneas más cortas.
- Las superiores se cuentan de **abajo hacia arriba**; las inferiores de
  **arriba hacia abajo**.
- Escribir (demostrar) tres escalas:
  1. Descendente de Re a Mi con líneas adicionales **inferiores**, en clave de Sol.
  2. Ascendente de Sol a Do y luego de Do a Do con líneas adicionales **superiores** (clave de Sol).
  3. Escala completa inferior y superior en clave de **Fa**.
- Ejercicio: colocar el nombre de la nota según la línea adicional —
  4 en clave de Sol y 4 en clave de Fa, superiores e inferiores.

## Decisions (from brainstorming)

- **Scale slides are static demonstrations** (the scale already written on the
  staff, each note labeled). The only interactive part is the note-naming
  exercise.
- **Note-naming exercise = multiple-choice quiz** (PlicaQuiz-style): show a note
  on its ledger line, student taps the correct name from a button row, with
  scoring. Touch-friendly for projector/TV.
- **Scale note sequences are interpreted here and validated by the user at
  render** (the user approves the rendered slides).
- **Pentagrama gets an opt-in range enhancement** (below) so ledger-line notes
  far from the staff are never clipped; default behavior unchanged so cap-3 is
  untouched.
- **Authored at the current (post-legibility) big type scale**; every rendered
  slide must pass the overflow detector and the chapter is aligned to cap-2's
  polish (project consistency rule).

## Architecture / wiring

Activate the chapter (mirrors cap-1..4):

1. Create `src/chapters/cap5/Cap5Presentation.tsx` exporting a `ChapterPlayer`
   over a `SLIDES` array (same pattern as `Cap4Presentation.tsx`).
2. In `src/chapters/registry.ts`: `import Cap5Presentation`, add
   `presentation: Cap5Presentation` to the cap-5 entry, change
   `status: 'mockup'` → `status: 'available'`.
3. Routing (`App.tsx`) and the dashboard need no change — they already dispatch
   `chapter.presentation` for any `#/principiante-cap-N`.

Accent: **lime** (per registry). Use cap-5's accent color consistently in
portada/cierre glow and quiz highlights, the way cap-4 used orange — resolve the
concrete lime hex from the existing accent→color mapping during implementation.

## Pentagrama enhancement (opt-in vertical range)

`src/components/music/Pentagrama.tsx` has a fixed `viewBox="0 0 800 320"`
(staff at y 110–210). Notes/labels beyond ≈ step −6 / +12 clip. Cap-5 needs
several ledger lines in both directions.

**Add an opt-in `fitNotes` (boolean) prop** (default `false` → current behavior,
cap-3 unaffected). When `true`, compute the vertical extent across all rendered
notes — including their ledger lines and label offsets (`labelYFor`, notehead
half-height) — and expand the `viewBox` (top/bottom) with a small padding so
everything fits. The staff geometry stays fixed; only the viewBox grows. `width`
stays the input; height follows the new viewBox aspect ratio (so the staff is
not distorted). This is the correct, reusable improvement and is the unit that
makes the scale demos and quiz cards render cleanly.

## Slide inventory (≈10 rendered slides; splits decided at render)

All authored with the big type scale (`heading-2`, `body-text`/`def-box`, and
the shared `Pentagrama` with `fitNotes`). Final count is whatever the overflow
detector accepts at 0 overflow.

1. **SlidePortadaCap5** — `CAPÍTULO V` · `Líneas Adicionales` (heading-1) ·
   tagline "Códigos del Registro". Lime accent. (Pattern: SlidePortadaCap4.)
2. **SlideQueSon** — def-box: líneas cortas añadidas arriba/abajo, **mismo
   espacio** que las del pentagrama. One `Pentagrama` (`fitNotes`) with a note
   above and a note below to show upper/lower ledger lines.
3. **SlideConteo** — superiores se cuentan **de abajo hacia arriba**, inferiores
   **de arriba hacia abajo**. Diagram: notes placed on the 1ª/2ª/3ª ledger lines
   above and below, labeled with ordinals (via note `label`). May be one slide
   or split upper/lower if it overflows.
4. **SlideEscalaDescendente** — clave de Sol, descending, lower ledger:
   **Re-Do-Si-La-Sol-Fa-Mi** (Re₄→Mi₃; steps −1,−2,−3,−4,−5,−6,−7). One
   `Pentagrama` (`fitNotes`), each note labeled.
5. **SlideEscalaAscendente** — clave de Sol, ascending, upper ledger:
   **Sol-La-Si-Do** (Sol₅→Do₆; steps 9,10,11,12) and the octave
   **Do-Re-Mi-Fa-Sol-La-Si-Do** (Do₆→Do₇; steps 12…19). Likely **two stacked
   pentagrams** (the 4-note run + the 8-note octave) on one slide, or split into
   two slides if it crowds.
6. **SlideEscalaFa** — clave de Fa, complete lower+upper: lower octave
   **Do₂→Do₃** (steps −4…3) and upper octave **Do₃→Do₄** (steps 3…10), two
   stacked pentagrams (or two slides). Shows both lower and upper ledger ranges.
7. **SlideEjercicio (clave de Sol) — 1/2** — `LedgerNoteQuiz` with 4 questions
   (mix of upper & lower ledger):
   - Do₄ (step −2, lower ledger 1) → "Do"
   - La₃ (step −4, lower ledger 2) → "La"
   - La₅ (step 10, upper ledger 1) → "La"
   - Do₆ (step 12, upper ledger 2) → "Do"
8. **SlideEjercicio (clave de Fa) — 2/2** — `LedgerNoteQuiz` with 4 questions:
   - Do₄ (step 10, upper ledger 1) → "Do"
   - Mi₄ (step 12, upper ledger 2) → "Mi"
   - Mi₂ (step −2, lower ledger 1) → "Mi"
   - Do₂ (step −4, lower ledger 2) → "Do"
9. **SlideCierreCap5** — FIN DEL CAPÍTULO V (pattern: SlideCierreCap4), lime
   accent, def-box recap + subtitle teaser.

Step↔note reference (for authoring; treble step 0 = bottom line Mi₄, bass step 0
= bottom line Sol₂; +2 per staff line, even steps beyond the staff = ledger
lines):
- Treble: Do₄=−2, La₃=−4, Fa₃=−6 (lower ledger lines); La₅=10, Do₆=12, Mi₆=14 (upper).
- Bass: Mi₂=−2, Do₂=−4 (lower ledger lines); Do₄=10, Mi₄=12 (upper).

## New component: `LedgerNoteQuiz`

`src/chapters/cap5/visualizations/LedgerNoteQuiz.tsx` + `LedgerNoteQuizData.ts`,
adapted from cap-2's `PlicaQuiz`:

- **Data shape:**
  ```ts
  type NoteName = 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si';
  type LedgerQuestion = {
    id: string;
    clef: 'sol' | 'fa';
    step: number;      // ledger-line position
    correct: NoteName;
  };
  ```
- **Render:** N cards (grid like PlicaQuiz). Each card = a compact `Pentagrama`
  (`fitNotes`, small `width`) showing the single note with its ledger line(s),
  plus a button row of the 7 note names; selecting marks correct/incorrect
  (green/red) and updates an aggregate score; a reset button. No per-card "next"
  flow — all questions on screen at once (PlicaQuiz model).
- **Reuse:** the shared `Pentagrama` renders the note + ledger lines (no new
  staff math); only the quiz card/scoring shell is new.

## Verification

- **Overflow:** `node scripts/check-overflow.mjs principiante-cap-5` → `0 slide(s)
  overflowing`, exit 0. (Detector already settles past the framer-motion
  transition; route `#/principiante-cap-5` works once the chapter is live.)
- **Build/test/lint:** `npm run build && npm test && npm run lint` green (29
  existing tests stay green; cap-3 pentagrams must look unchanged since
  `fitNotes` defaults off).
- **Interactivity smoke:** headless click on a `LedgerNoteQuiz` answer button →
  score updates, no console/page errors (as done for cap-4 / cap-2 quiz).
- **User visual gate:** the user confirms each slide visually (size, layout,
  musical correctness of the scales and quiz notes, glow/blur) before the
  chapter is marked done — headless captures are a smoke test, not ground truth
  for compositing effects.

## Out of scope

- Other mockup chapters (cap-6..8); only `principiante-cap-5`.
- Changing cap-3's existing brief "Líneas adicionales" slide (cap-5 is the deep
  dive; the overlap is intentional).
- The responsive-width / height-scaling render model and the global type scale
  (both already shipped; unchanged here).
- Reworking the cap-4 exercise infrastructure (the quiz reuses the lighter
  PlicaQuiz pattern instead).
