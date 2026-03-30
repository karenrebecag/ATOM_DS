# @atomchat/animations

GSAP animation system for ATOM websites and applications.

---

## Installation

```bash
pnpm add @atomchat/animations gsap
```

### Peer Dependencies

| Package | Required | Notes |
|---------|----------|-------|
| `gsap` | **Yes** | Core animation engine (3.12+) |
| `lenis` | Optional | Smooth scroll — only if using `initSmoothScroll` |
| `@barba/core` | Optional | Page transitions — only if using `initBarba` |
| `@barba/prefetch` | Optional | Link prefetching for Barba |

```bash
# Optional
pnpm add lenis @barba/core @barba/prefetch
```

---

## Quick Start

### All animations at once

```ts
import { initAllAnimations } from "@atomchat/animations";

// After DOM is ready:
const cleanup = initAllAnimations();

// On page leave / destroy:
cleanup();
```

### Scoped to a container (Barba.js, SPA routing)

```ts
const cleanup = initAllAnimations(document.querySelector("main")!);
```

### Individual modules

```ts
import { initReveal, initMagnetic } from "@atomchat/animations";

const cleanReveal = initReveal({ scope: mySection });
const cleanMagnetic = initMagnetic();

// Later:
cleanReveal();
cleanMagnetic();
```

---

## Architecture

### Dependency Graph

```
gsap (peer dependency)
    │
    ▼
config.ts ── Plugin registration + DURATION/STAGGER constants
    │
    ├── types.ts ── AnimationConfig, CleanupFn, NOOP
    │
    ├── motion.ts ── Three-tier motion preference system
    │
    └── 28 animation modules ── Each imports from config/types/motion
         │
         └── index.ts ── Barrel exports + initAllAnimations()
```

**No lateral dependencies** between animation modules. Every module imports only from `config`, `types`, or `motion`.

### Two Animation Patterns

**Pattern A: `init*` → `CleanupFn`** (90% of modules)

Setup DOM queries, event listeners, ScrollTriggers. Returns cleanup.

```ts
const cleanup = initReveal({ scope: document });
// ...later:
cleanup(); // Kills ScrollTriggers, removes listeners
```

**Pattern B: Imperative utilities** (badge, toast, page-transition)

Called on-demand with specific elements.

```ts
showBadge(badgeEl, counterEl);
await animateToastExit(toastEl);
const timeline = runParallaxLeave(containerEl);
```

---

## Motion Preference System

Three-tier accessibility system following WCAG 2.3.3:

| Tier | Source | Check |
|------|--------|-------|
| 1 — OS | `prefers-reduced-motion` | `prefersReducedMotion()` |
| 2 — Site | `<html data-motion="reduced\|none">` | `getMotionLevel()` |
| 3 — Element | `data-motion-exempt` attribute | `isMotionExempt(el)` |

```ts
import {
  prefersReducedMotion,
  getMotionLevel,
  setMotionLevel,
  watchMotionPreference,
  isMotionExempt,
} from "@atomchat/animations";

// Quick boolean guard
if (prefersReducedMotion()) return;

// Granular level
const level = getMotionLevel(); // "full" | "reduced" | "none"

// User toggle button
setMotionLevel("reduced");

// Reactive watcher
const cleanup = watchMotionPreference((level) => {
  console.log("Motion preference changed:", level);
});
```

### Vestibular-Risk Modules

These modules involve full-page motion and **bail early** when motion is reduced:

- `parallax` — Scroll-linked parallax effects
- `page-transition` — Coordinated page entrance
- `parallax-transition` — Barba.js page transitions
- `vertical-slider` — 3D flip card slider

All other modules check motion **inside event handlers** and apply instant state changes as fallback.

---

## GSAP Configuration

`config.ts` is the single point of GSAP setup. **No other file calls `registerPlugin()`.**

### Registered Plugins

| Plugin | Used By |
|--------|---------|
| ScrollTrigger | reveal, text, parallax, stats, progress-nav, logo-wall, etc. |
| CustomEase | Global "atom" ease curve |
| Draggable | slider, flick-cards, draggable-marquee |
| InertiaPlugin | slider, flick-cards |
| Observer | draggable-marquee |
| Flip | layout-grid-flip |

### Timing Constants

Aligned with `@atomchat/tokens` motion tokens:

```ts
import { DURATION, STAGGER } from "@atomchat/animations";

DURATION.quarter       // 0.15s
DURATION.half          // 0.3s
DURATION.threeQuarters // 0.45s
DURATION.default       // 0.6s
DURATION.onehalf       // 0.9s
DURATION.double        // 1.2s

STAGGER.fast           // 0.03s
STAGGER.default        // 0.05s
STAGGER.slow           // 0.1s
```

### Custom Ease

The `"atom"` ease is registered globally and set as the default:

```ts
// Equivalent to: cubic-bezier(0.625, 0.05, 0, 1)
gsap.to(el, { y: 0 }); // Uses "atom" ease automatically
```

---

## Module Reference

### Scroll & Reveal

| Export | Signature | Description |
|--------|-----------|-------------|
| `initReveal` | `(config?) → CleanupFn` | Scroll-triggered fade/slide entrance |
| `initBatchReveal` | `(config?) → CleanupFn` | Batch scroll reveal for lists/grids |
| `initTextReveal` | `(config?) → CleanupFn` | SplitText word-by-word reveal (with fallback) |
| `initParallax` | `(config?) → CleanupFn` | Scroll-linked parallax (**vestibular**) |
| `initParallaxScale` | `(config?) → CleanupFn` | Scroll-linked scale + parallax (**vestibular**) |

### Hover & Interaction

| Export | Signature | Description |
|--------|-----------|-------------|
| `initRotateClones` | `(config?) → CleanupFn` | Clone-based rotation on hover |
| `initRotateCalc` | `(config?) → CleanupFn` | Mouse-position rotation calculation |
| `initHoverRotate` | `(config?) → CleanupFn` | Card 3D rotation on hover |
| `initCardHover` | `(config?) → CleanupFn` | Card shadow/lift on hover |
| `initMagnetic` | `(config?) → CleanupFn` | Magnetic button attraction effect |
| `initCursor` | `() → CleanupFn` | Custom cursor (singleton) |
| `destroyCursor` | `() → void` | Destroy custom cursor |

### Carousels & Sliders

| Export | Signature | Description |
|--------|-----------|-------------|
| `initRotationSlider` | `(config?) → CleanupFn` | Draggable rotation carousel |
| `initVerticalSlider` | `(config?) → CleanupFn` | 3D flip slider (**vestibular**) |
| `initFlickCards` | `(config?) → CleanupFn` | Draggable card stack with elastic throw |
| `initDraggableMarquee` | `(config?) → CleanupFn` | Auto-play marquee with drag |

### Sections & Layout

| Export | Signature | Description |
|--------|-----------|-------------|
| `initFeatures` | `(config?) → CleanupFn` | Bento grid stagger entrance |
| `initPricingSection` | `(config?) → CleanupFn` | Solo/team pricing toggle |
| `initLayoutGridFlip` | `(config?) → CleanupFn` | FLIP-powered grid layout toggle |
| `initStats` | `(config?) → CleanupFn` | Counter/odometer animation |
| `initSocialProof` | `(config?) → CleanupFn` | Social proof strip entrance |

### Continuous / Auto-Play

| Export | Signature | Description |
|--------|-----------|-------------|
| `initMarqueeObserver` | `(config?) → CleanupFn` | CSS marquee with IntersectionObserver |
| `initLogoWallCycle` | `(config?) → CleanupFn` | Logo grid random swap animation |
| `initRotatingLayers` | `(config?) → CleanupFn` | Concentric circle rotation |
| `initAboutCardAnimation` | `(config?) → CleanupFn` | Persona-swapping concentric layers |
| `initFooterLogo` | `(config?) → CleanupFn` | SVG scatter/assemble (desktop only) |

### Navigation

| Export | Signature | Description |
|--------|-----------|-------------|
| `initProgressNav` | `(config?) → CleanupFn` | Scroll-linked progress navbar |
| `initScrollDirection` | `() → CleanupFn` | Sets `data-scroll-dir` on body |
| `initSidebarCollapse` | `(config?) → CleanupFn` | Sidebar width collapse/expand |

### Badge & Toast (Imperative)

| Export | Signature | Description |
|--------|-----------|-------------|
| `showBadge` | `(badge, counter) → CleanupFn` | Show notification badge |
| `hideBadge` | `(badge, counter) → CleanupFn` | Hide notification badge |
| `animateBadgeEntry` | `(badge, counter) → CleanupFn` | Animated badge appearance |
| `animateToastEnter` | `(toast, config?) → CleanupFn` | Toast slide-in animation |
| `animateToastExit` | `(toast) → Promise<void>` | Toast fade-out animation |
| `restackToasts` | `(container) → void` | Reposition stacked toasts |
| `initToastAnimations` | `(config?) → CleanupFn` | Auto-init toast observers |
| `cleanupToastAnimations` | `(container) → void` | Manual toast cleanup |

### Page Transitions

| Export | Signature | Description |
|--------|-----------|-------------|
| `runPageEnterAnimation` | `(config?) → Timeline \| undefined` | Coordinated page entrance (**vestibular**) |
| `runParallaxLeave` | `(current) → Timeline` | Parallax leave transition (**vestibular**) |
| `runParallaxEnter` | `(next, resetPage) → Promise<void>` | Parallax enter transition (**vestibular**) |
| `runParallaxOnce` | `(next, resetPage) → Timeline` | First-load reset (no animation) |
| `initBarba` | `() → void` | Full Barba.js integration |

### Smooth Scroll

| Export | Signature | Description |
|--------|-----------|-------------|
| `initSmoothScroll` | `() → Lenis` | Create Lenis instance (destroys previous) |
| `getLenis` | `() → Lenis \| null` | Get current Lenis instance |
| `destroySmoothScroll` | `() → void` | Destroy Lenis + remove GSAP ticker |

### Loading

| Export | Signature | Description |
|--------|-----------|-------------|
| `initShimmerText` | `(config?) → CleanupFn` | Shimmer text loading animation |
| `initLoadingAnimations` | `(config?) → CleanupFn` | Backward-compatible wrapper |

### Utilities

| Export | Signature | Description |
|--------|-----------|-------------|
| `initNumberOdometer` | — | Factory: returns update function |

---

## Data Attributes Reference

Every animation module is driven by `data-*` attributes. Place them on your HTML elements to opt in:

```html
<!-- Scroll reveal -->
<div data-reveal-target>Fades in on scroll</div>

<!-- Text reveal (SplitText) -->
<h1 data-text-reveal>Word by word reveal</h1>

<!-- Parallax -->
<div data-parallax data-parallax-speed="0.5">Moves slower than scroll</div>

<!-- Hover rotation -->
<div data-hover-rotate>3D tilt on hover</div>

<!-- Magnetic button -->
<button data-magnetic>I attract the cursor</button>

<!-- Marquee -->
<div data-marquee data-marquee-speed="30">Scrolling text</div>

<!-- Motion exempt (never animates) -->
<div data-motion-exempt>This content never animates</div>
```

See each module's JSDoc header for its complete list of supported attributes.

---

## Framework Integration

### Astro

```astro
---
// Layout.astro
---
<html>
<body>
  <slot />

  <script>
    import { initAllAnimations } from "@atomchat/animations";

    const cleanup = initAllAnimations();

    document.addEventListener("astro:before-swap", () => cleanup());
  </script>
</body>
</html>
```

### Astro + Barba.js (SPA mode)

```astro
<script>
  import { initAllAnimations, initSmoothScroll, initBarba } from "@atomchat/animations";

  // First page load
  initSmoothScroll();
  initAllAnimations();
  initBarba(); // Handles lifecycle from here
</script>
```

### React / Next.js

```tsx
import { useEffect, useRef } from "react";
import { initReveal, initMagnetic } from "@atomchat/animations";

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const config = { scope: ref.current };

    const cleanReveal = initReveal(config);
    const cleanMagnetic = initMagnetic(config);

    return () => {
      cleanReveal();
      cleanMagnetic();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
```

### Vue 3

```vue
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { initReveal, type CleanupFn } from "@atomchat/animations";

const container = ref<HTMLElement>();
let cleanup: CleanupFn;

onMounted(() => {
  cleanup = initReveal({ scope: container.value });
});

onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div ref="container">
    <slot />
  </div>
</template>
```

### Vanilla JS

```html
<script type="module">
  import { initAllAnimations } from "https://cdn.jsdelivr.net/npm/@atomchat/animations/dist/index.js";

  document.addEventListener("DOMContentLoaded", () => {
    const cleanup = initAllAnimations();
  });
</script>
```

---

## Cleanup Contract

Every `init*` function returns a `CleanupFn` that:

1. Kills all GSAP tweens and timelines
2. Kills all ScrollTrigger instances
3. Removes all event listeners
4. Disconnects all IntersectionObservers / MutationObservers
5. Kills all Draggable instances
6. Clears inline styles where applicable

If there's nothing to animate (element not found, motion reduced for vestibular modules), the function returns `NOOP` — a shared no-op function that avoids unnecessary allocations.

```ts
import { NOOP } from "@atomchat/animations";

// NOOP is a single shared reference: () => {}
```

---

## TypeScript

All exports are fully typed. Key types:

```ts
import type {
  AnimationConfig,   // { scope?: Element | Document }
  CleanupFn,         // () => void
  AnimationOptions,  // { duration?, ease?, delay? }
  MotionLevel,       // "full" | "reduced" | "none"
} from "@atomchat/animations";
```

---

## License

MIT
