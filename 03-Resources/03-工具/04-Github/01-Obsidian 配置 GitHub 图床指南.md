# Obsidian 配置 GitHub 图床指南

本文总结了使用 GitHub 作为 Obsidian 图床的配置过程，主要涉及 GitHub 仓库、PicGo 软件和 Obsidian 插件。

## 参考链接

*   [如何用github搭建图床（亲测有效） - CSDN博客](https://blog.csdn.net/xdnxl/article/details/129466060)

## 核心步骤

### 1. GitHub 准备

*   **创建公开仓库：** 在 GitHub 上创建一个新的 **公开 (Public)** 仓库用于存放图片 (例如: `my-notes-assets`)。
*   **生成 PAT (Personal Access Token)：**
    *   前往 GitHub -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic)。
    *   生成新的 Token (classic)。
    *   **权限 (Scopes):** 必须勾选 `repo` 权限。
    *   **保存 Token:** 生成的 Token 只显示一次，务必立即复制并妥善保存。

### 2. PicGo 配置

*   **下载安装 PicGo:** 从官方渠道或镜像站下载并安装 PicGo。
*   **安装 `github-plus` 插件:** 在 PicGo 的 "插件设置" 中搜索并安装 `github-plus` 插件。可能需要重启 PicGo。
    *   **网络问题:** 如果搜索不到插件，检查 GitHub 网络连接，可尝试使用 Watt Toolkit (原 Steam++) 辅助。
*   **配置 GitHubPlus 图床:**
    *   **`repo`:** 格式为 `GitHub用户名/仓库名` (例如: `SAMLAY-c/my-notes-assets`)。
    *   **`branch`:** 仓库的主分支名 (通常是 `main`)。
    *   **`token`:** 粘贴之前保存的 GitHub PAT。
    *   **`path`:** 仓库内图片存放路径 (可选，如 `img/`)。
    *   **`customUrl` (重要):** 使用 jsDelivr CDN 加速，格式为 `https://cdn.jsdelivr.net/gh/用户名/仓库名@分支名` (例如: `https://cdn.jsdelivr.net/gh/SAMLAY-c/my-notes-assets@main`)。
    *   **`origin`:** 选择 `github`。
*   **设为默认图床:** 确保 GitHubPlus 是 PicGo 的默认图床。
*   **开启 PicGo Server:** 在 "PicGo 设置" -> "设置 Server" 中，确保 "开启 Server" 选项是打开的，并记住监听端口 (默认 `36677`)。

### 3. Obsidian 插件配置

*   **安装 `Image auto upload plugin`:** 在 Obsidian 的第三方插件市场中安装并启用此插件。
*   **配置插件:**
    *   **Default uploader:** 设置为 `PicGo(app)`。
    *   **PicGo Server 端口:** 确保插件设置中的端口号与 PicGo Server 的监听端口一致。
    *   **删除原图选项:** "Whether to delete the image in the original path after upload?"
        *   **勾选 (是):** 上传成功后删除本地 Vault 中的原图，节省空间。
        *   **不勾选 (否):** 保留本地 Vault 中的原图作为备份。

## 常见问题与排查

*   **PicGo 无法搜索/安装插件:**
    *   检查网络连接，特别是 GitHub 访问。
    *   尝试使用 Watt Toolkit 等工具优化网络。
*   **Obsidian 上传图片报错 `net::ERR_CONNECTION_CLOSED`:**
    *   **确认 PicGo 运行:** 确保 PicGo 程序在后台运行。
    *   **重启应用:** 尝试重启 PicGo 和 Obsidian。
    *   **检查 PicGo Server:** 确认 PicGo Server 已开启且端口正确。
    *   **检查 Obsidian 插件设置:** 确认插件连接的是正确的 PicGo 端口。
    *   **检查防火墙/杀毒软件:** 暂时禁用或添加例外规则，允许 Obsidian 和 PicGo 本地通信。

## 使用流程

1.  确保 PicGo 在后台运行。
2.  在 Obsidian 中粘贴或拖入图片。
3.  插件自动调用 PicGo 上传至 GitHub。
4.  插件自动将笔记中的本地图片链接替换为 CDN URL。

---
此笔记记录了配置过程中的关键信息和遇到的问题，便于日后查阅。 
![image.png](https://raw.githubusercontent.com/SAMLAY-c/obsidian-photos/university/img/20250426171414066.png)
