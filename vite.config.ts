import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/CalendarApp/',  // <- REQUIRED for project pages
  plugins: [react()],
})