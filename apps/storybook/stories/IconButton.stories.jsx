import React, { useState } from 'react';
import { IconButton } from '@atomchat.io/components-react';

/* ── Sample icons (hoisted) ──────────────────────────────── */
const SettingsIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"/>
  </svg>
);

const TrashIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>
);

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
  title: 'Components/IconButton',
  component: IconButton,
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
          <IconButton
            variant={variant}
            size={size}
            loading={loading}
            disabled={disabled}
            icon={SettingsIcon}
            ariaLabel="Settings"
          />
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
            <Ctrl label="Loading"  active={loading}  onClick={() => setLoading((p)  => !p)} />
            <Ctrl label="Disabled" active={disabled} onClick={() => setDisabled((p) => !p)} />
          </div>
        </div>
      </div>
    );
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', padding: '24px' }}>
      {VARIANTS.map((v) => (
        <IconButton key={v} variant={v} size="m" icon={SettingsIcon} ariaLabel={v} />
      ))}
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '24px' }}>
      {SIZES.map((s) => (
        <IconButton key={s} variant="Primary" size={s} icon={SettingsIcon} ariaLabel={`Size ${s}`} />
      ))}
    </div>
  ),
};

export const Loading = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', padding: '24px' }}>
      {VARIANTS.map((v) => (
        <IconButton key={v} variant={v} size="m" loading icon={SettingsIcon} ariaLabel={v} />
      ))}
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', padding: '24px' }}>
      {VARIANTS.map((v) => (
        <IconButton key={v} variant={v} size="m" disabled icon={TrashIcon} ariaLabel={v} />
      ))}
    </div>
  ),
};
