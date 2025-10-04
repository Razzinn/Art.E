import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          components: ['./src/components/NavbarSectionR.jsx', './src/components/HeroSectionR.jsx', './src/components/footer.jsx']
        }
      }
    },
    // Minify CSS
    cssCodeSplit: true,
    // Source maps for production debugging
    sourcemap: false,
    // Asset optimization
    assetsInlineLimit: 4096,
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  // Development server optimizations
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  // CSS optimization
  css: {
    devSourcemap: true
  },
  // Asset handling
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.webp']
})
