# /figma-pull — Pull tokens from Figma (git-style)

Sync design tokens from a Figma file into the local token pipeline.
Works on ALL Figma plans via the Plugin API (MCP). No REST API token needed.

## Input

`$ARGUMENTS` — A Figma file URL: `https://figma.com/design/:fileKey/:fileName`

If no URL is provided, ask the user for one.

---

## Flow Overview (git analogy)

```
FETCH  →  STAGE  →  DIFF  →  MERGE  →  STATUS
(fetch)   (add)    (diff)   (merge)   (status)
```

---

## Phase 1: FETCH

Extract the `fileKey` from the URL pattern:
- `figma.com/design/:fileKey/:fileName...` → use `:fileKey`
- `figma.com/file/:fileKey/...` → use `:fileKey`

Call `mcp__claude_ai_Figma__use_figma` with the extracted fileKey and the code below.

**Description:** `Extract all published variable collections for token sync`

```javascript
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const allVars = await figma.variables.getLocalVariablesAsync();
const varMap = new Map();
for (const v of allVars) varMap.set(v.id, v);

function sanitize(name) {
  return name.toLowerCase().replace(/[\s/]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function rgbaToHex(c) {
  const toHex = n => Math.round(n * 255).toString(16).toUpperCase().padStart(2, '0');
  const hex = '#' + toHex(c.r) + toHex(c.g) + toHex(c.b);
  return (c.a !== undefined && c.a < 1) ? hex + toHex(c.a) : hex;
}

function buildAlias(aliasVar) {
  const col = collections.find(c => c.id === aliasVar.variableCollectionId);
  const colKey = sanitize(col ? col.name : 'unknown');
  const path = aliasVar.name.split('/').map(p => p.toLowerCase().replace(/\s+/g, '-')).join('.');
  return '{figma.' + colKey + '.' + path + '}';
}

const PREFER = ['light', 'base', 'default'];
function pickMode(col) {
  for (const p of PREFER) {
    const m = col.modes.find(m => m.name.toLowerCase() === p);
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
    if (!v || v.hiddenFromPublishing) continue;

    const raw = v.valuesByMode[modeId];
    if (raw === undefined) continue;

    const entry = { name: v.name, type: v.resolvedType };

    if (raw && typeof raw === 'object' && 'type' in raw && raw.type === 'VARIABLE_ALIAS') {
      const aliasVar = varMap.get(raw.id);
      if (aliasVar) {
        entry.alias = buildAlias(aliasVar);
        // Resolve concrete value as fallback
        const aliasModes = Object.values(aliasVar.valuesByMode);
        const aliasRaw = aliasModes[0];
        if (aliasRaw && typeof aliasRaw === 'object' && 'r' in aliasRaw) {
          entry.value = rgbaToHex(aliasRaw);
        } else if (typeof aliasRaw === 'number' || typeof aliasRaw === 'string' || typeof aliasRaw === 'boolean') {
          entry.value = aliasRaw;
        } else {
          entry.value = 0;
        }
      } else {
        entry.value = 0;
        entry.alias = '{alias:unresolved:' + raw.id + '}';
      }
    } else if (v.resolvedType === 'COLOR' && raw && typeof raw === 'object' && 'r' in raw) {
      entry.value = rgbaToHex(raw);
    } else {
      entry.value = raw;
    }

    vars.push(entry);
  }

  if (vars.length > 0) {
    result.collections.push({ name: col.name, variables: vars });
  }
}

return JSON.stringify(result);
```

**If the response is truncated** (very large files), split the extraction per collection:
Add `const TARGET = "CollectionName";` at the top and filter:
`for (const col of collections.filter(c => c.name === TARGET)) {`
Then combine partial results into one McpData object.

**Report to user:**
```
Fetched {N} variables from {M} collections in "{fileName}"
  - CollectionA: 120 variables
  - CollectionB: 45 variables
  - CollectionC: 8 variables
```

Ask: **"Import all collections, or exclude any?"**
If the user wants to exclude some, filter them from the data before continuing.

---

## Phase 2: STAGE

Write the JSON to a temp file:

```bash
/tmp/figma-pull-{fileKey}.json
```

Use the Write tool to save the extracted JSON (the full McpData object).

Report: `Staged → /tmp/figma-pull-{fileKey}.json`

---

## Phase 3: DIFF (dry-run)

Preview what would change WITHOUT writing anything:

```bash
cd /Users/karenrebecaortiz/Desktop/SoftwareDevProjects/ATOM_DS && npx tsx tools/figma-sync/src/pull.tsx --data /tmp/figma-pull-{fileKey}.json --dry-run --yes
```

Report the diff output to the user showing added/updated tokens per collection.

If there are zero changes, report "Already up to date" and stop.

Otherwise ask: **"Apply changes? (backup will be created automatically)"**

---

## Phase 4: MERGE

Only if the user confirms. Run with backup + auto-confirm:

```bash
cd /Users/karenrebecaortiz/Desktop/SoftwareDevProjects/ATOM_DS && npx tsx tools/figma-sync/src/pull.tsx --data /tmp/figma-pull-{fileKey}.json --backup --yes
```

---

## Phase 5: STATUS

After merge completes:

1. Show the git diff summary:
```bash
cd /Users/karenrebecaortiz/Desktop/SoftwareDevProjects/ATOM_DS && git diff --stat packages/tokens/src/figma/
```

2. Clean up temp file:
```bash
rm -f /tmp/figma-pull-{fileKey}.json
```

3. Report next steps:
```
Done! Tokens synced from Figma.

Next steps:
  1. Review:  packages/tokens/src/figma/{folder}/
  2. Build:   cd packages/tokens && pnpm build
  3. Test:    your app with updated tokens
  4. Commit:  git add packages/tokens/src/figma/ && git commit
```

---

## Error Handling

| Error | Action |
|-------|--------|
| No URL provided | Ask the user for a Figma file URL |
| MCP auth required | Tell user to authenticate: check MCP panel or run `/mcp` |
| No variables found | Report: "No published variables in this file" |
| Truncated response | Re-extract per collection (see Phase 1 note) |
| pull.tsx fails | Show error, suggest checking the URL and file permissions |
| Alias unresolved | Warn but continue — the alias ref `{alias:unresolved:id}` signals a broken link in Figma |

---

## Key Guarantees

- **Never deletes tokens** — merge-only strategy (additive)
- **Auto-backup** — timestamped copy of modified files before overwrite
- **Dry-run first** — user always sees the diff before any write
- **Only published vars** — hiddenFromPublishing are skipped
- **Preferred mode** — Light > Base > Default > first available
