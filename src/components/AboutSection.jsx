import { COLORS } from "../theme/colors";
import { Reveal } from "./Reveal";

export function AboutSection() {
  return (
    <section id="sobre-mi" className="relative z-10 py-20 sm:py-28" style={{ backgroundColor: COLORS.voidSoft }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal className="inline-block font-body text-xs uppercase tracking-[0.22em] mb-4" style={{ color: COLORS.emberCore }}>
          sobre mí
        </Reveal>
        <Reveal as="h2" delay={80} className="font-display italic font-semibold text-3xl sm:text-4xl mb-6" style={{ color: COLORS.linen }}>
          Hola, soy Jose Mejía.
        </Reveal>

        <Reveal delay={160} className="font-body text-base sm:text-lg space-y-4" style={{ color: COLORS.linenDim }}>
          <p>
            Tengo 22 años, soy ingeniero de sistemas y vivo en Medellín. Todo lo que sé de
            automatización e IA lo aprendí por mi cuenta: lo fui armando a punta de romper cosas,
            leer documentación a las 2am y probar hasta que funcionara.
          </p>
          <p>
            Ayudo a negocios a dejar de perder tiempo en tareas manuales. Diseño y construyo
            automatizaciones, agentes de IA, CRM y software a medida que trabajan por ti y
            adaptados a la forma real en que operas.
          </p>
          <p>
            Fuera del código, entreno en el gym y juego fútbol — la misma disciplina que me metió
            en esto sin que nadie me obligara es la que aplico en cada proyecto: nada de entregas
            a medias ni sistemas que se caen a la primera semana.
          </p>
        </Reveal>

        {/* Frase de cierre destacada */}
        <Reveal delay={240} className="mt-10">
          <blockquote
            className="font-display italic text-xl sm:text-2xl leading-snug mx-auto max-w-2xl pl-5 text-left"
            style={{ color: COLORS.linen, borderLeft: `3px solid ${COLORS.emberCore}` }}
          >
            No entrego una herramienta y desaparezco: te acompaño mes a mes dándole mantenimiento
            al sistema para que siga creciendo con tu negocio.
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
