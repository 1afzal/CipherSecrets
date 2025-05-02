// crypto-adapter.js - Using CommonJS format to avoid ES modules issues
const CryptoJS = require('crypto-js');

module.exports = {
  // Encryption methods
  encryptAES: (text, key) => CryptoJS.AES.encrypt(text, key || "").toString(),
  encryptDES: (text, key) => CryptoJS.DES.encrypt(text, key || "").toString(),
  encryptTripleDES: (text, key) => CryptoJS.TripleDES.encrypt(text, key || "").toString(),
  encryptRabbit: (text, key) => CryptoJS.Rabbit.encrypt(text, key || "").toString(),
  encryptRC4: (text, key) => CryptoJS.RC4.encrypt(text, key || "").toString(),
  
  // Decryption methods
  decryptAES: (text, key) => CryptoJS.AES.decrypt(text, key || "").toString(CryptoJS.enc.Utf8),
  decryptDES: (text, key) => CryptoJS.DES.decrypt(text, key || "").toString(CryptoJS.enc.Utf8),
  decryptTripleDES: (text, key) => CryptoJS.TripleDES.decrypt(text, key || "").toString(CryptoJS.enc.Utf8),
  decryptRabbit: (text, key) => CryptoJS.Rabbit.decrypt(text, key || "").toString(CryptoJS.enc.Utf8),
  decryptRC4: (text, key) => CryptoJS.RC4.decrypt(text, key || "").toString(CryptoJS.enc.Utf8),
};
