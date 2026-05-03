import Pentagrama from '@/components/music/Pentagrama';

export default function SlidePentagramaEspacios() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="El pentagrama">
        <span>El pentagrama</span>
      </h2>
      <div className="flex-1 flex items-center justify-center text-cyan">
        <Pentagrama
          showSpaceNumbers
          highlightSpaces={[1, 2, 3, 4]}
          width={900}
        />
      </div>
      <p className="body-text text-center max-w-3xl">
        <strong>4 espacios</strong> — entre las líneas, también se cuentan
        <em> de abajo hacia arriba</em>.
      </p>
    </div>
  );
}
