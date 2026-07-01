import { useState } from "react";
import { Menu, X } from "lucide-react";
import { COLORS } from "../theme/colors";
import { NAV_LINKS } from "../data/navLinks";
import { NavPill } from "./NavPill";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

function LangToggle({ lang, setLang, className = "" }) {
  return (
    <div
      className={`items-center rounded-full p-0.5 font-body text-xs font-medium ${className}`}
      style={{ border: `1px solid ${COLORS.border}` }}
    >
      {["ES", "EN"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="px-3 py-1.5 rounded-full transition-colors duration-200"
          style={{
            backgroundColor: lang === l ? COLORS.emberCore : "transparent",
            color: lang === l ? COLORS.void : COLORS.linenDim,
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("ES");

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: "rgba(11,4,2,0.72)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: `1px solid ${COLORS.border}` }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none shrink-0">
          <span className="font-display italic font-semibold text-xl md:text-2xl" style={{ color: COLORS.linen }}>
            Semiel<span style={{ color: COLORS.emberCore }}>.IA</span>
          </span>
          <span className="hidden sm:block font-body text-[10px] uppercase tracking-[0.18em] mt-0.5" style={{ color: COLORS.dust }}>
            por José Mejía
          </span>
        </a>

        {/* Center nav (desktop) */}
        <nav
          className="hidden lg:flex items-center gap-1 rounded-full px-2 py-1.5"
          style={{ border: `1px solid ${COLORS.border}`, backgroundColor: "rgba(246,236,224,0.02)" }}
        >
          {NAV_LINKS.map((l) => (
            <NavPill key={l.label} href={l.href}>{l.label}</NavPill>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 md:gap-3">
          <LangToggle lang={lang} setLang={setLang} className="hidden sm:flex" />

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/message"
            className="hidden sm:flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: COLORS.emberCore, color: COLORS.void }}
          >
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-full"
            style={{ border: `1px solid ${COLORS.border}` }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={18} color={COLORS.linen} /> : <Menu size={18} color={COLORS.linen} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden px-5 pb-6 flex flex-col gap-1" style={{ borderTop: `1px solid ${COLORS.border}` }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm py-3"
              style={{ color: COLORS.linenDim, borderBottom: `1px solid ${COLORS.border}` }}
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center justify-between mt-4">
            <LangToggle lang={lang} setLang={setLang} className="flex" />
            <a
              href="https://wa.me/message"
              className="flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-sm font-semibold"
              style={{ backgroundColor: COLORS.emberCore, color: COLORS.void }}
            >
              <WhatsAppIcon size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
