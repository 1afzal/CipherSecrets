import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Algorithm } from "@shared/schema";
import Terminal from "@/components/Terminal";
import EncryptionSteps from "@/components/EncryptionSteps";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

export default function Playground() {
  const [inputText, setInputText] = useState("");
  const [key, setKey] = useState("");
  const [algorithm, setAlgorithm] = useState("aes");
  const [output, setOutput] = useState<string>("");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [operationType, setOperationType] = useState<"encrypt" | "decrypt">("encrypt");

  const { data: algorithms } = useQuery<Algorithm[]>({
    queryKey: ["/api/algorithms"],
  });

  // Set title when component mounts
  useEffect(() => {
    document.title = "Encryption Playground - CipherSpace";
  }, []);

  const handleEncrypt = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setStep(1);
    
    try {
      const response = await apiRequest("POST", "/api/encrypt", {
        text: inputText,
        algorithm,
        key,
      });
      
      const data = await response.json();
      setOutput(data.result);
      setStep(4);
    } catch (error) {
      console.error("Encryption error:", error);
      setOutput("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setStep(1);
    
    try {
      const response = await apiRequest("POST", "/api/decrypt", {
        text: inputText,
        algorithm,
        key,
      });
      
      const data = await response.json();
      setOutput(data.result);
      setStep(4);
    } catch (error) {
      console.error("Decryption error:", error);
      setOutput("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInputText("");
    setKey("");
    setOutput("");
    setStep(0);
  };

  const selectedAlgorithm = algorithms?.find(
    (algo) => algo.name.toLowerCase() === algorithm
  );

  return (
    <section id="playground" className="py-16 bg-hacker-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-matrix-green mb-8 border-b border-matrix-green pb-2 inline-block">
          &gt; encryption_playground_
        </h2>
        
        <Terminal>
          <p className="mb-6">Try different encryption algorithms with your own text. See how the encryption process works and compare the results.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <Label htmlFor="playground-input" className="block text-matrix-green mb-2">
                  Input Text
                </Label>
                <Textarea 
                  id="playground-input" 
                  rows={6} 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-hacker-black border border-terminal-green text-terminal-text p-2 rounded focus:outline-none focus:ring-1 focus:ring-matrix-green" 
                  placeholder="Enter text to encrypt..."
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="playground-key" className="block text-matrix-green mb-2">
                  Encryption Key/Password
                </Label>
                <Input 
                  id="playground-key" 
                  type="text" 
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full bg-hacker-black border border-terminal-green text-terminal-text p-2 rounded focus:outline-none focus:ring-1 focus:ring-matrix-green" 
                  placeholder="Enter encryption key..."
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="algorithm-select" className="block text-matrix-green mb-2">
                  Select Algorithm
                </Label>
                <Select 
                  value={algorithm} 
                  onValueChange={(value) => {
                    setAlgorithm(value);
                    setOutput("");
                    setStep(0);
                  }}
                >
                  <SelectTrigger className="w-full bg-hacker-black border border-terminal-green text-terminal-text p-2 rounded focus:outline-none focus:ring-1 focus:ring-matrix-green">
                    <SelectValue placeholder="Select an algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aes">AES (Advanced Encryption Standard)</SelectItem>
                    <SelectItem value="des">DES (Data Encryption Standard)</SelectItem>
                    <SelectItem value="tripledes">Triple DES</SelectItem>
                    <SelectItem value="rc4">RC4</SelectItem>
                    <SelectItem value="rabbit">Rabbit</SelectItem>
                    <SelectItem value="rsa">RSA (Asymmetric Encryption)</SelectItem>
                    <SelectItem value="vigenere">Vigenère Cipher</SelectItem>
                    <SelectItem value="caesar">Caesar Cipher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={() => {
                    setOperationType("encrypt");
                    handleEncrypt();
                  }}
                  disabled={loading}
                  className="bg-terminal-green text-hacker-black py-2 px-4 rounded hover:bg-opacity-80 transition-colors"
                >
                  {loading && operationType === "encrypt" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Encrypt
                </Button>
                <Button 
                  onClick={() => {
                    setOperationType("decrypt");
                    handleDecrypt();
                  }}
                  disabled={loading}
                  className="bg-electric-blue text-hacker-black py-2 px-4 rounded hover:bg-opacity-80 transition-colors"
                >
                  {loading && operationType === "decrypt" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Decrypt
                </Button>
                <Button 
                  onClick={handleReset}
                  className="border border-terminal-green text-terminal-green py-2 px-4 rounded hover:bg-hacker-black transition-colors"
                >
                  Reset
                </Button>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <Label htmlFor="playground-output" className="block text-matrix-green mb-2">
                  Output
                </Label>
                <div 
                  id="playground-output" 
                  className="h-[150px] bg-hacker-black border border-terminal-green text-terminal-text p-2 rounded overflow-auto font-mono text-sm"
                >
                  {output ? (
                    output
                  ) : (
                    <span className="text-electric-blue">// Encrypted or decrypted output will appear here</span>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="process-visualization" className="block text-matrix-green mb-2">
                  Process Visualization
                </Label>
                <div 
                  id="process-visualization" 
                  className="h-[150px] bg-hacker-black border border-terminal-green p-2 rounded overflow-auto"
                >
                  {step > 0 ? (
                    <EncryptionSteps 
                      step={step} 
                      algorithm={algorithm} 
                      operation={operationType}
                      input={inputText}
                    />
                  ) : (
                    <>
                      <div className="text-electric-blue mb-2">// Encryption/decryption process will be visualized here</div>
                      <div className="text-terminal-green text-sm opacity-70">
                        Select an algorithm and text to encrypt to see the encryption process step by step.
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Terminal>
      </div>
    </section>
  );
}
