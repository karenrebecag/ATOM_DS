/**
 * ATOM Design System — Style Dictionary v4 Configuration
 *
 * Compiles W3C DTCG tokens (JSON) → CSS, SCSS, JS, TypeScript, JSON
 * Preserves var() references via outputReferences
 */

const FOUNDATION_GROUPS = [
  'Primitive',
];

const SEMANTIC_GROUPS = [
  'bg', 'fg', 'border', 'brand', 'dialog', 'backdrop', 'glass',
];

const COMPONENT_GROUPS = [
  'badge', 'buttons', 'checkbox', 'radio', 'toggle', 'chip', 'tags', 'skeleton',
  'frosted-glass', 'glassmorphism', 'acrylic',
  'container', 'stack', 'inline', 'grid', 'section',
];

function isFoundation(token) {
  return FOUNDATION_GROUPS.includes(token.path[0]);
}

function isSemantic(token) {
  return SEMANTIC_GROUPS.includes(token.path[0]);
}

function isComponent(token) {
  return COMPONENT_GROUPS.includes(token.path[0]);
}

function isValidJsIdentifier(token) {
  return !/^\d/.test(token.name);
}

export default {
  source: ['src/**/*.json'],
  platforms: {
    // ── CSS Custom Properties ──────────────────────────────────
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true },
        },
        {
          destination: 'foundation.css',
          format: 'css/variables',
          filter: isFoundation,
          options: { outputReferences: true },
        },
        {
          destination: 'semantic.css',
          format: 'css/variables',
          filter: isSemantic,
          options: { outputReferences: true },
        },
        {
          destination: 'components.css',
          format: 'css/variables',
          filter: isComponent,
          options: { outputReferences: true },
        },
      ],
    },

    // ── SCSS Variables ─────────────────────────────────────────
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
          options: { outputReferences: true },
        },
      ],
    },

    // ── JavaScript (ESM + CJS) ─────────────────────────────────
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [
        { destination: 'tokens.js', format: 'javascript/es6', filter: isValidJsIdentifier },
        { destination: 'tokens.cjs', format: 'javascript/module-flat' },
      ],
    },

    // ── TypeScript Declarations ────────────────────────────────
    ts: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
          filter: isValidJsIdentifier,
          options: { outputStringLiterals: true },
        },
      ],
    },

    // ── JSON Flat (tooling, Figma sync) ────────────────────────
    json: {
      transformGroup: 'js',
      buildPath: 'build/json/',
      files: [
        { destination: 'tokens.json', format: 'json/flat' },
      ],
    },
  },
};
