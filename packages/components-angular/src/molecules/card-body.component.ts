import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

/**
 * Body section of a Card with headline, subhead, text, and custom content.
 *
 * @example
 * <atom-card-body headline="Title" subhead="Subtitle" text="Body text"></atom-card-body>
 *
 * @see packages/css/src/components/card.css
 */
@Component({
  selector: 'atom-card-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <div class="card__body" data-card-body>
      @if (headline()) {
        <span class="card__body-headline" data-card-body-headline>{{ headline() }}</span>
      }
      @if (subhead()) {
        <span class="card__body-subhead" data-card-body-subhead>{{ subhead() }}</span>
      }
      @if (text()) {
        <p class="card__body-text" data-card-body-text>{{ text() }}</p>
      }
      <ng-content />
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class CardBodyComponent {
  headline = input<string>();
  subhead = input<string>();
  text = input<string>();
  customClass = input<string>('', { alias: 'class' });
}
