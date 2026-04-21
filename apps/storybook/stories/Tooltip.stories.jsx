import React, { useState } from 'react';
import { Tooltip } from '@atomchat.io/components-react';

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

const defaultBody = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';

// ── Meta ──────────────────────────────────────────────────
export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [iconType, setIconType] = useState('info');
    const [posX, setPosX] = useState('center');
    const [posY, setPosY] = useState('top');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Row label="iconType">
            {['info', 'question', 'alert'].map((v) => (
              <Ctrl key={v} label={v} active={iconType === v} onClick={() => setIconType(v)} />
            ))}
          </Row>
          <Row label="posX">
            {['center', 'left', 'right'].map((v) => (
              <Ctrl key={v} label={v} active={posX === v} onClick={() => setPosX(v)} />
            ))}
          </Row>
          <Row label="posY">
            {['top', 'bottom'].map((v) => (
              <Ctrl key={v} label={v} active={posY === v} onClick={() => setPosY(v)} />
            ))}
          </Row>
        </div>

        {/* Preview — extra padding so the tooltip card has room */}
        <div style={{ padding: '120px 80px' }}>
          <Tooltip
            text="Pasa el cursor"
            iconType={iconType}
            heading="Tooltip"
            body={defaultBody}
            posX={posX}
            posY={posY}
          />
        </div>
      </div>
    );
  },
};

// ── All Positions ─────────────────────────────────────────
export const AllPositions = {
  name: 'All Positions',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '160px 80px' }}>
      {[
        { posX: 'center', posY: 'top',    label: 'top · center' },
        { posX: 'center', posY: 'bottom', label: 'bottom · center' },
        { posX: 'left',   posY: 'top',    label: 'top · left' },
        { posX: 'right',  posY: 'top',    label: 'top · right' },
      ].map(({ posX, posY, label }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)' }}>{label}</span>
          <Tooltip text="Hover" heading={label} body={defaultBody} posX={posX} posY={posY} />
        </div>
      ))}
    </div>
  ),
};

// ── All Icon Types ────────────────────────────────────────
export const AllIconTypes = {
  name: 'All Icon Types',
  render: () => (
    <div style={{ display: 'flex', gap: '80px', padding: '160px 80px' }}>
      {['info', 'question', 'alert'].map((type) => (
        <Tooltip key={type} text={type} iconType={type} heading={type} body={defaultBody} />
      ))}
    </div>
  ),
};
