# 01-Obsidian插件-Templater使用指南

Templater是Obsidian中强大的模板插件，远超内置的模板功能，允许用户通过JavaScript代码定制动态模板。本指南基于插件设置界面截图，详细介绍各项功能及其应用场景。

## 1. 基础设置 (General Settings)

> **【设置界面描述】** 基础设置界面包含模板文件夹位置输入框、内部变量和函数链接、语法高亮开关、自动跳转光标开关等选项。

### 模板文件夹位置 (Template folder location)
- **功能**：指定存放模板文件的文件夹
- **设置方法**：在搜索框中输入文件夹路径，如`06-Templates`
- **作用**：Templater将从该文件夹读取所有可用模板

### 内部变量和函数 (Internal Variables and Functions)
- **功能**：Templater提供多种预定义变量和函数
- **查看方法**：点击"documentation"链接获取完整列表
- **常用变量**：`{{date}}`、`{{time}}`、`{{title}}`等

### 语法高亮 (Syntax Highlighting)
- **功能**：在编辑模式下为Templater命令添加语法高亮
- **建议**：保持开启，便于编辑模板文件

### 光标自动跳转 (Automatic jump to cursor)
- **功能**：插入模板后自动将光标定位到指定位置
- **使用方法**：在模板中使用`<% tp.file.cursor() %>`标记光标位置
- **手动触发**：可设置热键手动触发光标跳转

## 2. 新建文件触发模板 (Trigger Templater on new file creation)

- **功能**：创建新文件时自动应用模板
- **兼容性**：与日记插件、日历插件等配合使用
- **注意事项**：需谨慎开启，确保创建的新文件内容安全

## 3. 侧边栏图标 (Show icon in sidebar)

- **功能**：在侧边栏显示Templater图标
- **便利性**：允许快速使用模板，无需通过命令面板

## 4. 模板热键 (Template Hotkeys)

> **【设置界面描述】** 模板热键设置界面有搜索框用于选择模板文件，旁边有添加、上移、下移和删除按钮，底部有"添加新模板热键"按钮。

- **功能**：为特定模板绑定快捷键
- **设置方法**：
  1. 点击"Add new hotkey for template"
  2. 选择模板文件
  3. 设置快捷键组合
- **应用场景**：快速插入常用模板，如日记、会议记录等

## 5. 文件夹模板 (Folder Templates)

> **【设置界面描述】** 文件夹模板设置界面顶部有启用开关，下方是文件夹和模板的对应设置区域，有两个搜索框分别用于选择文件夹和对应模板，底部有添加新文件夹模板的按钮。

- **功能**：在特定文件夹中创建新文件时自动应用指定模板
- **工作原理**：使用最深匹配规则，可设置全局默认模板
- **设置步骤**：
  1. 启用"Enable Folder Templates"
  2. 点击"Add New"添加文件夹与模板的对应关系
  3. 在"Folder"框选择文件夹路径
  4. 在"Template"框选择对应模板

## 6. 启动模板 (Startup Templates)

> **【设置界面描述】** 启动模板设置界面包含一个搜索框用于选择JavaScript启动模板文件，底部有"添加新启动模板"按钮。界面上方有说明文字，解释启动模板的用途和特点。

- **功能**：Obsidian启动时自动执行指定JavaScript模板
- **特点**：不输出任何内容，仅执行代码逻辑
- **应用场景**：设置Obsidian启动钩子，如自动打开日记、执行自定义功能等
- **设置方法**：点击"Add new startup template"，选择JavaScript模板文件

### 实例：周日自动打开周记

我们已经创建了一个启动脚本`06-Templates/startup-scripts/auto-open-weekly-note.js`，该脚本会在Obsidian启动时检查当天是否为周日，如果是则自动打开或创建当周周记。配置步骤：

1. 在"Startup Templates"部分点击"Add new startup template"
2. 输入或选择`06-Templates/startup-scripts/auto-open-weekly-note.js`
3. 确认添加

#### 脚本代码解析

脚本实现的功能：
- 检测当天是否为周日
- 如果是周日，计算出当前的ISO周数
- 构建周记文件名（格式为：YYYY-W00）
- 查找或创建周记文件并自动打开

脚本工作流程：
1. 获取当前日期并检查是否为周日
2. 计算当前ISO周号
3. 构建周记文件路径
4. 检查文件是否存在：
   - 如果存在，直接打开
   - 如果不存在，尝试使用Periodic Notes插件创建
   - 如果Periodic Notes命令失败，则使用模板手动创建

此脚本具有良好的容错能力，能够适应不同情况：
- 已有周记文件
- 需要创建新周记文件
- 有无Periodic Notes插件均可工作
- 自动创建Weekly文件夹（如果不存在）

```javascript
// 自动打开周记脚本
// 在Obsidian启动时运行，如果当天是周日则自动打开当周的周记

function run() {
    // 获取当前日期
    const today = new Date();
    
    // 检查是否为周日 (0表示周日)
    if (today.getDay() === 0) {
        // 计算逻辑和打开/创建文件的代码...
        // 完整代码已保存在 06-Templates/startup-scripts/auto-open-weekly-note.js
    }
}

// 导出run函数以便Templater调用
module.exports = run;
```

完整代码已保存在`06-Templates/startup-scripts/auto-open-weekly-note.js`文件中。

## 7. 用户脚本函数 (User Script Functions)

- **功能**：加载自定义JavaScript模块，扩展Templater功能
- **设置方法**：
  1. 指定脚本文件夹位置
  2. 所有该文件夹中的JS文件会作为CommonJS模块加载
- **使用场景**：创建复杂的自定义函数，如API调用、复杂数据处理等

## 8. 用户系统命令函数 (User System Command Functions)

- **功能**：创建与系统命令关联的用户函数
- **安全性**：默认禁用，使用时需谨慎，确保只执行可信来源的命令
- **应用场景**：需要操作系统层面支持的复杂功能

## 模板语法基础

Templater使用`<% %>`作为模板标记，基本语法如下：

```
---
date: <% tp.file.creation_date() %>
title: <% tp.file.title %>
---

# <% tp.file.title %>

<% tp.file.cursor() %>
```

### 常用函数示例

1. **日期处理**
```
当前日期：<% tp.date.now() %>
格式化日期：<% tp.date.now("YYYY-MM-DD") %>
昨天：<% tp.date.yesterday("YYYY-MM-DD") %>
明天：<% tp.date.tomorrow("YYYY-MM-DD") %>
```

2. **文件操作**
```
文件标题：<% tp.file.title %>
文件创建日期：<% tp.file.creation_date("YYYY-MM-DD") %>
文件内容：<% tp.file.content %>
```

3. **系统交互**
```
用户输入：<% tp.system.prompt("请输入内容") %>
选择：<% tp.system.suggester(["选项1", "选项2"], ["值1", "值2"]) %>
```

## 高级应用：JavaScript模板

Templater的真正强大之处在于可以编写完整的JavaScript代码：

```
<%*
// 这是一个JavaScript代码块
const today = new Date();
const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const day = weekday[today.getDay()];

// 输出内容
tR += `今天是${day}，${tp.date.now("YYYY年MM月DD日")}`;

// 条件逻辑
if (day === "周五") {
  tR += "\n\n## 周末计划";
}
%>
```

## 与其他插件协同工作

- **Periodic Notes**：配合创建定期笔记（日记、周记等）
- **Dataview**：在模板中嵌入Dataview查询
- **QuickAdd**：组合使用创建更复杂的工作流

## 常见问题排查

1. **模板不加载**：检查模板文件夹路径是否正确
2. **变量无法解析**：确保语法正确，检查是否有拼写错误
3. **JavaScript报错**：查看控制台错误信息（Ctrl+Shift+I）

## 资源链接

- [Templater官方文档](https://silentvoid13.github.io/Templater/)
- [Obsidian论坛Templater专区](https://forum.obsidian.md/tag/templater) 