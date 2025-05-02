declare module 'crypto-js' {
  interface CryptoJS {
    AES: {
      encrypt(message: string, key: string): { toString(): string };
      decrypt(ciphertext: string, key: string): { toString(format: any): string };
    };
    DES: {
      encrypt(message: string, key: string): { toString(): string };
      decrypt(ciphertext: string, key: string): { toString(format: any): string };
    };
    TripleDES: {
      encrypt(message: string, key: string): { toString(): string };
      decrypt(ciphertext: string, key: string): { toString(format: any): string };
    };
    Rabbit: {
      encrypt(message: string, key: string): { toString(): string };
      decrypt(ciphertext: string, key: string): { toString(format: any): string };
    };
    RC4: {
      encrypt(message: string, key: string): { toString(): string };
      decrypt(ciphertext: string, key: string): { toString(format: any): string };
    };
    MD5(message: string): { toString(): string };
    SHA1(message: string): { toString(): string };
    SHA256(message: string): { toString(): string };
    SHA512(message: string): { toString(): string };
    enc: {
      Utf8: any;
    };
  }
  
  export = CryptoJS;
}