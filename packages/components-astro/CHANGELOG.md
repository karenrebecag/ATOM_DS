# @atomchat/components-astro

## 2.0.3

### Patch Changes

- fix: correct Avatar import in AvatarGroup component

  Fix import statement to use default import instead of named import. Avatar component exports as default, not as named export.

## 2.0.2

### Patch Changes

- Updated dependencies
  - @atomchat.io/css@0.2.2

## 2.0.1

### Patch Changes

- fix(chip): align design with figma spec
  - Change border-radius from pill (1000px) to 8px rounded corners
  - Add xs padding token with asymmetric padding (4px vertical, 8px horizontal)
  - Improve Chip component with default icons and dismissible mode
  - Verify all color tokens match Figma design system

- Updated dependencies
  - @atomchat.io/css@0.2.1

## 2.0.0

### Minor Changes

- Add complete text component system with 4 atoms and 12 animations
  - Heading: semantic h1-h6 with size/level decoupling, 10 sizes, 3 weights, 6 tracking
  - Text: flexible p/span/div/li with truncation and multi-line clamp
  - LabelText: form labels with required indicator and disabled states
  - Caption: auxiliary text for metadata, captions, footnotes

  Includes 12 text animations: masked reveals, scramble effects, fade-up, scroll-driven, and loops.
  All components use only existing verified tokens from Figma with prefers-reduced-motion support.

### Patch Changes

- Updated dependencies
  - @atomchat/css@0.2.0
