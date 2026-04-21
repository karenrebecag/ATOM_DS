const i={title:"Components/Skeleton",tags:["autodocs"],parameters:{layout:"padded"}},s=`
  @keyframes skeleton-pulse{0%,100%{opacity:1}50%{opacity:var(--skeleton-pulse-opacity,.4)}}`,e={render:()=>`
    <style>${s}
      .sk-card{border:1px solid var(--border-secondary,#e4e4e7);border-radius:var(--skeleton-radius-card,8px);padding:var(--skeleton-card-padding,16px);display:flex;flex-direction:column;gap:var(--skeleton-card-gap,12px);max-width:360px}
      .sk-avatar{width:var(--skeleton-avatar-size,48px);height:var(--skeleton-avatar-size,48px);border-radius:var(--skeleton-radius-circle,50%);background:var(--skeleton-bg,#e4e4e7);animation:skeleton-pulse var(--skeleton-pulse-duration,1.5s) var(--skeleton-pulse-easing,ease-in-out) infinite;flex-shrink:0}
      .sk-heading{height:var(--skeleton-heading-h,16px);width:60%;border-radius:var(--skeleton-radius-line,4px);background:var(--skeleton-bg,#e4e4e7);animation:skeleton-pulse var(--skeleton-pulse-duration,1.5s) var(--skeleton-pulse-easing,ease-in-out) infinite}
      .sk-btn{height:var(--skeleton-btn-h,32px);width:var(--skeleton-btn-w,80px);border-radius:var(--skeleton-radius-btn,6px);background:var(--skeleton-bg,#e4e4e7);animation:skeleton-pulse var(--skeleton-pulse-duration,1.5s) var(--skeleton-pulse-easing,ease-in-out) infinite}
      .sk-line{height:var(--skeleton-line-height,12px);border-radius:var(--skeleton-radius-line,4px);background:var(--skeleton-bg,#e4e4e7);animation:skeleton-pulse var(--skeleton-pulse-duration,1.5s) var(--skeleton-pulse-easing,ease-in-out) infinite}
      .sk-row{display:flex;align-items:center;gap:12px}
      .sk-lines{display:flex;flex-direction:column;gap:8px;flex:1}
    </style>
    <div style="display:flex;flex-direction:column;gap:24px;max-width:360px;">
      <p style="font-size:12px;color:#999;margin:0;">Card skeleton</p>
      <div class="sk-card">
        <div class="sk-row">
          <div class="sk-avatar"></div>
          <div class="sk-lines">
            <div class="sk-heading"></div>
            <div class="sk-line" style="width:40%"></div>
          </div>
        </div>
        <div class="sk-lines">
          <div class="sk-line" style="width:100%"></div>
          <div class="sk-line" style="width:90%"></div>
          <div class="sk-line" style="width:75%"></div>
        </div>
        <div class="sk-btn"></div>
      </div>
      <p style="font-size:12px;color:#999;margin:0;">Text lines</p>
      <div class="sk-lines" style="max-width:300px">
        <div class="sk-line" style="width:100%"></div>
        <div class="sk-line" style="width:90%"></div>
        <div class="sk-line" style="width:75%"></div>
        <div class="sk-line" style="width:85%"></div>
        <div class="sk-line" style="width:60%"></div>
      </div>
      <p style="font-size:12px;color:#999;margin:0;">Avatar + heading</p>
      <div class="sk-row">
        <div class="sk-avatar" style="width:32px;height:32px"></div>
        <div class="sk-heading" style="width:120px"></div>
      </div>
    </div>`};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>\${pulse}
      .sk-card{border:1px solid var(--border-secondary,#e4e4e7);border-radius:var(--skeleton-radius-card,8px);padding:var(--skeleton-card-padding,16px);display:flex;flex-direction:column;gap:var(--skeleton-card-gap,12px);max-width:360px}
      .sk-avatar{width:var(--skeleton-avatar-size,48px);height:var(--skeleton-avatar-size,48px);border-radius:var(--skeleton-radius-circle,50%);background:var(--skeleton-bg,#e4e4e7);animation:skeleton-pulse var(--skeleton-pulse-duration,1.5s) var(--skeleton-pulse-easing,ease-in-out) infinite;flex-shrink:0}
      .sk-heading{height:var(--skeleton-heading-h,16px);width:60%;border-radius:var(--skeleton-radius-line,4px);background:var(--skeleton-bg,#e4e4e7);animation:skeleton-pulse var(--skeleton-pulse-duration,1.5s) var(--skeleton-pulse-easing,ease-in-out) infinite}
      .sk-btn{height:var(--skeleton-btn-h,32px);width:var(--skeleton-btn-w,80px);border-radius:var(--skeleton-radius-btn,6px);background:var(--skeleton-bg,#e4e4e7);animation:skeleton-pulse var(--skeleton-pulse-duration,1.5s) var(--skeleton-pulse-easing,ease-in-out) infinite}
      .sk-line{height:var(--skeleton-line-height,12px);border-radius:var(--skeleton-radius-line,4px);background:var(--skeleton-bg,#e4e4e7);animation:skeleton-pulse var(--skeleton-pulse-duration,1.5s) var(--skeleton-pulse-easing,ease-in-out) infinite}
      .sk-row{display:flex;align-items:center;gap:12px}
      .sk-lines{display:flex;flex-direction:column;gap:8px;flex:1}
    </style>
    <div style="display:flex;flex-direction:column;gap:24px;max-width:360px;">
      <p style="font-size:12px;color:#999;margin:0;">Card skeleton</p>
      <div class="sk-card">
        <div class="sk-row">
          <div class="sk-avatar"></div>
          <div class="sk-lines">
            <div class="sk-heading"></div>
            <div class="sk-line" style="width:40%"></div>
          </div>
        </div>
        <div class="sk-lines">
          <div class="sk-line" style="width:100%"></div>
          <div class="sk-line" style="width:90%"></div>
          <div class="sk-line" style="width:75%"></div>
        </div>
        <div class="sk-btn"></div>
      </div>
      <p style="font-size:12px;color:#999;margin:0;">Text lines</p>
      <div class="sk-lines" style="max-width:300px">
        <div class="sk-line" style="width:100%"></div>
        <div class="sk-line" style="width:90%"></div>
        <div class="sk-line" style="width:75%"></div>
        <div class="sk-line" style="width:85%"></div>
        <div class="sk-line" style="width:60%"></div>
      </div>
      <p style="font-size:12px;color:#999;margin:0;">Avatar + heading</p>
      <div class="sk-row">
        <div class="sk-avatar" style="width:32px;height:32px"></div>
        <div class="sk-heading" style="width:120px"></div>
      </div>
    </div>\`
}`,...e.parameters?.docs?.source}}};const a=["Playground"];export{e as Playground,a as __namedExportsOrder,i as default};
