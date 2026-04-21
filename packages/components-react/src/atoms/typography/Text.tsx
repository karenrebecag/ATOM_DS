/**
 * Text (Atom)
 *
 * Body text component with truncation and animation support.
 * Flexible element type (p, span, div, li) with responsive text control.
 * HTML output mirrors the Astro component exactly.
 *
 * @see packages/css/src/components/typography/text.css
 * @see packages/components-astro/src/atoms/typography/Text.astro
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

// ── Types ─────────────────────────────────────────────────
export type TextSize = 'body' | 'caption' | 'label' | 'label-small' | 'footnote';
export type TextWeight = 'regular' | 'medium' | 'bold';
export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'inherit';
export type TextAlign = 'left' | 'center' | 'right';
export type TextElement = 'p' | 'span' | 'div' | 'li';

export type TextAnimate =
  | 'masked-lines' | 'masked-words' | 'fade-up-load'
  | 'scramble-load' | 'scramble-scroll' | 'highlight-scroll';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor | `var(--${string})`;
  align?: TextAlign;
  /** true → single-line ellipsis. number → multi-line clamp */
  truncate?: boolean | number;
  balance?: boolean;
  animate?: TextAnimate | false;
  trigger?: 'scroll' | 'load';
  delay?: number;
}

const SEMANTIC_COLORS = new Set(['primary', 'secondary', 'tertiary', 'disabled']);

// ── Component ─────────────────────────────────────────────
export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Tag = 'p',
      size = 'body',
      weight = 'regular',
      color = 'inherit',
      align = 'left',
      truncate = false,
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
    const isSemanticColor = SEMANTIC_COLORS.has(color as string);
    const isVarColor = typeof color === 'string' && color.startsWith('var(--');
    const isClamp = typeof truncate === 'number';
    const isTruncate = truncate === true;

    const clampStyle = isClamp ? { '--text-clamp-lines': truncate } : undefined;
    const colorStyle = isVarColor ? { color } : undefined;
    const inlineStyle = { ...clampStyle, ...colorStyle, ...style } as React.CSSProperties;

    return (
      <Tag
        ref={ref as never}
        className={cn(
          'text',
          `text--${size}`,
          `text--${weight}`,
          `text--${align}`,
          isSemanticColor && `text--${color}`,
          isTruncate && 'text--truncate',
          isClamp && 'text--clamp',
          balance && 'text--balance',
          className
        )}
        style={Object.keys(inlineStyle).length ? inlineStyle : undefined}
        data-text
        data-text-animate={animate || undefined}
        data-text-trigger={animate ? trigger : undefined}
        data-text-split="lines"
        data-text-delay={delay > 0 ? String(delay) : undefined}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);

Text.displayName = 'Text';
