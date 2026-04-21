import React, { useState, useEffect, useRef } from 'react';
import { Heading } from '@atomchat.io/components-react';
import {
  initMaskedReveal,
  initFadeUpLoad,
  initScrambleLoad,
  initScrambleHover,
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

const SIZES = ['display-xl', 'display-l', 'display-m', 'display-s', 'huge-title', 'h1', 'h2', 'h3', 'h4', 'heading'];
const WEIGHTS = ['regular', 'medium', 'bold'];
const TRACKINGS = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'];
const ALIGNS = ['left', 'center', 'right'];
const ANIMATES = ['none', 'masked-lines', 'masked-words', 'masked-chars', 'fade-up-load', 'scramble-load', 'scramble-scroll', 'highlight-scroll'];

const INIT_MAP = {
  'masked-lines': initMaskedReveal,
  'masked-words': initMaskedReveal,
  'masked-chars': initMaskedReveal,
  'fade-up-load': initFadeUpLoad,
  'scramble-load': initScrambleLoad,
  'scramble-scroll': initScrambleScroll,
  'highlight-scroll': initHighlightScroll,
};

// ── Meta ──────────────────────────────────────────────────
export default {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [level, setLevel] = useState(2);
    const [size, setSize] = useState('h2');
    const [weight, setWeight] = useState('bold');
    const [tracking, setTracking] = useState('tight');
    const [align, setAlign] = useState('left');
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Row label="level">
            {[1, 2, 3, 4, 5, 6].map((l) => (
              <Ctrl key={l} label={`h${l}`} active={level === l} onClick={() => setLevel(l)} />
            ))}
          </Row>
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
          <Row label="tracking">
            {TRACKINGS.map((t) => (
              <Ctrl key={t} label={t} active={tracking === t} onClick={() => setTracking(t)} />
            ))}
          </Row>
          <Row label="align">
            {ALIGNS.map((a) => (
              <Ctrl key={a} label={a} active={align === a} onClick={() => setAlign(a)} />
            ))}
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
          <Heading
            level={level}
            size={size}
            weight={weight}
            tracking={tracking}
            align={align}
            balance={balance}
            animate={animateProp}
            trigger={animateProp ? 'load' : undefined}
          >
            The quick brown fox jumps over the lazy dog
          </Heading>
        </div>
      </div>
    );
  },
};

// ── Animation Showcase ────────────────────────────────────
export const AnimationShowcase = {
  name: 'Animation Showcase',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '640px' }}>
      {[
        { animate: 'masked-lines',     trigger: 'load', label: 'masked-lines' },
        { animate: 'masked-words',     trigger: 'load', label: 'masked-words' },
        { animate: 'masked-chars',     trigger: 'load', label: 'masked-chars' },
        { animate: 'fade-up-load',     trigger: 'load', label: 'fade-up-load' },
        { animate: 'scramble-load',    trigger: 'load', label: 'scramble-load' },
        { animate: 'scramble-scroll',  trigger: 'load', label: 'scramble-scroll' },
        { animate: 'highlight-scroll', trigger: 'load', label: 'highlight-scroll' },
      ].map(({ animate, trigger, label }) => (
        <div key={animate}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '8px', fontFamily: 'monospace' }}>
            {label}
          </span>
          <Heading level={2} size="h2" weight="bold" tracking="tight" animate={animate} trigger={trigger}>
            Design systems scale your product team
          </Heading>
        </div>
      ))}
    </div>
  ),
};

// ── Type Scale ────────────────────────────────────────────
export const TypeScale = {
  name: 'Type Scale',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {SIZES.map((s) => (
        <div key={s}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '4px', fontFamily: 'monospace' }}>
            .heading--{s}
          </span>
          <Heading level={2} size={s} weight="bold" tracking="tight">
            The quick brown fox
          </Heading>
        </div>
      ))}
    </div>
  ),
};

// ── Weights ───────────────────────────────────────────────
export const AllWeights = {
  name: 'All Weights',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {WEIGHTS.map((w) => (
        <div key={w}>
          <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', display: 'block', marginBottom: '4px' }}>{w}</span>
          <Heading level={2} size="h2" weight={w} tracking="tight">
            The quick brown fox
          </Heading>
        </div>
      ))}
    </div>
  ),
};
