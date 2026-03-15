import { Link } from "react-router-dom";
import { MessageCircle, Instagram, Youtube, Mail, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "919634232102";
const INSTAGRAM_URL = "https://www.instagram.com/siddartharaazyadav/";
const YOUTUBE_URL = "https://www.youtube.com/@bhartiyakisanassociation";

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
              <li><Link to="/gallery" className="transition-colors hover:text-background">Gallery</Link></li>
              <li><Link to="/membership" className="transition-colors hover:text-background">Membership</Link></li>
              <li><Link to="/donation" className="transition-colors hover:text-background">Donate</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Connect With Us</h4>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 inline-flex items-center gap-2 rounded-md border border-[#25d366]/40 bg-[#25d366]/10 px-3 py-2 text-sm font-medium text-[#25d366] transition-all hover:bg-[#25d366]/20"
            >
              <MessageCircle size={16} />
              WhatsApp: 9634232102
            </a>
            <div className="flex gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-background/10 p-2.5 transition-all duration-200 hover:scale-110 hover:bg-saffron"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-background/10 p-2.5 transition-all duration-200 hover:scale-110 hover:bg-saffron"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
            <div className="mt-4 space-y-2 text-sm text-background/70">
              <p className="flex items-center gap-2">
                <Phone size={14} />
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-background">+91 9634232102</a>
              </p>
              <p className="flex items-center gap-2"><Mail size={14} /> bhartiyakisanassociation@gmail.com</p>
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
