---
date: 2025-04-26  # 或者手动输入 YYYY-MM-DD
type: daily-note
tags: [journal, daily]
mood: # 😊 / 😐 / 😟 (或其他您喜欢的符号)
energy: # 1-5 (或其他范围)
---
## 📝 今日完成

*在这里添加您今天完成的任务，记得分类*
- [ ]  
## 📅 近期任务列表 (Tasks 插件) (最多20条)
```tasks

not done

has due date

sort by due asc

limit 20

```
## ⏰ 时间日志

> [!tip] 时间记录
> 或者执行命令: Ctrl+P → Templater: Open Insert Template → 01-添加时间日志条目



## 📝 今日笔记活动 (创建或修改)
```dataview

TABLE WITHOUT ID
    file.folder AS "来源文件夹",
    file.link AS "笔记",
    file.ctime AS "创建时间",
    file.mtime AS "修改时间"
FROM ""
WHERE (file.cday = date(today) OR file.mday = date(today)) AND file.path != this.file.path
SORT file.mtime DESC
LIMIT 20
```
## ✨ 亮点与成就
*记录今天值得称赞或让你开心的事情*
*   

## ❤️ 每日感恩伴侣三件事
*记录让你感激伴侣的三件事*
1.  
2.  
3.  

## 🤔 思考与反思
*记录今天的想法、遇到的问题、学到的教训等*
- 想法
	- 
- 问题
	- 
- 教训
	- 
## ➡️ 明日计划
*简要列出明天最重要的几件事*
- [ ] 把统计学