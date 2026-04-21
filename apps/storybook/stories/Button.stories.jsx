import React, { useState } from 'react';
import { Button } from '@atomchat.io/components-react';

/* ── Control chip ────────────────────────────────────────── */
const Ctrl = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '4px 12px',
      borderRadius: '999px',
      fontSize: '12px',
      fontFamily: 'system-ui, sans-serif',
      border: '1px solid',
      borderColor: active ? '#111' : '#e5e7eb',
      background: active ? '#111' : '#fff',
      color: active ? '#fff' : '#374151',
      cursor: 'pointer',
      transition: 'all .15s',
    }}
  >
    {label}
  </button>
);

const row = { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' };
const lbl = { fontSize: '11px', fontWeight: '600', color: '#9ca3af', width: '72px', textTransform: 'uppercase', letterSpacing: '.05em', flexShrink: 0 };

const VARIANTS = ['Primary', 'Secondary', 'Tertiary', 'Destructive Primary', 'Destructive Secondary', 'Destructive Tertiary'];
const SIZES    = ['xs', 's', 'm', 'l', 'xl'];

/* ── Meta ────────────────────────────────────────────────── */
export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── Stories ─────────────────────────────────────────────── */
export const Playground = {
  render: () => {
    const [variant,  setVariant]  = useState('Primary');
    const [size,     setSize]     = useState('m');
    const [loading,  setLoading]  = useState(false);
    const [disabled, setDisabled] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          <Button variant={variant} size={size} loading={loading} disabled={disabled}>
            Click me
          </Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={row}>
            <span style={lbl}>Variant</span>
            {VARIANTS.map((v) => (
              <Ctrl key={v} label={v} active={variant === v} onClick={() => setVariant(v)} />
            ))}
          </div>
          <div style={row}>
            <span style={lbl}>Size</span>
            {SIZES.map((v) => (
              <Ctrl key={v} label={v} active={size === v} onClick={() => setSize(v)} />
            ))}
          </div>
          <div style={row}>
            <span style={lbl}>Options</span>
            <Ctrl label="Loading"  active={loading}  onClick={() => setLoading((p) => !p)} />
            <Ctrl label="Disabled" active={disabled} onClick={() => setDisabled((p) => !p)} />
          </div>
        </div>
      </div>
    );
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', padding: '24px' }}>
      {VARIANTS.map((v) => (
        <Button key={v} variant={v} size="m">{v}</Button>
      ))}
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', padding: '24px' }}>
      {SIZES.map((s) => (
        <Button key={s} variant="Primary" size={s}>{s}</Button>
      ))}
    </div>
  ),
};

export const Loading = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', padding: '24px' }}>
      {VARIANTS.map((v) => (
        <Button key={v} variant={v} size="m" loading>Loading</Button>
      ))}
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', padding: '24px' }}>
      {VARIANTS.map((v) => (
        <Button key={v} variant={v} size="m" disabled>{v}</Button>
      ))}
    </div>
  ),
};
