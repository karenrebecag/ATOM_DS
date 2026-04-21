/**
 * @module components/containers/accordion
 * CSS-driven accordion behavior for ATOM Design System.
 *
 * Manages data-accordion-status attribute transitions.
 * All visual states are handled via CSS — no inline styles applied.
 *
 * HTML contract:
 * - [data-accordion]                     Root element
 * - [data-accordion-close-siblings]      "true" | "false" — close siblings on open
 * - [data-accordion-status]              "active" | "not-active" on each item
 * - [data-accordion-toggle]              Clickable trigger inside each item
 *
 * @example
 * import { initAccordion } from '@atomchat.io/animations/components/containers';
 * const cleanup = initAccordion();
 * // Later: cleanup();
 */

import type { AnimationConfig, CleanupFn } from '../../types';
import { NOOP } from '../../types';

function syncAriaExpanded(item: HTMLElement, expanded: boolean) {
  const trigger = item.querySelector<HTMLElement>('[data-accordion-toggle]');
  if (trigger) trigger.setAttribute('aria-expanded', String(expanded));
}

/**
 * Initialize accordion behavior on all [data-accordion] elements in scope.
 * @param config - Optional scope (defaults to document)
 * @returns Cleanup function that removes all event listeners
 */
export function initAccordion(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;

  const accordions = (scope as Element | Document).querySelectorAll<HTMLElement>(
    '[data-accordion]',
  );

  if (!accordions.length) return NOOP;

  const cleanups: (() => void)[] = [];

  accordions.forEach((accordion) => {
    const closeSiblings =
      accordion.getAttribute('data-accordion-close-siblings') === 'true';

    const toggle = (event: Event) => {
      const trigger = (event.target as Element).closest<HTMLElement>(
        '[data-accordion-toggle]',
      );
      if (!trigger) return;

      const item = trigger.closest<HTMLElement>('[data-accordion-status]');
      if (!item) return;

      const isActive = item.getAttribute('data-accordion-status') === 'active';
      const newStatus = isActive ? 'not-active' : 'active';

      item.setAttribute('data-accordion-status', newStatus);
      syncAriaExpanded(item, !isActive);

      if (closeSiblings && !isActive) {
        accordion
          .querySelectorAll<HTMLElement>('[data-accordion-status="active"]')
          .forEach((sibling) => {
            if (sibling !== item) {
              sibling.setAttribute('data-accordion-status', 'not-active');
              syncAriaExpanded(sibling, false);
            }
          });
      }
    };

    const onKeydown = (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        toggle(event);
      }
    };

    accordion.addEventListener('click', toggle);
    accordion.addEventListener('keydown', onKeydown);

    cleanups.push(() => {
      accordion.removeEventListener('click', toggle);
      accordion.removeEventListener('keydown', onKeydown);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
