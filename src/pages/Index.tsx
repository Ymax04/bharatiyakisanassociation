import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import MembershipSection from "@/components/MembershipSection";
import DonationSection from "@/components/DonationSection";
import FooterSection from "@/components/FooterSection";

const SECTION_IDS: Record<string, string> = {
  "/gallery": "gallery",
  "/membership": "membership",
  "/donation": "donation",
};

const Index = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionId = SECTION_IDS[pathname];
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-14">
        <TopBanner />
        <HeroSection />
      <AboutSection />
      <GallerySection />
      <MembershipSection />
      <DonationSection />
      <FooterSection />
      </div>
    </div>
  );
};

export default Index;

