import Pentagrama from '@/components/music/Pentagrama';

export default function SlideConteo() {
  return (
    <div className="flex-1 flex flex-col gap-6 items-center justify-center">
      <h2 className="heading-2" data-text="Cómo se cuentan">
        <span>Cómo se cuentan</span>
      </h2>

      <div className="def-box max-w-5xl">
        <span className="def-symbol" aria-hidden="true">◈</span>
        <p className="body-text">
          Las <strong>superiores</strong> se cuentan <em>de abajo hacia arriba</em>;
          las <strong>inferiores</strong>, <em>de arriba hacia abajo</em>.
        </p>
      </div>

      <div className="text-cyan w-full flex justify-center">
        <Pentagrama
          fitNotes
          notes={[
            { step: 10, label: '1ª', color: '#84ff00' },
            { step: 12, label: '2ª', color: '#84ff00' },
            { step: 14, label: '3ª', color: '#84ff00' },
            { step: -2, label: '1ª', color: '#84ff00' },
            { step: -4, label: '2ª', color: '#84ff00' },
            { step: -6, label: '3ª', color: '#84ff00' },
          ]}
          width={520}
        />
      </div>
    </div>
  );
}
