import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

/**
 * Text link styled as a button with optional icon support.
 * Single visual style (no variant), two sizes.
 *
 * @example
 * <atom-link-button href="/docs" size="l">Read more</atom-link-button>
 *
 * @see packages/css/src/components/link-button.css
 */
@Component({
  selector: 'atom-link-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
    '[attr.data-link-button]': '""',
  },
  template: `
    @let isDisabled = isDisabledOrLoading();

    <a
      [href]="href()"
      [class]="classes()"
      [attr.tabindex]="isDisabled ? -1 : 0"
      [attr.aria-disabled]="isDisabled ? 'true' : null"
      [attr.aria-busy]="loading() ? 'true' : null"
      (click)="handleClick($event)"
    >
      @if (loading()) {
        <span class="link-button__loading-content">
          <span class="link-button__loading-text" data-shimmer>Loading</span>
          <span class="link-button__spinner" data-link-button-spinner aria-hidden="true"></span>
        </span>
      } @else {
        <span class="link-button__label">
          <ng-content select="[slot=icon-left]" />
          <ng-content />
          <ng-content select="[slot=icon-right]" />
        </span>
      }
    </a>
  `,
  styles: [`
    :host { display: inline-block; }
    a {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      cursor: pointer;
      text-decoration: none;
    }
    a[aria-disabled="true"] { cursor: not-allowed; }
  `],
})
export class LinkButtonComponent {
  size = input<'s' | 'l'>('l');
  href = input<string>();
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });
  clicked = output<MouseEvent>();

  isDisabledOrLoading = computed(() => this.disabled() || this.loading());

  classes = computed(() => {
    const c = [
      'link-button',
      `link-button--${this.size()}`,
    ];
    if (this.disabled()) c.push('link-button--disabled');
    if (this.loading()) c.push('link-button--loading');
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
