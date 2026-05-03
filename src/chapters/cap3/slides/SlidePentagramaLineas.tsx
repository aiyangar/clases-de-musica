import Pentagrama from '@/components/music/Pentagrama';

export default function SlidePentagramaLineas() {
  return (
    <div className="flex-1 flex flex-col gap-8 items-center">
      <h2 className="heading-2" data-text="El pentagrama">
        <span>El pentagrama</span>
      </h2>
      <div className="flex-1 flex items-center justify-center text-cyan">
        <Pentagrama showLineNumbers width={900} />
      </div>
      <p className="body-text text-center max-w-3xl">
        <strong>5 líneas</strong> — se cuentan <em>de abajo hacia arriba</em>.
      </p>
    </div>
  );
}
