const HEIGHTS = [60, 90, 130, 170, 200, 180, 145, 175, 200, 160, 110, 70];

export default function FrequencyBars() {
  return (
    <div
      className="flex items-end justify-center gap-3 h-[240px] w-full"
      aria-hidden="true"
    >
      {HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="relative w-[26px] rounded-t-md overflow-hidden"
          style={{
            height: `${h}px`,
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
