import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type AvatarSize = 'xs' | 's' | 'm' | 'l';
export type AvatarShape = 'circle' | 'square';
export type AvatarType = 'image' | 'image-border' | 'initials' | 'icon';
export type StatusType = 'verified' | 'online' | 'offline' | 'idle' | 'inactive' | 'none';

/**
 * Displays user profile images, initials, or icons with optional status badges.
 *
 * @example
 * <atom-avatar src="avatar.jpg" alt="Jane Doe" size="m" shape="circle"></atom-avatar>
 * <atom-avatar initials="JD" size="s"></atom-avatar>
 *
 * @see packages/css/src/components/avatar.css
 */
@Component({
  selector: 'atom-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    @let avatarType = resolvedType();

    <span
      [class]="classes()"
      data-avatar
      [attr.data-size]="size()"
      [attr.data-shape]="shape()"
      [attr.data-type]="avatarType"
      role="img"
      [attr.aria-label]="avatarAriaLabel()"
    >
      @if ((avatarType === 'image' || avatarType === 'image-border') && src()) {
        <span class="avatar__frame">
          <img class="avatar__img" data-avatar-img [src]="src()" [alt]="alt()" loading="lazy" />
        </span>
      }

      @if (avatarType === 'initials') {
        <span class="avatar__initials" data-avatar-initials>
          {{ initials() || '?' }}
        </span>
      }

      @if (avatarType === 'icon') {
        <span class="avatar__icon" data-avatar-icon>
          <ng-content />
        </span>
      }

      @if (badge() === 'verified') {
        <span
          class="avatar__badge avatar__badge--verified"
          data-avatar-badge
          data-badge-type="verified"
          aria-label="Verified"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
        </span>
      }
    </span>
  `,
  styles: [`:host { display: inline-block; }`],
})
export class AvatarComponent {
  src = input<string>();
  alt = input<string>('');
  size = input<AvatarSize>('xs');
  shape = input<AvatarShape>('circle');
  type = input<AvatarType>();
  initials = input<string>();
  badge = input<StatusType>('none');
  customClass = input<string>('', { alias: 'class' });

  resolvedType = computed(() => {
    const t = this.type();
    if (t) return t;
    return this.src() ? 'image-border' : 'initials';
  });

  avatarAriaLabel = computed(() => {
    return this.alt() || this.initials() || 'Avatar';
  });

  classes = computed(() => {
    return [
      'avatar',
      `avatar--${this.size()}`,
      `avatar--${this.shape()}`,
      `avatar--${this.resolvedType()}`,
    ].join(' ');
  });
}
