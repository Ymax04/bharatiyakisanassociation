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
    <div className="flex flex-col w-full">
      {/* --- SECTION 1: OFFICIAL WHITE HEADER (LETTERHEAD) --- */}
      <div className="bg-white py-4 px-4 border-b-4 border-forest">
        <div className="max-w-7xl mx-auto text-center">
          {/* Top Slogans Row */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-6 text-[10px] md:text-sm font-bold text-red-600 mb-2">
            <span>रजि. 08806</span>
            <span>|| किसान मजदूर एकता जिंदाबाद ||</span>
            <span>|| जय जवान जय किसान ||</span>
            <span>|| चौ. महेन्द्र सिंह टिकैत अमर रहे ||</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-6xl font-bold text-forest my-2">
            भारतीय किसान एसोसिएशन
          </h1>

          {/* Address Lines */}
          <div className="text-xs md:text-base font-semibold text-gray-800 leading-tight">
            <p>राष्ट्रीय कार्यालय – आर जे एफ – 538, नेता जी सुभाष मार्ग, राज नगर पार्ट 2</p>
            <p>पालम कॉलोनी साउथ वेस्ट दिल्ली – 110077</p>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: SLIDESHOW & SLOGAN --- */}
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

        {/* Hero Content (Over the image) */}
        <div className="relative z-10 px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl"
          >
            किसान बचेगा, तो देश बचेगा!
          </motion.h2>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button onClick={scrollToMembership} className="btn-saffron text-xl px-8 py-3">
              🤝 Join Movement
            </button>
            <a href="#donation" className="btn-forest text-xl px-8 py-3">
              💚 Support Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;