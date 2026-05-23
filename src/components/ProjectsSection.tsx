"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Project Data ---
const projects = [
  {
    id: "focusroom",
    name: "FocusRoom",
    description: "Spatial productivity environments.",
    tech: "React • WebGL • TypeScript",
    atmosphere: "rgba(91, 134, 229, 0.15)", // calm blue
    accent: "rgba(91, 134, 229, 0.4)",
    overview: "An immersive digital space designed to cultivate deep work. By blending spatial audio and minimal visual noise, FocusRoom creates a calm psychological barrier against digital distraction.",
    role: "Design Engineering",
    layout: "left-top",
  },
  {
    id: "intelliguard",
    name: "IntelliGuard",
    description: "Industrial telemetry and diagnostics.",
    tech: "Python • Next.js • Tailwind",
    atmosphere: "rgba(168, 175, 185, 0.12)", // neutral industrial
    accent: "rgba(168, 175, 185, 0.3)",
    overview: "A highly restrained telemetry dashboard for industrial sensor networks. IntelliGuard prioritizes immediate signal recognition and spatial hierarchy over typical dashboard clutter.",
    role: "Frontend Architecture",
    layout: "left-bottom",
  },
  {
    id: "resqlink",
    name: "ResQLink",
    description: "Emergency communication protocol.",
    tech: "React Native • Node.js • WebSockets",
    atmosphere: "rgba(229, 83, 83, 0.12)", // emergency red/orange
    accent: "rgba(229, 83, 83, 0.4)",
    overview: "A critical systems communication platform designed for extreme latency sensitivity. The architecture ensures resilient data transmission when standard networks degrade.",
    role: "Full Stack Development",
    layout: "right-feature",
  },
];

export default function ProjectsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <section
      id="projects"
      className="relative w-full flex flex-col items-center justify-center pt-24 pb-32 md:pb-48 px-4 md:px-12 z-20"
    >
      {/* ────────────────────────────────────────────
          SECTION INTRO
          ──────────────────────────────────────────── */}
      <motion.div
        className="w-full flex justify-center"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className="uppercase"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            fontWeight: 400,
            letterSpacing: "0.35em",
            color: "var(--text-secondary)",
          }}
        >
          Projects I Made
        </h2>
      </motion.div>

      {/* ────────────────────────────────────────────
          MASSIVE VISUAL SEPARATION 
          ──────────────────────────────────────────── */}
      <div className="w-full h-[80px] md:h-[80px] lg:h-[80px] flex-shrink-0 pointer-events-none" aria-hidden="true" />

      {/* ────────────────────────────────────────────
          PROJECTS GRID (Asymmetrical)
          ──────────────────────────────────────────── */}
      <div className="w-full max-w-[56rem] grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 lg:gap-8">

        {/* LEFT COLUMN: Stacked Panels */}
        <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
          {projects.filter((p) => p.layout.startsWith("left")).map((project) => (
            <ProjectPanel
              key={project.id}
              project={project}
              onClick={() => setSelectedId(project.id)}
              isFeature={false}
            />
          ))}
        </div>

        {/* RIGHT COLUMN: Dominant Feature Panel */}
        <div className="md:col-span-7 h-[28rem] md:h-auto">
          {projects.filter((p) => p.layout === "right-feature").map((project) => (
            <ProjectPanel
              key={project.id}
              project={project}
              onClick={() => setSelectedId(project.id)}
              isFeature={true}
            />
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────
          CINEMATIC OVERLAY (Shared Layout Modal)
          ──────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            {/* ────────────────────────────────────────────────
                PREMIUM GLASSMORPHISM BACKDROP
                ──────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-40"
              onClick={() => setSelectedId(null)}
            >
              {/* Layer 1: Physical blur */}
              <div className="absolute inset-0 backdrop-blur-3xl backdrop-saturate-[1.35]" />
              {/* Layer 2: Frosted tint - Soft Warm Editorial White / Dark Graphite haze */}
              <div className="absolute inset-0 bg-[#fbfbfa]/60 dark:bg-[#050508]/75" />
              {/* Layer 3: Soft environmental bloom */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-white/60 dark:from-black/20 dark:via-black/40 dark:to-black/60" />
            </motion.div>

            {/* Immersive Expanded Surface */}
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 md:p-8">
              <motion.div
                layoutId={`project-${selectedProject.id}`}
                className="pointer-events-auto relative overflow-hidden rounded-[2.25rem] bg-[#fbfbfa] dark:bg-[#0e0e11] border border-black/[0.05] dark:border-white/[0.05]"
                style={{
                  width: "min(94vw, 78rem)",
                  height: "min(88vh, 42rem)",
                  boxShadow: "0 60px 120px -40px rgba(0,0,0,0.22), 0 30px 60px -20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Atmospheric tint */}
                <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-30" style={{ background: `radial-gradient(ellipse at 75% 15%, ${selectedProject.atmosphere} 0%, transparent 60%)` }} />

                {/* Close Button */}
                <motion.button
                  className="absolute top-[20px] right-[20px] z-50 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-colors"
                  onClick={() => setSelectedId(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="w-3.5 h-[1.5px] bg-[#2c2c2e] dark:bg-white rotate-45 absolute rounded-full" />
                  <div className="w-3.5 h-[1.5px] bg-[#2c2c2e] dark:bg-white -rotate-45 absolute rounded-full" />
                </motion.button>

                {/* ═══════════════════════════════════════
                    INNER CENTERED CONTENT WRAPPER
                    Content floats INSIDE the modal surface
                    ═══════════════════════════════════════ */}
                <motion.div
                  className="w-full h-full flex items-center justify-center relative z-10"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="w-full max-w-[1280px] mx-auto px-[32px] md:px-[72px] py-[40px] md:py-[64px]">
                    <div className="grid grid-cols-1 md:grid-cols-[minmax(320px,0.9fr)_minmax(620px,1.4fr)] gap-10 md:gap-14">

                  {/* ── LEFT COLUMN: Editorial ── */}
                  <div className="w-full h-full flex flex-col justify-center">

                    <motion.h3
                      layoutId={`title-${selectedProject.id}`}
                      className="font-semibold tracking-[-0.02em] text-[#1c1c1e] dark:text-white/95 leading-[1.1] mb-4"
                      style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}
                    >
                      {selectedProject.name}
                    </motion.h3>

                    <motion.p
                      layoutId={`desc-${selectedProject.id}`}
                      className="text-[0.85rem] font-light text-[#5a5a5e] dark:text-white/40 leading-relaxed mb-8 max-w-[340px]"
                    >
                      {selectedProject.description}
                    </motion.p>

                    <div className="w-8 h-[1px] bg-black/[0.08] dark:bg-white/10 mb-8" />

                    {/* Metadata Vertical Rhythm */}
                    <div className="space-y-6 overflow-y-auto pr-2 scrollbar-hide max-h-[18rem]">

                      <div>
                        <p className="uppercase text-[0.52rem] tracking-[0.3em] text-[#8e8e93] dark:text-white/25 mb-1.5 font-medium">Overview</p>
                        <p className="text-[0.78rem] text-[#3a3a3c] dark:text-white/50 leading-[1.65] font-light max-w-[340px]">
                          {selectedProject.overview}
                        </p>
                      </div>

                      <div>
                        <p className="uppercase text-[0.52rem] tracking-[0.3em] text-[#8e8e93] dark:text-white/25 mb-1.5 font-medium">Tech Stack</p>
                        <motion.p layoutId={`tech-${selectedProject.id}`} className="text-[0.78rem] text-[#2c2c2e] dark:text-[#d1d1d6] leading-relaxed font-normal">
                          {selectedProject.tech}
                        </motion.p>
                      </div>

                      <div>
                        <p className="uppercase text-[0.52rem] tracking-[0.3em] text-[#8e8e93] dark:text-white/25 mb-1.5 font-medium">Role</p>
                        <p className="text-[0.78rem] text-[#2c2c2e] dark:text-[#d1d1d6] leading-relaxed font-light">{selectedProject.role}</p>
                      </div>

                      <div>
                        <p className="uppercase text-[0.52rem] tracking-[0.3em] text-[#8e8e93] dark:text-white/25 mb-2 font-medium">Links</p>
                        <div className="flex gap-5">
                          <span className="text-[0.65rem] uppercase tracking-[0.2em] border-b border-[#2c2c2e]/20 dark:border-white/15 pb-0.5 text-[#5a5a5e] dark:text-white/40 hover:text-[#1c1c1e] dark:hover:text-white/80 cursor-pointer transition-colors duration-300">Live</span>
                          <span className="text-[0.65rem] uppercase tracking-[0.2em] border-b border-[#2c2c2e]/20 dark:border-white/15 pb-0.5 text-[#5a5a5e] dark:text-white/40 hover:text-[#1c1c1e] dark:hover:text-white/80 cursor-pointer transition-colors duration-300">GitHub</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* ── RIGHT COLUMN: Media Stage ── */}
                  <div className="w-full h-full relative flex items-center justify-center md:translate-y-[12px]">
                    {selectedProject.id === "resqlink" ? (
                      <div
                        className="
                          relative
                          w-full
                          aspect-video
                          overflow-hidden
                          rounded-[2rem]
                          bg-black
                          shadow-[0_40px_120px_rgba(0,0,0,0.45)]
                          ring-1 ring-white/10
                        "
                      >
                        <motion.video
                          src="/videos/ResQLink_Try.mp4"
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="
                            absolute inset-0
                            w-full h-full
                            object-contain
                          "
                          initial={{ scale: 1 }}
                          animate={{ scale: 1.03 }}
                          transition={{
                            duration: 25,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear",
                          }}
                        />

                        {/* Cinematic Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />

                        {/* Edge Vignette */}
                        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.35)] pointer-events-none" />

                        {/* Additional Cinematic Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                        <div className="absolute inset-0 ring-1 ring-white/10 rounded-[inherit] pointer-events-none" />
                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] rounded-[inherit] pointer-events-none" />
                      </div>
                    ) : (
                      <div className="w-full aspect-video relative rounded-2xl overflow-hidden bg-[#f4f3f0] dark:bg-[#0c0c0e] border border-black/[0.04] dark:border-white/[0.03] shadow-[0_40px_120px_rgba(0,0,0,0.15)] flex flex-col justify-between p-4 md:p-6 ring-1 ring-black/5 dark:ring-white/10">
                        {/* Glowing Accent Ambient Light */}
                        <div className="absolute right-[-10%] top-[10%] w-[55%] h-[55%] rounded-full blur-[90px] opacity-[0.18] pointer-events-none" style={{ backgroundColor: selectedProject.accent }} />
                        <div className="absolute left-[5%] bottom-[15%] w-[40%] h-[40%] rounded-full blur-[80px] opacity-[0.08] pointer-events-none" style={{ backgroundColor: selectedProject.accent }} />

                        {/* Scanner Lines Grid Overlay */}
                        <div className="absolute inset-0 opacity-[0.15] dark:opacity-30 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.02) 1px, rgba(0,0,0,0.02) 3px)", backgroundSize: "100% 3px" }} />

                        {/* Window Container (Default for other projects) */}
                        <div className="flex-1 w-full border border-black/[0.08] dark:border-white/[0.06] rounded-xl flex flex-col overflow-hidden bg-[#fafaf9]/80 dark:bg-[#16161a]/95 shadow-xl relative z-10">

                          {/* Window Header */}
                          <div className="h-8 border-b border-black/[0.05] dark:border-white/[0.04] flex items-center justify-between px-3 bg-black/[0.01] dark:bg-white/[0.01]">
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]/80 dark:bg-white/10" />
                              <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]/80 dark:bg-white/10" />
                              <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]/80 dark:bg-white/10" />
                            </div>
                            <div className="text-[0.55rem] tracking-wider text-[#a1a1a6] dark:text-white/20 uppercase font-mono">
                              {selectedProject.id}.sys
                            </div>
                            <div className="w-8" /> {/* Balance spacer */}
                          </div>

                          {/* Window Workspace */}
                          <div className="flex-1 flex min-h-0 bg-[#ffffff]/60 dark:bg-[#121215]/80">
                            {/* Sidebar */}
                            <div className="w-[25%] border-r border-black/[0.04] dark:border-white/[0.04] p-3 flex flex-col gap-2.5 bg-black/[0.01] dark:bg-white/[0.01]">
                              <div className="w-full h-1.5 bg-[#e5e5ea] dark:bg-white/10 rounded-full" />
                              <div className="w-4/5 h-1 bg-[#f2f2f7] dark:bg-white/5 rounded-full" />
                              <div className="w-3/5 h-1 bg-[#f2f2f7] dark:bg-white/5 rounded-full" />
                              <div className="w-5/6 h-1 bg-[#f2f2f7] dark:bg-white/5 rounded-full mt-2" />
                              <div className="w-1/2 h-1 bg-[#f2f2f7] dark:bg-white/5 rounded-full" />
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 p-4 flex flex-col gap-3 justify-between">
                              {/* Graph / Core Panel */}
                              <div className="flex-1 w-full border border-black/[0.03] dark:border-white/[0.03] rounded-lg bg-gradient-to-br from-black/[0.01] to-transparent dark:from-white/[0.01] p-3 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute right-2 top-2 text-[0.45rem] font-mono text-[#aeacb0] dark:text-white/15">
                                  Telemetry ACT
                                </div>

                                {/* Animated line/path representation */}
                                <div className="w-full h-8 flex items-end gap-1 px-1 border-b border-black/[0.04] dark:border-white/[0.04] pb-1">
                                  <div className="w-full h-[30%] bg-gradient-to-t from-black/[0.04] to-transparent dark:from-white/5 rounded-sm" />
                                  <div className="w-full h-[60%] bg-gradient-to-t from-black/[0.04] to-transparent dark:from-white/5 rounded-sm" />
                                  <div className="w-full h-[45%] bg-gradient-to-t from-black/[0.04] to-transparent dark:from-white/5 rounded-sm" />
                                  <div className="w-full h-[80%] bg-gradient-to-t from-black/[0.04] to-transparent dark:from-white/5 rounded-sm" />
                                  <div className="w-full h-[50%] bg-gradient-to-t from-black/[0.04] to-transparent dark:from-white/5 rounded-sm" />
                                </div>

                                <div className="w-3/4 h-1.5 bg-[#e5e5ea] dark:bg-white/10 rounded-full" />
                              </div>

                              {/* Dual Cards */}
                              <div className="w-full flex gap-3 h-[30%]">
                                <div className="flex-1 border border-black/[0.03] dark:border-white/[0.03] rounded-lg bg-[#ffffff]/80 dark:bg-[#18181c]/50 p-2.5 shadow-sm">
                                  <div className="w-2/3 h-1 bg-[#e5e5ea] dark:bg-white/10 rounded-full mb-1.5" />
                                  <div className="w-full h-[3px] bg-[#f2f2f7] dark:bg-white/5 rounded-full" />
                                </div>
                                <div className="flex-1 border border-black/[0.03] dark:border-white/[0.03] rounded-lg bg-[#ffffff]/80 dark:bg-[#18181c]/50 p-2.5 shadow-sm">
                                  <div className="w-1/2 h-1 bg-[#e5e5ea] dark:bg-white/10 rounded-full mb-1.5" />
                                  <div className="w-3/4 h-[3px] bg-[#f2f2f7] dark:bg-white/5 rounded-full" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Pagination indicators */}
                        <div className="w-full flex justify-center items-center gap-2 pt-2 md:pt-0">
                          <div className="w-5 h-[1.5px] bg-[#2c2c2e]/40 dark:bg-white/60 rounded-full" />
                          <div className="w-1 h-[1.5px] bg-[#2c2c2e]/10 dark:bg-white/20 rounded-full" />
                          <div className="w-1 h-[1.5px] bg-[#2c2c2e]/10 dark:bg-white/20 rounded-full" />
                        </div>
                      </div>
                    )}
                  </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div >
          </>
        )
        }
      </AnimatePresence >
    </section >
  );
}

// ──────────────────────────────────────────────────
// PROJECT PANEL COMPONENT
// ──────────────────────────────────────────────────

function ProjectPanel({ project, onClick, isFeature }: { project: any; onClick: () => void; isFeature: boolean }) {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      onClick={onClick}
      className={`group relative rounded-3xl md:rounded-[2.5rem] cursor-pointer bg-[#f9f9f9] dark:bg-[#0c0c0e] overflow-hidden ${isFeature ? "h-full min-h-[24rem]" : "h-[14rem] md:h-[15rem]"
        }`}
      style={{
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Atmospheric Internal Life (Breathing glow) */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.atmosphere} 0%, transparent 70%)`,
        }}
        animate={{
          opacity: [0, 0.5, 0.2, 0.6],
          backgroundPosition: ["0% 0%", "5% 2%", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Matte surface overlay to prevent harsh colors */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />

      {/* Abstract Structural Lines for "System" feeling */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute left-6 md:left-10 top-0 bottom-0 w-[1px] bg-[var(--text-primary)]" />
        <div className="absolute left-0 right-0 top-6 md:top-10 h-[1px] bg-[var(--text-primary)]" />
      </div>

      {/* ABSOLUTELY POSITIONED CONTENT SAFE AREA */}
      <div className="absolute z-10 left-[2.5rem] right-[2.5rem] bottom-[2.5rem] md:left-[3.5rem] md:right-[3.5rem] md:bottom-[4rem] flex flex-col items-start pointer-events-none">
        <motion.h3
          layoutId={`title-${project.id}`}
          className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-[var(--text-primary)]"
        >
          {project.name}
        </motion.h3>
        <motion.p
          layoutId={`desc-${project.id}`}
          className="text-sm md:text-base font-light text-[var(--text-secondary)] mb-4"
        >
          {project.description}
        </motion.p>
        <motion.div
          layoutId={`tech-${project.id}`}
          className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
        >
          {project.tech}
        </motion.div>
      </div>
    </motion.div>
  );
}
