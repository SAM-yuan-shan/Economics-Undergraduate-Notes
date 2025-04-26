# Doc转Markdown脚本
# 用于将Word文档转换为Markdown格式

# 源文件夹和目标文件夹
$sourceFolder = "F:\kit\Rainbell0\02-Areas\01-学习\01-经济法\01-学案"
$destinationFolder = "F:\kit\Rainbell0\02-Areas\01-学习\01-经济法\02-学案-md"

# 获取所有doc文件
$docFiles = Get-ChildItem -Path $sourceFolder -Filter "*.doc"

# 创建Word应用对象
$word = New-Object -ComObject Word.Application
$word.Visible = $false

foreach ($file in $docFiles) {
    $docPath = $file.FullName
    $fileName = $file.BaseName
    $mdFilePath = Join-Path -Path $destinationFolder -ChildPath "$fileName.md"
    
    Write-Host "正在处理文件: $fileName.doc"
    
    try {
        # 打开文档
        $doc = $word.Documents.Open($docPath)
        
        # 提取文本
        $content = $doc.Content.Text
        
        # 关闭文档
        $doc.Close()
        
        # 简单的文本处理，添加markdown格式
        # 分割为段落
        $paragraphs = $content -split "`r`n"
        
        # 创建markdown内容
        $markdownContent = "# $fileName`r`n`r`n"
        
        foreach ($paragraph in $paragraphs) {
            # 跳过空行
            if (-not [string]::IsNullOrWhiteSpace($paragraph)) {
                # 检查是否可能是标题（以数字开头的短句）
                if ($paragraph -match '^\d+(\.\d+)*\s+\S+' -and $paragraph.Length -lt 100) {
                    # 添加为二级标题
                    $markdownContent += "## $paragraph`r`n`r`n"
                }
                else {
                    # 添加为普通段落
                    $markdownContent += "$paragraph`r`n`r`n"
                }
            }
        }
        
        # 写入markdown文件
        Set-Content -Path $mdFilePath -Value $markdownContent -Encoding UTF8
        
        Write-Host "已转换并保存到: $mdFilePath"
    }
    catch {
        Write-Host "处理文件时出错: $($_.Exception.Message)"
    }
}

# 关闭Word应用
$word.Quit()

# 释放COM对象
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
[System.GC]::Collect()
[System.GC]::WaitForPendingFinalizers()

Write-Host "所有文件转换完成！" 