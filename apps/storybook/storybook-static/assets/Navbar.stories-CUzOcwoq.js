const i='<svg width="100" height="24" viewBox="0 0 100 24" fill="none"><rect width="100" height="24" rx="4" fill="currentColor" opacity="0.15"/><text x="50" y="16" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">ATOM</text></svg>',r=(a,e=!1)=>`
  <a href="#" style="font-size:14px;font-weight:${e?"600":"400"};color:${e?"var(--fg-primary,#18181b)":"var(--fg-tertiary,#52525b)"};text-decoration:none;transition:color .15s;">${a}</a>`,n=({variant:a="default",scrolled:e=!1})=>`
  <nav class="${a==="pill"?"navbar-pill":"navbar-fixed"}"
    data-nav-scrolled="${e}" data-nav-hidden="false"
    style="display:flex;align-items:center;justify-content:space-between;padding:12px 24px;background:var(--bg-primary,#fff);border:1px solid var(--border-secondary,#e4e4e7);border-radius:var(--primitive-radius-s,8px);width:100%;max-width:720px;">
    <div style="display:flex;align-items:center;gap:24px;">
      ${i}
      <div style="display:flex;gap:16px;">
        ${r("Home",!0)}
        ${r("Features")}
        ${r("Pricing")}
        ${r("Docs")}
      </div>
    </div>
    <button class="button button--s button--primary">Get started</button>
  </nav>`,o={title:"Components/Navbar",tags:["autodocs"],parameters:{layout:"padded"}},t={render:()=>`
    <div style="display:flex;flex-direction:column;gap:32px;align-items:center;">
      <p style="font-size:12px;color:#999;margin:0;">Default</p>
      ${n({})}
      <p style="font-size:12px;color:#999;margin:0;">Scrolled (reduced padding)</p>
      ${n({scrolled:!0})}
      <p style="font-size:12px;color:#999;margin:0;">Pill variant</p>
      ${n({variant:"pill"})}
    </div>`};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex;flex-direction:column;gap:32px;align-items:center;">
      <p style="font-size:12px;color:#999;margin:0;">Default</p>
      \${renderNavbar({})}
      <p style="font-size:12px;color:#999;margin:0;">Scrolled (reduced padding)</p>
      \${renderNavbar({
    scrolled: true
  })}
      <p style="font-size:12px;color:#999;margin:0;">Pill variant</p>
      \${renderNavbar({
    variant: 'pill'
  })}
    </div>\`
}`,...t.parameters?.docs?.source}}};const l=["Playground"];export{t as Playground,l as __namedExportsOrder,o as default};
