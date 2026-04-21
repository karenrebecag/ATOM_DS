const i=`<svg viewBox="0 0 512 512" fill="none" width="32" height="32">
  <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" fill="currentColor"/>
</svg>`,d=t=>`<span class="button__label-wrap"><span class="button__label" data-button-label>${t}</span><span class="button__label button__label--clone" data-button-label-clone aria-hidden="true">${t}</span></span>`,l=({heading:t,supportingText:o,resultText:a,size:r,showButton:c,buttonText:p})=>`
    <div class="empty-state empty-state--${r}">
      <div class="empty-state__icon">${i}</div>
      ${r==="s"?`
        <h3 class="empty-state__heading">${t}</h3>
        <div class="empty-state__supporting-group">
          <p class="empty-state__supporting">${o}</p>
          ${a?`<p class="empty-state__result">${a}</p>`:""}
        </div>`:`
        <div class="empty-state__text-group">
          <h3 class="empty-state__heading">${t}</h3>
          <p class="empty-state__supporting">${o}</p>
        </div>
        ${c?`<button class="button button--secondary button--m" data-button data-hover-rotate type="button">${d(p)}</button>`:""}`}
    </div>`,u={title:"Components/EmptyState",tags:["autodocs"],argTypes:{heading:{control:"text"},supportingText:{control:"text"},resultText:{control:"text"},size:{control:"select",options:["s","m"]},showButton:{control:"boolean"},buttonText:{control:"text"}},args:{heading:"No results found",supportingText:"Try adjusting your search or filters.",resultText:"",size:"s",showButton:!1,buttonText:"Create new"}},e={render:()=>`
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
      .sb-preview{min-height:120px;display:flex;align-items:center;justify-content:center;width:100%;max-width:520px}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="es-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="es-sizes">
            <button class="sb-chip active" data-value="s">s</button>
            <button class="sb-chip" data-value="m">m</button>
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="es-button">Show button</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const iconSvg=${JSON.stringify(i)};
      let s={size:'s',showButton:false};
      function labelWrap(text){return\`<span class="button__label-wrap"><span class="button__label">\${text}</span><span class="button__label button__label--clone" aria-hidden="true">\${text}</span></span>\`;}
      function update(){
        let inner='';
        if(s.size==='s'){
          inner=\`<h3 class="empty-state__heading">No results found</h3><div class="empty-state__supporting-group"><p class="empty-state__supporting">Try adjusting your search or filters.</p></div>\`;
        } else {
          const btn=s.showButton?\`<button class="button button--secondary button--m" data-button data-hover-rotate type="button">\${labelWrap('Create new')}</button>\`:'';
          inner=\`<div class="empty-state__text-group"><h3 class="empty-state__heading">No projects yet</h3><p class="empty-state__supporting">Create your first project to get started.</p></div>\${btn}\`;
        }
        document.getElementById('es-preview').innerHTML=\`<div class="empty-state empty-state--\${s.size}"><div class="empty-state__icon">\${iconSvg}</div>\${inner}</div>\`;
        if(window.__atomInit) window.__atomInit(document.getElementById('es-preview'));
        const a=window.__atomAnimations;
        if(a){const p=document.getElementById('es-preview');a.initRotateClones({scope:p});a.initRotateCalc({scope:p});a.initHoverRotate({scope:p});}
      }
      document.getElementById('es-sizes').addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s.size=c.dataset.value;document.querySelectorAll('#es-sizes .sb-chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});
      document.getElementById('es-button').addEventListener('click',e=>{s.showButton=!s.showButton;e.currentTarget.classList.toggle('active',s.showButton);update();});
      update();
    })();
    <\/script>`},s={render:()=>l({size:"s",heading:"No results found",supportingText:"Try a different search term.",resultText:'"design system"',showButton:!1,buttonText:""})},n={render:()=>l({size:"m",heading:"No projects yet",supportingText:"Create your first project to get started.",showButton:!0,buttonText:"Create project",resultText:""})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
      .sb-preview{min-height:120px;display:flex;align-items:center;justify-content:center;width:100%;max-width:520px}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="es-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="es-sizes">
            <button class="sb-chip active" data-value="s">s</button>
            <button class="sb-chip" data-value="m">m</button>
          </div>
        </div>
        <div class="sb-control-row"><label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="es-button">Show button</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const iconSvg=\${JSON.stringify(defaultIcon)};
      let s={size:'s',showButton:false};
      function labelWrap(text){return\\\`<span class="button__label-wrap"><span class="button__label">\\\${text}</span><span class="button__label button__label--clone" aria-hidden="true">\\\${text}</span></span>\\\`;}
      function update(){
        let inner='';
        if(s.size==='s'){
          inner=\\\`<h3 class="empty-state__heading">No results found</h3><div class="empty-state__supporting-group"><p class="empty-state__supporting">Try adjusting your search or filters.</p></div>\\\`;
        } else {
          const btn=s.showButton?\\\`<button class="button button--secondary button--m" data-button data-hover-rotate type="button">\\\${labelWrap('Create new')}</button>\\\`:'';
          inner=\\\`<div class="empty-state__text-group"><h3 class="empty-state__heading">No projects yet</h3><p class="empty-state__supporting">Create your first project to get started.</p></div>\\\${btn}\\\`;
        }
        document.getElementById('es-preview').innerHTML=\\\`<div class="empty-state empty-state--\\\${s.size}"><div class="empty-state__icon">\\\${iconSvg}</div>\\\${inner}</div>\\\`;
        if(window.__atomInit) window.__atomInit(document.getElementById('es-preview'));
        const a=window.__atomAnimations;
        if(a){const p=document.getElementById('es-preview');a.initRotateClones({scope:p});a.initRotateCalc({scope:p});a.initHoverRotate({scope:p});}
      }
      document.getElementById('es-sizes').addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s.size=c.dataset.value;document.querySelectorAll('#es-sizes .sb-chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});
      document.getElementById('es-button').addEventListener('click',e=>{s.showButton=!s.showButton;e.currentTarget.classList.toggle('active',s.showButton);update();});
      update();
    })();
    <\/script>\`
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => renderEmptyState({
    size: 's',
    heading: 'No results found',
    supportingText: 'Try a different search term.',
    resultText: '"design system"',
    showButton: false,
    buttonText: ''
  })
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => renderEmptyState({
    size: 'm',
    heading: 'No projects yet',
    supportingText: 'Create your first project to get started.',
    showButton: true,
    buttonText: 'Create project',
    resultText: ''
  })
}`,...n.parameters?.docs?.source}}};const b=["Playground","Small","Medium"];export{n as Medium,e as Playground,s as Small,b as __namedExportsOrder,u as default};
