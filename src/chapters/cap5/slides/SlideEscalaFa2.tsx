import Pentagrama from '@/components/music/Pentagrama';

export default function SlideEscalaFa2() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <h2 className="heading-2" data-text="Clave de Fa · agudo">
        <span>Clave de Fa · agudo</span>
      </h2>
      <p className="body-text text-center max-w-4xl">
        Tramo <strong>superior</strong>: de <strong>Do</strong> a <strong>Do</strong>{' '}
        saliendo por las líneas adicionales <em>superiores</em>.
      </p>
      <div className="text-magenta w-full flex justify-center">
        <Pentagrama
          fitNotes
          clef="fa"
          notes={[
            { step: 3, label: 'Do', color: '#84ff00' },
            { step: 4, label: 'Re', color: '#84ff00' },
            { step: 5, label: 'Mi', color: '#84ff00' },
            { step: 6, label: 'Fa', color: '#84ff00' },
            { step: 7, label: 'Sol', color: '#84ff00' },
            { step: 8, label: 'La', color: '#84ff00' },
            { step: 9, label: 'Si', color: '#84ff00' },
            { step: 10, label: 'Do', color: '#84ff00' },
          ]}
          width={760}
        />
      </div>
    </div>
  );
}
