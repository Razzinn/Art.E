import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Optimize JSX runtime
      jsxRuntime: 'automatic',
    }),
    // Bundle analyzer (run with npm run analyze)
    visualizer({
      open: false,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2015',
    // Performance optimizations
    rollupOptions: {
      output: {
        // Advanced code splitting
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            return 'vendor';
          }
          // Component chunks
          if (id.includes('/src/componentisecondarisezioni/')) {
            return 'pages';
          }
          if (id.includes('/src/components/')) {
            return 'components';
          }
          if (id.includes('/src/contexts/')) {
            return 'contexts';
          }
        },
        // Optimize chunk names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          if (/\.css$/i.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
      // Reduce bundle size warnings
      onwarn(warning, warn) {
        // Suppress certain warnings
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warning);
      },
    },
    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      format: {
        comments: false, // Remove comments
      },
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Source maps disabled for production (enable for debugging)
    sourcemap: false,
    // Asset optimization
    assetsInlineLimit: 4096, // 4kb - inline small assets as base64
    // Chunk size warnings
    chunkSizeWarningLimit: 1000, // 1000kb warning threshold
    // Enable CSS minification
    cssMinify: true,
    // Report compressed size
    reportCompressedSize: true,
  },
  // Development server optimizations
  server: {
    port: 3000,
    open: true,
    cors: true,
    // Enable HMR (Hot Module Replacement)
    hmr: {
      overlay: true,
    },
    // Watch options
    watch: {
      usePolling: false,
    },
  },
  // Preview server (production build preview)
  preview: {
    port: 4173,
    open: true,
  },
  // CSS optimization
  css: {
    devSourcemap: true,
    // PostCSS optimization
    postcss: {
      plugins: [],
    },
  },
  // Optimized dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: [],
  },
  // Asset handling
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.webp'],
  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@assets': '/src/assets',
    },
  },
})
