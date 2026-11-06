
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

const BASE_PATH = '/Celebration-of-life/';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: BASE_PATH,

    plugins: [
      react(),

      VitePWA({
        registerType: 'prompt',
        injectRegister: 'auto',

        includeAssets: [],

        manifest: {
          id: BASE_PATH,
          name: 'Celebration of Life',
          short_name: 'COL',
          description:
            'Share your memories, celebrate beautiful moments and connect with people around the world.',

          theme_color: '#7C3AED',
          background_color: '#FFF8FC',

          display: 'standalone',
          orientation: 'portrait',
          start_url: BASE_PATH,
          scope: BASE_PATH,

          categories: [
            'social',
            'lifestyle',
            'entertainment'
          ],

          icons: [
            {
              src: `${BASE_PATH}icons/icon-192.png`,
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: `${BASE_PATH}icons/icon-512.png`,
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: `${BASE_PATH}icons/icon-512-maskable.png`,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ]
        },

        workbox: {
          cleanupOutdatedCaches: true,
          clientsClaim: true,

          globPatterns: [
            '**/*.{js,css,html,ico,png,svg,webp,woff2}'
          ],

          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,

          navigateFallback: 'index.html'
        },

        devOptions: {
          enabled: false
        }
      })
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(
          new URL('./src', import.meta.url)
        )
      }
    },

    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true
    },

    preview: {
      host: '0.0.0.0',
      port: 4173,
      strictPort: true
    },

    build: {
      target: 'es2022',
      outDir: 'dist',
      assetsDir: 'assets',

      sourcemap: false,
      minify: 'esbuild',
      cssCodeSplit: true,

      emptyOutDir: true,
      reportCompressedSize: true,

      chunkSizeWarningLimit: 1000
    },

    esbuild: {
      drop: isProduction
        ? ['debugger']
        : []
    }
  };
});
