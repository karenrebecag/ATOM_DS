# ATOM Design System — Standards & Conventions

Coding standards, naming conventions, and best practices for all packages in the ATOM monorepo.

**Última actualización:** 2026-04-19

---

## Table of Contents

1. [Token Naming](#token-naming)
2. [CSS Standards](#css-standards)
3. [Component Standards](#component-standards)
4. [File Organization](#file-organization)
5. [Git Workflow](#git-workflow)
6. [TypeScript Standards](#typescript-standards)
7. [Anti-Patterns](#anti-patterns)

---

## Token Naming

### CSS Custom Properties (Output)

**Format:** `--{tier}-{category}-{role}-{state}`

**Examples:**
```css
--primitive-zinc-950
--bg-primary
--buttons-bg-primary-enabled
```

**Rules:**
- All lowercase
- Kebab-case only
- No camelCase, no PascalCase, no snake_case
- Tier prefixes: `primitive`, `figma`, `{component-name}`, or none (semantic)

### JSON Token Keys (Source)

**Format:** Same as CSS output (lowercase kebab-case)

**Examples:**
```json
{
  "primitive-zinc-950": { "$value": "#09090b", "$type": "color" },
  "bg-primary": { "$value": "{primitive-neutral-0}", "$type": "color" }
}
```

**Rules:**
- W3C DTCG spec compliant: `$value`, `$type`, `$description` (optional)
- References use `{path.to.token}` format
- No nested objects — flat key structure

### Spacing Scale

**Canonical names:** `none`, `xxs`, `xs`, `s`, `sm`, `m`, `md`, `l`, `lg`, `xl`, `xxl`, `2xl`, `3xl`...`17xl`

**⚠️ NEVER:** `2xxl`, `8xxl`, `8-xxl`, `8 xxl` (legacy Figma names — cleaned by SD transform)

**Values:**
```
none  → 0px
xxs   → 2px
xs    → 4px
s     → 8px
sm    → 12px
m     → 16px
md    → 20px
l     → 24px
lg    → 28px
xl    → 32px
xxl   → 36px
2xl   → 40px
3xl   → 44px
...
17xl  → 100px
```

---

## CSS Standards

### Golden Rules

1. ❌ **ZERO hardcoded values** — Everything uses `var(--token-name)`
2. ✅ **Hybrid pattern** — Component tokens for colors, semantic for spacing/typography/motion
3. ✅ **BEM naming** — `.block__element--modifier`
4. ✅ **No !important** — Refactor specificity instead
5. ✅ **Mobile-first** — Base styles for mobile, `@media` for larger screens

### Property Order

```css
.component {
  /* 1. Positioning */
  position: relative;
  z-index: 1;

  /* 2. Box model */
  display: flex;
  align-items: center;
  padding: var(--s) var(--m);
  border-radius: var(--radius-s);

  /* 3. Typography */
  font-family: var(--font-family-titles);
  font-size: var(--text-body);
  line-height: var(--line-height-body);

  /* 4. Visual */
  background: var(--buttons-bg-primary-enabled);
  color: var(--buttons-fg-primary-enabled);
  border: var(--stroke-xs) solid var(--border-primary);

  /* 5. Transitions (last) */
  transition: background var(--duration-half);
}
```

### BEM Conventions

```css
/* Block */
.button { }

/* Element */
.button__icon { }
.button__label { }

/* Modifier */
.button--primary { }
.button--disabled { }

/* Element + Modifier */
.button__label--clone { }
```

**⚠️ Max nesting depth:** 3 levels

```scss
// ✅ GOOD
.button {
  &__label {
    &--clone { }
  }
}

// ❌ BAD (too deep)
.button {
  &__label {
    &__text {
      &__span { }  // ← 4 levels
    }
  }
}
```

### Responsive Breakpoints

```css
/* Mobile-first: base styles = mobile */
.component {
  padding: var(--s);
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    padding: var(--m);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    padding: var(--l);
  }
}
```

**Token references:** Use `var(--breakpoint-md)` when available.

---

## Component Standards

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| React component | PascalCase.tsx | `Button.tsx`, `AvatarGroup.tsx` |
| Vue component | PascalCase.vue | `Button.vue`, `AvatarGroup.vue` |
| Angular component | kebab-case.component.ts | `button.component.ts` |
| Astro component | PascalCase.astro | `Button.astro`, `AvatarGroup.astro` |
| CSS file | kebab-case.css | `button.css`, `avatar-group.css` |
| Utility/hook | camelCase.ts | `useButton.ts`, `cn.ts` |

### Props Interface Naming

**React:**
```ts
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  disabled?: boolean;
}
```

**Vue:**
```ts
interface Props {
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  isDisabled?: boolean;  // ← Note: Vue uses is* prefix
}
```

**Angular:**
```ts
// Signals (no interface needed)
variant = input<'primary' | 'secondary'>('primary');
size = input<'xs' | 's' | 'm' | 'l' | 'xl'>('m');
disabled = input(false);  // ← Note: Angular uses boolean name
```

**Astro:**
```ts
interface Props {
  variant?: "Primary" | "Secondary";  // ← Note: Astro uses PascalCase values
  size?: "xs" | "s" | "m" | "l" | "xl";
  disabled?: boolean;
}
```

### Boolean Props Naming

| Framework | Convention | Example |
|-----------|------------|---------|
| React | `disabled`, `loading` | `<Button disabled loading />` |
| Vue | `isDisabled`, `isLoading` | `<Button :isDisabled="true" />` |
| Angular | `disabled`, `loading` | `<atom-button [disabled]="true" />` |
| Astro | `disabled`, `loading` | `<Button disabled loading />` |

**Reasoning:** Vue prefers `is*` prefix for clarity in templates.

### Variant Naming

**React/Vue/Angular:** lowercase

```ts
variant: 'primary' | 'secondary' | 'danger-primary'
```

**Astro:** PascalCase (legacy compatibility)

```ts
variant: "Primary" | "Secondary" | "Destructive Primary"
```

**Mapping in Astro:**

```astro
const variantMap = {
  "Primary": "primary",
  "Secondary": "secondary",
  "Destructive Primary": "danger-primary"
};
```

### Size Scale

**Standard sizes (all frameworks):**

```ts
size: 'xs' | 's' | 'm' | 'l' | 'xl'
```

**Component-specific:**

```ts
// Radio/Toggle/Checkbox: only 2 sizes
size: 's' | 'm'

// Avatar: 4 sizes
size: 'xs' | 's' | 'm' | 'l'
```

---

## File Organization

### Monorepo Structure

```
atom-design-system/
├── packages/
│   ├── tokens/              @atomchat.io/tokens
│   ├── animations/          @atomchat.io/animations
│   ├── css/                 @atomchat.io/css
│   ├── components-react/    @atomchat.io/components-react
│   ├── components-vue/      @atomchat.io/components-vue
│   ├── components-angular/  @atomchat.io/components-angular
│   └── components-astro/    @atomchat.io/components-astro
├── apps/
│   └── docs/                Documentation site
├── tools/
│   └── figma-sync/          Figma MCP sync tool
├── docs/                    Architecture docs
└── scripts/                 Monorepo scripts
```

### Component Package Structure

```
packages/components-{framework}/
├── src/
│   ├── atoms/
│   │   ├── buttons/         Button, IconButton, LinkButton
│   │   ├── forms/           Checkbox, Radio, Toggle
│   │   ├── indicators/      Badge, Chip, Tag, Spinner
│   │   ├── media/           Avatar
│   │   ├── typography/      Heading, Text, Caption, LabelText
│   │   ├── layout/          Divider
│   │   └── lists/           BulletItem, NumberItem
│   ├── molecules/           AvatarGroup, DropdownMenu
│   ├── organisms/           (future)
│   └── index.ts             Barrel export
├── dist/                    Build output (gitignored)
├── package.json
├── tsconfig.json
└── README.md
```

### CSS Package Structure

```
packages/css/
├── src/
│   ├── foundation/
│   │   ├── base.css
│   │   ├── reset.css
│   │   ├── typography.css
│   │   └── index.css
│   ├── components/
│   │   ├── buttons/
│   │   ├── forms/
│   │   ├── indicators/
│   │   ├── media/
│   │   ├── navigation/
│   │   └── typography/
│   ├── utilities/
│   │   ├── glass.css
│   │   ├── motion.css
│   │   └── helpers.css
│   └── index.css            Entry point
├── dist/
│   └── atom.css             42.5 kB bundle
└── package.json
```

---

## Git Workflow

### Branch Naming

```bash
feat/feature-name        # New feature
fix/bug-description      # Bug fix
refactor/area            # Code refactor
docs/what-changed        # Documentation only
chore/task-name          # Build/tooling changes
```

### Commit Messages (Conventional Commits)

**Format:** `type(scope): short description`

**Types:**

| Type | Use Case | Example |
|------|----------|---------|
| `feat` | New feature | `feat(button): add loading state` |
| `fix` | Bug fix | `fix(checkbox): correct focus outline` |
| `refactor` | Code restructure | `refactor(tokens): organize by semantic folders` |
| `docs` | Documentation | `docs(tokens): add consumption guide` |
| `style` | Formatting | `style(css): fix indentation in button.css` |
| `perf` | Performance | `perf(css): reduce bundle size` |
| `test` | Tests | `test(button): add keyboard navigation tests` |
| `chore` | Build/tooling | `chore(deps): update Style Dictionary to 4.5` |

**Scopes:**

```
tokens | css | animations | docs | ci | config
button | checkbox | avatar | chip | tag
react | vue | angular | astro
```

**Rules:**
- Subject line: max 72 chars, lowercase, no period
- Body (optional): explain WHY, not WHAT
- ❌ NEVER mention "AI", "Claude", or "generated by"
- ✅ ALWAYS include co-author: `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`

**Examples:**

```bash
# Good
feat(tokens): add semantic color aliases for dark mode
fix(button): prevent double-click on loading state
refactor(css): move status-icon styles to avatar.css
docs(standards): add token naming conventions

# Bad
feat: add stuff
fix: oops
update code
```

### Pull Requests

**Title:** Same format as commit messages

**Description Template:**

```markdown
## Summary
<!-- What does this PR do? -->

## Changes
- [ ] Item 1
- [ ] Item 2

## Testing
<!-- How was this tested? -->

## Screenshots
<!-- If UI changes -->

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

---

## TypeScript Standards

### Explicit Types

```ts
// ✅ GOOD
function getUserData(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then(res => res.json());
}

// ❌ BAD
function getUserData(id) {  // ← implicit any
  return fetch(`/api/users/${id}`).then(res => res.json());  // ← implicit any
}
```

### Never Use `any`

```ts
// ❌ BAD
const data: any = await fetch(url);

// ✅ GOOD
const data: unknown = await fetch(url);
// Then narrow with type guards
if (isUser(data)) {
  // data is User here
}
```

### Named Exports (Prefer over Default)

```ts
// ✅ GOOD (named export)
export const Button = () => { };

// ❌ BAD (default export)
export default function Button() { }
```

**Reason:** Better for tree-shaking, refactoring, and autocomplete.

### Interface vs Type

| Use Case | Use |
|----------|-----|
| Component props | `interface` |
| Union types | `type` |
| Mapped types | `type` |
| Simple object shape | `interface` |

```ts
// ✅ Interface for props
interface ButtonProps {
  variant: 'primary' | 'secondary';
}

// ✅ Type for unions
type Variant = 'primary' | 'secondary';
type Size = 'xs' | 's' | 'm' | 'l' | 'xl';
```

---

## Anti-Patterns

### ❌ Hardcoded Values in CSS

```css
/* ❌ WRONG */
.button {
  padding: 8px 16px;
  background: #3b82f6;
  border-radius: 6px;
}

/* ✅ CORRECT */
.button {
  padding: var(--s) var(--m);
  background: var(--buttons-bg-primary-enabled);
  border-radius: var(--radius-s);
}
```

### ❌ Using Primitives in Components

```css
/* ❌ WRONG — skips semantic layer */
.button {
  background: var(--primitive-zinc-950);
}

/* ✅ CORRECT — uses appropriate tier */
.button {
  background: var(--buttons-bg-primary-enabled);
}
```

### ❌ Mixing Frameworks in One Package

```
❌ packages/components/  ← BAD: React + Vue + Angular together
✅ packages/components-react/
✅ packages/components-vue/
✅ packages/components-angular/
```

### ❌ Editing Build Output

```bash
# ❌ WRONG
vim packages/tokens/build/css/tokens.css

# ✅ CORRECT
vim packages/tokens/src/semantic/colors.json
cd packages/tokens && pnpm build
```

### ❌ Skipping Peer Dependencies

```json
// ❌ WRONG
{
  "dependencies": {
    "@atomchat.io/css": "^2.0.0"
  }
}

// ✅ CORRECT
{
  "peerDependencies": {
    "@atomchat.io/css": "workspace:*"
  }
}
```

### ❌ Using `!important`

```css
/* ❌ WRONG */
.button {
  background: var(--bg-primary) !important;
}

/* ✅ CORRECT — increase specificity */
.button.button--primary {
  background: var(--bg-primary);
}
```

### ❌ Generic Class Names

```css
/* ❌ WRONG */
.wrapper { }
.container { }
.box { }

/* ✅ CORRECT — BEM with block prefix */
.button__wrapper { }
.card__container { }
.avatar__box { }
```

---

## Accessibility Standards

### ARIA Labels

```tsx
// ✅ Icon-only buttons
<button aria-label="Close">
  <XIcon />
</button>

// ✅ Status indicators
<span role="status" aria-label="Online">
  <StatusIcon status="online" />
</span>
```

### Focus States

```css
/* ✅ Always visible focus ring */
.button:focus-visible {
  outline: 2px solid var(--border-interactive-primary-focused);
  outline-offset: 2px;
}
```

### Touch Targets

```css
/* ✅ Minimum 44x44px */
.button--s {
  min-width: 44px;
  min-height: 44px;
}
```

### Disabled Links

```tsx
// ✅ tabindex="-1" for disabled links
<a
  href={disabled ? undefined : href}
  tabIndex={disabled ? -1 : undefined}
  aria-disabled={disabled}
>
  Link
</a>
```

---

## Performance Guidelines

### CSS Bundle Size

- **Target:** < 50 kB minified
- **Current:** 42.5 kB ✅
- **Gzipped:** ~8 kB

### Component Tree Shaking

React/Vue/Angular components are tree-shakeable:

```ts
// ✅ Only Button is bundled
import { Button } from '@atomchat.io/components-react';
```

### Lazy Loading

```tsx
// ✅ Code-split heavy components
const HeavyChart = lazy(() => import('./HeavyChart'));
```

---

## Testing Standards

### Unit Tests

```ts
// ✅ Test component behavior
describe('Button', () => {
  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Accessibility Tests

```ts
// ✅ Test keyboard navigation
it('should be keyboard accessible', () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole('button');
  button.focus();
  expect(button).toHaveFocus();
});
```

---

## Resources

- [Token Architecture](/packages/tokens/ARCHITECTURE.md)
- [Token Consumption Guide](./TOKEN_CONSUMPTION.md)
- [Component Architecture](./COMPONENT_ARCHITECTURE.md)
- [Figma Sync](../tools/figma-sync/README.md)

---

**Maintained by:** ATOM Design System Team
**Last updated:** 2026-04-19
