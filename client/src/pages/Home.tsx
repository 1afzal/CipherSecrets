import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroBanner from "@/components/HeroBanner";
import AboutSection from "@/components/AboutSection";
import AlgorithmsSection from "@/components/AlgorithmsSection";
import { Algorithm } from "@shared/schema";

export default function Home() {
  const { data: algorithms, isLoading, error } = useQuery<Algorithm[]>({
    queryKey: ["/api/algorithms"],
  });

  // Set title when component mounts
  useEffect(() => {
    document.title = "CipherSpace - Encryption Algorithms Explained";
  }, []);

  return (
    <div>
      <HeroBanner />
      <AboutSection />
      <AlgorithmsSection algorithms={algorithms || []} isLoading={isLoading} />
    </div>
  );
}
