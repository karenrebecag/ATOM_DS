const t=["xs","s","m","l","xl"],r=["primary","secondary","tertiary"],l=(e,n,i,d)=>`<a href="#" data-underline-link="" class="nav-link nav-link--${n} nav-link--${i}">${e}</a>`,c={title:"Components/NavLink",tags:["autodocs"],parameters:{layout:"centered"}},a={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:80px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center;gap:32px}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="nl-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="nl-sizes">
            ${t.map((e,n)=>`<button class="sb-chip${n===2?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Color</label>
          <div class="sb-chips" id="nl-variants">
            ${r.map((e,n)=>`<button class="sb-chip${n===0?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Underline</label>
          <div class="sb-chips" id="nl-underline">
            <button class="sb-chip active" data-value="default">default</button>
            <button class="sb-chip" data-value="alt">alt</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={size:'m',variant:'primary',underline:'default'};
      function update(){
        const dataVal=s.underline==='alt'?'alt':'';
        document.getElementById('nl-preview').innerHTML=\`
          <a href="#" data-underline-link="\${dataVal}" class="nav-link nav-link--\${s.variant} nav-link--\${s.size}">Hover this link</a>
          <a href="#" data-underline-link="\${dataVal}" class="nav-link nav-link--\${s.variant} nav-link--\${s.size}">Another link</a>\`;
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      chips('nl-sizes','size');chips('nl-variants','variant');chips('nl-underline','underline');
      update();
    })();
    <\/script>`},s={name:"Parent Hover Trigger",render:()=>`
    <div style="padding:32px;">
      <div data-hover style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:8px;border:1px solid var(--border-secondary,#e4e4e7);cursor:pointer;">
        <span style="font-size:14px;color:var(--fg-secondary);">Hover this card</span>
        ${l("Link animates","primary","s")}
      </div>
    </div>`};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:80px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center;gap:32px}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="nl-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="nl-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 2 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Color</label>
          <div class="sb-chips" id="nl-variants">
            \${VARIANTS.map((v, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${v}">\${v}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Underline</label>
          <div class="sb-chips" id="nl-underline">
            <button class="sb-chip active" data-value="default">default</button>
            <button class="sb-chip" data-value="alt">alt</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={size:'m',variant:'primary',underline:'default'};
      function update(){
        const dataVal=s.underline==='alt'?'alt':'';
        document.getElementById('nl-preview').innerHTML=\\\`
          <a href="#" data-underline-link="\\\${dataVal}" class="nav-link nav-link--\\\${s.variant} nav-link--\\\${s.size}">Hover this link</a>
          <a href="#" data-underline-link="\\\${dataVal}" class="nav-link nav-link--\\\${s.variant} nav-link--\\\${s.size}">Another link</a>\\\`;
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      chips('nl-sizes','size');chips('nl-variants','variant');chips('nl-underline','underline');
      update();
    })();
    <\/script>\`
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Parent Hover Trigger',
  render: () => /* html */\`
    <div style="padding:32px;">
      <div data-hover style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:8px;border:1px solid var(--border-secondary,#e4e4e7);cursor:pointer;">
        <span style="font-size:14px;color:var(--fg-secondary);">Hover this card</span>
        \${renderLink('Link animates', 'primary', 's', 'default')}
      </div>
    </div>\`
}`,...s.parameters?.docs?.source}}};const p=["Playground","ParentHover"];export{s as ParentHover,a as Playground,p as __namedExportsOrder,c as default};
