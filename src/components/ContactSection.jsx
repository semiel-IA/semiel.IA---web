import { Mail } from "lucide-react";
import { COLORS } from "../theme/colors";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { CONTACT, whatsappUrl } from "../data/contact";
import { useLang } from "../i18n/LanguageContext";

export function ContactSection() {
  const { t } = useLang();
  const c = t.contact;

  return (
    <section id="contacto" className="relative z-10 py-20 sm:py-28" style={{ backgroundColor: COLORS.void }}>
      <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center">
        <Reveal className="inline-block font-body text-xs uppercase tracking-[0.22em] mb-4" style={{ color: COLORS.emberCore }}>
          {c.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={80} className="font-display italic font-semibold text-3xl sm:text-4xl mb-5" style={{ color: COLORS.linen }}>
          {c.h2}
        </Reveal>
        <Reveal delay={160} as="p" className="font-body text-base sm:text-lg mb-10" style={{ color: COLORS.linenDim }}>
          {c.intro}
        </Reveal>

        <Reveal delay={240} className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            href={whatsappUrl(t.whatsapp.default)}
            variant="whatsapp"
            size="lg"
            icon={WhatsAppIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.whatsappCta}
          </Button>
        </Reveal>

        {/* Otros canales */}
        <div className="flex items-center gap-6 mt-8 font-body text-sm">
          {CONTACT.email && (
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 transition-colors duration-200"
              style={{ color: COLORS.linenDim }}
              onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.linen; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = COLORS.linenDim; }}
            >
              <Mail size={16} />
              {c.email}
            </a>
          )}
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors duration-200"
            style={{ color: COLORS.linenDim }}
            onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.linen; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = COLORS.linenDim; }}
          >
            <LinkedInIcon size={16} />
            {c.linkedin}
          </a>
        </div>
      </div>
    </section>
  );
}
