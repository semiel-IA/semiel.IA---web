import { Mail } from "lucide-react";
import { COLORS } from "../theme/colors";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { InstagramIcon } from "./icons/InstagramIcon";
import { TikTokIcon } from "./icons/TikTokIcon";
import { CONTACT, whatsappUrl } from "../data/contact";
import { useLang } from "../i18n/LanguageContext";

// Enlace icon + texto con hover a color linen (reutilizado por todos los canales).
function ContactLink({ href, icon: Icon, label, ...rest }) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 transition-colors duration-200"
      style={{ color: COLORS.linenDim }}
      onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.linen; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = COLORS.linenDim; }}
      {...rest}
    >
      <Icon size={16} />
      {label}
    </a>
  );
}

export function ContactSection() {
  const { t } = useLang();
  const c = t.contact;

  return (
    <section id="contacto" className="relative z-10 py-20 sm:py-28" style={{ backgroundColor: COLORS.void }}>
      <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center">
        <Reveal className="inline-block font-body text-xs uppercase tracking-[0.22em] mb-4" style={{ color: COLORS.emberCore }}>
          {c.eyebrow}
        </Reveal>
        <Reveal as="h2" variant="blur" delay={80} className="font-display font-semibold text-3xl sm:text-4xl mb-5" style={{ color: COLORS.linen }}>
          {c.h2}
        </Reveal>
        <Reveal delay={160} as="p" className="font-body text-base sm:text-lg mb-10" style={{ color: COLORS.linenDim }}>
          {c.intro}
        </Reveal>

        <Reveal delay={240} variant="scale" className="flex flex-col sm:flex-row items-center gap-3">
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
            <ContactLink href={`mailto:${CONTACT.email}`} icon={Mail} label={c.email} />
          )}
          <ContactLink
            href={CONTACT.linkedin}
            icon={LinkedInIcon}
            label={c.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>

        {/* Redes de contenido: guía a la gente a conocer más */}
        {(CONTACT.instagram || CONTACT.tiktok) && (
          <div className="mt-10 flex flex-col items-center">
            <Reveal className="font-body text-xs uppercase tracking-[0.22em] mb-4" style={{ color: COLORS.dust }}>
              {c.socialTitle}
            </Reveal>
            <div className="flex items-center gap-6 font-body text-sm">
              {CONTACT.instagram && (
                <ContactLink
                  href={CONTACT.instagram}
                  icon={InstagramIcon}
                  label={c.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              )}
              {CONTACT.tiktok && (
                <ContactLink
                  href={CONTACT.tiktok}
                  icon={TikTokIcon}
                  label={c.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
