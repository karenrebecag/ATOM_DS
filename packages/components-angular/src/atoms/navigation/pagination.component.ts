import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

/**
 * Table pagination with page size selector and navigation controls.
 *
 * @example
 * <atom-pagination
 *   [currentPage]="1"
 *   [totalPages]="10"
 *   [pageSize]="25"
 *   (pageChanged)="onPage($event)"
 *   (pageSizeChanged)="onPageSize($event)"
 * ></atom-pagination>
 *
 * @see packages/css/src/components/pagination.css
 */
@Component({
  selector: 'atom-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    @let first = isFirstPage();
    @let last = isLastPage();
    @let isLoading = loading();

    <nav
      [class]="classes()"
      data-pagination
      aria-label="Pagination"
      [attr.aria-busy]="isLoading ? 'true' : null"
    >
      @if (pageSizeOptions().length > 0) {
        <div class="pagination__page-size">
          <label class="pagination__page-size-label" for="pagination-page-size">
            Rows per page
          </label>
          <select
            id="pagination-page-size"
            class="pagination__page-size-select"
            [value]="pageSize()"
            [disabled]="isLoading"
            (change)="onPageSizeSelect($event)"
          >
            @for (option of pageSizeOptions(); track option) {
              <option [value]="option">{{ option }}</option>
            }
          </select>
        </div>
      }
      <span class="pagination__info" aria-live="polite">
        Page {{ currentPage() }} of {{ totalPages() }}
      </span>
      <div class="pagination__controls">
        <button
          type="button"
          class="pagination__button pagination__button--prev"
          [disabled]="first || isLoading"
          aria-label="Previous page"
          (click)="pageChanged.emit(currentPage() - 1)"
        >
          <span class="pagination__icon pagination__icon--prev" aria-hidden="true"></span>
        </button>
        <button
          type="button"
          class="pagination__button pagination__button--next"
          [disabled]="last || isLoading"
          aria-label="Next page"
          (click)="pageChanged.emit(currentPage() + 1)"
        >
          <span class="pagination__icon pagination__icon--next" aria-hidden="true"></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`:host { display: block; }`],
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageSize = input<number>(10);
  pageSizeOptions = input<number[]>([10, 25, 50, 100]);
  loading = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });
  pageChanged = output<number>();
  pageSizeChanged = output<number>();

  isFirstPage = computed(() => this.currentPage() <= 1);
  isLastPage = computed(() => this.currentPage() >= this.totalPages());

  classes = computed(() => {
    const c = ['pagination'];
    if (this.loading()) c.push('pagination--loading');
    return c.join(' ');
  });

  onPageSizeSelect(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChanged.emit(value);
  }
}
