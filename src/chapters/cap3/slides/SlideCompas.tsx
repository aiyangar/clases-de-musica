import TimeSignature from '@/components/music/TimeSignature';

export default function SlideCompas() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="El compás">
        <span>El compás</span>
      </h2>
      <p className="body-text text-center max-w-4xl">
        El <strong>compás</strong> organiza los pulsos en
        <em> grupos regulares</em>. Se anota como una fracción.
      </p>
      <div className="flex-1 grid grid-cols-3 gap-8 items-center w-full max-w-5xl">
        {[
          { num: 4, den: 4, color: '#00ffff', label: 'cuatro tiempos · negra = 1 tiempo' },
          { num: 3, den: 4, color: '#ff00ff', label: 'tres tiempos · negra = 1 tiempo' },
          { num: 6, den: 8, color: '#ffff00', label: 'seis tiempos · corchea = 1 tiempo' },
        ].map((c) => (
          <div key={`${c.num}-${c.den}`} className="timbre-card flex flex-col items-center justify-center gap-3">
            <TimeSignature numerator={c.num} denominator={c.den} size={80} color={c.color} />
            <span className="timbre-desc text-center">{c.label}</span>
          </div>
        ))}
      </div>
      <p className="body-text text-center max-w-4xl opacity-80">
        Numerador = cuántos tiempos. Denominador = qué figura vale un tiempo.
      </p>
    </div>
  );
}
