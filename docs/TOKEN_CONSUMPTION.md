# Token Consumption Guide — Cross-Framework

Cómo los componentes de cada tecnología consumen los tokens de Figma a través del pipeline de ATOM Design System.

**Última actualización:** 2026-04-19
**Autor:** Design System Team

---

## Pipeline Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        FIGMA (Source of Truth)                           │
│                  Variables: Colors, Spacing, Typography                  │
└────────────────────────────────┬─────────────────────────────────────────┘
                                 │
                                 │ pnpm figma:pull
                                 │ (MCP via /figma-pull skill)
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                   @atomchat.io/tokens (Source Layer)                     │
│                                                                          │
│  src/figma/**/*.json          ← Synced from Figma (read-only)          │
│  src/foundation/**/*.json     ← Manual primitives + Figma bridges       │
│  src/semantic/**/*.json       ← Design decisions (roles)                │
│  src/components/**/*.json     ← Component-level tokens                  │
└────────────────────────────────┬─────────────────────────────────────────┘
                                 │
                                 │ pnpm build
                                 │ (Style Dictionary v4 + transforms)
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                   @atomchat.io/tokens (Build Layer)                      │
│                                                                          │
│  build/css/tokens.css         ← 1,110 CSS custom properties            │
│  build/css/dark.css           ← Dark theme overrides                    │
│  build/scss/_tokens.scss      ← SCSS variables ($var-name)             │
│  build/js/tokens.js           ← ESM exports (camelCase)                 │
│  build/json/tokens.json       ← Flat key-value pairs                    │
└────────────────────────────────┬─────────────────────────────────────────┘
                                 │
                                 │ consumed by
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                     @atomchat.io/css (CSS Layer)                         │
│                                                                          │
│  Component CSS files consume build/css/tokens.css via var(--token)      │
│  ZERO hardcoded values — everything references tokens                   │
└────────────────────────────────┬─────────────────────────────────────────┘
                                 │
                                 │ imported by frameworks
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                       FRAMEWORK COMPONENTS                               │
│                                                                          │
│  React, Vue, Angular, Astro — all consume @atomchat.io/css             │
│  Components use CSS classes, styles come from token-based CSS           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Token Layers (3-Tier Architecture)

### Layer 1: Foundation (Primitives)

Raw design values. The base scale.

**Examples:**
- `--primitive-zinc-950`: `#09090b`
- `--primitive-spacing-m`: `16px`
- `--primitive-radius-s`: `8px`

**Naming:** `--primitive-{category}-{scale}`

**Source Files:** `src/foundation/*.json`

**Purpose:** Single source of truth for raw values. Never used directly in components.

---

### Layer 2: Semantic (Roles)

Design decisions mapped to use cases.

**Examples:**
- `--bg-primary`: `var(--figma-colors-primitive-neutral-0)` → white
- `--fg-primary`: `var(--figma-colors-primitive-zinc-900)` → dark text
- `--sm`: `var(--primitive-spacing-sm)` → 12px spacing

**Naming:** `--{role}-{variant}` or `--{size-name}`

**Source Files:** `src/semantic/*.json`

**Purpose:** Used directly in component CSS when values follow global scale (spacing, typography, motion).

---

### Layer 3: Component (Scoped)

Component-specific, per-state tokens.

**Examples:**
- `--buttons-bg-primary-enabled`: `var(--bg-inverse-primary)`
- `--checkbox-shadow-focus`: `0px 0px 0px 2px var(--primitive-alpha-400)`
- `--avatar-structure-size-m`: `40px`

**Naming:** `--{component}-{property}-{variant}-{state}`

**Source Files:** `src/components/**/*.json`

**Purpose:** Used in component CSS when values need to vary independently from global system (e.g., button colors change per state, but spacing follows global scale).

---

## Hybrid Consumption Pattern (Decision Criteria)

Component CSS uses a **hybrid pattern** — mixing component tokens (Layer 3) and direct semantic tokens (Layer 2).

### When to use Component Tokens (Layer 3)

**Rule:** "Does this value need to vary independently from the global system?"

**YES → Use component token**

**Examples:**
- Button background colors (varies per variant: primary, secondary, danger)
- Checkbox border colors (varies per state: enabled, focused, disabled, error)
- Avatar badge sizes (specific to avatar sizing, not global scale)

```css
/* ✅ Component token — varies per button variant/state */
.button--primary {
  background-color: var(--buttons-bg-primary-enabled);
}

.button--primary:hover {
  background-color: var(--buttons-bg-primary-hovered);
}
```

### When to use Semantic Tokens (Layer 2)

**Rule:** "Does this value follow the global system scale?"

**NO independent variance → Use semantic token directly**

**Examples:**
- Spacing/padding (follows global spacing scale: xs, s, m, l, xl)
- Border radius (follows global radius scale: s, m, l, pill)
- Typography (follows global font size/line-height scale)
- Motion (follows global duration/easing scale)

```css
/* ✅ Semantic token — follows global spacing scale */
.button {
  padding: var(--s) var(--m);
  border-radius: var(--radius-s);
  gap: var(--xs);
  transition: background-color var(--duration-half);
}
```

### Visual Reference

```
Component CSS Consumption Pattern
──────────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│ .button--primary {                                          │
│   /* Component tokens — state-specific colors */            │
│   background: var(--buttons-bg-primary-enabled);            │
│   color: var(--buttons-fg-primary-enabled);                 │
│                                                             │
│   /* Semantic tokens — global scale */                      │
│   padding: var(--s) var(--m);                              │
│   border-radius: var(--radius-s);                          │
│   gap: var(--xs);                                          │
│   transition: background var(--duration-half);             │
│ }                                                           │
└─────────────────────────────────────────────────────────────┘
        ▲                              ▲
        │                              │
   Layer 3                        Layer 2
   (component)                    (semantic)
```

---

## Framework Consumption

All frameworks follow the same pattern: **import CSS, use class names**.

### React (`@atomchat.io/components-react`)

**Setup:**

```tsx
// app/layout.tsx or _app.tsx
import '@atomchat.io/css/dist/atom.css';
```

**Component:**

```tsx
// Button.tsx
import { forwardRef } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  // ...
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'm', children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'button',
          `button--${variant}`,
          `button--${size}`,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
```

**Token consumption:** Through CSS classes. All styles come from `@atomchat.io/css` which uses tokens.

**Build:** tsup → ESM + CJS + `.d.ts`

**Peer deps:** `react ^18.0.0 || ^19.0.0`, `@atomchat.io/css: workspace:*`

---

### Vue (`@atomchat.io/components-vue`)

**Setup:**

```ts
// main.ts
import '@atomchat.io/css/dist/atom.css';
```

**Component:**

```vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'm'
});
</script>

<template>
  <button
    :class="[
      'button',
      `button--${variant}`,
      `button--${size}`,
      $attrs.class
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
```

**Token consumption:** Through CSS classes. All styles come from `@atomchat.io/css` which uses tokens.

**Build:** Vite 6 + vite-plugin-dts → ESM + `.d.ts`

**Peer deps:** `vue ^3.4.0`, `@atomchat.io/css: workspace:*`

---

### Angular (`@atomchat.io/components-angular`)

**Setup:**

```ts
// angular.json
{
  "styles": [
    "node_modules/@atomchat.io/css/dist/atom.css"
  ]
}
```

**Component:**

```ts
// button.component.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'atom-button',
  standalone: true,
  template: `
    <button
      [class]="'button button--' + variant() + ' button--' + size() + (class() ? ' ' + class() : '')"
      [attr.disabled]="disabled() || null"
    >
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary'>('primary');
  size = input<'xs' | 's' | 'm' | 'l' | 'xl'>('m');
  disabled = input(false);
  class = input<string>();
}
```

**Token consumption:** Through CSS classes. All styles come from `@atomchat.io/css` which uses tokens.

**Build:** ng-packagr → APF format

**Peer deps:** `@angular/core ^21.0.0`, `@atomchat.io/css: workspace:*`

---

### Astro (`@atomchat.io/components-astro`)

**Setup:**

```astro
---
// src/layouts/BaseLayout.astro
import '@atomchat.io/css/dist/atom.css';
---
```

**Component:**

```astro
---
// Button.astro
interface Props {
  variant?: "Primary" | "Secondary";
  size?: "xs" | "s" | "m" | "l" | "xl";
  href?: string;
  class?: string;
}

const {
  variant = "Primary",
  size = "m",
  href,
  class: className = "",
  ...rest
} = Astro.props;

const variantMap = {
  "Primary": "primary",
  "Secondary": "secondary"
};

const Tag = href ? "a" : "button";
---

<Tag
  class:list={[
    "button",
    `button--${variantMap[variant]}`,
    `button--${size}`,
    className
  ]}
  {...href ? { href } : {}}
  {...rest}
>
  <slot />
</Tag>
```

**Token consumption:** Through CSS classes. All styles come from `@atomchat.io/css` which uses tokens.

**Build:** None (`.astro` files consumed directly)

**Peer deps:** `astro >=4.0.0`, `@atomchat.io/css: workspace:*`

---

## CSS Package Architecture

**Package:** `@atomchat.io/css`

**Structure:**

```
packages/css/
├── src/
│   ├── foundation/        ← Base styles (reset, typography)
│   ├── components/        ← Component styles (button, checkbox, etc.)
│   │   ├── buttons/
│   │   ├── forms/
│   │   ├── indicators/
│   │   ├── layout/
│   │   ├── media/
│   │   ├── navigation/
│   │   └── typography/
│   ├── utilities/         ← Utility classes (glass, motion, helpers)
│   └── index.css          ← Entry point (imports all)
├── dist/
│   └── atom.css           ← 42.5 kB compiled bundle
└── package.json
```

**Build:** Vite 6 + LightningCSS (pure asset build, NOT lib mode)

**Golden Rules:**
1. ❌ ZERO hardcoded values
2. ✅ ALL values use `var(--token-name)`
3. ✅ Hybrid pattern: component tokens for colors, semantic for spacing/typography/motion

**Entry file:** `dist/atom.css`

**Usage in frameworks:**

```ts
import '@atomchat.io/css/dist/atom.css';
```

---

## Dark Theme

**File:** `build/css/dark.css`

**Selector:** `[data-theme="dark"]`

**Overrides:** 5 semantic color tokens only (primitives stay constant)

**Usage:**

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

**Import:**

```ts
import '@atomchat.io/css/dist/atom.css';
import '@atomchat.io/tokens/build/css/dark.css'; // optional, if needed
```

**Auto-detection:**

```ts
// Detect OS preference
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
```

---

## Development Workflow

### 1. Pull from Figma

```bash
# When Figma variables change
pnpm figma:pull
```

**What happens:**
- MCP fetches all variables from Figma
- Writes to `src/figma/**/*.json`
- Detects changes via diff
- Prompts for confirmation

### 2. Build Tokens

```bash
cd packages/tokens
pnpm build
```

**What happens:**
- Style Dictionary reads `src/**/*.json`
- Applies custom transforms:
  - `atom/spacing/canonical-name` — cleans Figma spacing names
  - `atom/spacing/px` — adds `px` unit
  - Built-in transforms for colors, rem units, etc.
- Outputs to `build/css/`, `build/scss/`, `build/js/`, `build/json/`

### 3. Build CSS Package

```bash
cd packages/css
pnpm build
```

**What happens:**
- Vite bundles all CSS files
- LightningCSS minifies and optimizes
- Outputs to `dist/atom.css`

### 4. Framework Components

**No build step needed** — components import CSS and use class names.

```bash
# React/Vue/Angular
cd packages/components-{react|vue|angular}
pnpm build  # Builds components, CSS is peer dependency

# Astro
# No build — .astro files consumed directly
```

---

## Anti-Patterns

### ❌ DON'T: Hardcode values in component CSS

```css
/* ❌ WRONG */
.button {
  padding: 8px 16px;
  background: #3b82f6;
}
```

```css
/* ✅ CORRECT */
.button {
  padding: var(--s) var(--m);
  background: var(--buttons-bg-primary-enabled);
}
```

### ❌ DON'T: Use primitive tokens in components

```css
/* ❌ WRONG — skips semantic layer */
.button {
  background: var(--primitive-zinc-950);
  padding: var(--primitive-spacing-m);
}
```

```css
/* ✅ CORRECT — uses appropriate tier */
.button {
  background: var(--buttons-bg-primary-enabled);  /* component token */
  padding: var(--m);                              /* semantic token */
}
```

### ❌ DON'T: Create CSS custom properties in component files

```css
/* ❌ WRONG — tokens belong in @atomchat/tokens */
:root {
  --my-custom-color: #ff0000;
}
```

```css
/* ✅ CORRECT — define in tokens, reference in CSS */
/* In src/semantic/colors.json */
{
  "my-custom-color": {
    "$value": "{figma.colors.primitive.red.500}",
    "$type": "color"
  }
}

/* In component CSS */
.my-component {
  color: var(--my-custom-color);
}
```

### ❌ DON'T: Edit build/ or dist/ files manually

```bash
# ❌ WRONG
vim packages/tokens/build/css/tokens.css

# ✅ CORRECT — edit source, rebuild
vim packages/tokens/src/semantic/colors.json
cd packages/tokens && pnpm build
```

---

## Token Gaps & Workarounds

Some values have **no semantic equivalent** and must use primitives. These are documented gaps.

### Known Gaps (3 total)

| File | Line | Primitive | Reason | Solution |
|------|------|-----------|--------|----------|
| `skeleton.css` | 37 | `--primitive-zinc-700` | No `--border-inverse-subtle` semantic | Needs dark border token in semantic layer |
| `skeleton.css` | 38 | `--primitive-zinc-900` | Falls between `--bg-inverse-primary` (950) and `--bg-inverse-secondary` (800) | Needs `--bg-inverse-surface` semantic |
| `checkbox.css` | 48 | `--primitive-alpha-400` | No semantic for focus ring alpha color | Needs `--focus-ring-color` semantic |

**These gaps require Figma design decisions** — adding new semantic tokens to the design system.

---

## Performance Considerations

### Bundle Size

- **Tokens CSS:** 1,110 custom properties = ~45 kB unminified
- **@atomchat/css:** 42.5 kB minified
- **Total runtime CSS:** ~50 kB (gzipped: ~8 kB)

### Tree Shaking

❌ **CSS is NOT tree-shakeable** — all tokens/styles ship to client.

**Optimization:** Use CSS-in-JS or atomic CSS if bundle size is critical.

### Runtime Performance

✅ **CSS custom properties are fast** — browser-native, no JS overhead.

✅ **No style recalculation** — changing `data-theme` only updates overridden properties.

---

## Tooling

### VSCode IntelliSense

Install **CSS Variable Autocomplete** extension for token autocomplete in CSS files.

### Figma Sync

**Skill:** `/figma-pull` (MCP)

**Trigger:** When Figma variables change

**Frequency:** On-demand (not automated)

### Style Dictionary

**Version:** 4.4.0

**Config:** `packages/tokens/config/style-dictionary.config.ts`

**Custom transforms:**
- `atom/spacing/canonical-name` — value-based naming (40 → 2xl)
- `atom/spacing/px` — adds px unit

---

## Changelog

| Date | Change | Impact |
|------|--------|--------|
| 2026-04-19 | Spacing transform layer implemented | Figma names cleaned (2xxl → 2xl) |
| 2026-04-19 | CSS token cleanup | 7 files fixed, 3 gaps documented |
| 2026-04-19 | Astro StatusIcon eliminated | Integrated into Avatar, CSS moved to avatar.css |
| 2026-04-19 | Component CSS reorganization | Organized into semantic subfolders |

---

## FAQ

### Q: Can I use tokens directly in framework components?

**A:** No. Tokens are consumed through CSS. Framework components use CSS classes, and the CSS files use `var(--token)`.

### Q: What if I need a custom color not in the design system?

**A:** Add it to `src/semantic/colors.json` as an alias to a Figma primitive, then rebuild tokens.

### Q: Can I override tokens at runtime?

**A:** Yes. Set CSS custom properties in inline styles or runtime CSS:

```tsx
<button style={{ '--buttons-bg-primary-enabled': 'red' }}>
  Custom red
</button>
```

### Q: How do I add a new token?

**A:** Add to `src/semantic/*.json`, run `pnpm build` in tokens package, use `var(--new-token)` in CSS.

### Q: Why hybrid pattern instead of all component tokens?

**A:** Spacing/typography/motion follow global scales. Using semantic tokens directly keeps the system consistent and reduces token bloat.

---

## Resources

- [Token Architecture](/packages/tokens/ARCHITECTURE.md) — How tokens are generated
- [Component Architecture](./COMPONENT_ARCHITECTURE.md) — Component patterns per framework
- [Figma Sync Guide](/packages/tokens/FIGMA_SYNC.md) — How to sync from Figma
- [Style Dictionary Docs](https://styledictionary.com/) — SD v4 reference

---

**Maintained by:** ATOM Design System Team
**Last reviewed:** 2026-04-19
