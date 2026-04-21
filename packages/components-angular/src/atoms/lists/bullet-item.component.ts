import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

/**
 * A list item for unordered bullet lists.
 *
 * @example
 * <ul>
 *   <atom-bullet-item>First item</atom-bullet-item>
 *   <atom-bullet-item>Second item</atom-bullet-item>
 * </ul>
 *
 * @see packages/css/src/components/lists.css
 */
@Component({
  selector: 'atom-bullet-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <li class="bullet-item">
      <ng-content />
    </li>
  `,
  styles: [`:host { display: list-item; }`],
})
export class BulletItemComponent {
  customClass = input<string>('', { alias: 'class' });
}
