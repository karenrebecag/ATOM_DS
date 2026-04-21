import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { AvatarComponent } from '../atoms/media/avatar.component';
import type { AvatarSize, AvatarShape } from '../atoms/media/avatar.component';

export interface AvatarGroupItem {
  src?: string;
  initials?: string;
  alt?: string;
}

/**
 * Displays multiple avatars in a stacked layout with an overflow counter.
 *
 * @example
 * <atom-avatar-group [avatars]="users" [max]="3" size="s"></atom-avatar-group>
 *
 * @see packages/css/src/components/avatar-group.css
 */
@Component({
  selector: 'atom-avatar-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent],
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    @let vis = visible();
    @let over = overflow();

    @if (avatars().length > 0) {
      <div
        [class]="classes()"
        data-avatar-group
        [attr.data-size]="size()"
        [attr.data-shape]="shape()"
        role="group"
        [attr.aria-label]="'Group of ' + avatars().length + ' avatars'"
      >
        @for (avatar of vis; track $index) {
          <atom-avatar
            [src]="avatar.src"
            [initials]="avatar.initials"
            [alt]="avatar.alt || ''"
            [size]="size()"
            [shape]="shape()"
            class="avatar-group__item"
          />
        }
        @if (over > 0) {
          <span
            class="avatar-group__overflow"
            data-avatar-group-overflow
            [attr.aria-label]="over + ' more'"
          >
            +{{ over }}
          </span>
        }
      </div>
    }
  `,
  styles: [`:host { display: block; }`],
})
export class AvatarGroupComponent {
  avatars = input.required<AvatarGroupItem[]>();
  max = input<number>(5);
  size = input<AvatarSize>('xs');
  shape = input<AvatarShape>('circle');
  customClass = input<string>('', { alias: 'class' });

  visible = computed(() => this.avatars().slice(0, this.max()));
  overflow = computed(() => this.avatars().length - this.max());

  classes = computed(() => {
    return [
      'avatar-group',
      `avatar-group--${this.size()}`,
      `avatar-group--${this.shape()}`,
    ].join(' ');
  });
}
