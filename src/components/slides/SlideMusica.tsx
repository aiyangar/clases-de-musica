export default function SlideMusica() {
  return (
    <div className="flex-1 flex flex-col gap-12 justify-center">
      <h2 className="heading-2 self-start" data-text="¿Qué es la música?">
        <span>¿Qué es la música?</span>
      </h2>

      <div className="def-box max-w-[1500px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          La música es el <strong>arte de combinar sonidos y silencios</strong>{' '}
          en el tiempo para <em>transmitir emociones</em>.
        </p>
      </div>

      <p className="body-text max-w-[1500px]">
        Es un <strong>código mágico</strong>: ondas que viajan por el aire,
        entran a tus oídos y tu cerebro las decodifica como{' '}
        <em>tristeza, euforia o adrenalina</em>. Pura ciencia disfrazada de
        hechizo.
      </p>
    </div>
  );
}
