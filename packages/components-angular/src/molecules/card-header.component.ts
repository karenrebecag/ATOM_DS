import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

/**
 * Header section of a Card with headline, supporting text, and action slot.
 *
 * @example
 * <atom-card-header headline="Card Title" supporting="Subtitle">
 *   <ng-container slot="avatar"><atom-avatar initials="AB"></atom-avatar></ng-container>
 *   <ng-container slot="action"><atom-icon-button ariaLabel="More">...</atom-icon-button></ng-container>
 * </atom-card-header>
 *
 * @see packages/css/src/components/card.css
 */
@Component({
  selector: 'atom-card-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <div class="card__header" data-card-header>
      <div class="card__header-avatar" data-card-avatar>
        <ng-content select="[slot=avatar]" />
      </div>
      <div class="card__header-text">
        @if (headline()) {
          <span class="card__header-headline" data-card-headline>{{ headline() }}</span>
        }
        @if (supporting()) {
          <span class="card__header-supporting" data-card-supporting>{{ supporting() }}</span>
        }
      </div>
      <div class="card__header-action" data-card-action>
        <ng-content select="[slot=action]" />
      </div>
      <ng-content />
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class CardHeaderComponent {
  headline = input<string>();
  supporting = input<string>();
  customClass = input<string>('', { alias: 'class' });
}
