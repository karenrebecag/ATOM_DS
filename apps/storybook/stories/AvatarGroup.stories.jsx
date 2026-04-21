import React, { useState } from 'react';
import { AvatarGroup } from '@atomchat.io/components-react';

/* ── Sample data ─────────────────────────────────────────── */
const AVATARS_IMAGE = [
  { src: 'https://i.pravatar.cc/150?img=1', alt: 'Alice',   badge: 'online' },
  { src: 'https://i.pravatar.cc/150?img=2', alt: 'Bob',     badge: 'offline' },
  { src: 'https://i.pravatar.cc/150?img=3', alt: 'Carol',   badge: 'idle' },
  { src: 'https://i.pravatar.cc/150?img=4', alt: 'David',   badge: 'none' },
  { src: 'https://i.pravatar.cc/150?img=5', alt: 'Eva',     badge: 'online' },
  { src: 'https://i.pravatar.cc/150?img=6', alt: 'Frank',   badge: 'none' },
  { src: 'https://i.pravatar.cc/150?img=7', alt: 'Grace',   badge: 'none' },
];

const AVATARS_INITIALS = [
  { initials: 'AL', alt: 'Alice',  badge: 'online' },
  { initials: 'BO', alt: 'Bob',    badge: 'offline' },
  { initials: 'CA', alt: 'Carol',  badge: 'idle' },
  { initials: 'DA', alt: 'David',  badge: 'none' },
  { initials: 'EV', alt: 'Eva',    badge: 'online' },
  { initials: 'FR', alt: 'Frank',  badge: 'none' },
  { initials: 'GR', alt: 'Grace',  badge: 'none' },
];

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

/* ── Meta ────────────────────────────────────────────────── */
export default {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── Stories ─────────────────────────────────────────────── */
export const Playground = {
  render: () => {
    const [type,  setType]  = useState('image-border');
    const [size,  setSize]  = useState('s');
    const [shape, setShape] = useState('circle');
    const [max,   setMax]   = useState(5);

    const avatars = type === 'initials' ? AVATARS_INITIALS : AVATARS_IMAGE;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          <AvatarGroup
            avatars={avatars}
            type={type}
            size={size}
            shape={shape}
            max={max}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={row}>
            <span style={lbl}>Type</span>
            {['image-border', 'image', 'initials'].map((v) => (
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
            <span style={lbl}>Max</span>
            {[3, 4, 5, 6].map((v) => (
              <Ctrl key={v} label={String(v)} active={max === v} onClick={() => setMax(v)} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px' }}>
      {['xs', 's', 'm', 'l'].map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'system-ui', width: '24px' }}>{s}</span>
          <AvatarGroup avatars={AVATARS_IMAGE} size={s} max={5} />
        </div>
      ))}
    </div>
  ),
};

export const WithOverflow = {
  render: () => (
    <AvatarGroup avatars={AVATARS_IMAGE} size="m" max={3} />
  ),
};

export const WithBadges = {
  render: () => (
    <AvatarGroup avatars={AVATARS_IMAGE} size="m" max={5} />
  ),
};

export const InitialsType = {
  render: () => (
    <AvatarGroup avatars={AVATARS_INITIALS} type="initials" size="m" max={5} />
  ),
};

export const Shapes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px' }}>
      {['circle', 'square'].map((sh) => (
        <div key={sh} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'system-ui', width: '48px' }}>{sh}</span>
          <AvatarGroup avatars={AVATARS_IMAGE} shape={sh} size="m" max={5} />
        </div>
      ))}
    </div>
  ),
};
