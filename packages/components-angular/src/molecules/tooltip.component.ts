import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type TooltipIconType = 'info' | 'question' | 'alert';
export type TooltipPosX = 'center' | 'left' | 'right';
export type TooltipPosY = 'top' | 'bottom';

/**
 * CSS-only tooltip with hover trigger. Supports icon types and configurable positioning.
 *
 * @example
 * <atom-tooltip text="Helpful tip" iconType="info" posY="top"></atom-tooltip>
 * <atom-tooltip heading="Title" body="Detailed description"></atom-tooltip>
 *
 * @see packages/css/src/components/tooltip.css
 */
@Component({
  selector: 'atom-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'customClass() || null',
  },
  template: `
    @let hasCard = !!heading() || !!body();

    <div
      class="tooltip"
      data-tooltip-hover
      [attr.data-tooltip-icon]="iconType()"
      [attr.data-tooltip-x]="posX()"
      [attr.data-tooltip-y]="posY()"
    >
      <ng-content>
        <span class="tooltip__icon">
          @switch (iconType()) {
            @case ('info') {
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM9 11H7V7h2v4z" />
              </svg>
            }
            @case ('question') {
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 10.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm.5-2.5H7.25c0-2.25 2.25-2 2.25-3.25a1.5 1.5 0 0 0-3 0h-1.5a3 3 0 1 1 6 0c0 2-2.5 2-2.5 3.75v.25z" />
              </svg>
            }
            @case ('alert') {
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            }
          }
        </span>
      </ng-content>
      <div class="tooltip__box">
        <div class="tooltip__box-inner">
          @if (hasCard) {
            <div class="tooltip__card">
              @if (heading()) {
                <span class="tooltip__heading">{{ heading() }}</span>
              }
              @if (body()) {
                <span class="tooltip__body">{{ body() }}</span>
              }
            </div>
          } @else if (text()) {
            <span class="tooltip__text">{{ text() }}</span>
          }
        </div>
        <span class="tooltip__tip" aria-hidden="true"></span>
      </div>
    </div>
  `,
  styles: [`:host { display: inline-block; }`],
})
export class TooltipComponent {
  text = input<string>();
  iconType = input<TooltipIconType>('info');
  heading = input<string>();
  body = input<string>();
  posX = input<TooltipPosX>('center');
  posY = input<TooltipPosY>('top');
  customClass = input<string>('', { alias: 'class' });
}
