"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AircraftDeconstruction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const frameCount = 240;
    const currentFrame = (index: number) => 
      `/frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.png`;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    // Create image objects
    for (let i = 0; i < frameCount; i++) {
      images.push(new Image());
    }

    // Load first image immediately to render initial state
    images[0].src = currentFrame(0);

    // Defer loading the rest of the sequence until page load is complete 
    // to prevent network choking and slow initial page load.
    const loadRemainingFrames = () => {
      for (let i = 1; i < frameCount; i++) {
        images[i].src = currentFrame(i);
      }
    };

    if (document.readyState === "complete") {
      setTimeout(loadRemainingFrames, 100);
    } else {
      window.addEventListener("load", loadRemainingFrames);
    }

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[airpods.frame];
      if (!img || !img.complete) return;

      // Draw image to fill/cover canvas, centered
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      context.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    images[0].onload = render;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%", // Start playing when visible
      },
      repeat: -1, // Infinite continuous loop
    });

    const texts = textRefs.current;
    
    // 1. Continuous smooth 3D motion (6 seconds total)
    tl.to(airpods, { 
      frame: frameCount - 1, 
      snap: "frame", 
      ease: "none", 
      duration: 6, 
      onUpdate: render 
    }, 0);

    // 2. Texts fade in and out while the animation plays seamlessly in the background
    const fadeDur = 0.4;

    // Text 0
    tl.to(texts[0], { opacity: 1, y: 0, duration: fadeDur }, 0.2);
    tl.to(texts[0], { opacity: 0, y: -20, duration: fadeDur }, 1.2);

    // Text 1
    tl.to(texts[1], { opacity: 1, y: 0, duration: fadeDur }, 1.7);
    tl.to(texts[1], { opacity: 0, y: -20, duration: fadeDur }, 2.7);

    // Text 2
    tl.to(texts[2], { opacity: 1, y: 0, duration: fadeDur }, 3.2);
    tl.to(texts[2], { opacity: 0, y: -20, duration: fadeDur }, 4.2);

    // Text 3
    tl.to(texts[3], { opacity: 1, y: 0, duration: fadeDur }, 4.7);
    tl.to(texts[3], { opacity: 0, y: -20, duration: fadeDur }, 5.7);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-transparent overflow-hidden" id="engineering">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />
      
      {/* Dark overlay to ensure text visibility over the canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-black/30" />
      
      {/* Overlay texts */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
        <div 
          ref={(el) => { textRefs.current[0] = el; }} 
          className="absolute opacity-0 translate-y-10 text-center flex flex-col items-center w-full max-w-4xl"
        >
          <p className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4 font-mono font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Acoustic Isolation
          </p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[var(--foreground)] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] mb-6">
            Quiet Power
          </h2>
          <p className="text-[var(--foreground)]/80 text-lg md:text-xl font-light drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] max-w-2xl text-center">
            Operating at a whispered 45 decibels internally. The sound of silence, engineered for the speed of sound.
          </p>
        </div>

        <div 
          ref={(el) => { textRefs.current[1] = el; }} 
          className="absolute opacity-0 translate-y-10 text-center flex flex-col items-center w-full max-w-4xl"
        >
          <p className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4 font-mono font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Aerospace Architecture
          </p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[var(--foreground)] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] mb-6">
            Precision in Every Millimeter
          </h2>
          <p className="text-[var(--foreground)]/80 text-lg md:text-xl font-light drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] max-w-2xl text-center">
            Assembled with sub-micron tolerances. Our titanium-forged superstructure guarantees absolute structural integrity at Mach 0.95.
          </p>
        </div>

        <div 
          ref={(el) => { textRefs.current[2] = el; }} 
          className="absolute opacity-0 translate-y-10 text-center flex flex-col items-center w-full max-w-5xl"
        >
          <p className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4 font-mono font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Material Science
          </p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl tracking-tight text-[var(--foreground)] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] leading-tight mb-6">
            Titanium. Carbon Fiber.<br />
            <span className="text-[var(--accent)] italic font-light drop-shadow-[0_0_20px_rgba(41,93,255,0.4)]">Aerospace Intelligence.</span>
          </h2>
          <p className="text-[var(--foreground)]/80 text-lg md:text-xl font-light drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] max-w-3xl text-center">
            A fuselage that breathes and adapts. Integrated neural-net sensors monitor atmospheric pressure constantly, shifting aerodynamic profiles in real time.
          </p>
        </div>

        <div 
          ref={(el) => { textRefs.current[3] = el; }} 
          className="absolute opacity-0 translate-y-10 text-center flex flex-col items-center w-full max-w-4xl"
        >
          <p className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4 font-mono font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            The Next Era
          </p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-[var(--foreground)] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] mb-8">
            Reserve the Future
          </h2>
          <div className="flex flex-wrap justify-center gap-6 pointer-events-auto">
            <button className="rounded-full bg-[var(--accent)] text-[var(--foreground)] px-10 py-5 text-xs tracking-widest uppercase font-bold hover:bg-[var(--foreground)] hover:text-black hover:shadow-[0_0_30px_rgba(var(--foreground),0.5)] transition-all duration-300">
              Build Your X1
            </button>
            <button className="rounded-full glass-accent px-10 py-5 text-xs tracking-widest uppercase font-medium hover:bg-[var(--accent)]/20 transition-all border border-[var(--accent)]/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              View Specifications
            </button>
          </div>
        </div>
      </div>

      {/* Atmospheric vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,[var(--background)]_100%)] opacity-80 z-0" />
    </section>
  );
}
