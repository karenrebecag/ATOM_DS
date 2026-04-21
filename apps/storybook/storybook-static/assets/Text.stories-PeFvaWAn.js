const s="The quick brown fox jumps over the lazy dog. Design systems empower teams to build consistent, scalable products.",r=["body","caption","label","label-small","footnote"],c=["regular","medium","bold"],d=["left","center","right"],p=["inherit","primary","secondary","tertiary","disabled"],f=({as:t,size:e,weight:x,align:b,color:l,truncate:v,text:u})=>{const m=["primary","secondary","tertiary","disabled"].includes(l)?` text--${l}`:"",g=["text",`text--${e}`,`text--${x}`,`text--${b}`,"text--truncate",m].filter(Boolean).join(" ");return`<${t} class="${g}"  data-text>${u}</${t}>`},y={title:"Typography/Text",tags:["autodocs"],argTypes:{as:{control:"select",options:["p","span","div","li"]},size:{control:"select",options:r},weight:{control:"select",options:c},align:{control:"select",options:d},color:{control:"select",options:p},truncate:{control:"boolean"},text:{control:"text"}},args:{as:"p",size:"body",weight:"regular",align:"left",color:"inherit",truncate:!1,text:s},parameters:{layout:"padded"}},i={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:560px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-chip-bool{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip-bool.active{background:#ef4444;color:#fff;border-color:#ef4444}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center;width:100%;max-width:560px}
      .sb-separator{width:100%;max-width:560px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="tx-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="tx-sizes">
            ${r.map((t,e)=>`<button class="sb-chip${e===0?" active":""}" data-value="${t}">${t}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Weight</label>
          <div class="sb-chips" id="tx-weights">
            ${c.map((t,e)=>`<button class="sb-chip${e===0?" active":""}" data-value="${t}">${t}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Align</label>
          <div class="sb-chips" id="tx-aligns">
            ${d.map((t,e)=>`<button class="sb-chip${e===0?" active":""}" data-value="${t}">${t}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Color</label>
          <div class="sb-chips" id="tx-colors">
            ${p.map((t,e)=>`<button class="sb-chip${e===0?" active":""}" data-value="${t}">${t}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="tx-truncate">Truncate</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const SAMPLE=${JSON.stringify(s)};
      let s={size:'body',weight:'regular',align:'left',color:'inherit',truncate:false};
      function update(){
        const isSemanticColor=['primary','secondary','tertiary','disabled'].includes(s.color);
        const colorClass=isSemanticColor?\` text--\${s.color}\`:'';
        const classes=['text',\`text--\${s.size}\`,\`text--\${s.weight}\`,\`text--\${s.align}\`,s.truncate&&'text--truncate',colorClass].filter(Boolean).join(' ');
        document.getElementById('tx-preview').innerHTML=\`<div style="max-width:480px;width:100%;"><p class="\${classes}" data-text>\${SAMPLE}</p></div>\`;
        if(window.__atomInit) window.__atomInit(document.getElementById('tx-preview'));
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('tx-sizes','size');chips('tx-weights','weight');chips('tx-aligns','align');chips('tx-colors','color');
      bool('tx-truncate','truncate');
      update();
    })();
    <\/script>`},a={parameters:{layout:"padded"},render:()=>`
    <div style="display:flex; flex-direction:column; gap:16px; padding:16px; max-width:560px;">
      ${r.map(t=>`
        <div>
          <span style="font-size:11px; color:#999; font-family:monospace; display:block; margin-bottom:4px;">.text--${t}</span>
          <p class="text text--${t} text--regular text--left" data-text>${s}</p>
        </div>`).join("")}
    </div>`},o={parameters:{layout:"padded"},render:()=>`
    <div style="display:flex; flex-direction:column; gap:12px; padding:16px; max-width:480px;">
      ${["primary","secondary","tertiary","disabled"].map(t=>`
        <p class="text text--body text--regular text--left text--${t}" data-text>${t}: ${s.slice(0,60)}...</p>`).join("")}
    </div>`},n={render:()=>`<div style="max-width:400px;">${f({as:"p",size:"body",weight:"regular",align:"left",color:"inherit",truncate:!0,text:s.repeat(3)})}</div>`};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:560px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-chip-bool{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip-bool.active{background:#ef4444;color:#fff;border-color:#ef4444}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center;width:100%;max-width:560px}
      .sb-separator{width:100%;max-width:560px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="tx-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="tx-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Weight</label>
          <div class="sb-chips" id="tx-weights">
            \${WEIGHTS.map((w, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${w}">\${w}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Align</label>
          <div class="sb-chips" id="tx-aligns">
            \${ALIGNS.map((a, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${a}">\${a}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Color</label>
          <div class="sb-chips" id="tx-colors">
            \${COLORS.map((c, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${c}">\${c}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="tx-truncate">Truncate</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const SAMPLE=\${JSON.stringify(SAMPLE)};
      let s={size:'body',weight:'regular',align:'left',color:'inherit',truncate:false};
      function update(){
        const isSemanticColor=['primary','secondary','tertiary','disabled'].includes(s.color);
        const colorClass=isSemanticColor?\\\` text--\\\${s.color}\\\`:'';
        const classes=['text',\\\`text--\\\${s.size}\\\`,\\\`text--\\\${s.weight}\\\`,\\\`text--\\\${s.align}\\\`,s.truncate&&'text--truncate',colorClass].filter(Boolean).join(' ');
        document.getElementById('tx-preview').innerHTML=\\\`<div style="max-width:480px;width:100%;"><p class="\\\${classes}" data-text>\\\${SAMPLE}</p></div>\\\`;
        if(window.__atomInit) window.__atomInit(document.getElementById('tx-preview'));
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('tx-sizes','size');chips('tx-weights','weight');chips('tx-aligns','align');chips('tx-colors','color');
      bool('tx-truncate','truncate');
      update();
    })();
    <\/script>\`
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => \`
    <div style="display:flex; flex-direction:column; gap:16px; padding:16px; max-width:560px;">
      \${SIZES.map(s => \`
        <div>
          <span style="font-size:11px; color:#999; font-family:monospace; display:block; margin-bottom:4px;">.text--\${s}</span>
          <p class="text text--\${s} text--regular text--left" data-text>\${SAMPLE}</p>
        </div>\`).join('')}
    </div>\`
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => \`
    <div style="display:flex; flex-direction:column; gap:12px; padding:16px; max-width:480px;">
      \${['primary', 'secondary', 'tertiary', 'disabled'].map(c => \`
        <p class="text text--body text--regular text--left text--\${c}" data-text>\${c}: \${SAMPLE.slice(0, 60)}...</p>\`).join('')}
    </div>\`
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="max-width:400px;">\${renderText({
    as: 'p',
    size: 'body',
    weight: 'regular',
    align: 'left',
    color: 'inherit',
    truncate: true,
    text: SAMPLE.repeat(3)
  })}</div>\`
}`,...n.parameters?.docs?.source}}};const w=["Playground","TypeScale","Colors","Truncated"];export{o as Colors,i as Playground,n as Truncated,a as TypeScale,w as __namedExportsOrder,y as default};
