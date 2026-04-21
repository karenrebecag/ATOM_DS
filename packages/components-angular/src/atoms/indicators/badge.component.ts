import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type BadgeType = 'neutral' | 'inbox' | 'info';
export type BadgeState = 'default' | 'focused' | 'subtle';
export type BadgeContext = 'default' | 'inbox';

/**
 * Notification badge with smart overflow logic.
 * Displays notification counts with context-aware capping rules.
 *
 * @example
 * <atom-badge [count]="5" type="neutral"></atom-badge>
 *
 * @see packages/css/src/components/badge.css
 */
@Component({
  selector: 'atom-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    @let display = displayValue();
    @if (display) {
      <span
        [class]="classes()"
        data-badge
        [attr.data-count]="count()"
        [attr.data-context]="context()"
        [attr.data-state]="state()"
        role="status"
        [attr.aria-label]="ariaLabel()"
      >
        <span class="badge__text" data-badge-text>{{ display }}</span>
      </span>
    }
  `,
  styles: [`:host { display: inline-block; }`],
})
export class BadgeComponent {
  count = input<number>(0);
  context = input<BadgeContext>('default');
  type = input<BadgeType>('neutral');
  state = input<BadgeState>('default');
  customClass = input<string>('', { alias: 'class' });

  displayValue = computed(() => {
    const c = this.count();
    const ctx = this.context();
    if (c <= 0) return null;
    if (ctx === 'inbox') {
      return c >= 50 ? '+50' : c.toString();
    }
    return c > 99 ? '99+' : c.toString();
  });

  ariaLabel = computed(() => {
    const c = this.count();
    return `${c} ${c === 1 ? 'notification' : 'notifications'}`;
  });

  classes = computed(() => {
    return ['badge', `badge--${this.type()}`, `badge--${this.state()}`].join(' ');
  });
}
