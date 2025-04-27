@echo off
echo 正在设置Cursor的MCP配置...
if not exist "C:\Users\13926\.cursor" mkdir "C:\Users\13926\.cursor"
copy "F:\kit\Rainbell0\03-Resources\03-工具\05-AI工具\03-Cursor-MCP配置文件.json" "C:\Users\13926\.cursor\mcp.json" /Y
echo MCP配置已成功安装到 C:\Users\13926\.cursor\mcp.json
pause 