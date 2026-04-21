import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type InlineGapSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type InlineAlignment = 'start' | 'center' | 'end' | 'stretch';

@Component({
  selector: 'atom-inline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'customClass() || null' },
  template: `
    <div [class]="classes()" data-inline>
      <ng-content />
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class InlineComponent {
  gap = input<InlineGapSize>('m');
  align = input<InlineAlignment>('start');
  wrap = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() => {
    const c = ['inline', `inline--gap-${this.gap()}`, `inline--align-${this.align()}`];
    if (this.wrap()) c.push('inline--wrap');
    return c.join(' ');
  });
}
