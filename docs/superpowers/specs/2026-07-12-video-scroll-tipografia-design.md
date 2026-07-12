# Video de fondo con scrubbing por scroll + tipografía Iceberg/Chakra Petch

**Fecha:** 2026-07-12 · **Estado:** aprobado (diseño validado en conversación)

## Qué se construye

1. `fondo.mp4` como fondo **solo del Hero**, cuya reproducción avanza con el
   scroll (scrubbing): arriba del todo = primer frame; cuando el Hero termina de
   salir del viewport = último frame. **Reemplaza** al sol CSS animado y sus
   degradados/parallax.
2. Cambio tipográfico global: **Iceberg** en titulares (`font-display`) y
   **Chakra Petch** en cuerpo/botones/nav (`font-body`). **Sin cursiva en
   ningún lugar** (decisión explícita del usuario; Iceberg además no tiene
   itálica).

## Diseño técnico

### Video (Hero)

- `fondo.mp4` (2,4 MB) se mueve a `public/fondo.mp4`.
- Nuevo hook `src/hooks/useScrollVideo.js` (mismo estilo que el
  `useScrollParallax` que sustituye): al montar descarga el mp4 completo como
  blob (`fetch → URL.createObjectURL`) para que los saltos de `currentTime`
  sean instantáneos; con fallback al streaming normal si el fetch falla.
  Bucle `requestAnimationFrame` con interpolación (lerp) entre el progreso
  objetivo (`-rect.top / rect.height`, clamp 0–1) y el actual; solo escribe
  `currentTime` si la delta es perceptible. Con `prefers-reduced-motion` no
  hay scrubbing (queda el primer frame).
- En `Hero.jsx`: se eliminan el sol (wrapper + `.solar-pulse`), el degradado
  ambiental, la banda de horizonte y `useScrollParallax` (hook que se borra
  por quedar sin usos). Entra `<video muted playsInline preload="metadata"
  aria-hidden>` a fondo completo (`object-cover`) más un overlay
  (velo oscuro + degradado a `COLORS.void` en el borde inferior) para
  legibilidad y fundido con la siguiente sección.
- `index.css`: se eliminan `solarPulse`/`.solar-pulse`.
- **CSP:** añadir `media-src 'self' blob:` en `vite.config.js` y
  `public/_headers` (hoy `media-src` cae en `default-src 'self'`, que
  bloquearía el blob).

### Tipografía

- `index.html`: preconnect + stylesheet de Google Fonts (Chakra Petch
  300–700 + Iceberg) tal como los pasó el usuario; se elimina el `@import`
  de Fraunces/Inter en `index.css` (mejor rendimiento).
- `index.css`: `.font-display` → `'Iceberg', 'Chakra Petch', sans-serif`;
  `.font-body` → `'Chakra Petch', sans-serif`.
- Quitar la clase `italic` de los 9 usos (Hero, ParaNegocios ×3, About ×2,
  Contact, Footer, Header).
- Actualizar `CLAUDE.md` (tipografía, escala H1 sin itálica, Hero con video,
  estructura) y el skill `/verify` (los flujos del sol/parallax quedan
  obsoletos; entra el flujo del video).

## Verificación

Receta `/verify` (Vite + playwright-core + Chrome del sistema, headless):
fuentes computadas (Iceberg en h1, Chakra Petch en body), ausencia de
`font-style: italic`, `video.currentTime` crece al scrollear y vuelve al
inicio, reduced-motion no scrubbea, viewport móvil 375×700, cero
`console.error`/`pageerror`, y `npm run build` como gate de compilación.
