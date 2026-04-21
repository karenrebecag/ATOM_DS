const a=({opacity:i})=>`
  <hr class="divider" ${i<1?`style="--divider-opacity: ${i}"`:""} data-divider aria-hidden="true"/>`,s={title:"Components/Divider",tags:["autodocs"],argTypes:{opacity:{control:{type:"range",min:0,max:1,step:.05}}},args:{opacity:1}},e={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:72px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-preview{min-height:80px;display:flex;flex-direction:column;justify-content:center;width:100%;max-width:520px}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
      .sb-slider-wrap{display:flex;align-items:center;gap:10px}
      .sb-slider-wrap input[type=range]{width:160px;accent-color:#111}
      .sb-slider-val{font-size:12px;color:#374151;min-width:32px}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="dv-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Opacity</label>
          <div class="sb-slider-wrap">
            <input type="range" id="dv-opacity" min="0" max="1" step="0.05" value="1"/>
            <span class="sb-slider-val" id="dv-opacity-val">1</span>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let opacity=1;
      function update(){
        const style=opacity<1?\`style="--divider-opacity:\${opacity}"\`:'';
        document.getElementById('dv-preview').innerHTML=\`
        if(window.__atomInit) window.__atomInit(document.getElementById('dv-preview'));
          <p style="margin:0 0 16px;font-size:14px;">Content above</p>
          <hr class="divider" \${style} data-divider aria-hidden="true"/>
          <p style="margin:16px 0 0;font-size:14px;">Content below</p>\`;
      }
      const rangeEl=document.getElementById('dv-opacity');
      const valEl=document.getElementById('dv-opacity-val');
      rangeEl.addEventListener('input',()=>{opacity=Number(rangeEl.value);valEl.textContent=opacity.toFixed(2);update();});
      update();
    })();
    <\/script>`},t={render:()=>`
    <div style="width:320px; padding:16px;">
      <p style="margin:0 0 16px; font-size:14px;">Content above</p>
      ${a({opacity:.3})}
      <p style="margin:16px 0 0; font-size:14px;">Content below</p>
    </div>`},n={render:()=>`
    <div style="width:320px; padding:16px;">
      <p style="margin:0 0 16px; font-size:14px;">Content above</p>
      ${a({opacity:1})}
      <p style="margin:16px 0 0; font-size:14px;">Content below</p>
    </div>`};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:32px;padding:32px 24px}
      .sb-controls{display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px}
      .sb-control-row{display:flex;align-items:center;gap:12px}
      .sb-control-row label{font-size:12px;font-weight:600;color:#6b7280;width:72px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
      .sb-preview{min-height:80px;display:flex;flex-direction:column;justify-content:center;width:100%;max-width:520px}
      .sb-separator{width:100%;max-width:520px;border:none;border-top:1px solid #f3f4f6}
      .sb-slider-wrap{display:flex;align-items:center;gap:10px}
      .sb-slider-wrap input[type=range]{width:160px;accent-color:#111}
      .sb-slider-val{font-size:12px;color:#374151;min-width:32px}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="dv-preview"></div>
      <hr class="sb-separator"/>
      <div class="sb-controls">
        <div class="sb-control-row"><label>Opacity</label>
          <div class="sb-slider-wrap">
            <input type="range" id="dv-opacity" min="0" max="1" step="0.05" value="1"/>
            <span class="sb-slider-val" id="dv-opacity-val">1</span>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      let opacity=1;
      function update(){
        const style=opacity<1?\\\`style="--divider-opacity:\\\${opacity}"\\\`:'';
        document.getElementById('dv-preview').innerHTML=\\\`
        if(window.__atomInit) window.__atomInit(document.getElementById('dv-preview'));
          <p style="margin:0 0 16px;font-size:14px;">Content above</p>
          <hr class="divider" \\\${style} data-divider aria-hidden="true"/>
          <p style="margin:16px 0 0;font-size:14px;">Content below</p>\\\`;
      }
      const rangeEl=document.getElementById('dv-opacity');
      const valEl=document.getElementById('dv-opacity-val');
      rangeEl.addEventListener('input',()=>{opacity=Number(rangeEl.value);valEl.textContent=opacity.toFixed(2);update();});
      update();
    })();
    <\/script>\`
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="width:320px; padding:16px;">
      <p style="margin:0 0 16px; font-size:14px;">Content above</p>
      \${renderDivider({
    opacity: 0.3
  })}
      <p style="margin:16px 0 0; font-size:14px;">Content below</p>
    </div>\`
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="width:320px; padding:16px;">
      <p style="margin:0 0 16px; font-size:14px;">Content above</p>
      \${renderDivider({
    opacity: 1
  })}
      <p style="margin:16px 0 0; font-size:14px;">Content below</p>
    </div>\`
}`,...n.parameters?.docs?.source}}};const p=["Playground","Subtle","Default"];export{n as Default,e as Playground,t as Subtle,p as __namedExportsOrder,s as default};
