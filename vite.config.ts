import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: path.join(__dirname, 'examples'),
  resolve: {
    alias: {
      '@atoms-studio/commercelayer-sdk': path.join(
        __dirname,
        'dist/commercelayer-sdk.esm.js',
      ),
    },
  },
  server: {
    hmr: !process.env.CI,
    port: 3001,
  },
})
