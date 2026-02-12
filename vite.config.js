// Importar funciones necesarias para configurar Vite.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuracion de Vite para habilitar React y JSX.
export default defineConfig({
  plugins: [react()],
  base: '/temis/'
})


