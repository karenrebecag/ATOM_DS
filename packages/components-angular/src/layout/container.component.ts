import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Max-width centered layout container with responsive sizing.
 *
 * @example
 * <atom-container size="lg">
 *   <h1>Page Content</h1>
 * </atom-container>
 */
@Component({
  selector: 'atom-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-container]': '""',
    '[attr.data-size]': 'size()',
  },
  template: `<ng-content />`,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class ContainerComponent {
  size = input<'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'>('lg');
  noPadding = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });

  hostClasses = computed(() => {
    const classes = [
      'container',
      `container--${this.size()}`,
    ];
    if (this.noPadding()) classes.push('container--no-padding');
    if (this.customClass()) classes.push(this.customClass());
    return classes.join(' ');
  });
}
