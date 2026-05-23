"use client";

import { motion } from "framer-motion";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative w-full flex flex-col items-center py-20 md:py-32"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="relative z-10 w-full max-w-[85rem] px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-32">
        {/* Left Column: Heading */}
        <motion.div
          className="md:w-1/3 flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="uppercase mb-8"
            style={{
              fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
              fontWeight: 400,
              letterSpacing: "0.4em",
              color: "var(--text-secondary)",
            }}
          >
            Education
          </h2>
        </motion.div>

        {/* Right Column: Content */}
        <div className="md:w-2/3 flex flex-col gap-12">
          <motion.div
            className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-white/5 pb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col">
              <h3
                className="font-light tracking-wide mb-2"
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  color: "var(--text-primary)",
                }}
              >
                Bachelor of Technology
              </h3>
              <p
                className="font-light"
                style={{
                  fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                  color: "var(--text-secondary)",
                  opacity: 0.8,
                }}
              >
                Computer Science and Engineering
              </p>
            </div>
            
            <div
              className="mt-4 md:mt-0 uppercase tracking-widest text-xs"
              style={{ color: "var(--text-secondary)", opacity: 0.6 }}
            >
              2022 — Present
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
