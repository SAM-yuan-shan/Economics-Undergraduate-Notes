---
date: 
type: daily-note
tags: [journal, daily]
mood: # 😊 / 😐 / 😟 (或其他您喜欢的符号)
energy: # 1-5 (或其他范围)
---
## 📝 今日完成
## 固定任务
- [ ] 练字
	- [ ] 中文
	- [ ] 英文
- [ ] python 数据分析
- [ ] 考研英语
	- [ ] 单词
	- [ ] 作文
- [ ] 六级题型
- [ ] 01经济法
- [ ] 02毛概
- [ ] 03 制度经济学
- [ ] 04 统计学
- [ ] 05 投资学
- [ ] 06 财务管理
- [ ] 07 制度经济学
- [ ] 数学竞赛
- [ ] 赚钱
- [ ] 大模型
- [ ] 产品经理
- [ ] 领导力
- [ ] 沟通
- [ ] 数据分析的能力//书籍
- [ ] 考研择校
## 新增任务


```dataviewjs
await dv.view("日历", {pages: "", view: "month", firstDayOfWeek: "1", options: "style4 navi noHead", globalfilter: "task",})
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
