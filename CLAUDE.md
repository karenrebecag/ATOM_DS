# ATOM Design System — Claude Instructions

## Project Structure

This monorepo contains 4 packages:

```
packages/tokens/      @atomchat/tokens    ✅ COMPLETE
packages/animations/  @atomchat/animations ✅ COMPLETE
packages/css/         @atomchat/css        ✅ COMPLETE
packages/components-astro/ @atomchat/components-astro ❌ NOT STARTED

apps/docs/            Empty — ATOM_website will move here eventually
```

## Completed Work

### @atomchat/tokens
- 1,110 W3C DTCG tokens across 3 tiers
- Foundation (primitives) → Semantic (aliases) → Component (scoped)
- Build outputs: tokens.css, dark.css, foundation.css,
  semantic.css, components.css, _tokens.scss, tokens.js,
  tokens.cjs, tokens.d.ts, tokens.json
- Dark theme: separate dark.css with [data-theme="dark"]
- ALL naming: lowercase kebab-case

### @atomchat/animations
- 34 TypeScript files, 28 animation modules
- Three-tier WCAG 2.3.3 motion system:
  OS (prefers-reduced-motion) + Site (data-motion) + Element (data-motion-exempt)
- Vestibular-risk pattern for parallax/page-transition
- Single GSAP plugin registration in config.ts
- Peer dependency: gsap >=3.12.0

### @atomchat/css
- 42.5 kB compiled CSS (pure asset build, no JS wrapper)
- 17 CSS files: foundation + components + utilities
- Zero hardcoded values — all var(--token)
- Vite pure asset build (no lib mode)
- "style" field in package.json for Vite resolution
- Local dev requires server.fs.allow in consuming project:
  vite: { server: { fs: { allow: ['..', '../atom-design-system'] } } }

## Token Architecture

```
Layer 1 Primitive  → --primitive-zinc-950: #09090b
Layer 2 Semantic   → --bg-primary: var(--primitive-neutral-0)
Layer 3 Component  → --buttons-bg-primary-enabled: var(--bg-inverse-primary)
```

## Core Rules

1. NEVER edit packages/*/build/ or packages/*/dist/ — auto-generated
2. NEVER hardcode color/spacing/typography — always var(--token)
3. Token JSON: W3C DTCG format { "$value": "...", "$type": "..." }
4. All token names: lowercase kebab-case
5. GSAP plugins: registered ONCE in animations/src/config.ts only
6. CSS package: pure asset build, NOT lib mode
7. Consuming Astro projects need server.fs.allow for local dev

## Commands

```bash
pnpm install                          # Install all workspaces
pnpm build                            # Build all (Turbo)
node scripts/validate-tokens.js       # Validate tokens
cd packages/tokens && pnpm build      # Rebuild tokens only
cd packages/css && pnpm build         # Rebuild CSS only
cd packages/animations && pnpm build  # Rebuild animations only
```

## Deferred Work

See DEFERRED_TO_CSS.md for patterns deferred from tokens.
@atomchat/components-astro is the next package to build.
