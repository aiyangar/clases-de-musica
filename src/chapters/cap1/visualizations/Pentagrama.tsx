const STAFF_LINES = [30, 55, 80, 105, 130];
const NOTES: Array<{ x: number; y: number; color: string }> = [
  { x: 90, y: 95, color: '#ff00ff' },
  { x: 200, y: 70, color: '#00ffff' },
  { x: 320, y: 50, color: '#ffff00' },
  { x: 450, y: 80, color: '#ff00ff' },
  { x: 580, y: 105, color: '#00ffff' },
  { x: 700, y: 65, color: '#ffff00' },
];

export default function Pentagrama() {
  return (
    <svg
      viewBox="0 0 800 180"
      className="block mx-auto"
      style={{
        width: '100%',
        maxWidth: '1200px',
        maxHeight: 'clamp(140px, 30vh, 280px)',
      }}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Pentagrama con notas musicales"
    >
      <defs>
        <linearGradient id="melody-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff00ff" />
          <stop offset="50%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#ffff00" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {STAFF_LINES.map((y) => (
        <line
          key={y}
          x1="20"
          x2="780"
          y1={y}
          y2={y}
          stroke="#00ffff"
          strokeOpacity="0.4"
          strokeWidth="1.4"
        />
      ))}

      <path
        d="M 60 100 Q 145 50, 200 70 T 320 50 T 450 80 T 580 105 T 720 65"
        fill="none"
        stroke="url(#melody-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#glow)"
        strokeDasharray="900"
        strokeDashoffset="900"
        style={{
          animation: 'drawMelody 4s ease-out forwards, glowPulse 2.4s ease-in-out 4s infinite',
        }}
      />

      {NOTES.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="8"
          fill={n.color}
          filter="url(#glow)"
          style={{
            opacity: 0,
            animation: `notePop 0.6s ease-out ${0.4 + i * 0.5}s forwards`,
          }}
        />
      ))}

      <style>{`
        @keyframes drawMelody {
          to { stroke-dashoffset: 0; }
        }
        @keyframes notePop {
          0%   { opacity: 0; transform: scale(0.4); }
          60%  { opacity: 1; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </svg>
  );
}
