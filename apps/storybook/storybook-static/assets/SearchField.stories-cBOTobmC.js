const p=`<svg viewBox="0 0 16 16" fill="none" width="16" height="16">
  <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 14L11.1 11.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,f=`<svg viewBox="0 0 16 16" fill="none" width="16" height="16">
  <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" fill="currentColor"/>
  <path d="M10 6L6 10M6 6L10 10" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,o=({name:e,placeholder:r,value:t,size:h,disabled:u,shortcut:c,showClear:b})=>{const n=t&&t.length>0;return`
    <div class="${["search-field",`search-field--${h}`,n&&"search-field--filled"].filter(Boolean).join(" ")}" data-search-field>
      <div class="search-field__field">
        <div class="search-field__leading">
          <div class="search-field__icon" aria-hidden="true">${p}</div>
        </div>
        <input class="search-field__input" type="search" id="sf-${e}" name="${e}"
          placeholder="${r}" value="${t}" ${u?"disabled":""} autocomplete="off"/>
        <div class="search-field__trailing">
          ${!n&&c?`<span class="search-field__shortcut" aria-label="Keyboard shortcut">${c}</span>`:""}
          ${n&&b?`<button class="search-field__clear" type="button" aria-label="Clear search" data-clear-button>${f}</button>`:""}
        </div>
      </div>
    </div>`},d=["s","m","l"],m={title:"Components/SearchField",tags:["autodocs"],argTypes:{placeholder:{control:"text"},value:{control:"text"},size:{control:"select",options:d},disabled:{control:"boolean"},shortcut:{control:"text"},showClear:{control:"boolean"}},args:{placeholder:"Search...",value:"",size:"m",disabled:!1,shortcut:"⌘K",showClear:!0}},s={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-chip-bool{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip-bool.active{background:#ef4444;color:#fff;border-color:#ef4444}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center;width:100%;max-width:520px}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="sf-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="sf-sizes">
            ${d.map((e,r)=>`<button class="sb-chip${r===1?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="sf-disabled">Disabled</button>
            <button class="sb-chip-bool" id="sf-clear">Show clear</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const srchIcon=${JSON.stringify(p)};
      const clrIcon=${JSON.stringify(f)};
      let s={size:'m',disabled:false,showClear:false};
      let validationCleanup=null;
      function update(){
        const preview=document.getElementById('sf-preview');
        preview.innerHTML=\`
        if(window.__atomInit) window.__atomInit(document.getElementById('sf-preview'));
          <div class="search-field search-field--\${s.size}" style="width:100%;max-width:360px;"
            data-search-field data-validate>
            <div class="search-field__field">
              <div class="search-field__leading">
                <div class="search-field__icon" aria-hidden="true">\${srchIcon}</div>
              </div>
              <input class="search-field__input" type="search" id="sf-live" name="sf-live"
                placeholder="Search..." autocomplete="off" \${s.disabled?'disabled':''}/>
              <div class="search-field__trailing">
                \${!s.showClear?'<span class="search-field__shortcut" aria-label="Keyboard shortcut">⌘K</span>':''}
              </div>
            </div>
          </div>\`;
        if(validationCleanup){validationCleanup();validationCleanup=null;}
        const forms=window.__atomForms;
        if(forms) validationCleanup=forms.initFormValidation({scope:preview});
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('sf-sizes','size');bool('sf-disabled','disabled');bool('sf-clear','showClear');
      update();
    })();
    <\/script>`},i={render:()=>o({name:"filled",placeholder:"Search...",value:"design system",size:"m",disabled:!1,shortcut:"⌘K",showClear:!0})},a={render:()=>o({name:"disabled",placeholder:"Search disabled...",value:"",size:"m",disabled:!0,shortcut:"",showClear:!1})},l={render:()=>`
    <div style="display:flex; flex-direction:column; gap:12px; padding:16px; max-width:360px;">
      ${d.map(e=>o({name:`sz-${e}`,placeholder:`Search (${e})`,value:"",size:e,shortcut:"⌘K",showClear:!0})).join("")}
    </div>`};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-chip-bool{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip-bool.active{background:#ef4444;color:#fff;border-color:#ef4444}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center;width:100%;max-width:520px}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="sf-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="sf-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 1 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="sf-disabled">Disabled</button>
            <button class="sb-chip-bool" id="sf-clear">Show clear</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const srchIcon=\${JSON.stringify(searchIcon)};
      const clrIcon=\${JSON.stringify(clearIcon)};
      let s={size:'m',disabled:false,showClear:false};
      let validationCleanup=null;
      function update(){
        const preview=document.getElementById('sf-preview');
        preview.innerHTML=\\\`
        if(window.__atomInit) window.__atomInit(document.getElementById('sf-preview'));
          <div class="search-field search-field--\\\${s.size}" style="width:100%;max-width:360px;"
            data-search-field data-validate>
            <div class="search-field__field">
              <div class="search-field__leading">
                <div class="search-field__icon" aria-hidden="true">\\\${srchIcon}</div>
              </div>
              <input class="search-field__input" type="search" id="sf-live" name="sf-live"
                placeholder="Search..." autocomplete="off" \\\${s.disabled?'disabled':''}/>
              <div class="search-field__trailing">
                \\\${!s.showClear?'<span class="search-field__shortcut" aria-label="Keyboard shortcut">⌘K</span>':''}
              </div>
            </div>
          </div>\\\`;
        if(validationCleanup){validationCleanup();validationCleanup=null;}
        const forms=window.__atomForms;
        if(forms) validationCleanup=forms.initFormValidation({scope:preview});
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('sf-sizes','size');bool('sf-disabled','disabled');bool('sf-clear','showClear');
      update();
    })();
    <\/script>\`
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => renderSearch({
    name: 'filled',
    placeholder: 'Search...',
    value: 'design system',
    size: 'm',
    disabled: false,
    shortcut: '⌘K',
    showClear: true
  })
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => renderSearch({
    name: 'disabled',
    placeholder: 'Search disabled...',
    value: '',
    size: 'm',
    disabled: true,
    shortcut: '',
    showClear: false
  })
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; flex-direction:column; gap:12px; padding:16px; max-width:360px;">
      \${SIZES.map(s => renderSearch({
    name: \`sz-\${s}\`,
    placeholder: \`Search (\${s})\`,
    value: '',
    size: s,
    shortcut: '⌘K',
    showClear: true
  })).join('')}
    </div>\`
}`,...l.parameters?.docs?.source}}};const x=["Playground","Filled","Disabled","AllSizes"];export{l as AllSizes,a as Disabled,i as Filled,s as Playground,x as __namedExportsOrder,m as default};
