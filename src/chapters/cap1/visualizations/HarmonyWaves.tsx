type Wave = {
  label: string;
  color: string;
  duration: string;
  paths: [string, string];
};

const WAVES: Wave[] = [
  {
    label: 'Agudos',
    color: '#ffff00',
    duration: '1.3s',
    paths: [
      'M 0 80 Q 25 40, 50 80 T 100 80 T 150 80 T 200 80 T 250 80 T 300 80 T 350 80 T 400 80 T 450 80 T 500 80 T 550 80 T 600 80 T 650 80 T 700 80 T 750 80 T 800 80',
      'M 0 80 Q 25 120, 50 80 T 100 80 T 150 80 T 200 80 T 250 80 T 300 80 T 350 80 T 400 80 T 450 80 T 500 80 T 550 80 T 600 80 T 650 80 T 700 80 T 750 80 T 800 80',
    ],
  },
  {
    label: 'Medios',
    color: '#00ffff',
    duration: '2s',
    paths: [
      'M 0 80 Q 50 30, 100 80 T 200 80 T 300 80 T 400 80 T 500 80 T 600 80 T 700 80 T 800 80',
      'M 0 80 Q 50 130, 100 80 T 200 80 T 300 80 T 400 80 T 500 80 T 600 80 T 700 80 T 800 80',
    ],
  },  
  {
    label: 'Bajos',
    color: '#ff00ff',
    duration: '3s',
    paths: [
      'M 0 80 Q 100 20, 200 80 T 400 80 T 600 80 T 800 80',
      'M 0 80 Q 100 140, 200 80 T 400 80 T 600 80 T 800 80',
    ],
  },

];

export default function HarmonyWaves() {
  return (
    <div className="w-full max-w-[1200px] mx-auto flex items-center gap-8">
      <svg
        viewBox="0 0 800 480"
        className="flex-1 block"
        style={{ maxHeight: 'clamp(180px, 36vh, 360px)' }}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Tres ondas sinusoidales superpuestas: bajo, acordes y melodía"
      >
        <defs>
          <filter id="wave-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {WAVES.map((w, idx) => {
          const yOffset = 80 + idx * 160;
          return (
            <g key={w.label} transform={`translate(0, ${yOffset - 80})`}>
              <path
                d={w.paths[0]}
                fill="none"
                stroke={w.color}
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#wave-glow)"
              >
                <animate
                  attributeName="d"
                  values={`${w.paths[0]};${w.paths[1]};${w.paths[0]}`}
                  dur={w.duration}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          );
        })}
      </svg>

      <ul className="flex flex-col gap-10 font-orbitron text-3xl">
        {WAVES.map((w) => (
          <li key={w.label} className="flex items-center gap-4">
            <span
              className="inline-block w-5 h-5 rounded-full"
              style={{
                background: w.color,
                boxShadow: `0 0 14px ${w.color}, 0 0 28px ${w.color}`,
              }}
              aria-hidden="true"
            />
            <span style={{ color: w.color, textShadow: `0 0 12px ${w.color}` }}>
              {w.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
