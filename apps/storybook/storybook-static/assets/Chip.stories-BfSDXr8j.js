const d=`<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M2 4.5C2 4.22 2.22 4 2.5 4H13.5C13.78 4 14 4.22 14 4.5C14 4.78 13.78 5 13.5 5H2.5C2.22 5 2 4.78 2 4.5Z" fill="currentColor"/>
  <path d="M4 8C4 7.72 4.22 7.5 4.5 7.5H11.5C11.78 7.5 12 7.72 12 8C12 8.28 11.78 8.5 11.5 8.5H4.5C4.22 8.5 4 8.28 4 8Z" fill="currentColor"/>
  <path d="M6.5 11C6.22 11 6 11.22 6 11.5C6 11.78 6.22 12 6.5 12H9.5C9.78 12 10 11.78 10 11.5C10 11.22 9.78 11 9.5 11H6.5Z" fill="currentColor"/>
</svg>`,o=`<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="currentColor"/>
</svg>`,s=({variant:e,size:i,selected:b,error:p,disabled:r,dismissible:f,label:u})=>`
  <button class="chip" data-chip data-variant="${e}" data-size="${i}"
    data-selected="${b}" data-error="${p}" type="button" ${r?"disabled":""}>
    <span class="chip__icon chip__icon--start chip__icon--default" data-chip-icon aria-hidden="true">${d}</span>
    <span class="chip__label" data-chip-label>${u}</span>
    ${f?`<button class="chip__dismiss" data-chip-dismiss type="button" aria-label="Remove" ${r?"disabled":""}>${o}</button>`:""}
  </button>`,c=["filled","outlined"],n=["xs","s","m","l","xl"],h={title:"Components/Chip",tags:["autodocs"],argTypes:{variant:{control:"select",options:c},size:{control:"select",options:n},selected:{control:"boolean"},error:{control:"boolean"},disabled:{control:"boolean"},dismissible:{control:"boolean"},label:{control:"text"}},args:{variant:"filled",size:"m",selected:!1,error:!1,disabled:!1,dismissible:!1,label:"Category"}},l={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:72px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-chip-bool{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip-bool.active{background:#ef4444;color:#fff;border-color:#ef4444}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="ch-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Variant</label>
          <div class="sb-chips" id="ch-variants">
            ${c.map((e,i)=>`<button class="sb-chip${i===0?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="ch-sizes">
            ${n.map((e,i)=>`<button class="sb-chip${i===2?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="ch-selected">Selected</button>
            <button class="sb-chip-bool" id="ch-error">Error</button>
            <button class="sb-chip-bool" id="ch-disabled">Disabled</button>
            <button class="sb-chip-bool" id="ch-dismissible">Dismissible</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const filterSvg=${JSON.stringify(d)};
      const closeSvg=${JSON.stringify(o)};
      let s={variant:'filled',size:'m',selected:false,error:false,disabled:false,dismissible:false};
      function update(){
        const dismiss=s.dismissible?\`<button class="chip__dismiss" data-chip-dismiss type="button" aria-label="Remove" \${s.disabled?'disabled':''}>\${closeSvg}</button>\`:'';
        document.getElementById('ch-preview').innerHTML=\`
        if(window.__atomInit) window.__atomInit(document.getElementById('ch-preview'));
          <button class="chip" data-chip data-variant="\${s.variant}" data-size="\${s.size}"
            data-selected="\${s.selected}" data-error="\${s.error}" type="button" \${s.disabled?'disabled':''}>
            <span class="chip__icon chip__icon--start chip__icon--default" data-chip-icon aria-hidden="true">\${filterSvg}</span>
            <span class="chip__label" data-chip-label>Category</span>
            \${dismiss}
          </button>\`;
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('ch-variants','variant');chips('ch-sizes','size');
      bool('ch-selected','selected');bool('ch-error','error');bool('ch-disabled','disabled');bool('ch-dismissible','dismissible');
      update();
    })();
    <\/script>`},a={render:()=>`
    <div style="display:flex; flex-wrap:wrap; gap:8px; padding:16px;">
      ${s({variant:"filled",size:"m",label:"Filled",selected:!1,error:!1,disabled:!1,dismissible:!1})}
      ${s({variant:"filled",size:"m",label:"Filled selected",selected:!0,error:!1,disabled:!1,dismissible:!1})}
      ${s({variant:"outlined",size:"m",label:"Outlined",selected:!1,error:!1,disabled:!1,dismissible:!1})}
      ${s({variant:"outlined",size:"m",label:"Outlined selected",selected:!0,error:!1,disabled:!1,dismissible:!1})}
      ${s({variant:"filled",size:"m",label:"Error",selected:!1,error:!0,disabled:!1,dismissible:!1})}
      ${s({variant:"filled",size:"m",label:"Disabled",selected:!1,error:!1,disabled:!0,dismissible:!1})}
      ${s({variant:"filled",size:"m",label:"Dismissible",selected:!1,error:!1,disabled:!1,dismissible:!0})}
    </div>`},t={render:()=>`
    <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; padding:16px;">
      ${n.map(e=>s({variant:"filled",size:e,label:e,selected:!1,error:!1,disabled:!1,dismissible:!1})).join("")}
    </div>`};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:72px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-chip-bool{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip-bool.active{background:#ef4444;color:#fff;border-color:#ef4444}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="ch-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Variant</label>
          <div class="sb-chips" id="ch-variants">
            \${VARIANTS.map((v, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${v}">\${v}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="ch-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 2 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="ch-selected">Selected</button>
            <button class="sb-chip-bool" id="ch-error">Error</button>
            <button class="sb-chip-bool" id="ch-disabled">Disabled</button>
            <button class="sb-chip-bool" id="ch-dismissible">Dismissible</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const filterSvg=\${JSON.stringify(filterIcon)};
      const closeSvg=\${JSON.stringify(closeIcon)};
      let s={variant:'filled',size:'m',selected:false,error:false,disabled:false,dismissible:false};
      function update(){
        const dismiss=s.dismissible?\\\`<button class="chip__dismiss" data-chip-dismiss type="button" aria-label="Remove" \\\${s.disabled?'disabled':''}>\\\${closeSvg}</button>\\\`:'';
        document.getElementById('ch-preview').innerHTML=\\\`
        if(window.__atomInit) window.__atomInit(document.getElementById('ch-preview'));
          <button class="chip" data-chip data-variant="\\\${s.variant}" data-size="\\\${s.size}"
            data-selected="\\\${s.selected}" data-error="\\\${s.error}" type="button" \\\${s.disabled?'disabled':''}>
            <span class="chip__icon chip__icon--start chip__icon--default" data-chip-icon aria-hidden="true">\\\${filterSvg}</span>
            <span class="chip__label" data-chip-label>Category</span>
            \\\${dismiss}
          </button>\\\`;
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('ch-variants','variant');chips('ch-sizes','size');
      bool('ch-selected','selected');bool('ch-error','error');bool('ch-disabled','disabled');bool('ch-dismissible','dismissible');
      update();
    })();
    <\/script>\`
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; flex-wrap:wrap; gap:8px; padding:16px;">
      \${renderChip({
    variant: 'filled',
    size: 'm',
    label: 'Filled',
    selected: false,
    error: false,
    disabled: false,
    dismissible: false
  })}
      \${renderChip({
    variant: 'filled',
    size: 'm',
    label: 'Filled selected',
    selected: true,
    error: false,
    disabled: false,
    dismissible: false
  })}
      \${renderChip({
    variant: 'outlined',
    size: 'm',
    label: 'Outlined',
    selected: false,
    error: false,
    disabled: false,
    dismissible: false
  })}
      \${renderChip({
    variant: 'outlined',
    size: 'm',
    label: 'Outlined selected',
    selected: true,
    error: false,
    disabled: false,
    dismissible: false
  })}
      \${renderChip({
    variant: 'filled',
    size: 'm',
    label: 'Error',
    selected: false,
    error: true,
    disabled: false,
    dismissible: false
  })}
      \${renderChip({
    variant: 'filled',
    size: 'm',
    label: 'Disabled',
    selected: false,
    error: false,
    disabled: true,
    dismissible: false
  })}
      \${renderChip({
    variant: 'filled',
    size: 'm',
    label: 'Dismissible',
    selected: false,
    error: false,
    disabled: false,
    dismissible: true
  })}
    </div>\`
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; padding:16px;">
      \${SIZES.map(s => renderChip({
    variant: 'filled',
    size: s,
    label: s,
    selected: false,
    error: false,
    disabled: false,
    dismissible: false
  })).join('')}
    </div>\`
}`,...t.parameters?.docs?.source}}};const m=["Playground","AllVariants","AllSizes"];export{t as AllSizes,a as AllVariants,l as Playground,m as __namedExportsOrder,h as default};
