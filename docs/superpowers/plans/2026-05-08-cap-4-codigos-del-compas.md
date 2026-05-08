# Cap IV — Códigos del Compás Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Capítulo IV of the Principiante level — an 8-slide chapter with 24 interactive tap-based exercises across three blocks (bar lines, build measures, complete measures), validated per-exercise with retry, registered as `available` in the dashboard.

**Architecture:** Hybrid — a shared `ExerciseShell` provides header, palette container, pagination, verify/retry/next, and feedback UI; per-block `Board` components own the interactive staff and validation glue. Pure validators in `validators.ts` work over the dataset types.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind. New dev dep: Vitest (unit tests for datasets and validators only). Reuses existing music primitives (`Pentagrama`, `BarLine`, `TimeSignature`, `NoteSymbol`, `RestSymbol`).

**Branch convention:** Each task lives on its own branch off `develop` named `feature/cap-4-task-N-<slug>`. Merge `develop → main` only after the user approves the full chapter.

---

## File Structure

```
docs/superpowers/plans/2026-05-08-cap-4-codigos-del-compas.md   (this plan)

src/chapters/cap4/
├── Cap4Presentation.tsx                  (Task 14)
├── types.ts                              (Task 2)
├── data/
│   ├── bars.ts                           (Task 4)
│   ├── build.ts                          (Task 4)
│   └── complete.ts                       (Task 4)
├── exercises/
│   ├── ExerciseShell.tsx                 (Task 6)
│   ├── Palette.tsx                       (Task 5)
│   ├── validators.ts                     (Task 3)
│   └── boards/
│       ├── BarsBoard.tsx                 (Task 7)
│       ├── BuildBoard.tsx                (Task 8)
│       └── CompleteBoard.tsx             (Task 9)
└── slides/
    ├── SlidePortadaCap4.tsx              (Task 13)
    ├── SlideRecapCompas.tsx              (Task 13)
    ├── SlideEjercicioBarras.tsx          (Task 10)
    ├── SlideEjercicioConstruir.tsx       (Task 11)
    ├── SlideEjercicioCompletar.tsx       (Task 12)
    └── SlideCierreCap4.tsx               (Task 13)

src/components/Dashboard.tsx              (Task 2 — add 'orange' to ACCENT_HEX)
src/chapters/registry.ts                  (Task 14 — register cap-4)

src/chapters/cap4/__tests__/
├── validators.test.ts                    (Task 3)
└── data.test.ts                          (Task 4)

vitest.config.ts                          (Task 1)
package.json                              (Task 1 — add vitest + test script)
```

---

## Task 1: Add Vitest + smoke test

**Branch:** `feature/cap-4-task-1-vitest-setup`

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/__tests__/smoke.test.ts`

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-1-vitest-setup
```

- [ ] **Step 2: Install Vitest**

```bash
pnpm add -D vitest @vitest/ui
```

Expected: vitest and @vitest/ui in `devDependencies` of `package.json`.

- [ ] **Step 3: Add test scripts to `package.json`**

In the `"scripts"` block, after `"preview"`, add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 5: Create smoke test**

`src/__tests__/smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('vitest setup', () => {
  it('can run a trivial test', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run tests**

```bash
pnpm test
```

Expected: 1 test passes.

- [ ] **Step 7: Verify build still works**

```bash
pnpm build
```

Expected: `tsc -b && vite build` completes with no errors.

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts src/__tests__/smoke.test.ts
git commit -m "chore(test): add Vitest with smoke test for cap-4 unit testing"
```

---

## Task 2: Cap-4 types + 'orange' accent

**Branch:** `feature/cap-4-task-2-types-accent`

**Files:**
- Create: `src/chapters/cap4/types.ts`
- Modify: `src/chapters/registry.ts` (add `'orange'` to the `accent` union via the `ChapterMeta` type — done implicitly through the field; only the dashboard map needs updating)
- Modify: `src/components/Dashboard.tsx` (add `orange` to `ACCENT_HEX`)

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-2-types-accent
```

- [ ] **Step 2: Update the `accent` union in `src/chapters/registry.ts`**

Find the line with `accent: 'cyan' | 'magenta' | 'electric';` inside the `ChapterMeta` type. Replace with:

```ts
  accent: 'cyan' | 'magenta' | 'electric' | 'orange';
```

- [ ] **Step 3: Add `orange` to `ACCENT_HEX` in `src/components/Dashboard.tsx`**

Find:

```ts
const ACCENT_HEX: Record<ChapterMeta['accent'], string> = {
  cyan: '#00ffff',
  magenta: '#ff00ff',
  electric: '#ffff00',
};
```

Replace with:

```ts
const ACCENT_HEX: Record<ChapterMeta['accent'], string> = {
  cyan: '#00ffff',
  magenta: '#ff00ff',
  electric: '#ffff00',
  orange: '#ff9933',
};
```

- [ ] **Step 4: Create `src/chapters/cap4/types.ts`**

```ts
export type TimeSig = '2/4' | '3/4' | '4/4';

export type Cap4Figure = 'redonda' | 'blanca' | 'negra' | 'corchea';

export type FigureItem =
  | { kind: 'figure'; figure: Cap4Figure; step: number }
  | { kind: 'rest'; rest: Cap4Figure };

export type BarsExercise = {
  id: string;
  timeSig: TimeSig;
  items: FigureItem[];
  expectedBarsAfter: number[];
};

export type BuildExercise = {
  id: string;
  timeSig: TimeSig;
  required: FigureItem[];
};

export type CompleteSlot =
  | { kind: 'fixed'; item: FigureItem }
  | { kind: 'blank'; expected: FigureItem };

export type CompleteMeasure = { slots: CompleteSlot[] };

export type CompleteExercise = {
  id: string;
  timeSig: TimeSig;
  measures: CompleteMeasure[];
};

export type ExerciseKind = 'bars' | 'build' | 'complete';

// In quarter-note units, so 4/4 = 4, 3/4 = 3, 2/4 = 2.
export const TIME_SIG_VALUE: Record<TimeSig, number> = {
  '2/4': 2,
  '3/4': 3,
  '4/4': 4,
};

export const FIGURE_VALUE: Record<Cap4Figure, number> = {
  redonda: 4,
  blanca: 2,
  negra: 1,
  corchea: 0.5,
};

export function itemValue(item: FigureItem): number {
  return FIGURE_VALUE[item.kind === 'figure' ? item.figure : item.rest];
}
```

- [ ] **Step 5: Verify typecheck and build**

```bash
pnpm build
```

Expected: build passes with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/chapters/cap4/types.ts src/chapters/registry.ts src/components/Dashboard.tsx
git commit -m "feat(cap-4): add types and 'orange' accent for chapter IV"
```

---

## Task 3: Validators with TDD

**Branch:** `feature/cap-4-task-3-validators`

**Files:**
- Create: `src/chapters/cap4/exercises/validators.ts`
- Create: `src/chapters/cap4/__tests__/validators.test.ts`

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-3-validators
```

- [ ] **Step 2: Write the failing tests**

`src/chapters/cap4/__tests__/validators.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import {
  validateBars,
  validateBuild,
  validateComplete,
} from '@/chapters/cap4/exercises/validators';
import type {
  BarsExercise,
  BuildExercise,
  CompleteExercise,
  FigureItem,
} from '@/chapters/cap4/types';

const negra = (step = 4): FigureItem => ({
  kind: 'figure',
  figure: 'negra',
  step,
});
const blanca = (step = 4): FigureItem => ({
  kind: 'figure',
  figure: 'blanca',
  step,
});
const corchea = (step = 4): FigureItem => ({
  kind: 'figure',
  figure: 'corchea',
  step,
});
const restNegra: FigureItem = { kind: 'rest', rest: 'negra' };

describe('validateBars', () => {
  const ex: BarsExercise = {
    id: 'bars-test',
    timeSig: '4/4',
    items: [negra(), negra(), negra(), negra(), negra(), negra(), negra(), negra()],
    expectedBarsAfter: [3],
  };

  it('returns true when bars match exactly', () => {
    expect(validateBars(ex, [3])).toBe(true);
  });

  it('returns true regardless of order', () => {
    const ex2: BarsExercise = { ...ex, expectedBarsAfter: [3, 5] };
    expect(validateBars(ex2, [5, 3])).toBe(true);
  });

  it('returns false when missing a bar', () => {
    expect(validateBars(ex, [])).toBe(false);
  });

  it('returns false when an extra bar is added', () => {
    expect(validateBars(ex, [3, 5])).toBe(false);
  });
});

describe('validateBuild', () => {
  const ex: BuildExercise = {
    id: 'build-test',
    timeSig: '4/4',
    required: [negra(), negra(), blanca()],
  };

  it('returns true when placed multiset equals required', () => {
    expect(validateBuild(ex, [blanca(), negra(), negra()])).toBe(true);
  });

  it('counts duplicates correctly', () => {
    expect(validateBuild(ex, [negra(), negra(), negra()])).toBe(false);
  });

  it('returns false when placed has fewer items', () => {
    expect(validateBuild(ex, [negra(), negra()])).toBe(false);
  });

  it('returns false when placed has more items', () => {
    expect(validateBuild(ex, [negra(), negra(), blanca(), corchea()])).toBe(false);
  });

  it('treats figure and rest of the same value as different', () => {
    expect(validateBuild(ex, [negra(), restNegra, blanca()])).toBe(false);
  });
});

describe('validateComplete', () => {
  const ex: CompleteExercise = {
    id: 'complete-test',
    timeSig: '4/4',
    measures: [
      {
        slots: [
          { kind: 'fixed', item: negra() },
          { kind: 'blank', expected: negra() },
          { kind: 'fixed', item: blanca() },
        ],
      },
    ],
  };

  it('returns true when every blank has the expected item', () => {
    const filled = new Map<string, FigureItem>([['0:1', negra()]]);
    expect(validateComplete(ex, filled)).toBe(true);
  });

  it('returns false when a blank is missing', () => {
    const filled = new Map<string, FigureItem>();
    expect(validateComplete(ex, filled)).toBe(false);
  });

  it('returns false when a blank has the wrong item', () => {
    const filled = new Map<string, FigureItem>([['0:1', blanca()]]);
    expect(validateComplete(ex, filled)).toBe(false);
  });
});
```

- [ ] **Step 3: Run the test to confirm it fails**

```bash
pnpm test src/chapters/cap4/__tests__/validators.test.ts
```

Expected: import errors / "validators not found".

- [ ] **Step 4: Implement `validators.ts`**

`src/chapters/cap4/exercises/validators.ts`:

```ts
import type {
  BarsExercise,
  BuildExercise,
  CompleteExercise,
  FigureItem,
} from '@/chapters/cap4/types';

export function validateBars(ex: BarsExercise, userBars: number[]): boolean {
  const a = [...userBars].sort((x, y) => x - y);
  const b = [...ex.expectedBarsAfter].sort((x, y) => x - y);
  if (a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}

function itemKey(item: FigureItem): string {
  if (item.kind === 'figure') return `f:${item.figure}:${item.step}`;
  return `r:${item.rest}`;
}

function multisetCounts(items: FigureItem[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const item of items) {
    const k = itemKey(item);
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return m;
}

export function validateBuild(ex: BuildExercise, placed: FigureItem[]): boolean {
  const a = multisetCounts(placed);
  const b = multisetCounts(ex.required);
  if (a.size !== b.size) return false;
  for (const [k, v] of b) {
    if (a.get(k) !== v) return false;
  }
  return true;
}

function itemsEqual(a: FigureItem, b: FigureItem): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === 'figure' && b.kind === 'figure') {
    return a.figure === b.figure && a.step === b.step;
  }
  if (a.kind === 'rest' && b.kind === 'rest') {
    return a.rest === b.rest;
  }
  return false;
}

export function validateComplete(
  ex: CompleteExercise,
  filled: Map<string, FigureItem>,
): boolean {
  for (let mIdx = 0; mIdx < ex.measures.length; mIdx++) {
    const measure = ex.measures[mIdx];
    for (let sIdx = 0; sIdx < measure.slots.length; sIdx++) {
      const slot = measure.slots[sIdx];
      if (slot.kind !== 'blank') continue;
      const key = `${mIdx}:${sIdx}`;
      const userItem = filled.get(key);
      if (!userItem) return false;
      if (!itemsEqual(userItem, slot.expected)) return false;
    }
  }
  return true;
}
```

- [ ] **Step 5: Run tests to confirm they pass**

```bash
pnpm test
```

Expected: all validator tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/chapters/cap4/exercises/validators.ts src/chapters/cap4/__tests__/validators.test.ts
git commit -m "feat(cap-4): add pure validators for bars, build, and complete exercises"
```

---

## Task 4: Datasets with consistency tests

**Branch:** `feature/cap-4-task-4-datasets`

**Files:**
- Create: `src/chapters/cap4/data/bars.ts`
- Create: `src/chapters/cap4/data/build.ts`
- Create: `src/chapters/cap4/data/complete.ts`
- Create: `src/chapters/cap4/__tests__/data.test.ts`

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-4-datasets
```

- [ ] **Step 2: Write the consistency test first**

`src/chapters/cap4/__tests__/data.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { BARS_EXERCISES } from '@/chapters/cap4/data/bars';
import { BUILD_EXERCISES } from '@/chapters/cap4/data/build';
import { COMPLETE_EXERCISES } from '@/chapters/cap4/data/complete';
import {
  TIME_SIG_VALUE,
  itemValue,
  type CompleteSlot,
} from '@/chapters/cap4/types';

describe('BARS_EXERCISES', () => {
  it('has exactly 4 exercises', () => {
    expect(BARS_EXERCISES).toHaveLength(4);
  });

  it('every measure produced by expectedBarsAfter sums to the time signature', () => {
    for (const ex of BARS_EXERCISES) {
      const cuts = [...ex.expectedBarsAfter, ex.items.length - 1].sort(
        (a, b) => a - b,
      );
      const target = TIME_SIG_VALUE[ex.timeSig];
      let start = 0;
      for (const cut of cuts) {
        const measure = ex.items.slice(start, cut + 1);
        const sum = measure.reduce((s, it) => s + itemValue(it), 0);
        expect(sum, `${ex.id}: measure starting at ${start}`).toBe(target);
        start = cut + 1;
      }
    }
  });
});

describe('BUILD_EXERCISES', () => {
  it('has exactly 10 exercises', () => {
    expect(BUILD_EXERCISES).toHaveLength(10);
  });

  it('every required list sums to the time signature', () => {
    for (const ex of BUILD_EXERCISES) {
      const sum = ex.required.reduce((s, it) => s + itemValue(it), 0);
      expect(sum, ex.id).toBe(TIME_SIG_VALUE[ex.timeSig]);
    }
  });
});

describe('COMPLETE_EXERCISES', () => {
  it('has exactly 10 exercises', () => {
    expect(COMPLETE_EXERCISES).toHaveLength(10);
  });

  it('every exercise has 6 measures', () => {
    for (const ex of COMPLETE_EXERCISES) {
      expect(ex.measures, ex.id).toHaveLength(6);
    }
  });

  it('every measure (fixed + expected of blanks) sums to the time signature', () => {
    for (const ex of COMPLETE_EXERCISES) {
      const target = TIME_SIG_VALUE[ex.timeSig];
      ex.measures.forEach((measure, mIdx) => {
        const sum = measure.slots.reduce((s, slot: CompleteSlot) => {
          const item = slot.kind === 'fixed' ? slot.item : slot.expected;
          return s + itemValue(item);
        }, 0);
        expect(sum, `${ex.id} measure ${mIdx}`).toBe(target);
      });
    }
  });

  it('every measure has at least one blank', () => {
    for (const ex of COMPLETE_EXERCISES) {
      ex.measures.forEach((measure, mIdx) => {
        const hasBlank = measure.slots.some((s) => s.kind === 'blank');
        expect(hasBlank, `${ex.id} measure ${mIdx}`).toBe(true);
      });
    }
  });
});
```

- [ ] **Step 3: Run to confirm it fails**

```bash
pnpm test src/chapters/cap4/__tests__/data.test.ts
```

Expected: import errors / dataset modules not found.

- [ ] **Step 4: Create `bars.ts`**

`src/chapters/cap4/data/bars.ts`:

```ts
import type { BarsExercise, FigureItem } from '@/chapters/cap4/types';

const N = (step = 4): FigureItem => ({ kind: 'figure', figure: 'negra', step });
const B = (step = 4): FigureItem => ({ kind: 'figure', figure: 'blanca', step });
const C = (step = 4): FigureItem => ({ kind: 'figure', figure: 'corchea', step });
const R = (step = 4): FigureItem => ({ kind: 'figure', figure: 'redonda', step });

export const BARS_EXERCISES: BarsExercise[] = [
  {
    id: 'bars-1',
    timeSig: '4/4',
    items: [N(4), N(4), N(4), N(4), N(4), N(4), N(4), N(4)],
    expectedBarsAfter: [3],
  },
  {
    id: 'bars-2',
    timeSig: '3/4',
    items: [N(3), N(4), N(5), B(4), N(4), N(3), N(4), N(5), B(4), N(4)],
    expectedBarsAfter: [2, 4, 7],
  },
  {
    id: 'bars-3',
    timeSig: '2/4',
    items: [N(4), N(4), B(4), N(4), N(4), C(4), C(4), C(4), C(4), N(4), N(4), B(4)],
    expectedBarsAfter: [1, 2, 4, 8, 10],
  },
  {
    id: 'bars-4',
    timeSig: '4/4',
    items: [B(3), B(5), N(4), N(4), N(4), N(4), R(4), C(4), C(4), C(4), C(4), N(4), N(4)],
    expectedBarsAfter: [1, 5, 6],
  },
];
```

- [ ] **Step 5: Create `build.ts`**

Each exercise sums to its time-signature value. The data test in Step 2 enforces this.

`src/chapters/cap4/data/build.ts`:

```ts
import type { BuildExercise, FigureItem } from '@/chapters/cap4/types';

const N = (step = 4): FigureItem => ({ kind: 'figure', figure: 'negra', step });
const B = (step = 4): FigureItem => ({ kind: 'figure', figure: 'blanca', step });
const C = (step = 4): FigureItem => ({ kind: 'figure', figure: 'corchea', step });
const restC: FigureItem = { kind: 'rest', rest: 'corchea' };

export const BUILD_EXERCISES: BuildExercise[] = [
  {
    id: 'build-1',
    timeSig: '3/4',
    required: [N(4), C(3), C(5), C(2), C(6)],
  },
  {
    id: 'build-2',
    timeSig: '4/4',
    required: [B(4), C(3), C(4), C(5), C(6)],
  },
  {
    id: 'build-3',
    timeSig: '4/4',
    required: [N(2), N(6), C(3), C(4), C(5), C(7)],
  },
  {
    id: 'build-4',
    timeSig: '3/4',
    required: [C(2), C(3), C(4), C(5), C(6), C(7)],
  },
  {
    id: 'build-5',
    timeSig: '4/4',
    required: [N(3), N(5), C(2), C(4), C(6), C(7)],
  },
  {
    id: 'build-6',
    timeSig: '4/4',
    required: [N(4), C(2), C(3), C(5), C(6), restC, restC],
  },
  {
    id: 'build-7',
    timeSig: '4/4',
    required: [N(3), C(2), C(4), C(5), C(7), restC, restC],
  },
  {
    id: 'build-8',
    timeSig: '4/4',
    required: [N(5), C(3), C(4), C(5), C(6), restC, restC],
  },
  {
    id: 'build-9',
    timeSig: '4/4',
    required: [C(2), C(3), C(4), C(5), C(6), C(7), C(8), C(1)],
  },
  {
    id: 'build-10',
    timeSig: '4/4',
    required: [C(2), C(3), C(4), C(5), C(6), C(7), restC, restC],
  },
];
```

- [ ] **Step 6: Create `complete.ts`**

Every measure has at least one blank and sums to the time-signature value. Verified by the data test in Step 2.

`src/chapters/cap4/data/complete.ts`:

```ts
import type { CompleteExercise, FigureItem } from '@/chapters/cap4/types';

const N = (step = 4): FigureItem => ({ kind: 'figure', figure: 'negra', step });
const B = (step = 4): FigureItem => ({ kind: 'figure', figure: 'blanca', step });
const C = (step = 4): FigureItem => ({ kind: 'figure', figure: 'corchea', step });
const R = (step = 4): FigureItem => ({ kind: 'figure', figure: 'redonda', step });

function fixed(item: FigureItem) {
  return { kind: 'fixed', item } as const;
}
function blank(expected: FigureItem) {
  return { kind: 'blank', expected } as const;
}

export const COMPLETE_EXERCISES: CompleteExercise[] = [
  {
    id: 'complete-1',
    timeSig: '4/4',
    measures: [
      { slots: [fixed(N(4)), fixed(N(4)), blank(N(4)), fixed(N(4))] },
      { slots: [fixed(B(4)), blank(B(4))] },
      { slots: [fixed(N(3)), blank(N(4)), fixed(N(5)), fixed(N(4))] },
      { slots: [blank(R(4))] },
      { slots: [fixed(N(2)), fixed(N(3)), blank(N(4)), fixed(N(5))] },
      { slots: [fixed(B(4)), blank(B(4))] },
    ],
  },
  {
    id: 'complete-2',
    timeSig: '3/4',
    measures: [
      { slots: [fixed(N(4)), blank(N(4)), fixed(N(4))] },
      { slots: [fixed(B(4)), blank(N(4))] },
      { slots: [blank(N(3)), fixed(N(4)), fixed(N(5))] },
      { slots: [blank(N(2)), blank(N(4)), fixed(N(6))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(C(5)), fixed(C(6)), blank(N(4))] },
      { slots: [fixed(N(4)), fixed(N(4)), blank(N(4))] },
    ],
  },
  {
    id: 'complete-3',
    timeSig: '2/4',
    measures: [
      { slots: [fixed(N(4)), blank(N(4))] },
      { slots: [blank(B(4))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(C(5)), blank(C(6))] },
      { slots: [fixed(N(2)), blank(N(6))] },
      { slots: [blank(N(4)), fixed(N(4))] },
      { slots: [blank(N(3)), blank(N(5))] },
    ],
  },
  {
    id: 'complete-4',
    timeSig: '4/4',
    measures: [
      { slots: [fixed(B(4)), fixed(N(4)), blank(N(4))] },
      { slots: [blank(N(4)), fixed(N(4)), fixed(N(4)), fixed(N(4))] },
      { slots: [fixed(B(3)), blank(B(5))] },
      { slots: [blank(R(4))] },
      { slots: [fixed(N(2)), fixed(C(3)), fixed(C(4)), blank(N(5)), fixed(N(6))] },
      { slots: [blank(B(4)), fixed(B(4))] },
    ],
  },
  {
    id: 'complete-5',
    timeSig: '3/4',
    measures: [
      { slots: [fixed(N(4)), fixed(N(4)), blank(N(4))] },
      { slots: [blank(B(4)), fixed(N(4))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(N(5)), blank(N(4))] },
      { slots: [fixed(N(4)), blank(B(5))] },
      { slots: [blank(N(2)), blank(N(4)), blank(N(6))] },
      { slots: [fixed(N(4)), blank(N(4)), fixed(N(4))] },
    ],
  },
  {
    id: 'complete-6',
    timeSig: '2/4',
    measures: [
      { slots: [fixed(N(4)), blank(N(4))] },
      { slots: [blank(B(4))] },
      { slots: [fixed(C(3)), fixed(C(4)), blank(N(5))] },
      { slots: [blank(N(2)), fixed(N(6))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(C(5)), blank(C(6))] },
      { slots: [blank(B(4))] },
    ],
  },
  {
    id: 'complete-7',
    timeSig: '4/4',
    measures: [
      { slots: [fixed(N(4)), fixed(N(4)), fixed(N(4)), blank(N(4))] },
      { slots: [fixed(B(4)), blank(B(4))] },
      { slots: [blank(N(2)), fixed(N(4)), fixed(N(5)), fixed(N(6))] },
      { slots: [fixed(N(4)), blank(N(4)), blank(N(4)), fixed(N(4))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(N(5)), blank(N(4)), fixed(N(6))] },
      { slots: [blank(R(4))] },
    ],
  },
  {
    id: 'complete-8',
    timeSig: '3/4',
    measures: [
      { slots: [fixed(N(4)), fixed(N(4)), blank(N(4))] },
      { slots: [blank(B(4)), fixed(N(4))] },
      { slots: [fixed(N(3)), blank(N(4)), blank(N(5))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(C(5)), fixed(C(6)), blank(N(4))] },
      { slots: [blank(B(4)), fixed(N(4))] },
      { slots: [blank(N(2)), blank(N(4)), fixed(N(6))] },
    ],
  },
  {
    id: 'complete-9',
    timeSig: '2/4',
    measures: [
      { slots: [fixed(N(4)), blank(N(4))] },
      { slots: [blank(B(4))] },
      { slots: [fixed(C(3)), blank(C(4)), fixed(C(5)), fixed(C(6))] },
      { slots: [fixed(C(3)), fixed(C(4)), blank(N(5))] },
      { slots: [blank(B(4))] },
      { slots: [fixed(N(4)), blank(N(4))] },
    ],
  },
  {
    id: 'complete-10',
    timeSig: '4/4',
    measures: [
      { slots: [fixed(B(4)), blank(B(4))] },
      { slots: [fixed(N(4)), fixed(N(4)), blank(N(4)), fixed(N(4))] },
      { slots: [blank(N(2)), fixed(N(4)), fixed(N(5)), fixed(N(6))] },
      { slots: [fixed(C(3)), fixed(C(4)), fixed(N(5)), fixed(N(6)), blank(N(4))] },
      { slots: [blank(R(4))] },
      { slots: [fixed(B(4)), fixed(N(3)), blank(N(5))] },
    ],
  },
];
```

- [ ] **Step 7: Run tests and iterate until all pass**

```bash
pnpm test
```

Expected: every dataset test passes once the developer finishes the exercises.

- [ ] **Step 8: Commit**

```bash
git add src/chapters/cap4/data src/chapters/cap4/__tests__/data.test.ts
git commit -m "feat(cap-4): add bars/build/complete datasets with consistency tests"
```

---

## Task 5: Palette component

**Branch:** `feature/cap-4-task-5-palette`

**Files:**
- Create: `src/chapters/cap4/exercises/Palette.tsx`

A `Palette` is a tappable strip showing every figure and rest available, plus an "active" highlight on the currently selected item. It is purely presentational — state lives in the parent.

- [ ] **Step 1: Branch off develop and create the file**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-5-palette
```

- [ ] **Step 2: Write `Palette.tsx`**

`src/chapters/cap4/exercises/Palette.tsx`:

```tsx
import NoteSymbol from '@/components/music/NoteSymbol';
import RestSymbol from '@/components/music/RestSymbol';
import type { Cap4Figure, FigureItem } from '@/chapters/cap4/types';

const ORANGE = '#ff9933';
const ORANGE_DIM = 'rgba(255, 153, 51, 0.45)';

const FIGURES: Cap4Figure[] = ['redonda', 'blanca', 'negra', 'corchea'];

export type PaletteSelection =
  | { kind: 'figure'; figure: Cap4Figure }
  | { kind: 'rest'; rest: Cap4Figure }
  | { kind: 'bar' };

type Props = {
  selected: PaletteSelection | null;
  onSelect: (sel: PaletteSelection) => void;
  showBarTool?: boolean;     // true only for the BarsBoard
  showFigureTools?: boolean; // true for Build/Complete
};

export default function Palette({
  selected,
  onSelect,
  showBarTool = false,
  showFigureTools = true,
}: Props) {
  return (
    <div
      className="flex flex-row flex-wrap gap-4 p-4 rounded-2xl border-2 backdrop-blur-md"
      style={{
        background: 'rgba(15, 0, 35, 0.55)',
        borderColor: ORANGE_DIM,
        boxShadow: '0 0 18px rgba(255, 153, 51, 0.25)',
      }}
    >
      {showBarTool && (
        <PaletteButton
          label="Barra"
          isSelected={selected?.kind === 'bar'}
          onClick={() => onSelect({ kind: 'bar' })}
        >
          <span
            style={{
              display: 'inline-block',
              width: 4,
              height: 60,
              background: ORANGE,
              boxShadow: `0 0 8px ${ORANGE}`,
            }}
          />
        </PaletteButton>
      )}

      {showFigureTools &&
        FIGURES.map((f) => {
          const isSel =
            selected?.kind === 'figure' && selected.figure === f;
          return (
            <PaletteButton
              key={`fig-${f}`}
              label={f}
              isSelected={isSel}
              onClick={() => onSelect({ kind: 'figure', figure: f })}
            >
              <NoteSymbol kind={f} direction="up" size={64} color={ORANGE} />
            </PaletteButton>
          );
        })}

      {showFigureTools &&
        FIGURES.map((f) => {
          const isSel = selected?.kind === 'rest' && selected.rest === f;
          return (
            <PaletteButton
              key={`rest-${f}`}
              label={`silencio ${f}`}
              isSelected={isSel}
              onClick={() => onSelect({ kind: 'rest', rest: f })}
            >
              <RestSymbol kind={f} size={48} color={ORANGE} />
            </PaletteButton>
          );
        })}
    </div>
  );
}

function PaletteButton({
  label,
  isSelected,
  onClick,
  children,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex items-center justify-center rounded-xl border-2 transition-colors"
      style={{
        width: 88,
        height: 88,
        borderColor: isSelected ? ORANGE : 'rgba(255, 153, 51, 0.35)',
        background: isSelected
          ? 'rgba(255, 153, 51, 0.15)'
          : 'rgba(5, 0, 21, 0.55)',
        boxShadow: isSelected ? `0 0 18px ${ORANGE}` : 'none',
      }}
    >
      {children}
    </button>
  );
}
```

> **Plan note:** if `NoteSymbol` does not currently accept `direction` or the prop signature differs, the developer must read `src/components/music/NoteSymbol.tsx` and adapt the call. Do not invent a prop. Same for `RestSymbol`.

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

Expected: no errors. (Component is unused so far, but TS still type-checks.)

- [ ] **Step 4: Commit**

```bash
git add src/chapters/cap4/exercises/Palette.tsx
git commit -m "feat(cap-4): add Palette component for tap-based exercises"
```

---

## Task 6: ExerciseShell component

**Branch:** `feature/cap-4-task-6-exercise-shell`

**Files:**
- Create: `src/chapters/cap4/exercises/ExerciseShell.tsx`

The shell wraps any board, provides:
- Header (`title`, pagination `1/N`)
- Slot for the `Board` component
- Slot for the `Palette`
- Verify / Retry / Next buttons
- Feedback box

It is generic over the per-block state and exposes a controlled API.

- [ ] **Step 1: Branch off develop and create the file**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-6-exercise-shell
```

- [ ] **Step 2: Write `ExerciseShell.tsx`**

`src/chapters/cap4/exercises/ExerciseShell.tsx`:

```tsx
import type { ReactNode } from 'react';

const ORANGE = '#ff9933';
const GREEN = '#22ff66';
const RED = '#ff3366';

type Status = 'editing' | 'correct' | 'incorrect';

type Props = {
  title: string;
  index: number;
  total: number;
  status: Status;
  onVerify: () => void;
  onRetry: () => void;
  onNext: () => void;
  isLast: boolean;
  board: ReactNode;
  palette: ReactNode;
};

export default function ExerciseShell({
  title,
  index,
  total,
  status,
  onVerify,
  onRetry,
  onNext,
  isLast,
  board,
  palette,
}: Props) {
  const borderColor =
    status === 'correct' ? GREEN : status === 'incorrect' ? RED : ORANGE;
  const glow =
    status === 'correct'
      ? `0 0 28px ${GREEN}66`
      : status === 'incorrect'
        ? `0 0 28px ${RED}66`
        : `0 0 18px ${ORANGE}33`;

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="heading-2" data-text={title}>
          <span>{title}</span>
        </h2>
        <span
          className="font-orbitron text-2xl tracking-[0.3em]"
          style={{ color: ORANGE, textShadow: `0 0 10px ${ORANGE}` }}
        >
          {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
      </div>

      <div
        className="rounded-2xl p-6 border-2 transition-colors"
        style={{
          background: 'rgba(15, 0, 35, 0.55)',
          borderColor,
          boxShadow: glow,
        }}
      >
        {board}
      </div>

      {palette}

      <div className="flex items-center justify-between">
        <span
          className="font-orbitron text-xl tracking-[0.25em]"
          style={{
            color: status === 'correct' ? GREEN : status === 'incorrect' ? RED : 'transparent',
            textShadow: status === 'editing' ? 'none' : '0 0 10px currentColor',
          }}
        >
          {status === 'correct' && '✓ CORRECTO'}
          {status === 'incorrect' && '✗ Revisa el compás'}
          {status === 'editing' && '·'}
        </span>

        <div className="flex gap-4">
          {status === 'editing' && (
            <PrimaryButton label="Verificar" onClick={onVerify} />
          )}
          {status === 'incorrect' && (
            <PrimaryButton label="Reintentar" onClick={onRetry} />
          )}
          {status === 'correct' && !isLast && (
            <PrimaryButton label="Siguiente" onClick={onNext} />
          )}
          {status === 'correct' && isLast && (
            <PrimaryButton label="Bloque completo" onClick={onNext} disabled />
          )}
        </div>
      </div>
    </div>
  );
}

function PrimaryButton({
  label,
  onClick,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="font-orbitron text-lg tracking-[0.25em] uppercase px-6 py-3 rounded-full border-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        borderColor: ORANGE,
        color: ORANGE,
        background: 'rgba(5, 0, 21, 0.6)',
        boxShadow: `0 0 14px ${ORANGE}55`,
        textShadow: `0 0 8px ${ORANGE}`,
      }}
    >
      {label}
    </button>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src/chapters/cap4/exercises/ExerciseShell.tsx
git commit -m "feat(cap-4): add ExerciseShell with verify/retry/next flow"
```

---

## Task 7: BarsBoard

**Branch:** `feature/cap-4-task-7-bars-board`

**Files:**
- Create: `src/chapters/cap4/exercises/boards/BarsBoard.tsx`

The board renders the staff with the figures from `ex.items` and an array of tappable slots between consecutive figures (and after the last figure but before the auto-final-bar). Tapping a slot toggles a `single` bar at that index.

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-7-bars-board
```

- [ ] **Step 2: Write `BarsBoard.tsx`**

`src/chapters/cap4/exercises/boards/BarsBoard.tsx`:

```tsx
import { useMemo } from 'react';
import type { BarsExercise } from '@/chapters/cap4/types';
import TimeSignature from '@/components/music/TimeSignature';
import NoteSymbol from '@/components/music/NoteSymbol';
import RestSymbol from '@/components/music/RestSymbol';

const ORANGE = '#ff9933';
const STAFF_HEIGHT = 120;
const STAFF_LEFT = 110;        // after the time signature
const STAFF_RIGHT_PAD = 20;
const ITEM_WIDTH = 70;
const SLOT_WIDTH = 28;          // tappable region between two items
const STAFF_LINES = 5;

type Props = {
  exercise: BarsExercise;
  userBars: number[];           // indices after which user placed a bar
  onToggleBar: (afterIndex: number) => void;
  highlightWrong?: boolean;     // when status === 'incorrect', subtly tint red
};

export default function BarsBoard({
  exercise,
  userBars,
  onToggleBar,
  highlightWrong = false,
}: Props) {
  const items = exercise.items;
  const totalWidth = useMemo(() => {
    return STAFF_LEFT + items.length * (ITEM_WIDTH + SLOT_WIDTH) + STAFF_RIGHT_PAD;
  }, [items.length]);

  const lineY = (i: number) => 20 + i * 22;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${STAFF_HEIGHT}`}
        style={{ width: '100%', height: STAFF_HEIGHT }}
        role="img"
        aria-label={`Ejercicio de barras divisorias en compás ${exercise.timeSig}`}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={STAFF_LEFT}
            x2={totalWidth - STAFF_RIGHT_PAD}
            y1={lineY(i)}
            y2={lineY(i)}
            stroke={ORANGE}
            strokeOpacity={0.6}
            strokeWidth={2}
          />
        ))}

        <foreignObject x={20} y={20} width={70} height={88}>
          <div className="flex h-full items-center justify-center">
            <TimeSignature
              numerator={parseInt(exercise.timeSig.split('/')[0], 10)}
              denominator={parseInt(exercise.timeSig.split('/')[1], 10)}
              size={60}
              color={ORANGE}
            />
          </div>
        </foreignObject>

        {items.map((item, idx) => {
          const x = STAFF_LEFT + idx * (ITEM_WIDTH + SLOT_WIDTH);
          return (
            <foreignObject
              key={`item-${idx}`}
              x={x}
              y={5}
              width={ITEM_WIDTH}
              height={STAFF_HEIGHT - 10}
            >
              <div className="flex h-full items-center justify-center">
                {item.kind === 'figure' ? (
                  <NoteSymbol kind={item.figure} direction="up" size={70} color={ORANGE} />
                ) : (
                  <RestSymbol kind={item.rest} size={50} color={ORANGE} />
                )}
              </div>
            </foreignObject>
          );
        })}

        {items.slice(0, -1).map((_, idx) => {
          const slotX =
            STAFF_LEFT + idx * (ITEM_WIDTH + SLOT_WIDTH) + ITEM_WIDTH;
          const hasBar = userBars.includes(idx);
          return (
            <g key={`slot-${idx}`} style={{ cursor: 'pointer' }}>
              <rect
                x={slotX}
                y={5}
                width={SLOT_WIDTH}
                height={STAFF_HEIGHT - 10}
                fill="transparent"
                onClick={() => onToggleBar(idx)}
              />
              {hasBar && (
                <line
                  x1={slotX + SLOT_WIDTH / 2}
                  x2={slotX + SLOT_WIDTH / 2}
                  y1={lineY(0)}
                  y2={lineY(4)}
                  stroke={highlightWrong ? '#ff3366' : ORANGE}
                  strokeWidth={3}
                />
              )}
            </g>
          );
        })}

        <line
          x1={totalWidth - STAFF_RIGHT_PAD - 12}
          x2={totalWidth - STAFF_RIGHT_PAD - 12}
          y1={lineY(0)}
          y2={lineY(4)}
          stroke={ORANGE}
          strokeWidth={3}
        />
        <rect
          x={totalWidth - STAFF_RIGHT_PAD - 5}
          y={lineY(0)}
          width={6}
          height={lineY(4) - lineY(0)}
          fill={ORANGE}
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src/chapters/cap4/exercises/boards/BarsBoard.tsx
git commit -m "feat(cap-4): add BarsBoard with tappable slots between figures"
```

---

## Task 8: BuildBoard

**Branch:** `feature/cap-4-task-8-build-board`

**Files:**
- Create: `src/chapters/cap4/exercises/boards/BuildBoard.tsx`

The board renders an empty single measure with N tappable slots, where N = `ex.required.length`. The student selects an item from the palette; tapping a slot fills it with the selected item. Tapping a filled slot clears it.

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-8-build-board
```

- [ ] **Step 2: Write `BuildBoard.tsx`**

`src/chapters/cap4/exercises/boards/BuildBoard.tsx`:

```tsx
import type { BuildExercise, FigureItem } from '@/chapters/cap4/types';
import TimeSignature from '@/components/music/TimeSignature';
import NoteSymbol from '@/components/music/NoteSymbol';
import RestSymbol from '@/components/music/RestSymbol';
import type { PaletteSelection } from '../Palette';

const ORANGE = '#ff9933';
const STAFF_HEIGHT = 140;
const STAFF_LEFT = 120;
const SLOT_WIDTH = 80;

type Props = {
  exercise: BuildExercise;
  placed: (FigureItem | null)[]; // length === exercise.required.length
  selectedPaletteItem: PaletteSelection | null;
  onPlaceAt: (slotIndex: number) => void;
  onClearAt: (slotIndex: number) => void;
};

export default function BuildBoard({
  exercise,
  placed,
  selectedPaletteItem,
  onPlaceAt,
  onClearAt,
}: Props) {
  const slotCount = exercise.required.length;
  const totalWidth = STAFF_LEFT + slotCount * SLOT_WIDTH + 60;
  const lineY = (i: number) => 30 + i * 22;

  function handleSlotClick(idx: number) {
    if (placed[idx]) {
      onClearAt(idx);
      return;
    }
    if (
      selectedPaletteItem &&
      (selectedPaletteItem.kind === 'figure' || selectedPaletteItem.kind === 'rest')
    ) {
      onPlaceAt(idx);
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${STAFF_HEIGHT}`}
        style={{ width: '100%', height: STAFF_HEIGHT }}
        role="img"
        aria-label={`Construir compás en ${exercise.timeSig}`}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={STAFF_LEFT}
            x2={totalWidth - 30}
            y1={lineY(i)}
            y2={lineY(i)}
            stroke={ORANGE}
            strokeOpacity={0.6}
            strokeWidth={2}
          />
        ))}

        <foreignObject x={30} y={30} width={70} height={88}>
          <div className="flex h-full items-center justify-center">
            <TimeSignature
              numerator={parseInt(exercise.timeSig.split('/')[0], 10)}
              denominator={parseInt(exercise.timeSig.split('/')[1], 10)}
              size={60}
              color={ORANGE}
            />
          </div>
        </foreignObject>

        {Array.from({ length: slotCount }).map((_, idx) => {
          const x = STAFF_LEFT + idx * SLOT_WIDTH;
          const item = placed[idx];
          return (
            <g key={idx} style={{ cursor: 'pointer' }}>
              <rect
                x={x + 5}
                y={lineY(0) - 30}
                width={SLOT_WIDTH - 10}
                height={lineY(4) - lineY(0) + 60}
                rx={6}
                fill={item ? 'transparent' : 'rgba(255, 153, 51, 0.08)'}
                stroke={item ? 'transparent' : 'rgba(255, 153, 51, 0.35)'}
                strokeDasharray="6 4"
                strokeWidth={1.5}
                onClick={() => handleSlotClick(idx)}
              />
              {item && (
                <foreignObject
                  x={x}
                  y={5}
                  width={SLOT_WIDTH}
                  height={STAFF_HEIGHT - 10}
                  pointerEvents="none"
                >
                  <div className="flex h-full items-center justify-center">
                    {item.kind === 'figure' ? (
                      <NoteSymbol kind={item.figure} direction="up" size={70} color={ORANGE} />
                    ) : (
                      <RestSymbol kind={item.rest} size={50} color={ORANGE} />
                    )}
                  </div>
                </foreignObject>
              )}
              {item && (
                <rect
                  x={x + 5}
                  y={lineY(0) - 30}
                  width={SLOT_WIDTH - 10}
                  height={lineY(4) - lineY(0) + 60}
                  fill="transparent"
                  onClick={() => handleSlotClick(idx)}
                />
              )}
            </g>
          );
        })}

        <line
          x1={totalWidth - 30}
          x2={totalWidth - 30}
          y1={lineY(0)}
          y2={lineY(4)}
          stroke={ORANGE}
          strokeWidth={3}
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src/chapters/cap4/exercises/boards/BuildBoard.tsx
git commit -m "feat(cap-4): add BuildBoard with tappable measure slots"
```

---

## Task 9: CompleteBoard

**Branch:** `feature/cap-4-task-9-complete-board`

**Files:**
- Create: `src/chapters/cap4/exercises/boards/CompleteBoard.tsx`

The board renders 6 measures separated by single bars. Each measure has fixed slots (the figure is rendered directly) and blank slots (rendered as a dashed placeholder). Tapping a blank slot fills it with the currently selected palette item. Tapping a filled blank clears it.

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-9-complete-board
```

- [ ] **Step 2: Write `CompleteBoard.tsx`**

`src/chapters/cap4/exercises/boards/CompleteBoard.tsx`:

```tsx
import type {
  CompleteExercise,
  FigureItem,
  CompleteSlot,
} from '@/chapters/cap4/types';
import TimeSignature from '@/components/music/TimeSignature';
import NoteSymbol from '@/components/music/NoteSymbol';
import RestSymbol from '@/components/music/RestSymbol';
import type { PaletteSelection } from '../Palette';

const ORANGE = '#ff9933';
const STAFF_HEIGHT = 160;
const SLOT_WIDTH = 56;
const MEASURE_PAD = 10;
const TIME_SIG_W = 90;

type Props = {
  exercise: CompleteExercise;
  filled: Map<string, FigureItem>;
  selectedPaletteItem: PaletteSelection | null;
  onFillBlank: (key: string) => void;
  onClearBlank: (key: string) => void;
};

export default function CompleteBoard({
  exercise,
  filled,
  selectedPaletteItem,
  onFillBlank,
  onClearBlank,
}: Props) {
  const measureWidths = exercise.measures.map(
    (m) => m.slots.length * SLOT_WIDTH + MEASURE_PAD * 2,
  );
  const totalStaffWidth = measureWidths.reduce((a, b) => a + b, 0);
  const totalWidth = TIME_SIG_W + totalStaffWidth + 30;
  const lineY = (i: number) => 30 + i * 22;

  function handleBlankClick(measureIdx: number, slotIdx: number) {
    const key = `${measureIdx}:${slotIdx}`;
    if (filled.has(key)) {
      onClearBlank(key);
      return;
    }
    if (
      selectedPaletteItem &&
      (selectedPaletteItem.kind === 'figure' || selectedPaletteItem.kind === 'rest')
    ) {
      onFillBlank(key);
    }
  }

  let cursorX = TIME_SIG_W;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${STAFF_HEIGHT}`}
        style={{ width: '100%', height: STAFF_HEIGHT }}
        role="img"
        aria-label={`Completar compases en ${exercise.timeSig}`}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={TIME_SIG_W}
            x2={totalWidth - 20}
            y1={lineY(i)}
            y2={lineY(i)}
            stroke={ORANGE}
            strokeOpacity={0.6}
            strokeWidth={2}
          />
        ))}

        <foreignObject x={20} y={30} width={70} height={88}>
          <div className="flex h-full items-center justify-center">
            <TimeSignature
              numerator={parseInt(exercise.timeSig.split('/')[0], 10)}
              denominator={parseInt(exercise.timeSig.split('/')[1], 10)}
              size={60}
              color={ORANGE}
            />
          </div>
        </foreignObject>

        {exercise.measures.map((measure, mIdx) => {
          const startX = cursorX;
          const w = measureWidths[mIdx];
          cursorX += w;

          const renderSlot = (slot: CompleteSlot, sIdx: number) => {
            const slotX = startX + MEASURE_PAD + sIdx * SLOT_WIDTH;
            const key = `${mIdx}:${sIdx}`;

            if (slot.kind === 'fixed') {
              return (
                <foreignObject
                  key={`f-${mIdx}-${sIdx}`}
                  x={slotX}
                  y={5}
                  width={SLOT_WIDTH}
                  height={STAFF_HEIGHT - 10}
                  pointerEvents="none"
                >
                  <div className="flex h-full items-center justify-center">
                    {slot.item.kind === 'figure' ? (
                      <NoteSymbol kind={slot.item.figure} direction="up" size={56} color={ORANGE} />
                    ) : (
                      <RestSymbol kind={slot.item.rest} size={42} color={ORANGE} />
                    )}
                  </div>
                </foreignObject>
              );
            }

            const userItem = filled.get(key);
            return (
              <g
                key={`b-${mIdx}-${sIdx}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleBlankClick(mIdx, sIdx)}
              >
                <rect
                  x={slotX + 4}
                  y={lineY(0) - 24}
                  width={SLOT_WIDTH - 8}
                  height={lineY(4) - lineY(0) + 48}
                  rx={4}
                  fill={userItem ? 'transparent' : 'rgba(255, 153, 51, 0.08)'}
                  stroke={'rgba(255, 153, 51, 0.4)'}
                  strokeDasharray="5 3"
                  strokeWidth={1.5}
                />
                {userItem && (
                  <foreignObject
                    x={slotX}
                    y={5}
                    width={SLOT_WIDTH}
                    height={STAFF_HEIGHT - 10}
                    pointerEvents="none"
                  >
                    <div className="flex h-full items-center justify-center">
                      {userItem.kind === 'figure' ? (
                        <NoteSymbol
                          kind={userItem.figure}
                          direction="up"
                          size={56}
                          color={ORANGE}
                        />
                      ) : (
                        <RestSymbol kind={userItem.rest} size={42} color={ORANGE} />
                      )}
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          };

          return (
            <g key={`m-${mIdx}`}>
              {measure.slots.map(renderSlot)}
              {mIdx < exercise.measures.length - 1 && (
                <line
                  x1={startX + w}
                  x2={startX + w}
                  y1={lineY(0)}
                  y2={lineY(4)}
                  stroke={ORANGE}
                  strokeWidth={2.5}
                />
              )}
            </g>
          );
        })}

        <line
          x1={totalWidth - 24}
          x2={totalWidth - 24}
          y1={lineY(0)}
          y2={lineY(4)}
          stroke={ORANGE}
          strokeWidth={3}
        />
        <rect
          x={totalWidth - 16}
          y={lineY(0)}
          width={6}
          height={lineY(4) - lineY(0)}
          fill={ORANGE}
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src/chapters/cap4/exercises/boards/CompleteBoard.tsx
git commit -m "feat(cap-4): add CompleteBoard with fixed and blank slots across 6 measures"
```

---

## Task 10: SlideEjercicioBarras

**Branch:** `feature/cap-4-task-10-slide-bars`

**Files:**
- Create: `src/chapters/cap4/slides/SlideEjercicioBarras.tsx`

Wires the shell + BarsBoard with the BARS_EXERCISES dataset. Owns the local state (current index, user bars per exercise, status).

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-10-slide-bars
```

- [ ] **Step 2: Write `SlideEjercicioBarras.tsx`**

`src/chapters/cap4/slides/SlideEjercicioBarras.tsx`:

```tsx
import { useState } from 'react';
import ExerciseShell from '../exercises/ExerciseShell';
import Palette, { type PaletteSelection } from '../exercises/Palette';
import BarsBoard from '../exercises/boards/BarsBoard';
import { BARS_EXERCISES } from '../data/bars';
import { validateBars } from '../exercises/validators';

type Status = 'editing' | 'correct' | 'incorrect';

export default function SlideEjercicioBarras() {
  const [index, setIndex] = useState(0);
  const [userBars, setUserBars] = useState<number[]>([]);
  const [status, setStatus] = useState<Status>('editing');
  const [paletteSel, setPaletteSel] = useState<PaletteSelection | null>({
    kind: 'bar',
  });

  const ex = BARS_EXERCISES[index];

  function toggleBar(afterIdx: number) {
    if (status !== 'editing') return;
    setUserBars((prev) =>
      prev.includes(afterIdx)
        ? prev.filter((i) => i !== afterIdx)
        : [...prev, afterIdx],
    );
  }

  function verify() {
    setStatus(validateBars(ex, userBars) ? 'correct' : 'incorrect');
  }

  function retry() {
    setStatus('editing');
  }

  function next() {
    if (index < BARS_EXERCISES.length - 1) {
      setIndex(index + 1);
      setUserBars([]);
      setStatus('editing');
    }
  }

  return (
    <ExerciseShell
      title="Coloca las barras divisorias"
      index={index}
      total={BARS_EXERCISES.length}
      status={status}
      onVerify={verify}
      onRetry={retry}
      onNext={next}
      isLast={index === BARS_EXERCISES.length - 1}
      board={
        <BarsBoard
          exercise={ex}
          userBars={userBars}
          onToggleBar={toggleBar}
          highlightWrong={status === 'incorrect'}
        />
      }
      palette={
        <Palette
          selected={paletteSel}
          onSelect={setPaletteSel}
          showBarTool
          showFigureTools={false}
        />
      }
    />
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src/chapters/cap4/slides/SlideEjercicioBarras.tsx
git commit -m "feat(cap-4): wire bars exercise slide"
```

---

## Task 11: SlideEjercicioConstruir

**Branch:** `feature/cap-4-task-11-slide-build`

**Files:**
- Create: `src/chapters/cap4/slides/SlideEjercicioConstruir.tsx`

Paginated `part: 1 | 2`. Part 1 covers exercises 0..4, part 2 covers 5..9. Wires shell + BuildBoard.

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-11-slide-build
```

- [ ] **Step 2: Write `SlideEjercicioConstruir.tsx`**

`src/chapters/cap4/slides/SlideEjercicioConstruir.tsx`:

```tsx
import { useState } from 'react';
import ExerciseShell from '../exercises/ExerciseShell';
import Palette, { type PaletteSelection } from '../exercises/Palette';
import BuildBoard from '../exercises/boards/BuildBoard';
import { BUILD_EXERCISES } from '../data/build';
import { validateBuild } from '../exercises/validators';
import type { FigureItem } from '../types';

type Status = 'editing' | 'correct' | 'incorrect';
type Props = { part: 1 | 2 };

export default function SlideEjercicioConstruir({ part }: Props) {
  const sliceStart = part === 1 ? 0 : 5;
  const sliceEnd = part === 1 ? 5 : 10;
  const exercises = BUILD_EXERCISES.slice(sliceStart, sliceEnd);

  const [localIndex, setLocalIndex] = useState(0);
  const [paletteSel, setPaletteSel] = useState<PaletteSelection | null>(null);
  const [status, setStatus] = useState<Status>('editing');
  const [placed, setPlaced] = useState<(FigureItem | null)[]>(
    () => Array(exercises[0].required.length).fill(null),
  );

  const ex = exercises[localIndex];

  function selectionToItem(sel: PaletteSelection): FigureItem | null {
    if (sel.kind === 'figure') return { kind: 'figure', figure: sel.figure, step: 4 };
    if (sel.kind === 'rest') return { kind: 'rest', rest: sel.rest };
    return null;
  }

  function placeAt(slotIdx: number) {
    if (status !== 'editing' || !paletteSel) return;
    const item = selectionToItem(paletteSel);
    if (!item) return;
    setPlaced((prev) => {
      const next = [...prev];
      next[slotIdx] = item;
      return next;
    });
  }

  function clearAt(slotIdx: number) {
    if (status !== 'editing') return;
    setPlaced((prev) => {
      const next = [...prev];
      next[slotIdx] = null;
      return next;
    });
  }

  function verify() {
    const filled = placed.filter((x): x is FigureItem => x !== null);
    setStatus(validateBuild(ex, filled) ? 'correct' : 'incorrect');
  }

  function retry() {
    setStatus('editing');
  }

  function next() {
    if (localIndex < exercises.length - 1) {
      const nextIdx = localIndex + 1;
      setLocalIndex(nextIdx);
      setPlaced(Array(exercises[nextIdx].required.length).fill(null));
      setStatus('editing');
    }
  }

  return (
    <ExerciseShell
      title={`Construir compás · parte ${part}/2`}
      index={localIndex}
      total={exercises.length}
      status={status}
      onVerify={verify}
      onRetry={retry}
      onNext={next}
      isLast={localIndex === exercises.length - 1}
      board={
        <BuildBoard
          exercise={ex}
          placed={placed}
          selectedPaletteItem={paletteSel}
          onPlaceAt={placeAt}
          onClearAt={clearAt}
        />
      }
      palette={
        <Palette selected={paletteSel} onSelect={setPaletteSel} showFigureTools />
      }
    />
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src/chapters/cap4/slides/SlideEjercicioConstruir.tsx
git commit -m "feat(cap-4): wire build-measure exercise slide (parts 1 and 2)"
```

---

## Task 12: SlideEjercicioCompletar

**Branch:** `feature/cap-4-task-12-slide-complete`

**Files:**
- Create: `src/chapters/cap4/slides/SlideEjercicioCompletar.tsx`

Paginated `part: 1 | 2`. Wires shell + CompleteBoard.

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-12-slide-complete
```

- [ ] **Step 2: Write `SlideEjercicioCompletar.tsx`**

`src/chapters/cap4/slides/SlideEjercicioCompletar.tsx`:

```tsx
import { useState } from 'react';
import ExerciseShell from '../exercises/ExerciseShell';
import Palette, { type PaletteSelection } from '../exercises/Palette';
import CompleteBoard from '../exercises/boards/CompleteBoard';
import { COMPLETE_EXERCISES } from '../data/complete';
import { validateComplete } from '../exercises/validators';
import type { FigureItem } from '../types';

type Status = 'editing' | 'correct' | 'incorrect';
type Props = { part: 1 | 2 };

export default function SlideEjercicioCompletar({ part }: Props) {
  const sliceStart = part === 1 ? 0 : 5;
  const sliceEnd = part === 1 ? 5 : 10;
  const exercises = COMPLETE_EXERCISES.slice(sliceStart, sliceEnd);

  const [localIndex, setLocalIndex] = useState(0);
  const [paletteSel, setPaletteSel] = useState<PaletteSelection | null>(null);
  const [status, setStatus] = useState<Status>('editing');
  const [filled, setFilled] = useState<Map<string, FigureItem>>(new Map());

  const ex = exercises[localIndex];

  function selectionToItem(sel: PaletteSelection): FigureItem | null {
    if (sel.kind === 'figure') return { kind: 'figure', figure: sel.figure, step: 4 };
    if (sel.kind === 'rest') return { kind: 'rest', rest: sel.rest };
    return null;
  }

  function fillBlank(key: string) {
    if (status !== 'editing' || !paletteSel) return;
    const item = selectionToItem(paletteSel);
    if (!item) return;
    setFilled((prev) => {
      const next = new Map(prev);
      next.set(key, item);
      return next;
    });
  }

  function clearBlank(key: string) {
    if (status !== 'editing') return;
    setFilled((prev) => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  }

  function verify() {
    setStatus(validateComplete(ex, filled) ? 'correct' : 'incorrect');
  }

  function retry() {
    setStatus('editing');
  }

  function next() {
    if (localIndex < exercises.length - 1) {
      setLocalIndex(localIndex + 1);
      setFilled(new Map());
      setStatus('editing');
    }
  }

  return (
    <ExerciseShell
      title={`Completar el compás · parte ${part}/2`}
      index={localIndex}
      total={exercises.length}
      status={status}
      onVerify={verify}
      onRetry={retry}
      onNext={next}
      isLast={localIndex === exercises.length - 1}
      board={
        <CompleteBoard
          exercise={ex}
          filled={filled}
          selectedPaletteItem={paletteSel}
          onFillBlank={fillBlank}
          onClearBlank={clearBlank}
        />
      }
      palette={
        <Palette selected={paletteSel} onSelect={setPaletteSel} showFigureTools />
      }
    />
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src/chapters/cap4/slides/SlideEjercicioCompletar.tsx
git commit -m "feat(cap-4): wire complete-measure exercise slide (parts 1 and 2)"
```

---

## Task 13: Portada, Recap and Cierre slides

**Branch:** `feature/cap-4-task-13-static-slides`

**Files:**
- Create: `src/chapters/cap4/slides/SlidePortadaCap4.tsx`
- Create: `src/chapters/cap4/slides/SlideRecapCompas.tsx`
- Create: `src/chapters/cap4/slides/SlideCierreCap4.tsx`

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-13-static-slides
```

- [ ] **Step 2: Write `SlidePortadaCap4.tsx`**

```tsx
export default function SlidePortadaCap4() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-10">
      <span
        className="font-orbitron text-3xl tracking-[0.4em]"
        style={{ color: '#ff9933', textShadow: '0 0 18px #ff9933' }}
      >
        CAPÍTULO IV
      </span>
      <h1
        className="heading-1 text-clear"
        style={{ textShadow: '0 0 24px #ff9933' }}
      >
        Construcción<br />de Compases
      </h1>
      <span
        className="tagline animate-flicker"
        style={{ color: '#ff9933', textShadow: '0 0 14px #ff9933' }}
      >
        Códigos del Compás
      </span>
    </div>
  );
}
```

- [ ] **Step 3: Write `SlideRecapCompas.tsx`**

```tsx
import TimeSignature from '@/components/music/TimeSignature';
import BarLine from '@/components/music/BarLine';

export default function SlideRecapCompas() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="Antes de empezar">
        <span>Antes de empezar</span>
      </h2>

      <p className="body-text text-center max-w-4xl">
        El <strong>indicador de compás</strong> dice cuántos tiempos cabe en cada compás.
        Las <strong>barras divisorias</strong> separan compás de compás. La{' '}
        <strong>barra final</strong> cierra la pieza.
      </p>

      <div className="flex-1 grid grid-cols-3 gap-12 items-center w-full max-w-5xl mt-6">
        <div className="timbre-card flex flex-col items-center justify-center gap-3">
          <TimeSignature numerator={2} denominator={4} size={80} color="#ff9933" />
          <span className="timbre-desc text-center">2 tiempos</span>
        </div>
        <div className="timbre-card flex flex-col items-center justify-center gap-3">
          <TimeSignature numerator={3} denominator={4} size={80} color="#ff9933" />
          <span className="timbre-desc text-center">3 tiempos</span>
        </div>
        <div className="timbre-card flex flex-col items-center justify-center gap-3">
          <TimeSignature numerator={4} denominator={4} size={80} color="#ff9933" />
          <span className="timbre-desc text-center">4 tiempos</span>
        </div>
      </div>

      <div className="flex flex-row gap-12 items-center mt-6">
        <div className="flex flex-col items-center gap-2">
          <BarLine variant="single" height={120} color="#ff9933" />
          <span className="timbre-desc">Divisoria</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BarLine variant="final" height={120} color="#ff9933" />
          <span className="timbre-desc">Final</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write `SlideCierreCap4.tsx`**

```tsx
export default function SlideCierreCap4() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-10">
      <span
        className="font-orbitron text-3xl tracking-[0.4em]"
        style={{ color: '#ff9933', textShadow: '0 0 18px #ff9933' }}
      >
        FIN DEL CAPÍTULO IV
      </span>
      <h1
        className="heading-1 text-clear"
        style={{ textShadow: '0 0 24px #ff9933' }}
      >
        Compás<br />Construido
      </h1>

      <div className="def-box max-w-[1500px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Ya colocaste <strong>barras divisorias</strong>, construiste{' '}
          <strong>compases desde cero</strong> y completaste compases con figuras y silencios.
        </p>
      </div>

      <p className="subtitle max-w-[1300px]">
        En el siguiente capítulo: nuevos códigos por descubrir.
      </p>
    </div>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
pnpm build
```

- [ ] **Step 6: Commit**

```bash
git add src/chapters/cap4/slides/SlidePortadaCap4.tsx src/chapters/cap4/slides/SlideRecapCompas.tsx src/chapters/cap4/slides/SlideCierreCap4.tsx
git commit -m "feat(cap-4): add portada, recap and cierre slides"
```

---

## Task 14: Cap4Presentation + register chapter

**Branch:** `feature/cap-4-task-14-presentation-registry`

**Files:**
- Create: `src/chapters/cap4/Cap4Presentation.tsx`
- Modify: `src/chapters/registry.ts`

- [ ] **Step 1: Branch off develop**

```bash
git checkout develop
git pull --ff-only
git checkout -b feature/cap-4-task-14-presentation-registry
```

- [ ] **Step 2: Write `Cap4Presentation.tsx`**

```tsx
import ChapterPlayer from '@/components/ChapterPlayer';
import SlidePortadaCap4 from './slides/SlidePortadaCap4';
import SlideRecapCompas from './slides/SlideRecapCompas';
import SlideEjercicioBarras from './slides/SlideEjercicioBarras';
import SlideEjercicioConstruir from './slides/SlideEjercicioConstruir';
import SlideEjercicioCompletar from './slides/SlideEjercicioCompletar';
import SlideCierreCap4 from './slides/SlideCierreCap4';

const SLIDES = [
  SlidePortadaCap4,
  SlideRecapCompas,
  SlideEjercicioBarras,
  () => <SlideEjercicioConstruir part={1} />,
  () => <SlideEjercicioConstruir part={2} />,
  () => <SlideEjercicioCompletar part={1} />,
  () => <SlideEjercicioCompletar part={2} />,
  SlideCierreCap4,
];

type Props = {
  onExit?: () => void;
};

export default function Cap4Presentation({ onExit }: Props = {}) {
  return <ChapterPlayer slides={SLIDES} onExit={onExit} />;
}
```

- [ ] **Step 3: Update `registry.ts`**

Add the import:

```ts
import Cap4Presentation from '@/chapters/cap4/Cap4Presentation';
```

Append to the `CHAPTERS` array:

```ts
{
  id: 'cap-4',
  number: 'IV',
  title: 'Construcción de Compases',
  tagline: 'Códigos del Compás',
  description:
    'Práctica activa: colocar barras divisorias, construir compases desde cero y completar compases en 24 ejercicios.',
  topics: [
    'Barras divisorias',
    'Construir compases',
    'Completar compases',
    '24 ejercicios interactivos',
  ],
  status: 'available',
  accent: 'orange',
  presentation: Cap4Presentation,
},
```

- [ ] **Step 4: Verify build and tests**

```bash
pnpm build
pnpm test
```

Expected: build passes, all tests pass.

- [ ] **Step 5: Manual verification in browser**

```bash
pnpm dev
```

In the browser (iPad-landscape viewport):
1. Open the dashboard. Verify the cap-4 card shows in orange.
2. Enter cap-4. Step through portada → recap → bars exercise.
3. In bars: tap between figures to add bars. Verify wrong, retry, fix and verify correct, advance.
4. Repeat for build (parts 1 and 2) and complete (parts 1 and 2).
5. Reach cierre.

- [ ] **Step 6: Commit**

```bash
git add src/chapters/cap4/Cap4Presentation.tsx src/chapters/registry.ts
git commit -m "feat(cap-4): register chapter IV in dashboard"
```

---

## Self-Review Checklist (run after Task 14 lands on develop)

- [ ] All 8 slides render in the canonical 1180×820 canvas without overflow
- [ ] Touch targets work in iPad landscape (verify with browser device emulator)
- [ ] `pnpm build` and `pnpm test` both pass on develop after merging all 14 tasks
- [ ] Dashboard shows cap-4 with orange accent
- [ ] Each block correctly paginates and resets state between sub-exercises
- [ ] Verify/Retry/Next flow works end-to-end on each block
- [ ] No regression in cap-1, cap-2, cap-3 (visual smoke check)

## Merge plan

After all 14 task branches land on `develop` and the self-review passes:

1. Ask the user for explicit approval to merge `develop → main`.
2. Merge with a non-fast-forward merge commit summarizing the chapter.
3. Deploy follows the project's existing flow.
