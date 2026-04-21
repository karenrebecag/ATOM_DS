import React, { useState } from 'react';
import { Spinner } from '@atomchat.io/components-react';

// ── Controls ──────────────────────────────────────────────
const Ctrl = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '4px 12px',
      borderRadius: '999px',
      border: '1px solid',
      borderColor: active ? 'var(--fg-primary)' : 'var(--border-secondary)',
      background: active ? 'var(--fg-primary)' : 'transparent',
      color: active ? 'var(--bg-primary)' : 'var(--fg-secondary)',
      fontSize: '12px',
      fontWeight: active ? 600 : 400,
      cursor: 'pointer',
      transition: 'all 150ms',
    }}
  >
    {label}
  </button>
);

const Row = ({ label, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', minWidth: '40px' }}>{label}</span>
    {children}
  </div>
);

// ── Meta ──────────────────────────────────────────────────
export default {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [size, setSize] = useState('m');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        <Row label="size">
          {['xs', 's', 'm', 'l', 'xl'].map((s) => (
            <Ctrl key={s} label={s} active={size === s} onClick={() => setSize(s)} />
          ))}
        </Row>
        <Spinner size={size} />
      </div>
    );
  },
};

// ── All Sizes ─────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center', padding: '16px' }}>
      {['xs', 's', 'm', 'l', 'xl'].map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Spinner size={s} />
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
};
