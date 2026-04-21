import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';

export interface AccordionItem {
  title: string;
  content: string;
  open?: boolean;
  id?: string;
}

/**
 * Expandable content panels with CSS grid animation.
 * Supports single-open (close siblings) and multi-open modes.
 *
 * @example
 * <atom-accordion [items]="faqItems" [closeSiblings]="true"></atom-accordion>
 *
 * @see packages/css/src/components/accordion.css
 */
@Component({
  selector: 'atom-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <div
      [class]="classes()"
      data-accordion
      [attr.data-accordion-close-siblings]="closeSiblings() || null"
    >
      <div class="accordion__list">
        @for (item of items(); track item.id || $index) {
          @let isOpen = openMap()[$index] === true;
          @let headerId = (item.id || 'accordion-' + $index) + '-header';
          @let bodyId = (item.id || 'accordion-' + $index) + '-body';

          <div
            class="accordion__item"
            [attr.data-accordion-status]="isOpen ? 'open' : 'closed'"
          >
            <div
              class="accordion__header"
              role="button"
              tabindex="0"
              [attr.aria-expanded]="isOpen"
              [attr.aria-controls]="bodyId"
              [id]="headerId"
              data-accordion-toggle
              (click)="toggle($index)"
              (keydown.enter)="toggle($index)"
              (keydown.space)="toggle($index); $event.preventDefault()"
            >
              <span class="accordion__title">{{ item.title }}</span>
              <svg
                class="accordion__icon"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </div>
            <div
              class="accordion__body"
              [id]="bodyId"
              role="region"
              [attr.aria-labelledby]="headerId"
            >
              <div class="accordion__body-wrap">
                <div class="accordion__body-content">{{ item.content }}</div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class AccordionComponent {
  items = input.required<AccordionItem[]>();
  closeSiblings = input<boolean>(true);
  customClass = input<string>('', { alias: 'class' });

  openMap = signal<Record<number, boolean>>({});

  constructor() {
    // Initialize open state from items after they're available
    // This is handled lazily on first toggle if needed
  }

  classes = computed(() => {
    return 'accordion';
  });

  toggle(index: number): void {
    const current = this.openMap();
    if (this.closeSiblings()) {
      this.openMap.set(current[index] ? {} : { [index]: true });
    } else {
      this.openMap.set({ ...current, [index]: !current[index] });
    }
  }
}
