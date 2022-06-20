import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  //@ts-ignore
  test: {
    globals: true
  },
  plugins: [
    react(),
    //@ts-ignore
    eslintPlugin({ fix: true })
  ]
})
