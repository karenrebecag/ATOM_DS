/**
 * @module progress-nav
 * Scroll-linked progress navbar with animated indicator,
 * theme switching over dark sections, and mobile hide/show.
 *
 * ## Supported `data-*` attributes
 * - `data-progress-nav-list`           — Nav list container
 * - `data-progress-nav-target`         — Nav link (value: `"#section-id"`)
 * - `data-progress-nav-anchor`         — Section anchor element (needs `id`)
 * - `data-pnav-dark-sections`          — JSON array of dark section IDs on `.pnav`
 * - `data-nav-scrolled`                — Set to `"true"` | `"false"` on scroll
 * - `data-nav-theme`                   — Set to `"inverted"` | `"default"` based on overlap
 * - `data-nav-hidden`                  — Set on mobile scroll direction
 * - `data-motion-exempt`               — Skips animation
 *
 * ## CSS classes
 * - `.pnav` — Main nav element
 * - `.pnav__indicator` — Position indicator element
 * - `.is--active` — Active nav link
 *
 * ## Usage
 * ```ts
 * import { initProgressNav } from '@anthropic-atom/animations';
 *
 * const cleanup = initProgressNav();
 * cleanup();
 * ```
 */

import { gsap, ScrollTrigger } from "./config";
import { prefersReducedMotion } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

/**
 * Initialize scroll-linked progress navigation.
 *
 * Checks `prefersReducedMotion()` at the top — if reduced, skips
 * all scroll-linked indicator animations.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills ScrollTriggers and removes scroll listeners
 */
export function initProgressNav(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  if (prefersReducedMotion()) return NOOP;

  const cleanups: CleanupFn[] = [];

  // ── Progress indicator ──
  const navProgress = scope.querySelector<HTMLElement>(
    "[data-progress-nav-list]",
  );

  if (navProgress) {
    const indicator = navProgress.querySelector<HTMLElement>(
      ".pnav__indicator",
    );

    if (indicator) {
      function updateIndicator(activeLink: HTMLElement) {
        const parentWidth = navProgress!.offsetWidth;
        const parentHeight = navProgress!.offsetHeight;
        const parentRect = navProgress!.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        const leftPercent =
          ((linkRect.left - parentRect.left) / parentWidth) * 100;
        const topPercent =
          ((linkRect.top - parentRect.top) / parentHeight) * 100;
        const widthPercent =
          (activeLink.offsetWidth / parentWidth) * 100;
        const heightPercent =
          (activeLink.offsetHeight / parentHeight) * 100;

        indicator!.style.left = leftPercent + "%";
        indicator!.style.top = topPercent + "%";
        indicator!.style.width = widthPercent + "%";
        indicator!.style.height = heightPercent + "%";
      }

      function activate(anchorID: string | null) {
        if (!anchorID) return;
        const activeLink = navProgress!.querySelector<HTMLElement>(
          `[data-progress-nav-target="#${anchorID}"]`,
        );
        if (!activeLink) return;

        activeLink.classList.add("is--active");
        navProgress!
          .querySelectorAll("[data-progress-nav-target]")
          .forEach((sib) => {
            if (sib !== activeLink) sib.classList.remove("is--active");
          });

        updateIndicator(activeLink);
      }

      const progressAnchors = gsap.utils.toArray<HTMLElement>(
        "[data-progress-nav-anchor]",
      );

      const triggers: ScrollTrigger[] = [];

      progressAnchors.forEach((anchor) => {
        const anchorID = anchor.getAttribute("id");

        const st = ScrollTrigger.create({
          trigger: anchor,
          start: "0% 50%",
          end: "100% 50%",
          onEnter: () => activate(anchorID),
          onEnterBack: () => activate(anchorID),
        });

        triggers.push(st);
      });

      cleanups.push(() => {
        triggers.forEach((st) => st.kill());
      });
    }
  }

  // ── Theme detection + scrolled state ──
  const nav = scope.querySelector<HTMLElement>(".pnav");

  if (nav) {
    const darkAttr = nav.getAttribute("data-pnav-dark-sections");
    const darkSectionIds: string[] = darkAttr ? JSON.parse(darkAttr) : [];
    const SCROLL_THRESHOLD = 50;

    function checkTheme() {
      const navRect = nav!.getBoundingClientRect();
      const navMidY = navRect.top + navRect.height / 2;

      // Scrolled state
      const isScrolled = window.scrollY > SCROLL_THRESHOLD;
      const currentScrolled = nav!.getAttribute("data-nav-scrolled");
      const nextScrolled = isScrolled ? "true" : "false";
      if (currentScrolled !== nextScrolled)
        nav!.setAttribute("data-nav-scrolled", nextScrolled);

      // Theme detection
      let isOverDark = false;

      for (const id of darkSectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= navMidY && rect.bottom >= navMidY) {
          isOverDark = true;
          break;
        }
      }

      const current = nav!.getAttribute("data-nav-theme");
      const next = isOverDark ? "inverted" : "default";
      if (current !== next) nav!.setAttribute("data-nav-theme", next);
    }

    checkTheme();
    document.addEventListener("scroll", checkTheme, { passive: true });

    cleanups.push(() => {
      document.removeEventListener("scroll", checkTheme);
    });

    // ── Mobile: hide on scroll down, show on scroll up ──
    const MOBILE_BP = 769;
    let lastScrollY = window.scrollY;
    let ticking = false;

    function onMobileScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (window.innerWidth < MOBILE_BP) {
          const currentY = window.scrollY;
          const scrollingDown = currentY > lastScrollY && currentY > 60;

          nav!.setAttribute(
            "data-nav-hidden",
            scrollingDown ? "true" : "false",
          );
          lastScrollY = currentY;
        } else {
          nav!.removeAttribute("data-nav-hidden");
        }
        ticking = false;
      });
    }

    document.addEventListener("scroll", onMobileScroll, {
      passive: true,
    });

    cleanups.push(() => {
      document.removeEventListener("scroll", onMobileScroll);
    });
  }

  return () => {
    cleanups.forEach((fn) => fn());
  };
}
