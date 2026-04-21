const o='<svg class="accordion__icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none"><path d="M28.5 22.5L18 12L7.5 22.5" stroke="currentColor" stroke-width="3" stroke-miterlimit="10"/></svg>',n=[{title:"What is ATOM Design System?",content:"ATOM is a multi-framework design system built with Style Dictionary, pure CSS tokens, and framework-agnostic components for React, Vue, Angular, and Astro."},{title:"How do I install it?",content:"Install via npm: <code>npm install @atomchat.io/css @atomchat.io/tokens</code>. Import the CSS in your entry point and you're ready to go."},{title:"Does it support dark mode?",content:'Yes. Add <code>data-theme="dark"</code> to your <code>&lt;html&gt;</code> element. All semantic color tokens will automatically switch to their dark-mode values.'},{title:"Can I use it with any framework?",content:"The CSS package is framework-agnostic. We also provide dedicated component packages for Astro, React, Vue, and Angular."}],d=(e,t,a)=>`
  <li class="accordion__item" data-accordion-status="${a?"active":"not-active"}" id="acc-${t}">
    <div class="accordion__header" data-accordion-toggle role="button" tabindex="0" aria-expanded="${a}" aria-controls="acc-${t}-body">
      <h3 class="accordion__title" data-text-animate="masked-chars" data-text-trigger="load">${e.title}</h3>
      <div class="accordion__icon" aria-hidden="true">${o}</div>
    </div>
    <div class="accordion__body" id="acc-${t}-body" role="region">
      <div class="accordion__body-wrap">
        <div class="accordion__body-content"><p>${e.content}</p></div>
      </div>
    </div>
  </li>`,l=(e,t,a)=>`
  <div class="accordion" data-accordion data-accordion-close-siblings="${t}">
    <ul class="accordion__list">${e.map((r,s)=>d(r,s,s===a)).join("")}</ul>
  </div>`,p={title:"Components/Accordion",tags:["autodocs"],parameters:{layout:"padded"}},i={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:560px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:120px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{width:100%;max-width:560px}
      .sb-separator{width:100%;max-width:560px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="acc-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Close siblings</label>
          <div class="sb-chips" id="acc-siblings">
            <button class="sb-chip active" data-value="true">true</button>
            <button class="sb-chip" data-value="false">false</button>
          </div>
        </div>
        <div class="sb-control-row"><label>Items</label>
          <div class="sb-chips" id="acc-count">
            <button class="sb-chip" data-value="2">2</button>
            <button class="sb-chip" data-value="3">3</button>
            <button class="sb-chip active" data-value="4">4</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const chevron=${JSON.stringify(o)};
      const allItems=${JSON.stringify(n)};
      let closeSiblings=true,count=4;
      function renderItem(item,i){
        return \`<li class="accordion__item" data-accordion-status="not-active" id="pg-\${i}">
          <div class="accordion__header" data-accordion-toggle role="button" tabindex="0" aria-expanded="false" aria-controls="pg-\${i}-body">
            <h3 class="accordion__title" data-text-animate="masked-chars" data-text-trigger="load">\${item.title}</h3>
            <div class="accordion__icon" aria-hidden="true">\${chevron}</div>
          </div>
          <div class="accordion__body" id="pg-\${i}-body" role="region">
            <div class="accordion__body-wrap"><div class="accordion__body-content"><p>\${item.content}</p></div></div>
          </div>
        </li>\`;
      }
      function update(){
        const items=allItems.slice(0,count);
        const preview=document.getElementById('acc-preview');
        preview.innerHTML=\`<div class="accordion" data-accordion data-accordion-close-siblings="\${closeSiblings}">
          <ul class="accordion__list">\${items.map(renderItem).join('')}</ul>
        </div>\`;
        const acc=preview.querySelector('[data-accordion]');
        acc.addEventListener('click',e=>{
          const toggle=e.target.closest('[data-accordion-toggle]');if(!toggle)return;
          const item=toggle.closest('[data-accordion-status]');if(!item)return;
          const isActive=item.getAttribute('data-accordion-status')==='active';
          item.setAttribute('data-accordion-status',isActive?'not-active':'active');
          toggle.setAttribute('aria-expanded',(!isActive).toString());
          if(closeSiblings&&!isActive){
            acc.querySelectorAll('[data-accordion-status="active"]').forEach(s=>{if(s!==item)s.setAttribute('data-accordion-status','not-active');});
          }
        });
        acc.addEventListener('keydown',e=>{if(e.code==='Enter'||e.code==='Space'){e.preventDefault();acc.dispatchEvent(new MouseEvent('click',{bubbles:true,target:e.target}));}});
      }
      function chips(id,key,parse){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;if(parse)count=parseInt(c.dataset.value);else closeSiblings=c.dataset.value==='true';document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      chips('acc-siblings','closeSiblings');chips('acc-count','count',true);
      update();
    })();
    <\/script>`},c={render:()=>`<div style="max-width:560px;padding:16px;">${l(n.slice(0,3),!0,0)}</div>`};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:560px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:120px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-preview{width:100%;max-width:560px}
      .sb-separator{width:100%;max-width:560px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="acc-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Close siblings</label>
          <div class="sb-chips" id="acc-siblings">
            <button class="sb-chip active" data-value="true">true</button>
            <button class="sb-chip" data-value="false">false</button>
          </div>
        </div>
        <div class="sb-control-row"><label>Items</label>
          <div class="sb-chips" id="acc-count">
            <button class="sb-chip" data-value="2">2</button>
            <button class="sb-chip" data-value="3">3</button>
            <button class="sb-chip active" data-value="4">4</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const chevron=\${JSON.stringify(chevronSVG)};
      const allItems=\${JSON.stringify(ITEMS)};
      let closeSiblings=true,count=4;
      function renderItem(item,i){
        return \\\`<li class="accordion__item" data-accordion-status="not-active" id="pg-\\\${i}">
          <div class="accordion__header" data-accordion-toggle role="button" tabindex="0" aria-expanded="false" aria-controls="pg-\\\${i}-body">
            <h3 class="accordion__title" data-text-animate="masked-chars" data-text-trigger="load">\\\${item.title}</h3>
            <div class="accordion__icon" aria-hidden="true">\\\${chevron}</div>
          </div>
          <div class="accordion__body" id="pg-\\\${i}-body" role="region">
            <div class="accordion__body-wrap"><div class="accordion__body-content"><p>\\\${item.content}</p></div></div>
          </div>
        </li>\\\`;
      }
      function update(){
        const items=allItems.slice(0,count);
        const preview=document.getElementById('acc-preview');
        preview.innerHTML=\\\`<div class="accordion" data-accordion data-accordion-close-siblings="\\\${closeSiblings}">
          <ul class="accordion__list">\\\${items.map(renderItem).join('')}</ul>
        </div>\\\`;
        const acc=preview.querySelector('[data-accordion]');
        acc.addEventListener('click',e=>{
          const toggle=e.target.closest('[data-accordion-toggle]');if(!toggle)return;
          const item=toggle.closest('[data-accordion-status]');if(!item)return;
          const isActive=item.getAttribute('data-accordion-status')==='active';
          item.setAttribute('data-accordion-status',isActive?'not-active':'active');
          toggle.setAttribute('aria-expanded',(!isActive).toString());
          if(closeSiblings&&!isActive){
            acc.querySelectorAll('[data-accordion-status="active"]').forEach(s=>{if(s!==item)s.setAttribute('data-accordion-status','not-active');});
          }
        });
        acc.addEventListener('keydown',e=>{if(e.code==='Enter'||e.code==='Space'){e.preventDefault();acc.dispatchEvent(new MouseEvent('click',{bubbles:true,target:e.target}));}});
      }
      function chips(id,key,parse){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;if(parse)count=parseInt(c.dataset.value);else closeSiblings=c.dataset.value==='true';document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      chips('acc-siblings','closeSiblings');chips('acc-count','count',true);
      update();
    })();
    <\/script>\`
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:'{\n  render: () => `<div style="max-width:560px;padding:16px;">${renderAccordion(ITEMS.slice(0, 3), true, 0)}</div>`\n}',...c.parameters?.docs?.source}}};const u=["Playground","FirstOpen"];export{c as FirstOpen,i as Playground,u as __namedExportsOrder,p as default};
