import PulseBeat from '../visualizations/PulseBeat';

export default function SlideRitmo() {
  return (
    <div className="flex-1 flex flex-col gap-10 justify-center">
      <h2 className="heading-2 self-start" data-text="Ritmo">
        <span>Ritmo</span>
      </h2>

      <div className="def-box max-w-[1500px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          La <strong>organización de sonidos y silencios</strong> en el
          tiempo. Es <em>el pulso</em>: lo que hace que tu cabeza se mueva sin
          que lo decidas.
        </p>
      </div>

      <PulseBeat />

      <p className="body-text text-center max-w-[1500px] mx-auto">
        <strong>Melodía</strong> + <strong>Armonía</strong> +{' '}
        <strong>Ritmo</strong> = <em>la matriz musical completa</em>.
      </p>
    </div>
  );
}
