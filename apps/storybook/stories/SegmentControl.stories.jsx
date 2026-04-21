import React, { useState } from 'react';
import { SegmentControl } from '@atomchat.io/components-react';

// ── Icons ─────────────────────────────────────────────────
const IconDay = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M11.89 4.11l-1.06 1.06M4.11 11.89l-1.06 1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconInfo = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 8v3M8 5.5h.005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

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

// ── Items ─────────────────────────────────────────────────
const LABEL_ITEMS = [
  { label: 'Día' },
  { label: 'Semana' },
  { label: 'Mes' },
  { label: 'Año' },
];

const ICON_LABEL_ITEMS = [
  { label: 'Día', icon: IconDay },
  { label: 'Semana', icon: IconDay },
  { label: 'Mes', icon: IconDay },
];

const ICON_ONLY_ITEMS = [
  { icon: IconDay },
  { icon: IconDay },
  { icon: IconDay },
];

// ── Meta ──────────────────────────────────────────────────
export default {
  title: 'Components/SegmentControl',
  component: SegmentControl,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [size, setSize] = useState('m');
    const [mode, setMode] = useState('label');
    const [disabled, setDisabled] = useState(false);
    const [selected, setSelected] = useState(0);

    const itemSets = {
      label: LABEL_ITEMS,
      'icon + label': ICON_LABEL_ITEMS,
      'icon only': ICON_ONLY_ITEMS,
    };

    const items = itemSets[mode];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Row label="size">
            {['xs', 's', 'm', 'l', 'xl'].map((s) => (
              <Ctrl key={s} label={s} active={size === s} onClick={() => setSize(s)} />
            ))}
          </Row>
          <Row label="mode">
            {Object.keys(itemSets).map((m) => (
              <Ctrl key={m} label={m} active={mode === m} onClick={() => { setMode(m); setSelected(0); }} />
            ))}
          </Row>
          <Row label="disabled">
            <Ctrl label={disabled ? 'true' : 'false'} active={disabled} onClick={() => setDisabled((v) => !v)} />
          </Row>
        </div>

        {/* Preview */}
        <SegmentControl
          size={size}
          items={items}
          selectedIndex={selected}
          disabled={disabled}
          onChange={setSelected}
          name="playground"
        />
      </div>
    );
  },
};

// ── All Sizes ─────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
      {['xs', 's', 'm', 'l', 'xl'].map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', minWidth: '24px' }}>{size}</span>
          <SegmentControl size={size} items={LABEL_ITEMS} selectedIndex={0} />
        </div>
      ))}
    </div>
  ),
};

// ── All States ────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>solo labels</span>
        <SegmentControl items={LABEL_ITEMS} selectedIndex={1} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>icon + label</span>
        <SegmentControl items={ICON_LABEL_ITEMS} selectedIndex={0} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>icon only</span>
        <SegmentControl items={ICON_ONLY_ITEMS} selectedIndex={2} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>con info icon</span>
        <SegmentControl
          items={[
            { label: 'Día', info: IconInfo },
            { label: 'Semana', info: IconInfo },
            { label: 'Mes' },
          ]}
          selectedIndex={0}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>disabled (global)</span>
        <SegmentControl items={LABEL_ITEMS} selectedIndex={0} disabled />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>disabled (item individual)</span>
        <SegmentControl
          items={[
            { label: 'Activo' },
            { label: 'También activo' },
            { label: 'Deshabilitado', disabled: true },
          ]}
          selectedIndex={0}
        />
      </div>
    </div>
  ),
};
