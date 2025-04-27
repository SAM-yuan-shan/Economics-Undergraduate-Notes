#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
RSA加密登录爬虫示例
演示如何处理使用RSA加密的网站登录
"""

import requests
import execjs
import json
import base64
import time
import re
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5

class RSALoginCrawler:
    """处理RSA加密登录的爬虫基类"""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        self.public_key = None
    
    def get_public_key(self, url):
        """获取网站的RSA公钥"""
        try:
            response = self.session.get(url)
            data = response.json()
            # 根据实际情况提取公钥
            self.public_key = data.get('public_key')
            return self.public_key
        except Exception as e:
            print(f"获取公钥失败: {e}")
            return None
    
    def encrypt_with_js(self, text, js_file='encrypt.js', func_name='rsaEncrypt'):
        """使用JavaScript实现的RSA加密"""
        try:
            with open(js_file, 'r', encoding='utf-8') as f:
                js_code = f.read()
            ctx = execjs.compile(js_code)
            encrypted = ctx.call(func_name, text, self.public_key)
            return encrypted
        except Exception as e:
            print(f"JavaScript加密失败: {e}")
            return None
    
    def encrypt_with_python_rsa(self, text):
        """使用Python的RSA库实现加密"""
        try:
            # 确保公钥是PEM格式
            if '-----BEGIN PUBLIC KEY-----' not in self.public_key:
                # 格式化为PEM格式
                pem_key = f"-----BEGIN PUBLIC KEY-----\n{self.public_key}\n-----END PUBLIC KEY-----"
            else:
                pem_key = self.public_key
            
            # 从PEM格式公钥中提取RSA参数
            key = RSA.import_key(pem_key)
            # 创建加密器
            cipher = PKCS1_v1_5.new(key)
            # 加密数据
            encrypted = cipher.encrypt(text.encode('utf-8'))
            # Base64编码
            return base64.b64encode(encrypted).decode('utf-8')
        except Exception as e:
            print(f"Python RSA加密失败: {e}")
            return None
    
    def login(self, username, password, login_url):
        """执行登录操作"""
        raise NotImplementedError("子类必须实现login方法")


class ExampleWebsiteClient(RSALoginCrawler):
    """示例网站的爬虫客户端"""
    
    def __init__(self):
        super().__init__()
        self.base_url = "https://example.com"
        self.public_key_url = f"{self.base_url}/api/getPublicKey"
        self.login_url = f"{self.base_url}/api/login"
        self.token = None
    
    def get_token(self):
        """获取CSRF Token"""
        try:
            response = self.session.get(f"{self.base_url}/login")
            # 使用正则表达式从HTML中提取token
            match = re.search(r'name="csrf_token" value="([^"]+)"', response.text)
            if match:
                self.token = match.group(1)
                return self.token
            return None
        except Exception as e:
            print(f"获取Token失败: {e}")
            return None
    
    def login(self, username, password):
        """登录示例网站"""
        try:
            # 1. 获取CSRF Token
            self.get_token()
            
            # 2. 获取RSA公钥
            self.get_public_key(self.public_key_url)
            
            # 3. 获取当前时间戳
            timestamp = str(int(time.time() * 1000))
            
            # 4. 使用JavaScript加密密码
            # 方法一：直接调用JS加密
            encrypted_password = self.encrypt_with_js(password, 
                                                     js_file='encrypt.js', 
                                                     func_name='websiteSpecificEncrypt')
            
            # 方法二：使用Python实现加密（如果JS方法不可用）
            # encrypted_password = self.encrypt_with_python_rsa(password)
            
            # 5. 构造登录数据
            login_data = {
                'username': username,
                'password': encrypted_password,
                'timestamp': timestamp,
                'csrf_token': self.token
            }
            
            # 6. 发送登录请求
            response = self.session.post(self.login_url, data=login_data)
            
            # 7. 处理登录结果
            result = response.json()
            if result.get('code') == 0:
                print("登录成功!")
                return True
            else:
                print(f"登录失败: {result.get('message')}")
                return False
                
        except Exception as e:
            print(f"登录过程发生错误: {e}")
            return False
    
    def get_user_info(self):
        """获取用户信息（登录后操作）"""
        try:
            response = self.session.get(f"{self.base_url}/api/user/info")
            return response.json()
        except Exception as e:
            print(f"获取用户信息失败: {e}")
            return None


def main():
    """主函数"""
    # 创建爬虫客户端
    client = ExampleWebsiteClient()
    
    # 用户名和密码
    username = "test_user"
    password = "test_password"
    
    # 登录
    if client.login(username, password):
        # 获取用户信息
        user_info = client.get_user_info()
        if user_info:
            print(f"用户信息: {json.dumps(user_info, ensure_ascii=False, indent=2)}")
    else:
        print("无法继续，登录失败")


if __name__ == "__main__":
    main() 