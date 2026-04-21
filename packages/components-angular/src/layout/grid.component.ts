import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type GapSize = 'xs' | 's' | 'm' | 'l' | 'xl';

@Component({
  selector: 'atom-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'customClass() || null' },
  template: `
    <div [class]="classes()" data-grid>
      <ng-content />
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class GridComponent {
  columns = input<number | string>(3);
  gap = input<GapSize>('m');
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() =>
    ['grid', `grid--cols-${this.columns()}`, `grid--gap-${this.gap()}`].join(' ')
  );
}
