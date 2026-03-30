# Patterns Deferred to @atomchat/css

These CSS custom properties exist in the ATOM_website SCSS source but **cannot be represented as W3C DTCG tokens** because they use composite CSS values (multiple `var()` references, `rgba()` with variable opacity, border shorthands, or media query logic).

They will be implemented in the `@atomchat/css` package as plain CSS custom properties that consume the DTCG token primitives/semantics compiled by `@atomchat/tokens`.

---

## 1. Motion Composite Shorthands (7 tokens)

**Why deferred:** Each combines a duration token + easing token into a single `transition`-compatible shorthand. DTCG has no "composite transition" type.

```css
:root {
  --animation-quarter:     var(--duration-quarter) var(--ease-default);    /* 0.15s cubic-bezier(...) */
  --animation-half:        var(--duration-half) var(--ease-default);       /* 0.3s cubic-bezier(...) */
  --animation-default:     var(--duration-default) var(--ease-default);    /* 0.6s cubic-bezier(...) */
  --animation-onehalf:     var(--duration-onehalf) var(--ease-default);    /* 0.9s cubic-bezier(...) */
  --animation-double:      var(--duration-double) var(--ease-default);     /* 1.2s cubic-bezier(...) */
  --animation-ease:        0.2s ease;
  --animation-ease-double: 0.4s ease;
}
```

**Consumed by:** `transition` property shorthand — `transition: opacity var(--animation-half);`

---

## 2. Glass rgba() with var() Tokens (12 tokens)

**Why deferred:** CSS `rgba()` function with a `var()` opacity argument. DTCG color type requires a resolved value, not a dynamic function.

### Semantic glass (8 tokens)

```css
:root {
  /* Light theme glass backgrounds */
  --glass-bg-light:              rgba(255, 255, 255, var(--primitive-glass-bg-opacity-light));
  --glass-bg-light-hover:        rgba(255, 255, 255, var(--primitive-glass-bg-opacity-medium));

  /* Dark theme glass backgrounds */
  --glass-bg-dark:               rgba(0, 0, 0, var(--primitive-glass-bg-opacity-light));
  --glass-bg-dark-hover:         rgba(0, 0, 0, var(--primitive-glass-bg-opacity-medium));

  /* Light theme glass borders */
  --glass-border-light:          rgba(255, 255, 255, var(--primitive-glass-border-opacity-medium));
  --glass-border-light-strong:   rgba(255, 255, 255, var(--primitive-glass-border-opacity-strong));

  /* Dark theme glass borders */
  --glass-border-dark:           rgba(255, 255, 255, var(--primitive-glass-border-opacity-subtle));
  --glass-border-dark-strong:    rgba(255, 255, 255, var(--primitive-glass-border-opacity-medium));
}
```

### Component glass aliases (4 tokens)

```css
:root {
  --frosted-glass-bg:            var(--glass-bg-light);
  --frosted-glass-bg-hover:      var(--glass-bg-light-hover);
  --frosted-glass-border:        var(--glass-border-light);
  --frosted-glass-border-hover:  var(--glass-border-light-strong);
}
```

---

## 3. Component Composite Shorthands (3 tokens)

**Why deferred:** Multi-value CSS shorthands that combine multiple tokens.

```css
:root {
  /* Chip: two-value padding shorthand */
  --chip-padding-xs: var(--primitive-spacing-xs) var(--primitive-spacing-s);  /* 4px 8px */

  /* Skeleton: border shorthand (width + style + color) */
  --skeleton-card-border:      var(--stroke-xs) solid var(--border-tertiary);
  --skeleton-card-border-dark: var(--stroke-xs) solid var(--primitive-zinc-700);
}
```

---

## 4. Dark Theme Overrides (11 tokens)

**Why deferred:** CSS custom property overrides inside `[data-theme="dark"]` selector. DTCG tokens are selector-agnostic. Phase 5 of the token migration will configure Style Dictionary to compile `themes/dark/*.json` into a separate `dark.css` file.

### Color overrides (5 tokens — already in `themes/dark/colors.json`)

```css
[data-theme="dark"] {
  --fg-primary:           var(--primitive-neutral-0);
  --fg-secondary:         var(--primitive-zinc-200);
  --fg-tertiary:          var(--primitive-zinc-300);
  --fg-inverse-primary:   var(--primitive-zinc-900);
  --fg-inverse-secondary: var(--primitive-zinc-800);
}
```

### Glass dark overrides (6 tokens — depends on deferred glass tokens)

```css
[data-theme="dark"] {
  --frosted-glass-bg:           var(--glass-bg-dark);
  --frosted-glass-bg-hover:     var(--glass-bg-dark-hover);
  --frosted-glass-border:       var(--glass-border-dark);
  --frosted-glass-border-hover: var(--glass-border-dark-strong);
  --glassmorphism-bg:           rgba(0, 0, 0, 0.3);
  --glassmorphism-border:       rgba(255, 255, 255, 0.1);
}
```

---

## 5. Responsive Typography (media query overrides)

**Why deferred:** Media queries are a CSS-only construct. DTCG has no concept of conditional values.

The ATOM_website overrides text sizes at three breakpoints:

| Breakpoint | Max Width | Scope |
|-----------|-----------|-------|
| MD | 1280px | Tablet text size reductions |
| SM | 960px | Mobile landscape reductions |
| XS | 599px | Mobile portrait reductions |

These will be implemented in `@atomchat/css` as `@media` rules that reassign the semantic text-size custom properties.

---

## 6. SCSS Breakpoint Mixins

**Why deferred:** SCSS mixins are build-time constructs, not runtime values.

| Mixin | Usage | Description |
|-------|-------|-------------|
| `respond-to($bp)` | `@include respond-to(md) { ... }` | Exact breakpoint range |
| `min-width($bp)` | `@include min-width(md) { ... }` | Mobile-first (min-width) |
| `max-width($bp)` | `@include max-width(md) { ... }` | Desktop-first (max-width) |

Breakpoint values (consumed by mixins):

| Key | Min | Max |
|-----|-----|-----|
| xs | 0px | 599px |
| sm | 600px | 960px |
| md | 961px | 1280px |
| lg | 1281px | 1920px |
| xl | 1921px | -- |

> Note: Foundation breakpoint tokens already exist in `@atomchat/tokens` (`Primitive.Breakpoint.*`). These mixins will be part of the CSS package as SCSS utilities that consume those token values.

---

## Summary

| Category | Tokens | Reason |
|----------|--------|--------|
| Motion shorthands | 7 | Composite (duration + easing) |
| Glass rgba + var | 12 | Dynamic opacity in rgba() |
| Component shorthands | 3 | Multi-value CSS shorthands |
| Dark theme overrides | 11 | Selector-scoped values |
| Responsive typography | ~45 | Media query overrides |
| SCSS mixins | 3 | Build-time constructs |

**Total deferred**: ~33 custom properties + ~45 responsive overrides + 3 SCSS mixins
