import React, { useState } from 'react';
import { Dialog, DialogHeadline, DialogContent, DialogActions, Button } from '@atomchat.io/components-react';

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
const lbl = { fontSize: '11px', fontWeight: '600', color: '#9ca3af', width: '80px', textTransform: 'uppercase', letterSpacing: '.05em', flexShrink: 0 };

/* ── Meta ────────────────────────────────────────────────── */
export default {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── Stories ─────────────────────────────────────────────── */
export const Playground = {
  render: () => {
    const [open,      setOpen]      = useState(false);
    const [size,      setSize]      = useState('s');
    const [alignment, setAlignment] = useState('left');
    const [hasBack,   setHasBack]   = useState(false);
    const [variant,   setVariant]   = useState('hug');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'system-ui, sans-serif' }}>
        {/* Trigger */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          <Button variant="Primary" size="m" onClick={() => setOpen(true)}>
            Open dialog
          </Button>
        </div>

        {/* Dialog */}
        <Dialog size={size} visible={open} showBackdrop onBackdropClick={() => setOpen(false)}>
          <DialogHeadline
            headline="Dialog title"
            supportingText={alignment === 'center' ? 'Supporting text below headline' : undefined}
            alignment={alignment}
            hasBack={hasBack}
            isClosable
            onBack={() => setOpen(false)}
            onClose={() => setOpen(false)}
          />
          <DialogContent>
            <p style={{ margin: 0, padding: '0 16px 16px', fontSize: '14px', color: '#6b7280' }}>
              This is the dialog body. It can contain any content — forms, lists, confirmations, or custom components.
            </p>
          </DialogContent>
          <DialogActions variant={variant}>
            <Button variant="Secondary" size="s" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="Primary" size="s" onClick={() => setOpen(false)}>Confirm</Button>
          </DialogActions>
        </Dialog>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={row}>
            <span style={lbl}>Size</span>
            {['s', 'm', 'l'].map((v) => (
              <Ctrl key={v} label={v} active={size === v} onClick={() => setSize(v)} />
            ))}
          </div>
          <div style={row}>
            <span style={lbl}>Alignment</span>
            {['left', 'center'].map((v) => (
              <Ctrl key={v} label={v} active={alignment === v} onClick={() => setAlignment(v)} />
            ))}
          </div>
          <div style={row}>
            <span style={lbl}>Actions</span>
            {['hug', 'fill'].map((v) => (
              <Ctrl key={v} label={v} active={variant === v} onClick={() => setVariant(v)} />
            ))}
          </div>
          <div style={row}>
            <span style={lbl}>Options</span>
            <Ctrl label="Back button" active={hasBack} onClick={() => setHasBack((p) => !p)} />
          </div>
        </div>
      </div>
    );
  },
};

export const LeftAligned = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button variant="Secondary" size="m" onClick={() => setOpen(true)}>Open</Button>
        <Dialog size="s" visible={open} showBackdrop onBackdropClick={() => setOpen(false)}>
          <DialogHeadline headline="Edit profile" isClosable onClose={() => setOpen(false)} />
          <DialogContent>
            <p style={{ margin: 0, padding: '0 16px 16px', fontSize: '14px', color: '#6b7280' }}>
              Update your profile information. Changes will be saved automatically.
            </p>
          </DialogContent>
          <DialogActions variant="hug">
            <Button variant="Secondary" size="s" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="Primary" size="s" onClick={() => setOpen(false)}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
};

export const CenterAligned = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button variant="Secondary" size="m" onClick={() => setOpen(true)}>Open</Button>
        <Dialog size="s" visible={open} showBackdrop onBackdropClick={() => setOpen(false)}>
          <DialogHeadline
            headline="Confirm action"
            supportingText="This action cannot be undone."
            alignment="center"
            isClosable
            onClose={() => setOpen(false)}
          />
          <DialogContent>
            <p style={{ margin: 0, padding: '0 16px 16px', fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
              Are you sure you want to proceed?
            </p>
          </DialogContent>
          <DialogActions variant="fill">
            <Button variant="Secondary" size="s" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="Primary" size="s" onClick={() => setOpen(false)}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
};

export const Destructive = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button variant="Destructive Primary" size="m" onClick={() => setOpen(true)}>Delete account</Button>
        <Dialog size="s" visible={open} showBackdrop onBackdropClick={() => setOpen(false)}>
          <DialogHeadline headline="Delete account" isClosable onClose={() => setOpen(false)} />
          <DialogContent>
            <p style={{ margin: 0, padding: '0 16px 16px', fontSize: '14px', color: '#6b7280' }}>
              This will permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </DialogContent>
          <DialogActions variant="hug" counterText="Permanent action">
            <Button variant="Secondary" size="s" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="Destructive Primary" size="s" onClick={() => setOpen(false)}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
};
