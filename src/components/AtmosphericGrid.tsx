"use client";

import { useEffect, useRef } from "react";

export default function AtmosphericGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const vh = window.innerHeight;
      const totalH = vh * 2.5; // Spans 2.5 viewports
      canvas.width = window.innerWidth * dpr;
      canvas.height = totalH * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${totalH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = window.innerWidth;
      const vh = window.innerHeight;
      const totalH = vh * 2.5;
      ctx.clearRect(0, 0, w, totalH);

      const isDark =
        document.documentElement.classList.contains("dark") ||
        !document.documentElement.classList.contains("light");

      // ─── Configuration ───
      const vanishY = vh * 0.32;
      const centerX = w / 2;
      const gridBottom = totalH; // Canvas physically extends down 2.5 viewports
      const gridHeight = gridBottom - vanishY;

      // Light sweep (slow horizontal movement)
      const sweepX = centerX + Math.sin(time * 0.15) * w * 0.25;
      const sweepWidth = w * 0.35;

      // ─── 1. Atmospheric haze at horizon ───
      const hazeGrad = ctx.createRadialGradient(
        centerX, vanishY + 10, 0,
        centerX, vanishY + 10, w * 0.5
      );
      if (isDark) {
        hazeGrad.addColorStop(0, "rgba(107, 92, 231, 0.055)");
        hazeGrad.addColorStop(0.3, "rgba(107, 92, 231, 0.025)");
        hazeGrad.addColorStop(0.7, "rgba(60, 50, 120, 0.012)");
        hazeGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        hazeGrad.addColorStop(0, "rgba(91, 76, 212, 0.055)");
        hazeGrad.addColorStop(0.3, "rgba(91, 76, 212, 0.018)");
        hazeGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = hazeGrad;
      ctx.fillRect(0, 0, w, totalH);

      // ─── 2. Horizontal grid lines (perspective depth) ───
      const hLineCount = 32;
      for (let i = 1; i <= hLineCount; i++) {
        const t = i / hLineCount;
        // Exponential distribution for perspective
        const perspT = Math.pow(t, 2.8);
        const y = vanishY + gridHeight * perspT;

        // Opacity: faint near horizon, stronger near bottom
        const baseAlpha = Math.pow(t, 0.6) * 0.18;
        
        // Progressive fade out at the bottom
        let bottomFade = 1;
        if (isDark) {
          bottomFade = t > 0.9 ? 1 - (t - 0.9) / 0.1 : 1;
        } else {
          // Light mode: smoothly fade out the lower half of the grid
          bottomFade = t > 0.4 ? Math.pow(1 - (t - 0.4) / 0.6, 2) : 1;
        }

        // Very subtle pulse (almost imperceptible)
        const breathe = 1 + Math.sin(time * 0.3 + i * 0.15) * 0.06;
        const alpha = baseAlpha * bottomFade * breathe;

        // Light sweep influence on this line
        const sweepBoost = Math.max(
          0,
          1 - Math.abs(y - (vanishY + gridHeight * 0.4)) / (gridHeight * 0.5)
        ) * 0.03;

        if (alpha < 0.002) continue;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = isDark
          ? `rgba(180, 175, 200, ${alpha + sweepBoost})`
          : `rgba(90, 90, 110, ${(alpha + sweepBoost) * 0.45})`;
        ctx.lineWidth = t < 0.15 ? 0.3 : t < 0.5 ? 0.5 : 0.7;
        ctx.stroke();
      }

      // ─── 3. Vertical grid lines (converge to vanishing point) ───
      const vLineCount = 36;
      for (let i = 0; i <= vLineCount; i++) {
        const t = i / vLineCount;
        const bottomX = (t - 0.5) * w * 15 + centerX; // Spread wider since it projects much further down
        const topX = centerX + (bottomX - centerX) * 0.02; // Converge strongly

        // Fade at edges
        const edgeDist = Math.abs(t - 0.5) * 2;
        const edgeFade = Math.pow(1 - edgeDist, 0.8);
        const baseAlpha = edgeFade * 0.11;

        // Light sweep highlight
        const distFromSweep = Math.abs(bottomX - sweepX);
        const sweepInfluence =
          Math.max(0, 1 - distFromSweep / sweepWidth) * 0.04;

        const breathe = 1 + Math.sin(time * 0.25 + i * 0.2) * 0.05;
        const alpha = (baseAlpha + sweepInfluence) * breathe;

        if (alpha < 0.002) continue;

        ctx.beginPath();
        ctx.moveTo(topX, vanishY);
        ctx.lineTo(bottomX, gridBottom);
        
        if (isDark) {
          ctx.strokeStyle = `rgba(180, 175, 200, ${alpha})`;
        } else {
          // Vertical fade mask for lines in light mode to naturally evaporate
          const vGrad = ctx.createLinearGradient(topX, vanishY, bottomX, gridBottom);
          vGrad.addColorStop(0, `rgba(60, 55, 80, ${alpha * 0.85})`);
          vGrad.addColorStop(0.4, `rgba(60, 55, 80, ${alpha * 0.4})`);
          vGrad.addColorStop(0.8, `rgba(60, 55, 80, 0)`);
          vGrad.addColorStop(1, `rgba(60, 55, 80, 0)`);
          ctx.strokeStyle = vGrad;
        }
        
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ─── 4. Vanishing point glow ───
      const vpGlow = ctx.createRadialGradient(
        centerX, vanishY, 0,
        centerX, vanishY, w * 0.3
      );
      const glowPulse = 0.9 + Math.sin(time * 0.2) * 0.1;
      if (isDark) {
        vpGlow.addColorStop(0, `rgba(107, 92, 231, ${0.075 * glowPulse})`);
        vpGlow.addColorStop(0.25, `rgba(107, 92, 231, ${0.035 * glowPulse})`);
        vpGlow.addColorStop(0.6, `rgba(80, 70, 160, ${0.012 * glowPulse})`);
        vpGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        vpGlow.addColorStop(0, `rgba(91, 76, 212, ${0.045 * glowPulse})`);
        vpGlow.addColorStop(0.3, `rgba(91, 76, 212, ${0.018 * glowPulse})`);
        vpGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = vpGlow;
      ctx.fillRect(0, 0, w, totalH);

      // ─── 5. Light sweep glow ───
      const sweepGrad = ctx.createRadialGradient(
        sweepX, vanishY + gridHeight * 0.35, 0,
        sweepX, vanishY + gridHeight * 0.35, sweepWidth
      );
      if (isDark) {
        sweepGrad.addColorStop(0, `rgba(130, 120, 200, 0.018)`);
        sweepGrad.addColorStop(0.5, `rgba(107, 92, 231, 0.006)`);
        sweepGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        sweepGrad.addColorStop(0, `rgba(91, 76, 212, 0.008)`);
        sweepGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, 0, w, totalH);

      // ─── 6. Horizon line accent ───
      const horizonAlpha = 0.09 + Math.sin(time * 0.3) * 0.015;
      const horizGrad = ctx.createLinearGradient(0, vanishY, w, vanishY);
      if (isDark) {
        horizGrad.addColorStop(0, "rgba(107, 92, 231, 0)");
        horizGrad.addColorStop(0.25, `rgba(140, 130, 200, ${horizonAlpha * 0.4})`);
        horizGrad.addColorStop(0.5, `rgba(160, 150, 210, ${horizonAlpha})`);
        horizGrad.addColorStop(0.75, `rgba(140, 130, 200, ${horizonAlpha * 0.4})`);
        horizGrad.addColorStop(1, "rgba(107, 92, 231, 0)");
      } else {
        horizGrad.addColorStop(0, "rgba(91, 76, 212, 0)");
        horizGrad.addColorStop(0.3, `rgba(91, 76, 212, ${horizonAlpha * 0.3})`);
        horizGrad.addColorStop(0.5, `rgba(91, 76, 212, ${horizonAlpha * 0.7})`);
        horizGrad.addColorStop(0.7, `rgba(91, 76, 212, ${horizonAlpha * 0.3})`);
        horizGrad.addColorStop(1, "rgba(91, 76, 212, 0)");
      }
      ctx.beginPath();
      ctx.moveTo(0, vanishY);
      ctx.lineTo(w, vanishY);
      ctx.strokeStyle = horizGrad;
      ctx.lineWidth = 1;
      ctx.stroke();

      // ─── 7. Soft fog layers ───
      // Lower fog (fades out as it goes down)
      const fogGrad = ctx.createLinearGradient(0, vanishY, 0, gridBottom);
      if (isDark) {
        fogGrad.addColorStop(0, "rgba(10, 10, 12, 0)");
        fogGrad.addColorStop(0.4, "rgba(10, 10, 12, 0.4)");
        fogGrad.addColorStop(1, "rgba(10, 10, 12, 0.95)");
      } else {
        // Vertical fade mask: gradually turns solid white to cleanly dissolve the grid
        fogGrad.addColorStop(0, "rgba(247, 246, 243, 0)");
        fogGrad.addColorStop(0.4, "rgba(247, 246, 243, 0.4)");
        fogGrad.addColorStop(0.75, "rgba(247, 246, 243, 0.9)");
        fogGrad.addColorStop(0.9, "rgba(247, 246, 243, 1)"); // Fully white before the end
        fogGrad.addColorStop(1, "rgba(247, 246, 243, 1)");
      }
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, vanishY, w, gridHeight);

      // Upper fog (above horizon)
      const upperFog = ctx.createLinearGradient(0, 0, 0, vanishY + 30);
      if (isDark) {
        upperFog.addColorStop(0, "rgba(10, 10, 12, 0.95)");
        upperFog.addColorStop(0.6, "rgba(10, 10, 12, 0.6)");
        upperFog.addColorStop(1, "rgba(10, 10, 12, 0.05)");
      } else {
        upperFog.addColorStop(0, "rgba(247, 246, 243, 0.35)");
        upperFog.addColorStop(0.6, "rgba(247, 246, 243, 0.08)");
        upperFog.addColorStop(1, "rgba(247, 246, 243, 0)");
      }
      ctx.fillStyle = upperFog;
      ctx.fillRect(0, 0, w, vanishY + 30);

      // ─── 8. Edge vignette ───
      // Left
      const vigL = ctx.createLinearGradient(0, 0, w * 0.25, 0);
      if (isDark) {
        vigL.addColorStop(0, "rgba(10, 10, 12, 0.8)");
        vigL.addColorStop(1, "rgba(10, 10, 12, 0)");
      } else {
        vigL.addColorStop(0, "rgba(247, 246, 243, 0.1)");
        vigL.addColorStop(1, "rgba(247, 246, 243, 0)");
      }
      ctx.fillStyle = vigL;
      ctx.fillRect(0, 0, w * 0.3, totalH);

      // Right
      const vigR = ctx.createLinearGradient(w, 0, w * 0.75, 0);
      if (isDark) {
        vigR.addColorStop(0, "rgba(10, 10, 12, 0.8)");
        vigR.addColorStop(1, "rgba(10, 10, 12, 0)");
      } else {
        vigR.addColorStop(0, "rgba(247, 246, 243, 0.1)");
        vigR.addColorStop(1, "rgba(247, 246, 243, 0)");
      }
      ctx.fillStyle = vigR;
      ctx.fillRect(w * 0.7, 0, w * 0.3, totalH);

      time += 0.008;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
