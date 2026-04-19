/**
 * ATOM Design System — Style Dictionary v4 Configuration
 *
 * Compiles W3C DTCG tokens (JSON) → CSS, SCSS, JS, TypeScript, JSON
 * Preserves var() references via outputReferences
 *
 * Custom transforms registered in ./transforms.mjs clean Figma
 * spacing names using value-based canonical scale lookup.
 */

import './transforms.mjs'

// ── Explicit transform lists ────────────────────────────────────
// No transformGroup — full control over execution order.
// Custom transforms inserted at precise positions.

const CSS_TRANSFORMS = [
  'attribute/cti',
  'name/kebab',
  'atom/spacing/canonical-name',
  'time/seconds',
  'html/icon',
  'size/rem',
  'atom/spacing/px',
  'color/css',
  'asset/url',
  'fontFamily/css',
  'cubicBezier/css',
  'strokeStyle/css/shorthand',
  'border/css/shorthand',
  'typography/css/shorthand',
  'transition/css/shorthand',
  'shadow/css/shorthand',
]

const SCSS_TRANSFORMS = [...CSS_TRANSFORMS]

// JS/TS/JSON use the built-in transformGroup — no custom transforms needed.
// Canonical spacing naming only matters for CSS/SCSS output.

// ── Token tier filters ──────────────────────────────────────────

const FOUNDATION_GROUPS = [
  'Primitive',
]

const SEMANTIC_GROUPS = [
  'bg', 'fg', 'border', 'brand', 'dialog', 'backdrop', 'glass',
]

const COMPONENT_GROUPS = [
  'badge', 'buttons', 'checkbox', 'radio', 'toggle', 'chip', 'tags', 'skeleton',
  'frosted-glass', 'glassmorphism', 'acrylic',
  'container', 'stack', 'inline', 'grid', 'section',
]

function isFoundation(token) {
  return FOUNDATION_GROUPS.includes(token.path[0])
}

function isSemantic(token) {
  return SEMANTIC_GROUPS.includes(token.path[0])
}

function isComponent(token) {
  return COMPONENT_GROUPS.includes(token.path[0])
}

const JS_RESERVED = new Set([
  'abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch',
  'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do',
  'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final',
  'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import',
  'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new',
  'null', 'package', 'private', 'protected', 'public', 'return', 'short',
  'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
  'transient', 'true', 'try', 'typeof', 'undefined', 'var', 'void',
  'volatile', 'while', 'with', 'yield',
])

function isValidJsIdentifier(token) {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token.name) && !JS_RESERVED.has(token.name)
}

// ── Config ──────────────────────────────────────────────────────

export default {
  log: {
    warnings: 'warn',
    verbosity: 'default',
    errors: {
      brokenReferences: 'console',
    },
  },
  source: ['src/**/*.json'],
  platforms: {
    // ── CSS Custom Properties ──────────────────────────────────
    css: {
      transforms: CSS_TRANSFORMS,
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
      transforms: SCSS_TRANSFORMS,
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
        {
          destination: 'tokens.json',
          format: 'json/flat',
        },
        {
          destination: 'tokens-nested.json',
          format: 'json/nested',
          options: { outputReferences: true },
        },
      ],
    },
  },
}
