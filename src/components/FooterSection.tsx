import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-foreground px-4 py-12 text-background md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-hindi mb-2 text-2xl font-bold">भारतीय किसान संघ</h3>
            <p className="text-sm font-semibold">BHARATIYA KISAN ASSOCIATION</p>
            <p className="mt-4 text-sm text-background/60">
              Fighting for the rights and welfare of Indian farmers since inception. Together we grow, together we prosper.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#gallery" className="transition-colors hover:text-background">Gallery</a></li>
              <li><a href="#membership" className="transition-colors hover:text-background">Membership</a></li>
              <li><a href="#donation" className="transition-colors hover:text-background">Donate</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Connect With Us</h4>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-full bg-background/10 p-2.5 transition-all duration-200 hover:scale-110 hover:bg-saffron"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm text-background/70">
              <p className="flex items-center gap-2"><Phone size={14} /> +91 98765 43210</p>
              <p className="flex items-center gap-2"><Mail size={14} /> contact@bka.org.in</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-background/10 pt-6 text-center text-xs text-background/40">
          <p>© {new Date().getFullYear()} Bharatiya Kisan Association. All rights reserved.</p>
          <p className="mt-1">Official Domain: www.bka.org.in — Verified ✓</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
