/**
 * SearchField (Atom)
 *
 * Search input with keyboard shortcut display and clear button.
 * HTML output mirrors the Astro component exactly.
 *
 * Performance optimizations:
 * - Static icons hoisted to module level (rendering-hoist-jsx)
 * - forwardRef for ref forwarding
 *
 * @see packages/css/src/components/forms/search-field.css
 * @see packages/tokens/src/components/forms/search-field.json
 */

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

// ── Static Icons (hoisted) ────────────────────────────────
const SearchSVG = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    />
    <path d="M14 14L11.1 11.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClearSVG = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
      fill="currentColor"
    />
    <path d="M10 6L6 10M6 6L10 10" />
  </svg>
);

// ── SearchField Props ─────────────────────────────────────
export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  name: string;
  size?: 's' | 'm' | 'l';
  shortcut?: string;
  showClear?: boolean;
  onClear?: () => void;
  id?: string;
}

// ── SearchField Component ─────────────────────────────────
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (props, ref) => {
    const {
      name,
      placeholder = 'Search...',
      value,
      size = 'm',
      disabled = false,
      shortcut = '⌘K',
      showClear = true,
      onClear,
      id,
      className,
      onChange,
      ...rest
    } = props;

    const inputId = id || `search-field-${name}`;
    const isFilled = value !== undefined && value !== '';

    return (
      <div
        className={cn('search-field', `search-field--${size}`, isFilled && 'search-field--filled', className)}
        data-search-field
      >
        <div className="search-field__field">
          {/* Leading — search icon */}
          <div className="search-field__leading">
            <div className="search-field__icon" aria-hidden="true">
              {SearchSVG}
            </div>
          </div>

          {/* Input */}
          <input
            ref={ref}
            className="search-field__input"
            type="search"
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            autoComplete="off"
            onChange={onChange}
            {...rest}
          />

          {/* Trailing — shortcut or clear button */}
          <div className="search-field__trailing">
            {shortcut && (
              <span className="search-field__shortcut" aria-label="Keyboard shortcut">
                {shortcut}
              </span>
            )}
            {showClear && (
              <button
                className="search-field__clear"
                type="button"
                aria-label="Clear search"
                data-clear-button
                onClick={onClear}
              >
                {ClearSVG}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

SearchField.displayName = 'SearchField';
