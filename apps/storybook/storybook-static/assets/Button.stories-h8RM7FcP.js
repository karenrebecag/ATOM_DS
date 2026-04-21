const l=t=>`<span class="button__label-wrap">
    <span class="button__label" data-button-label>${t}</span>
    <span class="button__label button__label--clone" data-button-label-clone aria-hidden="true">${t}</span>
  </span>`,r=["primary","secondary","tertiary","danger-primary","danger-secondary","danger-tertiary"],d=["xs","s","m","l","xl"],p={title:"Components/Button",tags:["autodocs"],argTypes:{variant:{control:"select",options:r},size:{control:"select",options:d},label:{control:"text"},loading:{control:"boolean"},disabled:{control:"boolean"}},args:{variant:"primary",size:"m",label:"Click me",loading:!1,disabled:!1}},a={render:()=>`
    <style>
      .sb-playground { font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; gap: 32px; padding: 32px 24px; }
      .sb-controls { display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 480px; }
      .sb-control-row { display: flex; align-items: center; gap: 12px; }
      .sb-control-row label { font-size: 12px; font-weight: 600; color: #6b7280; width: 64px; flex-shrink: 0; text-transform: uppercase; letter-spacing: .04em; }
      .sb-chips { display: flex; flex-wrap: wrap; gap: 6px; }
      .sb-chip { padding: 4px 10px; border-radius: 999px; font-size: 12px; border: 1px solid #e5e7eb; background: #fff; cursor: pointer; transition: all .15s; color: #374151; }
      .sb-chip:hover { border-color: #9ca3af; }
      .sb-chip.active { background: #111; color: #fff; border-color: #111; }
      .sb-chip-bool { padding: 4px 10px; border-radius: 999px; font-size: 12px; border: 1px solid #e5e7eb; background: #fff; cursor: pointer; transition: all .15s; color: #374151; }
      .sb-chip-bool.active { background: #ef4444; color: #fff; border-color: #ef4444; }
      .sb-preview { min-height: 80px; display: flex; align-items: center; justify-content: center; }
      .sb-separator { width: 100%; max-width: 480px; border: none; border-top: 1px solid #f3f4f6; }
    </style>

    <div class="sb-playground" id="btn-playground">
      <div class="sb-preview" id="btn-preview"></div>

      <hr class="sb-separator"/>

      <div class="sb-controls">
        <div class="sb-control-row">
          <label>Variant</label>
          <div class="sb-chips" id="btn-variants">
            ${r.map((t,n)=>`<button class="sb-chip${n===0?" active":""}" data-value="${t}">${t}</button>`).join("")}
          </div>
        </div>

        <div class="sb-control-row">
          <label>Size</label>
          <div class="sb-chips" id="btn-sizes">
            ${d.map((t,n)=>`<button class="sb-chip${n===2?" active":""}" data-value="${t}">${t}</button>`).join("")}
          </div>
        </div>

        <div class="sb-control-row">
          <label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="btn-loading">Loading</button>
            <button class="sb-chip-bool" id="btn-disabled">Disabled</button>
          </div>
        </div>
      </div>
    </div>

    <script>
      (function () {
        let state = { variant: 'primary', size: 'm', loading: false, disabled: false, label: 'Click me' };

        function renderBtn() {
          const { variant, size, loading, disabled, label } = state;
          if (loading) {
            return \`<button class="button button--\${variant} button--\${size} button--loading" data-button aria-busy="true">
              <span class="button__loading-content">
                <span class="button__loading-text" data-shimmer>Loading</span>
                <span class="button__spinner" data-button-spinner aria-hidden="true"></span>
              </span>
            </button>\`;
          }
          const cls = \`button button--\${variant} button--\${size}\${disabled ? ' button--disabled' : ''}\`;
          const attrs = disabled ? 'disabled' : 'data-hover-rotate';
          return \`<button class="\${cls}" data-button \${attrs}>
            <span class="button__label-wrap">
              <span class="button__label" data-button-label>\${label}</span>
              <span class="button__label button__label--clone" data-button-label-clone aria-hidden="true">\${label}</span>
            </span>
          </button>\`;
        }

        function update() {
          const preview = document.getElementById('btn-preview');
          preview.innerHTML = renderBtn();
          // Re-init hover animations on the newly rendered button
          const anim = window.__atomAnimations;
          if (anim) {
            anim.initRotateClones({ scope: preview });
            anim.initRotateCalc({ scope: preview });
            anim.initHoverRotate({ scope: preview });
          }
        }

        function bindChips(containerId, key) {
          document.getElementById(containerId).addEventListener('click', (e) => {
            const chip = e.target.closest('.sb-chip');
            if (!chip) return;
            state[key] = chip.dataset.value;
            document.querySelectorAll(\`#\${containerId} .sb-chip\`).forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            update();
          });
        }

        function bindBool(id, key) {
          document.getElementById(id).addEventListener('click', (e) => {
            state[key] = !state[key];
            e.currentTarget.classList.toggle('active', state[key]);
            update();
          });
        }

        bindChips('btn-variants', 'variant');
        bindChips('btn-sizes', 'size');
        bindBool('btn-loading', 'loading');
        bindBool('btn-disabled', 'disabled');
        update();
      })();
    <\/script>`},e={render:()=>`
    <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; padding:24px;">
      ${r.map(t=>`<button class="button button--${t} button--m" data-button data-hover-rotate>${l(t)}</button>`).join("")}
    </div>`},s={render:()=>`
    <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; padding:24px;">
      ${d.map(t=>`<button class="button button--primary button--${t}" data-button data-hover-rotate>${l(t)}</button>`).join("")}
    </div>`},o={args:{loading:!0},render:({variant:t,size:n})=>`
    <button class="button button--${t} button--${n} button--loading" data-button aria-busy="true">
      <span class="button__loading-content">
        <span class="button__loading-text" data-shimmer>Loading</span>
        <span class="button__spinner" data-button-spinner aria-hidden="true"></span>
      </span>
    </button>`},i={args:{disabled:!0},render:({variant:t,size:n,label:c})=>`
    <div style="display:flex; gap:12px; padding:24px;">
      ${r.slice(0,3).map(b=>`<button class="button button--${b} button--m button--disabled" data-button disabled>${l(b)}</button>`).join("")}
    </div>`};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground { font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; gap: 32px; padding: 32px 24px; }
      .sb-controls { display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 480px; }
      .sb-control-row { display: flex; align-items: center; gap: 12px; }
      .sb-control-row label { font-size: 12px; font-weight: 600; color: #6b7280; width: 64px; flex-shrink: 0; text-transform: uppercase; letter-spacing: .04em; }
      .sb-chips { display: flex; flex-wrap: wrap; gap: 6px; }
      .sb-chip { padding: 4px 10px; border-radius: 999px; font-size: 12px; border: 1px solid #e5e7eb; background: #fff; cursor: pointer; transition: all .15s; color: #374151; }
      .sb-chip:hover { border-color: #9ca3af; }
      .sb-chip.active { background: #111; color: #fff; border-color: #111; }
      .sb-chip-bool { padding: 4px 10px; border-radius: 999px; font-size: 12px; border: 1px solid #e5e7eb; background: #fff; cursor: pointer; transition: all .15s; color: #374151; }
      .sb-chip-bool.active { background: #ef4444; color: #fff; border-color: #ef4444; }
      .sb-preview { min-height: 80px; display: flex; align-items: center; justify-content: center; }
      .sb-separator { width: 100%; max-width: 480px; border: none; border-top: 1px solid #f3f4f6; }
    </style>

    <div class="sb-playground" id="btn-playground">
      <div class="sb-preview" id="btn-preview"></div>

      <hr class="sb-separator"/>

      <div class="sb-controls">
        <div class="sb-control-row">
          <label>Variant</label>
          <div class="sb-chips" id="btn-variants">
            \${VARIANTS.map((v, i) => \`<button class="sb-chip\${i === 0 ? ' active' : ''}" data-value="\${v}">\${v}</button>\`).join('')}
          </div>
        </div>

        <div class="sb-control-row">
          <label>Size</label>
          <div class="sb-chips" id="btn-sizes">
            \${SIZES.map((s, i) => \`<button class="sb-chip\${i === 2 ? ' active' : ''}" data-value="\${s}">\${s}</button>\`).join('')}
          </div>
        </div>

        <div class="sb-control-row">
          <label>States</label>
          <div class="sb-chips">
            <button class="sb-chip-bool" id="btn-loading">Loading</button>
            <button class="sb-chip-bool" id="btn-disabled">Disabled</button>
          </div>
        </div>
      </div>
    </div>

    <script>
      (function () {
        let state = { variant: 'primary', size: 'm', loading: false, disabled: false, label: 'Click me' };

        function renderBtn() {
          const { variant, size, loading, disabled, label } = state;
          if (loading) {
            return \\\`<button class="button button--\\\${variant} button--\\\${size} button--loading" data-button aria-busy="true">
              <span class="button__loading-content">
                <span class="button__loading-text" data-shimmer>Loading</span>
                <span class="button__spinner" data-button-spinner aria-hidden="true"></span>
              </span>
            </button>\\\`;
          }
          const cls = \\\`button button--\\\${variant} button--\\\${size}\\\${disabled ? ' button--disabled' : ''}\\\`;
          const attrs = disabled ? 'disabled' : 'data-hover-rotate';
          return \\\`<button class="\\\${cls}" data-button \\\${attrs}>
            <span class="button__label-wrap">
              <span class="button__label" data-button-label>\\\${label}</span>
              <span class="button__label button__label--clone" data-button-label-clone aria-hidden="true">\\\${label}</span>
            </span>
          </button>\\\`;
        }

        function update() {
          const preview = document.getElementById('btn-preview');
          preview.innerHTML = renderBtn();
          // Re-init hover animations on the newly rendered button
          const anim = window.__atomAnimations;
          if (anim) {
            anim.initRotateClones({ scope: preview });
            anim.initRotateCalc({ scope: preview });
            anim.initHoverRotate({ scope: preview });
          }
        }

        function bindChips(containerId, key) {
          document.getElementById(containerId).addEventListener('click', (e) => {
            const chip = e.target.closest('.sb-chip');
            if (!chip) return;
            state[key] = chip.dataset.value;
            document.querySelectorAll(\\\`#\\\${containerId} .sb-chip\\\`).forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            update();
          });
        }

        function bindBool(id, key) {
          document.getElementById(id).addEventListener('click', (e) => {
            state[key] = !state[key];
            e.currentTarget.classList.toggle('active', state[key]);
            update();
          });
        }

        bindChips('btn-variants', 'variant');
        bindChips('btn-sizes', 'size');
        bindBool('btn-loading', 'loading');
        bindBool('btn-disabled', 'disabled');
        update();
      })();
    <\/script>\`
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:'{\n  render: () => /* html */`\n    <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; padding:24px;">\n      ${VARIANTS.map(v => `<button class="button button--${v} button--m" data-button data-hover-rotate>${labelWrap(v)}</button>`).join(\'\')}\n    </div>`\n}',...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:'{\n  render: () => /* html */`\n    <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; padding:24px;">\n      ${SIZES.map(s => `<button class="button button--primary button--${s}" data-button data-hover-rotate>${labelWrap(s)}</button>`).join(\'\')}\n    </div>`\n}',...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true
  },
  render: ({
    variant,
    size
  }) => /* html */\`
    <button class="button button--\${variant} button--\${size} button--loading" data-button aria-busy="true">
      <span class="button__loading-content">
        <span class="button__loading-text" data-shimmer>Loading</span>
        <span class="button__spinner" data-button-spinner aria-hidden="true"></span>
      </span>
    </button>\`
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: ({
    variant,
    size,
    label
  }) => /* html */\`
    <div style="display:flex; gap:12px; padding:24px;">
      \${VARIANTS.slice(0, 3).map(v => \`<button class="button button--\${v} button--m button--disabled" data-button disabled>\${labelWrap(v)}</button>\`).join('')}
    </div>\`
}`,...i.parameters?.docs?.source}}};const u=["Playground","AllVariants","AllSizes","Loading","Disabled"];export{s as AllSizes,e as AllVariants,i as Disabled,o as Loading,a as Playground,u as __namedExportsOrder,p as default};
