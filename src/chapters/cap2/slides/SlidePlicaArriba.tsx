import NoteSymbol from '@/components/music/NoteSymbol';

export default function SlidePlicaArriba() {
  return (
    <div className="flex-1 flex flex-col gap-10 justify-center">
      <h2 className="heading-2 self-start" data-text="Plica hacia arriba">
        <span>Plica hacia arriba</span>
      </h2>

      <div className="def-box max-w-[1700px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Cuando la nota está <strong>por debajo</strong> de la 3ª línea: la
          plica va <em>hacia arriba</em>, dibujada por la <em>derecha</em> de
          la cabeza.
        </p>
      </div>

      <div className="flex items-center justify-center gap-12 mt-2">
        <NoteSymbol
          kind="negra"
          direction="up"
          color="#00ffff"
          size="clamp(96px, 20vh, 180px)"
        />
        <NoteSymbol
          kind="blanca"
          direction="up"
          color="#00ffff"
          size="clamp(96px, 20vh, 180px)"
        />
        <NoteSymbol
          kind="negra"
          direction="up"
          color="#00ffff"
          size="clamp(96px, 20vh, 180px)"
        />
      </div>
    </div>
  );
}
