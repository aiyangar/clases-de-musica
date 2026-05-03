import Pentagrama from '@/components/music/Pentagrama';

export default function SlideLineasAdicionales() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="Líneas adicionales">
        <span>Líneas adicionales</span>
      </h2>
      <div className="flex-1 flex items-center justify-center text-cyan">
        <Pentagrama
          notes={[
            { step: 12, label: 'arriba', color: '#ffff00' },
            { step: -4, label: 'abajo', color: '#ffff00' },
          ]}
          width={900}
        />
      </div>
      <p className="body-text text-center max-w-3xl">
        Cuando una nota se sale del pentagrama, se dibujan
        <strong> líneas adicionales</strong> arriba o abajo para extenderlo.
      </p>
    </div>
  );
}
