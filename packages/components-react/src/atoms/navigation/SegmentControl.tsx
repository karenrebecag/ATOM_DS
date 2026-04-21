/**
 * SegmentControl (Atom)
 *
 * Tabbed selection control with icon, label and info support.
 * HTML output mirrors the Astro component exactly.
 *
 * Performance optimizations:
 * - forwardRef for ref forwarding
 * - No inline component definitions (rerender-no-inline-components)
 *
 * @see packages/css/src/components/navigation/segment-control.css
 * @see packages/tokens/src/components/navigation/segment-control.json
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

// ── SegmentControl Item ───────────────────────────────────
export interface SegmentControlItem {
  label?: string;
  icon?: ReactNode;
  info?: ReactNode;
  disabled?: boolean;
}

// ── SegmentControl Props ──────────────────────────────────
export interface SegmentControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: SegmentControlItem[];
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  selectedIndex?: number;
  disabled?: boolean;
  name?: string;
  onChange?: (index: number) => void;
}

// ── SegmentControl Component ──────────────────────────────
export const SegmentControl = forwardRef<HTMLDivElement, SegmentControlProps>(
  (props, ref) => {
    const {
      items,
      size = 'm',
      selectedIndex = 0,
      disabled = false,
      name,
      onChange,
      className,
      ...rest
    } = props;

    return (
      <div
        ref={ref}
        className={cn('segment-control', `segment-control--${size}`, className)}
        role="tablist"
        aria-label={name}
        data-segment-control
        {...rest}
      >
        {items.map((item, index) => {
          const isSelected = index === selectedIndex;
          const isDisabled = disabled || !!item.disabled;

          return (
            <button
              key={index}
              type="button"
              className={cn(
                'segment-control__item',
                isSelected && 'segment-control__item--selected',
                isDisabled && 'segment-control__item--disabled'
              )}
              role="tab"
              aria-selected={isSelected}
              aria-disabled={isDisabled || undefined}
              data-segment-index={index}
              disabled={isDisabled}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => {
                if (!isDisabled) onChange?.(index);
              }}
            >
              <div className="segment-control__content">
                {item.icon && (
                  <span className="segment-control__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {item.label && (
                  <span className="segment-control__label">{item.label}</span>
                )}
                {item.info && (
                  <span className="segment-control__info" aria-hidden="true">
                    {item.info}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  }
);

SegmentControl.displayName = 'SegmentControl';
