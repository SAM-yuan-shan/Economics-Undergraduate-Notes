---
tags: [project, status/reference, type/note]
created: 2025-04-26
---

# 项目内容地图 (Projects MOC)

项目是有明确目标和截止日期的临时性工作。

## 活跃项目

```dataview
TABLE 
  file.cday as "创建日期",
  file.mday as "最后修改"
FROM #project #status/active
SORT file.mday DESC
```

## 计划中项目

```dataview
TABLE 
  file.cday as "创建日期"
FROM #project #status/planned
SORT file.cday DESC
```

## 已完成项目

```dataview
TABLE 
  file.cday as "创建日期",
  file.mday as "完成日期"
FROM #project #status/completed
SORT file.mday DESC
LIMIT 10
```

## 项目模板

要创建新项目，请使用项目模板：

![[项目模板]] 