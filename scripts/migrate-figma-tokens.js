#!/usr/bin/env node
/**
 * Migra tokens de componentes desde export de Figma a formato Style Dictionary
 * Usage: node scripts/migrate-figma-tokens.js <path-to-figma-export.json>
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Configuración
const FIGMA_EXPORT_PATH = process.argv[2] || '/Users/karenortiz/Downloads/default.tokens.json'
const OUTPUT_DIR = path.join(__dirname, '../packages/tokens/src/component')

// Componentes que queremos extraer
const TARGET_COMPONENTS = [
  'badge',
  'buttons',
  'card',
  'checkbox',
  'chips',
  'dialog',
  'form-fields',
  'paginator',
  'progress circle',
  'radio',
  'segment controls',
  'table',
  'tags',
  'toggle'
]

/**
 * Convierte componentes RGB de Figma a hex
 */
function rgbToHex(components) {
  const r = Math.round(components[0] * 255)
  const g = Math.round(components[1] * 255)
  const b = Math.round(components[2] * 255)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase()
}

/**
 * Procesa un token de Figma y lo convierte a formato Style Dictionary
 */
function processToken(token) {
  if (!token || !token.$type) return null

  const processed = {
    $type: token.$type
  }

  // Procesar valor según tipo
  if (token.$type === 'color') {
    if (token.$value?.hex) {
      processed.$value = token.$value.hex
    } else if (token.$value?.components) {
      processed.$value = rgbToHex(token.$value.components)
    }
  } else if (token.$type === 'dimension' || token.$type === 'number') {
    processed.$value = token.$value
  } else if (token.$type === 'string') {
    processed.$value = token.$value
  } else {
    processed.$value = token.$value
  }

  // Agregar alias data si existe
  if (token.$extensions?.['com.figma.aliasData']?.targetVariableName) {
    const aliasName = token.$extensions['com.figma.aliasData'].targetVariableName
    processed.$value = `{${aliasName}}`
  }

  return processed
}

/**
 * Procesa recursivamente un objeto de tokens
 */
function processTokenObject(obj) {
  const result = {}

  for (const [key, value] of Object.entries(obj)) {
    // Ignorar claves que empiezan con $
    if (key.startsWith('$') && key !== '$value' && key !== '$type') {
      continue
    }

    if (value && typeof value === 'object') {
      // Si tiene $value y $type, es un token
      if (value.$value !== undefined && value.$type !== undefined) {
        const processed = processToken(value)
        if (processed) {
          result[key] = processed
        }
      } else {
        // Es un grupo anidado
        const nested = processTokenObject(value)
        if (Object.keys(nested).length > 0) {
          result[key] = nested
        }
      }
    }
  }

  return result
}

/**
 * Normaliza nombres de componentes (kebab-case)
 */
function normalizeComponentName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

/**
 * Main
 */
async function main() {
  console.log('🚀 Migrando tokens de Figma a Style Dictionary...\n')

  // Leer archivo de Figma
  if (!fs.existsSync(FIGMA_EXPORT_PATH)) {
    console.error(`❌ Error: No se encuentra el archivo ${FIGMA_EXPORT_PATH}`)
    process.exit(1)
  }

  console.log(`📖 Leyendo: ${FIGMA_EXPORT_PATH}`)
  const figmaTokens = JSON.parse(fs.readFileSync(FIGMA_EXPORT_PATH, 'utf8'))

  // Crear directorio de salida si no existe
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  let migratedCount = 0
  let skippedCount = 0

  // Procesar cada componente
  for (const componentName of TARGET_COMPONENTS) {
    if (!figmaTokens[componentName]) {
      console.log(`⏭️  Skipped: ${componentName} (no encontrado en Figma export)`)
      skippedCount++
      continue
    }

    // Procesar tokens del componente
    const processedTokens = processTokenObject(figmaTokens[componentName])

    if (Object.keys(processedTokens).length === 0) {
      console.log(`⏭️  Skipped: ${componentName} (sin tokens válidos)`)
      skippedCount++
      continue
    }

    // Crear archivo de salida
    const normalizedName = normalizeComponentName(componentName)
    const outputPath = path.join(OUTPUT_DIR, `${normalizedName}.json`)

    const output = {
      [normalizedName]: processedTokens
    }

    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8')
    console.log(`✅ Migrated: ${componentName} → ${normalizedName}.json (${Object.keys(processedTokens).length} groups)`)
    migratedCount++
  }

  console.log(`\n📊 Resumen:`)
  console.log(`   ✅ Migrated: ${migratedCount} componentes`)
  console.log(`   ⏭️  Skipped: ${skippedCount} componentes`)
  console.log(`\n📁 Tokens guardados en: ${OUTPUT_DIR}`)
  console.log(`\n🔄 Próximo paso: cd packages/tokens && pnpm build`)
}

main().catch(err => {
  console.error('❌ Error:', err)
  process.exit(1)
})
