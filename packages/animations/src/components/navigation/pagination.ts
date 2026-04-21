/**
 * @module navigation/pagination
 * Odometer animation for Pagination page numbers.
 *
 * Watches `data-current-page` and `data-total-pages` attributes on
 * `[data-pagination]` elements. When either value changes (on nav button
 * click), the corresponding number span rolls through the odometer effect.
 *
 * ## Data attributes (set by component)
 * - `[data-pagination]`                      — Root pagination element
 * - `[data-pagination].data-current-page`    — Current page number (watched)
 * - `[data-pagination].data-total-pages`     — Total pages (watched)
 * - `[data-page-current]`                    — Span displaying current page
 * - `[data-page-total]`                      — Span displaying total pages
 *
 * ## Usage
 * ```ts
 * import { initPaginationOdometer } from '@atomchat.io/animations/components/navigation';
 * const cleanup = initPaginationOdometer();
 * ```
 */

import { initNumberOdometer } from '../../effects/text/odometer';
import { prefersReducedMotion } from '../../core/motion';
import type { AnimationConfig, CleanupFn } from '../../core/types';
import { NOOP } from '../../core/types';

/**
 * Initialize odometer animations for all pagination components in scope.
 *
 * @param config - Optional scope config
 * @returns Cleanup function that disconnects all observers
 */
export function initPaginationOdometer(config: AnimationConfig = {}): CleanupFn {
  if (prefersReducedMotion()) return NOOP;

  const scope = (config.scope ?? document) as Document | Element;
  const paginations = Array.from(
    scope.querySelectorAll<HTMLElement>('[data-pagination]'),
  );

  if (!paginations.length) return NOOP;

  const updateOdometer = initNumberOdometer();
  const observers: MutationObserver[] = [];

  paginations.forEach((pagination) => {
    const currentEl = pagination.querySelector<HTMLElement>('[data-page-current]');
    const totalEl   = pagination.querySelector<HTMLElement>('[data-page-total]');

    if (!currentEl && !totalEl) return;

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== 'attributes') continue;

        if (m.attributeName === 'data-current-page' && currentEl) {
          const oldText = m.oldValue ?? currentEl.textContent?.trim() ?? '1';
          const newPage = pagination.dataset.currentPage ?? '1';
          if (oldText === newPage) continue;

          // Restore old text so the odometer can roll from it
          currentEl.textContent = oldText;
          updateOdometer(currentEl, newPage, { duration: 0.4 });
        }

        if (m.attributeName === 'data-total-pages' && totalEl) {
          const oldText = m.oldValue ?? totalEl.textContent?.trim() ?? '0';
          const newTotal = pagination.dataset.totalPages ?? '0';
          if (oldText === newTotal) continue;

          totalEl.textContent = oldText;
          updateOdometer(totalEl, newTotal, { duration: 0.4 });
        }
      }
    });

    observer.observe(pagination, {
      attributes: true,
      attributeFilter: ['data-current-page', 'data-total-pages'],
      attributeOldValue: true,
    });

    observers.push(observer);
  });

  return () => observers.forEach((o) => o.disconnect());
}
