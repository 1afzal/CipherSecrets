import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import EncryptionSteps from "./EncryptionSteps";
import { Loader2 } from "lucide-react";

interface EncryptionFormProps {
  algorithm: string;
}

export default function EncryptionForm({ algorithm }: EncryptionFormProps) {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Info for key field based on algorithm
  const getKeyPlaceholder = () => {
    switch (algorithm) {
      case "aes":
        return "Enter 128, 192, or 256-bit key...";
      case "des":
        return "Enter 56-bit key...";
      case "vigenere":
        return "Enter keyword...";
      case "caesar":
        return "Enter shift value (1-25)...";
      case "rsa":
        return "Enter public key (for encrypt) or private key (for decrypt)...";
      default:
        return "Enter encryption key...";
    }
  };

  const handleEncrypt = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setStep(1);
    
    try {
      const response = await apiRequest("POST", "/api/encrypt", {
        text: message,
        algorithm,
        key,
      });
      
      const data = await response.json();
      setEncrypted(data.result);
      setStep(4);
    } catch (error) {
      console.error("Encryption error:", error);
      setEncrypted("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessage("");
    setKey("");
    setEncrypted("");
    setStep(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <Label className="block text-matrix-green mb-2" htmlFor="rsa-message">
          Plain Text Message
        </Label>
        <Textarea 
          id="rsa-message" 
          rows={4} 
          className="w-full bg-hacker-black border border-terminal-green text-terminal-text p-2 rounded focus:outline-none focus:ring-1 focus:ring-matrix-green" 
          placeholder="Enter your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        
        <div className="mt-4">
          <Label className="block text-matrix-green mb-2" htmlFor="rsa-key">
            Encryption Key
          </Label>
          <Input 
            id="rsa-key" 
            className="w-full bg-hacker-black border border-terminal-green text-terminal-text p-2 rounded focus:outline-none focus:ring-1 focus:ring-matrix-green mb-4" 
            placeholder={getKeyPlaceholder()}
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        
        <div className="mt-4">
          <Button 
            id="rsa-encrypt-btn" 
            className="bg-terminal-green text-hacker-black py-2 px-4 rounded mr-2 hover:bg-opacity-80 transition-colors"
            onClick={handleEncrypt}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Encrypt Message
          </Button>
          <Button 
            id="rsa-reset-btn" 
            className="border border-terminal-green text-terminal-green py-2 px-4 rounded hover:bg-hacker-black transition-colors"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
      
      <div>
        <Label className="block text-matrix-green mb-2" htmlFor="rsa-encrypted">
          Encrypted Result
        </Label>
        <div 
          id="rsa-encrypted" 
          className="h-[110px] bg-hacker-black border border-terminal-green text-terminal-text p-2 rounded overflow-auto font-mono text-sm"
        >
          {encrypted ? (
            encrypted
          ) : (
            <span className="text-electric-blue">// Encrypted message will appear here</span>
          )}
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <Label className="block text-matrix-green mb-2 text-sm" htmlFor="rsa-public-key">
              Public Key
            </Label>
            <div id="rsa-public-key" className="bg-hacker-black border border-terminal-green text-terminal-green p-2 rounded text-sm">
              {algorithm === "rsa" ? "(e=65537, n=314159...)" : "N/A for symmetric encryption"}
            </div>
          </div>
          <div>
            <Label className="block text-matrix-green mb-2 text-sm" htmlFor="rsa-private-key">
              Private Key
            </Label>
            <div id="rsa-private-key" className="bg-hacker-black border border-terminal-green text-electric-blue p-2 rounded text-sm">
              {algorithm === "rsa" ? "(d=123456..., n=314159...)" : "N/A for symmetric encryption"}
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Label className="text-lg font-bold text-terminal-green mb-4" htmlFor="rsa-steps">
            Encryption Steps Visualization
          </Label>
          <div id="rsa-steps" className="bg-hacker-black border border-terminal-green p-4 rounded text-sm">
            <EncryptionSteps step={step} algorithm={algorithm} operation="encrypt" input={message} />
          </div>
        </div>
      </div>
    </div>
  );
}
