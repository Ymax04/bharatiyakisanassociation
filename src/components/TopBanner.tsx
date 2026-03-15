import { motion } from "framer-motion";
import bkaLogo from "@/assets/bka-logo.jpg";

/* ─── slogans from site content ─── */
const slogans = [
  "किसान मजदूर एकता जिंदाबाद",
  "जय जवान जय किसान",
  "चौ. महेन्द्र सिंह टिकैत अमर रहे",
  "किसान बचेगा, तो देश बचेगा",
  "किसान आयोग का गठन हो",
  "कर्ज़ मुक्त किसान — समृद्ध भारत",
];

const TopBanner = () => {
  return (
    <div className="relative z-30 select-none">
      {/* ══ Tricolor bar (saffron-white-green) ══ */}
      <div className="tricolor-bar" />

      {/* ══ Scrolling slogans ticker ══ */}
      <div className="bg-gradient-to-r from-[#E65100] via-[#FF9933] to-[#E65100] overflow-hidden py-2">
        <motion.div
          className="flex items-center whitespace-nowrap gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...slogans, ...slogans, ...slogans, ...slogans].map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-heading-hindi text-xs md:text-sm font-bold text-white drop-shadow-md"
            >
              <span className="text-lg opacity-80">॥</span>
              {s}
              <span className="text-lg opacity-80">॥</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══ Main banner body ══ */}
      <div className="relative overflow-hidden banner-shimmer"
        style={{
          background: "linear-gradient(135deg, #0a2e14 0%, #1a5c2a 25%, #0d3d18 50%, #1a5c2a 75%, #0a2e14 100%)",
          backgroundSize: "400% 400%",
        }}
      >
        {/* Decorative bg elements */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.04) 40px, rgba(255,255,255,0.04) 80px)`
            }}
          />
        </div>
        {/* Saffron glow orbs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#FF9933]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#FF9933]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-[#FF9933]/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-2.5 sm:px-4 py-4 md:py-7">
          <div className="flex items-center gap-3 sm:gap-5 md:gap-8">
            {/* Logo - Bigger with bright ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
              className="flex-shrink-0"
            >
              <div className="w-12 h-12 min-[400px]:w-16 min-[400px]:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-[3px] md:border-[4px] border-[#FF9933] shadow-2xl ring-2 md:ring-4 ring-[#FF9933]/30 ring-offset-2 md:ring-offset-4 ring-offset-[#0d3d18]"
                style={{ boxShadow: "0 0 30px rgba(255, 153, 51, 0.3), 0 0 60px rgba(255, 153, 51, 0.1)" }}
              >
                <img
                  src={bkaLogo}
                  alt="BKA Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Center text content */}
            <div className="flex-1 min-w-0">
              {/* Reg number */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-2"
              >
                <span className="inline-flex items-center rounded-md bg-[#FF9933]/20 border-2 border-[#FF9933]/40 px-3 py-1 text-[10px] md:text-xs font-black text-[#FF9933] tracking-wider uppercase">
                  ✦ रजि. 08806 ✦
                </span>
              </motion.div>

              {/* Brand Name — One line, clean & bold */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="leading-none"
              >
                <span className="text-heading-hindi text-[1.1rem] min-[400px]:text-[1.35rem] sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white drop-shadow-lg block whitespace-nowrap"
                  style={{ textShadow: "0 2px 8px rgba(255,153,0,0.2), 0 4px 16px rgba(0,0,0,0.25)" }}>
                  <span className="text-[#FFB74D]">भारतीय</span>{" "}
                  किसान{" "}
                  <span className="text-[#FFB74D]">एसोसिएशन</span>
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="text-heading-hindi text-[10px] sm:text-base md:text-lg text-[#FFB74D]/90 mt-1 sm:mt-2 tracking-wide"
              >
                ⚡ किसान की आवाज़, किसान की ताकत ⚡
              </motion.p>

              {/* Office Address */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="text-hindi text-[8px] sm:text-[10px] md:text-xs text-white/80 mt-1 sm:mt-2 leading-relaxed max-w-[95%] bg-white/10 p-3 rounded-xl border border-white/20"
              >
                <p className="mb-1">
                  <span className="font-semibold text-white">राष्ट्रीय कार्यालय:</span>{" "}
                  आर.जे.एफ–538, नेता जी सुभाष मार्ग, राज नगर पार्ट-2, पालम कॉलोनी, दक्षिण-पश्चिम दिल्ली – 110077।
                </p>
                <p>
                  <span className="font-semibold text-white">मुख्य कार्यालय:</span>{" "}
                  ग्राम डुबर, पोस्ट कुसमरा, जिला मैनपुरी, उत्तर प्रदेश।
                </p>
              </motion.div>
            </div>

            {/* Right side BKA badge (desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden lg:flex flex-col items-center gap-2"
            >
              <div className="w-16 h-16 rounded-full bg-[#FF9933]/15 border-2 border-[#FF9933]/30 flex items-center justify-center">
                <span className="text-4xl">🌾</span>
              </div>
              <span className="text-xs font-black text-[#FF9933] tracking-[0.3em] uppercase">BKA</span>
              <div className="flex gap-1">
                <div className="w-4 h-1 rounded-full bg-[#FF9933]" />
                <div className="w-4 h-1 rounded-full bg-white" />
                <div className="w-4 h-1 rounded-full bg-[#138808]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ Bottom scrolling strip (reverse direction) ══ */}
      <div className="bg-gradient-to-r from-[#0a2e14] via-[#143d1e] to-[#0a2e14] overflow-hidden py-2">
        <motion.div
          className="flex items-center whitespace-nowrap gap-10"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[
            "एकता में शक्ति है",
            "किसानों की आवाज़ — भारतीय किसान एसोसिएशन",
            "सदस्यता लें — किसानों का साथ दें",
            "ईमानदारी और वफादारी — हमारी पहचान",
            "किसान आंदोलन में शामिल हों",
            "हर कार्यकर्ता ईमानदार और मेहनती",
            "एकता में शक्ति है",
            "किसानों की आवाज़ — भारतीय किसान एसोसिएशन",
            "सदस्यता लें — किसानों का साथ दें",
            "ईमानदारी और वफादारी — हमारी पहचान",
            "किसान आंदोलन में शामिल हों",
            "हर कार्यकर्ता ईमानदार और मेहनती",
          ].map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-heading-hindi text-[11px] md:text-sm font-semibold text-white/80"
            >
              <span className="text-[#FF9933] text-sm">●</span>
              {s}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══ Tricolor line at bottom ══ */}
      <div className="tricolor-bar" />
    </div>
  );
};

export default TopBanner;
