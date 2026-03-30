# @atomchat Design System — Documentación Completa

Sistema de diseño distribuible para ATOM, construido con tokens W3C DTCG, animaciones GSAP y CSS puro.

---

## Arquitectura del monorepo

El sistema está organizado como un monorepo con **Turborepo + pnpm workspaces**. Cada paquete es independiente, versionado y publicable en npm bajo el scope `@atomchat`.

```
ATOM_DS/
├── packages/
│   ├── tokens/          → @atomchat/tokens
│   ├── css/             → @atomchat/css
│   ├── animations/      → @atomchat/animations
│   └── components-astro/→ @atomchat/components-astro  ← (en construcción)
├── apps/
│   └── docs/            → sitio de documentación (pendiente)
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Paquetes publicados

### @atomchat/tokens

**Fuente de verdad** de todas las decisiones de diseño.

Generado con **Style Dictionary v4** desde archivos `.json` W3C DTCG. Produce múltiples outputs para que cada proyecto consuma el formato que necesite:

| Output | Archivo | Uso |
|--------|---------|-----|
| CSS custom properties | `build/css/tokens.css` | Cualquier proyecto web |
| SCSS variables | `build/scss/_tokens.scss` | Proyectos con Sass |
| JS (ESM) | `build/js/tokens.js` | React, Next.js, Astro |
| JS (CJS) | `build/js/tokens.cjs` | Node.js, Jest |
| TypeScript | `build/js/tokens.d.ts` | Autocompletado en TS |
| JSON raw | `build/json/tokens.json` | Figma, otras tools |

**Instalación:**

```bash
pnpm add @atomchat/tokens
```

**Uso en CSS:**

```css
@import '@atomchat/tokens/build/css/tokens.css';

.my-component {
  background: var(--bg-primary);
  color: var(--fg-primary);
  border-radius: var(--radius-m);
  padding: var(--gap-m);
}
```

**Uso en JS/TS:**

```ts
import tokens from '@atomchat/tokens'
```

---

### Arquitectura de tokens en 3 capas

Siguiendo el modelo de Atlassian Design System, los tokens se organizan en capas con responsabilidades distintas:

```
Primitive (foundation)     Semantic                Component
─────────────────────      ──────────────────────  ─────────────────────
--primitive-blue-500  →    --bg-primary         →  --buttons-bg-primary-enabled
--primitive-spacing-4 →    --gap-m              →  --card-padding
--primitive-text-14   →    --text-body-m        →  --input-label-size
```

1. **Primitive** — valores crudos, no se usan directamente en UI
2. **Semantic** — tokens con intención (action, danger, subtle), usados en componentes
3. **Component** — tokens específicos de un componente, opcionales y granulares

---

### @atomchat/css

**Kit completo listo para usar** sin configuración.

Contiene el CSS compilado con **LightningCSS** que incluye tokens + reset + utilidades base. Ideal para productos que no usan un bundler complejo.

```bash
pnpm add @atomchat/css
```

```js
// En el entry point del proyecto (main.ts, layout.astro, _app.tsx)
import '@atomchat/css/dist/atom.css'
```

**Contenido:**
- Reset CSS (normalize)
- Tipografía base
- Utilidades de glass/glassmorphism
- Utilidades de motion (respeta `prefers-reduced-motion`)
- Componentes base (botones, inputs, checkboxes, etc.)

---

### @atomchat/animations

Sistema de animaciones con **GSAP + respeto a `prefers-reduced-motion`**.

```bash
pnpm add @atomchat/animations gsap
```

```ts
import { initAllAnimations } from '@atomchat/animations'

// Inicializar todas las animaciones
const cleanup = initAllAnimations()

// En page leave / destroy:
cleanup()
```

**Sistema de 3 niveles de control de movimiento:**

1. **OS** — detecta `prefers-reduced-motion` automáticamente
2. **Site** — `data-motion="reduced"` en `<html>` para override manual
3. **Element** — `data-motion-exempt` en elementos que siempre animan

**Módulos disponibles:**
- Reveal (fade in, slide up)
- Parallax (con protección vestibular)
- Scroll direction detection
- Text animations (split, reveal, scramble)
- Smooth scroll (Lenis integration)
- Page transitions (Barba.js integration)
- Y 20+ módulos más

---

### @atomchat/components-astro (en construcción)

Componentes UI construidos sobre los tokens. El objetivo es que cada componente:

- ✅ Use exclusivamente tokens de `@atomchat/tokens` (zero hardcoded values)
- ✅ Exporte tipos TypeScript
- ✅ Sea accesible (WCAG 2.1 AA mínimo)
- ✅ Soporte temas (light/dark) automáticamente via tokens semánticos

---

## Consumir en un producto de ATOM

### Next.js

```bash
pnpm add @atomchat/css @atomchat/tokens @atomchat/animations
```

```ts
// app/layout.tsx
import '@atomchat/css/dist/atom.css'

export default function RootLayout({ children }) {
  return <html lang="es">{children}</html>
}
```

### Astro

```bash
pnpm add @atomchat/css @atomchat/components-astro
```

```astro
---
// layouts/Base.astro
import '@atomchat/css/dist/atom.css'
import { Button } from '@atomchat/components-astro'
---
<Button variant="primary">Empezar</Button>
```

### Vite / vanilla

```js
import '@atomchat/css/dist/atom.css'
// Los tokens CSS ya están disponibles globalmente como var(--*)
```

---

## Theming (light / dark)

Los tokens semánticos se mapean a primitivos según el tema activo. El cambio de tema se hace a nivel de atributo HTML, **sin JS adicional**:

```html
<!-- Light (default) -->
<html data-theme="light">

<!-- Dark -->
<html data-theme="dark">
```

**Internamente en `@atomchat/tokens`:**

```css
:root {
  --bg-primary: var(--primitive-neutral-0);
  --fg-primary: var(--primitive-zinc-950);
}

[data-theme="dark"] {
  --bg-primary: var(--primitive-zinc-950);
  --fg-primary: var(--primitive-neutral-0);
}
```

---

## Releases y versionado

El sistema usa **Changesets** para semver automático. El flujo es:

```bash
# 1. Al hacer un cambio que merece release
pnpm changeset
# → selecciona el paquete afectado
# → selecciona patch / minor / major
# → escribe el changelog

# 2. Al mergear a main, el CI corre:
pnpm release
# → hace build de todos los paquetes
# → publica en npm los que tienen changeset pendiente
```

---

## Desarrollo local

```bash
# Instalar dependencias
pnpm install

# Build todos los paquetes
pnpm build

# Validar tokens antes de build
node scripts/validate-tokens.js

# Build individual
cd packages/tokens && pnpm build
cd packages/css && pnpm build
cd packages/animations && pnpm build

# Watch mode (desarrollo)
cd packages/tokens && pnpm dev
```

---

## Roadmap hacia Atlassian-level

| Fase | Qué construir | Prioridad |
|------|---------------|-----------|
| 1 | Componentes base en `@atomchat/components-astro`: Button, Badge, Input, Card, Typography | 🔴 Alta |
| 2 | Sitio docs con Astro Starlight — tabla de todos los tokens igual a Atlassian | 🔴 Alta |
| 3 | GitHub Actions: build + publish automático con Changesets | 🟡 Media |
| 4 | ESLint plugin `@atomchat/eslint-plugin` — bloquear hardcoded values en PRs | 🟡 Media |
| 5 | Figma variables sincronizadas con tokens via Tokens Studio | 🟢 Futura |
| 6 | Storybook addon para preview de tokens en componentes | 🟢 Futura |

---

## Tech Stack

- **Monorepo:** pnpm 9 + Turborepo
- **Tokens:** Style Dictionary v4 (W3C DTCG → CSS/SCSS/JS/TS)
- **Animations:** GSAP 3.12 + TypeScript 5.8
- **CSS:** Vite 6 + LightningCSS
- **Releases:** Changesets
- **CI/CD:** GitHub Actions (pendiente)

---

## Recursos

- **GitHub:** https://github.com/karenrebecag/ATOM_DS
- **npm packages:** https://www.npmjs.com/org/atomchat
- **Documentación técnica:** Ver `CLAUDE.md` y `DEFERRED_TO_CSS.md`

---

## Licencia

MIT
