/**
 * ATOM Design System — Spacing Scale Contract
 *
 * Single source of truth for canonical spacing names.
 * Maps numeric pixel values → canonical scale names.
 *
 * The SD transform reads this to convert Figma's messy
 * naming (2xxl, 8-xxl, 8 xxl) into clean, stable names.
 *
 * To extend the scale, add a new entry here.
 * The transform and CSS output update automatically.
 */

export const spacingScale = new Map([
  [0,   'none'],
  [2,   'xxs'],
  [4,   'xs'],
  [8,   's'],
  [12,  'sm'],
  [16,  'm'],
  [20,  'md'],
  [24,  'l'],
  [28,  'lg'],
  [32,  'xl'],
  [36,  'xxl'],
  [40,  '2xl'],
  [44,  '3xl'],
  [48,  '4xl'],
  [52,  '5xl'],
  [56,  '6xl'],
  [60,  '7xl'],
  [64,  '8xl'],
  [68,  '9xl'],
  [72,  '10xl'],
  [76,  '11xl'],
  [80,  '12xl'],
  [84,  '13xl'],
  [88,  '14xl'],
  [92,  '15xl'],
  [96,  '16xl'],
  [100, '17xl'],
])
