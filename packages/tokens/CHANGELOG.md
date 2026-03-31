# @atomchat.io/tokens

## 1.0.2

### Patch Changes

- fix(chip): correct token naming and CSS implementation
  - Align semantic token naming with Figma convention (enabled/hovered vs default/hover)
  - Fix chip border-radius to use 8px token instead of pill shape
  - Fix padding references to use actual token values
  - Add .chip\_\_dismiss styles for dismissible chips
  - Ensure asymmetric XS padding matches Figma design

## 1.0.1

### Patch Changes

- fix(chip): align design with figma spec
  - Change border-radius from pill (1000px) to 8px rounded corners
  - Add xs padding token with asymmetric padding (4px vertical, 8px horizontal)
  - Improve Chip component with default icons and dismissible mode
  - Verify all color tokens match Figma design system
