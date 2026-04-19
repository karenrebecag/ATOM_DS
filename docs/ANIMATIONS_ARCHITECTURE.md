# ATOM Animations Architecture — Framework-Agnostic Pattern

**Author:** Design System Team
**Date:** April 2026
**Package:** `@atomchat/animations`

---

## TL;DR — Por qué las animations NO siguen el patrón de carpetas de componentes

Las **animations son behaviors** (comportamientos), **NO componentes visuales**.

- ❌ **NO tienen markup** → no hay `.astro`, `.tsx`, `.vue`
- ❌ **NO tienen estructura visual** → no hay buttons/, forms/, typography/
- ✅ **SÍ son funciones TypeScript** → trabajan con `data-*` attributes
- ✅ **SÍ son framework-agnostic** → funcionan con HTML puro, React, Vue, Astro, Angular, etc.
- ✅ **SÍ son modular-funcionales** → cada archivo = 1 behavior (badge, toast, reveal, etc.)

**Ejemplo:**
```ts
// ❌ NO es un componente
<Button /> // markup específico de framework

// ✅ ES un behavior
initBadge() // función que observa [data-badge] en CUALQUIER HTML
```

---

## 🏗️ Arquitectura: Behavior-Driven Animation System

### **Patrón de diseño:** Imperative + Declarative Hybrid

Las animaciones de ATOM siguen un patrón **behavior-driven** inspirado en:
- **Stimulus.js** (Hotwire/Basecamp) — controllers basados en data-attributes
- **Alpine.js** — directivas declarativas en HTML
- **GSAP ScrollTrigger** — data-driven scroll animations
- **Web Components** — lifecycle hooks agnósticos

---

## 📐 Estructura Actual (Flat Module Pattern)

```
animations/src/
├── config.ts              # GSAP setup, plugins, constants (SINGLE source)
├── types.ts               # CleanupFn, AnimationConfig, MotionLevel
├── motion.ts              # 3-tier motion preference system
├── index.ts               # Public API exports
│
├── badge.ts               # Badge behavior (show/hide, count update)
├── toast.ts               # Toast behavior (enter/exit, stack)
├── reveal.ts              # Scroll-reveal behavior
├── text.ts                # Text animations (scramble, fade, highlight)
├── hover.ts               # Hover behaviors (magnetic, rotate, card)
├── parallax.ts            # Parallax scroll effects
├── marquee.ts             # Marquee scroll behavior
├── odometer.ts            # Number counting animations
├── slider.ts              # Rotation slider behavior
├── vertical-slider.ts     # Vertical scroll slider
├── loading.ts             # Loading state animations
├── cursor.ts              # Custom cursor behavior
├── scroll-direction.ts    # Scroll direction detection
├── page-transition.ts     # Page transitions (for SPAs)
├── parallax-transition.ts # Parallax page transitions
├── sidebar-wipe.ts        # Sidebar collapse/expand
├── layout-grid-flip.ts    # FLIP grid animations
├── draggable-marquee.ts   # Draggable marquee with inertia
├── rotating-layers.ts     # Rotating layers effect
├── flick-cards.ts         # Flick card carousel
├── logo-wall.ts           # Logo wall cycle animation
├── footer-logo.ts         # Footer logo scatter effect
├── about-card.ts          # About card persona swap
├── pricing.ts             # Pricing toggle animation
├── features.ts            # Features bento grid
├── stats.ts               # Stats count-up
├── social-proof.ts        # Social proof strip
└── progress-nav.ts        # Progress navigation
```

### **Por qué estructura plana?**

1. **No hay jerarquía semántica** — behaviors son ortogonales a componentes UI
2. **Nombres autodescriptivos** — `badge.ts`, `toast.ts` son más claros que `indicators/badge.ts`
3. **Imports directos** — `import { initBadge } from '@atomchat/animations'`
4. **Sin acoplamiento visual** — `badge.ts` funciona con `<Badge>`, `<Chip>`, `<Tag>`, o cualquier `[data-badge]`

---

## 🔌 Cómo Funcionan de Forma Agnóstica

### **1. Data Attributes como API Pública**

Los behaviors se **activan mediante atributos HTML estándar**, no props de componentes:

```html
<!-- ✅ Framework-agnostic HTML -->
<div data-badge data-count="5">
  <span data-badge-text>5</span>
</div>

<!-- Funciona en CUALQUIER framework: -->
```

**Astro:**
```astro
<Badge count={5} />
<!-- internamente renderiza [data-badge] -->
```

**React:**
```tsx
<Badge count={5} />
<!-- internamente renderiza [data-badge] -->
```

**Vue:**
```vue
<Badge :count="5" />
<!-- internamente renderiza [data-badge] -->
```

**HTML puro:**
```html
<div data-badge data-count="5">...</div>
```

---

### **2. Patrón de Inicialización: `init*()` Functions**

Todas las animaciones exponen funciones `init*()` que:
- **Buscan elementos** con `querySelector`/`querySelectorAll`
- **Observan cambios** con `MutationObserver` o `IntersectionObserver`
- **Retornan CleanupFn** para cleanup manual

**Firma estándar:**
```ts
export function initBadge(config: AnimationConfig = {}): CleanupFn
```

**Uso:**
```ts
import { initBadge } from '@atomchat/animations';

// Auto-init todos los badges en la página
const cleanup = initBadge();

// Scope a un container específico
const cleanup = initBadge({ scope: document.querySelector('#app') });

// Cleanup manual (importante para SPAs)
cleanup();
```

---

### **3. Imperative Utilities (opt-in)**

Además de `init*()`, muchos módulos exportan **utilities imperativas**:

```ts
import { showBadge, hideBadge } from '@atomchat/animations';

// Trigger manual
const badgeEl = document.querySelector('[data-badge]');
showBadge(badgeEl);

// Con opciones
hideBadge(badgeEl, { duration: 0.5, ease: 'power2.out' });
```

**Ventaja:** Permite control granular en SPAs complejas (React, Vue, Angular).

---

### **4. Cleanup Pattern: Esencial para SPAs**

**Cada función retorna `CleanupFn`** que:
- Mata tweens activos (`tween.kill()`)
- Desconecta observers (`observer.disconnect()`)
- Remueve event listeners
- Libera referencias DOM

**Ejemplo en React:**
```tsx
useEffect(() => {
  const cleanup = initBadge({ scope: containerRef.current });
  return cleanup; // React llama cleanup en unmount
}, []);
```

**Ejemplo en Astro (con Barba.js):**
```ts
barba.hooks.beforeLeave(() => {
  cleanup(); // Limpiar antes de page transition
});
```

---

## 🎯 Motion Preference System (3-Tier)

**Sistema de accesibilidad WCAG 2.3.3 (AAA):**

### **Tier 1: OS Level** (prefers-reduced-motion)
```css
@media (prefers-reduced-motion: reduce) {
  /* Sistema operativo dice "reduce animations" */
}
```

### **Tier 2: Site Level** (data-motion attribute)
```html
<html data-motion="reduced">
  <!-- Usuario toggleó en tu sitio -->
</html>
```

```ts
import { setMotionLevel } from '@atomchat/animations';

// Toggle button
setMotionLevel('reduced'); // o 'none', 'full'
```

### **Tier 3: Element Level** (data-motion-exempt)
```html
<div data-motion-exempt>
  <!-- Este elemento NUNCA se anima -->
</div>
```

**Prioridad:**
1. `data-motion="none"` → gana sobre todo
2. OS `reduced` → gana sobre site `full`
3. `data-motion-exempt` → bypass total

**Uso en código:**
```ts
import { prefersReducedMotion, isMotionExempt } from '@atomchat/animations';

export function showBadge(el: HTMLElement) {
  if (isMotionExempt(el)) return NOOP; // skip si exempt

  if (prefersReducedMotion()) {
    // Set final state instantly
    gsap.set(el, { scale: 1, opacity: 1 });
    return NOOP;
  }

  // Animate normalmente
  const tween = gsap.from(el, { scale: 0, opacity: 0, duration: 0.4 });
  return () => tween.kill();
}
```

---

## 📦 Cómo se Consumen en Cada Framework

### **Astro** (Recomendado para sitios estáticos)

```astro
---
import { Badge } from '@atomchat/components-astro';
---

<Badge count={5} />

<script>
  import { initBadge } from '@atomchat/animations';

  // Auto-init on page load
  initBadge();
</script>
```

### **React** (Next.js, Vite, CRA)

```tsx
import { Badge } from '@atomchat/components-react';
import { initBadge } from '@atomchat/animations';
import { useEffect } from 'react';

export default function MyApp() {
  useEffect(() => {
    const cleanup = initBadge();
    return cleanup; // Cleanup on unmount
  }, []);

  return <Badge count={5} />;
}
```

### **Vue 3** (Nuxt, Vite)

```vue
<script setup>
import { Badge } from '@atomchat/components-vue';
import { initBadge } from '@atomchat/animations';
import { onMounted, onUnmounted } from 'vue';

let cleanup;

onMounted(() => {
  cleanup = initBadge();
});

onUnmounted(() => {
  cleanup?.();
});
</script>

<template>
  <Badge :count="5" />
</template>
```

### **Angular 21**

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Badge } from '@atomchat/components-angular';
import { initBadge, CleanupFn } from '@atomchat/animations';

@Component({
  selector: 'app-root',
  template: '<atom-badge [count]="5" />',
  standalone: true,
  imports: [Badge]
})
export class AppComponent implements OnInit, OnDestroy {
  private cleanup?: CleanupFn;

  ngOnInit() {
    this.cleanup = initBadge();
  }

  ngOnDestroy() {
    this.cleanup?.();
  }
}
```

### **HTML Puro (Vanilla JS)**

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@atomchat/css@latest/dist/atom.css">
</head>
<body>
  <div class="badge" data-badge data-count="5">
    <span data-badge-text>5</span>
  </div>

  <script type="module">
    import { initBadge } from 'https://cdn.jsdelivr.net/npm/@atomchat/animations@latest/+esm';
    initBadge();
  </script>
</body>
</html>
```

---

## 🔧 Diferencias Clave con Componentes UI

| Aspecto | Componentes UI | Animations |
|---------|----------------|------------|
| **Naturaleza** | Markup + Styles | Behaviors + Logic |
| **Archivos** | `.astro`, `.tsx`, `.vue` | `.ts` (TypeScript puro) |
| **Output** | HTML renderizado | Side effects (GSAP tweens) |
| **Estructura** | Carpetas semánticas (`buttons/`, `forms/`) | Plana (módulos funcionales) |
| **Acoplamiento** | 1 componente = 1 archivo | 1 behavior = N componentes |
| **Inicialización** | Render cycle | Manual `init*()` call |
| **Cleanup** | Framework-managed | Manual `CleanupFn` |
| **API** | Props/Attributes | `data-*` attributes |
| **Framework** | Específico (React, Vue, etc.) | **Agnóstico** (DOM puro) |

---

## ❌ Por Qué NO Reorganizar en Carpetas

### **Problema hipotético:**
```
animations/src/
├── buttons/
│   └── badge.ts         # ❌ Badge NO es un button
├── indicators/
│   └── badge.ts         # ❌ Dónde va badge? Aquí? O en buttons?
├── typography/
│   └── text.ts          # ❌ text.ts tiene 8 funciones, no 1 componente
```

### **Conflictos:**

1. **`badge.ts` anima Badge, Chip, Tag** → ¿Dónde va?
2. **`hover.ts` anima Buttons, Cards, Links** → ¿Dónde va?
3. **`text.ts` tiene 8 funciones** → ¿Se divide en 8 archivos?
4. **`reveal.ts` anima TODO** → ¿Va en todas las carpetas?

### **Solución actual:**

✅ **Estructura plana** — cada archivo es un behavior cohesivo
✅ **Nombres descriptivos** — `badge.ts`, `toast.ts`, `reveal.ts`
✅ **Sin acoplamiento visual** — `initBadge()` funciona con cualquier `[data-badge]`

---

## 🎓 Regla de Oro

> **"Animations are BEHAVIORS applied to DOM elements, not COMPONENTS themselves."**

Si necesitas animar un Badge:
1. El **componente** (`<Badge>`) renderiza HTML con `data-badge`
2. La **animation** (`initBadge()`) observa `[data-badge]` y aplica GSAP tweens
3. Son **ortogonales** — no comparten estructura de carpetas

---

## 📚 Recursos

- **GSAP Docs:** https://gsap.com/docs/
- **W3C WCAG 2.3.3:** https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions
- **Stimulus.js Pattern:** https://stimulus.hotwired.dev/
- **FLIP Pattern:** https://aerotwist.com/blog/flip-your-animations/

---

## ✅ Conclusión

Las **animations de ATOM están correctamente diseñadas como behaviors framework-agnostic**.

**NO necesitan reorganización** porque:
- ✅ Siguen un patrón **behavior-driven** establecido (Stimulus, Alpine)
- ✅ Son **framework-agnostic** por diseño (trabajan con DOM puro)
- ✅ Tienen **cleanup patterns** para SPAs
- ✅ Usan **data-attributes** como API pública
- ✅ Son **modulares y cohesivas** (1 archivo = 1 behavior)

La estructura plana es **intencional y apropiada** para este tipo de sistema.
