const t=({size:s})=>`
  <span class="spinner spinner--${s}" role="status" aria-label="Loading" data-spinner>
    <span class="spinner__track"></span>
    <span class="spinner__indicator" data-spinner-indicator></span>
  </span>`,i=["xs","s","m","l","xl"],r={title:"Components/Spinner",tags:["autodocs"],argTypes:{size:{control:"select",options:i}},args:{size:"m"}},e={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="sp-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="sp-sizes">
            ${i.map((s,a)=>`<button class="sb-chip${a===2?" active":""}" data-value="${s}">${s}</button>`).join("")}
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={size:'m'};
      function update(){
        document.getElementById('sp-preview').innerHTML=\`<span class="spinner spinner--\${s.size}" role="status" aria-label="Loading" data-spinner><span class="spinner__track"></span><span class="spinner__indicator" data-spinner-indicator></span></span>\`;
        if(window.__atomInit) window.__atomInit(document.getElementById('sp-preview'));
      }
      document.getElementById('sp-sizes').addEventListener('click',e=>{
        const c=e.target.closest('.sb-chip');if(!c)return;
        s.size=c.dataset.value;
        document.querySelectorAll('#sp-sizes .sb-chip').forEach(x=>x.classList.remove('active'));
        c.classList.add('active');update();
      });
      update();
    })();
    <\/script>`},n={render:()=>`
    <div style="display:flex; gap:24px; align-items:center; padding:16px;">
      ${i.map(s=>`
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
          ${t({size:s})}
          <span style="font-size:11px; color:#666;">${s}</span>
        </div>`).join("")}
    </div>`};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="sp-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="sp-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 2 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={size:'m'};
      function update(){
        document.getElementById('sp-preview').innerHTML=\\\`<span class="spinner spinner--\\\${s.size}" role="status" aria-label="Loading" data-spinner><span class="spinner__track"></span><span class="spinner__indicator" data-spinner-indicator></span></span>\\\`;
        if(window.__atomInit) window.__atomInit(document.getElementById('sp-preview'));
      }
      document.getElementById('sp-sizes').addEventListener('click',e=>{
        const c=e.target.closest('.sb-chip');if(!c)return;
        s.size=c.dataset.value;
        document.querySelectorAll('#sp-sizes .sb-chip').forEach(x=>x.classList.remove('active'));
        c.classList.add('active');update();
      });
      update();
    })();
    <\/script>\`
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:24px; align-items:center; padding:16px;">
      \${SIZES.map(s => \`
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
          \${renderSpinner({
    size: s
  })}
          <span style="font-size:11px; color:#666;">\${s}</span>
        </div>\`).join('')}
    </div>\`
}`,...n.parameters?.docs?.source}}};const p=["Playground","AllSizes"];export{n as AllSizes,e as Playground,p as __namedExportsOrder,r as default};
