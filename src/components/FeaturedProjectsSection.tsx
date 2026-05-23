"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Project Alpha",
    descriptor: "Full-Stack Web Application",
    description:
      "A complete web platform built from scratch. Focus on responsive design, clear user workflows, and maintainable component architecture. Implemented secure user authentication and seamless API integration.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    year: "2023",
  },
  {
    title: "Project Beta",
    descriptor: "Interactive UI Dashboard",
    description:
      "A front-end interface designed for data visualization and real-time interaction. Engineered with strict performance budgets to ensure smooth animations and minimal layout shifts.",
    stack: ["React", "Framer Motion", "Zustand", "Vite"],
    year: "2024",
  },
];

export default function FeaturedProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full flex flex-col items-center overflow-hidden py-32 md:py-48"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* ────────────────────────────────────────────
          TRANSITION LAYER
          ──────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,12,0.8) 0%, transparent 100%)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full max-w-[85rem] px-6 md:px-12 flex flex-col">
        {/* Header */}
        <motion.div
          className="mb-24 md:mb-40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="uppercase"
            style={{
              fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
              fontWeight: 400,
              letterSpacing: "0.4em",
              color: "var(--text-secondary)",
            }}
          >
            Featured Projects
          </h2>
        </motion.div>

        {/* Projects */}
        <div className="flex flex-col gap-32 md:gap-48">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`flex flex-col ${
                index % 2 !== 0 ? "md:items-end text-left md:text-right" : "text-left"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Project Meta */}
              <div className="flex items-center gap-4 mb-6 opacity-60">
                <span className="text-[0.8rem] tracking-widest text-white uppercase">
                  {project.year}
                </span>
                <div className="h-[1px] w-12 bg-white/20" />
                <span className="text-[0.8rem] tracking-widest text-[var(--accent)] uppercase">
                  {project.descriptor}
                </span>
              </div>

              {/* Project Title */}
              <h3
                className="font-light tracking-tight mb-8"
                style={{
                  fontSize: "clamp(3rem, 6vw, 6rem)",
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                }}
              >
                {project.title}
              </h3>

              {/* Project Description Wrapper */}
              <div
                className={`max-w-xl ${
                  index % 2 !== 0 ? "md:ml-auto" : ""
                }`}
              >
                <p
                  className="mb-10 font-light"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                    lineHeight: 1.8,
                    color: "var(--text-secondary)",
                  }}
                >
                  {project.description}
                </p>

                {/* Tech Stack List */}
                <ul
                  className={`flex flex-wrap gap-x-8 gap-y-3 opacity-60 ${
                    index % 2 !== 0 ? "md:justify-end" : ""
                  }`}
                >
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="text-[0.75rem] uppercase tracking-widest text-white/70"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
