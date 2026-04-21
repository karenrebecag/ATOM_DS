const b=(t,e)=>e==="inbox"?t>=50?"+50":String(t):t>99?"99+":String(t),n=({count:t,context:e,type:p,state:l})=>{if(t<=0)return'<span style="color:#999; font-size:12px;">(count = 0, badge hidden)</span>';const u=b(t,e);return`
    <span class="badge badge--${p} badge--${l}" data-badge data-count="${t}" data-context="${e}" data-state="${l}" role="status" aria-label="${t} notifications">
      <span class="badge__text" data-badge-text>${u}</span>
    </span>`},d=["default","inbox"],c=["neutral","inbox","info"],r=["default","focused","subtle"],x={title:"Components/Badge",tags:["autodocs"],argTypes:{count:{control:{type:"number",min:0,max:999}},context:{control:"select",options:d},type:{control:"select",options:c},state:{control:"select",options:r}},args:{count:5,context:"default",type:"neutral",state:"default"}},a={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:72px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-chip-bool{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip-bool.active{background:#ef4444;color:#fff;border-color:#ef4444}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
      .sb-count-wrap{display:flex;align-items:center;gap:8px}
      .sb-count-wrap input[type=range]{width:120px;accent-color:#111}
      .sb-count-val{font-size:12px;color:#374151;min-width:24px}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="bg-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Count</label>
          <div class="sb-count-wrap">
            <input type="range" id="bg-count" min="0" max="200" value="5"/>
            <span class="sb-count-val" id="bg-count-val">5</span>
          </div>
        </div>
        <div class="sb-control-row"><label>Context</label>
          <div class="sb-chips" id="bg-contexts">
            ${d.map((t,e)=>`<button class="sb-chip${e===0?" active":""}" data-value="${t}">${t}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Type</label>
          <div class="sb-chips" id="bg-types">
            ${c.map((t,e)=>`<button class="sb-chip${e===0?" active":""}" data-value="${t}">${t}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>State</label>
          <div class="sb-chips" id="bg-states">
            ${r.map((t,e)=>`<button class="sb-chip${e===0?" active":""}" data-value="${t}">${t}</button>`).join("")}
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={count:5,context:'default',type:'neutral',state:'default'};
      function getDisplay(count,context){
        return context==='inbox'?(count>=50?'+50':String(count)):(count>99?'99+':String(count));
      }
      function update(){
        const p=document.getElementById('bg-preview');
        if(s.count<=0){p.innerHTML='<span style="color:#999;font-size:12px;">(count = 0, badge hidden)</span>';return;}
        const display=getDisplay(s.count,s.context);
        p.innerHTML=\`<span class="badge badge--\${s.type} badge--\${s.state}" data-badge role="status" aria-label="\${s.count} notifications"><span class="badge__text" data-badge-text data-odometer-element>\${display}</span></span>\`;
        if(window.__atomInit) window.__atomInit(p);
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      const rangeEl=document.getElementById('bg-count');
      const valEl=document.getElementById('bg-count-val');
      let badgeEl=null;
      rangeEl.addEventListener('input',()=>{
        const oldCount=s.count;s.count=Number(rangeEl.value);valEl.textContent=rangeEl.value;
        badgeEl=document.querySelector('[data-badge-text]');
        if(badgeEl&&oldCount>0&&s.count>0&&window.__atomUpdateOdometer){
          const display=getDisplay(s.count,s.context);
          window.__atomUpdateOdometer(badgeEl,display,{duration:0.4});
        } else { update(); }
      });
      chips('bg-contexts','context');chips('bg-types','type');chips('bg-states','state');
      update();
    })();
    <\/script>`},s={render:()=>`
    <div style="display:flex; gap:16px; align-items:center; padding:16px;">
      ${[["neutral","default"],["inbox","focused"],["info","default"]].map(([t,e])=>`
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
          ${n({count:5,context:"default",type:t,state:e})}
          <span style="font-size:11px; color:#666;">${t}</span>
        </div>`).join("")}
    </div>`},o={render:()=>`
    <div style="display:flex; gap:16px; align-items:center; padding:16px;">
      ${n({count:5,context:"default",type:"neutral",state:"default"})}
      ${n({count:99,context:"default",type:"neutral",state:"default"})}
      ${n({count:100,context:"default",type:"neutral",state:"default"})}
      ${n({count:999,context:"default",type:"neutral",state:"default"})}
    </div>`},i={render:()=>`
    <div style="display:flex; gap:16px; align-items:center; padding:16px;">
      ${n({count:10,context:"inbox",type:"inbox",state:"focused"})}
      ${n({count:49,context:"inbox",type:"inbox",state:"focused"})}
      ${n({count:50,context:"inbox",type:"inbox",state:"focused"})}
    </div>`};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:72px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-chip-bool{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip-bool.active{background:#ef4444;color:#fff;border-color:#ef4444}
      .sb-preview{min-height:80px;display:flex;align-items:center;justify-content:center}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
      .sb-count-wrap{display:flex;align-items:center;gap:8px}
      .sb-count-wrap input[type=range]{width:120px;accent-color:#111}
      .sb-count-val{font-size:12px;color:#374151;min-width:24px}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="bg-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Count</label>
          <div class="sb-count-wrap">
            <input type="range" id="bg-count" min="0" max="200" value="5"/>
            <span class="sb-count-val" id="bg-count-val">5</span>
          </div>
        </div>
        <div class="sb-control-row"><label>Context</label>
          <div class="sb-chips" id="bg-contexts">
            \${CONTEXTS.map((c, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${c}">\${c}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Type</label>
          <div class="sb-chips" id="bg-types">
            \${TYPES.map((t, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${t}">\${t}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>State</label>
          <div class="sb-chips" id="bg-states">
            \${STATES.map((st, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${st}">\${st}</button>\`).join('')}
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let s={count:5,context:'default',type:'neutral',state:'default'};
      function getDisplay(count,context){
        return context==='inbox'?(count>=50?'+50':String(count)):(count>99?'99+':String(count));
      }
      function update(){
        const p=document.getElementById('bg-preview');
        if(s.count<=0){p.innerHTML='<span style="color:#999;font-size:12px;">(count = 0, badge hidden)</span>';return;}
        const display=getDisplay(s.count,s.context);
        p.innerHTML=\\\`<span class="badge badge--\\\${s.type} badge--\\\${s.state}" data-badge role="status" aria-label="\\\${s.count} notifications"><span class="badge__text" data-badge-text data-odometer-element>\\\${display}</span></span>\\\`;
        if(window.__atomInit) window.__atomInit(p);
      }
      function chips(id,key){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s[key]=c.dataset.value;document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      const rangeEl=document.getElementById('bg-count');
      const valEl=document.getElementById('bg-count-val');
      let badgeEl=null;
      rangeEl.addEventListener('input',()=>{
        const oldCount=s.count;s.count=Number(rangeEl.value);valEl.textContent=rangeEl.value;
        badgeEl=document.querySelector('[data-badge-text]');
        if(badgeEl&&oldCount>0&&s.count>0&&window.__atomUpdateOdometer){
          const display=getDisplay(s.count,s.context);
          window.__atomUpdateOdometer(badgeEl,display,{duration:0.4});
        } else { update(); }
      });
      chips('bg-contexts','context');chips('bg-types','type');chips('bg-states','state');
      update();
    })();
    <\/script>\`
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:16px; align-items:center; padding:16px;">
      \${[['neutral', 'default'], ['inbox', 'focused'], ['info', 'default']].map(([t, st]) => \`
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
          \${renderBadge({
    count: 5,
    context: 'default',
    type: t,
    state: st
  })}
          <span style="font-size:11px; color:#666;">\${t}</span>
        </div>\`).join('')}
    </div>\`
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:16px; align-items:center; padding:16px;">
      \${renderBadge({
    count: 5,
    context: 'default',
    type: 'neutral',
    state: 'default'
  })}
      \${renderBadge({
    count: 99,
    context: 'default',
    type: 'neutral',
    state: 'default'
  })}
      \${renderBadge({
    count: 100,
    context: 'default',
    type: 'neutral',
    state: 'default'
  })}
      \${renderBadge({
    count: 999,
    context: 'default',
    type: 'neutral',
    state: 'default'
  })}
    </div>\`
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex; gap:16px; align-items:center; padding:16px;">
      \${renderBadge({
    count: 10,
    context: 'inbox',
    type: 'inbox',
    state: 'focused'
  })}
      \${renderBadge({
    count: 49,
    context: 'inbox',
    type: 'inbox',
    state: 'focused'
  })}
      \${renderBadge({
    count: 50,
    context: 'inbox',
    type: 'inbox',
    state: 'focused'
  })}
    </div>\`
}`,...i.parameters?.docs?.source}}};const g=["Playground","AllTypes","OverflowDefault","OverflowInbox"];export{s as AllTypes,o as OverflowDefault,i as OverflowInbox,a as Playground,g as __namedExportsOrder,x as default};
