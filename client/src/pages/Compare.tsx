import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Algorithm } from "@shared/schema";
import Terminal from "@/components/Terminal";
import { Skeleton } from "@/components/ui/skeleton";

export default function Compare() {
  const { data: algorithms, isLoading } = useQuery<Algorithm[]>({
    queryKey: ["/api/algorithms"],
  });

  // Set title when component mounts
  useEffect(() => {
    document.title = "Compare Algorithms - CipherSpace";
  }, []);

  return (
    <section id="compare" className="py-16 bg-hacker-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-matrix-green mb-8 border-b border-matrix-green pb-2 inline-block">
          &gt; algorithm_comparison_
        </h2>
        
        <Terminal>
          {isLoading ? (
            <Skeleton className="h-80 bg-muted rounded-lg" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-matrix-green">
                    <th className="px-4 py-3 text-terminal-green">Algorithm</th>
                    <th className="px-4 py-3 text-terminal-green">Type</th>
                    <th className="px-4 py-3 text-terminal-green">Key Length</th>
                    <th className="px-4 py-3 text-terminal-green">Security</th>
                    <th className="px-4 py-3 text-terminal-green">Speed</th>
                    <th className="px-4 py-3 text-terminal-green">Use Cases</th>
                  </tr>
                </thead>
                <tbody>
                  {algorithms?.map((algorithm) => (
                    <tr key={algorithm.id} className="border-b border-matrix-green border-opacity-30">
                      <td className="px-4 py-3 text-matrix-green">{algorithm.name}</td>
                      <td className="px-4 py-3">{algorithm.type}</td>
                      <td className="px-4 py-3">{algorithm.keyLength}</td>
                      <td className="px-4 py-3">{algorithm.security}</td>
                      <td className="px-4 py-3">{algorithm.speed}</td>
                      <td className="px-4 py-3">{algorithm.useCases}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Terminal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <Terminal title="Symmetric vs. Asymmetric">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-hacker-black p-4 rounded border border-terminal-green">
                <h4 className="text-matrix-green mb-2">Symmetric Encryption</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Uses same key for encryption and decryption</li>
                  <li>Faster than asymmetric encryption</li>
                  <li>Requires secure key exchange</li>
                  <li>Examples: AES, DES, Blowfish</li>
                </ul>
              </div>
              <div className="bg-hacker-black p-4 rounded border border-terminal-green">
                <h4 className="text-matrix-green mb-2">Asymmetric Encryption</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Uses key pairs (public and private)</li>
                  <li>Slower than symmetric encryption</li>
                  <li>No need for secure key exchange</li>
                  <li>Examples: RSA, ECC, DSA</li>
                </ul>
              </div>
            </div>
          </Terminal>
          
          <Terminal title="Security Considerations">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-matrix-green rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-hacker-black font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-terminal-green">Key Length Matters</h4>
                  <p className="text-sm">Longer keys generally provide better security but may impact performance.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-matrix-green rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-hacker-black font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-terminal-green">Algorithm Selection</h4>
                  <p className="text-sm">Choose modern algorithms that have withstood cryptanalysis (e.g., AES over DES).</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-matrix-green rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-hacker-black font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-terminal-green">Implementation</h4>
                  <p className="text-sm">Even strong algorithms can be compromised by poor implementation or key management.</p>
                </div>
              </div>
            </div>
          </Terminal>
        </div>
      </div>
    </section>
  );
}
