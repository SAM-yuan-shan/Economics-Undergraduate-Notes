/**
 * 网站登录加密模拟JS
 * 包含RSA和SHA加密相关函数
 */

// 引入Node.js环境下的加密库（浏览器环境中通常由网站提供）
// 注意：在实际网站中，这些库通常是内联的或从CDN加载的
const NodeRSA = require('node-rsa');
const crypto = require('crypto');

// 模拟从服务器获取的RSA公钥
const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+W68CEVLXCmPt4bKJ2k9NYtRv
VDxrXZYDXmPEUbNcDfGffQJpZA2+0VPVmQYi6QcrxtXRZA1OXb/K6JwUJ0RG9K5p
kAybrYDEZKnCH3LzS5eVgGR/D1x0jgoFZNg7mXIg4cpCxAXiXbp2yQhQ0+fw5VGd
T8Ml5FWDfvHCt8UVBwIDAQAB
-----END PUBLIC KEY-----
`;

// 导入JSEncrypt库实现RSA加密（需要在Node.js环境中安装jsencrypt）
// 如果在浏览器环境中，可以通过<script>标签引入
const JSEncrypt = require('jsencrypt');

/**
 * RSA加密函数
 * @param {string} text - 要加密的文本
 * @param {string} publicKey - RSA公钥
 * @returns {string} - Base64编码的加密结果
 */
function rsaEncrypt(text, publicKey = PUBLIC_KEY) {
    try {
        const key = new NodeRSA();
        key.importKey(publicKey, 'pkcs8-public-pem');
        // 设置加密格式
        key.setOptions({encryptionScheme: 'pkcs1'});
        const encrypted = key.encrypt(text, 'base64');
        return encrypted;
    } catch (error) {
        console.error('RSA加密错误:', error);
        return '';
    }
}

/**
 * SHA-256哈希函数
 * @param {string} text - 要计算哈希的文本
 * @returns {string} - 十六进制表示的哈希结果
 */
function sha256(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
}

/**
 * SHA-512哈希函数
 * @param {string} text - 要计算哈希的文本
 * @returns {string} - 十六进制表示的哈希结果
 */
function sha512(text) {
    return crypto.createHash('sha512').update(text).digest('hex');
}

/**
 * 模拟网站加密密码的函数
 * 案例1: 直接RSA加密
 * @param {string} password - 原始密码
 * @returns {string} - 加密后的密码
 */
function encryptPassword(password) {
    return rsaEncrypt(password);
}

/**
 * 模拟网站的复杂加密流程
 * 案例2: 先哈希后加密
 * @param {string} password - 原始密码
 * @param {string} salt - 加盐值
 * @returns {string} - 加密后的密码
 */
function complexEncrypt(password, salt) {
    // 1. 密码加盐并计算SHA-256哈希
    const hashedPassword = sha256(password + salt);
    
    // 2. 对哈希结果进行RSA加密
    return rsaEncrypt(hashedPassword);
}

/**
 * 模拟特定网站的加密流程
 * 案例3: 多重处理
 * @param {string} password - 原始密码
 * @param {string} token - 服务器提供的令牌
 * @param {number} timestamp - 时间戳
 * @returns {string} - 加密后的完整签名
 */
function websiteSpecificEncrypt(password, token, timestamp) {
    // 1. 密码SHA-512哈希
    const hashedPassword = sha512(password);
    
    // 2. 组合令牌和时间戳
    const payload = `${token}:${hashedPassword}:${timestamp}`;
    
    // 3. RSA加密整个payload
    const encryptedPayload = rsaEncrypt(payload);
    
    // 4. 返回最终结果
    return encryptedPayload;
}

/**
 * 基本的RSA加密函数
 * @param {string} text - 要加密的明文
 * @param {string} publicKey - RSA公钥
 * @returns {string} - Base64编码的加密结果
 */
function rsaEncrypt(text, publicKey) {
    try {
        // 创建加密器
        const encrypt = new JSEncrypt();
        // 设置公钥
        encrypt.setPublicKey(publicKey);
        // 加密数据
        const encrypted = encrypt.encrypt(text);
        return encrypted;
    } catch (error) {
        console.error('RSA加密失败:', error);
        return null;
    }
}

/**
 * 特定网站的加密实现
 * @param {string} password - 要加密的密码
 * @param {string} publicKey - RSA公钥
 * @returns {string} - 加密后的密码
 */
function websiteSpecificEncrypt(password, publicKey) {
    // 有些网站在加密前会对密码进行预处理
    // 例如添加时间戳或其他混淆处理
    const timestamp = new Date().getTime();
    const textToEncrypt = `${password}|${timestamp}`;
    
    // 调用基本的RSA加密
    return rsaEncrypt(textToEncrypt, publicKey);
}

/**
 * 带Hash的RSA加密
 * @param {string} text - 要加密的明文
 * @param {string} publicKey - RSA公钥
 * @returns {string} - 加密后的结果
 */
function hashRsaEncrypt(text, publicKey) {
    // 计算MD5哈希
    function md5(text) {
        // 简单MD5实现（在实际应用中，应使用更可靠的库）
        // 这里仅作为示例
        return require('crypto').createHash('md5').update(text).digest('hex');
    }
    
    // 先计算MD5哈希
    const hashedText = md5(text);
    // 再进行RSA加密
    return rsaEncrypt(hashedText, publicKey);
}

/**
 * 混合加密方式（常用于登录场景）
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @param {string} publicKey - RSA公钥
 * @param {string} timestamp - 时间戳
 * @returns {object} - 加密后的登录参数
 */
function hybridEncrypt(username, password, publicKey, timestamp) {
    // 构造要加密的数据
    const data = {
        username: username,
        password: password,
        timestamp: timestamp || new Date().getTime()
    };
    
    // 序列化为JSON
    const jsonStr = JSON.stringify(data);
    
    // RSA加密
    const encrypted = rsaEncrypt(jsonStr, publicKey);
    
    return {
        data: encrypted,
        timestamp: data.timestamp
    };
}

// 导出所有函数，使它们可以被Node.js或浏览器环境调用
module.exports = {
    rsaEncrypt,
    sha256,
    sha512,
    encryptPassword,
    complexEncrypt,
    websiteSpecificEncrypt,
    hashRsaEncrypt,
    hybridEncrypt
}; 