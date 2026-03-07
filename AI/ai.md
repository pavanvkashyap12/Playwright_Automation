# GitHub Copilot
- Extensions -> GitHub Copilot Chat

# What is MCP ? Understand how Playwright MCP helps us to build AI Agent
```
An MCP (Model Context Protocol) server is a specialized program that connects AI models (like Claude) to external data, tools, and systems—acting as a universal connector. It exposes local files, databases, or APIs, allowing LLMs to access real-time information, perform actions, and use specific software tools via standardized protocols. 

### Key Components and Functionality
Resources: Provides read-only data, such as local files, databases, or documentation.
Tools: Enables actions, such as running code, calling APIs, or updating data.
Prompt Templates: Pre-defined, structured prompts that streamline user interaction. 

### Deployment Types
Local Servers: Run directly on your machine (e.g., via stdio), ideal for accessing private files or local IDEs with high security.
Remote Servers: Hosted on servers or the cloud (e.g., via SSE), allowing multiple AI applications to share access to services. 

Common Examples
File System Servers: Accessing local files.
Database Servers: Querying SQLite, MySQL, or Postgres.
API Servers: Connecting to GitHub, Slack, or Google Calendar.
Web Search: Using Brave Search or DuckDuckGo. 

### Advantages
Standardization: Acts as a "USB-C for AI," allowing any compliant model to interact with any tool.
Security: Facilitates secure, authorized access to local or private data without requiring the LLM to handle raw API keys directly.
Flexibility: Easily integrates with various AI clients to extend their capabilities. 

To start, you can use existing open-source servers or build custom ones to suit specific data needs. 
```
- There is also a official playwright-mcp 
- https://github.com/microsoft/playwright-mcp read readme.md
- integrate playwrightmcp and copilot to create agent mode
- open github copilot add tools -> more tools -> add MCp -> npm 
- Playwright MCP is nothing but it has few methods, once we integrate these we can just give manual steps agents will perform like manual and then provide code for automation
- we can ask it to run a test because we have playwright MCP integrated

## Playwright Agents
- Watch video again to understand -> planner generator healer ```npx playwright init-agents --loop=vscode```