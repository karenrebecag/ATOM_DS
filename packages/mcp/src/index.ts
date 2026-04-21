#!/usr/bin/env node
/**
 * @atomchat.io/mcp — MCP Server for ATOM Design System
 *
 * Provides AI with context about all available components, tokens,
 * and installation instructions across React, Vue, Angular, and Astro.
 *
 * Usage:
 *   npx @atomchat.io/mcp          (stdio transport for Claude Desktop/Code)
 */

import { createServer } from './server.js';

const server = createServer();
await server.start();
