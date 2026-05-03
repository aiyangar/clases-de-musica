import type { ClefKind, StaffNote, FigureKind } from './types';
import NoteSymbol from './NoteSymbol';
import ClefSymbol from './ClefSymbol';

type Props = {
  clef?: ClefKind;
  notes?: StaffNote[];
  ledgerLinesAbove?: number;
  ledgerLinesBelow?: number;
  showLineNumbers?: boolean;
  showSpaceNumbers?: boolean;
  highlightLines?: number[];
  highlightSpaces?: number[];
  width?: number | string;
  height?: number | string;
  className?: string;
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

/**
 * Convert staff step → y coordinate.
 * step 0 = bottom line (y = STAFF_BOTTOM); each step up subtracts LINE_GAP / 2.
 */
function stepToY(step: number): number {
  return STAFF_BOTTOM - step * (LINE_GAP / 2);
}

export default function Pentagrama({
  clef,
  notes = [],
  ledgerLinesAbove = 0,
  ledgerLinesBelow = 0,
  showLineNumbers = false,
  showSpaceNumbers = false,
  highlightLines = [],
  highlightSpaces = [],
  width = '100%',
  height,
  className,
}: Props) {
  const staffLines = [1, 2, 3, 4, 5].map((n) => ({
    n,
    y: STAFF_BOTTOM - (n - 1) * LINE_GAP,
  }));

  const staffSpaces = [1, 2, 3, 4].map((n) => ({
    n,
    y: STAFF_BOTTOM - (n - 1) * LINE_GAP - LINE_GAP / 2,
  }));

  const resolvedHeight =
    height ?? (typeof width === 'number' ? (width * VB_HEIGHT) / VB_WIDTH : undefined);

  return (
    <svg
      className={className}
      style={{ width, ...(resolvedHeight !== undefined ? { height: resolvedHeight } : {}) }}
      viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
      role="img"
      aria-label="Pentagrama"
    >
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

      {Array.from({ length: ledgerLinesAbove }).map((_, i) => (
        <line
          key={`la-${i}`}
          x1={STAFF_X_START + 80}
          y1={STAFF_TOP - (i + 1) * LINE_GAP}
          x2={STAFF_X_END - 80}
          y2={STAFF_TOP - (i + 1) * LINE_GAP}
          stroke="currentColor"
          strokeWidth={2}
          opacity={0.7}
        />
      ))}

      {Array.from({ length: ledgerLinesBelow }).map((_, i) => (
        <line
          key={`lb-${i}`}
          x1={STAFF_X_START + 80}
          y1={STAFF_BOTTOM + (i + 1) * LINE_GAP}
          x2={STAFF_X_END - 80}
          y2={STAFF_BOTTOM + (i + 1) * LINE_GAP}
          stroke="currentColor"
          strokeWidth={2}
          opacity={0.7}
        />
      ))}

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
        <foreignObject
          x={STAFF_X_START + 8}
          y={STAFF_TOP - 30}
          width={CLEF_WIDTH}
          height={STAFF_BOTTOM - STAFF_TOP + 60}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'currentColor',
            }}
          >
            <ClefSymbol clef={clef} size={120} color="currentColor" />
          </div>
        </foreignObject>
      )}

      {notes.map((note, idx) => {
        const y = stepToY(note.step);
        const x =
          notes.length === 1
            ? (NOTE_AREA_X_START + NOTE_AREA_X_END) / 2
            : NOTE_AREA_X_START +
              (idx * (NOTE_AREA_X_END - NOTE_AREA_X_START)) / (notes.length - 1);

        const figure: FigureKind = note.figure ?? 'negra';
        const noteColor =
          note.color ?? (note.highlight ? '#ffff00' : '#00ffff');

        return (
          <g key={`note-${idx}`}>
            <foreignObject x={x - 30} y={y - 50} width={60} height={80}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                <NoteSymbol kind={figure} color={noteColor} size={64} />
              </div>
            </foreignObject>
            {note.label && (
              <text
                x={x}
                y={STAFF_BOTTOM + 50}
                fontSize="22"
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
