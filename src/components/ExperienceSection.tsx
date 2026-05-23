"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    category: "Development",
    items: [
      "Full-Stack Web Apps",
      "Responsive Interfaces",
      "Component Architecture",
      "API Integration",
    ],
  },
  {
    category: "Design",
    items: [
      "UI/UX Implementation",
      "Design Systems",
      "Motion & Animation",
      "Interactive Prototyping",
    ],
  },
  {
    category: "Core Interests",
    items: [
      "Creative Coding",
      "Performance Optimization",
      "Accessible Design",
      "Modern Tooling",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative w-full flex flex-col items-center py-32 md:py-48"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="relative z-10 w-full max-w-[85rem] px-6 md:px-12 flex flex-col md:flex-row gap-20 md:gap-32">
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
            Engineering Focus
          </h2>
          <p
            className="font-light"
            style={{
              fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
              lineHeight: 1.6,
              color: "var(--text-primary)",
              opacity: 0.8,
            }}
          >
            Building clean, scalable web experiences with a focus on component architecture, fluid interfaces, and maintainable code.
          </p>
        </motion.div>

        {/* Right Column: Capabilities List */}
        <div className="md:w-2/3 flex flex-col gap-16 md:gap-24 mt-12 md:mt-0">
          {capabilities.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              className="flex flex-col border-t border-white/5 pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 1.2,
                delay: groupIdx * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h3
                className="text-white/40 uppercase tracking-widest text-[0.8rem] mb-10"
              >
                {group.category}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="group flex items-center gap-4"
                  >
                    <div className="w-1 h-1 rounded-full bg-white/20 transition-colors duration-500 group-hover:bg-[var(--accent)]" />
                    <span
                      className="font-light tracking-wide transition-colors duration-500 text-white/70 group-hover:text-white"
                      style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
