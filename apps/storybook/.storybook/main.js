import { resolve } from 'path';

// cwd when Storybook runs = apps/storybook/
const animationsSrc = resolve(process.cwd(), '../../packages/animations/src');

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: ['../stories/**/*.stories.jsx'],
  framework: {
    name: '@storybook/react-vite',
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (viteConfig) => {
    // Resolve hover animation directly from TypeScript source.
    // Bypasses the broken tsc build — vertical-slider.ts (marketing) has
    // unrelated TS errors that block the full build, but hover.ts is clean.
    // gsap is installed as a direct devDep so Vite resolves it normally.
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@atomchat.io/animations/hover': resolve(animationsSrc, 'hover.ts'),
      '@atomchat.io/animations/components/forms': resolve(animationsSrc, 'components/forms/index.ts'),
      '@atomchat.io/animations/components/containers': resolve(animationsSrc, 'components/containers/index.ts'),
      '@atomchat.io/animations/components/feedback/modal': resolve(animationsSrc, 'components/feedback/modal.ts'),
      '@atomchat.io/animations/effects/text/text': resolve(animationsSrc, 'effects/text/text.ts'),
      '@atomchat.io/animations/effects/text/odometer': resolve(animationsSrc, 'effects/text/odometer.ts'),
      '@atomchat.io/animations/marketing/marquee': resolve(animationsSrc, 'marketing/marquee.ts'),
    };

    return viteConfig;
  },
};

export default config;
