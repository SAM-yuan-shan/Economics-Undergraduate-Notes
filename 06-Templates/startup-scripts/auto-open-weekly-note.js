// 自动打开周记脚本
// 在Obsidian启动时运行，如果当天是周日则自动打开当周的周记

function run() {
    // 获取当前日期
    const today = new Date();
    
    // 检查是否为周日 (0表示周日)
    if (today.getDay() === 0) {
        // 计算当前周数
        const currentDate = new Date(today);
        // 获取本年第一天
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        // 计算自本年第一天以来的天数
        const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000;
        // 计算周数 (ISO标准，周一为一周的开始)
        const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        
        // 格式化年份和周数
        const year = today.getFullYear();
        const weekStr = weekNumber.toString().padStart(2, '0');
        
        // 构建周记文件名 (基于 YYYY-[W]ww 格式)
        const weeklyNoteFilename = `${year}-W${weekStr}`;
        
        // 周记文件路径 (根据你的实际结构调整)
        // 假设你的周记存放在 05-Journal/Weekly 文件夹下
        const weeklyNotePath = `05-Journal/Weekly/${weeklyNoteFilename}.md`;

        // 等待一小段时间确保Obsidian已完全加载
        setTimeout(async () => {
            try {
                // 检查文件是否存在
                const file = app.vault.getAbstractFileByPath(weeklyNotePath);
                
                if (file) {
                    // 如果文件存在，直接打开
                    await app.workspace.getLeaf().openFile(file);
                    console.log(`已自动打开本周周记: ${weeklyNoteFilename}`);
                } else {
                    // 如果文件不存在，尝试使用Periodic Notes创建并打开
                    // 注意：这依赖于你已安装并配置了Periodic Notes插件
                    try {
                        // 尝试通过命令创建/打开周记
                        await app.commands.executeCommandById('periodic-notes:open-weekly-note');
                        console.log(`已通过Periodic Notes创建并打开本周周记`);
                    } catch (err) {
                        // 如果Periodic Notes命令失败，尝试直接创建文件
                        // 获取周记模板内容
                        const templatePath = "06-Templates/template-weekly.md";
                        let templateContent = "";
                        
                        try {
                            const templateFile = app.vault.getAbstractFileByPath(templatePath);
                            if (templateFile) {
                                templateContent = await app.vault.read(templateFile);
                                
                                // 替换模板中的日期变量
                                const dateStr = `${year}-${(today.getMonth()+1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
                                templateContent = templateContent.replace(/{{date:YYYY-MM-DD}}/g, dateStr);
                                templateContent = templateContent.replace(/{{date:YYYY-\[W\]ww}}/g, weeklyNoteFilename);
                                
                                // 创建新的周记文件
                                const weeklyDir = "05-Journal/Weekly";
                                if (!app.vault.getAbstractFileByPath(weeklyDir)) {
                                    await app.vault.createFolder(weeklyDir);
                                }
                                
                                const newFile = await app.vault.create(weeklyNotePath, templateContent);
                                await app.workspace.getLeaf().openFile(newFile);
                                console.log(`已创建并打开本周周记: ${weeklyNoteFilename}`);
                            } else {
                                console.error(`找不到周记模板: ${templatePath}`);
                            }
                        } catch (templateErr) {
                            console.error(`创建周记时出错: ${templateErr}`);
                        }
                    }
                }
            } catch (e) {
                console.error(`自动打开周记时出错: ${e}`);
            }
        }, 3000); // 等待3秒确保Obsidian完全加载
    }
}

// 导出run函数以便Templater调用
module.exports = run; 