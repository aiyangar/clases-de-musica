import NoteSymbol from '../visualizations/NoteSymbol';

export default function SlidePlicaAbajo() {
  return (
    <div className="flex-1 flex flex-col gap-10 justify-center">
      <h2 className="heading-2 self-start" data-text="Plica hacia abajo">
        <span>Plica hacia abajo</span>
      </h2>

      <div className="def-box max-w-[1700px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Cuando la nota está <strong>por encima</strong> de la 3ª línea: la
          plica va <em>hacia abajo</em>, dibujada por la <em>izquierda</em> de
          la cabeza. Sobre la 3ª línea, por convención, también va abajo.
        </p>
      </div>

      <div className="flex items-center justify-center gap-12 mt-2">
        <NoteSymbol kind="negra" direction="down" color="#ff00ff" size="clamp(96px, 20vh, 180px)" />
        <NoteSymbol
          kind="corchea"
          direction="down"
          color="#ff00ff"
          size="clamp(96px, 20vh, 180px)"
        />
        <NoteSymbol
          kind="semicorchea"
          direction="down"
          color="#ff00ff"
          size="clamp(96px, 20vh, 180px)"
        />
      </div>
    </div>
  );
}
