# ATOM Design System — Claude Instructions

## Contexto del Proyecto

Este es el **monorepo del Design System ATOM**, distribuible como paquetes npm independientes bajo el scope `@atomchat`. Es la fuente de verdad para todos los productos de ATOM.

**Stack:** pnpm 9 + Turborepo + Style Dictionary v4 + TypeScript 5.8 + GSAP 3.12

---

## Estructura del Monorepo

```
ATOM_DS/
├── packages/
│   ├── tokens/          @atomchat/tokens          ✅ COMPLETO
│   ├── animations/      @atomchat/animations      ✅ COMPLETO
│   ├── css/             @atomchat/css             ✅ COMPLETO
│   └── components-astro/ @atomchat/components-astro ❌ EN CONSTRUCCIÓN
├── apps/
│   └── docs/            Sitio de documentación     ❌ PENDIENTE
├── scripts/
│   └── validate-tokens.js  Validador pre-build
├── turbo.json           Pipeline de builds
├── pnpm-workspace.yaml  Configuración workspace
├── CLAUDE.md            Este archivo
├── DEFERRED_TO_CSS.md   Decisiones de migración
└── README.md            Documentación pública
```

---

## Estado de los Paquetes

### ✅ @atomchat/tokens — COMPLETO

**1,110 tokens W3C DTCG** organizados en 3 capas:

1. **Foundation (primitive):** 10 archivos JSON — colores, spacing, tipografía, motion, borders, opacity, elevations, glass, z-index, breakpoints
2. **Semantic (aliases):** 4 archivos JSON — bg, fg, border, brand (referencian primitivos)
3. **Component (scoped):** 9 archivos JSON — button, checkbox, radio, toggle, chip, tag, skeleton, avatar, glass

**Build outputs:**

| Archivo | Selector | Contenido |
|---------|----------|-----------|
| `build/css/tokens.css` | `:root` | Todos los 1,110 tokens (tema light) |
| `build/css/dark.css` | `[data-theme="dark"]` | 5 overrides de color para dark theme |
| `build/css/foundation.css` | `:root` | Solo primitivos |
| `build/css/semantic.css` | `:root` | Solo aliases semánticos |
| `build/css/components.css` | `:root` | Solo tokens de componentes |
| `build/scss/_tokens.scss` | SCSS vars | Todos los tokens como `$var-name` |
| `build/js/tokens.js` | ESM | Export named de todos los tokens |
| `build/js/tokens.cjs` | CJS | CommonJS para Node |
| `build/js/tokens.d.ts` | TS | Declaraciones TypeScript |
| `build/json/tokens.json` | JSON | Flat key-value para Figma/tools |

**Naming convention:**
- CSS: `--{tier}-{category}-{role}-{state}` → `--primitive-zinc-950`, `--bg-primary`, `--buttons-bg-primary-enabled`
- SCSS: `$primitive-zinc-950`, `$bg-primary`, etc.
- JS: `primitiveZinc950`, `bgPrimary`, etc. (camelCase)

**Dark theme:**
- Archivo separado: `build/css/dark.css`
- Selector: `[data-theme="dark"]`
- Solo sobrescribe tokens semánticos, los primitivos permanecen constantes

---

### ✅ @atomchat/animations — COMPLETO

**34 archivos TypeScript, 28 módulos de animación**

**Sistema de motion en 3 niveles (WCAG 2.3.3):**
1. **OS:** Detecta `prefers-reduced-motion` automáticamente
2. **Site:** Override manual via `data-motion="reduced"` en `<html>`
3. **Element:** Bypass via `data-motion-exempt` en elementos específicos

**Módulos principales:**
- `about-card.ts`, `badge.ts`, `cursor.ts`, `draggable-marquee.ts`, `features.ts`, `flick-cards.ts`, `footer-logo.ts`, `hover.ts`, `layout-grid-flip.ts`, `loading.ts`, `logo-wall.ts`, `marquee.ts`, `odometer.ts`, `page-transition.ts`, `parallax-transition.ts`, `parallax.ts`, `pricing.ts`, `progress-nav.ts`, `reveal.ts`, `rotating-layers.ts`, `scroll-direction.ts`, `sidebar-wipe.ts`, `slider.ts`, `social-proof.ts`, `stats.ts`, `text.ts`, `toast.ts`, `vertical-slider.ts`

**Extras (optional peer deps):**
- `smooth-scroll.ts` — Lenis integration
- `transitions.ts` — Barba.js integration

**Patrón de cleanup:**
- Todos los módulos exportan `init*(): CleanupFn`
- El cleanup mata tweens, ScrollTriggers, listeners y observers
- Esencial para Barba.js y SPAs

**GSAP plugins (registrados SOLO en `config.ts`):**
- ScrollTrigger, CustomEase, Draggable, InertiaPlugin, Observer, Flip

---

### ✅ @atomchat/css — COMPLETO

**42.5 kB CSS compilado** (pure asset build, no JS wrapper)

**17 archivos CSS:**
- **Foundation (4):** `base.css`, `reset.css`, `typography.css`, `index.css`
- **Components (10):** `avatar.css`, `button.css`, `checkbox.css`, `chip.css`, `odometer.css`, `radio.css`, `skeleton.css`, `tag.css`, `toggle.css`, `index.css`
- **Utilities (6):** `glass.css`, `helpers.css`, `motion.css`, `responsive.css`, `transitions.css`, `index.css`
- **Entry:** `index.css` (importa todo)

**Filosofía:**
- ❌ CERO valores hardcoded
- ✅ TODO usa `var(--token-name)`
- Build: Vite 6 + LightningCSS (pure asset, NOT lib mode)
- Output: `dist/atom.css` (single bundle)

**Peer dependency:**
- `@atomchat/tokens: workspace:*`

**Desarrollo local:**
- Requiere `server.fs.allow` en Vite config del proyecto consumidor:
  ```ts
  vite: {
    server: {
      fs: { allow: ['..', '../atom-design-system'] }
    }
  }
  ```

---

### ❌ @atomchat/components-astro — EN CONSTRUCCIÓN

**Pendiente de implementar:**
- Componentes Astro usando tokens + CSS
- Peer deps: `@atomchat/tokens`, `@atomchat/css`
- No tiene build step (Astro components son distribuidos como `.astro` source)

**Componentes planeados:**
- Button, Badge, Chip, Tag, Toggle, Checkbox, Radio, Avatar, Skeleton, Input, Card, Typography

---

## Comandos Críticos

```bash
# Instalar todo el monorepo
pnpm install

# Build ALL (Turbo, respeta dependencias)
pnpm build

# Validar tokens ANTES de build
node scripts/validate-tokens.js

# Build individual
cd packages/tokens && pnpm build
cd packages/animations && pnpm build
cd packages/css && pnpm build

# Watch mode (desarrollo)
cd packages/tokens && pnpm dev
cd packages/css && pnpm dev

# Release workflow (Changesets)
pnpm changeset         # Crear changeset
pnpm changeset version # Bump versions
pnpm release          # Build + publish to npm
```

---

## Reglas de Oro

### 1. Source of Truth

- **Tokens JSON** (`packages/tokens/src/**/*.json`) es la fuente de verdad
- NUNCA editar `packages/*/build/` o `packages/*/dist/` — son auto-generados
- Los archivos generados están en `.gitignore`

### 2. Token Naming

- **TODOS los nombres en lowercase kebab-case** (no camelCase, no PascalCase)
- Formato W3C DTCG: `{ "$value": "...", "$type": "..." }`
- Ejemplos:
  ```json
  {
    "primitive-zinc-950": { "$value": "#09090b", "$type": "color" },
    "bg-primary": { "$value": "{primitive-neutral-0}", "$type": "color" },
    "buttons-bg-primary-enabled": { "$value": "{bg-inverse-primary}", "$type": "color" }
  }
  ```

### 3. NO Hardcoded Values

- ❌ `background: #3b82f6`
- ❌ `padding: 16px`
- ❌ `font-size: 14px`
- ✅ `background: var(--bg-primary)`
- ✅ `padding: var(--gap-m)`
- ✅ `font-size: var(--text-body-m)`

### 4. GSAP Plugin Registration

- Plugins se registran **UNA VEZ** en `packages/animations/src/config.ts`
- NUNCA registrar plugins en módulos individuales

### 5. CSS Package Build

- Vite config: **pure asset build**, NO lib mode
- `package.json` tiene `"style": "./dist/atom.css"` para Vite resolution

### 6. Proyecto Consumidor

- Astro projects necesitan `server.fs.allow` para dev local
- Next.js/React: import directo funciona out-of-the-box

---

## Patrones Deferred a CSS

Ver `DEFERRED_TO_CSS.md` para ~33 custom properties que NO pueden ser tokens DTCG:

1. **Motion shorthands** — `--animation-half: var(--duration-half) var(--ease-default)`
2. **Glass rgba() + var()** — `rgba(255, 255, 255, var(--opacity))`
3. **Component shorthands** — `--chip-padding: var(--gap-xs) var(--gap-s)`
4. **Dark theme overrides** — selector-scoped values
5. **Responsive typography** — media query overrides
6. **SCSS mixins** — build-time constructs

Estos se implementan directamente en `@atomchat/css` como CSS puro.

---

## Workflow de Contribución

### Cambiar un token

1. Editar JSON en `packages/tokens/src/`
2. Run `node scripts/validate-tokens.js`
3. Run `cd packages/tokens && pnpm build`
4. Verificar outputs en `build/`
5. Commit SOLO los archivos source (`.json`)

### Agregar animación

1. Crear `packages/animations/src/my-animation.ts`
2. Export `initMyAnimation(): CleanupFn`
3. Importar en `index.ts`
4. Run `pnpm build` para compilar TS → JS
5. Commit SOLO el `.ts` source

### Agregar componente CSS

1. Crear `packages/css/src/components/my-component.css`
2. Usar SOLO `var(--token-name)`, NO hardcoded values
3. Import en `components/index.css`
4. Run `pnpm build`
5. Verificar `dist/atom.css` incluye el componente

---

## Next Steps (Roadmap)

| Prioridad | Task |
|-----------|------|
| 🔴 Alta | Build @atomchat/components-astro (Button, Badge, Input, Card, Typography) |
| 🔴 Alta | Sitio docs con Astro Starlight — tabla de tokens estilo Atlassian |
| 🟡 Media | GitHub Actions CI/CD — auto-publish con Changesets |
| 🟡 Media | ESLint plugin para bloquear hardcoded values |
| 🟢 Futura | Figma variables sync via Tokens Studio |
| 🟢 Futura | Storybook addon para preview de tokens |

---

## Tech Stack Reference

- **Monorepo:** pnpm 9 + Turborepo 2.8
- **Tokens:** Style Dictionary 4.4 (W3C DTCG spec)
- **Animations:** TypeScript 5.8 + GSAP 3.12
- **CSS:** Vite 6 + LightningCSS 1.23
- **Releases:** Changesets 2.27
- **Git:** Conventional Commits

---

## Anti-Patterns (NUNCA HACER)

- ❌ Editar `build/` o `dist/` manualmente
- ❌ Hardcodear valores en CSS/JS
- ❌ Registrar GSAP plugins fuera de `config.ts`
- ❌ Usar nombres de tokens en camelCase o PascalCase
- ❌ Tokens sin `$type` field (rompe DTCG spec)
- ❌ Referencias circulares en token aliases
- ❌ Commit de archivos generados (build/, dist/)
- ❌ Usar `@anthropic-atom` (scope viejo) en vez de `@atomchat`

---

## Recursos Útiles

- **W3C DTCG Spec:** https://tr.designtokens.org/format/
- **Style Dictionary Docs:** https://styledictionary.com/
- **Atlassian Design System:** https://atlassian.design/tokens (inspiración)
- **GSAP Docs:** https://gsap.com/docs/
- **Turborepo Docs:** https://turbo.build/repo/docs
