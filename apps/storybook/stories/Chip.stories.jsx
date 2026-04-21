import React, { useState } from 'react';
import { Chip } from '@atomchat.io/components-react';

export default {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
};

const VARIANTS = ['filled', 'outlined'];
const SIZES = ['xs', 's', 'm', 'l', 'xl'];

const CtrlChip = ({ label, active, onClick, danger = false }) => (
  <button
    onClick={onClick}
    style={{
      padding: '4px 12px',
      borderRadius: '999px',
      fontSize: '12px',
      fontFamily: 'system-ui, sans-serif',
      border: '1px solid',
      borderColor: active ? (danger ? '#ef4444' : '#111') : '#e5e7eb',
      background: active ? (danger ? '#ef4444' : '#111') : '#fff',
      color: active ? '#fff' : '#374151',
      cursor: 'pointer',
      transition: 'all .15s',
    }}
  >
    {label}
  </button>
);

const row = { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' };
const label = { fontSize: '11px', fontWeight: '600', color: '#9ca3af', width: '80px', textTransform: 'uppercase', letterSpacing: '.05em', flexShrink: 0 };

export const Playground = {
  render: () => {
    const [variant, setVariant] = useState('filled');
    const [size, setSize]       = useState('m');
    const [selected, setSelected]     = useState(false);
    const [error, setError]           = useState(false);
    const [disabled, setDisabled]     = useState(false);
    const [dismissible, setDismissible] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
        <Chip
          label="Category"
          variant={variant}
          size={size}
          selected={selected}
          error={error}
          disabled={disabled}
          dismissible={dismissible}
          onClick={() => !disabled && setSelected((v) => !v)}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '480px' }}>
          <div style={row}>
            <span style={label}>Variant</span>
            {VARIANTS.map((v) => <CtrlChip key={v} label={v} active={variant === v} onClick={() => setVariant(v)} />)}
          </div>

          <div style={row}>
            <span style={label}>Size</span>
            {SIZES.map((s) => <CtrlChip key={s} label={s} active={size === s} onClick={() => setSize(s)} />)}
          </div>

          <div style={row}>
            <span style={label}>State</span>
            <CtrlChip label="Selected"    active={selected}    onClick={() => setSelected((v) => !v)} />
            <CtrlChip label="Error"       active={error}       onClick={() => setError((v) => !v)}       danger={error} />
            <CtrlChip label="Disabled"    active={disabled}    onClick={() => setDisabled((v) => !v)}    danger={disabled} />
            <CtrlChip label="Dismissible" active={dismissible} onClick={() => setDismissible((v) => !v)} />
          </div>
        </div>
      </div>
    );
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px' }}>
      <Chip variant="filled"   size="m" label="Filled" />
      <Chip variant="filled"   size="m" label="Filled selected" selected />
      <Chip variant="outlined" size="m" label="Outlined" />
      <Chip variant="outlined" size="m" label="Outlined selected" selected />
      <Chip variant="filled"   size="m" label="Error" error />
      <Chip variant="outlined" size="m" label="Error outlined" error />
      <Chip variant="filled"   size="m" label="Disabled" disabled />
      <Chip variant="filled"   size="m" label="Dismissible" dismissible />
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', padding: '16px' }}>
      {SIZES.map((s) => (
        <Chip key={s} variant="filled" size={s} label={s} />
      ))}
    </div>
  ),
};
