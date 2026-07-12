import { useState } from "react";
import { Menu, X } from "lucide-react";
import { COLORS } from "../theme/colors";
import { NAV_ITEMS } from "../data/navLinks";
import { whatsappUrl } from "../data/contact";
import { useLang } from "../i18n/LanguageContext";
import { NavPill } from "./NavPill";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

// Marca: "Jose MejIA ~ Semiel.IA" — se resalta "IA" en ambos nombres.
function Brand() {
  return (
    <a href="#" className="font-display font-semibold text-lg md:text-xl shrink-0" style={{ color: COLORS.linen }}>
      Jose Mej<span style={{ color: COLORS.emberCore }}>IA</span>
      <span style={{ color: COLORS.dust }}> ~ </span>
      Semiel<span style={{ color: COLORS.emberCore }}>.IA</span>
    </a>
  );
}

function LangToggle({ className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`items-center rounded-full p-0.5 font-body text-xs font-medium ${className}`}
      style={{ border: `1px solid ${COLORS.border}` }}
    >
      {["es", "en"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className="px-3 py-1.5 rounded-full transition-colors duration-200"
          style={{
            backgroundColor: lang === l ? COLORS.emberCore : "transparent",
            color: lang === l ? COLORS.void : COLORS.linenDim,
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// CTA de WhatsApp (verde suave) reutilizado en desktop y móvil.
function WhatsAppCta({ message, className = "" }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`items-center gap-2 rounded-full px-4 py-2.5 font-body text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
      style={{ backgroundColor: COLORS.whatsapp, color: COLORS.void }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = COLORS.whatsappHover; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = COLORS.whatsapp; }}
    >
      <WhatsAppIcon size={16} />
      WhatsApp
    </a>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLang();

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: "rgba(11,4,2,0.72)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: `1px solid ${COLORS.border}` }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        <Brand />

        {/* Nav centro (desktop) */}
        <nav
          className="hidden lg:flex items-center gap-1 rounded-full px-2 py-1.5"
          style={{ border: `1px solid ${COLORS.border}`, backgroundColor: "rgba(246,236,224,0.02)" }}
        >
          {NAV_ITEMS.map((item) => (
            <NavPill key={item.key} href={item.href}>{t.nav[item.key]}</NavPill>
          ))}
        </nav>

        {/* Controles derecha */}
        <div className="flex items-center gap-2 md:gap-3">
          <LangToggle className="hidden sm:flex" />
          <WhatsAppCta message={t.whatsapp.default} className="hidden sm:flex" />

          {/* Botón menú móvil */}
          <button
            className="lg:hidden p-2 rounded-full"
            style={{ border: `1px solid ${COLORS.border}` }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={t.common.openMenu}
          >
            {menuOpen ? <X size={18} color={COLORS.linen} /> : <Menu size={18} color={COLORS.linen} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="lg:hidden px-5 pb-6 flex flex-col gap-1" style={{ borderTop: `1px solid ${COLORS.border}` }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm py-3"
              style={{ color: COLORS.linenDim, borderBottom: `1px solid ${COLORS.border}` }}
            >
              {t.nav[item.key]}
            </a>
          ))}
          <div className="flex items-center justify-between mt-4">
            <LangToggle className="flex" />
            <WhatsAppCta message={t.whatsapp.default} className="flex" />
          </div>
        </div>
      )}
    </header>
  );
}
