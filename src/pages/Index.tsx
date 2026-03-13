import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import MembershipSection from "@/components/MembershipSection";
import DonationSection from "@/components/DonationSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <MembershipSection />
      <DonationSection />
      <FooterSection />
    </div>
  );
};

export default Index;

