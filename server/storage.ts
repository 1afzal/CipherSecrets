import { 
  users, 
  algorithms, 
  type User, 
  type InsertUser, 
  type Algorithm, 
  type InsertAlgorithm 
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAlgorithms(): Promise<Algorithm[]>;
  getAlgorithm(id: number): Promise<Algorithm | undefined>;
  createAlgorithm(algorithm: InsertAlgorithm): Promise<Algorithm>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private algorithms: Map<number, Algorithm>;
  userCurrentId: number;
  algorithmCurrentId: number;

  constructor() {
    this.users = new Map();
    this.algorithms = new Map();
    this.userCurrentId = 1;
    this.algorithmCurrentId = 1;
    
    // Initialize with algorithm data
    this.seedAlgorithms();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getAlgorithms(): Promise<Algorithm[]> {
    return Array.from(this.algorithms.values());
  }
  
  async getAlgorithm(id: number): Promise<Algorithm | undefined> {
    return this.algorithms.get(id);
  }
  
  async createAlgorithm(insertAlgorithm: InsertAlgorithm): Promise<Algorithm> {
    const id = this.algorithmCurrentId++;
    const algorithm: Algorithm = { ...insertAlgorithm, id };
    this.algorithms.set(id, algorithm);
    return algorithm;
  }
  
  private seedAlgorithms() {
    const algorithmData: InsertAlgorithm[] = [
      {
        name: "RSA",
        type: "Asymmetric",
        description: "RSA (Rivest–Shamir–Adleman) is one of the first public-key cryptosystems and is widely used for secure data transmission. The encryption key is public and distinct from the decryption key which is kept secret (private).",
        keyLength: "1024-4096 bits",
        security: "High",
        speed: "Slow",
        useCases: "Digital signatures, key exchange, secure communications",
        steps: JSON.stringify([
          "Generate two large prime numbers: p and q",
          "Calculate n = p × q",
          "Calculate the totient function φ(n) = (p-1) × (q-1)",
          "Choose encryption key e, so that 1 < e < φ(n) and e is coprime with φ(n)",
          "Calculate decryption key d, where (d × e) mod φ(n) = 1",
          "Public key = (e, n), Private key = (d, n)",
          "Encryption: c = m^e mod n",
          "Decryption: m = c^d mod n"
        ])
      },
      {
        name: "AES",
        type: "Symmetric",
        description: "Advanced Encryption Standard (AES) is a symmetric encryption algorithm that uses the same key for both encryption and decryption. It operates on blocks of data using a substitution-permutation network.",
        keyLength: "128, 192, 256 bits",
        security: "Very High",
        speed: "Fast",
        useCases: "File encryption, secure communications, VPNs",
        steps: JSON.stringify([
          "Divide plaintext into 128-bit blocks",
          "Generate key schedule from the cipher key",
          "Initial round: AddRoundKey - XOR block with round key",
          "Main rounds (9, 11, or 13 depending on key size):",
          "- SubBytes - Substitute bytes using S-box",
          "- ShiftRows - Shift rows of state array",
          "- MixColumns - Mix data within columns",
          "- AddRoundKey - XOR with round key",
          "Final round (no MixColumns):",
          "- SubBytes",
          "- ShiftRows",
          "- AddRoundKey"
        ])
      },
      {
        name: "DES",
        type: "Symmetric",
        description: "Data Encryption Standard (DES) is a symmetric-key algorithm for the encryption of digital data. Although its short key length makes it too insecure for modern applications, it was highly influential in the advancement of cryptography.",
        keyLength: "56 bits",
        security: "Low (Broken)",
        speed: "Medium",
        useCases: "Historical, legacy systems",
        steps: JSON.stringify([
          "Initial permutation of input block",
          "Split block into left and right halves",
          "16 rounds of processing:",
          "- Expand right half to 48 bits",
          "- XOR with round key",
          "- S-box substitution",
          "- Permutation",
          "- XOR with left half",
          "Final permutation"
        ])
      },
      {
        name: "Vigenère Cipher",
        type: "Polyalphabetic Cipher",
        description: "A method of encrypting text using a series of interwoven Caesar ciphers, based on the letters of a keyword. It employs a form of polyalphabetic substitution.",
        keyLength: "Variable",
        security: "Very Low",
        speed: "Fast",
        useCases: "Educational purposes, historical interest",
        steps: JSON.stringify([
          "Choose a keyword and repeat it to match input length",
          "Convert letters to numbers (A=0, B=1, etc.)",
          "For each character:",
          "- Add keyword value to input value",
          "- Modulo 26 to get resulting value",
          "- Convert back to letter"
        ])
      },
      {
        name: "Caesar Cipher",
        type: "Substitution Cipher",
        description: "One of the simplest encryption techniques, where each letter in the plaintext is shifted a certain number of places down the alphabet. It's a type of substitution cipher in which each letter is replaced by a letter some fixed number of positions down the alphabet.",
        keyLength: "Fixed (small)",
        security: "Very Low",
        speed: "Very Fast",
        useCases: "Educational purposes, puzzles",
        steps: JSON.stringify([
          "Choose a shift value (typically 3)",
          "For each character in the plaintext:",
          "- Convert to numeric value (A=0, B=1, etc.)",
          "- Add the shift value",
          "- Use modulo 26 to wrap around alphabet",
          "- Convert back to character"
        ])
      },
      {
        name: "Hash Functions",
        type: "Cryptographic Function",
        description: "Hash functions are cryptographic algorithms that convert data of arbitrary size to a fixed-size value. They are one-way functions, making it practically impossible to invert or reverse the computation.",
        keyLength: "N/A",
        security: "Varies by algorithm",
        speed: "Fast",
        useCases: "Password storage, data integrity verification, digital signatures",
        steps: JSON.stringify([
          "Take input data of any length",
          "Apply mathematical transformations",
          "Produce fixed-length hash value",
          "Common algorithms include MD5, SHA-1, SHA-256, SHA-3"
        ])
      }
    ];
    
    algorithmData.forEach(algorithm => {
      const id = this.algorithmCurrentId++;
      this.algorithms.set(id, { ...algorithm, id });
    });
  }
}

export const storage = new MemStorage();
