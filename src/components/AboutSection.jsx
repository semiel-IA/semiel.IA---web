import { COLORS } from "../theme/colors";
import { Reveal } from "./Reveal";
import { useLang } from "../i18n/LanguageContext";
import fotoJose from "../assets/jose-mejia.webp";

export function AboutSection() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="sobre-mi" className="relative z-10 py-20 sm:py-28" style={{ backgroundColor: COLORS.voidSoft }}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-10 md:gap-14">
        {/* Foto (arriba en móvil, derecha en desktop) */}
        <Reveal variant="right" className="w-full md:w-[42%] shrink-0">
          <div
            className="w-full aspect-[3/4] rounded-3xl overflow-hidden"
            style={{ border: `1px solid ${COLORS.border}` }}
          >
            <img
              src={fotoJose}
              alt="José Mejía, fundador de Semiel.IA"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>

        {/* Texto (abajo en móvil, izquierda en desktop) */}
        <div className="w-full md:w-[58%] text-center md:text-left">
          <Reveal className="inline-block font-body text-xs uppercase tracking-[0.22em] mb-4" style={{ color: COLORS.emberCore }}>
            {a.eyebrow}
          </Reveal>
          <Reveal as="h2" variant="blur" delay={80} className="font-display italic font-semibold text-3xl sm:text-4xl mb-6" style={{ color: COLORS.linen }}>
            {a.h2}
          </Reveal>

          <Reveal variant="left" delay={160} className="font-body text-base sm:text-lg space-y-4" style={{ color: COLORS.linenDim }}>
            {a.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          {/* Frase de cierre destacada */}
          <Reveal variant="left" delay={240} className="mt-10">
            <blockquote
              className="font-display italic text-xl sm:text-2xl leading-snug max-w-2xl pl-5 text-left"
              style={{ color: COLORS.linen, borderLeft: `3px solid ${COLORS.emberCore}` }}
            >
              {a.quote}
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
