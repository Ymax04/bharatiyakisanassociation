import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import MembershipSection from "@/components/MembershipSection";
import FooterSection from "@/components/FooterSection";

const SECTION_IDS: Record<string, string> = {
  "/gallery": "gallery",
  "/membership": "membership",
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
      <Helmet>
        <title>Bharatiya Kisan Association — किसान बचेगा, तो देश बचेगा!</title>
        <meta name="description" content="भारतीय किसान संगठन (BKA) — किसानों की आवाज़, किसानों का संगठन। राष्ट्रीय लघु किसानों का संगठन, उत्तर प्रदेश (UP) और पूरे भारत में किसानों को एकजुट करना।" />
        <link rel="canonical" href="https://bka.org.in/" />
      </Helmet>
      <Navbar />
      <div className="pt-14">
        <TopBanner />
        <HeroSection />
      <AboutSection />
      <GallerySection />
      <MembershipSection />
      <FooterSection />
      </div>
    </div>
  );
};

export default Index;

