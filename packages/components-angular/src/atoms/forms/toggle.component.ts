import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export type ToggleSize = 's' | 'm';

/**
 * A form toggle switch with label, supportive text, and error handling.
 *
 * @example
 * <atom-toggle name="notifications" size="m" [checked]="true">Enable notifications</atom-toggle>
 *
 * @see packages/css/src/components/toggle.css
 */
@Component({
  selector: 'atom-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    <label [class]="fieldClasses()" data-toggle>
      <input
        type="checkbox"
        [name]="name()"
        [checked]="checked()"
        [disabled]="disabled()"
        class="toggle__input"
        role="switch"
        [attr.aria-checked]="checked()"
        (change)="changed.emit($event)"
      />
      <span [class]="toggleClasses()"></span>
      <span class="toggle-field__content">
        <span class="toggle-field__label">
          <ng-content />
        </span>
        @if (supportiveText()) {
          <span class="toggle-field__supportive-text">{{ supportiveText() }}</span>
        }
        @if (error() && errorText()) {
          <span class="toggle-field__error-text">{{ errorText() }}</span>
        }
      </span>
    </label>
  `,
  styles: [`:host { display: block; }`],
})
export class ToggleComponent {
  name = input<string>();
  size = input<ToggleSize>('m');
  checked = input<boolean>(false);
  disabled = input<boolean>(false);
  error = input<boolean>(false);
  errorText = input<string>();
  supportiveText = input<string>();
  customClass = input<string>('', { alias: 'class' });
  changed = output<Event>();

  fieldClasses = computed(() => {
    const c = [
      'toggle-field',
      `toggle-field--${this.size()}`,
    ];
    if (this.disabled()) c.push('toggle-field--disabled');
    if (this.error()) c.push('toggle-field--error');
    return c.join(' ');
  });

  toggleClasses = computed(() => {
    return ['toggle', `toggle--${this.size()}`].join(' ');
  });
}
