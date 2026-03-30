import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    // Pure CSS asset build (NOT lib mode)
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        atom: resolve(__dirname, 'src/index.css'),
      },
      output: {
        assetFileNames: '[name].css',
        entryFileNames: '[name].js',
      },
    },
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: {
        chrome: 95,
        firefox: 95,
        safari: 15,
      },
      drafts: {
        customMedia: true,
        nesting: true,
      },
    },
  },
})
