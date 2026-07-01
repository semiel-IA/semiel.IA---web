import { COLORS } from "../theme/colors";
import { SERVICES } from "../data/services";

export function Services() {
  return (
    <section id="servicios" className="relative z-10 py-20 sm:py-28" style={{ backgroundColor: COLORS.void }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center max-w-xl mx-auto">
          <h2 className="font-display italic font-semibold text-3xl sm:text-4xl mb-4" style={{ color: COLORS.linen }}>
            Lo que construyo para tu negocio
          </h2>
          <p className="font-body text-sm sm:text-base" style={{ color: COLORS.dust }}>
            Tres formas de quitarte trabajo manual de encima, sin contratar más gente.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, items }) => (
            <div
              key={title}
              className="group rounded-3xl p-8 transition-all duration-300"
              style={{ backgroundColor: COLORS.cardBg, border: `1px solid ${COLORS.border}` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.emberCore + "66"; e.currentTarget.style.backgroundColor = COLORS.cardBgHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.backgroundColor = COLORS.cardBg; }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(242,84,13,0.12)" }}
              >
                <Icon size={20} color={COLORS.emberCore} />
              </div>
              <h3 className="font-display italic font-semibold text-xl sm:text-2xl mb-5" style={{ color: COLORS.linen }}>
                {title}
              </h3>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item} className="font-body text-sm flex items-start gap-2.5" style={{ color: COLORS.linenDim }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: COLORS.emberCore }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
