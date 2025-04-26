---
tags: [archive, status/reference, type/note]
created: 2025-04-26
---

# 档案内容地图 (Archives MOC)

档案是已完成或不再活跃的内容，保留以备将来参考。

## 已归档项目

```dataview
TABLE 
  file.cday as "创建日期",
  file.mday as "归档日期"
FROM #project #status/archived
SORT file.mday DESC
```

## 归档内容统计

```dataview
TABLE 
  length(rows) as "数量"
FROM #status/archived
GROUP BY file.folder
SORT length(rows) DESC
```

## 最近归档的内容

```dataview
TABLE 
  file.folder as "来源",
  file.cday as "创建日期",
  file.mday as "归档日期"
FROM #status/archived
SORT file.mday DESC
LIMIT 10
``` 