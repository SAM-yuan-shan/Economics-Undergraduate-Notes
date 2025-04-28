# Python Pandas Series数据分析基础笔记

## 课程信息
- 课程名称：Python+pyecharts+matplotlib数据分析实战教程
- 视频链接：https://www.bilibili.com/video/BV1ctZGYxE55
- 学习日期：2025-03-27

## 主要内容
本节课主要分为四个大模块：
1. 数据分析概述
2. Jupiter Notebook工具介绍
3. NumPy模块基础
4. Pandas中的Series数据类型

## 1. 数据分析概述

数据分析是指使用适当的统计方法对收集来的大量数据进行分析，最大化开发数据的价值，提取有用信息和形成结论的过程。

### 数据分析在生活中的应用
- 广告投放时间优化（基于用户使用习惯分析）
- 用户画像和标签（针对性营销）
- 金融信用评估（如支付宝花呗额度评估）
- 短视频推荐算法（基于观看行为分析）

### 数据分析的分类
从统计学角度分为：
- 描述性分析：描述现状，了解当前发生了什么
- 探索性分析：发现未知规律，从已有数据中发现新的特征
- 验证性分析：验证已有假设

从企业应用角度分为：
- 现状分析：通过日报、周报、月报了解企业运营状态
- 原因分析：探究问题背后的原因（如收入下降的原因）
- 预测分析：对未来趋势进行预测（如年度业绩目标制定）

### 数据分析流程
1. 提出问题
2. 明确目的和思路
3. 数据准备与清洗
4. 数据分析
5. 数据可视化
6. 得出结论

## 2. Jupiter Notebook工具介绍

Jupiter Notebook是一个非常好用的工具，不仅适用于Python数据分析，也适用于其他编程语言的学习。它能让用户一边写代码，一边写笔记，并可转存为各种格式。

### 打开Jupiter Notebook的方式
1. 通过Win+R打开CMD，输入`jupyter notebook`
2. 直接复制终端提供的链接到浏览器
3. 从特定目录打开（通过相对路径）

### 基本操作
- 创建新文件：点击New > Python3
- 重命名文件：点击文件名修改
- 执行代码：Shift+Enter或运行按钮
- 添加新单元格：按下方的+按钮

## 3. NumPy模块基础

NumPy是Python科学计算的基础包，提供了多维数组对象和处理这些数组的函数。

### NumPy数组创建
```python
import numpy as np

# 通过列表创建一维数组
x = np.array([1, 2, 3, 4])
print(x)  # [1 2 3 4]

# 创建二维数组
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr)
# [[1 2 3]
#  [4 5 6]]

# 使用arange创建数组
x = np.arange(1, 10)  # 从1到9的数组

# 创建全1数组
ones = np.ones((3, 2))  # 3行2列全为1的数组

# 创建全0数组
zeros = np.zeros((2, 3))  # 2行3列全为0的数组

# 创建指定值数组
full = np.full((4, 3), 8)  # 4行3列全为8的数组

# 创建单位矩阵
eye = np.eye(4)  # 4x4的单位矩阵
```

### NumPy随机数生成
```python
# 生成0~1之间的随机数
rand_num = np.random.rand()

# 生成指定形状的随机数组
rand_arr = np.random.rand(3, 4)  # 3行4列的随机数数组

# 生成正态分布随机数
norm_rand = np.random.randn(2, 2)

# 生成指定范围的随机整数
rand_int = np.random.randint(0, 100, 3)  # 0~100之间的3个随机整数
```

### NumPy数组索引和切片
```python
# 一维数组索引
arr = np.array([1, 2, 3, 4, 5])
print(arr[0])  # 1
print(arr[1:3])  # [2 3]

# 二维数组索引
arr2d = np.array([[1, 2, 3], [4, 5, 6]])
print(arr2d[1, 0])  # 4 (第二行第一列)
print(arr2d[1, 1:3])  # [5 6] (第二行的第二、三个元素)
```

## 4. Pandas中的Series数据类型

Series是pandas中的一维标签化数组，可以存储各种数据类型。

### 创建Series
```python
import pandas as pd

# 通过列表创建
obj = pd.Series([4, 7, -5, 3])

# 通过元组创建
obj2 = pd.Series((4, 7, -5, 3))

# 通过NumPy数组创建
s = pd.Series(np.random.randint(0, 100, 3))

# 通过字典创建
data = {'语文': 100, '数学': 99, '理综': 250}
s = pd.Series(data)
```

### Series的索引
Series有两种索引方式：
- 显式索引：用户自定义的索引（如字典的键）
- 隐式索引：自动创建的从0开始的整数索引

```python
# 显式索引访问
s['语文']  # 100

# 隐式索引访问
obj[0]  # 4
```

### Series的切片
- 显式索引切片：左闭右闭区间
- 隐式索引切片：左闭右开区间

```python
# 显式索引切片
s['数学':'理综']  # 包含'数学'和'理综'

# 隐式索引切片
obj[1:3]  # 包含索引1但不包含索引3
```

### 多个元素索引
```python
# 显式索引
s[['语文', '理综']]  # 选择'语文'和'理综'

# 隐式索引
obj[[0, 2]]  # 选择索引为0和2的元素
```

### Series的属性
- `index`：获取索引
- `values`：获取值
- `name`：索引的名称
- `shape`：数据形状
- `size`：元素个数
- `dtype`：数据类型

```python
s.index  # 查看索引
s.values  # 查看值
s.index.name = '索引'  # 设置索引名称
s.shape  # 返回形状，如(3,)
s.size  # 返回元素个数
s.dtype  # 返回数据类型
```

### Series的方法
- `to_list()`：转换为列表
- `to_dict()`：转换为字典
- `isna()`/`isnull()`：判断缺失值
- `append()`：拼接Series
- `reset_index()`：重置索引
- `drop()`：删除元素
- `sort_index()`：按索引排序
- `sort_values()`：按值排序

```python
# 转换为列表
lst = s.to_list()

# 转换为字典
dic = s.to_dict()

# 判断缺失值
s.isna()  # 返回布尔值Series

# 拼接Series
result = obj.append(obj2)

# 重置索引
result.reset_index(drop=True)  # drop=True表示不保留原索引

# 删除元素
s.drop('语文')  # 不修改原Series
s.drop('语文', inplace=True)  # inplace=True表示修改原Series

# 按索引排序
obj.sort_index()  # 升序
obj.sort_index(ascending=False)  # 降序

# 按值排序
obj.sort_values()  # 升序
obj.sort_values(ascending=False)  # 降序
```

### Series的统计方法
- `min()`：最小值
- `max()`：最大值
- `mean()`：平均值
- `median()`：中位数
- `describe()`：汇总统计

```python
s.min()  # 最小值
s.max()  # 最大值
s.mean()  # 平均值
s.median()  # 中位数
s.describe()  # 返回count, mean, std, min, 25%, 50%, 75%, max
```

### 读取文件
```python
# 读取Excel文件
df = pd.read_excel('豆瓣电影数据.xlsx')

# 查看前几行
df.head()

# 获取单列数据（返回Series）
year_series = df['年代']
```

## 总结
本节课介绍了数据分析基础概念，Jupiter Notebook的使用，NumPy模块以及Pandas的Series数据类型。Series作为Pandas中的基础数据结构，是进行数据分析的重要工具。在下一节课中，将学习Pandas中的DataFrame数据类型。 