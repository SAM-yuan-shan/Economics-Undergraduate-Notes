---
date: {{date:YYYY-MM-DD}}
type: weekly-review
tags: [journal, weekly]
week: {{date:YYYY-[W]ww}}
---

# 📅 本周回顾 ({{date:YYYY-[W]ww}})

## ✅ 本周完成的任务 (按分类)

```dataview
TASK
FROM "05-Journal/Daily"
WHERE file.cday >= date(this.file.cday) - dur(7 days) AND file.cday <= date(this.file.cday) 
WHERE completed AND category
GROUP BY category
SORT rows.file.day ASC
```

## 投入时间的主要活动 (按分类)

*注意：这里列出的是记录的条目，不是精确时间统计*

### 工作 (Work)
```dataview
LIST L.text
FROM "05-Journal/Daily" FLATTEN file.lists as L
WHERE file.cday >= date(this.file.cday) - dur(7 days) AND file.cday <= date(this.file.cday)
WHERE contains(L.category, "work") AND !L.task
SORT L.file.day ASC
```

### 学习 (Learn)
```dataview
LIST L.text
FROM "05-Journal/Daily" FLATTEN file.lists as L
WHERE file.cday >= date(this.file.cday) - dur(7 days) AND file.cday <= date(this.file.cday)
WHERE contains(L.category, "learn") AND !L.task
SORT L.file.day ASC
```

### 生活 (Life)
```dataview
LIST L.text
FROM "05-Journal/Daily" FLATTEN file.lists as L
WHERE file.cday >= date(this.file.cday) - dur(7 days) AND file.cday <= date(this.file.cday)
WHERE contains(L.category, "life") AND !L.task
SORT L.file.day ASC
```

### 健康 (Health)
```dataview
LIST L.text
FROM "05-Journal/Daily" FLATTEN file.lists as L
WHERE file.cday >= date(this.file.cday) - dur(7 days) AND file.cday <= date(this.file.cday)
WHERE contains(L.category, "health") AND !L.task
SORT L.file.day ASC
```
*(您可以根据需要添加或修改分类)*

## 😊 本周情绪 & 精力概览

```dataview
TABLE WITHOUT ID file.link AS "日期", mood AS "心情", energy AS "精力"
FROM "05-Journal/Daily"
WHERE file.cday >= date(this.file.cday) - dur(7 days) AND file.cday <= date(this.file.cday) 
SORT file.day ASC
```

## ✨ 本周亮点

*回顾每日笔记中的亮点，总结本周的高光时刻*
*   - 

## 🚧 挑战与困难

*本周遇到了哪些问题？如何解决的？*
*   - 

## ❤️ 每周伴侣感恩回顾
*回顾本周对伴侣的感激之处，可以参考每日记录*
*   - 

## 💡 总结与改进

*对本周进行总结，下周可以改进的地方*
*   

## ➡️ 下周计划

*下周的关键目标或重点任务*
*   - [ ] 