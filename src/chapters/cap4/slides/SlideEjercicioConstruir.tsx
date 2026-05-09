import { useMemo, useState } from 'react';
import ExerciseShell from '../exercises/ExerciseShell';
import Palette, { type PaletteSelection } from '../exercises/Palette';
import BuildBoard from '../exercises/boards/BuildBoard';
import { BUILD_EXERCISES } from '../data/build';
import { validateBuild } from '../exercises/validators';
import type { FigureItem } from '../types';

type Status = 'editing' | 'correct' | 'incorrect';
type Props = { part: 1 | 2 };

type PlacedEntry = { item: FigureItem; poolIndex: number };

export default function SlideEjercicioConstruir({ part }: Props) {
  const sliceStart = part === 1 ? 0 : 5;
  const sliceEnd = part === 1 ? 5 : 10;
  const exercises = BUILD_EXERCISES.slice(sliceStart, sliceEnd);

  const [localIndex, setLocalIndex] = useState(0);
  const [status, setStatus] = useState<Status>('editing');
  const [selectedPoolIndex, setSelectedPoolIndex] = useState<number | null>(null);
  const [placed, setPlaced] = useState<(PlacedEntry | null)[]>(
    () => Array(exercises[0].required.length).fill(null),
  );

  const ex = exercises[localIndex];

  const pool: FigureItem[] = useMemo(() => {
    return [...ex.required, ...(ex.distractors ?? [])];
  }, [ex]);

  const usedIndices = useMemo(() => {
    const s = new Set<number>();
    for (const p of placed) if (p) s.add(p.poolIndex);
    return s;
  }, [placed]);

  function placeAt(slotIdx: number) {
    if (status !== 'editing' || selectedPoolIndex === null) return;
    if (usedIndices.has(selectedPoolIndex)) return;
    const item = pool[selectedPoolIndex];
    if (!item) return;
    setPlaced((prev) => {
      const next = [...prev];
      next[slotIdx] = { item, poolIndex: selectedPoolIndex };
      return next;
    });
    setSelectedPoolIndex(null);
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
    const filled = placed
      .filter((p): p is PlacedEntry => p !== null)
      .map((p) => p.item);
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
      setSelectedPoolIndex(null);
      setStatus('editing');
    }
  }

  // Backwards-compatible Palette selection used by BuildBoard for highlight only.
  const paletteSel: PaletteSelection | null = useMemo(() => {
    if (selectedPoolIndex === null) return null;
    const item = pool[selectedPoolIndex];
    if (!item) return null;
    return item.kind === 'figure'
      ? { kind: 'figure', figure: item.figure }
      : { kind: 'rest', rest: item.rest };
  }, [pool, selectedPoolIndex]);

  return (
    <ExerciseShell
      title="Ejercicio · construir"
      description={
        <>
          Coloca{' '}
          <em className="not-italic font-bold" style={{ color: '#ff9933', textShadow: '0 0 10px #ff9933' }}>
            {ex.required.length} figuras
          </em>{' '}
          dentro del compás. Hay figuras de sobra: usa solo las que sumen el valor del indicador.
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
          placed={placed.map((p) => p?.item ?? null)}
          selectedPaletteItem={paletteSel}
          onPlaceAt={placeAt}
          onClearAt={clearAt}
        />
      }
      palette={
        <Palette
          selected={paletteSel}
          onSelect={() => {}}
          showFigureTools
          flatPool={{
            items: pool,
            usedIndices,
            selectedIndex: selectedPoolIndex,
            onSelectIndex: setSelectedPoolIndex,
          }}
        />
      }
    />
  );
}
