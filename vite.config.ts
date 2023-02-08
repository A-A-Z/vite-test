/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), svgr()],
  base: '/vite-test/',
  resolve: {
    alias: {
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      features: fileURLToPath(new URL('./src/features', import.meta.url)),
      global: fileURLToPath(new URL('./src/global', import.meta.url)),
      hooks: fileURLToPath(new URL('./src/hooks', import.meta.url)),
      lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
      store: fileURLToPath(new URL('./src/redux', import.meta.url)),
      utils: fileURLToPath(new URL('./src/utils', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'c8'
    }
  }
})
