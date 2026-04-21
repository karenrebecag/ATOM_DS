import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type NavLinkUnderline = 'default' | 'alt';
export type NavLinkVariant = 'primary' | 'secondary' | 'tertiary' | 'inverse';

/**
 * CSS-only underline link with animation support.
 * Supports two underline styles (default and alt) and multiple variants.
 *
 * @example
 * <atom-nav-link href="/about" variant="primary">About</atom-nav-link>
 *
 * @see packages/css/src/components/nav-link.css
 */
@Component({
  selector: 'atom-nav-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <a
      [href]="href()"
      [class]="classes()"
      [attr.data-underline-link]="underline() === 'alt' ? 'alt' : ''"
      [attr.tabindex]="disabled() ? -1 : 0"
      [attr.aria-disabled]="disabled() ? 'true' : null"
    >
      <ng-content />
    </a>
  `,
  styles: [`
    :host { display: inline-block; }
    a {
      all: unset;
      box-sizing: border-box;
      cursor: pointer;
      text-decoration: none;
    }
    a[aria-disabled="true"] { cursor: not-allowed; }
  `],
})
export class NavLinkComponent {
  href = input<string>();
  underline = input<NavLinkUnderline>('default');
  variant = input<NavLinkVariant>('primary');
  size = input<'xs' | 's' | 'm' | 'l' | 'xl'>('m');
  disabled = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });

  classes = computed(() => {
    const c = [
      'nav-link',
      `nav-link--${this.variant()}`,
      `nav-link--${this.size()}`,
    ];
    if (this.disabled()) c.push('nav-link--disabled');
    return c.join(' ');
  });
}
