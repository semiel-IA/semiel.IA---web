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

- **Hero / video:** `useScrollVideo` liga `video.currentTime` de
  `#inicio video` al progreso de scroll (0 arriba del todo → duración completa
  cuando el Hero sale del viewport). El hook asigna el `src` como blob tras un
  fetch: esperar a que `video.duration > 0` antes de medir. Tras scrollear
  (pasos graduales + ~400 ms para que el lerp converja) `currentTime` debe
  crecer; al volver arriba debe acercarse a 0. Las fuentes computadas deben ser
  Iceberg (h1/h2) y Chakra Petch (body), y ningún elemento con
  `font-style: italic`.
- **Reveals:** los elementos `.reveal` ganan `.is-visible` al entrar en viewport
  (una sola vez). OJO: con `scrollIntoView`/saltos instantáneos los elementos
  por los que "saltas" no se revelan (el observer nunca los ve intersectar) —
  para verificar el flujo real usa scroll gradual en pasos de ~300 px y al final
  comprueba que no queda ningún `.reveal:not(.is-visible)`.
- **Reduced motion:** contexto con `reducedMotion: "reduce"` → `currentTime`
  del video del Hero se queda en 0 al scrollear, y los `.reveal` tienen
  `opacity: 1` de inmediato.
- **Móvil:** viewport 375×700; el video debe cubrir el Hero (object-cover).
- Capturar `console.error` y `pageerror` durante todo el recorrido.

## Gotchas

- Esperar ~1.2-1.6 s tras llegar a una sección para que terminen las cascadas
  (delays de hasta 330 ms + animación de 0.7-0.9 s) antes de capturar.
- `npm run build` es solo el gate de compilación; la evidencia real son las
  capturas y las medidas anteriores.
