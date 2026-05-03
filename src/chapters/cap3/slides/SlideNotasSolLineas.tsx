import Pentagrama from '@/components/music/Pentagrama';

export default function SlideNotasSolLineas() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="Líneas en clave de Sol">
        <span>Líneas en clave de Sol</span>
      </h2>
      <div className="flex-1 flex items-center justify-center text-cyan">
        <Pentagrama
          clef="sol"
          notes={[
            { step: 0, label: 'Mi' },
            { step: 2, label: 'Sol' },
            { step: 4, label: 'Si' },
            { step: 6, label: 'Re' },
            { step: 8, label: 'Fa' },
          ]}
          width={900}
        />
      </div>
      <p className="body-text text-center">
        <strong>Mi · Sol · Si · Re · Fa</strong> — de abajo hacia arriba.
      </p>
    </div>
  );
}
