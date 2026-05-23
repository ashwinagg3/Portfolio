"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IntroAnimation from "@/components/IntroAnimation";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/ProjectsSection";
import EngineeringExperienceSection from "@/components/EngineeringExperienceSection";
import ContactSection from "@/components/ContactSection";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import AtmosphericGrid from "@/components/AtmosphericGrid";
export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  // The theme should be controlled by a ThemeProvider or manual toggle, not forced on mount.

  return (
    <SmoothScrollProvider>
      {/* Intro overlay */}
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main content — fades in after intro completes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {introComplete && <Header />}
        <main className="relative">
          <div className="absolute top-0 left-0 w-full h-[250vh] z-[-1] pointer-events-none">
            <AtmosphericGrid />
          </div>
          <HeroSection />
          <AboutSection />
          <TechStackSection />
          <ProjectsSection />
          <EngineeringExperienceSection />
          <ContactSection />
        </main>
      </motion.div>
    </SmoothScrollProvider>
  );
}
