import { ArrowUpRight } from "lucide-react";
import { COLORS } from "../theme/colors";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { meetingUrl } from "../data/contact";
import { useLang } from "../i18n/LanguageContext";
import { useScrollParallax } from "../hooks/useScrollParallax";

export function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const sectionRef = useScrollParallax();

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative overflow-hidden"
      style={{ backgroundColor: COLORS.void, "--parallax": 0 }}
    >
      {/* Sol: el wrapper centra y aplica el parallax (se hunde al bajar);
          el div interior lleva el pulso. Separado en dos capas porque una
          animación CSS reemplaza todo el transform del elemento que anima. */}
      <div
        className="absolute left-1/2"
        style={{
          top: "-18%",
          width: "min(120vw, 900px)",
          height: "min(120vw, 900px)",
          transform: "translate3d(-50%, calc(var(--parallax, 0) * 160px), 0)",
          opacity: "calc(1 - var(--parallax, 0) * 0.3)",
          willChange: "transform",
        }}
      >
        <div
          className="solar-pulse w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at 62% 38%, ${COLORS.solarGold} 0%, ${COLORS.emberCore} 42%, ${COLORS.emberEdge} 72%, transparent 78%)`,
            filter: "blur(2px)",
          }}
        />
      </div>
      {/* Degradado ambiental para fundir el sol con el fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, transparent 30%, ${COLORS.void} 68%)` }}
      />
      {/* Banda de resplandor del horizonte: gana intensidad al hundirse el sol */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          bottom: "22%",
          height: "14%",
          background: `linear-gradient(180deg, transparent 0%, ${COLORS.horizonGlow}55 45%, ${COLORS.horizonGlow}22 65%, transparent 100%)`,
          opacity: "calc(0.6 + var(--parallax, 0) * 0.4)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-40 sm:pt-48 pb-28 sm:pb-36 flex flex-col items-center text-center">
        {/* Eyebrow chip */}
        <Reveal
          className="font-body text-xs sm:text-sm px-4 py-2 rounded-full mb-8"
          style={{ border: `1px solid ${COLORS.borderStrong}`, backgroundColor: "rgba(11,4,2,0.4)", color: COLORS.linenDim, backdropFilter: "blur(6px)" }}
        >
          {h.eyebrow}
        </Reveal>

        {/* H1 */}
        <Reveal as="h1" delay={80} className="font-display italic font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.08] mb-6 max-w-3xl" style={{ color: COLORS.linen }}>
          {h.h1}
        </Reveal>

        {/* Subtítulo (2 párrafos) */}
        <Reveal delay={160} className="font-body text-base sm:text-lg max-w-xl mb-3 space-y-3" style={{ color: COLORS.linenDim }}>
          <p>{h.subtitle1}</p>
          <p>{h.subtitle2}</p>
        </Reveal>

        {/* Botones */}
        <Reveal delay={240} className="flex flex-col sm:flex-row items-center gap-3 mt-8">
          <Button href={meetingUrl()} variant="primary" subtext={h.ctaPrimarySub} target="_blank" rel="noopener noreferrer">
            {h.ctaPrimary}
          </Button>
          <Button href="#para-negocios" variant="secondary" icon={ArrowUpRight}>
            {h.ctaSecondary}
          </Button>
        </Reveal>

        {/* Pie de confianza */}
        <Reveal delay={320} className="font-body text-xs sm:text-sm mt-10 flex items-center gap-2 flex-wrap justify-center" style={{ color: COLORS.dust }}>
          {h.trust.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {i > 0 && <span style={{ color: COLORS.emberCore }}>·</span>}
              {item}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
