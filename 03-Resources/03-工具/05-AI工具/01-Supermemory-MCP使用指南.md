# Supermemory MCP 使用指南

## 什么是 Supermemory MCP

Supermemory MCP 是一种基于 Model Context Protocol (MCP) 的技术，它允许不同的大型语言模型（LLM）之间共享上下文和记忆。MCP 是由 Anthropic 开发的一个开放协议，旨在标准化 LLM 与外部数据源的连接。

它采用客户端-服务器架构：
- 客户端：LLM 或 AI 工具
- 服务器：提供记忆存储和检索服务的 Supermemory

## 安装和设置 MCP 服务器

根据 MCP 服务器的实现方式，有不同的安装方法：

### 1. 使用 doobidoo/mcp-memory-service

这是基于 Python 的实现，使用 ChromaDB 进行持久存储和 sentence transformers 进行语义搜索。

**使用 Docker 安装（推荐）**：

1. 克隆仓库：
```powershell
git clone https://github.com/doobidoo/mcp-memory-service.git
cd mcp-memory-service
```

2. 构建 Docker 镜像：
```powershell
docker build -t mcp-memory-service .
```

3. 创建必要的持久存储目录：
```powershell
mkdir -p $HOME/mcp-memory/chroma_db $HOME/mcp-memory/backups
```

### 2. 使用官方 MCP 服务器

Anthropic 和社区提供了多种类型的 MCP 服务器实现。

**TypeScript 服务器（使用 npx）**：

对于基于 TypeScript 的服务器，您可以直接使用 npx。例如，启动内存服务器：
```powershell
npx -y @modelcontextprotocol/server-memory
```

**Python 服务器（使用 uvx 或 pip）**：

对于基于 Python 的服务器，推荐使用 uvx 以简化设置：
```powershell
# 使用 uvx（推荐）
uvx mcp-server-git

# 或使用 pip
pip install mcp-server-git
python -m mcp_server_git
```

## 配置 Claude Desktop 使用 MCP 服务器

要将 MCP 服务器与 Claude Desktop 配合使用，需要修改 Claude Desktop 的配置文件，该文件位置取决于您的操作系统：

- Windows: `%APPDATA%\Claude\claude_desktop_config.json`（您的系统）
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

在配置文件中添加 MCP 服务器信息：

**对于 doobidoo/mcp-memory-service (Docker)**：
```json
{
  "mcpServers": {
    "memory": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-v", "$HOME/mcp-memory/chroma_db:/app/chroma_db", "-v", "$HOME/mcp-memory/backups:/app/backups", "mcp-memory-service"]
    }
  }
}
```

**对于官方内存服务器**：
```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

您还可以同时配置多个不同类型的 MCP 服务器：
```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/files"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```

## 使用 Claude Code 配置 MCP 服务器

如果您使用的是 Claude Code（命令行工具），您可以使用以下命令添加 MCP 服务器：

```powershell
# 基本语法
claude mcp add <server-name> [args...]

# 示例：添加本地服务器
claude mcp add my-server -e API_KEY=123 -- /path/to/server arg1 arg2

# 添加 Postgres MCP 服务器示例
claude mcp add postgres-server /path/to/postgres-mcp-server --connection-string "postgresql://user:pass@localhost:5432/mydb"
```

管理 MCP 服务器：
```powershell
# 列出所有配置的服务器
claude mcp list

# 获取特定服务器的详细信息
claude mcp show <server-name>
```

## 测试和验证

配置完成后：

1. 重启 Claude Desktop
2. 当 Claude 启动时，您应该看到内存服务初始化的消息：
   `MCP Memory Service initialization completed`

您还可以使用 MCP Inspector 工具进行测试和调试：
```powershell
npx @modelcontextprotocol/inspector uvx mcp-server-fetch
```

## 使用案例和功能

### 主要功能：

- 语义搜索：使用 sentence transformers 进行语义查询
- 时间基于的回忆：支持自然语言时间表达，如"上周"
- 标签检索：根据标签搜索记忆
- 持久存储：使用 ChromaDB，自动备份

### 使用案例：

- **研究**：研究人员可用一个 LLM 收集数据，保存至 Supermemory，后用另一个 LLM 生成报告，保持上下文
- **软件开发**：开发者用一个工具讨论代码问题，保存笔记，后用另一工具审查代码时可检索笔记
- **客户支持**：支持代理可使用多个 AI 工具处理客户请求，Supermemory MCP 确保客户历史信息跨工具可用

## 故障排除

如果您在使用过程中遇到问题：

**内存不足或性能慢**：
- 使用较小的批处理大小
- 使用较小的嵌入模型

**MCP 协议兼容性问题**：
- 如果看到"Method not found"错误，确保使用最新版本的 MCP Memory Service，其中包含协议兼容性修复

**Windows 上的 PyTorch 安装错误**：
- 使用 Windows 特定的安装脚本（推荐）
- 或手动安装 PyTorch

## 总结

Supermemory MCP 是一项强大的技术，它通过 Model Context Protocol 实现了不同 LLM 之间的上下文共享。通过正确设置和配置 MCP 服务器，您可以让多个 AI 工具共享记忆，大大提高工作效率，特别是在需要多工具协作的复杂场景中。

您可以根据自己的需求选择适合的 MCP 服务器实现，官方提供的服务器涵盖了多种功能，包括内存、文件系统、GitHub 等，而社区实现（如 doobidoo/mcp-memory-service）则提供了更丰富的语义搜索和持久化存储功能。 