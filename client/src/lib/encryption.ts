import CryptoJS from "crypto-js";

// Helper functions for encryption and decryption

export function encryptAES(text: string, key: string): string {
  return CryptoJS.AES.encrypt(text, key).toString();
}

export function decryptAES(ciphertext: string, key: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function encryptDES(text: string, key: string): string {
  return CryptoJS.DES.encrypt(text, key).toString();
}

export function decryptDES(ciphertext: string, key: string): string {
  const bytes = CryptoJS.DES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function encryptTripleDES(text: string, key: string): string {
  return CryptoJS.TripleDES.encrypt(text, key).toString();
}

export function decryptTripleDES(ciphertext: string, key: string): string {
  const bytes = CryptoJS.TripleDES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function encryptRC4(text: string, key: string): string {
  return CryptoJS.RC4.encrypt(text, key).toString();
}

export function decryptRC4(ciphertext: string, key: string): string {
  const bytes = CryptoJS.RC4.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function encryptRabbit(text: string, key: string): string {
  return CryptoJS.Rabbit.encrypt(text, key).toString();
}

export function decryptRabbit(ciphertext: string, key: string): string {
  const bytes = CryptoJS.Rabbit.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function caesarCipher(text: string, shift: number): string {
  return text
    .split("")
    .map((char) => {
      // Handle uppercase letters
      if (char.match(/[A-Z]/)) {
        const code = char.charCodeAt(0);
        return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
      }
      // Handle lowercase letters
      else if (char.match(/[a-z]/)) {
        const code = char.charCodeAt(0);
        return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
      }
      // Return unchanged for non-alphabetic characters
      return char;
    })
    .join("");
}

export function vigenereCipher(text: string, key: string): string {
  const result: string[] = [];
  let keyIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (char.match(/[A-Za-z]/)) {
      const isUpperCase = char === char.toUpperCase();
      const baseCharCode = isUpperCase ? 65 : 97;
      const textCharCode = char.toUpperCase().charCodeAt(0) - 65;
      const keyChar = key[keyIndex % key.length].toUpperCase();
      const keyCharCode = keyChar.charCodeAt(0) - 65;
      
      const encryptedCharCode = (textCharCode + keyCharCode) % 26;
      const encryptedChar = String.fromCharCode(encryptedCharCode + baseCharCode);
      
      result.push(isUpperCase ? encryptedChar : encryptedChar.toLowerCase());
      keyIndex++;
    } else {
      result.push(char);
    }
  }
  
  return result.join("");
}

export function vigenereDecipher(text: string, key: string): string {
  const result: string[] = [];
  let keyIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (char.match(/[A-Za-z]/)) {
      const isUpperCase = char === char.toUpperCase();
      const baseCharCode = isUpperCase ? 65 : 97;
      const textCharCode = char.toUpperCase().charCodeAt(0) - 65;
      const keyChar = key[keyIndex % key.length].toUpperCase();
      const keyCharCode = keyChar.charCodeAt(0) - 65;
      
      const decryptedCharCode = (textCharCode - keyCharCode + 26) % 26;
      const decryptedChar = String.fromCharCode(decryptedCharCode + baseCharCode);
      
      result.push(isUpperCase ? decryptedChar : decryptedChar.toLowerCase());
      keyIndex++;
    } else {
      result.push(char);
    }
  }
  
  return result.join("");
}

// Hash functions
export function hashMD5(text: string): string {
  return CryptoJS.MD5(text).toString();
}

export function hashSHA1(text: string): string {
  return CryptoJS.SHA1(text).toString();
}

export function hashSHA256(text: string): string {
  return CryptoJS.SHA256(text).toString();
}

export function hashSHA512(text: string): string {
  return CryptoJS.SHA512(text).toString();
}
