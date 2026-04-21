# /figma-pull

Pull tokens from Figma via MCP Plugin API (all plans).

```
/figma-pull <figma-url>
```

Flow: FETCH → DIFF (dry-run) → MERGE (backup) → STATUS.
Never deletes tokens. Asks before writing. Outputs W3C DTCG JSON to `packages/tokens/src/figma/`.

CLI directo: `pnpm figma:pull --data <json> --backup --dry-run`
