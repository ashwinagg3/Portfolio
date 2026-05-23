"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";

export default function Header() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 md:px-16 py-5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Subtle backdrop blur */}
      <div className="absolute inset-0 backdrop-blur-sm bg-[var(--header-bg)] pointer-events-none" />

      {/* Name / Logo */}
      <motion.div
        className="relative z-10"
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.3 }}
      >
        <span
          className="text-sm font-light tracking-[0.2em] uppercase"
          style={{ color: "var(--text-primary)" }}
        >
          Ashwin Aggarwal
        </span>
      </motion.div>

      {/* Theme Toggle */}
      <motion.button
        className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full border transition-colors duration-300 cursor-pointer"
        style={{
          borderColor: "var(--border-subtle)",
          color: "var(--text-secondary)",
        }}
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
        id="theme-toggle"
      >
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? <Moon size={15} strokeWidth={1.5} /> : <Sun size={15} strokeWidth={1.5} />}
        </motion.div>
      </motion.button>
    </motion.header>
  );
}
