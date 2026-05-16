"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 3.5 }} // Delay for preloader
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-[var(--foreground)]/5 ${
        scrolled ? "bg-[var(--background)]/50 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center text-[var(--foreground)]">
        <Link href="/" className="font-serif text-2xl tracking-widest uppercase">
          Aerion X1
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-medium">
          {["Aircraft", "Engineering", "Technology", "Experience", "Reserve"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-[var(--accent)] transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--foreground)]/10 transition-colors ml-4 border border-transparent hover:border-[var(--foreground)]/20"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4 z-50">
          <button onClick={toggleTheme} className="p-2 text-[var(--foreground)]">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button className="flex flex-col gap-1.5">
            <span className="w-6 h-[1px] bg-[var(--foreground)] block"></span>
            <span className="w-6 h-[1px] bg-[var(--foreground)] block"></span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
