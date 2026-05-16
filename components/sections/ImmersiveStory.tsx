"use client";

import { motion } from "framer-motion";

const stories = [
  {
    title: "Silence as a Standard",
    subtitle: "Acoustic Engineering",
    content: "The cabin is a sanctuary. Through advanced acoustic metamaterials and active noise cancellation, the AERION X1 isolates you from the chaos of hypersonic travel. A space so quiet, you can hear your own thoughts at 50,000 feet. Every panel, vent, and seal is engineered to dampen harmonic vibrations."
  },
  {
    title: "Velocity Redefined",
    subtitle: "Propulsion Dynamics",
    content: "Speed without compromise. The dual quantum-thrust turbines deliver unyielding power while maintaining optimal fuel efficiency. Crossing continents is no longer a journey; it's a brief interlude. The adaptive engines continuously read the atmospheric density to optimize the thrust vector in real time."
  },
  {
    title: "Bespoke Craftsmanship",
    subtitle: "Interior Luxury",
    content: "Every stitch, every surface is meticulously curated. From hand-polished titanium accents to smart-glass panoramics that adapt to the circadian rhythm of your destination. The cabin layout can be dynamically reconfigured mid-flight using motorized modular tracking systems."
  },
  {
    title: "Invisible Intelligence",
    subtitle: "Autonomous Flight",
    content: "A neural-net trained copilot oversees every aspect of your flight. The autonomous assistance suite analyzes thousands of data points per second, avoiding turbulence and optimizing flight paths invisibly. You experience nothing but absolute stability."
  },
  {
    title: "Sovereign Airspace",
    subtitle: "Security Protocols",
    content: "Your privacy is as impenetrable as our composite hull. Military-grade encryption shields all onboard communications, while the quantum radar scrambler ensures your flight path remains known only to you and your destination. Absolute discretion, guaranteed."
  }
];

export default function ImmersiveStory() {
  return (
    <section className="py-32 bg-brand-bg relative z-10" id="experience">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {stories.map((story, idx) => (
          <div key={idx} className="relative py-24 md:py-32 border-t border-white/5 last:border-b">
            {/* Animated vertical line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 w-[1px] bg-gradient-to-b from-brand-accent/50 to-transparent md:left-1/2"
            />
            
            <div className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 w-full"
              >
                <p className="text-brand-accent text-xs tracking-[0.3em] uppercase mb-4 font-mono">
                  {story.subtitle}
                </p>
                <h3 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight">
                  {story.title}
                </h3>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 w-full"
              >
                <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                  {story.content}
                </p>
              </motion.div>
              
            </div>
          </div>
        ))}
        
      </div>
    </section>
  );
}
