import React, { useState } from 'react';
import { NavLink } from '@atomchat.io/components-react';

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
  title: 'Components/NavLink',
  component: NavLink,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [variant, setVariant] = useState('primary');
    const [size, setSize] = useState('s');
    const [underline, setUnderline] = useState('default');
    const [disabled, setDisabled] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px', minWidth: '400px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Row label="variant">
            {['primary', 'secondary', 'tertiary', 'inverse'].map((v) => (
              <Ctrl key={v} label={v} active={variant === v} onClick={() => setVariant(v)} />
            ))}
          </Row>
          <Row label="size">
            {['xs', 's', 'm', 'l', 'xl'].map((s) => (
              <Ctrl key={s} label={s} active={size === s} onClick={() => setSize(s)} />
            ))}
          </Row>
          <Row label="underline">
            {['default', 'alt'].map((u) => (
              <Ctrl key={u} label={u} active={underline === u} onClick={() => setUnderline(u)} />
            ))}
          </Row>
          <Row label="disabled">
            <Ctrl label={disabled ? 'true' : 'false'} active={disabled} onClick={() => setDisabled((d) => !d)} />
          </Row>
        </div>

        {/* Preview */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            padding: '24px',
            borderRadius: '8px',
            background: variant === 'inverse' ? 'var(--bg-inverse-primary)' : 'transparent',
            border: '1px solid var(--border-secondary)',
          }}
        >
          <NavLink href="#" variant={variant} size={size} underline={underline} disabled={disabled}>
            Hover this link
          </NavLink>
          <NavLink href="#" variant={variant} size={size} underline={underline} disabled={disabled}>
            Another link
          </NavLink>
        </div>
      </div>
    );
  },
};

// ── All Variants ──────────────────────────────────────────
export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px' }}>
      {[
        { variant: 'primary', bg: 'transparent' },
        { variant: 'secondary', bg: 'transparent' },
        { variant: 'tertiary', bg: 'transparent' },
        { variant: 'inverse', bg: 'var(--bg-inverse-primary)' },
      ].map(({ variant, bg }) => (
        <div
          key={variant}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            padding: '16px',
            borderRadius: '8px',
            background: bg,
          }}
        >
          <span style={{ fontSize: '11px', color: variant === 'inverse' ? 'var(--fg-inverse-secondary)' : 'var(--fg-tertiary)', minWidth: '72px' }}>
            {variant}
          </span>
          <NavLink href="#" variant={variant} size="s" underline="default">Default underline</NavLink>
          <NavLink href="#" variant={variant} size="s" underline="alt">Alt underline</NavLink>
          <NavLink href="#" variant={variant} size="s" disabled>Disabled</NavLink>
        </div>
      ))}
    </div>
  ),
};

// ── All Sizes ─────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '32px', alignItems: 'flex-start' }}>
      {['xs', 's', 'm', 'l', 'xl'].map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', minWidth: '24px' }}>{size}</span>
          <NavLink href="#" variant="primary" size={size}>Hover this link</NavLink>
        </div>
      ))}
    </div>
  ),
};

// ── Parent Hover Trigger ──────────────────────────────────
export const ParentHover = {
  name: 'Parent Hover Trigger',
  render: () => (
    <div style={{ padding: '32px' }}>
      <div
        data-hover
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid var(--border-secondary)',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: '14px', color: 'var(--fg-secondary)' }}>Hover this card</span>
        <NavLink href="#" variant="primary" size="s">Link animates on parent hover</NavLink>
      </div>
    </div>
  ),
};
