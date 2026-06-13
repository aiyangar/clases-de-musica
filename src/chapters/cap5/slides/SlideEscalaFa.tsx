import Pentagrama from '@/components/music/Pentagrama';

export default function SlideEscalaFa() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <h2 className="heading-2" data-text="Clave de Fa · grave">
        <span>Clave de Fa · grave</span>
      </h2>
      <p className="body-text text-center max-w-4xl">
        Tramo <strong>inferior</strong>: de <strong>Do</strong> a <strong>Do</strong>{' '}
        con líneas adicionales <em>inferiores</em>.
      </p>
      <div className="text-magenta w-full flex justify-center">
        <Pentagrama
          fitNotes
          clef="fa"
          notes={[
            { step: -4, label: 'Do', color: '#84ff00' },
            { step: -3, label: 'Re', color: '#84ff00' },
            { step: -2, label: 'Mi', color: '#84ff00' },
            { step: -1, label: 'Fa', color: '#84ff00' },
            { step: 0, label: 'Sol', color: '#84ff00' },
            { step: 1, label: 'La', color: '#84ff00' },
            { step: 2, label: 'Si', color: '#84ff00' },
            { step: 3, label: 'Do', color: '#84ff00' },
          ]}
          width={760}
        />
      </div>
    </div>
  );
}
