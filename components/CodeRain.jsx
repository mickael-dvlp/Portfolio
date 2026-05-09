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
    let particles = [];
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const PARTICLE_COUNT = Math.floor((window.innerWidth * window.innerHeight) / 28000);

    const init = () => {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.width, canvas.height, true)
      );
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.y += p.speed;
        p.x += p.drift;
        p.currentAngle += p.angle * 0.008;

        if (p.y > canvas.height + 50) {
          Object.assign(p, createParticle(canvas.width, canvas.height, false));
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

    init();
    animate();

    const handleResize = () => {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.width, canvas.height, true)
      );
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
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
