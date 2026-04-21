/**
 * @module components/forms
 * Form behavior modules for ATOM Design System components.
 *
 * These modules provide the interactive behavior layer for form components.
 * All visual states are managed exclusively via BEM modifier classes from
 * @atomchat.io/css — no inline styles are ever applied.
 *
 * @example
 * import { initFormValidation, validateAll } from '@atomchat.io/animations/components/forms';
 */

export {
  initFormValidation,
  validateAll,
  validateField,
  resetField,
} from './validator';

export { initCounterOdometer } from './counter';
