import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type EmptyStateSize = 's' | 'm';

/**
 * A placeholder component for empty content areas.
 * Displays heading, supporting text, optional result text, and action slots.
 *
 * @example
 * <atom-empty-state heading="No results" supportingText="Try a different search.">
 *   <atom-button variant="Secondary">Reset filters</atom-button>
 * </atom-empty-state>
 *
 * @see packages/css/src/components/empty-state.css
 */
@Component({
  selector: 'atom-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <div [class]="classes()">
      <ng-content select="[slot=icon]" />
      @if (heading()) {
        <h3 class="empty-state__heading">{{ heading() }}</h3>
      }
      @if (supportingText()) {
        <p class="empty-state__supporting-text">{{ supportingText() }}</p>
      }
      @if (resultText()) {
        <p class="empty-state__result-text">{{ resultText() }}</p>
      }
      <div class="empty-state__actions">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class EmptyStateComponent {
  size = input<EmptyStateSize>('m');
  heading = input<string>();
  supportingText = input<string>();
  resultText = input<string>();
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() => {
    return ['empty-state', `empty-state--${this.size()}`].join(' ');
  });
}
