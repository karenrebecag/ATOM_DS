const n={title:"Animations/Text",tags:["autodocs"],parameters:{layout:"padded"}},e={render:()=>`
    <div style="display:flex;flex-direction:column;gap:48px;max-width:640px;padding:32px;">
      <div>
        <p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">masked-lines (default)</p>
        <h2 class="heading heading--h2 heading--bold heading--tight heading--left" data-text data-text-animate="masked-lines" data-text-trigger="load">
          Design systems scale your product team
        </h2>
      </div>
      <div>
        <p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">masked-words</p>
        <h3 class="heading heading--h3 heading--medium heading--tight heading--left" data-text data-text-animate="masked-words" data-text-trigger="load">
          Every component follows the same token architecture
        </h3>
      </div>
      <div>
        <p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">masked-chars</p>
        <h4 class="heading heading--heading heading--regular heading--tight heading--left" data-text data-text-animate="masked-chars" data-text-trigger="load">
          Tokens → CSS → Components → Frameworks
        </h4>
      </div>
    </div>`},t={render:()=>`
    <div data-odometer-group style="display:flex;flex-direction:column;gap:32px;max-width:480px;padding:32px;">
      <div>
        <p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">Currency (start €0)</p>
        <h2 style="font-size:3em;font-weight:600;line-height:1;margin:0;font-variant-numeric:tabular-nums;"
          data-odometer-element data-odometer-start="€0" data-odometer-duration="2">€248.750</h2>
      </div>
      <div>
        <p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">Percentage</p>
        <h2 style="font-size:3em;font-weight:600;line-height:1;margin:0;font-variant-numeric:tabular-nums;"
          data-odometer-element data-odometer-duration="1.5">99.8%</h2>
      </div>
      <div>
        <p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">Count with suffix (start 0)</p>
        <h2 style="font-size:3em;font-weight:600;line-height:1;margin:0;font-variant-numeric:tabular-nums;"
          data-odometer-element data-odometer-start="0" data-odometer-duration="1.5">1,250+</h2>
      </div>
    </div>`},a={name:"Odometer — Staggered Group",render:()=>`
    <div data-odometer-group data-odometer-stagger="0.2" style="display:flex;gap:48px;padding:32px;">
      <div style="text-align:center;">
        <h3 style="font-size:2.5em;font-weight:700;line-height:1;margin:0;font-variant-numeric:tabular-nums;"
          data-odometer-element data-odometer-duration="1.5">42K</h3>
        <p style="font-size:12px;color:#999;margin:8px 0 0;">Users</p>
      </div>
      <div style="text-align:center;">
        <h3 style="font-size:2.5em;font-weight:700;line-height:1;margin:0;font-variant-numeric:tabular-nums;"
          data-odometer-element data-odometer-duration="1.5">1,621</h3>
        <p style="font-size:12px;color:#999;margin:8px 0 0;">Tokens</p>
      </div>
      <div style="text-align:center;">
        <h3 style="font-size:2.5em;font-weight:700;line-height:1;margin:0;font-variant-numeric:tabular-nums;"
          data-odometer-element data-odometer-duration="1.5">99.9%</h3>
        <p style="font-size:12px;color:#999;margin:8px 0 0;">Uptime</p>
      </div>
    </div>`};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <div style="display:flex;flex-direction:column;gap:48px;max-width:640px;padding:32px;">
      <div>
        <p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">masked-lines (default)</p>
        <h2 class="heading heading--h2 heading--bold heading--tight heading--left" data-text data-text-animate="masked-lines" data-text-trigger="load">
          Design systems scale your product team
        </h2>
      </div>
      <div>
        <p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">masked-words</p>
        <h3 class="heading heading--h3 heading--medium heading--tight heading--left" data-text data-text-animate="masked-words" data-text-trigger="load">
          Every component follows the same token architecture
        </h3>
      </div>
      <div>
        <p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">masked-chars</p>
        <h4 class="heading heading--heading heading--regular heading--tight heading--left" data-text data-text-animate="masked-chars" data-text-trigger="load">
          Tokens → CSS → Components → Frameworks
        </h4>
      </div>
    </div>\`
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <div data-odometer-group style="display:flex;flex-direction:column;gap:32px;max-width:480px;padding:32px;">
      <div>
        <p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">Currency (start €0)</p>
        <h2 style="font-size:3em;font-weight:600;line-height:1;margin:0;font-variant-numeric:tabular-nums;"
          data-odometer-element data-odometer-start="€0" data-odometer-duration="2">€248.750</h2>
      </div>
      <div>
        <p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">Percentage</p>
        <h2 style="font-size:3em;font-weight:600;line-height:1;margin:0;font-variant-numeric:tabular-nums;"
          data-odometer-element data-odometer-duration="1.5">99.8%</h2>
      </div>
      <div>
        <p style="font-size:11px;color:#999;margin:0 0 8px;text-transform:uppercase;">Count with suffix (start 0)</p>
        <h2 style="font-size:3em;font-weight:600;line-height:1;margin:0;font-variant-numeric:tabular-nums;"
          data-odometer-element data-odometer-start="0" data-odometer-duration="1.5">1,250+</h2>
      </div>
    </div>\`
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Odometer — Staggered Group',
  render: () => /* html */\`
    <div data-odometer-group data-odometer-stagger="0.2" style="display:flex;gap:48px;padding:32px;">
      <div style="text-align:center;">
        <h3 style="font-size:2.5em;font-weight:700;line-height:1;margin:0;font-variant-numeric:tabular-nums;"
          data-odometer-element data-odometer-duration="1.5">42K</h3>
        <p style="font-size:12px;color:#999;margin:8px 0 0;">Users</p>
      </div>
      <div style="text-align:center;">
        <h3 style="font-size:2.5em;font-weight:700;line-height:1;margin:0;font-variant-numeric:tabular-nums;"
          data-odometer-element data-odometer-duration="1.5">1,621</h3>
        <p style="font-size:12px;color:#999;margin:8px 0 0;">Tokens</p>
      </div>
      <div style="text-align:center;">
        <h3 style="font-size:2.5em;font-weight:700;line-height:1;margin:0;font-variant-numeric:tabular-nums;"
          data-odometer-element data-odometer-duration="1.5">99.9%</h3>
        <p style="font-size:12px;color:#999;margin:8px 0 0;">Uptime</p>
      </div>
    </div>\`
}`,...a.parameters?.docs?.source}}};const r=["MaskedReveal","Odometer","OdometerGroup"];export{e as MaskedReveal,t as Odometer,a as OdometerGroup,r as __namedExportsOrder,n as default};
