import { getAllFrameworks, getFrameworkManifest } from '../data/manifest.js';

export const getComponentSchema = {
  type: 'object' as const,
  properties: {
    name: {
      type: 'string',
      description: 'Component name (e.g. "Button", "Avatar", "Card")',
    },
    framework: {
      type: 'string',
      enum: ['react', 'vue', 'angular', 'astro'],
      description: 'Target framework. Defaults to React if component is available there.',
    },
  },
  required: ['name'],
};

export function handleGetComponent(args: unknown) {
  const { name, framework } = args as { name: string; framework?: string };

  // Find the component in the requested framework, or first available
  const searchOrder = framework
    ? [framework as 'react' | 'vue' | 'angular' | 'astro']
    : getAllFrameworks();

  for (const fw of searchOrder) {
    const manifest = getFrameworkManifest(fw);
    const comp = manifest.components.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );

    if (!comp) continue;

    const propsTable = comp.props.length > 0
      ? [
          '',
          '## Props',
          '',
          '| Prop | Type | Default | Description |',
          '|------|------|---------|-------------|',
          ...comp.props.map(p => {
            const type = p.values ? p.values.map(v => `'${v}'`).join(' | ') : p.type;
            return `| ${p.name} | \`${type}\` | ${p.default ?? '—'} | ${p.description ?? ''} |`;
          }),
        ]
      : [];

    const tokensSection = comp.tokens.length > 0
      ? ['', '## Related Tokens', '', ...comp.tokens.map(t => `- \`--${t}\``)]
      : [];

    // Check availability across frameworks
    const availability = getAllFrameworks()
      .filter(f => {
        const m = getFrameworkManifest(f);
        return m.components.some(c => c.name.toLowerCase() === name.toLowerCase());
      });

    const lines = [
      `# ${comp.name} (${manifest.package})`,
      '',
      comp.description,
      '',
      '## Install',
      '',
      '```bash',
      manifest.install,
      '```',
      '',
      '## Import',
      '',
      '```',
      comp.import,
      '```',
      ...propsTable,
      ...tokensSection,
      '',
      '## Available in',
      '',
      availability.map(f => `- ${f}`).join('\n'),
    ];

    return {
      content: [{ type: 'text', text: lines.join('\n') }],
    };
  }

  return {
    content: [{ type: 'text', text: `Component "${name}" not found. Use atom_list_components to see all available components.` }],
    isError: true,
  };
}
