# RSA加密登录原理与爬虫应对策略

## 1. RSA加密基本原理

RSA是一种非对称加密算法，基于大整数因子分解的数学难题。它使用一对密钥：

- **公钥**：用于加密数据，可以公开分享
- **私钥**：用于解密数据，必须保密

RSA加密的数学表达式为：$C = M^e \mod n$
解密过程为：$M = C^d \mod n$

其中：
- $M$ 是明文消息
- $C$ 是密文
- $(e, n)$ 构成公钥
- $(d, n)$ 构成私钥

## 2. 网站登录中的RSA应用场景

### 2.1 基本流程

1. 网站服务器生成RSA密钥对
2. 服务器将公钥发送给客户端（通常嵌入网页HTML或通过API获取）
3. 客户端（浏览器）使用公钥加密敏感信息（如密码）
4. 加密后的数据发送到服务器
5. 服务器使用私钥解密获取原始信息

### 2.2 常见实现方式

1. **纯RSA加密**：直接用RSA加密密码
2. **哈希+RSA加密**：先计算密码哈希值，再用RSA加密哈希结果
3. **混合加密**：客户端生成随机对称密钥，用RSA加密该密钥，然后用对称加密算法加密数据

## 3. 爬虫应对RSA加密的策略

### 3.1 直接模拟JavaScript加密

1. 分析网站的JavaScript加密代码
2. 提取RSA公钥和加密算法
3. 使用Python中的JavaScript运行环境（如PyExecJS）执行原始加密代码
4. 将加密结果放入请求中

```python
# 使用PyExecJS执行JavaScript加密代码
def encrypt_with_js(self, password):
    # 读取JS文件
    with open('encrypt.js', 'r') as f:
        js_code = f.read()
    # 创建JS运行环境
    ctx = execjs.compile(js_code)
    # 调用JS中的加密函数
    encrypted = ctx.call('encryptPassword', password)
    return encrypted
```

### 3.2 使用Python实现加密逻辑

1. 理解网站的加密算法
2. 使用Python加密库（如`rsa`、`pycryptodome`）重新实现相同的加密逻辑
3. 构造请求发送加密数据

```python
# 使用Python的RSA库实现加密
def encrypt_with_python_rsa(self, password):
    # 从PEM格式公钥中提取RSA参数
    key = RSA.import_key(self.public_key)
    # 创建加密器
    cipher = PKCS1_v1_5.new(key)
    # 加密数据
    encrypted = cipher.encrypt(password.encode())
    # Base64编码
    return base64.b64encode(encrypted).decode()
```

### 3.3 模拟完整的登录流程

1. 分析网站登录流程和请求参数
2. 获取RSA公钥和其他必要参数（如token、时间戳等）
3. 按照网站的加密逻辑处理密码
4. 构造完整的登录请求

## 4. 常见问题与解决方案

### 4.1 公钥格式问题

- **问题**：网站提供的公钥可能不是标准PEM格式
- **解决**：手动构造PEM格式，或直接提取模数和指数参数

### 4.2 填充方案差异

- **问题**：不同RSA实现可能使用不同的填充方案（PKCS#1、OAEP等）
- **解决**：确认网站使用的填充方案，使用相应的Python加密函数

### 4.3 字符编码问题

- **问题**：加密前的字符串编码（UTF-8、ASCII等）不一致
- **解决**：确保使用与网站相同的字符编码

## 5. 实际案例分析

### 5.1 哈希+RSA案例

某网站登录流程：
1. 客户端获取RSA公钥
2. 计算密码的SHA-256哈希值
3. 使用RSA加密哈希结果
4. 发送加密后的密文

### 5.2 带时间戳的RSA加密案例

某网站登录流程：
1. 客户端获取RSA公钥和服务器时间戳
2. 将用户名、密码和时间戳拼接
3. 使用RSA加密整个字符串
4. 发送加密结果和原始时间戳

## 6. 参考资源

- [Python RSA库文档](https://pypi.org/project/rsa/)
- [PyCryptodome文档](https://pycryptodome.readthedocs.io/)
- [PyExecJS库](https://pypi.org/project/PyExecJS/) 