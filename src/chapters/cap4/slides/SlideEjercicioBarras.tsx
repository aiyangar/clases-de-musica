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
      title="Ejercicio · barras"
      description={
        <>
          Coloca las{' '}
          <em className="text-orange not-italic font-bold" style={{ color: '#ff9933', textShadow: '0 0 10px #ff9933' }}>
            barras divisorias
          </em>{' '}
          en el lugar correcto según el indicador de compás.
        </>
      }
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
