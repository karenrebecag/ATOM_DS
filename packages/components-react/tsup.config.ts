import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    // Main entry
    index: 'src/index.ts',

    // Atoms - Active development components
    'atoms/Button': 'src/atoms/Button.tsx',
    'atoms/Badge': 'src/atoms/Badge.tsx',
    'atoms/Avatar': 'src/atoms/Avatar.tsx',
  },

  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,

  // External dependencies (not bundled)
  external: ['react', 'react-dom'],

  // Tree-shaking friendly
  treeshake: true,

  // Minify for production
  minify: false,

  // Split chunks for better code splitting
  splitting: true,

  // Target modern browsers
  target: 'es2022',

  // React JSX runtime
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
