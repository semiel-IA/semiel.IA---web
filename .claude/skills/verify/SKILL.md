---
name: verify
description: Receta para verificar cambios visuales/de comportamiento de la landing en runtime (Vite + Chrome headless)
---

# Verificar la landing en runtime

## Levantar la app

```powershell
npm run dev   # Vite en http://localhost:5173 (dejar en background)
```

## Manejar el navegador

No hay Playwright en el proyecto (y Application Control bloquea binarios nativos
descargados). Lo que funciona en esta máquina: **playwright-core (JS puro) + el
Chrome del sistema**:

```powershell
# en un directorio temporal/scratchpad, NO en el proyecto
npm i playwright-core
```

```js
const { chromium } = require("playwright-core");
const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});
```

## Flujos que vale la pena manejar

- **Hero / sol:** el parallax escribe la variable CSS `--parallax` (0→1) como
  estilo inline de `section#inicio` (la setea `useScrollParallax`). Tras
  `window.scrollTo(0, 600)` debe crecer; el wrapper del sol
  (`#inicio > div:nth-child(1)`) debe seguir centrado (centro del rect ≈ centro
  del viewport) y con translateY > 0.
- **Reveals:** los elementos `.reveal` ganan `.is-visible` al entrar en viewport
  (una sola vez). OJO: con `scrollIntoView`/saltos instantáneos los elementos
  por los que "saltas" no se revelan (el observer nunca los ve intersectar) —
  para verificar el flujo real usa scroll gradual en pasos de ~300 px y al final
  comprueba que no queda ningún `.reveal:not(.is-visible)`.
- **Reduced motion:** contexto con `reducedMotion: "reduce"` → `--parallax` no
  cambia al hacer scroll, `animation-name` de `.solar-pulse` es `none`, y los
  `.reveal` tienen `opacity: 1` de inmediato.
- **Móvil:** viewport 375×700; el sol debe seguir centrado.
- Capturar `console.error` y `pageerror` durante todo el recorrido.

## Gotchas

- Esperar ~1.2-1.6 s tras llegar a una sección para que terminen las cascadas
  (delays de hasta 330 ms + animación de 0.7-0.9 s) antes de capturar.
- `npm run build` es solo el gate de compilación; la evidencia real son las
  capturas y las medidas anteriores.
