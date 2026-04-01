import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Vertical flex layout with gap control and alignment options.
 *
 * @example
 * <atom-stack gap="m" align="start">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </atom-stack>
 */
@Component({
  selector: 'atom-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-stack]': '""',
    '[attr.data-gap]': 'gap()',
  },
  template: `<ng-content />`,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
    }
  `],
})
export class StackComponent {
  gap = input<'none' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl'>('m');
  align = input<'start' | 'center' | 'end' | 'stretch'>('stretch');
  justify = input<'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'>('start');
  fullWidth = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });

  hostClasses = computed(() => {
    const classes = [
      'stack',
      `stack--gap-${this.gap()}`,
      `stack--align-${this.align()}`,
      `stack--justify-${this.justify()}`,
    ];
    if (this.fullWidth()) classes.push('stack--full-width');
    if (this.customClass()) classes.push(this.customClass());
    return classes.join(' ');
  });
}
