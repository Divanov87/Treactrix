import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL),
      'process.env.REACT_APP_IP_SERVICE_URL': JSON.stringify(env.REACT_APP_IP_SERVICE_URL),
      'process.env.REACT_APP_GEO_LOCATION_API_KEY': JSON.stringify(env.REACT_APP_GEO_LOCATION_API_KEY)
    },

  server: {
    host: '0.0.0.0',
    port: 5173,
  },

  plugins: [react(), VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.js',
    // registerType: 'autoUpdate',
    registerType: 'prompt',
    injectRegister: 'auto',
    manifest: {
      name: 'Theatrix - Discover Events, Buy Tickets, & More!',
      short_name: 'Theatrix',
      description: 'Discover Events, Buy Tickets, & More!',
      theme_color: '#000000',
      background_color: '#000000',
      display: 'standalone',
      scope: './',
      start_url: '/',
      icons: [
        {
          src: 'assets/pwa/manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'assets/pwa/manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: 'assets/pwa/manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'assets/pwa/manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico,jpg}'],
      globIgnores: [
        'node_modules/**/*',
        'sw.js',
        'workbox-*.js',
        '**/manifest-*.png',
      ],
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
}
})