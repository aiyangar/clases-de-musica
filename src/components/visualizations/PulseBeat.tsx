const COLORS = ['#ff00ff', '#00ffff', '#ffff00', '#ff66ff'];

export default function PulseBeat() {
  return (
    <div className="flex items-center justify-center gap-12" aria-hidden="true">
      {COLORS.map((c, i) => (
        <div
          key={c + i}
          className="w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${c} 38%, rgba(0,0,0,0.4) 100%)`,
            boxShadow: `0 0 28px ${c}, 0 0 56px ${c}`,
            animation: `beatPulse 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes beatPulse {
          0%, 100% { transform: scale(1); filter: brightness(0.85); }
          50%      { transform: scale(1.4); filter: brightness(1.4); }
        }
      `}</style>
    </div>
  );
}
