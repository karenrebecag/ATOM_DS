/**
 * @module forms/counter
 * Odometer animation for character counters on TextField and TextArea.
 *
 * Watches `data-char-count` attribute on `[data-counter]` elements.
 * When the count changes (on each keypress), the `[data-current]` span
 * rolls through the odometer effect.
 *
 * ## Data attributes (set by component)
 * - `[data-counter]`              — Counter wrapper (TextField / TextArea)
 * - `[data-counter].data-char-count` — Current character count (watched)
 * - `[data-current]`             — Span that displays the current count
 *
 * ## Usage
 * ```ts
 * import { initCounterOdometer } from '@atomchat.io/animations/components/forms';
 * const cleanup = initCounterOdometer();
 * ```
 */

import { initNumberOdometer } from '../../effects/text/odometer';
import { prefersReducedMotion } from '../../core/motion';
import type { AnimationConfig, CleanupFn } from '../../core/types';
import { NOOP } from '../../core/types';

/**
 * Initialize odometer animations for all character counters in scope.
 *
 * @param config - Optional scope config
 * @returns Cleanup function that disconnects all observers
 */
export function initCounterOdometer(config: AnimationConfig = {}): CleanupFn {
  if (prefersReducedMotion()) return NOOP;

  const scope = (config.scope ?? document) as Document | Element;
  const counters = Array.from(
    scope.querySelectorAll<HTMLElement>('[data-counter]'),
  );

  if (!counters.length) return NOOP;

  const updateOdometer = initNumberOdometer();
  const observers: MutationObserver[] = [];

  counters.forEach((counter) => {
    const currentEl = counter.querySelector<HTMLElement>('[data-current]');
    if (!currentEl) return;

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== 'attributes' || m.attributeName !== 'data-char-count') continue;

        const oldText = m.oldValue ?? currentEl.textContent?.trim() ?? '0';
        const newCount = counter.dataset.charCount ?? '0';
        if (oldText === newCount) continue;

        // Restore old text so the odometer can roll from it
        currentEl.textContent = oldText;
        updateOdometer(currentEl, newCount, { duration: 0.2 });
      }
    });

    observer.observe(counter, {
      attributes: true,
      attributeFilter: ['data-char-count'],
      attributeOldValue: true,
    });

    observers.push(observer);
  });

  return () => observers.forEach((o) => o.disconnect());
}
