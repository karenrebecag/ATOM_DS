# @atomchat.io/components-react

## 2.0.1

### Patch Changes

- Include source files (src/) in npm packages for documentation fetching

  This enables documentation sites to fetch component source code directly from npm via jsDelivr CDN, eliminating code duplication and ensuring docs always stay in sync with published packages.

## 2.0.0

### Major Changes

- ae2c962: Initial release: Button component
  - Add Button component with 6 variants (Primary, Secondary, Tertiary, Destructive variants)
  - Support for 5 sizes (xs, s, m, l, xl)
  - Loading state with spinner animation
  - Icon support (left, right, or both)
  - Disabled state handling
  - Polymorphic rendering (button vs link)
  - GSAP hover rotation animation support
  - Fully token-driven styling
  - Accessible with ARIA attributes

  This is the first public release of the ATOM Design System component libraries.
