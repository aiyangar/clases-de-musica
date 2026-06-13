import Pentagrama from '@/components/music/Pentagrama';

export default function SlideQueSon() {
  return (
    <div className="flex-1 flex flex-col gap-6 items-center justify-center">
      <h2 className="heading-2" data-text="Líneas adicionales">
        <span>Líneas adicionales</span>
      </h2>

      <div className="def-box max-w-5xl">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Líneas <strong>cortas</strong> que extienden el pentagrama hacia
          <em> arriba</em> y <em>abajo</em>, con la <strong>misma distancia</strong>{' '}
          que las líneas del pentagrama.
        </p>
      </div>

      <div className="text-cyan w-full flex justify-center">
        <Pentagrama
          fitNotes
          notes={[
            { step: 12, label: 'arriba', color: '#84ff00' },
            { step: -4, label: 'abajo', color: '#84ff00' },
          ]}
          width={460}
        />
      </div>
    </div>
  );
}
