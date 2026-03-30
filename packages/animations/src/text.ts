/**
 * @module text
 * Word-by-word and line-by-line scroll-triggered text reveal animations.
 *
 * Requires GSAP SplitText plugin (Club GSAP). If SplitText is not
 * available at runtime, falls back to a simple fade-up reveal.
 *
 * ## Supported `data-*` attributes
 * - `data-text-reveal`    — Reveal type: `"words"` (default) | `"lines"`
 * - `data-motion-exempt`  — Skips animation, element renders in visible state
 *
 * ## Usage
 * ```html
 * <h1 data-text-reveal>Hello World</h1>
 * <h2 data-text-reveal="lines">Line by line reveal</h2>
 * ```
 *
 * ```ts
 * import { initTextReveal } from '@atomchat/animations';
 *
 * const cleanup = initTextReveal();
 * // Later (reverts SplitText DOM changes):
 * cleanup();
 * ```
 */

import { gsap, DURATION, STAGGER } from "./config";
import { prefersReducedMotion, isMotionExempt } from "./motion";
import type { AnimationConfig, CleanupFn } from "./types";
import { NOOP } from "./types";

interface TextRevealConfig extends AnimationConfig {
  /** ScrollTrigger start position. Default: `"top 85%"` */
  start?: string;
  /** Run only once. Default: `true` */
  once?: boolean;
}

/**
 * Initialize scroll-triggered text reveal animations.
 *
 * When SplitText is available, splits text into words/lines and
 * animates them with yPercent + rotation. Without SplitText, falls
 * back to a whole-element fade-up.
 *
 * Respects `prefers-reduced-motion` (skips animation) and
 * `data-motion-exempt` (per-element opt-out).
 *
 * @param config - Optional scope, start position, and once toggle
 * @returns Cleanup that reverts SplitText DOM splits and kills tweens
 */
export function initTextReveal(config: TextRevealConfig = {}): CleanupFn {
  const { start = "top 85%", once = true, scope = document } = config;

  const headings = scope.querySelectorAll<HTMLElement>("[data-text-reveal]");
  if (!headings.length) return NOOP;

  // SplitText is a Club GSAP plugin — may not be registered.
  // Dynamic check is unavoidable; plugin has no TS declarations in standard package.
  const SplitText =
    (window as any).SplitText || (gsap as any).SplitText || null;
  const hasSplitText = SplitText !== null;

  const splits: Array<{ revert: () => void }> = [];
  const tweens: gsap.core.Tween[] = [];

  headings.forEach((el) => {
    if (isMotionExempt(el)) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }

    const type = el.getAttribute("data-text-reveal") || "words";

    if (hasSplitText) {
      const result = initWithSplitText(el, type, start, once, SplitText);
      if (result) {
        splits.push(result.split);
        tweens.push(result.tween);
      }
    } else {
      const tween = initFallback(el, start, once);
      tweens.push(tween);
    }
  });

  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
    splits.forEach((split) => {
      try {
        split.revert();
      } catch {
        /* already reverted */
      }
    });
  };
}

function initWithSplitText(
  el: HTMLElement,
  type: string,
  start: string,
  once: boolean,
  SplitText: any,
): { split: { revert: () => void }; tween: gsap.core.Tween } | null {
  const splitType = type === "lines" ? "lines" : "lines, words";
  const split = new SplitText(el, {
    type: splitType,
    mask: "lines",
    linesClass: "text-line",
  });

  const targets = type === "lines" ? split.lines : split.words;

  gsap.set(targets, {
    yPercent: 100,
    rotate: 10,
    transformOrigin: "bottom left",
  });

  const tween = gsap.to(targets, {
    yPercent: 0,
    rotate: 0,
    duration: DURATION.double,
    ease: "expo.out",
    stagger: STAGGER.default,
    scrollTrigger: {
      trigger: el,
      start,
      once,
    },
  });

  return { split, tween };
}

function initFallback(
  el: HTMLElement,
  start: string,
  once: boolean,
): gsap.core.Tween {
  gsap.set(el, { autoAlpha: 0, y: "1.5em" });

  return gsap.to(el, {
    autoAlpha: 1,
    y: 0,
    duration: DURATION.onehalf,
    ease: "expo.out",
    scrollTrigger: {
      trigger: el,
      start,
      once,
    },
  });
}

// ══════════════════════════════════════════════════════════════════════
// EXTENDED TEXT ANIMATIONS
// Additional animation types for text atoms (Heading, Text, Caption)
// ══════════════════════════════════════════════════════════════════════

// ── Scramble Text Utility ─────────────────────────────────────────────
const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Manual scramble text effect (no plugin required).
 * Randomly shuffles characters then progressively reveals original text.
 */
function scrambleText(
  el: HTMLElement,
  finalText: string,
  duration: number = 1.2,
  delay: number = 0
): CleanupFn {
  const totalFrames = Math.round(duration * 60);
  let frame = 0;
  let raf: number;

  gsap.set(el, { autoAlpha: 1 });

  const chars = finalText.split("");
  const revealFrame = (charIndex: number) =>
    Math.floor((charIndex / chars.length) * totalFrames);

  function tick() {
    frame++;
    const result = chars.map((char, i) => {
      if (char === " ") return " ";
      if (frame >= revealFrame(i) + delay * 60) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    });
    el.textContent = result.join("");
    if (frame < totalFrames + Math.round(delay * 60)) {
      raf = requestAnimationFrame(tick);
    }
  }

  const timeout = setTimeout(() => {
    raf = requestAnimationFrame(tick);
  }, delay * 1000);

  return () => {
    clearTimeout(timeout);
    if (raf) cancelAnimationFrame(raf);
  };
}

/**
 * Initialize masked reveal animations (lines/words/chars).
 * Requires `data-text-animate="masked-lines|masked-words|masked-chars"`.
 */
export function initMaskedReveal(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const elements = scope.querySelectorAll<HTMLElement>(
    '[data-text-animate^="masked"]'
  );
  if (!elements.length) return NOOP;

  const SplitText =
    (window as any).SplitText || (gsap as any).SplitText || null;

  if (!SplitText) {
    console.warn(
      "[text.ts] SplitText not available — masked reveals will use simple fade"
    );
    return initFadeUpLoad(config);
  }

  const splits: any[] = [];

  elements.forEach((el) => {
    if (isMotionExempt(el) || prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    gsap.set(el, { autoAlpha: 1 });

    const animate = el.getAttribute("data-text-animate") || "";
    const trigger = el.getAttribute("data-text-trigger") || "scroll";
    const delay = parseFloat(el.getAttribute("data-text-delay") || "0");

    const type =
      animate === "masked-chars"
        ? "chars"
        : animate === "masked-words"
        ? "words"
        : "lines";

    const typesToSplit =
      type === "lines"
        ? "lines"
        : type === "words"
        ? "lines, words"
        : "lines, words, chars";

    const split = new SplitText(el, {
      type: typesToSplit,
      linesClass: "split-line",
      wordsClass: "split-word",
      charsClass: "split-char",
    });

    splits.push(split);

    const targets = split[type];
    const duration = type === "chars" ? 0.4 : type === "words" ? 0.6 : 0.8;
    const stagger = type === "chars" ? 0.01 : type === "words" ? 0.06 : 0.08;

    gsap.set(el, { overflow: "hidden" });

    const tweenVars = {
      yPercent: 110,
      duration,
      stagger,
      ease: "expo.out",
      delay,
    };

    if (trigger === "scroll") {
      gsap.from(targets, {
        ...tweenVars,
        scrollTrigger: {
          trigger: el,
          start: "clamp(top 80%)",
          once: true,
        },
      });
    } else {
      gsap.from(targets, tweenVars);
    }
  });

  return () => {
    splits.forEach((split) => split.revert());
  };
}

/**
 * Initialize fade-up load animation.
 * Requires `data-text-animate="fade-up-load"`.
 */
export function initFadeUpLoad(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const elements = scope.querySelectorAll<HTMLElement>(
    '[data-text-animate="fade-up-load"]'
  );
  if (!elements.length) return NOOP;

  const tweens: gsap.core.Tween[] = [];

  elements.forEach((el) => {
    if (isMotionExempt(el) || prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    gsap.set(el, { autoAlpha: 1 });
    const delay = parseFloat(el.getAttribute("data-text-delay") || "0");

    const tween = gsap.from(el, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      delay,
    });
    tweens.push(tween);
  });

  return () => tweens.forEach((t) => t.kill());
}

/**
 * Initialize scramble load animation.
 * Requires `data-text-animate="scramble-load"`.
 */
export function initScrambleLoad(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const elements = scope.querySelectorAll<HTMLElement>(
    '[data-text-animate="scramble-load"]'
  );
  if (!elements.length) return NOOP;

  const cleanups: CleanupFn[] = [];

  elements.forEach((el) => {
    if (isMotionExempt(el) || prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    const originalText = el.textContent || "";
    const delay = parseFloat(el.getAttribute("data-text-delay") || "0");
    const cleanup = scrambleText(el, originalText, 1.2, delay);
    cleanups.push(cleanup);
  });

  return () => cleanups.forEach((fn) => fn());
}

/**
 * Initialize scramble hover animation.
 * Requires `data-text-animate="scramble-hover"`.
 */
export function initScrambleHover(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const elements = scope.querySelectorAll<HTMLElement>(
    '[data-text-animate="scramble-hover"]'
  );
  if (!elements.length) return NOOP;

  const cleanupFns: CleanupFn[] = [];

  elements.forEach((el) => {
    if (isMotionExempt(el)) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    gsap.set(el, { autoAlpha: 1 });
    const originalText = el.textContent || "";
    let isAnimating = false;
    let cleanup: CleanupFn | null = null;

    const handleEnter = () => {
      if (isAnimating) return;
      isAnimating = true;
      if (cleanup) cleanup();
      cleanup = scrambleText(el, originalText, 0.6, 0);
    };

    const handleLeave = () => {
      isAnimating = false;
      if (cleanup) cleanup();
      el.textContent = originalText;
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    cleanupFns.push(() => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      if (cleanup) cleanup();
    });
  });

  return () => cleanupFns.forEach((fn) => fn());
}

/**
 * Initialize highlight scroll animation.
 * Requires `data-text-animate="highlight-scroll"`.
 */
export function initHighlightScroll(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const elements = scope.querySelectorAll<HTMLElement>(
    '[data-text-animate="highlight-scroll"]'
  );
  if (!elements.length) return NOOP;

  const SplitText =
    (window as any).SplitText || (gsap as any).SplitText || null;

  if (!SplitText) {
    console.warn(
      "[text.ts] SplitText not available — highlight-scroll will use simple fade"
    );
    elements.forEach((el) => {
      if (isMotionExempt(el) || prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }
      gsap.set(el, { autoAlpha: 1 });
      gsap.from(el, {
        opacity: 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    });
    return NOOP;
  }

  const splits: any[] = [];

  elements.forEach((el) => {
    if (isMotionExempt(el) || prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    const split = new SplitText(el, {
      type: "words",
      wordsClass: "split-word",
    });
    splits.push(split);

    gsap.set(el, { autoAlpha: 1 });

    gsap.fromTo(
      split.words,
      { opacity: 0.2 },
      {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 40%",
          scrub: true,
        },
      }
    );
  });

  return () => splits.forEach((split) => split.revert());
}

/**
 * Initialize scramble scroll animation.
 * Requires `data-text-animate="scramble-scroll"`.
 */
export function initScrambleScroll(config: AnimationConfig = {}): CleanupFn {
  const { scope = document } = config;
  const elements = scope.querySelectorAll<HTMLElement>(
    '[data-text-animate="scramble-scroll"]'
  );
  if (!elements.length) return NOOP;

  const observers: IntersectionObserver[] = [];

  elements.forEach((el) => {
    if (isMotionExempt(el) || prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    const originalText = el.textContent || "";
    let hasPlayed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            hasPlayed = true;
            gsap.set(el, { autoAlpha: 1 });
            scrambleText(el, originalText, 1.2, 0);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    observers.push(observer);
  });

  return () => observers.forEach((obs) => obs.disconnect());
}

/**
 * Initialize ALL text animations.
 * Waits for fonts to load before splitting text.
 */
export function initTextAnimations(config: AnimationConfig = {}): CleanupFn {
  if (prefersReducedMotion()) {
    document.querySelectorAll<HTMLElement>("[data-text][data-text-animate]").forEach((el) => {
      gsap.set(el, { autoAlpha: 1 });
    });
    return NOOP;
  }

  const init = () => {
    const cleanups = [
      initMaskedReveal(config),
      initFadeUpLoad(config),
      initScrambleLoad(config),
      initScrambleHover(config),
      initHighlightScroll(config),
      initScrambleScroll(config),
    ];

    return () => cleanups.forEach((fn) => fn());
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(init);
    return init();
  }

  return init();
}
