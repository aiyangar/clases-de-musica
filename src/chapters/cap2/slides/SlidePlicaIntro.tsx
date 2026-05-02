export default function SlidePlicaIntro() {
  return (
    <div className="flex-1 flex flex-col gap-10 justify-center">
      <h2 className="heading-2 self-start" data-text="La plica">
        <span>La plica</span>
      </h2>

      <div className="def-box max-w-[1700px]">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          La <strong>plica</strong> es la <em>línea vertical</em> que sale de
          la cabeza de la nota.
        </p>
      </div>

      <p className="body-text max-w-[1700px]">
        El lado donde se dibuja <strong>cambia</strong> según la posición de
        la nota en el pentagrama. Hay una regla.
      </p>
    </div>
  );
}
