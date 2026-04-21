import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export type IconButtonVariant = 'Primary' | 'Secondary' | 'Tertiary' | 'Destructive Primary' | 'Destructive Secondary' | 'Destructive Tertiary';
type IconButtonToken = 'primary' | 'secondary' | 'tertiary' | 'danger-primary' | 'danger-secondary' | 'danger-tertiary';

/**
 * Icon-only interactive button with polymorphic rendering (button vs link).
 *
 * @example
 * <atom-icon-button ariaLabel="Settings" variant="Secondary">
 *   <svg>...</svg>
 * </atom-icon-button>
 *
 * @see packages/css/src/components/icon-button.css
 */
@Component({
  selector: 'atom-icon-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
    '[attr.data-icon-button]': '""',
  },
  template: `
    @let isLink = href();
    @let isDisabled = isDisabledOrLoading();

    @if (isLink) {
      <a
        [href]="isLink"
        [class]="classes()"
        [attr.data-hover-rotate]="!isDisabled ? '' : null"
        [attr.tabindex]="isDisabled ? -1 : 0"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-disabled]="isDisabled ? 'true' : null"
        [attr.aria-busy]="loading() ? 'true' : null"
        (click)="handleClick($event)"
      >
        @if (loading()) {
          <span class="icon-button__spinner" data-icon-button-spinner aria-hidden="true"></span>
        } @else {
          <span class="icon-button__icon">
            <ng-content />
          </span>
        }
      </a>
    } @else {
      <button
        [type]="type()"
        [class]="classes()"
        [disabled]="isDisabled"
        [attr.data-hover-rotate]="!isDisabled ? '' : null"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-disabled]="isDisabled ? 'true' : null"
        [attr.aria-busy]="loading() ? 'true' : null"
        (click)="handleClick($event)"
      >
        @if (loading()) {
          <span class="icon-button__spinner" data-icon-button-spinner aria-hidden="true"></span>
        } @else {
          <span class="icon-button__icon">
            <ng-content />
          </span>
        }
      </button>
    }
  `,
  styles: [`
    :host { display: inline-block; }
    a, button {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      cursor: pointer;
    }
    a[aria-disabled="true"], button:disabled { cursor: not-allowed; }
  `],
})
export class IconButtonComponent {
  variant = input<IconButtonVariant>('Primary');
  size = input<'xs' | 's' | 'm' | 'l' | 'xl'>('m');
  href = input<string>();
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  ariaLabel = input.required<string>();
  customClass = input<string>('', { alias: 'class' });
  clicked = output<MouseEvent>();

  private readonly variantMap: Record<IconButtonVariant, IconButtonToken> = {
    'Primary': 'primary',
    'Secondary': 'secondary',
    'Tertiary': 'tertiary',
    'Destructive Primary': 'danger-primary',
    'Destructive Secondary': 'danger-secondary',
    'Destructive Tertiary': 'danger-tertiary',
  };

  tokenVariant = computed(() => this.variantMap[this.variant()] ?? 'primary');
  isDisabledOrLoading = computed(() => this.disabled() || this.loading());

  classes = computed(() => {
    const c = [
      'icon-button',
      `icon-button--${this.tokenVariant()}`,
      `icon-button--${this.size()}`,
    ];
    if (this.disabled()) c.push('icon-button--disabled');
    if (this.loading()) c.push('icon-button--loading');
    return c.join(' ');
  });

  handleClick(event: MouseEvent): void {
    if (this.isDisabledOrLoading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}
