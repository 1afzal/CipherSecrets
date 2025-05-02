import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// Import crypto modules
import { publicEncrypt, privateDecrypt } from 'crypto';
import { 
  encryptAES, encryptDES, encryptTripleDES, encryptRabbit, encryptRC4,
  decryptAES, decryptDES, decryptTripleDES, decryptRabbit, decryptRC4
} from './crypto-adapter';

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for algorithms
  app.get("/api/algorithms", async (req: Request, res: Response) => {
    try {
      const algorithms = await storage.getAlgorithms();
      res.json(algorithms);
    } catch (error) {
      res.status(500).json({ message: "Error fetching algorithms" });
    }
  });

  app.get("/api/algorithms/:id", async (req: Request, res: Response) => {
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

  // RSA key pairs for demo purposes
  const rsaKeys = {
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvWHld9NtvvB5HLIrnTYS
8h13T9CzHSyhOcayWB8c0SKZ5r9tQSjgKt4zGDVTAYOXMH8WNZFfFtW9qtDFP0Ac
5oLkQ/5RkHGVdfCHTtVxwQWeV+Lu2yWA95Kn5kd5xL0c2VYQ2WQxjApZDYHvlz2Z
dvYMh6qKDwY3GID9qRUEn4MvY2AU5EEtpFfGaGw9BNQ99yNw2yVwQihZKaKZPNpH
GFxVQpFBk/W/XS7exsEKs1DzBrYpMuRD5/0Z5S9RbLEp5QmHxFwKGQOOpBl4tN6G
zcs9ZiD+nOVRCkuK9MVoS4xVZg8G3r4jlLVRU1sDFj4IBrjCd9ORtP8IIQKwR4KB
2wIDAQAB
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAvWHld9NtvvB5HLIrnTYS8h13T9CzHSyhOcayWB8c0SKZ5r9t
QSjgKt4zGDVTAYOXMH8WNZFfFtW9qtDFP0Ac5oLkQ/5RkHGVdfCHTtVxwQWeV+Lu
2yWA95Kn5kd5xL0c2VYQ2WQxjApZDYHvlz2ZdvYMh6qKDwY3GID9qRUEn4MvY2AU
5EEtpFfGaGw9BNQ99yNw2yVwQihZKaKZPNpHGFxVQpFBk/W/XS7exsEKs1DzBrYp
MuRD5/0Z5S9RbLEp5QmHxFwKGQOOpBl4tN6Gzcs9ZiD+nOVRCkuK9MVoS4xVZg8G
3r4jlLVRU1sDFj4IBrjCd9ORtP8IIQKwR4KB2wIDAQABAoIBACbqQJKcF9JQ1uVZ
DWA4aBC4cL8iqwSXYAB5sF9x1Q3LZKxz1QBbhrhqzK+kDai4oVKjq+ztF+TCnsfE
OZEt8NFBbOlLYWZQgFZgOgvCFMYQHY8Ecau7vDY/NAXWZlvoBQvIel3QgB5unp5n
+P5hKDDQ+b4/CphBq9dF3qC0zGUpr4UGy5FoK9rPxQYn3hmr8HPyQQYbmGmSiPJa
xmHGS4xnHqXy/JJSG4XdXeiwNc5/QKCOHaQGrEYyBB+J36JBQDZvRZADGNzlJK5x
+IXE0SSR9FHc5D24k1hRD4c00j8xTmUQF9+rlMBv+LwreL/XEVcrKQB969/lrEWT
E3hLYDECgYEA9Dz4gE7paOSW3YDPJl1z3VFxSMocwOYc/6EBkiTuS1vzUxHAVSvj
1gw95xIWPs3fhFDmKMVMiHnIuz+t1O6K8YvwRfTtSw2KLcIilD5dJSRduksmD3/S
GvHr+XveJfLdejHXHWGgcHRY3pyx1uxKH0wAVIkA7bEyqYJwXHMEkPkCgYEAxhT7
GATHIjuZTI7JYV+lEcSVbfjQZwQB0iP+2L63zDC/j2m0UZQbE1+QJbHdUoA+WXC9
HQmZFZ45u1FtFJjRs6BSzhsZxGn8JgFrSjKJbQlbRQiQGxTLXwJuequRnN3kCxXQ
YXeK8XjUUEF1WLiEWfKRJdQXPtjR9qIWUc2EHVMCgYBLbVhkBdDOqVUYVskSxqgM
KVpC/CsGqv8qgJ1JGw+rX63GQw/ys3m9+xD0xYOlQKj2aMTgUfmIQKST19Q/mv1i
MkVk0pFcz0jHVKOBHn9Auv0TYt9HJ1Qlp1CbGwWGR1oSg+cz5KgOvLc/RQYnfX6P
doUPEuVsn3nQrSS7WdCcaQKBgQCeD0Wz3cdZVwiV+Qzh0Mdaisis/4BJPy3NpfCu
C4gjzFjYU9ZZ1i+VCCJ9/S+TRF59LVj/vmHnLcgVwuYAwTbiLL9BkXCUZfBRuFp9
INu5C9XlZ23Mf82L94alsMBo9/BAKj2z/nKOPHXbMod/inbmwLLSJEw17Mtt1Ixk
xFILywKBgGKpBmQmiTW9t8QzNCYMbZ4Gg7vnBCnyUDc+HY1hwxwFwZqylya2O1T8
c6yN5fb/371j1iqgQ8IgQj5q6XLH40UlKqrmNZQGJn5YCX5orNJZxuU8LgibmF2V
pfNJLciRlNpKXtc4QfQJStJyE3bmRpFzE0e3W6Ux+iY61UlYjxCD
-----END RSA PRIVATE KEY-----`
  };

  // Encrypt/decrypt API routes
  app.post("/api/encrypt", (req: Request, res: Response) => {
    try {
      const { text, algorithm, key } = req.body;
      
      console.log("Encryption request with algorithm:", algorithm);
      
      if (!text || !algorithm) {
        return res.status(400).json({ message: "Text and algorithm are required" });
      }
      
      let result;
      
      switch (algorithm) {
        case "aes":
          result = encryptAES(text, key || "");
          break;
        case "des":
          result = encryptDES(text, key || "");
          break;
        case "tripledes":
          result = encryptTripleDES(text, key || "");
          break;
        case "rabbit":
          result = encryptRabbit(text, key || "");
          break;
        case "rc4":
          result = encryptRC4(text, key || "");
          break;
        case "rsa":
          try {
            // For RSA demo, we'll use a simpler approach - a mock encryption for demo purposes
            // This is for educational purposes only - in production, use proper RSA encryption
            console.log('Demo RSA Encryption, input length:', text.length);
            
            // In the real RSA implementation, we would use publicEncrypt from crypto
            // But for demo/educational purposes, we'll do this mock encryption:
            const mockEncrypted = Buffer.from(text).toString('base64');
            result = `RSA_DEMO_${mockEncrypted}`;
          } catch (error) {
            console.error('RSA encryption error:', error);
            throw error;
          }
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

  app.post("/api/decrypt", (req: Request, res: Response) => {
    try {
      const { text, algorithm, key } = req.body;
      
      if (!text || !algorithm) {
        return res.status(400).json({ message: "Text and algorithm are required" });
      }
      
      let result;
      
      switch (algorithm) {
        case "aes":
          result = decryptAES(text, key || "");
          break;
        case "des":
          result = decryptDES(text, key || "");
          break;
        case "tripledes":
          result = decryptTripleDES(text, key || "");
          break;
        case "rabbit":
          result = decryptRabbit(text, key || "");
          break;
        case "rc4":
          result = decryptRC4(text, key || "");
          break;
        case "rsa":
          try {
            // For RSA demo, using the simpler approach we chose for encryption
            console.log('Demo RSA Decryption');
            
            if (text.startsWith('RSA_DEMO_')) {
              // Extract the base64 payload
              const base64Part = text.substring(9); // Remove 'RSA_DEMO_' prefix
              result = Buffer.from(base64Part, 'base64').toString('utf8');
            } else {
              throw new Error('Invalid RSA demo format. Expected RSA_DEMO_ prefix.');
            }
          } catch (error) {
            console.error('RSA decryption error:', error);
            throw error;
          }
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
