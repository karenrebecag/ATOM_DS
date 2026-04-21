import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Tag } from '@atomchat.io/components-react';

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
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

/* ── Stories ─────────────────────────────────────────────── */
export const Playground = {
  render: () => {
    const [variant, setVariant] = useState('simple');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          <div style={{ width: '100%', maxWidth: '360px' }}>
            {variant === 'simple' && (
              <Card>
                <CardHeader
                  headline="Card title"
                  supportingText="Supporting subtitle"
                />
              </Card>
            )}
            {variant === 'with-avatar' && (
              <Card>
                <CardHeader
                  headline="John Doe"
                  supportingText="@johndoe"
                  image={<Avatar type="initials" size="m" initials="JD" alt="John Doe" />}
                />
              </Card>
            )}
            {variant === 'with-body' && (
              <Card>
                <CardHeader headline="Project Alpha" supportingText="Design system initiative" />
                <CardBody bodyText="This card shows a typical layout with header, body content, and footer actions." />
                <CardFooter variant="buttons">
                  <Button variant="Secondary" size="s">Cancel</Button>
                  <Button variant="Primary" size="s">Save</Button>
                </CardFooter>
              </Card>
            )}
            {variant === 'with-tags' && (
              <Card>
                <CardHeader headline="Feature Release" supportingText="v2.1.0" />
                <CardBody bodyText="CSS-driven accordion, avatar group fixes, and badge overflow rules." />
                <CardFooter variant="tags">
                  <Tag>Stable</Tag>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={row}>
            <span style={lbl}>Variant</span>
            {[
              { value: 'simple',    label: 'Simple' },
              { value: 'with-avatar', label: 'With Avatar' },
              { value: 'with-body',   label: 'With Body & Footer' },
              { value: 'with-tags',   label: 'With Tags' },
            ].map(({ value, label }) => (
              <Ctrl key={value} label={label} active={variant === value} onClick={() => setVariant(value)} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const Simple = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <Card>
        <CardHeader headline="Card title" supportingText="Supporting subtitle" />
      </Card>
    </div>
  ),
};

export const WithAvatar = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <Card>
        <CardHeader
          headline="John Doe"
          supportingText="@johndoe"
          image={<Avatar type="initials" size="m" initials="JD" alt="John Doe" />}
        />
      </Card>
    </div>
  ),
};

export const WithBodyAndFooter = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <Card>
        <CardHeader headline="Project Alpha" supportingText="Design system initiative" />
        <CardBody bodyText="This card shows a typical layout with header, body content, and footer actions." />
        <CardFooter variant="buttons">
          <Button variant="Secondary" size="s">Cancel</Button>
          <Button variant="Primary" size="s">Save</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const WithHeadlineAndContent = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <Card>
        <CardHeader headline="Features" />
        <CardBody headline="What's included" subhead="Core package">
          <ul style={{ margin: 0, paddingLeft: '16px' }}>
            <li>Design tokens</li>
            <li>CSS components</li>
            <li>React components</li>
          </ul>
        </CardBody>
        <CardFooter variant="buttons">
          <Button variant="Primary" size="s">Get started</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
