const a='<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="13 15 8 10 13 5"/></svg>',i='<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="7 5 12 10 7 15"/></svg>',s='<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="11 15 6 10 11 5"/><polyline points="16 15 11 10 16 5"/></svg>',o='<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 5 14 10 9 15"/><polyline points="4 5 9 10 4 15"/></svg>',e='<svg class="pagination__select-icon" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="4 6 8 10 12 6"/></svg>',p={title:"Components/Pagination",tags:["autodocs"],parameters:{layout:"padded"}},n={render:()=>`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:24px;padding:32px 24px}
      .sb-preview{width:100%;max-width:640px}
      .sb-hint{font-size:11px;color:#9ca3af;text-align:center}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="pg-preview"></div>
      <p class="sb-hint">Click the arrows to navigate pages</p>
    </div>
    <script>
    (function(){
      let page=1, total=10, pageSize=10;
      const icons={chevronsLeft:${JSON.stringify(s)},chevronLeft:${JSON.stringify(a)},chevronRight:${JSON.stringify(i)},chevronsRight:${JSON.stringify(o)},selectChevron:${JSON.stringify(e)}};
      function render(){
        const isFirst=page===1,isLast=page===total;
        document.getElementById('pg-preview').innerHTML=\`
          <div class="pagination" data-pagination>
            <div class="pagination__left">
              <span class="pagination__label">Registros por página</span>
              <button class="pagination__select">\${pageSize} \${icons.selectChevron}</button>
            </div>
            <div class="pagination__center">Página <strong>\${page}</strong> de <strong>\${total}</strong></div>
            <div class="pagination__nav">
              <button class="pagination__nav-button" data-nav="first" \${isFirst?'disabled':''}><span class="pagination__nav-button-icon">\${icons.chevronsLeft}</span></button>
              <button class="pagination__nav-button" data-nav="prev" \${isFirst?'disabled':''}><span class="pagination__nav-button-icon">\${icons.chevronLeft}</span></button>
              <button class="pagination__nav-button" data-nav="next" \${isLast?'disabled':''}><span class="pagination__nav-button-icon">\${icons.chevronRight}</span></button>
              <button class="pagination__nav-button" data-nav="last" \${isLast?'disabled':''}><span class="pagination__nav-button-icon">\${icons.chevronsRight}</span></button>
            </div>
          </div>\`;
      }
      document.getElementById('pg-preview').addEventListener('click',e=>{
        const btn=e.target.closest('[data-nav]');
        if(!btn||btn.disabled)return;
        const action=btn.dataset.nav;
        if(action==='first')page=1;
        else if(action==='prev')page=Math.max(1,page-1);
        else if(action==='next')page=Math.min(total,page+1);
        else if(action==='last')page=total;
        render();
      });
      render();
    })();
    <\/script>`},t={render:()=>`
    <div style="max-width:640px;padding:16px;">
      <div class="pagination pagination--loading" data-pagination>
        <div class="pagination__left">
          <span class="pagination__label">Registros por página</span>
          <div class="pagination__select--skeleton"></div>
        </div>
        <div class="pagination__center"><div class="pagination__center--skeleton"></div></div>
        <div class="pagination__nav">
          <button class="pagination__nav-button" disabled><span class="pagination__nav-button-icon">${s}</span></button>
          <button class="pagination__nav-button" disabled><span class="pagination__nav-button-icon">${a}</span></button>
          <button class="pagination__nav-button" disabled><span class="pagination__nav-button-icon">${i}</span></button>
          <button class="pagination__nav-button" disabled><span class="pagination__nav-button-icon">${o}</span></button>
        </div>
      </div>
    </div>`};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <style>
      .sb-playground{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;gap:24px;padding:32px 24px}
      .sb-preview{width:100%;max-width:640px}
      .sb-hint{font-size:11px;color:#9ca3af;text-align:center}
    </style>
    <div class="sb-playground">
      <div class="sb-preview" id="pg-preview"></div>
      <p class="sb-hint">Click the arrows to navigate pages</p>
    </div>
    <script>
    (function(){
      let page=1, total=10, pageSize=10;
      const icons={chevronsLeft:\${JSON.stringify(chevronsLeft)},chevronLeft:\${JSON.stringify(chevronLeft)},chevronRight:\${JSON.stringify(chevronRight)},chevronsRight:\${JSON.stringify(chevronsRight)},selectChevron:\${JSON.stringify(selectChevron)}};
      function render(){
        const isFirst=page===1,isLast=page===total;
        document.getElementById('pg-preview').innerHTML=\\\`
          <div class="pagination" data-pagination>
            <div class="pagination__left">
              <span class="pagination__label">Registros por página</span>
              <button class="pagination__select">\\\${pageSize} \\\${icons.selectChevron}</button>
            </div>
            <div class="pagination__center">Página <strong>\\\${page}</strong> de <strong>\\\${total}</strong></div>
            <div class="pagination__nav">
              <button class="pagination__nav-button" data-nav="first" \\\${isFirst?'disabled':''}><span class="pagination__nav-button-icon">\\\${icons.chevronsLeft}</span></button>
              <button class="pagination__nav-button" data-nav="prev" \\\${isFirst?'disabled':''}><span class="pagination__nav-button-icon">\\\${icons.chevronLeft}</span></button>
              <button class="pagination__nav-button" data-nav="next" \\\${isLast?'disabled':''}><span class="pagination__nav-button-icon">\\\${icons.chevronRight}</span></button>
              <button class="pagination__nav-button" data-nav="last" \\\${isLast?'disabled':''}><span class="pagination__nav-button-icon">\\\${icons.chevronsRight}</span></button>
            </div>
          </div>\\\`;
      }
      document.getElementById('pg-preview').addEventListener('click',e=>{
        const btn=e.target.closest('[data-nav]');
        if(!btn||btn.disabled)return;
        const action=btn.dataset.nav;
        if(action==='first')page=1;
        else if(action==='prev')page=Math.max(1,page-1);
        else if(action==='next')page=Math.min(total,page+1);
        else if(action==='last')page=total;
        render();
      });
      render();
    })();
    <\/script>\`
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="max-width:640px;padding:16px;">
      <div class="pagination pagination--loading" data-pagination>
        <div class="pagination__left">
          <span class="pagination__label">Registros por página</span>
          <div class="pagination__select--skeleton"></div>
        </div>
        <div class="pagination__center"><div class="pagination__center--skeleton"></div></div>
        <div class="pagination__nav">
          <button class="pagination__nav-button" disabled><span class="pagination__nav-button-icon">\${chevronsLeft}</span></button>
          <button class="pagination__nav-button" disabled><span class="pagination__nav-button-icon">\${chevronLeft}</span></button>
          <button class="pagination__nav-button" disabled><span class="pagination__nav-button-icon">\${chevronRight}</span></button>
          <button class="pagination__nav-button" disabled><span class="pagination__nav-button-icon">\${chevronsRight}</span></button>
        </div>
      </div>
    </div>\`
}`,...t.parameters?.docs?.source}}};const c=["Playground","Loading"];export{t as Loading,n as Playground,c as __namedExportsOrder,p as default};
