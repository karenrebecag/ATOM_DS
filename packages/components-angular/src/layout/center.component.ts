import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

@Component({
  selector: 'atom-center',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'customClass() || null' },
  template: `
    <div class="center" data-center>
      <ng-content />
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class CenterComponent {
  customClass = input<string>('', { alias: 'class' });
}
