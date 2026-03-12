import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#" },
  { label: "Gallery", href: "#gallery" },
  { label: "Membership", href: "#membership" },
  { label: "Donate", href: "#donation" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-40 w-full glass-card-dark px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-hindi text-xl font-bold text-primary-foreground">BKA</span>
          <span className="hidden text-sm font-semibold text-primary-foreground/80 sm:inline">
            Bharatiya Kisan Association
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-saffron"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a href="#membership" className="hidden btn-saffron !px-5 !py-2 !text-sm md:inline-flex">
          Join Now
        </a>

        {/* Mobile toggle */}
        <button
          className="text-primary-foreground md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-4 pb-4 pt-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-primary-foreground/80 transition-colors hover:text-saffron"
                >
                  {l.label}
                </a>
              ))}
              <a href="#membership" onClick={() => setOpen(false)} className="btn-saffron !py-2 text-center">
                Join Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
