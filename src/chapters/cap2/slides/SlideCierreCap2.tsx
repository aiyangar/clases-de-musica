export default function SlideCierreCap2() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-10">
      <span className="font-orbitron text-3xl tracking-[0.4em] text-magenta text-glow-magenta">
        FIN DEL CAPÍTULO II
      </span>
      <h1
        className="heading-1 text-clear"
        style={{ textShadow: '0 0 24px #ff00ff' }}
      >
        Tiempo<br />Codificado
      </h1>

      <div className="def-box max-w-[1500px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Ya distingues las <strong>8 figuras</strong>, sus{' '}
          <strong>silencios</strong> y dominas la <em>regla de la plica</em>.
        </p>
      </div>

      <p className="subtitle max-w-[1300px]">
        En el siguiente capítulo: <em>Signos musicales</em>, el código del pentagrama.
      </p>
    </div>
  );
}
