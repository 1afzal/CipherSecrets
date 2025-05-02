// Using modules with explicit typings
// @ts-ignore
import CryptoJS from 'crypto-js';

// Allow module access
declare module 'crypto-js' {
  export const AES: any;
  export const DES: any;
  export const TripleDES: any;
  export const Rabbit: any;
  export const RC4: any;
  export const enc: {
    Utf8: any;
  };
}

// Encryption methods
export function encryptAES(text: string, key: string): string {
  return CryptoJS.AES.encrypt(text, key || "").toString();
}

export function encryptDES(text: string, key: string): string {
  return CryptoJS.DES.encrypt(text, key || "").toString();
}

export function encryptTripleDES(text: string, key: string): string {
  return CryptoJS.TripleDES.encrypt(text, key || "").toString();
}

export function encryptRabbit(text: string, key: string): string {
  return CryptoJS.Rabbit.encrypt(text, key || "").toString();
}

export function encryptRC4(text: string, key: string): string {
  return CryptoJS.RC4.encrypt(text, key || "").toString();
}

// Decryption methods
export function decryptAES(text: string, key: string): string {
  return CryptoJS.AES.decrypt(text, key || "").toString(CryptoJS.enc.Utf8);
}

export function decryptDES(text: string, key: string): string {
  return CryptoJS.DES.decrypt(text, key || "").toString(CryptoJS.enc.Utf8);
}

export function decryptTripleDES(text: string, key: string): string {
  return CryptoJS.TripleDES.decrypt(text, key || "").toString(CryptoJS.enc.Utf8);
}

export function decryptRabbit(text: string, key: string): string {
  return CryptoJS.Rabbit.decrypt(text, key || "").toString(CryptoJS.enc.Utf8);
}

export function decryptRC4(text: string, key: string): string {
  return CryptoJS.RC4.decrypt(text, key || "").toString(CryptoJS.enc.Utf8);
}
