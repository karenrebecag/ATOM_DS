import React, { useState } from 'react';
import { Divider } from '@atomchat.io/components-react';

/* ── Meta ────────────────────────────────────────────────── */
export default {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── Stories ─────────────────────────────────────────────── */
export const Playground = {
  render: () => {
    const [opacity, setOpacity] = useState(1);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
        <div>
          <p style={{ margin: '0 0 12px', fontSize: '14px', fontFamily: 'system-ui', color: '#374151' }}>Content above</p>
          <Divider opacity={opacity} />
          <p style={{ margin: '12px 0 0', fontSize: '14px', fontFamily: 'system-ui', color: '#374151' }}>Content below</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.05em', flexShrink: 0 }}>Opacity</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'system-ui', width: '32px', textAlign: 'right' }}>{opacity}</span>
          </div>
        </div>
      </div>
    );
  },
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: '400px', padding: '16px' }}>
      <p style={{ margin: '0 0 12px', fontSize: '14px', fontFamily: 'system-ui' }}>Content above</p>
      <Divider />
      <p style={{ margin: '12px 0 0', fontSize: '14px', fontFamily: 'system-ui' }}>Content below</p>
    </div>
  ),
};

export const Subtle = {
  render: () => (
    <div style={{ maxWidth: '400px', padding: '16px' }}>
      <p style={{ margin: '0 0 12px', fontSize: '14px', fontFamily: 'system-ui' }}>Content above</p>
      <Divider opacity={0.3} />
      <p style={{ margin: '12px 0 0', fontSize: '14px', fontFamily: 'system-ui' }}>Content below</p>
    </div>
  ),
};

export const InContext = {
  name: 'In Context (list)',
  render: () => (
    <div style={{ maxWidth: '400px', fontFamily: 'system-ui' }}>
      {['Design tokens', 'CSS components', 'React components', 'Astro components'].map((item, i, arr) => (
        <div key={item}>
          <p style={{ margin: '12px 0', fontSize: '14px', color: '#374151' }}>{item}</p>
          {i < arr.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  ),
};
