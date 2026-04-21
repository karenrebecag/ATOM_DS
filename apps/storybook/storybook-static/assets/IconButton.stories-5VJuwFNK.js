const t='<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"/></svg>',e=["primary","secondary","tertiary","danger-primary","danger-secondary","danger-tertiary"],c=["xs","s","m","l","xl"],l={title:"Components/IconButton",tags:["autodocs"],argTypes:{variant:{control:"select",options:e},size:{control:"select",options:c},loading:{control:"boolean"},disabled:{control:"boolean"}},args:{variant:"primary",size:"m",loading:!1,disabled:!1}},i={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:480px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip:hover{border-color:#9ca3af}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-chip-bool{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip-bool.active{background:#ef4444;color:#fff;border-color:#ef4444}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:480px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground" id="ib-playground">
      <div class="sb-preview" id="ib-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row">
          <label>Variant</label>
          <div class="sb-chips" id="ib-variants">
            ${e.map((n,s)=>`<button class="sb-chip${s===0?" active":""}" data-value="${n}">${n}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row">
          <label>Size</label>
          <div class="sb-chips" id="ib-sizes">
            ${c.map((n,s)=>`<button class="sb-chip${s===2?" active":""}" data-value="${n}">${n}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row">
          <label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="ib-loading">Loading</button>
            <button class="sb-chip-bool" id="ib-disabled">Disabled</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={variant:'primary',size:'m',loading:false,disabled:false};
      function render(){
        const{variant,size,loading,disabled}=s;
        const cls=['icon-button',\`icon-button--\${variant}\`,\`icon-button--\${size}\`,disabled&&'icon-button--disabled',loading&&'icon-button--loading'].filter(Boolean).join(' ');
        return \`<button class="\${cls}" data-icon-button data-hover-rotate type="button" aria-label="Action" \${disabled||loading?'disabled aria-disabled="true"':''} \${loading?'aria-busy="true"':''}>
          <span class="icon-button__icon-wrap">
            <span class="icon-button__icon" data-icon-button-icon>\${loading?'':${JSON.stringify(t)}}</span>
            <span class="icon-button__icon icon-button__icon--clone" data-icon-button-icon-clone aria-hidden="true">\${loading?'':${JSON.stringify(t)}}</span>
          </span>
          \${loading?'<span class="icon-button__loader" aria-hidden="true"><span class="icon-button__spinner" data-button-spinner></span></span>':''}
        </button>\`;
      }
      function update(){
        const p=document.getElementById('ib-preview');
        p.innerHTML=render();
        if(window.__atomInit) window.__atomInit(document.getElementById('ib-preview'));
        const a=window.__atomAnimations;
        if(a){a.initRotateClones({scope:p});a.initRotateCalc({scope:p});a.initHoverRotate({scope:p});}
      }
      function chips(id,key){
        document.getElementById(id).addEventListener('click',e=>{
          const c=e.target.closest('.sb-chip');if(!c)return;
          s[key]=c.dataset.value;
          document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));
          c.classList.add('active');update();
        });
      }
      function bool(id,key){
        document.getElementById(id).addEventListener('click',e=>{
          s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();
        });
      }
      chips('ib-variants','variant');chips('ib-sizes','size');
      bool('ib-loading','loading');bool('ib-disabled','disabled');
      update();
    })();
    <\/script>`},o={render:()=>`<div style="display:flex;gap:8px;flex-wrap:wrap;padding:16px;align-items:center;">
    ${e.map(n=>`<button class="icon-button icon-button--${n} icon-button--m" data-icon-button data-hover-rotate type="button" aria-label="${n}"><span class="icon-button__icon-wrap"><span class="icon-button__icon" data-icon-button-icon>${t}</span><span class="icon-button__icon icon-button__icon--clone" data-icon-button-icon-clone aria-hidden="true">${t}</span></span></button>`).join("")}
  </div>`},a={render:()=>`<div style="display:flex;gap:8px;align-items:center;padding:16px;">
    ${c.map(n=>`<button class="icon-button icon-button--primary icon-button--${n}" data-icon-button data-hover-rotate type="button" aria-label="${n}"><span class="icon-button__icon-wrap"><span class="icon-button__icon" data-icon-button-icon>${t}</span><span class="icon-button__icon icon-button__icon--clone" data-icon-button-icon-clone aria-hidden="true">${t}</span></span></button>`).join("")}
  </div>`};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:480px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip:hover{border-color:#9ca3af}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-chip-bool{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip-bool.active{background:#ef4444;color:#fff;border-color:#ef4444}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:480px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground" id="ib-playground">
      <div class="sb-preview" id="ib-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row">
          <label>Variant</label>
          <div class="sb-chips" id="ib-variants">
            \${VARIANTS.map((v, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${v}">\${v}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row">
          <label>Size</label>
          <div class="sb-chips" id="ib-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 2 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row">
          <label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="ib-loading">Loading</button>
            <button class="sb-chip-bool" id="ib-disabled">Disabled</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={variant:'primary',size:'m',loading:false,disabled:false};
      function render(){
        const{variant,size,loading,disabled}=s;
        const cls=['icon-button',\\\`icon-button--\\\${variant}\\\`,\\\`icon-button--\\\${size}\\\`,disabled&&'icon-button--disabled',loading&&'icon-button--loading'].filter(Boolean).join(' ');
        return \\\`<button class="\\\${cls}" data-icon-button data-hover-rotate type="button" aria-label="Action" \\\${disabled||loading?'disabled aria-disabled="true"':''} \\\${loading?'aria-busy="true"':''}>
          <span class="icon-button__icon-wrap">
            <span class="icon-button__icon" data-icon-button-icon>\\\${loading?'':\${JSON.stringify(settingsIcon)}}</span>
            <span class="icon-button__icon icon-button__icon--clone" data-icon-button-icon-clone aria-hidden="true">\\\${loading?'':\${JSON.stringify(settingsIcon)}}</span>
          </span>
          \\\${loading?'<span class="icon-button__loader" aria-hidden="true"><span class="icon-button__spinner" data-button-spinner></span></span>':''}
        </button>\\\`;
      }
      function update(){
        const p=document.getElementById('ib-preview');
        p.innerHTML=render();
        if(window.__atomInit) window.__atomInit(document.getElementById('ib-preview'));
        const a=window.__atomAnimations;
        if(a){a.initRotateClones({scope:p});a.initRotateCalc({scope:p});a.initHoverRotate({scope:p});}
      }
      function chips(id,key){
        document.getElementById(id).addEventListener('click',e=>{
          const c=e.target.closest('.sb-chip');if(!c)return;
          s[key]=c.dataset.value;
          document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));
          c.classList.add('active');update();
        });
      }
      function bool(id,key){
        document.getElementById(id).addEventListener('click',e=>{
          s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();
        });
      }
      chips('ib-variants','variant');chips('ib-sizes','size');
      bool('ib-loading','loading');bool('ib-disabled','disabled');
      update();
    })();
    <\/script>\`
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:'{\n  render: () => `<div style="display:flex;gap:8px;flex-wrap:wrap;padding:16px;align-items:center;">\n    ${VARIANTS.map(v => `<button class="icon-button icon-button--${v} icon-button--m" data-icon-button data-hover-rotate type="button" aria-label="${v}"><span class="icon-button__icon-wrap"><span class="icon-button__icon" data-icon-button-icon>${settingsIcon}</span><span class="icon-button__icon icon-button__icon--clone" data-icon-button-icon-clone aria-hidden="true">${settingsIcon}</span></span></button>`).join(\'\')}\n  </div>`\n}',...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:'{\n  render: () => `<div style="display:flex;gap:8px;align-items:center;padding:16px;">\n    ${SIZES.map(s => `<button class="icon-button icon-button--primary icon-button--${s}" data-icon-button data-hover-rotate type="button" aria-label="${s}"><span class="icon-button__icon-wrap"><span class="icon-button__icon" data-icon-button-icon>${settingsIcon}</span><span class="icon-button__icon icon-button__icon--clone" data-icon-button-icon-clone aria-hidden="true">${settingsIcon}</span></span></button>`).join(\'\')}\n  </div>`\n}',...a.parameters?.docs?.source}}};const r=["Playground","AllVariants","AllSizes"];export{a as AllSizes,o as AllVariants,i as Playground,r as __namedExportsOrder,l as default};
