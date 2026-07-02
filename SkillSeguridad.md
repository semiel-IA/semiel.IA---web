---
name: seguridad-web
description: Audita proyectos web (React/Vite, HTML/CSS/JS, n8n, integraciones con WhatsApp Business API u otras APIs) en busca de vulnerabilidades de seguridad, secretos expuestos, malas prácticas y riesgos de robo de información. Activa esta skill SIEMPRE que el usuario pida revisar la seguridad de un proyecto, pregunte si su código "es seguro", si "puede ser hackeado", si hay riesgo de "robo de información" o "fuga de datos", pida un "audit de seguridad", quiera revisar antes de lanzar a producción, o mencione claves de API, tokens, variables de entorno, webhooks, formularios, o credenciales dentro de un proyecto. También actívala proactivamente cuando el usuario esté a punto de deployar o compartir código que podría contener secretos hardcodeados. Esta skill es exclusivamente para revisión defensiva de código propio del usuario — nunca para generar exploits, atacar sistemas de terceros, o hacer pentesting activo sin autorización explícita y por escrito del dueño del sistema.
---

# Seguridad Web

Skill de auditoría de seguridad defensiva para proyectos web. El objetivo es encontrar y explicar riesgos reales en código que el usuario ya posee o está construyendo — nunca generar herramientas de ataque ni intentar explotar sistemas en vivo.

## Alcance y límites (leer primero)

- **Solo revisión estática y de configuración.** Lectura de código, dependencias, archivos de configuración y estructura del proyecto. No se hacen peticiones activas contra servidores de producción, no se intentan inyecciones reales, no se prueban credenciales.
- **Solo proyectos del propio usuario.** Si el proyecto no es claramente del usuario (ej. pide auditar un sitio de un tercero sin indicar que es suyo o que tiene autorización), pregunta primero.
- **Nunca generar exploits, payloads de ataque, ni código que facilite acceso no autorizado**, incluso "solo para probar". Si el usuario pide eso explícitamente, redirige a la auditoría defensiva en su lugar.
- El resultado es siempre un **reporte + recomendaciones**, no cambios de código aplicados automáticamente — a menos que el usuario pida explícitamente que corrijas algo puntual después de ver el reporte.

## Proceso

### 1. Definir el alcance con el usuario

Antes de escanear, confirma (si no es obvio del contexto):
- ¿Qué carpeta/repo se audita? (todo el proyecto, o una parte específica)
- ¿Incluye solo frontend, o también backend/n8n/webhooks/integraciones?
- ¿El proyecto ya está en producción o todavía no se ha lanzado?

Si el contexto ya lo deja claro (ej. "revisa mi landing antes de subirla"), no preguntes por preguntar — procede con el alcance razonable e indícalo al inicio del reporte.

### 2. Escanear en este orden

1. **Secretos y credenciales expuestas** — la prioridad #1, porque es la fuga más común y más grave.
   - Busca API keys, tokens, contraseñas, connection strings hardcodeados en el código fuente (no solo en `.env`).
   - Verifica que `.env`, `.env.local`, etc. estén en `.gitignore`.
   - Revisa si hay claves visibles en el bundle de producción (variables `VITE_*` o `NEXT_PUBLIC_*` mal usadas para secretos que deberían quedarse en el servidor — estas SIEMPRE terminan en el JS del cliente, visibles para cualquiera).
   - Revisa historial de git si es accesible (`git log -p` en busca de secretos commiteados alguna vez, aunque ya se hayan "borrado" del archivo actual).

2. **Dependencias** — `npm audit` (o el gestor correspondiente) para vulnerabilidades conocidas en librerías. Prioriza las marcadas como high/critical.

3. **Frontend (React/HTML/JS)**
   - Uso de `dangerouslySetInnerHTML` o `innerHTML` con datos no sanitizados → riesgo de XSS.
   - Enlaces `target="_blank"` sin `rel="noopener noreferrer"` → riesgo de tabnabbing.
   - Formularios sin validación ni límites de longitud/tipo en el cliente (y confirma que tampoco se confía solo en la validación del cliente).
   - Datos sensibles guardados en `localStorage`/`sessionStorage` (tokens, datos personales) — accesibles por cualquier script que corra en la página.
   - Dependencias cargadas desde CDNs sin `integrity` (Subresource Integrity) cuando es información crítica.

4. **Configuración y despliegue**
   - HTTPS forzado (sin fallback a HTTP).
   - Headers de seguridad básicos si el hosting lo permite: CSP, X-Frame-Options, X-Content-Type-Options.
   - CORS: verifica que APIs propias no acepten `Access-Control-Allow-Origin: *` si manejan datos sensibles o acciones autenticadas.
   - Archivos que no deberían ser públicos (`.env`, `.git/`, backups, `CLAUDE.md` con contexto interno, etc.) accesibles directamente por URL.

5. **Integraciones y webhooks (relevante para el stack de n8n / WhatsApp Business API)**
   - Webhooks de n8n sin autenticación (header secret, HMAC, o similar) — cualquiera que adivine la URL puede dispararlos.
   - Tokens de WhatsApp Business API / Gmail / otras APIs guardados en nodos de n8n sin usar credenciales cifradas del propio n8n.
   - Endpoints que reciben datos de formularios o WhatsApp sin rate limiting → riesgo de spam/abuso o de saturar la automatización.
   - Validación de que los datos que llegan por webhook realmente vienen de la fuente esperada (verificación de firma/origen), no solo confiar en la URL siendo "secreta".

6. **Manejo de datos de clientes/usuarios**
   - Si el proyecto captura datos personales (formularios de contacto, leads, números de teléfono), confirma que no se exponen en respuestas de API, logs públicos, o archivos accesibles.
   - Si aplica, menciona brevemente si hay implicaciones de protección de datos según la jurisdicción del negocio (sin dar asesoría legal — solo una nota de que existe el tema).

Para el detalle exhaustivo de cada categoría (qué buscar exactamente, comandos de grep sugeridos, ejemplos de código vulnerable vs. seguro), lee `references/checklist.md`.

### 3. Reportar hallazgos

Usa este formato para cada hallazgo:

```
[SEVERIDAD] Título corto del problema
Archivo: ruta/al/archivo.jsx (línea si aplica)
Qué encontré: explicación breve y concreta, sin jerga innecesaria.
Por qué importa: qué podría pasar si no se corrige (en términos de negocio, no solo técnicos).
Cómo corregirlo: pasos concretos o snippet mínimo si aplica.
```

Severidades:
- **Crítico** — explotable ahora mismo, expone datos o acceso (ej. API key de producción visible en el bundle).
- **Alto** — riesgo real pero requiere un paso adicional del atacante (ej. XSS en un campo poco usado).
- **Medio** — mala práctica que aumenta el riesgo general pero no es explotable directamente hoy.
- **Bajo** — mejora recomendada, higiene general.

Cierra el reporte con:
- Un resumen de 2-3 líneas del estado general (ej. "el proyecto está bien para lanzar una vez corrijas los 2 puntos críticos").
- Una lista priorizada de qué corregir primero.

### 4. Después del reporte

Pregunta si quiere que apliques las correcciones puntuales ahora mismo (empezando por los críticos), o si prefiere revisarlas y pedirlas una por una. No apliques cambios de código sin que el usuario lo pida explícitamente después de ver el reporte — la auditoría y la corrección son dos pasos separados.
