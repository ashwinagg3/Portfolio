"use client";

import { motion } from "framer-motion";

export default function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative w-full flex flex-col items-center justify-center min-h-[70vh] py-32 overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="relative z-10 w-full max-w-[65rem] px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-light tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}
          >
            Technology should communicate emotion through restraint.
          </h2>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="uppercase tracking-[0.3em]"
            style={{
              fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
              color: "var(--text-secondary)",
              opacity: 0.5,
            }}
          >
            Interfaces should feel inevitable
          </p>
        </motion.div>
      </div>
    </section>
  );
}
