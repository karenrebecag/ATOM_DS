# Component Tokens

**Qué:** Design tokens específicos de componentes (W3C DTCG format)
**Estructura:** Espejo de componentes UI, CSS, y animations
**Cuándo:** Tokens que pertenecen exclusivamente a un componente específico

---

## 📁 Estructura de Carpetas

```
components/
├── buttons/
│   ├── button.json          # 6 variantes × 6 estados (enabled, hovered, focused, disabled, pressed, loading)
│   └── link-button.json     # Link button variant
├── forms/
│   ├── checkbox.json
│   ├── radio.json
│   └── toggle.json
├── indicators/
│   ├── badge.json
│   ├── chip.json
│   ├── skeleton.json
│   ├── spinner.json
│   ├── status-icon.json
│   └── tag.json
├── layout/
│   ├── divider.json
│   └── layout.json
├── media/
│   └── avatar.json
└── effects/
    └── glass.json
```

---

## 🎯 Nivel de Detalle

Los component tokens del proyecto son **mucho más completos** que los tokens básicos de Figma:

### Figma (Básico)
```yaml
theme.button.primary.background: "{accent.default}"
theme.button.borderRadius: "{borderRadius.lg}"
theme.card.borderRadius: "{borderRadius.lg}"
```

### Proyecto ATOM (Production-Ready)
```json
"buttons": {
  "bg": {
    "primary-enabled": "{bg.inverse.primary}",
    "primary-hovered": "{bg.inverse.secondary}",
    "primary-focused": "{bg.inverse.primary}",
    "primary-disabled": "{bg.disabled}",
    "primary-pressed": "{bg.inverse.secondary}",
    "primary-loading": "{bg.inverse.primary}",
    // + secondary, tertiary, danger-primary, danger-secondary, danger-tertiary, link
  },
  "fg": { /* 6 variantes × 6 estados */ },
  "border": { /* Estados focused para cada variante */ },
  "shadow": { /* focus, focus-danger, focus-link */ }
}
```

**Diferencia:** El proyecto tiene **6 variantes × 6 estados × 3 propiedades** = 108 tokens solo para buttons.

---

## ⭐ Tokens Exclusivos del Proyecto

Estos tokens **NO existen en Figma** y son específicos de casos de uso reales:

### 1. Estados Interactivos Completos
- `enabled`, `hovered`, `focused`, `disabled`, `pressed`, `loading`
- Implementados para TODOS los componentes interactivos

### 2. Variantes Danger
- `danger-primary`, `danger-secondary`, `danger-tertiary`
- Estados destructivos con colores de error

### 3. Casos de Uso Específicos
Definidos en `semantic/colors.json`:
- **Inbox:** `bg.accent.inbox.new`, `inbox.active`, `inbox.reassigned`, `inbox.return`, `inbox.typification`
- **Notifications:** `bg.accent.notifications.primary`, `notifications.secondary`
- **AI Features:** `bg.accent.ai.primary`, `ai.secondary`, `ai.tertiary`
- **Indicators:** `fg.accent.indicators.online`, `offline`, `idle`, `inactive`

### 4. Glass Effects
- `glass.json` con tokens de backdrop-filter y transparencias
- No existe en Figma

---

## 📚 Referencias

- Ver análisis completo: `packages/tokens/TOKENS_SYNC_ANALYSIS.md`
- Tokens foundation: `foundation/README.md`
- Tokens semantic: `semantic/README.md`
- Sincronización Figma: `FIGMA_SYNC.md`
