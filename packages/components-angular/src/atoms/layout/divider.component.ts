import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * A visual separator for horizontal or vertical content division.
 *
 * @example
 * <atom-divider orientation="horizontal"></atom-divider>
 *
 * @see packages/css/src/components/divider.css
 */
@Component({
  selector: 'atom-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <hr
      [class]="classes()"
      [attr.aria-orientation]="orientation()"
    />
  `,
  styles: [`:host { display: block; }`],
})
export class DividerComponent {
  orientation = input<DividerOrientation>('horizontal');
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() => {
    return ['divider', `divider--${this.orientation()}`].join(' ');
  });
}
