# Git项目维护

## PARA系统GitHub同步问题解决

### 问题背景

在构建PARA系统（Projects项目、Areas领域、Resources资源、Archives存档）文件夹结构时，创建了多层级的文件夹组织。但将变更推送到GitHub后发现，所有的空文件夹都没有显示在GitHub仓库中。

### 问题原因

经过调查，发现这是因为Git的设计机制导致的：**Git不会追踪空文件夹**。Git的设计理念是跟踪文件内容的变化，而不是文件夹结构。当文件夹中没有任何文件时，Git会忽略这些文件夹。

### 解决方案

为了解决这个问题，我们在每个文件夹中添加了一个README.md文件，内容简要说明该文件夹的用途。具体实施步骤：

1. 编写PowerShell脚本自动为所有文件夹创建README.md文件
   ```powershell
   $folders = @(
       "01-Projects/01-竞赛项目/01-安永ESG竞赛", 
       "01-Projects/01-竞赛项目/02-建模大赛",
       # 更多文件夹...
   )
   
   foreach ($folder in $folders) {
       $folderName = Split-Path -Leaf $folder
       $readmeContent = "# $folderName`n`n此文件夹用于存储相关内容"
       Set-Content -Path "$folder/README.md" -Value $readmeContent
   }
   ```

2. 将变更提交到Git仓库
   ```bash
   git add .
   git commit -m "添加README文件到所有文件夹，使其在GitHub上可见"
   git push
   ```

### 结果

通过添加README.md文件，所有文件夹结构都成功显示在GitHub仓库中，完整保留了PARA系统的层级结构。这种方法不仅解决了文件夹不可见的问题，还增加了项目的可读性，因为每个文件夹都有对应的说明文档。

### 经验总结

1. Git只跟踪文件，不跟踪空文件夹
2. 在需要保留的空文件夹中添加文件（如README.md或.gitkeep）可以解决问题
3. 批量处理大量文件夹时，使用脚本可以提高效率
4. README.md文件不仅解决了技术问题，还提高了项目的文档化水平

### 相关资源

更详细的Git使用技巧请参考：[03-Resources/03-工具/00-Git使用技巧.md](../03-Resources/03-工具/00-Git使用技巧.md) 