import Pentagrama from '@/components/music/Pentagrama';

export default function SlideEscalaAscendente() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <h2 className="heading-2" data-text="Escala ascendente">
        <span>Escala ascendente</span>
      </h2>
      <p className="body-text text-center max-w-4xl">
        De <strong>Sol</strong> a <strong>Do</strong> con líneas adicionales
        <em> superiores</em>, en clave de <em>Sol</em>.
      </p>
      <div className="text-cyan w-full flex justify-center">
        <Pentagrama
          fitNotes
          clef="sol"
          notes={[
            { step: 9, label: 'Sol', color: '#84ff00' },
            { step: 10, label: 'La', color: '#84ff00' },
            { step: 11, label: 'Si', color: '#84ff00' },
            { step: 12, label: 'Do', color: '#84ff00' },
          ]}
          width={640}
        />
      </div>
    </div>
  );
}
