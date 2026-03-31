# @atomchat/animations

## 1.2.1

### Patch Changes

- fix(exports): improve package.json exports configuration
  - Reorder conditional exports following Node.js best practices (types → import → require → default)
  - Add wildcard exports for direct path access to build/dist directories
  - Fix missing exports that prevented importing with full paths
  - All packages now support both shorthand and full path imports

  Breaking: None. This is a backward-compatible enhancement.

## 1.1.0

### Minor Changes

- Add complete text component system with 4 atoms and 12 animations
  - Heading: semantic h1-h6 with size/level decoupling, 10 sizes, 3 weights, 6 tracking
  - Text: flexible p/span/div/li with truncation and multi-line clamp
  - LabelText: form labels with required indicator and disabled states
  - Caption: auxiliary text for metadata, captions, footnotes

  Includes 12 text animations: masked reveals, scramble effects, fade-up, scroll-driven, and loops.
  All components use only existing verified tokens from Figma with prefers-reduced-motion support.
