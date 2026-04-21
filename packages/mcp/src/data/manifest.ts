import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = resolve(__dirname, '../../data');

export interface ComponentProp {
  name: string;
  type: string;
  values?: string[];
  default?: string;
  description?: string;
}

export interface ComponentEntry {
  name: string;
  path: string;
  import: string;
  description: string;
  props: ComponentProp[];
  tokens: string[];
}

export interface FrameworkManifest {
  package: string;
  version: string;
  install: string;
  peerDeps: string[];
  components: ComponentEntry[];
}

export interface TokenEntry {
  name: string;
  type: string;
  value: string;
  cssVar: string;
  tier: string;
  category: string;
}

export interface TokensManifest {
  total: number;
  tiers: string[];
  categories: string[];
  tokens: TokenEntry[];
}

type Framework = 'react' | 'vue' | 'angular' | 'astro';

const cache = new Map<string, unknown>();

function loadJSON<T>(filename: string): T {
  if (cache.has(filename)) return cache.get(filename) as T;
  const content = readFileSync(resolve(DATA_DIR, filename), 'utf-8');
  const parsed = JSON.parse(content) as T;
  cache.set(filename, parsed);
  return parsed;
}

export function getFrameworkManifest(framework: Framework): FrameworkManifest {
  return loadJSON<FrameworkManifest>(`${framework}.json`);
}

export function getTokensManifest(): TokensManifest {
  return loadJSON<TokensManifest>('tokens.json');
}

export function getAllFrameworks(): Framework[] {
  return ['react', 'vue', 'angular', 'astro'];
}
