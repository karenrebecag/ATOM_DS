import React, { useState } from 'react';
import { Tag } from '@atomchat.io/components-react';

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

// ── Icon sample ───────────────────────────────────────────
const IconStar = (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1L2 5.3l4.2-.7L8 1z" />
  </svg>
);

const INTENTS = ['success', 'warning', 'danger', 'info', 'neutral', 'brand', 'ai'];
const VARIANTS = ['filled', 'outlined', 'ghost'];
const SIZES = ['xs', 's', 'm'];

// ── Meta ──────────────────────────────────────────────────
export default {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [intent, setIntent] = useState('success');
    const [variant, setVariant] = useState('filled');
    const [size, setSize] = useState('m');
    const [hasDots, setHasDots] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [withIcon, setWithIcon] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Row label="intent">
            {INTENTS.map((v) => (
              <Ctrl key={v} label={v} active={intent === v} onClick={() => setIntent(v)} />
            ))}
          </Row>
          <Row label="variant">
            {VARIANTS.map((v) => (
              <Ctrl key={v} label={v} active={variant === v} onClick={() => setVariant(v)} />
            ))}
          </Row>
          <Row label="size">
            {SIZES.map((s) => (
              <Ctrl key={s} label={s} active={size === s} onClick={() => setSize(s)} />
            ))}
          </Row>
          <Row label="hasDots">
            <Ctrl label={hasDots ? 'true' : 'false'} active={hasDots} onClick={() => setHasDots((v) => !v)} />
          </Row>
          <Row label="disabled">
            <Ctrl label={disabled ? 'true' : 'false'} active={disabled} onClick={() => setDisabled((v) => !v)} />
          </Row>
          <Row label="icon">
            <Ctrl label={withIcon ? 'true' : 'false'} active={withIcon} onClick={() => setWithIcon((v) => !v)} />
          </Row>
        </div>

        {/* Preview */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Tag
            intent={intent}
            variant={variant}
            size={size}
            hasDots={hasDots}
            disabled={disabled}
            icon={withIcon ? IconStar : undefined}
          >
            Etiqueta
          </Tag>
        </div>
      </div>
    );
  },
};

// ── All Intents ───────────────────────────────────────────
export const AllIntents = {
  name: 'All Intents × Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '8px' }}>{variant}</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {INTENTS.map((intent) => (
              <Tag key={intent} intent={intent} variant={variant} size="m">{intent}</Tag>
            ))}
            <Tag variant={variant} size="m" disabled>disabled</Tag>
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── All Sizes ─────────────────────────────────────────────
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      {SIZES.map((s) => (
        <Tag key={s} intent="info" variant="filled" size={s}>{s}</Tag>
      ))}
    </div>
  ),
};

// ── With Dots ─────────────────────────────────────────────
export const WithDots = {
  name: 'With Status Dot',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {INTENTS.map((intent) => (
        <Tag key={intent} intent={intent} variant="filled" size="m" hasDots>{intent}</Tag>
      ))}
    </div>
  ),
};

// ── With Icon ─────────────────────────────────────────────
export const WithIcon = {
  name: 'With Icon',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {INTENTS.map((intent) => (
        <Tag key={intent} intent={intent} variant="filled" size="m" icon={IconStar}>{intent}</Tag>
      ))}
    </div>
  ),
};
