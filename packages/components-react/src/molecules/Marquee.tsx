/**
 * Marquee (Molecule)
 *
 * CSS-driven infinite scroll. Children are duplicated into two tracks
 * for a seamless loop. Animation init (duration calc + IntersectionObserver
 * play/pause) is handled internally — no decorator or external init needed.
 *
 * Matches Astro component props 1:1.
 *
 * @see packages/css/src/components/marketing/marquee.css
 * @see packages/components-astro/src/molecules/Marquee.astro
 */

import { forwardRef, useRef, useEffect, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

const PIXELS_PER_SECOND = 50;

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'logos';
  size?: 's' | 'm' | 'l' | 'xl';
  dark?: boolean;
  reverse?: boolean;
  speed?: 'default' | 'fast' | 'slow';
  fade?: boolean;
}

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      variant = 'text',
      size = 'm',
      dark = false,
      reverse = false,
      speed = 'default',
      fade = true,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const root = innerRef.current;
      if (!root) return;

      // Respect prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const lists = root.querySelectorAll<HTMLElement>('[data-marquee-list]');

      // Calculate duration from content width
      lists.forEach((list) => {
        const duration = list.offsetWidth / PIXELS_PER_SECOND;
        if (duration > 0) list.style.animationDuration = `${duration}s`;
        list.style.animationPlayState = 'paused';
      });

      // Play/pause based on viewport visibility
      const observer = new IntersectionObserver(
        (entries) => {
          const isIntersecting = entries[0]?.isIntersecting ?? false;
          lists.forEach((list) => {
            list.style.animationPlayState = isIntersecting ? 'running' : 'paused';
          });
        },
        { threshold: 0 }
      );

      observer.observe(root);

      return () => observer.disconnect();
    }, [variant, size, speed]);

    return (
      <div
        ref={(node) => {
          (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          'marquee',
          `marquee--${variant}`,
          `marquee--${size}`,
          dark && 'marquee--dark',
          reverse && 'marquee--reverse',
          fade && 'marquee--fade',
          speed !== 'default' && `marquee--${speed}`,
          className
        )}
        data-marquee
        {...rest}
      >
        <div className="marquee__list" data-marquee-list>
          {children}
        </div>
        <div className="marquee__list" data-marquee-list aria-hidden="true">
          {children}
        </div>
      </div>
    );
  }
);

Marquee.displayName = 'Marquee';
