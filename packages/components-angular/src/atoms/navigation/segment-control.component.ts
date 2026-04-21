import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export interface SegmentControlItem {
  label: string;
  disabled?: boolean;
}

/**
 * Tabbed selection control with sliding indicator.
 *
 * @example
 * <atom-segment-control [items]="tabs" [selectedIndex]="0" (indexChanged)="onTab($event)"></atom-segment-control>
 *
 * @see packages/css/src/components/segment-control.css
 */
@Component({
  selector: 'atom-segment-control',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <div
      [class]="classes()"
      data-segment-control
      role="tablist"
    >
      <span
        class="segment-control__indicator"
        [style.--segment-index]="selectedIndex()"
        [style.--segment-count]="items().length"
      ></span>
      @for (item of items(); track $index) {
        @let isSelected = $index === selectedIndex();
        @let isDisabled = !!item.disabled;
        <button
          type="button"
          [class]="itemClasses(isSelected, isDisabled)"
          role="tab"
          [attr.aria-selected]="isSelected"
          [attr.data-segment-index]="$index"
          [disabled]="isDisabled"
          [attr.tabindex]="isSelected ? 0 : -1"
          (click)="handleClick($index, isDisabled)"
        >
          <span class="segment-control__label">{{ item.label }}</span>
        </button>
      }
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class SegmentControlComponent {
  items = input.required<SegmentControlItem[]>();
  size = input<'xs' | 's' | 'm' | 'l' | 'xl'>('m');
  selectedIndex = input<number>(0);
  customClass = input<string>('', { alias: 'class' });
  indexChanged = output<number>();

  classes = computed(() => {
    return ['segment-control', `segment-control--${this.size()}`].join(' ');
  });

  itemClasses(isSelected: boolean, isDisabled: boolean): string {
    const c = ['segment-control__item'];
    if (isSelected) c.push('segment-control__item--selected');
    if (isDisabled) c.push('segment-control__item--disabled');
    return c.join(' ');
  }

  handleClick(index: number, disabled: boolean): void {
    if (!disabled) {
      this.indexChanged.emit(index);
    }
  }
}
