# ATOM Design System — Token Studio Branch

This branch contains **ONLY** the raw design token JSON files for Figma Token Studio synchronization.

## Structure

```
packages/tokens/src/
├── foundation/     # Primitive tokens (9 files)
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   ├── borders.json
│   ├── motion.json
│   ├── opacity.json
│   ├── elevations.json
│   ├── z-index.json
│   └── breakpoints.json
│
├── semantic/       # Semantic aliases (3 files)
│   ├── colors.json
│   ├── typography.json
│   └── spacing.json
│
└── components/     # Component tokens (14 files)
    ├── button.json
    ├── avatar.json
    ├── badge.json
    ├── checkbox.json
    ├── chip.json
    ├── toggle.json
    ├── radio.json
    ├── skeleton.json
    ├── tag.json
    ├── status-icon.json
    ├── link-button.json
    ├── spinner.json
    ├── divider.json
    └── layout.json
```

## Total: 26 JSON files

## Usage

**This branch is exclusively for Token Studio:**
- ✅ Sync tokens from Figma to this branch
- ✅ Pull request changes to `next` branch
- ❌ DO NOT add build configs here
- ❌ DO NOT add package.json here
- ❌ DO NOT add style-dictionary.config.js here

**Build configuration lives in:**
- `main` branch (production)
- `next` branch (development)

## Workflow

1. **Figma → Token Studio → tokens/studio**
   - Designers update tokens in Figma
   - Token Studio syncs to this branch

2. **tokens/studio → next**
   - Create PR from `tokens/studio` to `next`
   - Review token changes
   - Merge to trigger build pipeline

3. **next → main**
   - Tested tokens merge to production
   - Style Dictionary builds CSS/SCSS/JS outputs

## Format

All tokens follow the **W3C DTCG specification**:

```json
{
  "token-name": {
    "$value": "...",
    "$type": "color|dimension|fontFamily|..."
  }
}
```

## Links

- Main repo: `main` branch
- Development: `next` branch
- Token Studio: `tokens/studio` branch (this one)
- Documentation: https://atom-ds-documentation-brown.vercel.app/
