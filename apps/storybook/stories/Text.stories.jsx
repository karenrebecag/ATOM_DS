import React, { useState, useEffect, useRef } from 'react';
import { Text } from '@atomchat.io/components-react';
import {
  initMaskedReveal,
  initFadeUpLoad,
  initScrambleLoad,
  initHighlightScroll,
  initScrambleScroll,
} from '@atomchat.io/animations/effects/text/text';

// ── Controls ──────────────────────────────────────────────
const Ctrl = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '4px 12px',
      borderRadius: '999px',
      border: '1px solid',
      borderColor: active ? 'var(--fg-primary)' : 'var(--border-secondary)',
      background: active ? 'var(--fg-primary)' : 'transparent',
      color: active ? 'var(--bg-primary)' : 'var(--fg-secondary)',
      fontSize: '12px',
      fontWeight: active ? 600 : 400,
      cursor: 'pointer',
      transition: 'all 150ms',
    }}
  >
    {label}
  </button>
);

const Row = ({ label, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
    <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', minWidth: '72px' }}>{label}</span>
    {children}
  </div>
);

const SIZES = ['body', 'caption', 'label', 'label-small', 'footnote'];
const WEIGHTS = ['regular', 'medium', 'bold'];
const COLORS = ['inherit', 'primary', 'secondary', 'tertiary', 'disabled'];
const ALIGNS = ['left', 'center', 'right'];
const ANIMATES = ['none', 'masked-lines', 'masked-words', 'fade-up-load', 'scramble-load', 'scramble-scroll', 'highlight-scroll'];

const SAMPLE = 'The quick brown fox jumps over the lazy dog. Design systems empower teams to build consistent, scalable products faster.';

const INIT_MAP = {
  'masked-lines': initMaskedReveal,
  'masked-words': initMaskedReveal,
  'fade-up-load': initFadeUpLoad,
  'scramble-load': initScrambleLoad,
  'scramble-scroll': initScrambleScroll,
  'highlight-scroll': initHighlightScroll,
};

// ── Meta ──────────────────────────────────────────────────
export default {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [size, setSize] = useState('body');
    const [weight, setWeight] = useState('regular');
    const [color, setColor] = useState('inherit');
    const [align, setAlign] = useState('left');
    const [truncate, setTruncate] = useState(false);
    const [balance, setBalance] = useState(false);
    const [animate, setAnimate] = useState('none');
    const [mountKey, setMountKey] = useState(0);
    const cleanupRef = useRef(null);
    const scopeRef = useRef(null);

    const animateProp = animate === 'none' ? false : animate;

    useEffect(() => {
      if (!animateProp || !scopeRef.current) return;

      const initFn = INIT_MAP[animateProp];
      if (!initFn) return;

      const raf = requestAnimationFrame(() => {
        if (cleanupRef.current) cleanupRef.current();
        cleanupRef.current = initFn({ scope: scopeRef.current });
      });

      return () => {
        cancelAnimationFrame(raf);
        if (cleanupRef.current) {
          cleanupRef.current();
          cleanupRef.current = null;
        }
      };
    }, [mountKey, animateProp]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '560px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Row label="size">
            {SIZES.map((s) => (
              <Ctrl key={s} label={s} active={size === s} onClick={() => setSize(s)} />
            ))}
          </Row>
          <Row label="weight">
            {WEIGHTS.map((w) => (
              <Ctrl key={w} label={w} active={weight === w} onClick={() => setWeight(w)} />
            ))}
          </Row>
          <Row label="color">
            {COLORS.map((c) => (
              <Ctrl key={c} label={c} active={color === c} onClick={() => setColor(c)} />
            ))}
          </Row>
          <Row label="align">
            {ALIGNS.map((a) => (
              <Ctrl key={a} label={a} active={align === a} onClick={() => setAlign(a)} />
            ))}
          </Row>
          <Row label="truncate">
            <Ctrl label={truncate ? 'true' : 'false'} active={!!truncate} onClick={() => setTruncate((v) => !v)} />
          </Row>
          <Row label="balance">
            <Ctrl label={balance ? 'true' : 'false'} active={balance} onClick={() => setBalance((v) => !v)} />
          </Row>
          <Row label="animate">
            {ANIMATES.map((a) => (
              <Ctrl
                key={a}
                label={a}
                active={animate === a}
                onClick={() => {
                  setAnimate(a);
                  setMountKey((k) => k + 1);
                }}
              />
            ))}
          </Row>
        </div>

        <div ref={scopeRef} key={mountKey}>
          <Text
            size={size}
            weight={weight}
            color={color}
            align={align}
            truncate={!animateProp && truncate}
            balance={balance}
            animate={animateProp}
            trigger={animateProp ? 'load' : undefined}
          >
            {SAMPLE}
          </Text>
        </div>
      </div>
    );
  },
};

// ── Animation Showcase ────────────────────────────────────
export const AnimationShowcase = {
  name: 'Animation Showcase',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '560px' }}>
      {[
        { animate: 'masked-lines',     label: 'masked-lines' },
        { animate: 'masked-words',     label: 'masked-words' },
        { animate: 'fade-up-load',     label: 'fade-up-load' },
        { animate: 'scramble-load',    label: 'scramble-load' },
        { animate: 'scramble-scroll',  label: 'scramble-scroll' },
        { animate: 'highlight-scroll', label: 'highlight-scroll' },
      ].map(({ animate, label }) => (
        <div key={animate}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '6px', fontFamily: 'monospace' }}>
            {label}
          </span>
          <Text animate={animate} trigger="load">
            {SAMPLE}
          </Text>
        </div>
      ))}
    </div>
  ),
};

// ── Type Scale ────────────────────────────────────────────
export const TypeScale = {
  name: 'Type Scale',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '560px' }}>
      {SIZES.map((s) => (
        <div key={s}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '4px', fontFamily: 'monospace' }}>
            .text--{s}
          </span>
          <Text size={s}>{SAMPLE}</Text>
        </div>
      ))}
    </div>
  ),
};

// ── All Colors ────────────────────────────────────────────
export const AllColors = {
  name: 'All Colors',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px' }}>
      {['primary', 'secondary', 'tertiary', 'disabled'].map((c) => (
        <div key={c}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '2px' }}>{c}</span>
          <Text color={c}>{SAMPLE.slice(0, 80)}...</Text>
        </div>
      ))}
    </div>
  ),
};

// ── Truncation ────────────────────────────────────────────
export const Truncation = {
  name: 'Truncation',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <div>
        <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '4px' }}>truncate (single line)</span>
        <Text truncate>{SAMPLE.repeat(2)}</Text>
      </div>
      <div>
        <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '4px' }}>truncate={'{2}'} (2 lines)</span>
        <Text truncate={2}>{SAMPLE.repeat(2)}</Text>
      </div>
      <div>
        <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '4px' }}>truncate={'{3}'} (3 lines)</span>
        <Text truncate={3}>{SAMPLE.repeat(2)}</Text>
      </div>
    </div>
  ),
};
