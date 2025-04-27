#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
RSA加密登录流程演示示例
模拟网站登录过程中的RSA加密处理
"""

import requests
import rsa
import base64
import json
import time
import execjs
from bs4 import BeautifulSoup
from Crypto.Hash import SHA512
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as PKCS1_cipher


class RSALoginDemo:
    def __init__(self):
        self.session = requests.Session()
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
        self.session.headers.update(self.headers)
    
    def get_public_key(self, url):
        """
        从指定URL获取RSA公钥
        """
        try:
            response = self.session.get(url)
            # 假设返回格式为JSON，包含公钥信息
            data = response.json()
            public_key = data.get('publicKey')
            return public_key
        except Exception as e:
            print(f"获取公钥失败: {e}")
            return None
    
    def extract_key_from_html(self, url):
        """
        从HTML源码中提取RSA公钥
        """
        try:
            response = self.session.get(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # 假设公钥在一个特定的script标签中
            script_tags = soup.find_all('script')
            for script in script_tags:
                content = script.string
                if content and 'MII' in content:
                    # 使用简单的字符串查找方法
                    start_idx = content.find('MII')
                    end_idx = content.find('"', start_idx)
                    if end_idx > start_idx:
                        return content[start_idx:end_idx]
            return None
        except Exception as e:
            print(f"从HTML中提取公钥失败: {e}")
            return None
    
    def rsa_encrypt(self, public_key, message):
        """
        使用RSA公钥加密消息
        """
        try:
            # 将BASE64编码的公钥转换为RSA公钥对象
            key = RSA.import_key(base64.b64decode(public_key))
            # 使用PKCS1_v1_5加密方案
            cipher = PKCS1_cipher.new(key)
            # 加密消息
            encrypted = cipher.encrypt(message.encode('utf-8'))
            # 返回BASE64编码的加密结果
            return base64.b64encode(encrypted).decode('utf-8')
        except Exception as e:
            print(f"RSA加密失败: {e}")
            return None
    
    def sha512_hash(self, message):
        """
        计算消息的SHA512哈希值
        """
        try:
            hash_obj = SHA512.new()
            hash_obj.update(message.encode('utf-8'))
            return hash_obj.hexdigest()
        except Exception as e:
            print(f"SHA512哈希计算失败: {e}")
            return None
    
    def login_example1(self, username, password):
        """
        示例1: 直接使用RSA加密密码登录
        """
        try:
            # 1. 获取公钥
            public_key = self.get_public_key('https://example.com/api/getPublicKey')
            if not public_key:
                return False, "获取公钥失败"
            
            # 2. 使用RSA加密密码
            encrypted_password = self.rsa_encrypt(public_key, password)
            if not encrypted_password:
                return False, "密码加密失败"
            
            # 3. 构造登录请求参数
            login_data = {
                'username': username,
                'password': encrypted_password,
                'timestamp': int(time.time() * 1000)
            }
            
            # 4. 发送登录请求
            login_response = self.session.post(
                'https://example.com/api/login',
                data=login_data
            )
            
            # 5. 解析登录结果
            result = login_response.json()
            if result.get('code') == 200:
                return True, "登录成功"
            else:
                return False, result.get('message', '登录失败')
                
        except Exception as e:
            return False, f"登录过程发生错误: {e}"
    
    def login_example2(self, username, password):
        """
        示例2: 先SHA512哈希处理密码，再RSA加密
        """
        try:
            # 1. 获取公钥和其他参数
            init_response = self.session.get('https://example.com/api/loginInit')
            data = init_response.json()
            public_key = data.get('publicKey')
            item_code = data.get('itemCode')
            
            if not public_key or not item_code:
                return False, "获取登录参数失败"
            
            # 2. SHA512哈希处理密码
            hashed_password = self.sha512_hash(password)
            if not hashed_password:
                return False, "密码哈希处理失败"
            
            # 3. RSA加密处理哈希密码
            encrypt_text = item_code + hashed_password
            encrypted_password = self.rsa_encrypt(public_key, encrypt_text)
            if not encrypted_password:
                return False, "加密失败"
            
            # 4. 构造登录请求参数
            login_data = {
                'username': username,
                'password': encrypted_password,
                'itemCode': item_code,
                'timestamp': int(time.time() * 1000)
            }
            
            # 5. 发送登录请求
            login_response = self.session.post(
                'https://example.com/api/login',
                data=login_data
            )
            
            # 6. 解析登录结果
            result = login_response.json()
            if result.get('code') == 200:
                return True, "登录成功"
            else:
                return False, result.get('message', '登录失败')
                
        except Exception as e:
            return False, f"登录过程发生错误: {e}"
    
    def login_with_js(self, username, password, js_file_path):
        """
        示例3: 使用JavaScript代码进行加密
        """
        try:
            # 1. 加载JS文件
            with open(js_file_path, 'r', encoding='utf-8') as f:
                js_code = f.read()
            
            # 2. 执行JS代码
            js_context = execjs.compile(js_code)
            
            # 3. 使用JS函数加密密码
            encrypted_password = js_context.call('encryptPassword', password)
            
            # 4. 构造登录请求参数
            login_data = {
                'username': username,
                'password': encrypted_password,
                'timestamp': int(time.time() * 1000)
            }
            
            # 5. 发送登录请求
            login_response = self.session.post(
                'https://example.com/api/login',
                data=login_data
            )
            
            # 6. 解析登录结果
            result = login_response.json()
            if result.get('code') == 200:
                return True, "登录成功"
            else:
                return False, result.get('message', '登录失败')
                
        except Exception as e:
            return False, f"登录过程发生错误: {e}"


def main():
    """
    主函数，演示三种登录方式
    """
    demo = RSALoginDemo()
    
    # 注意：这里使用的用户名和密码仅作演示用途
    username = "test_user"
    password = "test_password"
    
    print("="*50)
    print("RSA加密登录演示")
    print("="*50)
    
    # 示例1: 直接RSA加密
    print("\n[示例1] 直接RSA加密密码登录:")
    # 实际使用时取消注释下面的代码
    # success, message = demo.login_example1(username, password)
    # print(f"结果: {message}")
    print("由于示例网站不可用，这里仅演示代码逻辑")
    
    # 示例2: SHA512+RSA加密
    print("\n[示例2] SHA512+RSA组合加密登录:")
    # 实际使用时取消注释下面的代码
    # success, message = demo.login_example2(username, password)
    # print(f"结果: {message}")
    print("由于示例网站不可用，这里仅演示代码逻辑")
    
    # 示例3: 使用JS加密
    print("\n[示例3] 使用JS代码进行加密登录:")
    # 实际使用时取消注释下面的代码
    # success, message = demo.login_with_js(username, password, "encrypt.js")
    # print(f"结果: {message}")
    print("由于示例网站不可用，这里仅演示代码逻辑")
    
    print("\n注意：本示例代码仅供学习参考，实际使用时需要根据目标网站的具体情况进行调整")


if __name__ == "__main__":
    main() 