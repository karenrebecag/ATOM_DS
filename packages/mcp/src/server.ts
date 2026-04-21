import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { handleListComponents, listComponentsSchema } from './tools/list-components.js';
import { handleGetComponent, getComponentSchema } from './tools/get-component.js';
import { handleGetTokens, getTokensSchema } from './tools/get-tokens.js';
import { handleSearch, searchSchema } from './tools/search.js';

export function createServer() {
  const server = new Server(
    { name: '@atomchat.io/mcp', version: '1.0.0' },
    { capabilities: { tools: {} } },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: 'atom_list_components',
        description:
          'List all available ATOM Design System components. Optionally filter by framework (react, vue, angular, astro). Returns name, category, available frameworks, and brief description for each component.',
        inputSchema: listComponentsSchema,
      },
      {
        name: 'atom_get_component',
        description:
          'Get full documentation for a specific ATOM component: props, variants, sizes, import statement, usage example, and related design tokens.',
        inputSchema: getComponentSchema,
      },
      {
        name: 'atom_get_tokens',
        description:
          'Get ATOM Design System tokens by category (foundation, semantic, component) or by component name. Returns token names, types, values, and CSS variable names.',
        inputSchema: getTokensSchema,
      },
      {
        name: 'atom_search',
        description:
          'Search across ATOM components and tokens by keyword. Returns ranked results matching component names, prop names, token names, or descriptions.',
        inputSchema: searchSchema,
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'atom_list_components':
        return handleListComponents(args);
      case 'atom_get_component':
        return handleGetComponent(args);
      case 'atom_get_tokens':
        return handleGetTokens(args);
      case 'atom_search':
        return handleSearch(args);
      default:
        return {
          content: [{ type: 'text', text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
  });

  return {
    async start() {
      const transport = new StdioServerTransport();
      await server.connect(transport);
    },
  };
}
