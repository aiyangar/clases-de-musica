import { useMemo, useState } from 'react';
import ExerciseShell from '../exercises/ExerciseShell';
import Palette, {
  type PaletteSelection,
  type PoolEntry,
} from '../exercises/Palette';
import BuildBoard from '../exercises/boards/BuildBoard';
import { BUILD_EXERCISES } from '../data/build';
import { validateBuild } from '../exercises/validators';
import type { FigureItem } from '../types';

type Status = 'editing' | 'correct' | 'incorrect';
type Props = { part: 1 | 2 };

function poolKeyOf(item: FigureItem): string {
  return item.kind === 'figure' ? `fig:${item.figure}` : `rest:${item.rest}`;
}

function selectionKeyOf(sel: PaletteSelection): string | null {
  if (sel.kind === 'figure') return `fig:${sel.figure}`;
  if (sel.kind === 'rest') return `rest:${sel.rest}`;
  return null;
}

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

  const poolTotals = useMemo(() => {
    const counts = new Map<string, { selection: PoolEntry['selection']; count: number }>();
    for (const item of ex.required) {
      const key = poolKeyOf(item);
      const sel: PoolEntry['selection'] =
        item.kind === 'figure'
          ? { kind: 'figure', figure: item.figure }
          : { kind: 'rest', rest: item.rest };
      const entry = counts.get(key);
      if (entry) entry.count += 1;
      else counts.set(key, { selection: sel, count: 1 });
    }
    return counts;
  }, [ex]);

  const usage = useMemo(() => {
    const u = new Map<string, number>();
    for (const item of placed) {
      if (!item) continue;
      const key = poolKeyOf(item);
      u.set(key, (u.get(key) ?? 0) + 1);
    }
    return u;
  }, [placed]);

  const pool: PoolEntry[] = useMemo(() => {
    return Array.from(poolTotals.entries()).map(([key, { selection, count }]) => ({
      selection,
      total: count,
      remaining: count - (usage.get(key) ?? 0),
    }));
  }, [poolTotals, usage]);

  function selectionToItem(sel: PaletteSelection): FigureItem | null {
    if (sel.kind === 'figure') return { kind: 'figure', figure: sel.figure, step: 4 };
    if (sel.kind === 'rest') return { kind: 'rest', rest: sel.rest };
    return null;
  }

  function placeAt(slotIdx: number) {
    if (status !== 'editing' || !paletteSel) return;
    const key = selectionKeyOf(paletteSel);
    if (!key) return;
    const total = poolTotals.get(key)?.count ?? 0;
    const used = usage.get(key) ?? 0;
    if (used >= total) return;

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
      setPaletteSel(null);
      setStatus('editing');
    }
  }

  return (
    <ExerciseShell
      title="Ejercicio · construir"
      description={
        <>
          Coloca las{' '}
          <em className="not-italic font-bold" style={{ color: '#ff9933', textShadow: '0 0 10px #ff9933' }}>
            {ex.required.length} figuras
          </em>{' '}
          del palette dentro del compás. Cualquier orden vale mientras sumen el valor del indicador.
        </>
      }
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
        <Palette
          selected={paletteSel}
          onSelect={setPaletteSel}
          showFigureTools
          pool={pool}
        />
      }
    />
  );
}
