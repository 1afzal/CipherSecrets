// Encryption algorithm types

export type EncryptionAlgorithm =
  | "aes"
  | "des"
  | "tripledes"
  | "rc4"
  | "rabbit"
  | "rsa"
  | "vigenere"
  | "caesar";

export type HashAlgorithm = 
  | "md5"
  | "sha1"
  | "sha256"
  | "sha512"
  | "ripemd160";

export interface EncryptionResult {
  ciphertext: string;
  key?: string;
  iv?: string;
  salt?: string;
}

export interface DecryptionResult {
  plaintext: string;
}

export interface EncryptionStep {
  description: string;
  code?: string;
  output?: string;
}

export interface AlgorithmMetadata {
  name: string;
  type: "Symmetric" | "Asymmetric" | "Hash" | "Other";
  description: string;
  keySizes: number[];
  blockSize?: number;
  rounds?: number;
  speed: "Very Fast" | "Fast" | "Medium" | "Slow" | "Very Slow";
  security: "Very Low" | "Low" | "Medium" | "High" | "Very High";
  yearDeveloped: number;
  developers: string[];
  commonUses: string[];
  vulnerabilities?: string[];
}
