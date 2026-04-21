import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export type RadioSize = 's' | 'm';

/**
 * A form radio button with title, supportive text, and error handling.
 *
 * @example
 * <atom-radio name="color" value="red" title="Red" supportiveText="A warm color"></atom-radio>
 *
 * @see packages/css/src/components/radio.css
 */
@Component({
  selector: 'atom-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <label [class]="classes()" data-radio>
      <input
        type="radio"
        [name]="name()"
        [value]="value()"
        [checked]="checked()"
        [disabled]="disabled()"
        class="radio-field__input"
        (change)="changed.emit($event)"
      />
      <span class="radio-field__control"></span>
      <span class="radio-field__content">
        @if (title()) {
          <span class="radio-field__title">{{ title() }}</span>
        }
        @if (supportiveText()) {
          <span class="radio-field__supportive-text">{{ supportiveText() }}</span>
        }
        @if (error() && errorText()) {
          <span class="radio-field__error-text">{{ errorText() }}</span>
        }
      </span>
    </label>
  `,
  styles: [`:host { display: block; }`],
})
export class RadioComponent {
  name = input<string>();
  value = input<string>();
  size = input<RadioSize>('m');
  checked = input<boolean>(false);
  disabled = input<boolean>(false);
  error = input<boolean>(false);
  title = input<string>();
  supportiveText = input<string>();
  errorText = input<string>();
  customClass = input<string>('', { alias: 'class' });
  changed = output<Event>();

  classes = computed(() => {
    const c = [
      'radio-field',
      `radio-field--${this.size()}`,
    ];
    if (this.error()) c.push('radio-field--error');
    if (this.disabled()) c.push('radio-field--disabled');
    return c.join(' ');
  });
}
