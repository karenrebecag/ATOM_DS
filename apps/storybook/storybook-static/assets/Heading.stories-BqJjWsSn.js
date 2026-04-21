const n=["display-xl","display-l","display-m","display-s","huge-title","h1","h2","h3","h4","heading"],d=["regular","medium","bold"],o=["left","center","right"],l={title:"Typography/Heading",tags:["autodocs"],argTypes:{level:{control:{type:"select"},options:[1,2,3,4,5,6]},size:{control:"select",options:["",...n]},weight:{control:"select",options:d},tracking:{control:"select",options:["tighter","tight","normal","wide","wider","widest"]},align:{control:"select",options:o},text:{control:"text"}},args:{level:2,size:"",weight:"bold",tracking:"tight",align:"left",text:"The quick brown fox jumps over the lazy dog"},parameters:{layout:"padded"}},t={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:600px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:72px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center;width:100%;max-width:600px;text-align:left}
      .sb-separator{width:100%;max-width:600px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="hd-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="hd-sizes">
            ${n.map((e,i)=>`<button class="sb-chip${i===6?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Weight</label>
          <div class="sb-chips" id="hd-weights">
            ${d.map((e,i)=>`<button class="sb-chip${i===2?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Align</label>
          <div class="sb-chips" id="hd-aligns">
            ${o.map((e,i)=>`<button class="sb-chip${i===0?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={size:'h2',weight:'bold',align:'left'};
      function update(){
        const p=document.getElementById('hd-preview');
        p.innerHTML=\`<h2 class="heading heading--\${s.size} heading--\${s.weight} heading--tight heading--\${s.align}" data-text data-text-animate="masked-chars" data-text-trigger="load" style="width:100%">The quick brown fox jumps over the lazy dog</h2>\`;
        if(window.__atomInit) window.__atomInit(p);
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      chips('hd-sizes','size');chips('hd-weights','weight');chips('hd-aligns','align');
      update();
    })();
    <\/script>`},a={parameters:{layout:"padded"},render:()=>`
    <div style="display:flex; flex-direction:column; gap:20px; padding:16px;">
      ${n.map(e=>`
        <div>
          <span style="font-size:11px; color:#999; display:block; margin-bottom:4px; font-family:monospace;">.heading--${e}</span>
          <h2 class="heading heading--${e} heading--bold heading--tight heading--left" data-text>
            The quick brown fox
          </h2>
        </div>`).join("")}
    </div>`},s={parameters:{layout:"padded"},render:()=>`
    <div style="display:flex; flex-direction:column; gap:16px; padding:16px;">
      ${d.map(e=>`
        <div>
          <span style="font-size:11px; color:#999; display:block; margin-bottom:4px;">${e}</span>
          <h2 class="heading heading--h2 heading--${e} heading--tight heading--left" data-text>
            The quick brown fox
          </h2>
        </div>`).join("")}
    </div>`};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:600px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:72px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center;width:100%;max-width:600px;text-align:left}
      .sb-separator{width:100%;max-width:600px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="hd-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="hd-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 6 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Weight</label>
          <div class="sb-chips" id="hd-weights">
            \${WEIGHTS.map((w, i) => \`<button class="sb-chip\${i === 2 ? ' active' : ''}" data-value="\${w}">\${w}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Align</label>
          <div class="sb-chips" id="hd-aligns">
            \${ALIGNS.map((a, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${a}">\${a}</button>\`).join('')}
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={size:'h2',weight:'bold',align:'left'};
      function update(){
        const p=document.getElementById('hd-preview');
        p.innerHTML=\\\`<h2 class="heading heading--\\\${s.size} heading--\\\${s.weight} heading--tight heading--\\\${s.align}" data-text data-text-animate="masked-chars" data-text-trigger="load" style="width:100%">The quick brown fox jumps over the lazy dog</h2>\\\`;
        if(window.__atomInit) window.__atomInit(p);
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      chips('hd-sizes','size');chips('hd-weights','weight');chips('hd-aligns','align');
      update();
    })();
    <\/script>\`
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => \`
    <div style="display:flex; flex-direction:column; gap:20px; padding:16px;">
      \${SIZES.map(s => \`
        <div>
          <span style="font-size:11px; color:#999; display:block; margin-bottom:4px; font-family:monospace;">.heading--\${s}</span>
          <h2 class="heading heading--\${s} heading--bold heading--tight heading--left" data-text>
            The quick brown fox
          </h2>
        </div>\`).join('')}
    </div>\`
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => \`
    <div style="display:flex; flex-direction:column; gap:16px; padding:16px;">
      \${WEIGHTS.map(w => \`
        <div>
          <span style="font-size:11px; color:#999; display:block; margin-bottom:4px;">\${w}</span>
          <h2 class="heading heading--h2 heading--\${w} heading--tight heading--left" data-text>
            The quick brown fox
          </h2>
        </div>\`).join('')}
    </div>\`
}`,...s.parameters?.docs?.source}}};const r=["Playground","TypeScale","Weights"];export{t as Playground,a as TypeScale,s as Weights,r as __namedExportsOrder,l as default};
