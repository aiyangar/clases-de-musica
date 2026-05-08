import TimeSignature from '@/components/music/TimeSignature';
import BarLine from '@/components/music/BarLine';

export default function SlideRecapCompas() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="Antes de empezar">
        <span>Antes de empezar</span>
      </h2>

      <p className="body-text text-center max-w-4xl">
        El <strong>indicador de compás</strong> dice cuántos tiempos cabe en cada compás.
        Las <strong>barras divisorias</strong> separan compás de compás. La{' '}
        <strong>barra final</strong> cierra la pieza.
      </p>

      <div className="flex-1 grid grid-cols-3 gap-12 items-center w-full max-w-5xl mt-6">
        <div className="timbre-card flex flex-col items-center justify-center gap-3">
          <TimeSignature numerator={2} denominator={4} size={80} color="#ff9933" />
          <span className="timbre-desc text-center">2 tiempos</span>
        </div>
        <div className="timbre-card flex flex-col items-center justify-center gap-3">
          <TimeSignature numerator={3} denominator={4} size={80} color="#ff9933" />
          <span className="timbre-desc text-center">3 tiempos</span>
        </div>
        <div className="timbre-card flex flex-col items-center justify-center gap-3">
          <TimeSignature numerator={4} denominator={4} size={80} color="#ff9933" />
          <span className="timbre-desc text-center">4 tiempos</span>
        </div>
      </div>

      <div className="flex flex-row gap-12 items-center mt-6">
        <div className="flex flex-col items-center gap-2">
          <BarLine variant="single" height={120} color="#ff9933" />
          <span className="timbre-desc">Divisoria</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BarLine variant="final" height={120} color="#ff9933" />
          <span className="timbre-desc">Final</span>
        </div>
      </div>
    </div>
  );
}
