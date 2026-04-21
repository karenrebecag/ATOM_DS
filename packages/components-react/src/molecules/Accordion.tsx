/**
 * Accordion (Molecule)
 *
 * CSS-driven expand/collapse via grid-template-rows.
 * State managed in React — no dependency on initAccordion().
 * HTML structure matches Astro component 1:1.
 *
 * CSS contract:
 *   [data-accordion-status="active"]   → expanded
 *   [data-accordion-status="not-active"] → collapsed
 *
 * @see packages/css/src/components/containers/accordion.css
 * @see packages/components-astro/src/molecules/Accordion.astro
 */

import { forwardRef, useState, useId, useCallback, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface AccordionItem {
  title: string;
  content: ReactNode;
  open?: boolean;
  id?: string;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  closeSiblings?: boolean;
}

// Hoisted — matches Astro's SVG exactly
const ChevronIcon = (
  <div className="accordion__icon" aria-hidden="true">
    <svg
      className="accordion__icon-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M28.5 22.5L18 12L7.5 22.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
    </svg>
  </div>
);

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, closeSiblings = true, className, ...rest }, ref) => {
    const uid = useId();

    const [openMap, setOpenMap] = useState<Record<number, boolean>>(() => {
      const map: Record<number, boolean> = {};
      items.forEach((item, i) => { if (item.open) map[i] = true; });
      return map;
    });

    const handleToggle = useCallback((index: number) => {
      setOpenMap((prev) => {
        if (closeSiblings) return prev[index] ? {} : { [index]: true };
        return { ...prev, [index]: !prev[index] };
      });
    }, [closeSiblings]);

    const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle(index);
      }
    }, [handleToggle]);

    return (
      <div
        ref={ref}
        className={cn('accordion', className)}
        data-accordion
        data-accordion-close-siblings={closeSiblings.toString()}
        {...rest}
      >
        <ul className="accordion__list">
          {items.map((item, index) => {
            const isOpen = !!openMap[index];
            const itemId = item.id ?? `accordion-${uid}-${index}`;
            const bodyId = `${itemId}-body`;

            return (
              <li
                key={itemId}
                className="accordion__item"
                data-accordion-status={isOpen ? 'active' : 'not-active'}
                id={itemId}
              >
                <div
                  className="accordion__header"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-controls={bodyId}
                  data-accordion-toggle
                  onClick={() => handleToggle(index)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                >
                  <h3 className="accordion__title">{item.title}</h3>
                  {ChevronIcon}
                </div>
                <div
                  className="accordion__body"
                  id={bodyId}
                  role="region"
                  aria-labelledby={itemId}
                >
                  <div className="accordion__body-wrap">
                    <div className="accordion__body-content">
                      {typeof item.content === 'string'
                        ? <p>{item.content}</p>
                        : item.content}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
