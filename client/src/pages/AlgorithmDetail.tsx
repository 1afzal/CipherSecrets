import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Algorithm } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Terminal from "@/components/Terminal";
import EncryptionForm from "@/components/EncryptionForm";
import AlgorithmFlow from "@/components/AlgorithmFlow";
import { ArrowLeft } from "lucide-react";

export default function AlgorithmDetail() {
  const [match, params] = useRoute("/algorithm/:id");
  const id = params?.id ? parseInt(params.id) : 0;

  const { data: algorithm, isLoading } = useQuery<Algorithm>({
    queryKey: [`/api/algorithms/${id}`],
    enabled: !!id,
  });

  // Set title when component mounts
  useEffect(() => {
    if (algorithm) {
      document.title = `${algorithm.name} - CipherSpace`;
    } else {
      document.title = "Algorithm - CipherSpace";
    }
  }, [algorithm]);

  if (isLoading) {
    return <AlgorithmDetailSkeleton />;
  }

  if (!algorithm) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Link href="/"><Button variant="link" className="text-terminal-green hover:text-matrix-green mb-4"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Algorithms</Button></Link>
        <div className="terminal bg-dark-blue bg-opacity-40 p-6 rounded-lg">
          <h2 className="text-2xl text-matrix-green">Algorithm not found</h2>
          <p className="mt-4">The algorithm you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const steps = JSON.parse(algorithm.steps) as string[];

  return (
    <section className="py-16 bg-hacker-black">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <Link href="/#algorithms"><Button variant="link" className="text-terminal-green hover:text-matrix-green"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Algorithms</Button></Link>
        </div>
        <h2 className="text-3xl font-bold text-matrix-green mb-8 border-b border-matrix-green pb-2 inline-block">
          &gt; {algorithm.name}_encryption_
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Terminal title={`About ${algorithm.name}`}>
            <p className="mb-4">{algorithm.description}</p>
            <p className="mb-4">As a {algorithm.type.toLowerCase()} algorithm:</p>
            <ul className="list-disc list-inside mb-4">
              {algorithm.type === "Asymmetric" ? (
                <>
                  <li>A <span className="text-terminal-green">public key</span> that can be shared openly</li>
                  <li>A <span className="text-terminal-green">private key</span> that must be kept secret</li>
                </>
              ) : (
                <li>The <span className="text-terminal-green">same key</span> is used for both encryption and decryption</li>
              )}
            </ul>
            <p>Key Length: <span className="text-terminal-green">{algorithm.keyLength}</span></p>
            <p>Security Level: <span className="text-terminal-green">{algorithm.security}</span></p>
            <p>Speed: <span className="text-terminal-green">{algorithm.speed}</span></p>
            <p>Common Use Cases: <span className="text-terminal-green">{algorithm.useCases}</span></p>
          </Terminal>
          
          <Terminal title={`How ${algorithm.name} Works`}>
            <ol className="list-decimal list-inside space-y-2">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </Terminal>
        </div>
        
        <Terminal title={`${algorithm.name} Flow Diagram`} className="mb-12">
          <AlgorithmFlow algorithm={algorithm} />
        </Terminal>
        
        <Terminal title={`Try ${algorithm.name} Encryption`}>
          <EncryptionForm algorithm={algorithm.name.toLowerCase()} />
        </Terminal>
      </div>
    </section>
  );
}

function AlgorithmDetailSkeleton() {
  return (
    <section className="py-16 bg-hacker-black">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <Button variant="link" className="text-terminal-green">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Algorithms
          </Button>
        </div>
        <Skeleton className="h-10 w-80 bg-muted mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Skeleton className="h-80 bg-muted rounded-lg" />
          <Skeleton className="h-80 bg-muted rounded-lg" />
        </div>
        
        <Skeleton className="h-96 bg-muted rounded-lg mb-12" />
        <Skeleton className="h-96 bg-muted rounded-lg" />
      </div>
    </section>
  );
}
