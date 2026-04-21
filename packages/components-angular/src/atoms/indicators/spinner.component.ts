import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type SpinnerSize = 's' | 'm' | 'l';
export type SpinnerColor = 'primary' | 'inverse';

/**
 * A loading indicator with size and color variants.
 *
 * @example
 * <atom-spinner size="m" color="primary"></atom-spinner>
 *
 * @see packages/css/src/components/spinner.css
 */
@Component({
  selector: 'atom-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <span
      [class]="classes()"
      data-spinner
      role="status"
      aria-label="Loading"
    ></span>
  `,
  styles: [`:host { display: inline-block; }`],
})
export class SpinnerComponent {
  size = input<SpinnerSize>('m');
  color = input<SpinnerColor>('primary');
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() => {
    return [
      'spinner',
      `spinner--${this.size()}`,
      `spinner--${this.color()}`,
    ].join(' ');
  });
}
