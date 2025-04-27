# RSA加密登录实战案例

## 1. 案例一：某招聘网站

### 1.1 登录流程分析

通过抓包分析，该网站的登录流程如下：

1. 访问登录页面，获取初始化信息
2. 获取RSA公钥（接口：`/api/login/getkey`）
3. 对密码进行RSA加密
4. 提交登录表单（携带加密后的密码和其他参数）

### 1.2 关键代码实现

```python
import requests
import execjs
import time
import json

class RecruitmentSiteLogin:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Referer": "https://www.example-recruit.com/login"
        }
        self.login_url = "https://www.example-recruit.com/api/login/dologin"
        self.pubkey_url = "https://www.example-recruit.com/api/login/getkey"
        
    def get_public_key(self):
        """获取RSA公钥"""
        response = self.session.get(self.pubkey_url)
        if response.status_code == 200:
            data = response.json()
            return data.get("data", {}).get("pubkey")
        return None
        
    def login(self, username, password):
        """执行登录流程"""
        # 获取公钥
        public_key = self.get_public_key()
        if not public_key:
            print("获取公钥失败")
            return False
            
        # 使用JavaScript加密密码
        encrypted_pwd = self.encrypt_password(password, public_key)
        
        # 构造登录数据
        login_data = {
            "account": username,
            "password": encrypted_pwd,
            "ts": str(int(time.time() * 1000)),
            "rememberMe": True
        }
        
        # 发送登录请求
        response = self.session.post(self.login_url, json=login_data)
        result = response.json()
        
        if result.get("code") == 0:
            print("登录成功")
            return True
        else:
            print(f"登录失败: {result.get('message')}")
            return False
            
    def encrypt_password(self, password, public_key):
        """调用JavaScript进行RSA加密"""
        with open("encrypt.js", "r", encoding="utf-8") as f:
            js_code = f.read()
            
        ctx = execjs.compile(js_code)
        # 添加时间戳混淆
        pwd_with_ts = password + "_" + str(int(time.time() * 1000))
        encrypted = ctx.call("rsaEncrypt", pwd_with_ts, public_key)
        return encrypted
```

### 1.3 遇到的问题与解决方案

1. **公钥格式问题**：返回的公钥没有PEM头尾，需要在encrypt.js中进行处理

```javascript
// encrypt.js中的相关处理
function formatPublicKey(publicKey) {
    if (publicKey.indexOf('-----BEGIN PUBLIC KEY-----') < 0) {
        publicKey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
    }
    return publicKey;
}
```

2. **登录参数问题**：登录时需要携带时间戳，通过分析网站源码发现密码和时间戳的组合方式

## 2. 案例二：某教育平台

### 2.1 登录加密分析

该平台特点：
- 公钥固定在网站JS中，不需要动态获取
- 密码先MD5哈希，再RSA加密
- 使用Cookie中的会话标识参与加密

### 2.2 关键代码实现

```python
import requests
import execjs
import hashlib
import re

class EduPlatformLogin:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        }
        self.login_url = "https://www.example-edu.com/api/user/login"
        # 固定公钥（从网站JS提取）
        self.public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp91sf..."
        
    def get_session_id(self):
        """获取会话ID"""
        response = self.session.get("https://www.example-edu.com/login")
        cookies = self.session.cookies.get_dict()
        return cookies.get("SESSIONID", "")
        
    def login(self, username, password):
        """执行登录流程"""
        # 获取会话ID
        session_id = self.get_session_id()
        
        # MD5哈希后RSA加密
        encrypted_pwd = self.encrypt_password(password, session_id)
        
        # 构造登录数据
        login_data = {
            "userName": username,
            "password": encrypted_pwd,
            "remember": 1,
            "sessionId": session_id
        }
        
        # 发送登录请求
        response = self.session.post(self.login_url, data=login_data)
        result = response.json()
        
        if result.get("code") == 200:
            print("登录成功")
            return True
        else:
            print(f"登录失败: {result.get('message')}")
            return False
            
    def encrypt_password(self, password, session_id):
        """MD5+RSA加密密码"""
        with open("encrypt.js", "r", encoding="utf-8") as f:
            js_code = f.read()
            
        ctx = execjs.compile(js_code)
        # 先MD5哈希密码
        md5_pwd = hashlib.md5(password.encode()).hexdigest()
        # 然后RSA加密(使用会话ID混合)
        encrypted = ctx.call("hashRsaEncrypt", md5_pwd + session_id, self.public_key)
        return encrypted
```

### 2.3 遇到的问题与解决方案

1. **验证码问题**：该平台在多次错误登录后会出现验证码，需要实现验证码识别
2. **会话有效期**：加密中使用的会话ID有效期短，需要及时使用

## 3. 案例三：某金融服务网站

### 3.1 登录流程特点

该网站安全措施非常严格：
- 使用动态公钥（每次请求不同）
- 结合AES和RSA混合加密
- 登录表单中有多个隐藏字段

### 3.2 关键加密代码

```javascript
// encrypt.js中的金融网站特定加密函数
function financialWebsiteEncrypt(username, password, publicKey, timestamp) {
    // 生成随机AES密钥
    const aesKey = generateRandomString(16);
    
    // 使用AES加密用户名和密码
    const encryptedData = aesEncrypt(JSON.stringify({
        username: username,
        password: password,
        timestamp: timestamp
    }), aesKey);
    
    // 使用RSA加密AES密钥
    const encryptedKey = rsaEncrypt(aesKey, publicKey);
    
    // 返回混合加密结果
    return {
        data: encryptedData,
        encKey: encryptedKey,
        timestamp: timestamp
    };
}

// AES加密函数
function aesEncrypt(text, key) {
    const cipher = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: CryptoJS.enc.Utf8.parse(key)  // 使用密钥作为IV
    });
    return cipher.toString();
}
```

### 3.3 Python调用代码

```python
import requests
import execjs
import time
import json

class FinancialWebsiteLogin:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        }
        self.login_url = "https://www.example-finance.com/api/auth/login"
        self.pubkey_url = "https://www.example-finance.com/api/auth/getPublicKey"
        
    def get_public_key(self):
        """获取动态RSA公钥"""
        timestamp = str(int(time.time() * 1000))
        response = self.session.get(f"{self.pubkey_url}?ts={timestamp}")
        if response.status_code == 200:
            data = response.json()
            return data.get("data", {}).get("publicKey"), timestamp
        return None, timestamp
        
    def login(self, username, password):
        """执行登录流程"""
        # 获取公钥和时间戳
        public_key, timestamp = self.get_public_key()
        if not public_key:
            print("获取公钥失败")
            return False
            
        # 使用JavaScript进行混合加密
        with open("encrypt.js", "r", encoding="utf-8") as f:
            js_code = f.read()
            
        ctx = execjs.compile(js_code)
        encrypt_result = ctx.call(
            "financialWebsiteEncrypt", 
            username, 
            password, 
            public_key, 
            timestamp
        )
        
        # 构造登录数据
        login_data = {
            "encryptedData": encrypt_result["data"],
            "encryptedKey": encrypt_result["encKey"],
            "timestamp": timestamp,
            "deviceInfo": self.get_device_info()
        }
        
        # 发送登录请求
        response = self.session.post(self.login_url, json=login_data)
        result = response.json()
        
        if result.get("code") == 0:
            print("登录成功")
            return True
        else:
            print(f"登录失败: {result.get('message')}")
            return False
            
    def get_device_info(self):
        """生成设备信息指纹"""
        # 实际项目中可能需要更复杂的设备指纹生成
        return {
            "osType": "Windows",
            "browserType": "Chrome",
            "screenResolution": "1920x1080",
            "timezone": "GMT+8"
        }
```

## 4. 通用RSA加密登录模板

根据以上案例，我们可以总结出一个通用的RSA加密登录模板：

```python
import requests
import execjs
import time
import json
import hashlib

class RsaLoginTemplate:
    def __init__(self, login_url, pubkey_url=None, fixed_pubkey=None):
        self.session = requests.Session()
        self.session.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        }
        self.login_url = login_url
        self.pubkey_url = pubkey_url
        self.fixed_pubkey = fixed_pubkey
        
    def get_public_key(self):
        """获取RSA公钥"""
        # 如果有固定公钥，直接返回
        if self.fixed_pubkey:
            return self.fixed_pubkey
            
        # 否则请求获取公钥
        if self.pubkey_url:
            response = self.session.get(self.pubkey_url)
            if response.status_code == 200:
                try:
                    data = response.json()
                    # 根据实际情况调整公钥的提取路径
                    return self.extract_pubkey_from_response(data)
                except Exception as e:
                    print(f"解析公钥响应失败: {e}")
        return None
        
    def extract_pubkey_from_response(self, data):
        """从响应中提取公钥，根据网站API调整"""
        # 示例，根据实际网站调整
        if "pubkey" in data:
            return data["pubkey"]
        elif "data" in data and "publicKey" in data["data"]:
            return data["data"]["publicKey"]
        return None
        
    def encrypt_password(self, password, public_key, encrypt_type="basic"):
        """加密密码"""
        with open("encrypt.js", "r", encoding="utf-8") as f:
            js_code = f.read()
            
        ctx = execjs.compile(js_code)
        
        # 根据加密类型选择不同的加密函数
        if encrypt_type == "basic":
            return ctx.call("rsaEncrypt", password, public_key)
        elif encrypt_type == "withTimestamp":
            timestamp = str(int(time.time() * 1000))
            return ctx.call("websiteSpecificEncrypt", password, public_key, timestamp)
        elif encrypt_type == "hash":
            md5_pwd = hashlib.md5(password.encode()).hexdigest()
            return ctx.call("hashRsaEncrypt", md5_pwd, public_key)
        elif encrypt_type == "hybrid":
            # 混合加密
            return ctx.call("hybridEncrypt", {"password": password, "timestamp": str(int(time.time() * 1000))}, public_key)
        
    def login(self, username, password, encrypt_type="basic", additional_params=None):
        """执行登录流程"""
        # 获取公钥
        public_key = self.get_public_key()
        if not public_key:
            print("获取公钥失败")
            return False
            
        # 加密密码
        encrypted_pwd = self.encrypt_password(password, public_key, encrypt_type)
        
        # 构造登录数据
        login_data = {
            "username": username,
            "password": encrypted_pwd
        }
        
        # 添加额外参数
        if additional_params:
            login_data.update(additional_params)
        
        # 发送登录请求
        response = self.session.post(self.login_url, json=login_data)
        try:
            result = response.json()
            return self.process_login_result(result)
        except Exception as e:
            print(f"处理登录响应失败: {e}")
            return False
            
    def process_login_result(self, result):
        """处理登录结果，根据网站API调整"""
        # 示例，根据实际网站调整
        if "code" in result and result["code"] in [0, 200]:
            print("登录成功")
            return True
        else:
            error_msg = result.get("message", "未知错误")
            print(f"登录失败: {error_msg}")
            return False
```

## 5. 实战技巧总结

### 5.1 加密参数分析方法

1. **网络请求分析**：使用浏览器开发者工具捕获网络请求
2. **JS源码分析**：通过开发者工具的Sources/Debugger查看JS源码
3. **断点调试**：在关键加密函数处设置断点，观察参数和返回值
4. **Console打印**：使用`console.log`在浏览器控制台输出关键变量

### 5.2 常见反爬措施及对策

| 反爬措施 | 对策 |
|---------|-----|
| 验证码 | OCR识别或人工识别服务 |
| 设备指纹 | 模拟常见设备指纹参数 |
| 行为分析 | 模拟真实用户的行为模式 |
| IP限制 | 使用代理IP池 |
| Cookie校验 | 完整保存和管理Cookie |

### 5.3 编写高质量爬虫的建议

1. **合规操作**：遵守网站robots.txt规则和使用条款
2. **控制频率**：设置合理的请求间隔，避免频繁请求
3. **错误重试**：实现指数退避的重试机制
4. **日志记录**：详细记录每次请求和响应
5. **代码模块化**：将加密、请求、解析等功能模块化
6. **异常处理**：完善的异常捕获和处理机制

## 6. 相关法律和道德问题

在开发爬虫时，需要注意以下法律和道德问题：

1. 遵守《网络安全法》等相关法律法规
2. 遵守网站的使用条款和robots.txt规定
3. 不爬取个人隐私数据
4. 不对目标网站造成过大负担
5. 仅用于学习研究，不用于商业用途
6. 数据使用应符合版权规定

## 7. 参考资料

- [Python Requests文档](https://docs.python-requests.org/)
- [PyExecJS文档](https://pypi.org/project/PyExecJS/)
- [RSA加密算法详解](https://www.rfc-editor.org/rfc/rfc8017)
- [Web安全之登录加密](https://owasp.org/www-community/attacks/Cryptographic_Storage_Cheat_Sheet)
- [网络爬虫法律法规解读](https://www.example.com/scraping-law-guide) 