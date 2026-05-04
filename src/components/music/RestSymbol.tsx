import type { CSSProperties } from 'react';
import type { FigureKind } from './NoteSymbol';

import redondaSvg from '@/assets/music/rests/rest-redonda.svg';
import blancaSvg from '@/assets/music/rests/rest-blanca.svg';
import negraSvg from '@/assets/music/rests/rest-negra.svg';
import corcheaSvg from '@/assets/music/rests/rest-corchea.svg';
import semicorcheaSvg from '@/assets/music/rests/rest-semicorchea.svg';
import fusaSvg from '@/assets/music/rests/rest-fusa.svg';
import semifusaSvg from '@/assets/music/rests/rest-semifusa.svg';
import garrapateaSvg from '@/assets/music/rests/rest-garrapatea.svg';

const REST_SVG: Record<FigureKind, string> = {
  redonda: redondaSvg,
  blanca: blancaSvg,
  negra: negraSvg,
  corchea: corcheaSvg,
  semicorchea: semicorcheaSvg,
  fusa: fusaSvg,
  semifusa: semifusaSvg,
  garrapatea: garrapateaSvg,
};

const REST_ASPECT: Record<FigureKind, number> = {
  redonda: 0.6,
  blanca: 0.6,
  negra: 0.377,
  corchea: 0.55,
  semicorchea: 0.506,
  fusa: 0.517,
  semifusa: 0.504,
  garrapatea: 0.495,
};

type Props = {
  kind: FigureKind;
  color?: string;
  size?: number | string;
  className?: string;
};

export default function RestSymbol({
  kind,
  color = '#ff00ff',
  size = 80,
  className,
}: Props) {
  const heightStr = typeof size === 'number' ? `${size}px` : size;
  const aspect = REST_ASPECT[kind];
  const widthStr =
    typeof size === 'number'
      ? `${size * aspect}px`
      : `calc(${size} * ${aspect})`;
  const url = REST_SVG[kind];

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
      aria-label={`Silencio de ${kind}`}
      className={`music-svg-glow select-none ${className ?? ''}`}
      style={wrapperStyle}
    >
      <span className="music-svg-mask" style={shapeStyle} />
    </span>
  );
}
