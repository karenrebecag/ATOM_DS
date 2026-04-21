const o=["xs","s","m","l"],r=["#6366f1","#ec4899","#f59e0b","#10b981","#3b82f6","#ef4444","#8b5cf6"],s=["AB","CD","EF","GH","IJ","KL","MN"],d=(a,i)=>`
  <div class="avatar avatar--${i} avatar--initials avatar--circle avatar-group__item" data-avatar>
    <div class="avatar__frame" style="background-color:${r[a%r.length]}">
      <span class="avatar__initials">${s[a%s.length]}</span>
    </div>
  </div>`,p=(a,i)=>{const n=Math.min(i,s.length),l=s.length-n;return`
    <div class="avatar-group avatar-group--${a}" data-avatar-group>
      ${Array.from({length:n},(v,c)=>d(c,a)).join("")}
      ${l>0?`
        <div class="avatar avatar--${a} avatar--initials avatar--circle avatar-group__counter" data-avatar>
          <div class="avatar__frame"><span class="avatar__initials">+${l}</span></div>
        </div>`:""}
    </div>`},g={title:"Components/AvatarGroup",tags:["autodocs"],parameters:{layout:"centered"}},t={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="ag-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="ag-sizes">
            ${o.map((a,i)=>`<button class="sb-chip${i===2?" active":""}" data-value="${a}">${a}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Max</label>
          <div class="sb-chips" id="ag-max">
            ${[3,4,5,7].map((a,i)=>`<button class="sb-chip${i===1?" active":""}" data-value="${a}">${a}</button>`).join("")}
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={size:'m',max:4};
      const colors=${JSON.stringify(r)};
      const initials=${JSON.stringify(s)};
      function renderAvatar(i,size){return \`<div class="avatar avatar--\${size} avatar--initials avatar--circle avatar-group__item" data-avatar><div class="avatar__frame" style="background-color:\${colors[i%colors.length]}"><span class="avatar__initials">\${initials[i%initials.length]}</span></div></div>\`;}
      function update(){
        const visible=Math.min(s.max,initials.length);
        const remaining=initials.length-visible;
        document.getElementById('ag-preview').innerHTML=\`
          <div class="avatar-group avatar-group--\${s.size}" data-avatar-group>
            \${Array.from({length:visible},(_,i)=>renderAvatar(i,s.size)).join('')}
            \${remaining>0?\`<div class="avatar avatar--\${s.size} avatar--initials avatar--circle avatar-group__counter" data-avatar><div class="avatar__frame"><span class="avatar__initials">+\${remaining}</span></div></div>\`:''}
          </div>\`;
      }
      function chips(id,key,parse){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=parse?parseInt(c.dataset.value):c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      chips('ag-sizes','size');chips('ag-max','max',true);
      update();
    })();
    <\/script>`},e={render:()=>`
    <div style="display:flex;flex-direction:column;gap:24px;align-items:flex-start;padding:16px;">
      ${o.map(a=>`<div><p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">${a}</p>${p(a,4)}</div>`).join("")}
    </div>`};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:64px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="ag-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="ag-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 2 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Max</label>
          <div class="sb-chips" id="ag-max">
            \${[3, 4, 5, 7].map((n, i) => \`<button class="sb-chip\${i === 1 ? ' active' : ''}" data-value="\${n}">\${n}</button>\`).join('')}
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={size:'m',max:4};
      const colors=\${JSON.stringify(COLORS)};
      const initials=\${JSON.stringify(INITIALS)};
      function renderAvatar(i,size){return \\\`<div class="avatar avatar--\\\${size} avatar--initials avatar--circle avatar-group__item" data-avatar><div class="avatar__frame" style="background-color:\\\${colors[i%colors.length]}"><span class="avatar__initials">\\\${initials[i%initials.length]}</span></div></div>\\\`;}
      function update(){
        const visible=Math.min(s.max,initials.length);
        const remaining=initials.length-visible;
        document.getElementById('ag-preview').innerHTML=\\\`
          <div class="avatar-group avatar-group--\\\${s.size}" data-avatar-group>
            \\\${Array.from({length:visible},(_,i)=>renderAvatar(i,s.size)).join('')}
            \\\${remaining>0?\\\`<div class="avatar avatar--\\\${s.size} avatar--initials avatar--circle avatar-group__counter" data-avatar><div class="avatar__frame"><span class="avatar__initials">+\\\${remaining}</span></div></div>\\\`:''}
          </div>\\\`;
      }
      function chips(id,key,parse){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=parse?parseInt(c.dataset.value):c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      chips('ag-sizes','size');chips('ag-max','max',true);
      update();
    })();
    <\/script>\`
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:'{\n  render: () => `\n    <div style="display:flex;flex-direction:column;gap:24px;align-items:flex-start;padding:16px;">\n      ${SIZES.map(s => `<div><p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">${s}</p>${renderGroup(s, 4)}</div>`).join(\'\')}\n    </div>`\n}',...e.parameters?.docs?.source}}};const u=["Playground","AllSizes"];export{e as AllSizes,t as Playground,u as __namedExportsOrder,g as default};
