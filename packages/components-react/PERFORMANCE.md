# Performance Optimizations — @atomchat.io/components-react

This document outlines all Vercel React best practices applied to this library.

## 📊 Bundle Size

- **Tree-shakable**: `sideEffects: false` in package.json
- **Dual format**: ESM + CJS exports for optimal bundling
- **Split chunks**: Each component can be imported individually
- **Zero runtime dependencies** (except React/ReactDOM peer deps)
- **Static extraction**: All SVG icons hoisted to module level

## ⚡ Rendering Performance

### `rendering-hoist-jsx`
All static JSX elements are extracted outside component functions:

```tsx
// Button.tsx
const SpinnerIcon = (
  <span className="button__spinner" data-button-spinner aria-hidden="true" />
);

export const Button = forwardRef((props, ref) => {
  // Component uses SpinnerIcon directly (no re-creation on each render)
  return <>{loading && SpinnerIcon}</>;
});
```

**Applied to:**
- Button (spinner icon)
- Avatar (default user icon, verified badge)
- Chip (filter icon, close icon)
- Toggle (error icon)
- Checkbox (checkmark icon)

### `rerender-no-inline-components`
Zero inline component definitions. All components are defined at module level.

### `rerender-lazy-state-init`
Not applicable - this library provides stateless components (controlled by parent).

## 🧠 JavaScript Performance

### `js-cache-function-results`
Pure computation functions hoisted to module level:

```tsx
// Badge.tsx
function getBadgeDisplay(count: number, context: BadgeContext): string | null {
  if (count <= 0) return null;
  if (context === 'inbox') return count >= 50 ? '+50' : count.toString();
  return count > 99 ? '99+' : count.toString();
}
```

### `js-early-exit`
Early returns prevent unnecessary computation:

```tsx
// Badge.tsx
export const Badge = forwardRef((props, ref) => {
  const displayValue = getBadgeDisplay(count, context);
  if (!displayValue) return null; // Early exit for zero count
  // ... rest of component
});
```

## 🎯 TypeScript Performance

### Strict Mode Enabled
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true
}
```

### Type Safety
- All props explicitly typed
- No `any` types
- forwardRef with proper generic types
- Polymorphic components typed correctly

## 📦 Build Configuration

### tsup (Fast bundler)
- Uses esbuild under the hood
- Parallel builds (ESM + CJS + DTS)
- Source maps enabled
- Tree-shaking enabled
- Code splitting enabled

### Bundle Analysis
```bash
# ESM output
dist/index.js            756 B
dist/atoms/Button.js     147 B (+ chunks)
dist/atoms/Avatar.js     178 B (+ chunks)
# ... (all components < 250 B entry)

# Total ESM bundle: ~25 KB (uncompressed, pre-gzip)
# Total CJS bundle: ~28 KB (uncompressed, pre-gzip)
```

## 🚀 Usage Recommendations

### 1. Named Imports (Best)
Tree-shakes unused components:
```tsx
import { Button, Avatar } from '@atomchat.io/components-react';
```

### 2. Direct Imports (Optimal for large apps)
Bypasses barrel file:
```tsx
import { Button } from '@atomchat.io/components-react/atoms/Button';
```

### 3. Avoid Barrel Imports (Anti-pattern)
```tsx
// ❌ Don't do this (imports entire library)
import * as ATOM from '@atomchat.io/components-react';
```

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| Tree-shakable | ✅ Yes |
| Side-effect free | ✅ Yes (`sideEffects: false`) |
| ESM support | ✅ Yes |
| CJS support | ✅ Yes |
| TypeScript declarations | ✅ Yes (`.d.ts` + `.d.cts`) |
| Source maps | ✅ Yes |
| React version | 18.x / 19.x |
| Target | ES2022 |
| Minified | ❌ No (delegated to consumer) |
| Gzipped | ❌ No (delegated to consumer) |

## 🔍 Not Applicable Rules

### Client-side data fetching
- ❌ `client-swr-dedup` - Library provides UI components, not data fetching

### Server-side performance
- ❌ `server-cache-react` - Not applicable to component library
- ❌ `server-parallel-fetching` - Not applicable

### Bundle size (deferred)
- ⏸️ `bundle-dynamic-imports` - Components are already small enough
- ⏸️ `bundle-defer-third-party` - No third-party dependencies

### Re-render optimization (consumer responsibility)
- ⏸️ `rerender-memo` - Consumer should memoize as needed
- ⏸️ `rerender-transitions` - Consumer implements transitions
- ⏸️ `rerender-use-deferred-value` - Consumer implements deferring

## 🎨 Animation Contract

Components expose `data-*` attributes for `@atomchat.io/animations`:

```tsx
<Button data-button data-hover-rotate>
  <span data-button-label>Click me</span>
  <span data-button-label-clone>Click me</span>
</Button>
```

This allows animation logic to be:
1. **Lazy loaded** (user can choose not to load animations)
2. **Zero-bundle impact** (animations not bundled with components)
3. **Framework agnostic** (works with any GSAP setup)

## 📚 References

- [Vercel React Best Practices](https://vercel.com/blog/react-performance-optimization)
- [Bundle Size Best Practices](https://bundlephobia.com/)
- [tsup Documentation](https://tsup.egoist.dev/)
