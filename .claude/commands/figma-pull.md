# /figma-pull — Pull tokens from Figma via MCP

Pull all variable collections from a Figma file and sync them as W3C DTCG token files.
Works on ALL Figma plans — uses the Plugin API via MCP, not the REST Variables endpoint.

## Input

The user provides a Figma file URL as argument: `$ARGUMENTS`

## Steps

### 1. Parse the file key

Extract the `fileKey` from the URL. Figma URLs follow this pattern:
- `figma.com/design/:fileKey/:fileName?node-id=...`
- `figma.com/file/:fileKey/...`
- Or a raw file key string

### 2. Extract variables via `use_figma` MCP

Run this Plugin API code against the file using `mcp__figma-remote__use_figma` (or `mcp__claude_ai_Figma__use_figma`).

**Important:** Use `ToolSearch` to load the `use_figma` tool first if needed.

Execute this JavaScript code with the extracted `fileKey`:

```javascript
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const allVars = await figma.variables.getLocalVariablesAsync();
const varMap = new Map();
for (const v of allVars) varMap.set(v.id, v);

function rgbaToHex(c) {
  const r = Math.round(c.r * 255), g = Math.round(c.g * 255), b = Math.round(c.b * 255);
  const a = c.a !== undefined ? c.a : 1;
  const hex = '#' + [r,g,b].map(n => n.toString(16).padStart(2,'0')).join('');
  return a < 1 ? hex + Math.round(a*255).toString(16).padStart(2,'0') : hex;
}

async function resolveValue(val, depth) {
  if (depth > 10) return { resolved: '??', alias: null };
  if (val && typeof val === 'object' && 'type' in val && val.type === 'VARIABLE_ALIAS') {
    try {
      const ref = await figma.variables.getVariableByIdAsync(val.id);
      if (ref) {
        const alias = '{' + ref.name.replace(/\//g, '.') + '}';
        const modes = Object.entries(ref.valuesByMode);
        if (modes.length > 0) {
          const inner = await resolveValue(modes[0][1], (depth||0)+1);
          return { resolved: inner.resolved, alias };
        }
        return { resolved: '??', alias };
      }
    } catch(e) {}
    return { resolved: '??', alias: '{alias:' + val.id + '}' };
  }
  if (val && typeof val === 'object' && 'r' in val) return { resolved: rgbaToHex(val), alias: null };
  if (typeof val === 'number') return { resolved: val, alias: null };
  if (typeof val === 'string') return { resolved: val, alias: null };
  if (typeof val === 'boolean') return { resolved: val, alias: null };
  return { resolved: JSON.stringify(val), alias: null };
}

const PREFER = ['light', 'base', 'default'];
function pickMode(col) {
  for (const p of PREFER) {
    const m = col.modes.find(m => m.name.toLowerCase().includes(p));
    if (m) return m.modeId;
  }
  return col.defaultModeId;
}

const result = { fileName: figma.root.name, collections: [] };

for (const col of collections) {
  const modeId = pickMode(col);
  const vars = [];
  for (const varId of col.variableIds) {
    const v = varMap.get(varId);
    if (!v) continue;
    const raw = v.valuesByMode[modeId];
    if (raw === undefined) continue;
    const res = await resolveValue(raw, 0);
    const entry = { name: v.name, type: v.resolvedType, value: res.resolved };
    if (res.alias) entry.alias = res.alias;
    vars.push(entry);
  }
  result.collections.push({ name: col.name, variables: vars });
}

return JSON.stringify(result);
```

Set the description to: `Extract all variable collections and variables from this Figma file for token sync`

### 3. Handle truncation

If the output is truncated (ends with `// truncated`), run separate extractions per collection. Filter by collection name in the code:

```javascript
// Add at the top: const TARGET_COL = "CollectionName";
// Then: for (const col of collections.filter(c => c.name === TARGET_COL)) {
```

Combine the partial results into a single `McpData` JSON.

### 4. Collection Selector

**IMPORTANT:** After extraction, parse the JSON and present a collection selector to the user.

Use `AskUserQuestion` to show an interactive multi-select list:

```typescript
// Parse the extracted JSON
const data = JSON.parse(extractedOutput)
const collections = data.collections

// Build options array
const options = collections.map(col => ({
  label: `${col.name} (${col.variables.length} variables)`,
  description: `Import ${col.name} collection with ${col.variables.length} tokens`
}))

// Ask user with multi-select
AskUserQuestion({
  questions: [{
    question: "Which collections do you want to import?",
    header: "Collections",
    multiSelect: true,
    options: options
  }]
})
```

Then filter the JSON to only include selected collections:

```javascript
// Get selected indices from user answer
const selectedIndices = [0, 2] // Example: user selected first and third

// Filter collections
const filteredData = {
  fileName: data.fileName,
  collections: selectedIndices.map(i => data.collections[i])
}
```

### 5. Write the JSON file

Write the extracted JSON to a temp file:
```
/tmp/figma-pull-{fileKey}.json
```

The JSON must follow this exact format:
```json
{
  "fileName": "Semantics",
  "collections": [
    {
      "name": "Semantic",
      "variables": [
        { "name": "bg/primary", "type": "COLOR", "value": "#ffffff", "alias": "{Primitive.Neutral.0}" },
        { "name": "bg/secondary", "type": "COLOR", "value": "#fafafa" }
      ]
    }
  ]
}
```

### 6. Run the CLI with backup

```bash
cd /Users/karenortiz/Desktop/atom-design-system && pnpm figma:pull -- --data /tmp/figma-pull-{fileKey}.json --backup
```

The `--backup` flag will automatically create a timestamped backup of all files that will be modified.

Do NOT add `--yes` — let the user confirm the changes interactively.

### 7. Clean up

After the CLI finishes (user confirms or cancels), delete the temp file:
```bash
rm /tmp/figma-pull-{fileKey}.json
```

## Output

Report to the user:
- How many collections were selected (out of total detected)
- How many variables were extracted from selected collections
- Where the backup was saved (if any files were modified)
- Where the files were written
- Suggest running `cd packages/tokens && pnpm build` to compile

## Error Handling

- If `use_figma` returns "nothing selected" or fails, try with `mcp__claude_ai_Figma__use_figma` instead
- If the Figma file has no variables, tell the user
- If the CLI fails, show the error and suggest checking the file URL
