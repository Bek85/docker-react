import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to https://yourname.github.io/repo-name
const base = '/'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: base,
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
