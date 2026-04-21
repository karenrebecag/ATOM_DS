import React, { useState } from 'react';
import { TextArea } from '@atomchat.io/components-react';

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

const SIZES = ['m', 'xl'];

// ── Meta ──────────────────────────────────────────────────
export default {
  title: 'Components/TextArea',
  component: TextArea,
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
    const [showCounter, setShowCounter] = useState(true);
    const [showScrollbar, setShowScrollbar] = useState(true);
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '480px' }}>
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
          <Row label="showScrollbar">
            <Ctrl label={showScrollbar ? 'true' : 'false'} active={showScrollbar} onClick={() => setShowScrollbar((v) => !v)} />
          </Row>
        </div>

        {/* Preview */}
        <TextArea
          name="playground"
          label="Mensaje"
          placeholder="Escribe tu mensaje aquí..."
          value={value}
          size={size}
          disabled={disabled}
          error={error}
          showSupportive={showSupportive}
          supportiveText={error ? 'El mensaje no puede estar vacío.' : 'Texto de soporte'}
          showCounter={showCounter}
          showScrollbar={showScrollbar}
          maxLength={200}
          rows={4}
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '480px' }}>
      <TextArea
        name="default"
        label="Default"
        placeholder="Escribe tu mensaje aquí..."
        maxLength={200}
        rows={4}
      />
      <TextArea
        name="filled"
        label="Filled"
        placeholder="Escribe tu mensaje aquí..."
        defaultValue="Este es un mensaje de ejemplo con contenido."
        maxLength={200}
        rows={4}
      />
      <TextArea
        name="error"
        label="Error"
        placeholder="Escribe tu mensaje aquí..."
        error
        supportiveText="El mensaje no puede estar vacío."
        maxLength={200}
        rows={4}
      />
      <TextArea
        name="disabled"
        label="Disabled"
        placeholder="Escribe tu mensaje aquí..."
        disabled
        maxLength={200}
        rows={4}
      />
      <TextArea
        name="no-supportive"
        label="Sin texto de soporte"
        placeholder="Escribe tu mensaje aquí..."
        showSupportive={false}
        maxLength={200}
        rows={4}
      />
      <TextArea
        name="no-counter"
        label="Sin contador"
        placeholder="Escribe tu mensaje aquí..."
        showCounter={false}
        maxLength={200}
        rows={4}
      />
    </div>
  ),
};

// ── All Sizes ─────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '480px' }}>
      {SIZES.map((s) => (
        <TextArea
          key={s}
          name={`size-${s}`}
          label={`Size ${s}`}
          placeholder="Escribe tu mensaje aquí..."
          size={s}
          maxLength={200}
          rows={4}
        />
      ))}
    </div>
  ),
};
