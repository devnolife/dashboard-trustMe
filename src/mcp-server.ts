import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Create server instance
const server = new Server(
    {
        name: "trust-me-admin-mcp",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "echo",
                description: "Echoes back the input",
                inputSchema: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            description: "Message to echo",
                        },
                    },
                    required: ["message"],
                },
            },
            {
                name: "get_restaurant_stats",
                description: "Get current restaurant statistics",
                inputSchema: {
                    type: "object",
                    properties: {},
                },
            },
        ],
    };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === "echo") {
        const message = (args as { message: string }).message;
        return {
            content: [
                {
                    type: "text",
                    text: `Echo: ${message}`,
                },
            ],
        };
    }

    if (name === "get_restaurant_stats") {
        // Mock data for now
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        total_restaurants: 10500,
                        active_orders: 2500,
                        top_cuisine: "Padang",
                    }, null, 2),
                },
            ],
        };
    }

    throw new Error(`Tool not found: ${name}`);
});

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("TrustMe MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
