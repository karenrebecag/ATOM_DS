const a='<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 13.25V13C12 12.183 12.505 11.74 13.011 11.4C13.505 11.067 14 10.633 14 9.83301C14 8.72801 13.105 7.83301 12 7.83301C10.895 7.83301 10 8.72801 10 9.83301" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.999 16C11.861 16 11.749 16.112 11.75 16.25C11.75 16.388 11.862 16.5 12 16.5C12.138 16.5 12.25 16.388 12.25 16.25C12.25 16.112 12.138 16 11.999 16Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 13V7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.999 16C11.861 16 11.749 16.112 11.75 16.25C11.75 16.388 11.862 16.5 12 16.5C12.138 16.5 12.25 16.388 12.25 16.25C12.25 16.112 12.138 16 11.999 16Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 15.5H13.3093" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.1588 15.5V11.25H11.0088" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.1001 8.24725C12.1001 8.2967 12.0854 8.34503 12.058 8.38615C12.0305 8.42726 11.9915 8.4593 11.9458 8.47822C11.9001 8.49714 11.8498 8.5021 11.8013 8.49245C11.7528 8.4828 11.7083 8.45899 11.6733 8.42403C11.6384 8.38907 11.6145 8.34452 11.6049 8.29603C11.5953 8.24753 11.6002 8.19726 11.6191 8.15158C11.638 8.1059 11.6701 8.06686 11.7112 8.03939C11.7523 8.01192 11.8007 7.99725 11.8501 7.99725" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.8501 7.99725C11.9164 7.99725 11.98 8.02359 12.0269 8.07048C12.0738 8.11736 12.1001 8.18095 12.1001 8.24725" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',c='<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 124 30" fill="none"><path d="M103.284 3L121 3C122.657 3 124 1.65685 124 0L0 0C0 1.65685 1.34315 3 3 3L20.7157 3C26.0201 3 31.1071 5.10713 34.8579 8.85786L51.3934 25.3934C57.2513 31.2513 66.7487 31.2513 72.6066 25.3934L89.1421 8.85786C92.8929 5.10714 97.9799 3 103.284 3Z" fill="currentColor"/></svg>',e=({text:r="Hover me",iconType:i="info",heading:p="CSS Only Tooltip",body:s="Lorem ipsum dolor sit amet, consec adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",posX:d="center",posY:l="top"})=>`
  <div data-tooltip-hover class="tooltip">
    <span>${r}</span>
    <div data-tooltip-icon="${i}" class="tooltip__icon">
      ${a}
      <div data-tooltip-x="${d}" data-tooltip-y="${l}" class="tooltip__box">
        <div class="tooltip__box-inner">
          <div class="tooltip__card">
            <div class="tooltip__card-title">
              <h3 class="tooltip__card-heading">${p}</h3>
            </div>
            <div class="tooltip__card-text">
              <p class="tooltip__card-p">${s}</p>
            </div>
          </div>
          <div class="tooltip__tip">${c}</div>
        </div>
      </div>
    </div>
  </div>`,x={title:"Components/Tooltip",tags:["autodocs"],parameters:{layout:"centered"}},o={render:()=>`
    <div style="padding:200px 120px;font-size:16px;">
      ${e({text:"You can hover me"})}
    </div>`},t={render:()=>`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:120px;padding:240px 120px;font-size:16px;">
      <div style="text-align:center;">
        <p style="font-size:12px;color:#999;margin:0 0 8px;">Top center</p>
        ${e({text:"Hover me",posX:"center",posY:"top",heading:"Top center"})}
      </div>
      <div style="text-align:center;">
        <p style="font-size:12px;color:#999;margin:0 0 8px;">Bottom center</p>
        ${e({text:"Hover me",posX:"center",posY:"bottom",heading:"Bottom center"})}
      </div>
      <div style="text-align:center;">
        <p style="font-size:12px;color:#999;margin:0 0 8px;">Top left</p>
        ${e({text:"Hover me",posX:"left",posY:"top",heading:"Top left"})}
      </div>
      <div style="text-align:center;">
        <p style="font-size:12px;color:#999;margin:0 0 8px;">Top right</p>
        ${e({text:"Hover me",posX:"right",posY:"top",heading:"Top right"})}
      </div>
    </div>`},n={render:()=>`
    <div style="display:flex;gap:64px;padding:200px 80px;font-size:16px;">
      ${e({text:"Info icon",iconType:"info",heading:"Info"})}
      ${e({text:"Question icon",iconType:"question",heading:"Question"})}
      ${e({text:"Alert icon",iconType:"alert",heading:"Alert"})}
    </div>`};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <div style="padding:200px 120px;font-size:16px;">
      \${renderTooltip({
    text: 'You can hover me'
  })}
    </div>\`
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:120px;padding:240px 120px;font-size:16px;">
      <div style="text-align:center;">
        <p style="font-size:12px;color:#999;margin:0 0 8px;">Top center</p>
        \${renderTooltip({
    text: 'Hover me',
    posX: 'center',
    posY: 'top',
    heading: 'Top center'
  })}
      </div>
      <div style="text-align:center;">
        <p style="font-size:12px;color:#999;margin:0 0 8px;">Bottom center</p>
        \${renderTooltip({
    text: 'Hover me',
    posX: 'center',
    posY: 'bottom',
    heading: 'Bottom center'
  })}
      </div>
      <div style="text-align:center;">
        <p style="font-size:12px;color:#999;margin:0 0 8px;">Top left</p>
        \${renderTooltip({
    text: 'Hover me',
    posX: 'left',
    posY: 'top',
    heading: 'Top left'
  })}
      </div>
      <div style="text-align:center;">
        <p style="font-size:12px;color:#999;margin:0 0 8px;">Top right</p>
        \${renderTooltip({
    text: 'Hover me',
    posX: 'right',
    posY: 'top',
    heading: 'Top right'
  })}
      </div>
    </div>\`
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <div style="display:flex;gap:64px;padding:200px 80px;font-size:16px;">
      \${renderTooltip({
    text: 'Info icon',
    iconType: 'info',
    heading: 'Info'
  })}
      \${renderTooltip({
    text: 'Question icon',
    iconType: 'question',
    heading: 'Question'
  })}
      \${renderTooltip({
    text: 'Alert icon',
    iconType: 'alert',
    heading: 'Alert'
  })}
    </div>\`
}`,...n.parameters?.docs?.source}}};const g=["Playground","Positions","IconTypes"];export{n as IconTypes,o as Playground,t as Positions,g as __namedExportsOrder,x as default};
