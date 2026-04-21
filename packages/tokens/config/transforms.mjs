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

function isFigmaTypography(token) {
  const type = token.$type ?? token.type
  return (
    type === 'number' &&
    typeof token.filePath === 'string' &&
    token.filePath.includes('figma/') &&
    Array.isArray(token.path) &&
    (token.path.includes('font-sizes') || token.path.includes('line-height'))
  )
}

const FONT_WEIGHT_MAP = {
  thin: '100',
  extralight: '200',
  'extra light': '200',
  ultralight: '200',
  light: '300',
  regular: '400',
  normal: '400',
  medium: '500',
  semibold: '600',
  'semi bold': '600',
  demibold: '600',
  bold: '700',
  extrabold: '800',
  'extra bold': '800',
  black: '900',
  heavy: '900',
}

function isFigmaFontWeight(token) {
  const type = token.$type ?? token.type
  return (
    type === 'string' &&
    typeof token.filePath === 'string' &&
    token.filePath.includes('figma/') &&
    Array.isArray(token.path) &&
    token.path.includes('font-weight')
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

StyleDictionary.registerTransform({
  name: 'atom/typography/px',
  type: 'value',
  filter: isFigmaTypography,
  transform: (token) => {
    return `${token.$value ?? token.value}px`
  },
})

StyleDictionary.registerTransform({
  name: 'atom/typography/font-weight',
  type: 'value',
  filter: isFigmaFontWeight,
  transform: (token) => {
    const raw = String(token.$value ?? token.value)
    const numeric = FONT_WEIGHT_MAP[raw.toLowerCase()]
    return numeric ?? raw
  },
})
