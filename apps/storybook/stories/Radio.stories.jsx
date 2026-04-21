import React, { useState } from 'react';
import { Radio } from '@atomchat.io/components-react';

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
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [size, setSize] = useState('s');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Row label="size">
            {['s', 'm'].map((v) => (
              <Ctrl key={v} label={v} active={size === v} onClick={() => setSize(v)} />
            ))}
          </Row>
          <Row label="disabled">
            <Ctrl label={disabled ? 'true' : 'false'} active={disabled} onClick={() => setDisabled((v) => !v)} />
          </Row>
          <Row label="error">
            <Ctrl label={error ? 'true' : 'false'} active={error} onClick={() => setError((v) => !v)} />
          </Row>
          <Row label="checked">
            <Ctrl label={checked ? 'true' : 'false'} active={checked} onClick={() => setChecked((v) => !v)} />
          </Row>
        </div>

        {/* Preview */}
        <div style={{ padding: '24px', borderRadius: '8px', border: '1px solid var(--border-secondary)' }}>
          <Radio
            name="playground"
            value="option"
            size={size}
            disabled={disabled}
            error={error}
            errorText={error ? 'Este campo es requerido' : undefined}
            supportiveText="Texto de apoyo"
            checked={checked}
            onChange={() => setChecked((v) => !v)}
          >
            Opción de ejemplo
          </Radio>
        </div>
      </div>
    );
  },
};

// ── Radio Group ───────────────────────────────────────────
export const RadioGroup = {
  name: 'Radio Group',
  render: () => (
    <fieldset style={{ border: 'none', padding: '0', margin: '0' }}>
      <legend style={{ fontSize: '13px', fontWeight: '500', color: 'var(--fg-primary)', marginBottom: '12px' }}>
        Selecciona un plan
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Radio name="plan" value="free" size="s" defaultChecked supportiveText="Hasta 3 proyectos">Plan gratuito</Radio>
        <Radio name="plan" value="pro" size="s" supportiveText="Proyectos ilimitados">Plan Pro</Radio>
        <Radio name="plan" value="enterprise" size="s" supportiveText="Precio personalizado">Enterprise</Radio>
      </div>
    </fieldset>
  ),
};

// ── All States ────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
      <Radio name="states" value="unchecked" size="s">Sin marcar</Radio>
      <Radio name="states" value="checked" size="s" defaultChecked>Marcado</Radio>
      <Radio name="states" value="disabled" size="s" disabled>Deshabilitado</Radio>
      <Radio name="states" value="disabled-checked" size="s" disabled defaultChecked>Deshabilitado + marcado</Radio>
      <Radio name="states" value="error" size="s" error errorText="Este campo es requerido">Error</Radio>
      <Radio name="states" value="supportive" size="s" supportiveText="Texto de apoyo">Con texto de apoyo</Radio>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────
export const Sizes = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px' }}>
      {['s', 'm'].map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>{size}</span>
          <Radio name={`size-${size}`} value="a" size={size} supportiveText="Texto de apoyo">
            Opción de ejemplo
          </Radio>
        </div>
      ))}
    </div>
  ),
};

// ── Standalone ────────────────────────────────────────────
export const Standalone = {
  name: 'Standalone (sin label)',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', padding: '16px', alignItems: 'center' }}>
      <Radio name="standalone" value="a" size="s" />
      <Radio name="standalone" value="b" size="s" defaultChecked />
      <Radio name="standalone" value="c" size="s" disabled />
    </div>
  ),
};
