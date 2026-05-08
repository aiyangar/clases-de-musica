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
