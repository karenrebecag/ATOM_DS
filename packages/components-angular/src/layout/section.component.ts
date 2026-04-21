import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

@Component({
  selector: 'atom-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'customClass() || null' },
  template: `
    <section class="section" data-section>
      <ng-content />
    </section>
  `,
  styles: [`:host { display: block; }`],
})
export class SectionComponent {
  customClass = input<string>('', { alias: 'class' });
}
