import PlicaQuiz from '../visualizations/PlicaQuiz';
import { ALL_PLICA_QUESTIONS } from '../visualizations/PlicaQuizData';

type Props = {
  part: 1 | 2;
};

export default function SlideEjercicio({ part }: Props) {
  const questions =
    part === 1
      ? ALL_PLICA_QUESTIONS.slice(0, 3)
      : ALL_PLICA_QUESTIONS.slice(3, 6);
  const startNumber = part === 1 ? 1 : 4;

  return (
    <div className="flex-1 flex flex-col gap-8 justify-center">
      <h2
        className="heading-2 self-start"
        data-text={`Ejercicio · ${part}/2`}
      >
        <span>{`Ejercicio · ${part}/2`}</span>
      </h2>

      <p className="font-rajdhani text-[56px] leading-snug text-clear/85 max-w-[1700px]">
        Para cada nota, decide si su plica va{' '}
        <em className="text-cyan text-glow-cyan not-italic font-bold">arriba</em>{' '}
        o{' '}
        <em className="text-magenta text-glow-magenta not-italic font-bold">
          abajo
        </em>
        .
      </p>

      <PlicaQuiz questions={questions} startNumber={startNumber} />
    </div>
  );
}
