# Story Implementation Guide — ATOM DS

## Package roles

| Package | Role | Import in story |
|---|---|---|
| `@atomchat.io/tokens` | CSS custom properties | ❌ Never — loaded globally in `preview.jsx` |
| `@atomchat.io/css` | Component styles | ❌ Never — loaded globally in `preview.jsx` |
| `@atomchat.io/animations` | GSAP + CSS animations | ❌ Never — initialized globally in `preview.jsx` |
| `@atomchat.io/components-react` | React components | ✅ Always — import here |

---

## Rules (≤200 chars each)

**R1 — Import from the package, never hardcode.**
Every component must be imported from `@atomchat.io/components-react`. Never write raw CSS class strings in a story if a React component exists.

**R2 — No React component? Create it before writing the story.**
Check `packages/components-astro/src/` for the canonical props and HTML structure. Mirror it in `packages/components-react/src/`. Then import it.

**R3 — Astro component is the source of truth.**
Props, data-attributes, class names, slots → all defined in the `.astro` file. The React component must produce identical HTML output.

**R4 — CSS classes are driven by `data-*` attributes, not modifier classes.**
Check the `.css` file. If it uses `[data-variant="filled"]`, the component must set `data-variant={variant}`, not `className="chip--filled"`.

**R5 — Tokens and CSS load automatically. Never import them in a story.**
`preview.jsx` imports `@atomchat.io/tokens/build/css/tokens.css` and `@atomchat.io/css/dist/atom.css` globally. Adding them in a story creates duplication.

**R6 — Animations init automatically via the `withAnimations` decorator.**
`preview.jsx` calls `window.__atomInit()` after every render. Never call `initXxx()` inside a story. If an animation module is missing from `__atomInit`, add it to `preview.jsx` + alias to `main.js`.

**R7 — Playground uses `useState`, never Storybook argTypes controls.**
Interactive controls are chip buttons rendered inside the story. `argTypes` panel is for autodocs only. Users should not need the Storybook controls panel to interact with a Playground.

**R8 — Playground chip pattern.**
```jsx
const Ctrl = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{ /* chip styles */ }}>{label}</button>
);
// Usage:
<Ctrl label="filled" active={variant === 'filled'} onClick={() => setVariant('filled')} />
```

**R9 — Components that need animation init on mount use `useEffect` + `useRef`.**
If a component owns its animation (marquee, accordion), the React component handles `initXxx()` in `useEffect` internally. The story just renders the component.

**R10 — Story file structure.**
```jsx
import { ComponentName } from '@atomchat.io/components-react';

export default { title: 'Components/Name', component: ComponentName, tags: ['autodocs'] };

export const Playground = { render: () => { /* useState controls */ } };
export const AllStates   = { render: () => { /* static grid */ } };
```

**R11 — Rebuilding after component changes.**
After editing any file in `packages/components-react/src/`, run `pnpm build` inside that package before the story reflects the change.

---

## Checklist before adding a new story

- [ ] React component exists in `@atomchat.io/components-react`
- [ ] Component HTML matches the Astro version (same classes, same `data-*` attrs)
- [ ] Story imports ONLY from `@atomchat.io/components-react`
- [ ] Playground has chip-based controls via `useState`
- [ ] No raw CSS class strings, no hardcoded tokens, no inline animation calls
