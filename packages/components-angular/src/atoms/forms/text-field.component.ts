import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

/**
 * Single-line text input with label, supportive text, and character counter.
 *
 * @example
 * <atom-text-field name="email" label="Email" placeholder="you@example.com"></atom-text-field>
 *
 * @see packages/css/src/components/text-field.css
 */
@Component({
  selector: 'atom-text-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    @let hasError = !!error();
    @let inputId = 'text-field-' + name();
    @let supportiveId = inputId + '-supportive';
    @let errorId = inputId + '-error';

    <div [class]="classes()" data-text-field>
      @if (label()) {
        <label class="text-field__label" [attr.for]="inputId">{{ label() }}</label>
      }
      <input
        [id]="inputId"
        [name]="name()"
        type="text"
        class="text-field__input"
        [placeholder]="placeholder()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.maxlength]="maxLength()"
        [attr.aria-invalid]="hasError || null"
        [attr.aria-describedby]="hasError ? errorId : supportiveText() ? supportiveId : null"
        (input)="inputChanged.emit($event)"
      />
      @if (hasError) {
        <span class="text-field__error" [id]="errorId" role="alert">{{ error() }}</span>
      }
      @if (!hasError && supportiveText()) {
        <span class="text-field__supportive" [id]="supportiveId">{{ supportiveText() }}</span>
      }
      @if (showCounter() && maxLength()) {
        <span class="text-field__counter" aria-live="polite">
          {{ currentLength() }}/{{ maxLength() }}
        </span>
      }
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class TextFieldComponent {
  name = input.required<string>();
  label = input<string>();
  placeholder = input<string>('');
  value = input<string>('');
  size = input<'xs' | 's' | 'm' | 'l' | 'xl'>('m');
  disabled = input<boolean>(false);
  error = input<string>();
  supportiveText = input<string>();
  maxLength = input<number>();
  showCounter = input<boolean>(false);
  customClass = input<string>('', { alias: 'class' });
  inputChanged = output<Event>();

  currentLength = computed(() => (this.value() ?? '').length);

  classes = computed(() => {
    const c = [
      'text-field',
      `text-field--${this.size()}`,
    ];
    const v = this.value();
    if (v !== undefined && v !== '') c.push('text-field--filled');
    if (this.error()) c.push('text-field--error');
    if (this.disabled()) c.push('text-field--disabled');
    return c.join(' ');
  });
}
