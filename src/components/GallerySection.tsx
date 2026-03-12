import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";

const images = [
  { src: g1, alt: "Farmer Rally", span: "col-span-2 row-span-1" },
  { src: g2, alt: "Leader Speech", span: "col-span-1 row-span-2" },
  { src: g3, alt: "March for Rights", span: "col-span-1 row-span-1" },
  { src: g4, alt: "Farmer's Hands", span: "col-span-1 row-span-1" },
  { src: g5, alt: "Community Meeting", span: "col-span-2 row-span-1" },
  { src: g1, alt: "Rally 2", span: "col-span-1 row-span-1" },
  { src: g3, alt: "March 2", span: "col-span-1 row-span-1" },
  { src: g4, alt: "Hands 2", span: "col-span-1 row-span-1" },
  { src: g2, alt: "Speech 2", span: "col-span-1 row-span-1" },
  { src: g5, alt: "Meeting 2", span: "col-span-2 row-span-1" },
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
            📸 From the Fields
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Moments from rallies, gatherings, and the movement
          </p>
        </ScrollReveal>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[220px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`masonry-item ${img.span} relative`}
              whileHover={{ scale: 1.04 }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 flex items-end p-3">
                <span className="text-sm font-medium text-primary-foreground">{img.alt}</span>
              </div>
            </motion.div>
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
