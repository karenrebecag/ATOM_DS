#!/usr/bin/env node

/**
 * ATOM Design System — Token Validator
 * Runs BEFORE Style Dictionary build (prebuild script)
 *
 * Validates:
 * 1. Every leaf token has a $type field
 * 2. All alias references ({...}) resolve to existing tokens
 * 3. No circular references
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const TOKENS_DIR = join(__dirname, '..', 'packages', 'tokens', 'src');

let errors = 0;
let warnings = 0;
let tokenCount = 0;

const allTokenPaths = new Set();
const allReferences = [];

function collectJsonFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectJsonFiles(full));
    } else if (entry.endsWith('.json')) {
      files.push(full);
    }
  }
  return files;
}

function isTokenLeaf(obj) {
  return obj !== null && typeof obj === 'object' && '$value' in obj;
}

function walkTokens(obj, path, file) {
  if (isTokenLeaf(obj)) {
    tokenCount++;
    const tokenPath = path.join('.');
    allTokenPaths.add(tokenPath);

    // Check for $type (can be inherited from parent)
    if (!obj.$type) {
      // $type might be on a parent group — check later
    }

    // Check for alias references in $value
    const value = String(obj.$value);
    const refs = value.match(/\{([^}]+)\}/g);
    if (refs) {
      for (const ref of refs) {
        const refPath = ref.slice(1, -1);
        allReferences.push({ from: tokenPath, to: refPath, file });
      }
    }
    return;
  }

  if (obj !== null && typeof obj === 'object') {
    for (const [key, val] of Object.entries(obj)) {
      if (key.startsWith('$')) continue;
      walkTokens(val, [...path, key], file);
    }
  }
}

function hasTypeInHierarchy(obj, path, root) {
  // Walk up from leaf to root checking for $type
  if (isTokenLeaf(obj) && obj.$type) return true;

  let current = root;
  for (let i = 0; i < path.length; i++) {
    if (current.$type) return true;
    current = current[path[i]];
    if (!current) return false;
  }
  return current && current.$type;
}

function validateFile(filePath) {
  const rel = relative(TOKENS_DIR, filePath);
  let data;
  try {
    data = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (e) {
    console.error(`  ERROR: ${rel} — invalid JSON: ${e.message}`);
    errors++;
    return;
  }

  // Walk and collect all tokens
  walkTokens(data, [], rel);

  // Validate $type inheritance
  function checkType(obj, path) {
    if (isTokenLeaf(obj)) {
      if (!hasTypeInHierarchy(obj, path, data)) {
        console.warn(`  WARN: ${rel} → ${path.join('.')} — missing $type`);
        warnings++;
      }
      return;
    }
    if (obj !== null && typeof obj === 'object') {
      for (const [key, val] of Object.entries(obj)) {
        if (key.startsWith('$')) continue;
        checkType(val, [...path, key]);
      }
    }
  }
  checkType(data, []);
}

// ── Main ──
console.log('\n  ATOM Token Validator');
console.log('  ─────────────────────────────');

const files = collectJsonFiles(TOKENS_DIR);
console.log(`  Scanning ${files.length} JSON files...\n`);

for (const file of files) {
  validateFile(file);
}

// Validate references
for (const { from, to, file } of allReferences) {
  if (!allTokenPaths.has(to)) {
    console.error(`  ERROR: ${file} → ${from} references {${to}} — NOT FOUND`);
    errors++;
  }
}

// Check for circular references (simple depth-limited check)
function detectCircular(startPath, visited = new Set()) {
  if (visited.has(startPath)) return true;
  visited.add(startPath);
  const refs = allReferences.filter((r) => r.from === startPath);
  for (const ref of refs) {
    if (detectCircular(ref.to, new Set(visited))) {
      console.error(`  ERROR: Circular reference detected: ${startPath} → ${ref.to}`);
      errors++;
      return true;
    }
  }
  return false;
}

const checkedForCircular = new Set();
for (const { from } of allReferences) {
  if (!checkedForCircular.has(from)) {
    checkedForCircular.add(from);
    detectCircular(from);
  }
}

// Summary
console.log('\n  ─────────────────────────────');
console.log(`  Tokens: ${tokenCount}`);
console.log(`  References: ${allReferences.length}`);
console.log(`  Warnings: ${warnings}`);
console.log(`  Errors: ${errors}`);

if (errors > 0) {
  console.error('\n  VALIDATION FAILED — fix errors before building\n');
  process.exit(1);
} else {
  console.log('\n  All tokens valid\n');
}
