/**
 * Text (Atom)
 *
 * Body text component with truncation and animation support.
 * Polymorphic component that can render as different HTML elements.
 *
 * Performance optimizations:
 * - Polymorphic rendering without inline components
 * - Style computation only when needed
 *
 * @see packages/css/src/components/text.css
 * @see packages/tokens/src/components/text.json
 */

import { forwardRef, type ElementType, type HTMLAttributes, type CSSProperties } from 'react';
import type { TextSize, TextWeight, TextAlign } from '../types';
import { cn } from '../utils/cn';

type TextElement = 'p' | 'span' | 'div' | 'li';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  color?: string;
  align?: TextAlign;
  truncate?: boolean | number;
  balance?: boolean;
  animate?: 'masked-lines' | 'masked-words' | 'fade-up-load' | 'scramble-load' | 'scramble-scroll' | 'highlight-scroll' | false;
  trigger?: 'scroll' | 'load';
  delay?: number;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as = 'p',
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
    const Tag = as as ElementType;

    // Build inline styles
    const inlineStyle: CSSProperties = {
      ...(typeof truncate === 'number' && { '--text-clamp-lines': truncate } as CSSProperties),
      ...(color !== 'inherit' && { color }),
      ...style,
    };

    const classes = cn(
      'text',
      `text--${size}`,
      `text--${weight}`,
      `text--${align}`,
      truncate === true && 'text--truncate',
      typeof truncate === 'number' && 'text--clamp',
      balance && 'text--balance',
      className
    );

    return (
      <Tag
        ref={ref}
        className={classes}
        style={inlineStyle}
        data-text
        data-text-animate={animate || undefined}
        data-text-trigger={animate ? trigger : undefined}
        data-text-split="lines"
        data-text-delay={delay > 0 ? delay.toString() : undefined}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);

Text.displayName = 'Text';
