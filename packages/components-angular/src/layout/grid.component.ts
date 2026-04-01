import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * CSS Grid layout with responsive columns and gap control.
 *
 * @example
 * <atom-grid columns="3" gap="l">
 *   <div>Card 1</div>
 *   <div>Card 2</div>
 * </atom-grid>
 *
 * <atom-grid columns="auto-fit" gap="m" minColumnWidth="250px">
 *   <atom-product-card />
 * </atom-grid>
 */
@Component({
  selector: 'atom-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-grid]': '""',
    '[attr.data-columns]': 'columns()',
  },
  template: `<ng-content />`,
  styles: [`
    :host {
      display: grid;
    }
  `],
})
export class GridComponent {
  columns = input<1 | 2 | 3 | 4 | 5 | 6 | 'auto-fit'>(3);
  gap = input<'none' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl'>('m');
  minColumnWidth = input<string>('250px');
  alignItems = input<'start' | 'center' | 'end' | 'stretch'>('stretch');
  justifyItems = input<'start' | 'center' | 'end' | 'stretch'>('start');
  customClass = input<string>('', { alias: 'class' });

  hostClasses = computed(() => {
    const classes = [
      'grid',
      `grid--gap-${this.gap()}`,
      `grid--align-${this.alignItems()}`,
      `grid--justify-${this.justifyItems()}`,
    ];
    if (this.columns() === 'auto-fit') {
      classes.push('grid--auto-fit');
    } else {
      classes.push(`grid--cols-${this.columns()}`);
    }
    if (this.customClass()) classes.push(this.customClass());
    return classes.join(' ');
  });
}
