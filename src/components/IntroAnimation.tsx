"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState(0);
  // 0=dark, 1=eyes, 2=grid, 3=name, 4=eyes-dart+exit

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1250),
      setTimeout(() => setPhase(4), 2100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ backgroundColor: "#0a0a0c" }}
      animate={phase >= 4 ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: phase >= 4 ? 0.3 : 0 }}
      onAnimationComplete={() => {
        if (phase >= 4) onComplete();
      }}
    >
      {/* Subtle ambient breathing glow */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 48%, rgba(107,92,231,0.035) 0%, transparent 70%)",
        }}
      />

      {/* ── Perspective Grid ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0"
          style={{ perspective: "600px", perspectiveOrigin: "50% 38%" }}
        >
          {/* Grid surface */}
          <div
            style={{
              position: "absolute",
              bottom: "-10%",
              left: "-40%",
              right: "-40%",
              height: "75%",
              transform: "rotateX(62deg)",
              transformOrigin: "center top",
              backgroundImage: [
                "repeating-linear-gradient(to right, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 70px)",
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 70px)",
              ].join(", "),
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 0%, black 15%, transparent 65%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 0%, black 15%, transparent 65%)",
            }}
          />
        </div>

        {/* Horizon glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "36%",
            height: "12%",
            background:
              "radial-gradient(ellipse 50% 100% at 50% 50%, rgba(107,92,231,0.04) 0%, transparent 80%)",
          }}
        />
      </motion.div>

      {/* ── Eyes ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            phase >= 4
              ? { opacity: 0, x: -70, y: -35, scale: 0.2 }
              : phase >= 1
                ? { opacity: 1, x: 0, y: 0, scale: 1 }
                : { opacity: 0 }
          }
          transition={
            phase >= 4
              ? { duration: 0.22, ease: [0.4, 0, 1, 1] }
              : { opacity: { duration: 0.6 }, x: { duration: 0.3 }, y: { duration: 0.3 } }
          }
          style={{ marginTop: "-24px" }}
        >
          {/* Inner look-around motion */}
          <motion.div
            animate={
              phase >= 1 && phase < 4
                ? {
                    x: [0, 4, 4, -5, -5, 0, 3, 0],
                    y: [0, 0, -3, -3, 2, 2, -1, 0],
                  }
                : {}
            }
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              times: [0, 0.12, 0.25, 0.42, 0.58, 0.72, 0.88, 1],
            }}
          >
            <div className="flex items-center gap-[16px]">
              {/* Left eye */}
              <motion.div
                className="rounded-full"
                style={{
                  width: "7px",
                  height: "5px",
                  backgroundColor: "rgba(210, 205, 228, 0.9)",
                  boxShadow:
                    "0 0 6px 2px rgba(107,92,231,0.4), 0 0 14px 4px rgba(107,92,231,0.15), 0 0 2px 1px rgba(255,255,255,0.25)",
                }}
                animate={
                  phase >= 1 && phase < 4
                    ? { scaleY: [1, 1, 0.1, 1, 1, 1, 0.1, 1] }
                    : {}
                }
                transition={{
                  scaleY: {
                    duration: 2,
                    times: [0, 0.38, 0.4, 0.42, 0.73, 0.75, 0.77, 0.79],
                    ease: "easeInOut",
                  },
                }}
              />
              {/* Right eye */}
              <motion.div
                className="rounded-full"
                style={{
                  width: "7px",
                  height: "5px",
                  backgroundColor: "rgba(210, 205, 228, 0.9)",
                  boxShadow:
                    "0 0 6px 2px rgba(107,92,231,0.4), 0 0 14px 4px rgba(107,92,231,0.15), 0 0 2px 1px rgba(255,255,255,0.25)",
                }}
                animate={
                  phase >= 1 && phase < 4
                    ? { scaleY: [1, 1, 0.1, 1, 1, 1, 0.1, 1] }
                    : {}
                }
                transition={{
                  scaleY: {
                    duration: 2,
                    times: [0, 0.38, 0.4, 0.42, 0.73, 0.75, 0.77, 0.79],
                    ease: "easeInOut",
                  },
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Name Reveal ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-3"
          style={{ marginTop: "32px" }}
        >
          {/* Accent line */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-[rgba(107,92,231,0.35)] to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={phase >= 3 ? { width: 60, opacity: 0.5 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <h1
            className="font-light tracking-[0.25em] uppercase"
            style={{
              color: "rgba(232, 230, 227, 0.95)",
              fontSize: "clamp(0.9rem, 2vw, 1.4rem)",
            }}
          >
            Ashwin Aggarwal
          </h1>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-[rgba(107,92,231,0.35)] to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={phase >= 3 ? { width: 60, opacity: 0.5 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
