import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { AvatarComponent } from '../atoms/avatar.component';
import type { StatusType, AvatarSize, AvatarShape, AvatarType } from '../types/avatar.types';

export interface AvatarData {
  type?: AvatarType;
  src?: string;
  alt?: string;
  initials?: string;
  badge?: StatusType;
}

/**
 * Overlapping avatars with optional "+N" counter for overflow.
 *
 * @example
 * <atom-avatar-group [avatars]="users" size="m" [maxAvatars]="5" />
 */
@Component({
  selector: 'atom-avatar-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent],
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-avatar-group]': '""',
    '[attr.data-size]': 'size()',
  },
  template: `
    <div class="avatar-group__list">
      @for (avatar of visibleAvatars(); track $index) {
        <atom-avatar
          [type]="avatar.type || 'image'"
          [size]="size()"
          [shape]="shape()"
          [src]="avatar.src"
          [alt]="avatar.alt || ''"
          [initials]="avatar.initials"
          [badge]="avatar.badge"
          class="avatar-group__avatar"
        />
      }

      @if (showCounter()) {
        <div
          class="avatar-group__counter"
          [attr.data-count]="remainingCount()"
          [attr.aria-label]="counterAriaLabel()"
        >
          +{{ remainingCount() }}
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `],
})
export class AvatarGroupComponent {
  avatars = input<AvatarData[]>([]);
  size = input<AvatarSize>('m');
  shape = input<AvatarShape>('circle');
  maxAvatars = input<number>(5);
  customClass = input<string>('', { alias: 'class' });

  visibleAvatars = computed(() => this.avatars().slice(0, this.maxAvatars()));
  remainingCount = computed(() => Math.max(0, this.avatars().length - this.maxAvatars()));
  showCounter = computed(() => this.remainingCount() > 0);

  counterAriaLabel = computed(() => {
    const count = this.remainingCount();
    return `${count} more ${count === 1 ? 'person' : 'people'}`;
  });

  hostClasses = computed(() => {
    const classes = [
      'avatar-group',
      `avatar-group--${this.size()}`,
      `avatar-group--${this.shape()}`,
    ];
    if (this.customClass()) classes.push(this.customClass());
    return classes.join(' ');
  });
}
