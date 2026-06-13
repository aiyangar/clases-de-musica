import LedgerNoteQuiz from '../visualizations/LedgerNoteQuiz';
import { FA_QUESTIONS } from '../visualizations/LedgerNoteQuizData';

export default function SlideEjercicioFa() {
  return (
    <div className="flex-1 flex flex-col gap-6 justify-center">
      <h2 className="heading-2 self-start" data-text="Ejercicio · clave de Fa">
        <span>Ejercicio · clave de Fa</span>
      </h2>
      <p className="font-rajdhani text-[56px] leading-snug text-clear/85">
        Nombra la nota según su línea adicional.
      </p>
      <LedgerNoteQuiz questions={FA_QUESTIONS} startNumber={5} />
    </div>
  );
}
