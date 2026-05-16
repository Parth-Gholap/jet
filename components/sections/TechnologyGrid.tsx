"use client";

import { motion, Variants } from "framer-motion";
import { Cpu, Shield, Navigation, Wind, Activity, Zap } from "lucide-react";

const technologies = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Titanium Composite Structure",
    description: "Aerospace-grade durability forged to withstand extreme atmospheric pressures while maintaining optimal weight."
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Adaptive Turbine Intelligence",
    description: "Self-regulating thrust vectors that adjust to wind shear in real-time for unprecedented stability."
  },
  {
    icon: <Navigation className="w-6 h-6" />,
    title: "Quantum Navigation System",
    description: "Sub-millimeter routing precision utilizing entangled state sensors for zero-latency GPS independence."
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Autonomous Flight Assistance",
    description: "Neural-net trained autopilot capable of managing complex takeoff and landing sequences flawlessly."
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: "Zero-Noise Cabin Architecture",
    description: "Acoustic metamaterials absorb 99.8% of external frequencies, ensuring absolute silence at Mach 0.95."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Carbon Fiber Wing Dynamics",
    description: "Bio-mimetic wing flexibility reduces drag by 30%, enabling record-breaking non-stop ranges."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function TechnologyGrid() {
  return (
    <section className="py-32 relative bg-transparent overflow-hidden" id="technology">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 w-[80vw] h-[50vh] bg-[var(--accent)]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-20 text-center md:text-left"
        >
          <p className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-4 font-mono">
            Innovation
          </p>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight">
            ENGINEERING BEYOND LIMITS
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {technologies.map((tech, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="group relative p-8 rounded-2xl glass transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(41,93,255,0.1)] hover:border-[var(--accent)]/30"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/0 to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full border border-[var(--foreground)]/10 flex items-center justify-center mb-6 text-[var(--accent)] group-hover:bg-[var(--accent)]/10 group-hover:border-[var(--accent)]/50 transition-colors duration-500">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-medium mb-3 tracking-wide">{tech.title}</h3>
                <p className="text-[var(--foreground)]/50 text-sm leading-relaxed font-light">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2 translate-x-1/4" />
    </section>
  );
}
