/**
 * @module components/feedback/modal
 * Modal open/close behavior for ATOM Design System.
 *
 * Manages data-modal-* attribute transitions.
 * All visual states handled by CSS — no inline styles.
 *
 * HTML contract:
 *   [data-modal-group-status]  Root overlay ("active"|"not-active")
 *   [data-modal-name]          Named modal card
 *   [data-modal-status]        Per-card visibility ("active"|"not-active")
 *   [data-modal-target]        Trigger (value = modal name)
 *   [data-modal-close]         Close trigger (backdrop, X button)
 *
 * @example
 * import { initModal } from '@atomchat.io/animations/components/feedback';
 * const cleanup = initModal();
 */

import type { AnimationConfig, CleanupFn } from '../../types';
import { NOOP } from '../../types';

export function initModal(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const root = scope as Element | Document;

  const modalGroup = root.querySelector<HTMLElement>('[data-modal-group-status]');
  if (!modalGroup) return NOOP;

  const cleanups: (() => void)[] = [];

  function closeAll() {
    root.querySelectorAll<HTMLElement>('[data-modal-target]').forEach((t) =>
      t.setAttribute('data-modal-status', 'not-active'),
    );
    root.querySelectorAll<HTMLElement>('[data-modal-name]').forEach((m) =>
      m.setAttribute('data-modal-status', 'not-active'),
    );
    modalGroup!.setAttribute('data-modal-group-status', 'not-active');
  }

  // Open triggers
  const targets = root.querySelectorAll<HTMLElement>('[data-modal-target]');
  targets.forEach((target) => {
    const handler = () => {
      const name = target.getAttribute('data-modal-target');
      if (!name) return;

      // Close all first
      targets.forEach((t) => t.setAttribute('data-modal-status', 'not-active'));
      root.querySelectorAll<HTMLElement>('[data-modal-name]').forEach((m) =>
        m.setAttribute('data-modal-status', 'not-active'),
      );

      // Activate target + modal
      target.setAttribute('data-modal-status', 'active');
      const modal = root.querySelector<HTMLElement>(`[data-modal-name="${name}"]`);
      if (modal) modal.setAttribute('data-modal-status', 'active');

      modalGroup!.setAttribute('data-modal-group-status', 'active');
    };

    target.addEventListener('click', handler);
    cleanups.push(() => target.removeEventListener('click', handler));
  });

  // Close triggers (backdrop + close buttons)
  const closeBtns = modalGroup.querySelectorAll<HTMLElement>('[data-modal-close]');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', closeAll);
    cleanups.push(() => btn.removeEventListener('click', closeAll));
  });

  // Escape key
  const onEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeAll();
  };
  document.addEventListener('keydown', onEscape);
  cleanups.push(() => document.removeEventListener('keydown', onEscape));

  return () => cleanups.forEach((fn) => fn());
}
