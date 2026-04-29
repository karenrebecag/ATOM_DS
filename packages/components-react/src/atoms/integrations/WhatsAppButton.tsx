'use client';

/**
 * WhatsAppButton (Integration — Slater)
 *
 * ATOM native WhatsApp integration. Styles and behavior are owned by
 * Slater (https://slater.app/19877/59762.js) — this component does NOT
 * consume ATOM DS tokens or CSS.
 *
 * The Slater script reads data attributes to:
 * - Resolve the localized WA message by CTA type
 * - Build the wa.me href
 * - Attach hover-rotate animation
 * - Push click events to dataLayer
 *
 * @example
 * <WhatsAppButton phone="573142616335" cta="hablar_asesor" />
 * <WhatsAppButton phone="573142616335" cta="agendar_demo" lang="en" label="BOOK A DEMO" />
 */

import { useEffect } from 'react';

// ── Slater asset URLs ─────────────────────────────────────
const SLATER_JS_WEBFLOW  = 'https://slater.app/19877/59762.js';
const SLATER_JS_PROD     = 'https://assets.slater.app/slater/19877/59762.js?v=1.0';
const SLATER_CSS_WEBFLOW = 'https://slater.app/19877/59763.css';
const SLATER_CSS_PROD    = 'https://assets.slater.app/slater/19877/59763.css?v=1.0';

function loadSlaterAssets() {
  if (typeof window === 'undefined') return;
  const isWebflow = window.location.host.includes('webflow.io');

  if (!document.querySelector('[data-slater-wa-css]')) {
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = isWebflow ? SLATER_CSS_WEBFLOW : SLATER_CSS_PROD;
    link.setAttribute('data-slater-wa-css', '');
    document.head.appendChild(link);
  }

  if (!document.querySelector('[data-slater-wa-js]')) {
    const script = document.createElement('script');
    script.src  = isWebflow ? SLATER_JS_WEBFLOW : SLATER_JS_PROD;
    script.type = 'text/javascript';
    script.setAttribute('data-slater-wa-js', '');
    document.body.appendChild(script);
  }
}

// ── WhatsApp SVG (inline, no Font Awesome dependency) ─────
const WhatsAppIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" focusable="false">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ── Props ─────────────────────────────────────────────────
export interface WhatsAppButtonProps {
  /** WhatsApp phone number (digits only, with country code). e.g. "573142616335" */
  phone: string;
  /** CTA type — Slater uses this to resolve the localized message. */
  cta?: string;
  /** Button label text. */
  label?: string;
  /** Custom WA message — overrides Slater's localized default. */
  message?: string;
  /** Language override for Slater message resolution. */
  lang?: 'es' | 'en' | 'pt';
  /** Analytics: page section where the button lives. */
  section?: string;
  /** Analytics: industry classification. */
  industry?: string;
  /** Additional CSS classes. */
  className?: string;
}

// ── Component ─────────────────────────────────────────────
export function WhatsAppButton({
  phone,
  cta = 'hablar_asesor',
  label = 'HABLAR CON ASESOR',
  message,
  lang,
  section,
  industry,
  className,
}: WhatsAppButtonProps) {
  useEffect(() => {
    loadSlaterAssets();
  }, []);

  const href = `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  return (
    <a
      data-atom-button=""
      data-cta={cta}
      data-phone={phone}
      data-message={message}
      data-lang={lang}
      data-section={section}
      data-industry={industry}
      data-hover-rotate=""
      href={href}
      className={className}
    >
      <span className="button__label-wrap">
        <span className="button__label" data-button-label="">
          <WhatsAppIcon />
          <span>{label}</span>
        </span>
        <span className="button__label button__label--clone" data-button-label-clone="" aria-hidden="true">
          <WhatsAppIcon />
          <span>{label}</span>
        </span>
      </span>
    </a>
  );
}
