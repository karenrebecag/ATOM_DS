# @atomchat.io/components-vue

ATOM Design System Vue 3 component library built with Composition API, TypeScript, and `<script setup>`.

## Installation

```bash
pnpm add @atomchat.io/components-vue
# or
npm install @atomchat.io/components-vue
# or
yarn add @atomchat.io/components-vue
```

## Requirements

- **Vue:** ^3.4.0
- **@atomchat.io/css:** Peer dependency (required for styles)

## Usage

### Import Components

```vue
<script setup lang="ts">
import { Button, Avatar, Checkbox } from '@atomchat.io/components-vue'
import '@atomchat.io/css' // Import CSS styles
</script>

<template>
  <Button variant="Primary" size="m" @click="handleClick">
    Click me
  </Button>

  <Avatar src="/user.jpg" alt="John Doe" size="m" badge="online" />

  <Checkbox v-model="isAccepted">
    I accept the terms
  </Checkbox>
</template>
```

### Individual Imports (Tree-shaking)

```typescript
import Button from '@atomchat.io/components-vue/atoms/Button'
import Avatar from '@atomchat.io/components-vue/atoms/Avatar'
import { Stack, Container } from '@atomchat.io/components-vue/layout'
```

### TypeScript Support

All components are fully typed with TypeScript:

```typescript
import type { ButtonProps, AvatarSize } from '@atomchat.io/components-vue'

const size: AvatarSize = 'm'
```

## Available Components

### ✅ Atoms (3/17 implemented)

- **Button** — Primary interactive component (6 variants, 5 sizes, loading state)
- **Checkbox** — Form control with v-model support
- **Avatar** — User profile images with fallback and badges

### 🚧 Atoms (In Progress)

- Badge, Caption, Chip, Divider, Heading, IconButton, LabelText, LinkButton, Radio, Spinner, StatusIcon, Tag, Text, Toggle

### 🚧 Molecules (Pending)

- AvatarGroup

### 🚧 Layout (Pending)

- Container, Stack, Grid, Inline, Section, Center

## Component Examples

### Button

```vue
<Button variant="Primary" size="m">Primary Button</Button>
<Button variant="Secondary" :is-loading="true">Loading...</Button>
<Button variant="Destructive Primary" :is-disabled="true">Delete</Button>
<Button href="/about">Link Button</Button>

<!-- With icons -->
<Button variant="Primary">
  <template #iconLeft><PlusIcon /></template>
  Create New
</Button>
```

### Avatar

```vue
<!-- Image avatar -->
<Avatar src="/user.jpg" alt="John Doe" size="m" badge="online" />

<!-- Initials avatar -->
<Avatar initials="JD" size="s" shape="square" />

<!-- Icon avatar -->
<Avatar type="icon" size="l" badge="verified">
  <template #icon><UserIcon /></template>
</Avatar>
```

### Checkbox

```vue
<script setup>
import { ref } from 'vue'
const isAccepted = ref(false)
const selectAll = ref(false)
</script>

<template>
  <Checkbox v-model="isAccepted">
    Accept terms and conditions
  </Checkbox>

  <Checkbox v-model="selectAll" :is-indeterminate="someSelected">
    Select All
  </Checkbox>

  <Checkbox v-model="isDisabled" :is-disabled="true">
    Disabled Checkbox
  </Checkbox>
</template>
```

## CSS Integration

This package depends on `@atomchat.io/css` for styling. All components use BEM-style CSS classes and CSS custom properties (tokens) from the design system.

**Import CSS in your app entry:**

```typescript
// main.ts or App.vue
import '@atomchat.io/css'
```

**Or import individual CSS files:**

```typescript
import '@atomchat.io/css/dist/components/button.css'
import '@atomchat.io/css/dist/components/avatar.css'
```

## Animation Hooks

Components expose `data-*` attributes for integration with `@atomchat.io/animations`:

```html
<!-- Button exposes data-button and data-hover-rotate -->
<button data-button data-hover-rotate>Click me</button>

<!-- Avatar exposes data-avatar -->
<span data-avatar data-size="m">...</span>
```

## Development

```bash
# Install dependencies
pnpm install

# Build package
pnpm build

# Type check
pnpm typecheck

# Watch mode (development)
pnpm dev
```

## Project Structure

```
src/
├── atoms/           # Atomic components (Button, Avatar, etc.)
├── molecules/       # Composite components (AvatarGroup, etc.)
├── layout/          # Layout primitives (Stack, Container, etc.)
├── composables/     # Shared Vue composables
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── index.ts         # Main entry point
```

## License

MIT

## Links

- [ATOM Design System GitHub](https://github.com/atomchat/atom-design-system)
- [Documentation](https://atomchat.io/design-system)
