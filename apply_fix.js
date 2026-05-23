const fs = require('fs');
const path = require('path');

const entityPath = path.join(__dirname, 'src', 'components', 'AmbientEntity.tsx');
let content = fs.readFileSync(entityPath, 'utf-8');

// We need to inject collision detection and safe routing.
// 1. Add obstacle caching state/ref
// 2. Add updateObstacles function
// 3. Update useAnimationFrame to apply collision constraints.

const newContent = `"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import { useThemeStore } from "@/store/useThemeStore";

type IntroPhase = "eyes" | "fade" | "squint" | "approve" | "done";
type PoseType =
  | "idle"
  | "sitting"
  | "peeking"
  | "hanging"
  | "hover"
  | "sleeping"
  | "waking"
  | "relocating";

export default function AmbientEntity() {
  const [mounted, setMounted] = useState(false);
  const { isDark } = useThemeStore();

  // Coordinates and physics configuration - smooth, slow, and weighted
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  const springConfig = { stiffness: 35, damping: 18, mass: 1.6 }; // Weighted cinematic feel
  const springX = useSpring(targetX, springConfig);
  const springY = useSpring(targetY, springConfig);

  // States
  const [introPhase, setIntroPhase] = useState<IntroPhase>("eyes");
  const [activeAnchor, setActiveAnchor] = useState<string>("hero-tagline");
  const [pose, setPose] = useState<PoseType>("idle");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [squashX, setSquashX] = useState(1);
  const [squashY, setSquashY] = useState(1);
  const [bodyOpacity, setBodyOpacity] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [relocationSubPos, setRelocationSubPos] = useState<number>(0);

  // Trackers
  const mousePos = useRef({ x: 0, y: 0 });
  const lastActivity = useRef(Date.now());
  const lastRelocationTime = useRef(0);
  const wakeTimer = useRef<NodeJS.Timeout | null>(null);
  const entityRef = useRef<HTMLDivElement>(null);
  const obstacleRects = useRef<DOMRect[]>([]);

  const updateObstacles = () => {
    // Select all text, headings, buttons, inputs, and semantic blocks
    const els = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span:not(.animate-ambient-text):not(.creature-eye), button, input, textarea, .project-card, [data-entity-anchor^="project-card"]'));
    // Filter out elements that are inside the entity itself to prevent self-collision
    const validEls = els.filter(el => !entityRef.current?.contains(el) && el.getBoundingClientRect().width > 0);
    obstacleRects.current = validEls.map(el => el.getBoundingClientRect());
  };

  // Intro Sequence Timeline
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      targetX.set(window.innerWidth / 2 - 40);
      targetY.set(window.innerHeight / 2 - 50);
      updateObstacles();
    }

    // Step 1: Glowing eyes only (0s to 1.8s)
    // Step 2: Body slowly fades in (1.8s to 3.2s)
    const t1 = setTimeout(() => {
      setIntroPhase("fade");
    }, 1800);

    // Step 3: Suspicious squint - leans forward, head tilt (3.2s to 5.8s)
    const t2 = setTimeout(() => {
      setIntroPhase("squint");
    }, 3200);

    // Step 4: Small approval - subtle smile, relaxed posture (5.8s to 7.8s)
    const t3 = setTimeout(() => {
      setIntroPhase("approve");
    }, 5800);

    // Step 5: Normal ambient behavior begins (7.8s+)
    const t4 = setTimeout(() => {
      setIntroPhase("done");
    }, 7800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Main interaction listeners
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (introPhase === "done") {
        const now = Date.now();
        
        // Wake up eyes first if sleeping
        if (pose === "sleeping") {
          setPose("waking");
          lastActivity.current = now;
          if (wakeTimer.current) clearTimeout(wakeTimer.current);
          wakeTimer.current = setTimeout(() => {
            setPose("idle");
          }, 850);
        } else if (pose !== "waking") {
          lastActivity.current = now;
        }
      }
    };

    const handleScroll = () => {
      updateObstacles();
      if (introPhase === "done") {
        const now = Date.now();
        if (pose === "sleeping") {
          setPose("waking");
          lastActivity.current = now;
          if (wakeTimer.current) clearTimeout(wakeTimer.current);
          wakeTimer.current = setTimeout(() => {
            setPose("idle");
          }, 850);
        } else if (pose !== "waking") {
          lastActivity.current = now;
        }
      }
    };

    const handleResize = () => {
      updateObstacles();
      handleScroll();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initial obstacle capture
    setTimeout(updateObstacles, 1000);
    setTimeout(updateObstacles, 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (wakeTimer.current) clearTimeout(wakeTimer.current);
    };
  }, [mounted, introPhase, pose]);

  // Frame tick loop
  useAnimationFrame((time) => {
    if (!mounted) return;

    // A. BODY OPACITY FADE (Step 2)
    if (introPhase === "eyes") {
      setBodyOpacity(0);
    } else if (introPhase === "fade") {
      setBodyOpacity((prev) => Math.min(1, prev + 0.02));
    } else {
      setBodyOpacity(1);
    }

    // B. RESOLVE ACTIVE ANCHORS & SECTIONS
    const modalEl = document.querySelector('[data-entity-anchor="project-modal"]');
    let currentAnchor = "hero-tagline";

    if (modalEl) {
      currentAnchor = "project-modal";
    } else if (introPhase === "done") {
      // Find centered section
      const viewportCenter = window.innerHeight / 2;
      let minDistance = Infinity;
      let activeSection = "hero";
      const sectionIds = ["hero", "about", "tech-stack", "projects", "engineering-experience", "contact"];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            activeSection = id;
          }
        }
      }

      // Map sections to dynamic anchors based on sub-position
      if (activeSection === "hero") {
        currentAnchor = relocationSubPos === 0 ? "hero-tagline" : "hero-scroll";
      } else if (activeSection === "about") {
        currentAnchor = "about-heading";
      } else if (activeSection === "tech-stack") {
        currentAnchor = "tech-board";
      } else if (activeSection === "projects") {
        const cardEls = document.querySelectorAll('[data-entity-anchor^="project-card-"]');
        if (cardEls.length > 0) {
          const index = relocationSubPos % cardEls.length;
          const anchorAttr = cardEls[index].getAttribute("data-entity-anchor");
          if (anchorAttr) currentAnchor = anchorAttr;
        } else {
          currentAnchor = "tech-board";
        }
      } else if (activeSection === "engineering-experience") {
        const dotEls = document.querySelectorAll('[data-entity-anchor^="experience-dot-"]');
        if (dotEls.length > 0) {
          const index = relocationSubPos % dotEls.length;
          const anchorAttr = dotEls[index].getAttribute("data-entity-anchor");
          if (anchorAttr) currentAnchor = anchorAttr;
        } else {
          currentAnchor = "experience-dot-01";
        }
      } else if (activeSection === "contact") {
        currentAnchor = "contact-left";
      }
    }

    if (activeAnchor !== currentAnchor) {
      setActiveAnchor(currentAnchor);
    }

    // C. ANCHOR RESOLUTION IN THE VIEWPORT
    let tx = window.innerWidth / 2 - 40;
    let ty = window.innerHeight / 2 - 50;

    const anchorEl = document.querySelector(\`[data-entity-anchor="\${currentAnchor}"]\`);
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();

      if (currentAnchor === "hero-tagline") {
        // Sit explicitly ABOVE the tagline, avoiding the main hero text
        tx = rect.left + rect.width / 2 - 40;
        ty = rect.top - 110; 
      } else if (currentAnchor === "hero-scroll") {
        // Hang explicitly to the side of the scroll line
        tx = rect.left + 20;
        ty = rect.top + rect.height / 2 - 50;
      } else if (currentAnchor === "about-heading") {
        // Sit BESIDE the heading, not overlapping
        tx = rect.left - 100;
        ty = rect.top - 20;
      } else if (currentAnchor === "tech-board") {
        // Rest explicitly on the OUTSIDE edges of the board
        if (relocationSubPos === 1) {
          tx = rect.left - 60; // Left gutter
        } else {
          tx = rect.right - 20; // Right gutter
        }
        ty = rect.top - 60; // Slightly above
      } else if (currentAnchor.startsWith("project-card-")) {
        // Sit explicitly ON TOP of the card border
        tx = rect.left + rect.width * 0.8 - 40;
        ty = rect.top - 95; 
      } else if (currentAnchor === "project-modal") {
        // Sit on the top edge of the modal
        if (relocationSubPos === 1) {
          tx = rect.right - 60;
        } else {
          tx = rect.left - 20;
        }
        ty = rect.top - 95;
      } else if (currentAnchor.startsWith("experience-dot-")) {
        // Hang next to the timeline line, well away from text
        tx = rect.left - 110;
        ty = rect.top - 48;
      } else if (currentAnchor === "contact-left") {
        // Rest in empty spaces
        if (relocationSubPos === 1) {
          tx = rect.left + 50;
          ty = rect.top + 50;
        } else if (relocationSubPos === 2) {
          tx = rect.left + rect.width - 110;
          ty = rect.bottom - 130;
        } else {
          tx = rect.left + rect.width / 2 - 40;
          ty = rect.top + rect.height / 2 - 40;
        }
      }
    }

    // SPATIAL AVOIDANCE / COLLISION RESOLUTION
    const ENTITY_W = 80;
    const ENTITY_H = 100;
    const PADDING = 15; // Minimum distance from any text/obstacle

    // Function to push entity out of obstacles
    const resolveCollisions = (targetX: number, targetY: number) => {
      let resolvedX = targetX;
      let resolvedY = targetY;
      let hasCollision = true;
      let iterations = 0;

      while (hasCollision && iterations < 5) {
        hasCollision = false;
        
        for (const obs of obstacleRects.current) {
          // Check overlap
          if (
            resolvedX < obs.right + PADDING &&
            resolvedX + ENTITY_W > obs.left - PADDING &&
            resolvedY < obs.bottom + PADDING &&
            resolvedY + ENTITY_H > obs.top - PADDING
          ) {
            hasCollision = true;
            // Find shortest escape vector
            const pushLeft = (obs.left - PADDING) - (resolvedX + ENTITY_W);
            const pushRight = (obs.right + PADDING) - resolvedX;
            const pushUp = (obs.top - PADDING) - (resolvedY + ENTITY_H);
            const pushDown = (obs.bottom + PADDING) - resolvedY;

            const minPush = Math.min(
              Math.abs(pushLeft), 
              Math.abs(pushRight), 
              Math.abs(pushUp), 
              Math.abs(pushDown)
            );

            if (minPush === Math.abs(pushUp)) resolvedY += pushUp;
            else if (minPush === Math.abs(pushDown)) resolvedY += pushDown;
            else if (minPush === Math.abs(pushLeft)) resolvedX += pushLeft;
            else if (minPush === Math.abs(pushRight)) resolvedX += pushRight;
          }
        }
        iterations++;
      }
      return { x: resolvedX, y: resolvedY };
    };

    // Apply layout-aware collision resolution to the target position
    const safePos = resolveCollisions(tx, ty);
    tx = safePos.x;
    ty = safePos.y;


    // D. DYNAMIC PROXIMITY TRACKING
    const entityCenterX = springX.get() + 40;
    const entityCenterY = springY.get() + 50;
    const dx = mousePos.current.x - entityCenterX;
    const dy = mousePos.current.y - entityCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Relocate if mouse gets too close
    if (introPhase === "done" && pose !== "sleeping" && pose !== "waking") {
      const retreatThreshold = 140;
      if (dist < retreatThreshold && Date.now() - lastRelocationTime.current > 2000) {
        setRelocationSubPos((prev) => {
          const maxOpts = currentAnchor.startsWith("hero-") ? 2 : 3;
          return (prev + 1) % maxOpts;
        });
        lastRelocationTime.current = Date.now();
      }
    }

    // E. EYE TRACKING (Always gaze at cursor, even during slides)
    if (dist > 0) {
      const maxTravelX = 5.5;
      const maxTravelY = 3.5;
      const targetEyeX = (dx / dist) * Math.min(maxTravelX, dist * 0.05);
      const targetEyeY = (dy / dist) * Math.min(maxTravelY, dist * 0.05);
      
      setEyeOffset((prev) => ({
        x: prev.x + (targetEyeX - prev.x) * 0.15, // Latency interpolation
        y: prev.y + (targetEyeY - prev.y) * 0.15,
      }));
    }

    // F. INACTIVITY / SLEEP DETECTOR
    if (introPhase === "done") {
      const idleDuration = Date.now() - lastActivity.current;
      let resolvedPose = pose;

      if (pose !== "waking") {
        if (idleDuration > 12000) {
          resolvedPose = "sleeping";
        } else {
          resolvedPose = "idle";
        }
        if (pose !== resolvedPose) {
          setPose(resolvedPose);
        }
      }
    }

    // G. POSTURES, SQUASH & BREATHING MATH
    if (introPhase === "squint") {
      // Squint leaning forward
      setSquashX(1.07);
      setSquashY(0.93);
      setRotation(7); // head tilt
    } else if (introPhase === "approve") {
      // Relaxed approval posture
      setSquashX(1.0);
      setSquashY(1.0);
      setRotation(0);
    } else if (pose === "sleeping") {
      // Slow breathing slumber scale
      const breathScale = Math.sin(time / 1400) * 0.025;
      setSquashX(1.16 - breathScale);
      setSquashY(0.84 + breathScale);
      setRotation(3); // slight snug tilt
    } else {
      // Normal ambient breathing
      const breathScale = Math.sin(time / 1200) * 0.015;
      setSquashY(1.0 + breathScale);
      setSquashX(1.0 - breathScale * 0.5);

      // Low frequency weight sway
      const sway = Math.sin(time / 1800) * 1.2;
      setRotation(sway);
    }

    // H. AMBIENT DRIFTING (Slow, low-frequency, cinematic)
    let driftX = 0;
    let driftY = 0;

    if (introPhase === "done") {
      if (pose === "sleeping") {
        driftX = Math.sin(time / 7500) * 3;
        driftY = Math.cos(time / 8500) * 2;
      } else {
        driftX = Math.sin(time / 4500) * 10; // Reduced drift to avoid drifting into text
        driftY = Math.cos(time / 5500) * 8;
      }
    }

    // Final safety check for drifting out of bounds
    const finalTx = safePos.x + driftX;
    const finalTy = safePos.y + driftY;
    
    // Smooth constraint to keep inside viewport
    const clampedX = Math.max(10, Math.min(window.innerWidth - 90, finalTx));
    const clampedY = Math.max(10, Math.min(window.innerHeight - 110, finalTy));

    targetX.set(clampedX);
    targetY.set(clampedY);
  });

  const handleWakeClick = () => {
    if (pose === "sleeping" || pose === "waking") {
      lastActivity.current = Date.now();
      setPose("idle");
    }
  };

  if (!mounted) return null;

  // Theme-aware styles: Light mode -> matte black body + glowing eyes; Dark mode -> white/light body + dark eyes
  const bodyColor = isDark ? "#ffffff" : "#121215";
  const borderColor = isDark ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.09)";
  const eyeColor = isDark ? "#1a1a24" : "#e4ddff";
  const mouthColor = isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.4)";

  // Limbs rotations depending on state/poses
  let leftArmRotate = 12;
  let rightArmRotate = -12;
  let leftLegRotate = 0;
  let rightLegRotate = 0;

  if (introPhase === "squint") {
    leftArmRotate = -10;
    rightArmRotate = 10;
    leftLegRotate = -5;
    rightLegRotate = 5;
  } else if (introPhase === "approve") {
    leftArmRotate = 8;
    rightArmRotate = -8;
  } else if (pose === "sleeping") {
    leftArmRotate = 15;
    rightArmRotate = -15;
    leftLegRotate = 5;
    rightLegRotate = -5;
  } else if (activeAnchor === "hero-scroll") {
    leftArmRotate = -155; // hanging holds
    rightArmRotate = -20;
  } else if (activeAnchor.startsWith("project-card-")) {
    leftArmRotate = -45; // perch pose
    rightArmRotate = 45;
  } else if (activeAnchor === "about-heading" || activeAnchor === "project-modal") {
    leftArmRotate = -30; // peek pose
    rightArmRotate = 30;
  }

  // Mouth path resolution
  let mouthD = "M 37 49 L 43 49"; // neutral thin slit
  if (introPhase === "squint") {
    mouthD = "M 38 49 L 42 49"; // thin straight suspicious line
  } else if (introPhase === "approve") {
    mouthD = "M 37 48.5 Q 40 51.5 43 48.5"; // tiny subtle smile
  } else if (pose === "sleeping") {
    mouthD = "M 39 49 L 41 49"; // tiny line
  } else if (pose === "waking") {
    mouthD = "M 38 49.5 A 1.5 1.5 0 1 0 41 49.5 A 1.5 1.5 0 1 0 38 49.5"; // small surprised O
  }

  // Eye scaling (blinking/closed/squinting/sleeping)
  let eyeScaleY = 1;
  let eyeOpacity = 1;
  let customBlinkClass = "creature-eye";

  if (introPhase === "eyes") {
    eyeScaleY = 1;
    eyeOpacity = 1;
    customBlinkClass = ""; // No blinking in pure dark intro
  } else if (introPhase === "squint") {
    eyeScaleY = 0.32;
    eyeOpacity = 0.95;
    customBlinkClass = ""; // Constant suspicious narrow
  } else if (introPhase === "approve") {
    eyeScaleY = 0.85;
    eyeOpacity = 1;
    customBlinkClass = ""; // Relaxed soften
  } else if (pose === "sleeping") {
    eyeScaleY = 0.08;
    eyeOpacity = 0.35;
    customBlinkClass = ""; // Closed eyes
  } else if (pose === "waking") {
    eyeScaleY = 1.1; // wide awake
    eyeOpacity = 1;
    customBlinkClass = "";
  }

  return (
    <motion.div
      ref={entityRef}
      className="fixed z-40 select-none cursor-pointer"
      style={{
        left: springX,
        top: springY,
        width: 80,
        height: 100,
        pointerEvents: "none",
      }}
    >
      {/* Click zone restricted strictly to the creature body boundary to wake it */}
      <div 
        onClick={handleWakeClick}
        className="w-full h-full relative pointer-events-auto"
        style={{
          borderRadius: "30px",
        }}
      >
        {/* Floating Sleep Zzz bubbles */}
        {pose === "sleeping" && (
          <div className="absolute top-0 right-0 w-8 h-12 pointer-events-none overflow-visible">
            <motion.span
              className="absolute text-[8px] font-semibold select-none font-mono"
              style={{ color: "var(--accent)" }}
              initial={{ x: -10, y: 15, opacity: 0, scale: 0.6 }}
              animate={{ x: 6, y: -20, opacity: [0, 0.5, 0], scale: 1.0 }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0 }}
            >
              z
            </motion.span>
            <motion.span
              className="absolute text-[10px] font-semibold select-none font-mono"
              style={{ color: "var(--accent)" }}
              initial={{ x: -8, y: 15, opacity: 0, scale: 0.6 }}
              animate={{ x: 12, y: -35, opacity: [0, 0.5, 0], scale: 1.2 }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1.2 }}
            >
              Z
            </motion.span>
          </div>
        )}

        {/* Main Entity Body SVG */}
        <motion.div
          className="w-full h-full"
          animate={{
            scaleX: squashX,
            scaleY: squashY,
            rotate: rotation,
          }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 15,
          }}
          style={{
            transformOrigin: "40px 50px",
          }}
        >
          <svg
            width="80"
            height="100"
            viewBox="0 0 80 100"
            fill="none"
            className="overflow-visible"
          >
            <defs>
              {/* Soft eye glow filter for light mode (black body + glowing eyes) */}
              <filter id="eye-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <style>{\`
              .creature-eye {
                animation: creature-blink-keyframe 6.5s infinite;
              }
              @keyframes creature-blink-keyframe {
                0%, 90%, 94%, 100% { transform: scaleY(1); }
                92% { transform: scaleY(0.06); }
              }
            \`}</style>

            {/* ─── LIMBS (Fades with bodyOpacity) ─── */}
            {/* Left Arm */}
            <motion.rect
              x="8"
              y="44"
              width="9"
              height="18"
              rx="4.5"
              fill={bodyColor}
              stroke={borderColor}
              strokeWidth="0.8"
              fillOpacity={bodyOpacity}
              strokeOpacity={bodyOpacity}
              style={{ transformOrigin: "14px 46px" }}
              animate={{ rotate: leftArmRotate }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            />

            {/* Right Arm */}
            <motion.rect
              x="63"
              y="44"
              width="9"
              height="18"
              rx="4.5"
              fill={bodyColor}
              stroke={borderColor}
              strokeWidth="0.8"
              fillOpacity={bodyOpacity}
              strokeOpacity={bodyOpacity}
              style={{ transformOrigin: "66px 46px" }}
              animate={{ rotate: rightArmRotate }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            />

            {/* Left Foot */}
            <motion.rect
              x="22"
              y="81"
              width="11"
              height="10"
              rx="5"
              fill={bodyColor}
              stroke={borderColor}
              strokeWidth="0.8"
              fillOpacity={bodyOpacity}
              strokeOpacity={bodyOpacity}
              style={{ transformOrigin: "27px 81px" }}
              animate={{ rotate: leftLegRotate }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            />

            {/* Right Foot */}
            <motion.rect
              x="47"
              y="81"
              width="11"
              height="10"
              rx="5"
              fill={bodyColor}
              stroke={borderColor}
              strokeWidth="0.8"
              fillOpacity={bodyOpacity}
              strokeOpacity={bodyOpacity}
              style={{ transformOrigin: "52px 81px" }}
              animate={{ rotate: rightLegRotate }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            />

            {/* ─── MAIN CAPSULE BODY (Fades with bodyOpacity) ─── */}
            <rect
              x="16"
              y="20"
              width="48"
              height="64"
              rx="24"
              fill={bodyColor}
              stroke={borderColor}
              strokeWidth="0.9"
              fillOpacity={bodyOpacity}
              strokeOpacity={bodyOpacity}
            />

            {/* ─── HEAD SPROUT SENSORS (Fades with bodyOpacity) ─── */}
            {/* Left Leaf sprout */}
            <path
              d="M 37 20 C 34 11, 28 11, 31 7 C 36 7, 38 13, 39.5 20"
              fill="none"
              stroke={borderColor}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity={bodyOpacity}
            />
            <path
              d="M 37.2 19.5 C 34.5 11.5, 29 11.5, 31.5 7.8 C 35.5 7.8, 37.5 13.5, 38.8 19.5"
              fill={bodyColor}
              fillOpacity={bodyOpacity}
              stroke="none"
            />
            
            {/* Right Leaf sprout */}
            <path
              d="M 43 20 C 46 11, 52 11, 49 7 C 44 7, 42 13, 40.5 20"
              fill="none"
              stroke={borderColor}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity={bodyOpacity}
            />
            <path
              d="M 42.8 19.5 C 45.5 11.5, 51 11.5, 48.5 7.8 C 44.5 7.8, 42.5 13.5, 41.2 19.5"
              fill={bodyColor}
              fillOpacity={bodyOpacity}
              stroke="none"
            />

            {/* ─── EYES (Always visible, tracking cursor globally) ─── */}
            <motion.g
              animate={{ x: eyeOffset.x, y: eyeOffset.y }}
              transition={{ type: "spring", stiffness: 140, damping: 15 }}
            >
              {/* Left Eye */}
              <motion.rect
                className={customBlinkClass}
                x="24"
                y="38"
                width="11"
                height="6.5"
                rx="3.25"
                fill={eyeColor}
                filter={!isDark ? "url(#eye-glow)" : "none"}
                style={{ 
                  transformOrigin: "29.5px 41.25px",
                  opacity: eyeOpacity,
                  scaleY: eyeScaleY,
                  boxShadow: isDark ? "inset 0 1px 2px rgba(0,0,0,0.1)" : "none"
                }}
              />

              {/* Right Eye */}
              <motion.rect
                className={customBlinkClass}
                x="45"
                y="38"
                width="11"
                height="6.5"
                rx="3.25"
                fill={eyeColor}
                filter={!isDark ? "url(#eye-glow)" : "none"}
                style={{ 
                  transformOrigin: "50.5px 41.25px",
                  opacity: eyeOpacity,
                  scaleY: eyeScaleY,
                  boxShadow: isDark ? "inset 0 1px 2px rgba(0,0,0,0.1)" : "none"
                }}
              />
            </motion.g>

            {/* ─── MOUTH (Fades with bodyOpacity) ─── */}
            <motion.path
              d={mouthD}
              fill="none"
              stroke={mouthColor}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity={bodyOpacity}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
`;

fs.writeFileSync('apply_fix.js', \`
const fs = require('fs');
fs.writeFileSync(\${JSON.stringify(entityPath)}, \${JSON.stringify(newContent)});
console.log("Fix applied");
\`);
