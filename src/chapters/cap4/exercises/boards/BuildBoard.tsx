import type { BuildExercise, FigureItem } from '@/chapters/cap4/types';
import TimeSignature from '@/components/music/TimeSignature';
import NoteSymbol from '@/components/music/NoteSymbol';
import RestSymbol from '@/components/music/RestSymbol';
import type { PaletteSelection } from '../Palette';
import { placedNoteY } from './placement';

const ORANGE = '#ff9933';
const STAFF_HEIGHT = 140;
const STAFF_LEFT = 120;
const SLOT_WIDTH = 80;
const STAFF_PAD_RIGHT = 24;
const NOTE_SIZE = 70;
const ITEM_CONTAINER_H = STAFF_HEIGHT - 10;

type Props = {
  exercise: BuildExercise;
  placed: (FigureItem | null)[];
  selectedPaletteItem: PaletteSelection | null;
  onPlaceAt: (slotIndex: number) => void;
  onClearAt: (slotIndex: number) => void;
};

export default function BuildBoard({
  exercise,
  placed,
  selectedPaletteItem,
  onPlaceAt,
  onClearAt,
}: Props) {
  const slotCount = exercise.required.length;
  const totalWidth =
    STAFF_LEFT + slotCount * SLOT_WIDTH + STAFF_PAD_RIGHT * 2;
  const lineY = (i: number) => 30 + i * 22;
  const staffTopY = lineY(0);
  const staffBottomY = lineY(4);
  const measureRightX = totalWidth - STAFF_PAD_RIGHT;
  const itemY = placedNoteY(lineY, ITEM_CONTAINER_H, NOTE_SIZE);

  function handleSlotClick(idx: number) {
    if (placed[idx]) {
      onClearAt(idx);
      return;
    }
    if (
      selectedPaletteItem &&
      (selectedPaletteItem.kind === 'figure' || selectedPaletteItem.kind === 'rest')
    ) {
      onPlaceAt(idx);
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${STAFF_HEIGHT}`}
        style={{ width: '100%', height: STAFF_HEIGHT }}
        role="img"
        aria-label={`Construir compás en ${exercise.timeSig}`}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={STAFF_LEFT}
            x2={measureRightX}
            y1={lineY(i)}
            y2={lineY(i)}
            stroke={ORANGE}
            strokeOpacity={0.6}
            strokeWidth={2}
          />
        ))}

        <foreignObject x={30} y={5} width={80} height={STAFF_HEIGHT - 10}>
          <div className="flex h-full items-center justify-center">
            <TimeSignature
              numerator={parseInt(exercise.timeSig.split('/')[0], 10)}
              denominator={parseInt(exercise.timeSig.split('/')[1], 10)}
              size={48}
              color={ORANGE}
            />
          </div>
        </foreignObject>

        <line
          x1={STAFF_LEFT}
          x2={STAFF_LEFT}
          y1={staffTopY}
          y2={staffBottomY}
          stroke={ORANGE}
          strokeWidth={2.5}
        />

        {Array.from({ length: slotCount }).map((_, idx) => {
          const x = STAFF_LEFT + idx * SLOT_WIDTH;
          const item = placed[idx];
          const slotCenterX = x + SLOT_WIDTH / 2;
          return (
            <g key={idx} style={{ cursor: 'pointer' }}>
              <rect
                x={x}
                y={staffTopY - 4}
                width={SLOT_WIDTH}
                height={staffBottomY - staffTopY + 8}
                fill="transparent"
                onClick={() => handleSlotClick(idx)}
              />
              {!item && (
                <text
                  x={slotCenterX}
                  y={(staffTopY + staffBottomY) / 2 + 8}
                  fontFamily="Orbitron, sans-serif"
                  fontWeight={700}
                  fontSize={26}
                  fill={ORANGE}
                  fillOpacity={0.45}
                  textAnchor="middle"
                  pointerEvents="none"
                >
                  +
                </text>
              )}
              {item && (
                <foreignObject
                  x={x}
                  y={itemY}
                  width={SLOT_WIDTH}
                  height={ITEM_CONTAINER_H}
                  pointerEvents="none"
                >
                  <div className="flex h-full items-center justify-center">
                    {item.kind === 'figure' ? (
                      <NoteSymbol kind={item.figure} direction="up" size={NOTE_SIZE} color={ORANGE} />
                    ) : (
                      <RestSymbol kind={item.rest} size={50} color={ORANGE} />
                    )}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}

        <line
          x1={measureRightX - 8}
          x2={measureRightX - 8}
          y1={staffTopY}
          y2={staffBottomY}
          stroke={ORANGE}
          strokeWidth={2.5}
        />
        <rect
          x={measureRightX - 2}
          y={staffTopY}
          width={5}
          height={staffBottomY - staffTopY}
          fill={ORANGE}
        />
      </svg>
    </div>
  );
}
