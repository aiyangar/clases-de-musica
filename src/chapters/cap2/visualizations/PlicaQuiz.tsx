import { useMemo, useState } from 'react';

export type Direction = 'up' | 'down';

export type Question = {
  id: string;
  staffPosition: number;
  correct: Direction;
};

export const ALL_PLICA_QUESTIONS: Question[] = [
  { id: 'q1', staffPosition: 1, correct: 'down' },
  { id: 'q2', staffPosition: 9, correct: 'up' },
  { id: 'q3', staffPosition: 3, correct: 'down' },
  { id: 'q4', staffPosition: 7, correct: 'up' },
  { id: 'q5', staffPosition: 0, correct: 'down' },
  { id: 'q6', staffPosition: 10, correct: 'up' },
];

const STAFF_TOP_Y = 16;
const STAFF_GAP = 10;
const STAFF_LEFT = 24;
const STAFF_RIGHT = 196;
const NOTE_X = 110;
const VIEW_W = 220;
const VIEW_H = 130;
const STEM_LEN = 38;
const SVG_HEIGHT_PX = 116;

function staffPositionToY(pos: number) {
  return STAFF_TOP_Y + pos * STAFF_GAP;
}

type Props = {
  questions: Question[];
  startNumber?: number;
};

export default function PlicaQuiz({ questions, startNumber = 1 }: Props) {
  const [answers, setAnswers] = useState<Record<string, Direction>>({});

  const score = useMemo(
    () =>
      questions.reduce(
        (n, q) => (answers[q.id] === q.correct ? n + 1 : n),
        0,
      ),
    [answers, questions],
  );
  const answered = Object.keys(answers).length;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {questions.map((q, i) => {
          const userAnswer = answers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = userAnswer === q.correct;

          return (
            <div
              key={q.id}
              className="rounded-2xl p-5 border-2 backdrop-blur-md transition-colors"
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
                <span className="font-orbitron text-lg tracking-[0.25em] text-cyan/85">
                  {String(startNumber + i).padStart(2, '0')}
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

              <div className="grid grid-cols-2 gap-3 mt-3">
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
            {score}/{questions.length}
          </span>
          {answered === questions.length && (
            <span className="ml-4 text-electric text-glow-electric">
              {score === questions.length
                ? '◈ DOMINIO TOTAL'
                : '◈ SIGUE PRACTICANDO'}
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
  const isCorrect =
    showStem !== null && correctStem !== null && showStem === correctStem;

  const stemColor = !showStem ? null : isCorrect ? '#22ff66' : '#ff3366';
  const isUp = showStem === 'up';
  const stemX = isUp ? NOTE_X + 12 : NOTE_X - 12;
  const stemEndY = isUp
    ? Math.max(headY - STEM_LEN, 4)
    : Math.min(headY + STEM_LEN, VIEW_H - 4);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="block mx-auto"
      style={{ height: SVG_HEIGHT_PX, width: 'auto' }}
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

      {position < 1 && (
        <line
          x1={NOTE_X - 16}
          x2={NOTE_X + 16}
          y1={staffPositionToY(-1)}
          y2={staffPositionToY(-1)}
          stroke="#00ffff"
          strokeOpacity="0.4"
          strokeWidth={1.4}
        />
      )}
      {position > 9 && (
        <line
          x1={NOTE_X - 16}
          x2={NOTE_X + 16}
          y1={staffPositionToY(11)}
          y2={staffPositionToY(11)}
          stroke="#00ffff"
          strokeOpacity="0.4"
          strokeWidth={1.4}
        />
      )}

      <ellipse
        cx={NOTE_X}
        cy={headY}
        rx={10}
        ry={7.5}
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
      className="font-orbitron text-base tracking-[0.2em] uppercase px-3 py-2 rounded-lg border-2 transition-all disabled:cursor-not-allowed"
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
