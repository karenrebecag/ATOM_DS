/**
 * ATOM Design System — Custom Style Dictionary Transforms
 *
 * Registers transforms that clean Figma's spacing token names
 * using value-based lookup against the canonical scale.
 *
 * Import this file as a side-effect before SD config export:
 *   import './transforms.mjs'
 *
 * Two transforms:
 *   atom/spacing/canonical-name — maps value → canonical scale name
 *   atom/spacing/px             — appends px unit to raw numbers
 */

import StyleDictionary from 'style-dictionary'
import { spacingScale } from './scales.mjs'

function isFigmaSpacing(token) {
  const type = token.$type ?? token.type
  return (
    type === 'number' &&
    typeof token.filePath === 'string' &&
    token.filePath.includes('figma/') &&
    Array.isArray(token.path) &&
    token.path.includes('spacing')
  )
}

StyleDictionary.registerTransform({
  name: 'atom/spacing/canonical-name',
  type: 'name',
  filter: isFigmaSpacing,
  transform: (token) => {
    const numValue = Number(token.$value ?? token.value)
    const canonical = spacingScale.get(numValue)
    const basePath = token.path.slice(0, -1)

    return canonical
      ? [...basePath, canonical].join('-')
      : [...basePath, `raw-${numValue}`].join('-')
  },
})

StyleDictionary.registerTransform({
  name: 'atom/spacing/px',
  type: 'value',
  filter: isFigmaSpacing,
  transform: (token) => {
    return `${token.$value ?? token.value}px`
  },
})
