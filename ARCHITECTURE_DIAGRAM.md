# ATOM Design System — Architecture Diagram

Visual reference de cómo fluyen los datos desde tokens hasta el componente funcional.

---

## 🎯 El Sistema Completo

```
┌──────────────────────────────────────────────────────────────────┐
│                      FIGMA (Design)                              │
│                  Colors, Spacing, Typography                     │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│              LAYER 1: TOKENS (@atomchat/tokens)                  │
├──────────────────────────────────────────────────────────────────┤
│  Source: JSON (W3C DTCG)                                         │
│  ├─ primitive/color.json      → { "zinc-950": "#09090b" }        │
│  ├─ semantic/bg.json          → { "bg-primary": "{zinc-0}" }     │
│  └─ component/badge.json      → { "badge-bg": "{bg-primary}" }   │
│                                                                  │
│  Build: Style Dictionary v4                                      │
│  Output:                                                         │
│  ├─ build/css/tokens.css     → :root { --zinc-950: #09090b; }   │
│  ├─ build/scss/_tokens.scss  → $zinc-950: #09090b;              │
│  └─ build/js/tokens.js       → export const zinc950 = "#09090b" │
│                                                                  │
│  Peer deps: NONE                                                 │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                LAYER 2: CSS (@atomchat/css)                      │
├──────────────────────────────────────────────────────────────────┤
│  Source: CSS with BEM                                            │
│  ├─ components/badge.css                                         │
│  │    .badge {                                                   │
│  │      background: var(--badge-bg-neutral-default);             │
│  │      padding: var(--badge-padding-y) var(--badge-padding-x);  │
│  │    }                                                          │
│  │                                                               │
│  ├─ components/button.css                                        │
│  └─ utilities/glass.css                                          │
│                                                                  │
│  Build: Vite 6 + LightningCSS                                    │
│  Output: dist/atom.css (single bundle)                           │
│                                                                  │
│  Peer deps: @atomchat/tokens                                     │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│          LAYER 3: COMPONENTS (@atomchat/components-astro)        │
├──────────────────────────────────────────────────────────────────┤
│  Source: .astro files (distributed as source)                    │
│  ├─ atoms/Badge.astro                                            │
│  │    <span                                                      │
│  │      class="badge badge--{type} badge--{state}"               │
│  │      data-badge                 ← Contract with animations    │
│  │      data-count={count}         ← Reactive data               │
│  │      data-context={context}     ← Behavior variant            │
│  │    >                                                          │
│  │      <span data-badge-text>     ← Animated element            │
│  │        {displayValue}                                         │
│  │      </span>                                                  │
│  │    </span>                                                    │
│  │                                                               │
│  │    NO <style>     ← Styles come from @atomchat/css           │
│  │    NO <script>    ← Animations come from @atomchat/animations│
│  │                                                               │
│  └─ atoms/Button.astro, Chip.astro, etc.                         │
│                                                                  │
│  Build: NONE (Astro components distributed as source)            │
│  Peer deps: @atomchat/tokens, @atomchat/css                      │
└─────────────────────────────────────┬────────────────────────────┘
                                      │
                                      ▼
┌──────────────────────────────────────────────────────────────────┐
│            LAYER 4: ANIMATIONS (@atomchat/animations)            │
├──────────────────────────────────────────────────────────────────┤
│  Source: TypeScript modules                                      │
│  ├─ badge.ts                                                     │
│  │    export function initBadge() {                              │
│  │      const badges = document.querySelectorAll("[data-badge]");│
│  │      const updateOdometer = initNumberOdometer();             │
│  │                                                               │
│  │      badges.forEach(badge => {                                │
│  │        const text = badge.querySelector("[data-badge-text]"); │
│  │        const observer = new MutationObserver(...)             │
│  │        observer.observe(badge, {                              │
│  │          attributes: true,                                    │
│  │          attributeFilter: ["data-count"]                      │
│  │        });                                                    │
│  │      });                                                      │
│  │                                                               │
│  │      return cleanup; // Disconnect observers + kill tweens    │
│  │    }                                                          │
│  │                                                               │
│  ├─ odometer.ts     (number rolling animation)                   │
│  ├─ reveal.ts       (scroll-triggered reveals)                   │
│  └─ index.ts        (initAllAnimations)                          │
│                                                                  │
│  Build: TypeScript compiler                                      │
│  Output: dist/ (compiled JS + .d.ts)                             │
│                                                                  │
│  Peer deps: gsap                                                 │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                    CONSUMING PROJECT                             │
│                   (ATOM_website, Next.js, etc.)                  │
├──────────────────────────────────────────────────────────────────┤
│  package.json:                                                   │
│    "@atomchat/tokens": "^1.0.0"                                  │
│    "@atomchat/css": "^0.1.0"                                     │
│    "@atomchat/components-astro": "^1.0.0"                        │
│    "@atomchat/animations": "^1.0.0"                              │
│                                                                  │
│  Layout.astro:                                                   │
│    import "@atomchat/tokens/css";                                │
│    import "@atomchat/css/atom.css";                              │
│    <script>                                                      │
│      import { initAllAnimations } from "@atomchat/animations";   │
│      initAllAnimations();                                        │
│    </script>                                                     │
│                                                                  │
│  Page.astro:                                                     │
│    import { Badge } from "@atomchat/components-astro";           │
│    <Badge count={5} type="inbox" state="focused" />             │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow: User Interaction

```
USER CLICKS "+1" BUTTON
         │
         ▼
JavaScript updates attribute:
  badge.setAttribute("data-count", "6")
         │
         ▼
MutationObserver detects change (from initBadge)
         │
         ▼
Calculate new display value:
  5 → 6 (or 99 → "99+", 49 → "+50", etc.)
         │
         ▼
Call updateOdometer(badgeText, "6")
         │
         ▼
Odometer builds roller DOM:
  <span data-badge-text>
    <span data-odometer-part="mask">
      <span data-odometer-part="roller">
        0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n1\n...
      </span>
    </span>
  </span>
         │
         ▼
GSAP animates roller position:
  y: -5 * lineHeight  →  y: -6 * lineHeight
  (0.4s duration, custom ease)
         │
         ▼
Cleanup after animation:
  - Remove roller elements
  - Replace with static text: "6"
  - Clear inline styles
         │
         ▼
USER SEES SMOOTH COUNT ANIMATION 🎉
```

---

## 🎨 CSS Custom Properties Cascade

```
:root (from @atomchat/tokens/css)
  │
  ├─ --primitive-zinc-950: #09090b
  ├─ --primitive-spacing-xxs: 2px
  ├─ --primitive-spacing-m: 16px
  │
  ├─ --bg-primary: var(--primitive-zinc-0)
  ├─ --bg-inverse: var(--primitive-zinc-950)
  │
  └─ --badge-bg-neutral-default: var(--primitive-zinc-100)
     --badge-bg-neutral-focused: var(--primitive-zinc-950)
     --badge-padding-x: var(--primitive-spacing-xxs)
     --badge-min-width: var(--primitive-spacing-m)
                       │
                       ▼
.badge (from @atomchat/css/atom.css)
  │
  background: var(--badge-bg-neutral-default)
              │
              └─ Resolves to: var(--primitive-zinc-100)
                              │
                              └─ Resolves to: #f4f4f5

BROWSER RENDERS: background-color: #f4f4f5
```

---

## 📐 Component Anatomy

```
┌─────────────────────────────────────────────────────────┐
│ <span class="badge badge--inbox badge--focused"        │ ← BEM classes (CSS)
│       data-badge                                        │ ← Discovery (animations)
│       data-count="5"                                    │ ← Reactive data (MutationObserver)
│       data-context="inbox"                              │ ← Behavior variant
│       data-state="focused"                              │ ← Visual state
│       role="status"                                     │ ← Accessibility
│       aria-label="5 notifications">                     │ ← Screen reader
│                                                         │
│   <span class="badge__text"                             │ ← BEM element (CSS)
│         data-badge-text>                                │ ← Animated element (odometer)
│     5                                                   │ ← Display value
│   </span>                                               │
│ </span>                                                 │
└─────────────────────────────────────────────────────────┘
      │              │                │
      │              │                └─ Animations discover via querySelector
      │              │
      │              └─ CSS styles via class selectors
      │
      └─ Tokens define visual values
```

---

## 🧱 Build Pipeline (Turborepo)

```
pnpm build
    │
    ├─ @atomchat/tokens
    │     │
    │     ├─ Validate: node scripts/validate-tokens.js
    │     │    └─ Check W3C DTCG format, circular refs
    │     │
    │     └─ Build: style-dictionary build
    │          └─ Output: build/css/tokens.css
    │
    ├─ @atomchat/css (depends on tokens)
    │     │
    │     └─ Build: vite build
    │          └─ Output: dist/atom.css
    │
    ├─ @atomchat/components-astro
    │     │
    │     └─ Build: echo "no build needed"
    │          └─ Output: .astro files (source)
    │
    └─ @atomchat/animations
          │
          └─ Build: tsc
               └─ Output: dist/*.js + dist/*.d.ts
```

---

## 🔗 Dependency Graph

```
┌─────────────┐
│   tokens    │  (no dependencies)
└──────┬──────┘
       │
       ├────────────────────┐
       │                    │
       ▼                    ▼
┌─────────────┐      ┌─────────────┐
│     css     │      │  animations │
└──────┬──────┘      └──────┬──────┘
       │                    │
       └──────────┬─────────┘
                  │
                  ▼
          ┌───────────────┐
          │ components-   │
          │    astro      │
          └───────────────┘
```

**Regla:** Nunca importar hacia arriba en el grafo.

---

## 🎭 Framework-Agnostic Pattern

```
┌──────────────────────────────────────────────────────┐
│              ATOM Design System                      │
│       (tokens + css + components + animations)       │
└────────────────┬─────────────────────────────────────┘
                 │
                 ├─────────────┬──────────────┬────────────┐
                 │             │              │            │
                 ▼             ▼              ▼            ▼
         ┌──────────┐   ┌──────────┐  ┌──────────┐  ┌──────────┐
         │  Astro   │   │  React   │  │   Vue    │  │ Vanilla  │
         │  .astro  │   │   .tsx   │  │   .vue   │  │   .html  │
         └──────────┘   └──────────┘  └──────────┘  └──────────┘
              │               │             │             │
              └───────────────┴─────────────┴─────────────┘
                                    │
                                    ▼
                    Mismo HTML + data-attributes
                    Mismo CSS (var(--tokens))
                    Mismas animaciones (GSAP)
```

---

## 🧪 Testing Strategy

```
UNIT TESTS (per package)
  ├─ tokens/     → scripts/validate-tokens.js
  ├─ css/        → Visual regression (Playwright)
  ├─ components/ → Astro test utils
  └─ animations/ → Jest + DOM mocks

INTEGRATION TESTS (ATOM_website)
  └─ Showcase pages test all variants

E2E TESTS (Playwright)
  └─ User interactions (click, hover, count updates)
```

---

## 📦 Distribution

```
NPM REGISTRY (@atomchat/*)
    │
    ├─ @atomchat/tokens@1.0.0
    │    ├─ build/css/tokens.css
    │    ├─ build/scss/_tokens.scss
    │    └─ build/js/tokens.js
    │
    ├─ @atomchat/css@0.1.0
    │    └─ dist/atom.css
    │
    ├─ @atomchat/components-astro@1.0.0
    │    └─ src/**/*.astro
    │
    └─ @atomchat/animations@1.0.0
         └─ dist/**/*.js + *.d.ts

JSDELIVR CDN (optional)
    │
    └─ https://cdn.jsdelivr.net/npm/@atomchat/tokens@latest/build/css/tokens.css
```

---

**Última actualización:** 2026-03-29
