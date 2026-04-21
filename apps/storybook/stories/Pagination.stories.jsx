import React, { useState } from 'react';
import { Pagination } from '@atomchat.io/components-react';

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
    <span style={{ fontSize: '11px', color: 'var(--fg-tertiary)', minWidth: '80px' }}>{label}</span>
    {children}
  </div>
);

// ── Meta ──────────────────────────────────────────────────
export default {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

// ── Playground ────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(3);
    const [totalPages, setTotalPages] = useState(10);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', maxWidth: '720px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Row label="totalPages">
            {[1, 5, 10, 20].map((n) => (
              <Ctrl key={n} label={String(n)} active={totalPages === n} onClick={() => { setTotalPages(n); setCurrentPage(Math.min(currentPage, n)); }} />
            ))}
          </Row>
          <Row label="pageSize">
            {[10, 25, 50, 100].map((n) => (
              <Ctrl key={n} label={String(n)} active={pageSize === n} onClick={() => setPageSize(n)} />
            ))}
          </Row>
          <Row label="loading">
            <Ctrl label={loading ? 'true' : 'false'} active={loading} onClick={() => setLoading((v) => !v)} />
          </Row>
        </div>

        {/* Preview */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          loading={loading}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};

// ── All States ────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxWidth: '720px' }}>
      {[
        { label: 'normal (page 3/10)', props: { currentPage: 3, totalPages: 10 } },
        { label: 'first page', props: { currentPage: 1, totalPages: 10 } },
        { label: 'last page', props: { currentPage: 10, totalPages: 10 } },
        { label: 'single page', props: { currentPage: 1, totalPages: 1 } },
        { label: 'no data', props: { currentPage: 1, totalPages: 0 } },
        { label: 'loading', props: { currentPage: 3, totalPages: 10, loading: true } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={{ fontSize: '11px', color: 'var(--fg-tertiary)', padding: '8px 0 4px' }}>{label}</div>
          <Pagination {...props} pageSize={10} />
        </div>
      ))}
    </div>
  ),
};
