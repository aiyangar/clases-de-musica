import type { FigureKind } from './NoteSymbol';

const REST_GLYPH: Record<FigureKind, string> = {
  redonda: '\u{1D13B}',
  blanca: '\u{1D13C}',
  negra: '\u{1D13D}',
  corchea: '\u{1D13E}',
  semicorchea: '\u{1D13F}',
  fusa: '\u{1D140}',
  semifusa: '\u{1D141}',
  garrapatea: '\u{1D142}',
};

type Props = {
  kind: FigureKind;
  color?: string;
  size?: number;
};

export default function RestSymbol({ kind, color = '#ff00ff', size = 80 }: Props) {
  return (
    <span
      className="font-music inline-flex items-center justify-center select-none"
      style={{
        fontSize: `${size}px`,
        lineHeight: 1,
        color,
        textShadow: `0 0 14px ${color}, 0 0 28px ${color}88`,
        minHeight: `${size * 1.4}px`,
      }}
      aria-label={`Silencio de ${kind}`}
    >
      {REST_GLYPH[kind]}
    </span>
  );
}
