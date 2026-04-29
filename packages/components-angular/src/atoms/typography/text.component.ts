import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type TextSize = 'body' | 'caption' | 'label' | 'label-small' | 'footnote';
export type TextWeight = 'regular' | 'medium' | 'bold';
export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'inherit';
export type TextAlign = 'left' | 'center' | 'right';
export type TextElement = 'p' | 'span' | 'div';

/**
 * A flexible text component for body copy, captions, labels, and footnotes.
 * Supports polymorphic rendering as p, span, or div.
 *
 * @example
 * <atom-text size="body" weight="regular">Hello world</atom-text>
 * <atom-text as="span" size="caption" color="secondary">Caption</atom-text>
 *
 * @see packages/css/src/foundation/typography.css
 */
@Component({
  selector: 'atom-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    @switch (element()) {
      @case ('span') {
        <span [class]="classes()" data-text><ng-content /></span>
      }
      @case ('div') {
        <div [class]="classes()" data-text><ng-content /></div>
      }
      @default {
        <p [class]="classes()" data-text><ng-content /></p>
      }
    }
  `,
  styles: [`:host { display: block; }`],
})
export class TextComponent {
  size = input<TextSize>('body');
  weight = input<TextWeight>('regular');
  color = input<TextColor>('primary');
  align = input<TextAlign>();
  truncate = input<boolean>(false);
  element = input<TextElement>('p', { alias: 'as' });
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() => {
    const c = [
      'text',
      `text--${this.size()}`,
      `text--${this.weight()}`,
      `text--${this.color()}`,
    ];
    const a = this.align();
    if (a) c.push(`text--${a}`);
    if (this.truncate()) c.push('text--truncate');
    return c.join(' ');
  });
}
