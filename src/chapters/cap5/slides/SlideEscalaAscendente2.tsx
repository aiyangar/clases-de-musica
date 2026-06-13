import Pentagrama from '@/components/music/Pentagrama';

export default function SlideEscalaAscendente2() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <h2 className="heading-2" data-text="Escala ascendente">
        <span>Escala ascendente</span>
      </h2>
      <p className="body-text text-center max-w-4xl">
        La octava completa de <strong>Do</strong> a <strong>Do</strong>, subiendo
        por las líneas adicionales <em>superiores</em>.
      </p>
      <div className="text-cyan w-full flex justify-center">
        <Pentagrama
          fitNotes
          clef="sol"
          notes={[
            { step: 12, label: 'Do', color: '#84ff00' },
            { step: 13, label: 'Re', color: '#84ff00' },
            { step: 14, label: 'Mi', color: '#84ff00' },
            { step: 15, label: 'Fa', color: '#84ff00' },
            { step: 16, label: 'Sol', color: '#84ff00' },
            { step: 17, label: 'La', color: '#84ff00' },
            { step: 18, label: 'Si', color: '#84ff00' },
            { step: 19, label: 'Do', color: '#84ff00' },
          ]}
          width={600}
        />
      </div>
    </div>
  );
}
