const f='<svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5 6a5 5 0 0 1 10 0H3Z"/></svg>',u='<svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M8 1l1.5 2.5L12 4l-1.5 2.5L12 9l-2.5.5L8 12l-1.5-2.5L4 9l1.5-2.5L4 4l2.5-.5L8 1Z"/></svg>',c=["initials","image","image-border","icon"],d=["xs","s","m","l"],g=["circle","square"],m=["","online","offline","idle","inactive"];function p({type:a,size:e,shape:v,initials:x,status:s,verified:y,alt:b="User"}){let i="";a==="image"||a==="image-border"?i=`<span class="avatar__frame"><img class="avatar__img" data-avatar-img src="https://i.pravatar.cc/150?img=5" alt="${b}" loading="lazy"/></span>`:a==="initials"?i=`<span class="avatar__initials" data-avatar-initials>${x}</span>`:a==="icon"&&(i=`<span class="avatar__icon" data-avatar-icon>${f}</span>`);let o="";return y?o=`<span class="avatar__badge avatar__badge--verified" data-avatar-badge data-badge-type="verified" aria-label="Verified">${u}</span>`:s&&(o=`<span class="status-icon status-icon--bordered status-icon--${s} status-icon--${e} avatar__badge" data-avatar-badge data-badge-type="${s}" data-status="${s}" role="status" aria-label="${s}"></span>`),`<span class="avatar avatar--${e} avatar--${v} avatar--${a}" data-avatar data-size="${e}" data-shape="${v}" data-type="${a}" role="img" aria-label="${b}">${i}${o}</span>`}const h={title:"Components/Avatar",tags:["autodocs"],argTypes:{type:{control:"select",options:c},size:{control:"select",options:d},shape:{control:"select",options:g},status:{control:"select",options:m},verified:{control:"boolean"},initials:{control:"text"}},args:{type:"initials",size:"m",shape:"circle",initials:"JD",status:"",verified:!1}},t={render:()=>`
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
      <div class="sb-preview" id="av-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Type</label>
          <div class="sb-chips" id="av-types">
            ${c.map((a,e)=>`<button class="sb-chip${e===0?" active":""}" data-value="${a}">${a}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="av-sizes">
            ${d.map((a,e)=>`<button class="sb-chip${e===2?" active":""}" data-value="${a}">${a}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Shape</label>
          <div class="sb-chips" id="av-shapes">
            ${g.map((a,e)=>`<button class="sb-chip${e===0?" active":""}" data-value="${a}">${a}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Status</label>
          <div class="sb-chips" id="av-statuses">
            ${m.map((a,e)=>`<button class="sb-chip${e===0?" active":""}" data-value="${a}">${a||"none"}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="av-verified">Verified</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const userIcon=${JSON.stringify(f)};
      const verifiedIcon=${JSON.stringify(u)};
      let s={type:'initials',size:'m',shape:'circle',initials:'JD',status:'',verified:false};
      function update(){
        let inner='';
        if(s.type==='image'||s.type==='image-border') inner=\`<span class="avatar__frame"><img class="avatar__img" data-avatar-img src="https://i.pravatar.cc/150?img=5" alt="User" loading="lazy"/></span>\`;
        else if(s.type==='initials') inner=\`<span class="avatar__initials" data-avatar-initials>\${s.initials}</span>\`;
        else if(s.type==='icon') inner=\`<span class="avatar__icon" data-avatar-icon>\${userIcon}</span>\`;
        let badge='';
        if(s.verified) badge=\`<span class="avatar__badge avatar__badge--verified" data-avatar-badge aria-label="Verified">\${verifiedIcon}</span>\`;
        else if(s.status) badge=\`<span class="status-icon status-icon--bordered status-icon--\${s.status} status-icon--\${s.size} avatar__badge" role="status" aria-label="\${s.status}"></span>\`;
        document.getElementById('av-preview').innerHTML=\`<span class="avatar avatar--\${s.size} avatar--\${s.shape} avatar--\${s.type}" data-avatar role="img" aria-label="User">\${inner}\${badge}</span>\`;
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('av-types','type');chips('av-sizes','size');chips('av-shapes','shape');chips('av-statuses','status');
      bool('av-verified','verified');
      update();
    })();
    <\/script>`},n={render:()=>`<div style="display:flex;gap:16px;align-items:center;padding:16px;">
    ${c.map(a=>`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">${p({type:a,size:"m",shape:"circle",initials:"JD"})}<span style="font-size:11px;color:#666;">${a}</span></div>`).join("")}
  </div>`},r={render:()=>`<div style="display:flex;gap:16px;align-items:center;padding:16px;">
    ${d.map(a=>`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">${p({type:"initials",size:a,shape:"circle",initials:a.toUpperCase()})}<span style="font-size:11px;color:#666;">${a}</span></div>`).join("")}
  </div>`},l={render:()=>`<div style="display:flex;gap:16px;align-items:center;padding:16px;">
    ${["online","offline","idle","inactive"].map(a=>`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">${p({type:"initials",size:"m",shape:"circle",initials:"JD",status:a})}<span style="font-size:11px;color:#666;">${a}</span></div>`).join("")}
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
      .sb-chip-bool{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip-bool.active{background:#ef4444;color:#fff;border-color:#ef4444}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="av-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Type</label>
          <div class="sb-chips" id="av-types">
            \${TYPES.map((t, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${t}">\${t}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="av-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 2 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Shape</label>
          <div class="sb-chips" id="av-shapes">
            \${SHAPES.map((s, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Status</label>
          <div class="sb-chips" id="av-statuses">
            \${STATUSES.map((s, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${s}">\${s || 'none'}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="av-verified">Verified</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const userIcon=\${JSON.stringify(userIcon)};
      const verifiedIcon=\${JSON.stringify(verifiedIcon)};
      let s={type:'initials',size:'m',shape:'circle',initials:'JD',status:'',verified:false};
      function update(){
        let inner='';
        if(s.type==='image'||s.type==='image-border') inner=\\\`<span class="avatar__frame"><img class="avatar__img" data-avatar-img src="https://i.pravatar.cc/150?img=5" alt="User" loading="lazy"/></span>\\\`;
        else if(s.type==='initials') inner=\\\`<span class="avatar__initials" data-avatar-initials>\\\${s.initials}</span>\\\`;
        else if(s.type==='icon') inner=\\\`<span class="avatar__icon" data-avatar-icon>\\\${userIcon}</span>\\\`;
        let badge='';
        if(s.verified) badge=\\\`<span class="avatar__badge avatar__badge--verified" data-avatar-badge aria-label="Verified">\\\${verifiedIcon}</span>\\\`;
        else if(s.status) badge=\\\`<span class="status-icon status-icon--bordered status-icon--\\\${s.status} status-icon--\\\${s.size} avatar__badge" role="status" aria-label="\\\${s.status}"></span>\\\`;
        document.getElementById('av-preview').innerHTML=\\\`<span class="avatar avatar--\\\${s.size} avatar--\\\${s.shape} avatar--\\\${s.type}" data-avatar role="img" aria-label="User">\\\${inner}\\\${badge}</span>\\\`;
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      function bool(id,key){document.getElementById(id).addEventListener('click',e=>{s[key]=!s[key];e.currentTarget.classList.toggle('active',s[key]);update();});}
      chips('av-types','type');chips('av-sizes','size');chips('av-shapes','shape');chips('av-statuses','status');
      bool('av-verified','verified');
      update();
    })();
    <\/script>\`
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="display:flex;gap:16px;align-items:center;padding:16px;">
    \${TYPES.map(t => \`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">\${renderAvatar({
    type: t,
    size: 'm',
    shape: 'circle',
    initials: 'JD'
  })}<span style="font-size:11px;color:#666;">\${t}</span></div>\`).join('')}
  </div>\`
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="display:flex;gap:16px;align-items:center;padding:16px;">
    \${SIZES.map(s => \`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">\${renderAvatar({
    type: 'initials',
    size: s,
    shape: 'circle',
    initials: s.toUpperCase()
  })}<span style="font-size:11px;color:#666;">\${s}</span></div>\`).join('')}
  </div>\`
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => \`<div style="display:flex;gap:16px;align-items:center;padding:16px;">
    \${['online', 'offline', 'idle', 'inactive'].map(st => \`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">\${renderAvatar({
    type: 'initials',
    size: 'm',
    shape: 'circle',
    initials: 'JD',
    status: st
  })}<span style="font-size:11px;color:#666;">\${st}</span></div>\`).join('')}
  </div>\`
}`,...l.parameters?.docs?.source}}};const $=["Playground","AllTypes","AllSizes","WithStatus"];export{r as AllSizes,n as AllTypes,t as Playground,l as WithStatus,$ as __namedExportsOrder,h as default};
