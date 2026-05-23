"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full flex flex-col items-center overflow-hidden"
    >
      {/* Background is now fully transparent to reveal the extended AtmosphericGrid */}

      {/* ────────────────────────────────────────────
          CONTENT WRAPPER
          ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[70rem] px-6 md:px-12 py-20 flex flex-col items-center text-center">
        <motion.h2
          className="uppercase"
          style={{
            marginBottom: "clamp(2rem, 5vh, 3.5rem)",
          }}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 400,
              letterSpacing: "0.35em",
              color: "var(--text-secondary)",
            }}
          >
            About Me
          </span>
        </motion.h2>

        <motion.p
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "var(--text-primary)",
          }}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          I am drawn to the space where engineering meets emotion - where systems feel
          alive, interfaces carry atmosphere and technology communicates more than
          functionality. My work is centered around building digital experiences with
          clarity, motion and intention.
        </motion.p>
      </div>
    </section>
  );
}
