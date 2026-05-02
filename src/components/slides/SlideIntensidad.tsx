import VUMeter from '../visualizations/VUMeter';

export default function SlideIntensidad() {
  return (
    <div className="flex-1 flex flex-col gap-10 justify-center">
      <h2 className="heading-2 self-start" data-text="Intensidad">
        <span>Intensidad</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div className="def-box">
            <span className="def-symbol" aria-hidden="true">◈</span>
            <p className="body-text">
              Es el <strong>volumen</strong> del sonido: qué tan{' '}
              <em>fuerte</em> o <em>suave</em> lo percibimos.
            </p>
          </div>

          <p className="body-text">
            Depende de la <strong>amplitud</strong> de las ondas. Se mide en{' '}
            <em>decibelios (dB)</em>.
          </p>

          <p className="body-text">
            Una balada acústica en TikTok: <em>baja intensidad</em>. Un
            concierto de rock en primera fila: <em>alta intensidad</em>.
          </p>
        </div>

        <VUMeter />
      </div>
    </div>
  );
}
