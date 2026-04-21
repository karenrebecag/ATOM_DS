import React, { useEffect, useRef } from 'react';
import {
  initMaskedReveal,
  initFadeUpLoad,
  initScrambleLoad,
  initScrambleHover,
  initHighlightScroll,
  initScrambleScroll,
} from '@atomchat.io/animations/effects/text/text';

function useTextAnimations() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const scope = ref.current;
    const raf = requestAnimationFrame(() => {
      initMaskedReveal({ scope });
      initFadeUpLoad({ scope });
      initScrambleLoad({ scope });
      initScrambleHover({ scope });
      initHighlightScroll({ scope });
      initScrambleScroll({ scope });
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  return ref;
}

export default {
  title: 'Animations/Text',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export const MaskedReveal = {
  render: () => {
    const ref = useTextAnimations();
    return (
      <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '640px', padding: '32px' }}>
        <div>
          <p style={{ fontSize: '11px', color: '#999', margin: '0 0 8px', textTransform: 'uppercase' }}>masked-lines (default)</p>
          <h2 className="heading heading--h2 heading--bold heading--tight heading--left" data-text data-text-animate="masked-lines" data-text-trigger="load">
            Design systems scale your product team
          </h2>
        </div>
        <div>
          <p style={{ fontSize: '11px', color: '#999', margin: '0 0 8px', textTransform: 'uppercase' }}>masked-words</p>
          <h3 className="heading heading--h3 heading--medium heading--tight heading--left" data-text data-text-animate="masked-words" data-text-trigger="load">
            Every component follows the same token architecture
          </h3>
        </div>
        <div>
          <p style={{ fontSize: '11px', color: '#999', margin: '0 0 8px', textTransform: 'uppercase' }}>masked-chars</p>
          <h4 className="heading heading--heading heading--regular heading--tight heading--left" data-text data-text-animate="masked-chars" data-text-trigger="load">
            Tokens → CSS → Components → Frameworks
          </h4>
        </div>
      </div>
    );
  },
};

export const Odometer = {
  render: () => (
    <div data-odometer-group style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '480px', padding: '32px' }}>
      <div>
        <p style={{ fontSize: '11px', color: '#999', margin: '0 0 8px', textTransform: 'uppercase' }}>Currency (start €0)</p>
        <h2 style={{ fontSize: '3em', fontWeight: '600', lineHeight: '1', margin: '0', fontVariantNumeric: 'tabular-nums' }}
          data-odometer-element data-odometer-start="€0" data-odometer-duration="2">€248.750</h2>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: '#999', margin: '0 0 8px', textTransform: 'uppercase' }}>Percentage</p>
        <h2 style={{ fontSize: '3em', fontWeight: '600', lineHeight: '1', margin: '0', fontVariantNumeric: 'tabular-nums' }}
          data-odometer-element data-odometer-duration="1.5">99.8%</h2>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: '#999', margin: '0 0 8px', textTransform: 'uppercase' }}>Count with suffix (start 0)</p>
        <h2 style={{ fontSize: '3em', fontWeight: '600', lineHeight: '1', margin: '0', fontVariantNumeric: 'tabular-nums' }}
          data-odometer-element data-odometer-start="0" data-odometer-duration="1.5">1,250+</h2>
      </div>
    </div>
  ),
};

export const OdometerGroup = {
  name: 'Odometer — Staggered Group',
  render: () => (
    <div data-odometer-group data-odometer-stagger="0.2" style={{ display: 'flex', gap: '48px', padding: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '2.5em', fontWeight: '700', lineHeight: '1', margin: '0', fontVariantNumeric: 'tabular-nums' }}
          data-odometer-element data-odometer-duration="1.5">42K</h3>
        <p style={{ fontSize: '12px', color: '#999', margin: '8px 0 0' }}>Users</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '2.5em', fontWeight: '700', lineHeight: '1', margin: '0', fontVariantNumeric: 'tabular-nums' }}
          data-odometer-element data-odometer-duration="1.5">1,621</h3>
        <p style={{ fontSize: '12px', color: '#999', margin: '8px 0 0' }}>Tokens</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '2.5em', fontWeight: '700', lineHeight: '1', margin: '0', fontVariantNumeric: 'tabular-nums' }}
          data-odometer-element data-odometer-duration="1.5">99.9%</h3>
        <p style={{ fontSize: '12px', color: '#999', margin: '8px 0 0' }}>Uptime</p>
      </div>
    </div>
  ),
};
