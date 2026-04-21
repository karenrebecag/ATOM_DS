const r=({height:a="32px",width:d="auto",inverted:t=!1})=>`
  <div${t?' data-nav-theme="inverted"':""} style="${t?"background:var(--bg-inverse-primary,#18181b);padding:24px;border-radius:8px;":""}">
    <div class="logo-badge" style="--logo-height:${a};--logo-width:${d};">
      <img class="logo-badge__image logo-badge__image--light"
        src="https://placehold.co/120x32/18181b/white?text=ATOM"
        alt="ATOM Logo" />
      <img class="logo-badge__image logo-badge__image--dark"
        src="https://placehold.co/120x32/white/18181b?text=ATOM"
        alt="ATOM Logo" />
    </div>
  </div>`,i={title:"Components/LogoBadge",tags:["autodocs"],parameters:{layout:"centered"}},e={render:()=>`
    <div style="display:flex;flex-direction:column;gap:32px;align-items:center;padding:24px;">
      <div>
        <p style="font-size:12px;color:#999;margin:0 0 12px;">Light theme</p>
        ${r({})}
      </div>
      <div>
        <p style="font-size:12px;color:#999;margin:0 0 12px;">Dark theme (inverted)</p>
        ${r({inverted:!0})}
      </div>
    </div>`},o={render:()=>r({height:"48px"})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex;flex-direction:column;gap:32px;align-items:center;padding:24px;">
      <div>
        <p style="font-size:12px;color:#999;margin:0 0 12px;">Light theme</p>
        \${renderLogoBadge({})}
      </div>
      <div>
        <p style="font-size:12px;color:#999;margin:0 0 12px;">Dark theme (inverted)</p>
        \${renderLogoBadge({
    inverted: true
  })}
      </div>
    </div>\`
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => renderLogoBadge({
    height: '48px'
  })
}`,...o.parameters?.docs?.source}}};const n=["Playground","CustomSize"];export{o as CustomSize,e as Playground,n as __namedExportsOrder,i as default};
