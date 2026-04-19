# ATOM Design System — Claude Instructions

## Contexto del Proyecto

Este es el **monorepo del Design System ATOM**, distribuible como paquetes npm independientes bajo el scope `@atomchat`. Es la fuente de verdad para todos los productos de ATOM.

**Stack:** pnpm 9 + Turborepo + Style Dictionary v4 + TypeScript 5.8 + GSAP 3.12

---

## Estructura del Monorepo

```
ATOM_DS/
├── packages/
│   ├── tokens/              @atomchat.io/tokens              ✅ COMPLETO
│   ├── animations/          @atomchat.io/animations          ✅ COMPLETO
│   ├── css/                 @atomchat.io/css                 ✅ COMPLETO
│   ├── components-astro/    @atomchat.io/components-astro    🚧 EN CONSTRUCCIÓN
│   ├── components-react/    @atomchat.io/components-react    🎯 STAGED (Button ready)
│   ├── components-vue/      @atomchat.io/components-vue      🎯 STAGED (Button ready)
│   └── components-angular/  @atomchat.io/components-angular  🎯 STAGED (Button ready)
├── apps/
│   └── docs/                Sitio de documentación           ✅ LIVE
├── tools/
│   └── figma-sync/          @atomchat.io/figma-sync          ✅ COMPLETO (Diff mode)
├── scripts/
│   └── validate-tokens.js   Validador pre-build
├── turbo.json               Pipeline de builds
├── pnpm-workspace.yaml      Configuración workspace
├── CLAUDE.md                Este archivo
├── DEFERRED_TO_CSS.md       Decisiones de migración
└── README.md                Documentación pública
```

---

## Estado de los Paquetes

### ✅ @atomchat.io/tokens@2.0.0 — COMPLETO

**Versión actual:** 2.0.0 (publicado 2026-04-19)

**1,621 tokens W3C DTCG** organizados en 4 capas:

1. **Figma Primitives (read-only):** Pull automático desde Figma — 7 colecciones (Colors, Typography, Spacing, Radius, Opacity, Stroke, Breakpoints)
2. **Foundation:** 9 archivos JSON — bridges y primitivos manuales
3. **Semantic (aliases):** 4 archivos JSON — bg, fg, border, brand (referencian foundation + figma)
4. **Component (scoped):** 9 archivos JSON — button, checkbox, radio, toggle, chip, tag, skeleton, avatar, glass

**Nueva arquitectura (v2.0.0):**
- ✅ Pull automático desde Figma vía `/figma-pull` skill (MCP)
- ✅ Source: `figma/primitives/` + `foundation/` + `semantic/` + `components/`
- ✅ Style Dictionary excluye `figma/semantics/` y `figma/web-library/`
- ✅ Validator actualizado para excluir archivos de Figma no canónicos

**Build outputs:**

| Archivo | Selector | Contenido |
|---------|----------|-----------|
| `build/css/tokens.css` | `:root` | Todos los 1,621 tokens (tema light) |
| `build/css/dark.css` | `[data-theme="dark"]` | Overrides de color para dark theme |
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

### 🎯 @atomchat/components-react — STAGED (Button Ready)

**Estado:** 182 archivos en staging, listo para primer publish

**Arquitectura:**
- TypeScript 5.8 + React 18/19 support
- Build: tsup (ESM + CJS + declaraciones .d.ts)
- Polymorphic components (Button as `<button>` o `<a>`)
- Performance optimized (hoisted JSX, forwardRef, cn utility)

**Componentes implementados:**
- ✅ **Button** — 6 variants, 5 sizes, loading state, icons, polymorphic
- ✅ Avatar, Badge, Checkbox, Chip, Radio, Skeleton, StatusIcon, Tag, Toggle
- ✅ Layout: Container, Grid, Stack
- ✅ Molecules: AvatarGroup

**Fixes aplicados (2026-04-01):**
- ✅ `tabindex="-1"` en links disabled (accessibility)
- ✅ Label clone para hover rotate animation

**Peer deps:**
- `react: ^18.0.0 || ^19.0.0`
- `react-dom: ^18.0.0 || ^19.0.0`
- `@atomchat/css: workspace:*`

---

### 🎯 @atomchat/components-vue — STAGED (Button Ready)

**Estado:** 63 archivos en staging, listo para primer publish

**Arquitectura:**
- Vue 3.5 + Composition API (`<script setup>`)
- Build: Vite 6 + vite-plugin-dts
- TypeScript 5.8 con vue-tsc
- Naming: `isDisabled`/`isLoading` (convención Vue 3)

**Componentes implementados:**
- ✅ **Button** — 6 variants, 5 sizes, loading state, slots (iconLeft/iconRight)
- ✅ Avatar, Badge, Skeleton, StatusIcon
- ✅ Layout: Container, Grid, Stack
- ✅ Molecules: AvatarGroup
- ✅ Composables: useAvatarSize

**Fixes aplicados (2026-04-01):**
- ✅ `tabindex="-1"` en links disabled (accessibility)
- ✅ Label clone para hover rotate animation

**Peer deps:**
- `vue: ^3.4.0`
- `@atomchat/css: workspace:*`

---

### 🎯 @atomchat/components-angular — STAGED (Button Ready)

**Estado:** 26 archivos en staging, listo para primer publish

**Arquitectura:**
- Angular 21 + Signals + Standalone components
- Build: ng-packagr (APF format)
- TypeScript 5.8 con control flow syntax (`@if`, `@let`)
- OnPush change detection

**Componentes implementados:**
- ✅ **Button** — 6 variants, 5 sizes, loading state, ng-content projection
- ✅ Avatar, StatusIcon
- ✅ Layout: Container, Grid, Stack
- ✅ Molecules: AvatarGroup

**Fixes aplicados (2026-04-01):**
- ✅ Label clone wrapper para hover rotate animation (CRÍTICO)
- ✅ `tabindex="-1"` en links disabled (YA existía)

**Known limitation:**
- `ng-content` con `@if` solo proyecta en primera rama renderizada
- Si `href` cambia dinámicamente, contenido puede no re-proyectarse
- Documentado en comentarios del componente

**Peer deps:**
- `@angular/common: ^21.0.0`
- `@angular/core: ^21.0.0`
- `@atomchat/css: workspace:*`

---

### ✅ @atomchat.io/components-astro@5.0.1 — COMPLETO

**Versión actual:** 5.0.1 (publicado 2026-04-19)

**Estado:** 31 componentes Astro, integrado con nuevo pipeline de tokens

**Componentes implementados:**
- ✅ **Buttons** — Button, IconButton, LinkButton (6 variants, 5 sizes, loading state, slots)
- ✅ **Forms** — Checkbox, Radio, Toggle
- ✅ **Indicators** — Badge, Chip, Spinner, Tag
- ✅ **Layout** — Divider, Center, Container, Grid, Inline, Section, Stack
- ✅ **Lists** — BulletItem, NumberItem
- ✅ **Media** — Avatar, AvatarGroup
- ✅ **Typography** — Caption, Heading, LabelText, LegalMeta, Text
- ✅ **Molecules** — LogoBadge, DropdownMenu, NavLanguageSwitcher

**Arquitectura:**
- Build: None (`.astro` files consumed directly)
- TypeScript support con type checking
- Consume tokens vía `@atomchat.io/css`

**Peer deps:**
- `astro: >=4.0.0`
- `@atomchat.io/css: workspace:*`

---

### ✅ @atomchat.io/figma-sync — COMPLETO (Pull mode)

**Versión actual:** 1.0.0

**Estado:** CLI funcional para pull automático de tokens desde Figma vía MCP

**Descripción:**
Herramienta que sincroniza tokens **desde Figma hacia el monorepo** usando el Plugin API vía MCP. Reemplaza el flujo manual de copy-paste con pull automático de variable collections.

**Features implementadas:**
- ✅ **Pull desde Figma** — Extrae variables vía Plugin API (funciona en todos los planes de Figma)
- ✅ **Collection selector** — UI interactiva para elegir qué colecciones importar
- ✅ **Auto-backup** — Crea backup timestamped antes de sobrescribir
- ✅ **Dry-run mode** — Preview de cambios sin escribir archivos
- ✅ **W3C DTCG output** — Genera JSON con formato `{$value, $type}`
- ✅ **Integración con MCP** — Usa `mcp__figma-remote__use_figma` para acceso directo

**Arquitectura:**
```
tools/figma-sync/
├── src/
│   ├── pull.tsx      # CLI principal (React Ink UI)
│   └── types.ts      # TypeScript types
├── package.json      # Dependencies + scripts
├── tsconfig.json     # TypeScript config
└── README.md         # Documentación completa
```

**Uso (vía skill):**
```bash
/figma-pull <figma-url>
```

**Uso (CLI directo):**
```bash
# Pull desde Figma con backup
pnpm figma:pull -- --data <mcp-data.json> --backup

# Preview sin escribir
pnpm figma:pull -- --data <mcp-data.json> --dry-run

# Auto-confirmar (CI/CD)
pnpm figma:pull -- --data <mcp-data.json> --yes
```

**Output:**
```
packages/tokens/src/figma/primitives/
├── colors.json       (23.8 kB, 220+ tokens)
├── typography.json   (3.4 kB, 35 tokens)
├── spacing.json      (2.1 kB, 27 tokens)
├── radius.json       (1.2 kB, 16 tokens)
├── opacity.json      (709 B, 9 tokens)
├── stroke.json       (433 B, 5 tokens)
└── breakpoints.json  (214 B, 2 tokens)
```

**Workflow típico:**
1. Diseñador actualiza variables en Figma
2. Ejecutar `/figma-pull <url>` en Claude Code
3. Seleccionar colecciones a importar
4. Review del diff + confirmar
5. Auto-backup creado en `.backup-YYYY-MM-DD-HH-MM-SS/`
6. `cd packages/tokens && pnpm build`
7. Tokens actualizados y listos para usar

**Tech stack:**
- TypeScript 5.8
- tsx (ejecutor TypeScript)
- React Ink (CLI UI)
- MCP Figma Plugin API

**Dependencies:**
```json
{
  "dependencies": {
    "@atomchat.io/tokens": "workspace:*",
    "ink": "^5.2.1",
    "ink-spinner": "^5.0.0",
    "react": "^18.3.1"
  },
  "devDependencies": {
    "@figma/plugin-typings": "^1.102.0",
    "tsx": "^4.21.0",
    "typescript": "^5.8.3"
  }
}
```

---

## Comandos Críticos

```bash
# Instalar todo el monorepo
pnpm install

# Build ALL (Turbo, respeta dependencias)
pnpm build

# Pull tokens desde Figma (vía Claude Code)
/figma-pull <figma-url>

# Validar tokens ANTES de build
node scripts/validate-tokens.js

# Build individual
cd packages/tokens && pnpm build
cd packages/animations && pnpm build
cd packages/css && pnpm build

# Watch mode (desarrollo)
cd packages/tokens && pnpm dev
cd packages/css && pnpm dev

# Publicar paquete individual
cd packages/tokens && npm publish --access public
cd packages/components-astro && npm publish --access public

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

**Última actualización:** 2026-04-01 16:30

### ✅ Completado (2026-04-01)

| Task | Status | Package / URL |
|------|--------|---------------|
| Sitio docs con Astro Starlight | ✅ LIVE | https://atom-ds-documentation-brown.vercel.app/ |
| Button cross-framework (React, Vue, Angular) | ✅ COMMITTED | Main branch |
| Accessibility fixes (tabindex) | ✅ APLICADO | React, Vue, Astro, Angular |
| Animation support (label clone) | ✅ APLICADO | Angular fixed |
| **Button published to npm** | ✅ PUBLISHED | `@atomchat.io/components-react@2.0.0` |
| **Button published to npm** | ✅ PUBLISHED | `@atomchat.io/components-vue@1.0.0` |
| **Button published to npm** | ✅ PUBLISHED | `@atomchat.io/components-angular@2.0.0` |
| Build test de los 3 frameworks | ✅ PASSED | All builds successful |
| Crear changeset | ✅ DONE | v1.0.0/v2.0.0 releases |
| Commit inicial de frameworks | ✅ DONE | 2 commits pushed to main |

### 🔴 Alta Prioridad (NEXT)

| Task | Status | Notes |
|------|--------|-------|
| **Docs: Fetch from npm** | ✅ DONE | Implemented FetchedCode.astro + fetchComponentSource utility |
| **Docs: Button tested** | ✅ DONE | Build passes, fetches from jsDelivr successfully |
| **Packages with src/** | ✅ PUBLISHED | React 2.0.1, Vue 1.0.1, Angular 2.0.1 |
| Push cambios de docs | 🎯 NEXT | git push docs repo | Hoy |
| Push branch `next` | 🎯 NEXT | git push origin next (monorepo) | Hoy |

**✅ IMPLEMENTADO: Fetch desde npm en docs**

La documentación ahora fetcha código fuente directamente desde npm vía jsDelivr.

**Implementación:**

1. **Utility creado**: `src/utils/fetchComponentSource.ts`
   - Fetches desde jsDelivr en build-time
   - Crea ComponentSource con metadata
   - Soporta versiones específicas

2. **Component wrapper**: `src/components/FetchedCode.astro`
   ```astro
   <FetchedCode component="Button" framework="react" />
   ```

3. **URLs activas** (v2.0.1/v1.0.1):
   - React: `https://cdn.jsdelivr.net/npm/@atomchat.io/components-react@2.0.1/src/atoms/Button.tsx`
   - Vue: `https://cdn.jsdelivr.net/npm/@atomchat.io/components-vue@1.0.1/src/atoms/Button.vue`
   - Angular: `https://cdn.jsdelivr.net/npm/@atomchat.io/components-angular@2.0.1/src/atoms/button.component.ts`

**Resultado:**
- ✅ Build exitoso (button.mdx generado)
- ✅ Código fuente visible en HTML
- ✅ Zero duplication
- ✅ Single source of truth (npm)

---

### 🟡 Media Prioridad (Post-MVP)

| Task | Notas | ETA |
|------|-------|-----|
| Completar @atomchat/components-astro | Badge, Input, Card, Typography | Semana 2 |
| GitHub Actions CI/CD | Auto-publish con Changesets en version tags | Semana 2 |
| ESLint plugin | Bloquear hardcoded values en components | Semana 3 |
| Crear READMEs completos | Mejorar npm pages con ejemplos | Semana 2 |
| Playground interactivo | Storybook o custom playground | Semana 3 |

### 🟢 Futura (Backlog)

| Task | Prioridad | Notas |
|------|-----------|-------|
| Figma variables sync via Tokens Studio | Low | Tokens bidirectional sync |
| Storybook addon para preview de tokens | Low | Visual token browser |
| Separate LinkButton component (Angular) | Low | Workaround ng-content limitation |
| Standardize prop naming cross-framework | Low | Considerar deprecar `isDisabled` de Vue |
| VSCode extension | Low | Autocomplete para tokens |
| CLI tool | Low | `npx @atomchat/cli init` scaffolding |

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
