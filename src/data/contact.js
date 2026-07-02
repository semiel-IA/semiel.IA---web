// Datos de contacto — ÚNICA fuente de verdad para todos los CTA.
export const CONTACT = {
  // Número en formato internacional sin "+" ni espacios (57 = Colombia)
  whatsappNumber: "573218459805",
  whatsappMessage: "Hola Jose, quiero automatizar mi negocio con IA.",

  email: "", // sin email de contacto por ahora (si queda vacío, no se muestra)
  linkedin: "https://www.linkedin.com/in/jose-manuel-mej%C3%ADa-corredor-9bbb65349/",

  // Redes sociales de contenido (cada una se muestra solo si tiene URL).
  instagram: "https://www.instagram.com/semiel.ia/",
  tiktok: "https://www.tiktok.com/@semiel.ia",

  // Link PÚBLICO de reserva de Cal.com.
  // OJO: nunca pongas aquí una API key (cal_live_...); eso es un secreto y este sitio es público.
  meetingUrl: "https://cal.com/solo-seriedad-tpoark",
};

// Construye la URL de WhatsApp con mensaje prellenado.
export function whatsappUrl(message = CONTACT.whatsappMessage) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// URL para el CTA de agendar reunión (Calendly si existe, si no WhatsApp).
export function meetingUrl() {
  return CONTACT.meetingUrl || whatsappUrl("Hola Jose, quiero agendar la reunión de 20 minutos gratis.");
}
