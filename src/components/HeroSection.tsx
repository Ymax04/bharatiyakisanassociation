import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToMembership = () => {
    document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-hindi mb-4 text-4xl font-bold leading-tight text-primary-foreground drop-shadow-lg sm:text-5xl md:text-7xl lg:text-8xl">
            किसान बचेगा, तो देश बचेगा!
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mb-8 max-w-2xl text-lg font-medium text-primary-foreground/90 md:text-xl"
        >
          Bharatiya Kisan Association — Empowering every farmer, protecting every field.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button onClick={scrollToMembership} className="btn-saffron text-xl">
            🤝 Join Movement
          </button>
          <a href="#donation" className="btn-forest text-xl">
            💚 Support Us
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-10 w-6 rounded-full border-2 border-primary-foreground/50 p-1">
          <div className="mx-auto h-2 w-1.5 rounded-full bg-primary-foreground/70" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
