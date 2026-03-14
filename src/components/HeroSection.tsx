import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Images for the slideshow
import heroBg1 from "@/assets/hero-bg.jpg";
import heroBg2 from "@/assets/hero-bg2.jpg";
import heroBg3 from "@/assets/hero-bg3.jpg";

const images = [heroBg1, heroBg2, heroBg3];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToMembership = () => {
    document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${images[index]})` }}
          />
        </AnimatePresence>
        {/* Rich gradient overlay: warm saffron tint at top → dark green at bottom */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 text-center max-w-5xl mx-auto">
        {/* Organization badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FF9933]/20 border-2 border-[#FF9933]/40 px-5 py-2 text-sm md:text-base font-bold text-[#FF9933] backdrop-blur-sm">
            🌾 भारतीय किसान एसोसिएशन 🌾
          </span>
        </motion.div>

        {/* Main slogan — MASSIVE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-heading-hindi text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-4 glow-saffron leading-[1.1]"
        >
          किसान बचेगा,
          <br />
          <span className="text-[#FF9933]">तो देश बचेगा!</span>
        </motion.h2>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-heading-hindi text-lg sm:text-xl md:text-2xl text-white/80 mb-10"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
        >
          एकता में शक्ति — किसानों का संगठन, किसानों की ताकत
        </motion.p>

        {/* CTA Buttons — Bold with glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button
            onClick={scrollToMembership}
            className="btn-glow-saffron text-lg md:text-2xl px-10 py-4 md:px-14 md:py-5 rounded-xl"
          >
            🤝 सदस्यता लें
          </button>
          <a
            href="#donation"
            className="btn-glow-forest text-lg md:text-2xl px-10 py-4 md:px-14 md:py-5 rounded-xl"
          >
            💚 हम से जुड़ें
          </a>
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-bounce text-white/60 hover:text-[#FF9933] transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown size={40} strokeWidth={2.5} />
      </motion.button>
    </section>
  );
};

export default HeroSection;