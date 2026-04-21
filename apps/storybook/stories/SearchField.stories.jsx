import React, { useState } from 'react';
import { SearchField } from '@atomchat.io/components-react';

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
    <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', minWidth: '72px' }}>{label}</span>
    {children}
  </div>
);

// ── Meta ──────────────────────────────────────────────────
export default {
  title: 'Components/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [size, setSize] = useState('m');
    const [disabled, setDisabled] = useState(false);
    const [showClear, setShowClear] = useState(true);
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Row label="size">
            {['s', 'm', 'l'].map((s) => (
              <Ctrl key={s} label={s} active={size === s} onClick={() => setSize(s)} />
            ))}
          </Row>
          <Row label="disabled">
            <Ctrl label={disabled ? 'true' : 'false'} active={disabled} onClick={() => setDisabled((v) => !v)} />
          </Row>
          <Row label="showClear">
            <Ctrl label={showClear ? 'true' : 'false'} active={showClear} onClick={() => setShowClear((v) => !v)} />
          </Row>
        </div>

        {/* Preview */}
        <SearchField
          name="playground"
          size={size}
          disabled={disabled}
          showClear={showClear}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue('')}
        />
        <p style={{ fontSize: '11px', color: 'var(--fg-tertiary)', margin: 0 }}>
          Escribe algo para ver el estado filled y el botón de limpiar
        </p>
      </div>
    );
  },
};

// ── All States ────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
      {[
        { label: 'enabled', props: {} },
        { label: 'filled', props: { value: 'design system' } },
        { label: 'disabled', props: { disabled: true } },
        { label: 'disabled + filled', props: { disabled: true, value: 'design system' } },
        { label: 'sin shortcut', props: { shortcut: '' } },
        { label: 'sin clear', props: { value: 'design system', showClear: false } },
      ].map(({ label, props }) => (
        <div key={label}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '4px' }}>{label}</span>
          <SearchField name={label} {...props} />
        </div>
      ))}
    </div>
  ),
};

// ── All Sizes ─────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
      {['s', 'm', 'l'].map((size) => (
        <div key={size}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '4px' }}>{size}</span>
          <SearchField name={`size-${size}`} size={size} />
        </div>
      ))}
    </div>
  ),
};
