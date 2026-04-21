import React from 'react';
import { Button } from '@atomchat.io/components-react';

const logoSvg = (
  <svg width="100" height="24" viewBox="0 0 100 24" fill="none">
    <rect width="100" height="24" rx="4" fill="currentColor" opacity="0.15" />
    <text x="50" y="16" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">ATOM</text>
  </svg>
);

function NavLink({ label, active }) {
  return (
    <a
      href="#"
      style={{
        fontSize: '14px',
        fontWeight: active ? '600' : '400',
        color: active ? 'var(--fg-primary,#18181b)' : 'var(--fg-tertiary,#52525b)',
        textDecoration: 'none',
        transition: 'color .15s',
      }}
    >
      {label}
    </a>
  );
}

function Navbar({ scrolled }) {
  return (
    <nav
      data-nav-scrolled={String(scrolled || false)}
      data-nav-hidden="false"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: 'var(--bg-primary,#fff)',
        border: '1px solid var(--border-secondary,#e4e4e7)',
        borderRadius: 'var(--primitive-radius-s,8px)',
        width: '100%',
        maxWidth: '720px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {logoSvg}
        <div style={{ display: 'flex', gap: '16px' }}>
          <NavLink label="Home" active />
          <NavLink label="Features" />
          <NavLink label="Pricing" />
          <NavLink label="Docs" />
        </div>
      </div>
      <Button variant="Primary" size="s">Get started</Button>
    </nav>
  );
}

export default {
  title: 'Components/Navbar',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export const Playground = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
      <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>Default</p>
      <Navbar />
      <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>Scrolled (reduced padding)</p>
      <Navbar scrolled />
    </div>
  ),
};
