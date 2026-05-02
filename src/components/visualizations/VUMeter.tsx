export default function VUMeter() {
  return (
    <div className="w-full max-w-[900px] mx-auto" aria-hidden="true">
      <div
        className="relative h-12 rounded-full overflow-hidden border border-cyan/40"
        style={{
          background:
            'linear-gradient(90deg, #22ff66 0%, #ffff00 55%, #ff2233 100%)',
          boxShadow: '0 0 24px rgba(0, 255, 255, 0.35), inset 0 0 14px rgba(0,0,0,0.6)',
        }}
      >
        <div
          className="absolute top-0 right-0 h-full bg-black/85"
          style={{
            width: '70%',
            animation: 'vuMask 1.6s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes vuMask {
            0%, 100% { width: 70%; }
            25%      { width: 30%; }
            50%      { width: 55%; }
            75%      { width: 18%; }
          }
        `}</style>
      </div>

      <div className="mt-4 flex justify-between font-orbitron text-2xl tracking-[0.18em]">
        <span className="text-clear/80">PIANO</span>
        <span className="text-electric text-glow-electric">MEZZO</span>
        <span className="text-magenta text-glow-magenta">FORTE</span>
      </div>
    </div>
  );
}
