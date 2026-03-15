import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import bkaLogo from "@/assets/bka-logo.jpg";

const links = [
  { label: "मुख्य पृष्ठ", href: "/" },
  { label: "हमारे बारे में", href: "/about" },
  { label: "गैलरी", href: "/gallery" },
  { label: "सदस्यता", href: "/membership" },
  { label: "सहयोग करें", href: "/donation" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const renderLink = (l: (typeof links)[0], className: string) => (
    <Link
      key={l.label}
      to={l.href}
      onClick={() => setOpen(false)}
      className={className}
    >
      {l.label}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-forest/95 backdrop-blur-md border-b border-white/10 shadow-lg px-4 py-2.5 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={bkaLogo} alt="BKA Logo" className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border border-saffron/30" />
          <span className="text-[13px] sm:text-sm font-bold text-primary-foreground/90 text-hindi">
            भारतीय किसान एसोसिएशन
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden gap-6 md:flex">
          {links.map((l) =>
            renderLink(
              l,
              "text-hindi text-sm font-bold text-primary-foreground/80 transition-colors hover:text-saffron"
            )
          )}
        </div>

        <Link to="/membership" className="hidden btn-saffron !px-5 !py-2 !text-sm md:inline-flex text-hindi font-bold" onClick={() => setOpen(false)}>
          सदस्यता लें
        </Link>

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
              {links.map((l) =>
                renderLink(
                  l,
                  "text-hindi font-bold text-primary-foreground/80 transition-colors hover:text-saffron"
                )
              )}
              <Link
                to="/membership"
                onClick={() => setOpen(false)}
                className="btn-saffron !py-2 text-center text-hindi font-bold"
              >
                सदस्यता लें
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
