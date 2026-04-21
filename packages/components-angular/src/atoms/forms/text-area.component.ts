import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export type TextAreaSize = 'm' | 'xl';

/**
 * Multi-line text input with label, supportive text, and character counter.
 *
 * @example
 * <atom-text-area name="bio" label="Biography" placeholder="Tell us about yourself"></atom-text-area>
 *
 * @see packages/css/src/components/textarea.css
 */
@Component({
  selector: 'atom-text-area',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    @let hasError = !!error();
    @let textareaId = 'textarea-' + name();
    @let supportiveId = textareaId + '-supportive';
    @let errorId = textareaId + '-error';

    <div [class]="classes()" data-textarea>
      @if (label()) {
        <label class="textarea__label" [attr.for]="textareaId">{{ label() }}</label>
      }
      <textarea
        [id]="textareaId"
        [name]="name()"
        class="textarea__input"
        [placeholder]="placeholder()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.maxlength]="maxLength()"
        [attr.aria-invalid]="hasError || null"
        [attr.aria-describedby]="hasError ? errorId : supportiveText() ? supportiveId : null"
        (input)="inputChanged.emit($event)"
      ></textarea>
      @if (hasError) {
        <span class="textarea__error" [id]="errorId" role="alert">{{ error() }}</span>
      }
      @if (!hasError && supportiveText()) {
        <span class="textarea__supportive" [id]="supportiveId">{{ supportiveText() }}</span>
      }
      @if (showCounter() && maxLength()) {
        <span class="textarea__counter" aria-live="polite">
          {{ currentLength() }}/{{ maxLength() }}
        </span>
      }
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class TextAreaComponent {
  name = input.required<string>();
  label = input<string>();
  placeholder = input<string>('');
  value = input<string>('');
  size = input<TextAreaSize>('m');
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
      'textarea',
      `textarea--${this.size()}`,
    ];
    const v = this.value();
    if (v !== undefined && v !== '') c.push('textarea--filled');
    if (this.error()) c.push('textarea--error');
    if (this.disabled()) c.push('textarea--disabled');
    return c.join(' ');
  });
}
