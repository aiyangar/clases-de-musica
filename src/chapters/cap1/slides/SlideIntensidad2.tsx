export default function SlideIntensidad2() {
  return (
    <div className="flex-1 flex flex-col gap-10 justify-center">
      <h2 className="heading-2 self-start" data-text="Intensidad">
        <span>Intensidad</span>
      </h2>

      <p className="body-text">
        Depende de la <strong>amplitud</strong> de las ondas. Se mide en{' '}
        <em>decibelios (dB)</em>.
      </p>

      <p className="body-text">
        Una balada acústica en TikTok: <em>baja intensidad</em>. Un concierto de
        rock en primera fila: <em>alta intensidad</em>.
      </p>
    </div>
  );
}
