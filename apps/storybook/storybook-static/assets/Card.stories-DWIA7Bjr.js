const r=`<svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg>`,d=a=>`<span class="button__label-wrap"><span class="button__label" data-button-label>${a}</span><span class="button__label button__label--clone" data-button-label-clone aria-hidden="true">${a}</span></span>`,c=["simple","with-avatar","with-body"],i=a=>a==="simple"?`
      <div class="card" style="max-width:360px;">
        <div class="card-header">
          <div class="card-header__content">
            <div class="card-header__text">
              <h3 class="card-header__headline" data-text-animate="masked-chars" data-text-trigger="load">Card title</h3>
              <p class="card-header__supporting">Supporting subtitle</p>
            </div>
          </div>
        </div>
      </div>`:a==="with-avatar"?`
      <div class="card" style="max-width:360px;">
        <div class="card-header">
          <div class="card-header__content">
            <div class="card-header__image">
              <span class="avatar avatar--m avatar--circle avatar--initials" data-avatar role="img" aria-label="John Doe">
                <span class="avatar__initials" data-avatar-initials>JD</span>
              </span>
            </div>
            <div class="card-header__text">
              <h3 class="card-header__headline" data-text-animate="masked-chars" data-text-trigger="load">John Doe</h3>
              <p class="card-header__supporting">@johndoe</p>
            </div>
          </div>
          <div class="card-header__action">
            <button class="icon-button icon-button--tertiary icon-button--s" data-icon-button data-hover-rotate type="button" aria-label="More options">
              <span class="icon-button__icon-wrap">
                <span class="icon-button__icon" data-icon-button-icon>${r}</span>
                <span class="icon-button__icon icon-button__icon--clone" data-icon-button-icon-clone aria-hidden="true">${r}</span>
              </span>
            </button>
          </div>
        </div>
      </div>`:`
    <div class="card" style="max-width:360px;">
      <div class="card-header">
        <div class="card-header__content">
          <div class="card-header__text">
            <h3 class="card-header__headline" data-text-animate="masked-chars" data-text-trigger="load">Project Alpha</h3>
            <p class="card-header__supporting">Design system initiative</p>
          </div>
        </div>
      </div>
      <div class="card-body" style="padding: var(--m, 1rem);">
        <p class="text text--body text--regular" data-text>
          This card shows a typical layout with header, body content, and footer actions.
        </p>
        <div style="margin-top: 12px;">
          <span class="tag tag--info tag--filled tag--s" data-tag>
            <span class="tag__text" data-tag-text>In progress</span>
          </span>
        </div>
      </div>
      <div class="card-footer" style="padding: var(--m, 1rem); display:flex; gap:8px; justify-content:flex-end; border-top: 1px solid var(--border-subtle, #e5e7eb);">
        <button class="button button--secondary button--s" data-button data-hover-rotate>${d("Cancel")}</button>
        <button class="button button--primary button--s" data-button data-hover-rotate>${d("Save")}</button>
      </div>
    </div>`,l={title:"Components/Card",tags:["autodocs"],parameters:{layout:"padded"}},t={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:72px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{min-height:120px;display:flex;align-items:center;justify-content:center;width:100%;max-width:520px}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="cd-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Variant</label>
          <div class="sb-chips" id="cd-variants">
            ${c.map((a,o)=>`<button class="sb-chip${o===0?" active":""}" data-value="${a}">${a}</button>`).join("")}
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const moreIconSvg=${JSON.stringify(r)};
      let variant='simple';
      function labelWrap(text){return\`<span class="button__label-wrap"><span class="button__label">\${text}</span><span class="button__label button__label--clone" aria-hidden="true">\${text}</span></span>\`;}
      function renderSimple(){
        return\`<div class="card" style="max-width:360px;width:100%;"><div class="card-header"><div class="card-header__content"><div class="card-header__text"><h3 class="card-header__headline" data-text-animate="masked-chars" data-text-trigger="load">Card title</h3><p class="card-header__supporting">Supporting subtitle</p></div></div></div></div>\`;
      }
      function renderWithAvatar(){
        return\`<div class="card" style="max-width:360px;width:100%;"><div class="card-header"><div class="card-header__content"><div class="card-header__image"><span class="avatar avatar--m avatar--circle avatar--initials" data-avatar role="img" aria-label="John Doe"><span class="avatar__initials" data-avatar-initials>JD</span></span></div><div class="card-header__text"><h3 class="card-header__headline" data-text-animate="masked-chars" data-text-trigger="load">John Doe</h3><p class="card-header__supporting">@johndoe</p></div></div><div class="card-header__action"><button class="icon-button icon-button--tertiary icon-button--s" data-icon-button data-hover-rotate type="button" aria-label="More options"><span class="icon-button__icon-wrap"><span class="icon-button__icon" data-icon-button-icon>\${moreIconSvg}</span><span class="icon-button__icon icon-button__icon--clone" data-icon-button-icon-clone aria-hidden="true">\${moreIconSvg}</span></span></button></div></div></div>\`;
      }
      function renderWithBody(){
        return\`<div class="card" style="max-width:360px;width:100%;"><div class="card-header"><div class="card-header__content"><div class="card-header__text"><h3 class="card-header__headline" data-text-animate="masked-chars" data-text-trigger="load">Project Alpha</h3><p class="card-header__supporting">Design system initiative</p></div></div></div><div class="card-body" style="padding:var(--m,1rem);"><p class="text text--body text--regular" data-text>This card shows a typical layout with header, body content, and footer actions.</p><div style="margin-top:12px;"><span class="tag tag--info tag--filled tag--s" data-tag><span class="tag__text" data-tag-text>In progress</span></span></div></div><div class="card-footer" style="padding:var(--m,1rem);display:flex;gap:8px;justify-content:flex-end;border-top:1px solid var(--border-subtle,#e5e7eb);"><button class="button button--secondary button--s" data-button data-hover-rotate>\${labelWrap('Cancel')}</button><button class="button button--primary button--s" data-button data-hover-rotate>\${labelWrap('Save')}</button></div></div>\`;
      }
      function update(){
        const p=document.getElementById('cd-preview');
        if(variant==='simple') p.innerHTML=renderSimple();
        else if(variant==='with-avatar') p.innerHTML=renderWithAvatar();
        else p.innerHTML=renderWithBody();
        if(window.__atomInit) window.__atomInit(p);
      }
      document.getElementById('cd-variants').addEventListener('click',e=>{
        const c=e.target.closest('.sb-chip');if(!c)return;
        variant=c.dataset.value;
        document.querySelectorAll('#cd-variants .sb-chip').forEach(x=>x.classList.remove('active'));
        c.classList.add('active');update();
      });
      update();
    })();
    <\/script>`},e={render:()=>i("simple")},s={render:()=>i("with-avatar")},n={render:()=>i("with-body")};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:72px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{min-height:120px;display:flex;align-items:center;justify-content:center;width:100%;max-width:520px}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="cd-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Variant</label>
          <div class="sb-chips" id="cd-variants">
            \${VARIANTS.map((v, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${v}">\${v}</button>\`).join('')}
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const moreIconSvg=\${JSON.stringify(moreIcon)};
      let variant='simple';
      function labelWrap(text){return\\\`<span class="button__label-wrap"><span class="button__label">\\\${text}</span><span class="button__label button__label--clone" aria-hidden="true">\\\${text}</span></span>\\\`;}
      function renderSimple(){
        return\\\`<div class="card" style="max-width:360px;width:100%;"><div class="card-header"><div class="card-header__content"><div class="card-header__text"><h3 class="card-header__headline" data-text-animate="masked-chars" data-text-trigger="load">Card title</h3><p class="card-header__supporting">Supporting subtitle</p></div></div></div></div>\\\`;
      }
      function renderWithAvatar(){
        return\\\`<div class="card" style="max-width:360px;width:100%;"><div class="card-header"><div class="card-header__content"><div class="card-header__image"><span class="avatar avatar--m avatar--circle avatar--initials" data-avatar role="img" aria-label="John Doe"><span class="avatar__initials" data-avatar-initials>JD</span></span></div><div class="card-header__text"><h3 class="card-header__headline" data-text-animate="masked-chars" data-text-trigger="load">John Doe</h3><p class="card-header__supporting">@johndoe</p></div></div><div class="card-header__action"><button class="icon-button icon-button--tertiary icon-button--s" data-icon-button data-hover-rotate type="button" aria-label="More options"><span class="icon-button__icon-wrap"><span class="icon-button__icon" data-icon-button-icon>\\\${moreIconSvg}</span><span class="icon-button__icon icon-button__icon--clone" data-icon-button-icon-clone aria-hidden="true">\\\${moreIconSvg}</span></span></button></div></div></div>\\\`;
      }
      function renderWithBody(){
        return\\\`<div class="card" style="max-width:360px;width:100%;"><div class="card-header"><div class="card-header__content"><div class="card-header__text"><h3 class="card-header__headline" data-text-animate="masked-chars" data-text-trigger="load">Project Alpha</h3><p class="card-header__supporting">Design system initiative</p></div></div></div><div class="card-body" style="padding:var(--m,1rem);"><p class="text text--body text--regular" data-text>This card shows a typical layout with header, body content, and footer actions.</p><div style="margin-top:12px;"><span class="tag tag--info tag--filled tag--s" data-tag><span class="tag__text" data-tag-text>In progress</span></span></div></div><div class="card-footer" style="padding:var(--m,1rem);display:flex;gap:8px;justify-content:flex-end;border-top:1px solid var(--border-subtle,#e5e7eb);"><button class="button button--secondary button--s" data-button data-hover-rotate>\\\${labelWrap('Cancel')}</button><button class="button button--primary button--s" data-button data-hover-rotate>\\\${labelWrap('Save')}</button></div></div>\\\`;
      }
      function update(){
        const p=document.getElementById('cd-preview');
        if(variant==='simple') p.innerHTML=renderSimple();
        else if(variant==='with-avatar') p.innerHTML=renderWithAvatar();
        else p.innerHTML=renderWithBody();
        if(window.__atomInit) window.__atomInit(p);
      }
      document.getElementById('cd-variants').addEventListener('click',e=>{
        const c=e.target.closest('.sb-chip');if(!c)return;
        variant=c.dataset.value;
        document.querySelectorAll('#cd-variants .sb-chip').forEach(x=>x.classList.remove('active'));
        c.classList.add('active');update();
      });
      update();
    })();
    <\/script>\`
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => renderCard('simple')
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => renderCard('with-avatar')
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => renderCard('with-body')
}`,...n.parameters?.docs?.source}}};const p=["Playground","Simple","WithAvatar","WithBodyAndFooter"];export{t as Playground,e as Simple,s as WithAvatar,n as WithBodyAndFooter,p as __namedExportsOrder,l as default};
