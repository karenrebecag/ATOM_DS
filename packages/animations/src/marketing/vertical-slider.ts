/**
 * @module vertical-slider
 * 3D flip slider with perspective-based card transitions.
 *
 * **Vestibular risk** — full 3D rotation on slide transitions.
 * `prefersReducedMotion()` is checked at the TOP of the function.
 * When reduced, slides snap instantly (no 3D animation).
 *
 * Uses perspective + rotateX for a 3D card-flip effect with
 * separate desktop/mobile transform presets.
 *
 * ## Supported `data-*` attributes
 * - `data-vslider-init`         — Slider root
 * - `data-vslider-list`         — Items wrapper (has perspective)
 * - `data-vslider-item`         — Each slide
 * - `data-vslider-prev`         — Previous button
 * - `data-vslider-next`         — Next button
 * - `data-vslider-bullet`       — Bullet indicators
 * - `data-vslider-progress`     — SVG circle for autoplay indicator
 * - `data-vslider-autoplay`     — Autoplay duration in ms (on root)
 * - `data-vslider-duration`     — Animation duration (default 0.725)
 * - `data-fade-slides`          — Adjacent slides get opacity 0
 * - `data-vslider-slide-map`    — Map value for globe flag toggling
 * - `data-vslider-map`          — Map element matched by slide-map value
 * - `data-button-wrap`          — Hover target for autoplay pause
 * - `data-vslider-collection`   — Fallback hover target
 * - `data-motion-exempt`        — Skips animation
 *
 * ## Usage
 * ```ts
 * import { initVerticalSlider } from '@atomchat/animations';
 *
 * const cleanup = initVerticalSlider();
 * cleanup();
 * ```
 */

import { gsap, ScrollTrigger } from "../core/config";
import { prefersReducedMotion, isMotionExempt } from "../core/motion";
import type { AnimationConfig, CleanupFn } from "../core/types";
import { NOOP } from "../core/types";

// ── 3D transform presets ────────────────────────────────────

const YD = 30,
  ZD = 20,
  RD = 60; // desktop
const YM = 40,
  ZM = 26,
  RM = 70; // mobile

interface SlideConfig {
  x: string;
  y: string;
  z: string;
  rx: number;
  opacity: number;
}

function makeConfig(
  isMobile: boolean,
): Record<string, SlideConfig> {
  const Y = isMobile ? YM : YD;
  const Z = isMobile ? ZM : ZD;
  const R = isMobile ? RM : RD;

  return {
    "-2": {
      x: "0em",
      y: `${Y}em`,
      z: `-${Z}em`,
      rx: -R,
      opacity: 0,
    },
    "-1": {
      x: "0em",
      y: `${Y}em`,
      z: `-${Z}em`,
      rx: -R,
      opacity: 1,
    },
    "0": {
      x: "0em",
      y: "0em",
      z: "0em",
      rx: 0,
      opacity: 1,
    },
    "1": {
      x: "0em",
      y: `-${Y}em`,
      z: `-${Z}em`,
      rx: R,
      opacity: 1,
    },
    "2": {
      x: "0em",
      y: `-${Y}em`,
      z: `-${Z}em`,
      rx: R,
      opacity: 0,
    },
  };
}

// ── Relative position helper ────────────────────────────────

function rel(i: number, current: number, total: number): number {
  let d = (((i - current) % total) + total) % total;
  if (d > Math.floor(total / 2)) d -= total;
  return Math.max(-2, Math.min(2, d));
}

/**
 * Initialize 3D vertical slider(s).
 *
 * **Vestibular risk** — checks `prefersReducedMotion()` at the top.
 * When reduced, navigation sets slides instantly (no 3D rotation).
 * Autoplay is disabled entirely under reduced motion.
 *
 * @param config - Optional scope container (defaults to `document`)
 * @returns Cleanup that kills timelines, ScrollTriggers, and listeners
 */
export function initVerticalSlider(
  config: AnimationConfig = {},
): CleanupFn {
  const { scope = document } = config;
  const wrappers =
    scope.querySelectorAll<HTMLElement>("[data-vslider-init]");

  if (!wrappers.length) return NOOP;

  const reducedMotion = prefersReducedMotion();
  const cleanups: CleanupFn[] = [];

  wrappers.forEach((wrap) => {
    if (isMotionExempt(wrap)) return;

    const slides = Array.from(
      wrap.querySelectorAll<HTMLElement>("[data-vslider-item]"),
    );
    if (slides.length < 2) return;

    const prevBtn = wrap.querySelector<HTMLElement>(
      "[data-vslider-prev]",
    );
    const nextBtn = wrap.querySelector<HTMLElement>(
      "[data-vslider-next]",
    );
    const bullets = Array.from(
      wrap.querySelectorAll<HTMLElement>("[data-vslider-bullet]"),
    );
    const indicator = wrap.querySelector<SVGCircleElement>(
      "[data-vslider-progress]",
    );

    // Fade-slides mode: adjacent slides get opacity 0
    const isFadedSlides = wrap.hasAttribute("data-fade-slides");

    let isMobile = window.innerWidth < 768;
    let CONFIG = makeConfig(isMobile);

    if (isFadedSlides) {
      CONFIG["-1"].opacity = 0;
      CONFIG["1"].opacity = 0;
    }

    let activeIndex = 0;
    let isAnimating = false;
    const dur = parseFloat(
      wrap.getAttribute("data-vslider-duration") || "0.725",
    );

    // ── Autoplay ──
    const autoplayMs = parseInt(
      wrap.getAttribute("data-vslider-autoplay") || "0",
      10,
    );
    const autoplayEnabled = autoplayMs > 0 && !reducedMotion;
    const indicatorLen = indicator
      ? 2 *
        Math.PI *
        parseFloat(indicator.getAttribute("r") || "40")
      : 0;
    let autoTl: gsap.core.Tween | null = null;

    // ── Set immediate transforms ──
    function setItemImmediate(
      s: HTMLElement,
      cfg: SlideConfig,
    ): void {
      gsap.set(s, {
        transformOrigin: "50% 50%",
        force3D: true,
        x: cfg.x,
        y: cfg.y,
        z: cfg.z,
        rotationX: cfg.rx,
        opacity: cfg.opacity,
      });
    }

    function setImmediateState(current: number): void {
      slides.forEach((s, i) => {
        const key = String(rel(i, current, slides.length));
        setItemImmediate(s, CONFIG[key]);
      });
    }

    // ── Map elements (globe flag toggling) ──
    const hasMap = slides.some((s) =>
      s.hasAttribute("data-vslider-slide-map"),
    );
    const mapElements = hasMap
      ? Array.from(
          wrap.querySelectorAll<HTMLElement>("[data-vslider-map]"),
        )
      : [];

    // ── UI update ──
    function setActiveUI(idx: number): void {
      slides.forEach((s, i) => {
        const on = i === idx;
        s.style.zIndex = on ? "2" : "1";
        s.style.pointerEvents = on ? "auto" : "none";
        s.setAttribute("aria-hidden", on ? "false" : "true");
        s.setAttribute("tabindex", on ? "0" : "-1");
      });
      bullets.forEach((b, i) => {
        b.setAttribute(
          "data-vslider-bullet-status",
          i === idx ? "active" : "not-active",
        );
      });

      // Toggle globe flags
      if (hasMap) {
        const activeSlide = slides[idx];
        const mapVal =
          activeSlide?.getAttribute("data-vslider-slide-map") || null;
        if (mapVal) {
          mapElements.forEach((m) => {
            m.classList.toggle(
              "is--active",
              m.getAttribute("data-vslider-map") === mapVal,
            );
          });
        }
      }
    }

    // ── Animate ──
    function animateItemTo(
      s: HTMLElement,
      cfg: SlideConfig,
    ): gsap.core.Tween {
      return gsap.to(s, {
        transformOrigin: "50% 50%",
        force3D: true,
        x: cfg.x,
        y: cfg.y,
        z: cfg.z,
        rotationX: cfg.rx,
        opacity: cfg.opacity,
        duration: dur,
        ease: "atom",
      });
    }

    function renderTo(
      targetIndex: number,
    ): gsap.core.Tween[] {
      return slides.map((s, i) => {
        const key = String(rel(i, targetIndex, slides.length));
        return animateItemTo(s, CONFIG[key]);
      });
    }

    // ── Autoplay controls ──
    function stopAutoplay(): void {
      if (autoTl) {
        autoTl.kill();
        autoTl = null;
      }
      if (indicator) {
        gsap.killTweensOf(indicator);
        (indicator.style as CSSStyleDeclaration & Record<string, string>)
          .strokeDashoffset = "0";
      }
    }

    function startAutoplay(): void {
      if (!autoplayEnabled) return;
      stopAutoplay();

      if (indicator && indicatorLen) {
        gsap.set(indicator, {
          transformOrigin: "50% 50%",
          rotate: -90,
          strokeDasharray: indicatorLen,
          strokeDashoffset: 0,
        });
        autoTl = gsap.to(indicator, {
          strokeDashoffset: -indicatorLen,
          transformOrigin: "50% 50%",
          ease: "none",
          duration: autoplayMs / 1000,
          onComplete: () => goNext(),
        });
      } else {
        autoTl = gsap.delayedCall(
          autoplayMs / 1000,
          () => goNext(),
        ) as unknown as gsap.core.Tween;
      }
    }

    function pauseAutoplay(): void {
      if (autoTl && "pause" in autoTl) autoTl.pause();
    }

    function resumeAutoplay(): void {
      if (autoTl && "resume" in autoTl) autoTl.resume();
    }

    // ── Navigation ──
    function goTo(targetIndex: number): void {
      if (reducedMotion) {
        activeIndex = targetIndex;
        setImmediateState(activeIndex);
        setActiveUI(activeIndex);
        return;
      }

      if (isAnimating || targetIndex === activeIndex) {
        if (autoplayEnabled) {
          stopAutoplay();
          startAutoplay();
        }
        return;
      }

      isAnimating = true;
      stopAutoplay();
      setActiveUI(targetIndex);

      const tweens = renderTo(targetIndex);
      const tl = gsap.timeline({
        onComplete: () => {
          activeIndex = targetIndex;
          isAnimating = false;
          startAutoplay();
        },
      });
      tweens.forEach((t) => tl.add(t, 0));
    }

    const goNext = (): void =>
      goTo((activeIndex + 1) % slides.length);
    const goPrev = (): void =>
      goTo((activeIndex - 1 + slides.length) % slides.length);

    // ── Responsive ──
    function handleResize(): void {
      const newMobile = window.innerWidth < 768;
      if (newMobile === isMobile) return;
      isMobile = newMobile;
      CONFIG = makeConfig(isMobile);
      if (isFadedSlides) {
        CONFIG["-1"].opacity = 0;
        CONFIG["1"].opacity = 0;
      }
      setImmediateState(activeIndex);
    }

    window.addEventListener("resize", handleResize);

    // ── Event listeners ──
    if (prevBtn) prevBtn.addEventListener("click", goPrev);
    if (nextBtn) nextBtn.addEventListener("click", goNext);

    // Bullet clicks (delegated)
    const onBulletClick = (e: Event): void => {
      const btn = (e.target as HTMLElement).closest(
        "[data-vslider-bullet]",
      );
      if (!btn || !wrap.contains(btn)) return;
      const idx = bullets.indexOf(btn as HTMLElement);
      if (idx >= 0) goTo(idx);
    };
    wrap.addEventListener("click", onBulletClick);

    // Hover pause
    const hoverTarget = (wrap.querySelector("[data-button-wrap]") ||
      wrap.querySelector(
        "[data-vslider-collection]",
      )) as HTMLElement | null;
    if (hoverTarget) {
      hoverTarget.addEventListener("mouseenter", pauseAutoplay);
      hoverTarget.addEventListener("mouseleave", resumeAutoplay);
    }

    // ── Initial state ──
    setImmediateState(activeIndex);
    setActiveUI(activeIndex);

    // ── ScrollTrigger visibility ──
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top 80%",
      end: "bottom top",
      onEnter: () => {
        if (autoplayEnabled && !autoTl) startAutoplay();
      },
      onEnterBack: () => {
        if (autoplayEnabled && !autoTl) startAutoplay();
      },
      onLeave: stopAutoplay,
      onLeaveBack: stopAutoplay,
    });

    cleanups.push(() => {
      stopAutoplay();
      st.kill();
      window.removeEventListener("resize", handleResize);
      if (prevBtn)
        prevBtn.removeEventListener("click", goPrev);
      if (nextBtn)
        nextBtn.removeEventListener("click", goNext);
      wrap.removeEventListener("click", onBulletClick);
      if (hoverTarget) {
        hoverTarget.removeEventListener(
          "mouseenter",
          pauseAutoplay,
        );
        hoverTarget.removeEventListener(
          "mouseleave",
          resumeAutoplay,
        );
      }
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
