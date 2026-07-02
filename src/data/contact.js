// Datos de contacto — ÚNICA fuente de verdad para todos los CTA.
export const CONTACT = {
  // Número en formato internacional sin "+" ni espacios (57 = Colombia)
  whatsappNumber: "573218459805",
  whatsappMessage: "Hola Jose, quiero automatizar mi negocio con IA.",

  email: "", // sin email de contacto por ahora (si queda vacío, no se muestra)
  linkedin: "https://www.linkedin.com/in/jose-manuel-mej%C3%ADa-corredor-9bbb65349/",

  // Link PÚBLICO de reserva de Cal.com (ej. https://cal.com/usuario/20min).
  // OJO: nunca pongas aquí una API key (cal_live_...); eso es un secreto y este sitio es público.
  meetingUrl: "", // TODO: pegar el link público de Cal.com; si queda vacío, se usa WhatsApp
};

// Construye la URL de WhatsApp con mensaje prellenado.
export function whatsappUrl(message = CONTACT.whatsappMessage) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// URL para el CTA de agendar reunión (Calendly si existe, si no WhatsApp).
export function meetingUrl() {
  return CONTACT.meetingUrl || whatsappUrl("Hola Jose, quiero agendar la reunión de 20 minutos gratis.");
}
