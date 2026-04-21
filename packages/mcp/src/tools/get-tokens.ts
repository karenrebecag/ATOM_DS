import { getTokensManifest } from '../data/manifest.js';

export const getTokensSchema = {
  type: 'object' as const,
  properties: {
    category: {
      type: 'string',
      description: 'Filter by category (e.g. "colors", "spacing", "typography", "buttons", "forms")',
    },
    tier: {
      type: 'string',
      enum: ['foundation', 'semantic', 'component', 'figma'],
      description: 'Filter by token tier',
    },
    component: {
      type: 'string',
      description: 'Get tokens for a specific component (e.g. "button", "checkbox")',
    },
  },
};

export function handleGetTokens(args: unknown) {
  const { category, tier, component } = (args ?? {}) as {
    category?: string;
    tier?: string;
    component?: string;
  };

  const manifest = getTokensManifest();
  let tokens = manifest.tokens;

  if (tier) {
    tokens = tokens.filter(t => t.tier === tier);
  }

  if (category) {
    tokens = tokens.filter(t =>
      t.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (component) {
    tokens = tokens.filter(t =>
      t.name.toLowerCase().includes(component.toLowerCase()) ||
      t.category.toLowerCase().includes(component.toLowerCase())
    );
  }

  // Limit output to avoid overwhelming context
  const MAX_TOKENS = 100;
  const truncated = tokens.length > MAX_TOKENS;
  const display = tokens.slice(0, MAX_TOKENS);

  const lines = [
    `# ATOM Tokens${tier ? ` (${tier})` : ''}${category ? ` — ${category}` : ''}${component ? ` — ${component}` : ''}`,
    '',
    `${tokens.length} tokens found${truncated ? ` (showing first ${MAX_TOKENS})` : ''}:`,
    '',
    '| CSS Variable | Type | Value | Tier |',
    '|-------------|------|-------|------|',
    ...display.map(t => `| \`${t.cssVar}\` | ${t.type} | ${t.value} | ${t.tier} |`),
  ];

  if (truncated) {
    lines.push('', `... and ${tokens.length - MAX_TOKENS} more. Use more specific filters to narrow results.`);
  }

  lines.push(
    '',
    '## Available tiers',
    '',
    manifest.tiers.map(t => `- ${t}`).join('\n'),
    '',
    '## Available categories',
    '',
    manifest.categories.map(c => `- ${c}`).join('\n'),
  );

  return {
    content: [{ type: 'text', text: lines.join('\n') }],
  };
}
