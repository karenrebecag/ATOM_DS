const v=`<style>
  .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
  .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:480px}
  .sb-control-row{display:flex;align-items:center;gap:12px}
  .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
  .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
  .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
  .sb-chip.active{background:#111;color:#fff;border-color:#111}
  .sb-chip-bool{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
  .sb-chip-bool.active{background:#ef4444;color:#fff;border-color:#ef4444}
  .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
  .sb-separator{width:100%;max-width:480px;border:none;border-top:1px solid #f3f4f6}
</style>`,p='<svg class="radio-field__error-icon" viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 4a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0V5Zm.75 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>',e=({id:a,name:b,size:d,checked:u,disabled:o,error:f,errorText:l,label:n,supportiveText:t})=>{const c=f&&l;return`<div class="radio-field radio-field--${d}${o?" radio-field--disabled":""}${c?" radio-field--error":""}">
    <div class="radio-field__row">
      <div class="radio-field__selector">
        <label class="radio radio--${d}" for="${a}" data-radio>
          <input class="radio__input" type="radio" id="${a}" name="${b}" ${u?"checked":""} ${o?"disabled":""}/>
          <span class="radio__circle" aria-hidden="true" data-radio-circle><span class="radio__dot" data-radio-dot></span></span>
        </label>
      </div>
      <div class="radio-field__text">
        ${n?`<label class="radio-field__title" for="${a}">${n}</label>`:""}
        ${t?`<span class="radio-field__supportive">${t}</span>`:""}
      </div>
    </div>
    ${c?`<div class="radio-field__error">${p}<span class="radio-field__error-text">${l}</span></div>`:""}
  </div>`},m={title:"Components/Radio",tags:["autodocs"],argTypes:{size:{control:"select",options:["s","m"]},checked:{control:"boolean"},disabled:{control:"boolean"},error:{control:"boolean"},label:{control:"text"}},args:{size:"m",checked:!1,disabled:!1,error:!1,label:"Option label"}},i={render:()=>`
    ${v}
    <div class="sb-playground">
      <div class="sb-preview" id="rb-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row">
          <label>Size</label>
          <div class="sb-chips" id="rb-sizes">
            <button class="sb-chip" data-value="s">s</button>
            <button class="sb-chip active" data-value="m">m</button>
          </div>
        </div>
        <div class="sb-control-row">
          <label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="rb-checked">Checked</button>
            <button class="sb-chip-bool" id="rb-disabled">Disabled</button>
            <button class="sb-chip-bool" id="rb-error">Error</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={size:'m',checked:false,disabled:false,error:false};
      const errIcon=${JSON.stringify(p)};
      function update(){
        const hasError=s.error;
        document.getElementById('rb-preview').innerHTML=\`
        if(window.__atomInit) window.__atomInit(document.getElementById('rb-preview'));
          <div class="radio-field radio-field--\${s.size}\${s.disabled?' radio-field--disabled':''}\${hasError?' radio-field--error':''}">
            <div class="radio-field__row">
              <div class="radio-field__selector">
                <label class="radio radio--\${s.size}" for="rb-live" data-radio>
                  <input class="radio__input" type="radio" id="rb-live" name="rb-live" \${s.checked?'checked':''} \${s.disabled?'disabled':''}/>
                  <span class="radio__circle" aria-hidden="true" data-radio-circle><span class="radio__dot" data-radio-dot></span></span>
                </label>
              </div>
              <div class="radio-field__text">
                <label class="radio-field__title" for="rb-live">Option label</label>
              </div>
            </div>
            \${hasError?\`<div class="radio-field__error">\${errIcon}<span class="radio-field__error-text">This field is required</span></div>\`:''}
          </div>\`;
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('rb-sizes','size');bool('rb-checked','checked');bool('rb-disabled','disabled');bool('rb-error','error');
      update();
    })();
    <\/script>`},r={render:()=>`<fieldset style="border:none;padding:0;margin:0;"><legend style="font-size:13px;font-weight:500;margin-bottom:12px;">Choose a plan</legend>
    <div style="display:flex;flex-direction:column;gap:8px;">
      ${e({id:"p1",name:"plan",size:"m",checked:!0,label:"Free plan",supportiveText:"Up to 3 projects"})}
      ${e({id:"p2",name:"plan",size:"m",label:"Pro plan",supportiveText:"Unlimited projects"})}
      ${e({id:"p3",name:"plan",size:"m",label:"Enterprise",supportiveText:"Custom pricing"})}
    </div>
  </fieldset>`},s={render:()=>`<div style="display:flex;flex-direction:column;gap:12px;padding:16px;">
    ${e({id:"rs1",name:"states",size:"m",label:"Unchecked"})}
    ${e({id:"rs2",name:"states",size:"m",checked:!0,label:"Checked"})}
    ${e({id:"rs3",name:"states",size:"m",disabled:!0,label:"Disabled"})}
    ${e({id:"rs4",name:"states",size:"m",error:!0,errorText:"Required field",label:"Error"})}
  </div>`};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    \${SB}
    <div class="sb-playground">
      <div class="sb-preview" id="rb-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row">
          <label>Size</label>
          <div class="sb-chips" id="rb-sizes">
            <button class="sb-chip" data-value="s">s</button>
            <button class="sb-chip active" data-value="m">m</button>
          </div>
        </div>
        <div class="sb-control-row">
          <label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="rb-checked">Checked</button>
            <button class="sb-chip-bool" id="rb-disabled">Disabled</button>
            <button class="sb-chip-bool" id="rb-error">Error</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={size:'m',checked:false,disabled:false,error:false};
      const errIcon=\${JSON.stringify(errorIcon)};
      function update(){
        const hasError=s.error;
        document.getElementById('rb-preview').innerHTML=\\\`
        if(window.__atomInit) window.__atomInit(document.getElementById('rb-preview'));
          <div class="radio-field radio-field--\\\${s.size}\\\${s.disabled?' radio-field--disabled':''}\\\${hasError?' radio-field--error':''}">
            <div class="radio-field__row">
              <div class="radio-field__selector">
                <label class="radio radio--\\\${s.size}" for="rb-live" data-radio>
                  <input class="radio__input" type="radio" id="rb-live" name="rb-live" \\\${s.checked?'checked':''} \\\${s.disabled?'disabled':''}/>
                  <span class="radio__circle" aria-hidden="true" data-radio-circle><span class="radio__dot" data-radio-dot></span></span>
                </label>
              </div>
              <div class="radio-field__text">
                <label class="radio-field__title" for="rb-live">Option label</label>
              </div>
            </div>
            \\\${hasError?\\\`<div class="radio-field__error">\\\${errIcon}<span class="radio-field__error-text">This field is required</span></div>\\\`:''}
          </div>\\\`;
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('rb-sizes','size');bool('rb-checked','checked');bool('rb-disabled','disabled');bool('rb-error','error');
      update();
    })();
    <\/script>\`
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => \`<fieldset style="border:none;padding:0;margin:0;"><legend style="font-size:13px;font-weight:500;margin-bottom:12px;">Choose a plan</legend>
    <div style="display:flex;flex-direction:column;gap:8px;">
      \${renderRadioField({
    id: 'p1',
    name: 'plan',
    size: 'm',
    checked: true,
    label: 'Free plan',
    supportiveText: 'Up to 3 projects'
  })}
      \${renderRadioField({
    id: 'p2',
    name: 'plan',
    size: 'm',
    label: 'Pro plan',
    supportiveText: 'Unlimited projects'
  })}
      \${renderRadioField({
    id: 'p3',
    name: 'plan',
    size: 'm',
    label: 'Enterprise',
    supportiveText: 'Custom pricing'
  })}
    </div>
  </fieldset>\`
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="display:flex;flex-direction:column;gap:12px;padding:16px;">
    \${renderRadioField({
    id: 'rs1',
    name: 'states',
    size: 'm',
    label: 'Unchecked'
  })}
    \${renderRadioField({
    id: 'rs2',
    name: 'states',
    size: 'm',
    checked: true,
    label: 'Checked'
  })}
    \${renderRadioField({
    id: 'rs3',
    name: 'states',
    size: 'm',
    disabled: true,
    label: 'Disabled'
  })}
    \${renderRadioField({
    id: 'rs4',
    name: 'states',
    size: 'm',
    error: true,
    errorText: 'Required field',
    label: 'Error'
  })}
  </div>\`
}`,...s.parameters?.docs?.source}}};const h=["Playground","RadioGroup","AllStates"];export{s as AllStates,i as Playground,r as RadioGroup,h as __namedExportsOrder,m as default};
