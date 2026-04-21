const u=`<style>
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
</style>`,t='<svg class="checkbox__check" viewBox="0 0 12 10" fill="none"><path d="M1 5.5L4 8.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',a='<svg class="checkbox__minus" viewBox="0 0 12 2" fill="none"><path d="M1 1H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',e=({id:i="cb",size:o,checked:l,indeterminate:d,error:r,disabled:b,label:p})=>`
  <label class="checkbox checkbox--${o}${r?" checkbox--error":""}" for="${i}" data-checkbox>
    <input class="checkbox__input" type="checkbox" id="${i}" ${l?"checked":""} ${b?"disabled":""} ${d?'data-indeterminate="true"':""}/>
    <span class="checkbox__custom" aria-hidden="true" data-checkbox-custom>${t}${a}</span>
    <span class="checkbox__label">${p}</span>
  </label>`,h={title:"Components/Checkbox",tags:["autodocs"],argTypes:{size:{control:"select",options:["s","m"]},checked:{control:"boolean"},indeterminate:{control:"boolean"},error:{control:"boolean"},disabled:{control:"boolean"},label:{control:"text"}},args:{size:"m",checked:!1,indeterminate:!1,error:!1,disabled:!1,label:"Accept terms and conditions"}},s={render:()=>`
    ${u}
    <div class="sb-playground">
      <div class="sb-preview" id="cb-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row">
          <label>Size</label>
          <div class="sb-chips" id="cb-sizes">
            <button class="sb-chip" data-value="s">s</button>
            <button class="sb-chip active" data-value="m">m</button>
          </div>
        </div>
        <div class="sb-control-row">
          <label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="cb-checked">Checked</button>
            <button class="sb-chip-bool" id="cb-indeterminate">Indeterminate</button>
            <button class="sb-chip-bool" id="cb-error">Error</button>
            <button class="sb-chip-bool" id="cb-disabled">Disabled</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={size:'m',checked:false,indeterminate:false,error:false,disabled:false,label:'Accept terms and conditions'};
      function update(){
        document.getElementById('cb-preview').innerHTML=\`
        if(window.__atomInit) window.__atomInit(document.getElementById('cb-preview'));
          <label class="checkbox checkbox--\${s.size}\${s.error?' checkbox--error':''}" for="cb-live" data-checkbox>
            <input class="checkbox__input" type="checkbox" id="cb-live" \${s.checked?'checked':''} \${s.disabled?'disabled':''} \${s.indeterminate?'data-indeterminate="true"':''}/>
            <span class="checkbox__custom" aria-hidden="true" data-checkbox-custom>
              ${t.replace(/`/g,"\\`")}${a.replace(/`/g,"\\`")}
            </span>
            <span class="checkbox__label">\${s.label}</span>
          </label>\`;
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
      chips('cb-sizes','size');
      bool('cb-checked','checked');bool('cb-indeterminate','indeterminate');
      bool('cb-error','error');bool('cb-disabled','disabled');
      update();
    })();
    <\/script>`},n={render:()=>`<div style="display:flex;flex-direction:column;gap:12px;padding:16px;">
    ${e({id:"s1",size:"m",label:"Unchecked"})}
    ${e({id:"s2",size:"m",checked:!0,label:"Checked"})}
    ${e({id:"s3",size:"m",indeterminate:!0,label:"Indeterminate"})}
    ${e({id:"s4",size:"m",error:!0,label:"Error"})}
    ${e({id:"s5",size:"m",disabled:!0,label:"Disabled"})}
    ${e({id:"s6",size:"m",checked:!0,disabled:!0,label:"Disabled + Checked"})}
  </div>`},c={render:()=>`<div style="display:flex;gap:32px;padding:16px;align-items:flex-start;">
    <div style="display:flex;flex-direction:column;gap:8px;">
      <span style="font-size:11px;color:#999;">Size S</span>
      ${e({id:"zs1",size:"s",label:"Small unchecked"})}
      ${e({id:"zs2",size:"s",checked:!0,label:"Small checked"})}
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;">
      <span style="font-size:11px;color:#999;">Size M</span>
      ${e({id:"zm1",size:"m",label:"Medium unchecked"})}
      ${e({id:"zm2",size:"m",checked:!0,label:"Medium checked"})}
    </div>
  </div>`};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    \${SB_STYLES}
    <div class="sb-playground">
      <div class="sb-preview" id="cb-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row">
          <label>Size</label>
          <div class="sb-chips" id="cb-sizes">
            <button class="sb-chip" data-value="s">s</button>
            <button class="sb-chip active" data-value="m">m</button>
          </div>
        </div>
        <div class="sb-control-row">
          <label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="cb-checked">Checked</button>
            <button class="sb-chip-bool" id="cb-indeterminate">Indeterminate</button>
            <button class="sb-chip-bool" id="cb-error">Error</button>
            <button class="sb-chip-bool" id="cb-disabled">Disabled</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={size:'m',checked:false,indeterminate:false,error:false,disabled:false,label:'Accept terms and conditions'};
      function update(){
        document.getElementById('cb-preview').innerHTML=\\\`
        if(window.__atomInit) window.__atomInit(document.getElementById('cb-preview'));
          <label class="checkbox checkbox--\\\${s.size}\\\${s.error?' checkbox--error':''}" for="cb-live" data-checkbox>
            <input class="checkbox__input" type="checkbox" id="cb-live" \\\${s.checked?'checked':''} \\\${s.disabled?'disabled':''} \\\${s.indeterminate?'data-indeterminate="true"':''}/>
            <span class="checkbox__custom" aria-hidden="true" data-checkbox-custom>
              \${checkSvg.replace(/\`/g, '\\\\\`')}\${minusSvg.replace(/\`/g, '\\\\\`')}
            </span>
            <span class="checkbox__label">\\\${s.label}</span>
          </label>\\\`;
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
      chips('cb-sizes','size');
      bool('cb-checked','checked');bool('cb-indeterminate','indeterminate');
      bool('cb-error','error');bool('cb-disabled','disabled');
      update();
    })();
    <\/script>\`
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="display:flex;flex-direction:column;gap:12px;padding:16px;">
    \${renderCheckbox({
    id: 's1',
    size: 'm',
    label: 'Unchecked'
  })}
    \${renderCheckbox({
    id: 's2',
    size: 'm',
    checked: true,
    label: 'Checked'
  })}
    \${renderCheckbox({
    id: 's3',
    size: 'm',
    indeterminate: true,
    label: 'Indeterminate'
  })}
    \${renderCheckbox({
    id: 's4',
    size: 'm',
    error: true,
    label: 'Error'
  })}
    \${renderCheckbox({
    id: 's5',
    size: 'm',
    disabled: true,
    label: 'Disabled'
  })}
    \${renderCheckbox({
    id: 's6',
    size: 'm',
    checked: true,
    disabled: true,
    label: 'Disabled + Checked'
  })}
  </div>\`
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="display:flex;gap:32px;padding:16px;align-items:flex-start;">
    <div style="display:flex;flex-direction:column;gap:8px;">
      <span style="font-size:11px;color:#999;">Size S</span>
      \${renderCheckbox({
    id: 'zs1',
    size: 's',
    label: 'Small unchecked'
  })}
      \${renderCheckbox({
    id: 'zs2',
    size: 's',
    checked: true,
    label: 'Small checked'
  })}
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;">
      <span style="font-size:11px;color:#999;">Size M</span>
      \${renderCheckbox({
    id: 'zm1',
    size: 'm',
    label: 'Medium unchecked'
  })}
      \${renderCheckbox({
    id: 'zm2',
    size: 'm',
    checked: true,
    label: 'Medium checked'
  })}
    </div>
  </div>\`
}`,...c.parameters?.docs?.source}}};const m=["Playground","AllStates","SizeComparison"];export{n as AllStates,s as Playground,c as SizeComparison,m as __namedExportsOrder,h as default};
