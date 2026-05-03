import Pentagrama from '@/components/music/Pentagrama';

export default function SlideNotasFaEspacios() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="Espacios en clave de Fa">
        <span>Espacios en clave de Fa</span>
      </h2>
      <div className="flex-1 flex items-center justify-center text-magenta">
        <Pentagrama
          clef="fa"
          notes={[
            { step: 1, label: 'La' },
            { step: 3, label: 'Do' },
            { step: 5, label: 'Mi' },
            { step: 7, label: 'Sol' },
          ]}
          width={900}
        />
      </div>
      <p className="body-text text-center">
        <strong>La · Do · Mi · Sol</strong> — entre las líneas.
      </p>
    </div>
  );
}
