import { Algorithm } from "@shared/schema";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

interface AlgorithmFlowProps {
  algorithm: Algorithm;
}

export default function AlgorithmFlow({ algorithm }: AlgorithmFlowProps) {
  // Render different flow diagrams based on algorithm type
  if (algorithm.type === "Asymmetric") {
    return <AsymmetricFlow algorithm={algorithm} />;
  } else {
    return <SymmetricFlow algorithm={algorithm} />;
  }
}

function AsymmetricFlow({ algorithm }: AlgorithmFlowProps) {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <motion.div 
          className="bg-hacker-black bg-opacity-80 p-4 rounded border border-terminal-green text-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-matrix-green mb-2">Key Generation</h4>
          <div className="text-sm">
            {algorithm.name === "RSA" ? (
              <>
                <p>1. Choose primes p, q</p>
                <p>2. Calculate n = p × q</p>
                <p>3. Calculate φ(n)</p>
                <p>4. Choose e</p>
                <p>5. Calculate d</p>
              </>
            ) : (
              <>
                <p>1. Generate key pair</p>
                <p>2. Derive public key</p>
                <p>3. Derive private key</p>
              </>
            )}
          </div>
        </motion.div>
        
        <div className="flex justify-center items-center">
          <div className="text-center">
            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-matrix-green" />
            </div>
            <p className="text-xs mt-1">Creates</p>
          </div>
        </div>
        
        <motion.div 
          className="bg-hacker-black bg-opacity-80 p-4 rounded-lg border border-terminal-green grid grid-cols-2 gap-2"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center border-r border-terminal-green pr-2">
            <h4 className="text-matrix-green">Public Key</h4>
            <p className="text-sm">{algorithm.name === "RSA" ? "(e, n)" : "(pub)"}</p>
            <p className="text-xs mt-2">Shared openly</p>
          </div>
          <div className="text-center">
            <h4 className="text-matrix-green">Private Key</h4>
            <p className="text-sm">{algorithm.name === "RSA" ? "(d, n)" : "(priv)"}</p>
            <p className="text-xs mt-2">Kept secret</p>
          </div>
        </motion.div>
      </div>
      
      <div className="flex justify-center my-4">
        <ArrowDown className="w-6 h-12 text-matrix-green" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <motion.div 
          className="bg-hacker-black bg-opacity-80 p-4 rounded border border-terminal-green text-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 className="text-matrix-green mb-2">Sender</h4>
          <div className="text-sm">
            <p>1. Gets recipient's public key</p>
            <p>2. Converts message to number m</p>
            <p>3. Encrypts using public key</p>
            <p>4. Sends ciphertext</p>
          </div>
        </motion.div>
        
        <div className="flex justify-center items-center">
          <div className="text-center">
            <div className="bg-terminal-green px-4 py-2 rounded">
              <p className="text-hacker-black font-bold">Encrypted Message</p>
            </div>
            <div className="flex justify-center mt-2">
              <ArrowRight className="w-6 h-6 text-matrix-green" />
            </div>
          </div>
        </div>
        
        <motion.div 
          className="bg-hacker-black bg-opacity-80 p-4 rounded border border-terminal-green text-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h4 className="text-matrix-green mb-2">Recipient</h4>
          <div className="text-sm">
            <p>1. Receives ciphertext</p>
            <p>2. Uses private key</p> 
            <p>3. Decrypts message</p>
            <p>4. Reads original message</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SymmetricFlow({ algorithm }: AlgorithmFlowProps) {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <motion.div 
          className="bg-hacker-black bg-opacity-80 p-4 rounded border border-terminal-green text-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-matrix-green mb-2">Key Generation</h4>
          <div className="text-sm">
            <p>1. Generate a secret key</p>
            <p>2. Key size: {algorithm.keyLength}</p>
            <p>3. Share securely with recipient</p>
          </div>
        </motion.div>
        
        <div className="flex justify-center items-center">
          <div className="text-center">
            <div className="flex justify-center">
              <ArrowDown className="w-6 h-6 text-matrix-green" />
            </div>
            <p className="text-xs mt-1">Creates</p>
          </div>
        </div>
        
        <motion.div 
          className="bg-hacker-black bg-opacity-80 p-4 rounded-lg border border-terminal-green text-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-matrix-green">Shared Secret Key</h4>
          <div className="bg-terminal-green mt-2 p-2 rounded">
            <p className="text-hacker-black font-bold">Same Key</p>
          </div>
          <p className="text-xs mt-2">Must be kept secret by all parties</p>
        </motion.div>
      </div>
      
      <div className="flex justify-center my-4">
        <ArrowDown className="w-6 h-12 text-matrix-green" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div 
          className="bg-hacker-black bg-opacity-80 p-4 rounded border border-terminal-green"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 className="text-matrix-green mb-2 text-center">Encryption</h4>
          <div className="text-sm">
            <div className="flex items-center mb-2">
              <div className="w-1/3 text-right pr-2">Plaintext</div>
              <div className="w-1/3 text-center">
                <ArrowRight className="w-4 h-4 text-matrix-green mx-auto" />
              </div>
              <div className="w-1/3">Algorithm</div>
            </div>
            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2">Secret Key</div>
              <div className="w-1/3 text-center">
                <ArrowRight className="w-4 h-4 text-matrix-green mx-auto" />
              </div>
              <div className="w-1/3">Ciphertext</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-hacker-black bg-opacity-80 p-4 rounded border border-terminal-green"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h4 className="text-matrix-green mb-2 text-center">Decryption</h4>
          <div className="text-sm">
            <div className="flex items-center mb-2">
              <div className="w-1/3 text-right pr-2">Ciphertext</div>
              <div className="w-1/3 text-center">
                <ArrowRight className="w-4 h-4 text-matrix-green mx-auto" />
              </div>
              <div className="w-1/3">Algorithm</div>
            </div>
            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2">Secret Key</div>
              <div className="w-1/3 text-center">
                <ArrowRight className="w-4 h-4 text-matrix-green mx-auto" />
              </div>
              <div className="w-1/3">Plaintext</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
