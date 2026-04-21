/**
 * Section (Layout)
 *
 * Semantic section wrapper for page content blocks.
 *
 * @see packages/css/src/layout/section.css
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

// ── Types ────────────────────────────────────────────────
export interface SectionProps extends HTMLAttributes<HTMLElement> {}

// ── Section Component ────────────────────────────────────
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = cn('section', className);

    return (
      <section ref={ref} className={classes} data-section {...rest}>
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
