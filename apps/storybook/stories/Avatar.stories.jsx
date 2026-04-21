import React, { useState } from 'react';
import { Avatar } from '@atomchat.io/components-react';

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

const row = { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' };
const lbl = { fontSize: '11px', fontWeight: '600', color: '#9ca3af', width: '72px', textTransform: 'uppercase', letterSpacing: '.05em', flexShrink: 0 };

const SAMPLE_SRC = 'https://i.pravatar.cc/150?img=5';

/* ── Meta ────────────────────────────────────────────────── */
export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── Stories ─────────────────────────────────────────────── */
export const Playground = {
  render: () => {
    const [type,  setType]  = useState('initials');
    const [size,  setSize]  = useState('m');
    const [shape, setShape] = useState('circle');
    const [badge, setBadge] = useState('none');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          <Avatar
            type={type}
            size={size}
            shape={shape}
            badge={badge}
            initials="JD"
            src={SAMPLE_SRC}
            alt="Jane Doe"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={row}>
            <span style={lbl}>Type</span>
            {['initials', 'image', 'image-border', 'icon'].map((v) => (
              <Ctrl key={v} label={v} active={type === v} onClick={() => setType(v)} />
            ))}
          </div>
          <div style={row}>
            <span style={lbl}>Size</span>
            {['xs', 's', 'm', 'l'].map((v) => (
              <Ctrl key={v} label={v} active={size === v} onClick={() => setSize(v)} />
            ))}
          </div>
          <div style={row}>
            <span style={lbl}>Shape</span>
            {['circle', 'square'].map((v) => (
              <Ctrl key={v} label={v} active={shape === v} onClick={() => setShape(v)} />
            ))}
          </div>
          <div style={row}>
            <span style={lbl}>Badge</span>
            {['none', 'verified', 'online', 'offline', 'idle', 'inactive'].map((v) => (
              <Ctrl key={v} label={v} active={badge === v} onClick={() => setBadge(v)} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const AllTypes = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', padding: '16px' }}>
      {[
        { type: 'initials', label: 'initials' },
        { type: 'image',    label: 'image' },
        { type: 'image-border', label: 'image-border' },
        { type: 'icon',     label: 'icon' },
      ].map(({ type, label }) => (
        <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Avatar type={type} size="m" initials="JD" src={SAMPLE_SRC} alt="Jane Doe" />
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'system-ui' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', padding: '16px' }}>
      {['xs', 's', 'm', 'l'].map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Avatar type="initials" size={s} initials="JD" alt="Jane Doe" />
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'system-ui' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllBadges = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', padding: '24px' }}>
      {['none', 'verified', 'online', 'offline', 'idle', 'inactive'].map((b) => (
        <div key={b} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Avatar type="initials" size="m" initials="JD" badge={b} alt="Jane Doe" />
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'system-ui' }}>{b}</span>
        </div>
      ))}
    </div>
  ),
};

export const Shapes = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', padding: '16px' }}>
      {['circle', 'square'].map((sh) => (
        <div key={sh} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Avatar type="initials" size="m" shape={sh} initials="JD" alt="Jane Doe" />
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'system-ui' }}>{sh}</span>
        </div>
      ))}
    </div>
  ),
};
