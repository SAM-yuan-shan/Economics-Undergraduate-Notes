# 00-Pandas基础概念

## 什么是Pandas

Pandas是Python中最流行的数据分析库，提供了高性能、易用的数据结构和数据分析工具。它建立在NumPy之上，为处理表格数据（如电子表格或SQL表）和时间序列数据提供了专门的功能。

Pandas名称源自"Panel Data"（面板数据）的缩写，反映了它最初的设计目标：处理多维结构化数据。

## Pandas的核心数据结构

Pandas主要提供两种数据结构：Series和DataFrame。

### 1. Series

Series是一种一维标记数组，能够保存任何数据类型（整数、字符串、浮点数、Python对象等）。它由两个主要部分组成：

- **index（索引）**：数据的标签，类似于字典的键
- **values（值）**：实际数据内容

```python
import pandas as pd

# 创建Series
s = pd.Series([10, 20, 30, 40], index=['a', 'b', 'c', 'd'])
print(s)
```

输出：
```
a    10
b    20
c    30
d    40
dtype: int64
```

Series的特点：
- 类似于带标签的一维NumPy数组
- 也类似于Python字典（索引-值对应）
- 支持向量化操作

### 2. DataFrame

DataFrame是一个二维标记数据结构，有列和行索引。可以将其视为一个表格或多个共享同一索引的Series的集合。

```python
# 创建DataFrame
df = pd.DataFrame({
    'A': [1, 2, 3, 4],
    'B': ['a', 'b', 'c', 'd'],
    'C': [10.1, 20.2, 30.3, 40.4]
})
print(df)
```

输出：
```
   A  B     C
0  1  a  10.1
1  2  b  20.2
2  3  c  30.3
3  4  d  40.4
```

DataFrame的特点：
- 类似于电子表格或SQL表
- 每列可以包含不同的数据类型
- 有行索引和列标签
- 支持复杂的数据对齐和整合操作

## 创建Pandas对象的常用方法

### 1. 创建Series

```python
# 从列表创建
s1 = pd.Series([1, 2, 3, 4])

# 从字典创建
s2 = pd.Series({'a': 10, 'b': 20, 'c': 30})

# 指定索引
s3 = pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])

# 创建带名称的Series
s4 = pd.Series([1, 2, 3, 4], name='numbers')
```

### 2. 创建DataFrame

```python
# 从字典创建（字典的键成为列名）
df1 = pd.DataFrame({
    'A': [1, 2, 3],
    'B': ['a', 'b', 'c']
})

# 从列表的列表创建
df2 = pd.DataFrame([
    [1, 'a'],
    [2, 'b'],
    [3, 'c']
], columns=['A', 'B'])

# 从Series字典创建
df3 = pd.DataFrame({
    'A': pd.Series([1, 2, 3]),
    'B': pd.Series(['a', 'b', 'c'])
})

# 从CSV文件创建
df4 = pd.read_csv('data.csv')

# 从Excel文件创建
df5 = pd.read_excel('data.xlsx')
```

## 查看数据的基本方法

Pandas提供了多种查看数据的方法：

```python
# 查看DataFrame的前几行
df.head()

# 查看DataFrame的后几行
df.tail()

# 查看DataFrame的基本信息
df.info()

# 查看数值型列的统计摘要
df.describe()

# 查看索引
df.index

# 查看列名
df.columns

# 将数据转为NumPy数组
df.values
```

## 索引与选择数据

Pandas提供了多种方法来选择和访问数据：

### Series的索引

```python
s = pd.Series([10, 20, 30, 40], index=['a', 'b', 'c', 'd'])

# 通过位置访问（整数索引）
s[0]      # 10
s.iloc[0] # 10 (更明确的位置索引)

# 通过标签访问
s['a']    # 10
s.loc['a'] # 10 (更明确的标签索引)
```

### DataFrame的索引

```python
df = pd.DataFrame({
    'A': [1, 2, 3, 4],
    'B': ['a', 'b', 'c', 'd'],
    'C': [10.1, 20.2, 30.3, 40.4]
})

# 选择列
df['A']         # 返回Series
df[['A', 'B']]  # 返回包含A、B列的DataFrame

# 选择行（通过整数位置）
df.iloc[0]      # 第一行
df.iloc[0:2]    # 前两行

# 选择行（通过标签）
df.loc[0]       # 索引为0的行
df.loc[0:2]     # 索引从0到2的行

# 选择特定的单元格
df.iloc[0, 0]   # 第一行第一列的值
df.loc[0, 'A']  # 索引为0的行，列名为'A'的值

# 条件选择
df[df['A'] > 2] # 选择A列值大于2的所有行
```

## Pandas的数据类型

Pandas引入了自己的数据类型系统，常见的包括：

- `object`: 字符串或混合类型
- `int64`: 整数
- `float64`: 浮点数
- `bool`: 布尔值
- `datetime64`: 日期时间
- `timedelta[ns]`: 时间间隔
- `category`: 分类数据

可以使用`df.dtypes`查看DataFrame各列的数据类型。

## Pandas与NumPy的关系

Pandas建立在NumPy之上，利用了NumPy的高性能数组计算功能：

- Pandas的Series和DataFrame的底层数据存储使用NumPy数组
- 大部分NumPy函数可以直接应用于Pandas对象
- Pandas扩展了NumPy的功能，增加了处理缺失数据、合并数据集等更高级的功能

```python
# NumPy函数应用于Pandas对象
import numpy as np
df['A'].mean()     # Pandas方法
np.mean(df['A'])   # NumPy函数，效果相同
```

## 学习资源

- [Pandas官方文档](https://pandas.pydata.org/docs/)
- 《利用Python进行数据分析》- Wes McKinney（Pandas创建者）
- [10分钟入门Pandas](https://pandas.pydata.org/docs/user_guide/10min.html)
- [带着问题学Pandas视频教程](https://www.bilibili.com/video/BV1v94y1Y7Nm/)

## 关联知识点

- [[01-Series索引方法]] - Series的索引技术
- [[02-DataFrame操作]] - DataFrame的创建与操作
- [[04-数据清洗]] - 处理缺失值和不规则数据 