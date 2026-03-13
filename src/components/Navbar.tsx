import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import bkaLogo from "@/assets/bka-logo.jpg";

const links = [
  { label: "Home", href: "/", isRoute: true },
  { label: "About", href: "/about", isRoute: true },
  { label: "Gallery", href: "/#gallery", isRoute: false },
  { label: "Membership", href: "/#membership", isRoute: false },
  { label: "Donate", href: "/#donation", isRoute: false },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleClick = (href: string, isRoute: boolean) => {
    setOpen(false);
    // If it's a hash link and we're on the home page, scroll to it
    if (!isRoute && href.startsWith("/#")) {
      const hash = href.replace("/", "");
      if (location.pathname === "/") {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const renderLink = (l: typeof links[0], className: string) => {
    if (l.isRoute) {
      return (
        <Link
          key={l.label}
          to={l.href}
          onClick={() => handleClick(l.href, l.isRoute)}
          className={className}
        >
          {l.label}
        </Link>
      );
    }
    return (
      <a
        key={l.label}
        href={l.href}
        onClick={() => handleClick(l.href, l.isRoute)}
        className={className}
      >
        {l.label}
      </a>
    );
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-forest/95 backdrop-blur-md border-b border-white/10 shadow-lg px-4 py-2.5 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={bkaLogo} alt="BKA Logo" className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover border border-saffron/30" />
          <span className="hidden text-sm font-bold text-primary-foreground/90 sm:inline">
            Bharatiya Kisan Association
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden gap-6 md:flex">
          {links.map((l) =>
            renderLink(
              l,
              "text-sm font-medium text-primary-foreground/80 transition-colors hover:text-saffron"
            )
          )}
        </div>

        <Link to="/#membership" className="hidden btn-saffron !px-5 !py-2 !text-sm md:inline-flex">
          Join Now
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
                  "text-primary-foreground/80 transition-colors hover:text-saffron"
                )
              )}
              <Link
                to="/#membership"
                onClick={() => setOpen(false)}
                className="btn-saffron !py-2 text-center"
              >
                Join Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
