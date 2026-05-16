"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-transparent flex items-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 -right-1/4 w-[80vw] h-[80vw] bg-[var(--accent)]/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[var(--background)] to-transparent z-10" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row h-full">
        
        {/* Left Content */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="flex-1 flex flex-col justify-start pt-32 md:pt-48 lg:pt-56 pb-12 relative z-10"
        >
          {/* Subtle dark gradient behind text for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/80 via-[var(--background)]/40 to-transparent -z-10 -ml-12 w-[150%]" />
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 3.8, ease: [0.16, 1, 0.3, 1] }} // After preloader
          >
            <p className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-4 font-mono">
              <span className="w-8 h-[1px] bg-[var(--accent)] block"></span>
              Project Aerion
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] tracking-tight mb-8 drop-shadow-2xl max-w-4xl">
              ENGINEERED FOR <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--foreground)] via-[var(--foreground)]/90 to-[var(--foreground)]/50">
                THE EDGE OF TOMORROW
              </span>
            </h1>
            <p className="text-[var(--foreground)]/70 text-lg md:text-xl max-w-xl font-light leading-relaxed mb-10 drop-shadow-lg">
              Experience the pinnacle of aerospace craftsmanship. 
              The AERION X1 redefines ultra-long-range travel with zero-noise architecture and adaptive quantum intelligence.
            </p>

            <div className="flex flex-wrap gap-6 items-center mb-16">
              <button className="group relative overflow-hidden rounded-full glass-accent px-8 py-4 flex items-center gap-3 transition-all duration-500 hover:bg-[var(--accent)]/20 hover:shadow-[0_0_30px_rgba(var(--glow-primary), 0.3)] border border-[#295dff]/30">
                <span className="relative z-10 text-xs tracking-widest uppercase font-bold text-[var(--foreground)]">Explore Aircraft</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform text-[var(--foreground)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#295dff]/0 via-[#295dff]/20 to-[#295dff]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
              
              <button className="group flex items-center gap-4 px-6 py-4 text-xs tracking-widest uppercase font-medium hover:text-[var(--foreground)] transition-colors text-[var(--foreground)]/70">
                <div className="w-10 h-10 rounded-full border border-[var(--foreground)]/20 flex items-center justify-center group-hover:border-[var(--foreground)]/50 group-hover:bg-[var(--foreground)]/5 transition-all">
                  <Play className="w-3 h-3 fill-[var(--foreground)] ml-0.5" />
                </div>
                Watch Reveal
              </button>
            </div>

            {/* Jet Specifications Mini-Grid */}
            <div className="grid grid-cols-3 gap-8 border-t border-[var(--foreground)]/10 pt-8 max-w-xl">
              <div>
                <p className="text-[var(--foreground)]/40 text-[10px] uppercase tracking-[0.2em] mb-1">Max Range</p>
                <p className="font-serif text-2xl text-[var(--foreground)]">8,500 <span className="text-sm font-sans text-[var(--accent)]">NM</span></p>
              </div>
              <div>
                <p className="text-[var(--foreground)]/40 text-[10px] uppercase tracking-[0.2em] mb-1">Top Speed</p>
                <p className="font-serif text-2xl text-[var(--foreground)]">Mach 0.95</p>
              </div>
              <div>
                <p className="text-[var(--foreground)]/40 text-[10px] uppercase tracking-[0.2em] mb-1">Capacity</p>
                <p className="font-serif text-2xl text-[var(--foreground)]">18 <span className="text-sm font-sans text-[var(--accent)]">PAX</span></p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Jet Render */}
        <motion.div 
          style={{ y: yImage, scale: scaleImage }}
          className="flex-1 absolute md:relative right-0 md:right-auto bottom-0 md:bottom-auto w-full h-[60%] md:h-full opacity-50 md:opacity-100 -z-10 md:z-0 flex items-center justify-center md:justify-end"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 2, delay: 4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[150%] md:w-[130%] aspect-video md:-mr-[15%] mt-20 md:mt-0"
          >
            {/* Volumetric ambient glow behind aircraft */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[var(--accent)]/30 blur-[100px] rounded-full mix-blend-screen pointer-events-none z-0" />
            <div className="absolute top-[40%] right-[30%] w-[30%] h-[30%] bg-[var(--foreground)]/20 blur-[80px] rounded-full mix-blend-screen pointer-events-none z-0" />
            <Image 
              src="/frames/ezgif-frame-001.png" 
              alt="AERION X1 Jet" 
              fill 
              sizes="(max-width: 768px) 150vw, 130vw"
              className="object-contain object-right drop-shadow-[0_0_100px_rgba(var(--glow-primary), 0.2)]"
              priority
            />
            {/* Turbine glowing effect */}
            <div className="absolute top-[45%] right-[25%] w-32 h-32 bg-[var(--accent)]/40 rounded-full blur-[60px] animate-pulse" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles simulation */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-30 mix-blend-screen" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
    </section>
  );
}
