import type { CSSProperties } from 'react';
import redondaSvg from '@/assets/music/sounds/redonda.svg';
import blancaUpSvg from '@/assets/music/sounds/blanca.svg';
import blancaDownSvg from '@/assets/music/sounds/blanca-down.svg';
import negraUpSvg from '@/assets/music/sounds/negra.svg';
import negraDownSvg from '@/assets/music/sounds/negra-down.svg';
import corcheaUpSvg from '@/assets/music/sounds/corchea.svg';
import corcheaDownSvg from '@/assets/music/sounds/corchea-down.svg';
import semicorcheaUpSvg from '@/assets/music/sounds/semicorchea.svg';
import semicorcheaDownSvg from '@/assets/music/sounds/semicorchea-down.svg';
import fusaUpSvg from '@/assets/music/sounds/fusa.svg';
import fusaDownSvg from '@/assets/music/sounds/fusa-down.svg';
import semifusaUpSvg from '@/assets/music/sounds/semifusa.svg';
import semifusaDownSvg from '@/assets/music/sounds/semifusa-down.svg';
import garrapateaUpSvg from '@/assets/music/sounds/garrapatea.svg';
import garrapateaDownSvg from '@/assets/music/sounds/garrapatea-down.svg';

export type FigureKind =
  | 'redonda'
  | 'blanca'
  | 'negra'
  | 'corchea'
  | 'semicorchea'
  | 'fusa'
  | 'semifusa'
  | 'garrapatea';

const NOTE_SVG: Record<FigureKind, { up: string; down: string }> = {
  redonda: { up: redondaSvg, down: redondaSvg },
  blanca: { up: blancaUpSvg, down: blancaDownSvg },
  negra: { up: negraUpSvg, down: negraDownSvg },
  corchea: { up: corcheaUpSvg, down: corcheaDownSvg },
  semicorchea: { up: semicorcheaUpSvg, down: semicorcheaDownSvg },
  fusa: { up: fusaUpSvg, down: fusaDownSvg },
  semifusa: { up: semifusaUpSvg, down: semifusaDownSvg },
  garrapatea: { up: garrapateaUpSvg, down: garrapateaDownSvg },
};

const NOTE_ASPECT = 0.6;

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
  const heightStr = typeof size === 'number' ? `${size}px` : size;
  const widthStr =
    typeof size === 'number'
      ? `${size * NOTE_ASPECT}px`
      : `calc(${size} * ${NOTE_ASPECT})`;
  const url = NOTE_SVG[kind][direction];

  const wrapperStyle: CSSProperties & {
    '--svg-url'?: string;
    '--svg-color'?: string;
  } = {
    width: widthStr,
    height: heightStr,
    '--svg-url': `url("${url}")`,
    '--svg-color': color,
  };

  const shapeStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'block',
    backgroundColor: color,
    filter: `drop-shadow(0 0 4px ${color}) drop-shadow(0 0 12px ${color})`,
  };

  return (
    <span
      role="img"
      aria-label={`Figura musical ${kind}${direction === 'down' ? ' con plica abajo' : ''}`}
      className={`music-svg-glow select-none ${className ?? ''}`}
      style={wrapperStyle}
    >
      <span className="music-svg-mask" style={shapeStyle} />
    </span>
  );
}
