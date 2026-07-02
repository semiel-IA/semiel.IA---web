import { COLORS } from "../theme/colors";
import { Reveal } from "./Reveal";
import { useLang } from "../i18n/LanguageContext";

export function AboutSection() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="sobre-mi" className="relative z-10 py-20 sm:py-28" style={{ backgroundColor: COLORS.voidSoft }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal className="inline-block font-body text-xs uppercase tracking-[0.22em] mb-4" style={{ color: COLORS.emberCore }}>
          {a.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={80} className="font-display italic font-semibold text-3xl sm:text-4xl mb-6" style={{ color: COLORS.linen }}>
          {a.h2}
        </Reveal>

        <Reveal delay={160} className="font-body text-base sm:text-lg space-y-4" style={{ color: COLORS.linenDim }}>
          {a.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        {/* Frase de cierre destacada */}
        <Reveal delay={240} className="mt-10">
          <blockquote
            className="font-display italic text-xl sm:text-2xl leading-snug mx-auto max-w-2xl pl-5 text-left"
            style={{ color: COLORS.linen, borderLeft: `3px solid ${COLORS.emberCore}` }}
          >
            {a.quote}
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
