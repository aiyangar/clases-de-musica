export default function SlidePortada() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-10">
      <span className="font-orbitron text-3xl tracking-[0.4em] text-cyan text-glow-cyan">
        CAPÍTULO I
      </span>
      <h1 className="heading-1 text-clear text-glow-cyan animate-glitchText">
        Teoría<br />Básica
      </h1>
      <span
        className="tagline animate-flicker"
        aria-label="Códigos del Sonido"
      >
        Códigos del Sonido
      </span>
      <p className="subtitle max-w-[1200px]">
        Ciencia, magia y música <em>en una sola frecuencia</em>
      </p>
    </div>
  );
}
