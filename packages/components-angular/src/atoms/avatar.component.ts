import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  effect,
  isDevMode,
} from '@angular/core';
import { StatusIconComponent } from './status-icon.component';
import type { StatusType, AvatarSize, AvatarShape, AvatarType, StatusIconSize } from '../types/avatar.types';

/**
 * User avatar supporting image, initials, and icon types with status badges.
 *
 * @example
 * <atom-avatar type="image" src="/user.jpg" alt="John Doe profile picture" />
 * <atom-avatar type="initials" initials="JD" />
 * <atom-avatar type="icon"><svg slot="icon">...</svg></atom-avatar>
 * <atom-avatar type="image" src="/user.jpg" alt="John Doe" badge="online" />
 *
 * @slot icon - Icon content when type="icon"
 * @slot icon-fallback - Fallback icon when type="image" and src is undefined or fails to load
 */
@Component({
  selector: 'atom-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StatusIconComponent],
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-avatar]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-shape]': 'shape()',
  },
  template: `
    <div class="avatar__content">
      @switch (type()) {
        @case ('image') {
          @let imageSrc = src();
          @if (imageSrc) {
            <img
              [src]="imageSrc"
              [alt]="alt()"
              class="avatar__image"
              loading="lazy"
            />
          } @else {
            <span class="avatar__fallback">
              <ng-content select="[slot=icon-fallback]" />
            </span>
          }
        }
        @case ('initials') {
          @let initialsText = initials().trim();
          @if (initialsText) {
            <span class="avatar__initials">{{ initialsText }}</span>
          }
        }
        @case ('icon') {
          <span class="avatar__icon">
            <ng-content select="[slot=icon]" />
          </span>
        }
        @default {}
      }
    </div>

    @let statusBadge = badge();
    @if (statusBadge) {
      <atom-status-icon
        [status]="statusBadge"
        [size]="badgeSize()"
        [bordered]="true"
        class="avatar__badge"
      />
    }
  `,
  styles: [`
    :host {
      position: relative;
      display: inline-block;
    }
  `],
})
export class AvatarComponent {
  type = input<AvatarType>('image');
  size = input<AvatarSize>('m');
  shape = input<AvatarShape>('circle');
  src = input<string>();

  /**
   * Alt text for image accessibility.
   * REQUIRED when type="image" — describes the person in the avatar for screen readers.
   * Empty string marks the image as decorative (not recommended for user avatars).
   */
  alt = input<string>('');

  initials = input<string>('');
  badge = input<StatusType>();
  customClass = input<string>('', { alias: 'class' });

  badgeSize = computed(() => {
    const currentSize = this.size();
    const sizeMap: Record<AvatarSize, StatusIconSize> = {
      'xs': 'xs',
      's': 'xs',
      'm': 's',
      'l': 'm',
      'xl': 'l',
      '2xl': 'l',
    };
    return sizeMap[currentSize];
  });

  hostClasses = computed(() => {
    const classes = [
      'avatar',
      `avatar--${this.size()}`,
      `avatar--${this.shape()}`,
      `avatar--${this.type()}`,
    ];
    if (this.badge()) classes.push('avatar--with-badge');
    if (this.customClass()) classes.push(this.customClass());
    return classes.join(' ');
  });

  constructor() {
    effect(() => {
      if (isDevMode() && this.type() === 'image' && !this.alt()) {
        console.warn(
          `[AvatarComponent] Missing alt text for type="image". ` +
          `Provide a descriptive alt attribute for accessibility. ` +
          `Use empty string only for decorative images.`
        );
      }
    });
  }
}
