import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative asset URLs for GitHub Pages deployment
  server: {
    port: 5173,
    host: true
  }
})
