import { COLORS } from "../theme/colors";
import { whatsappUrl, meetingUrl } from "../data/contact";
import { useLang } from "../i18n/LanguageContext";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

function ServiceCard({ emoji, title, description, bullets, delay }) {
  return (
    <Reveal delay={delay} variant="scale" className="h-full">
      <div
        className="group h-full rounded-3xl p-8 transition-all duration-300"
        style={{ backgroundColor: COLORS.cardBg, border: `1px solid ${COLORS.border}` }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.emberCore + "66"; e.currentTarget.style.backgroundColor = COLORS.cardBgHover; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.backgroundColor = COLORS.cardBg; }}
      >
        {/* Burbuja flotante con emoji */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 transition-transform duration-300 group-hover:-translate-y-1"
          style={{
            backgroundColor: "rgba(242,84,13,0.10)",
            border: `1px solid ${COLORS.border}`,
            boxShadow: "0 10px 30px -12px rgba(242,84,13,0.35)",
          }}
        >
          <span aria-hidden="true">{emoji}</span>
        </div>

        <h3 className="font-display font-semibold text-xl sm:text-2xl mb-3" style={{ color: COLORS.linen }}>
          {title}
        </h3>
        <p className="font-body text-sm mb-6" style={{ color: COLORS.linenDim }}>
          {description}
        </p>

        <ul className="flex flex-col gap-3">
          {bullets.map((b) => (
            <li key={b.label} className="font-body text-sm flex items-start gap-2.5" style={{ color: COLORS.linenDim }}>
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: COLORS.emberCore }} />
              <span>
                <span className="font-semibold" style={{ color: COLORS.linen }}>{b.label}:</span> {b.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function ParaNegociosSection() {
  const { t } = useLang();
  const p = t.paraNegocios;

  return (
    <section id="para-negocios" className="relative z-10 py-20 sm:py-28" style={{ backgroundColor: COLORS.void }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Encabezado */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <Reveal
            className="inline-block font-body text-xs uppercase tracking-[0.22em] mb-4"
            style={{ color: COLORS.emberCore }}
          >
            {p.eyebrow}
          </Reveal>
          <Reveal as="h2" variant="blur" delay={80} className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl mb-5" style={{ color: COLORS.linen }}>
            {p.h2}
          </Reveal>
          <Reveal delay={160} as="p" className="font-body text-sm sm:text-base" style={{ color: COLORS.linenDim }}>
            {p.intro}
          </Reveal>
        </div>

        {/* Grid de tarjetas: 2×2 en desktop, 1 columna en móvil */}
        <div className="grid gap-6 md:grid-cols-2">
          {p.cards.map((card, i) => (
            <ServiceCard key={card.title} {...card} delay={i * 110} />
          ))}
        </div>

        {/* Cierre: dos CTA lado a lado (WhatsApp · agendar reunión) */}
        <Reveal delay={120} variant="scale" className="mt-16 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Izquierda: ¿algo que no está en la lista? → WhatsApp */}
          <div
            className="rounded-3xl p-8 flex flex-col items-center text-center"
            style={{ backgroundColor: COLORS.cardBg, border: `1px solid ${COLORS.border}` }}
          >
            <p className="font-body text-base sm:text-lg mb-6 flex-1" style={{ color: COLORS.linenDim }}>
              {p.closing}
            </p>
            <Button
              href={whatsappUrl(t.whatsapp.paraNegocios)}
              variant="whatsapp"
              size="lg"
              icon={WhatsAppIcon}
              subtext={p.ctaSub}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.cta}
            </Button>
          </div>

          {/* Derecha: agenda una reunión → calendario (Cal.com) */}
          <div
            className="rounded-3xl p-8 flex flex-col items-center text-center"
            style={{ backgroundColor: COLORS.cardBg, border: `1px solid ${COLORS.border}` }}
          >
            <h3 className="font-display font-semibold text-xl sm:text-2xl mb-3" style={{ color: COLORS.linen }}>
              {p.meetingTitle}
            </h3>
            <p className="font-body text-base sm:text-lg mb-6 flex-1" style={{ color: COLORS.linenDim }}>
              {p.meetingText}
            </p>
            <Button
              href={meetingUrl()}
              variant="primary"
              size="lg"
              subtext={p.meetingSub}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.meetingCta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
