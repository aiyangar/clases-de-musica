export type FigureKind =
  | 'redonda'
  | 'blanca'
  | 'negra'
  | 'corchea'
  | 'semicorchea'
  | 'fusa'
  | 'semifusa'
  | 'garrapatea';

const FLAGS: Record<FigureKind, number> = {
  redonda: 0,
  blanca: 0,
  negra: 0,
  corchea: 1,
  semicorchea: 2,
  fusa: 3,
  semifusa: 4,
  garrapatea: 5,
};
const HAS_STEM: Record<FigureKind, boolean> = {
  redonda: false,
  blanca: true,
  negra: true,
  corchea: true,
  semicorchea: true,
  fusa: true,
  semifusa: true,
  garrapatea: true,
};
const FILLED: Record<FigureKind, boolean> = {
  redonda: false,
  blanca: false,
  negra: true,
  corchea: true,
  semicorchea: true,
  fusa: true,
  semifusa: true,
  garrapatea: true,
};

type Props = {
  kind: FigureKind;
  direction?: 'up' | 'down';
  color?: string;
  size?: number;
  className?: string;
};

const VB_W = 80;
const VB_H = 240;
const HEAD_RX = 18;
const HEAD_RY = 13;
const HEAD_CX = 38;

export default function NoteSymbol({
  kind,
  direction = 'up',
  color = '#00ffff',
  size = 100,
  className,
}: Props) {
  const flags = FLAGS[kind];
  const hasStem = HAS_STEM[kind];
  const filled = FILLED[kind];
  const isUp = direction === 'up';

  const headCY = isUp ? 180 : 60;
  const stemX = isUp ? HEAD_CX + 16 : HEAD_CX - 16;
  const stemTop = isUp ? 30 : headCY;
  const stemBottom = isUp ? headCY : 210;

  const flagDir = isUp ? 1 : -1;
  const flagOriginY = isUp ? stemTop : stemBottom;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width={size}
      height={(size * VB_H) / VB_W}
      className={className}
      style={{ filter: `drop-shadow(0 0 14px ${color})`, color }}
      role="img"
      aria-label={`Figura musical ${kind}`}
    >
      <ellipse
        cx={HEAD_CX}
        cy={headCY}
        rx={HEAD_RX}
        ry={HEAD_RY}
        fill={filled ? color : 'transparent'}
        stroke={color}
        strokeWidth={3.5}
        transform={`rotate(-22 ${HEAD_CX} ${headCY})`}
      />

      {hasStem && (
        <line
          x1={stemX}
          y1={stemTop}
          x2={stemX}
          y2={stemBottom}
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
        />
      )}

      {Array.from({ length: flags }, (_, i) => {
        const y = flagOriginY + i * 14 * flagDir;
        return (
          <line
            key={i}
            x1={stemX}
            y1={y}
            x2={stemX + 22}
            y2={y + 16 * flagDir}
            stroke={color}
            strokeWidth={4.5}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
