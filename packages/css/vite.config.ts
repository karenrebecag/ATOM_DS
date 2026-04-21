import { defineConfig, type Plugin } from 'vite'
import { resolve } from 'path'
import { writeFileSync } from 'fs'

// Emits dist/fonts.css as a standalone file post-build.
// LightningCSS drops external @import url() in bundler mode,
// so this plugin writes the file directly instead.
const emitFonts: Plugin = {
  name: 'atom/emit-fonts',
  closeBundle() {
    writeFileSync(
      resolve(__dirname, 'dist/fonts.css'),
      `/* @atomchat.io/css — Inter variable font (100–900)\n   Import this file before atom.css to load the DS typeface. */\n@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');\n`
    )
  },
}

export default defineConfig({
  plugins: [emitFonts],
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
