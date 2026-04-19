# Dark Theme Overrides

**Qué:** Color overrides para modo oscuro
**Output:** `build/css/dark.css` con selector `[data-theme="dark"]`
**Cuándo:** Se aplica cuando el HTML tiene `<html data-theme="dark">`

---

## 🎨 Filosofía

El dark theme **NO redefine todos los tokens**, solo sobrescribe los colores semánticos que necesitan cambiar.

### Tokens Primitivos (Foundation)
❌ **NO cambian** entre light y dark
- Colors: Las paletas de colores permanecen constantes
- Spacing, Radius, Typography, Motion, etc.: Idénticos

### Tokens Semánticos
✅ **SÍ cambian** entre light y dark
- `fg.primary`: Negro → Blanco
- `bg.primary`: Blanco → Gris oscuro
- `fg.inverse.primary`: Blanco → Negro

---

## 📁 Estructura

```
themes/
└── dark/
    ├── README.md (este archivo)
    └── colors.json  ← Solo 5 overrides de color
```

---

## 🔧 Implementación Actual

**Archivo:** `themes/dark/colors.json`

```json
{
  "fg": {
    "$type": "color",
    "primary":           { "$value": "{Primitive.Neutral.0}" },      // Blanco
    "secondary":         { "$value": "{Primitive.Zinc.200}" },
    "tertiary":          { "$value": "{Primitive.Zinc.300}" },
    "inverse-primary":   { "$value": "{Primitive.Zinc.900}" },       // Negro
    "inverse-secondary": { "$value": "{Primitive.Zinc.800}" }
  }
}
```

**Output CSS:**
```css
[data-theme="dark"] {
  --fg-primary: #ffffff;
  --fg-secondary: #e4e4e7;
  --fg-tertiary: #d4d4d8;
  --fg-inverse-primary: #18181b;
  --fg-inverse-secondary: #27272a;
}
```

---

## ⚠️ Estado Actual: INCOMPLETO

El dark theme solo tiene **5 overrides** de color. Para un dark theme completo, necesitamos aproximadamente **50-100 overrides**.

### Overrides Faltantes

#### Backgrounds
```json
"bg": {
  "primary": "{Primitive.Zinc.900}",           // Fondo oscuro
  "secondary": "{Primitive.Zinc.800}",
  "tertiary": "{Primitive.Zinc.700}",
  "quaternary": "{Primitive.Zinc.600}"
}
```

#### Borders
```json
"border": {
  "primary": "{Primitive.Zinc.600}",
  "secondary": "{Primitive.Zinc.700}",
  "tertiary": "{Primitive.Zinc.800}"
}
```

#### Status Colors
```json
"bg.status": {
  "info": "{Primitive.Blue.900}",      // Más oscuro para dark mode
  "success": "{Primitive.Esmerald.900}",
  "warning": "{Primitive.Yellow.900}",
  "error": "{Primitive.Red.900}"
}
```

#### Interactive States
```json
"bg.interactive.primary.hovered": "{Primitive.Zinc.700}",
"bg.interactive.primary.pressed": "{Primitive.Zinc.600}"
```

---

## 🎯 Comparación con Figma

### Figma Dark Theme
```yaml
dark:
  fg:
    default: "{colors.white}"
    muted: "{colors.gray.300}"
    subtle: "{colors.gray.500}"
  bg:
    default: "{colors.gray.900}"
    muted: "{colors.gray.700}"
    subtle: "{colors.gray.600}"
  accent:
    default: "{colors.indigo.600}"
    onAccent: "{colors.white}"
    bg: "{colors.indigo.800}"
  shadows.default: "rgba({colors.black}, 0.3)"
```

### Proyecto ATOM (Actual)
```json
{
  "fg.primary": "{Primitive.Neutral.0}",
  "fg.secondary": "{Primitive.Zinc.200}",
  "fg.tertiary": "{Primitive.Zinc.300}",
  "fg.inverse-primary": "{Primitive.Zinc.900}",
  "fg.inverse-secondary": "{Primitive.Zinc.800}"
}
```

**Diferencia:** Figma tiene estructura simple pero más completa (fg + bg + accent).
Proyecto tiene solo fg overrides parciales.

---

## ✅ TODO: Completar Dark Theme

Para completar el dark theme siguiendo el approach de Figma:

### 1. Agregar Backgrounds
```json
"bg": {
  "primary": "{Primitive.Zinc.950}",
  "secondary": "{Primitive.Zinc.900}",
  "tertiary": "{Primitive.Zinc.800}",
  "quaternary": "{Primitive.Zinc.700}",
  "inverse": {
    "primary": "{Primitive.Zinc.50}",
    "secondary": "{Primitive.Zinc.100}"
  }
}
```

### 2. Agregar Borders
```json
"border": {
  "primary": "{Primitive.Zinc.500}",
  "secondary": "{Primitive.Zinc.600}",
  "tertiary": "{Primitive.Zinc.700}"
}
```

### 3. Agregar Brand
```json
"brand": {
  "primary": "{Primitive.Orange.400}"  // Más claro para dark mode
}
```

### 4. Ajustar Status Colors
```json
"bg.status": {
  "info": "{Primitive.Blue.900}",
  "success": "{Primitive.Esmerald.900}",
  "warning": "{Primitive.Yellow.900}",
  "error": "{Primitive.Red.900}"
},
"fg.status": {
  "info": "{Primitive.Blue.300}",
  "success": "{Primitive.Esmerald.300}",
  "warning": "{Primitive.Yellow.300}",
  "error": "{Primitive.Red.300}"
}
```

---

## 📚 Recursos

- Figma dark theme reference: Ver tokens compartidos por usuario
- Light theme: `semantic/colors.json`
- Análisis completo: `TOKENS_SYNC_ANALYSIS.md`
- Sincronización Figma: `FIGMA_SYNC.md`

---

## 🚀 Próximos Pasos

1. [ ] Completar overrides de `bg` (backgrounds)
2. [ ] Completar overrides de `border`
3. [ ] Completar overrides de `brand`
4. [ ] Completar overrides de status colors (info, success, warning, error)
5. [ ] Completar overrides de interactive states
6. [ ] Completar overrides de accent colors (inbox, AI, notifications)
7. [ ] Validar contrast ratios (WCAG AA mínimo)
8. [ ] Testear en componentes reales
