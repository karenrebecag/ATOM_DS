import React, { useState } from 'react';
import { TextField } from '@atomchat.io/components-react';

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
    <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', minWidth: '100px' }}>{label}</span>
    {children}
  </div>
);

const SIZES = ['xs', 's', 'm', 'l', 'xl'];

// ── Sample icons ──────────────────────────────────────────
const IconSearch = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconAt = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 8c0 2.5 3 2.5 3 0a6 6 0 1 0-3 5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Meta ──────────────────────────────────────────────────
export default {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [size, setSize] = useState('m');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [showSupportive, setShowSupportive] = useState(true);
    const [showCounter, setShowCounter] = useState(false);
    const [withLeading, setWithLeading] = useState(false);
    const [withTrailing, setWithTrailing] = useState(false);
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Row label="size">
            {SIZES.map((s) => (
              <Ctrl key={s} label={s} active={size === s} onClick={() => setSize(s)} />
            ))}
          </Row>
          <Row label="disabled">
            <Ctrl label={disabled ? 'true' : 'false'} active={disabled} onClick={() => setDisabled((v) => !v)} />
          </Row>
          <Row label="error">
            <Ctrl label={error ? 'true' : 'false'} active={error} onClick={() => setError((v) => !v)} />
          </Row>
          <Row label="showSupportive">
            <Ctrl label={showSupportive ? 'true' : 'false'} active={showSupportive} onClick={() => setShowSupportive((v) => !v)} />
          </Row>
          <Row label="showCounter">
            <Ctrl label={showCounter ? 'true' : 'false'} active={showCounter} onClick={() => setShowCounter((v) => !v)} />
          </Row>
          <Row label="leading">
            <Ctrl label={withLeading ? 'true' : 'false'} active={withLeading} onClick={() => setWithLeading((v) => !v)} />
          </Row>
          <Row label="trailing">
            <Ctrl label={withTrailing ? 'true' : 'false'} active={withTrailing} onClick={() => setWithTrailing((v) => !v)} />
          </Row>
        </div>

        {/* Preview */}
        <TextField
          name="playground"
          label="Correo electrónico"
          placeholder="Ingresa tu correo"
          value={value}
          size={size}
          disabled={disabled}
          error={error}
          showSupportive={showSupportive}
          supportiveText={error ? 'Ingresa un correo válido.' : 'Texto de soporte'}
          showCounter={showCounter}
          maxLength={200}
          leading={withLeading ? IconAt : undefined}
          trailing={withTrailing ? IconSearch : undefined}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

// ── All States ────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <TextField
        name="default"
        label="Default"
        placeholder="Ingresa texto aquí..."
        maxLength={200}
      />
      <TextField
        name="filled"
        label="Filled"
        placeholder="Ingresa texto aquí..."
        defaultValue="Valor de ejemplo"
        maxLength={200}
      />
      <TextField
        name="error"
        label="Error"
        placeholder="Ingresa texto aquí..."
        error
        supportiveText="Este campo es requerido."
        maxLength={200}
      />
      <TextField
        name="disabled"
        label="Disabled"
        placeholder="Ingresa texto aquí..."
        disabled
        maxLength={200}
      />
      <TextField
        name="with-counter"
        label="Con contador"
        placeholder="Ingresa texto aquí..."
        showCounter
        maxLength={50}
      />
      <TextField
        name="no-supportive"
        label="Sin texto de soporte"
        placeholder="Ingresa texto aquí..."
        showSupportive={false}
        maxLength={200}
      />
    </div>
  ),
};

// ── All Sizes ─────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      {SIZES.map((s) => (
        <TextField
          key={s}
          name={`size-${s}`}
          label={`Size ${s}`}
          placeholder="Ingresa texto aquí..."
          size={s}
          maxLength={200}
        />
      ))}
    </div>
  ),
};

// ── With Leading / Trailing ───────────────────────────────
export const WithSlots = {
  name: 'With Leading & Trailing',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <TextField
        name="leading"
        label="Con leading"
        placeholder="Buscar..."
        size="m"
        leading={IconSearch}
        maxLength={200}
      />
      <TextField
        name="trailing"
        label="Con trailing"
        placeholder="Ingresa tu correo"
        size="m"
        trailing={IconAt}
        maxLength={200}
      />
      <TextField
        name="both"
        label="Leading + Trailing"
        placeholder="Ingresa texto..."
        size="m"
        leading={IconAt}
        trailing={IconSearch}
        maxLength={200}
      />
    </div>
  ),
};
