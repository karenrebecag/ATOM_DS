import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export type SearchFieldSize = 's' | 'm' | 'l';

/**
 * Search input with clear button support.
 *
 * @example
 * <atom-search-field name="q" placeholder="Search..." [value]="query" (cleared)="onClear()"></atom-search-field>
 *
 * @see packages/css/src/components/search-field.css
 */
@Component({
  selector: 'atom-search-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    @let filled = isFilled();

    <div [class]="classes()" data-search-field>
      <span class="search-field__search-icon" aria-hidden="true"></span>
      <input
        [name]="name()"
        type="search"
        class="search-field__input"
        [placeholder]="placeholder()"
        [value]="value()"
        [disabled]="disabled()"
        role="searchbox"
        (input)="inputChanged.emit($event)"
      />
      @if (filled) {
        <button
          type="button"
          class="search-field__clear"
          aria-label="Clear search"
          (click)="cleared.emit()"
        >
          <span class="search-field__clear-icon" aria-hidden="true"></span>
        </button>
      }
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class SearchFieldComponent {
  name = input.required<string>();
  placeholder = input<string>('Search...');
  value = input<string>('');
  size = input<SearchFieldSize>('m');
  disabled = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });
  inputChanged = output<Event>();
  cleared = output<void>();

  isFilled = computed(() => {
    const v = this.value();
    return v !== undefined && v !== '';
  });

  classes = computed(() => {
    const c = [
      'search-field',
      `search-field--${this.size()}`,
    ];
    if (this.isFilled()) c.push('search-field--filled');
    return c.join(' ');
  });
}
