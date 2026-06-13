# Capítulo V · Líneas Adicionales — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the real `principiante-cap-5` presentation (ledger lines / líneas adicionales): ~10 slides plus an interactive note-naming quiz, with every rendered slide passing the 820-canvas overflow detector.

**Architecture:** Activate the existing mockup chapter by creating `Cap5Presentation` + slide components and wiring the registry. Notes far from the staff need an opt-in `fitNotes` mode added to the shared `Pentagrama` (default off → cap-3 untouched). The quiz is a light `LedgerNoteQuiz` adapted from cap-2's `PlicaQuiz`, reusing `Pentagrama` for each card. Slides are authored at the current big type scale; fit is verified by `scripts/check-overflow.mjs principiante-cap-5` and the user's visual gate.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind, Vitest (logic tests), Playwright (overflow detector). Spec: `docs/superpowers/specs/2026-06-13-cap-5-ledger-lines-design.md`.

**Preconditions:**
- Dev server already running at `http://localhost:5173`. Do not start another. If down, ask the user to run `npm run dev`.
- Work on branch `feature/cap-5-ledger-lines` (already created). Never commit to `main`/`develop` (protect-git hook enforces this).
- `accent` lime = `#84ff00` (registry.ts:56). Treble step 0 = bottom line Mi₄; bass step 0 = bottom line Sol₂; +2 per staff line; even steps beyond the staff are ledger lines.

---

## File Structure

- **Modify** `src/components/music/Pentagrama.tsx` — add opt-in `fitNotes` prop + exported pure `fitViewBox(steps)` helper. One responsibility: staff/note rendering + its viewBox.
- **Create** `src/components/music/__tests__/pentagramaFit.test.ts` — unit test for `fitViewBox`.
- **Modify** `src/chapters/registry.ts` — import `Cap5Presentation`, set `presentation`, `status: 'available'`.
- **Create** `src/chapters/cap5/Cap5Presentation.tsx` — `ChapterPlayer` over the `SLIDES` array.
- **Create** `src/chapters/cap5/slides/*.tsx` — one component per slide.
- **Create** `src/chapters/cap5/visualizations/LedgerNoteQuiz.tsx` + `LedgerNoteQuizData.ts` — the quiz + its 8 questions.
- **Create** `src/chapters/cap5/__tests__/quizData.test.ts` — data-integrity test for the quiz.

No new abstractions beyond these. Slides follow the cap-2/cap-4 component pattern; splitting a slide just adds another entry to `SLIDES`.

---

### Task 1: Pentagrama `fitNotes` opt-in vertical range

**Files:**
- Modify: `src/components/music/Pentagrama.tsx`
- Create: `src/components/music/__tests__/pentagramaFit.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/components/music/__tests__/pentagramaFit.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { fitViewBox } from '../Pentagrama';

describe('fitViewBox', () => {
  it('returns the default 0..320 range when no notes', () => {
    expect(fitViewBox([])).toEqual({ y: 0, height: 320 });
  });

  it('keeps the default range for notes inside the staff', () => {
    // steps 0..8 are the five staff lines (treble Mi4..Fa5)
    expect(fitViewBox([0, 4, 8])).toEqual({ y: 0, height: 320 });
  });

  it('expands upward for high ledger notes (negative y top)', () => {
    const vb = fitViewBox([19]); // Do7, 5th upper ledger line
    expect(vb.y).toBeLessThan(0);
    expect(vb.height).toBeGreaterThan(320);
  });

  it('expands downward for low ledger notes (y stays 0, taller)', () => {
    const vb = fitViewBox([-7]); // Mi3, below 3rd lower ledger line
    expect(vb.y).toBe(0);
    expect(vb.height).toBeGreaterThan(320);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/music/__tests__/pentagramaFit.test.ts`
Expected: FAIL — `fitViewBox` is not exported yet.

- [ ] **Step 3: Implement `fitViewBox` and the `fitNotes` prop**

In `src/components/music/Pentagrama.tsx`, add the exported helper near the other module constants/helpers (after `labelYFor`), using the existing `STAFF_BOTTOM`, `LINE_GAP`, `VB_WIDTH`, `VB_HEIGHT`, `NOTEHEAD_HALF_HEIGHT`, `NOTE_LABEL_FONT_SIZE`, `stepToY`, `labelYFor`:

```ts
function noteExtent(step: number): { top: number; bottom: number } {
  const y = stepToY(step);
  const labelY = labelYFor(step);
  const top = Math.min(y - NOTEHEAD_HALF_HEIGHT, labelY - NOTE_LABEL_FONT_SIZE);
  const bottom = Math.max(y + NOTEHEAD_HALF_HEIGHT, labelY + NOTE_LABEL_FONT_SIZE * 0.35);
  return { top, bottom };
}

export function fitViewBox(steps: number[]): { y: number; height: number } {
  const PAD = 16;
  let top = 0;
  let bottom = VB_HEIGHT;
  for (const s of steps) {
    const e = noteExtent(s);
    top = Math.min(top, e.top);
    bottom = Math.max(bottom, e.bottom);
  }
  if (top < 0) top -= PAD;
  if (bottom > VB_HEIGHT) bottom += PAD;
  return { y: top, height: bottom - top };
}
```

Add `fitNotes?: boolean;` to the `Props` type. In the component body, replace the fixed viewBox + `resolvedHeight` with range-aware values:

```tsx
const vb = fitNotes
  ? fitViewBox(notes.map((n) => n.step))
  : { y: 0, height: VB_HEIGHT };

const resolvedHeight =
  height ?? (typeof width === 'number' ? (width * vb.height) / VB_WIDTH : undefined);
```

And change the `<svg>` `viewBox` to:

```tsx
viewBox={`0 ${vb.y} ${VB_WIDTH} ${vb.height}`}
```

Destructure `fitNotes = false` in the component's props alongside the others. Leave everything else (staff lines, clef, notes, labels) unchanged — they already use absolute coordinates that the expanded viewBox now reveals.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/music/__tests__/pentagramaFit.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Verify the full suite + build, and cap-3 is visually unchanged**

Run: `npm test && npm run build`
Expected: all tests pass (29 existing + 4 new = 33), build succeeds. Because `fitNotes` defaults `false`, every existing `Pentagrama` usage (all of cap-3, cap-1 Melodía) keeps the exact `0 0 800 320` viewBox.

- [ ] **Step 6: Commit**

```bash
git add src/components/music/Pentagrama.tsx src/components/music/__tests__/pentagramaFit.test.ts
git commit -m "feat(pentagrama): opt-in fitNotes viewBox for ledger-line ranges"
```

---

### Task 2: Activate cap-5 with the cover slide

**Files:**
- Create: `src/chapters/cap5/slides/SlidePortadaCap5.tsx`
- Create: `src/chapters/cap5/Cap5Presentation.tsx`
- Modify: `src/chapters/registry.ts`

- [ ] **Step 1: Create the cover slide**

Create `src/chapters/cap5/slides/SlidePortadaCap5.tsx` (pattern: SlidePortadaCap4, lime accent):

```tsx
export default function SlidePortadaCap5() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-10">
      <span
        className="font-orbitron text-3xl tracking-[0.4em]"
        style={{ color: '#84ff00', textShadow: '0 0 18px #84ff00' }}
      >
        CAPÍTULO V
      </span>
      <h1 className="heading-1 text-clear" style={{ textShadow: '0 0 24px #84ff00' }}>
        Líneas<br />Adicionales
      </h1>
      <span
        className="tagline"
        style={{ color: '#84ff00', textShadow: '0 0 14px #84ff00' }}
      >
        Códigos del Registro
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Create the presentation**

Create `src/chapters/cap5/Cap5Presentation.tsx`:

```tsx
import ChapterPlayer from '@/components/ChapterPlayer';
import SlidePortadaCap5 from './slides/SlidePortadaCap5';

const SLIDES = [
  SlidePortadaCap5,
];

type Props = {
  onExit?: () => void;
};

export default function Cap5Presentation({ onExit }: Props = {}) {
  return <ChapterPlayer slides={SLIDES} onExit={onExit} />;
}
```

- [ ] **Step 3: Wire the registry**

In `src/chapters/registry.ts`: add the import next to the other presentation imports (after the `Cap4Presentation` import):

```tsx
import Cap5Presentation from '@/chapters/cap5/Cap5Presentation';
```

In the `principiante-cap-5` entry (currently `status: 'mockup'`, no `presentation`), change `status: 'mockup'` to `status: 'available'` and add `presentation: Cap5Presentation,` (place it alongside `accent: 'lime'`).

- [ ] **Step 4: Build + route check**

Run: `npm run build`
Expected: PASS.
Then: `node scripts/check-overflow.mjs principiante-cap-5`
Expected: `principiante-cap-5  01/1  ok` and `0 slide(s) overflowing`. (Confirms the route is live and the cover fits.)

- [ ] **Step 5: Commit**

```bash
git add src/chapters/cap5 src/chapters/registry.ts
git commit -m "feat(cap5): activate chapter with cover slide"
```

---

### Reflow procedure (shared by Tasks 3–6)

Each slide-building task ends by driving overflow to zero:

1. After adding/editing slides, run `node scripts/check-overflow.mjs principiante-cap-5`.
2. For any `OVERFLOW` slide, resolve it **without shrinking reading text**: reduce decorative sizes (`Pentagrama` `width`, gaps), trim a caption (the prose here is authored, not user-owned, but keep it faithful to the temario), or split into another `SLIDES` entry.
3. Re-run until `0 slide(s) overflowing`.

`Pentagrama` sizing note: with `fitNotes`, a taller note range yields a taller SVG for a given `width`; if a stacked pair of pentagrams is too tall, lower each `width` (e.g. 760→640) or split the slide.

---

### Task 3: Concept slides (¿Qué son? + Conteo)

**Files:**
- Create: `src/chapters/cap5/slides/SlideQueSon.tsx`, `src/chapters/cap5/slides/SlideConteo.tsx`
- Modify: `src/chapters/cap5/Cap5Presentation.tsx`

- [ ] **Step 1: Create SlideQueSon**

```tsx
import Pentagrama from '@/components/music/Pentagrama';

export default function SlideQueSon() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <h2 className="heading-2" data-text="Líneas adicionales">
        <span>Líneas adicionales</span>
      </h2>

      <div className="def-box max-w-5xl">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Líneas <strong>cortas</strong> que extienden el pentagrama hacia
          <em> arriba</em> y <em>abajo</em>, con la <strong>misma distancia</strong>
          que las líneas del pentagrama.
        </p>
      </div>

      <div className="text-cyan w-full flex justify-center">
        <Pentagrama
          fitNotes
          notes={[
            { step: 12, label: 'arriba', color: '#84ff00' },
            { step: -4, label: 'abajo', color: '#84ff00' },
          ]}
          width={760}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create SlideConteo**

Upper ledger lines counted bottom→up; lower counted top→down. Show one note on each of the 1st/2nd/3rd ledger lines above and below, labeled with the ordinal:

```tsx
import Pentagrama from '@/components/music/Pentagrama';

export default function SlideConteo() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <h2 className="heading-2" data-text="Cómo se cuentan">
        <span>Cómo se cuentan</span>
      </h2>

      <div className="def-box max-w-5xl">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Las <strong>superiores</strong> se cuentan <em>de abajo hacia arriba</em>;
          las <strong>inferiores</strong>, <em>de arriba hacia abajo</em>.
        </p>
      </div>

      <div className="text-cyan w-full flex justify-center">
        <Pentagrama
          fitNotes
          notes={[
            { step: 10, label: '1ª', color: '#84ff00' },
            { step: 12, label: '2ª', color: '#84ff00' },
            { step: 14, label: '3ª', color: '#84ff00' },
            { step: -2, label: '1ª', color: '#84ff00' },
            { step: -4, label: '2ª', color: '#84ff00' },
            { step: -6, label: '3ª', color: '#84ff00' },
          ]}
          width={760}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Register both slides**

In `Cap5Presentation.tsx`, import them and insert after `SlidePortadaCap5`:

```tsx
import SlideQueSon from './slides/SlideQueSon';
import SlideConteo from './slides/SlideConteo';
// ...
const SLIDES = [
  SlidePortadaCap5,
  SlideQueSon,
  SlideConteo,
];
```

- [ ] **Step 4: Reflow to zero + build**

Run: `node scripts/check-overflow.mjs principiante-cap-5` → resolve any OVERFLOW per the Reflow procedure → `0 slide(s) overflowing`.
Run: `npm run build` → PASS.

- [ ] **Step 5: Commit**

```bash
git add src/chapters/cap5
git commit -m "feat(cap5): concept slides (qué son, conteo)"
```

---

### Task 4: Scale demonstration slides

**Files:**
- Create: `src/chapters/cap5/slides/SlideEscalaDescendente.tsx`, `SlideEscalaAscendente.tsx`, `SlideEscalaFa.tsx`
- Modify: `src/chapters/cap5/Cap5Presentation.tsx`

Note the temario scales (treble step 0 = Mi₄, bass step 0 = Sol₂). Labels are the note names.

- [ ] **Step 1: SlideEscalaDescendente — clave de Sol, Re→Mi, líneas inferiores**

```tsx
import Pentagrama from '@/components/music/Pentagrama';

export default function SlideEscalaDescendente() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <h2 className="heading-2" data-text="Escala descendente">
        <span>Escala descendente</span>
      </h2>
      <p className="body-text text-center max-w-4xl">
        De <strong>Re</strong> a <strong>Mi</strong> con líneas adicionales
        <em> inferiores</em>, en clave de <em>Sol</em>.
      </p>
      <div className="text-cyan w-full flex justify-center">
        <Pentagrama
          fitNotes
          clef="sol"
          notes={[
            { step: -1, label: 'Re', color: '#84ff00' },
            { step: -2, label: 'Do', color: '#84ff00' },
            { step: -3, label: 'Si', color: '#84ff00' },
            { step: -4, label: 'La', color: '#84ff00' },
            { step: -5, label: 'Sol', color: '#84ff00' },
            { step: -6, label: 'Fa', color: '#84ff00' },
            { step: -7, label: 'Mi', color: '#84ff00' },
          ]}
          width={860}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: SlideEscalaAscendente — clave de Sol, Sol→Do + octava, líneas superiores**

Two stacked pentagrams (the Sol→Do run, then the Do→Do octave):

```tsx
import Pentagrama from '@/components/music/Pentagrama';

export default function SlideEscalaAscendente() {
  return (
    <div className="flex-1 flex flex-col gap-6 items-center justify-center">
      <h2 className="heading-2" data-text="Escala ascendente">
        <span>Escala ascendente</span>
      </h2>
      <p className="body-text text-center max-w-4xl">
        De <strong>Sol</strong> a <strong>Do</strong>, y la octava de
        <strong> Do</strong> a <strong>Do</strong>, con líneas adicionales
        <em> superiores</em>.
      </p>
      <div className="text-cyan w-full flex flex-col items-center gap-2">
        <Pentagrama
          fitNotes
          clef="sol"
          notes={[
            { step: 9, label: 'Sol', color: '#84ff00' },
            { step: 10, label: 'La', color: '#84ff00' },
            { step: 11, label: 'Si', color: '#84ff00' },
            { step: 12, label: 'Do', color: '#84ff00' },
          ]}
          width={620}
        />
        <Pentagrama
          fitNotes
          clef="sol"
          notes={[
            { step: 12, label: 'Do', color: '#84ff00' },
            { step: 13, label: 'Re', color: '#84ff00' },
            { step: 14, label: 'Mi', color: '#84ff00' },
            { step: 15, label: 'Fa', color: '#84ff00' },
            { step: 16, label: 'Sol', color: '#84ff00' },
            { step: 17, label: 'La', color: '#84ff00' },
            { step: 18, label: 'Si', color: '#84ff00' },
            { step: 19, label: 'Do', color: '#84ff00' },
          ]}
          width={760}
        />
      </div>
    </div>
  );
}
```

If the detector flags this as overflowing, split into two slides (`SlideEscalaAscendente` = the Sol→Do run, `SlideEscalaAscendente2` = the octave) and register both.

- [ ] **Step 3: SlideEscalaFa — clave de Fa, escala completa inferior y superior**

Two stacked pentagrams: lower octave Do₂→Do₃ and upper octave Do₃→Do₄ (bass steps):

```tsx
import Pentagrama from '@/components/music/Pentagrama';

export default function SlideEscalaFa() {
  return (
    <div className="flex-1 flex flex-col gap-6 items-center justify-center">
      <h2 className="heading-2" data-text="Escala en clave de Fa">
        <span>Escala en clave de Fa</span>
      </h2>
      <p className="body-text text-center max-w-4xl">
        Escala <strong>completa</strong>: líneas adicionales <em>inferiores</em> y
        <em> superiores</em> en clave de <em>Fa</em>.
      </p>
      <div className="text-magenta w-full flex flex-col items-center gap-2">
        <Pentagrama
          fitNotes
          clef="fa"
          notes={[
            { step: -4, label: 'Do', color: '#84ff00' },
            { step: -3, label: 'Re', color: '#84ff00' },
            { step: -2, label: 'Mi', color: '#84ff00' },
            { step: -1, label: 'Fa', color: '#84ff00' },
            { step: 0, label: 'Sol', color: '#84ff00' },
            { step: 1, label: 'La', color: '#84ff00' },
            { step: 2, label: 'Si', color: '#84ff00' },
            { step: 3, label: 'Do', color: '#84ff00' },
          ]}
          width={760}
        />
        <Pentagrama
          fitNotes
          clef="fa"
          notes={[
            { step: 3, label: 'Do', color: '#84ff00' },
            { step: 4, label: 'Re', color: '#84ff00' },
            { step: 5, label: 'Mi', color: '#84ff00' },
            { step: 6, label: 'Fa', color: '#84ff00' },
            { step: 7, label: 'Sol', color: '#84ff00' },
            { step: 8, label: 'La', color: '#84ff00' },
            { step: 9, label: 'Si', color: '#84ff00' },
            { step: 10, label: 'Do', color: '#84ff00' },
          ]}
          width={760}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Register the scale slides**

In `Cap5Presentation.tsx`, import and append after `SlideConteo`:

```tsx
import SlideEscalaDescendente from './slides/SlideEscalaDescendente';
import SlideEscalaAscendente from './slides/SlideEscalaAscendente';
import SlideEscalaFa from './slides/SlideEscalaFa';
// ...SLIDES: ...SlideConteo, SlideEscalaDescendente, SlideEscalaAscendente, SlideEscalaFa,
```

- [ ] **Step 5: Reflow to zero + build**

Run: `node scripts/check-overflow.mjs principiante-cap-5` → resolve OVERFLOW (split stacked-pentagram slides if needed) → `0 slide(s) overflowing`.
Run: `npm run build` → PASS.

- [ ] **Step 6: Commit**

```bash
git add src/chapters/cap5
git commit -m "feat(cap5): scale demonstration slides (Sol descendente/ascendente, Fa)"
```

---

### Task 5: LedgerNoteQuiz component + data (+ test)

**Files:**
- Create: `src/chapters/cap5/visualizations/LedgerNoteQuizData.ts`
- Create: `src/chapters/cap5/visualizations/LedgerNoteQuiz.tsx`
- Create: `src/chapters/cap5/__tests__/quizData.test.ts`

- [ ] **Step 1: Create the quiz data**

Create `src/chapters/cap5/visualizations/LedgerNoteQuizData.ts`:

```ts
export type NoteName = 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si';

export type LedgerQuestion = {
  id: string;
  clef: 'sol' | 'fa';
  step: number; // ledger-line position; treble step0=Mi4, bass step0=Sol2
  correct: NoteName;
};

export const NOTE_NAMES: NoteName[] = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];

// Treble (clave de Sol): lower & upper ledger lines
export const SOL_QUESTIONS: LedgerQuestion[] = [
  { id: 'sol-1', clef: 'sol', step: -2, correct: 'Do' }, // Do4, 1st lower ledger
  { id: 'sol-2', clef: 'sol', step: -4, correct: 'La' }, // La3, 2nd lower ledger
  { id: 'sol-3', clef: 'sol', step: 10, correct: 'La' }, // La5, 1st upper ledger
  { id: 'sol-4', clef: 'sol', step: 12, correct: 'Do' }, // Do6, 2nd upper ledger
];

// Bass (clave de Fa): upper & lower ledger lines
export const FA_QUESTIONS: LedgerQuestion[] = [
  { id: 'fa-1', clef: 'fa', step: 10, correct: 'Do' }, // Do4, 1st upper ledger
  { id: 'fa-2', clef: 'fa', step: 12, correct: 'Mi' }, // Mi4, 2nd upper ledger
  { id: 'fa-3', clef: 'fa', step: -2, correct: 'Mi' }, // Mi2, 1st lower ledger
  { id: 'fa-4', clef: 'fa', step: -4, correct: 'Do' }, // Do2, 2nd lower ledger
];
```

- [ ] **Step 2: Write the failing data-integrity test**

Create `src/chapters/cap5/__tests__/quizData.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import {
  SOL_QUESTIONS,
  FA_QUESTIONS,
  NOTE_NAMES,
} from '../visualizations/LedgerNoteQuizData';

describe('LedgerNoteQuiz data', () => {
  const all = [...SOL_QUESTIONS, ...FA_QUESTIONS];

  it('has 4 treble + 4 bass questions', () => {
    expect(SOL_QUESTIONS).toHaveLength(4);
    expect(FA_QUESTIONS).toHaveLength(4);
  });

  it('every correct answer is a valid note name', () => {
    for (const q of all) expect(NOTE_NAMES).toContain(q.correct);
  });

  it('every note sits on a ledger line (even step beyond the staff)', () => {
    for (const q of all) {
      const beyond = q.step < 0 || q.step > 8;
      expect(beyond).toBe(true);
      expect(q.step % 2).toBe(0);
    }
  });

  it('has unique ids', () => {
    const ids = all.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
```

- [ ] **Step 3: Run the data-guard test**

Run: `npx vitest run src/chapters/cap5/__tests__/quizData.test.ts`
Expected: PASS (this test guards the data shape, not a TDD red→green). If any assert fails, fix the data, not the test.

- [ ] **Step 4: Create the quiz component**

Create `src/chapters/cap5/visualizations/LedgerNoteQuiz.tsx` (adapted from cap-2 `PlicaQuiz`, reusing `Pentagrama`):

```tsx
import { useMemo, useState } from 'react';
import Pentagrama from '@/components/music/Pentagrama';
import {
  NOTE_NAMES,
  type LedgerQuestion,
  type NoteName,
} from './LedgerNoteQuizData';

type Props = {
  questions: LedgerQuestion[];
  startNumber?: number;
};

export default function LedgerNoteQuiz({ questions, startNumber = 1 }: Props) {
  const [answers, setAnswers] = useState<Record<string, NoteName>>({});

  const score = useMemo(
    () => questions.reduce((n, q) => (answers[q.id] === q.correct ? n + 1 : n), 0),
    [answers, questions],
  );
  const answered = Object.keys(answers).length;

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {questions.map((q, i) => {
          const ua = answers[q.id];
          const isAnswered = ua !== undefined;
          const isCorrect = ua === q.correct;
          return (
            <div
              key={q.id}
              className="rounded-2xl p-4 border-2 backdrop-blur-md transition-colors flex items-center gap-5"
              style={{
                background: 'rgba(15, 0, 35, 0.55)',
                borderColor: !isAnswered
                  ? 'rgba(132, 255, 0, 0.45)'
                  : isCorrect
                    ? 'rgba(34, 255, 102, 0.85)'
                    : 'rgba(255, 51, 102, 0.85)',
                boxShadow: !isAnswered
                  ? '0 0 14px rgba(132, 255, 0, 0.25)'
                  : isCorrect
                    ? '0 0 24px rgba(34, 255, 102, 0.6)'
                    : '0 0 24px rgba(255, 51, 102, 0.6)',
              }}
            >
              <span className="font-orbitron text-[26px] tracking-[0.2em] text-clear/70 shrink-0">
                {String(startNumber + i).padStart(2, '0')}
              </span>
              <div className="text-cyan shrink-0">
                <Pentagrama
                  fitNotes
                  clef={q.clef}
                  notes={[{ step: q.step, color: '#84ff00', highlight: true }]}
                  width={220}
                />
              </div>
              <div className="grid grid-cols-4 gap-2 flex-1">
                {NOTE_NAMES.map((name) => (
                  <NameButton
                    key={name}
                    label={name}
                    selected={ua === name}
                    correct={q.correct === name}
                    isAnswered={isAnswered}
                    onClick={() =>
                      !isAnswered && setAnswers((a) => ({ ...a, [q.id]: name }))
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="font-orbitron text-[30px] tracking-[0.2em] text-clear/85">
          Score:{' '}
          <span className="text-cyan text-glow-cyan">
            {score}/{questions.length}
          </span>
          {answered === questions.length && (
            <span className="ml-4 text-electric text-glow-electric">
              {score === questions.length ? '◈ ¡PERFECTO!' : '◈ SIGUE PRACTICANDO'}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setAnswers({})}
          className="font-orbitron text-[22px] tracking-[0.2em] uppercase px-5 py-2 rounded-full border-2 border-magenta text-magenta bg-base/60 hover:border-cyan hover:text-cyan transition-colors"
          style={{ textShadow: '0 0 10px currentColor' }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

type ButtonProps = {
  label: string;
  selected: boolean;
  correct: boolean;
  isAnswered: boolean;
  onClick: () => void;
};

function NameButton({ label, selected, correct, isAnswered, onClick }: ButtonProps) {
  let borderColor = 'rgba(132, 255, 0, 0.5)';
  let textColor = '#84ff00';
  let glow = '0 0 10px rgba(132, 255, 0, 0.35)';

  if (isAnswered) {
    if (selected && correct) {
      borderColor = '#22ff66';
      textColor = '#22ff66';
      glow = '0 0 16px rgba(34, 255, 102, 0.7)';
    } else if (selected && !correct) {
      borderColor = '#ff3366';
      textColor = '#ff3366';
      glow = '0 0 16px rgba(255, 51, 102, 0.7)';
    } else if (!selected && correct) {
      borderColor = 'rgba(34, 255, 102, 0.7)';
      textColor = 'rgba(34, 255, 102, 0.85)';
      glow = '0 0 12px rgba(34, 255, 102, 0.4)';
    } else {
      borderColor = 'rgba(255, 255, 255, 0.15)';
      textColor = 'rgba(224, 247, 255, 0.5)';
      glow = 'none';
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isAnswered}
      className="font-orbitron text-[24px] tracking-[0.1em] px-2 py-2 rounded-lg border-2 transition-all disabled:cursor-not-allowed"
      style={{
        borderColor,
        color: textColor,
        textShadow: '0 0 8px currentColor',
        boxShadow: glow,
        background: 'rgba(5, 0, 21, 0.55)',
      }}
    >
      {label}
    </button>
  );
}
```

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: PASS (component compiles; not yet rendered in a slide).

- [ ] **Step 6: Commit**

```bash
git add src/chapters/cap5/visualizations src/chapters/cap5/__tests__
git commit -m "feat(cap5): LedgerNoteQuiz component + question data"
```

---

### Task 6: Exercise slides (name the note)

**Files:**
- Create: `src/chapters/cap5/slides/SlideEjercicioSol.tsx`, `src/chapters/cap5/slides/SlideEjercicioFa.tsx`
- Modify: `src/chapters/cap5/Cap5Presentation.tsx`

- [ ] **Step 1: SlideEjercicioSol (1/2)**

```tsx
import LedgerNoteQuiz from '../visualizations/LedgerNoteQuiz';
import { SOL_QUESTIONS } from '../visualizations/LedgerNoteQuizData';

export default function SlideEjercicioSol() {
  return (
    <div className="flex-1 flex flex-col gap-6 justify-center">
      <h2 className="heading-2 self-start" data-text="Ejercicio · clave de Sol">
        <span>Ejercicio · clave de Sol</span>
      </h2>
      <p className="font-rajdhani text-[56px] leading-snug text-clear/85">
        Nombra la nota según su línea adicional.
      </p>
      <LedgerNoteQuiz questions={SOL_QUESTIONS} startNumber={1} />
    </div>
  );
}
```

- [ ] **Step 2: SlideEjercicioFa (2/2)**

```tsx
import LedgerNoteQuiz from '../visualizations/LedgerNoteQuiz';
import { FA_QUESTIONS } from '../visualizations/LedgerNoteQuizData';

export default function SlideEjercicioFa() {
  return (
    <div className="flex-1 flex flex-col gap-6 justify-center">
      <h2 className="heading-2 self-start" data-text="Ejercicio · clave de Fa">
        <span>Ejercicio · clave de Fa</span>
      </h2>
      <p className="font-rajdhani text-[56px] leading-snug text-clear/85">
        Nombra la nota según su línea adicional.
      </p>
      <LedgerNoteQuiz questions={FA_QUESTIONS} startNumber={5} />
    </div>
  );
}
```

- [ ] **Step 3: Register both**

Append after the scale slides in `Cap5Presentation.tsx`:

```tsx
import SlideEjercicioSol from './slides/SlideEjercicioSol';
import SlideEjercicioFa from './slides/SlideEjercicioFa';
// ...SLIDES: ...SlideEscalaFa, SlideEjercicioSol, SlideEjercicioFa,
```

- [ ] **Step 4: Reflow to zero + build**

Run: `node scripts/check-overflow.mjs principiante-cap-5`.
If an exercise slide overflows (4 question cards + 7-button selectors at the big scale is dense), resolve by **splitting each exercise into two slides of 2 questions** (e.g. `SOL_QUESTIONS.slice(0,2)` / `.slice(2,4)`), or by reducing the per-card `Pentagrama` `width`. Re-run until `0 slide(s) overflowing`.
Run: `npm run build` → PASS.

- [ ] **Step 5: Interactivity smoke**

Run a headless click on an answer button on slide "Ejercicio · clave de Sol" and confirm the score updates with no console/page errors (same approach used for cap-2's quiz). Expected: a `Score:` change and `errors: none`.

- [ ] **Step 6: Commit**

```bash
git add src/chapters/cap5
git commit -m "feat(cap5): note-naming exercise slides (clave de Sol y Fa)"
```

---

### Task 7: Closing slide

**Files:**
- Create: `src/chapters/cap5/slides/SlideCierreCap5.tsx`
- Modify: `src/chapters/cap5/Cap5Presentation.tsx`

- [ ] **Step 1: Create SlideCierreCap5** (pattern: SlideCierreCap4, lime; cap-6 is "El Tiempo")

```tsx
export default function SlideCierreCap5() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
      <span
        className="font-orbitron text-3xl tracking-[0.4em]"
        style={{ color: '#84ff00', textShadow: '0 0 18px #84ff00' }}
      >
        FIN DEL CAPÍTULO V
      </span>
      <h1 className="heading-1 text-clear" style={{ textShadow: '0 0 24px #84ff00' }}>
        Registro<br />Extendido
      </h1>

      <div className="def-box max-w-[1500px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Ya lees notas <strong>fuera del pentagrama</strong> con líneas
          adicionales, arriba y abajo, en clave de <em>Sol</em> y de <em>Fa</em>.
        </p>
      </div>

      <p className="subtitle max-w-[1300px]">
        En el siguiente capítulo: <em>El Tiempo</em>.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Register (append last)**

```tsx
import SlideCierreCap5 from './slides/SlideCierreCap5';
// ...SLIDES: ...SlideEjercicioFa, SlideCierreCap5,
```

- [ ] **Step 3: Reflow to zero + build**

Run: `node scripts/check-overflow.mjs principiante-cap-5` → `0 slide(s) overflowing`.
Run: `npm run build` → PASS.

- [ ] **Step 4: Commit**

```bash
git add src/chapters/cap5
git commit -m "feat(cap5): closing slide"
```

---

### Task 8: Whole-chapter verification + visual gate + handoff

**Files:** none (verification only)

- [ ] **Step 1: Full chapter overflow check**

Run: `node scripts/check-overflow.mjs principiante-cap-5`
Expected: `0 slide(s) overflowing`, exit 0.

- [ ] **Step 2: Build, tests, lint all green**

Run: `npm run build && npm test && npm run lint`
Expected: build OK, all tests pass (33: 29 existing + 4 fitViewBox + the quiz-data tests), lint clean.

- [ ] **Step 3: Capture screenshots + user visual gate**

Capture every cap-5 slide headless (1600×900, navigate via `[aria-label="Siguiente slide"]`, settling past the transition like the detector). Present to the user for approval of: text size + layout, **musical correctness of each scale and quiz note**, the lime accent, and glow/blur (headless ≠ ground truth for compositing — the user's confirmation is the gate). Also confirm the quiz responds to clicks in the real app.

- [ ] **Step 4: Finish the branch**

Use `superpowers:finishing-a-development-branch`. Merge to `develop`/`main` requires explicit user confirmation (project rule).

---

## Notes for the executor

- **Branch:** all work on `feature/cap-5-ledger-lines`. The protect-git hook blocks commits/merges on `main`/`develop`; use `CLAUDE_GIT_OVERRIDE=1` only for merges/pushes the user has explicitly authorized.
- **Regressions:** if a change breaks something that worked (e.g. cap-3 pentagrams shift), `git revert` and retry — do not patch forward. `fitNotes` defaults off precisely to avoid touching cap-3.
- **No shrinking reading text:** resolve overflow by decorative-size reduction or splitting, never by lowering the body/subtitle/quiz text below the established scale.
- **Scales are interpretations:** the user validates the musical content at the visual gate (Task 8); adjust note sequences if they request.
- **Do not start a second dev server** — reuse the one on :5173.
