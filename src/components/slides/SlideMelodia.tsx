import Pentagrama from '../visualizations/Pentagrama';

export default function SlideMelodia() {
  return (
    <div className="flex-1 flex flex-col gap-8 justify-center">
      <h2 className="heading-2 self-start" data-text="Melodía">
        <span>Melodía</span>
      </h2>

      <div className="def-box">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Una <strong>sucesión ordenada de notas</strong>. Es{' '}
          <em>lo que tarareas</em> cuando una canción se te queda pegada.
        </p>
      </div>

      <Pentagrama />

      <p className="body-text text-center">
        Suben, bajan, saltan: las notas dibujan la línea que tu cerebro{' '}
        <em>recuerda</em>.
      </p>
    </div>
  );
}
