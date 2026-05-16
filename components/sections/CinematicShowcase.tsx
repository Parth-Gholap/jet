"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function CinematicShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative w-full h-[120vh] overflow-hidden bg-black flex items-center justify-center">
      
      {/* Parallax Background using frame 120 (mid-animation) as a proxy for 'flying through clouds' */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 w-full h-full opacity-60"
      >
        <Image 
          src="/frames/ezgif-frame-120.png"
          alt="Cinematic Flight"
          fill
          className="object-cover object-center filter brightness-50 contrast-125 sepia-[0.2] hue-rotate-[200deg]"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent to-brand-bg z-10" />
      
      {/* Atmospheric Fog/Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-brand-accent/20 blur-[100px] z-10 mix-blend-screen" />

      {/* Content */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
      >
        <p className="text-brand-accent text-xs tracking-[0.4em] uppercase mb-6 font-mono font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Unrestricted Freedom
        </p>
        <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)] mb-8">
          BEYOND DISTANCE
        </h2>
        <div className="glass-accent p-8 md:p-12 rounded-3xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <p className="text-xl md:text-3xl text-white font-light tracking-wide drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-6">
            Built for those who redefine the horizon.
          </p>
          <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            From New York to Singapore, non-stop. The AERION X1's revolutionary quantum-thrust engines provide an unprecedented 8,500 nautical mile range. Connect the world's financial capitals without layovers, refueling, or compromise. The atmosphere is no longer an obstacle; it's your private corridor.
          </p>
        </div>
      </motion.div>
      
      {/* Film grain overlay specific to this section */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
    </section>
  );
}
