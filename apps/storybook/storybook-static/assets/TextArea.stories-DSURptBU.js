const p=`<svg viewBox="0 0 12 12" fill="none" width="12" height="12">
  <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="currentColor" stroke-width="1.5"/>
  <path d="M6 6V8.5M6 3.5H6.005V3.505H6V3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,u=`<svg viewBox="0 0 12 12" fill="none" width="12" height="12">
  <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" fill="currentColor"/>
</svg>`,o=({name:r,label:n,placeholder:x,value:l,size:b,disabled:v,error:d,supportiveText:m,showCounter:h,maxLength:i,rows:c})=>{const f=l;return`
    <div class="${["textarea",`textarea--${b}`,f,d&&"textarea--error",v].filter(Boolean).join(" ")}" data-textarea data-max-length="${i}">
      ${n?`<label class="textarea__label" for="ta-${r}">${n}</label>`:""}
      <div class="textarea__field">
        <textarea class="textarea__input" id="ta-${r}" name="${r}"
          placeholder="${x}" ${c?`rows="${c}"`:""}  maxlength="${i}">${l}</textarea>
        <div class="textarea__scrollbar" aria-hidden="true">
          <div class="textarea__scrollbar-thumb"></div>
        </div>
      </div>
      <div class="textarea__bottom">
        <div class="textarea__supportive">
          <div class="textarea__supportive-icon" aria-hidden="true">${d?u:p}</div>
          <span class="textarea__supportive-text">${m}</span>
        </div>
        ${h?`<div class="textarea__counter" data-counter><span data-current>0</span>/<span data-max>${i}</span></div>`:""}
      </div>
    </div>`},_={title:"Components/TextArea",tags:["autodocs"],argTypes:{label:{control:"text"},placeholder:{control:"text"},value:{control:"text"},size:{control:"select",options:["m","xl"]},disabled:{control:"boolean"},error:{control:"boolean"},showCounter:{control:"boolean"},supportiveText:{control:"text"},maxLength:{control:"number"},rows:{control:"number"}},args:{label:"Message",placeholder:"Write your message here...",value:"",size:"m",disabled:!1,error:!1,showCounter:!0,supportiveText:"Maximum 200 characters.",maxLength:200,rows:4}},e={render:()=>`
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
      <div class="sb-preview" id="ta-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="ta-sizes">
            <button class="sb-chip active" data-value="m">m</button>
            <button class="sb-chip" data-value="xl">xl</button>
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="ta-disabled">Disabled</button>
            <button class="sb-chip-bool" id="ta-required">Required</button>
            <button class="sb-chip-bool" id="ta-counter">Counter</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const infoSvg=${JSON.stringify(p)};
      const errSvg=${JSON.stringify(u)};
      let s={size:'m',disabled:false,required:false,showCounter:false,maxLength:200};
      let validationCleanup=null;
      function update(){
        const classes=['textarea',\`textarea--\${s.size}\`,s.disabled&&'textarea--disabled'].filter(Boolean).join(' ');
        const preview=document.getElementById('ta-preview');
        preview.innerHTML=\`
        if(window.__atomInit) window.__atomInit(document.getElementById('ta-preview'));
          <div class="\${classes}" style="width:100%;max-width:360px;"
            data-textarea data-validate \${s.required?'data-required':''} data-min-length="1">
            <label class="textarea__label" for="ta-live">Message</label>
            <div class="textarea__field">
              <textarea class="textarea__input" id="ta-live" name="ta-live"
                placeholder="Write your message here..." rows="4" \${s.disabled?'disabled':''} maxlength="\${s.maxLength}"></textarea>
              <div class="textarea__scrollbar" aria-hidden="true"><div class="textarea__scrollbar-thumb"></div></div>
            </div>
            <div class="textarea__bottom">
              <div class="textarea__supportive">
                <div class="textarea__supportive-icon" aria-hidden="true">\${infoSvg}</div>
                <span class="textarea__supportive-text">Maximum \${s.maxLength} characters.</span>
              </div>
              \${s.showCounter?\`<div class="textarea__counter"><span>0</span>/<span>\${s.maxLength}</span></div>\`:''}
            </div>
          </div>\`;
        if(validationCleanup){validationCleanup();validationCleanup=null;}
        const forms=window.__atomForms;
        if(forms) validationCleanup=forms.initFormValidation({scope:preview});
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('ta-sizes','size');bool('ta-disabled','disabled');bool('ta-required','required');bool('ta-counter','showCounter');
      update();
    })();
    <\/script>`},a={render:()=>`<div style="max-width:400px;">${o({name:"err",label:"Message",placeholder:"Write your message here...",value:"",size:"m",disabled:!1,error:!0,supportiveText:"Message cannot be empty.",showCounter:!1,maxLength:200,rows:4})}</div>`},t={render:()=>`<div style="max-width:400px;">${o({name:"counter",label:"Message",placeholder:"Write your message here...",value:"",size:"m",disabled:!1,error:!1,supportiveText:"Maximum 200 characters.",showCounter:!0,maxLength:200,rows:4})}</div>`},s={render:()=>`<div style="max-width:400px;">${o({name:"xl",label:"Description",placeholder:"Write your message here...",value:"",size:"xl",disabled:!1,error:!1,supportiveText:"",showCounter:!1,maxLength:200,rows:6})}</div>`};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
      <div class="sb-preview" id="ta-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="ta-sizes">
            <button class="sb-chip active" data-value="m">m</button>
            <button class="sb-chip" data-value="xl">xl</button>
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="ta-disabled">Disabled</button>
            <button class="sb-chip-bool" id="ta-required">Required</button>
            <button class="sb-chip-bool" id="ta-counter">Counter</button>
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
        const classes=['textarea',\\\`textarea--\\\${s.size}\\\`,s.disabled&&'textarea--disabled'].filter(Boolean).join(' ');
        const preview=document.getElementById('ta-preview');
        preview.innerHTML=\\\`
        if(window.__atomInit) window.__atomInit(document.getElementById('ta-preview'));
          <div class="\\\${classes}" style="width:100%;max-width:360px;"
            data-textarea data-validate \\\${s.required?'data-required':''} data-min-length="1">
            <label class="textarea__label" for="ta-live">Message</label>
            <div class="textarea__field">
              <textarea class="textarea__input" id="ta-live" name="ta-live"
                placeholder="Write your message here..." rows="4" \\\${s.disabled?'disabled':''} maxlength="\\\${s.maxLength}"></textarea>
              <div class="textarea__scrollbar" aria-hidden="true"><div class="textarea__scrollbar-thumb"></div></div>
            </div>
            <div class="textarea__bottom">
              <div class="textarea__supportive">
                <div class="textarea__supportive-icon" aria-hidden="true">\\\${infoSvg}</div>
                <span class="textarea__supportive-text">Maximum \\\${s.maxLength} characters.</span>
              </div>
              \\\${s.showCounter?\\\`<div class="textarea__counter"><span>0</span>/<span>\\\${s.maxLength}</span></div>\\\`:''}
            </div>
          </div>\\\`;
        if(validationCleanup){validationCleanup();validationCleanup=null;}
        const forms=window.__atomForms;
        if(forms) validationCleanup=forms.initFormValidation({scope:preview});
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('ta-sizes','size');bool('ta-disabled','disabled');bool('ta-required','required');bool('ta-counter','showCounter');
      update();
    })();
    <\/script>\`
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="max-width:400px;">\${renderTextArea({
    name: 'err',
    label: 'Message',
    placeholder: 'Write your message here...',
    value: '',
    size: 'm',
    disabled: false,
    error: true,
    supportiveText: 'Message cannot be empty.',
    showCounter: false,
    maxLength: 200,
    rows: 4
  })}</div>\`
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="max-width:400px;">\${renderTextArea({
    name: 'counter',
    label: 'Message',
    placeholder: 'Write your message here...',
    value: '',
    size: 'm',
    disabled: false,
    error: false,
    supportiveText: 'Maximum 200 characters.',
    showCounter: true,
    maxLength: 200,
    rows: 4
  })}</div>\`
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="max-width:400px;">\${renderTextArea({
    name: 'xl',
    label: 'Description',
    placeholder: 'Write your message here...',
    value: '',
    size: 'xl',
    disabled: false,
    error: false,
    supportiveText: '',
    showCounter: false,
    maxLength: 200,
    rows: 6
  })}</div>\`
}`,...s.parameters?.docs?.source}}};const y=["Playground","WithError","WithCounter","SizeXL"];export{e as Playground,s as SizeXL,t as WithCounter,a as WithError,y as __namedExportsOrder,_ as default};
