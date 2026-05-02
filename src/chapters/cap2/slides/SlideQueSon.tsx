export default function SlideQueSon() {
  return (
    <div className="flex-1 flex flex-col gap-10 justify-center">
      <h2 className="heading-2 self-start" data-text="¿Qué son las figuras?">
        <span>¿Qué son las figuras?</span>
      </h2>

      <div className="def-box max-w-[1700px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Son <strong>símbolos</strong> que indican{' '}
          <em>cuánto dura</em> un sonido o un silencio dentro de una pieza.
        </p>
      </div>

      <p className="body-text max-w-[1700px]">
        Cada figura tiene su <strong>versión sonora</strong> y su{' '}
        <em>versión callada</em>: por cada figura existe un{' '}
        <strong>silencio</strong> que dura exactamente lo mismo.
      </p>
    </div>
  );
}
