const r=["xs","s","m","l","xl"],p='<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="6.5"/><path d="M8 8v3"/><path d="M8 5.5h.005"/></svg>',c=(e,t,o)=>`
  <div class="segment-control segment-control--${e}" data-segment-control role="tablist">
    ${t.map((s,l)=>`
      <button class="segment-control__item${l===o?" segment-control__item--selected":""}${s.disabled?" segment-control__item--disabled":""}"
        role="tab" aria-selected="${l===o}" ${s.disabled?"disabled":""} data-segment-index="${l}">
        <span class="segment-control__content">
          ${s.label?`<span class="segment-control__label">${s.label}</span>`:""}
          ${s.info?`<span class="segment-control__info">${p}</span>`:""}
        </span>
      </button>`).join("")}
  </div>`,d=["Day","Week","Month","Year"],m={title:"Components/SegmentControl",tags:["autodocs"],parameters:{layout:"centered"}},n={render:()=>`
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
      <div class="sb-preview" id="sc-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="sc-sizes">
            ${r.map((e,t)=>`<button class="sb-chip${t===2?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const items=${JSON.stringify(d)};
      let size='m', selected=1;
      function update(){
        document.getElementById('sc-preview').innerHTML=\`
          <div class="segment-control segment-control--\${size}" data-segment-control role="tablist">
            \${items.map((label,i)=>\`
              <button class="segment-control__item\${i===selected?' segment-control__item--selected':''}"
                role="tab" aria-selected="\${i===selected}" data-segment-index="\${i}">
                <span class="segment-control__content"><span class="segment-control__label">\${label}</span></span>
              </button>\`).join('')}
          </div>\`;
        document.getElementById('sc-preview').addEventListener('click',e=>{
          const btn=e.target.closest('[data-segment-index]');
          if(btn){selected=parseInt(btn.dataset.segmentIndex);update();}
        });
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;size=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      chips('sc-sizes','size');
      update();
    })();
    <\/script>`},a={render:()=>`
    <div style="display:flex;flex-direction:column;gap:24px;align-items:flex-start;padding:16px;">
      ${r.map(e=>`<div><p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">${e}</p>${c(e,d.map(t=>({label:t})),0)}</div>`).join("")}
    </div>`},i={render:()=>c("m",[{label:"Active"},{label:"Also active"},{label:"Disabled",disabled:!0}],0)};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
      <div class="sb-preview" id="sc-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="sc-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 2 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const items=\${JSON.stringify(ITEMS)};
      let size='m', selected=1;
      function update(){
        document.getElementById('sc-preview').innerHTML=\\\`
          <div class="segment-control segment-control--\\\${size}" data-segment-control role="tablist">
            \\\${items.map((label,i)=>\\\`
              <button class="segment-control__item\\\${i===selected?' segment-control__item--selected':''}"
                role="tab" aria-selected="\\\${i===selected}" data-segment-index="\\\${i}">
                <span class="segment-control__content"><span class="segment-control__label">\\\${label}</span></span>
              </button>\\\`).join('')}
          </div>\\\`;
        document.getElementById('sc-preview').addEventListener('click',e=>{
          const btn=e.target.closest('[data-segment-index]');
          if(btn){selected=parseInt(btn.dataset.segmentIndex);update();}
        });
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;size=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      chips('sc-sizes','size');
      update();
    })();
    <\/script>\`
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex;flex-direction:column;gap:24px;align-items:flex-start;padding:16px;">
      \${SIZES.map(s => \`<div><p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">\${s}</p>\${renderSegment(s, ITEMS.map(l => ({
    label: l
  })), 0)}</div>\`).join('')}
    </div>\`
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => renderSegment('m', [{
    label: 'Active'
  }, {
    label: 'Also active'
  }, {
    label: 'Disabled',
    disabled: true
  }], 0)
}`,...i.parameters?.docs?.source}}};const b=["Playground","AllSizes","WithDisabled"];export{a as AllSizes,n as Playground,i as WithDisabled,b as __namedExportsOrder,m as default};
