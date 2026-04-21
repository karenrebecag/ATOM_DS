import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize =
  | 'display-xl'
  | 'display-l'
  | 'display-m'
  | 'display-s'
  | 'heading-xl'
  | 'heading-l'
  | 'heading-m'
  | 'heading-s'
  | 'heading';
export type HeadingWeight = 'regular' | 'medium' | 'bold';
export type HeadingTracking = 'tight' | 'normal';
export type HeadingAlign = 'left' | 'center' | 'right';

/**
 * Semantic heading component that renders h1-h6 based on level prop.
 *
 * @example
 * <atom-heading [level]="1" size="display-xl" weight="bold">Welcome</atom-heading>
 *
 * @see packages/css/src/foundation/typography.css
 */
@Component({
  selector: 'atom-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    @switch (level()) {
      @case (1) {
        <h1 [class]="classes()" data-text><ng-content /></h1>
      }
      @case (2) {
        <h2 [class]="classes()" data-text><ng-content /></h2>
      }
      @case (3) {
        <h3 [class]="classes()" data-text><ng-content /></h3>
      }
      @case (4) {
        <h4 [class]="classes()" data-text><ng-content /></h4>
      }
      @case (5) {
        <h5 [class]="classes()" data-text><ng-content /></h5>
      }
      @case (6) {
        <h6 [class]="classes()" data-text><ng-content /></h6>
      }
    }
  `,
  styles: [`:host { display: block; }`],
})
export class HeadingComponent {
  level = input<HeadingLevel>(2);
  size = input<HeadingSize>('heading-l');
  weight = input<HeadingWeight>('bold');
  tracking = input<HeadingTracking>('normal');
  align = input<HeadingAlign>();
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() => {
    const c = [
      'heading',
      `heading--${this.size()}`,
      `heading--${this.weight()}`,
      `heading--${this.tracking()}`,
    ];
    const a = this.align();
    if (a) c.push(`heading--${a}`);
    return c.join(' ');
  });
}
