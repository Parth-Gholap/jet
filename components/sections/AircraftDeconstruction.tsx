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

    // Preload first image immediately, rest asynchronously
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
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
        start: "top top",
        end: "+=4000", // 500vh equivalent
        scrub: 0.5,
        pin: true,
      }
    });

    // Frame sequence animation
    tl.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render
    });

    // Text sequence animations mapping to scroll progress
    const texts = textRefs.current;
    
    // 0-20% "Quiet Power"
    tl.to(texts[0], { opacity: 1, y: 0, duration: 0.1 }, 0);
    tl.to(texts[0], { opacity: 0, y: -20, duration: 0.1 }, 0.2);

    // 25-45% "Precision in Every Millimeter"
    tl.to(texts[1], { opacity: 1, y: 0, duration: 0.1 }, 0.25);
    tl.to(texts[1], { opacity: 0, y: -20, duration: 0.1 }, 0.45);

    // 50-75% "Titanium. Carbon Fiber. Aerospace Intelligence."
    tl.to(texts[2], { opacity: 1, y: 0, duration: 0.1 }, 0.5);
    tl.to(texts[2], { opacity: 0, y: -20, duration: 0.1 }, 0.75);

    // 80-100% "Reserve the Future"
    tl.to(texts[3], { opacity: 1, y: 0, duration: 0.1 }, 0.8);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden" id="engineering">
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
          <p className="text-[#295dff] text-xs tracking-[0.3em] uppercase mb-4 font-mono font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Acoustic Isolation
          </p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] mb-6">
            Quiet Power
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-light drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] max-w-2xl text-center">
            Operating at a whispered 45 decibels internally. The sound of silence, engineered for the speed of sound.
          </p>
        </div>

        <div 
          ref={(el) => { textRefs.current[1] = el; }} 
          className="absolute opacity-0 translate-y-10 text-center flex flex-col items-center w-full max-w-4xl"
        >
          <p className="text-[#295dff] text-xs tracking-[0.3em] uppercase mb-4 font-mono font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Aerospace Architecture
          </p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] mb-6">
            Precision in Every Millimeter
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-light drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] max-w-2xl text-center">
            Assembled with sub-micron tolerances. Our titanium-forged superstructure guarantees absolute structural integrity at Mach 0.95.
          </p>
        </div>

        <div 
          ref={(el) => { textRefs.current[2] = el; }} 
          className="absolute opacity-0 translate-y-10 text-center flex flex-col items-center w-full max-w-5xl"
        >
          <p className="text-[#295dff] text-xs tracking-[0.3em] uppercase mb-4 font-mono font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Material Science
          </p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] leading-tight mb-6">
            Titanium. Carbon Fiber.<br />
            <span className="text-[#295dff] italic font-light drop-shadow-[0_0_20px_rgba(41,93,255,0.4)]">Aerospace Intelligence.</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-light drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] max-w-3xl text-center">
            A fuselage that breathes and adapts. Integrated neural-net sensors monitor atmospheric pressure constantly, shifting aerodynamic profiles in real time.
          </p>
        </div>

        <div 
          ref={(el) => { textRefs.current[3] = el; }} 
          className="absolute opacity-0 translate-y-10 text-center flex flex-col items-center w-full max-w-4xl"
        >
          <p className="text-[#295dff] text-xs tracking-[0.3em] uppercase mb-4 font-mono font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            The Next Era
          </p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] mb-8">
            Reserve the Future
          </h2>
          <div className="flex flex-wrap justify-center gap-6 pointer-events-auto">
            <button className="rounded-full bg-[#295dff] text-white px-10 py-5 text-xs tracking-widest uppercase font-bold hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300">
              Build Your X1
            </button>
            <button className="rounded-full glass-accent px-10 py-5 text-xs tracking-widest uppercase font-medium hover:bg-[#295dff]/20 transition-all border border-[#295dff]/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              View Specifications
            </button>
          </div>
        </div>
      </div>

      {/* Atmospheric vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80 z-0" />
    </section>
  );
}
