import BarLine from '@/components/music/BarLine';

export default function SlideRecapCompas2() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <h2 className="heading-2" data-text="Antes de empezar">
        <span>Antes de empezar</span>
      </h2>

      <p className="body-text text-center max-w-4xl">
        Las <strong>barras divisorias</strong> separan compás de compás. La{' '}
        <strong>barra final</strong> cierra la pieza.
      </p>

      <div className="flex flex-row gap-16 items-center mt-4">
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
