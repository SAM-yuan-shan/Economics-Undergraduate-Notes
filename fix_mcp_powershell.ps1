Write-Host "正在修复Cursor的MCP配置..."

$config = @{
    mcpServers = @{
        memory = @{
            command = "cmd"
            args = @("/c", "npx", "-y", "@modelcontextprotocol/server-memory")
            env = @{}
        }
        "sequential-thinking" = @{
            command = "cmd"
            args = @("/c", "npx", "-y", "@modelcontextprotocol/server-sequential-thinking")
            env = @{}
        }
    }
}

$configPath = "C:\Users\13926\.cursor\mcp.json"
$config | ConvertTo-Json -Depth 10 | Set-Content -Path $configPath

Write-Host "MCP配置已成功修复到 $configPath" 