// Datos de contacto — ÚNICA fuente de verdad para todos los CTA.
// TODO(Jose): reemplazar los placeholders por los datos reales.
export const CONTACT = {
  // Número en formato internacional sin "+" ni espacios (ej. 57300xxxxxxx para Colombia)
  whatsappNumber: "000000000", // TODO: número real de WhatsApp
  whatsappMessage: "Hola Jose, quiero automatizar mi negocio con IA.",

  email: "soloseriedadjose@gmail.com", // TODO: confirmar email de contacto
  linkedin: "https://www.linkedin.com/in/", // TODO: URL real de LinkedIn

  // Enlace para la "Reunión de 20 minutos gratis" (ej. Calendly). Por ahora cae en WhatsApp.
  meetingUrl: "", // TODO: link de agenda (Calendly/Cal.com); si queda vacío, se usa WhatsApp
};

// Construye la URL de WhatsApp con mensaje prellenado.
export function whatsappUrl(message = CONTACT.whatsappMessage) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// URL para el CTA de agendar reunión (Calendly si existe, si no WhatsApp).
export function meetingUrl() {
  return CONTACT.meetingUrl || whatsappUrl("Hola Jose, quiero agendar la reunión de 20 minutos gratis.");
}
