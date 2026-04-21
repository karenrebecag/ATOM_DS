import React, { useState } from 'react';
import { Skeleton } from '@atomchat.io/components-react';

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
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
    <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', minWidth: '64px' }}>{label}</span>
    {children}
  </div>
);

// ── Meta ──────────────────────────────────────────────────
export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [variant, setVariant] = useState(undefined);

    const preview = {
      undefined: <Skeleton style={{ height: '48px', width: '200px' }} />,
      line:      <Skeleton variant="line" style={{ width: '200px' }} />,
      circle:    <Skeleton variant="circle" style={{ width: '48px', height: '48px' }} />,
      card:      <Skeleton variant="card" style={{ height: '80px', width: '200px' }} />,
      btn:       <Skeleton variant="btn" />,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Controls */}
        <Row label="variant">
          {[undefined, 'line', 'circle', 'card', 'btn'].map((v) => (
            <Ctrl
              key={String(v)}
              label={v ?? 'default'}
              active={variant === v}
              onClick={() => setVariant(v)}
            />
          ))}
        </Row>

        {/* Preview */}
        <div style={{ padding: '24px', borderRadius: '8px', border: '1px solid var(--border-secondary)' }}>
          {preview[String(variant)]}
        </div>
      </div>
    );
  },
};

// ── All Variants ──────────────────────────────────────────
export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '360px' }}>
      {[
        { label: 'default (custom size)', el: <Skeleton style={{ height: '48px' }} /> },
        { label: 'line (altura fija)', el: <Skeleton variant="line" /> },
        { label: 'circle', el: <Skeleton variant="circle" style={{ width: '48px', height: '48px' }} /> },
        { label: 'card', el: <Skeleton variant="card" style={{ height: '80px' }} /> },
        { label: 'btn (h+w fijos)', el: <Skeleton variant="btn" /> },
      ].map(({ label, el }) => (
        <div key={label}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '6px' }}>{label}</span>
          {el}
        </div>
      ))}
    </div>
  ),
};

// ── Composiciones ─────────────────────────────────────────
export const CardComposition = {
  name: 'Card Composition',
  render: () => (
    <div style={{ maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Card con avatar */}
      <div style={{ border: '1px solid var(--border-secondary)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Skeleton variant="circle" style={{ width: '48px', height: '48px', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-xxs)', flex: 1 }}>
            <Skeleton variant="line" style={{ width: '60%' }} />
            <Skeleton variant="line" style={{ width: '40%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-xxs)' }}>
          <Skeleton variant="line" style={{ width: 'var(--skeleton-line-width-1)' }} />
          <Skeleton variant="line" style={{ width: 'var(--skeleton-line-width-2)' }} />
          <Skeleton variant="line" style={{ width: 'var(--skeleton-line-width-3)' }} />
        </div>
        <Skeleton variant="btn" />
      </div>

      {/* Lista de texto */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--skeleton-lines-gap)' }}>
        <Skeleton variant="line" style={{ width: 'var(--skeleton-line-width-1)' }} />
        <Skeleton variant="line" style={{ width: 'var(--skeleton-line-width-2)' }} />
        <Skeleton variant="line" style={{ width: 'var(--skeleton-line-width-3)' }} />
        <Skeleton variant="line" style={{ width: 'var(--skeleton-line-width-4)' }} />
        <Skeleton variant="line" style={{ width: 'var(--skeleton-line-width-5)' }} />
      </div>

      {/* Avatar + heading */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Skeleton variant="circle" style={{ width: '32px', height: '32px' }} />
        <Skeleton variant="line" style={{ width: '120px' }} />
      </div>
    </div>
  ),
};
