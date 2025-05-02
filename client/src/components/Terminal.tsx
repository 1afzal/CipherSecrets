import { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export default function Terminal({ title, children, className, ...props }: TerminalProps) {
  return (
    <motion.div 
      className={cn(
        "terminal bg-dark-blue bg-opacity-50 p-6 rounded-lg", 
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {title && (
        <h3 className="text-xl font-bold text-terminal-green mb-4">{title}</h3>
      )}
      {children}
    </motion.div>
  );
}
