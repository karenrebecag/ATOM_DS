import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es'],
      fileName: () => 'atom.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'atom.css',
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
