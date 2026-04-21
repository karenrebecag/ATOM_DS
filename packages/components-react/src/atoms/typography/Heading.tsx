/**
 * Heading (Atom)
 *
 * Semantic heading component with level/size decoupling.
 * HTML level (h1-h6) can be independent from visual size.
 * HTML output mirrors the Astro component exactly.
 *
 * @see packages/css/src/components/typography/heading.css
 * @see packages/components-astro/src/atoms/typography/Heading.astro
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

// ── Types ─────────────────────────────────────────────────
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingSize =
  | 'display-xl' | 'display-l' | 'display-m' | 'display-s'
  | 'huge-title' | 'h1' | 'h2' | 'h3' | 'h4' | 'heading';

export type HeadingWeight = 'regular' | 'medium' | 'bold';

export type HeadingTracking =
  | 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

export type HeadingAlign = 'left' | 'center' | 'right';

export type HeadingColor =
  | 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'inherit';

export type HeadingAnimate =
  | 'masked-lines' | 'masked-words' | 'masked-chars'
  | 'scramble-load' | 'fade-up-load' | 'scramble-scroll' | 'highlight-scroll';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  size?: HeadingSize;
  weight?: HeadingWeight;
  tracking?: HeadingTracking;
  color?: HeadingColor | `var(--${string})`;
  align?: HeadingAlign;
  balance?: boolean;
  animate?: HeadingAnimate | false;
  trigger?: 'scroll' | 'load';
  delay?: number;
}

// ── Level → size auto-map ─────────────────────────────────
const DEFAULT_SIZE: Record<HeadingLevel, HeadingSize> = {
  1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'heading', 6: 'heading',
};

// ── Animate → split-type map ──────────────────────────────
const SPLIT_MAP: Partial<Record<HeadingAnimate, string>> = {
  'masked-chars': 'chars',
  'masked-words': 'words',
  'masked-lines': 'lines',
};

const SEMANTIC_COLORS = new Set(['primary', 'secondary', 'tertiary', 'disabled']);

// ── Component ─────────────────────────────────────────────
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 2,
      size,
      weight = 'bold',
      tracking = 'tight',
      color = 'inherit',
      align = 'left',
      balance = false,
      animate = false,
      trigger = 'scroll',
      delay = 0,
      className,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const Tag = `h${level}` as const;
    const resolvedSize = size ?? DEFAULT_SIZE[level];

    const isSemanticColor = SEMANTIC_COLORS.has(color as string);
    const isVarColor = typeof color === 'string' && color.startsWith('var(--');

    const inlineStyle = isVarColor
      ? { color, ...style }
      : style;

    return (
      <Tag
        ref={ref}
        className={cn(
          'heading',
          `heading--${resolvedSize}`,
          `heading--${weight}`,
          `heading--${tracking}`,
          `heading--${align}`,
          balance && 'heading--balance',
          isSemanticColor && `heading--${color}`,
          className
        )}
        style={inlineStyle}
        data-text
        data-text-animate={animate || undefined}
        data-text-trigger={animate ? trigger : undefined}
        data-text-split={animate ? (SPLIT_MAP[animate as HeadingAnimate] ?? undefined) : undefined}
        data-text-delay={delay > 0 ? String(delay) : undefined}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';
