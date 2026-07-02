import { COLORS } from "../theme/colors";
import { Reveal } from "./Reveal";

// NOTA: copy BORRADOR — el brief no incluía texto para "Sobre mí".
// Jose: ajusta este contenido cuando quieras.
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
            Ayudo a negocios a dejar de perder tiempo en tareas manuales. Diseño y construyo
            automatizaciones, agentes de IA y software a medida que trabajan por ti, en español
            y adaptados a la forma real en que operas.
          </p>
          <p>
            No entrego una herramienta y desaparezco: te acompaño mes a mes dándole mantenimiento
            al sistema para que siga creciendo con tu negocio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
