import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.json',
      outDir: 'dist',
      insertTypesEntry: true,
      rollupTypes: true,
      cleanVueFileName: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.spec.ts', 'node_modules']
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts')
      },
      name: 'AtomComponentsVue',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', '@atomchat.io/css', '@atomchat.io/tokens'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'atom-components.css'
          }
          return assetInfo.name ?? 'asset'
        }
      }
    },
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2022',
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
