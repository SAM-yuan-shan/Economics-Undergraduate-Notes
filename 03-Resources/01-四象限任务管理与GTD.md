---
cssclass: quadrant-view
---

# 四象限任务管理与GTD整合系统

> [!note] 双系统集成
> 这个页面整合了**四象限任务管理**和**GTD方法**，同时显示日历视图，让您能够综合利用这两种任务管理系统的优势。

## 日历视图
```dataviewjs
await dv.view("日历", {pages: "", view: "month", firstDayOfWeek: "1", options: "style4 navi noHead", globalfilter: "task" });
```

## 四象限任务管理

> [!info] 四象限任务管理法
> - 第一象限：**重要且紧急**的任务
> - 第二象限：**重要但不紧急**的任务
> - 第三象限：**紧急但不重要**的任务
> - 第四象限：**不重要不紧急**的任务

```dataviewjs
let options = {
	pages: "dv.pages('#task or #todo')",
	view: "week",
	firstDayOfWeek: "1",
	options: "style1 quadrant-style", // 使用自定义四象限样式
	dailyNoteFolder: "",
	dailyNoteFormat: "",
	startPosition: "",
	css: "",
	defaultDateHover: ""
}

await dv.view("日历/view", options)
```

## GTD工作流

> [!tip] GTD核心流程
> 1. **收集 (Capture)**：将所有想法、任务收集到收件箱
> 2. **处理 (Process)**：决定每个项目的下一步行动
> 3. **组织 (Organize)**：将任务分类到合适的列表
> 4. **回顾 (Review)**：定期检查和更新系统
> 5. **执行 (Engage)**：选择任务并执行

### 任务分类指南

在Obsidian中使用以下标签组织GTD任务：

- **#todo/inbox** - 收件箱，所有新任务的起点
- **#todo/next-action** - 明确的下一步行动
- **#todo/waiting-for** - 等待他人完成的任务
- **#todo/someday-maybe** - 未来可能要做的事情

### 结合四象限与GTD

将GTD与四象限结合使用的建议：

1. 使用GTD的**收集**和**处理**阶段来捕获和澄清所有任务
2. 在**组织**阶段，按照四象限方法对任务进行分类：
   - **重要且紧急** (#q1) 的任务标记为 **#todo/next-action** 并设置近期截止日期
   - **重要不紧急** (#q2) 的任务可以是 **#todo/next-action**，但有更长的时间框架
   - **紧急不重要** (#q3) 的任务可以考虑委派，标记为 **#todo/waiting-for**
   - **不紧急不重要** (#q4) 的任务可以标记为 **#todo/someday-maybe**

## 创建任务的方式

### 完整格式（包含四象限和GTD标签）
```
- [ ] 完成经济法报告 #task #todo/next-action #q1 ⏫ 📅 2023-06-15
```

### 简化格式（优先级和日期）
```
- [ ] 学习新章节 #todo/next-action ⏫ 📅 2023-07-15
```

## 任务的常用属性

- **优先级**：⏫(高)、🔼(中)、🔽(低)
- **日期**：📅(截止日期)、⏳(计划日期)、🛫(开始日期)
- **状态**：可以使用Tasks插件的自定义状态，如 / (进行中)、- (已取消)

## 最佳实践

- 每日回顾收件箱 (#todo/inbox)，将任务分类到适当的GTD列表和四象限中
- 专注于第二象限 (#q2) 的 #todo/next-action 任务，它们通常能带来长期价值
- 利用Checklist插件侧边栏快速浏览GTD分类的任务
- 使用四象限视图获得任务的全局视角，帮助做出更好的优先级决策 