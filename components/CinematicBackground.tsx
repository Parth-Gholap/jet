"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const DustParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 20); // Responsive count
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2 - 0.1, // Slight upward drift
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen" />;
};

export default function CinematicBackground() {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  return (
    <div className="fixed inset-0 w-full h-screen pointer-events-none z-[-50] bg-[var(--background)] overflow-hidden transition-colors duration-1000">
      
      {/* 1. Base Deep Gradient */}
      <div 
        className="absolute inset-0 opacity-80 transition-colors duration-1000"
        style={{ background: 'radial-gradient(circle at center, var(--bg-gradient-center) 0%, var(--bg-gradient-edge) 100%)' }}
      />

      {/* 2. Ambient Lighting / Mesh Glows */}
      <motion.div 
        animate={{ 
          x: ["-10%", "10%", "-10%"],
          y: ["-10%", "10%", "-10%"],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-[0.06] transition-colors duration-1000"
        style={{ backgroundColor: 'var(--glow-primary)', mixBlendMode: 'var(--glow-blend)' as any }}
      />
      
      <motion.div 
        animate={{ 
          x: ["10%", "-10%", "10%"],
          y: ["10%", "-10%", "10%"],
          scale: [1, 1.3, 1] 
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-30%] right-[-10%] w-[80vw] h-[80vw] rounded-full blur-[150px] opacity-[0.04] transition-colors duration-1000"
        style={{ backgroundColor: 'var(--glow-secondary)', mixBlendMode: 'var(--glow-blend)' as any }}
      />

      {/* 3. Fog / Haze Layer */}
      <motion.div 
        style={{ y: yOffset }}
        className="absolute inset-0 w-full h-[150%] opacity-20 pointer-events-none"
      >
        <div className="w-full h-1/2 blur-3xl transition-colors duration-1000" style={{ background: 'linear-gradient(to bottom, transparent, var(--fog-color), transparent)' }} />
        <div className="w-full h-1/2 blur-3xl transition-colors duration-1000" style={{ background: 'linear-gradient(to bottom, transparent, var(--fog-color), transparent)' }} />
      </motion.div>

      {/* 4. Particle System */}
      <DustParticles />

      {/* 5. Film Grain Overlay */}
      <div 
        className="absolute inset-0 z-50 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat'
        }} 
      />
      
      {/* 6. Vignette Edge Darkening */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] pointer-events-none" />
      
    </div>
  );
}
