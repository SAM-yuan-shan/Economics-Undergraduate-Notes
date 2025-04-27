#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
RSA加密工具类
提供多种加密方式供爬虫使用
包含调用JavaScript加密函数的方法
"""

import base64
import hashlib
import json
import random
import string
import time
from typing import Dict, Any, Union

import execjs
import requests
from Crypto.Cipher import AES, PKCS1_v1_5
from Crypto.PublicKey import RSA
from Crypto.Util.Padding import pad


class RSAEncryptUtils:
    """RSA加密工具类"""

    def __init__(self, js_file_path: str = None):
        """
        初始化RSA加密工具类
        
        Args:
            js_file_path: JavaScript加密文件路径，如果提供则会加载JS函数
        """
        self.js_context = None
        if js_file_path:
            with open(js_file_path, 'r', encoding='utf-8') as f:
                js_code = f.read()
                self.js_context = execjs.compile(js_code)
    
    def format_public_key(self, public_key: str) -> str:
        """
        格式化RSA公钥
        
        Args:
            public_key: 原始公钥字符串
            
        Returns:
            格式化后的公钥
        """
        if "-----BEGIN PUBLIC KEY-----" not in public_key:
            public_key = f"-----BEGIN PUBLIC KEY-----\n{public_key}\n-----END PUBLIC KEY-----"
        return public_key
    
    def rsa_encrypt(self, text: str, public_key: str) -> str:
        """
        使用RSA加密文本
        
        Args:
            text: 待加密文本
            public_key: RSA公钥
            
        Returns:
            Base64编码的加密结果
        """
        formatted_key = self.format_public_key(public_key)
        rsa_key = RSA.importKey(formatted_key)
        cipher = PKCS1_v1_5.new(rsa_key)
        cipher_text = cipher.encrypt(text.encode('utf-8'))
        return base64.b64encode(cipher_text).decode('utf-8')
    
    def js_rsa_encrypt(self, text: str, public_key: str) -> str:
        """
        使用JavaScript实现的RSA加密
        
        Args:
            text: 待加密文本
            public_key: RSA公钥
            
        Returns:
            Base64编码的加密结果
        """
        if not self.js_context:
            raise ValueError("未加载JavaScript上下文，请先初始化js_file_path")
        return self.js_context.call("rsaEncrypt", text, public_key)
    
    def hash_rsa_encrypt(self, password: str, public_key: str) -> str:
        """
        使用MD5哈希后，再进行RSA加密
        
        Args:
            password: 原始密码
            public_key: RSA公钥
            
        Returns:
            Base64编码的加密结果
        """
        # 先进行MD5哈希
        md5_hash = hashlib.md5(password.encode('utf-8')).hexdigest()
        # 然后进行RSA加密
        return self.rsa_encrypt(md5_hash, public_key)
    
    def js_hash_rsa_encrypt(self, password: str, public_key: str) -> str:
        """
        使用JavaScript实现的MD5哈希+RSA加密
        
        Args:
            password: 原始密码
            public_key: RSA公钥
            
        Returns:
            Base64编码的加密结果
        """
        if not self.js_context:
            raise ValueError("未加载JavaScript上下文，请先初始化js_file_path")
        # 先进行MD5哈希
        md5_hash = hashlib.md5(password.encode('utf-8')).hexdigest()
        # 然后调用JS的RSA加密
        return self.js_context.call("hashRsaEncrypt", md5_hash, public_key)
    
    def website_specific_encrypt(self, password: str, public_key: str, timestamp: str = None) -> str:
        """
        带时间戳的特定网站加密
        
        Args:
            password: 原始密码
            public_key: RSA公钥
            timestamp: 时间戳，如果不提供则自动生成
            
        Returns:
            Base64编码的加密结果
        """
        if timestamp is None:
            timestamp = str(int(time.time() * 1000))
        text = f"{password}_{timestamp}"
        return self.rsa_encrypt(text, public_key)
    
    def js_website_specific_encrypt(self, password: str, public_key: str, timestamp: str = None) -> str:
        """
        使用JavaScript实现的特定网站加密
        
        Args:
            password: 原始密码
            public_key: RSA公钥
            timestamp: 时间戳，如果不提供则自动生成
            
        Returns:
            Base64编码的加密结果
        """
        if not self.js_context:
            raise ValueError("未加载JavaScript上下文，请先初始化js_file_path")
        if timestamp is None:
            timestamp = str(int(time.time() * 1000))
        return self.js_context.call("websiteSpecificEncrypt", password, public_key, timestamp)
    
    @staticmethod
    def generate_random_string(length: int) -> str:
        """
        生成指定长度的随机字符串
        
        Args:
            length: 字符串长度
            
        Returns:
            随机字符串
        """
        chars = string.ascii_letters + string.digits
        return ''.join(random.choice(chars) for _ in range(length))
    
    def aes_encrypt(self, text: str, key: str) -> str:
        """
        AES加密函数
        
        Args:
            text: 待加密文本
            key: AES密钥
            
        Returns:
            Base64编码的加密结果
        """
        cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv=key.encode('utf-8'))
        encrypted = cipher.encrypt(pad(text.encode('utf-8'), AES.block_size))
        return base64.b64encode(encrypted).decode('utf-8')
    
    def hybrid_encrypt(self, data: Dict[str, Any], public_key: str) -> Dict[str, str]:
        """
        混合加密 (AES+RSA)
        
        Args:
            data: 包含密码和时间戳的对象
            public_key: RSA公钥
            
        Returns:
            包含加密结果的对象
        """
        # 生成16位随机AES密钥
        aes_key = self.generate_random_string(16)
        
        # 使用AES加密数据
        encrypted_data = self.aes_encrypt(json.dumps(data), aes_key)
        
        # 使用RSA加密AES密钥
        encrypted_key = self.rsa_encrypt(aes_key, public_key)
        
        # 返回结果
        return {
            "data": encrypted_data,
            "encKey": encrypted_key,
            "timestamp": data.get("timestamp", str(int(time.time() * 1000)))
        }
    
    def js_hybrid_encrypt(self, data: Dict[str, Any], public_key: str) -> Dict[str, str]:
        """
        使用JavaScript实现的混合加密
        
        Args:
            data: 包含密码和时间戳的对象
            public_key: RSA公钥
            
        Returns:
            包含加密结果的对象
        """
        if not self.js_context:
            raise ValueError("未加载JavaScript上下文，请先初始化js_file_path")
        return self.js_context.call("hybridEncrypt", data, public_key)
    
    def financial_website_encrypt(self, username: str, password: str, public_key: str) -> Dict[str, str]:
        """
        金融网站特定加密函数
        
        Args:
            username: 用户名
            password: 密码
            public_key: 公钥
            
        Returns:
            包含加密结果的对象
        """
        timestamp = str(int(time.time() * 1000))
        # 生成随机AES密钥
        aes_key = self.generate_random_string(16)
        
        # 使用AES加密用户名和密码
        data = {
            "username": username,
            "password": password,
            "timestamp": timestamp
        }
        encrypted_data = self.aes_encrypt(json.dumps(data), aes_key)
        
        # 使用RSA加密AES密钥
        encrypted_key = self.rsa_encrypt(aes_key, public_key)
        
        # 返回混合加密结果
        return {
            "data": encrypted_data,
            "encKey": encrypted_key,
            "timestamp": timestamp
        }
    
    def js_financial_website_encrypt(self, username: str, password: str, public_key: str) -> Dict[str, str]:
        """
        使用JavaScript实现的金融网站特定加密
        
        Args:
            username: 用户名
            password: 密码
            public_key: 公钥
            
        Returns:
            包含加密结果的对象
        """
        if not self.js_context:
            raise ValueError("未加载JavaScript上下文，请先初始化js_file_path")
        timestamp = str(int(time.time() * 1000))
        return self.js_context.call("financialWebsiteEncrypt", username, password, public_key, timestamp)
    
    def js_generate_browser_fingerprint(self) -> Dict[str, Any]:
        """
        使用JavaScript生成浏览器指纹
        
        Returns:
            浏览器指纹对象
        """
        if not self.js_context:
            raise ValueError("未加载JavaScript上下文，请先初始化js_file_path")
        return self.js_context.call("generateBrowserFingerprint")
    
    @staticmethod
    def get_public_key_from_url(url: str) -> str:
        """
        从URL获取RSA公钥
        
        Args:
            url: 获取公钥的URL
            
        Returns:
            RSA公钥
        """
        response = requests.get(url)
        if response.status_code == 200:
            try:
                data = response.json()
                # 根据不同网站的返回格式可能需要调整
                if "data" in data and "publicKey" in data["data"]:
                    return data["data"]["publicKey"]
                return data.get("publicKey", data.get("key", ""))
            except ValueError:
                return response.text
        return "" 