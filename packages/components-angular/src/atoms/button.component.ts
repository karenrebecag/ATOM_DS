import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export type ButtonVariant = 'Primary' | 'Secondary' | 'Tertiary' | 'Destructive Primary' | 'Destructive Secondary' | 'Destructive Tertiary';
export type ButtonToken = 'primary' | 'secondary' | 'tertiary' | 'danger-primary' | 'danger-secondary' | 'danger-tertiary';

/**
 * Interactive button with 6 variants, 5 sizes, loading state, and icon support.
 *
 * @example
 * <atom-button variant="Primary" size="m">Click me</atom-button>
 * <atom-button variant="Secondary" [loading]="isLoading">Save</atom-button>
 * <atom-button variant="Tertiary" href="/about">Link</atom-button>
 * <atom-button variant="Destructive Primary" [disabled]="true">Delete</atom-button>
 *
 * @note LIMITATION: ng-content projection works only in the first rendered branch.
 * If href is provided initially, button content projects correctly.
 * If href changes from undefined to a value after initialization, content may not re-project.
 * For production use, consider separate ButtonComponent and LinkButtonComponent.
 */
@Component({
  selector: 'atom-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-button]': '""',
  },
  template: `
    @let isLink = href();
    @let isDisabled = isDisabledOrLoading();

    @if (isLink) {
      <a
        [href]="isLink"
        [class]="buttonClasses()"
        [attr.data-hover-rotate]="!isDisabled ? '' : null"
        [attr.tabindex]="isDisabled ? -1 : 0"
        [attr.aria-disabled]="isDisabled ? 'true' : null"
        [attr.aria-busy]="loading() ? 'true' : null"
        (click)="handleClick($event)"
      >
        @if (loading()) {
          <span class="button__loading-content">
            <span class="button__loading-text" data-shimmer>Loading</span>
            <span class="button__spinner" data-button-spinner aria-hidden="true"></span>
          </span>
        } @else {
          <span class="button__label-wrap">
            <span class="button__label" data-button-label>
              <ng-content select="[slot=icon-left]" />
              <ng-content />
              <ng-content select="[slot=icon-right]" />
            </span>
            <span class="button__label button__label--clone" data-button-label-clone aria-hidden="true">
              <ng-content select="[slot=icon-left]" />
              <ng-content />
              <ng-content select="[slot=icon-right]" />
            </span>
          </span>
        }
      </a>
    } @else {
      <button
        [type]="type()"
        [class]="buttonClasses()"
        [disabled]="isDisabled"
        [attr.data-hover-rotate]="!isDisabled ? '' : null"
        [attr.aria-disabled]="isDisabled ? 'true' : null"
        [attr.aria-busy]="loading() ? 'true' : null"
        (click)="handleClick($event)"
      >
        @if (loading()) {
          <span class="button__loading-content">
            <span class="button__loading-text" data-shimmer>Loading</span>
            <span class="button__spinner" data-button-spinner aria-hidden="true"></span>
          </span>
        } @else {
          <span class="button__label-wrap">
            <span class="button__label" data-button-label>
              <ng-content select="[slot=icon-left]" />
              <ng-content />
              <ng-content select="[slot=icon-right]" />
            </span>
            <span class="button__label button__label--clone" data-button-label-clone aria-hidden="true">
              <ng-content select="[slot=icon-left]" />
              <ng-content />
              <ng-content select="[slot=icon-right]" />
            </span>
          </span>
        }
      </button>
    }
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    a, button {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      cursor: pointer;
      text-decoration: none;
    }

    a[aria-disabled="true"],
    button:disabled {
      cursor: not-allowed;
    }
  `],
})
export class ButtonComponent {
  variant = input<ButtonVariant>('Primary');
  size = input<'xs' | 's' | 'm' | 'l' | 'xl'>('m');
  href = input<string>();
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });
  clicked = output<MouseEvent>();

  private readonly variantMap: Record<ButtonVariant, ButtonToken> = {
    'Primary': 'primary',
    'Secondary': 'secondary',
    'Tertiary': 'tertiary',
    'Destructive Primary': 'danger-primary',
    'Destructive Secondary': 'danger-secondary',
    'Destructive Tertiary': 'danger-tertiary',
  };

  tokenVariant = computed(() => this.variantMap[this.variant()] ?? 'primary');
  isDisabledOrLoading = computed(() => this.disabled() || this.loading());

  buttonClasses = computed(() => {
    const classes = [
      'button',
      `button--${this.tokenVariant()}`,
      `button--${this.size()}`,
    ];
    if (this.disabled()) classes.push('button--disabled');
    if (this.loading()) classes.push('button--loading');
    return classes.join(' ');
  });

  hostClasses = computed(() => this.customClass() || null);

  handleClick(event: MouseEvent): void {
    if (this.isDisabledOrLoading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}
