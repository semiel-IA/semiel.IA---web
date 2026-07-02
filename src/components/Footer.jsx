import { COLORS } from "../theme/colors";
import { NAV_LINKS } from "../data/navLinks";
import { whatsappUrl } from "../data/contact";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export function Footer() {
  return (
    <footer className="relative z-10" style={{ borderTop: `1px solid ${COLORS.border}`, backgroundColor: COLORS.void }}>
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display italic font-semibold text-lg" style={{ color: COLORS.linen }}>
            Jose Mej<span style={{ color: COLORS.emberCore }}>IA</span>
            <span style={{ color: COLORS.dust }}> ~ </span>
            Semiel<span style={{ color: COLORS.emberCore }}>.IA</span>
          </span>
          <span className="font-body text-xs" style={{ color: COLORS.dust }}>
            Automatización e IA · Medellín, Colombia
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="font-body text-xs" style={{ color: COLORS.linenDim }}>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full px-4 py-2 font-body text-xs font-semibold"
          style={{ backgroundColor: COLORS.whatsapp, color: COLORS.void }}
        >
          <WhatsAppIcon size={14} />
          Escríbeme
        </a>
      </div>
      <div className="text-center pb-8 font-body text-[11px]" style={{ color: COLORS.dust }}>
        © 2026 Jose Mejía · Semiel.IA · Hecho con IA en español.
      </div>
    </footer>
  );
}
