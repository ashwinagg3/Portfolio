"use client";

import { motion } from "framer-motion";

const languages = ["English", "Hindi", "Punjabi"];

export default function LanguagesSection() {
  return (
    <section
      id="languages"
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
            Languages
          </h2>
        </motion.div>

        {/* Right Column: Content */}
        <div className="md:w-2/3">
          <motion.ul
            className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-white/5 pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {languages.map((lang, index) => (
              <li
                key={lang}
                className="font-light tracking-wide text-white/80"
                style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)" }}
              >
                {lang}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
