import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type TagVariant = 'filled' | 'outlined';
export type TagColor = 'default' | 'info' | 'success' | 'warning' | 'error';
export type TagSize = 's' | 'm' | 'l';

/**
 * A non-interactive label for categorization and metadata display.
 *
 * @example
 * <atom-tag variant="filled" color="success" size="m">Active</atom-tag>
 *
 * @see packages/css/src/components/tag.css
 */
@Component({
  selector: 'atom-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <span [class]="classes()" data-tag>
      <ng-content />
    </span>
  `,
  styles: [`:host { display: inline-block; }`],
})
export class TagComponent {
  variant = input<TagVariant>('filled');
  color = input<TagColor>('default');
  size = input<TagSize>('m');
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() => {
    return [
      'tag',
      `tag--${this.variant()}`,
      `tag--${this.color()}`,
      `tag--${this.size()}`,
    ].join(' ');
  });
}
