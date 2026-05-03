import Pentagrama from '@/components/music/Pentagrama';

export default function SlideNotasSolEspacios() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="Espacios en clave de Sol">
        <span>Espacios en clave de Sol</span>
      </h2>
      <div className="flex-1 flex items-center justify-center text-cyan">
        <Pentagrama
          clef="sol"
          notes={[
            { step: 1, label: 'Fa' },
            { step: 3, label: 'La' },
            { step: 5, label: 'Do' },
            { step: 7, label: 'Mi' },
          ]}
          width={900}
        />
      </div>
      <p className="body-text text-center">
        <strong>Fa · La · Do · Mi</strong> — en inglés se memoriza como
        <em> F-A-C-E</em> ("cara").
      </p>
    </div>
  );
}
