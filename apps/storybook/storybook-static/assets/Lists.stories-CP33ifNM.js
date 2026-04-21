const s=["First item in the list","Second item with a longer description that wraps","Third item to complete the set"],a=["Install dependencies with pnpm","Configure your design tokens","Import components into your project"],o={title:"Components/Lists",tags:["autodocs"],parameters:{layout:"padded"}},e={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{min-height:120px;display:flex;align-items:center;justify-content:flex-start;width:100%;max-width:520px}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="ls-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Type</label>
          <div class="sb-chips" id="ls-types">
            <button class="sb-chip active" data-value="bullet">bullet</button>
            <button class="sb-chip" data-value="number">number</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const bulletItems=${JSON.stringify(s)};
      const numberItems=${JSON.stringify(a)};
      let type='bullet';
      function update(){
        let html='';
        if(type==='bullet'){
          html=\`<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">\${bulletItems.map(i=>\`<li class="bullet-item">\${i}</li>\`).join('')}</ul>\`;
        } else {
          html=\`<ol style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">\${numberItems.map((i,n)=>\`<li class="number-item" data-number="\${n+1}">\${i}</li>\`).join('')}</ol>\`;
        }
        document.getElementById('ls-preview').innerHTML=html;
        if(window.__atomInit) window.__atomInit(document.getElementById('ls-preview'));
      }
      document.getElementById('ls-types').addEventListener('click',e=>{
        const c=e.target.closest('.sb-chip');if(!c)return;
        type=c.dataset.value;
        document.querySelectorAll('#ls-types .sb-chip').forEach(x=>x.classList.remove('active'));
        c.classList.add('active');update();
      });
      update();
    })();
    <\/script>`},t={render:()=>`
    <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
      ${s.map(n=>`<li class="bullet-item">${n}</li>`).join("")}
    </ul>`},l={render:()=>`
    <ol style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
      ${a.map((n,r)=>`<li class="number-item" data-number="${r+1}">${n}</li>`).join("")}
    </ol>`},i={render:()=>`
    <div style="display:flex; gap:48px; padding:16px; align-items:flex-start;">
      <div>
        <p style="font-size:12px; color:#999; margin:0 0 12px;">Bullet</p>
        <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
          <li class="bullet-item">Feature one</li>
          <li class="bullet-item">Feature two</li>
          <li class="bullet-item">Feature three</li>
        </ul>
      </div>
      <div>
        <p style="font-size:12px; color:#999; margin:0 0 12px;">Numbered</p>
        <ol style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
          <li class="number-item" data-number="1">Step one</li>
          <li class="number-item" data-number="2">Step two</li>
          <li class="number-item" data-number="3">Step three</li>
        </ol>
      </div>
    </div>`};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{min-height:120px;display:flex;align-items:center;justify-content:flex-start;width:100%;max-width:520px}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="ls-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Type</label>
          <div class="sb-chips" id="ls-types">
            <button class="sb-chip active" data-value="bullet">bullet</button>
            <button class="sb-chip" data-value="number">number</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const bulletItems=\${JSON.stringify(BULLET_ITEMS)};
      const numberItems=\${JSON.stringify(NUMBER_ITEMS)};
      let type='bullet';
      function update(){
        let html='';
        if(type==='bullet'){
          html=\\\`<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">\\\${bulletItems.map(i=>\\\`<li class="bullet-item">\\\${i}</li>\\\`).join('')}</ul>\\\`;
        } else {
          html=\\\`<ol style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">\\\${numberItems.map((i,n)=>\\\`<li class="number-item" data-number="\\\${n+1}">\\\${i}</li>\\\`).join('')}</ol>\\\`;
        }
        document.getElementById('ls-preview').innerHTML=html;
        if(window.__atomInit) window.__atomInit(document.getElementById('ls-preview'));
      }
      document.getElementById('ls-types').addEventListener('click',e=>{
        const c=e.target.closest('.sb-chip');if(!c)return;
        type=c.dataset.value;
        document.querySelectorAll('#ls-types .sb-chip').forEach(x=>x.classList.remove('active'));
        c.classList.add('active');update();
      });
      update();
    })();
    <\/script>\`
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
      \${BULLET_ITEMS.map(i => \`<li class="bullet-item">\${i}</li>\`).join('')}
    </ul>\`
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:'{\n  render: () => `\n    <ol style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">\n      ${NUMBER_ITEMS.map((i, n) => `<li class="number-item" data-number="${n + 1}">${i}</li>`).join(\'\')}\n    </ol>`\n}',...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:48px; padding:16px; align-items:flex-start;">
      <div>
        <p style="font-size:12px; color:#999; margin:0 0 12px;">Bullet</p>
        <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
          <li class="bullet-item">Feature one</li>
          <li class="bullet-item">Feature two</li>
          <li class="bullet-item">Feature three</li>
        </ul>
      </div>
      <div>
        <p style="font-size:12px; color:#999; margin:0 0 12px;">Numbered</p>
        <ol style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">
          <li class="number-item" data-number="1">Step one</li>
          <li class="number-item" data-number="2">Step two</li>
          <li class="number-item" data-number="3">Step three</li>
        </ol>
      </div>
    </div>\`
}`,...i.parameters?.docs?.source}}};const p=["Playground","BulletList","NumberList","MixedContent"];export{t as BulletList,i as MixedContent,l as NumberList,e as Playground,p as __namedExportsOrder,o as default};
