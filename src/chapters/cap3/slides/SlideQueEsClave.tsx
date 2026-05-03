import Pentagrama from '@/components/music/Pentagrama';

export default function SlideQueEsClave() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="¿Qué es una clave?">
        <span>¿Qué es una clave?</span>
      </h2>
      <p className="body-text text-center max-w-4xl">
        La <strong>clave</strong> es el signo que <em>asigna nombre</em> a
        las líneas y espacios del pentagrama.
      </p>
      <div className="flex-1 grid grid-cols-2 gap-8 items-center text-cyan">
        <div className="flex flex-col items-center gap-3">
          <Pentagrama width={460} />
          <span className="body-text opacity-60">sin clave → sin nombres</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Pentagrama
            clef="sol"
            notes={[
              { step: 0, label: 'Mi' },
              { step: 2, label: 'Sol' },
              { step: 4, label: 'Si' },
              { step: 6, label: 'Re' },
              { step: 8, label: 'Fa' },
            ]}
            width={460}
          />
          <span className="body-text opacity-60">con clave → notas con nombre</span>
        </div>
      </div>
    </div>
  );
}
