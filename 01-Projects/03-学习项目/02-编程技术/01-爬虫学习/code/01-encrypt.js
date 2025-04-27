/**
 * RSA加密工具类
 * 提供多种加密方式供Python爬虫调用
 */

// 引入Node.js中的crypto模块 (在浏览器环境中需替换为其他库)
const crypto = require('crypto');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
global.window = dom.window;
global.navigator = window.navigator;
global.document = window.document;

// 引入CryptoJS (需要通过npm安装: npm install crypto-js)
const CryptoJS = require('crypto-js');

/**
 * 基本RSA加密函数
 * @param {string} text - 待加密文本
 * @param {string} publicKey - RSA公钥
 * @returns {string} - Base64编码的加密结果
 */
function rsaEncrypt(text, publicKey) {
    // 格式化公钥
    publicKey = formatPublicKey(publicKey);
    
    // 使用Node.js的crypto模块进行加密
    const buffer = Buffer.from(text);
    const encrypted = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING
        },
        buffer
    );
    
    return encrypted.toString('base64');
}

/**
 * 格式化RSA公钥
 * @param {string} publicKey - 原始公钥字符串
 * @returns {string} - 格式化后的公钥
 */
function formatPublicKey(publicKey) {
    if (publicKey.indexOf('-----BEGIN PUBLIC KEY-----') < 0) {
        publicKey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
    }
    return publicKey;
}

/**
 * 结合MD5哈希的RSA加密
 * @param {string} text - 待加密文本(通常已经是MD5哈希结果)
 * @param {string} publicKey - RSA公钥
 * @returns {string} - Base64编码的加密结果
 */
function hashRsaEncrypt(text, publicKey) {
    return rsaEncrypt(text, publicKey);
}

/**
 * 带时间戳的特定网站加密
 * @param {string} password - 原始密码
 * @param {string} publicKey - RSA公钥
 * @param {string} timestamp - 时间戳
 * @returns {string} - Base64编码的加密结果
 */
function websiteSpecificEncrypt(password, publicKey, timestamp) {
    const text = password + '_' + timestamp;
    return rsaEncrypt(text, publicKey);
}

/**
 * 混合加密 (AES+RSA)
 * @param {Object} data - 包含密码和时间戳的对象
 * @param {string} publicKey - RSA公钥
 * @returns {Object} - 包含加密结果的对象
 */
function hybridEncrypt(data, publicKey) {
    // 生成16位随机AES密钥
    const aesKey = generateRandomString(16);
    
    // 使用AES加密数据
    const encryptedData = aesEncrypt(JSON.stringify(data), aesKey);
    
    // 使用RSA加密AES密钥
    const encryptedKey = rsaEncrypt(aesKey, publicKey);
    
    // 返回结果
    return {
        data: encryptedData,
        encKey: encryptedKey,
        timestamp: data.timestamp
    };
}

/**
 * AES加密函数
 * @param {string} text - 待加密文本
 * @param {string} key - AES密钥
 * @returns {string} - 加密结果
 */
function aesEncrypt(text, key) {
    const cipher = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: CryptoJS.enc.Utf8.parse(key)  // 使用密钥作为IV
    });
    return cipher.toString();
}

/**
 * 生成指定长度的随机字符串
 * @param {number} length - 字符串长度
 * @returns {string} - 随机字符串
 */
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * 金融网站特定加密函数
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @param {string} publicKey - 公钥
 * @param {string} timestamp - 时间戳
 * @returns {Object} - 包含加密结果的对象
 */
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

/**
 * 模拟浏览器指纹生成
 * @returns {Object} - 浏览器指纹对象
 */
function generateBrowserFingerprint() {
    return {
        osType: "Windows", 
        osVersion: "10",
        browserType: "Chrome",
        browserVersion: "91.0.4472.124",
        screenResolution: "1920x1080",
        colorDepth: 24,
        timezone: "GMT+8",
        language: "zh-CN",
        platform: "Win32",
        plugins: [
            "PDF Viewer", 
            "Chrome PDF Viewer", 
            "Chromium PDF Viewer", 
            "Microsoft Edge PDF Viewer"
        ],
        canvas: "a1b2c3d4e5f6g7h8i9j0",  // 模拟Canvas指纹
        webGL: "k1l2m3n4o5p6q7r8s9t0",   // 模拟WebGL指纹
        fonts: [
            "Arial", 
            "Courier", 
            "Times New Roman", 
            "SimSun", 
            "Microsoft YaHei"
        ]
    };
}

// 导出函数
module.exports = {
    rsaEncrypt,
    formatPublicKey,
    hashRsaEncrypt,
    websiteSpecificEncrypt,
    hybridEncrypt,
    aesEncrypt,
    generateRandomString,
    financialWebsiteEncrypt,
    generateBrowserFingerprint
}; 