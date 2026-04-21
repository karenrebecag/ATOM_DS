import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

/**
 * A list item for ordered numbered lists.
 *
 * @example
 * <ol>
 *   <atom-number-item [number]="1">First step</atom-number-item>
 *   <atom-number-item [number]="2">Second step</atom-number-item>
 * </ol>
 *
 * @see packages/css/src/components/lists.css
 */
@Component({
  selector: 'atom-number-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <li class="number-item" [attr.data-number]="number()">
      <ng-content />
    </li>
  `,
  styles: [`:host { display: list-item; }`],
})
export class NumberItemComponent {
  number = input.required<number>();
  customClass = input<string>('', { alias: 'class' });
}
