/**
 * Button-specific type definitions
 */

export type ButtonVariant =
  | 'Primary'
  | 'Secondary'
  | 'Tertiary'
  | 'Destructive Primary'
  | 'Destructive Secondary'
  | 'Destructive Tertiary'

export type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl'

export type ButtonType = 'button' | 'submit' | 'reset'

/**
 * Token variant names (internal mapping)
 */
export type ButtonTokenVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger-primary'
  | 'danger-secondary'
  | 'danger-tertiary'

/**
 * Variant mapping from user-facing names to CSS token names
 */
export const BUTTON_VARIANT_MAP: Record<ButtonVariant, ButtonTokenVariant> = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  'Destructive Primary': 'danger-primary',
  'Destructive Secondary': 'danger-secondary',
  'Destructive Tertiary': 'danger-tertiary'
}
