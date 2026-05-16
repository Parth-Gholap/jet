"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative w-full py-40 bg-[#050505] flex items-center justify-center overflow-hidden" id="reserve">
      
      {/* Background glow & gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-gradient-to-t from-[var(--accent)]/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[var(--accent)]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-8 font-mono"
        >
          Secure Your Allocation
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-12"
        >
          THE FUTURE <br /> TAKES FLIGHT
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <button className="group relative overflow-hidden rounded-full bg-white text-black px-10 py-5 flex items-center gap-3 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            <span className="relative z-10 text-xs tracking-widest uppercase font-bold">Schedule Viewing</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group rounded-full glass px-10 py-5 flex items-center gap-3 transition-all duration-500 hover:bg-white/10">
            <span className="text-xs tracking-widest uppercase font-medium">Download Brochure</span>
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
        
      </div>
    </section>
  );
}
