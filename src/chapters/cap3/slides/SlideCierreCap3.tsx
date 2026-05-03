export default function SlideCierreCap3() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-10">
      <span className="font-orbitron tracking-[0.4em] text-electric text-glow-electric" style={{ fontSize: 28 }}>
        FIN DEL CAPÍTULO III
      </span>
      <h2 className="heading-2" data-text="Aprendiste a leer el mapa">
        <span>Aprendiste a leer el mapa</span>
      </h2>
      <ul className="body-text flex flex-col gap-3">
        <li>Pentagrama: 5 líneas, 4 espacios, líneas adicionales</li>
        <li>Claves de <strong>Sol</strong>, <strong>Fa</strong> y <strong>Do</strong></li>
        <li>Notas en líneas y espacios de cada clave</li>
        <li>Compás y barras divisorias</li>
      </ul>
      <span
        className="tagline"
        style={{ color: '#ffff00', textShadow: '0 0 14px #ffff00' }}
      >
        Códigos del Pentagrama
      </span>
    </div>
  );
}
