/**
 * @module forms/validator
 * Live form validation for ATOM Design System components.
 *
 * Manages BEM modifier classes on component roots.
 * All visual feedback is provided by @atomchat.io/css — this module is
 * purely behavioral with zero style dependencies.
 *
 * ## Supported components and their modifiers
 * - TextField    → `text-field--error`, `text-field--filled`
 * - TextArea     → `textarea--error`, `textarea--filled`
 * - SearchField  → `search-field--filled`
 * - Checkbox     → `checkbox--error`
 * - Radio        → `radio-field--error`
 * - Toggle       → `toggle-field--error`
 *
 * ## Data attributes on component root
 * - `data-validate`          — Opt-in to validation (required)
 * - `data-required`          — Field must have a value
 * - `data-min-length="N"`    — Minimum character count (text inputs)
 * - `data-max-length="N"`    — Maximum character count (text inputs)
 *
 * Email validation is auto-detected from `<input type="email">`.
 *
 * ## Usage
 * ```html
 * <!-- TextField with email validation -->
 * <div class="text-field text-field--m" data-text-field data-validate data-required>
 *   <input type="email" class="text-field__input" />
 * </div>
 *
 * <!-- TextField with length constraints -->
 * <div class="text-field text-field--m" data-text-field data-validate data-required data-min-length="3" data-max-length="80">
 *   <input type="text" class="text-field__input" />
 * </div>
 *
 * <!-- Checkbox (data-validate goes on the label root) -->
 * <label class="checkbox checkbox--m" data-checkbox data-validate data-required>
 *   <input type="checkbox" class="checkbox__input" />
 * </label>
 *
 * <!-- Radio (data-validate goes on the radio-field wrapper) -->
 * <div class="radio-field radio-field--m" data-validate data-required>
 *   <label class="radio radio--m" for="opt1" data-radio>
 *     <input class="radio__input" type="radio" id="opt1" name="plan" />
 *   </label>
 * </div>
 * ```
 *
 * ```ts
 * import { initFormValidation, validateAll } from '@atomchat.io/animations/components/forms';
 *
 * // Initialize live validation
 * const cleanup = initFormValidation({ scope: document });
 *
 * // On form submit — validate all and block if invalid
 * form.addEventListener('submit', (e) => {
 *   e.preventDefault();
 *   if (validateAll(form)) form.submit();
 * });
 *
 * // Cleanup on page/component teardown
 * cleanup();
 * ```
 */

import type { AnimationConfig, CleanupFn } from '../../types';

// ── Internal types ─────────────────────────────────────────────────────────

type ValidatableInput = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface FieldState {
  /** True once the user has interacted with the field (blur or valid-on-input) */
  interacted: boolean;
  /** All attached listeners, kept for cleanup */
  listeners: Array<{ el: HTMLElement; event: string; fn: EventListener }>;
}

// ── State registry ─────────────────────────────────────────────────────────

/**
 * WeakMap avoids DOM pollution and is GC-friendly:
 * when the element is removed from the DOM, its entry is collected automatically.
 */
const registry = new WeakMap<HTMLElement, FieldState>();

// ── BEM modifier capabilities ──────────────────────────────────────────────

/** BEM blocks that expose a `--filled` modifier in @atomchat.io/css */
const SUPPORTS_FILLED = new Set([
  'text-field',
  'textarea',
  'search-field',
]);

/** BEM blocks that expose an `--error` modifier in @atomchat.io/css */
const SUPPORTS_ERROR = new Set([
  'text-field',
  'textarea',
  'checkbox',
  'radio-field',
  'toggle-field',
]);

// ── DOM helpers ────────────────────────────────────────────────────────────

/** First CSS class = BEM block name (e.g. "text-field", "checkbox") */
function getBlock(root: HTMLElement): string {
  return root.classList[0] ?? '';
}

/** Primary text/select input within a root (excludes radio/checkbox) */
function getTextInput(root: HTMLElement): ValidatableInput | null {
  return root.querySelector<ValidatableInput>(
    'input:not([type="radio"]):not([type="checkbox"]), textarea, select',
  );
}

/** All radio or checkbox inputs within a root */
function getGroupInputs(root: HTMLElement): HTMLInputElement[] {
  return Array.from(
    root.querySelectorAll<HTMLInputElement>('input[type="radio"], input[type="checkbox"]'),
  );
}

// ── Validation logic ───────────────────────────────────────────────────────

function isFieldValid(root: HTMLElement): boolean {
  const required = root.hasAttribute('data-required');
  const group = getGroupInputs(root);

  // ── Radio / checkbox group ─────────────────────────────────────
  if (group.length > 0) {
    // Not required → always valid. Required → at least one must be checked.
    return !required || group.some((i) => i.checked);
  }

  // ── Text / textarea / select ───────────────────────────────────
  const input = getTextInput(root);
  if (!input) return !required;

  const value = input.value.trim();

  if (required && !value) return false;
  if (!value) return true; // empty + not required → valid

  // Email
  const inputType = (input as HTMLInputElement).type;
  if (inputType === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Length constraints: data-* on root take precedence over HTML attributes
  const minLength = Number(
    root.getAttribute('data-min-length') ?? input.getAttribute('minlength') ?? 0,
  );
  const maxLength = Number(
    root.getAttribute('data-max-length') ?? input.getAttribute('maxlength') ?? Infinity,
  );

  if (minLength > 0 && value.length < minLength) return false;
  if (isFinite(maxLength) && value.length > maxLength) return false;

  return true;
}

// ── DOM state update ───────────────────────────────────────────────────────

function updateFieldDOM(root: HTMLElement): void {
  const block = getBlock(root);
  const state = registry.get(root);
  if (!state) return;

  // ── Filled state ───────────────────────────────────────────────
  if (SUPPORTS_FILLED.has(block)) {
    const group = getGroupInputs(root);
    const isFilled =
      group.length > 0
        ? group.some((i) => i.checked)
        : Boolean(getTextInput(root)?.value.trim());

    root.classList.toggle(`${block}--filled`, isFilled);
  }

  // ── Error state ────────────────────────────────────────────────
  if (SUPPORTS_ERROR.has(block)) {
    const valid = isFieldValid(root);
    if (valid) {
      root.classList.remove(`${block}--error`);
    } else if (state.interacted) {
      root.classList.add(`${block}--error`);
    }
  }
}

// ── Field binding / cleanup ────────────────────────────────────────────────

function bindField(root: HTMLElement): void {
  const state: FieldState = { interacted: false, listeners: [] };
  registry.set(root, state);

  function listen(el: HTMLElement, event: string, fn: EventListener): void {
    el.addEventListener(event, fn);
    state.listeners.push({ el, event, fn });
  }

  const group = getGroupInputs(root);
  const textInput = getTextInput(root);

  if (group.length > 0) {
    // ── Radio / checkbox ─────────────────────────────────────────
    group.forEach((input) => {
      listen(input, 'change', () => {
        // Start live validation as soon as any option is selected
        if (!state.interacted && group.some((i) => i.checked)) {
          state.interacted = true;
        }
        updateFieldDOM(root);
      });

      listen(input, 'blur', () => {
        state.interacted = true;
        updateFieldDOM(root);
      });
    });
  } else if (textInput) {
    const isSelect = textInput.tagName === 'SELECT';

    if (isSelect) {
      listen(textInput as HTMLElement, 'change', () => {
        state.interacted = true;
        updateFieldDOM(root);
      });
    } else {
      listen(textInput as HTMLElement, 'input', () => {
        // Always update filled state
        updateFieldDOM(root);
        // Auto-start live error feedback once the field first becomes valid
        if (!state.interacted && isFieldValid(root)) {
          state.interacted = true;
        }
      });

      listen(textInput as HTMLElement, 'change', () => {
        if (state.interacted) updateFieldDOM(root);
      });
    }

    // blur always triggers validation — this is the primary UX trigger
    listen(textInput as HTMLElement, 'blur', () => {
      state.interacted = true;
      updateFieldDOM(root);
    });
  }

  // Sync initial filled state (handles pre-filled values on page load)
  updateFieldDOM(root);
}

function unbindField(root: HTMLElement): void {
  const state = registry.get(root);
  if (!state) return;
  state.listeners.forEach(({ el, event, fn }) => el.removeEventListener(event, fn));
  registry.delete(root);
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Initialize live validation on all `[data-validate]` fields within scope.
 *
 * Follows the same `init*({ scope }): CleanupFn` pattern as all ATOM modules.
 * Call cleanup() on component/page teardown to remove all listeners.
 *
 * @param config.scope - Container to scope DOM queries (defaults to document)
 * @returns CleanupFn — removes all listeners and resets registry entries
 *
 * @example
 * const cleanup = initFormValidation({ scope: formElement });
 * // later:
 * cleanup();
 */
export function initFormValidation({ scope = document }: AnimationConfig = {}): CleanupFn {
  const roots = Array.from(scope.querySelectorAll<HTMLElement>('[data-validate]'));
  roots.forEach(bindField);
  return () => roots.forEach(unbindField);
}

/**
 * Validate all `[data-validate]` fields in scope at once.
 *
 * Forces `interacted = true` on every field, revealing all error states.
 * Focuses the first invalid field to assist keyboard/screen-reader users.
 *
 * Use this in your submit handler before allowing the form to proceed.
 *
 * @param scope - Container to scope queries (defaults to document)
 * @returns `true` if every field passes validation
 *
 * @example
 * form.addEventListener('submit', (e) => {
 *   e.preventDefault();
 *   if (validateAll(form)) form.submit();
 * });
 */
export function validateAll(scope: Element | Document = document): boolean {
  const roots = Array.from(scope.querySelectorAll<HTMLElement>('[data-validate]'));
  let firstInvalid: HTMLElement | null = null;

  const allValid = roots.reduce((acc, root) => {
    const state = registry.get(root);
    if (state) state.interacted = true;
    updateFieldDOM(root);

    if (!isFieldValid(root)) {
      if (!firstInvalid) {
        firstInvalid = root.querySelector<HTMLElement>('input, textarea, select');
      }
      return false;
    }
    return acc;
  }, true);

  (firstInvalid as HTMLElement | null)?.focus();
  return allValid;
}

/**
 * Programmatically validate a single field root and update its DOM state.
 *
 * Useful after setting a value in JavaScript (e.g., after an autocomplete
 * or after clearing a field programmatically).
 *
 * @param root - The `[data-validate]` element to validate
 * @returns `true` if the field is valid
 */
export function validateField(root: HTMLElement): boolean {
  const state = registry.get(root);
  if (state) state.interacted = true;
  updateFieldDOM(root);
  return isFieldValid(root);
}

/**
 * Reset a field to idle state.
 *
 * Removes `--error` and `--filled` modifiers and clears the interaction flag,
 * returning the field to its initial untouched appearance.
 *
 * @param root - The `[data-validate]` element to reset
 */
export function resetField(root: HTMLElement): void {
  const block = getBlock(root);
  const state = registry.get(root);
  if (state) state.interacted = false;
  root.classList.remove(`${block}--error`, `${block}--filled`);
}
