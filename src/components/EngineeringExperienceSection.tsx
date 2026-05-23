"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    id: "01",
    period: "2021 — PRESENT",
    category: "Workflow Systems",
    title: "Freelance Video Editing",
    description: "Handled end-to-end post-production workflows across multiple client domains, focusing on editing systems, communication efficiency, and deadline reliability. Built practical experience in managing revisions, delivery pipelines, and maintaining consistency under rapid turnaround constraints.",
    tags: ["Post-Production", "Revision Workflows", "Delivery Pipelines", "Asset Orchestration"]
  },
  {
    id: "02",
    period: "2023 — 2025",
    category: "Agency Leadership",
    title: "Founder & Leader — The Frame Fusion",
    description: "Built and managed a collaborative editing agency focused on short-form and long-form content production. Led onboarding, task allocation, quality control, and client communication while coordinating delivery pipelines across multiple editors.",
    tags: ["Operations Design", "Quality Assurance", "Resource Allocation", "Pipeline Scaling"]
  },
  {
    id: "03",
    period: "2024 — PRESENT",
    category: "Rapid Execution",
    title: "Hackathons — 4+ 24-Hour Events",
    description: "Developed working prototypes under extreme time constraints across multiple 24-hour engineering events. Focused on rapid ideation, collaborative problem solving, and translating abstract concepts into functional systems within compressed timelines.",
    tags: ["Speed Engineering", "Prototype Architecture", "High-Pressure Synthesis", "Collaborative Logic"]
  }
];

export default function EngineeringExperienceSection() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <section 
      id="engineering-experience" 
      className="relative w-full pb-40 md:pb-60 flex flex-col items-center overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* ────────────────────────────────────────────────
          MASSIVE VISUAL SEPARATION ABOVE SECTION
          ──────────────────────────────────────────────── */}
      <div className="w-full h-[120px] md:h-[180px] flex-shrink-0 pointer-events-none" aria-hidden="true" />

      {/* ────────────────────────────────────────────────
          UNIFIED PORTFOLIO HEADER
          ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex flex-col items-center text-center mb-12 md:mb-16">
        <motion.h2
          className="uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 400,
              letterSpacing: "0.35em",
              color: "var(--text-secondary)",
            }}
          >
            Experience
          </span>
        </motion.h2>
      </div>

      {/* ────────────────────────────────────────────────
          TIMELINE BLOCK
          ──────────────────────────────────────────────── */}
      <div className="relative w-full max-w-[56rem] px-6 md:px-0 mt-32 md:mt-40">
        
        {/* Continuous Dotted Vertical Blueprint Line */}
        <div 
          className="absolute left-[6%] md:left-[30%] top-0 bottom-0 w-0 border-l border-dashed hidden md:block"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          {/* Drifting gradient pulse */}
          <motion.div
            className="absolute w-[2px] h-40 left-[-1.5px] bg-gradient-to-b from-transparent via-[var(--accent-muted)] to-transparent"
            animate={{
              top: ["-10%", "110%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* EXPERIENCE → TIMELINE SPACING */}
        <div className="h-14 md:h-14" />

        {/* Experience Rows */}
        <div className="flex flex-col gap-28 md:gap-40 relative z-10">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group relative w-full flex flex-col"
            >
              
              {/* Row Horizontal Guideline */}
              <motion.div 
                className="w-full h-[1px] mb-16 md:mb-20"
                style={{ backgroundColor: "var(--border-subtle)" }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="w-full grid grid-cols-1 md:grid-cols-10 gap-0">

                {/* LEFT COLUMN: Essential Metadata */}
                <div 
                  className="w-full md:col-span-3 flex flex-col justify-start select-none pt-1"
                  style={{ 
                    paddingRight: isDesktop ? "4rem" : "0",
                    textAlign: isDesktop ? "right" : "left",
                    alignItems: isDesktop ? "flex-end" : "flex-start"
                  }}
                >
                  
                  {/* Understated progression marker dot */}
                  <div 
                    className="absolute left-[30%] -translate-x-1/2 flex items-center justify-center hidden md:flex" 
                    style={{ marginTop: "0.55rem" }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full border z-10 flex items-center justify-center group-hover:border-[var(--text-primary)] transition-colors duration-500"
                      style={{ 
                        borderColor: "var(--border-subtle)", 
                        backgroundColor: "var(--bg-primary)" 
                      }}
                    >
                      <div 
                        className="w-1 h-1 rounded-full group-hover:bg-[var(--text-primary)] transition-colors duration-500"
                        style={{ backgroundColor: "var(--text-tertiary)" }}
                      />
                    </div>
                  </div>

                  <span 
                    style={{ 
                      fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                      fontWeight: 300,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.01em"
                    }}
                  >
                    {exp.period}
                  </span>
                  
                  <span 
                    className="uppercase tracking-[0.2em] font-medium mt-1 text-[0.62rem]"
                    style={{ color: "var(--text-secondary)", opacity: 0.7 }}
                  >
                    {exp.category}
                  </span>
                </div>

                {/* RIGHT COLUMN: Editorial Content */}
                <div 
                  className="w-full md:col-span-7 flex flex-col justify-start"
                  style={{
                    paddingLeft: isDesktop ? "5rem" : "0"
                  }}
                >
                  
                  {/* Title */}
                  <h4 
                    className="font-normal tracking-tight mb-4 leading-tight transition-colors duration-300"
                    style={{ 
                      fontSize: "clamp(1.5rem, 2.5vw, 1.95rem)",
                      color: "var(--text-primary)" 
                    }}
                  >
                    {exp.title}
                  </h4>

                  {/* Description Paragraph */}
                  <p 
                    className="text-[0.92rem] md:text-[0.98rem] font-light leading-[1.8] max-w-[34rem] mb-8"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {exp.description}
                  </p>

                  {/* Architectural Tag List (Slash separated) */}
                  <div 
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.62rem] tracking-[0.2em] font-mono select-none"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {exp.tags.map((tag, idx) => (
                      <div key={tag} className="flex items-center gap-4">
                        {idx > 0 && <span style={{ color: "var(--border-subtle)" }}>/</span>}
                        <span className="hover:text-[var(--text-primary)] transition-colors duration-300">
                          {tag.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
