import { getAllFrameworks, getFrameworkManifest } from '../data/manifest.js';

export const listComponentsSchema = {
  type: 'object' as const,
  properties: {
    framework: {
      type: 'string',
      enum: ['react', 'vue', 'angular', 'astro'],
      description: 'Filter by framework. Omit to list all components across all frameworks.',
    },
  },
};

export function handleListComponents(args: unknown) {
  const { framework } = (args ?? {}) as { framework?: string };
  const frameworks = framework ? [framework as 'react' | 'vue' | 'angular' | 'astro'] : getAllFrameworks();

  const componentMap = new Map<string, { name: string; category: string; description: string; frameworks: string[] }>();

  for (const fw of frameworks) {
    const manifest = getFrameworkManifest(fw);
    for (const comp of manifest.components) {
      const existing = componentMap.get(comp.name);
      if (existing) {
        existing.frameworks.push(fw);
      } else {
        componentMap.set(comp.name, {
          name: comp.name,
          category: comp.path.split('/').slice(0, -1).join('/'),
          description: comp.description,
          frameworks: [fw],
        });
      }
    }
  }

  const components = Array.from(componentMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  const lines = [
    `# ATOM Components${framework ? ` (${framework})` : ''}`,
    '',
    `${components.length} components available:`,
    '',
    '| Component | Category | Frameworks | Description |',
    '|-----------|----------|------------|-------------|',
    ...components.map(c =>
      `| ${c.name} | ${c.category} | ${c.frameworks.join(', ')} | ${c.description} |`
    ),
  ];

  return {
    content: [{ type: 'text', text: lines.join('\n') }],
  };
}
