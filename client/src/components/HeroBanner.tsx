import { Link } from "wouter";
import { motion } from "framer-motion";
import MatrixBackground from "./MatrixBackground";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  return (
    <section className="matrix-bg py-16 md:py-24 text-center relative">
      <MatrixBackground />
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold text-matrix-green mb-4 typing"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Encryption Demystified
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Explore encryption algorithms, understand their mechanisms, and see them in action.
        </motion.p>
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/#algorithms">
            <Button className="terminal bg-dark-blue text-matrix-green py-2 px-6 rounded hover:bg-opacity-70 transition duration-300">
              Explore Algorithms
            </Button>
          </Link>
          <Link href="/playground">
            <Button className="terminal bg-transparent border border-matrix-green text-matrix-green py-2 px-6 rounded hover:bg-hacker-black transition duration-300">
              Try Encryption
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
