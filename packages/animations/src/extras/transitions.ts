/**
 * @module transitions
 * Barba.js page transition integration.
 *
 * Production-quality page transitions with:
 * - Overlay-based visual cover (prevents FOUC during DOM swap)
 * - Lenis destroy/recreate cycle (no stale scroll state)
 * - Disposables pattern (master cleanup between pages)
 * - CSS sync for Astro scoped styles
 * - @barba/prefetch for instant transitions
 * - Coordinated enter timeline (overlay fade + content reveal)
 *
 * ## Required DOM structure
 * ```html
 * <div class="page-transition" style="visibility:hidden;opacity:0">
 *   <!-- Full-screen overlay -->
 * </div>
 * ```
 *
 * ## Usage
 * ```ts
 * import { initBarba } from '@atomchat/animations';
 *
 * initBarba();
 * ```
 */

// @ts-expect-error - Barba is an optional peer dependency
import barba from "@barba/core";
// @ts-expect-error - Barba prefetch is an optional peer dependency
import barbaPrefetch from "@barba/prefetch";
import { gsap, ScrollTrigger, DURATION } from "../config";
import { initAllAnimations } from "../index";
import { runPageEnterAnimation } from "../page-transition";
import {
  initSmoothScroll,
  getLenis,
  destroySmoothScroll,
} from "./smooth-scroll";

// ── State ────────────────────────────────────────────────────

let masterCleanup: (() => void) | null = null;

// ── Overlay Helpers ──────────────────────────────────────────

function fadeOverlayIn(): Promise<void> {
  const overlay =
    document.querySelector<HTMLElement>(".page-transition");
  if (!overlay) return Promise.resolve();

  return new Promise((resolve) => {
    gsap.to(overlay, {
      autoAlpha: 1,
      duration: 0.5,
      ease: "power1.inOut",
      overwrite: true,
      onComplete: resolve,
    });
  });
}

// ── Head Sync (full replacement) ─────────────────────────────

/** Track which script modules have already been loaded */
const loadedScripts = new Set<string>();

/** On first load, register every existing script so we don't double-load */
function snapshotCurrentScripts(): void {
  document
    .querySelectorAll<HTMLScriptElement>("script[type='module']")
    .forEach((s) => {
      const key = s.src || s.textContent?.slice(0, 200) || "";
      if (key) loadedScripts.add(key);
    });
}

/**
 * Sync `<head>` styles AND scripts from the next page into the current document.
 *
 * Strategy:
 * - REPLACE styles — remove old, add new
 * - APPEND scripts — only inject modules not yet loaded
 *
 * The transition overlay is visible during this swap, preventing any FOUC.
 * Vite dev styles (`data-vite-dev-id`) are preserved so HMR keeps working.
 */
function syncHead(nextHtml: string): void {
  const parser = new DOMParser();
  const nextDoc = parser.parseFromString(nextHtml, "text/html");

  // ── Styles ──

  const currentViteMap = new Map<string, HTMLStyleElement>();
  document.head
    .querySelectorAll<HTMLStyleElement>("style[data-vite-dev-id]")
    .forEach((s) => {
      currentViteMap.set(s.getAttribute("data-vite-dev-id")!, s);
    });

  // Remove non-Vite styles and stylesheet links
  document.head
    .querySelectorAll("style:not([data-vite-dev-id])")
    .forEach((s) => s.remove());
  document.head
    .querySelectorAll('link[rel="stylesheet"]')
    .forEach((l) => l.remove());

  // Process styles from the next page
  nextDoc.head
    .querySelectorAll('style, link[rel="stylesheet"]')
    .forEach((el) => {
      const viteId = el.getAttribute("data-vite-dev-id");

      if (viteId && currentViteMap.has(viteId)) {
        const existing = currentViteMap.get(viteId)!;
        existing.textContent = el.textContent;
        currentViteMap.delete(viteId);
      } else if (viteId && !currentViteMap.has(viteId)) {
        document.head.appendChild(el.cloneNode(true));
      } else {
        document.head.appendChild(el.cloneNode(true));
      }
    });

  // ── Scripts ──

  nextDoc
    .querySelectorAll<HTMLScriptElement>("script[type='module']")
    .forEach((nextScript) => {
      const key =
        nextScript.src ||
        nextScript.textContent?.slice(0, 200) ||
        "";
      if (!key || loadedScripts.has(key)) return;

      loadedScripts.add(key);

      const script = document.createElement("script");
      script.type = "module";
      if (nextScript.src) {
        script.src = nextScript.src;
      } else {
        script.textContent = nextScript.textContent;
      }
      document.head.appendChild(script);
    });

  // ── Meta ──

  const nextTitle = nextDoc.querySelector("title");
  if (nextTitle) {
    document.title = nextTitle.textContent || "";
  }

  const nextDesc = nextDoc.querySelector(
    'meta[name="description"]',
  );
  const currentDesc = document.querySelector(
    'meta[name="description"]',
  );
  if (nextDesc && currentDesc) {
    currentDesc.setAttribute(
      "content",
      nextDesc.getAttribute("content") || "",
    );
  }
}

// ── Coordinated Enter Animation ──────────────────────────────

/**
 * Runs the full page enter sequence:
 * A single timeline that coordinates overlay fadeout + content reveal.
 *
 * Timeline:
 * - T=0.0  main frozen (100svh, clip), lenis stopped, scroll at 0
 * - T=0.3  overlay fades out (0.5s) — onStart: unfreeze main, lenis.start(), ST.refresh()
 * - T=0.3  enter animations start in parallel (headings, reveals, nav)
 */
function runCoordinatedEnter(
  scope: Element,
): gsap.core.Timeline {
  const overlay =
    document.querySelector<HTMLElement>(".page-transition");
  const lenis = getLenis();

  const tl = gsap.timeline({
    defaults: {
      duration: DURATION.double,
      ease: "expo.out",
    },
    onStart: () => {
      gsap.set(scope, { height: "100svh", overflow: "clip" });
      lenis?.stop();
      lenis?.scrollTo(0, { immediate: true });
    },
  });

  // T=0.3: Overlay fades out while content animates in
  if (overlay) {
    tl.fromTo(
      overlay,
      { autoAlpha: 1 },
      {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power1.inOut",
        overwrite: true,
        onStart: () => {
          gsap.set(scope, { clearProps: "height,overflow" });
          lenis?.resize();
          lenis?.start();
          ScrollTrigger.refresh();
        },
      },
      0.3,
    );
  }

  // T=0.3: Content enter animations (runs in parallel with overlay fade)
  const enterTl = runPageEnterAnimation({ scope });
  if (enterTl) {
    tl.add(enterTl, 0.3);
  }

  return tl;
}

// ── Barba Init ───────────────────────────────────────────────

/**
 * Initialize Barba.js with overlay-based transitions.
 *
 * Call once after `initSmoothScroll()` and `initAllAnimations()`.
 * Manages the full page transition lifecycle including:
 * - Lenis destroy/recreate
 * - ScrollTrigger cleanup
 * - Head sync (CSS + scripts)
 * - Coordinated enter animation
 */
export function initBarba(): void {
  snapshotCurrentScripts();

  // Prevent browser auto-scroll on back/forward
  history.scrollRestoration = "manual";

  // Enable link prefetching (skip in dev — stale cache conflicts with HMR)
  if (typeof import.meta !== "undefined" && !(import.meta as any).env) {
    barba.use(barbaPrefetch);
  }

  barba.init({
    preventRunning: true,
    timeout: 7000,
    transitions: [
      {
        name: "default",

        once(data: any) {
          runCoordinatedEnter(data.next.container);
        },

        leave() {
          const lenis = getLenis();
          lenis?.stop();

          // Close nav if open
          const nav = document.querySelector<HTMLElement>(
            "[data-nav-status]",
          );
          if (nav) nav.setAttribute("data-nav-status", "not-active");

          return fadeOverlayIn();
        },

        afterLeave(data: any) {
          data.current.container.style.display = "none";

          destroySmoothScroll();
          ScrollTrigger.getAll().forEach((t) => t.kill());

          if (masterCleanup) {
            masterCleanup();
            masterCleanup = null;
          }
        },

        beforeEnter(data: any) {
          syncHead(data.next.html);
          initSmoothScroll();
          window.scrollTo(0, 0);

          masterCleanup = initAllAnimations(data.next.container);

          // Fire astro:after-swap so inline component scripts re-initialize
          document.dispatchEvent(new Event("astro:after-swap"));
        },

        enter(data: any) {
          return runCoordinatedEnter(data.next.container).then();
        },

        afterEnter() {
          ScrollTrigger.refresh();
        },
      },
    ],
  });
}
