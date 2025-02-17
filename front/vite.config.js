import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Replace with your backend URL
        changeOrigin: true,              // Ensures that the host header is set to the target
        secure: false,                   // If you're working with an insecure HTTP connection
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Rewrite path (remove `/api` prefix)
      },
    },
  },
  
})