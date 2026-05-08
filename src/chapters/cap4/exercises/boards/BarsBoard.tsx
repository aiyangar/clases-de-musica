import { useMemo } from 'react';
import type { BarsExercise } from '@/chapters/cap4/types';
import TimeSignature from '@/components/music/TimeSignature';
import NoteSymbol from '@/components/music/NoteSymbol';
import RestSymbol from '@/components/music/RestSymbol';

const ORANGE = '#ff9933';
const STAFF_HEIGHT = 120;
const STAFF_LEFT = 110;        // after the time signature
const STAFF_RIGHT_PAD = 20;
const ITEM_WIDTH = 70;
const SLOT_WIDTH = 28;          // tappable region between two items

type Props = {
  exercise: BarsExercise;
  userBars: number[];           // indices after which user placed a bar
  onToggleBar: (afterIndex: number) => void;
  highlightWrong?: boolean;     // when status === 'incorrect', subtly tint red
};

export default function BarsBoard({
  exercise,
  userBars,
  onToggleBar,
  highlightWrong = false,
}: Props) {
  const items = exercise.items;
  const totalWidth = useMemo(() => {
    return STAFF_LEFT + items.length * (ITEM_WIDTH + SLOT_WIDTH) + STAFF_RIGHT_PAD;
  }, [items.length]);

  const lineY = (i: number) => 20 + i * 22;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${STAFF_HEIGHT}`}
        style={{ width: '100%', height: STAFF_HEIGHT }}
        role="img"
        aria-label={`Ejercicio de barras divisorias en compás ${exercise.timeSig}`}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={STAFF_LEFT}
            x2={totalWidth - STAFF_RIGHT_PAD}
            y1={lineY(i)}
            y2={lineY(i)}
            stroke={ORANGE}
            strokeOpacity={0.6}
            strokeWidth={2}
          />
        ))}

        <foreignObject x={20} y={20} width={70} height={88}>
          <div className="flex h-full items-center justify-center">
            <TimeSignature
              numerator={parseInt(exercise.timeSig.split('/')[0], 10)}
              denominator={parseInt(exercise.timeSig.split('/')[1], 10)}
              size={60}
              color={ORANGE}
            />
          </div>
        </foreignObject>

        {items.map((item, idx) => {
          const x = STAFF_LEFT + idx * (ITEM_WIDTH + SLOT_WIDTH);
          return (
            <foreignObject
              key={`item-${idx}`}
              x={x}
              y={5}
              width={ITEM_WIDTH}
              height={STAFF_HEIGHT - 10}
            >
              <div className="flex h-full items-center justify-center">
                {item.kind === 'figure' ? (
                  <NoteSymbol kind={item.figure} direction="up" size={70} color={ORANGE} />
                ) : (
                  <RestSymbol kind={item.rest} size={50} color={ORANGE} />
                )}
              </div>
            </foreignObject>
          );
        })}

        {items.slice(0, -1).map((_, idx) => {
          const slotX =
            STAFF_LEFT + idx * (ITEM_WIDTH + SLOT_WIDTH) + ITEM_WIDTH;
          const hasBar = userBars.includes(idx);
          return (
            <g key={`slot-${idx}`} style={{ cursor: 'pointer' }}>
              <rect
                x={slotX}
                y={5}
                width={SLOT_WIDTH}
                height={STAFF_HEIGHT - 10}
                fill="transparent"
                onClick={() => onToggleBar(idx)}
              />
              {hasBar && (
                <line
                  x1={slotX + SLOT_WIDTH / 2}
                  x2={slotX + SLOT_WIDTH / 2}
                  y1={lineY(0)}
                  y2={lineY(4)}
                  stroke={highlightWrong ? '#ff3366' : ORANGE}
                  strokeWidth={3}
                />
              )}
            </g>
          );
        })}

        <line
          x1={totalWidth - STAFF_RIGHT_PAD - 12}
          x2={totalWidth - STAFF_RIGHT_PAD - 12}
          y1={lineY(0)}
          y2={lineY(4)}
          stroke={ORANGE}
          strokeWidth={3}
        />
        <rect
          x={totalWidth - STAFF_RIGHT_PAD - 5}
          y={lineY(0)}
          width={6}
          height={lineY(4) - lineY(0)}
          fill={ORANGE}
        />
      </svg>
    </div>
  );
}
