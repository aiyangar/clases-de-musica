import NoteSymbol from '../visualizations/NoteSymbol';
import RestSymbol from '../visualizations/RestSymbol';

export default function SlideSonidoSilencio() {
  return (
    <div className="flex-1 flex flex-col gap-10 justify-center items-center">
      <h2 className="heading-2 self-start" data-text="Sonido y silencio">
        <span>Sonido y silencio</span>
      </h2>

      <div className="flex items-center justify-center gap-12 mt-4">
        <div className="flex flex-col items-center gap-4">
          <NoteSymbol
            kind="negra"
            color="#00ffff"
            size="clamp(96px, 22vh, 200px)"
          />
          <span className="font-orbitron text-2xl tracking-[0.25em] text-cyan text-glow-cyan">
            NEGRA
          </span>
        </div>

        <span className="font-orbitron text-7xl text-electric text-glow-electric">
          =
        </span>

        <div className="flex flex-col items-center gap-4">
          <RestSymbol
            kind="negra"
            color="#ff00ff"
            size="clamp(96px, 22vh, 200px)"
          />
          <span className="font-orbitron text-2xl tracking-[0.25em] text-magenta text-glow-magenta">
            SILENCIO
          </span>
        </div>
      </div>

      <p className="body-text text-center max-w-[1500px]">
        Misma <strong>duración</strong>, distinta <em>presencia</em>.
      </p>
    </div>
  );
}
