import React, { useState } from 'react';
import { EmptyState } from '@atomchat.io/components-react';

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
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── Stories ─────────────────────────────────────────────── */
export const Playground = {
  render: () => {
    const [size,       setSize]       = useState('s');
    const [showButton, setShowButton] = useState(false);
    const [resultText, setResultText] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          <EmptyState
            size={size}
            heading="No results found"
            supportingText="Try adjusting your search or filters."
            resultText={resultText ? '"design system"' : undefined}
            showButton={showButton}
            buttonText="Create project"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={row}>
            <span style={lbl}>Size</span>
            {['s', 'm'].map((v) => (
              <Ctrl key={v} label={v} active={size === v} onClick={() => setSize(v)} />
            ))}
          </div>
          <div style={row}>
            <span style={lbl}>Options</span>
            <Ctrl label="Result text" active={resultText}  onClick={() => setResultText((p) => !p)} />
            <Ctrl label="Button (m)"  active={showButton}  onClick={() => setShowButton((p) => !p)} />
          </div>
        </div>
      </div>
    );
  },
};

export const Small = {
  render: () => (
    <EmptyState
      size="s"
      heading="No results found"
      supportingText="Try a different search term."
      resultText='"design system"'
    />
  ),
};

export const SmallWithoutResult = {
  render: () => (
    <EmptyState
      size="s"
      heading="No notifications"
      supportingText="You're all caught up."
    />
  ),
};

export const Medium = {
  render: () => (
    <EmptyState
      size="m"
      heading="No projects yet"
      supportingText="Create your first project to get started."
      showButton
      buttonText="Create project"
    />
  ),
};

export const MediumWithLink = {
  render: () => (
    <EmptyState
      size="m"
      heading="No projects yet"
      supportingText="Create your first project to get started."
      buttonText="Go to projects"
      buttonHref="/projects"
      showButton
    />
  ),
};

export const WithCustomIcon = {
  render: () => (
    <EmptyState
      size="m"
      heading="No files uploaded"
      supportingText="Upload your first file to get started."
      showButton
      buttonText="Upload file"
      icon={
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      }
    />
  ),
};
