import { COLORS } from "../theme/colors";
import { PARA_NEGOCIOS } from "../data/paraNegocios";
import { whatsappUrl } from "../data/contact";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

function ServiceCard({ emoji, title, description, bullets, delay }) {
  return (
    <Reveal delay={delay}>
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

        <h3 className="font-display italic font-semibold text-xl sm:text-2xl mb-3" style={{ color: COLORS.linen }}>
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
  return (
    <section id="para-negocios" className="relative z-10 py-20 sm:py-28" style={{ backgroundColor: COLORS.void }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Encabezado */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <Reveal
            className="inline-block font-body text-xs uppercase tracking-[0.22em] mb-4"
            style={{ color: COLORS.emberCore }}
          >
            para negocios
          </Reveal>
          <Reveal as="h2" delay={80} className="font-display italic font-semibold text-3xl sm:text-4xl md:text-5xl mb-5" style={{ color: COLORS.linen }}>
            Integro la IA a tu negocio.
          </Reveal>
          <Reveal delay={160} as="p" className="font-body text-sm sm:text-base" style={{ color: COLORS.linenDim }}>
            ¿Pierdes horas en tareas manuales o sientes que se te escapan clientes? Yo lo automatizo o construyo la herramienta que te falta. Cuéntame tu mayor dolor de cabeza y te propongo la solución exacta.
          </Reveal>
        </div>

        {/* Grid de tarjetas: 2×2 en desktop, 1 columna en móvil */}
        <div className="grid gap-6 md:grid-cols-2">
          {PARA_NEGOCIOS.map((card, i) => (
            <ServiceCard key={card.title} {...card} delay={i * 90} />
          ))}
        </div>

        {/* Cierre + CTA de WhatsApp */}
        <Reveal delay={120} className="mt-16 text-center max-w-2xl mx-auto flex flex-col items-center">
          <p className="font-body text-base sm:text-lg mb-6" style={{ color: COLORS.linenDim }}>
            ¿Lo que necesitas no está en la lista? Revisemos si se puede automatizar o construir y lo hago por ti.
          </p>
          <Button
            href={whatsappUrl("Hola Jose, esto es lo que necesito para mi negocio:")}
            variant="whatsapp"
            size="lg"
            icon={WhatsAppIcon}
            subtext="Respuesta rápida · sin compromiso"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablemos y cuéntame qué necesitas
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
