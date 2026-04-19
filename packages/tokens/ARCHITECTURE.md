# Token Architecture — ATOM Design System

## Token Pipeline

```
Figma Variables
      |
      | pnpm figma:pull (MCP)
      v
src/figma/**/*.json          ← raw Figma output (never edit manually)
      |
      | Style Dictionary build (transforms clean names)
      v
build/css/*.css              ← compiled output (never edit manually)
build/js/*.js
build/json/*.json
```

The manual token chain runs in parallel:

```
src/foundation/**/*.json     ← primitives (hardcoded values OR figma aliases)
      |
      | references via {Primitive.*} or {figma.*}
      v
src/semantic/**/*.json       ← design decisions (roles, use cases)
      |
      | references via {bg.*}, {fg.*}, {border.*}
      v
src/components/**/*.json     ← component-level tokens (per-state decisions)
      |
      | SD build
      v
build/css/components.css     ← var(--buttons-bg-primary-enabled)
      |
      | consumed by
      v
packages/css/src/**/*.css    ← component CSS that uses var(--token)
```

---

## Token Sources

### 1. Figma-synced (`src/figma/`)

Output of `pnpm figma:pull`. Never edit manually.
SD transforms clean names at build time (e.g., `2xxl` -> `2xl` for spacing).

| Directory | Content |
|-----------|---------|
| `figma/primitives/` | colors, spacing, radius, stroke, opacity, typography, breakpoints |
| `figma/semantics/` | semantic colors, light/dark modes, component tokens |
| `figma/web-library/` | Figma Variables collections |

### 2. Foundation (`src/foundation/`)

Manual primitives. The base design scale.

| File | Source | Notes |
|------|--------|-------|
| `colors.json` | **Hardcoded hex** | Original manual palette (Primitive.Red.500, etc.) |
| `colors-from-figma.json` | **Bridge to figma** | Aliases `primitive.*` -> `{figma.colors.*}` |
| `spacing.json` | Manual values | 30 tokens, xxs-17xl (cleaned in this PR) |
| `typography.json` | Manual values | Font families, weights, sizes, line heights |
| `borders.json` | Manual values | Radius scale + stroke widths |
| `opacity.json` | Manual values | 0-1 decimal scale |
| `elevations.json` | Manual values | Box shadows (card, popover, dialog) |
| `glass.json` | Manual values | Backdrop blur + rgba backgrounds |
| `z-index.json` | Manual values | Stacking hierarchy (0-10001) |
| `motion.json` | Manual values | Easing curves + durations |
| `breakpoints.json` | Manual values | Responsive breakpoints + UI metadata |

### 3. Semantic (`src/semantic/`)

Design decisions. Maps roles to primitives.

| File | References |
|------|------------|
| `colors.json` | `{figma.colors.primitive.*}` (direct to figma, bypasses foundation) |
| `spacing.json` | `{Primitive.Spacing.*}` (references foundation) |
| `typography.json` | References foundation typography |
| `glass.json` | References foundation glass |

### 4. Component (`src/components/`)

Per-component, per-state token decisions.
Organized in subfolders: `buttons/`, `forms/`, `indicators/`, `layout/`, `effects/`, `media/`.

Legacy root files (duplicates of subfolder files) still exist but are deprecated.

---

## Legacy Sources

### Problem: Two parallel color systems

```
foundation/colors.json          ← hardcoded hex: "#FB2C37"
foundation/colors-from-figma.json ← bridge alias: "{figma.colors.primitive.stone.50}"
```

Both produce `Primitive.*` tokens. SD merges them (last source wins).

### Problem: Semantic skips foundation

```
semantic/colors.json references {figma.colors.primitive.*} directly
                     NOT {Primitive.*}
```

This means `foundation/colors.json` (hardcoded hex) is effectively dead
for color tokens. The chain is:

```
Expected:  figma → foundation → semantic → component
Actual:    figma ─────────────→ semantic → component
                 foundation (orphaned for colors)
```

### Resolved: Duplicate component files

Root-level duplicates were deleted. All component tokens now live
exclusively in their subfolder:

```
components/
  buttons/      button.json, link-button.json
  forms/        checkbox.json, radio.json, toggle.json
  indicators/   badge.json, chip.json, skeleton.json, spinner.json, status-icon.json, tag.json
  effects/      glass.json
  layout/       divider.json, layout.json, navbar.json
  media/        avatar.json
```

Token collisions dropped from 930 to 4 (remaining: `Primitive.Stroke` type overlap + `container.width.sm` duplicate key).

---

## Component CSS Consumption Pattern

### Hybrid pattern (current, correct)

Component CSS uses **two strategies** based on a single criterion:

> **Does this value need to vary independently from the global system?**

#### Via component token (colors, radius, shadows)

Colors have states (hover, focus, pressed, disabled, loading).
Each variant needs different colors. This requires component-level indirection.

```css
/* button.css — colors go through component tokens */
.button--primary {
  --btn-bg: var(--buttons-bg-primary-enabled);
  --btn-bg-hover: var(--buttons-bg-primary-hovered);
}

.button:hover {
  --btn-bg: var(--btn-bg-hover);  /* swap intermediate var */
}

.button {
  background-color: var(--btn-bg);  /* base reads intermediate */
}
```

The chain: `figma → semantic → component JSON → component CSS intermediate var → base rule`

#### Direct semantic (spacing, typography, motion)

Spacing follows the global scale. If the system spacing changes,
ALL components should update simultaneously. No per-component override needed.

```css
/* button.css — spacing goes directly to semantic */
.button--xs { padding: var(--xs) var(--s); }
.button--s  { padding: var(--s); }
.button--m  { padding: var(--sm); }
```

The chain: `foundation → semantic → component CSS (direct)`

### Decision criteria for new components

```
Does this value have states (hover/focus/pressed/disabled)?
  YES → component token + intermediate CSS var
  NO  ↓

Can this value differ from the global scale per component?
  YES → component token
  NO  ↓

Should a Figma change propagate to ALL components at once?
  YES → consume semantic directly
  NO  → component token
```

**Typical mapping:**

| Property | Strategy | Why |
|----------|----------|-----|
| Background color | Component token | Has states, varies per variant |
| Text color | Component token | Has states, varies per variant |
| Border color | Component token | Has states, varies per variant |
| Box shadow | Component token | Focus rings differ per variant |
| Border radius | Component token | May differ per component (input vs button) |
| Padding | Direct semantic | Follows global spacing scale |
| Gap | Direct semantic | Follows global spacing scale |
| Font size | Direct semantic | Follows global type scale |
| Font weight | Direct semantic | Follows global type scale |
| Duration | Direct semantic | Follows global motion scale |

---

## Build Pipeline

### Tokens build

```bash
cd packages/tokens

# Full build (prebuild validator + SD light + SD dark)
pnpm build

# SD only (bypasses prebuild validator — use when broken refs exist)
pnpm exec style-dictionary build --config config/style-dictionary.config.mjs
pnpm exec style-dictionary build --config config/style-dictionary.dark.config.mjs
```

### Custom transforms (spacing only, figma layer only)

Two transforms registered in `config/transforms.mjs`:

| Transform | Type | Filter | Effect |
|-----------|------|--------|--------|
| `atom/spacing/canonical-name` | name | figma/ spacing tokens | Maps value -> canonical name via `scales.mjs` |
| `atom/spacing/px` | value | figma/ spacing tokens | Appends `px` unit to raw numbers |

These only affect `src/figma/primitives/spacing.json` output.
Foundation/semantic/component spacing is cleaned by manual key renames.

### CSS build

```bash
cd packages/css
pnpm build    # Vite → dist/atom.css
```

### CSS import order in @atomchat/css

```
index.css
  ├── foundation/index.css    ← reset, base, typography
  ├── layout/index.css        ← container, stack, grid
  ├── components/index.css    ← button, badge, skeleton, etc.
  └── utilities/index.css     ← motion, glass, responsive, helpers
```

Token CSS files (`tokens.css`, `foundation.css`, `semantic.css`, `components.css`)
are loaded by the **consumer project**, not by `@atomchat/css` itself.
The consumer must load tokens before the CSS package.

---

## File ownership

| Path | Owner | Editable? |
|------|-------|-----------|
| `src/figma/**` | `pnpm figma:pull` | NO — regenerated on sync |
| `src/foundation/**` | Manual | YES |
| `src/semantic/**` | Manual | YES |
| `src/components/**` | Manual | YES |
| `config/scales.mjs` | Manual | YES — extend spacing scale here |
| `config/transforms.mjs` | Manual | YES — add new transforms here |
| `config/style-dictionary.*.mjs` | Manual | YES |
| `build/**` | SD build | NO — regenerated on build |
| `themes/dark/**` | Manual | YES — dark theme overrides |
