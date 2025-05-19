---
uid: c5403f50-61b5-488b-9b86-24117fa4709c
---

性别：
爱好：
特长：
关系：

## 📊 历史记录

```dataviewjs
async function showProjectProgress() {
  // 当前文档的文件名和 UID（需在 frontmatter 中定义 uid 字段）
  const projectName = dv.current().file.name;
  const projectUid = dv.current().uid;

  // 假设所有日记都在 "日记" 文件夹下
  const diaryPages = dv.pages('"05-Journal/Daily"');
  let results = [];

  for (let page of diaryPages) {
    // 读取页面内容
    const content = await dv.io.load(page.file.path);
    if (!content) continue;

    // 按行拆分，并根据三种条件过滤
    const lines = content.split("\n").filter(line => {
      const hasLink    = line.includes(`[[${projectName}]]`);  // 链接形式
      const hasName    = line.includes(projectName);          // 纯文本名称
      const hasUid     = projectUid && line.includes(projectUid.toString()); // UID
      return hasLink || hasName || hasUid;
    });
    if (lines.length === 0) continue;

    // 解析文件名为日期（格式 YYYY-MM-DD）
    let dateObj = dv.date(page.file.name);
    if (!dateObj) dateObj = dv.date("1970-01-01");

    // 将命中的每一行推入结果
    for (let line of lines) {
      results.push({
        date: dateObj,
        fileLink: page.file.link,
        progress: line.trim()
      });
    }
  }

  // 如果没有任何记录
  if (results.length === 0) {
    return dv.paragraph("📭 暂无相关进展记录。");
  }

  // 按日期倒序
  results.sort((a, b) => b.date - a.date);

  // 渲染表格：日期 + 内容
  dv.table(
    ["日期", "进展"],
    results.map(r => [
      `[[${r.date.toISODate()}]]`,
      r.progress
    ])
  );
}

// 调用
await showProjectProgress();
```

