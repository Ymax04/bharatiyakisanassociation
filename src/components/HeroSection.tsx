import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- IMPORTANT: Ensure these 3 files exist in your src/assets/ folder ---
import heroBg1 from "@/assets/hero-bg.jpg";
import heroBg2 from "@/assets/hero-bg2.jpg"; 
import heroBg3 from "@/assets/hero-bg3.jpg"; 

const images = [heroBg1, heroBg2, heroBg3];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  // Automatic slideshow logic: changes every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToMembership = () => {
    document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* --- BACKGROUND SLIDESHOW SECTION --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${images[index]})` }}
          />
        </AnimatePresence>
        {/* Dark overlay to make white text pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full max-w-5xl px-4 text-center">
        
        {/* 1. THE OFFICIAL HEADER BOX (Letterhead Style) */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 overflow-hidden rounded-2xl border border-white/20 bg-black/40 p-6 backdrop-blur-md md:p-10"
        >
          {/* Registration & Office Row */}
          <div className="mb-6 flex flex-col items-center justify-between gap-2 border-b border-white/10 pb-4 text-sm font-bold uppercase tracking-wider md:flex-row">
            <span className="text-saffron">रजि० नं०: RJ F-538</span>
            <span className="text-forest italic">।। राष्ट्रीय कार्यालय ।।</span>
          </div>

          {/* Association Names */}
          <div className="space-y-2">
            <h2 className="text-4xl font-black leading-tight text-white md:text-7xl">
              भारतीय किसान संघ
            </h2>
            <h3 className="text-lg font-extrabold tracking-[0.25em] text-forest md:text-2xl">
              BHARATIYA KISAN ASSOCIATION
            </h3>
          </div>

          {/* Saffron & Green Accent Line */}
          <div className="mt-6 flex justify-center items-center gap-3">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-saffron" />
            <div className="h-2 w-2 rounded-full bg-white" />
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-forest" />
          </div>
        </motion.div>

        {/* 2. HERO SLOGAN */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-hindi mb-8 text-3xl font-bold leading-tight text-white drop-shadow-xl sm:text-5xl md:text-6xl">
            किसान बचेगा, तो देश बचेगा!
          </h1>
        </motion.div>

        {/* 3. ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button 
            onClick={scrollToMembership} 
            className="btn-saffron min-w-[200px] text-xl px-8 py-4 shadow-lg shadow-saffron/20"
          >
            🤝 Join Movement
          </button>
          <a 
            href="#donation" 
            className="btn-forest min-w-[200px] text-xl px-8 py-4 shadow-lg shadow-forest/20"
          >
            💚 Support Us
          </a>
        </motion.div>
      </div>

      {/* 4. SCROLL INDICATOR */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-10 w-6 rounded-full border-2 border-white/30 p-1">
          <div className="mx-auto h-2 w-1.5 rounded-full bg-white/50" />
        </div>
      </motion.div>
    </section>
  );
};

