"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────
// PUPIL AND EYEBALL COMPONENTS (Unmodified logic)
// ─────────────────────────────────────────────────────────

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };

    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };

    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
};


// ─────────────────────────────────────────────────────────
// PORTFOLIO CONTACT SECTION
// ─────────────────────────────────────────────────────────

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Interaction State
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMessageFocused, setIsMessageFocused] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);

  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking effect for purple character
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Blinking effect for black character
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Observing the form interaction (subtle glance when focusing inputs)
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => {
        setIsLookingAtEachOther(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));

    // Refined, softer body skew (reduced to max 3deg for luxury feel)
    const bodySkew = Math.max(-3, Math.min(3, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", project: "", message: "" });

    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center bg-[#F5F5F2] dark:bg-[#050505] py-24 relative overflow-hidden transition-colors duration-500">
      
      {/* ─────────────────────────────────────────────────────────
          GLOBAL SECTION HEADING
          ───────────────────────────────────────────────────────── */}
      <motion.div
        className="w-full flex justify-center mb-24 relative z-10"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className="uppercase text-[#111111] dark:text-[var(--text-secondary)] transition-colors duration-500"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            fontWeight: 400,
            letterSpacing: "0.35em",
          }}
        >
          Let's Connect!
        </h2>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────
          CONTENT ROW
          ───────────────────────────────────────────────────────── */}
      <div className="w-full grid lg:grid-cols-2 relative z-10">
      {/* ─────────────────────────────────────────────────────────
          LEFT SIDE - AMBIENT CINEMATIC ENTITIES
          ───────────────────────────────────────────────────────── */}
      <div className="relative hidden lg:flex flex-col justify-center p-12">

        <div className="relative z-20 flex items-end justify-center h-[500px]">
          {/* Characters Container */}
          <div className="relative" style={{ width: '550px', height: '400px' }}>

            {/* 1. Purple Entity */}
            <div
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-[1400ms] ease-in-out"
              style={{
                left: '70px',
                width: '180px',
                height: (isTyping || isMessageFocused) ? '420px' : '400px', // Softer lift
                backgroundColor: '#79819eff',
                borderRadius: '10px 10px 0 0',
                zIndex: 1,
                transform: isMessageFocused
                  ? `skewX(0deg)`
                  : isTyping
                    ? `skewX(${(purplePos.bodySkew || 0) - 4}deg) translateX(15px)` // Less exaggerated translation and skew
                    : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div
                className="absolute flex gap-8 transition-all duration-[1400ms] ease-in-out"
                style={{
                  left: isMessageFocused ? `${20}px` : isLookingAtEachOther ? `${55}px` : `${45 + purplePos.faceX}px`,
                  top: isMessageFocused ? `${35}px` : isLookingAtEachOther ? `${65}px` : `${40 + purplePos.faceY}px`,
                }}
              >
                {/* 40% reduced maxDistance for softer eye movement */}
                <EyeBall
                  size={18} pupilSize={7} maxDistance={3}
                  eyeColor="white" pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={isMessageFocused ? -4 : isLookingAtEachOther ? 2 : undefined}
                  forceLookY={isMessageFocused ? -4 : isLookingAtEachOther ? 3 : undefined}
                />
                <EyeBall
                  size={18} pupilSize={7} maxDistance={3}
                  eyeColor="white" pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={isMessageFocused ? -4 : isLookingAtEachOther ? 2 : undefined}
                  forceLookY={isMessageFocused ? -4 : isLookingAtEachOther ? 3 : undefined}
                />
              </div>
            </div>

            {/* 2. Black Entity */}
            <div
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-[1400ms] ease-in-out"
              style={{
                left: '240px',
                width: '120px',
                height: '310px',
                backgroundColor: '#2D2D2D',
                borderRadius: '8px 8px 0 0',
                zIndex: 2,
                transform: isMessageFocused
                  ? `skewX(0deg)`
                  : isLookingAtEachOther
                    ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 4}deg) translateX(10px)`
                    : isTyping
                      ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                      : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div
                className="absolute flex gap-6 transition-all duration-[1400ms] ease-in-out"
                style={{
                  left: isMessageFocused ? `${10}px` : isLookingAtEachOther ? `${32}px` : `${26 + blackPos.faceX}px`,
                  top: isMessageFocused ? `${28}px` : isLookingAtEachOther ? `${12}px` : `${32 + blackPos.faceY}px`,
                }}
              >
                <EyeBall
                  size={16} pupilSize={6} maxDistance={2.4}
                  eyeColor="white" pupilColor="#2D2D2D"
                  isBlinking={isBlackBlinking}
                  forceLookX={isMessageFocused ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={isMessageFocused ? -4 : isLookingAtEachOther ? -2 : undefined}
                />
                <EyeBall
                  size={16} pupilSize={6} maxDistance={2.4}
                  eyeColor="white" pupilColor="#2D2D2D"
                  isBlinking={isBlackBlinking}
                  forceLookX={isMessageFocused ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={isMessageFocused ? -4 : isLookingAtEachOther ? -2 : undefined}
                />
              </div>
            </div>

            {/* 3. Orange Entity */}
            <div
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-[1400ms] ease-in-out"
              style={{
                left: '0px',
                width: '240px',
                height: '200px',
                zIndex: 3,
                backgroundColor: '#F3A26B',
                borderRadius: '120px 120px 0 0',
                transform: isMessageFocused ? `skewX(0deg)` : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div
                className="absolute flex gap-8 transition-all duration-500 ease-out"
                style={{
                  left: isMessageFocused ? `${50}px` : `${82 + (orangePos.faceX || 0)}px`,
                  top: isMessageFocused ? `${85}px` : `${90 + (orangePos.faceY || 0)}px`,
                }}
              >
                <Pupil size={12} maxDistance={3} pupilColor="#2D2D2D" forceLookX={isMessageFocused ? -5 : undefined} forceLookY={isMessageFocused ? -4 : undefined} />
                <Pupil size={12} maxDistance={3} pupilColor="#2D2D2D" forceLookX={isMessageFocused ? -5 : undefined} forceLookY={isMessageFocused ? -4 : undefined} />
              </div>
            </div>

            {/* 4. Yellow Entity */}
            <div
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-[1400ms] ease-in-out"
              style={{
                left: '310px',
                width: '140px',
                height: '230px',
                backgroundColor: '#D9C768',
                borderRadius: '70px 70px 0 0',
                zIndex: 4,
                transform: isMessageFocused ? `skewX(0deg)` : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div
                className="absolute flex gap-6 transition-all duration-500 ease-out"
                style={{
                  left: isMessageFocused ? `${20}px` : `${52 + (yellowPos.faceX || 0)}px`,
                  top: isMessageFocused ? `${35}px` : `${40 + (yellowPos.faceY || 0)}px`,
                }}
              >
                <Pupil size={12} maxDistance={3} pupilColor="#2D2D2D" forceLookX={isMessageFocused ? -5 : undefined} forceLookY={isMessageFocused ? -4 : undefined} />
                <Pupil size={12} maxDistance={3} pupilColor="#2D2D2D" forceLookX={isMessageFocused ? -5 : undefined} forceLookY={isMessageFocused ? -4 : undefined} />
              </div>
              <div
                className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-500 ease-out"
                style={{
                  left: isMessageFocused ? `${10}px` : `${40 + (yellowPos.faceX || 0)}px`,
                  top: isMessageFocused ? `${88}px` : `${88 + (yellowPos.faceY || 0)}px`,
                }}
              />
            </div>

          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          RIGHT SIDE - CONTACT FORM
          ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[460px]">
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              required
              className="h-14 w-full rounded-none border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] px-5 text-[#111111] dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 backdrop-blur-xl outline-none transition-all duration-300 focus:border-[#7C6CFF]/50"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              required
              className="h-14 w-full rounded-none border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] px-5 text-[#111111] dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 backdrop-blur-xl outline-none transition-all duration-300 focus:border-[#7C6CFF]/50"
            />

            <input
              name="project"
              type="text"
              placeholder="Project Type (e.g. Website, App)"
              value={formData.project}
              onChange={handleChange}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              className="h-14 w-full rounded-none border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] px-5 text-[#111111] dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 backdrop-blur-xl outline-none transition-all duration-300 focus:border-[#7C6CFF]/50"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setIsMessageFocused(true)}
              onBlur={() => setIsMessageFocused(false)}
              placeholder="What's your message?"
              required
              className="min-h-[180px] w-full resize-none border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] px-5 py-4 text-[#111111] dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 backdrop-blur-xl outline-none transition-all duration-300 focus:border-[#7C6CFF]/50"
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 w-full rounded-none border border-black/10 dark:border-white/10 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 transition-all duration-500 text-sm tracking-[0.25em] font-medium"
              >
                {isSubmitting ? "SENDING MESSAGE..." : submitted ? "MESSAGE SENT" : "SEND MESSAGE"}
              </button>
            </div>

          </form>

        </div>
      </div>
      
      </div>
    </section>
  );
}
