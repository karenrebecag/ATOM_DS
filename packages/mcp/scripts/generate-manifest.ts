#!/usr/bin/env tsx
/**
 * Manifest Generator for @atomchat.io/mcp
 *
 * Reads source packages and generates static JSON manifests
 * that the MCP server serves to AI clients.
 *
 * Usage: pnpm generate (from packages/mcp/)
 *
 * Fixes (v2):
 * - React: follows multi-name exports and barrel re-exports
 * - Vue: parses defineProps<InterfaceName>() by resolving named interfaces
 * - Angular: strips { alias: ... } options from input() defaults
 * - Tokens: inherits $type from parent groups per W3C DTCG spec
 * - Manifest metadata: generatedAt, gitSha, packageVersion
 * - Warnings logged to stderr instead of silent skips
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const MONOREPO_ROOT = resolve(__dirname, '../../..');
const DATA_DIR = resolve(__dirname, '../data');

let warningCount = 0;
function warn(context: string, message: string) {
  console.error(`  ⚠ [${context}] ${message}`);
  warningCount++;
}

// ── Types ──────────────────────────────────────────────────────

interface ComponentProp {
  name: string;
  type: string;
  values?: string[];
  default?: string;
  description?: string;
}

interface ComponentEntry {
  name: string;
  path: string;
  import: string;
  description: string;
  props: ComponentProp[];
  tokens: string[];
}

interface ManifestMeta {
  generatedAt: string;
  gitSha: string;
  packageVersion: string;
  sourceCount: number;
}

interface FrameworkManifest {
  meta: ManifestMeta;
  package: string;
  version: string;
  install: string;
  peerDeps: string[];
  setup: string[];
  components: ComponentEntry[];
}

interface TokenEntry {
  name: string;
  type: string;
  value: string;
  cssVar: string;
  tier: string;
  category: string;
}

interface TokensManifest {
  meta: ManifestMeta;
  total: number;
  tiers: string[];
  categories: string[];
  tokens: TokenEntry[];
}

// ── Helpers ────────────────────────────────────────────────────

function readPkg(dir: string): Record<string, unknown> {
  return JSON.parse(readFileSync(resolve(dir, 'package.json'), 'utf-8'));
}

function getGitSha(): string {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: MONOREPO_ROOT, encoding: 'utf-8' }).trim();
  } catch {
    return 'unknown';
  }
}

function makeMeta(pkgVersion: string, sourceCount: number): ManifestMeta {
  return {
    generatedAt: new Date().toISOString(),
    gitSha: getGitSha(),
    packageVersion: pkgVersion,
    sourceCount,
  };
}

function extractDescription(content: string): string {
  const match = content.match(/\/\*\*\s*\n\s*\*\s*(\w[^\n]*)/);
  return match ? match[1].trim() : '';
}

/**
 * Known type → values map, shared across frameworks.
 * Avoids duplicating hardcoded lists per-framework.
 */
const KNOWN_TYPE_VALUES: Record<string, string[]> = {
  SizeVariant: ['xs', 's', 'm', 'l', 'xl'],
  ButtonVariant: ['Primary', 'Secondary', 'Tertiary', 'Destructive Primary', 'Destructive Secondary', 'Destructive Tertiary'],
  ButtonSize: ['xs', 's', 'm', 'l', 'xl'],
  ButtonType: ['button', 'submit', 'reset'],
  AvatarSize: ['xs', 's', 'm', 'l'],
  AvatarShape: ['circle', 'square'],
  AvatarType: ['image', 'image-border', 'initials', 'icon'],
  StatusType: ['verified', 'online', 'offline', 'idle', 'inactive', 'none'],
  IconButtonVariant: ['Primary', 'Secondary', 'Tertiary', 'Destructive Primary', 'Destructive Secondary', 'Destructive Tertiary'],
  BadgeType: ['numeric', 'dot'],
  BadgeState: ['default', 'active'],
  BadgeContext: ['default', 'navigation', 'tab'],
  ChipVariant: ['filled', 'outlined'],
  ChipColor: ['default', 'primary', 'success', 'warning', 'danger'],
  ChipSize: ['s', 'm'],
  TagVariant: ['filled', 'outlined', 'ghost'],
  TagColor: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
  TagSize: ['s', 'm', 'l'],
  SpinnerSize: ['xs', 's', 'm', 'l'],
  SpinnerColor: ['default', 'inverse', 'primary'],
  EmptyStateSize: ['s', 'm', 'l'],
  HeadingLevel: ['1', '2', '3', '4', '5', '6'],
  NavLinkUnderline: ['none', 'hover', 'always'],
  NavLinkVariant: ['default', 'muted'],
  TooltipIconType: ['info', 'help'],
  MarqueeVariant: ['primary', 'secondary'],
  MarqueeSize: ['s', 'm', 'l'],
  MarqueeSpeed: ['slow', 'normal', 'fast'],
};

function resolveTypeValues(rawType: string): string[] | undefined {
  // Check known types first
  for (const [typeName, values] of Object.entries(KNOWN_TYPE_VALUES)) {
    if (rawType.includes(typeName)) return values;
  }
  // Check inline string literal unions: 'a' | 'b' | 'c'
  const literals = [...rawType.matchAll(/'([^']+)'/g)].map(m => m[1]);
  return literals.length > 0 ? literals : undefined;
}

// ── React Manifest ─────────────────────────────────────────────

function generateReactManifest(): FrameworkManifest {
  const pkgDir = resolve(MONOREPO_ROOT, 'packages/components-react');
  const pkg = readPkg(pkgDir);
  const srcDir = resolve(pkgDir, 'src');
  const components: ComponentEntry[] = [];

  const indexContent = readFileSync(resolve(srcDir, 'index.ts'), 'utf-8');

  // Strategy: parse ALL export lines, handle both single and multi-name exports
  // Pattern 1: export { Name } from './path'
  // Pattern 2: export { Name1, Name2 } from './path'
  // Skip: export type { ... }
  const exportLines = indexContent.split('\n').filter(line =>
    line.startsWith('export {') && !line.startsWith('export type')
  );

  for (const line of exportLines) {
    const namesMatch = line.match(/export\s*\{\s*(.+?)\s*\}\s*from\s*'(.+?)'/);
    if (!namesMatch) continue;

    const names = namesMatch[1].split(',').map(n => n.trim()).filter(n => n && n !== 'cn');
    const importPath = namesMatch[2];

    for (const name of names) {
      // Resolve the actual file — follow barrel re-exports if path is a directory index
      let filePath = resolveComponentFile(srcDir, importPath, name);
      if (!filePath) {
        warn('react', `Could not resolve file for ${name} from '${importPath}'`);
        continue;
      }

      let content = readFileSync(filePath, 'utf-8');

      // Follow re-export shims: if file just re-exports, resolve the real source
      const reExportShim = content.match(/export\s*\{\s*\w+\s*\}\s*from\s*'(.+?)'/);
      if (reExportShim && !content.includes('interface') && !content.includes('forwardRef') && !content.includes('function')) {
        const shimTarget = reExportShim[1];
        const shimDir = dirname(filePath);
        const realCandidates = [
          resolve(shimDir, `${shimTarget}.tsx`),
          resolve(shimDir, `${shimTarget}.ts`),
        ];
        for (const c of realCandidates) {
          if (existsSync(c)) {
            filePath = c;
            content = readFileSync(c, 'utf-8');
            break;
          }
        }
      }

      const description = extractDescription(content);
      const props = extractReactProps(content);
      const tokens = findRelatedTokens(name);

      components.push({
        name,
        path: filePath.replace(srcDir + '/', '').replace(/\.tsx?$/, ''),
        import: `import { ${name} } from '${pkg.name}'`,
        description: description || `${name} component`,
        props,
        tokens,
      });
    }
  }

  return {
    meta: makeMeta(pkg.version as string, components.length),
    package: pkg.name as string,
    version: pkg.version as string,
    install: `npm install ${pkg.name} @atomchat.io/css @atomchat.io/tokens`,
    peerDeps: ['react >= 18', '@atomchat.io/css', '@atomchat.io/tokens'],
    setup: [
      "import '@atomchat.io/tokens/build/css/tokens.css';",
      "import '@atomchat.io/css/dist/fonts.css';",
      "import '@atomchat.io/css/dist/atom.css';",
    ],
    components,
  };
}

/**
 * Resolve a component file from an import path.
 * Handles both direct files and barrel re-exports (index.ts).
 */
function resolveComponentFile(srcDir: string, importPath: string, componentName: string): string | null {
  // Direct file candidates
  const directCandidates = [
    resolve(srcDir, `${importPath}.tsx`),
    resolve(srcDir, `${importPath}.ts`),
  ];

  for (const candidate of directCandidates) {
    if (existsSync(candidate)) return candidate;
  }

  // It's likely a directory with index.ts barrel — follow re-exports
  const indexCandidates = [
    resolve(srcDir, importPath, 'index.ts'),
    resolve(srcDir, importPath, 'index.tsx'),
  ];

  for (const indexPath of indexCandidates) {
    if (!existsSync(indexPath)) continue;

    const indexContent = readFileSync(indexPath, 'utf-8');
    // Find re-export for this component name
    const reExportMatch = indexContent.match(
      new RegExp(`export\\s*\\{\\s*${componentName}\\s*\\}\\s*from\\s*'(.+?)'`)
    );
    if (reExportMatch) {
      const nestedPath = reExportMatch[1];
      const nestedDir = dirname(indexPath);
      const nestedCandidates = [
        resolve(nestedDir, `${nestedPath}.tsx`),
        resolve(nestedDir, `${nestedPath}.ts`),
      ];
      for (const c of nestedCandidates) {
        if (existsSync(c)) return c;
      }
    }

    // Try: component file directly in the directory
    const directInDir = [
      resolve(dirname(indexPath), `${componentName}.tsx`),
      resolve(dirname(indexPath), `${componentName}.ts`),
    ];
    for (const c of directInDir) {
      if (existsSync(c)) return c;
    }
  }

  return null;
}

function extractReactProps(content: string): ComponentProp[] {
  const props: ComponentProp[] = [];
  const seen = new Set<string>();

  // Collect all props blocks from multiple patterns:
  const propsBlocks: string[] = [];

  // Pattern 1: interface FooProps { ... }
  const interfaceMatch = content.match(/(?:export\s+)?interface\s+\w+Props[^{]*\{([\s\S]*?)\n\}/);
  if (interfaceMatch) propsBlocks.push(interfaceMatch[1]);

  // Pattern 2: type FooAsBar = SomeType & { ... } (polymorphic pattern)
  // Collect ALL such type definitions — they define shared props across variants
  const polyMatches = content.matchAll(/type\s+\w+As\w+\s*=[^{]*\{([\s\S]*?)\}/g);
  for (const [, block] of polyMatches) {
    propsBlocks.push(block);
  }

  if (propsBlocks.length === 0) return props;

  for (const propsBlock of propsBlocks) {
    const propLines = propsBlock.matchAll(/^\s*(\w+)\??\s*:\s*(.+?);?\s*$/gm);

    for (const [, name, rawType] of propLines) {
      if (name.startsWith('on') || name === 'children' || name === 'className') continue;
      if (seen.has(name)) continue;
      seen.add(name);

      const prop: ComponentProp = { name, type: rawType.trim() };

      const values = resolveTypeValues(rawType);
      if (values) prop.values = values;

      // Extract defaults from destructuring (e.g. variant = 'Primary')
      const defaultMatch = content.match(new RegExp(`\\b${name}\\s*=\\s*['"]([^'"]+)['"]`));
      if (defaultMatch) {
        prop.default = defaultMatch[1];
      } else {
        const boolMatch = content.match(new RegExp(`\\b${name}\\s*=\\s*(true|false|\\d+)`));
        if (boolMatch) prop.default = boolMatch[1];
      }

      props.push(prop);
    }
  }

  return props;
}

// ── Vue Manifest ───────────────────────────────────────────────

function generateVueManifest(): FrameworkManifest {
  const pkgDir = resolve(MONOREPO_ROOT, 'packages/components-vue');
  const pkg = readPkg(pkgDir);
  const srcDir = resolve(pkgDir, 'src');
  const components: ComponentEntry[] = [];

  // Discover all .vue files recursively, dedup by component name
  const vueFiles = findFiles(srcDir, '.vue');
  const seenNames = new Set<string>();

  for (const filePath of vueFiles) {
    const content = readFileSync(filePath, 'utf-8');
    const name = basename(filePath, '.vue');

    // Skip re-export shims (files that just re-export from another path)
    if (seenNames.has(name)) continue;
    seenNames.add(name);

    const relativePath = filePath.replace(srcDir + '/', '').replace('.vue', '');

    const props = extractVueProps(content);
    const description = extractVueDescription(content) || extractDescription(content) || `${name} component`;
    const tokens = findRelatedTokens(name);

    components.push({
      name,
      path: relativePath,
      import: `import { ${name} } from '${pkg.name}'`,
      description,
      props,
      tokens,
    });
  }

  return {
    meta: makeMeta(pkg.version as string, components.length),
    package: pkg.name as string,
    version: pkg.version as string,
    install: `npm install ${pkg.name} @atomchat.io/css @atomchat.io/tokens`,
    peerDeps: ['vue >= 3.4', '@atomchat.io/css', '@atomchat.io/tokens'],
    setup: [
      "import '@atomchat.io/tokens/build/css/tokens.css';",
      "import '@atomchat.io/css/dist/fonts.css';",
      "import '@atomchat.io/css/dist/atom.css';",
    ],
    components,
  };
}

function extractVueProps(content: string): ComponentProp[] {
  const props: ComponentProp[] = [];

  // Strategy 1: defineProps<{ inline props }>() or withDefaults(defineProps<{ inline }>(), ...)
  const inlineMatch = content.match(/defineProps<\{([\s\S]*?)\}>\s*\(/);

  // Strategy 2: defineProps<InterfaceName>() — resolve interface from <script setup>
  const namedMatch = content.match(/defineProps<(\w+)>\s*\(/);

  let propsBlock: string | null = null;

  if (inlineMatch) {
    propsBlock = inlineMatch[1];
  } else if (namedMatch) {
    const interfaceName = namedMatch[1];
    // Find the interface definition in the same file
    const interfaceMatch = content.match(
      new RegExp(`interface\\s+${interfaceName}\\s*\\{([\\s\\S]*?)\\n\\}`)
    );
    if (interfaceMatch) {
      propsBlock = interfaceMatch[1];
    } else {
      warn('vue', `Could not resolve interface ${interfaceName} in file`);
    }
  }

  // Strategy 3: defineProps({ runtime object syntax })
  if (!propsBlock) {
    const runtimeMatch = content.match(/defineProps\(\{([\s\S]*?)\}\)/);
    if (runtimeMatch) {
      // Parse runtime props: name: { type: String, default: 'value' }
      const runtimeBlock = runtimeMatch[1];
      const runtimeProps = runtimeBlock.matchAll(/(\w+)\s*:\s*\{([^}]*)\}/g);
      for (const [, name, body] of runtimeProps) {
        const typeMatch = body.match(/type:\s*(\w+)/);
        const defaultMatch = body.match(/default:\s*['"]?([^'",}]+)/);
        const prop: ComponentProp = { name, type: typeMatch?.[1] ?? 'unknown' };
        if (defaultMatch) prop.default = defaultMatch[1].trim();
        props.push(prop);
      }
      return props;
    }
  }

  if (!propsBlock) return props;

  // Parse TypeScript interface props
  const propLines = propsBlock.matchAll(/^\s*(\w+)\??\s*:\s*(.+?)$/gm);

  for (const [, name, rawType] of propLines) {
    if (name === 'class') continue;

    const cleanType = rawType.trim().replace(/;$/, '');
    const prop: ComponentProp = { name, type: cleanType };

    const values = resolveTypeValues(cleanType);
    if (values) prop.values = values;

    props.push(prop);
  }

  // Extract defaults from withDefaults()
  const defaultsMatch = content.match(/withDefaults\([^,]+,\s*\{([\s\S]*?)\}\s*\)/);
  if (defaultsMatch) {
    const defaults = defaultsMatch[1];
    for (const prop of props) {
      const defMatch = defaults.match(new RegExp(`${prop.name}:\\s*['"]?([^'",}\\n]+)`));
      if (defMatch) prop.default = defMatch[1].trim();
    }
  }

  return props;
}

function extractVueDescription(content: string): string {
  // Try JSDoc in <script setup>
  const scriptMatch = content.match(/<script[^>]*>\s*\n\s*\/\*\*\s*\n\s*\*\s*(\w[^\n]*)/);
  if (scriptMatch) return scriptMatch[1].trim();
  // Try HTML comment
  const htmlMatch = content.match(/<!--\s*\n\s*(.+?)(?:\n|-->)/);
  return htmlMatch ? htmlMatch[1].trim() : '';
}

// ── Angular Manifest ───────────────────────────────────────────

function generateAngularManifest(): FrameworkManifest {
  const pkgDir = resolve(MONOREPO_ROOT, 'packages/components-angular');
  const pkg = readPkg(pkgDir);
  const srcDir = resolve(pkgDir, 'src');
  const components: ComponentEntry[] = [];

  const tsFiles = findFiles(srcDir, '.component.ts');
  const seenNames = new Set<string>();

  for (const filePath of tsFiles) {
    const content = readFileSync(filePath, 'utf-8');
    const fileName = basename(filePath, '.component.ts');

    // Convert kebab-case to PascalCase: icon-button → IconButton
    const name = fileName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    const relativePath = filePath.replace(srcDir + '/', '').replace('.ts', '');
    // Skip duplicates (re-export shims)
    if (seenNames.has(name)) continue;
    seenNames.add(name);

    const description = extractDescription(content) || `${name} component`;
    const props = extractAngularProps(content);
    const tokens = findRelatedTokens(name);

    const classMatch = content.match(/export\s+class\s+(\w+)/);
    const className = classMatch?.[1] ?? `${name}Component`;

    components.push({
      name,
      path: relativePath,
      import: `import { ${className} } from '${pkg.name}'`,
      description,
      props,
      tokens,
    });
  }

  return {
    meta: makeMeta(pkg.version as string, components.length),
    package: pkg.name as string,
    version: pkg.version as string,
    install: `npm install ${pkg.name} @atomchat.io/css @atomchat.io/tokens`,
    peerDeps: ['@angular/core >= 21', '@atomchat.io/css', '@atomchat.io/tokens'],
    setup: [
      "// In angular.json → styles array:",
      "\"node_modules/@atomchat.io/tokens/build/css/tokens.css\",",
      "\"node_modules/@atomchat.io/css/dist/fonts.css\",",
      "\"node_modules/@atomchat.io/css/dist/atom.css\"",
    ],
    components,
  };
}

function extractAngularProps(content: string): ComponentProp[] {
  const props: ComponentProp[] = [];

  // Resolve inline type aliases in the same file
  const typeAliases = new Map<string, string[]>();
  const typeMatches = content.matchAll(/type\s+(\w+)\s*=\s*([^;]+)/g);
  for (const [, typeName, typeBody] of typeMatches) {
    const values = [...typeBody.matchAll(/'([^']+)'/g)].map(m => m[1]);
    if (values.length > 0) typeAliases.set(typeName, values);
  }

  // Match input() signals: name = input<Type>(default) or input<Type>(default, { options })
  const inputMatches = content.matchAll(/(\w+)\s*=\s*input<([^>]+)>\(([^)]*)\)/g);
  for (const [, name, type, argsStr] of inputMatches) {
    const prop: ComponentProp = { name, type };

    // Parse default: take only the first argument before any { options }
    const cleanArgs = argsStr.trim();
    if (cleanArgs) {
      // Split at the first comma that's followed by a { (options object)
      const optionsIdx = cleanArgs.indexOf(',');
      let defaultStr: string;
      if (optionsIdx !== -1 && cleanArgs.indexOf('{', optionsIdx) !== -1) {
        defaultStr = cleanArgs.slice(0, optionsIdx).trim();
      } else {
        defaultStr = cleanArgs;
      }
      if (defaultStr) {
        prop.default = defaultStr.replace(/['"]/g, '');
      }
    }

    // Resolve values from known types or inline aliases
    const values = resolveTypeValues(type) ?? typeAliases.get(type) ?? undefined;
    if (values) prop.values = [...values];

    // Also check inline literal unions in the type param: 'xs' | 's' | 'm'
    if (!prop.values) {
      const inlineValues = [...type.matchAll(/'([^']+)'/g)].map(m => m[1]);
      if (inlineValues.length > 0) prop.values = inlineValues;
    }

    props.push(prop);
  }

  return props;
}

// ── Astro Manifest ─────────────────────────────────────────────

function generateAstroManifest(): FrameworkManifest {
  const pkgDir = resolve(MONOREPO_ROOT, 'packages/components-astro');
  const pkg = readPkg(pkgDir);
  const srcDir = resolve(pkgDir, 'src');
  const components: ComponentEntry[] = [];

  const indexContent = readFileSync(resolve(srcDir, 'index.ts'), 'utf-8');
  const exportMatches = indexContent.matchAll(/export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*'\.\/(.+?)'/g);

  for (const [, name, path] of exportMatches) {
    const filePath = resolve(srcDir, path);
    if (!existsSync(filePath)) {
      warn('astro', `File not found: ${path}`);
      continue;
    }

    const content = readFileSync(filePath, 'utf-8');
    const relativePath = path.replace('.astro', '');

    const props = extractAstroProps(content);
    const description = extractAstroDescription(content) || `${name} component`;
    const tokens = findRelatedTokens(name);

    components.push({
      name,
      path: relativePath,
      import: `import { ${name} } from '${pkg.name}'`,
      description,
      props,
      tokens,
    });
  }

  return {
    meta: makeMeta(pkg.version as string, components.length),
    package: pkg.name as string,
    version: pkg.version as string,
    install: `npm install ${pkg.name} @atomchat.io/css @atomchat.io/tokens`,
    peerDeps: ['astro >= 4.0', '@atomchat.io/css', '@atomchat.io/tokens'],
    setup: [
      "// In your global layout (e.g. src/layouts/Layout.astro):",
      "import '@atomchat.io/tokens/build/css/tokens.css';",
      "import '@atomchat.io/css/dist/fonts.css';",
      "import '@atomchat.io/css/dist/atom.css';",
    ],
    components,
  };
}

function extractAstroProps(content: string): ComponentProp[] {
  const props: ComponentProp[] = [];

  const frontmatter = content.match(/---\n([\s\S]*?)---/)?.[1] ?? '';
  const interfaceMatch = frontmatter.match(/interface\s+Props\s*\{([\s\S]*?)\}/);
  if (!interfaceMatch) return props;

  const propsBlock = interfaceMatch[1];
  const propLines = propsBlock.matchAll(/^\s*(\w+)\??\s*:\s*(.+?)(?:;|$)/gm);

  for (const [, name, rawType] of propLines) {
    if (name === 'class') continue;
    const prop: ComponentProp = { name, type: rawType.trim() };

    const values = resolveTypeValues(rawType);
    if (values) prop.values = values;

    props.push(prop);
  }

  // Extract defaults from destructuring
  const destructMatch = frontmatter.match(/const\s*\{([^}]+)\}\s*=\s*Astro\.props/);
  if (destructMatch) {
    const destructuring = destructMatch[1];
    for (const prop of props) {
      const defMatch = destructuring.match(new RegExp(`${prop.name}\\s*=\\s*['"]?([^'",}]+)`));
      if (defMatch) prop.default = defMatch[1].trim();
    }
  }

  return props;
}

function extractAstroDescription(content: string): string {
  const frontmatter = content.match(/---\n([\s\S]*?)---/)?.[1] ?? '';
  const match = frontmatter.match(/\/\*\*\s*\n\s*\*\s*(.+?)(?:\n|\*\/)/);
  return match ? match[1].trim() : '';
}

// ── Tokens Manifest ────────────────────────────────────────────

/**
 * Path-based type inference table.
 * Used when $type is missing from both the token and all parent groups.
 */
const PATH_TYPE_TABLE: Record<string, string> = {
  colors: 'color',
  colour: 'color',
  bg: 'color',
  fg: 'color',
  border: 'color',
  brand: 'color',
  spacing: 'dimension',
  radius: 'dimension',
  stroke: 'dimension',
  breakpoints: 'dimension',
  opacity: 'number',
  typography: 'fontFamily',
  'z-index': 'number',
  elevations: 'shadow',
  motion: 'duration',
};

function inferTypeFromPath(category: string, path: string[]): string {
  // Check category first
  if (PATH_TYPE_TABLE[category]) return PATH_TYPE_TABLE[category];
  // Check path segments
  for (const segment of path) {
    const lower = segment.toLowerCase();
    if (PATH_TYPE_TABLE[lower]) return PATH_TYPE_TABLE[lower];
  }
  return 'unknown';
}

function generateTokensManifest(): TokensManifest {
  const tokensDir = resolve(MONOREPO_ROOT, 'packages/tokens/src');
  const tokens: TokenEntry[] = [];
  const tiers = new Set<string>();
  const categories = new Set<string>();

  function processDir(dir: string, tier: string) {
    if (!existsSync(dir)) return;

    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = resolve(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        processDir(fullPath, tier);
        continue;
      }

      if (extname(entry) !== '.json') continue;

      const category = basename(entry, '.json');
      categories.add(category);
      tiers.add(tier);

      try {
        const content = JSON.parse(readFileSync(fullPath, 'utf-8'));
        extractTokensFromJSON(content, [], tier, category, tokens, undefined);
      } catch (e) {
        warn('tokens', `Failed to parse ${fullPath}: ${(e as Error).message}`);
      }
    }
  }

  processDir(resolve(tokensDir, 'foundation'), 'foundation');
  processDir(resolve(tokensDir, 'semantic'), 'semantic');
  processDir(resolve(tokensDir, 'components'), 'component');
  processDir(resolve(tokensDir, 'figma/primitives'), 'figma');

  return {
    meta: makeMeta('', tokens.length),
    total: tokens.length,
    tiers: Array.from(tiers).sort(),
    categories: Array.from(categories).sort(),
    tokens,
  };
}

/**
 * Recursively extract tokens from W3C DTCG JSON.
 * Propagates $type from parent groups to children per spec.
 */
function extractTokensFromJSON(
  obj: Record<string, unknown>,
  path: string[],
  tier: string,
  category: string,
  tokens: TokenEntry[],
  inheritedType: string | undefined,
) {
  // Check if this group defines a $type that children inherit
  const groupType = (obj.$type as string) ?? inheritedType;

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;

    if (typeof value === 'object' && value !== null) {
      const record = value as Record<string, unknown>;
      if ('$value' in record) {
        // Leaf token — resolve type: own $type > inherited > infer from path
        const tokenType = (record.$type as string)
          ?? groupType
          ?? inferTypeFromPath(category, path);

        const name = [...path, key].join('-');
        tokens.push({
          name,
          type: tokenType,
          value: String(record.$value),
          cssVar: `--${name}`,
          tier,
          category,
        });
      } else {
        // Group node — recurse, passing down $type
        extractTokensFromJSON(record, [...path, key], tier, category, tokens, groupType);
      }
    }
  }
}

// ── Related Tokens Finder ──────────────────────────────────────

function findRelatedTokens(componentName: string): string[] {
  const tokensDir = resolve(MONOREPO_ROOT, 'packages/tokens/src/components');
  if (!existsSync(tokensDir)) return [];

  const normalized = componentName.replace(/([A-Z])/g, (_, c, i) =>
    i > 0 ? `-${c.toLowerCase()}` : c.toLowerCase()
  );

  const patterns = [
    `${normalized}.json`,
    `${normalized}s.json`,
  ];

  for (const pattern of patterns) {
    const found = findFileRecursive(tokensDir, pattern);
    if (found) {
      try {
        const content = JSON.parse(readFileSync(found, 'utf-8'));
        const topKeys = Object.keys(content);
        return topKeys.map(k => `${k}-*`);
      } catch {
        // skip
      }
    }
  }

  return [];
}

function findFileRecursive(dir: string, filename: string): string | null {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = resolve(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      const found = findFileRecursive(fullPath, filename);
      if (found) return found;
    } else if (entry === filename) {
      return fullPath;
    }
  }
  return null;
}

// ── Utility ────────────────────────────────────────────────────

function findFiles(dir: string, ext: string): string[] {
  const results: string[] = [];
  if (!existsSync(dir)) return results;

  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules') continue;
    const fullPath = resolve(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...findFiles(fullPath, ext));
    } else if (entry.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

// ── Main ───────────────────────────────────────────────────────

function main() {
  console.error('Generating ATOM MCP manifests...\n');

  const react = generateReactManifest();
  writeFileSync(resolve(DATA_DIR, 'react.json'), JSON.stringify(react, null, 2) + '\n');
  console.error(`  react.json     → ${react.components.length} components`);

  const vue = generateVueManifest();
  writeFileSync(resolve(DATA_DIR, 'vue.json'), JSON.stringify(vue, null, 2) + '\n');
  console.error(`  vue.json       → ${vue.components.length} components`);

  const angular = generateAngularManifest();
  writeFileSync(resolve(DATA_DIR, 'angular.json'), JSON.stringify(angular, null, 2) + '\n');
  console.error(`  angular.json   → ${angular.components.length} components`);

  const astro = generateAstroManifest();
  writeFileSync(resolve(DATA_DIR, 'astro.json'), JSON.stringify(astro, null, 2) + '\n');
  console.error(`  astro.json     → ${astro.components.length} components`);

  const tokens = generateTokensManifest();
  writeFileSync(resolve(DATA_DIR, 'tokens.json'), JSON.stringify(tokens, null, 2) + '\n');
  console.error(`  tokens.json    → ${tokens.total} tokens`);

  console.error(`\nDone! (${warningCount} warnings)`);
}

main();
