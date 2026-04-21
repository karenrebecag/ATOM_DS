const d='<button data-modal-close class="modal__close"><div class="modal__close-bar"></div><div class="modal__close-bar is--second"></div></button>',m='<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><circle cx="12" cy="12" r="10" fill="#f1b100"/><path d="M12 8v4m0 4h.01" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>',c='<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><circle cx="12" cy="12" r="10" fill="#e7000b"/><path d="M12 8v4m0 4h.01" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>',a='<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><circle cx="12" cy="12" r="10" fill="#f60"/><path d="M8 12l3 3 5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',t=(n,o,r)=>`
  <div data-modal-name="${n}" data-modal-status="not-active" class="modal__card modal__card--${o}">
    <div class="modal__scroll">
      <div class="modal__content">${r}</div>
    </div>
    ${d}
  </div>`,s=(n,o)=>`
  <button data-modal-target="${n}" data-modal-status="not-active" class="button button--m button--secondary">${o}</button>`,_={title:"Components/Dialog",tags:["autodocs"],parameters:{layout:"centered"}},l={render:()=>`
    <div data-modal-group-status="not-active" class="modal">
      <div data-modal-close class="modal__backdrop"></div>

      ${t("confirm","s",`
        <h2 class="modal__heading" data-text-animate="masked-chars" data-text-trigger="load">Confirmar acción</h2>
        <p class="modal__text">¿Estás seguro de que deseas desactivar las llamadas salientes?</p>
      `)}

      ${t("warning","s",`
        <h2 class="modal__heading" data-text-animate="masked-chars" data-text-trigger="load">Desactivar llamadas</h2>
        <div class="modal__alert modal__alert--warning">
          ${m}
          <p class="modal__alert-text">Esta acción afectará la configuración actual del canal.</p>
        </div>
        <p class="modal__text">¿Estás seguro de que deseas desactivar las llamadas salientes?</p>
      `)}

      ${t("delete","s",`
        <h2 class="modal__heading" data-text-animate="masked-chars" data-text-trigger="load">Eliminar carpeta</h2>
        <div class="modal__alert modal__alert--danger">
          ${c}
          <p class="modal__alert-text">Esta acción eliminará todos los archivos contenidos y no se puede deshacer.</p>
        </div>
        <p class="modal__text">¿Estás seguro de que deseas eliminar esta carpeta?</p>
        <div>
          <p class="modal__section-title">Elementos que se eliminarán:</p>
          <ul style="list-style:none;padding:0;margin:4px 0 0;display:flex;flex-direction:column;gap:4px;">
            <li class="bullet-item">documento1.pdf</li>
            <li class="bullet-item">imagen.jpg</li>
            <li class="bullet-item">subcarpeta/archivo.txt</li>
          </ul>
        </div>
      `)}

      ${t("permissions","m",`
        <div class="modal__callout">
          <p class="modal__callout-title">Consideraciones</p>
          <div class="modal__callout-text">
            <ul style="margin:0 0 0 18px;padding:0;">
              <li>Con la sincronización activada, los cambios en los clientes se reflejarán bidireccionalmente en ambas plataformas.</li>
              <li>Los tickets y deals creados pertenecerán al usuario que otorgó el permiso.</li>
            </ul>
          </div>
        </div>
        <div>
          <p class="modal__section-title">Atom podrá:</p>
          <div class="modal__list" style="margin-top:8px;">
            <div class="modal__list-item"><span class="modal__list-item-icon">${a}</span><span class="modal__list-item-text">Administrar y ver tus contactos del CRM</span></div>
            <div class="modal__list-item"><span class="modal__list-item-icon">${a}</span><span class="modal__list-item-text">Administrar y ver tus workflows</span></div>
            <div class="modal__list-item"><span class="modal__list-item-icon">${a}</span><span class="modal__list-item-text">Autorizar peticiones entre plataformas</span></div>
            <div class="modal__list-item"><span class="modal__list-item-icon">${a}</span><span class="modal__list-item-text">Administrar y ver tus tickets</span></div>
            <div class="modal__list-item"><span class="modal__list-item-icon">${a}</span><span class="modal__list-item-text">Administrar y ver tus conversaciones</span></div>
            <div class="modal__list-item"><span class="modal__list-item-icon">${a}</span><span class="modal__list-item-text">Sincronizar datos entre plataformas</span></div>
          </div>
        </div>
      `)}
    </div>

    <div style="display:flex;flex-wrap:wrap;gap:12px;">
      ${s("confirm","Confirmación")}
      ${s("warning","Warning")}
      ${s("delete","Delete")}
      ${s("permissions","Permisos")}
    </div>`},e={render:()=>`
    <div data-modal-group-status="not-active" class="modal">
      <div data-modal-close class="modal__backdrop"></div>
      <div data-modal-name="actions" data-modal-status="not-active" class="modal__card modal__card--s">
        <div class="modal__scroll">
          <div class="modal__content">
            <h2 class="modal__heading" data-text-animate="masked-chars" data-text-trigger="load">Confirmar acción</h2>
            <p class="modal__text">¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer.</p>
          </div>
        </div>
        <div class="dialog-actions dialog-actions--fill" style="padding:var(--m);">
          <button data-modal-close class="button button--m button--secondary">Cancelar</button>
          <button class="button button--m button--primary">Confirmar</button>
        </div>
        ${d}
      </div>
    </div>
    ${s("actions","Con acciones")}`},i={name:"Delete + Actions",render:()=>`
    <div data-modal-group-status="not-active" class="modal">
      <div data-modal-close class="modal__backdrop"></div>
      <div data-modal-name="danger" data-modal-status="not-active" class="modal__card modal__card--s">
        <div class="modal__scroll">
          <div class="modal__content">
            <div class="modal__alert modal__alert--danger">
              ${c}
              <p class="modal__alert-text">Esta acción eliminará el registro permanentemente.</p>
            </div>
            <p class="modal__text">¿Estás seguro de que deseas eliminar este contacto?</p>
          </div>
        </div>
        <div class="dialog-actions dialog-actions--fill" style="padding:var(--m);">
          <button data-modal-close class="button button--m button--secondary">Cancelar</button>
          <button class="button button--m button--danger-primary">Eliminar</button>
        </div>
        ${d}
      </div>
    </div>
    ${s("danger","Eliminar contacto")}`};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <div data-modal-group-status="not-active" class="modal">
      <div data-modal-close class="modal__backdrop"></div>

      \${wrapModal('confirm', 's', \`
        <h2 class="modal__heading" data-text-animate="masked-chars" data-text-trigger="load">Confirmar acción</h2>
        <p class="modal__text">¿Estás seguro de que deseas desactivar las llamadas salientes?</p>
      \`)}

      \${wrapModal('warning', 's', \`
        <h2 class="modal__heading" data-text-animate="masked-chars" data-text-trigger="load">Desactivar llamadas</h2>
        <div class="modal__alert modal__alert--warning">
          \${warningIcon}
          <p class="modal__alert-text">Esta acción afectará la configuración actual del canal.</p>
        </div>
        <p class="modal__text">¿Estás seguro de que deseas desactivar las llamadas salientes?</p>
      \`)}

      \${wrapModal('delete', 's', \`
        <h2 class="modal__heading" data-text-animate="masked-chars" data-text-trigger="load">Eliminar carpeta</h2>
        <div class="modal__alert modal__alert--danger">
          \${dangerIcon}
          <p class="modal__alert-text">Esta acción eliminará todos los archivos contenidos y no se puede deshacer.</p>
        </div>
        <p class="modal__text">¿Estás seguro de que deseas eliminar esta carpeta?</p>
        <div>
          <p class="modal__section-title">Elementos que se eliminarán:</p>
          <ul style="list-style:none;padding:0;margin:4px 0 0;display:flex;flex-direction:column;gap:4px;">
            <li class="bullet-item">documento1.pdf</li>
            <li class="bullet-item">imagen.jpg</li>
            <li class="bullet-item">subcarpeta/archivo.txt</li>
          </ul>
        </div>
      \`)}

      \${wrapModal('permissions', 'm', \`
        <div class="modal__callout">
          <p class="modal__callout-title">Consideraciones</p>
          <div class="modal__callout-text">
            <ul style="margin:0 0 0 18px;padding:0;">
              <li>Con la sincronización activada, los cambios en los clientes se reflejarán bidireccionalmente en ambas plataformas.</li>
              <li>Los tickets y deals creados pertenecerán al usuario que otorgó el permiso.</li>
            </ul>
          </div>
        </div>
        <div>
          <p class="modal__section-title">Atom podrá:</p>
          <div class="modal__list" style="margin-top:8px;">
            <div class="modal__list-item"><span class="modal__list-item-icon">\${checkIcon}</span><span class="modal__list-item-text">Administrar y ver tus contactos del CRM</span></div>
            <div class="modal__list-item"><span class="modal__list-item-icon">\${checkIcon}</span><span class="modal__list-item-text">Administrar y ver tus workflows</span></div>
            <div class="modal__list-item"><span class="modal__list-item-icon">\${checkIcon}</span><span class="modal__list-item-text">Autorizar peticiones entre plataformas</span></div>
            <div class="modal__list-item"><span class="modal__list-item-icon">\${checkIcon}</span><span class="modal__list-item-text">Administrar y ver tus tickets</span></div>
            <div class="modal__list-item"><span class="modal__list-item-icon">\${checkIcon}</span><span class="modal__list-item-text">Administrar y ver tus conversaciones</span></div>
            <div class="modal__list-item"><span class="modal__list-item-icon">\${checkIcon}</span><span class="modal__list-item-text">Sincronizar datos entre plataformas</span></div>
          </div>
        </div>
      \`)}
    </div>

    <div style="display:flex;flex-wrap:wrap;gap:12px;">
      \${trigger('confirm', 'Confirmación')}
      \${trigger('warning', 'Warning')}
      \${trigger('delete', 'Delete')}
      \${trigger('permissions', 'Permisos')}
    </div>\`
}`,...l.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => /* html */\`
    <div data-modal-group-status="not-active" class="modal">
      <div data-modal-close class="modal__backdrop"></div>
      <div data-modal-name="actions" data-modal-status="not-active" class="modal__card modal__card--s">
        <div class="modal__scroll">
          <div class="modal__content">
            <h2 class="modal__heading" data-text-animate="masked-chars" data-text-trigger="load">Confirmar acción</h2>
            <p class="modal__text">¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer.</p>
          </div>
        </div>
        <div class="dialog-actions dialog-actions--fill" style="padding:var(--m);">
          <button data-modal-close class="button button--m button--secondary">Cancelar</button>
          <button class="button button--m button--primary">Confirmar</button>
        </div>
        \${closeBtn}
      </div>
    </div>
    \${trigger('actions', 'Con acciones')}\`
}`,...e.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Delete + Actions',
  render: () => /* html */\`
    <div data-modal-group-status="not-active" class="modal">
      <div data-modal-close class="modal__backdrop"></div>
      <div data-modal-name="danger" data-modal-status="not-active" class="modal__card modal__card--s">
        <div class="modal__scroll">
          <div class="modal__content">
            <div class="modal__alert modal__alert--danger">
              \${dangerIcon}
              <p class="modal__alert-text">Esta acción eliminará el registro permanentemente.</p>
            </div>
            <p class="modal__text">¿Estás seguro de que deseas eliminar este contacto?</p>
          </div>
        </div>
        <div class="dialog-actions dialog-actions--fill" style="padding:var(--m);">
          <button data-modal-close class="button button--m button--secondary">Cancelar</button>
          <button class="button button--m button--danger-primary">Eliminar</button>
        </div>
        \${closeBtn}
      </div>
    </div>
    \${trigger('danger', 'Eliminar contacto')}\`
}`,...i.parameters?.docs?.source}}};const p=["Playground","WithActions","DangerWithActions"];export{i as DangerWithActions,l as Playground,e as WithActions,p as __namedExportsOrder,_ as default};
