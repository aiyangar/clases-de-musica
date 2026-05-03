import Pentagrama from '@/components/music/Pentagrama';

export default function SlideNotasFaLineas() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="Líneas en clave de Fa">
        <span>Líneas en clave de Fa</span>
      </h2>
      <div className="flex-1 flex items-center justify-center text-magenta">
        <Pentagrama
          clef="fa"
          notes={[
            { step: 0, label: 'Sol' },
            { step: 2, label: 'Si' },
            { step: 4, label: 'Re' },
            { step: 6, label: 'Fa' },
            { step: 8, label: 'La' },
          ]}
          width={900}
        />
      </div>
      <p className="body-text text-center">
        <strong>Sol · Si · Re · Fa · La</strong> — de abajo hacia arriba.
      </p>
    </div>
  );
}
