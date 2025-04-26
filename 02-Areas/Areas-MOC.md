---
tags: [area, status/reference, type/note]
created: 2025-04-26
---

# 领域内容地图 (Areas MOC)

领域是需要持续关注和维护的责任区域，没有明确的完成日期。

## 日常管理

```dataview
TABLE 
  file.cday as "创建日期",
  file.mday as "最后修改"
FROM "02-Areas/日常管理"
SORT file.name ASC
```

## 人际关系

```dataview
TABLE 
  file.cday as "创建日期"
FROM "02-Areas/人际关系"
SORT file.name ASC
```

## 工作

```dataview
TABLE 
  file.cday as "创建日期"
FROM "02-Areas/工作"
SORT file.name ASC
```

## 按标签查看领域笔记

### 活跃领域笔记

```dataview
TABLE 
  file.folder as "文件夹",
  file.mday as "最后修改"
FROM #area #status/active
SORT file.mday DESC
``` 