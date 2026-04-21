const f=`<svg viewBox="0 0 12 12" fill="none" width="12" height="12">
  <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="currentColor" stroke-width="1.5"/>
  <path d="M6 6V8.5M6 3.5H6.005V3.505H6V3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,b=`<svg viewBox="0 0 12 12" fill="none" width="12" height="12">
  <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" fill="currentColor"/>
</svg>`,r=({name:e,label:i,placeholder:x,value:t,size:v,disabled:p,error:u,supportiveText:m,showCounter:h,maxLength:d})=>{const g=t&&t.length>0,w=t?t.length:0;return`
    <div class="${["text-field",`text-field--${v}`,g&&"text-field--filled",u&&"text-field--error",p&&"text-field--disabled"].filter(Boolean).join(" ")}" data-text-field data-max-length="${d}">
      ${i?`<label class="text-field__label" for="tf-${e}">${i}</label>`:""}
      <div class="text-field__field">
        <input class="text-field__input" type="text" id="tf-${e}" name="${e}"
          placeholder="${x}" value="${t}" ${p?"disabled":""} maxlength="${d}"/>
      </div>
      <div class="text-field__bottom">
        <div class="text-field__supportive">
          <div class="text-field__supportive-icon" aria-hidden="true">${u?b:f}</div>
          <span class="text-field__supportive-text">${m}</span>
        </div>
        ${h?`<div class="text-field__counter"><span>${w}</span>/<span>${d}</span></div>`:""}
      </div>
    </div>`},c=["xs","s","m","l","xl"],_={title:"Components/TextField",tags:["autodocs"],argTypes:{label:{control:"text"},placeholder:{control:"text"},value:{control:"text"},size:{control:"select",options:c},disabled:{control:"boolean"},error:{control:"boolean"},showCounter:{control:"boolean"},supportiveText:{control:"text"},maxLength:{control:"number"}},args:{label:"Email address",placeholder:"Enter your email",value:"",size:"m",disabled:!1,error:!1,showCounter:!1,supportiveText:"We'll never share your email.",maxLength:200}},s={render:()=>`
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
      .sb-hint{font-size:11px;color:#9ca3af;text-align:center}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="tf-preview"></div>
      <p class="sb-hint">Click the field and tab out to trigger live validation</p>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="tf-sizes">
            ${c.map((e,i)=>`<button class="sb-chip${i===2?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="tf-disabled">Disabled</button>
            <button class="sb-chip-bool" id="tf-required">Required</button>
            <button class="sb-chip-bool" id="tf-counter">Counter</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const infoSvg=${JSON.stringify(f)};
      const errSvg=${JSON.stringify(b)};
      let s={size:'m',disabled:false,required:false,showCounter:false,maxLength:200};
      let validationCleanup=null;
      function update(){
        const classes=['text-field',\`text-field--\${s.size}\`,s.disabled&&'text-field--disabled'].filter(Boolean).join(' ');
        const preview=document.getElementById('tf-preview');
        preview.innerHTML=\`
        if(window.__atomInit) window.__atomInit(document.getElementById('tf-preview'));
          <div class="\${classes}" style="width:100%;max-width:360px;"
            data-text-field data-validate \${s.required?'data-required':''}>
            <label class="text-field__label" for="tf-live">Email address</label>
            <div class="text-field__field">
              <input class="text-field__input" type="email" id="tf-live" name="tf-live"
                placeholder="Enter your email" \${s.disabled?'disabled':''} maxlength="\${s.maxLength}"/>
            </div>
            <div class="text-field__bottom">
              <div class="text-field__supportive">
                <div class="text-field__supportive-icon" aria-hidden="true">\${infoSvg}</div>
                <span class="text-field__supportive-text">We'll never share your email.</span>
              </div>
              \${s.showCounter?\`<div class="text-field__counter"><span>0</span>/<span>\${s.maxLength}</span></div>\`:''}
            </div>
          </div>\`;
        if(validationCleanup){validationCleanup();validationCleanup=null;}
        const forms=window.__atomForms;
        if(forms) validationCleanup=forms.initFormValidation({scope:preview});
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('tf-sizes','size');bool('tf-disabled','disabled');bool('tf-required','required');bool('tf-counter','showCounter');
      update();
    })();
    <\/script>`},l={render:()=>`
    <div style="display:flex; flex-direction:column; gap:20px; padding:16px; max-width:400px;">
      ${c.map(e=>r({name:`size-${e}`,label:`Size ${e.toUpperCase()}`,placeholder:"Placeholder",value:"",size:e,supportiveText:"Supportive text",maxLength:200})).join("")}
    </div>`},a={render:()=>r({name:"error",label:"Email address",placeholder:"Enter your email",value:"",size:"m",disabled:!1,error:!0,supportiveText:"Please enter a valid email address.",showCounter:!1,maxLength:200})},n={render:()=>r({name:"counter",label:"Username",placeholder:"Choose a username",value:"",size:"m",disabled:!1,error:!1,showCounter:!0,supportiveText:"",maxLength:50})},o={render:()=>r({name:"disabled",label:"Email (disabled)",placeholder:"Enter your email",value:"readonly@example.com",size:"m",disabled:!0,error:!1,showCounter:!1,supportiveText:"",maxLength:200})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
      .sb-hint{font-size:11px;color:#9ca3af;text-align:center}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="tf-preview"></div>
      <p class="sb-hint">Click the field and tab out to trigger live validation</p>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="tf-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 2 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="tf-disabled">Disabled</button>
            <button class="sb-chip-bool" id="tf-required">Required</button>
            <button class="sb-chip-bool" id="tf-counter">Counter</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const infoSvg=\${JSON.stringify(infoIcon)};
      const errSvg=\${JSON.stringify(errorIcon)};
      let s={size:'m',disabled:false,required:false,showCounter:false,maxLength:200};
      let validationCleanup=null;
      function update(){
        const classes=['text-field',\\\`text-field--\\\${s.size}\\\`,s.disabled&&'text-field--disabled'].filter(Boolean).join(' ');
        const preview=document.getElementById('tf-preview');
        preview.innerHTML=\\\`
        if(window.__atomInit) window.__atomInit(document.getElementById('tf-preview'));
          <div class="\\\${classes}" style="width:100%;max-width:360px;"
            data-text-field data-validate \\\${s.required?'data-required':''}>
            <label class="text-field__label" for="tf-live">Email address</label>
            <div class="text-field__field">
              <input class="text-field__input" type="email" id="tf-live" name="tf-live"
                placeholder="Enter your email" \\\${s.disabled?'disabled':''} maxlength="\\\${s.maxLength}"/>
            </div>
            <div class="text-field__bottom">
              <div class="text-field__supportive">
                <div class="text-field__supportive-icon" aria-hidden="true">\\\${infoSvg}</div>
                <span class="text-field__supportive-text">We'll never share your email.</span>
              </div>
              \\\${s.showCounter?\\\`<div class="text-field__counter"><span>0</span>/<span>\\\${s.maxLength}</span></div>\\\`:''}
            </div>
          </div>\\\`;
        if(validationCleanup){validationCleanup();validationCleanup=null;}
        const forms=window.__atomForms;
        if(forms) validationCleanup=forms.initFormValidation({scope:preview});
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('tf-sizes','size');bool('tf-disabled','disabled');bool('tf-required','required');bool('tf-counter','showCounter');
      update();
    })();
    <\/script>\`
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; flex-direction:column; gap:20px; padding:16px; max-width:400px;">
      \${SIZES.map(s => renderField({
    name: \`size-\${s}\`,
    label: \`Size \${s.toUpperCase()}\`,
    placeholder: 'Placeholder',
    value: '',
    size: s,
    supportiveText: 'Supportive text',
    maxLength: 200
  })).join('')}
    </div>\`
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => renderField({
    name: 'error',
    label: 'Email address',
    placeholder: 'Enter your email',
    value: '',
    size: 'm',
    disabled: false,
    error: true,
    supportiveText: 'Please enter a valid email address.',
    showCounter: false,
    maxLength: 200
  })
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => renderField({
    name: 'counter',
    label: 'Username',
    placeholder: 'Choose a username',
    value: '',
    size: 'm',
    disabled: false,
    error: false,
    showCounter: true,
    supportiveText: '',
    maxLength: 50
  })
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => renderField({
    name: 'disabled',
    label: 'Email (disabled)',
    placeholder: 'Enter your email',
    value: 'readonly@example.com',
    size: 'm',
    disabled: true,
    error: false,
    showCounter: false,
    supportiveText: '',
    maxLength: 200
  })
}`,...o.parameters?.docs?.source}}};const $=["Playground","AllSizes","WithError","WithCounter","Disabled"];export{l as AllSizes,o as Disabled,s as Playground,n as WithCounter,a as WithError,$ as __namedExportsOrder,_ as default};
