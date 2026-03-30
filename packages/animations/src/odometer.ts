/**
 * @module odometer
 * Rolling number animation for counters, badges, pricing, and stats.
 * Digits roll through a vertical strip like a mechanical counter.
 *
 * ## Architecture
 * `initNumberOdometer()` is a **factory** — it initializes scroll-triggered
 * odometer groups in the DOM and returns an `update` function for
 * programmatic number changes (e.g. badge counters).
 *
 * ## Supported `data-*` attributes
 * - `data-odometer-group`           — Scroll-triggered container
 * - `data-odometer-element`         — Number element
 * - `data-odometer-start="0"`       — Start value (default: `0`)
 * - `data-odometer-duration="0.6"`  — Per-element duration override
 * - `data-odometer-stagger="0.1"`   — Stagger between elements in a group
 * - `data-odometer-stagger-order`   — `"left"` (default) | `"right"` | `"random"`
 * - `data-odometer-trigger-start`   — ScrollTrigger start (default: `"top 80%"`)
 * - `data-odometer-grow`            — `"true"` | `"false"` — width expansion animation
 * - `data-odometer-initialized`     — Set by init to prevent double-init
 * - `data-motion-exempt`            — Skips odometer animation
 *
 * ## Usage
 * ```ts
 * import { initNumberOdometer } from '@anthropic-atom/animations';
 *
 * // Scroll-triggered groups auto-init
 * const updateOdometer = initNumberOdometer();
 *
 * // Programmatic update (badge, counter, etc.)
 * const badge = document.querySelector('.badge__text');
 * updateOdometer(badge, '99+', { duration: 0.4 });
 * ```
 */

import { gsap, ScrollTrigger } from "./config";
import { prefersReducedMotion } from "./motion";

interface OdometerOptions {
  duration?: number;
  ease?: string;
}

interface OdometerDefaults {
  duration: number;
  ease: string;
  elementStagger: number;
  digitStagger: number;
  revealDuration: number;
  revealEase: string;
  triggerStart: string;
  staggerOrder: string;
  digitCycles: number;
}

/**
 * Initialize odometer system.
 *
 * Sets up scroll-triggered groups and returns an `update` function
 * for programmatic number changes.
 *
 * Note: This is a **factory pattern**, not a standard `init* → CleanupFn`.
 * The returned function is the primary API for programmatic updates.
 * Scroll-triggered groups self-cleanup after animation completes.
 *
 * @returns Update function: `(el, newText, options?) => void`
 */
export function initNumberOdometer() {
  const isReduced = prefersReducedMotion();
  const initFlag = "data-odometer-initialized";
  const activeTweens = new WeakMap<HTMLElement, gsap.core.Timeline>();

  // Configuration
  const defaults: OdometerDefaults = {
    duration: 0.6,
    ease: "atom",
    elementStagger: 0.1,
    digitStagger: 0.04,
    revealDuration: 0.4,
    revealEase: "power2.out",
    triggerStart: "top 80%",
    staggerOrder: "left",
    digitCycles: 2,
  };

  // Scroll-triggered groups
  document
    .querySelectorAll("[data-odometer-group]")
    .forEach((group) => {
      if (group.hasAttribute(initFlag)) return;
      group.setAttribute(initFlag, "");

      const elements = Array.from(
        group.querySelectorAll("[data-odometer-element]"),
      ) as HTMLElement[];
      if (!elements.length || isReduced) return;

      const staggerOrder =
        group.getAttribute("data-odometer-stagger-order") ||
        defaults.staggerOrder;
      const triggerStart =
        group.getAttribute("data-odometer-trigger-start") ||
        defaults.triggerStart;
      const elementStagger = parseFloat(
        group.getAttribute("data-odometer-stagger") ||
          String(defaults.elementStagger),
      );

      const elementData = elements.map((el) => {
        const originalText = el.textContent?.trim() || "";
        const hasExplicitStart = el.hasAttribute("data-odometer-start");
        const startValue = parseFloat(
          el.getAttribute("data-odometer-start") || "0",
        );
        const duration = parseFloat(
          el.getAttribute("data-odometer-duration") ||
            String(defaults.duration),
        );
        const step = getLineHeightRatio(el);

        let segments = parseSegments(originalText);
        segments = mapStartDigits(segments, startValue);
        segments = markHiddenSegments(segments, startValue);

        const grow = shouldGrow(
          el,
          hasExplicitStart,
          startValue,
          segments,
        );
        const { rollers, revealEls } = buildRollerDOM(
          el,
          segments,
          step,
          grow,
        );

        const fontSize = parseFloat(getComputedStyle(el).fontSize);
        const revealData = revealEls.map((revealEl) => {
          const widthEm = revealEl.offsetWidth / fontSize;
          gsap.set(revealEl, { width: 0, overflow: "hidden" });
          return { el: revealEl, widthEm };
        });

        return { el, rollers, duration, step, revealData, originalText };
      });

      const ordered = applyStaggerOrder(elementData, staggerOrder);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: group as HTMLElement,
          start: triggerStart,
          once: true,
        },
        onComplete() {
          elementData.forEach(({ el, originalText }) => {
            cleanupElement(el, originalText);
          });
        },
      });

      ordered.forEach((data, orderIdx) => {
        const { rollers, duration, step, revealData } = data;
        const offset = orderIdx * elementStagger;

        revealData.forEach(({ el, widthEm }) => {
          tl.to(
            el,
            {
              width: widthEm + "em",
              opacity: 1,
              duration: defaults.revealDuration,
              ease: defaults.revealEase,
            },
            offset,
          );
        });

        rollers.forEach(({ roller, targetPos }, digitIdx) => {
          const reversedIdx = rollers.length - 1 - digitIdx;
          tl.to(
            roller,
            {
              y: -targetPos * step + "em",
              duration,
              ease: defaults.ease,
              force3D: true,
            },
            offset + reversedIdx * defaults.digitStagger,
          );
        });
      });
    });

  // Programmatic update (for Badge counter, etc.)
  function updateOdometer(
    el: HTMLElement,
    newText: string,
    options: OdometerOptions = {},
  ) {
    const currentText = el.textContent?.trim() || "";
    if (currentText === newText) return;

    const duration = options.duration || defaults.duration;
    const ease = options.ease || defaults.ease;
    const step = getLineHeightRatio(el);

    // Kill any running animation
    const existing = activeTweens.get(el);
    if (existing) {
      existing.kill();
      gsap.set(el, { clearProps: "width,overflow" });
    }

    // Measure current width before rebuilding (in em)
    const fontSize = parseFloat(getComputedStyle(el).fontSize);
    const oldWidthEm = el.getBoundingClientRect().width / fontSize;

    // Parse current text as start, new text as end
    const startSegments = parseSegments(currentText);
    const startDigitsStr = startSegments
      .filter((s) => s.type === "digit")
      .map((s) => s.char)
      .join("");
    const startValue = parseInt(startDigitsStr, 10) || 0;

    let segments = parseSegments(newText);
    segments = mapStartDigits(segments, startValue);
    segments = markHiddenSegments(segments, startValue);
    const { rollers, revealEls } = buildRollerDOM(
      el,
      segments,
      step,
      true,
    );

    // Measure new natural width (in em)
    const newWidthEm = el.getBoundingClientRect().width / fontSize;
    const widthChanged = Math.abs(oldWidthEm - newWidthEm) > 0.01;

    // Lock to old width for smooth transition
    if (widthChanged) {
      gsap.set(el, { width: oldWidthEm + "em", overflow: "hidden" });
    }

    const tl = gsap.timeline({
      onComplete() {
        cleanupElement(el, newText);
        activeTweens.delete(el);
      },
    });
    activeTweens.set(el, tl);

    // Animate element width
    if (widthChanged) {
      tl.to(
        el,
        {
          width: newWidthEm + "em",
          duration: defaults.revealDuration,
          ease: defaults.revealEase,
        },
        0,
      );
    }

    // Fade in hidden statics
    revealEls.forEach((revealEl) => {
      if (revealEl.getAttribute("data-odometer-part") === "static") {
        tl.to(revealEl, { opacity: 1, duration: 0.2 }, 0);
      }
    });

    // Roll digits
    rollers.forEach(({ roller, targetPos }, digitIdx) => {
      const reversedIdx = rollers.length - 1 - digitIdx;
      tl.to(
        roller,
        {
          y: -targetPos * step + "em",
          duration,
          ease,
          force3D: true,
        },
        reversedIdx * defaults.digitStagger,
      );
    });
  }

  // ── Helper functions ─────────────────────────────────────────

  function getLineHeightRatio(el: HTMLElement): number {
    const cs = getComputedStyle(el);
    const lh = cs.lineHeight;
    if (lh === "normal") return 1.2;
    return parseFloat(lh) / parseFloat(cs.fontSize);
  }

  interface Segment {
    type: "digit" | "static";
    char: string;
    startDigit?: number;
    hidden?: boolean;
  }

  function parseSegments(text: string): Segment[] {
    return [...text].map((char) => ({
      type: /\d/.test(char) ? "digit" : "static",
      char,
    }));
  }

  function mapStartDigits(
    segments: Segment[],
    startValue: number,
  ): Segment[] {
    const digitSlots = segments.filter((s) => s.type === "digit");
    const padded = String(Math.floor(Math.abs(startValue)))
      .padStart(digitSlots.length, "0")
      .slice(-digitSlots.length);
    let di = 0;
    return segments.map((s) =>
      s.type === "digit"
        ? { ...s, startDigit: parseInt(padded[di++], 10) }
        : s,
    );
  }

  function markHiddenSegments(
    segments: Segment[],
    startValue: number,
  ): Segment[] {
    const totalDigits = segments.filter((s) => s.type === "digit").length;
    const absStart = Math.floor(Math.abs(startValue));
    const startDigitCount = absStart === 0 ? 1 : String(absStart).length;
    const leadingZeros = Math.max(0, totalDigits - startDigitCount);
    if (leadingZeros === 0) return segments;
    let digitsSeen = 0;
    let firstDigitSeen = false;
    let prevDigitHidden = false;
    return segments.map((seg) => {
      if (seg.type === "digit") {
        firstDigitSeen = true;
        const hidden = digitsSeen < leadingZeros;
        prevDigitHidden = hidden;
        digitsSeen++;
        return { ...seg, hidden };
      }
      const hidden = firstDigitSeen && prevDigitHidden;
      return { ...seg, hidden };
    });
  }

  function shouldGrow(
    el: HTMLElement,
    hasExplicitStart: boolean,
    startValue: number,
    segments: Segment[],
  ): boolean {
    if (el.hasAttribute("data-odometer-grow")) {
      return el.getAttribute("data-odometer-grow") !== "false";
    }
    if (!hasExplicitStart) return false;
    const absStart = Math.floor(Math.abs(startValue));
    const startDigitCount = absStart === 0 ? 1 : String(absStart).length;
    const endDigitCount = segments.filter(
      (s) => s.type === "digit",
    ).length;
    return startDigitCount < endDigitCount;
  }

  function buildRollerDOM(
    el: HTMLElement,
    segments: Segment[],
    step: number,
    grow: boolean,
  ) {
    el.innerHTML = "";
    el.style.height = "";
    const rollers: { roller: HTMLElement; targetPos: number }[] = [];
    const revealEls: HTMLElement[] = [];
    const totalCells = 10 * defaults.digitCycles;

    segments.forEach((seg) => {
      if (seg.type === "static") {
        const span = document.createElement("span");
        span.setAttribute("data-odometer-part", "static");
        span.style.height = step + "em";
        span.style.lineHeight = String(step);
        span.textContent = seg.char;
        el.appendChild(span);
        if (grow && seg.hidden) {
          gsap.set(span, { opacity: 0 });
          revealEls.push(span);
        }
        return;
      }

      const mask = document.createElement("span");
      mask.setAttribute("data-odometer-part", "mask");
      mask.style.height = step + "em";
      mask.style.lineHeight = String(step);

      const roller = document.createElement("span");
      roller.setAttribute("data-odometer-part", "roller");
      roller.style.lineHeight = String(step);

      const digits: number[] = [];
      for (let d = 0; d < totalCells; d++) {
        digits.push(d % 10);
      }
      roller.textContent = digits.join("\n");
      mask.appendChild(roller);
      el.appendChild(mask);

      const startDigit = seg.startDigit || 0;
      const isReveal = grow && seg.hidden;
      gsap.set(roller, {
        y: isReveal ? step + "em" : -startDigit * step + "em",
      });

      const endDigit = parseInt(seg.char, 10);
      const targetPos =
        endDigit > startDigit ? endDigit : 10 + endDigit;
      rollers.push({ roller, targetPos });

      if (isReveal) revealEls.push(mask);
    });

    return { rollers, revealEls };
  }

  function cleanupElement(el: HTMLElement, originalText: string) {
    el.style.overflow = "";
    el.style.height = "";

    const digits = [...originalText].filter((c) => /\d/.test(c));
    let di = 0;

    el.querySelectorAll('[data-odometer-part="mask"]').forEach((mask) => {
      const roller = mask.querySelector('[data-odometer-part="roller"]');
      if (roller) roller.remove();
      mask.textContent = digits[di++] || "";
      (mask as HTMLElement).style.opacity = "";
      (mask as HTMLElement).style.overflow = "";
    });

    el.querySelectorAll('[data-odometer-part="static"]').forEach((stat) => {
      (stat as HTMLElement).style.opacity = "";
    });
  }

  function recalcOnResize() {
    document
      .querySelectorAll("[data-odometer-element]")
      .forEach((el) => {
        const running = activeTweens.get(el as HTMLElement);
        if (running) {
          running.progress(1);
          activeTweens.delete(el as HTMLElement);
        }

        const hasRollers = el.querySelector(
          '[data-odometer-part="roller"]',
        );

        if (hasRollers) {
          const step = getLineHeightRatio(el as HTMLElement);
          el.querySelectorAll('[data-odometer-part="mask"]').forEach(
            (mask) => {
              (mask as HTMLElement).style.height = step + "em";
              (mask as HTMLElement).style.lineHeight = String(step);
            },
          );
          el.querySelectorAll('[data-odometer-part="roller"]').forEach(
            (roller) => {
              (roller as HTMLElement).style.lineHeight = String(step);
            },
          );
          el.querySelectorAll('[data-odometer-part="static"]').forEach(
            (stat) => {
              (stat as HTMLElement).style.lineHeight = String(step);
            },
          );
        }
      });
    ScrollTrigger.refresh();
  }

  let resizeTimer: ReturnType<typeof setTimeout>;
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      recalcOnResize();
    }, 250);
  });

  function applyStaggerOrder<T>(items: T[], order: string): T[] {
    const arr = [...items];
    if (order === "right") return arr.reverse();
    if (order === "random") return shuffleArray(arr);
    return arr;
  }

  function shuffleArray<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  return updateOdometer;
}
