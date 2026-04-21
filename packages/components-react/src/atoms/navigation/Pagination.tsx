/**
 * Pagination (Atom)
 *
 * Table pagination with page size selector and navigation controls.
 * HTML output mirrors the Astro component exactly.
 *
 * Performance optimizations:
 * - Static icons hoisted to module level (rendering-hoist-jsx)
 * - forwardRef for ref forwarding
 *
 * @see packages/css/src/components/navigation/pagination.css
 * @see packages/tokens/src/components/navigation/pagination.json
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

// ── Static Icons (hoisted) ────────────────────────────────
const IconChevronDown = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconFirst = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11 5L4 12L11 19M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPrev = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconNext = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLast = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13 5L20 12L13 19M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Pagination Props ──────────────────────────────────────
export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  currentPage: number;
  totalPages: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  loading?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

// ── Pagination Component ──────────────────────────────────
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (props, ref) => {
    const {
      currentPage,
      totalPages,
      pageSize = 10,
      pageSizeOptions = [10, 25, 50, 100],
      loading = false,
      onPageChange,
      onPageSizeChange,
      className,
      ...rest
    } = props;

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const isSinglePage = totalPages === 1;
    const isNoData = totalPages === 0;

    const disablePrev = isFirstPage || isSinglePage || isNoData || loading;
    const disableNext = isLastPage || isSinglePage || isNoData || loading;
    const disableSelect = isNoData || loading;

    const displayPage = isNoData ? 0 : currentPage;

    return (
      <div
        ref={ref}
        className={cn('pagination', loading && 'pagination--loading', className)}
        data-pagination
        data-current-page={displayPage}
        data-total-pages={totalPages}
        {...rest}
      >
        {/* Left — Records per page selector */}
        <div className="pagination__left">
          <span className="pagination__label">Registros por página</span>

          {loading ? (
            <div className="pagination__select pagination__select--skeleton" />
          ) : (
            <button
              type="button"
              className="pagination__select"
              disabled={disableSelect}
              data-page-size-select
              aria-label="Seleccionar registros por página"
              onClick={() => onPageSizeChange?.(pageSize)}
            >
              <span>{isNoData ? '0' : pageSize}</span>
              <div className="pagination__select-icon">
                {IconChevronDown}
              </div>
            </button>
          )}
        </div>

        {/* Center — Page info */}
        {loading ? (
          <div className="pagination__center pagination__center--skeleton" />
        ) : (
          <span className="pagination__center">
            {'Página '}
            <span data-page-current>{displayPage}</span>
            {' de '}
            <span data-page-total>{totalPages}</span>
          </span>
        )}

        {/* Right — Navigation buttons */}
        <nav className="pagination__nav" aria-label="Navegación de páginas">
          <button
            type="button"
            className="pagination__nav-button"
            disabled={disablePrev}
            data-nav-button="first"
            aria-label="Ir a la primera página"
            onClick={() => onPageChange?.(1)}
          >
            <div className="pagination__nav-button-icon">{IconFirst}</div>
          </button>

          <button
            type="button"
            className="pagination__nav-button"
            disabled={disablePrev}
            data-nav-button="prev"
            aria-label="Ir a la página anterior"
            onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
          >
            <div className="pagination__nav-button-icon">{IconPrev}</div>
          </button>

          <button
            type="button"
            className="pagination__nav-button"
            disabled={disableNext}
            data-nav-button="next"
            aria-label="Ir a la página siguiente"
            onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
          >
            <div className="pagination__nav-button-icon">{IconNext}</div>
          </button>

          <button
            type="button"
            className="pagination__nav-button"
            disabled={disableNext}
            data-nav-button="last"
            aria-label="Ir a la última página"
            onClick={() => onPageChange?.(totalPages)}
          >
            <div className="pagination__nav-button-icon">{IconLast}</div>
          </button>
        </nav>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
