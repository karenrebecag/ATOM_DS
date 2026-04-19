# Sincronización Figma ↔️ Proyecto

**Última sincronización:** 2026-04-16
**Estado:** ✅ Tokens de Figma integrados + Tokens exclusivos del proyecto documentados

---

## 📊 Estado General

| Categoría | Sincronizado | Notas |
|-----------|--------------|-------|
| ✅ Colors Primitive | 100% | 18 paletas coinciden + Alpha adicional en proyecto |
| ✅ Spacing | 100% | Valores idénticos |
| ✅ Radius | 100% | Valores idénticos + circle adicional en proyecto |
| ✅ Opacity | 100% | Equivalente (formato diferente) |
| ✅ Typography Sizes | 100% | Valores coinciden |
| ✅ ParagraphSpacing | 100% | **AGREGADO** desde Figma |
| ✅ Breakpoints Metadata | 100% | **AGREGADO** desde Figma |
| ⚠️ Font Families | Diferente | Figma: Roboto para body / Proyecto: Inter para todo |
| ⚠️ Letter Spacing | Equivalente | Figma usa %, proyecto usa em |
| ⭐ Semantic Colors | Más avanzado | Proyecto tiene casos de uso reales |
| ⭐ Component Tokens | Más avanzado | Proyecto tiene 6 variantes × 6 estados |

---

## ✅ Tokens Agregados desde Figma

### 1. ParagraphSpacing
**Ubicación:** `foundation/typography.json` → `Primitive.ParagraphSpacing`

```json
"ParagraphSpacing": {
  "$type": "dimension",
  "$description": "Spacing after paragraphs and headings (from Figma)",
  "H1": { "$value": "32px" },
  "H2": { "$value": "26px" },
  "H3": { "$value": "24px" },
  "H4": { "$value": "20px" },
  "Body": { "$value": "16px" },
  "Caption": { "$value": "12px" }
}
```

**Uso en CSS:**
```css
h1 { margin-bottom: var(--primitive-paragraphspacing-h1); }
```

---

### 2. Breakpoints UI Metadata
**Ubicación:** `foundation/breakpoints.json` → `Primitive.UIMetadata`

```json
"UIMetadata": {
  "Large": {
    "breakpoint-base": { "$value": 1280, "$type": "number" },
    "padding": { "$value": "120px", "$type": "dimension" },
    "menu-icon": { "$value": false, "$type": "boolean" },
    "menu-buttons": { "$value": true, "$type": "boolean" }
  }
  // ... Medium, Small, XSmall
}
```

**Uso en JavaScript:**
```js
import tokens from '@atomchat/tokens/build/js/tokens.js'

const largeBreakpoint = tokens.primitiveUimetadataLargeBreakpointBase // 1280
const largePadding = tokens.primitiveUimetadataLargePadding // "120px"
const showMenuIcon = tokens.primitiveUimetadataLargeMenuIcon // false
```

---

### 3. BorderRadius Multi-Value (Ejemplo)
**Ubicación:** `foundation/borders.json` → `Primitive.Radius.multi-value-example`

```json
"multi-value-example": {
  "$value": "4px 8px",
  "$description": "Multi-value radius example from Figma"
}
```

**Uso en CSS:**
```css
.card {
  border-radius: var(--primitive-radius-multi-value-example); /* 4px 8px */
}
```

---

## ⚠️ Diferencias de Approach (Ambos Válidos)

### Font Families
| Figma | Proyecto |
|-------|----------|
| `heading: Inter` | `Display: Inter` ✅ |
| `body: Roboto` | `Body: Inter` ⚠️ |

**Decisión de diseño:** El proyecto usa Inter para todo (consistencia visual).
**Acción:** Documentado. No cambiar.

---

### Letter Spacing
| Figma | Proyecto |
|-------|----------|
| `default: 0` | `Normal: -0.02em` |
| `increased: 150%` | `Wider: 0.02em` |
| `decreased: -5%` | `Tight: -0.04em` |

**Diferencia:** Figma usa percentages, proyecto usa em (más preciso para CSS).
**Acción:** Documentado. No cambiar.

---

### Math Expressions
**Figma:**
```yaml
dimension.scale: 2
dimension.sm: "{dimension.xs} * {dimension.scale}"  # Calcula en runtime
```

**Proyecto:**
```json
"sm": { "$value": "8px" }  // Valor final pre-calculado
```

**Razón:** El proyecto usa valores finales para mejor performance en CSS.
**Acción:** Documentado. No cambiar.

---

## ⭐ Tokens Exclusivos del Proyecto

Estos tokens **NO existen en Figma** y fueron diseñados para casos de uso reales:

### 1. Motion System
**Ubicación:** `foundation/motion.json`

```json
{
  "Easing": {
    "default": [0.625, 0.05, 0, 1],
    "standard": [0.25, 0.1, 0.25, 1]
  },
  "Duration": {
    "quarter": "150ms",
    "half": "300ms",
    "default": "600ms",
    "shimmer": "1500ms"
  }
}
```

**Por qué no está en Figma:** Las animaciones no son parte del token system de Figma.

---

### 2. Z-Index System
**Ubicación:** `foundation/z-index.json`

```json
{
  "base": 0,
  "dropdown": 100,
  "sticky": 200,
  "dialog": 10001
}
```

**Por qué no está en Figma:** Figma no tiene concepto de stack layers para web.

---

### 3. Semantic Colors Avanzados
**Ubicación:** `semantic/colors.json`

#### Inbox States
```json
"bg.accent.inbox": {
  "new": "{Primitive.Green.100}",
  "active": "{Primitive.Blue.100}",
  "reassigned": "{Primitive.Amber.50}",
  "return": "{Primitive.Cyan.50}",
  "typification": "{Primitive.Orange.100}"
}
```

#### AI Features
```json
"bg.accent.ai": {
  "primary": "{Primitive.Violet.600}",
  "secondary": "{Primitive.Violet.100}",
  "tertiary": "{Primitive.Pink.100}"
}
```

#### Indicators
```json
"fg.accent.indicators": {
  "online": "{Primitive.Green.500}",
  "offline": "{Primitive.Red.500}",
  "idle": "{Primitive.Yellow.500}",
  "inactive": "{Primitive.Gray.500}"
}
```

**Por qué no está en Figma:** Estos son casos de uso específicos de ATOM Chat.

---

### 4. Estados Interactivos Completos
**Ubicación:** `components/buttons/button.json`

6 variantes × 6 estados:
- Variantes: `primary`, `secondary`, `tertiary`, `danger-primary`, `danger-secondary`, `danger-tertiary`, `link`
- Estados: `enabled`, `hovered`, `focused`, `disabled`, `pressed`, `loading`

**Total:** 108 tokens solo para buttons (bg, fg, border).

**Figma solo tiene:**
```yaml
theme.button.primary.background: "{accent.default}"
theme.button.borderRadius: "{borderRadius.lg}"
```

**Por qué no está en Figma:** Figma tiene ejemplos básicos, no implementación completa.

---

### 5. Glass Effects
**Ubicación:** `foundation/glass.json`, `semantic/glass.json`, `components/effects/glass.json`

```json
{
  "backdrop-blur": "12px",
  "background": "rgba(255, 255, 255, 0.1)"
}
```

**Por qué no está en Figma:** Efecto específico de web (backdrop-filter CSS).

---

### 6. Elevation System
**Ubicación:** `foundation/elevations.json`

```json
{
  "card": "0px 2px 4px rgba(9, 9, 11, 0.08)",
  "popover": "0px 6px 14px rgba(9, 9, 11, 0.08)",
  "dialog": "0px 16px 32px rgba(9, 9, 11, 0.08)"
}
```

**Por qué no está en Figma:** Figma tiene `boxShadow.default` experimental, no sistema completo.

---

## ❌ Features Experimentales de Figma NO Implementadas

### 1. Composite Typography Tokens
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

**Por qué NO implementado:**
- Composite typography tokens NO están en W3C DTCG spec oficial
- Son feature experimental de Tokens Studio para Figma
- Proyecto usa approach estándar (tokens atómicos)

**Workaround en proyecto:**
```scss
@mixin text-h1-bold {
  font-family: var(--primitive-font-display);
  font-weight: var(--primitive-weight-bold);
  font-size: var(--primitive-size-h1);
  line-height: var(--primitive-lineheight-h1);
  letter-spacing: var(--primitive-tracking-tight);
  margin-bottom: var(--primitive-paragraphspacing-h1);
}
```

---

### 2. Multiple BoxShadows en un Token
**Figma:**
```yaml
boxShadow.default:
  - x: 5, y: 5, blur: 5, spread: 3, color: "rgba(...)", type: dropShadow
  - x: 4, y: 4, blur: 5, spread: 6, color: "#00000033", type: innerShadow
```

**Por qué NO implementado:**
- Feature experimental de Tokens Studio
- W3C DTCG spec no define múltiples sombras en un token
- Proyecto usa approach estándar CSS

**Workaround en proyecto:**
```css
.element {
  box-shadow:
    var(--primitive-elevation-card),
    0px 4px 6px rgba(0, 0, 0, 0.05);
}
```

---

## 🔄 Workflow de Sincronización

### Figma → Proyecto (Tokens Foundation)
1. Exportar tokens desde Figma vía Tokens Studio plugin
2. Revisar estructura exportada
3. Mapear a estructura del proyecto (`foundation/`, `semantic/`, `components/`)
4. Validar con `node scripts/validate-tokens.js`
5. Build con `pnpm build`

### Proyecto → Figma (Tokens Avanzados)
Para exportar tokens del proyecto a Figma:

1. Generar JSON compatible con Tokens Studio:
```bash
cd packages/tokens
pnpm build
# Output: build/json/tokens.json
```

2. Importar en Figma:
   - Abrir Tokens Studio plugin
   - Load Tokens → From File
   - Seleccionar `build/json/tokens.json`

3. ⚠️ **Advertencia:** Los tokens avanzados del proyecto (inbox, AI, indicators) pueden no tener representación visual en Figma.

---

## 📋 Checklist de Sincronización

Antes de sincronizar, verifica:

- [ ] ✅ Colors primitive coinciden (18 paletas)
- [ ] ✅ Spacing coincide (none - 17xxl)
- [ ] ✅ Radius coincide (none - 5xxl + pill)
- [ ] ✅ Opacity coincide (10-90%)
- [ ] ✅ Typography sizes coinciden (displayXL - footnote)
- [ ] ✅ ParagraphSpacing existe en proyecto
- [ ] ✅ Breakpoints metadata existe en proyecto
- [ ] ⚠️ Font families documentadas (Inter vs Roboto)
- [ ] ⚠️ Letter spacing documentado (% vs em)
- [ ] ⭐ Tokens exclusivos documentados
- [ ] ❌ Features experimentales explicadas

---

## 🎯 Conclusión

**El proyecto ATOM está MÁS AVANZADO que los tokens de Figma.**

| Aspecto | Ganador |
|---------|---------|
| Completitud | 🏆 Proyecto (production-ready) |
| Casos de uso reales | 🏆 Proyecto (inbox, AI, indicators) |
| Estados interactivos | 🏆 Proyecto (6 estados completos) |
| Motion system | 🏆 Proyecto |
| Z-Index system | 🏆 Proyecto |
| Glass effects | 🏆 Proyecto |
| Spec compliance | 🏆 Proyecto (W3C DTCG estándar) |

**Recomendación:**
1. ✅ Mantener tokens del proyecto como fuente de verdad
2. ✅ Sincronizar Figma → Proyecto solo para foundation tokens
3. ✅ Exportar tokens del proyecto → Figma para casos de uso avanzados
4. ✅ Documentar diferencias (este archivo)

---

**Ver análisis técnico completo:** `TOKENS_SYNC_ANALYSIS.md`
