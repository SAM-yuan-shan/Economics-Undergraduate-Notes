#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
RSA加密工具使用示例
展示如何使用RSA加密工具类加密网站登录信息
"""

import os
import json
from pathlib import Path

# 导入我们的RSA加密工具类
from rsa_utils import RSAEncryptUtils


def main():
    """展示RSA加密工具类的使用方法"""
    
    # 获取当前脚本所在目录
    current_dir = Path(__file__).parent.absolute()
    
    # 创建RSA加密工具实例，加载JavaScript加密函数
    js_file_path = os.path.join(current_dir, "01-encrypt.js")
    rsa_utils = RSAEncryptUtils(js_file_path=js_file_path)
    
    # 示例公钥 (实际中应从网站获取)
    sample_public_key = """
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCf0hXt7+9Ejmkf8PkiZQcV93MQ
    P+mgvbMZcJ+ru2tYqXsP2j1M992nfWfoMsOlq7qSxSEDDLSKmaVMGCH+5XOESs0Y
    VQPHNvma2/9OMFuVJ0q3G5Vdg+lTFGHmyT8G8LBnbnPw/FOpofTd5ESgMSH3XWUs
    OYNO4x/7BUgQyzVErQIDAQAB
    """
    
    print("========== 基础RSA加密示例 ==========")
    
    # 1. 基础RSA加密
    plain_text = "这是需要加密的文本"
    encrypted_text = rsa_utils.rsa_encrypt(plain_text, sample_public_key)
    print(f"原始文本: {plain_text}")
    print(f"RSA加密结果: {encrypted_text}\n")
    
    # 2. 使用JavaScript实现的RSA加密 (如果JS上下文已加载)
    try:
        js_encrypted_text = rsa_utils.js_rsa_encrypt(plain_text, sample_public_key)
        print(f"JS实现的RSA加密结果: {js_encrypted_text}\n")
    except Exception as e:
        print(f"JS加密调用失败: {e}\n")
    
    print("========== 密码加密示例 ==========")
    
    # 3. MD5+RSA加密（常用于密码加密）
    password = "MySecurePassword123"
    encrypted_password = rsa_utils.hash_rsa_encrypt(password, sample_public_key)
    print(f"原始密码: {password}")
    print(f"MD5+RSA加密密码: {encrypted_password}\n")
    
    # 4. 带时间戳的网站特定加密
    timestamp = "1634567890123"
    site_encrypted = rsa_utils.website_specific_encrypt(
        password, sample_public_key, timestamp
    )
    print(f"带时间戳的网站加密: {site_encrypted}\n")
    
    print("========== 混合加密示例 ==========")
    
    # 5. 混合加密 (AES+RSA)，适用于需要加密大量数据的场景
    login_data = {
        "username": "test_user",
        "password": "test_password",
        "timestamp": timestamp
    }
    hybrid_result = rsa_utils.hybrid_encrypt(login_data, sample_public_key)
    print(f"混合加密结果:\n{json.dumps(hybrid_result, indent=2)}\n")
    
    # 6. 金融网站加密示例
    username = "financial_user"
    financial_password = "financial_pass_123"
    financial_result = rsa_utils.financial_website_encrypt(
        username, financial_password, sample_public_key
    )
    print(f"金融网站加密结果:\n{json.dumps(financial_result, indent=2)}\n")
    
    print("========== 工具函数示例 ==========")
    
    # 7. 生成随机字符串
    random_str = rsa_utils.generate_random_string(16)
    print(f"16位随机字符串: {random_str}")
    
    # 8. 格式化公钥
    formatted_key = rsa_utils.format_public_key(sample_public_key)
    print(f"格式化后的公钥:\n{formatted_key}\n")
    
    print("========== 完整爬虫示例 ==========")
    # 模拟一个完整的网站登录加密流程
    
    # 步骤1: 从网站获取公钥（这里使用模拟数据）
    # 实际使用时可以用 rsa_utils.get_public_key_from_url(url)
    website_public_key = sample_public_key
    
    # 步骤2: 生成当前时间戳
    import time
    current_timestamp = str(int(time.time() * 1000))
    
    # 步骤3: 加密登录信息
    login_info = {
        "username": "website_user",
        "password": "website_password123",
        "timestamp": current_timestamp
    }
    
    # 使用混合加密方式
    encrypted_login = rsa_utils.hybrid_encrypt(login_info, website_public_key)
    
    # 步骤4: 构建登录请求参数（实际爬虫中会发送到服务器）
    login_params = {
        "encData": encrypted_login["data"],
        "encKey": encrypted_login["encKey"],
        "timestamp": encrypted_login["timestamp"]
    }
    
    print("登录请求参数:")
    print(json.dumps(login_params, indent=2))
    
    # 实际爬虫中，接下来会发送 POST 请求到登录接口
    # response = requests.post("https://example.com/login", json=login_params)
    # print(response.json())


if __name__ == "__main__":
    main() 