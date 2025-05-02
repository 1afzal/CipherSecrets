import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import CryptoJS from "crypto-js";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for algorithms
  app.get("/api/algorithms", async (req, res) => {
    try {
      const algorithms = await storage.getAlgorithms();
      res.json(algorithms);
    } catch (error) {
      res.status(500).json({ message: "Error fetching algorithms" });
    }
  });

  app.get("/api/algorithms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const algorithm = await storage.getAlgorithm(id);
      
      if (!algorithm) {
        return res.status(404).json({ message: "Algorithm not found" });
      }
      
      res.json(algorithm);
    } catch (error) {
      res.status(500).json({ message: "Error fetching algorithm" });
    }
  });

  // Encrypt/decrypt API routes
  app.post("/api/encrypt", (req, res) => {
    try {
      const { text, algorithm, key } = req.body;
      
      if (!text || !algorithm) {
        return res.status(400).json({ message: "Text and algorithm are required" });
      }
      
      let result;
      
      switch (algorithm) {
        case "aes":
          result = CryptoJS.AES.encrypt(text, key || "").toString();
          break;
        case "des":
          result = CryptoJS.DES.encrypt(text, key || "").toString();
          break;
        case "tripledes":
          result = CryptoJS.TripleDES.encrypt(text, key || "").toString();
          break;
        case "rabbit":
          result = CryptoJS.Rabbit.encrypt(text, key || "").toString();
          break;
        case "rc4":
          result = CryptoJS.RC4.encrypt(text, key || "").toString();
          break;
        case "caesar":
          const shift = parseInt(key) || 3;
          result = caesarCipher(text, shift);
          break;
        case "vigenere":
          result = vigenereCipher(text, key || "key");
          break;
        default:
          return res.status(400).json({ message: "Unsupported algorithm" });
      }
      
      res.json({ result });
    } catch (error) {
      res.status(500).json({ message: "Encryption error", error: (error as Error).message });
    }
  });

  app.post("/api/decrypt", (req, res) => {
    try {
      const { text, algorithm, key } = req.body;
      
      if (!text || !algorithm) {
        return res.status(400).json({ message: "Text and algorithm are required" });
      }
      
      let result;
      
      switch (algorithm) {
        case "aes":
          result = CryptoJS.AES.decrypt(text, key || "").toString(CryptoJS.enc.Utf8);
          break;
        case "des":
          result = CryptoJS.DES.decrypt(text, key || "").toString(CryptoJS.enc.Utf8);
          break;
        case "tripledes":
          result = CryptoJS.TripleDES.decrypt(text, key || "").toString(CryptoJS.enc.Utf8);
          break;
        case "rabbit":
          result = CryptoJS.Rabbit.decrypt(text, key || "").toString(CryptoJS.enc.Utf8);
          break;
        case "rc4":
          result = CryptoJS.RC4.decrypt(text, key || "").toString(CryptoJS.enc.Utf8);
          break;
        case "caesar":
          const shift = parseInt(key) || 3;
          result = caesarCipher(text, -shift);
          break;
        case "vigenere":
          result = vigenereDecipher(text, key || "key");
          break;
        default:
          return res.status(400).json({ message: "Unsupported algorithm" });
      }
      
      res.json({ result });
    } catch (error) {
      res.status(500).json({ message: "Decryption error", error: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper functions for classic ciphers
function caesarCipher(text: string, shift: number): string {
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

function vigenereCipher(text: string, key: string): string {
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

function vigenereDecipher(text: string, key: string): string {
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
