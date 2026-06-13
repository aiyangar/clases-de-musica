export default function SlideCierreCap4() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
      <span
        className="font-orbitron text-3xl tracking-[0.4em]"
        style={{ color: '#ff9933', textShadow: '0 0 18px #ff9933' }}
      >
        FIN DEL CAPÍTULO IV
      </span>
      <h1
        className="heading-1 text-clear"
        style={{ textShadow: '0 0 24px #ff9933' }}
      >
        Compás<br />Construido
      </h1>

      <div className="def-box max-w-[1500px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Ya colocaste <strong>barras divisorias</strong>, construiste{' '}
          <strong>compases desde cero</strong> y completaste compases con figuras y silencios.
        </p>
      </div>

      <p className="subtitle max-w-[1300px]">
        En el siguiente capítulo: nuevos códigos por descubrir.
      </p>
    </div>
  );
}
