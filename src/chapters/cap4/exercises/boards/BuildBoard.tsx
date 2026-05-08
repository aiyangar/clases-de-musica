import type { BuildExercise, FigureItem } from '@/chapters/cap4/types';
import TimeSignature from '@/components/music/TimeSignature';
import NoteSymbol from '@/components/music/NoteSymbol';
import RestSymbol from '@/components/music/RestSymbol';
import type { PaletteSelection } from '../Palette';

const ORANGE = '#ff9933';
const STAFF_HEIGHT = 140;
const STAFF_LEFT = 120;
const SLOT_WIDTH = 80;

type Props = {
  exercise: BuildExercise;
  placed: (FigureItem | null)[]; // length === exercise.required.length
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
  const totalWidth = STAFF_LEFT + slotCount * SLOT_WIDTH + 60;
  const lineY = (i: number) => 30 + i * 22;

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
            x2={totalWidth - 30}
            y1={lineY(i)}
            y2={lineY(i)}
            stroke={ORANGE}
            strokeOpacity={0.6}
            strokeWidth={2}
          />
        ))}

        <foreignObject x={30} y={30} width={70} height={88}>
          <div className="flex h-full items-center justify-center">
            <TimeSignature
              numerator={parseInt(exercise.timeSig.split('/')[0], 10)}
              denominator={parseInt(exercise.timeSig.split('/')[1], 10)}
              size={60}
              color={ORANGE}
            />
          </div>
        </foreignObject>

        {Array.from({ length: slotCount }).map((_, idx) => {
          const x = STAFF_LEFT + idx * SLOT_WIDTH;
          const item = placed[idx];
          return (
            <g key={idx} style={{ cursor: 'pointer' }}>
              <rect
                x={x + 5}
                y={lineY(0) - 30}
                width={SLOT_WIDTH - 10}
                height={lineY(4) - lineY(0) + 60}
                rx={6}
                fill={item ? 'transparent' : 'rgba(255, 153, 51, 0.08)'}
                stroke={item ? 'transparent' : 'rgba(255, 153, 51, 0.35)'}
                strokeDasharray="6 4"
                strokeWidth={1.5}
                onClick={() => handleSlotClick(idx)}
              />
              {item && (
                <foreignObject
                  x={x}
                  y={5}
                  width={SLOT_WIDTH}
                  height={STAFF_HEIGHT - 10}
                  pointerEvents="none"
                >
                  <div className="flex h-full items-center justify-center">
                    {item.kind === 'figure' ? (
                      <NoteSymbol kind={item.figure} direction="up" size={70} color={ORANGE} />
                    ) : (
                      <RestSymbol kind={item.rest} size={50} color={ORANGE} />
                    )}
                  </div>
                </foreignObject>
              )}
              {item && (
                <rect
                  x={x + 5}
                  y={lineY(0) - 30}
                  width={SLOT_WIDTH - 10}
                  height={lineY(4) - lineY(0) + 60}
                  fill="transparent"
                  onClick={() => handleSlotClick(idx)}
                />
              )}
            </g>
          );
        })}

        <line
          x1={totalWidth - 30}
          x2={totalWidth - 30}
          y1={lineY(0)}
          y2={lineY(4)}
          stroke={ORANGE}
          strokeWidth={3}
        />
      </svg>
    </div>
  );
}
