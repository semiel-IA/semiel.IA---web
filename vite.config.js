import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Content-Security-Policy del sitio. 'unsafe-inline' en style-src es necesario
// porque los componentes usan estilos inline de React (style={{}}); para scripts
// NO se permite inline, así que cualquier <script> inyectado (XSS) queda bloqueado.
const CSP =
  "default-src 'self'; " +
  "script-src 'self'; " +
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
  "font-src 'self' https://fonts.gstatic.com; " +
  "img-src 'self' data:; " +
  "connect-src 'self'; " +
  "object-src 'none'; " +
  "base-uri 'self'; " +
  "form-action 'self'"

// Inyecta la meta CSP SOLO en el build de producción. En desarrollo Vite y React
// necesitan scripts inline (HMR / Fast Refresh) que 'script-src self' bloquearía.
function cspPlugin() {
  return {
    name: 'inject-csp-meta',
    apply: 'build',
    transformIndexHtml(html) {
      const tag = `<meta http-equiv="Content-Security-Policy" content="${CSP}" />`
      return html.replace('</head>', `  ${tag}\n  </head>`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cspPlugin()],
})
