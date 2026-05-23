"use client";

import { motion } from "framer-motion";
import AtmosphericGrid from "./AtmosphericGrid";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full"
      style={{
        height: "100vh",
      }}
    >


      {/* Top blend for header */}
      <div
        className="absolute inset-x-0 top-0 h-24 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)",
        }}
      />

      {/* ────────────────────────────────────────────
          LAYER 1 — Ghost depth text
          Enormous faint echo receding into the grid
          ──────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <motion.div
          className="absolute uppercase whitespace-nowrap"
          style={{
            fontSize: "clamp(7rem, 20vw, 18rem)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            color: "var(--text-primary)",
            top: "28%",
            left: "50%",
            transform: "translateX(-50%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.12) 60%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.12) 60%, transparent 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.025 }}
          transition={{ duration: 2.5, delay: 0.1, ease: "easeOut" }}
        >
          <span className="inline-block animate-ambient-text">
            Aggarwal
          </span>
        </motion.div>
      </div>

      {/* ────────────────────────────────────────────
          LAYER 2 — Main typographic composition
          ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[2] flex flex-col justify-center"
        style={{
          paddingLeft: "clamp(1.5rem, 8vw, 10rem)",
          paddingRight: "clamp(1.5rem, 8vw, 10rem)",
        }}
      >
        {/* ASHWIN — present, intentional, left-aligned */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span
            className="block uppercase"
            style={{
              fontSize: "clamp(3rem, 3.5vw, 3.5rem)",
              fontWeight: 500,
              letterSpacing: "0.35em",
              color: "var(--text-secondary)",
              textShadow: "0 0 50px rgba(107, 92, 231, 0.04)",
            }}
          >
            <span className="inline-block animate-ambient-text">
              Ashwin
            </span>
          </span>
        </motion.div>

        {/* AGGARWAL — massive, dominant, atmospheric material */}
        <div
          className="overflow-hidden"
          style={{
            marginTop: "clamp(0.15rem, 0.4vw, 0.4rem)",
            marginLeft: "-0.4vw",
          }}
        >
          <motion.h1
            className="uppercase"
            style={{
              fontSize: "clamp(3.2rem, 11.5vw, 12rem)",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 0.88,
              color: "var(--text-primary)",
              /* Layered atmospheric depth */
              textShadow: [
                "0 0 80px rgba(107, 92, 231, 0.06)",
                "0 0 160px rgba(107, 92, 231, 0.03)",
                "0 4px 12px rgba(0, 0, 0, 0.2)",
                "0 1px 0 rgba(255, 255, 255, 0.04)",
              ].join(", "),
              /* Atmospheric edge fading */
              maskImage: [
                "linear-gradient(to right, transparent 0%, black 2%, black 90%, transparent 100%)",
                "linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,0.6) 100%)",
              ].join(", "),
              WebkitMaskImage: [
                "linear-gradient(to right, transparent 0%, black 2%, black 90%, transparent 100%)",
                "linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,0.6) 100%)",
              ].join(", "),
              maskComposite: "intersect",
              WebkitMaskComposite: "destination-in" as string,
            }}
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.3,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="inline-block animate-ambient-text">
              Aggarwal
            </span>
          </motion.h1>
        </div>

        {/* ── Tagline — centered, grounded, anchored ── */}
        <motion.div
          className="flex items-center justify-center gap-5"
          style={{
            marginTop: "clamp(2rem, 4vh, 3.5rem)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="h-px"
            style={{
              width: "clamp(1.5rem, 3vw, 3rem)",
              backgroundColor: "var(--accent-muted)",
            }}
          />
          <span
            className="uppercase"
            style={{
              fontSize: "clamp(0.58rem, 0.85vw, 0.72rem)",
              fontWeight: 400,
              letterSpacing: "0.28em",
              color: "var(--text-tertiary)",
            }}
          >
            Systems&ensp;•&ensp;Motion&ensp;•&ensp;Personality
          </span>
          <div
            className="h-px"
            style={{
              width: "clamp(1.5rem, 3vw, 3rem)",
              backgroundColor: "var(--accent-muted)",
            }}
          />
        </motion.div>
      </div>

      {/* ────────────────────────────────────────────
          LAYER 3 — Scroll line
          ──────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center">
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.span
            className="uppercase"
            style={{
              fontSize: "0.5rem",
              fontWeight: 300,
              letterSpacing: "0.3em",
              color: "var(--text-tertiary)",
              writingMode: "vertical-rl",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <span className="inline-block animate-ambient-text">
              Scroll
            </span>
          </motion.span>
          <motion.div
            style={{
              width: "1px",
              backgroundColor: "var(--text-tertiary)",
              opacity: 0.25,
            }}
            initial={{ height: 0 }}
            animate={{ height: 48 }}
            transition={{
              delay: 2.0,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
