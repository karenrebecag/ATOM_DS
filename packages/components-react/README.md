# @atomchat.io/components-react

ATOM Design System — React component library

## 📦 Installation

```bash
npm install @atomchat.io/components-react @atomchat.io/css
# or
pnpm add @atomchat.io/components-react @atomchat.io/css
# or
yarn add @atomchat.io/components-react @atomchat.io/css
```

## 🚀 Usage

### Import CSS (once in your app)

```tsx
// app.tsx or main.tsx
import '@atomchat.io/css';
```

### Import Components

```tsx
import { Button, Avatar, Stack } from '@atomchat.io/components-react';

function App() {
  return (
    <Stack gap="m">
      <Avatar src="/user.jpg" size="m" badge="online" />
      <Button variant="Primary" size="m">
        Click me
      </Button>
    </Stack>
  );
}
```

### Tree-shakable Imports

```tsx
// Import only what you need (better for bundle size)
import { Button } from '@atomchat.io/components-react/atoms/Button';
import { Stack } from '@atomchat.io/components-react/layout/Stack';
```

## 📚 Components

### Atoms (9)
- `Avatar` — Profile images, initials, icons with status badges
- `Badge` — Notification counters with smart overflow
- `Button` — Interactive buttons with loading states (can render as link)
- `Checkbox` — Styled checkboxes and radios
- `Chip` — Filterable tags with dismiss functionality
- `StatusIcon` — Status indicator dots
- `Tag` — Non-interactive labels
- `Text` — Body text with truncation and animation hooks
- `Toggle` — Switch controls with labels and errors

### Molecules (1)
- `AvatarGroup` — Overlapping avatars with "+N" counter

### Layout Primitives (4)
- `Container` — Max-width centered layouts
- `Stack` — Vertical flex layouts
- `Grid` — CSS Grid responsive layouts
- `Inline` — Horizontal flex layouts

## 🎨 Design Tokens

This library depends on `@atomchat.io/css` which includes all design tokens:
- 1,110 CSS custom properties
- Semantic color system
- Component-scoped tokens
- Dark theme support via `[data-theme="dark"]`

## ⚡ Performance

Built with Vercel React best practices:
- Tree-shakable ESM exports
- No runtime dependencies (except React)
- TypeScript first
- `sideEffects: false` for optimal bundling
- Static SVG icons hoisted to module level
- forwardRef on all components
- Polymorphic components without inline definitions

## 🔗 TypeScript

Fully typed with TypeScript. All components export their prop types:

```tsx
import type { ButtonProps, AvatarProps } from '@atomchat.io/components-react';
```

## 📖 Examples

### Button with Icons

```tsx
<Button variant="Primary" size="m" iconLeft={<SearchIcon />}>
  Search
</Button>
```

### Button as Link

```tsx
<Button as="a" href="/about" variant="Secondary">
  Learn More
</Button>
```

### Avatar with Badge

```tsx
<Avatar
  src="/user.jpg"
  alt="John Doe"
  size="m"
  badge="online"
  shape="circle"
/>
```

### Avatar Group

```tsx
<AvatarGroup
  avatars={[
    { src: '/user1.jpg', alt: 'User 1', badge: 'online' },
    { src: '/user2.jpg', alt: 'User 2' },
    { initials: 'JD', alt: 'John Doe' },
  ]}
  max={3}
  size="s"
/>
```

### Badge with Context

```tsx
<Badge count={150} context="default" type="info" />
// Renders: "99+"

<Badge count={60} context="inbox" type="inbox" />
// Renders: "+50"
```

### Toggle with Label

```tsx
<Toggle
  name="notifications"
  checked={isEnabled}
  label="Enable notifications"
  supportiveText="You'll receive updates via email"
  onChange={(e) => setIsEnabled(e.target.checked)}
/>
```

### Text with Truncation

```tsx
<Text truncate={3} size="body">
  Long paragraph that will be clamped to 3 lines with ellipsis...
</Text>
```

### Responsive Grid

```tsx
<Grid columns={3} gap="l">
  <Card />
  <Card />
  <Card />
</Grid>
```

### Stack Layout

```tsx
<Stack gap="m" align="center">
  <Heading />
  <Text />
  <Button />
</Stack>
```

## 🛠️ Development

```bash
# Build the library
pnpm build

# Watch mode
pnpm dev

# Type check
pnpm type-check
```

## 📄 License

MIT
