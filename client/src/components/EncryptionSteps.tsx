import { useEffect, useState } from "react";

interface EncryptionStepsProps {
  step: number;
  algorithm: string;
  operation: "encrypt" | "decrypt";
  input: string;
}

export default function EncryptionSteps({ 
  step, 
  algorithm, 
  operation, 
  input 
}: EncryptionStepsProps) {
  const [displayedInput, setDisplayedInput] = useState("");
  
  useEffect(() => {
    // Only show first 15 chars of input to keep visualization clean
    if (input.length > 15) {
      setDisplayedInput(input.substring(0, 15) + "...");
    } else {
      setDisplayedInput(input);
    }
  }, [input]);

  if (step === 0) {
    return (
      <div>
        <div className="mb-2">
          <span className="text-terminal-green">Step 1:</span> {getFirstStep(algorithm, operation)}
        </div>
        <div className="mb-2">
          <span className="text-terminal-green">Step 2:</span> {getSecondStep(algorithm, operation)}
        </div>
        <div className="mb-2">
          <span className="text-terminal-green">Step 3:</span> {getThirdStep(algorithm, operation)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={`mb-2 ${step >= 1 ? "text-terminal-text" : "text-muted-foreground"}`}>
        <span className="text-terminal-green">Step 1:</span> {getFirstStep(algorithm, operation, displayedInput)}
      </div>
      <div className={`mb-2 ${step >= 2 ? "text-terminal-text" : "text-muted-foreground"}`}>
        <span className="text-terminal-green">Step 2:</span> {getSecondStep(algorithm, operation)}
      </div>
      <div className={`mb-2 ${step >= 3 ? "text-terminal-text" : "text-muted-foreground"}`}>
        <span className="text-terminal-green">Step 3:</span> {getThirdStep(algorithm, operation)}
      </div>
      {step >= 4 && (
        <div className="mt-4 text-matrix-green">{operation === "encrypt" ? "Encryption" : "Decryption"} complete!</div>
      )}
    </div>
  );
}

// Helper functions to get algorithm-specific steps
function getFirstStep(algorithm: string, operation: string, input?: string): string {
  const opText = operation === "encrypt" ? "plaintext" : "ciphertext";
  const inputText = input ? `"${input}"` : "";
  
  switch (algorithm) {
    case "rsa":
      return `Convert ${opText} ${inputText} to numeric value`;
    case "aes":
      return `Initialize cipher with key and divide ${opText} ${inputText} into 128-bit blocks`;
    case "des":
      return `Initial permutation of input block ${inputText}`;
    case "tripledes":
      return `Apply DES three times with different subkeys to ${opText} ${inputText}`;
    case "vigenere":
      return `Repeat keyword to match input length of ${opText} ${inputText}`;
    case "caesar":
      return `Convert each character in ${opText} ${inputText} to numeric value`;
    default:
      return `Process ${opText} ${inputText}`;
  }
}

function getSecondStep(algorithm: string, operation: string): string {
  const formula = operation === "encrypt" 
    ? { 
        rsa: "c = m^e mod n",
        aes: "AddRoundKey, SubBytes, ShiftRows, MixColumns for each round",
        des: "16 rounds of Feistel network operations",
        tripledes: "Apply DES algorithm three times",
        vigenere: "Add keyword value to input value",
        caesar: `${operation === "encrypt" ? "Add" : "Subtract"} shift value (typically 3)`,
        default: "Apply main cryptographic transformation"
      }
    : {
        rsa: "m = c^d mod n",
        aes: "Inverse operations: AddRoundKey, InvMixColumns, InvShiftRows, InvSubBytes",
        des: "16 rounds of Feistel network operations (with keys in reverse order)",
        tripledes: "Apply DES decryption algorithm three times",
        vigenere: "Subtract keyword value from input value",
        caesar: "Subtract shift value",
        default: "Apply inverse cryptographic transformation"
      };
      
  return `Apply formula: ${formula[algorithm as keyof typeof formula] || formula.default}`;
}

function getThirdStep(algorithm: string, operation: string): string {
  const result = operation === "encrypt" ? "ciphertext" : "original plaintext";
  
  switch (algorithm) {
    case "rsa":
      return `Produce ${result}`;
    case "aes":
      return `Final round (no MixColumns) and produce ${result}`;
    case "des":
      return `Apply final permutation to produce ${result}`;
    case "vigenere":
      return `Convert numeric values back to letters for ${result}`;
    case "caesar":
      return `Convert numeric values back to letters for ${result}`;
    default:
      return `Generate final ${result}`;
  }
}
