import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'default' | 'info' | 'success' | 'warning' | 'error';
export type ChipSize = 's' | 'm';

/**
 * A compact interactive element for filtering, selecting, or triggering actions.
 *
 * @example
 * <atom-chip label="Angular" color="info" (closed)="onRemove()">
 *   <span slot="icon-left">...</span>
 * </atom-chip>
 *
 * @see packages/css/src/components/chip.css
 */
@Component({
  selector: 'atom-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <span
      [class]="classes()"
      data-chip
      [attr.aria-disabled]="disabled() || null"
    >
      <ng-content select="[slot=icon-left]" />
      <span class="chip__label">{{ label() }}</span>
      @if (closable()) {
        <button
          class="chip__close"
          [disabled]="disabled()"
          [attr.aria-label]="'Remove ' + label()"
          type="button"
          (click)="closed.emit()"
        ></button>
      }
    </span>
  `,
  styles: [`:host { display: inline-block; }`],
})
export class ChipComponent {
  label = input.required<string>();
  variant = input<ChipVariant>('filled');
  color = input<ChipColor>('default');
  size = input<ChipSize>('m');
  selected = input<boolean>(false);
  disabled = input<boolean>(false);
  closable = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });
  closed = output<void>();

  classes = computed(() => {
    const c = [
      'chip',
      `chip--${this.variant()}`,
      `chip--${this.color()}`,
      `chip--${this.size()}`,
    ];
    if (this.selected()) c.push('chip--selected');
    if (this.disabled()) c.push('chip--disabled');
    return c.join(' ');
  });
}
