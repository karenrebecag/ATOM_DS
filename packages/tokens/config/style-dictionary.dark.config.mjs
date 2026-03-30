/**
 * ATOM Design System — Style Dictionary v4 Dark Theme Configuration
 *
 * Separate build pass that:
 * 1. Sources all light tokens (for reference resolution)
 * 2. Overlays dark theme overrides (later source wins in SD merge)
 * 3. Outputs ONLY the overridden tokens into dark.css
 *    wrapped in [data-theme="dark"] selector
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

// ── Collect dark theme token paths ────────────────────────────

function walkTokens(obj, path, paths) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const newPath = [...path, key];
    if (value && typeof value === 'object' && '$value' in value) {
      paths.add(newPath.join('.'));
    } else if (value && typeof value === 'object') {
      walkTokens(value, newPath, paths);
    }
  }
}

function collectDarkPaths() {
  const darkDir = resolve(import.meta.dirname, '..', 'themes', 'dark');
  const paths = new Set();

  try {
    const files = readdirSync(darkDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const data = JSON.parse(readFileSync(join(darkDir, file), 'utf-8'));
      walkTokens(data, [], paths);
    }
  } catch {
    // No dark theme files — dark.css will be empty
  }

  return paths;
}

const darkPaths = collectDarkPaths();

function isDarkOverride(token) {
  return darkPaths.has(token.path.join('.'));
}

// ── Config ────────────────────────────────────────────────────

export default {
  // Source order matters: light tokens first, dark overrides second.
  // SD merges by token path — later source wins for matching paths.
  source: [
    'src/**/*.json',
    'themes/dark/**/*.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'dark.css',
          format: 'css/variables',
          filter: isDarkOverride,
          options: {
            outputReferences: true,
            selector: '[data-theme="dark"]',
          },
        },
      ],
    },
  },
};
