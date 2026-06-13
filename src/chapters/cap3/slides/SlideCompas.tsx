import TimeSignature from '@/components/music/TimeSignature';

export default function SlideCompas() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="El compás">
        <span>El compás</span>
      </h2>
      <p className="body-text text-center max-w-4xl">
        El <strong>compás</strong> organiza los pulsos en
        <em> grupos regulares</em>, anotados como fracción.
      </p>
      <div className="flex-1 grid grid-cols-3 gap-6 items-center w-full max-w-5xl">
        {[
          { num: 4, den: 4, color: '#00ffff', label: '4 tiempos · negra' },
          { num: 3, den: 4, color: '#ff00ff', label: '3 tiempos · negra' },
          { num: 6, den: 8, color: '#ffff00', label: '6 tiempos · corchea' },
        ].map((c) => (
          <div key={`${c.num}-${c.den}`} className="timbre-card flex flex-col items-center justify-center gap-3">
            <TimeSignature numerator={c.num} denominator={c.den} size={64} color={c.color} />
            <span className="timbre-desc text-center">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
