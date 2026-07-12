import { ArrowUpRight } from "lucide-react";
import { COLORS } from "../theme/colors";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { meetingUrl } from "../data/contact";
import { useLang } from "../i18n/LanguageContext";
import { useScrollVideo } from "../hooks/useScrollVideo";

export function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const { sectionRef, videoRef } = useScrollVideo("/fondo.mp4");

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative overflow-hidden"
      style={{ backgroundColor: COLORS.void }}
    >
      {/* Video de fondo: avanza con el scroll (ver useScrollVideo). El src lo
          asigna el hook (blob); muted + playsInline permiten pintarlo sin
          interacción del usuario en móviles. */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay de legibilidad: velo oscuro + fundido a void por abajo para
          empalmar con la siguiente sección */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${COLORS.void}66 0%, ${COLORS.void}4d 55%, ${COLORS.void} 98%)`,
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
        <Reveal as="h1" delay={80} className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.08] mb-6 max-w-3xl" style={{ color: COLORS.linen }}>
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
