export default function SlideCierreCap5() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
      <span
        className="font-orbitron text-3xl tracking-[0.4em]"
        style={{ color: '#84ff00', textShadow: '0 0 18px #84ff00' }}
      >
        FIN DEL CAPÍTULO V
      </span>
      <h1 className="heading-1 text-clear" style={{ textShadow: '0 0 24px #84ff00' }}>
        Registro<br />Extendido
      </h1>

      <div className="def-box max-w-[1500px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Ya lees notas <strong>fuera del pentagrama</strong> con líneas
          adicionales, arriba y abajo, en clave de <em>Sol</em> y de <em>Fa</em>.
        </p>
      </div>

      <p className="subtitle max-w-[1300px]">
        En el siguiente capítulo: <em>El Tiempo</em>.
      </p>
    </div>
  );
}
