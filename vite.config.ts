import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // Netlify serve o site na raiz do domínio
  base: '/',
  build: {
    target: 'es2020',
    cssMinify: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Vendors em chunks separados => melhor cache entre deploys
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          motion: ['motion/react'],
          gsap: ['gsap'],
          lenis: ['lenis'],
        },
      },
    },
  },
})
