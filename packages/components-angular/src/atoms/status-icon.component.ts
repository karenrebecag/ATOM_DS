import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import type { StatusType, StatusIconSize } from '../types/avatar.types';

const DEFAULT_STATUS_LABELS: Record<StatusType, string> = {
  'online': 'Online',
  'offline': 'Offline',
  'idle': 'Idle',
  'inactive': 'Inactive',
  'verified': 'Verified',
};

/**
 * Circular status indicator for user presence states.
 *
 * @example
 * <atom-status-icon status="online" size="s" />
 * <atom-status-icon status="offline" [bordered]="true" />
 * <atom-status-icon status="verified" [ariaLabel]="customLabel" />
 *
 * @note Default labels are in English. Use `ariaLabel` input for i18n support.
 */
@Component({
  selector: 'atom-status-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-status-icon]': '""',
    '[attr.data-status]': 'status()',
    '[attr.data-size]': 'size()',
    '[attr.aria-label]': 'effectiveAriaLabel()',
    'role': 'img',
  },
  template: `<span class="status-icon__dot"></span>`,
  styles: [`
    :host {
      display: inline-block;
    }

    .status-icon__dot {
      display: block;
      border-radius: 50%;
    }
  `],
})
export class StatusIconComponent {
  status = input.required<StatusType>();
  size = input<StatusIconSize>('s');
  bordered = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });

  /** Override aria-label for i18n support. If not provided, uses default English labels. */
  ariaLabel = input<string>();

  effectiveAriaLabel = computed(() => {
    return this.ariaLabel() ?? DEFAULT_STATUS_LABELS[this.status()];
  });

  hostClasses = computed(() => {
    const classes = [
      'status-icon',
      `status-icon--${this.status()}`,
      `status-icon--${this.size()}`,
    ];
    if (this.bordered()) classes.push('status-icon--bordered');
    if (this.customClass()) classes.push(this.customClass());
    return classes.join(' ');
  });
}
