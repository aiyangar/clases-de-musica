import type { FigureKind } from './NoteSymbol';

type Props = {
  kind: FigureKind;
  color?: string;
  size?: number;
  className?: string;
};

const VB_W = 80;
const VB_H = 120;

export default function RestSymbol({
  kind,
  color = '#ff00ff',
  size = 80,
  className,
}: Props) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width={size}
      height={(size * VB_H) / VB_W}
      className={className}
      style={{ filter: `drop-shadow(0 0 14px ${color})`, color }}
      role="img"
      aria-label={`Silencio de ${kind}`}
    >
      {renderShape(kind, color)}
    </svg>
  );
}

function renderShape(kind: FigureKind, color: string) {
  switch (kind) {
    case 'redonda':
      return <RedondaRest color={color} />;
    case 'blanca':
      return <BlancaRest color={color} />;
    case 'negra':
      return <NegraRest color={color} />;
    case 'corchea':
      return <FlaggedRest flags={1} color={color} />;
    case 'semicorchea':
      return <FlaggedRest flags={2} color={color} />;
    case 'fusa':
      return <FlaggedRest flags={3} color={color} />;
    case 'semifusa':
      return <FlaggedRest flags={4} color={color} />;
    case 'garrapatea':
      return <FlaggedRest flags={5} color={color} />;
  }
}

function RedondaRest({ color }: { color: string }) {
  return (
    <g>
      <line
        x1={10}
        y1={50}
        x2={70}
        y2={50}
        stroke={color}
        strokeOpacity={0.45}
        strokeWidth={1.6}
      />
      <rect x={22} y={36} width={36} height={14} fill={color} rx={1.5} />
    </g>
  );
}

function BlancaRest({ color }: { color: string }) {
  return (
    <g>
      <line
        x1={10}
        y1={70}
        x2={70}
        y2={70}
        stroke={color}
        strokeOpacity={0.45}
        strokeWidth={1.6}
      />
      <rect x={22} y={70} width={36} height={14} fill={color} rx={1.5} />
    </g>
  );
}

function NegraRest({ color }: { color: string }) {
  return (
    <g>
      <path
        d="M 22 18 Q 56 26, 30 38 Q 14 50, 44 58 Q 60 68, 26 80"
        stroke={color}
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 30 80 Q 22 92, 50 102"
        stroke={color}
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

type FlaggedProps = {
  flags: number;
  color: string;
};

function FlaggedRest({ flags, color }: FlaggedProps) {
  const startX = 60;
  const startY = 14;
  const endX = 22;
  const endY = 104;
  const dx = endX - startX;
  const dy = endY - startY;

  const flagPositions = Array.from({ length: flags }, (_, i) => {
    if (flags === 1) return 0;
    return (i / (flags - 1)) * 0.6;
  });

  return (
    <g>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      {flagPositions.map((t, i) => {
        const cx = startX + dx * t;
        const cy = startY + dy * t;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={5.5} fill={color} />
            <path
              d={`M ${cx} ${cy} Q ${cx - 14} ${cy + 6}, ${cx - 22} ${cy + 16}`}
              stroke={color}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </g>
  );
}
