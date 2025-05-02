import { Link } from "wouter";
import { Algorithm } from "@shared/schema";

interface AlgorithmCardProps {
  algorithm: Algorithm;
}

export default function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  return (
    <div className="cipher-card terminal bg-dark-blue bg-opacity-40 rounded-lg overflow-hidden transition-all duration-300 hover:scale-102">
      <div className="bg-gradient-to-r from-hacker-black to-dark-blue p-4 border-b border-matrix-green">
        <h3 className="text-xl font-bold text-matrix-green">{algorithm.name}</h3>
        <p className="text-sm text-terminal-text">{algorithm.type}</p>
      </div>
      <div className="p-4">
        <p className="mb-4">{algorithm.description.substring(0, 120)}...</p>
        <div className="flex justify-end">
          <Link href={`/algorithm/${algorithm.id}`}>
            <a className="text-terminal-green hover:text-matrix-green transition-colors">
              Explore &gt;&gt;
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
