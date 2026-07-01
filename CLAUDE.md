# CLAUDE.md — Semiel.IA · Landing / Portafolio

Este archivo pone en contexto a Claude sobre **qué estamos construyendo** en este proyecto.
Léelo antes de escribir código.

---

## 1. Qué estamos construyendo

Una **landing page tipo portafolio** (una sola página) para presentar los servicios de una
**agencia de automatizaciones con IA**.

- **Marca:** Jose Mejía ~ **Semiel.IA**
- **Objetivo:** mostrar los servicios de automatización con IA y **captar clientes** (leads).
- **Formato:** single-page, con **navegación por anclas**.
- **Idioma:** español por defecto, con opción de ver la página en inglés.

La estética de referencia está en `temaportfolio.jpg`: un sol cálido naranja-amarillo sobre
un degradado rojo oscuro → naranja (atardecer). Todo el diseño respira esa sensación cálida.

---

## 2. Stack y estructura

**React + Vite + Tailwind CSS.** El proyecto nació como HTML/CSS/JS puro, pero la primera
versión funcional se construyó como componente React (`semiel-ia-landing.jsx`) y decidimos
adoptar ese stack en lugar de reescribirlo a vanilla. Se montó con Vite y se descompuso el
componente monolítico en piezas reutilizables.

**Importante — Tailwind v3, no v4:** el motor nativo de Tailwind v4 (`@tailwindcss/oxide`,
un binario Rust) es bloqueado por la política de Application Control de Windows en esta
máquina. Por eso el proyecto usa **Tailwind v3** vía PostCSS (100% JS, sin binarios nativos).
No actualizar a v4 sin resolver antes esa restricción.

Estructura de archivos:

```
Portfolio/
├─ index.html              # shell HTML, entry point de Vite
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ src/
│  ├─ main.jsx              # bootstrap de React
│  ├─ App.jsx                # compone Header + Hero + Services + Footer
│  ├─ index.css              # fuentes, @tailwind directives, keyframes
│  ├─ theme/
│  │  └─ colors.js           # paleta COLORS (única fuente de verdad de color)
│  ├─ data/
│  │  ├─ navLinks.js         # enlaces de navegación (anclas)
│  │  └─ services.js         # tarjetas de servicios
│  └─ components/
│     ├─ Header.jsx          # nav fija + menú móvil + selector ES/EN
│     ├─ Hero.jsx             # sol animado, tagline, H1, CTA
│     ├─ Services.jsx         # grid de servicios
│     ├─ Footer.jsx
│     ├─ Grain.jsx            # textura de grano SVG sobre toda la página
│     ├─ NavPill.jsx
│     └─ icons/WhatsAppIcon.jsx
├─ public/                   # estáticos servidos tal cual (favicon)
└─ temaportfolio.jpg          # imagen de referencia de estética (no se sirve en la app)
```

Reglas:
- Componentes pequeños y con una responsabilidad clara; datos (nav, servicios) van en `src/data/`, no hardcodeados en el JSX.
- Toda referencia de color pasa por `COLORS` en `src/theme/colors.js` — no colores sueltos.
- Código simple y comentado **en español** cuando el comentario aporte algo no obvio.

### Comandos
```
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo (Vite)
npm run build     # build de producción a dist/
npm run preview   # previsualizar el build
```

---

## 3. Guía de estilo (diseño / estética)

**Layout:** single-page con **header sticky** que enlaza por anclas a cada sección. Estética
cálida de atardecer, inspirada en `temaportfolio.jpg`: sol difuminado, degradado a negro,
resplandor de horizonte, textura de grano sutil.

### Paleta de colores (`src/theme/colors.js`)
| Token | Color | Uso |
|-------|-------|-----|
| `void` | `#0b0402` | Fondo base (negro cálido) |
| `voidSoft` | `#130603` | Variante de fondo |
| `emberEdge` | `#6e0f04` | Borde exterior del sol / degradados |
| `emberCore` | `#f2540d` | **Acento principal** (CTA, links activos, íconos) |
| `emberCoreHover` | `#ff6a24` | Hover del acento |
| `solarGold` | `#ffb238` | Centro del sol / detalles dorados |
| `horizonGlow` | `#ff7a1f` | Resplandor de horizonte en el Hero |
| `linen` | `#f6ece0` | Texto principal (crema) |
| `linenDim` | `rgba(246,236,224,0.72)` | Texto secundario |
| `dust` | `#b89484` | Texto terciario / metadatos |
| `border`, `borderStrong` | `rgba(246,236,224,*)` | Bordes sutiles |
| `cardBg`, `cardBgHover` | `rgba(246,236,224,*)` | Fondo de tarjetas |

> Nota: esta paleta reemplaza a la especificación original (`#920001` / `#F15701`) — es la
> que quedó implementada en la primera versión funcional y es la fuente de verdad actual.

### Tipografía
- **Fraunces** (serif, itálica) → titulares (`font-display`).
- **Inter** → cuerpo de texto (`font-body`).
- Ambas se cargan vía Google Fonts en `src/index.css`.

### Escala tipográfica
- **H1:** `text-4xl sm:text-6xl md:text-7xl`, `font-display italic font-semibold`, color `linen`.
- H2/H3: derivados proporcionalmente, mismo `font-display`.

### Otros
- Diseño **responsive**, móvil primero (breakpoints de Tailwind: `sm`, `md`, `lg`).
- Accesible: HTML semántico, `alt` en imágenes, `aria-label` en controles icon-only, buen contraste.
- Animaciones sutiles (`solar-pulse`) respetan `prefers-reduced-motion`.

---

## 4. Secciones de la página (anclas)

El header enlaza a estas secciones (`src/data/navLinks.js`):

| Ancla | Sección | Estado |
|-------|---------|--------|
| `#servicios` | **Servicios** | Implementada (`Services.jsx`) |
| `#aprende` | **Aprende** (contenido educativo) | Pendiente de construir |
| `#mentorias` | **Mentorías 1a1** | Pendiente de construir |
| `#sobre-mi` | **Sobre mí** | Pendiente de construir |
| `#contacto` | **Contacto** | Pendiente de construir (hoy el CTA apunta a WhatsApp directo) |

> Estas anclas reemplazan el set original (`#casos`, `#proceso`) — reflejan el rumbo real
> del producto: contenido/mentorías además de servicios de automatización.

---

## 5. Idioma / i18n

- **Selector de idioma ES / EN** en la barra superior (`Header.jsx`, componente `LangToggle`).
- Estado actual: el toggle cambia visualmente pero **aún no traduce contenido** — falta
  integrar la traducción real.
- Plan pendiente: integrar **Google Translate** con soporte para DE, FR, EN, IT, PT-BR.
- Idioma por defecto al cargar: **español**.
- Todo el copy visible se escribe en español (con soporte de traducción encima).

---

## 6. Convenciones de trabajo

- Copy en español; la traducción se resuelve con el selector de idioma.
- Componentes en `src/components/`, datos en `src/data/`, color en `src/theme/colors.js` —
  no dupliques estos valores dentro de un componente.
- Priorizar rendimiento y accesibilidad (semántica, `alt`, contraste, responsive móvil primero).
- Mantener la coherencia con la paleta y la tipografía definidas arriba.
- Cada cambio funcional se commitea y se sube a GitHub
  (`https://github.com/semiel-IA/semiel.IA---web`).
