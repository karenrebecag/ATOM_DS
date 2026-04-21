import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type CardFooterVariant = 'buttons' | 'tags';

/**
 * Footer section of a Card with buttons or tags variant.
 *
 * @example
 * <atom-card-footer variant="buttons">
 *   <atom-button variant="Primary">Save</atom-button>
 *   <atom-button variant="Secondary">Cancel</atom-button>
 * </atom-card-footer>
 *
 * @see packages/css/src/components/card.css
 */
@Component({
  selector: 'atom-card-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <div
      [class]="classes()"
      data-card-footer
      [attr.data-card-footer-variant]="variant()"
    >
      <ng-content />
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class CardFooterComponent {
  variant = input<CardFooterVariant>('buttons');
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() => {
    return ['card__footer', `card__footer--${this.variant()}`].join(' ');
  });
}
