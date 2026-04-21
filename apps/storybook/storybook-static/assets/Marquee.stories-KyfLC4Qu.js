const r='<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 50 50" fill="none" class="marquee__separator"><path d="M17.6777 32.3223C12.9893 27.6339 6.63041 25 0 25C6.63041 25 12.9893 22.3661 17.6777 17.6777C22.3661 12.9893 25 6.63041 25 0C25 6.63041 27.6339 12.9893 32.3223 17.6777C37.0107 22.3661 43.3696 25 50 25C43.3696 25 37.0107 27.6339 32.3223 32.3223C27.6339 37.0107 25 43.3696 25 50C25 43.3696 22.3661 37.0107 17.6777 32.3223Z" fill="currentColor"/></svg>',l=["Design System","Component Library","Token Architecture","Multi-Framework"],n=["Figma","React","Vue","Angular","Astro","Tailwind"],t=l.map(e=>`<div class="marquee__item"><p class="marquee__text">${e}</p>${r}</div>`).join(""),o=n.map(e=>`<div class="marquee__item"><img class="marquee__logo" src="https://placehold.co/120x32/999/fff?text=${e}" alt="${e}"/></div>`).join(""),c={title:"Components/Marquee",tags:["autodocs"],parameters:{layout:"fullscreen"}},s={render:()=>`
    <style>
      [data-marquee-list]{animation-play-state:running!important}
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 0}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px;padding:0 24px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:80px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div style="width:100%;" id="mq-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Content</label>
          <div class="sb-chips" id="mq-type">
            <button class="sb-chip active" data-value="text">text</button>
            <button class="sb-chip" data-value="logos">logos</button>
          </div>
        </div>
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="mq-size">
            ${["s","m","l","xl"].map((e,i)=>`<button class="sb-chip${i===1?" active":""}" data-value="${e}">${e}</button>`).join("")}
          </div>
        </div>
        <div class="sb-control-row"><label>Theme</label>
          <div class="sb-chips" id="mq-theme">
            <button class="sb-chip active" data-value="light">light</button>
            <button class="sb-chip" data-value="dark">dark</button>
          </div>
        </div>
        <div class="sb-control-row"><label>Direction</label>
          <div class="sb-chips" id="mq-dir">
            <button class="sb-chip active" data-value="normal">normal</button>
            <button class="sb-chip" data-value="reverse">reverse</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const textItems=${JSON.stringify(t)};
      const logoItems=${JSON.stringify(o)};
      let s={type:'text',size:'m',dark:false,reverse:false};
      function update(){
        const items=s.type==='logos'?logoItems:textItems;
        const cls=['marquee','marquee--'+s.type,'marquee--'+s.size,s.dark&&'marquee--dark',s.reverse&&'marquee--reverse','marquee--fade'].filter(Boolean).join(' ');
        document.getElementById('mq-preview').innerHTML=\`
          <div data-marquee class="\${cls}">
            <div data-marquee-list class="marquee__list">\${items}</div>
            <div data-marquee-list class="marquee__list">\${items}</div>
          </div>\`;
      }
      function chips(id,key,isBool){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;if(isBool){s[key]=c.dataset.value!=='light'&&c.dataset.value!=='normal';}else{s[key]=c.dataset.value;}document.querySelectorAll(\`#\${id} .sb-chip\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      chips('mq-type','type');chips('mq-size','size');
      document.getElementById('mq-theme').addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s.dark=c.dataset.value==='dark';document.querySelectorAll('#mq-theme .sb-chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});
      document.getElementById('mq-dir').addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s.reverse=c.dataset.value==='reverse';document.querySelectorAll('#mq-dir .sb-chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});
      update();
    })();
    <\/script>`},a={name:"Double Row (Opposite Directions)",render:()=>`
    <style>[data-marquee-list]{animation-play-state:running!important}</style>
    <div style="display:flex;flex-direction:column;gap:0;">
      <div data-marquee class="marquee marquee--text marquee--m marquee--dark marquee--fade">
        <div data-marquee-list class="marquee__list">${t}</div>
        <div data-marquee-list class="marquee__list">${t}</div>
      </div>
      <div data-marquee class="marquee marquee--text marquee--m marquee--dark marquee--reverse marquee--fade">
        <div data-marquee-list class="marquee__list">${t}</div>
        <div data-marquee-list class="marquee__list">${t}</div>
      </div>
    </div>`};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      [data-marquee-list]{animation-play-state:running!important}
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 0}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px;padding:0 24px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:80px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-chips{display:flex;flex-wrap:wrap;gap:6px}
      .sb-chip{padding:4px 10px;border-radius:999px;font-size:12px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;color:#374151}
      .sb-chip.active{background:#111;color:#fff;border-color:#111}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
    </style>
    <div class="sb-playground">
      <div style="width:100%;" id="mq-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Content</label>
          <div class="sb-chips" id="mq-type">
            <button class="sb-chip active" data-value="text">text</button>
            <button class="sb-chip" data-value="logos">logos</button>
          </div>
        </div>
        <div class="sb-control-row"><label>Size</label>
          <div class="sb-chips" id="mq-size">
            \${['s', 'm', 'l', 'xl'].map((s, i) => \`<button class="sb-chip\${i === 1 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>
        <div class="sb-control-row"><label>Theme</label>
          <div class="sb-chips" id="mq-theme">
            <button class="sb-chip active" data-value="light">light</button>
            <button class="sb-chip" data-value="dark">dark</button>
          </div>
        </div>
        <div class="sb-control-row"><label>Direction</label>
          <div class="sb-chips" id="mq-dir">
            <button class="sb-chip active" data-value="normal">normal</button>
            <button class="sb-chip" data-value="reverse">reverse</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      const textItems=\${JSON.stringify(textItems)};
      const logoItems=\${JSON.stringify(logoItems)};
      let s={type:'text',size:'m',dark:false,reverse:false};
      function update(){
        const items=s.type==='logos'?logoItems:textItems;
        const cls=['marquee','marquee--'+s.type,'marquee--'+s.size,s.dark&&'marquee--dark',s.reverse&&'marquee--reverse','marquee--fade'].filter(Boolean).join(' ');
        document.getElementById('mq-preview').innerHTML=\\\`
          <div data-marquee class="\\\${cls}">
            <div data-marquee-list class="marquee__list">\\\${items}</div>
            <div data-marquee-list class="marquee__list">\\\${items}</div>
          </div>\\\`;
      }
      function chips(id,key,isBool){document.getElementById(id).addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;if(isBool){s[key]=c.dataset.value!=='light'&&c.dataset.value!=='normal';}else{s[key]=c.dataset.value;}document.querySelectorAll(\\\`#\\\${id} .sb-chip\\\`).forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});}
      chips('mq-type','type');chips('mq-size','size');
      document.getElementById('mq-theme').addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s.dark=c.dataset.value==='dark';document.querySelectorAll('#mq-theme .sb-chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});
      document.getElementById('mq-dir').addEventListener('click',e=>{const c=e.target.closest('.sb-chip');if(!c)return;s.reverse=c.dataset.value==='reverse';document.querySelectorAll('#mq-dir .sb-chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');update();});
      update();
    })();
    <\/script>\`
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Double Row (Opposite Directions)',
  render: () => /* html */\`
    <style>[data-marquee-list]{animation-play-state:running!important}</style>
    <div style="display:flex;flex-direction:column;gap:0;">
      <div data-marquee class="marquee marquee--text marquee--m marquee--dark marquee--fade">
        <div data-marquee-list class="marquee__list">\${textItems}</div>
        <div data-marquee-list class="marquee__list">\${textItems}</div>
      </div>
      <div data-marquee class="marquee marquee--text marquee--m marquee--dark marquee--reverse marquee--fade">
        <div data-marquee-list class="marquee__list">\${textItems}</div>
        <div data-marquee-list class="marquee__list">\${textItems}</div>
      </div>
    </div>\`
}`,...a.parameters?.docs?.source}}};const d=["Playground","DoubleRow"];export{a as DoubleRow,s as Playground,d as __namedExportsOrder,c as default};
