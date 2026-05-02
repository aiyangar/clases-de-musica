import { useMemo, useState } from 'react';

type Direction = 'up' | 'down';

type Question = {
  id: string;
  staffPosition: number;
  correct: Direction;
  hint: string;
};

const QUESTIONS: Question[] = [
  { id: 'q1', staffPosition: 1, correct: 'down', hint: 'Por encima de la 3ª línea' },
  { id: 'q2', staffPosition: 9, correct: 'up', hint: 'Por debajo de la 3ª línea' },
  { id: 'q3', staffPosition: 3, correct: 'down', hint: 'Sobre la 4ª línea' },
  { id: 'q4', staffPosition: 7, correct: 'up', hint: 'Sobre la 2ª línea' },
  { id: 'q5', staffPosition: 0, correct: 'down', hint: 'Encima de la 5ª línea' },
  { id: 'q6', staffPosition: 10, correct: 'up', hint: 'Bajo la 1ª línea' },
];

const STAFF_TOP_Y = 20;
const STAFF_GAP = 14;
const STAFF_LEFT = 16;
const STAFF_RIGHT = 144;
const NOTE_X = 80;
const VIEW_W = 160;
const VIEW_H = 200;

function staffPositionToY(pos: number) {
  return STAFF_TOP_Y + pos * STAFF_GAP;
}

export default function PlicaQuiz() {
  const [answers, setAnswers] = useState<Record<string, Direction>>({});

  const score = useMemo(
    () =>
      QUESTIONS.reduce(
        (n, q) => (answers[q.id] === q.correct ? n + 1 : n),
        0,
      ),
    [answers],
  );
  const answered = Object.keys(answers).length;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full">
        {QUESTIONS.map((q, i) => {
          const userAnswer = answers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = userAnswer === q.correct;

          return (
            <div
              key={q.id}
              className="rounded-2xl p-4 border-2 backdrop-blur-md transition-colors"
              style={{
                background: 'rgba(15, 0, 35, 0.55)',
                borderColor: !isAnswered
                  ? 'rgba(0, 255, 255, 0.4)'
                  : isCorrect
                    ? 'rgba(34, 255, 102, 0.85)'
                    : 'rgba(255, 51, 102, 0.85)',
                boxShadow: !isAnswered
                  ? '0 0 14px rgba(0, 255, 255, 0.25)'
                  : isCorrect
                    ? '0 0 24px rgba(34, 255, 102, 0.6)'
                    : '0 0 24px rgba(255, 51, 102, 0.6)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-orbitron text-base tracking-[0.25em] text-cyan/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {isAnswered && (
                  <span
                    className="font-orbitron text-sm tracking-[0.2em]"
                    style={{ color: isCorrect ? '#22ff66' : '#ff3366' }}
                  >
                    {isCorrect ? '✓ CORRECTO' : '✗ INCORRECTO'}
                  </span>
                )}
              </div>

              <StaffWithNote
                position={q.staffPosition}
                showStem={isAnswered ? userAnswer : null}
                correctStem={isAnswered ? q.correct : null}
              />

              <div className="grid grid-cols-2 gap-2 mt-3">
                <DirectionButton
                  label="↑ Arriba"
                  selected={userAnswer === 'up'}
                  correct={q.correct === 'up'}
                  isAnswered={isAnswered}
                  onClick={() =>
                    !isAnswered &&
                    setAnswers((a) => ({ ...a, [q.id]: 'up' }))
                  }
                />
                <DirectionButton
                  label="↓ Abajo"
                  selected={userAnswer === 'down'}
                  correct={q.correct === 'down'}
                  isAnswered={isAnswered}
                  onClick={() =>
                    !isAnswered &&
                    setAnswers((a) => ({ ...a, [q.id]: 'down' }))
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="font-orbitron text-2xl tracking-[0.25em] text-clear/85">
          Score:{' '}
          <span className="text-cyan text-glow-cyan">
            {score}/{QUESTIONS.length}
          </span>
          {answered === QUESTIONS.length && (
            <span className="ml-4 text-electric text-glow-electric">
              {score === QUESTIONS.length ? '◈ DOMINIO TOTAL' : '◈ SIGUE PRACTICANDO'}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setAnswers({})}
          className="font-orbitron text-base tracking-[0.25em] uppercase px-5 py-2 rounded-full border-2 border-magenta text-magenta bg-base/60 hover:border-cyan hover:text-cyan transition-colors"
          style={{ textShadow: '0 0 10px currentColor' }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

type StaffProps = {
  position: number;
  showStem: Direction | null;
  correctStem: Direction | null;
};

function StaffWithNote({ position, showStem, correctStem }: StaffProps) {
  const headY = staffPositionToY(position);
  const isCorrect = showStem !== null && correctStem !== null && showStem === correctStem;

  const stemColor = !showStem
    ? null
    : isCorrect
      ? '#22ff66'
      : '#ff3366';

  const isUp = showStem === 'up';
  const stemX = isUp ? NOTE_X + 14 : NOTE_X - 14;
  const stemEndY = isUp ? Math.max(headY - 60, 5) : Math.min(headY + 60, VIEW_H - 5);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="w-full block"
      role="img"
      aria-label="Pentagrama con una nota"
    >
      {[0, 1, 2, 3, 4].map((idx) => {
        const y = staffPositionToY(1 + idx * 2);
        return (
          <line
            key={idx}
            x1={STAFF_LEFT}
            x2={STAFF_RIGHT}
            y1={y}
            y2={y}
            stroke="#00ffff"
            strokeOpacity="0.45"
            strokeWidth={1.4}
          />
        );
      })}

      {position < 1 &&
        [-1].map((p) => {
          const y = staffPositionToY(p);
          return (
            <line
              key={p}
              x1={NOTE_X - 16}
              x2={NOTE_X + 16}
              y1={y}
              y2={y}
              stroke="#00ffff"
              strokeOpacity="0.4"
              strokeWidth={1.4}
            />
          );
        })}
      {position > 9 &&
        [11].map((p) => {
          const y = staffPositionToY(p);
          return (
            <line
              key={p}
              x1={NOTE_X - 16}
              x2={NOTE_X + 16}
              y1={y}
              y2={y}
              stroke="#00ffff"
              strokeOpacity="0.4"
              strokeWidth={1.4}
            />
          );
        })}

      <ellipse
        cx={NOTE_X}
        cy={headY}
        rx={11}
        ry={8}
        fill="#e0f7ff"
        transform={`rotate(-22 ${NOTE_X} ${headY})`}
        style={{ filter: 'drop-shadow(0 0 8px #e0f7ff)' }}
      />

      {stemColor && (
        <line
          x1={stemX}
          y1={headY}
          x2={stemX}
          y2={stemEndY}
          stroke={stemColor}
          strokeWidth={3}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${stemColor})` }}
        />
      )}
    </svg>
  );
}

type ButtonProps = {
  label: string;
  selected: boolean;
  correct: boolean;
  isAnswered: boolean;
  onClick: () => void;
};

function DirectionButton({
  label,
  selected,
  correct,
  isAnswered,
  onClick,
}: ButtonProps) {
  let borderColor = 'rgba(255, 0, 255, 0.55)';
  let textColor = '#ff00ff';
  let glow = '0 0 12px rgba(255, 0, 255, 0.4)';

  if (isAnswered) {
    if (selected && correct) {
      borderColor = '#22ff66';
      textColor = '#22ff66';
      glow = '0 0 18px rgba(34, 255, 102, 0.7)';
    } else if (selected && !correct) {
      borderColor = '#ff3366';
      textColor = '#ff3366';
      glow = '0 0 18px rgba(255, 51, 102, 0.7)';
    } else if (!selected && correct) {
      borderColor = 'rgba(34, 255, 102, 0.7)';
      textColor = 'rgba(34, 255, 102, 0.85)';
      glow = '0 0 14px rgba(34, 255, 102, 0.4)';
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
      className="font-orbitron text-sm tracking-[0.2em] uppercase px-3 py-2 rounded-lg border-2 transition-all disabled:cursor-not-allowed"
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
