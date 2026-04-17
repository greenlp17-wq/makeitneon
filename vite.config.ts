import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Raise the warning threshold (default 500kb) since we have heavy 3D libs
    chunkSizeWarningLimit: 800,

    rollupOptions: {
      output: {
        /**
         * Manual chunk splitting strategy:
         *
         * Grouping heavy, stable (rarely changes) vendor libs into separate
         * chunks lets browsers cache them independently. Only chunks that
         * actually changed need to be re-downloaded on deploy.
         *
         * Load order on the homepage:
         *   react-vendor  →  immediate (always needed)
         *   animations    →  immediate (GSAP + FM used on every page)
         *   three-vendor  →  lazy (only on labs/3D pages)
         *   forms         →  lazy (calculator / order pages)
         *   ui-vendor     →  lazy (shop/portfolio heavy UI)
         */
        manualChunks(id) {
          // ── React core ──────────────────────────────────────────────────
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/') ||
              id.includes('node_modules/react-helmet-async/')) {
            return 'react-vendor';
          }

          // ── Animation engines ───────────────────────────────────────────
          if (id.includes('node_modules/gsap/') ||
              id.includes('node_modules/@gsap/') ||
              id.includes('node_modules/framer-motion/')) {
            return 'animations';
          }

          // ── Three.js / R3F (heavy 3D stack) ──────────────────────────
          if (id.includes('node_modules/three/') ||
              id.includes('node_modules/@react-three/') ||
              id.includes('node_modules/postprocessing/')) {
            return 'three-vendor';
          }

          // ── Forms & validation ──────────────────────────────────────────
          if (id.includes('node_modules/react-hook-form/') ||
              id.includes('node_modules/@hookform/') ||
              id.includes('node_modules/zod/')) {
            return 'forms';
          }

          // ── i18n ────────────────────────────────────────────────────────
          if (id.includes('node_modules/i18next') ||
              id.includes('node_modules/react-i18next/')) {
            return 'i18n';
          }

          // ── UI utilities ────────────────────────────────────────────────
          if (id.includes('node_modules/lucide-react/') ||
              id.includes('node_modules/@base-ui/') ||
              id.includes('node_modules/clsx/') ||
              id.includes('node_modules/tailwind-merge/') ||
              id.includes('node_modules/class-variance-authority/')) {
            return 'ui-vendor';
          }

          // ── Email / external services ───────────────────────────────────
          if (id.includes('node_modules/@emailjs/') ||
              id.includes('node_modules/opentype.js/')) {
            return 'services';
          }
        },
      },
    },
  },
})
