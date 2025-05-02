import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Algorithm } from "@shared/schema";
import AlgorithmCard from "./AlgorithmCard";
import { Skeleton } from "@/components/ui/skeleton";

interface AlgorithmsSectionProps {
  algorithms: Algorithm[];
  isLoading: boolean;
}

export default function AlgorithmsSection({ algorithms, isLoading }: AlgorithmsSectionProps) {
  return (
    <section id="algorithms" className="py-16 bg-hacker-black bg-opacity-90">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-matrix-green mb-8 border-b border-matrix-green pb-2 inline-block"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          &gt; encryption_algorithms_
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Render skeletons while loading
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-52 rounded-lg" />
            ))
          ) : (
            // Render algorithm cards
            algorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AlgorithmCard algorithm={algorithm} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
