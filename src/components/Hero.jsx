import { ArrowUpRight } from "lucide-react";
import { COLORS } from "../theme/colors";

export function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: COLORS.void }}>
      {/* Sol */}
      <div
        className="solar-pulse absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: "-18%",
          width: "min(120vw, 900px)",
          height: "min(120vw, 900px)",
          background: `radial-gradient(circle at 62% 38%, ${COLORS.solarGold} 0%, ${COLORS.emberCore} 42%, ${COLORS.emberEdge} 72%, transparent 78%)`,
          filter: "blur(2px)",
        }}
      />
      {/* Degradado ambiental para fundir el sol con el fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, transparent 30%, ${COLORS.void} 68%)` }}
      />
      {/* Banda de resplandor del horizonte */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          bottom: "22%",
          height: "14%",
          background: `linear-gradient(180deg, transparent 0%, ${COLORS.horizonGlow}55 45%, ${COLORS.horizonGlow}22 65%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-40 sm:pt-48 pb-28 sm:pb-36 flex flex-col items-center text-center">
        {/* Pastilla de tagline */}
        <div
          className="font-body text-xs sm:text-sm px-4 py-2 rounded-full mb-8"
          style={{ border: `1px solid ${COLORS.borderStrong}`, backgroundColor: "rgba(11,4,2,0.4)", color: COLORS.linenDim, backdropFilter: "blur(6px)" }}
        >
          +86 negocios ya automatizan con Semiel · IA en español
        </div>

        {/* H1 */}
        <h1 className="font-display italic font-semibold text-4xl sm:text-6xl md:text-7xl leading-[1.05] mb-6" style={{ color: COLORS.linen }}>
          Sistemas Automatizados<br className="hidden sm:block" /> a tu Medida
        </h1>

        {/* Subhead */}
        <p className="font-body text-base sm:text-lg max-w-xl mb-10" style={{ color: COLORS.linenDim }}>
          ¿Pierdes horas en tareas manuales o sientes que se te escapan clientes? Construyo o automatizo lo que tu negocio necesita para escalar.
        </p>

        {/* CTA */}
        <a
          href="#contacto"
          className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-body text-sm sm:text-base font-semibold transition-transform duration-200 hover:-translate-y-0.5"
          style={{ backgroundColor: COLORS.emberCore, color: COLORS.void }}
        >
          Cuéntame tu reto
          <ArrowUpRight size={18} />
        </a>

        {/* Silueta diminuta, eco de la figura en la imagen de referencia */}
        <div className="mt-16 sm:mt-20" aria-hidden="true">
          <svg width="14" height="30" viewBox="0 0 14 30" style={{ opacity: 0.55 }}>
            <circle cx="7" cy="4" r="3.4" fill={COLORS.void} stroke={COLORS.solarGold} strokeWidth="0.6" />
            <path d="M7 8 L7 20 M7 12 L2 16 M7 12 L12 16 M7 20 L3 29 M7 20 L11 29" stroke={COLORS.solarGold} strokeWidth="1.1" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>
    </section>
  );
}
