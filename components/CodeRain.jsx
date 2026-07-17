"use client";

import { useEffect, useRef } from "react";

const TAGS = [
  "<div>", "</div>", "<p>", "</p>", "<a>", "</a>", "<nav>", "</nav>",
  "<span>", "</span>", "<h1>", "</h1>", "<h2>", "</h2>", "<ul>", "<li>",
  "<section>", "</section>", "<header>", "<footer>", "<main>", "<button>",
  "<input>", "<form>", "</form>", "<img />", "<React />", "useState()",
  "useEffect()", "async", "=>", "const", "return",
];

const COLORS = [
  "rgba(108, 99, 255, 0.55)",
  "rgba(147, 51, 234, 0.45)",
  "rgba(97, 218, 251, 0.35)",
  "rgba(6, 182, 212, 0.40)",
  "rgba(168, 162, 255, 0.40)",
  "rgba(255, 255, 255, 0.15)",
];

function createParticle(canvasWidth, canvasHeight, randomY = false) {
  return {
    x: Math.random() * canvasWidth,
    y: randomY ? Math.random() * canvasHeight : -40,
    tag: TAGS[Math.floor(Math.random() * TAGS.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speed: 0.25 + Math.random() * 0.55,
    drift: (Math.random() - 0.5) * 0.25,
    size: 10 + Math.random() * 5,
    opacity: 0.25 + Math.random() * 0.45,
    angle: (Math.random() - 0.5) * 0.12,
    currentAngle: (Math.random() - 0.5) * 0.3,
  };
}

export default function CodeRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let particles = [];
    let animId;
    let resizeId;
    let isRunning = false;
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = Math.round(canvasWidth * pixelRatio);
      canvas.height = Math.round(canvasHeight * pixelRatio);
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const init = () => {
      resize();
      const particleCount = Math.floor((canvasWidth * canvasHeight) / 28000);
      particles = Array.from({ length: particleCount }, () =>
        createParticle(canvasWidth, canvasHeight, true)
      );
    };

    const animate = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      for (const p of particles) {
        p.y += p.speed;
        p.x += p.drift;
        p.currentAngle += p.angle * 0.008;

        if (p.y > canvasHeight + 50) {
          Object.assign(p, createParticle(canvasWidth, canvasHeight, false));
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.currentAngle);
        ctx.font = `${p.size}px monospace`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillText(p.tag, 0, 0);
        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };

    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };

    const start = () => {
      if (isRunning || document.hidden || reducedMotionQuery.matches) return;
      isRunning = true;
      animId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      cancelAnimationFrame(resizeId);
      resizeId = requestAnimationFrame(init);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const handleReducedMotionChange = () => {
      if (reducedMotionQuery.matches) {
        stop();
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      } else {
        init();
        start();
      }
    };

    init();
    start();
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      stop();
      cancelAnimationFrame(resizeId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
