import type { ReactNode } from 'react';

const ORANGE = '#ff9933';
const GREEN = '#22ff66';
const RED = '#ff3366';

type Status = 'editing' | 'correct' | 'incorrect';

type Props = {
  title: string;
  description: ReactNode;
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
  description,
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

  const headingText = `${title} · ${index + 1}/${total}`;

  return (
    <div className="flex-1 flex flex-col gap-4 justify-center">
      <h2 className="heading-2 self-start" data-text={headingText}>
        <span>{headingText}</span>
      </h2>

      <p className="font-rajdhani text-[56px] leading-snug text-clear/85 max-w-[1700px]">
        {description}
      </p>

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
