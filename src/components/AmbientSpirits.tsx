"use client";

import { useState, useEffect, useRef } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────
// EYE BALL (With Sclera)
// ─────────────────────────────────────────────────────────
interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  scleraColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  scleraColor = "rgba(0,0,0,0.05)",
  pupilColor = "#111111",
  isBlinking = false,
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial center pos to avoid jump
    setMouseX(window.innerWidth / 2);
    setMouseY(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;

    // Slow, constrained gaze computation
    const distance = Math.min(
      Math.sqrt(deltaX ** 2 + deltaY ** 2) / 40,
      maxDistance
    );
    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pos = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center relative"
      style={{
        width: `${size}px`,
        height: isBlinking ? "2px" : `${size}px`,
        backgroundColor: scleraColor,
        overflow: "hidden",
        transition: "height 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        className="rounded-full absolute"
        style={{
          width: `${pupilSize}px`,
          height: `${pupilSize}px`,
          backgroundColor: pupilColor,
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          opacity: isBlinking ? 0 : 1,
        }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// PUPIL ONLY (For smaller/minimal entities)
// ─────────────────────────────────────────────────────────
interface PupilOnlyProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  isBlinking?: boolean;
}

const PupilOnly = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "#111111",
  isBlinking = false,
}: PupilOnlyProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMouseX(window.innerWidth / 2);
    setMouseY(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };
    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(
      Math.sqrt(deltaX ** 2 + deltaY ** 2) / 40,
      maxDistance
    );
    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pos = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: isBlinking ? "2px" : `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition:
          "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), height 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────
// AMBIENT SPIRITS COMPOSITION
// ─────────────────────────────────────────────────────────
export default function AmbientSpirits() {
  const { isDark } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  const [monoBlink, setMonoBlink] = useState(false);
  const [capBlink, setCapBlink] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Monolith slow blinking (every ~7s)
    const monoInterval = setInterval(() => {
      setMonoBlink(true);
      setTimeout(() => setMonoBlink(false), 200);
    }, 7000);

    // Capsule occasional blinking
    const capInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        setCapBlink(true);
        setTimeout(() => setCapBlink(false), 150);
      }
    }, 4000);

    return () => {
      clearInterval(monoInterval);
      clearInterval(capInterval);
    };
  }, []);

  if (!mounted) return null;

  // Cinematic Color System
  const entityBg = isDark ? "#FAFAFC" : "#1C1C1E";
  const scleraColor = isDark ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)";
  const pupilColor = isDark ? "#111111" : "#F0F0F0";

  const accentViolet = isDark ? "#A093D6" : "#766A9E";
  const accentAmber = isDark ? "#E6C998" : "#A68D5D";

  const monolithShadow = isDark
    ? "0 0 60px rgba(255,255,255,0.1), inset 1px 1px 2px rgba(255,255,255,0.8), inset -2px -2px 10px rgba(0,0,0,0.03)"
    : "0 20px 40px rgba(0,0,0,0.25), inset 1px 1px 2px rgba(255,255,255,0.08), inset -2px -2px 10px rgba(0,0,0,0.5)";

  const genericShadow = isDark
    ? "0 10px 40px rgba(255,255,255,0.05), inset 1px 1px 2px rgba(255,255,255,0.6), inset -2px -2px 8px rgba(0,0,0,0.02)"
    : "0 10px 30px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(255,255,255,0.05), inset -2px -2px 8px rgba(0,0,0,0.4)";

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 overflow-hidden pointer-events-none">
      <div className="relative w-full max-w-[500px] h-[400px]">
        {/* 
          1. Tall Monolith (Rear layer, slow blink, calm breathing) 
        */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 z-10"
          style={{
            left: "8%",
            width: "120px",
            height: "340px",
            backgroundColor: entityBg,
            borderRadius: "20px 20px 0 0",
            boxShadow: monolithShadow,
            transformOrigin: "bottom center",
          }}
        >
          <div className="absolute top-[80px] left-1/2 -translate-x-1/2 flex gap-5">
            <EyeBall
              size={18}
              pupilSize={6}
              maxDistance={4}
              scleraColor={scleraColor}
              pupilColor={pupilColor}
              isBlinking={monoBlink}
            />
            <EyeBall
              size={18}
              pupilSize={6}
              maxDistance={4}
              scleraColor={scleraColor}
              pupilColor={pupilColor}
              isBlinking={monoBlink}
            />
          </div>
        </motion.div>

        {/* 
          4. Arch-shaped entity (Occasional side glance) 
        */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 z-10"
          style={{
            right: "10%",
            width: "80px",
            height: "260px",
            backgroundColor: entityBg,
            borderRadius: "40px 40px 0 0",
            boxShadow: genericShadow,
          }}
        >
          <div className="absolute top-[60px] left-1/2 -translate-x-1/2">
            <PupilOnly
              size={10}
              maxDistance={5}
              pupilColor={accentViolet}
            />
          </div>
        </motion.div>

        {/* 
          2. Medium Capsule (Subtle lean, soft eye movement) 
        */}
        <motion.div
          animate={{ rotate: [-1.5, 1.5, -1.5], y: [0, -6, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-4 z-20"
          style={{
            left: "38%",
            width: "70px",
            height: "180px",
            backgroundColor: entityBg,
            borderRadius: "35px",
            boxShadow: genericShadow,
            transformOrigin: "bottom center",
          }}
        >
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex gap-4">
            <PupilOnly
              size={8}
              maxDistance={4}
              pupilColor={accentAmber}
              isBlinking={capBlink}
            />
            <PupilOnly
              size={8}
              maxDistance={4}
              pupilColor={accentAmber}
              isBlinking={capBlink}
            />
          </div>
        </motion.div>

        {/* 
          3. Dome foreground creature (Tiny smile, slow idle movement) 
        */}
        <motion.div
          animate={{ y: [0, -3, 0], scaleY: [1, 1.02, 1] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-0 z-30"
          style={{
            left: "52%",
            x: "-50%",
            width: "150px",
            height: "100px",
            backgroundColor: entityBg,
            borderRadius: "75px 75px 0 0",
            boxShadow: genericShadow,
            transformOrigin: "bottom center",
          }}
        >
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex gap-7">
            <EyeBall
              size={12}
              pupilSize={4}
              maxDistance={3}
              scleraColor={scleraColor}
              pupilColor={pupilColor}
            />
            <EyeBall
              size={12}
              pupilSize={4}
              maxDistance={3}
              scleraColor={scleraColor}
              pupilColor={pupilColor}
            />
          </div>
          {/* Subtle smile */}
          <div
            className="absolute top-[65px] left-1/2 -translate-x-1/2 w-[24px] h-[8px] rounded-b-full border-b-[1.5px] border-solid"
            style={{ borderColor: pupilColor, opacity: 0.3 }}
          />
        </motion.div>
      </div>
    </div>
  );
}
