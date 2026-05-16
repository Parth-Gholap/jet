"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 3.5 }} // Delay for preloader
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-white/5 ${
        scrolled ? "bg-black/50 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center mix-blend-difference text-white">
        <Link href="/" className="font-serif text-2xl tracking-widest uppercase">
          Aerion X1
        </Link>

        <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase font-medium">
          {["Aircraft", "Engineering", "Technology", "Experience", "Reserve"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-[#295dff] transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#295dff] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <button className="md:hidden flex flex-col gap-1.5 z-50">
          <span className="w-6 h-[1px] bg-white block"></span>
          <span className="w-6 h-[1px] bg-white block"></span>
        </button>
      </div>
    </motion.nav>
  );
}
