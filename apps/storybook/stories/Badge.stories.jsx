import React, { useState, useRef } from 'react';
import { Badge } from '@atomchat.io/components-react';

/* ── Helpers ─────────────────────────────────────────────── */

/** Mirrors Badge's internal overflow logic so we can compute
 *  the display string for the odometer target. */
function getDisplay(count, context) {
  if (count <= 0) return '0';
  if (context === 'inbox') return count >= 50 ? '+50' : String(count);
  return count > 99 ? '99+' : String(count);
}

/* ── Control chip ────────────────────────────────────────── */
const Ctrl = ({ label, active, onClick, wide }) => (
  <button
    onClick={onClick}
    style={{
      padding: wide ? '4px 16px' : '4px 12px',
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
const lbl = {
  fontSize: '11px', fontWeight: '600', color: '#9ca3af',
  width: '72px', textTransform: 'uppercase', letterSpacing: '.05em', flexShrink: 0,
};

/* ── Meta ────────────────────────────────────────────────── */
export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── Playground ──────────────────────────────────────────── */
export const Playground = {
  render: () => {
    const [activeCount,    setActiveCount]    = useState(5);
    const [displayedCount, setDisplayedCount] = useState(5);
    const [context,        setContext]        = useState('default');
    const [type,           setType]           = useState('neutral');
    const [badgeState,     setBadgeState]     = useState('default');

    const badgeRef = useRef(null);
    const timerRef = useRef(null);

    /** Animate the badge number to `newCount` via odometer.
     *  We delay the React re-render so it doesn't overwrite
     *  the odometer roller DOM during the animation. */
    function animateTo(newCount) {
      const clamped = Math.max(1, Math.min(999, newCount));
      if (clamped === activeCount) return;

      setActiveCount(clamped);

      const textEl = badgeRef.current?.querySelector('[data-badge-text]');
      if (textEl && window.__atomUpdateOdometer) {
        window.__atomUpdateOdometer(textEl, getDisplay(clamped, context), { duration: 0.5 });
      }

      // Sync React state after animation finishes (~600ms GSAP + buffer)
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setDisplayedCount(clamped), 750);
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Preview */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px' }}>
          <Badge
            ref={badgeRef}
            count={displayedCount}
            context={context}
            type={type}
            state={badgeState}
          />
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', borderTop: '1px solid #f3f4f6' }}>

          {/* Count — inc / dec + preset chips */}
          <div style={row}>
            <span style={lbl}>Count</span>

            {/* Decrement */}
            <Ctrl label="−10" onClick={() => animateTo(activeCount - 10)} />
            <Ctrl label="−1"  onClick={() => animateTo(activeCount - 1)} />

            {/* Current value display */}
            <span style={{
              fontSize: '13px', fontWeight: '700', minWidth: '36px',
              textAlign: 'center', color: '#111', fontFamily: 'system-ui',
            }}>
              {activeCount}
            </span>

            {/* Increment */}
            <Ctrl label="+1"  onClick={() => animateTo(activeCount + 1)} />
            <Ctrl label="+10" onClick={() => animateTo(activeCount + 10)} />

            {/* Divider */}
            <span style={{ width: '1px', height: '16px', background: '#e5e7eb', margin: '0 4px', flexShrink: 0 }} />

            {/* Preset values (interesting overflow thresholds) */}
            {[1, 5, 49, 50, 99, 100].map((v) => (
              <Ctrl key={v} label={String(v)} active={activeCount === v} onClick={() => animateTo(v)} />
            ))}
          </div>

          <div style={row}>
            <span style={lbl}>Context</span>
            {['default', 'inbox'].map((v) => (
              <Ctrl key={v} label={v} active={context === v} onClick={() => setContext(v)} />
            ))}
          </div>

          <div style={row}>
            <span style={lbl}>Type</span>
            {['neutral', 'inbox', 'info'].map((v) => (
              <Ctrl key={v} label={v} active={type === v} onClick={() => setType(v)} />
            ))}
          </div>

          <div style={row}>
            <span style={lbl}>State</span>
            {['default', 'focused', 'subtle'].map((v) => (
              <Ctrl key={v} label={v} active={badgeState === v} onClick={() => setBadgeState(v)} />
            ))}
          </div>

        </div>
      </div>
    );
  },
};

/* ── All Types ───────────────────────────────────────────── */
export const AllTypes = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '16px' }}>
      {[
        { type: 'neutral', state: 'default' },
        { type: 'inbox',   state: 'focused' },
        { type: 'info',    state: 'default' },
      ].map(({ type, state }) => (
        <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Badge count={5} type={type} state={state} />
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'system-ui' }}>{type}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── All States ──────────────────────────────────────────── */
export const AllStates = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '16px' }}>
      {['default', 'focused', 'subtle'].map((st) => (
        <div key={st} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Badge count={5} type="neutral" state={st} />
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'system-ui' }}>{st}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── Overflow — Default Context ──────────────────────────── */
export const OverflowDefault = {
  name: 'Overflow — Default Context',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '16px' }}>
      {[5, 99, 100, 999].map((n) => (
        <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Badge count={n} context="default" type="neutral" />
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'system-ui' }}>count={n}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── Overflow — Inbox Context ────────────────────────────── */
export const OverflowInbox = {
  name: 'Overflow — Inbox Context',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '16px' }}>
      {[10, 49, 50, 100].map((n) => (
        <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Badge count={n} context="inbox" type="inbox" state="focused" />
          <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'system-ui' }}>count={n}</span>
        </div>
      ))}
    </div>
  ),
};
