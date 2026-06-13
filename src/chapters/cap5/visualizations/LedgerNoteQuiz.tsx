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
