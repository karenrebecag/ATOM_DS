import React, { useState } from 'react';
import { Marquee } from '@atomchat.io/components-react';

/* ── Content ─────────────────────────────────────────────── */
const StarSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="none" className="marquee__separator" aria-hidden="true">
    <path d="M17.6777 32.3223C12.9893 27.6339 6.63041 25 0 25C6.63041 25 12.9893 22.3661 17.6777 17.6777C22.3661 12.9893 25 6.63041 25 0C25 6.63041 27.6339 12.9893 32.3223 17.6777C37.0107 22.3661 43.3696 25 50 25C43.3696 25 37.0107 27.6339 32.3223 32.3223C27.6339 37.0107 25 43.3696 25 50C25 43.3696 22.3661 37.0107 17.6777 32.3223Z" fill="currentColor" />
  </svg>
);

const TEXTS = ['Design System', 'Component Library', 'Token Architecture', 'Multi-Framework'];
const LOGOS = ['Figma', 'React', 'Vue', 'Angular', 'Astro'];

const TextItems = () => (
  <>
    {TEXTS.map((t) => (
      <div key={t} className="marquee__item">
        <p className="marquee__text">{t}</p>
        <StarSVG />
      </div>
    ))}
  </>
);

const LogoItems = () => (
  <>
    {LOGOS.map((l) => (
      <div key={l} className="marquee__item">
        <img className="marquee__logo" src={`https://placehold.co/120x32/999/fff?text=${l}`} alt={l} />
      </div>
    ))}
  </>
);

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
  title: 'Components/Marquee',
  component: Marquee,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

/* ── Stories ─────────────────────────────────────────────── */
export const Playground = {
  render: () => {
    const [variant, setVariant] = useState('text');
    const [size,    setSize]    = useState('m');
    const [dark,    setDark]    = useState(false);
    const [reverse, setReverse] = useState(false);
    const [fade,    setFade]    = useState(true);
    const [speed,   setSpeed]   = useState('default');

    const Items = variant === 'logos' ? LogoItems : TextItems;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif' }}>
        {/* key forces remount when variant changes so offsetWidth recalculates */}
        <Marquee key={variant} variant={variant} size={size} dark={dark} reverse={reverse} fade={fade} speed={speed}>
          <Items />
        </Marquee>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '24px', borderTop: '1px solid #f3f4f6' }}>
          <div style={row}>
            <span style={lbl}>Variant</span>
            {['text', 'logos'].map((v) => <Ctrl key={v} label={v} active={variant === v} onClick={() => setVariant(v)} />)}
          </div>
          <div style={row}>
            <span style={lbl}>Size</span>
            {['s', 'm', 'l', 'xl'].map((s) => <Ctrl key={s} label={s} active={size === s} onClick={() => setSize(s)} />)}
          </div>
          <div style={row}>
            <span style={lbl}>Speed</span>
            {['slow', 'default', 'fast'].map((s) => <Ctrl key={s} label={s} active={speed === s} onClick={() => setSpeed(s)} />)}
          </div>
          <div style={row}>
            <span style={lbl}>Options</span>
            <Ctrl label="Dark"    active={dark}    onClick={() => setDark((v) => !v)} />
            <Ctrl label="Reverse" active={reverse} onClick={() => setReverse((v) => !v)} />
            <Ctrl label="Fade"    active={fade}    onClick={() => setFade((v) => !v)} />
          </div>
        </div>
      </div>
    );
  },
};

export const TextMarquee = {
  render: () => (
    <Marquee variant="text" size="m">
      <TextItems />
    </Marquee>
  ),
};

export const LogoMarquee = {
  render: () => (
    <Marquee variant="logos" size="m">
      <LogoItems />
    </Marquee>
  ),
};

export const DoubleRow = {
  name: 'Double Row (Opposite Directions)',
  render: () => (
    <div>
      <Marquee variant="text" size="m" dark>
        <TextItems />
      </Marquee>
      <Marquee variant="text" size="m" dark reverse>
        <TextItems />
      </Marquee>
    </div>
  ),
};
