"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 5) + 1;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setLoading(false);
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-bg text-brand-text"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-brand-accent/5 rounded-full blur-[100px]" />
          
          <div className="flex flex-col items-center gap-8 w-full max-w-sm px-8 z-10">
            <h1 className="font-serif text-3xl tracking-[0.3em] uppercase opacity-80">
              Aerion X1
            </h1>
            
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-brand-accent shadow-[0_0_10px_#295dff]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            
            <div className="text-xs font-mono tracking-widest text-white/50">
              {progress.toString().padStart(3, "0")}% // SYSTEM INITIALIZATION
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
