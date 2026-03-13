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
    <div className="relative z-50 select-none">
      {/* ══ Top gold bar ══ */}
      <div className="h-[3px] gradient-saffron" />

      {/* ══ Scrolling slogans ticker ══ */}
      <div className="bg-saffron overflow-hidden py-1.5">
        <motion.div
          className="flex items-center whitespace-nowrap gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...slogans, ...slogans, ...slogans, ...slogans].map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-hindi text-[11px] md:text-xs font-bold text-white drop-shadow-sm"
            >
              <span className="text-base opacity-70">॥</span>
              {s}
              <span className="text-base opacity-70">॥</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══ Main banner body ══ */}
      <div className="relative bg-gradient-to-br from-[#1a3c1e] via-[#1e4d24] to-[#1a3c1e] overflow-hidden">
        {/* Decorative bg elements */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 80px)`
            }}
          />
        </div>
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-saffron/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-saffron/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-4 md:py-5">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
              className="flex-shrink-0"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] border-saffron/50 shadow-xl shadow-saffron/10 ring-2 ring-saffron/20 ring-offset-2 ring-offset-[#1e4d24]">
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
                className="mb-1"
              >
                <span className="inline-flex items-center rounded bg-saffron/15 border border-saffron/25 px-2 py-0.5 text-[9px] md:text-[10px] font-bold text-saffron tracking-wider uppercase">
                  रजि. 08806
                </span>
              </motion.div>

              {/* Brand Name */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-hindi leading-none"
              >
                <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
                  <span className="text-saffron">भारतीय</span>{" "}
                  किसान{" "}
                  <span className="text-saffron">एसोसिएशन</span>
                </span>
              </motion.h1>

              {/* Office Address */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-hindi text-[8px] sm:text-[9px] md:text-[11px] text-white/45 mt-1.5 leading-relaxed"
              >
                राष्ट्रीय कार्यालय – आर जे एफ – 538, नेता जी सुभाष मार्ग,
                राज नगर पार्ट 2, पालम कॉलोनी साउथ वेस्ट दिल्ली – 110077
              </motion.p>
            </div>

            {/* Right side decorative wheat emoji (desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden md:flex flex-col items-center gap-1 text-white/20"
            >
              <span className="text-3xl">🌾</span>
              <span className="text-[9px] font-bold text-saffron/60 tracking-widest uppercase">BKA</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ Bottom scrolling strip (reverse direction) ══ */}
      <div className="bg-[#162e1b] overflow-hidden py-1.5">
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
              className="inline-flex items-center gap-2 text-hindi text-[10px] md:text-xs font-semibold text-white/70"
            >
              <span className="text-saffron text-xs">●</span>
              {s}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══ Final gold line ══ */}
      <div className="h-[2px] gradient-saffron" />
    </div>
  );
};

export default TopBanner;
