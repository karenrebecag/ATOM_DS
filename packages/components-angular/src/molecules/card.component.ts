import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

/**
 * Composable card container with header, body, and footer subcomponents.
 *
 * @example
 * <atom-card>
 *   <atom-card-header headline="Title"></atom-card-header>
 *   <atom-card-body text="Some content"></atom-card-body>
 *   <atom-card-footer>
 *     <atom-button variant="Primary">Action</atom-button>
 *   </atom-card-footer>
 * </atom-card>
 *
 * @see packages/css/src/components/card.css
 */
@Component({
  selector: 'atom-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <div class="card" data-card>
      <ng-content />
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class CardComponent {
  customClass = input<string>('', { alias: 'class' });
}
