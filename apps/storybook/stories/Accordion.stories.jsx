import React, { useState } from 'react';
import { Accordion } from '@atomchat.io/components-react';

/* ── Content ─────────────────────────────────────────────── */
const ITEMS = [
  {
    title: 'What is ATOM Design System?',
    content: 'ATOM is a multi-framework design system built with Style Dictionary, pure CSS tokens, and framework-agnostic components for React, Vue, Angular, and Astro.',
  },
  {
    title: 'How do I install it?',
    content: "Install via npm: npm install @atomchat.io/css @atomchat.io/tokens. Import the CSS in your entry point and you're ready to go.",
  },
  {
    title: 'Does it support dark mode?',
    content: 'Yes. Add data-theme="dark" to your <html> element. All semantic color tokens will automatically switch to their dark-mode values.',
  },
  {
    title: 'Can I use it with any framework?',
    content: 'The CSS package is framework-agnostic. We also provide dedicated component packages for Astro, React, Vue, and Angular.',
  },
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
const lbl = { fontSize: '11px', fontWeight: '600', color: '#9ca3af', width: '104px', textTransform: 'uppercase', letterSpacing: '.05em', flexShrink: 0 };

/* ── Meta ────────────────────────────────────────────────── */
export default {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── Stories ─────────────────────────────────────────────── */
export const Playground = {
  render: () => {
    const [closeSiblings, setCloseSiblings] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px' }}>
        <Accordion items={ITEMS} closeSiblings={closeSiblings} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={row}>
            <span style={lbl}>Close siblings</span>
            <Ctrl label="On"  active={closeSiblings}  onClick={() => setCloseSiblings(true)} />
            <Ctrl label="Off" active={!closeSiblings} onClick={() => setCloseSiblings(false)} />
          </div>
        </div>
      </div>
    );
  },
};

export const SingleOpen = {
  name: 'Single Open (closeSiblings)',
  render: () => (
    <div style={{ maxWidth: '640px' }}>
      <Accordion items={ITEMS} closeSiblings={true} />
    </div>
  ),
};

export const MultiOpen = {
  name: 'Multi Open',
  render: () => (
    <div style={{ maxWidth: '640px' }}>
      <Accordion items={ITEMS} closeSiblings={false} />
    </div>
  ),
};

export const WithDefaultOpen = {
  name: 'With Default Open',
  render: () => (
    <div style={{ maxWidth: '640px' }}>
      <Accordion
        items={ITEMS.map((item, i) => ({ ...item, open: i === 0 }))}
        closeSiblings={true}
      />
    </div>
  ),
};
