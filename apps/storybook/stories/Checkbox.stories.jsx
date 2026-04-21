import React, { useState } from 'react';
import { Checkbox } from '@atomchat.io/components-react';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

const chip = (label, active, onClick, danger = false) => (
  <button
    key={label}
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

export const Playground = {
  render: () => {
    const [size, setSize] = useState('m');
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const toggle = (setter) => setter((v) => !v);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
        <Checkbox
          size={size}
          checked={checked}
          indeterminate={indeterminate}
          error={error}
          disabled={disabled}
          onChange={(e) => setChecked(e.target.checked)}
          label="Accept terms and conditions"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', width: '80px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Size</span>
            {['s', 'm'].map((s) => chip(s, size === s, () => setSize(s)))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', width: '80px', textTransform: 'uppercase', letterSpacing: '.05em' }}>State</span>
            {chip('Checked', checked, () => toggle(setChecked))}
            {chip('Indeterminate', indeterminate, () => toggle(setIndeterminate))}
            {chip('Error', error, () => toggle(setError), error)}
            {chip('Disabled', disabled, () => toggle(setDisabled), disabled)}
          </div>
        </div>
      </div>
    );
  },
};

export const AllStates = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
      <Checkbox size="m" label="Unchecked" />
      <Checkbox size="m" checked label="Checked" readOnly />
      <Checkbox size="m" indeterminate label="Indeterminate" readOnly />
      <Checkbox size="m" error label="Error" />
      <Checkbox size="m" disabled label="Disabled" />
      <Checkbox size="m" checked disabled label="Disabled + Checked" readOnly />
    </div>
  ),
};

export const SizeComparison = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', padding: '16px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: '#999' }}>Size S</span>
        <Checkbox size="s" label="Small unchecked" />
        <Checkbox size="s" checked label="Small checked" readOnly />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: '#999' }}>Size M</span>
        <Checkbox size="m" label="Medium unchecked" />
        <Checkbox size="m" checked label="Medium checked" readOnly />
      </div>
    </div>
  ),
};
