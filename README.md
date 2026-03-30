# ATOM Design System

Distributable design system monorepo for ATOM.
Built with W3C DTCG tokens, GSAP animations, and pure CSS.

## Packages

| Package | Version | Description |
|---|---|---|
| `@atomchat/tokens` | 1.0.0 | 1,110 W3C DTCG design tokens |
| `@atomchat/animations` | 1.0.0 | GSAP animation system (WCAG 2.3.3) |
| `@atomchat/css` | 0.1.0 | Component stylesheets (42.5 kB) |

## Quick Start

```bash
npm install @atomchat/tokens @atomchat/css @atomchat/animations gsap
```

```js
// In your layout
import '@atomchat/tokens/css'
import '@atomchat/tokens/css/dark'
import '@atomchat/css/atom.css'
import { initAllAnimations } from '@atomchat/animations'

const cleanup = initAllAnimations()
```

## Token Architecture

```
Primitive  →  --primitive-zinc-950: #09090b
Semantic   →  --bg-primary: var(--primitive-neutral-0)
Component  →  --buttons-bg-primary-enabled: var(--bg-inverse-primary)
```

## Dark Mode

```html
<html data-theme="dark"> <!-- activates dark.css overrides -->
```

## Development

```bash
pnpm install
pnpm build
node scripts/validate-tokens.js
```

## Tech Stack
- pnpm 9 + Turborepo
- Style Dictionary v4 (W3C DTCG → CSS/SCSS/JS/TS)
- TypeScript 5.8
- Vite 6 + LightningCSS
- GSAP 3.12
