// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Essential for v4

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add this here
  ],
  server: {
    proxy: {
      '/api-proxy': {
        target: 'http://exam.kodevite.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-proxy/, ''),
      },
    },
  },
})