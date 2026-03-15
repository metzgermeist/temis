// Importar funciones necesarias para configurar Vite.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // En GitHub Pages el sitio vive bajo /temis/, en desarrollo se sirve desde /
  base: command === 'build' ? '/temis/' : '/'
}))

