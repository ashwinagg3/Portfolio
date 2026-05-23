"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stack = [
  { name: "React", abbr: "Re" },
  { name: "Framer", abbr: "Fm" },
  { name: "Figma", abbr: "Fg" },
  { name: "VS Code", abbr: "VS" },
  { name: "Git", abbr: "Gt" },
  { name: "Node.js", abbr: "No" },
  { name: "Express", abbr: "Ex" },
  { name: "MongoDB", abbr: "Mg" },
  { name: "Socket.io", abbr: "Sc" },
  { name: "SQL", abbr: "SQL" },
  { name: "Python", abbr: "Py" },
  { name: "Java", abbr: "Jv" },
  { name: "Power BI", abbr: "Bi" },
  { name: "After Effects", abbr: "Ae" },
  { name: "Filmora", abbr: "Fl" },
];

const boardVariants = {
  hidden: { opacity: 0, y: 150, rotateX: 55, rotateZ: -5, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 45, // Cinematic isometric tilt
    rotateZ: -12, // Slight off-axis angle
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      when: "beforeChildren",
      staggerChildren: 0.025,
    },
  },
};

const keyDropVariants = {
  hidden: { opacity: 0, z: 250, scale: 0.5 }, // Dropping in from above
  visible: {
    opacity: 1,
    z: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 220,
      damping: 24,
      mass: 0.4,
    },
  },
};

const ambientKeyFloat = {
  initial: { z: 0 },
  animate: (i: number) => ({
    z: [0, 10, 0], // Subtle breathing floating motion
    transition: {
      duration: 3 + (i % 4),
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: i * 0.1,
    },
  }),
};

export default function TechStackSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="tech-stack"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background is fully transparent to reveal the extended AtmosphericGrid */}

      {/* Cinematic Dust Particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: "var(--text-secondary)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.1,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, Math.random() * 40 - 20, 0],
              }}
              transition={{
                duration: 12 + Math.random() * 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* ────────────────────────────────────────────
          HEADER
          ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex flex-col items-center text-center mt-12 mb-16 md:mb-24">
        <motion.h2
          className="uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            style={{
              fontSize: "clamp(1.2rem, 1vw, 1.4rem)",
              fontWeight: 400,
              letterSpacing: "0.4em",
              color: "var(--text-secondary)",
            }}
          >
            Systems I Build With
          </span>
        </motion.h2>
      </div>

      {/* ────────────────────────────────────────────
          3D CONTROL BOARD
          ──────────────────────────────────────────── */}
      <div
        className="relative z-10 w-full max-w-[75rem] px-4 md:px-12 pb-40 flex justify-center items-center"
        style={{ perspective: "1800px" }}
      >
        <motion.div
          className="relative p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-[#0c0c0e]"
          variants={boardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "20%" }}
          style={{
            transformStyle: "preserve-3d",
            // Simulating a thick, premium board material using layered box-shadows
            boxShadow:
              "-15px 25px 0px #060608, -30px 50px 80px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.03), inset 0 -4px 10px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.02)",
          }}
        >
          {/* Subtle under-glow for cinematic effect */}
          <div
            className="absolute inset-0 rounded-[2.5rem] md:rounded-[3.5rem] pointer-events-none"
            style={{
              boxShadow: "0 0 120px rgba(107, 92, 231, 0.05)",
              transform: "translateZ(-1px)",
            }}
          />

          {/* Grid of 3D Keys */}
          <div
            className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 relative z-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            {stack.map((tech, i) => (
              <motion.div
                key={tech.name}
                custom={i}
                variants={keyDropVariants}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Idle floating wrapper */}
                <motion.div
                  variants={ambientKeyFloat}
                  initial="initial"
                  animate="animate"
                  custom={i}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* The interactive physical key */}
                  <motion.div
                    whileHover={{
                      z: 30, // Elevates towards the camera
                      rotateX: -8, // Tilts slightly towards user
                      rotateY: 4,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    whileTap={{
                      z: -15, // Presses deep into the board
                      rotateX: 0,
                      rotateY: 0,
                      transition: { duration: 0.1, ease: "easeIn" },
                    }}
                    className="group relative w-20 h-20 md:w-28 md:h-28 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-[#1c1c22] to-[#111115]"
                    style={{
                      transformStyle: "preserve-3d",
                      // Solid shadow extrusion for mechanical 3D feel
                      boxShadow:
                        "-4px 6px 0px #09090b, -8px 12px 20px rgba(0,0,0,0.8), inset 0 2px 3px rgba(255,255,255,0.08), inset 0 -2px 5px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)",
                    }}
                  >
                    {/* Key Hover Accent Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(107,92,231,0.25)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ transform: "translateZ(1px)" }}
                    />

                    {/* Key Face Content */}
                    <div
                      className="relative flex flex-col items-center justify-center"
                      style={{ transform: "translateZ(10px)" }} // Pops text off the key surface slightly
                    >
                      <span
                        className="text-xl md:text-3xl font-semibold tracking-wide transition-colors duration-300"
                        style={{
                          color: "var(--text-secondary)",
                          textShadow: "0 4px 10px rgba(0,0,0,0.9)",
                        }}
                      >
                        {tech.abbr}
                      </span>
                              <span
                        className="absolute top-[115%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] md:text-[11px] tracking-[0.18em] transition-opacity duration-300 opacity-0 group-hover:opacity-100 font-medium pointer-events-none"
                        style={{
                         color: "var(--accent)",
                         textShadow: "0 0 10px rgba(107, 92, 231, 0.35)",
                        }}
                      >
                           {tech.name}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
