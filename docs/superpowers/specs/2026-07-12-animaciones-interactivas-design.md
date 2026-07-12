# Animaciones interactivas — diseño

**Fecha:** 2026-07-12 · **Estado:** aprobado por el usuario

## Objetivo

Hacer la landing más viva e interactiva: el sol del Hero responde al scroll (parallax de
atardecer) y cada sección entra con animaciones en cascada más ricas que el fade-up actual.
Sin dependencias nuevas (se mantiene la decisión de no usar framer-motion).

## Decisiones del usuario

1. **Sol:** parallax con scroll — al bajar, el sol se hunde hacia el horizonte y el
   resplandor de horizonte se intensifica. El pulso actual gana una deriva lenta.
2. **Secciones:** Reveal enriquecido — cascadas y direcciones variadas por elemento,
   sin efectos scroll-linked continuos dentro de las secciones.
3. **Repetición:** los reveals se disparan **solo la primera vez** (comportamiento actual).

## Arquitectura

### 1. Parallax del sol (Hero)

- **Nuevo hook `src/hooks/useScrollParallax.js`** (~20 líneas): listener `scroll` pasivo +
  `requestAnimationFrame`, devuelve un `ref` para la sección y el progreso de scroll
  normalizado (0 → 1 mientras el Hero sale del viewport). Se desactiva por completo si
  `prefers-reduced-motion: reduce`.
- **Hero.jsx:** el sol se separa en dos capas:
  - *Wrapper exterior:* posicionamiento (`left-1/2`, `translateX(-50%)`) + desplazamiento
    de parallax vía `transform: translate3d(-50%, Ypx, 0)`.
  - *Div interior:* gradiente radial + animación de pulso/deriva.
  Esto además **corrige un bug existente**: los keyframes de `solarPulse` reemplazan todo
  el `transform` y pisaban el `-translate-x-1/2` de Tailwind, dejando el sol descentrado.
- La banda de resplandor del horizonte aumenta su opacidad a medida que el sol baja.

### 2. Reveal enriquecido (todas las secciones)

- **`Reveal.jsx`** gana una prop `variant`: `"up"` (por defecto, actual), `"left"`,
  `"right"`, `"scale"`, `"blur"`. Cada variante es una clase CSS + keyframes en
  `index.css`. La API existente (`delay`, `as`, `className`) no cambia — retrocompatible.
- Aplicación por sección:
  - **Para negocios:** tarjetas en cascada con `scale` (delay escalonado, ya existe la
    base), H2 con `blur`, CTAs de cierre con `scale`.
  - **Sobre mí:** foto entra con `right`, texto con `left`, H2 con `blur`.
  - **Contacto:** H2 con `blur`, CTA con `scale`.
  - **Hero:** mantiene `up` (ya tiene cascada por delays).

### 3. Rendimiento y accesibilidad

- Solo se animan `transform` y `opacity` (composición en GPU, sin reflow).
- Listener de scroll pasivo, trabajo dentro de rAF, sin cálculos por frame fuera de él.
- `prefers-reduced-motion: reduce` desactiva pulso, deriva, parallax y todas las
  variantes de reveal (el contenido aparece visible y estático).
- Cero dependencias nuevas.

## Archivos afectados

| Archivo | Cambio |
|---------|--------|
| `src/index.css` | Keyframes nuevos (variantes de reveal, deriva del sol) |
| `src/components/Reveal.jsx` | Prop `variant` |
| `src/hooks/useScrollParallax.js` | **Nuevo** hook |
| `src/components/Hero.jsx` | Capas del sol + parallax + fix de centrado |
| `src/components/ParaNegociosSection.jsx` | Variantes y cascada |
| `src/components/AboutSection.jsx` | Variantes direccionales |
| `src/components/ContactSection.jsx` | Variantes |

## Verificación

- `npm run build` sin errores.
- Revisión visual en `npm run dev`: parallax del sol al bajar, cascadas por sección,
  centrado del sol corregido, y comportamiento con `prefers-reduced-motion` activado.

## Fuera de alcance

- Efectos scroll-linked continuos dentro de las secciones (descartado por el usuario).
- Scrollspy en el nav, animaciones del Header, cambios de copy o layout.
