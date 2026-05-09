import type {
  CompleteExercise,
  FigureItem,
  CompleteSlot,
} from '@/chapters/cap4/types';
import TimeSignature from '@/components/music/TimeSignature';
import NoteSymbol from '@/components/music/NoteSymbol';
import RestSymbol from '@/components/music/RestSymbol';
import type { PaletteSelection } from '../Palette';
import { placedNoteY } from './placement';

const ORANGE = '#ff9933';
const STAFF_HEIGHT = 160;
const SLOT_WIDTH = 56;
const MEASURE_PAD = 10;
const TIME_SIG_W = 90;
const NOTE_SIZE = 56;
const ITEM_CONTAINER_H = STAFF_HEIGHT - 10;

type Props = {
  exercise: CompleteExercise;
  filled: Map<string, FigureItem>;
  selectedPaletteItem: PaletteSelection | null;
  onFillBlank: (key: string) => void;
  onClearBlank: (key: string) => void;
};

export default function CompleteBoard({
  exercise,
  filled,
  selectedPaletteItem,
  onFillBlank,
  onClearBlank,
}: Props) {
  const measureWidths = exercise.measures.map(
    (m) => m.slots.length * SLOT_WIDTH + MEASURE_PAD * 2,
  );
  const totalStaffWidth = measureWidths.reduce((a, b) => a + b, 0);
  const totalWidth = TIME_SIG_W + totalStaffWidth + 30;
  const lineY = (i: number) => 30 + i * 22;
  const itemY = placedNoteY(lineY, ITEM_CONTAINER_H, NOTE_SIZE);

  function handleBlankClick(measureIdx: number, slotIdx: number) {
    const key = `${measureIdx}:${slotIdx}`;
    if (filled.has(key)) {
      onClearBlank(key);
      return;
    }
    if (
      selectedPaletteItem &&
      (selectedPaletteItem.kind === 'figure' || selectedPaletteItem.kind === 'rest')
    ) {
      onFillBlank(key);
    }
  }

  const measureStarts = exercise.measures.map((_, idx) => {
    let acc = TIME_SIG_W;
    for (let i = 0; i < idx; i++) acc += measureWidths[i];
    return acc;
  });

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${STAFF_HEIGHT}`}
        style={{ width: '100%', height: STAFF_HEIGHT }}
        role="img"
        aria-label={`Completar compases en ${exercise.timeSig}`}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={TIME_SIG_W}
            x2={totalWidth - 20}
            y1={lineY(i)}
            y2={lineY(i)}
            stroke={ORANGE}
            strokeOpacity={0.6}
            strokeWidth={2}
          />
        ))}

        <foreignObject x={20} y={5} width={80} height={STAFF_HEIGHT - 10}>
          <div className="flex h-full items-center justify-center">
            <TimeSignature
              numerator={parseInt(exercise.timeSig.split('/')[0], 10)}
              denominator={parseInt(exercise.timeSig.split('/')[1], 10)}
              size={48}
              color={ORANGE}
            />
          </div>
        </foreignObject>

        {exercise.measures.map((measure, mIdx) => {
          const startX = measureStarts[mIdx];
          const w = measureWidths[mIdx];

          const renderSlot = (slot: CompleteSlot, sIdx: number) => {
            const slotX = startX + MEASURE_PAD + sIdx * SLOT_WIDTH;
            const key = `${mIdx}:${sIdx}`;

            if (slot.kind === 'fixed') {
              return (
                <foreignObject
                  key={`f-${mIdx}-${sIdx}`}
                  x={slotX}
                  y={itemY}
                  width={SLOT_WIDTH}
                  height={ITEM_CONTAINER_H}
                  pointerEvents="none"
                >
                  <div className="flex h-full items-center justify-center">
                    {slot.item.kind === 'figure' ? (
                      <NoteSymbol kind={slot.item.figure} direction="up" size={NOTE_SIZE} color={ORANGE} />
                    ) : (
                      <RestSymbol kind={slot.item.rest} size={42} color={ORANGE} />
                    )}
                  </div>
                </foreignObject>
              );
            }

            const userItem = filled.get(key);
            const slotCenterX = slotX + SLOT_WIDTH / 2;
            return (
              <g
                key={`b-${mIdx}-${sIdx}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleBlankClick(mIdx, sIdx)}
              >
                <rect
                  x={slotX}
                  y={lineY(0) - 4}
                  width={SLOT_WIDTH}
                  height={lineY(4) - lineY(0) + 8}
                  fill="transparent"
                />
                {!userItem && (
                  <text
                    x={slotCenterX}
                    y={(lineY(0) + lineY(4)) / 2 + 7}
                    fontFamily="Orbitron, sans-serif"
                    fontWeight={700}
                    fontSize={22}
                    fill={ORANGE}
                    fillOpacity={0.45}
                    textAnchor="middle"
                    pointerEvents="none"
                  >
                    +
                  </text>
                )}
                {userItem && (
                  <foreignObject
                    x={slotX}
                    y={itemY}
                    width={SLOT_WIDTH}
                    height={ITEM_CONTAINER_H}
                    pointerEvents="none"
                  >
                    <div className="flex h-full items-center justify-center">
                      {userItem.kind === 'figure' ? (
                        <NoteSymbol
                          kind={userItem.figure}
                          direction="up"
                          size={NOTE_SIZE}
                          color={ORANGE}
                        />
                      ) : (
                        <RestSymbol kind={userItem.rest} size={42} color={ORANGE} />
                      )}
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          };

          return (
            <g key={`m-${mIdx}`}>
              {measure.slots.map(renderSlot)}
              {mIdx < exercise.measures.length - 1 && (
                <line
                  x1={startX + w}
                  x2={startX + w}
                  y1={lineY(0)}
                  y2={lineY(4)}
                  stroke={ORANGE}
                  strokeWidth={2.5}
                />
              )}
            </g>
          );
        })}

        <line
          x1={totalWidth - 24}
          x2={totalWidth - 24}
          y1={lineY(0)}
          y2={lineY(4)}
          stroke={ORANGE}
          strokeWidth={3}
        />
        <rect
          x={totalWidth - 16}
          y={lineY(0)}
          width={6}
          height={lineY(4) - lineY(0)}
          fill={ORANGE}
        />
      </svg>
    </div>
  );
}
