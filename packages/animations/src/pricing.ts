/**
 * @module pricing
 * Pricing section solo/team card toggle animation.
 *
 * Animates pricing cards between solo and team views with rotation,
 * translation, and fade effects.
 *
 * ## Supported `data-*` attributes
 * - `data-pricing-section-status` — Section root (value: `"solo"` | `"team"`)
 * - `data-pricing-button`         — Toggle button (value: `"solo"` | `"team"`)
 * - `data-pricing-card`           — Card element (value: `"solo"` | `"team"`)
 * - `data-pricing-state`          — Per-card billing toggle state (`"quarterly"` | `"annually"`)
 * - `data-pricing-card-toggle`    — Billing period toggle button
 * - `data-motion-exempt`          — Skips animation (instant toggle)
 *
 * ## Usage
 * ```ts
 * import { initPricingSection } from '@atomchat/animations';
 *
 * const cleanup = initPricingSection();
 * cleanup();
 * ```
 */

import { gsap, ScrollTrigger } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

/**
 * Initialize pricing section toggle animation.
 *
 * Checks `prefersReducedMotion()` inside click handlers and
 * `isMotionExempt()` at setup.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills timeline and removes all listeners
 */
export function initPricingSection(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;

  const section = scope.querySelector<HTMLElement>(
    "[data-pricing-section-status]",
  );
  if (!section) return NOOP;
  if (isMotionExempt(section)) return NOOP;

  const buttons =
    section.querySelectorAll<HTMLElement>("[data-pricing-button]");
  if (!buttons.length) return NOOP;

  const soloCards = section.querySelectorAll<HTMLElement>(
    '[data-pricing-card="solo"]',
  );
  const teamCards = section.querySelectorAll<HTMLElement>(
    '[data-pricing-card="team"]',
  );

  const tl = gsap.timeline();

  function onComplete() {
    ScrollTrigger.refresh();
  }

  function toTeam() {
    section!.setAttribute("data-pricing-section-status", "team");

    if (prefersReducedMotion()) {
      gsap.set(soloCards, { autoAlpha: 0 });
      gsap.set(teamCards, { autoAlpha: 1, rotate: 0, xPercent: 0 });
      onComplete();
      return;
    }

    tl.clear()
      .to(soloCards, {
        xPercent: -15,
        rotate: (i: number) => -12 + i * 4,
        yPercent: (i: number) => 10 + i * -10,
        autoAlpha: 0,
        stagger: 0.05,
      })
      .fromTo(
        teamCards,
        { rotate: 8, xPercent: 0, yPercent: 0, autoAlpha: 0 },
        { xPercent: 0, rotate: 0, autoAlpha: 1, stagger: 0.05 },
      )
      .call(onComplete, undefined, ">");
  }

  function toSolo() {
    section!.setAttribute("data-pricing-section-status", "solo");

    if (prefersReducedMotion()) {
      gsap.set(teamCards, { autoAlpha: 0 });
      gsap.set(soloCards, {
        autoAlpha: 1,
        rotate: 0,
        xPercent: 0,
        yPercent: 0,
      });
      onComplete();
      return;
    }

    tl.clear()
      .to(teamCards, {
        rotate: 8,
        xPercent: 5,
        yPercent: 3,
        autoAlpha: 0,
        stagger: { each: 0.05, from: "end" },
      })
      .to(soloCards, {
        rotate: 0,
        xPercent: 0,
        yPercent: 0,
        autoAlpha: 1,
        stagger: { each: 0.05, from: "end" },
      })
      .call(onComplete, undefined, ">");
  }

  // Solo/Team button handlers
  const buttonHandlers: Array<{ el: HTMLElement; handler: () => void }> =
    [];

  buttons.forEach((button) => {
    const handler = () => {
      const current = section!.getAttribute(
        "data-pricing-section-status",
      );
      const target = button.getAttribute("data-pricing-button");
      if (current === target) return;
      target === "team" ? toTeam() : toSolo();
    };
    button.addEventListener("click", handler);
    buttonHandlers.push({ el: button, handler });
  });

  // Quarterly/Annual toggle handlers
  const toggleHandlers: Array<{ el: HTMLElement; handler: () => void }> =
    [];
  const toggleCards = section.querySelectorAll<HTMLElement>(
    "[data-pricing-state]",
  );

  toggleCards.forEach((card) => {
    const toggles = card.querySelectorAll<HTMLElement>(
      "[data-pricing-card-toggle]",
    );
    toggles.forEach((toggle) => {
      const handler = () => {
        const current = card.getAttribute("data-pricing-state");
        const next =
          current === "quarterly" ? "annually" : "quarterly";
        card.setAttribute("data-pricing-state", next);
      };
      toggle.addEventListener("click", handler);
      toggleHandlers.push({ el: toggle, handler });
    });
  });

  return () => {
    tl.kill();
    buttonHandlers.forEach(({ el, handler }) =>
      el.removeEventListener("click", handler),
    );
    toggleHandlers.forEach(({ el, handler }) =>
      el.removeEventListener("click", handler),
    );
  };
}
