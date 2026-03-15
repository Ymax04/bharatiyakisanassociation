import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.png";
import g8 from "@/assets/gallery-8.png";
import g9 from "@/assets/galary-9.jpg";
import g10 from "@/assets/galary-10.jpg";

const images = [
  { src: g1, alt: "Farmer Rally" },
  { src: g2, alt: "Leader Speech" },
  { src: g3, alt: "March for Rights" },
  { src: g4, alt: "Farmer's Hands" },
  { src: g5, alt: "Community Meeting" },
  { src: g6, alt: "Event Moment" },
   { src: g7, alt: "Farmers in Field" },
   { src: g8, alt: "Team Selfie" },
  { src: g9, alt: "Additional Rally Photo" },
  { src: g10, alt: "Additional Rally Photo" },
];

const ScrollReveal = ({ children, direction = "left" }: { children: React.ReactNode; direction?: "left" | "right" }) => (
  <motion.div
    initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding bg-muted">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal direction="left">
          <h2 className="mb-2 text-center text-3xl font-extrabold text-primary md:text-5xl">
            📸 आंदोलन की झलकियाँ
          </h2>
          <p className="mb-10 text-center text-muted-foreground text-sm md:text-base">
            रैलियों, बैठकों और किसान आंदोलन के चुनिंदा पलों की फोटो गैलरी
          </p>
        </ScrollReveal>

        {/* Responsive post-style grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-background shadow-sm ring-1 ring-foreground/5 hover:ring-saffron/50 hover:shadow-md transition-all duration-200"
              whileHover={{ y: -4 }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute right-4 top-4 rounded-full bg-primary-foreground/20 p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/40"
              onClick={() => setLightbox(null)}
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
