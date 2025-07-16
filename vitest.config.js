import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
    logLevel: 'error',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,vue}'],
      exclude: ['**/__tests__/**', '**/mock/**'],
      reporter: ['text', 'json', 'html'],
      clean: true
    }
  }
})
