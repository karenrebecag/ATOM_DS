import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type ContainerSize = 'default' | 'medium' | 'small';

/**
 * Constrains content width with responsive max-width variants.
 *
 * @example
 * <atom-container size="default">
 *   <p>Centered content</p>
 * </atom-container>
 *
 * @see packages/css/src/layout/container.css
 */
@Component({
  selector: 'atom-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <div [class]="classes()" data-container [attr.data-size]="size()">
      <ng-content />
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class ContainerComponent {
  size = input<ContainerSize>('default');
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() => {
    const c = ['container'];
    const s = this.size();
    if (s !== 'default') c.push(`container--${s}`);
    return c.join(' ');
  });
}
