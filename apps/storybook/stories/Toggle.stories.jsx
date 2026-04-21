import React, { useState } from 'react';
import { Toggle } from '@atomchat.io/components-react';

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
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [size, setSize] = useState('s');
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [withSupportive, setWithSupportive] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Row label="size">
            {['s', 'm'].map((v) => (
              <Ctrl key={v} label={v} active={size === v} onClick={() => setSize(v)} />
            ))}
          </Row>
          <Row label="checked">
            <Ctrl label={checked ? 'true' : 'false'} active={checked} onClick={() => setChecked((v) => !v)} />
          </Row>
          <Row label="disabled">
            <Ctrl label={disabled ? 'true' : 'false'} active={disabled} onClick={() => setDisabled((v) => !v)} />
          </Row>
          <Row label="error">
            <Ctrl label={error ? 'true' : 'false'} active={error} onClick={() => setError((v) => !v)} />
          </Row>
          <Row label="supportive">
            <Ctrl label={withSupportive ? 'true' : 'false'} active={withSupportive} onClick={() => setWithSupportive((v) => !v)} />
          </Row>
        </div>

        {/* Preview */}
        <Toggle
          name="playground"
          size={size}
          checked={checked}
          disabled={disabled}
          error={error}
          errorText={error ? 'Esta opción es requerida.' : undefined}
          supportiveText={withSupportive ? 'Solo recibirás actualizaciones relevantes.' : undefined}
          onChange={() => setChecked((v) => !v)}
        >
          Activar notificaciones
        </Toggle>
      </div>
    );
  },
};

// ── All States ────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toggle name="s-off" size="s">Desactivado</Toggle>
      <Toggle name="s-on" size="s" defaultChecked>Activado</Toggle>
      <Toggle name="s-disabled" size="s" disabled>Deshabilitado</Toggle>
      <Toggle name="s-error" size="s" error errorText="Esta opción es requerida.">Con error</Toggle>
      <Toggle name="s-supportive" size="s" supportiveText="Solo recibirás actualizaciones relevantes.">Con texto de soporte</Toggle>
      <Toggle name="s-bare-off" size="s" />
      <Toggle name="s-bare-on" size="s" defaultChecked />
    </div>
  ),
};

// ── All Sizes ─────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {['s', 'm'].map((s) => (
        <Toggle key={s} name={`size-${s}`} size={s} supportiveText="Texto de soporte">
          Tamaño {s}
        </Toggle>
      ))}
    </div>
  ),
};

// ── Standalone ────────────────────────────────────────────
export const Standalone = {
  name: 'Standalone (sin etiqueta)',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Toggle name="bare-off" size="s" />
      <Toggle name="bare-on" size="s" defaultChecked />
      <Toggle name="bare-dis" size="s" disabled />
      <Toggle name="bare-off-m" size="m" />
      <Toggle name="bare-on-m" size="m" defaultChecked />
    </div>
  ),
};
