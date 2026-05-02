export type FigureKind =
  | 'redonda'
  | 'blanca'
  | 'negra'
  | 'corchea'
  | 'semicorchea'
  | 'fusa'
  | 'semifusa'
  | 'garrapatea';

const NOTE_GLYPH: Record<FigureKind, string> = {
  redonda: '\u{1D15D}',
  blanca: '\u{1D15E}',
  negra: '\u{1D15F}',
  corchea: '\u{1D160}',
  semicorchea: '\u{1D161}',
  fusa: '\u{1D162}',
  semifusa: '\u{1D163}',
  garrapatea: '\u{1D164}',
};

type Props = {
  kind: FigureKind;
  direction?: 'up' | 'down';
  color?: string;
  size?: number | string;
  className?: string;
};

export default function NoteSymbol({
  kind,
  direction = 'up',
  color = '#00ffff',
  size = 80,
  className,
}: Props) {
  const fontSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      className={`font-music inline-flex items-center justify-center select-none ${className ?? ''}`}
      style={{
        fontSize,
        lineHeight: 1,
        color,
        textShadow: `0 0 14px ${color}, 0 0 28px ${color}88`,
        transform: direction === 'down' ? 'rotate(180deg)' : undefined,
        minWidth: '0.7em',
        minHeight: '1.5em',
      }}
      aria-label={`Figura musical ${kind}${direction === 'down' ? ' con plica abajo' : ''}`}
    >
      {NOTE_GLYPH[kind]}
    </span>
  );
}
