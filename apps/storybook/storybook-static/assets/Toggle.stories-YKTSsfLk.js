const f=`<svg class="toggle-field__error-icon" viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 4a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0V5Zm.75 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
</svg>`,b=(e,i,s,l,o)=>`
  <label class="toggle toggle--${o}${l?" toggle--disabled":""}" for="${e}" data-toggle>
    <input class="toggle__input" type="checkbox" id="${e}" name="${i}"
      ${s?"checked":""} ${l?"disabled":""} role="switch" aria-checked="${s}"/>
    <span class="toggle__track" aria-hidden="true" data-toggle-track>
      <span class="toggle__knob" data-toggle-knob></span>
    </span>
  </label>`,t=({id:e,name:i,size:s,checked:l,disabled:o,label:d,supportiveText:c,error:u,errorText:p})=>{const g=u&&p;return!d&&!c&&!g?b(e,i,l,o,s):`
    <div class="toggle-field toggle-field--${s}${o?" toggle-field--disabled":""}${g?" toggle-field--error":""}" data-toggle>
      <div class="toggle-field__row">
        <div class="toggle-field__selector">${b(e,i,l,o,s)}</div>
        <div class="toggle-field__text">
          ${d?`<label class="toggle-field__title" for="${e}">${d}</label>`:""}
          ${c?`<span class="toggle-field__supportive">${c}</span>`:""}
        </div>
      </div>
      ${g?`<div class="toggle-field__error">${f}<span class="toggle-field__error-text">${p}</span></div>`:""}
    </div>`},v={title:"Components/Toggle",tags:["autodocs"],argTypes:{size:{control:"select",options:["s","m"]},checked:{control:"boolean"},disabled:{control:"boolean"},label:{control:"text"},supportiveText:{control:"text"},error:{control:"boolean"},errorText:{control:"text"}},args:{size:"s",checked:!1,disabled:!1,label:"Enable notifications",supportiveText:"",error:!1,errorText:"This setting is required."}},r={render:()=>`
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
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="tgl-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="tgl-sizes">
            <button class="sb-chip active" data-value="s">s</button>
            <button class="sb-chip" data-value="m">m</button>
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="tgl-checked">Checked</button>
            <button class="sb-chip-bool" id="tgl-disabled">Disabled</button>
            <button class="sb-chip-bool" id="tgl-error">Error</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const errIcon=${JSON.stringify(f)};
      let s={size:'s',checked:false,disabled:false,error:false};
      function update(){
        const hasError=s.error;
        const trackInner=\`<input class="toggle__input" type="checkbox" id="tgl-live" name="tgl-live" \${s.checked?'checked':''} \${s.disabled?'disabled':''} role="switch" aria-checked="\${s.checked}"/><span class="toggle__track" aria-hidden="true" data-toggle-track><span class="toggle__knob" data-toggle-knob></span></span>\`;
        document.getElementById('tgl-preview').innerHTML=\`
        if(window.__atomInit) window.__atomInit(document.getElementById('tgl-preview'));
          <div class="toggle-field toggle-field--\${s.size}\${s.disabled?' toggle-field--disabled':''}\${hasError?' toggle-field--error':''}">
            <div class="toggle-field__row">
              <div class="toggle-field__selector">
                <label class="toggle toggle--\${s.size}\${s.disabled?' toggle--disabled':''}" for="tgl-live" data-toggle>\${trackInner}</label>
              </div>
              <div class="toggle-field__text">
                <label class="toggle-field__title" for="tgl-live">Enable notifications</label>
              </div>
            </div>
            \${hasError?\`<div class="toggle-field__error">\${errIcon}<span class="toggle-field__error-text">This setting is required.</span></div>\`:''}
          </div>\`;
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('tgl-sizes','size');bool('tgl-checked','checked');bool('tgl-disabled','disabled');bool('tgl-error','error');
      update();
    })();
    <\/script>`},n={render:()=>`
    <div style="display:flex; flex-direction:column; gap:16px; padding:16px;">
      ${t({id:"tg1",name:"n1",size:"s",label:"Unchecked"})}
      ${t({id:"tg2",name:"n2",size:"s",checked:!0,label:"Checked"})}
      ${t({id:"tg3",name:"n3",size:"s",disabled:!0,label:"Disabled"})}
      ${t({id:"tg4",name:"n4",size:"s",error:!0,errorText:"Required.",label:"Error"})}
      ${t({id:"tg5",name:"n5",size:"s",label:"With supportive text",supportiveText:"We'll send you relevant updates only."})}
    </div>`},a={render:()=>t({id:"tg-m",name:"size-m",size:"m",label:"Size M toggle",checked:!0})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="tgl-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="tgl-sizes">
            <button class="sb-chip active" data-value="s">s</button>
            <button class="sb-chip" data-value="m">m</button>
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="tgl-checked">Checked</button>
            <button class="sb-chip-bool" id="tgl-disabled">Disabled</button>
            <button class="sb-chip-bool" id="tgl-error">Error</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const errIcon=\${JSON.stringify(errorIcon)};
      let s={size:'s',checked:false,disabled:false,error:false};
      function update(){
        const hasError=s.error;
        const trackInner=\\\`<input class="toggle__input" type="checkbox" id="tgl-live" name="tgl-live" \\\${s.checked?'checked':''} \\\${s.disabled?'disabled':''} role="switch" aria-checked="\\\${s.checked}"/><span class="toggle__track" aria-hidden="true" data-toggle-track><span class="toggle__knob" data-toggle-knob></span></span>\\\`;
        document.getElementById('tgl-preview').innerHTML=\\\`
        if(window.__atomInit) window.__atomInit(document.getElementById('tgl-preview'));
          <div class="toggle-field toggle-field--\\\${s.size}\\\${s.disabled?' toggle-field--disabled':''}\\\${hasError?' toggle-field--error':''}">
            <div class="toggle-field__row">
              <div class="toggle-field__selector">
                <label class="toggle toggle--\\\${s.size}\\\${s.disabled?' toggle--disabled':''}" for="tgl-live" data-toggle>\\\${trackInner}</label>
              </div>
              <div class="toggle-field__text">
                <label class="toggle-field__title" for="tgl-live">Enable notifications</label>
              </div>
            </div>
            \\\${hasError?\\\`<div class="toggle-field__error">\\\${errIcon}<span class="toggle-field__error-text">This setting is required.</span></div>\\\`:''}
          </div>\\\`;
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('tgl-sizes','size');bool('tgl-checked','checked');bool('tgl-disabled','disabled');bool('tgl-error','error');
      update();
    })();
    <\/script>\`
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; flex-direction:column; gap:16px; padding:16px;">
      \${renderToggle({
    id: 'tg1',
    name: 'n1',
    size: 's',
    label: 'Unchecked'
  })}
      \${renderToggle({
    id: 'tg2',
    name: 'n2',
    size: 's',
    checked: true,
    label: 'Checked'
  })}
      \${renderToggle({
    id: 'tg3',
    name: 'n3',
    size: 's',
    disabled: true,
    label: 'Disabled'
  })}
      \${renderToggle({
    id: 'tg4',
    name: 'n4',
    size: 's',
    error: true,
    errorText: 'Required.',
    label: 'Error'
  })}
      \${renderToggle({
    id: 'tg5',
    name: 'n5',
    size: 's',
    label: 'With supportive text',
    supportiveText: 'We\\'ll send you relevant updates only.'
  })}
    </div>\`
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => renderToggle({
    id: 'tg-m',
    name: 'size-m',
    size: 'm',
    label: 'Size M toggle',
    checked: true
  })
}`,...a.parameters?.docs?.source}}};const h=["Playground","AllStates","SizeM"];export{n as AllStates,r as Playground,a as SizeM,h as __namedExportsOrder,v as default};
