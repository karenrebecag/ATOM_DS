import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type MarqueeVariant = 'text' | 'logos';
export type MarqueeSize = 's' | 'm' | 'l' | 'xl';
export type MarqueeSpeed = 'default' | 'fast' | 'slow';

/**
 * CSS-driven infinite scroll for text or logos.
 * Children are rendered inside two marquee__list divs for seamless looping.
 *
 * @example
 * <atom-marquee variant="logos" size="m">
 *   <img src="logo1.svg" />
 *   <img src="logo2.svg" />
 * </atom-marquee>
 *
 * @see packages/css/src/components/marquee.css
 */
@Component({
  selector: 'atom-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <div [class]="classes()" data-marquee>
      <div class="marquee__list" data-marquee-list aria-hidden="false">
        <ng-content />
      </div>
      <div class="marquee__list" data-marquee-list aria-hidden="true">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`:host { display: block; overflow: hidden; }`],
})
export class MarqueeComponent {
  variant = input<MarqueeVariant>('text');
  size = input<MarqueeSize>('m');
  dark = input<boolean>(false);
  reverse = input<boolean>(false);
  speed = input<MarqueeSpeed>('default');
  fade = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() => {
    const c = [
      'marquee',
      `marquee--${this.variant()}`,
      `marquee--${this.size()}`,
    ];
    if (this.dark()) c.push('marquee--dark');
    if (this.reverse()) c.push('marquee--reverse');
    if (this.fade()) c.push('marquee--fade');
    const s = this.speed();
    if (s !== 'default') c.push(`marquee--${s}`);
    return c.join(' ');
  });
}
