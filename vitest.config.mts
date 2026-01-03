import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    maxWorkers: 1,
    environment: 'jsdom',
    setupFiles: ['test/helpers/setup.ts']
  },
})
