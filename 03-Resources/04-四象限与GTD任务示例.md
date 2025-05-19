```dataviewjs
await dv.view("日历", {pages: "", view: "month", firstDayOfWeek: "1", options: "style4 navi noHead", globalfilter: "task",})
```

## 第一象限：重要且紧急（优先处理）

### 下一步行动（#todo/next-action 
- [ ] ⏫ 完成经济法期末复习报告 #task #todo/next-action #q1
- [ ] ⏫ 提交学期论文最终版 #task #todo/next-action #q1
- [ ] ⏫ 准备明天的演讲稿 #task #todo/next-action #q1

### 等待中（#todo/waiting-for 
- [ ] ⏫ 等待导师批改实验报告 #task #todo/waiting-for #q1
- [ ] ⏫ 等待团队成员提交项目进度更新 #task #todo/waiting-for #q1

## 第二象限：重要不紧急（投资未来）

### 下一步行动（#todo/next-action #q2）
- [ ] ⏫ 研究经济法案例分析方法论 #task #todo/next-action #q2
- [ ] ⏫ 系统学习数据分析技能（Python基础） #task #todo/next-action #q2
- [ ] ⏫ 复习微观经济学关键概念 #task #todo/next-action #q2

### 等待中（#todo/waiting-for #q2）
- [ ] ⏫ 等待学习资源推荐 #task #todo/waiting-for #q2

### 将来/也许（#todo/someday-maybe #q2）
- [ ] ⏫ 考虑参加经济法辩论比赛 #task #todo/someday-maybe #q2
- [ ] ⏫ 探索考研可能性 #task #todo/someday-maybe #q2

## 第三象限：紧急不重要（考虑委派）

### 下一步行动（#todo/next-action #q3）
- [ ] 🔽 回复同学邮件关于课程安排 #task #todo/next-action #q3
- [ ] 🔽 整理上周笔记文件夹 #task #todo/next-action #q3
- [ ] 🔽 安排下周小组会议时间 #task #todo/next-action #q3

### 等待中（#todo/waiting-for #q3）
- [ ] 🔽 等待室友确认宿舍物品清单 #task #todo/waiting-for #q3

## 第四象限：不紧急不重要（减少时间投入）

### 将来/也许（#todo/someday-maybe #q4）
- [ ] 🔽 整理书架和收纳空间 #task #todo/someday-maybe #q4
- [ ] 🔽 浏览新的笔记应用评测 #task #todo/someday-maybe #q4
- [ ] 🔽 制作个人社交媒体头像 #task #todo/someday-maybe #q4

## 收件箱（未分类任务）

- [ ] 查找经济法案例参考资料 #task #todo/inbox
- [ ] 联系学习小组讨论复习计划 #task #todo/inbox
- [ ] 更新学习进度表 #task #todo/inbox 

## 🚀 进行中的项目 (来自项目仪表盘)


## 🎯 所有项目任务概览 (来自项目仪表盘)

### ⏳ 近期到期 (未来7天)
```tasks
not done
due before in 7 days
path includes 01-Projects
# 任务描述中可以包含指向项目概述页的链接，例如 [[00-改简历-项目概述]]
# 或者使用项目特定标签，例如 #改简历项目
# 请根据您的实际任务记录方式调整下面的 description 或 tag 过滤
(description includes [[00-改简历-项目概述]]) OR (description includes [[00-学习编程-项目概述]]) OR (tags includes #改简历项目) OR (tags includes #学习编程项目)
group by due
short mode
```

### ❗ 逾期任务
```tasks
not done
due before today
path includes 01-Projects
(description includes [[00-改简历-项目概述]]) OR (description includes [[00-学习编程-项目概述]]) OR (tags includes #改简历项目) OR (tags includes #学习编程项目)
group by due
short mode
```

### 📋 按项目分组的所有未完成任务
```tasks
not done
path includes 01-Projects
# 按任务所在的项目文件夹名称分组
group by function task.file.folder.split("/").slice(-1)[0]
short mode
```

## ✅ 已完成项目 (来自项目仪表盘)
```dataview
TABLE WITHOUT ID
    link(file.link, default(file.name, "概览")) AS "项目名称",
    status AS "状态",
    completionDate AS "完成日期",
    projectType AS "类型"
FROM #project AND !"06-Templates"
WHERE status = "已完成" OR status = "已归档"
SORT completionDate DESC
``` 