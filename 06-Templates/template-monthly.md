---
date: 2025-04-26 
type: monthly-review
tags: [journal, monthly]
month: 2025-04 # 或者手动输入 YYYY-MM
---

# 🗓️ 本月回顾 (2025-04)

## ✅ 本月主要成就 (按分类)

*这里可以手动总结，或者使用 Dataview 查询高亮任务*

```dataview
TASK
FROM "05-Journal/Daily"
WHERE dateformat(file.cday, "yyyy-MM") = this.month 
WHERE completed AND category
GROUP BY category
SORT rows.file.day ASC
```

## 📊 各类活动概览

*可以回顾每周报告，或使用更复杂的 Dataview 查询（如果需要）*

### 工作 (Work)
```dataview
LIST WITHOUT ID L.file.link + ": " + L.text
FROM "05-Journal/Daily" FLATTEN file.lists as L
WHERE dateformat(L.file.cday, "yyyy-MM") = this.month
WHERE contains(L.category, "work") AND L.completed
SORT L.file.day ASC
LIMIT 15 
```
*(按需修改分类和 LIMIT 数量)*

### 学习 (Learn)
```dataview
LIST WITHOUT ID L.file.link + ": " + L.text
FROM "05-Journal/Daily" FLATTEN file.lists as L
WHERE dateformat(L.file.cday, "yyyy-MM") = this.month
WHERE contains(L.category, "learn") AND L.completed
SORT L.file.day ASC
LIMIT 15
```

## 😊 本月情绪 & 精力趋势

*可以手动总结趋势，或使用图表插件（如 Obsidian Charts）配合 DataviewJS 获取数据绘图*

```dataview
TABLE WITHOUT ID file.link AS "日期", mood AS "心情", energy AS "精力"
FROM "05-Journal/Daily"
WHERE dateformat(file.cday, "yyyy-MM") = this.month
SORT file.day ASC
```

## ✨ 本月亮点与收获

*总结本月最重要的高光时刻和学到的东西*
*   -

## 🚧 挑战与反思

*回顾本月的主要挑战以及如何应对的*
*   -

## 💡 总结与展望

*对本月进行全面总结，并设定下个月的目标*
*   -

## ➡️ 下月目标

*设定下个月的 1-3 个关键目标*
*   1. 
*   2. 
*   3. 

</rewritten_file> 