import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type GapSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type Alignment = 'start' | 'center' | 'end' | 'stretch';

/**
 * Vertical stack layout with configurable gap and alignment.
 *
 * @example
 * <atom-stack gap="m" align="center">
 *   <p>Item 1</p>
 *   <p>Item 2</p>
 * </atom-stack>
 *
 * @see packages/css/src/layout/stack.css
 */
@Component({
  selector: 'atom-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <div [class]="classes()" data-stack [attr.data-gap]="gap()">
      <ng-content />
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class StackComponent {
  gap = input<GapSize>('m');
  align = input<Alignment>();
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() => {
    const c = ['stack', `stack--gap-${this.gap()}`];
    const a = this.align();
    if (a) c.push(`stack--align-${a}`);
    return c.join(' ');
  });
}
