# Análisis de Sincronización: Tokens Figma vs Proyecto

**Fecha:** 2026-04-16
**Proyecto:** ATOM Design System
**Objetivo:** Identificar diferencias entre tokens de Figma y tokens implementados en el proyecto

---

## 📊 Resumen Ejecutivo

| Categoría | Estado | Tokens Figma | Tokens Proyecto | Acción |
|-----------|--------|--------------|-----------------|--------|
| Colors Primitive | ✅ Match 100% | 18 paletas | 18 paletas + Alpha | Ninguna |
| Spacing | ✅ Match 100% | none-17xxl | none-17xxl | Ninguna |
| Radius | ✅ Match 100% | none-5xxl + pill | none-5xxl + pill + circle | Ninguna |
| Opacity | ✅ Equivalente | 10-90% (9 valores) | 0-100 (13 valores) | Ninguna |
| Typography Sizes | ✅ Match valores | displayXL-footnote | DisplayXL-Footnote | Ninguna |
| Breakpoints | ⚠️ Parcial | Con metadata UI | Sin metadata UI | **Agregar metadata** |
| ParagraphSpacing | ❌ Falta | h1: 32px, h2: 26px | No existe | **Agregar** |
| Semantic Colors | ⭐ Más avanzado | Simple (fg, bg, accent) | Complejo (estados + casos de uso) | **Documentar** |
| Component Tokens | ⭐ Más avanzado | Simple (button, card) | Completo (6 variantes × 6 estados) | **Documentar** |

---

## ✅ TOKENS QUE COINCIDEN PERFECTAMENTE

### 1. Colors/Hex Primitive
**Figma:** 18 paletas de colores (Stone, Neutral, Zinc, Gray, Rose, Pink, Fuchsia, Purple, Violet, Indigo, Blue, Sky, Cyan, Teal, Esmerald, Yellow, Lime, Amber, Orange, Red, Green)

**Proyecto:** `foundation/colors.json`
- ✅ Todas las 18 paletas implementadas
- ✅ Valores hexadecimales idénticos
- ➕ Bonus: Paleta "Alpha" adicional (rgba con transparencia)

**Conclusión:** No se requiere acción. El proyecto está sincronizado y mejorado.

---

### 2. Spacing/Mode 1
**Figma:** Escala de spacing (none: 0, xxs: 2, xs: 4, s: 8, sm: 12... hasta 17xxl: 100)

**Proyecto:** `foundation/spacing.json` → `Primitive.Spacing`
- ✅ Todos los valores coinciden exactamente
- ➕ Bonus: Incluye `Primitive.Stroke` adicional

**Conclusión:** No se requiere acción.

---

### 3. Radius/Mode 1
**Figma:** Escala de radius (none: 0, xxs: 2, xs: 4... hasta 5xxl: 52, pill: 1000)

**Proyecto:** `foundation/borders.json` → `Primitive.Radius`
- ✅ Todos los valores coinciden
- ➕ Bonus: `circle: 50%` y `RadiusEm` con valores en em

**Conclusión:** No se requiere acción.

---

### 4. Stroke/Mode 1
**Figma:** none: 0, stroke-xs: 1, stoke-s: 2 (typo en Figma)

**Proyecto:** `foundation/borders.json` → `Primitive.Stroke`
- ✅ Incluye xs: 1px, s: 2px
- ➕ Más completo: 2xs: 0.5px, m: 4px

**Conclusión:** El proyecto es más robusto. No se requiere acción.

---

### 5. Opacity/Mode 1
**Figma:** 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%

**Proyecto:** `foundation/opacity.json` → `Primitive.Opacity`
- ✅ Equivalente (formato decimal): 0.1, 0.2, 0.3... 0.9
- ➕ Más completo: 0, 0.25, 0.75, 1 (13 valores vs 9)

**Conclusión:** Formato diferente pero equivalente. No se requiere acción.

---

### 6. Typography Font Sizes
**Figma:** displayXL: 72, displayL: 64, displayM: 56... body: 20, caption: 16, label: 12

**Proyecto:** `foundation/typography.json` → `Primitive.Size`
- ✅ Todos los valores coinciden (en rem con descripción en px)

**Ejemplo:**
```json
// Figma: displayXL: 72
// Proyecto: "DisplayXL": { "$value": "4.5rem", "$description": "72px" }
```

**Conclusión:** No se requiere acción.

---

### 7. Typography Font Families
**Figma:** heading: Inter, body: Roboto

**Proyecto:** `foundation/typography.json` → `Primitive.Font`
```json
"Display": { "$value": "Inter, -apple-system..." },
"Body": { "$value": "Inter, -apple-system..." }
```

**Diferencia:** Proyecto usa Inter para ambos (más consistente). Figma sugiere Roboto para body.

**Conclusión:** Diferencia intencional de diseño. Documentar.

---

### 8. Typography Font Weights
**Figma:** headingRegular, headingBold, bodyRegular, bodyBold

**Proyecto:** `Primitive.Weight` → Regular: 400, Medium: 500, Bold: 700

**Conclusión:** Equivalente. Proyecto más simple y reutilizable.

---

### 9. Typography Line Heights
**Figma:**
- Absolute: 3xxs: 8, 2xxs: 12... 5xxl: 96
- Percentage: heading: 110%, body: 140%

**Proyecto:** `Primitive.LineHeight`
- Absolute: DisplayXL: 88px... Footnote: 16px
- Ratios: None: 1, Tight: 1.1, Snug: 1.25, Normal: 1.3, Relaxed: 1.5, Loose: 1.8

**Diferencia:** Figma usa percentages, proyecto usa ratios. Ambos equivalentes.

**Conclusión:** Approach diferente pero válido. Documentar.

---

## ⚠️ TOKENS CON DIFERENCIAS ESTRUCTURALES

### 10. Core Dimension con Math Expressions
**Figma:**
```yaml
dimension.scale: 2
dimension.xs: 4
dimension.sm: "{dimension.xs} * {dimension.scale}"  # = 8
dimension.md: "{dimension.sm} * {dimension.scale}"  # = 16
```

**Proyecto:** Valores ya calculados directamente
```json
"xs": { "$value": "4px" },
"sm": { "$value": "8px" },
"md": { "$value": "16px" }
```

**Diferencia:** Figma usa math expressions (educativo), proyecto usa valores finales (performant).

**Conclusión:** El approach del proyecto es correcto para producción. No cambiar.

---

### 11. BorderRadius Multi-Value
**Figma:**
```yaml
borderRadius.multi-value: "{borderRadius.sm} {borderRadius.lg}"  # "4px 8px"
```

**Proyecto:** No tiene ejemplo de multi-value

**Acción:** AGREGAR ejemplo educativo (opcional, no crítico)

---

### 12. Letter Spacing
**Figma:** default: 0, increased: 150%, decreased: -5%

**Proyecto:** `Primitive.Tracking` en em
```json
"Normal": { "$value": "-0.02em" },
"Wide": { "$value": "0" },
"Wider": { "$value": "0.02em" }
```

**Diferencia:** Figma usa percentages, proyecto usa em (más preciso para CSS).

**Conclusión:** Documentar diferencia de approach.

---

## ❌ TOKENS DE FIGMA QUE FALTAN EN PROYECTO

### 13. ParagraphSpacing ⭐ AGREGAR
**Figma:**
```yaml
paragraphSpacing.h1: 32
paragraphSpacing.h2: 26
```

**Proyecto:** No existe

**Acción:** Agregar a `foundation/typography.json`
```json
"ParagraphSpacing": {
  "$type": "dimension",
  "H1": { "$value": "32px" },
  "H2": { "$value": "26px" },
  "Body": { "$value": "16px" }
}
```

---

### 14. Breakpoints con Metadata UI ⭐ AGREGAR
**Figma:**
```yaml
Breakpoints/Large:
  breakpoint-base: 1280
  padding: 120
  menu-icon: false
  menu-buttons: true

Breakpoints/Medium:
  breakpoint-base: 1024
  padding: 88
  menu-icon: false
  menu-buttons: true
```

**Proyecto:** `foundation/breakpoints.json` tiene valores pero SIN metadata UI

**Acción:** Agregar metadata
```json
"UIMetadata": {
  "$description": "UI behavior configuration per breakpoint (from Figma)",
  "Large": {
    "padding": { "$value": "120px", "$type": "dimension" },
    "menu-icon": { "$value": false, "$type": "boolean" },
    "menu-buttons": { "$value": true, "$type": "boolean" }
  }
  // ... Medium, Small, xSmall
}
```

---

### 15. Core Colors Básicos (Opcional)
**Figma:** Tiene paletas simples de 9 valores (gray.100-900, red.100-900...)

**Proyecto:** Tiene paletas completas de 11 valores (50-950)

**Conclusión:** El proyecto es más completo. Figma parece usar ejemplos educativos de Chakra UI.

**Acción:** No agregar. Documentar que proyecto es más avanzado.

---

### 16. BoxShadow Composite Token (Experimental)
**Figma:**
```yaml
boxShadow.default:
  - x: 5, y: 5, spread: 3, color: "rgba({shadows.default}, 0.15)", blur: 5, type: dropShadow
  - x: 4, y: 4, spread: 6, color: "#00000033", blur: 5, type: innerShadow
```

**Proyecto:** Tiene `Primitive.Elevation` con sombras simples
```json
"card": { "$value": "0px 2px 4px rgba(9, 9, 11, 0.08)" }
```

**Conclusión:** Figma usa feature experimental de Tokens Studio (múltiples sombras en un token).
Proyecto usa approach estándar W3C DTCG.

**Acción:** Documentar diferencia. No implementar (no estándar).

---

### 17. Typography Composite Tokens (Experimental)
**Figma:**
```yaml
typography.H1.Bold:
  fontFamily: "{fontFamilies.heading}"
  fontWeight: "{fontWeights.headingBold}"
  lineHeight: "{lineHeights.heading}"
  fontSize: "{fontSizes.h1}"
  paragraphSpacing: "{paragraphSpacing.h1}"
  letterSpacing: "{letterSpacing.decreased}"
```

**Proyecto:** Tokens separados, NO composite

**Conclusión:** Composite typography tokens NO están en spec W3C DTCG oficial.
Proyecto sigue approach estándar (tokens atómicos).

**Acción:** Documentar. No implementar.

---

## ⭐ TOKENS EXCLUSIVOS DEL PROYECTO (MÁS AVANZADOS)

### 18. Semantic Colors Avanzados
**Proyecto tiene estructura mucho más completa:**

```json
"bg": {
  "primary", "secondary", "tertiary", "quaternary", "disabled",
  "inverse": { "primary", "secondary", "tertiary" },
  "soft": { "primary", "secondary", "tertiary" },
  "status": { "info", "success", "warning", "error", "neutral", "brand", "ai" },
  "interactive": {
    "primary": { "hovered", "pressed" },
    "secondary": { "hovered", "pressed" },
    "link": { "hovered", "pressed" },
    "danger": { /* 3 variantes × 4 estados */ },
    "item": { "enabled", "hovered", "disabled", "pressed", "selected": { /* 4 estados */ } }
  },
  "accent": {
    "ai": { "primary", "secondary", "tertiary" },
    "inbox": { "new", "active", "reassigned", "return", "typification", "bubble": { "sent", "received" } },
    "notifications": { "primary", "secondary" }
  }
}
```

**Figma solo tiene:** fg.default, bg.default, accent.default, shadows.default

**Conclusión:** El proyecto tiene casos de uso reales (inbox, AI, notifications, estados interactivos).
Figma tiene estructura educativa/básica.

---

### 19. Component Tokens Completos
**Proyecto:** `components/buttons/button.json`
- 6 variantes × 6 estados (enabled, hovered, focused, disabled, pressed, loading)
- 3 propiedades (bg, fg, border) + shadows

**Figma:** theme.button.primary.background, theme.button.borderRadius

**Conclusión:** Proyecto tiene implementación production-ready completa.

---

### 20. Motion System
**Proyecto:** `foundation/motion.json`
- Easing curves (default, standard)
- Duration scale (quarter: 150ms, half: 300ms... shimmer: 1500ms)

**Figma:** No tiene motion tokens

---

### 21. Z-Index System
**Proyecto:** `foundation/z-index.json`
- Stack completo: base(0), dropdown(100), sticky(200)... dialogBackdrop(10000), dialog(10001)

**Figma:** No tiene z-index tokens

---

### 22. Elevation System
**Proyecto:** `foundation/elevations.json`
- card, popover, dialog shadows

**Figma:** Solo boxShadow.default experimental

---

### 23. Glass Effects
**Proyecto:** `foundation/glass.json` + `semantic/glass.json` + `components/effects/glass.json`

**Figma:** No tiene glass effects

---

### 24. Semantic Spacing Avanzado
**Proyecto:** `semantic/spacing.json`
- gap (xxl-xxs en em)
- padding (xl-container en em)
- btn-height, input-height, nav-bar-height
- icon sizes (xs-l)
- dialog-width, content-width
- aspect ratios (square, video, landscape, portrait, wide)

**Figma:** Solo spacing básico

---

## 🎯 PLAN DE ACCIÓN

### Fase 1: Agregar tokens faltantes de Figma ✅

1. **ParagraphSpacing** → Agregar a `foundation/typography.json`
2. **Breakpoints metadata** → Agregar a `foundation/breakpoints.json`
3. **(Opcional) BorderRadius multi-value** → Agregar ejemplo

### Fase 2: Documentación 📝

1. Actualizar `packages/tokens/src/components/README.md`
2. Crear `packages/tokens/FIGMA_SYNC.md` documentando:
   - Tokens que coinciden ✅
   - Tokens con approach diferente ⚠️
   - Tokens exclusivos del proyecto ⭐
   - Tokens experimentales de Figma no implementados ❌
3. Actualizar `themes/dark/colors.json` README explicando estructura

### Fase 3: Validación ✅

1. Run `node scripts/validate-tokens.js`
2. Run `pnpm build` en tokens package
3. Verificar outputs CSS/SCSS/JS

---

## 📋 RESUMEN DE DIFERENCIAS CLAVE

| Aspecto | Figma | Proyecto | Ganador |
|---------|-------|----------|---------|
| **Completitud** | Básico/educativo | Producción completa | 🏆 Proyecto |
| **Math expressions** | Sí (dimension) | No (valores finales) | 🏆 Proyecto (performance) |
| **Semantic tokens** | Simple (3 niveles) | Avanzado (casos de uso reales) | 🏆 Proyecto |
| **Component tokens** | Básico | Completo (6 variantes × 6 estados) | 🏆 Proyecto |
| **Motion/Animation** | No | Sí | 🏆 Proyecto |
| **Z-Index** | No | Sí | 🏆 Proyecto |
| **Glass effects** | No | Sí | 🏆 Proyecto |
| **Breakpoints metadata** | Sí (UI behavior) | No | 🏆 Figma |
| **ParagraphSpacing** | Sí | No | 🏆 Figma |
| **Experimental features** | Sí (composite tokens) | No (estándar W3C) | 🏆 Proyecto (spec compliance) |

**Conclusión general:** El proyecto está MUCHO MÁS AVANZADO que los tokens de Figma.
Figma parece tener ejemplos educativos de Tokens Studio, no el design system completo.

**Recomendación:**
1. Agregar solo lo que falta de Figma (ParagraphSpacing, breakpoints metadata)
2. Documentar exhaustivamente las diferencias
3. Exportar tokens del proyecto a Figma para sincronizar en la dirección correcta
