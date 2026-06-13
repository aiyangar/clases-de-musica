import { useMemo } from 'react';
import type { ClefKind, StaffNote, FigureKind } from './types';

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

type Props = {
  clef?: ClefKind;
  clefLine?: number;
  notes?: StaffNote[];
  showLineNumbers?: boolean;
  showSpaceNumbers?: boolean;
  highlightLines?: number[];
  highlightSpaces?: number[];
  width?: number | string;
  height?: number | string;
  className?: string;
  fitNotes?: boolean;
};

const STAFF_TOP = 110;
const STAFF_BOTTOM = 210;
const LINE_GAP = (STAFF_BOTTOM - STAFF_TOP) / 4;
const VB_WIDTH = 800;
const VB_HEIGHT = 320;
const STAFF_X_START = 60;
const STAFF_X_END = VB_WIDTH - 40;
const CLEF_WIDTH = 70;
const NOTE_AREA_X_START = 160;
const NOTE_AREA_X_END = STAFF_X_END - 30;
const LEDGER_HALF_WIDTH = 22;
const NOTEHEAD_HALF_HEIGHT = 26;
const MUSIC_FONT_STACK =
  '"Noto Music", "Apple Symbols", "Segoe UI Symbol", serif';

const NOTE_DISPLAY_HEIGHT = 95;
const NOTE_DISPLAY_WIDTH = NOTE_DISPLAY_HEIGHT * 0.6;
const NOTE_HEAD_X = NOTE_DISPLAY_WIDTH / 2;
const NOTE_HEAD_Y_UP = 0.85 * NOTE_DISPLAY_HEIGHT;
const NOTE_HEAD_Y_DOWN = 0.15 * NOTE_DISPLAY_HEIGHT;

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

const CLEF_GLYPHS: Record<ClefKind, string> = {
  sol: '\u{1D11E}',
  fa: '\u{1D122}',
  do: '\u{1D121}',
};

const CLEF_FONT_SIZE = 210;
const CLEF_X = STAFF_X_START + 8 + CLEF_WIDTH / 2;
const CLEF_BASELINE_Y: Record<ClefKind, number> = {
  sol: 220,
  fa: 230,
  do: 230,
};
const CLEF_DEFAULT_LINE: Record<ClefKind, number> = {
  sol: 2,
  fa: 4,
  do: 3,
};
const NOTE_LABEL_FONT_SIZE = 28;
const NOTE_LABEL_OFFSET_BELOW_STAFF = 38;

function stepToY(step: number): number {
  return STAFF_BOTTOM - step * (LINE_GAP / 2);
}

function noteX(idx: number, count: number): number {
  if (count === 1) return (NOTE_AREA_X_START + NOTE_AREA_X_END) / 2;
  return (
    NOTE_AREA_X_START +
    (idx * (NOTE_AREA_X_END - NOTE_AREA_X_START)) / (count - 1)
  );
}

function ledgerStepsFor(noteStep: number): number[] {
  const steps: number[] = [];
  if (noteStep > 8) {
    for (let s = 10; s <= noteStep; s += 2) steps.push(s);
  } else if (noteStep < 0) {
    for (let s = -2; s >= noteStep; s -= 2) steps.push(s);
  }
  return steps;
}

function shouldFlipFor(step: number, figure: FigureKind): boolean {
  return figure !== 'redonda' && step > 4;
}

function labelYFor(step: number): number {
  if (step > 8) return stepToY(step) - NOTEHEAD_HALF_HEIGHT - 14;
  if (step < 0) {
    return Math.max(
      stepToY(step) + NOTEHEAD_HALF_HEIGHT + 24,
      STAFF_BOTTOM + NOTE_LABEL_OFFSET_BELOW_STAFF,
    );
  }
  return STAFF_BOTTOM + NOTE_LABEL_OFFSET_BELOW_STAFF;
}

function colorFilterId(color: string): string {
  return `note-tint-${color.replace('#', '').toLowerCase()}`;
}

function noteExtent(step: number): { top: number; bottom: number } {
  const y = stepToY(step);
  const labelY = labelYFor(step);
  const top = Math.min(y - NOTEHEAD_HALF_HEIGHT, labelY - NOTE_LABEL_FONT_SIZE);
  const bottom = Math.max(y + NOTEHEAD_HALF_HEIGHT, labelY + NOTE_LABEL_FONT_SIZE * 0.35);
  return { top, bottom };
}

export function fitViewBox(steps: number[]): { y: number; height: number } {
  const PAD = 16;
  let top = 0;
  let bottom = VB_HEIGHT;
  for (const s of steps) {
    const e = noteExtent(s);
    top = Math.min(top, e.top);
    bottom = Math.max(bottom, e.bottom);
  }
  if (top < 0) top -= PAD;
  if (bottom > VB_HEIGHT) bottom += PAD;
  return { y: top, height: bottom - top };
}

export default function Pentagrama({
  clef,
  clefLine,
  notes = [],
  showLineNumbers = false,
  showSpaceNumbers = false,
  highlightLines = [],
  highlightSpaces = [],
  width = '100%',
  height,
  className,
  fitNotes = false,
}: Props) {
  const staffLines = [1, 2, 3, 4, 5].map((n) => ({
    n,
    y: STAFF_BOTTOM - (n - 1) * LINE_GAP,
  }));

  const staffSpaces = [1, 2, 3, 4].map((n) => ({
    n,
    y: STAFF_BOTTOM - (n - 1) * LINE_GAP - LINE_GAP / 2,
  }));

  const vb = fitNotes
    ? fitViewBox(notes.map((n) => n.step))
    : { y: 0, height: VB_HEIGHT };

  const resolvedHeight =
    height ?? (typeof width === 'number' ? (width * vb.height) / VB_WIDTH : undefined);

  const uniqueNoteColors = useMemo(() => {
    const set = new Set<string>();
    for (const note of notes) {
      const c = note.color ?? (note.highlight ? '#ffff00' : '#00ffff');
      set.add(c);
    }
    return Array.from(set);
  }, [notes]);

  return (
    <svg
      className={className}
      style={{ width, ...(resolvedHeight !== undefined ? { height: resolvedHeight } : {}) }}
      viewBox={`0 ${vb.y} ${VB_WIDTH} ${vb.height}`}
      role="img"
      aria-label="Pentagrama"
    >
      <defs>
        {uniqueNoteColors.map((c) => (
          <filter
            key={c}
            id={colorFilterId(c)}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feFlood floodColor={c} result="flood" />
            <feComposite in="flood" in2="SourceGraphic" operator="in" result="tinted" />
            <feGaussianBlur in="tinted" stdDeviation="2.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="tinted" />
            </feMerge>
          </filter>
        ))}
      </defs>

      {staffSpaces
        .filter((s) => highlightSpaces.includes(s.n))
        .map((s) => (
          <rect
            key={`hs-${s.n}`}
            x={STAFF_X_START}
            y={s.y - LINE_GAP / 2}
            width={STAFF_X_END - STAFF_X_START}
            height={LINE_GAP}
            fill="rgba(255, 255, 0, 0.18)"
          />
        ))}

      {staffLines.map(({ n, y }) => (
        <line
          key={`l-${n}`}
          x1={STAFF_X_START}
          y1={y}
          x2={STAFF_X_END}
          y2={y}
          stroke={highlightLines.includes(n) ? '#ffff00' : 'currentColor'}
          strokeWidth={highlightLines.includes(n) ? 4 : 2.5}
          style={
            highlightLines.includes(n)
              ? { filter: 'drop-shadow(0 0 6px #ffff00)' }
              : undefined
          }
        />
      ))}

      {notes.flatMap((note, idx) => {
        const x = noteX(idx, notes.length);
        return ledgerStepsFor(note.step).map((s) => (
          <line
            key={`ledger-${idx}-${s}`}
            x1={x - LEDGER_HALF_WIDTH}
            y1={stepToY(s)}
            x2={x + LEDGER_HALF_WIDTH}
            y2={stepToY(s)}
            stroke="currentColor"
            strokeWidth={2}
            opacity={0.7}
          />
        ));
      })}

      {showLineNumbers &&
        staffLines.map(({ n, y }) => (
          <text
            key={`ln-${n}`}
            x={42}
            y={y}
            fontSize="28"
            fontFamily="Orbitron, sans-serif"
            fontWeight={800}
            fill="#00ffff"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {n}
          </text>
        ))}

      {showSpaceNumbers &&
        staffSpaces.map((s) => (
          <text
            key={`sn-${s.n}`}
            x={42}
            y={s.y}
            fontSize="26"
            fontFamily="Orbitron, sans-serif"
            fontWeight={700}
            fill="#ff00ff"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {s.n}
          </text>
        ))}

      {clef && (
        <text
          x={CLEF_X}
          y={
            CLEF_BASELINE_Y[clef] -
            ((clefLine ?? CLEF_DEFAULT_LINE[clef]) - CLEF_DEFAULT_LINE[clef]) *
              LINE_GAP
          }
          fontSize={CLEF_FONT_SIZE}
          fontFamily={MUSIC_FONT_STACK}
          fill="currentColor"
          textAnchor="middle"
          style={{ filter: 'drop-shadow(0 0 12px currentColor)' }}
        >
          {CLEF_GLYPHS[clef]}
        </text>
      )}

      {notes.map((note, idx) => {
        const y = stepToY(note.step);
        const x = noteX(idx, notes.length);

        const figure: FigureKind = note.figure ?? 'negra';
        const noteColor =
          note.color ?? (note.highlight ? '#ffff00' : '#00ffff');
        const direction: 'up' | 'down' = shouldFlipFor(note.step, figure)
          ? 'down'
          : 'up';
        const headY = direction === 'up' ? NOTE_HEAD_Y_UP : NOTE_HEAD_Y_DOWN;
        const url = NOTE_SVG[figure][direction];

        return (
          <g key={`note-${idx}`}>
            <image
              href={url}
              x={x - NOTE_HEAD_X}
              y={y - headY}
              width={NOTE_DISPLAY_WIDTH}
              height={NOTE_DISPLAY_HEIGHT}
              filter={`url(#${colorFilterId(noteColor)})`}
            />
            {note.label && (
              <text
                x={x}
                y={labelYFor(note.step)}
                fontSize={NOTE_LABEL_FONT_SIZE}
                fontFamily="Orbitron, sans-serif"
                fontWeight={800}
                fill={noteColor}
                textAnchor="middle"
                style={{ filter: `drop-shadow(0 0 6px ${noteColor})` }}
              >
                {note.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
