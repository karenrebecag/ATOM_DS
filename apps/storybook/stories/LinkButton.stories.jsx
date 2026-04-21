import React, { useState } from 'react';
import { LinkButton } from '@atomchat.io/components-react';

/* ── Control chip ────────────────────────────────────────── */
const Ctrl = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '4px 12px',
      borderRadius: '999px',
      fontSize: '12px',
      fontFamily: 'system-ui, sans-serif',
      border: '1px solid',
      borderColor: active ? '#111' : '#e5e7eb',
      background: active ? '#111' : '#fff',
      color: active ? '#fff' : '#374151',
      cursor: 'pointer',
      transition: 'all .15s',
    }}
  >
    {label}
  </button>
);

const row  = { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' };
const lbl  = { fontSize: '11px', fontWeight: '600', color: '#9ca3af', width: '72px', textTransform: 'uppercase', letterSpacing: '.05em', flexShrink: 0 };

const SIZES = ['s', 'l'];

const ArrowIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
  </svg>
);

const ExternalIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
  </svg>
);

/* ── Meta ────────────────────────────────────────────────── */
export default {
  title: 'Components/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── Playground ──────────────────────────────────────────── */
export const Playground = {
  render: () => {
    const [size,     setSize]     = useState('l');
    const [disabled, setDisabled] = useState(false);
    const [loading,  setLoading]  = useState(false);
    const [withIcon, setWithIcon] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          <LinkButton
            href="#"
            size={size}
            disabled={disabled}
            loading={loading}
            iconRight={withIcon ? ArrowIcon : undefined}
          >
            Learn more
          </LinkButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={row}>
            <span style={lbl}>Size</span>
            {SIZES.map(s => (
              <Ctrl key={s} label={s} active={size === s} onClick={() => setSize(s)} />
            ))}
          </div>
          <div style={row}>
            <span style={lbl}>States</span>
            <Ctrl label="Disabled" active={disabled} onClick={() => setDisabled(v => !v)} />
            <Ctrl label="Loading"  active={loading}  onClick={() => setLoading(v => !v)} />
            <Ctrl label="With icon" active={withIcon} onClick={() => setWithIcon(v => !v)} />
          </div>
        </div>
      </div>
    );
  },
};

/* ── All Sizes ───────────────────────────────────────────── */
export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {SIZES.map(s => (
        <div key={s} style={row}>
          <span style={{ ...lbl, width: '24px' }}>{s}</span>
          <LinkButton href="#" size={s}>View details</LinkButton>
        </div>
      ))}
    </div>
  ),
};

/* ── With Icons ──────────────────────────────────────────── */
export const WithIcons = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <LinkButton href="#" size="l" iconRight={ArrowIcon}>Continue</LinkButton>
      <LinkButton href="#" size="l" iconRight={ExternalIcon}>Open in new tab</LinkButton>
      <LinkButton href="#" size="s" iconRight={ArrowIcon}>Read more</LinkButton>
    </div>
  ),
};

/* ── States ──────────────────────────────────────────────── */
export const AllStates = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={row}>
        <span style={lbl}>Default</span>
        <LinkButton href="#" size="l">Learn more</LinkButton>
      </div>
      <div style={row}>
        <span style={lbl}>Disabled</span>
        <LinkButton href="#" size="l" disabled>Learn more</LinkButton>
      </div>
      <div style={row}>
        <span style={lbl}>Loading</span>
        <LinkButton href="#" size="l" loading>Learn more</LinkButton>
      </div>
    </div>
  ),
};
