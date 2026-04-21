/**
 * @module components/containers/segment-indicator
 * Sliding indicator animation for segment controls.
 *
 * Positions an absolute `.segment-control__indicator` element
 * over the currently selected item using CSS transitions.
 * No GSAP — pure DOM measurement + inline positioning.
 *
 * HTML contract:
 *   [data-segment-control]                  Root container
 *   .segment-control__indicator             Sliding background element
 *   .segment-control__item--selected        Currently active item
 *   [data-segment-index]                    Clickable items
 *
 * @example
 * import { initSegmentIndicator } from '@atomchat.io/animations/components/containers';
 * const cleanup = initSegmentIndicator();
 */

import type { AnimationConfig, CleanupFn } from '../../types';
import { NOOP } from '../../types';

function positionIndicator(control: HTMLElement) {
  const indicator = control.querySelector<HTMLElement>('.segment-control__indicator');
  const active = control.querySelector<HTMLElement>('.segment-control__item--selected');
  if (!indicator || !active) return;

  const parentRect = control.getBoundingClientRect();
  const btnRect = active.getBoundingClientRect();

  indicator.style.left = (btnRect.left - parentRect.left) + 'px';
  indicator.style.top = (btnRect.top - parentRect.top) + 'px';
  indicator.style.width = btnRect.width + 'px';
  indicator.style.height = btnRect.height + 'px';
}

export function initSegmentIndicator(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const controls = (scope as Element | Document).querySelectorAll<HTMLElement>(
    '[data-segment-control]',
  );

  if (!controls.length) return NOOP;

  const cleanups: (() => void)[] = [];

  controls.forEach((control) => {
    // Ensure indicator element exists
    let indicator = control.querySelector<HTMLElement>('.segment-control__indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'segment-control__indicator';
      control.prepend(indicator);
    }

    // Initial position (no transition on first paint)
    indicator.style.transition = 'none';
    requestAnimationFrame(() => {
      positionIndicator(control);
      // Re-enable transition after first position is set
      requestAnimationFrame(() => {
        indicator!.style.transition = '';
      });
    });

    // Click handler — update selected class + slide indicator
    const onClick = (e: Event) => {
      const btn = (e.target as Element).closest<HTMLElement>('[data-segment-index]');
      if (!btn || btn.classList.contains('segment-control__item--disabled')) return;

      control.querySelectorAll('.segment-control__item--selected').forEach((el) => {
        el.classList.remove('segment-control__item--selected');
        el.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('segment-control__item--selected');
      btn.setAttribute('aria-selected', 'true');
      positionIndicator(control);
    };

    control.addEventListener('click', onClick);
    cleanups.push(() => control.removeEventListener('click', onClick));
  });

  // Reposition on resize
  const onResize = () => controls.forEach(positionIndicator);
  window.addEventListener('resize', onResize);
  cleanups.push(() => window.removeEventListener('resize', onResize));

  return () => cleanups.forEach((fn) => fn());
}
