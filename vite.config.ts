import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { harnessSettingsPlugin } from './scripts/harness-settings-plugin.ts'
import { harnessUsagePlugin } from './scripts/harness-usage-plugin.ts'
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // Hosted viewing copy is served at thedesignharness.com/demo
  base: process.env.VERCEL ? '/demo/' : '/',
  plugins: [react(), harnessSettingsPlugin(), harnessUsagePlugin()],
  server: {
    host: '127.0.0.1',
    port: 3002,
    strictPort: false,
  },
  preview: {
    host: '127.0.0.1',
    port: 3002,
    strictPort: false,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(dirname, 'index.html'),
        // Add standalone prototype HTML files here if needed
      },
    },
  },
})
