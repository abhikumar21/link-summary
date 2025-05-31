import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: '/link-summary/',
  plugins: [
    tailwindcss(),
  ],
})