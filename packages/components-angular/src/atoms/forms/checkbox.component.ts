import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  effect,
  ElementRef,
  viewChild,
} from '@angular/core';

export type CheckboxSize = 's' | 'm';

/**
 * A form checkbox with label support, indeterminate state, and error handling.
 *
 * @example
 * <atom-checkbox name="agree" size="m" [checked]="true">I agree</atom-checkbox>
 *
 * @see packages/css/src/components/checkbox.css
 */
@Component({
  selector: 'atom-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <label [class]="classes()" data-checkbox>
      <input
        #inputRef
        type="checkbox"
        [name]="name()"
        [checked]="checked()"
        [disabled]="disabled()"
        class="checkbox__input"
        (change)="changed.emit($event)"
      />
      <span class="checkbox__control"></span>
      <span class="checkbox__label">
        <ng-content />
      </span>
    </label>
  `,
  styles: [`:host { display: inline-block; }`],
})
export class CheckboxComponent {
  name = input<string>();
  size = input<CheckboxSize>('m');
  checked = input<boolean>(false);
  indeterminate = input<boolean>(false);
  disabled = input<boolean>(false);
  error = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });
  changed = output<Event>();

  private inputRef = viewChild<ElementRef<HTMLInputElement>>('inputRef');

  constructor() {
    effect(() => {
      const el = this.inputRef();
      const indet = this.indeterminate();
      if (el) {
        el.nativeElement.indeterminate = indet;
      }
    });
  }

  classes = computed(() => {
    const c = [
      'checkbox',
      `checkbox--${this.size()}`,
    ];
    if (this.error()) c.push('checkbox--error');
    if (this.disabled()) c.push('checkbox--disabled');
    return c.join(' ');
  });
}
