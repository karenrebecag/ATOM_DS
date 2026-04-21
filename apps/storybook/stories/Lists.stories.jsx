import React from 'react';
import { BulletItem, NumberItem } from '@atomchat.io/components-react';

const BULLET_ITEMS = [
  'First item in the list',
  'Second item with a longer description that wraps to the next line',
  'Third item to complete the set',
];

const NUMBER_ITEMS = [
  'Install dependencies with pnpm',
  'Configure your design tokens',
  'Import components into your project',
];

/* ── Meta ────────────────────────────────────────────────── */
export default {
  title: 'Components/Lists',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── Stories ─────────────────────────────────────────────── */
export const Playground = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', padding: '16px', alignItems: 'flex-start', fontFamily: 'system-ui' }}>
      <div>
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.05em', margin: '0 0 12px' }}>Bullet</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {BULLET_ITEMS.map((item) => (
            <BulletItem key={item}>{item}</BulletItem>
          ))}
        </ul>
      </div>
      <div>
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.05em', margin: '0 0 12px' }}>Numbered</p>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {NUMBER_ITEMS.map((item, i) => (
            <NumberItem key={item} number={i + 1}>{item}</NumberItem>
          ))}
        </ol>
      </div>
    </div>
  ),
};

export const BulletList = {
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {BULLET_ITEMS.map((item) => (
        <BulletItem key={item}>{item}</BulletItem>
      ))}
    </ul>
  ),
};

export const NumberedList = {
  render: () => (
    <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {NUMBER_ITEMS.map((item, i) => (
        <NumberItem key={item} number={i + 1}>{item}</NumberItem>
      ))}
    </ol>
  ),
};

export const CustomColors = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', padding: '16px', alignItems: 'flex-start', fontFamily: 'system-ui' }}>
      <div>
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.05em', margin: '0 0 12px' }}>Custom bullet color</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <BulletItem bulletColor="#6366f1">Indigo bullet</BulletItem>
          <BulletItem bulletColor="#ec4899">Pink bullet</BulletItem>
          <BulletItem bulletColor="#10b981">Green bullet</BulletItem>
        </ul>
      </div>
      <div>
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.05em', margin: '0 0 12px' }}>Custom number color</p>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <NumberItem number={1} numberColor="#6366f1">Indigo number</NumberItem>
          <NumberItem number={2} numberColor="#ec4899">Pink number</NumberItem>
          <NumberItem number={3} numberColor="#10b981">Green number</NumberItem>
        </ol>
      </div>
    </div>
  ),
};
