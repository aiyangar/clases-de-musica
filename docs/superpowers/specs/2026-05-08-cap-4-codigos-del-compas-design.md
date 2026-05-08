# Cap IV — Códigos del Compás (design spec)

**Date**: 2026-05-08
**Status**: Brainstormed and approved by user; pending implementation plan
**Accent**: yellow
**Tagline**: Códigos del Compás

## Goal

Build the fourth chapter as a hands-on exercise unit. The student practices the rhythmic concepts introduced in Cap II (figures, durations) and Cap III (time signature, bar lines) by completing 24 interactive exercises across three blocks.

Pedagogical contract: tap-to-place mechanic, per-exercise validation with retry, no scoring, no persistence.

## Scope

### In scope

- Three exercise types (24 ejercicios total)
- Eight slides total (portada + 1 recap + 5 exercise slides + cierre)
- Tap-based interaction optimized for iPad landscape
- Closed-form datasets (every exercise has a deterministic correct answer)
- Build-time validation of dataset internal consistency
- Yellow accent + "Códigos del Compás" tagline
- Registration in `chapters/registry.ts` as `available`

### Out of scope

- Drag-and-drop interactions
- 6/8 or other compound time signatures
- Figures smaller than `corchea`
- Doble (`double`) and repetición (`repeat`) bar variants
- Score, progress persistence, or analytics
- UI tests (only unit tests for datasets and validators)
- Audio playback of the exercises

## Time signatures and figure palette

- **Time signatures**: `2/4`, `3/4`, `4/4`
- **Figures and rests** (palette of 8): `redonda`, `blanca`, `negra`, `corchea` and their corresponding silences

## Exercise blocks

### Block A — Bar lines (4 exercises)

Given a continuous sequence of figures and a time signature, the student inserts simple bar lines (`single`) at the correct positions. The closing bar (`final`) is auto-rendered after the last item.

- 4 exercises, paginated 1/4 inside one slide
- Tap-target: a slot between two consecutive figures. Tapping inserts/removes a `single` bar at that index.
- Validation: the multiset of inserted indices equals the expected `expectedBarsAfter`.

### Block B — Build a measure (10 exercises)

Given a time signature, an empty single measure, and a closed list of required figures, the student places those figures inside the measure in any order.

- 10 exercises, split into 2 slides of 5 (paginated 1/5).
- Tap-target: a sequence of empty slots inside the measure.
- Palette: figures and rests from the cap-4 palette, with each item tappable.
- Validation: the multiset of placed `FigureItem` equals the multiset of `required`. Position does not matter.

### Block C — Complete the measure (10 exercises)

Given a 6-measure staff with mixed pre-filled and blank slots, the student fills each blank with the figure that completes the time signature value of its measure.

- 10 exercises, split into 2 slides of 5 (paginated 1/5).
- Variable distribution of blanks per measure (1-3).
- Tap-target: each blank slot inside the staff.
- Validation: each blank slot contains the expected `FigureItem` (structural equality).

## Slide outline (8 slides)

1. **SlidePortadaCap4** — Title, tagline, accent
2. **SlideRecapCompas** — Brief recap of the time signature indicator and the bar line concept (sourced from Cap III primitives, not duplicated)
3. **SlideEjercicioBarras** — Block A, paginated 1/4
4. **SlideEjercicioConstruir** part 1 — Block B, exercises 1..5 (paginated 1/5)
5. **SlideEjercicioConstruir** part 2 — Block B, exercises 6..10 (paginated 1/5)
6. **SlideEjercicioCompletar** part 1 — Block C, exercises 1..5 (paginated 1/5)
7. **SlideEjercicioCompletar** part 2 — Block C, exercises 6..10 (paginated 1/5)
8. **SlideCierreCap4** — Closing slide

## Architecture

**Approach**: hybrid — shared exercise shell + per-block boards.

```
src/chapters/cap4/
├── Cap4Presentation.tsx
├── slides/
│   ├── SlidePortadaCap4.tsx
│   ├── SlideRecapCompas.tsx
│   ├── SlideEjercicioBarras.tsx
│   ├── SlideEjercicioConstruir.tsx     (part: 1 | 2)
│   ├── SlideEjercicioCompletar.tsx     (part: 1 | 2)
│   └── SlideCierreCap4.tsx
├── exercises/
│   ├── ExerciseShell.tsx               (header, pagination, palette container, verify button, feedback, retry/next)
│   ├── boards/
│   │   ├── BarsBoard.tsx
│   │   ├── BuildBoard.tsx
│   │   └── CompleteBoard.tsx
│   ├── Palette.tsx                     (tappable list of figures and rests; tracks selected item)
│   └── validators.ts                   (validateBars, validateBuild, validateComplete)
├── data/
│   ├── bars.ts
│   ├── build.ts
│   └── complete.ts
└── types.ts
```

**Reused primitives** (no changes needed):

- `components/music/Pentagrama.tsx` (current state, post clef-size update)
- `components/music/BarLine.tsx`
- `components/music/ClefSymbol.tsx`
- `components/music/TimeSignature.tsx`

**Optional new shared primitive**: `components/music/InteractivePentagrama.tsx`. Decision deferred to the implementation plan: only extract if all three Boards converge on identical overlay/slot logic. Otherwise each Board renders its own SVG over the static base.

## Type contracts

```ts
// chapters/cap4/types.ts

export type TimeSig = '2/4' | '3/4' | '4/4';

export type FigureItem =
  | {
      kind: 'figure';
      figure: 'redonda' | 'blanca' | 'negra' | 'corchea';
      step: number; // staff vertical position, reusing Pentagrama convention
    }
  | {
      kind: 'rest';
      rest: 'redonda' | 'blanca' | 'negra' | 'corchea';
    };

export type BarsExercise = {
  id: string;
  timeSig: TimeSig;
  items: FigureItem[];
  expectedBarsAfter: number[]; // indices after which a single bar belongs (final bar is auto)
};

export type BuildExercise = {
  id: string;
  timeSig: TimeSig;
  required: FigureItem[]; // closed list; any order in the placement is valid
};

export type CompleteSlot =
  | { kind: 'fixed'; item: FigureItem }
  | { kind: 'blank'; expected: FigureItem };

export type CompleteExercise = {
  id: string;
  timeSig: TimeSig;
  measures: Array<{ slots: CompleteSlot[] }>; // 6 measures
};

export type ExerciseKind = 'bars' | 'build' | 'complete';
```

## State model and data flow

Each exercise slide owns its local state. No global store, no persistence between sessions or between slide visits.

```ts
type ExerciseState = {
  index: number;                              // current sub-exercise within the block (0..N-1)
  placement: PlacementMap;                    // structure varies per block
  status: 'editing' | 'correct' | 'incorrect';
  selectedPaletteItem: FigureItem | BarKind | null;
};
```

**Tap flow**:

1. Tap a palette item → `selectedPaletteItem = item`
2. Tap a board slot → `placement[slot] = selectedPaletteItem`; clear `selectedPaletteItem`
3. Tap an already-placed item → remove it from `placement` (simple undo)
4. **Verificar** → run `validate(exercise, placement)` → set `status` to `correct` or `incorrect`
5. If `incorrect`, **Reintentar** resets status to `editing` keeping the placement
6. If `correct`, **Siguiente** advances `index` (resets placement); when block ends, slide hands off to the next slide

**Verify button is never disabled** — the student can verify at any point, even with empty placement (intentional: lets the student check whether a measure is already complete).

## Validators (pure)

- `validateBars(ex, userBars: number[])`: sorted equality between `userBars` and `ex.expectedBarsAfter`.
- `validateBuild(ex, placed: FigureItem[])`: equal multisets between `placed` and `ex.required`.
- `validateComplete(ex, filled: Map<SlotId, FigureItem>)`: every blank slot has the expected `FigureItem` (structural equality).

## Visual feedback

- `correct`: green border and glow on the board, brief confirmation message, `Siguiente` button.
- `incorrect`: red glow on the board, message `"Revisa el compás"`, `Reintentar` button. **The UI does not mark which specific item is wrong** — the student re-reads the measure to find the error.

## Error handling and edge cases

- **Dataset consistency** is enforced by unit tests:
  - `bars.ts`: `items` partitioned by `expectedBarsAfter` produces measures whose value matches the time signature.
  - `build.ts`: `required` sums to the time signature value.
  - `complete.ts`: each measure (fixed slots + the `expected` of every blank) sums to the time signature value.
- **Tapping an occupied slot** removes the placed item — never produces invalid state.
- **Verifying an empty placement** is allowed (see state model).
- **Switching slides mid-exercise** discards local state — same behavior as Cap II.
- **Canvas scaling**: tap targets are in SVG coordinates, so they survive the `transform: scale()` applied by `SlideStage`.

No async, no network, no loading states.

## Testing

- **Unit tests with Vitest** (new dev dep) scoped to:
  - The three datasets (`bars.ts`, `build.ts`, `complete.ts`) — each exercise is internally consistent.
  - The three validators (`validators.ts`) — happy paths and the obvious failure modes.
- **No UI tests**.
- **Manual verification** in browser on iPad-landscape viewport for each block: completing an exercise correctly and incorrectly, paginating between sub-exercises, undo by tap on placed item, retry/next flow.

## Registry update

```ts
// chapters/registry.ts — append after cap-3:
{
  id: 'cap-4',
  number: 'IV',
  title: 'Construcción de Compases',
  tagline: 'Códigos del Compás',
  description:
    'Práctica activa: colocar barras divisorias, construir compases desde cero y completar compases en 24 ejercicios.',
  topics: ['Barras divisorias', 'Construir compases', 'Completar compases'],
  status: 'available',
  accent: 'yellow',     // new accent variant
  presentation: Cap4Presentation,
}
```

A new `'yellow'` value for `ChapterMeta.accent` is added, with the corresponding tokens wired in the dashboard chapter card styling.

## Open questions for the implementation plan

- Should `InteractivePentagrama` be extracted as a shared primitive, or inlined per Board? Decided after building the first Board.
- Exact visual treatment of the `Palette` (horizontal strip vs vertical column vs auto). Decided during implementation against the 1180×820 canvas.
- Whether the `Recap` slide reuses pieces of `SlideCompas` and `SlideBarras` from Cap III directly, or duplicates them in Cap IV with smaller framing. Decided during implementation; default is to import small reusable bits from Cap III if they can be shared without coupling.
