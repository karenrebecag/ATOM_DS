# Component Quick Start Guide

**TL;DR:** Cómo implementar un nuevo componente en ATOM Design System en 4 pasos.

---

## 🚀 Setup Inicial (Una sola vez)

```bash
# Clone monorepo
git clone [repo] atom-design-system
cd atom-design-system

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

---

## 📝 Template: Nuevo Componente

### PASO 1: Tokens (5 min)

**Archivo:** `packages/tokens/src/component/chip.json`

```json
{
  "chip": {
    "padding": {
      "x": { "$value": "{primitive.spacing.s}", "$type": "dimension" },
      "y": { "$value": "{primitive.spacing.xs}", "$type": "dimension" }
    },
    "font-size": { "$value": "{primitive.text.body.s}", "$type": "dimension" },
    "border-radius": { "$value": "{primitive.radius.pill}", "$type": "dimension" },
    "bg": {
      "default": { "$value": "{primitive.zinc.100}", "$type": "color" },
      "hover": { "$value": "{primitive.zinc.200}", "$type": "color" },
      "active": { "$value": "{primitive.zinc.300}", "$type": "color" }
    },
    "color": {
      "default": { "$value": "{primitive.zinc.900}", "$type": "color" }
    }
  }
}
```

**Build:**
```bash
cd packages/tokens && pnpm build
```

---

### PASO 2: CSS (10 min)

**Archivo:** `packages/css/src/components/chip.css`

```css
/**
 * Chip — Filterable tag component
 * Figma: Web-Library → Atom/Chip
 */

.chip {
  /* Layout */
  display: inline-flex;
  align-items: center;
  gap: var(--chip-gap);
  cursor: pointer;

  /* Dimensions */
  padding: var(--chip-padding-y) var(--chip-padding-x);
  border-radius: var(--chip-border-radius);

  /* Typography */
  font-size: var(--chip-font-size);
  font-weight: var(--font-weight-medium);

  /* Colors */
  background: var(--chip-bg-default);
  color: var(--chip-color-default);
  border: 1px solid transparent;

  /* Transitions */
  transition: background 200ms ease, border-color 200ms ease;

  /* States */
  &:hover {
    background: var(--chip-bg-hover);
  }

  &:active {
    background: var(--chip-bg-active);
  }

  &--selected {
    background: var(--primitive-zinc-950);
    color: var(--primitive-zinc-50);
  }
}
```

**Import:**
```css
/* packages/css/src/components/index.css */
@import './chip.css';
```

**Build:**
```bash
cd packages/css && pnpm build
```

---

### PASO 3: Component (15 min)

**Archivo:** `packages/components-astro/src/atoms/Chip.astro`

```astro
---
/**
 * Chip (Filterable Tag)
 *
 * @param {boolean} selected - Whether chip is selected
 * @param {string} value - Chip value (for filtering)
 * @param {string} class - Additional CSS classes
 */

interface Props {
  selected?: boolean;
  value?: string;
  class?: string;
  [key: string]: any;
}

const {
  selected = false,
  value = "",
  class: className = "",
  ...rest
} = Astro.props;
---

<button
  class:list={[
    "chip",
    { "chip--selected": selected },
    className,
  ]}
  data-chip
  data-value={value}
  data-selected={selected}
  type="button"
  {...rest}
>
  <span class="chip__text" data-chip-text>
    <slot />
  </span>
</button>
```

**Export:**
```ts
// packages/components-astro/src/index.ts
export { default as Chip } from './atoms/Chip.astro';
```

---

### PASO 4: Animations (20 min)

**Archivo:** `packages/animations/src/chip.ts`

```typescript
/**
 * @module chip
 * Chip filter animations
 */

import { gsap } from "./config";
import { prefersReducedMotion } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

export function initChip(config: AnimationConfig = {}): CleanupFn {
  if (prefersReducedMotion()) return NOOP;

  const scope = config.scope || document;
  const chips = scope.querySelectorAll<HTMLElement>("[data-chip]");

  if (!chips.length) return NOOP;

  const tweens: gsap.core.Tween[] = [];

  chips.forEach((chip) => {
    // Hover scale animation
    chip.addEventListener("mouseenter", () => {
      const tween = gsap.to(chip, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });
      tweens.push(tween);
    });

    chip.addEventListener("mouseleave", () => {
      const tween = gsap.to(chip, {
        scale: 1,
        duration: 0.2,
        ease: "power2.in",
      });
      tweens.push(tween);
    });

    // Click animation
    chip.addEventListener("click", () => {
      const tween = gsap.fromTo(
        chip,
        { scale: 0.95 },
        { scale: 1, duration: 0.3, ease: "back.out(2)" }
      );
      tweens.push(tween);
    });
  });

  return () => {
    tweens.forEach((t) => t.kill());
  };
}
```

**Export:**
```ts
// packages/animations/src/index.ts
export { initChip } from "./chip";

export function initAllAnimations(scope = document): CleanupFn {
  const config = { scope };
  const cleanups: CleanupFn[] = [];

  // ... other inits ...
  cleanups.push(initChip(config));

  return () => cleanups.forEach(fn => fn());
}
```

**Build:**
```bash
cd packages/animations && pnpm build
```

---

## 🧪 Testing

**Test page:**
```astro
---
import { Chip } from "@atomchat/components-astro";
---

<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@atomchat/tokens/build/css/tokens.css">
  <link rel="stylesheet" href="node_modules/@atomchat/css/dist/atom.css">
</head>
<body>
  <Chip value="react">React</Chip>
  <Chip value="vue">Vue</Chip>
  <Chip value="svelte" selected>Svelte</Chip>

  <script>
    import { initAllAnimations } from "@atomchat/animations";
    initAllAnimations();
  </script>
</body>
</html>
```

---

## ✅ Checklist

```
TOKENS
[ ] Created component JSON in src/component/
[ ] All values reference primitives
[ ] All tokens have $type field
[ ] Ran pnpm build
[ ] Verified output in build/css/tokens.css

CSS
[ ] Created component CSS in src/components/
[ ] ZERO hardcoded values (only var(--tokens))
[ ] Followed BEM naming
[ ] Imported in components/index.css
[ ] Ran pnpm build
[ ] Verified output in dist/atom.css

COMPONENT
[ ] Created .astro file in src/atoms/
[ ] Props interface with JSDoc
[ ] data-{component} on root
[ ] data-{component}-{element} on children
[ ] NO <style> or <script> tags
[ ] Exported in index.ts

ANIMATIONS
[ ] Created module in src/
[ ] Exported init{Name}(): CleanupFn
[ ] Uses querySelector("[data-{component}]")
[ ] Returns cleanup function
[ ] Exported in index.ts
[ ] Added to initAllAnimations()
[ ] Ran pnpm build

TESTING
[ ] All variants render correctly
[ ] Tokens applied (DevTools check)
[ ] Animations work (hover, click, etc.)
[ ] data-attributes present
[ ] Reduced motion respected
[ ] Edge cases handled
```

---

## 🚫 Common Mistakes

| ❌ Don't | ✅ Do |
|---------|-------|
| `padding: 8px;` | `padding: var(--chip-padding-y) var(--chip-padding-x);` |
| `background: #f4f4f5;` | `background: var(--chip-bg-default);` |
| Add `<style>` in component | Use `@atomchat/css` |
| Import animations in component | Use `initAllAnimations()` in Layout |
| Forget `data-chip-text` | Add data-attributes for animations |
| Copy local files | Import from `@atomchat/*` packages |

---

## 📦 Package Commands

```bash
# Build individual package
cd packages/{name} && pnpm build

# Build all packages (respects dependencies)
pnpm build

# Validate tokens before build
node scripts/validate-tokens.js

# Watch mode (tokens or css)
cd packages/tokens && pnpm dev
cd packages/css && pnpm dev

# Publish to npm
pnpm changeset
pnpm changeset version
pnpm release
```

---

## 🔗 Quick Links

- [Full Architecture Guide](./COMPONENT_ARCHITECTURE.md)
- [Project Instructions](./CLAUDE.md)
- [Token Decisions](./DEFERRED_TO_CSS.md)
- [W3C DTCG Spec](https://tr.designtokens.org/format/)
- [Style Dictionary](https://styledictionary.com/)
- [GSAP Docs](https://gsap.com/docs/)

---

**Tiempo estimado por componente:** ~50 minutos

1. Tokens: 5 min
2. CSS: 10 min
3. Component: 15 min
4. Animations: 20 min
