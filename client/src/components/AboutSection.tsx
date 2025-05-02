import { motion } from "framer-motion";
import Terminal from "./Terminal";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-hacker-black">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-matrix-green mb-8 border-b border-matrix-green pb-2 inline-block"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          &gt; what is CipherSpace_
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Terminal title="Mission">
              <p className="mb-4">CipherSpace demystifies encryption algorithms through interactive visualizations and hands-on examples.</p>
              <p>Whether you're a cybersecurity student, professional developer, or just encryption-curious, our platform provides clear, accurate explanations of how encryption algorithms function.</p>
            </Terminal>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Terminal title="Features">
              <ul className="list-disc list-inside space-y-2">
                <li>Interactive demonstrations of popular encryption algorithms</li>
                <li>Visual flow diagrams explaining encryption processes</li>
                <li>Side-by-side algorithm comparisons</li>
                <li>Live encryption/decryption playground</li>
                <li>Code examples in multiple programming languages</li>
              </ul>
            </Terminal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
