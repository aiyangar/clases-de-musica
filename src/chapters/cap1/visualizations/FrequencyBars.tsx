const RATIOS = [0.3, 0.45, 0.65, 0.85, 1, 0.9, 0.72, 0.87, 1, 0.8, 0.55, 0.35];

export default function FrequencyBars() {
  return (
    <div
      className="flex items-end justify-center gap-3 w-full"
      style={{ height: 'clamp(140px, 24vh, 260px)' }}
      aria-hidden="true"
    >
      {RATIOS.map((r, i) => (
        <div
          key={i}
          className="relative rounded-t-md overflow-hidden"
          style={{
            width: 'clamp(14px, 1.6vw, 28px)',
            height: `${r * 100}%`,
            background: 'linear-gradient(to top, #ff00ff, #00ffff)',
            boxShadow: '0 0 18px rgba(255, 0, 255, 0.55)',
            filter: `hue-rotate(${i * 12}deg)`,
            animation: `pulseGlow 1.6s ease-in-out ${i * 0.08}s infinite`,
            transformOrigin: 'bottom',
          }}
        >
          <div
            className="absolute top-0 inset-x-0 h-1 bg-white"
            style={{ boxShadow: '0 0 12px #fff' }}
          />
        </div>
      ))}
    </div>
  );
}
