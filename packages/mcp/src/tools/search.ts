import { getAllFrameworks, getFrameworkManifest, getTokensManifest } from '../data/manifest.js';

export const searchSchema = {
  type: 'object' as const,
  properties: {
    query: {
      type: 'string',
      description: 'Search query (e.g. "button", "spacing", "danger", "loading")',
    },
  },
  required: ['query'],
};

interface SearchResult {
  type: 'component' | 'token';
  name: string;
  detail: string;
  score: number;
}

function scoreMatch(text: string, query: string): number {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();

  if (lower === q) return 100;
  if (lower.startsWith(q)) return 80;
  if (lower.includes(q)) return 60;

  // Check individual words
  const words = q.split(/\s+/);
  const matched = words.filter(w => lower.includes(w)).length;
  if (matched > 0) return (matched / words.length) * 40;

  return 0;
}

export function handleSearch(args: unknown) {
  const { query } = args as { query: string };

  if (!query || query.trim().length === 0) {
    return {
      content: [{ type: 'text', text: 'Please provide a search query.' }],
      isError: true,
    };
  }

  const results: SearchResult[] = [];

  // Search components
  for (const fw of getAllFrameworks()) {
    const manifest = getFrameworkManifest(fw);
    for (const comp of manifest.components) {
      const nameScore = scoreMatch(comp.name, query);
      const descScore = scoreMatch(comp.description, query) * 0.5;
      const propScore = comp.props.some(p =>
        scoreMatch(p.name, query) > 50
      ) ? 30 : 0;

      const score = Math.max(nameScore, descScore, propScore);
      if (score > 0) {
        // Avoid duplicates across frameworks
        const existing = results.find(r => r.type === 'component' && r.name === comp.name);
        if (!existing) {
          results.push({
            type: 'component',
            name: comp.name,
            detail: `${comp.description} [${getAllFrameworks().filter(f => getFrameworkManifest(f).components.some(c => c.name === comp.name)).join(', ')}]`,
            score,
          });
        }
      }
    }
  }

  // Search tokens
  const tokens = getTokensManifest();
  for (const token of tokens.tokens) {
    const nameScore = scoreMatch(token.name, query);
    const catScore = scoreMatch(token.category, query) * 0.5;
    const score = Math.max(nameScore, catScore);

    if (score > 40) {
      results.push({
        type: 'token',
        name: token.cssVar,
        detail: `${token.type} = ${token.value} (${token.tier}/${token.category})`,
        score,
      });
    }
  }

  // Sort by score, limit results
  results.sort((a, b) => b.score - a.score);
  const top = results.slice(0, 30);

  const componentResults = top.filter(r => r.type === 'component');
  const tokenResults = top.filter(r => r.type === 'token');

  const lines = [
    `# Search: "${query}"`,
    '',
    `${results.length} results found:`,
  ];

  if (componentResults.length > 0) {
    lines.push(
      '',
      '## Components',
      '',
      ...componentResults.map(r => `- **${r.name}** — ${r.detail}`),
    );
  }

  if (tokenResults.length > 0) {
    lines.push(
      '',
      '## Tokens',
      '',
      ...tokenResults.map(r => `- \`${r.name}\` — ${r.detail}`),
    );
  }

  if (results.length === 0) {
    lines.push('', 'No results found. Try a different query.');
  }

  return {
    content: [{ type: 'text', text: lines.join('\n') }],
  };
}
