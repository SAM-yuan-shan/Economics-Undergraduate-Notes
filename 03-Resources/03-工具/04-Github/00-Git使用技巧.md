# Git使用技巧

## 空文件夹不会被Git跟踪的问题

### 问题描述

在使用Git管理项目时，如果创建了空文件夹，这些文件夹不会被Git跟踪和提交到仓库中。这是因为Git的设计理念是跟踪文件内容的变化，而不是文件夹结构。

当在本地创建了很多层级的文件夹结构（如PARA系统），但没有在其中放入任何文件时，这些空文件夹不会被包含在Git提交中，导致GitHub上看不到这些文件夹。

### 解决方案

解决这个问题的常用方法是在每个需要保留的文件夹中放入至少一个文件。常见做法包括：

1. **添加README.md文件**：在每个文件夹中创建README.md文件，简要说明该文件夹的用途。
   
2. **添加.gitkeep文件**：创建一个名为.gitkeep的空文件（这是一个约定俗成的名称，Git本身不认识这个文件，但开发者理解其含义）。

### 实现方法

以下是一个PowerShell脚本，用于在多个文件夹中批量创建README.md文件：

```powershell
# 定义需要添加README的文件夹列表
$folders = @(
    "01-Projects/01-竞赛项目/01-安永ESG竞赛",
    "01-Projects/01-竞赛项目/02-建模大赛"
    # 更多文件夹...
)

# 为每个文件夹创建README.md
foreach ($folder in $folders) {
    $folderName = Split-Path -Leaf $folder
    $readmeContent = "# $folderName`n`n此文件夹用于存储相关内容"
    Set-Content -Path "$folder/README.md" -Value $readmeContent
    Write-Host "已创建 $folder/README.md"
}
```

### 好处

1. 使Git能够跟踪并提交这些文件夹
2. 在GitHub上浏览时，每个文件夹都会显示相关说明，提高项目的可读性
3. README.md文件会在GitHub上自动显示，为访问者提供上下文信息

### 注意事项

- 这个解决方案会在仓库中增加额外的文件
- 如果项目很大，有很多文件夹，可能会创建大量的小文件
- 定期维护和更新README文件的内容也很重要，以保持文档的准确性 