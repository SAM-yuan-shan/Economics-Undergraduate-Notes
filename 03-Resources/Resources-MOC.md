---
tags: [resource, status/reference, type/note]
created: 2025-04-26
---

# 资源内容地图 (Resources MOC)

资源是对您感兴趣并可能在将来有用的信息和材料。

## 学习资料

```dataview
TABLE 
  file.cday as "创建日期",
  file.mday as "最后修改"
FROM "03-Resources/学习资料"
SORT file.name ASC
```

## 阅读

```dataview
TABLE 
  file.cday as "创建日期"
FROM "03-Resources/阅读" AND #type/book
SORT file.cday DESC
```

## 工具

```dataview
TABLE 
  file.cday as "创建日期"
FROM "03-Resources/工具"
SORT file.name ASC
```

## 知识卡片

```dataview
TABLE 
  file.cday as "创建日期"
FROM "03-Resources/知识卡片"
SORT file.name ASC
LIMIT 20
```

## 按主题查看资源

### 最近添加的资源

```dataview
TABLE 
  file.folder as "文件夹",
  file.mday as "最后修改"
FROM #resource
SORT file.cday DESC
LIMIT 10
``` 