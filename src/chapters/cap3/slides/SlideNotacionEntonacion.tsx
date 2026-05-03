export default function SlideNotacionEntonacion() {
  return (
    <div className="flex-1 flex flex-col gap-10">
      <h2 className="heading-2 text-center" data-text="Notación vs Entonación">
        <span>Notación vs Entonación</span>
      </h2>
      <div className="flex-1 grid grid-cols-2 gap-10">
        <div className="def-box">
          <span className="def-symbol">𝄞</span>
          <h3 className="heading-3 text-cyan text-glow-cyan text-center mb-4">
            Notación
          </h3>
          <p className="body-text text-center">
            El sistema <strong>escrito</strong> que representa la música:
            los signos que se dibujan en el pentagrama.
          </p>
        </div>
        <div className="def-box">
          <span className="def-symbol" style={{ color: '#ff00ff' }}>♬</span>
          <h3 className="heading-3 text-magenta text-glow-magenta text-center mb-4">
            Entonación
          </h3>
          <p className="body-text text-center">
            La <strong>afinación correcta</strong> de cada sonido al
            ejecutarlo: la altura precisa que se canta o toca.
          </p>
        </div>
      </div>
    </div>
  );
}
