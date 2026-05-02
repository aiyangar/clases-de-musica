import type { ClefKind } from './types';

const CLEF_GLYPH: Record<ClefKind, string> = {
  sol: '\u{1D11E}',
  fa:  '\u{1D122}',
  do:  '\u{1D121}',
};

const CLEF_LABEL: Record<ClefKind, string> = {
  sol: 'Clave de Sol',
  fa: 'Clave de Fa',
  do: 'Clave de Do',
};

type Props = {
  clef: ClefKind;
  size?: number | string;
  color?: string;
  className?: string;
};

export default function ClefSymbol({
  clef,
  size = 80,
  color = 'currentColor',
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
        minWidth: '0.7em',
        minHeight: '1.2em',
      }}
      aria-label={CLEF_LABEL[clef]}
    >
      {CLEF_GLYPH[clef]}
    </span>
  );
}
