import type { BarLineVariant } from './types';

type Props = {
  variant: BarLineVariant;
  height?: number | string;
  color?: string;
  className?: string;
};

const VARIANT_LABEL: Record<BarLineVariant, string> = {
  single: 'Línea divisoria simple',
  double: 'Doble barra',
  final: 'Barra final',
  repeat: 'Barra de repetición',
};

export default function BarLine({
  variant,
  height = '4em',
  color = 'currentColor',
  className,
}: Props) {
  const h = typeof height === 'number' ? `${height}px` : height;
  const VB_H = 100;
  const VB_W = 60;

  return (
    <svg
      className={className}
      style={{ height: h, width: 'auto', color, filter: `drop-shadow(0 0 6px ${color}88)` }}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      role="img"
      aria-label={VARIANT_LABEL[variant]}
    >
      {variant === 'single' && (
        <line x1="30" y1="0" x2="30" y2={VB_H} stroke="currentColor" strokeWidth="3" />
      )}
      {variant === 'double' && (
        <>
          <line x1="22" y1="0" x2="22" y2={VB_H} stroke="currentColor" strokeWidth="3" />
          <line x1="38" y1="0" x2="38" y2={VB_H} stroke="currentColor" strokeWidth="3" />
        </>
      )}
      {variant === 'final' && (
        <>
          <line x1="22" y1="0" x2="22" y2={VB_H} stroke="currentColor" strokeWidth="3" />
          <rect x="34" y="0" width="9" height={VB_H} fill="currentColor" />
        </>
      )}
      {variant === 'repeat' && (
        <>
          <rect x="14" y="0" width="9" height={VB_H} fill="currentColor" />
          <line x1="30" y1="0" x2="30" y2={VB_H} stroke="currentColor" strokeWidth="3" />
          <circle cx="46" cy="38" r="4.5" fill="currentColor" />
          <circle cx="46" cy="62" r="4.5" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
