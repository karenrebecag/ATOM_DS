import { getAnimationsManifest } from '../data/manifest.js';

interface DataAttribute {
  attr: string;
  values: string[];
  description: string;
}

interface AnimationModule {
  name: string;
  initFunctions: string[];
  import: string;
  dataAttributes: DataAttribute[];
  example?: string;
  initOrder?: string;
  motionNote?: string;
  relatedComponent?: string;
}

interface AnimationCategory {
  name: string;
  description: string;
  modules: AnimationModule[];
}

interface MotionTier {
  level: string;
  how: string;
}

interface AnimationsManifest {
  package: string;
  install: string;
  setup: Record<string, string>;
  pattern: string;
  motionPreferences: {
    description: string;
    tiers: MotionTier[];
  };
  categories: AnimationCategory[];
}

export const getAnimationsSchema = {
  type: 'object' as const,
  properties: {
    category: {
      type: 'string',
      enum: ['scroll', 'interactions', 'text', 'components', 'transitions', 'marketing'],
      description: 'Filter by animation category. Omit to see all categories with an overview.',
    },
    component: {
      type: 'string',
      description: 'Get animations related to a specific ATOM component (e.g. "Button", "Badge", "Accordion")',
    },
    framework: {
      type: 'string',
      enum: ['react', 'vue', 'angular', 'astro'],
      description: 'Show setup example for a specific framework.',
    },
  },
};

export function handleGetAnimations(args: unknown) {
  const { category, component, framework } = (args ?? {}) as {
    category?: string;
    component?: string;
    framework?: string;
  };

  const manifest = getAnimationsManifest() as unknown as AnimationsManifest;

  // Framework setup request
  if (framework && !category && !component) {
    const setup = (manifest.setup as Record<string, string>)[framework];
    const lines = [
      `# ATOM Animations — ${framework} Setup`,
      '',
      '## Install',
      '',
      '```bash',
      manifest.install,
      '```',
      '',
      `## ${framework} Integration`,
      '',
      '```',
      setup || manifest.setup.allAtOnce,
      '```',
      '',
      '## Core Pattern',
      '',
      manifest.pattern,
      '',
      '## Motion Preferences (WCAG 2.3.3)',
      '',
      ...manifest.motionPreferences.tiers.map((t: { level: string; how: string }) =>
        `- **${t.level}:** ${t.how}`
      ),
      '',
      '## Available Categories',
      '',
      ...manifest.categories.map((c: { name: string; description: string }) =>
        `- **${c.name}** — ${c.description}`
      ),
    ];
    return { content: [{ type: 'text', text: lines.join('\n') }] };
  }

  // Component-specific animations
  if (component) {
    const normalized = component.toLowerCase();
    const matches: { categoryName: string; module: AnimationModule }[] = [];

    for (const cat of manifest.categories) {
      for (const mod of cat.modules) {
        const related = (mod.relatedComponent || '').toLowerCase();
        const name = mod.name.toLowerCase();
        if (related === normalized || name.includes(normalized)) {
          matches.push({ categoryName: cat.name, module: mod });
        }
      }
    }

    // Also check hover-rotate for Button
    if (normalized === 'button') {
      for (const cat of manifest.categories) {
        for (const mod of cat.modules) {
          if ((mod.name as string) === 'Hover Rotate') {
            matches.push({ categoryName: cat.name, module: mod });
          }
        }
      }
    }

    if (matches.length === 0) {
      return {
        content: [{ type: 'text', text: `No animations found for component "${component}". Use atom_get_animations without arguments to see all available animation categories.` }],
      };
    }

    const lines = [
      `# Animations for ${component}`,
      '',
      '## Install',
      '',
      '```bash',
      manifest.install,
      '```',
      '',
    ];

    for (const { categoryName, module: mod } of matches) {
      lines.push(
        `### ${mod.name} (${categoryName})`,
        '',
        `**Import:**`,
        '```',
        mod.import as string,
        '```',
        '',
        `**Init functions:** ${(mod.initFunctions as string[]).map(f => `\`${f}()\``).join(', ')}`,
        '',
      );

      if (mod.initOrder) {
        lines.push(`**Init order:** ${mod.initOrder}`, '');
      }

      const attrs = mod.dataAttributes as { attr: string; values: string[]; description: string }[];
      if (attrs && attrs.length > 0) {
        lines.push('**Data attributes:**', '');
        for (const a of attrs) {
          const vals = a.values.length > 0 ? ` (${a.values.join(', ')})` : '';
          lines.push(`- \`${a.attr}\`${vals} — ${a.description}`);
        }
        lines.push('');
      }

      if (mod.example) {
        lines.push('**Example:**', '', '```html', mod.example as string, '```', '');
      }

      if (mod.motionNote) {
        lines.push(`> ⚠️ ${mod.motionNote}`, '');
      }
    }

    return { content: [{ type: 'text', text: lines.join('\n') }] };
  }

  // Category-specific
  if (category) {
    const cat = manifest.categories.find((c: { name: string }) => c.name === category);
    if (!cat) {
      return {
        content: [{ type: 'text', text: `Category "${category}" not found. Available: ${manifest.categories.map((c: { name: string }) => c.name).join(', ')}` }],
        isError: true,
      };
    }

    const lines = [
      `# ATOM Animations — ${cat.name}`,
      '',
      cat.description,
      '',
      '## Install',
      '',
      '```bash',
      manifest.install,
      '```',
      '',
    ];

    for (const mod of cat.modules) {
      lines.push(
        `### ${mod.name}`,
        '',
        `**Import:**`,
        '```',
        mod.import as string,
        '```',
        '',
        `**Init functions:** ${(mod.initFunctions as string[]).map((f: string) => `\`${f}()\``).join(', ')}`,
        '',
      );

      if (mod.initOrder) {
        lines.push(`**Init order:** ${mod.initOrder}`, '');
      }

      const attrs = mod.dataAttributes as { attr: string; values: string[]; description: string }[];
      if (attrs && attrs.length > 0) {
        lines.push('**Data attributes:**', '');
        for (const a of attrs) {
          const vals = a.values.length > 0 ? ` (${a.values.join(', ')})` : '';
          lines.push(`- \`${a.attr}\`${vals} — ${a.description}`);
        }
        lines.push('');
      }

      if (mod.example) {
        lines.push('**Example:**', '', '```html', mod.example as string, '```', '');
      }

      if (mod.motionNote) {
        lines.push(`> ⚠️ ${mod.motionNote}`, '');
      }
    }

    return { content: [{ type: 'text', text: lines.join('\n') }] };
  }

  // Overview (no filters)
  const lines = [
    '# ATOM Animations (@atomchat.io/animations)',
    '',
    '## Install',
    '',
    '```bash',
    manifest.install,
    '```',
    '',
    '## Quick Start (all animations at once)',
    '',
    '```',
    manifest.setup.allAtOnce,
    '```',
    '',
    manifest.pattern,
    '',
    '## Categories',
    '',
  ];

  for (const cat of manifest.categories) {
    lines.push(`### ${cat.name}`, '', cat.description, '');
    for (const mod of cat.modules) {
      const fns = (mod.initFunctions as string[]).map((f: string) => `\`${f}()\``).join(', ');
      lines.push(`- **${mod.name}** — ${fns}`);
    }
    lines.push('');
  }

  lines.push(
    '## Motion Preferences (WCAG 2.3.3)',
    '',
    ...manifest.motionPreferences.tiers.map((t: { level: string; how: string }) =>
      `- **${t.level}:** ${t.how}`
    ),
    '',
    '---',
    '',
    'Use `atom_get_animations` with `category`, `component`, or `framework` for detailed info.',
  );

  return { content: [{ type: 'text', text: lines.join('\n') }] };
}
