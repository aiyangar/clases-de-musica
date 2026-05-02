import NoteSymbol from '../visualizations/NoteSymbol';
import RestSymbol from '../visualizations/RestSymbol';

export default function SlideQueSon() {
  return (
    <div className="flex-1 flex flex-col gap-10 justify-center">
      <h2 className="heading-2 self-start" data-text="¿Qué son las figuras?">
        <span>¿Qué son las figuras?</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div className="def-box">
            <span className="def-symbol" aria-hidden="true">◈</span>
            <p className="body-text">
              Son <strong>símbolos</strong> que indican{' '}
              <em>cuánto dura</em> un sonido o un silencio dentro de una pieza.
            </p>
          </div>

          <p className="body-text">
            Cada figura tiene su <strong>versión sonora</strong> y su{' '}
            <em>versión callada</em>: por cada figura existe un{' '}
            <strong>silencio</strong> que dura exactamente lo mismo.
          </p>
        </div>

        <div className="flex items-center justify-center gap-8">
          <NoteSymbol kind="negra" color="#00ffff" size={140} />
          <span className="font-orbitron text-6xl text-electric text-glow-electric">=</span>
          <RestSymbol kind="negra" color="#ff00ff" size={140} />
        </div>
      </div>
    </div>
  );
}
