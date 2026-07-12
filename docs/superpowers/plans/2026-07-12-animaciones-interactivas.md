# Animaciones interactivas — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sol del Hero con parallax de scroll (y fix del centrado) + reveals en cascada con variantes direccionales en todas las secciones.

**Architecture:** Un hook `useScrollParallax` escribe una variable CSS `--parallax` (0→1) en la sección Hero vía rAF; las capas del sol la consumen con `calc()` en `transform`/`opacity`. El componente `Reveal` gana una prop `variant` mapeada a keyframes CSS nuevos. Cero dependencias nuevas.

**Tech Stack:** React 18 + Vite + Tailwind v3 (PostCSS). Sin framer-motion (decisión de proyecto). Sin test runner en el proyecto: la verificación de cada tarea es `npm run build` + inspección visual en `npm run dev`.

**Spec:** `docs/superpowers/specs/2026-07-12-animaciones-interactivas-design.md`

## Global Constraints

- **Tailwind v3, no v4** (Application Control bloquea el binario nativo de v4).
- Solo animar `transform` y `opacity` (y `filter` en el blur de entrada); nada que cause reflow.
- Todo efecto debe desactivarse con `prefers-reduced-motion: reduce`.
- Colores solo desde `COLORS` (`src/theme/colors.js`); copy solo desde `src/i18n/translations.js` (estas tareas no tocan copy).
- Comentarios en español cuando aporten algo no obvio.
- Commit por tarea.

---

### Task 1: Variantes de Reveal (CSS + prop `variant`)

**Files:**
- Modify: `src/index.css` (bloque de reveal, líneas 24-46)
- Modify: `src/components/Reveal.jsx`

**Interfaces:**
- Produces: `<Reveal variant="up"|"left"|"right"|"scale"|"blur">` — `up` es el default y equivale al comportamiento actual. API existente (`delay`, `as`, `className`, `style`) intacta.

- [ ] **Step 1: Reemplazar el bloque de reveal en `src/index.css`**

Sustituir desde el comentario `/* Revelado sutil...` hasta el final del archivo (incluido el bloque `@media (prefers-reduced-motion...)`) por:

```css
/* Revelado sutil al hacer scroll (ver componente Reveal.jsx).
   Variantes: up (default) · left · right · scale · blur */
@keyframes revealUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes revealLeft {
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes revealRight {
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes revealScale {
  from { opacity: 0; transform: translateY(16px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes revealBlur {
  from { opacity: 0; filter: blur(8px); transform: translateY(12px); }
  to   { opacity: 1; filter: blur(0);   transform: translateY(0); }
}

.reveal {
  opacity: 0;
}

.reveal.is-visible {
  animation: revealUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.reveal.reveal-left.is-visible  { animation-name: revealLeft; }
.reveal.reveal-right.is-visible { animation-name: revealRight; }
.reveal.reveal-scale.is-visible { animation-name: revealScale; }
.reveal.reveal-blur.is-visible  { animation-name: revealBlur; animation-duration: 0.9s; }

@media (prefers-reduced-motion: reduce) {
  .solar-pulse { animation: none; }
  .reveal,
  .reveal.is-visible {
    opacity: 1;
    transform: none;
    filter: none;
    animation: none;
  }
}
```

- [ ] **Step 2: Añadir la prop `variant` a `src/components/Reveal.jsx`**

Contenido completo del archivo:

```jsx
import { useEffect, useRef, useState } from "react";

// Envuelve contenido para revelarlo al entrar en viewport (una sola vez).
// Usa IntersectionObserver + CSS (ver .reveal en index.css). Sin dependencias externas.
// variant: "up" (default) | "left" | "right" | "scale" | "blur"
export function Reveal({ children, delay = 0, variant = "up", as: Tag = "div", className = "", style, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // revelar una sola vez
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variantClass = variant === "up" ? "" : `reveal-${variant}`;

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, animationDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: termina con `✓ built in …` sin errores.

- [ ] **Step 4: Verificación visual**

Run: `npm run dev` y abrir la página: los reveals existentes se ven igual que antes (todos usan el default `up`).

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/components/Reveal.jsx
git commit -m "Animaciones: variantes left/right/scale/blur en Reveal (CSS keyframes)"
```

---

### Task 2: Parallax del sol en el Hero (+ fix de centrado)

**Files:**
- Create: `src/hooks/useScrollParallax.js`
- Modify: `src/components/Hero.jsx` (capas del sol y banda de horizonte, líneas 13-38)
- Modify: `src/index.css` (keyframes `solarPulse`, líneas 15-22)

**Interfaces:**
- Consumes: nada de tareas anteriores.
- Produces: `useScrollParallax()` → devuelve un `ref` para colgar en la `<section>`; escribe en ella la variable CSS `--parallax` (número 0→1, 4 decimales) en cada frame de scroll. Con `prefers-reduced-motion` no registra listener (la variable queda en su valor inicial).

- [ ] **Step 1: Crear `src/hooks/useScrollParallax.js`**

```js
import { useEffect, useRef } from "react";

// Escribe en el elemento la variable CSS --parallax (0 → 1) según cuánto de la
// sección ha salido del viewport por arriba. Sin re-renders de React: un solo
// style.setProperty por frame (scroll pasivo + requestAnimationFrame).
// Con prefers-reduced-motion no hace nada (la variable conserva su valor inicial).
export function useScrollParallax() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      el.style.setProperty("--parallax", progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
```

- [ ] **Step 2: Enriquecer `solarPulse` con deriva lenta en `src/index.css`**

Sustituir el bloque actual (keyframes `solarPulse` + `.solar-pulse`) por:

```css
/* Pulso + deriva lenta del sol. Anima el div interior del sol (sin transform
   estático propio), así no pisa el translate del wrapper que lo centra. */
@keyframes solarPulse {
  0%, 100% { opacity: 0.85; transform: scale(1) translate(0, 0); }
  33%      { opacity: 1;    transform: scale(1.02) translate(1.5%, 0.8%); }
  66%      { opacity: 0.9;  transform: scale(1.01) translate(-1.2%, -0.5%); }
}

.solar-pulse {
  animation: solarPulse 14s ease-in-out infinite;
}
```

- [ ] **Step 3: Reestructurar las capas del sol en `src/components/Hero.jsx`**

Añadir el import del hook y colgar el ref en la sección:

```jsx
import { useScrollParallax } from "../hooks/useScrollParallax";
```

```jsx
export function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const sectionRef = useScrollParallax();

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative overflow-hidden"
      style={{ backgroundColor: COLORS.void, "--parallax": 0 }}
    >
```

Sustituir el bloque del sol y la banda de horizonte (los dos primeros divs decorativos y la banda) por:

```jsx
      {/* Sol: el wrapper centra y aplica el parallax (se hunde al bajar);
          el div interior lleva el pulso. Separado en dos capas porque una
          animación CSS reemplaza todo el transform del elemento que anima. */}
      <div
        className="absolute left-1/2"
        style={{
          top: "-18%",
          width: "min(120vw, 900px)",
          height: "min(120vw, 900px)",
          transform: "translate3d(-50%, calc(var(--parallax, 0) * 160px), 0)",
          opacity: "calc(1 - var(--parallax, 0) * 0.3)",
          willChange: "transform",
        }}
      >
        <div
          className="solar-pulse w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at 62% 38%, ${COLORS.solarGold} 0%, ${COLORS.emberCore} 42%, ${COLORS.emberEdge} 72%, transparent 78%)`,
            filter: "blur(2px)",
          }}
        />
      </div>
      {/* Degradado ambiental para fundir el sol con el fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, transparent 30%, ${COLORS.void} 68%)` }}
      />
      {/* Banda de resplandor del horizonte: gana intensidad al hundirse el sol */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          bottom: "22%",
          height: "14%",
          background: `linear-gradient(180deg, transparent 0%, ${COLORS.horizonGlow}55 45%, ${COLORS.horizonGlow}22 65%, transparent 100%)`,
          opacity: "calc(0.6 + var(--parallax, 0) * 0.4)",
        }}
      />
```

El resto del componente no cambia.

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: `✓ built in …` sin errores.

- [ ] **Step 5: Verificación visual**

Run: `npm run dev`. Comprobar: (a) el sol queda **centrado** (fix del bug), (b) al bajar, el sol se hunde suavemente y la banda de horizonte se intensifica, (c) con reduced-motion activado no hay pulso ni parallax.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useScrollParallax.js src/components/Hero.jsx src/index.css
git commit -m "Hero: parallax del sol con scroll + deriva lenta y fix de centrado"
```

---

### Task 3: Variantes en las secciones (cascadas direccionales)

**Files:**
- Modify: `src/components/ParaNegociosSection.jsx`
- Modify: `src/components/AboutSection.jsx`
- Modify: `src/components/ContactSection.jsx`

**Interfaces:**
- Consumes: `<Reveal variant>` de la Task 1 (`"left" | "right" | "scale" | "blur"`).

- [ ] **Step 1: `ParaNegociosSection.jsx`**

Tres cambios puntuales:

1. H2 con blur (línea 66): añadir `variant="blur"`:
```jsx
<Reveal as="h2" variant="blur" delay={80} className="font-display italic font-semibold text-3xl sm:text-4xl md:text-5xl mb-5" style={{ color: COLORS.linen }}>
```

2. Tarjetas en cascada con escala — en `ServiceCard` (línea 10) y en el map (línea 77):
```jsx
<Reveal delay={delay} variant="scale" className="h-full">
```
```jsx
<ServiceCard key={card.title} {...card} delay={i * 110} />
```

3. CTAs de cierre con escala (línea 82):
```jsx
<Reveal delay={120} variant="scale" className="mt-16 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
```

- [ ] **Step 2: `AboutSection.jsx`**

1. Foto entra desde la derecha (línea 14):
```jsx
<Reveal variant="right" className="w-full md:w-[42%] shrink-0">
```

2. H2 con blur (línea 33):
```jsx
<Reveal as="h2" variant="blur" delay={80} className="font-display italic font-semibold text-3xl sm:text-4xl mb-6" style={{ color: COLORS.linen }}>
```

3. Párrafos y cita entran desde la izquierda (líneas 37 y 44):
```jsx
<Reveal variant="left" delay={160} className="font-body text-base sm:text-lg space-y-4" style={{ color: COLORS.linenDim }}>
```
```jsx
<Reveal variant="left" delay={240} className="mt-10">
```

- [ ] **Step 3: `ContactSection.jsx`**

1. H2 con blur (línea 39):
```jsx
<Reveal as="h2" variant="blur" delay={80} className="font-display italic font-semibold text-3xl sm:text-4xl mb-5" style={{ color: COLORS.linen }}>
```

2. CTA de WhatsApp con escala (línea 46):
```jsx
<Reveal delay={240} variant="scale" className="flex flex-col sm:flex-row items-center gap-3">
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: `✓ built in …` sin errores.

- [ ] **Step 5: Verificación visual**

Run: `npm run dev`. Comprobar: cascada de tarjetas en Para negocios, foto desde la derecha y texto desde la izquierda en Sobre mí, títulos con blur-in, CTA de contacto con escala. Repasar también en ancho móvil (~375px).

- [ ] **Step 6: Commit**

```bash
git add src/components/ParaNegociosSection.jsx src/components/AboutSection.jsx src/components/ContactSection.jsx
git commit -m "Secciones: cascadas direccionales con variantes de Reveal"
```
