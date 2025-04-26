---
date: <% tp.date.now("YYYY-MM-DD") %>
type: quarterly-review
tags: [journal, quarterly]
quarter: <% tp.date.now("YYYY-[Q]Q") %> # 例如 2024-Q3
---

# 🍂 本季度回顾 (<% tp.date.now("YYYY-[Q]Q") %>)

## ✅ 本季度主要成就 (按分类)

*汇总本季度内每日笔记记录的已完成任务*

```dataview
TASK
FROM "05-Journal/Daily"
WHERE dateformat(file.cday, "yyyy-'Q'q") = this.quarter 
WHERE completed AND category
GROUP BY category
SORT rows.file.day ASC
LIMIT 50 
```
*(请注意：`dateformat(file.cday, "yyyy-'Q'q") = this.quarter` 的写法依赖 Dataview 对季度格式的支持，如果无效，可能需要更复杂的 DataviewJS 或按月份范围筛选)*

## 📊 本季度活动概览 (基于每日记录)

*列出本季度每日笔记中的主要活动条目，按分类抽样*

### 工作 (Work)
```dataview
LIST WITHOUT ID L.file.link + ": " + L.text
FROM "05-Journal/Daily" FLATTEN file.lists as L
WHERE dateformat(L.file.cday, "yyyy-'Q'q") = this.quarter
WHERE contains(L.category, "work") AND !L.task
SORT L.file.day DESC
LIMIT 20 
```

### 学习 (Learn)
```dataview
LIST WITHOUT ID L.file.link + ": " + L.text
FROM "05-Journal/Daily" FLATTEN file.lists as L
WHERE dateformat(L.file.cday, "yyyy-'Q'q") = this.quarter
WHERE contains(L.category, "learn") AND !L.task
SORT L.file.day DESC
LIMIT 20
```
*(您可以添加更多分类或调整 LIMIT 数量)*

## 🌤️ 本季度情绪 & 精力回顾

*展示本季度每日的情绪和精力记录*

```dataview
TABLE WITHOUT ID file.link AS "日期", mood AS "心情", energy AS "精力"
FROM "05-Journal/Daily"
WHERE dateformat(file.cday, "yyyy-'Q'q") = this.quarter
SORT file.day ASC
```

## ✨ 本季度亮点

*手动总结本季度最重要的高光时刻和成就，可参考月度报告*
*   - (来自 M1)
*   - (来自 M2)
*   - (来自 M3)

## 🚧 本季度挑战与反思

*回顾本季度遇到的主要困难以及如何应对的*
*   -

## 💡 总结与展望

*对本季度进行全面总结，并初步构思下个季度的方向*
*   -

## ➡️ 下季度目标

*设定下个季度的 1-3 个关键目标*
*   1. 
*   2. 
*   3. 

</rewritten_file> 