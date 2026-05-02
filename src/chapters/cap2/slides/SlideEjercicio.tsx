import PlicaQuiz from '../visualizations/PlicaQuiz';

export default function SlideEjercicio() {
  return (
    <div className="flex-1 flex flex-col gap-6 justify-center">
      <h2 className="heading-2 self-start" data-text="Ejercicio · Plica">
        <span>Ejercicio · Plica</span>
      </h2>

      <p className="font-rajdhani text-2xl md:text-3xl text-clear/85 max-w-[1700px]">
        Para cada nota, decide si su plica va <em className="text-cyan text-glow-cyan not-italic font-bold">arriba</em> o{' '}
        <em className="text-magenta text-glow-magenta not-italic font-bold">abajo</em>.
        El sistema la dibuja en cuanto eliges.
      </p>

      <PlicaQuiz />
    </div>
  );
}
