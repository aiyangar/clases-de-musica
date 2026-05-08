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
      title={`Completar · ${part}/2`}
      description={
        <>
          Llena los{' '}
          <em className="not-italic font-bold" style={{ color: '#ff9933', textShadow: '0 0 10px #ff9933' }}>
            espacios vacíos
          </em>{' '}
          con la figura o silencio que completa el valor de cada compás.
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
