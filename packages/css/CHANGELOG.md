# @atomchat/css

## 0.2.2

### Patch Changes

- fix(chip): correct token naming and CSS implementation
  - Align semantic token naming with Figma convention (enabled/hovered vs default/hover)
  - Fix chip border-radius to use 8px token instead of pill shape
  - Fix padding references to use actual token values
  - Add .chip\_\_dismiss styles for dismissible chips
  - Ensure asymmetric XS padding matches Figma design

- Updated dependencies
  - @atomchat.io/tokens@1.0.2

## 0.2.1

### Patch Changes

- fix(chip): align design with figma spec
  - Change border-radius from pill (1000px) to 8px rounded corners
  - Add xs padding token with asymmetric padding (4px vertical, 8px horizontal)
  - Improve Chip component with default icons and dismissible mode
  - Verify all color tokens match Figma design system

- Updated dependencies
  - @atomchat.io/tokens@1.0.1

## 0.2.0

### Minor Changes

- Add complete text component system with 4 atoms and 12 animations
  - Heading: semantic h1-h6 with size/level decoupling, 10 sizes, 3 weights, 6 tracking
  - Text: flexible p/span/div/li with truncation and multi-line clamp
  - LabelText: form labels with required indicator and disabled states
  - Caption: auxiliary text for metadata, captions, footnotes

  Includes 12 text animations: masked reveals, scramble effects, fade-up, scroll-driven, and loops.
  All components use only existing verified tokens from Figma with prefers-reduced-motion support.
