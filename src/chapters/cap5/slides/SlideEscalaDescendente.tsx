import Pentagrama from '@/components/music/Pentagrama';

export default function SlideEscalaDescendente() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <h2 className="heading-2" data-text="Escala descendente">
        <span>Escala descendente</span>
      </h2>
      <p className="body-text text-center max-w-4xl">
        De <strong>Re</strong> a <strong>Mi</strong> con líneas adicionales
        <em> inferiores</em>, en clave de <em>Sol</em>.
      </p>
      <div className="text-cyan w-full flex justify-center">
        <Pentagrama
          fitNotes
          clef="sol"
          notes={[
            { step: -1, label: 'Re', color: '#84ff00' },
            { step: -2, label: 'Do', color: '#84ff00' },
            { step: -3, label: 'Si', color: '#84ff00' },
            { step: -4, label: 'La', color: '#84ff00' },
            { step: -5, label: 'Sol', color: '#84ff00' },
            { step: -6, label: 'Fa', color: '#84ff00' },
            { step: -7, label: 'Mi', color: '#84ff00' },
          ]}
          width={820}
        />
      </div>
    </div>
  );
}
