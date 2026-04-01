import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    // Main entry
    index: 'src/index.ts',

    // Atoms
    'atoms/Avatar': 'src/atoms/Avatar.tsx',
    'atoms/Badge': 'src/atoms/Badge.tsx',
    'atoms/Button': 'src/atoms/Button.tsx',
    'atoms/Checkbox': 'src/atoms/Checkbox.tsx',
    'atoms/Chip': 'src/atoms/Chip.tsx',
    'atoms/StatusIcon': 'src/atoms/StatusIcon.tsx',
    'atoms/Tag': 'src/atoms/Tag.tsx',
    'atoms/Text': 'src/atoms/Text.tsx',
    'atoms/Toggle': 'src/atoms/Toggle.tsx',

    // Molecules
    'molecules/AvatarGroup': 'src/molecules/AvatarGroup.tsx',

    // Layout
    'layout/Container': 'src/layout/Container.tsx',
    'layout/Stack': 'src/layout/Stack.tsx',
    'layout/Grid': 'src/layout/Grid.tsx',
    'layout/Inline': 'src/layout/Inline.tsx',
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
