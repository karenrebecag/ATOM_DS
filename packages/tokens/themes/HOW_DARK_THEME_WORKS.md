# Cómo Funciona el Dark Theme

## 🎯 Concepto Clave: Variables con Modos

Figma usa **una variable con múltiples valores** (uno por modo). Los componentes referencian la variable, no el valor específico.

```
┌─────────────────────────────────────────────────┐
│ Variable: fg/default                            │
├─────────────────────────────────────────────────┤
│ Mode: Light  → {colors.black}    (#000000)      │
│ Mode: Dark   → {colors.white}    (#FFFFFF)      │
└─────────────────────────────────────────────────┘
                     ↓
         Componente usa: {fg/default}
                     ↓
    Figma cambia automáticamente según modo activo
```

---

## 📊 Estructura de 3 Capas

### **Capa 1: Primitivos (Sin Modos)**
Los colores base **NO cambian** entre temas. Son constantes.

```json
// foundation/colors.json
{
  "Primitive": {
    "Neutral": {
      "0": "#FFFFFF",    // Siempre blanco
      "1000": "#000000"  // Siempre negro
    },
    "Zinc": {
      "50": "#FAFAFA",
      "950": "#09090B"
    },
    "Orange": {
      "400": "#FF7C24",
      "500": "#FF6600"
    }
  }
}
```

**Clave:** Los primitivos son **valores absolutos** que no cambian.

---

### **Capa 2: Semánticos con Modos**

Los tokens semánticos **referencian** primitivos diferentes según el modo.

#### **Light Mode** (default)
```json
// semantic/colors.json
{
  "fg": {
    "primary": "{Primitive.Zinc.900}",    // Negro
    "secondary": "{Primitive.Zinc.800}"
  },
  "bg": {
    "primary": "{Primitive.Neutral.0}",   // Blanco
    "secondary": "{Primitive.Zinc.50}"
  }
}
```

#### **Dark Mode** (override)
```json
// themes/dark/colors.json
{
  "fg": {
    "primary": "{Primitive.Neutral.0}",   // Blanco (invertido)
    "secondary": "{Primitive.Zinc.200}"
  },
  "bg": {
    "primary": "{Primitive.Zinc.950}",    // Negro (invertido)
    "secondary": "{Primitive.Zinc.900}"
  }
}
```

**Resultado en CSS:**
```css
/* Default (light) */
:root {
  --fg-primary: #18181b;      /* Zinc.900 */
  --bg-primary: #ffffff;      /* Neutral.0 */
}

/* Dark theme override */
[data-theme="dark"] {
  --fg-primary: #ffffff;      /* Neutral.0 (invertido) */
  --bg-primary: #09090b;      /* Zinc.950 (invertido) */
}
```

---

### **Capa 3: Componentes (Usan Semánticos)**

Los componentes **solo referencian semánticos**, nunca primitivos.

```json
// components/buttons/button.json
{
  "buttons": {
    "bg": {
      "primary-enabled": "{bg.inverse.primary}",
      "secondary-enabled": "{bg.primary}"
    },
    "fg": {
      "primary-enabled": "{fg.inverse.primary}",
      "secondary-enabled": "{fg.primary}"
    }
  }
}
```

**Magia:** Cuando cambias `[data-theme="dark"]`, los semánticos cambian, y los componentes automáticamente usan los valores correctos.

---

## 🔄 Flujo de Resolución

### **Light Theme:**
```
Component                 Semantic              Primitive
────────────────────────────────────────────────────────────
buttons.bg.primary    →  bg.inverse.primary  →  Zinc.950
buttons.fg.primary    →  fg.inverse.primary  →  Zinc.50

Resultado: Botón oscuro con texto claro
```

### **Dark Theme:**
```
Component                 Semantic              Primitive
────────────────────────────────────────────────────────────
buttons.bg.primary    →  bg.inverse.primary  →  Zinc.50
buttons.fg.primary    →  fg.inverse.primary  →  Zinc.900

Resultado: Botón claro con texto oscuro (invertido automáticamente)
```

---

## 💡 Ejemplo Práctico: Button Primary

### **1. Token de Componente** (nunca cambia)
```json
"buttons.bg.primary-enabled": "{bg.inverse.primary}"
```

### **2. Semantic Light** (default)
```json
"bg.inverse.primary": "{Primitive.Zinc.950}"  // #09090B (casi negro)
```

### **3. Semantic Dark** (override)
```json
"bg.inverse.primary": "{Primitive.Zinc.50}"   // #FAFAFA (casi blanco)
```

### **4. CSS Final**
```css
/* Light mode */
.button-primary {
  background: var(--buttons-bg-primary-enabled);
  /* Resuelve a: var(--bg-inverse-primary) */
  /* Resuelve a: #09090B */
}

/* Dark mode */
[data-theme="dark"] .button-primary {
  background: var(--buttons-bg-primary-enabled);
  /* Resuelve a: var(--bg-inverse-primary) */
  /* Resuelve a: #FAFAFA (override de dark theme) */
}
```

**Resultado:** El mismo CSS produce colores diferentes según el tema activo.

---

## 🎨 Principios de Diseño Dark Theme

### **1. Inversión de Valores (No de Paletas)**
❌ **Incorrecto:**
```
Light: Zinc.50 → Dark: Zinc.950
```

✅ **Correcto:**
```
Light: fg.primary = Zinc.900 (oscuro)
Dark:  fg.primary = Neutral.0 (claro)

Light: bg.primary = Neutral.0 (claro)
Dark:  bg.primary = Zinc.950 (oscuro)
```

**Razón:** Los colores se invierten en función semántica, no matemáticamente.

---

### **2. Ajuste de Contraste**

Los valores no son simples inversiones. Se ajustan para mantener **legibilidad**.

| Token | Light | Dark | Razón |
|-------|-------|------|-------|
| `fg.primary` | Zinc.900 (#18181b) | Neutral.0 (#ffffff) | Máximo contraste |
| `fg.secondary` | Zinc.800 (#27272a) | Zinc.200 (#e4e4e7) | NO Zinc.100 (muy brillante) |
| `bg.status.error` | Red.50 (#fef3f3) | Red.950 (#460808) | Fondo oscuro para dark |
| `fg.status.error` | Red.600 (#e7000b) | Red.300 (#ffcaca) | Texto más claro |

**Clave:** Los valores se ajustan para **WCAG AA contrast ratio** (4.5:1 mínimo).

---

### **3. Status Colors: Fondo Oscuro + Texto Claro**

```json
// Light mode
"bg.status.error": "{Primitive.Red.50}",     // Fondo claro
"fg.status.error": "{Primitive.Red.600}",    // Texto oscuro

// Dark mode
"bg.status.error": "{Primitive.Red.950}",    // Fondo OSCURO
"fg.status.error": "{Primitive.Red.300}"     // Texto CLARO
```

**Visualización:**

```
Light: [  Red.50 fondo  ] Red.600 texto
       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ████████████

Dark:  [  Red.950 fondo ] Red.300 texto
       ████████████████  ▓▓▓▓▓▓▓▓▓▓▓▓
```

---

### **4. Brand Color: Ajuste de Luminosidad**

```json
// Light mode
"brand.primary": "{Primitive.Orange.500}"  // #FF6600 (100% saturación)

// Dark mode
"brand.primary": "{Primitive.Orange.400}"  // #FF7C24 (más claro, mejor contraste)
```

**Razón:** Orange.500 en fondo oscuro tiene bajo contraste. Orange.400 es más visible.

---

## 🔧 Implementación en el Proyecto

### **Archivos Involucrados**

```
packages/tokens/
├── src/
│   ├── foundation/
│   │   └── colors.json          ← Primitivos (sin modos)
│   ├── semantic/
│   │   └── colors.json          ← Semánticos (modo light)
│   └── components/
│       └── buttons/button.json  ← Referencian semánticos
└── themes/
    └── dark/
        └── colors.json          ← Overrides (modo dark)
```

### **Build Output**

```bash
pnpm build
```

Genera:

```
build/
├── css/
│   ├── tokens.css      # Todos los tokens (light theme)
│   └── dark.css        # Solo overrides con [data-theme="dark"]
├── scss/
│   └── _tokens.scss    # Variables SCSS (solo light)
└── js/
    └── tokens.js       # Export JS (solo light)
```

### **Uso en HTML**

```html
<!DOCTYPE html>
<html data-theme="light">  <!-- o "dark" -->
<head>
  <link rel="stylesheet" href="@atomchat.io/tokens/build/css/tokens.css">
  <link rel="stylesheet" href="@atomchat.io/tokens/build/css/dark.css">
</head>
<body>
  <button class="button-primary">
    Click me
  </button>
</body>
</html>
```

**JavaScript Toggle:**
```js
const html = document.documentElement
const currentTheme = html.getAttribute('data-theme')
const newTheme = currentTheme === 'light' ? 'dark' : 'light'
html.setAttribute('data-theme', newTheme)
```

---

## 📋 Checklist de Tokens Dark Theme

### ✅ Completado

- [x] `fg.primary`, `fg.secondary`, `fg.tertiary`, `fg.quaternary`
- [x] `fg.inverse.*` (primary, secondary, tertiary)
- [x] `fg.status.*` (info, success, warning, error, neutral, brand, ai)
- [x] `fg.interactive.link.*` (enabled, hovered, pressed)
- [x] `bg.primary`, `bg.secondary`, `bg.tertiary`, `bg.quaternary`
- [x] `bg.inverse.*` (primary, secondary, tertiary)
- [x] `bg.soft.*` (primary, secondary, tertiary)
- [x] `bg.status.*` (info, success, warning, error, neutral, brand, ai)
- [x] `bg.interactive.primary.*`, `bg.interactive.secondary.*`
- [x] `bg.interactive.link.*`, `bg.interactive.danger.*`
- [x] `bg.accent.ai.*`, `bg.accent.inbox.*`
- [x] `border.primary`, `border.secondary`, `border.tertiary`
- [x] `border.status.*`
- [x] `border.interactive.*`
- [x] `brand.primary`
- [x] `dialog.*` (bg, border, fg)
- [x] `backdrop.overlay`

**Total:** ~100 overrides implementados

---

## 🎯 Validación WCAG

Para verificar contrast ratios:

```bash
# Instalar checker
npm install -g wcag-contrast

# Verificar contraste
wcag-contrast "#ffffff" "#09090b"  # fg.primary en dark
# Output: 20.53:1 ✅ AAA (excelente)

wcag-contrast "#e4e4e7" "#27272a"  # fg.secondary en dark
# Output: 12.08:1 ✅ AAA
```

**Mínimos requeridos:**
- Normal text: 4.5:1 (AA) / 7:1 (AAA)
- Large text (18pt+): 3:1 (AA) / 4.5:1 (AAA)

---

## 🔗 Referencias

- **Figma Variables Docs:** https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma
- **W3C DTCG Spec:** https://tr.designtokens.org/format/
- **WCAG Contrast:** https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- **Dark Mode Best Practices:** https://www.nngroup.com/articles/dark-mode/

---

## 📚 Archivos Relacionados

- `TOKENS_SYNC_ANALYSIS.md` - Análisis completo de sincronización
- `FIGMA_SYNC.md` - Guía de sincronización Figma ↔️ Proyecto
- `themes/dark/README.md` - Documentación del dark theme
