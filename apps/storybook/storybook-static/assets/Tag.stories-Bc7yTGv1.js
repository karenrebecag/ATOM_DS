const o=["success","warning","danger","info","neutral","brand","ai","disabled"],l=["filled","outlined","ghost"],r=["xs","s","m"],d=({intent:e,variant:t,size:c,hasDots:p,label:b})=>`
  <span class="tag tag--${e} tag--${t} tag--${c}" data-tag>
    ${p?'<span class="tag__dot" aria-hidden="true" data-tag-dot></span>':""}
    <span class="tag__text" data-tag-text>${b}</span>
  </span>`,g={title:"Components/Tag",tags:["autodocs"],argTypes:{intent:{control:"select",options:o},variant:{control:"select",options:l},size:{control:"select",options:r},hasDots:{control:"boolean"},label:{control:"text"}},args:{intent:"success",variant:"filled",size:"m",hasDots:!1,label:"Active"}},s={render:()=>`
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
      <div class="sb-preview" id="tg-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Intent</label>
          <div class="sb-chips" id="tg-intents">
            ${o.map((e,t)=>`<button class="sb-chip${t===0?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Variant</label>
          <div class="sb-chips" id="tg-variants">
            ${l.map((e,t)=>`<button class="sb-chip${t===0?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="tg-sizes">
            ${r.map((e,t)=>`<button class="sb-chip${t===2?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="tg-dots">With dot</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={intent:'success',variant:'filled',size:'m',hasDots:false,label:'Active'};
      function update(){
        document.getElementById('tg-preview').innerHTML=\`<span class="tag tag--\${s.intent} tag--\${s.variant} tag--\${s.size}" data-tag>\${s.hasDots?'<span class="tag__dot" aria-hidden="true" data-tag-dot></span>':''}<span class="tag__text" data-tag-text>\${s.label}</span></span>\`;
        if(window.__atomInit) window.__atomInit(document.getElementById('tg-preview'));
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('tg-intents','intent');chips('tg-variants','variant');chips('tg-sizes','size');
      bool('tg-dots','hasDots');
      update();
    })();
    <\/script>`},a={render:()=>`<div style="display:flex;flex-wrap:wrap;gap:8px;padding:16px;">
    ${o.map(e=>d({intent:e,variant:"filled",size:"m",label:e})).join("")}
  </div>`},i={render:()=>`<div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
    ${l.map(e=>`<div><span style="font-size:11px;color:#999;display:block;margin-bottom:8px;">${e}</span><div style="display:flex;flex-wrap:wrap;gap:8px;">${o.map(t=>d({intent:t,variant:e,size:"m",label:t})).join("")}</div></div>`).join("")}
  </div>`},n={render:()=>`<div style="display:flex;gap:8px;align-items:center;padding:16px;">
    ${r.map(e=>d({intent:"info",variant:"filled",size:e,label:e})).join("")}
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
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="tg-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Intent</label>
          <div class="sb-chips" id="tg-intents">
            \${INTENTS.map((i, idx) => \`<button class="sb-chip\${idx === 0 ? ' active' : ''}" data-value="\${i}">\${i}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Variant</label>
          <div class="sb-chips" id="tg-variants">
            \${VARIANTS.map((v, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${v}">\${v}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="tg-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 2 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="tg-dots">With dot</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={intent:'success',variant:'filled',size:'m',hasDots:false,label:'Active'};
      function update(){
        document.getElementById('tg-preview').innerHTML=\\\`<span class="tag tag--\\\${s.intent} tag--\\\${s.variant} tag--\\\${s.size}" data-tag>\\\${s.hasDots?'<span class="tag__dot" aria-hidden="true" data-tag-dot></span>':''}<span class="tag__text" data-tag-text>\\\${s.label}</span></span>\\\`;
        if(window.__atomInit) window.__atomInit(document.getElementById('tg-preview'));
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('tg-intents','intent');chips('tg-variants','variant');chips('tg-sizes','size');
      bool('tg-dots','hasDots');
      update();
    })();
    <\/script>\`
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="display:flex;flex-wrap:wrap;gap:8px;padding:16px;">
    \${INTENTS.map(i => renderTag({
    intent: i,
    variant: 'filled',
    size: 'm',
    label: i
  })).join('')}
  </div>\`
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
    \${VARIANTS.map(v => \`<div><span style="font-size:11px;color:#999;display:block;margin-bottom:8px;">\${v}</span><div style="display:flex;flex-wrap:wrap;gap:8px;">\${INTENTS.map(i => renderTag({
    intent: i,
    variant: v,
    size: 'm',
    label: i
  })).join('')}</div></div>\`).join('')}
  </div>\`
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="display:flex;gap:8px;align-items:center;padding:16px;">
    \${SIZES.map(s => renderTag({
    intent: 'info',
    variant: 'filled',
    size: s,
    label: s
  })).join('')}
  </div>\`
}`,...n.parameters?.docs?.source}}};const v=["Playground","AllIntents","AllVariants","AllSizes"];export{a as AllIntents,n as AllSizes,i as AllVariants,s as Playground,v as __namedExportsOrder,g as default};
