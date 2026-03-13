import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${images[index]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl"
        >
          किसान बचेगा, तो देश बचेगा!
        </motion.h2>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button onClick={scrollToMembership} className="btn-saffron text-lg md:text-xl px-8 py-3">
            🤝 सदस्यता लें
          </button>
          <a href="#donation" className="btn-forest text-lg md:text-xl px-8 py-3">
            💚 हम से जुड़ें
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;