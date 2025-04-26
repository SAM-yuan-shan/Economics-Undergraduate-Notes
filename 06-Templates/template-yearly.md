---
date: <% tp.date.now("YYYY-MM-DD") %>
type: yearly-review
tags: [journal, yearly]
year: <% tp.date.now("YYYY") %>
---

# 🎇 本年度回顾 (<% tp.date.now("YYYY") %>)

## ✅ 本年度主要成就 (概览)

*汇总全年每日笔记中的高优先级或标记任务，或参考季度总结*

```dataview
TASK
FROM "05-Journal/Daily"
WHERE dateformat(file.cday, "yyyy") = this.year
WHERE completed AND contains(tags, "highlight")  // 假设您会给重要任务加 #highlight 标签
SORT file.day ASC
LIMIT 50
```
*(或者，您可以选择手动总结最重要的成就)*

## 🌳 各季度回顾与主题

*回顾每个季度的亮点和挑战，可查询季度报告中的手动总结部分*

### Q1 (<% this.year %>-Q1)
```dataview
LIST WITHOUT ID L.text
FROM "05-Journal/Quarterly" FLATTEN file.lists AS L
WHERE dateformat(L.file.cday, "yyyy-'Q'q") = "<% this.year %>-Q1" // 确保文件名或元数据匹配
WHERE meta(L.section).subpath = "本季度亮点" OR meta(L.section).subpath = "总结与展望" // 查询特定标题下的内容
```
*(您需要为 Q2, Q3, Q4 创建类似的查询块)*

### Q2 (<% this.year %>-Q2)
```dataview
LIST WITHOUT ID L.text
FROM "05-Journal/Quarterly" FLATTEN file.lists AS L
WHERE dateformat(L.file.cday, "yyyy-'Q'q") = "<% this.year %>-Q2" 
WHERE meta(L.section).subpath = "本季度亮点" OR meta(L.section).subpath = "总结与展望" 
```

### Q3 (<% this.year %>-Q3)
```dataview
LIST WITHOUT ID L.text
FROM "05-Journal/Quarterly" FLATTEN file.lists AS L
WHERE dateformat(L.file.cday, "yyyy-'Q'q") = "<% this.year %>-Q3" 
WHERE meta(L.section).subpath = "本季度亮点" OR meta(L.section).subpath = "总结与展望" 
```

### Q4 (<% this.year %>-Q4)
```dataview
LIST WITHOUT ID L.text
FROM "05-Journal/Quarterly" FLATTEN file.lists AS L
WHERE dateformat(L.file.cday, "yyyy-'Q'q") = "<% this.year %>-Q4" 
WHERE meta(L.section).subpath = "本季度亮点" OR meta(L.section).subpath = "总结与展望" 
```

## 😊 全年情绪 & 精力趋势 (概览)

*展示每月或每季度的平均情绪/精力，或高低点。这部分用 Dataview 自动计算较难，建议手动总结或查询月报数据。*

```dataview
TABLE WITHOUT ID file.link AS "月份", mood AS "心情", energy AS "精力"
FROM "05-Journal/Monthly" // 从月报读取数据
WHERE dateformat(file.cday, "yyyy") = this.year
SORT file.day ASC
```

## ✨ 年度高光时刻

*总结全年最重要的 3-5 个成就或经历*
*   1. 
*   2. 
*   3. 

## 🚧 年度挑战与成长

*回顾本年度最大的挑战以及从中获得的成长*
*   -

## 💡 年度总结与展望

*对全年进行全面评估，明确下一年的大方向或主题*
*   -

## ➡️ 下一年目标

*设定下一年度的 1-3 个关键战略目标*
*   1. 
*   2. 
*   3. 

</rewritten_file> 