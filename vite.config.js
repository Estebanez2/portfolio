import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// REEMPLAZA 'nombre-de-tu-repo' POR EL NOMBRE REAL DE TU REPOSITORIO EN GITHUB
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', 
})