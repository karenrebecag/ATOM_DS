/**
 * @module sidebar-wipe
 * Sidebar collapse/expand animation.
 *
 * Animates sidebar width between expanded and collapsed states
 * and syncs `data-sidebar-collapsed` attribute on both the sidebar
 * and document body.
 *
 * ## Supported `data-*` attributes
 * - `data-sidebar-wrap`      — Sidebar wrapper element
 * - `data-sidebar-collapse`  — Collapse toggle button
 * - `data-sidebar-collapsed` — State attribute (`"true"` | `"false"`)
 * - `data-motion-exempt`     — Skips animation (instant toggle)
 *
 * ## CSS classes
 * - `.sidebar__container` — Inner container that receives width animation
 *
 * ## Usage
 * ```ts
 * import { initSidebarCollapse } from '@anthropic-atom/animations';
 *
 * const cleanup = initSidebarCollapse();
 * cleanup();
 * ```
 */

import { gsap } from "./config";
import { prefersReducedMotion } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

const EXPANDED_WIDTH = "16em";
const COLLAPSED_WIDTH = "4.5em";

/**
 * Initialize sidebar collapse/expand animation.
 *
 * Checks `prefersReducedMotion()` inside the click handler —
 * if reduced, sets width instantly instead of animating.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that removes the click listener
 */
export function initSidebarCollapse(
  config: AnimationConfig = {},
): CleanupFn {
  const { scope = document } = config;

  const sidebar = scope.querySelector<HTMLElement>("[data-sidebar-wrap]");
  if (!sidebar) return NOOP;

  const collapseBtn = scope.querySelector<HTMLElement>(
    "[data-sidebar-collapse]",
  );
  if (!collapseBtn) return NOOP;

  const container = sidebar.querySelector<HTMLElement>(
    ".sidebar__container",
  );
  if (!container) return NOOP;

  const toggle = (): void => {
    const isCollapsed =
      sidebar.getAttribute("data-sidebar-collapsed") === "true";
    const next = isCollapsed ? "false" : "true";

    // Flip state
    sidebar.setAttribute("data-sidebar-collapsed", next);
    document.body.setAttribute("data-sidebar-collapsed", next);

    // Animate width (or set instantly if reduced motion)
    const targetWidth = isCollapsed ? EXPANDED_WIDTH : COLLAPSED_WIDTH;

    if (prefersReducedMotion()) {
      gsap.set(container, { width: targetWidth });
    } else {
      gsap.to(container, {
        width: targetWidth,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  };

  collapseBtn.addEventListener("click", toggle);

  return () => {
    collapseBtn.removeEventListener("click", toggle);
  };
}
