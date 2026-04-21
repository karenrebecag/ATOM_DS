import React, { useState } from 'react';
import { LogoBadge } from '@atomchat.io/components-react';

const LIGHT_SRC = 'https://pub-09dc8675a13e4b6d9ff1f7e15d49ade2.r2.dev/atomchat-logo.png';
const DARK_SRC  = 'https://pub-09dc8675a13e4b6d9ff1f7e15d49ade2.r2.dev/atomchat-logo-dark.webp';

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

/* ── Meta ────────────────────────────────────────────────── */
export default {
  title: 'Components/LogoBadge',
  component: LogoBadge,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── Stories ─────────────────────────────────────────────── */
export const Playground = {
  render: () => {
    const [theme,  setTheme]  = useState('default');
    const [height, setHeight] = useState('32px');

    const inverted = theme === 'inverted';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div
          data-nav-theme={theme}
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '32px',
            background: inverted ? 'var(--bg-inverse-primary, #18181b)' : 'var(--bg-primary, #fff)',
            borderRadius: '8px',
            transition: 'background .2s',
          }}
        >
          <LogoBadge lightImage={LIGHT_SRC} darkImage={DARK_SRC} alt="ATOM" height={height} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', width: '72px', textTransform: 'uppercase', letterSpacing: '.05em', flexShrink: 0 }}>Theme</span>
            {['default', 'inverted'].map((v) => (
              <Ctrl key={v} label={v} active={theme === v} onClick={() => setTheme(v)} />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', width: '72px', textTransform: 'uppercase', letterSpacing: '.05em', flexShrink: 0 }}>Height</span>
            {['24px', '32px', '40px', '48px'].map((v) => (
              <Ctrl key={v} label={v} active={height === v} onClick={() => setHeight(v)} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const LightTheme = {
  render: () => (
    <div data-nav-theme="default" style={{ padding: '32px', background: 'var(--bg-primary, #fff)', display: 'inline-block', borderRadius: '8px' }}>
      <LogoBadge lightImage={LIGHT_SRC} darkImage={DARK_SRC} alt="ATOM" />
    </div>
  ),
};

export const DarkTheme = {
  render: () => (
    <div data-nav-theme="inverted" style={{ padding: '32px', background: 'var(--bg-inverse-primary, #18181b)', display: 'inline-block', borderRadius: '8px' }}>
      <LogoBadge lightImage={LIGHT_SRC} darkImage={DARK_SRC} alt="ATOM" />
    </div>
  ),
};

export const CustomSize = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      {['24px', '32px', '40px', '48px'].map((h) => (
        <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'system-ui', width: '36px' }}>{h}</span>
          <LogoBadge lightImage={LIGHT_SRC} darkImage={DARK_SRC} alt="ATOM" height={h} />
        </div>
      ))}
    </div>
  ),
};
